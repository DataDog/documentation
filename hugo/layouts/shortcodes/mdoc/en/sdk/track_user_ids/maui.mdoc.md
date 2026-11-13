## Set user information

| Attribute | Type | Description |
|---|---|---|
| `usr.id` | String | (Required) Unique user identifier. |
| `usr.name` | String | (Optional) User friendly name, displayed by default in the RUM UI. |
| `usr.email` | String | (Optional) User email, displayed in the RUM UI when the user name isn't present. |

```csharp
// Set the user (id is required)
DdSdk.SetUserInfo("user-123", "Jane Doe", "jane@example.com",
    new Dictionary<string, object> { { "plan", "premium" } });
```

## Add user properties

To append extra fields to the current user, use `AddUserExtraInfo`. The fields merge with the existing user information.

```csharp
DdSdk.AddUserExtraInfo(new Dictionary<string, object> { { "subscription", "annual" } });
```

## Clear user information

To clear the user, for example on sign-out, use `ClearUserInfo`:

```csharp
DdSdk.ClearUserInfo();
```

## Set account information

For B2B applications, `DdSdk.SetAccountInfo` attaches an account identity to every event. Use it together with, not instead of, user information.

| Attribute      | Type   | Description                                                 |
| -------------- | ------ | ----------------------------------------------------------- |
| `account.id`   | String | (Required) Unique account identifier.                       |
| `account.name` | String | (Optional) Friendly name for the account, displayed in the RUM UI.  |

```csharp
DdSdk.SetAccountInfo("acct-456", "Acme Corp",
    new Dictionary<string, object> { { "tier", "enterprise" } });

DdSdk.AddAccountExtraInfo(new Dictionary<string, object> { { "region", "us-east" } });
```

Keys passed in the extra info dictionary are added to the `account` attribute, so `tier` is reported as `account.tier`. Call `SetAccountInfo` before `AddAccountExtraInfo`. Adding extra info before an account exists has no effect.

## Clear account information

To remove the account information, use `ClearAccountInfo`:

```csharp
DdSdk.ClearAccountInfo();
```
