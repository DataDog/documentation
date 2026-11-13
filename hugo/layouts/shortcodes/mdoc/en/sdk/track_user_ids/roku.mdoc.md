## Set user information

| Attribute   | Type   | Description                                                                     |
| ----------- | ------ | ------------------------------------------------------------------------------- |
| `usr.id`    | String | (Required) Unique user identifier.                                              |
| `usr.name`  | String | (Optional) User friendly name, displayed by default in the RUM UI.              |
| `usr.email` | String | (Optional) User email, displayed in the RUM UI if the user name is not present. |

To identify user sessions, set the `datadogUserInfo` global field after initializing the SDK. For example:

```text
    m.global.setField("datadogUserInfo", { id: 42, name: "Abcd Efg", email: "abcd.efg@example.com"})
```

## Add user properties

The Roku SDK doesn't provide a separate API to add user properties. To update the user information, set the `datadogUserInfo` field again with the complete set of values.

## Clear user information

The Roku SDK doesn't provide an API to clear user information.
