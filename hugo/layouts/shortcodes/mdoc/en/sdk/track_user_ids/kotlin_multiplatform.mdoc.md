### Track user sessions

Adding user information to your RUM sessions helps you to:
* Follow the journey of a given user
* Know which users are the most impacted by errors
* Monitor performance for your most important users

{% img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="User API in RUM UI" /%}

| Attribute   | Type   | Description                                                                     |
| ----------- | ------ | ------------------------------------------------------------------------------- |
| `usr.id`    | String | (Required) Unique user identifier.                                              |
| `usr.name`  | String | (Optional) User friendly name, displayed by default in the RUM UI.              |
| `usr.email` | String | (Optional) User email, displayed in the RUM UI if the user name is not present. |

To identify user sessions, use the `setUserInfo` API, for example:

```kotlin
Datadog.setUserInfo('1234', 'John Doe', 'john@doe.com')
```

### Add user properties

You can use the `addUserExtraInfo` API to append extra user properties to previously set properties.

```kotlin
Datadog.addUserExtraInfo(extraInfo)
```

[1]: https://app.datadoghq.com/rum/application/create
[3]: /real_user_monitoring/application_monitoring/kotlin_multiplatform/data_collected
