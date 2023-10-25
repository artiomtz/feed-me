from django.http import JsonResponse


def test_api(request):
    data = {"test": "ok"}
    return JsonResponse(data)
