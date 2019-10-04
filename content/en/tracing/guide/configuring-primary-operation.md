---
title: Primary Operations in Services
kind: guide
---

## Services in APM

APM Services calculate trace metrics for errors, throughput and latency are calculated based on resources that match a single span name, deemed the primary operation. These service metrics are used throughout the product, both as the default Service Page, in the Service List, and the Service Map. 

** Note: Trace Metrics can be queried based on their `trace.*` [namespace][1]. 

## Defining a Primary Operation for a Service

The primary operation name of a service determines how a service is represented in the UI. Our backend automatically selects an operation name that is deemed the entry-point into the service based on the throughput of requests. 

As an example, a `web-store` service can have multiple endpoints which will be instrumented as resources. These resources will then share the same primary operation  as the entry-point into these resources is consistent, i.e. the resources `/user/home` and `/user/new` should both have the same primary operation `web.request`. In different languages a primary operation for a service may look like:

| Service-type                 | Primary Operation   | 
|------------------------------|---------------------|
| web                          | ex. `servlet.request`, `flask.request`, `web.request`    | 
| DB                           | `postgres.query`, `db.query`       |
| custom-instrumentation       | `trace.annotation`, `method.call`| 

## Configuring the Primary Operation

When there are multiple primary operations defined for a Service the default is determined by the highest request throughput. To override this behavior, you can adjust the span name that is reflected as the entry-point to the service [in-app][2].

{{< img src="tracing/guide/primary_operation/configuring-primary.png" alt="APM save" responsive="true" >}}

** Note: You must be an admin user in your Datadog account to  adjust this setting.

## Viewing Stats for Additional Span Names

To ensure that all traces are being sent to Datadog correctly outside of any instrumentation, you can view your resources by additional span names that are considered a secondary operation with a drop-down menu, however these will not be used to calculate service-level stats. This will not change the Service statistics.

{{< img src="tracing/guide/primary_operation/dropdown.gif" alt="APM save" responsive="true" >}}

## Configuring the Primary Operation in Manual Instrumentation

When manually instrumenting your code, to ensure that resources will be grouped together with the same primary operation, confirm that the span name is not being dynamically set but rather statically (i.e.`web.request`). If the span is being named dynamically, this should be set as the Resource.

An example of modifying the primary operation for Python can be found below:

```
  @tracer.wrap('tornado.notify', 
                service='tornado-notification', 
                resource='MainHandler.do_something')
    @tornado.gen.coroutine
    def do_something(self):
        # do something
```

This function explicitly sets both the service name and primary operation, being `tornado-notification` and `tornado.notify` respectively.

Also note that the resource name is set manually, `MainHandler.do_something`.

By default the resource name would be set to this as it’s the name of the function and the class for which it lives under in Tornado.

## OpenTracing Primary Operations

When using Datadog, the Opentracing operation name is what is called resource in Datadog terminology and the Opentracing "component" tag is Datadog's span name. Meaning that in order to define (in Opentracing terms) a span that has the resource "/user/profile" and the span name "http.request", in Go for example you would do the below:

```
opentracing.StartSpan("http.request", opentracer.ResourceName("/user/profile"))
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /tracing/getting_further/metrics_namespace/
[2]: https://app.datadoghq.com/apm/settings
