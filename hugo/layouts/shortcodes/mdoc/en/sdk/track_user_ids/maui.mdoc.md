Adding user information to your RUM sessions helps you:
* Follow the journey of a given user
* Identify which users are most impacted by errors
* Monitor performance for your most important users

| Attribute | Type | Description |
|---|---|---|
| `usr.id` | String | (Required) Unique user identifier. |
| `usr.name` | String | (Optional) User friendly name, displayed by default in the RUM UI. |
| `usr.email` | String | (Optional) User email, displayed in the RUM UI when the user name isn't present. |

```csharp
// Set the user (id is required)
DdSdk.SetUserInfo("user-123", "Jane Doe", "jane@example.com",
    new Dictionary<string, object> { { "plan", "premium" } });

// Append extra fields to the user later (merges with what's already there)
DdSdk.AddUserExtraInfo(new Dictionary<string, object> { { "subscription", "annual" } });

// Clear the user (for example, on sign-out)
DdSdk.ClearUserInfo();
```
