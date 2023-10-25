from django.http import JsonResponse


def test_api(request):
    if request.method == "GET":
        return JsonResponse({"GET": "ok"})
    elif request.method == "POST":
        return JsonResponse({"POST": "ok"})
    else:
        return JsonResponse({"test": "Invalid request method"}, status=405)
