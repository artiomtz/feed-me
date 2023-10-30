from django.core.cache import cache

PING_TEST_KEY = "ping_test_key"


def get_cached_data(key):
    return cache.get(key)


def cache_data(key, data, timeout=None):
    return cache.set(key, data, timeout)


def test_redis_connection():
    try:
        cache_data(PING_TEST_KEY, "test", timeout=60)
        value = get_cached_data(PING_TEST_KEY)
        return value == "test"
    except Exception as e:
        return False
