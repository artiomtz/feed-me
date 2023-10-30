from data_import.models import Recipe
from main_app.cache import redis_cache
from decouple import config
import re


RECIPE_SIMILARITY_THRESHOLD = float(config("RECIPE_SIMILARITY_THRESHOLD"))
MAX_INGREDIENTS = int(config("MAX_INGREDIENTS"))
MIN_INGREDIENTS = int(config("MIN_INGREDIENTS"))
REDIS_TIMEOUT = int(config("REDIS_TIMEOUT"))


def resolve_recipe_by_id(self, info, recipe_id):
    try:
        return Recipe.objects.get(pk=recipe_id)
    except Recipe.DoesNotExist:
        return None


def clean_ingredient(ingredient):
    return re.sub(r"\[|\]|\'", "", ingredient).strip()


def resolve_possible_recipes(self, info, ingredients):
    cleaned_ingredients = sorted(
        {clean_ingredient(ingredient) for ingredient in ingredients}
    )

    if (
        len(cleaned_ingredients) < MIN_INGREDIENTS
        or len(cleaned_ingredients) > MAX_INGREDIENTS
    ):
        print(
            f"Please provide between {MIN_INGREDIENTS} to {MAX_INGREDIENTS} ingredients"
        )
        return []

    try:
        cache_key = "feed-me:" + ",".join(cleaned_ingredients)
        cached_ids = redis_cache.get_cached_data(cache_key)
        if cached_ids is not None:
            filtered_recipes = Recipe.objects.filter(id__in=cached_ids)
            print(f"Retrieved {len(filtered_recipes)} matching recipes from cache")
            return filtered_recipes
    except:
        print("Couldn't retrieve data from Redis")

    filtered_recipes = search_recipes(set(cleaned_ingredients))
    print(f"Found {len(filtered_recipes)} matching recipes")

    try:
        unique_ids = set(recipe.id for recipe in filtered_recipes)
        redis_cache.cache_data(cache_key, list(unique_ids), timeout=REDIS_TIMEOUT)
    except:
        print("Could'nt store data to Redis")

    return filtered_recipes


def search_recipes(cleaned_ingredients):
    filtered_recipes = []
    all_recipes = Recipe.objects.all()

    for recipe in all_recipes:
        recipe_ingredients = [
            clean_ingredient(ingredient)
            for ingredient in recipe.ingredients_set.split(", ")
        ]

        similarity_score = len(
            cleaned_ingredients.intersection(recipe_ingredients)
        ) / len(recipe_ingredients)

        if similarity_score >= RECIPE_SIMILARITY_THRESHOLD:
            filtered_recipes.append(recipe)

    return filtered_recipes
