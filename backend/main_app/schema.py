import graphene
from graphene_django.types import DjangoObjectType
from data_import.models import Recipe
from .resolvers import resolve_recipe_by_id


class RecipeType(DjangoObjectType):
    class Meta:
        model = Recipe
        fields = "__all__"


class Query(graphene.ObjectType):
    all_recipes = graphene.List(RecipeType)
    recipe_by_id = graphene.Field(RecipeType, recipe_id=graphene.Int())

    def resolve_all_recipes(self, info):
        return Recipe.objects.all()

    def resolve_recipe_by_id(self, info, recipe_id):
        return resolve_recipe_by_id(self, info, recipe_id)


schema = graphene.Schema(query=Query)
