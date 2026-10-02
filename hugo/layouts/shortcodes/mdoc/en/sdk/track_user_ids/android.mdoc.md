{% img src="real_user_monitoring/browser/advanced_configuration/user-api-1.png" alt="User attributes of a session in the RUM UI" /%}

| Attribute   | Type   | Description                                                                     |
| ----------- | ------ | ------------------------------------------------------------------------------- |
| `usr.id`    | String | (Required) Unique user identifier.                                              |
| `usr.name`  | String | (Optional) User friendly name, displayed by default in the RUM UI.              |
| `usr.email` | String | (Optional) User email, displayed in the RUM UI if the user name is not present. |

To identify user sessions, use the `setUserInfo` API, for example:

```kotlin
Datadog.setUserInfo("1234", "John Doe", "john@doe.com")
```
