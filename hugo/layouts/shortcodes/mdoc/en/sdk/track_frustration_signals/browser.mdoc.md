## Requirements

Frustration signals require Browser RUM SDK version 4.14.0 or higher.

To start collecting frustration signals, add the following to your SDK configuration:

{{% collapse-content title="Latest version" level="h4" expanded=true %}}

```javascript
window.DD_RUM.init({
  trackUserInteractions: true,
})
```

{{% /collapse-content %}}

{{% collapse-content title="Before v5.0.0" level="h4" expanded=false %}}

```javascript
window.DD_RUM.init({
  trackUserInteractions: true,
  trackFrustrations: true
})
```

Frustration signals require actions. Enabling `trackFrustrations` automatically enables `trackUserInteractions`.

{{% /collapse-content %}}

By enabling frustration signals, Datadog collects all three signal types (rage clicks, dead clicks, and error clicks) by default.

For more information about frustration signals and how to use them, see [Frustration Signals][1].

[1]: /real_user_monitoring/application_monitoring/browser/frustration_signals/
