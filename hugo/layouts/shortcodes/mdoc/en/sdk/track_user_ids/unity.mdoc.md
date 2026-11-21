{% img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="User API in the RUM UI" style="width:90%" /%}

## Set user information

| Attribute   | Type   | Description                                                                     |
| ----------- | ------ | ------------------------------------------------------------------------------- |
| `usr.id`    | String | (Required) Unique user identifier.                                              |
| `usr.name`  | String | (Optional) User friendly name, displayed by default in the RUM UI.              |
| `usr.email` | String | (Optional) User email, displayed in the RUM UI if the user name is not present. |

To identify user sessions, use `SetUserInfo`. For example:

```csharp
DatadogSdk.Instance.SetUserInfo("1234", "John Doe", "john@doe.com");
```

## Add user properties

To add custom attributes to the current user, use `AddUserExtraInfo`. This additional information is automatically applied to logs, traces, and RUM events. To remove an existing attribute, set it to `null`.

```csharp
DatadogSdk.Instance.AddUserExtraInfo(new ()
{
 { "attribute_1", "foo" },
 { "attribute_2", null },
});
```

## Clear user information

The Unity SDK doesn't document a dedicated API to clear user information. To remove individual user properties, set them to `null` with `AddUserExtraInfo`.
