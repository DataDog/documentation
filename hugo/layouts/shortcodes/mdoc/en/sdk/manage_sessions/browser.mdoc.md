Adding user information to your RUM sessions helps you:

- Follow the journey of a given user
- Know which users are the most impacted by errors
- Monitor performance for your most important users

{% img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="User API in RUM UI" /%}

| Attribute  | Type | Required |  Description                                                                                              |
|------------|------|------|----------------------------------------------------------------------------------------------------|
| `usr.id`    | String | Yes | Unique user identifier.                                                                                  |
| `usr.name`  | String | No | User friendly name, displayed by default in the RUM UI.                                                  |
| `usr.email` | String | No | User email, displayed in the RUM UI if the user name is not present. It is also used to fetch Gravatars. |

**Note**: 'Public User' is displayed in the RUM UI when `usr.name` is not set, even if `usr.email` and `usr.id` are defined.

### Identify user session

`datadogRum.setUser(<USER_CONFIG_OBJECT>)`

{% tabs %}
{% tab label="NPM" %}

```javascript
datadogRum.setUser({
    id: '1234',
    name: 'John Doe',
    email: 'john@doe.com',
    plan: 'premium',
    ...
})
```

{% /tab %}
{% tab label="CDN async" %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setUser({
        id: '1234',
        name: 'John Doe',
        email: 'john@doe.com',
        plan: 'premium',
        ...
    })
})
```

{% /tab %}
{% tab label="CDN sync" %}

```javascript
window.DD_RUM && window.DD_RUM.setUser({
    id: '1234',
    name: 'John Doe',
    email: 'john@doe.com',
    plan: 'premium',
    ...
})
```

{% /tab %}
{% /tabs %}

### Access user session

`datadogRum.getUser()`

{% tabs %}
{% tab label="NPM" %}

```javascript
datadogRum.getUser()
```

{% /tab %}
{% tab label="CDN async" %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.getUser()
})
```

{% /tab %}
{% tab label="CDN sync" %}

```javascript
window.DD_RUM && window.DD_RUM.getUser()
```

{% /tab %}
{% /tabs %}

### Add/Override user session property

`datadogRum.setUserProperty('<USER_KEY>', <USER_VALUE>)`

{% tabs %}
{% tab label="NPM" %}

```javascript
datadogRum.setUserProperty('name', 'John Doe')
```

{% /tab %}
{% tab label="CDN async" %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setUserProperty('name', 'John Doe')
})
```

{% /tab %}
{% tab label="CDN sync" %}

```javascript
window.DD_RUM && window.DD_RUM.setUserProperty('name', 'John Doe')
```

{% /tab %}
{% /tabs %}

### Remove user session property

`datadogRum.removeUserProperty('<USER_KEY>')`

{% tabs %}
{% tab label="NPM" %}

```javascript
datadogRum.removeUserProperty('name')
```

{% /tab %}
{% tab label="CDN async" %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeUserProperty('name')
})
```

{% /tab %}
{% tab label="CDN sync" %}

```javascript
window.DD_RUM && window.DD_RUM.removeUserProperty('name')
```

{% /tab %}
{% /tabs %}

### Clear user session property

`datadogRum.clearUser()`

{% tabs %}
{% tab label="NPM" %}

```javascript
datadogRum.clearUser()
```

{% /tab %}
{% tab label="CDN async" %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.clearUser()
})
```

{% /tab %}
{% tab label="CDN sync" %}

```javascript
window.DD_RUM && window.DD_RUM.clearUser()
```

{% /tab %}
{% /tabs %}

### Track unauthenticated users

For unauthenticated visitors or users who have not yet logged in, the RUM SDK automatically tracks activity using `usr.anonymous_id`. This lets you analyze user behavior without requiring authentication.

`usr.anonymous_id` is a randomly generated UUID (v4). It is not derived from any user PII, IP address, device fingerprint, or hardware identifier.

The ID has the following properties:

- **Lifetime**: Persists for up to one year across sessions in the Datadog session cookie (`_dd_s_v2`).
- **Scope**: Per-browser and per-domain. Incognito mode, cookie clearing, or switching browsers or devices produces a new `anonymous_id`.

The ID resets if the user revokes tracking consent with `setTrackingConsent('not-granted')` or clears cookies.

**Note**: `usr.anonymous_id` is enabled by default. To disable it, set [`trackAnonymousUser: false`](https://datadoghq.dev/browser-sdk/interfaces/_datadog_browser-rum.RumInitConfiguration.html#trackanonymoususer) in your `init` config.
