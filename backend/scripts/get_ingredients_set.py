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
unique_ingredients_filtered = set()

# clean and sort
for recipe in data:
    ingredients = recipe.get("ingredients", [])
    for ingredient in ingredients:
        ingredient = ingredient.lower()
        if is_valid_ingredient(ingredient):
            unique_ingredients.add(ingredient)
            words = ingredient.lower().split()
            if len(words) == 1:
                unique_ingredients_filtered.add(ingredient)

unique_ingredients = sorted(unique_ingredients)
unique_ingredients_filtered = sorted(unique_ingredients_filtered)

# export to txt
with open(config("LOCAL_ALL_INGREDIENTS_EXPORT"), "w") as output_file:
    output_file.write("\n".join(unique_ingredients))

with open(config("LOCAL_INGREDIENTS_EXPORT"), "w") as output_file_filtered:
    output_file_filtered.write("\n".join(unique_ingredients_filtered))

# export to json
indexed_ingredients = {char: [] for char in "abcdefghijklmnopqrstuvwxyz0123456789"}

for ingredient in unique_ingredients:
    indexed_ingredients[ingredient[0]].append(ingredient)

indexed_json = json.dumps(indexed_ingredients, indent=2)

with open(config("LOCAL_ALL_INGREDIENTS_EXPORT_JSON"), "w") as json_output_file:
    json_output_file.write(indexed_json)

indexed_ingredients_filtered = {char: [] for char in "abcdefghijklmnopqrstuvwxyz"}

for ingredient in unique_ingredients_filtered:
    indexed_ingredients_filtered[ingredient[0]].append(ingredient)

indexed_json_filtered = json.dumps(indexed_ingredients_filtered, indent=2)

with open(config("LOCAL_INGREDIENTS_EXPORT_JSON"), "w") as json_output_file_filtered:
    json_output_file_filtered.write(indexed_json_filtered)

print(f"Found {len(unique_ingredients)} unique ingredients.")
print(f"Filtered down to {len(unique_ingredients_filtered)} unique ingredients.")
