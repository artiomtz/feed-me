import csv
import urllib.request
from decouple import config
from django.core.management.base import BaseCommand
from ...models import Recipe
import io

num_csvs = int(config("CLOUDINARY_NUM_CSVS"))


class Command(BaseCommand):
    help = "Download and import CSV data"

    def handle(self, *args, **options):
        download_and_import_csv()


def download_and_import_csv():
    for i in range(1, num_csvs + 1):
        csv_url = config(f"CLOUDINARY_CSV_{i}")
        print(f"Initiating importing of CSV {i}")

        with urllib.request.urlopen(csv_url) as response:
            csv_data = response.read().decode("utf-8")

        if csv_data:
            csv_reader = csv.DictReader(io.StringIO(csv_data))

            for row in csv_reader:
                try:
                    Recipe.objects.create(
                        title=row["Title"],
                        ingredients=row["Ingredients"],
                        instructions=row["Instructions"],
                        image_name=row["Image_Name"],
                        ingredients_set="",
                    )
                except Exception:
                    print(f"Error creating Recipe")

            print(f"Finished importing CSV {i}")

        else:
            print(f"Failed to download CSV")
