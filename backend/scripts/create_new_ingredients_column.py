import re
import csv
import json
from decouple import config

# load JSON of indexed ingredients
with open(config("LOCAL_ALL_INGREDIENTS_EXPORT_JSON"), "r") as json_file:
    indexed_ingredients = json.load(json_file)


# check if a word is a valid ingredient
def is_valid_ingredient(word):
    cleaned_word = re.sub(r"[^a-z]", "", word.lower())
    if cleaned_word:
        return cleaned_word in indexed_ingredients.get(cleaned_word[0], [])
    return False


# input and output CSV files
input_csv_path = config("LOCAL_CSV")
output_csv_path = config("LOCAL_CSV_EXPORT")

with open(input_csv_path, "r", encoding="utf-8") as input_csv, open(
    output_csv_path, "w", newline="", encoding="utf-8"
) as output_csv:
    csv_reader = csv.DictReader(input_csv)

    # define output CSV
    fieldnames = [
        "#",
        "Title",
        "Ingredients",
        "Ingredients_Set",
        "Instructions",
        "Image_Name",
    ]
    csv_writer = csv.DictWriter(output_csv, fieldnames=fieldnames)
    csv_writer.writeheader()

    for row in csv_reader:
        ingredients = row["Ingredients"]
        words = ingredients.split()

        # filter valid ingredients
        valid_ingredients = [
            cleaned_word
            for word in words
            if (
                (cleaned_word := re.sub(r"[^a-z]", "", word.lower()))
                and (cleaned_word in indexed_ingredients.get(cleaned_word[0], []))
            )
        ]

        # write to new CSV
        valid_ingredients = list(set(valid_ingredients))
        row["Ingredients_Set"] = valid_ingredients
        del row["Cleaned_Ingredients"]
        csv_writer.writerow(row)

print("Processing complete. The output CSV file is saved at:", output_csv_path)
