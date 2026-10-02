To configure tracking consent, see [Configure tracking consent](/real_user_monitoring/setup/install/?platform=browser#configure-tracking-consent-gdpr-compliance).

## Access the internal context

After the RUM Browser SDK is initialized, you can access the internal context of the SDK. This provides core identifiers and metadata that the SDK uses internally, such as session IDs and application details.

You can explore the following attributes:

| Attribute      | Description                                                       |
| -------------- | ----------------------------------------------------------------- |
| application_id | ID of the application.                                            |
| session_id     | ID of the session.                                                |
| user_action    | Object containing action ID (or undefined if no action is found). |
| view           | Object containing details about the current view event.           |

For more information, see [RUM Browser Data Collected][1].

For example:

```json
{
  application_id : "xxx",
  session_id : "xxx",
  user_action: { id: "xxx" },
  view : {
    id : "xxx",
    referrer : "",
    url: "http://localhost:8080/",
    name: "homepage"
  }
}
```

You can optionally use the `startTime` parameter to get the context of a specific time. If the parameter is omitted, the current context is returned.

```typescript
getInternalContext (startTime?: 'number' | undefined)
```

{% tabs %}
{% tab label="NPM" %}

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
```

{% /tab %}
{% tab label="CDN async" %}

```javascript
window.DD_RUM.onReady(function () {
  window.DD_RUM.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
})
```

{% /tab %}
{% tab label="CDN sync" %}

```javascript
window.DD_RUM && window.DD_RUM.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
```

{% /tab %}
{% /tabs %}

[1]: /real_user_monitoring/setup/data_collected/?platform=browser
