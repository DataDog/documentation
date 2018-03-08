---
title: Resource/Trace doesn't show up under correct Service
kind: faq
---

When using a custom instrumentation of your application, if you notice any Resources/Traces in the Datadog UI that aren’t coupled the Service you expect, the most likely scenario is explained below.

A Resource is connected to a Service by more than the Service Name - it is also done via the Name of the top-level span of the trace. This means that a Service requires a top level name to be consistent across your resources.  
See this in the following image in the address bar:

{{< img src="tracing/faq/APM_service_name.png" alt="APM Service Name" responsive="true" popup="true">}}

1. The Service name that is defined for all of these Resources (The name selected from the Services page in the UI).

2. The top level name that was applied for each Resource during custom instrumentation.

If any Resource displays in the UI under another Service, despite having the same Service name, it is important to ensure that the top level name is the same as the other Resources within the expected Service.

For example, if you have a Resource with a Service named tornado-notification with a top level name of tornado.notify, any Resource that had both this Service Name and top level Name applied would display under this Service. However, if you have a Resource that has a Service name of tornado-notification with a top level name of web_identification, this Resource won’t be available under the existing tornado-notification | tornado.notify Service in the UI.

These Resources, with a top level name of web_identification still appear in the Datadog Application, and can be viewed under the Traces section of the APM navigation menu.

An example of modifying the top level name for Python can be found below:

```
   @tracer.wrap('tornado.notify', service='tornado-notification')
    @tornado.gen.coroutine
    def notify(self):
        # do something
```

This function explicitly sets both the Service name and Top Level Name, being tornado-notification and tornado.notify respectively

More examples and documentation can be found on our public docs pages [for the language of your choice](/tracing/languages).