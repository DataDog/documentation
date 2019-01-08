---
title: Resource/Trace doesn't show up under correct service
kind: faq
---

When using a custom instrumentation of your application, if you notice any resources/traces in the Datadog UI that aren't coupled the service you expect, the most likely scenario is explained below.

A resource is connected to a service by more than the service Name - it is also done via the Name of the [top-level span][1] of the trace. This means that a service requires a [top-level span][1] name to be consistent across your resources.  
See this in the following image in the address bar:

{{< img src="tracing/faq/APM_service_name.png" alt="APM service Name" responsive="true" >}}

1. The service name that is defined for all of these resources (The name selected from the services page in the UI).

2. The [top-level span][1] name that was applied for each resource during custom instrumentation.

If any resource displays in the UI under another service, despite having the same service name, it is important to ensure that the [top-level span][1] name is the same as the other resources within the expected service.

For example, if you have a resource with a service named `tornado-notification` with a [top-level span][1] name of `tornado.notify`, any resource that had both this service Name and [top-level span][1] Name applied would display under this service. However, if you have a resource that has a service name of `tornado-notification` with a [top-level span][1] name of `web_identification`, this resource won't be available under the existing `tornado-notification` | `tornado.notify` service in the UI.

These resources, with a [top-level span][1] name of `web_identification` still appear in the Datadog Application, and can be viewed under the traces section of the APM navigation menu.  

An example of modifying the [top-level span][1] name for Python can be found below:

```
   @tracer.wrap('tornado.notify', service='tornado-notification')
    @tornado.gen.coroutine
    def notify(self):
        # do something
```

This function explicitly sets both the service name and [top-level span][1] Name, being `tornado-notification` and `tornado.notify` respectively.

More examples and documentation can be found on our language-specific instrumentation documentation pages:

{{< whatsnext desc="Select one of the following supported languages:">}}
    {{< nextlink href="tracing/languages/java" tag="Java" >}}Java language instrumentation.{{< /nextlink >}}
    {{< nextlink href="tracing/languages/cpp" tag="C++" >}}C++ language instrumentation.{{< /nextlink >}}
    {{< nextlink href="tracing/languages/python" tag="Python" >}}Python language instrumentation.{{< /nextlink >}}
    {{< nextlink href="tracing/languages/ruby" tag="Ruby" >}}Ruby language instrumentation{{< /nextlink >}}
    {{< nextlink href="tracing/languages/go" tag="Go" >}}Go language instrumentation.{{< /nextlink >}}
    {{< nextlink href="tracing/languages/nodejs" tag="Nodejs" >}}Node.js language instrumentation.{{< /nextlink >}}
    {{< nextlink href="tracing/languages/dotnet" tag=".NET" >}}.NET language instrumentation.{{< /nextlink >}}
    {{< nextlink href="tracing/languages/php" tag="PHP" >}}PHP language instrumentation.{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /tracing/getting_further/top_level_span
