import graphene
from graphene_django.types import DjangoObjectType
from data_import.models import Recipe
from .resolvers import resolve_recipe_by_id, resolve_possible_recipes


class RecipeType(DjangoObjectType):
    class Meta:
        model = Recipe
        fields = "__all__"


class Query(graphene.ObjectType):
    all_recipes = graphene.List(RecipeType)
    recipe_by_id = graphene.Field(RecipeType, recipe_id=graphene.Int())
    possible_recipes = graphene.List(
        RecipeType, ingredients=graphene.List(graphene.String)
    )

    def resolve_all_recipes(self, info):
        return Recipe.objects.all()

    def resolve_recipe_by_id(self, info, recipe_id):
        return resolve_recipe_by_id(self, info, recipe_id)

    def resolve_possible_recipes(self, info, ingredients):
        return resolve_possible_recipes(self, info, ingredients)


schema = graphene.Schema(query=Query)
