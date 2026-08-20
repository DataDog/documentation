Adding user information to your RUM sessions makes it possible to:

* Follow the journey of a given user
* Know which users are most impacted by errors
* Monitor performance for your most important users

| Attribute | Type | Description |
| --- | --- | --- |
| `usr.id` | String | (Required) Unique user identifier. |
| `usr.name` | String | (Optional) User-friendly name, displayed by default in the Datadog UI. |
| `usr.email` | String | (Optional) User email, displayed in the UI when the user name is not present. |

To identify user sessions, call `SetUserInfo` on the core:

{% tabs %}
{% tab label="C++" %}

```cpp
core->SetUserInfo("1234", "John Doe", "john@doe.com");
```

{% /tab %}
{% tab label="C" %}

```c
dd_core_set_user_info(core, "1234", "John Doe", "john@doe.com", NULL);
```

{% /tab %}
{% /tabs %}

To add extra properties to the current user without replacing the existing user info, use `AddUserExtraInfo`. To remove all user information, call `ClearUserInfo`.
