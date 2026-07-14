### Track custom global attributes

In addition to the default attributes captured by the SDK automatically, you can choose to add additional contextual information, such as custom attributes, to your Logs and RUM events to enrich your observability within Datadog. Custom attributes allow you to filter and group information about observed user behavior (for example by cart value, merchant tier, or ad campaign) with code-level information (such as backend services, session timeline, error logs, and network health).

```text
    m.global.setField("datadogContext", { foo: "Some value", bar: 123})
```

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/application_monitoring/roku/setup
