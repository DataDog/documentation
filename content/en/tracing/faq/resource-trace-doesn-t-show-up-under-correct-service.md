---
title: Resource/Trace doesn't show up under correct service
kind: faq
---

When using a custom instrumentation of your application, if you notice any resources/traces in the Datadog UI that aren't coupled the service you expect, the most likely scenario is explained below.

A [resource][1] is connected to a [service][2] by more than the service Name - it is also done via the Name of the top-level [span][3] of the [trace][4]. This means that a service requires a top level name to be consistent across your resources.  
See this in the following image in the address bar:

{{< img src="tracing/faq/APM_service_name.png" alt="APM service Name" responsive="true" >}}

1. The service name that is defined for all of these resources (The name selected from the services page in the UI).

2. The top level name that was applied for each resource during custom instrumentation.

If any resource displays in the UI under another service, despite having the same service name, it is important to ensure that the top level name is the same as the other resources within the expected service.

For example, if you have a resource with a service named `tornado-notification` with a top level name of `tornado.notify`, any resource that had both this service Name and top level Name applied would display under this service. However, if you have a resource that has a service name of `tornado-notification` with a top level name of `web_identification`, this resource won't be available under the existing `tornado-notification` | `tornado.notify` service in the UI.

These resources, with a top level name of `web_identification` still appear in the Datadog Application, and can be viewed under the traces section of the APM navigation menu.  

An example of modifying the top level name for Python can be found below:

```
   @tracer.wrap('tornado.notify', 
                service='tornado-notification', 
                resource='MainHandler.do_something')
    @tornado.gen.coroutine
    def do_something(self):
        # do something
```

This function explicitly sets both the service name and Top Level Name, being `tornado-notification` and `tornado.notify` respectively.

Also note that the resource name is set manually, `MainHandler.do_something`. 

By default the resource name would be set to this as it's the name of the function and the class for which it lives under in Tornado.

More examples and documentation can be found on our language-specific instrumentation documentation pages:

{{< whatsnext desc="Select one of the following supported languages:">}}
    {{< nextlink href="tracing/setup/java" tag="Java" >}}Java language instrumentation.{{< /nextlink >}}
    {{< nextlink href="tracing/setup/cpp" tag="C++" >}}C++ language instrumentation.{{< /nextlink >}}
    {{< nextlink href="tracing/setup/python" tag="Python" >}}Python language instrumentation.{{< /nextlink >}}
    {{< nextlink href="tracing/setup/ruby" tag="Ruby" >}}Ruby language instrumentation{{< /nextlink >}}
    {{< nextlink href="tracing/setup/go" tag="Go" >}}Go language instrumentation.{{< /nextlink >}}
    {{< nextlink href="tracing/setup/nodejs" tag="Nodejs" >}}Node.js language instrumentation.{{< /nextlink >}}
    {{< nextlink href="tracing/setup/dotnet" tag=".NET" >}}.NET language instrumentation.{{< /nextlink >}}
    {{< nextlink href="tracing/setup/php" tag="PHP" >}}PHP language instrumentation.{{< /nextlink >}}
{{< /whatsnext >}}

## OpenTracing Top Level Spans

To fix this when using OpenTracing, set the resource name to ensure that your resources are unique while sharing one consistent operation name for a service.

In Java, this can be done by setting `DDTags.RESOURCE_NAME` from import `datadog.trace.api.DDTags`.

[1]: /tracing/visualization/#resources
[2]: /tracing/visualization/#services
[3]: /tracing/visualization/#spans
[4]: /tracing/visualization/#trace
