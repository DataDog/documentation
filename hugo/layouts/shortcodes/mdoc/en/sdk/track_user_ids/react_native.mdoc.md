{% img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="User API in RUM UI" /%}

## Set user information

| Attribute   | Type   | Description                                                                     |
| ----------- | ------ | ------------------------------------------------------------------------------- |
| `usr.id`    | String | (Required) Unique user identifier.                                              |
| `usr.name`  | String | (Optional) User friendly name, displayed by default in the RUM UI.              |
| `usr.email` | String | (Optional) User email, displayed in the RUM UI if the user name is not present. |
| `usr.extraInfo` | Object | (Optional) Include custom attributes such as subscription type, any user specific information that enhance user context in RUM sessions. |

To identify user sessions, use the `setUserInfo` API, for example:

```js
DdSdkReactNative.setUserInfo({
    id: '1337',
    name: 'John Smith',
    email: 'john@example.com',
    extraInfo: {
        type: 'premium'
    }
});
```

## Add user properties

To add or update user information, use `addUserExtraInfo` to modify the existing user's details:

```js
DdSdkReactNative.addUserExtraInfo({
    hasPaid: 'true'
});
```

## Clear user information

To clear the user information (for example, when the user signs out), call the `clearUserInfo` API:

```js
DdSdkReactNative.clearUserInfo();
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

```js
DdSdkReactNative.setAccountInfo({
    id: 'acct-1234',
    name: 'Acme Corp',
    extraInfo: {
        tier: 'enterprise'
    }
});
```

Keys passed in `extraInfo` are added to the `account` attribute, so `tier` is reported as `account.tier`.

To append attributes to the account you already set, use `addAccountExtraInfo`. Call `setAccountInfo` first. If no account is set, the SDK ignores the additional account information and logs a warning.

```js
DdSdkReactNative.addAccountExtraInfo({
    seats: 42
});
```

Account information is attached to RUM events, logs, and traces.

## Clear account information

To clear the account information (for example, when the user signs out), use `clearAccountInfo`:

```js
DdSdkReactNative.clearAccountInfo();
```

{% alert level="info" %}
Clearing the account empties the `account` attribute on the active session and the active view. To retain the account on data already collected, stop the session or the view before clearing.
{% /alert %}
