### Track user sessions

Adding user information to your RUM sessions makes it possible to:
* Follow the journey of a given user
* Know which users are the most impacted by errors
* Monitor performance for your most important users

{% img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="User API in RUM UI" /%}

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

If you want to add or update user information, you can use the following code to modify the existing user's details.

```js
DdSdkReactNative.addUserExtraInfo({
    hasPaid: 'true'
});
```

If you want to clear the user information (for example, when the user signs out), you can do so by calling the `clearUserInfo` API:

```js
DdSdkReactNative.clearUserInfo();
```

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/application_monitoring/react_native
