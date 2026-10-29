## Set user information

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

## Add user properties

To add extra properties to the current user without replacing the existing user information, call `AddUserExtraInfo` on the core.

## Clear user information

To remove all user information, for example when the user signs out, call `ClearUserInfo` on the core.

## Set account information

To associate an account (such as an organization, workspace, or tenant) with the current session, call `SetAccountInfo` on the core.

| Attribute | Type | Description |
| --- | --- | --- |
| `account.id` | String | (Required) Unique account identifier. |
| `account.name` | String | (Optional) Account name, displayed in the Datadog UI. |

{% tabs %}
{% tab label="C++" %}

```cpp
core->SetAccountInfo("org-456", "Acme Corp");
```

{% /tab %}
{% tab label="C" %}

```c
dd_core_set_account_info(core, "org-456", "Acme Corp", NULL);
```

{% /tab %}
{% /tabs %}

To merge additional properties into the current account, call `AddAccountExtraInfo`.

## Clear account information

To remove all account information, call `ClearAccountInfo` on the core.
