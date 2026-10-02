## Set user information

{% img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="User API in the RUM UI" /%}

| Attribute   | Type   | Description                                                                     |
| ----------- | ------ | ------------------------------------------------------------------------------- |
| `usr.id`    | String | (Required) Unique user identifier.                                              |
| `usr.name`  | String | (Optional) User friendly name, displayed by default in the RUM UI.              |
| `usr.email` | String | (Optional) User email, displayed in the RUM UI if the user name is not present. |

To identify user sessions, use the `Datadog.setUserInfo(id:name:email:)` API.

For example:

{% tabs %}
{% tab label="Swift" %}

```swift
import DatadogCore

Datadog.setUserInfo(id: "1234", name: "John Doe", email: "john@doe.com")
```

{% /tab %}
{% tab label="Objective-C" %}

```objective-c
[DDDatadog setUserInfoWithId:@"1234" name:@"John Doe" email:@"john@doe.com" extraInfo:@{}];
```

{% /tab %}
{% /tabs %}

## Add user properties

To append extra user properties to previously set properties, use the `Datadog.addUserExtraInfo(_:)` API.

```swift
import DatadogCore

Datadog.addUserExtraInfo(["company": "Foo"])
```

## Clear user information

To clear the user information (for example, when the user signs out), use the `Datadog.clearUserInfo()` API.

```swift
import DatadogCore

Datadog.clearUserInfo()
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

To identify accounts, use the `Datadog.setAccountInfo(id:name:extraInfo:)` API.

For example:

{% tabs %}
{% tab label="Swift" %}

```swift
import DatadogCore

Datadog.setAccountInfo(id: "acct-1234", name: "Acme Corp", extraInfo: ["tier": "enterprise"])
```

To append attributes to the account you already set, use `Datadog.addAccountExtraInfo(_:)`. Call `Datadog.setAccountInfo(id:name:extraInfo:)` first. Adding extra info before an account exists has no effect.

```swift
Datadog.addAccountExtraInfo(["seats": 42])
```

{% /tab %}
{% tab label="Objective-C" %}

```objective-c
[DDDatadog setAccountInfoWithAccountId:@"acct-1234" name:@"Acme Corp" extraInfo:@{@"tier": @"enterprise"}];
```

To append attributes to the account you already set, use `addAccountExtraInfo:`. Call `setAccountInfoWithAccountId:name:extraInfo:` first. Adding extra info before an account exists has no effect.

```objective-c
[DDDatadog addAccountExtraInfo:@{@"seats": @42}];
```

{% /tab %}
{% /tabs %}

Keys passed in `extraInfo` are added to the `account` attribute, so `tier` is reported as `account.tier`.

Account information is attached to RUM events, logs, traces, and crash reports.

## Clear account information

To clear the account (for example, when the user signs out), use `Datadog.clearAccountInfo()`.

{% tabs %}
{% tab label="Swift" %}

```swift
Datadog.clearAccountInfo()
```

{% /tab %}
{% tab label="Objective-C" %}

```objective-c
[DDDatadog clearAccountInfo];
```

{% /tab %}
{% /tabs %}

{% alert level="info" %}
Clearing the account empties the `account` attribute on the active session and the active view. To retain the account on data already collected, stop the session with `RUMMonitor.stopSession()` or the view with `stopView(viewController:attributes:)` before clearing.
{% /alert %}
