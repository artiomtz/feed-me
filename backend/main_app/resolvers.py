from data_import.models import Recipe
from main_app.cache import redis_cache
from decouple import config
import re


MAX_INGREDIENTS = int(config("MAX_INGREDIENTS"))
MIN_INGREDIENTS = int(config("MIN_INGREDIENTS"))
REDIS_TIMEOUT = int(config("REDIS_TIMEOUT"))
SIMILARITY_THRESHOLD_DEFAULT = float(config("SIMILARITY_THRESHOLD_DEFAULT"))
SIMILARITY_THRESHOLD_MIN = float(config("SIMILARITY_THRESHOLD_MIN"))
SIMILARITY_THRESHOLD_MAX = float(config("SIMILARITY_THRESHOLD_MAX"))


def resolve_recipe_by_id(self, info, recipe_id):
    try:
        return Recipe.objects.get(pk=recipe_id)
    except Recipe.DoesNotExist:
        return None


def clean_ingredient(ingredient):
    return re.sub(r"\[|\]|\'", "", ingredient).strip()


def resolve_possible_recipes(self, info, ingredients, similarity_threshold):
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

    if (
        similarity_threshold < SIMILARITY_THRESHOLD_MIN
        or similarity_threshold > SIMILARITY_THRESHOLD_MAX
    ):
        similarity_threshold = SIMILARITY_THRESHOLD_DEFAULT
        print(f"Setting default similarity threshold: {SIMILARITY_THRESHOLD_DEFAULT}")

    try:
        cache_key = f"feed-me:{','.join(cleaned_ingredients)}.[{similarity_threshold}]"
        cached_ids = redis_cache.get_cached_data(cache_key)
        if cached_ids is not None:
            filtered_recipes = Recipe.objects.filter(id__in=cached_ids)
            print(f"Retrieved {len(filtered_recipes)} matching recipes from cache")
            return filtered_recipes
    except:
        print("Couldn't retrieve data from Redis")

    filtered_recipes = search_recipes(set(cleaned_ingredients), similarity_threshold)
    print(f"Found {len(filtered_recipes)} matching recipes")

    try:
        unique_ids = set(recipe.id for recipe in filtered_recipes)
        redis_cache.cache_data(cache_key, list(unique_ids), timeout=REDIS_TIMEOUT)
    except:
        print("Could'nt store data to Redis")

    return filtered_recipes


def search_recipes(cleaned_ingredients, similarity_threshold):
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

        if similarity_score >= similarity_threshold:
            filtered_recipes.append(recipe)

    return filtered_recipes
