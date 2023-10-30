#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
from main_app.cache.redis_cache import test_redis_connection


def main():
    """Run administrative tasks."""
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "feedme.settings")

    if not test_redis_connection():
        print("Couldn't connect to Redis")
    else:
        print("Successfully connected to Redis")

    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
