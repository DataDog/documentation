In addition to the [default RUM attributes][1] captured by the Datadog Unity SDK automatically, you can choose to add additional contextual information (such as custom attributes) to your RUM events to enrich your observability within Datadog.

Custom attributes allow you to filter and group information about observed user behavior (such as the cart value, merchant tier, or ad campaign) with code-level information (such as backend services, session timeline, error logs, and network health).

### Set a custom global attribute

To set a custom global attribute, use `DdRum.AddAttribute`.

* To add or update an attribute, use `DdRum.AddAttribute`.
* To remove the key, use `DdRum.RemoveAttribute`.

### Track user sessions

See [Track user IDs](/real_user_monitoring/setup/enable_rum/manage_sessions/?platform=unity) for instructions on adding user information to your RUM sessions.

### Add custom user attributes

You can add custom attributes to your user session. This additional information is automatically applied to logs, traces, and RUM events.

To remove an existing attribute, set it to `null`.

For example:

```csharp
DatadogSdk.Instance.AddUserExtraInfo(new ()
{
 { "attribute_1", "foo" },
 { "attribute_2", null },
});
```

[1]: /real_user_monitoring/setup/data_collected/?platform=unity
