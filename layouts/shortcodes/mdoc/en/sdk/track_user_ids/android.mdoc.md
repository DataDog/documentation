### Track user sessions

Adding user information to your RUM sessions makes it possible to:
* Follow the journey of a given user
* Know which users are the most impacted by errors
* Monitor performance for your most important users

{% img src="real_user_monitoring/browser/advanced_configuration/user-api-1.png" alt="User attributes of a session in the RUM UI" /%}

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

You can use the `addUserProperties` API to append extra user properties to previously set properties.

```kotlin
fun addUserProperties(extraInfo: Map<String, Any?>, sdkCore: SdkCore = getInstance()) {
    sdkCore.addUserProperties(extraInfo)
}
```

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/android
[3]: /real_user_monitoring/android/data_collected
