### Automated error reporting

After you enable RUM, the Browser SDK automatically captures unhandled JavaScript errors, unhandled promise rejections, and reported errors (such as CSP violations and deprecations). For details on error sources, attributes, and troubleshooting, see [Browser Error Tracking][1].

### Manual error reporting

To report an error manually, use the `addError` API:

{% tabs %}
{% tab label="npm" %}
```javascript
import { datadogRum } from '@datadog/browser-rum';

try {
    // an error occurs
} catch (error) {
    datadogRum.addError(error);
}
```
{% /tab %}
{% tab label="CDN async" %}
```javascript
window.DD_RUM &&
    window.DD_RUM.onReady(function () {
        try {
            // an error occurs
        } catch (error) {
            window.DD_RUM.addError(error);
        }
    });
```
{% /tab %}
{% tab label="CDN sync" %}
```javascript
try {
    // an error occurs
} catch (error) {
    window.DD_RUM && window.DD_RUM.addError(error);
}
```
{% /tab %}
{% /tabs %}

You can also pass a context object as a second argument:

```javascript
datadogRum.addError(error, { pageStatus: 'beta' });
```

For React applications, instrument your error boundaries to report caught errors with `addError` from the `componentDidCatch` life cycle method. See [Collect browser errors][2] for the full example.

[1]: /error_tracking/frontend/browser/
[2]: /real_user_monitoring/application_monitoring/browser/collecting_browser_errors/
