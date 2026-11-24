The RUM Browser SDK automatically detects user interactions performed during a user session and provides insights into your users' behavior without requiring you to manually instrument every click in your application. Use user interaction data to:

* Understand the performance of key interactions (for example, a click on the {% ui %}Add to cart{% /ui %} button)
* Quantify feature adoption
* Identify the steps that led to a specific browser error

## Automatically track user interactions

To enable automatic click tracking, set `trackUserInteractions: true` in your SDK initialization:

```javascript
window.DD_RUM.init({
    ...
    trackUserInteractions: true,
});
```

The RUM Browser SDK automatically tracks clicks to generate click actions. A one-click action generally represents one user click, except when the same element is clicked multiple times in a row, which is considered a single action (see [rage clicks][1]).

The SDK calculates action loading time by monitoring page activity following every click. An action is considered complete when the page has no more activity. See [How page activity is calculated][2] for details.

### Declare a name for click actions

The Datadog Browser SDK for RUM uses various strategies to get a name for click actions. For more control, define a `data-dd-action-name` attribute on clickable elements (or any of their parents) that's used to name the action.

For example:

```html
<a class="btn btn-default" href="#" role="button" data-dd-action-name="Login button">Try it out!</a>

<div class="alert alert-warning" role="alert" data-dd-action-name="Dismiss alert">
    <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
    <span class="visually-hidden">Error:</span>
    Enter a valid email address
</div>
```

Starting with [version 2.16.0][3], with the `actionNameAttribute` initialization parameter, you can specify a custom attribute that's used to name the action.

For example:

```html
<script>
  window.DD_RUM.init({
    ...
    trackUserInteractions: true,
    actionNameAttribute: 'data-custom-name',
  ...
  })
</script>

<a class="btn btn-default" href="#" role="button" data-custom-name="Login button">Try it out!</a>
```

`data-dd-action-name` is favored when both attributes are present on an element.

#### How action names are computed

The Datadog Browser SDK uses the following strategies to compute click action names:

1. If the `data-dd-action-name` attribute or a custom attribute (as explained above) is explicitly set by the user on the clicked element (or one of its parents), its value is used as the action name.
2. If no explicit action name attribute is set and `enablePrivacyForActionName` is enabled, the action name is set to `Masked Element`.
3. Otherwise, depending on the element type, the SDK uses other attributes such as `label`, `placeholder`, or `aria-label` from the element or its parents to construct the action name. If none of these attributes is found, the SDK uses the inner text as the action name.

### Prevent sensitive data leaks (PII / PHI / CHD)

When user interaction tracking is enabled, sensitive and private data contained in your pages might be included to identify elements that a user interacted with.

To control which information is sent to Datadog, [mask action names with privacy options][4], [manually set an action name](#declare-a-name-for-click-actions), or [implement a global scrubbing rule][5] in the Datadog Browser SDK for RUM.

#### Mask all action names

To mask all action names by default, set `defaultPrivacyLevel` to `mask`:

```javascript
window.DD_RUM.init({
    ...
    trackUserInteractions: true,
    defaultPrivacyLevel: 'mask',
});
```

With these settings, all action names are replaced with `Masked Element`. Action names explicitly set with the `data-dd-action-name` attribute are still displayed, allowing you to selectively expose specific action names while keeping others masked.

In RUM Browser SDK v5 and v6, privacy was not enabled for action names by default. Set `enablePrivacyForActionName` to `true` to enable action name privacy on older SDKs. See the [Browser SDK upgrade guide][6].

{% alert level="info" %}
If your application uses a JavaScript bundler, the [privacy plugin][7] generates an allowlist of safe strings at build time so the RUM Browser SDK can keep useful action names while masking sensitive data.
{% /alert %}

## Manually track actions and send custom events

To extend the collection of user interactions, send your custom actions using the `addAction` API. These custom actions send information relative to an event that occurs during a user session.

{% tabs %}
{% tab label="NPM" %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.addAction('checkout', {
    cart: {
        amount: 42,
        currency: 'USD',
    },
});
```

{% /tab %}
{% tab label="CDN async" %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.addAction('checkout', {
        cart: {
            amount: 42,
            currency: 'USD',
        },
    });
})
```

{% /tab %}
{% tab label="CDN sync" %}

```javascript
window.DD_RUM && window.DD_RUM.addAction('checkout', {
    cart: {
        amount: 42,
        currency: 'USD',
    },
});
```

{% /tab %}
{% /tabs %}

For more information, see [Send Custom Actions][8].

## Action limits and sampling

There is no strict limit on the number of user actions, such as clicks or custom actions, that the Datadog RUM Browser SDK can track per session or page. However, there are technical limitations on individual event sizes and the payload sent. For details, see [Troubleshooting][9]. Also consider the following:

* **Sampling** - The SDK doesn't sample individual actions. To control the volume of data sent to Datadog, set `sessionSampleRate` to collect a percentage of sessions, or set `trackUserInteractions` to `false` to turn off automatic click tracking. For more information, see [Manage Sessions][10].
* **Performance** - The SDK batches and sends events periodically. In cases of high-frequency actions, such as repeated clicks, the SDK may deduplicate or group actions, for example, through rage click detection to avoid flooding.

As a best practice, if you expect a high volume of user actions, consider adjusting your session sample rate and monitor your Datadog event usage.

For the attributes and timing telemetry collected for actions, see [Data Collected][11].

[1]: /real_user_monitoring/setup/enable_rum/track_frustration_signals/?platform=browser
[2]: /real_user_monitoring/setup/enable_rum/track_ui_latency/?platform=browser#how-page-activity-is-calculated
[3]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v2160
[4]: /data_security/real_user_monitoring/#mask-action-names
[5]: /real_user_monitoring/enrich_rum_data/modify_or_drop_rum_events/?platform=browser
[6]: /real_user_monitoring/guide/browser-sdk-upgrade/#new-default-for-defaultprivacylevel
[7]: /real_user_monitoring/setup/additional_plugins/?platform=browser#privacy-plugin
[8]: /real_user_monitoring/guide/send-rum-custom-actions
[9]: /real_user_monitoring/reference/troubleshooting/?platform=browser
[10]: /real_user_monitoring/setup/enable_rum/manage_sessions/?platform=browser#configure-the-session-sample-rate
[11]: /real_user_monitoring/setup/data_collected/?platform=browser#action-attributes
