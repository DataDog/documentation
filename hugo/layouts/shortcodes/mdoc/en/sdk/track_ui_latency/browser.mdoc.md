### Core web vitals

The Browser SDK automatically collects [Core Web Vitals][1] (Largest Contentful Paint, Interaction to Next Paint, and Cumulative Layout Shift) for every view. No setup is required.

### View loading time

The SDK automatically calculates `view.loading_time` by watching for network requests and DOM mutations.

If the automatic calculation doesn't accurately reflect when your view finished loading, set it manually with `setViewLoadingTime`. Call this when your view is fully loaded and displayed to the user:

```javascript
window.DD_RUM.setViewLoadingTime()
```

Each call replaces any previously set value, and stops the automatic detection for that view.

Some requests or DOM mutations don't reflect real UI activity, such as periodic analytics calls or long-polling. To exclude them, configure `excludedActivityUrls` during SDK initialization, or mark elements with `data-dd-excluded-activity-mutations`:

```javascript
window.DD_RUM.init({
    ...
    excludedActivityUrls: [
        'https://third-party-analytics-provider.com/endpoint',
        /\/comet$/,
    ]
})
```

### Custom vitals and timings

To measure the performance of a specific component, use `startDurationVital`/`stopDurationVital`:

```javascript
window.DD_RUM.startDurationVital("dropdownRendering")
window.DD_RUM.stopDurationVital("dropdownRendering")
```

To report a duration in a single call, use `addDurationVital`:

```javascript
window.DD_RUM.addDurationVital("dropdownRendering", {startTime: 1707755888000, duration: 10000})
```

To add a timestamp relative to the start of the current view (such as when a hero image appears), use `addTiming`:

```javascript
window.DD_RUM.addTiming('hero_image')
```

For Core Web Vitals thresholds, subparts breakdowns, and the full performance-attribute reference, see [Monitoring Page Performance][2].

[1]: https://web.dev/vitals/
[2]: /real_user_monitoring/application_monitoring/browser/monitoring_page_performance/
