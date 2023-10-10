import json
from decouple import config


# check valid ingredient
def is_valid_ingredient(ingredient):
    allowed_chars = set("abcdefghijklmnopqrstuvwxyz0123456789%-+., ")
    return all(char in allowed_chars for char in ingredient)


# read ingredients json
with open(config("LOCAL_INGREDIENTS"), "r") as json_file:
    data = json.load(json_file)

unique_ingredients = set()

for recipe in data:
    ingredients = recipe.get("ingredients", [])
    unique_ingredients.update(ingredients)

# clean and sort
unique_ingredients = {ingredient.lower() for ingredient in unique_ingredients}
unique_ingredients = [
    ingredient for ingredient in unique_ingredients if is_valid_ingredient(ingredient)
]
unique_ingredients = sorted(unique_ingredients)

# export to txt
with open(config("LOCAL_INGREDIENTS_EXPORT"), "w") as output_file:
    output_file.write("\n".join(unique_ingredients))

# export to json
indexed_ingredients = {char: [] for char in "abcdefghijklmnopqrstuvwxyz0123456789"}

for ingredient in unique_ingredients:
    indexed_ingredients[ingredient[0]].append(ingredient)

indexed_json = json.dumps(indexed_ingredients, indent=2)

with open(config("LOCAL_INGREDIENTS_EXPORT_JSON"), "w") as json_output_file:
    json_output_file.write(indexed_json)

print(f"Found {len(unique_ingredients)} unique ingredients.")
