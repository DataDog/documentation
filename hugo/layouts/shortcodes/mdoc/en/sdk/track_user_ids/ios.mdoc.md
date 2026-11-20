### Track user sessions

Adding user information to your RUM sessions makes it possible to:

* Follow the journey of a given user
* Know which users are the most impacted by errors
* Monitor performance for your most important users

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

You can use the `Datadog.addUserExtraInfo(_:)` API to append extra user properties to previously set properties.

```swift
import DatadogCore

Datadog.addUserExtraInfo(["company": "Foo"])
```

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/application_monitoring/ios
