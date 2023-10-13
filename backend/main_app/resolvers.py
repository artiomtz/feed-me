from data_import.models import Recipe
from decouple import config
import re


RECIPE_SIMILARITY_THRESHOLD = float(config("RECIPE_SIMILARITY_THRESHOLD"))
MAX_INGREDIENTS = int(config("MAX_INGREDIENTS"))
MIN_INGREDIENTS = int(config("MIN_INGREDIENTS"))


def resolve_recipe_by_id(self, info, recipe_id):
    try:
        return Recipe.objects.get(pk=recipe_id)
    except Recipe.DoesNotExist:
        return None


def clean_ingredient(ingredient):
    return re.sub(r"\[|\]|\'", "", ingredient).strip()


def resolve_possible_recipes(self, info, ingredients):
    cleaned_ingredients = {clean_ingredient(ingredient) for ingredient in ingredients}

    if (
        len(cleaned_ingredients) < MIN_INGREDIENTS
        or len(cleaned_ingredients) > MAX_INGREDIENTS
    ):
        print(
            f"Please provide between {MIN_INGREDIENTS} to {MAX_INGREDIENTS} ingredients"
        )
        return []

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
    print(
        f"Found {len(filtered_recipes)} matching recipes out of {len(all_recipes)} recipes"
    )
    return filtered_recipes
