## Configure the session sample rate

By default, the Browser SDK collects 100% of sessions. To control how many sessions the SDK sends to Datadog, set the `sessionSampleRate` parameter (a percentage) when initializing RUM:

{% tabs %}
{% tab label="NPM" %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '<DATADOG_SITE>',
    sessionSampleRate: 100,
});
```

{% /tab %}
{% tab label="CDN async" %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        site: '<DATADOG_SITE>',
        sessionSampleRate: 100,
    })
})
```

{% /tab %}
{% tab label="CDN sync" %}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        site: '<DATADOG_SITE>',
        sessionSampleRate: 100,
    });
```

{% /tab %}
{% /tabs %}

When a session is sampled out, the SDK doesn't collect any pageviews or associated telemetry for that session.

You can adjust the session sample rate, but Datadog recommends using [retention filters][1] to control retained volume.

## Retrieve the session ID

To get the ID of the current session, read `session_id` from the SDK's internal context:

{% tabs %}
{% tab label="NPM" %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

const sessionId = datadogRum.getInternalContext()?.session_id;
```

{% /tab %}
{% tab label="CDN async" %}

```javascript
window.DD_RUM.onReady(function() {
    const sessionId = window.DD_RUM.getInternalContext()?.session_id;
})
```

{% /tab %}
{% tab label="CDN sync" %}

```javascript
const sessionId = window.DD_RUM && window.DD_RUM.getInternalContext()?.session_id;
```

{% /tab %}
{% /tabs %}

For the other attributes available in the internal context, see [Access the internal context][2].

[1]: /real_user_monitoring/retain_and_recover_valuable_sessions/configure_retention_filters/
[2]: /real_user_monitoring/setup/enable_rum/manage_data_collection/?platform=browser#access-the-internal-context
