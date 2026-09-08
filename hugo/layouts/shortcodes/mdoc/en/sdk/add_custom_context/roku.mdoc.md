After your Roku channel is instrumented with RUM, you can further enrich user session information and gain finer control over the attributes collected by tracking custom events.

In addition to the default RUM attributes captured by the RUM Roku SDK automatically, you can choose to add additional contextual information, such as custom attributes, to your RUM events to enrich your observability within Datadog. Custom attributes allow you to filter and group information about observed user behavior (such as cart value, merchant tier, or ad campaign) with code-level information (such as backend services, session timeline, error logs, or network health).

### Identifying your users

See [Track user IDs](/real_user_monitoring/setup/enable_rum/manage_sessions/?platform=roku) for instructions on adding user information to your RUM sessions.

### Track custom global attributes

In addition to the default attributes captured by the SDK automatically, you can choose to add additional contextual information, such as custom attributes, to your Logs and RUM events to enrich your observability within Datadog. Custom attributes allow you to filter and group information about observed user behavior (for example by cart value, merchant tier, or ad campaign) with code-level information (such as backend services, session timeline, error logs, and network health).

```text
    m.global.setField("datadogContext", { foo: "Some value", bar: 123})
```
