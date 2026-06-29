### Track user sessions

Adding user information to your RUM sessions makes it possible to:

* Follow the journey of a given user
* Know which users are the most impacted by errors
* Monitor performance for your most important users

{% img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="User API in the RUM UI" style="width:90%" /%}

| Attribute   | Type   | Description                                                                     |
| ----------- | ------ | ------------------------------------------------------------------------------- |
| `usr.id`    | String | (Required) Unique user identifier.                                              |
| `usr.name`  | String | (Optional) User friendly name, displayed by default in the RUM UI.              |
| `usr.email` | String | (Optional) User email, displayed in the RUM UI if the user name is not present. |

To identify user sessions, use `DatadogSdk.setUserInfo`.

For example:

```dart
DatadogSdk.instance.setUserInfo("1234", "John Doe", "john@doe.com");
```

### Add custom user attributes

You can add custom attributes to your user session. This additional information is automatically applied to logs, traces, and RUM events.

To remove an existing attribute, set it to `null`.

For example:

```dart
DatadogSdk.instance.addUserExtraInfo({
 'attribute_1': 'foo',
 'attribute_2': null,
});
```

[1]: https://app.datadoghq.com/rum/application/create
[14]: /real_user_monitoring/application_monitoring/flutter/data_collected
