---
title: Primary Operations in Services
kind: guide
---

## Services in APM

APM Services calculate trace metrics for errors, throughput, and latency. These are calculated based on resources that match a single span name, deemed the primary operation. These service metrics are used throughout the product, both as the default Service Page, in the Service List, and the Service Map.

**Note**: Trace Metrics can be queried based on their `trace.*` [namespace][1].

## Defining a Primary Operation for a Service

The primary operation name of a service determines how that service is represented in the UI. Datadog backend automatically selects an operation name that is deemed the entry-point into the service based on the throughput of requests.

As an example, a `web-store` service can have multiple endpoints which are instrumented as resources. These resources then share the same primary operation because the entry-point into these resources is consistent. For example, the resources `/user/home` and `/user/new` should both have the same primary operation `web.request`. In different languages a primary operation for a service may look like:

| Service-type           | Primary Operation                                 |
| ---------------------- | ------------------------------------------------- |
| web                    | `servlet.request`, `flask.request`, `web.request` |
| db                     | `postgres.query`, `db.query`                      |
| custom-instrumentation | `trace.annotation`, `method.call`                 |

## Configuring the Primary Operation

When there are multiple primary operations defined for a Service, the highest request throughput determines the default. To override this behavior, adjust the span name that is reflected as the entry-point to the service [in-app][2].

{{< img src="tracing/guide/primary_operation/configuring-primary-option.png" alt="APM save" responsive="true" >}}

**Note**: You must be an admin user in your Datadog account to  adjust this setting.

## Viewing Stats for Additional Span Names

To ensure that all traces are being sent to Datadog correctly outside of any instrumentation, you can view your resources by additional span names that are considered a secondary operation with a drop-down menu. However, these are not used to calculate service-level statistics.

{{< img src="tracing/guide/primary_operation/dropdown.gif" alt="APM save" responsive="true" >}}

## Configuring the Primary Operation in Manual Instrumentation

When manually instrumenting your code, statically set the span name to ensure that your resources are grouped with the same primary operation (for example, `web.request`). If the span is being named dynamically, set it as the resource.

Modify the primary operation for Python:

```
  @tracer.wrap('tornado.notify',
                service='tornado-notification',
                resource='MainHandler.do_something')
    @tornado.gen.coroutine
    def do_something(self):
        # do something
```

This function explicitly sets both the service name and primary operation, being `tornado-notification` and `tornado.notify`, respectively.

Also note that the resource name is set manually, `MainHandler.do_something`.

By default, the resource name would be set to this as it’s the name of the function and the class for which it lives under in Tornado.

## OpenTracing Primary Operations

When using Datadog, the Opentracing operation name is a resource and the Opentracing "component" tag is Datadog's span name. To define (in Opentracing terms) a span that has the resource "/user/profile", and the span name "http.request", use this Go example:

```
opentracing.StartSpan("http.request", opentracer.ResourceName("/user/profile"))
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/getting_further/metrics_namespace
[2]: https://app.datadoghq.com/apm/settings
