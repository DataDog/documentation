| Attribute   | Type   | Description                                                                     |
| ----------- | ------ | ------------------------------------------------------------------------------- |
| `usr.id`    | String | (Required) Unique user identifier.                                              |
| `usr.name`  | String | (Optional) User friendly name, displayed by default in the RUM UI.              |
| `usr.email` | String | (Optional) User email, displayed in the RUM UI if the user name is not present. |

To identify user sessions, use the `datadogUserInfo` global field, after initializing the SDK, for example:

```text
    m.global.setField("datadogUserInfo", { id: 42, name: "Abcd Efg", email: "abcd.efg@example.com"})
```
