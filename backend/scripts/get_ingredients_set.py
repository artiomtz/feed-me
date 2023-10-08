import json
from decouple import config


def is_valid_ingredient(ingredient):
    allowed_chars = set("abcdefghijklmnopqrstuvwxyz0123456789%-+., ")
    return all(char in allowed_chars for char in ingredient)


with open(config("LOCAL_INGREDIENTS"), "r") as json_file:
    data = json.load(json_file)

unique_ingredients = set()

for recipe in data:
    ingredients = recipe.get("ingredients", [])
    unique_ingredients.update(ingredients)

unique_ingredients = {ingredient.lower() for ingredient in unique_ingredients}
unique_ingredients = [
    ingredient for ingredient in unique_ingredients if is_valid_ingredient(ingredient)
]
unique_ingredients = sorted(unique_ingredients)
print(f"Found {len(unique_ingredients)} unique ingredients:\n{unique_ingredients}")

with open(config("LOCAL_INGREDIENTS_EXPORT"), "w") as output_file:
    output_file.write("\n".join(unique_ingredients))
