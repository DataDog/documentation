## Set user information

{% img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="User attributes of a session in the RUM UI" /%}

| Attribute   | Type   | Description                                                                     |
| ----------- | ------ | ------------------------------------------------------------------------------- |
| `usr.id`    | String | (Required) Unique user identifier.                                              |
| `usr.name`  | String | (Optional) User friendly name, displayed by default in the RUM UI.              |
| `usr.email` | String | (Optional) User email, displayed in the RUM UI if the user name is not present. |

To identify user sessions, use the `setUserInfo` API, for example:

```kotlin
Datadog.setUserInfo("1234", "John Doe", "john@doe.com")
```

## Add user properties

To append extra properties to the user information you already set, use the `addUserExtraInfo` API:

```kotlin
Datadog.addUserExtraInfo(mapOf("plan" to "premium"))
```

## Set account information

If your application is used by organizations, workspaces, or tenants, add account information to your RUM sessions to:

* Analyze performance and errors by account
* Know which accounts are the most impacted by an issue
* Prioritize fixes based on account value

Add account information in addition to user information. It does not replace user information.

The SDK reports these attributes:

| Attribute      | Type   | Description                                                 |
| -------------- | ------ | ----------------------------------------------------------- |
| `account.id`   | String | (Required) Unique account identifier.                       |
| `account.name` | String | (Optional) Friendly name for the account, displayed in the RUM UI.  |

To identify accounts, use the `setAccountInfo` API. For example:

```kotlin
Datadog.setAccountInfo("acct-1234", "Acme Corp", mapOf("tier" to "enterprise"))
```

Keys passed in `extraInfo` are added to the `account` attribute, so `tier` is reported as `account.tier`.

To append attributes to the account you already set, use `addAccountExtraInfo`. Call `setAccountInfo` first. Adding extra info before an account exists has no effect.

```kotlin
Datadog.addAccountExtraInfo(mapOf("seats" to 42))
```

Account information is attached to RUM events and logs.

## Clear account information

To clear the account (for example, when the user signs out), use `clearAccountInfo`:

```kotlin
Datadog.clearAccountInfo()
```

{% alert level="info" %}
Clearing the account empties the `account` attribute on the active session and the active view. To retain the account on data already collected, stop the session with `GlobalRumMonitor.get().stopSession()` or the view with `GlobalRumMonitor.get().stopView()` before clearing.
{% /alert %}
