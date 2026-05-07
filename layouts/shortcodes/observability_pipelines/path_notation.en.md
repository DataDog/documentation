To understand path notation, consider the following log structure:

```json
{
    "outer_key": {
        "inner_key": "inner_value",
        "a": {
            "double_inner_key": "double_inner_value",
            "b": "b value"
        },
        "c": "c value"
    },
    "d": "d value"
}
```

In this example, use the following reference rules:
- Use `outer_key.inner_key` to reference the key with the value `inner_value`.
- Use `outer_key.a.double_inner_key` to reference the key with the value `double_inner_value`.

If you want to search for a literal `.` in the attribute key, wrap the key in escaped quotes in the search query. For example, the search query `"service.status":disabled` matches the event `{"service.status": "disabled"}`.
