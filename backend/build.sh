#!/usr/bin/env bash

set -o errexit

pip install -r requirements.txt

mkdir -p /opt/render/project/src/backend/staticfiles/

python manage.py collectstatic --no-input
python manage.py makemigrations
python manage.py migrate

python manage.py download_and_import_csv
