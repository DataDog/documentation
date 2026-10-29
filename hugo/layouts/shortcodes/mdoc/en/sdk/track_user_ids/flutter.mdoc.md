{% img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="User API in the RUM UI" style="width:90%" /%}

## Set user information

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

## Add user properties

You can add custom attributes to your user session. This additional information is automatically applied to logs, traces, and RUM events.

To remove an existing attribute, set it to `null`.

For example:

```dart
DatadogSdk.instance.addUserExtraInfo({
 'attribute_1': 'foo',
 'attribute_2': null,
});
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

To identify accounts, use `DatadogSdk.setAccountInfo`.

For example:

```dart
DatadogSdk.instance.setAccountInfo(
  id: 'acct-1234',
  name: 'Acme Corp',
  extraInfo: {'tier': 'enterprise'},
);
```

Keys passed in `extraInfo` are added to the `account` attribute, so `tier` is reported as `account.tier`.

To append attributes to the account you already set, use `addAccountExtraInfo`. Call `setAccountInfo` first. Adding extra info before an account exists has no effect. To remove an existing attribute, set it to `null`.

```dart
DatadogSdk.instance.addAccountExtraInfo({
  'seats': 42,
});
```

Account information is attached to RUM events, logs, and traces.

## Clear account information

To clear the account (for example, when the user signs out), use `clearAccountInfo`.

```dart
DatadogSdk.instance.clearAccountInfo();
```

{% alert level="info" %}
Clearing the account empties the `account` attribute on the active session and the active view. To retain the account on data already collected, stop the session with `DatadogRum.stopSession` or the view with `DatadogRum.stopView` before clearing.
{% /alert %}
