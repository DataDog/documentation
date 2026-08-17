### Manual resource collection

The C++ and C SDKs don't instrument an HTTP client automatically. Track resources by starting and stopping them around the network operation. Each resource is identified by a `key` string that must be unique among all concurrently active resources; this is how `StopResource` and `StopResourceWithError` identify which request has completed.

{% tabs %}
{% tab label="C++" %}

```cpp
// Record the start of an HTTP request
rum->StartResource("req-profile", datadog::RumResourceMethod::Get,
                   "https://api.example.com/profile");

// When the response arrives, record completion
rum->StopResource("req-profile", /*status_code=*/200, /*size=*/response_body_size,
                  datadog::RumResourceType::Native);

// If the request fails (no valid response received):
// rum->StopResourceWithError("req-profile", "Connection timeout",
//                            "NetworkError", /*stack=*/"", /*is_network=*/true);
```

{% /tab %}
{% tab label="C" %}

```c
/* Record the start of an HTTP request */
dd_rum_start_resource(rum, "req-profile", DD_RUM_RESOURCE_METHOD_GET,
                      "https://api.example.com/profile", NULL);

/* When the response arrives, record completion */
dd_rum_stop_resource(rum, "req-profile", 200, response_body_size,
                     DD_RUM_RESOURCE_TYPE_NATIVE, NULL);

/* If the request fails (no valid response received):
dd_rum_stop_resource_with_error(rum, "req-profile", "Connection timeout",
                                "NetworkError", "", true, 0, NULL); */
```

{% /tab %}
{% /tabs %}

Use `StopResourceWithError` instead of `StopResource` when the request fails due to a network error or when processing the response produces an error.
