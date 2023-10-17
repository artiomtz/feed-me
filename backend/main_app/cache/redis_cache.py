from django.core.cache import cache


def get_cached_data(key):
    return cache.get(key)


def cache_data(key, data, timeout=None):
    return cache.set(key, data, timeout)
