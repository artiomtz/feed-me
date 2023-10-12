from data_import.models import Recipe


def resolve_recipe_by_id(root, info, recipe_id):
    try:
        return Recipe.objects.get(pk=recipe_id)
    except Recipe.DoesNotExist:
        return None
