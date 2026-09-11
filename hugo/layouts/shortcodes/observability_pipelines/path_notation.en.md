For this log structure example:

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

Follow these reference rules:
- Use `outer_key.inner_key` to reference the key with the value `inner_value`.
- Use `outer_key.a.double_inner_key` to reference the key with the value `double_inner_value`.
