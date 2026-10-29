## Automatically track views

By default, the Browser SDK tracks a new view whenever the page URL path changes. For most sites, this means each page load is tracked automatically, with no setup required.

The RUM Browser SDK generates a [view event][1] for each new page visited by your users, or when the page URL changes (for single-page applications). A view name is computed from the current page URL, where variable IDs are removed automatically. A path segment that contains at least one number is considered a variable ID. For example, `/dashboard/1234` and `/dashboard/9a` become `/dashboard/?`.

## Manually track views

For single-page applications where the URL doesn't always change between screens, or where you want to use your own view names, track views manually. Starting with [version 2.17.0][2], you can override the default RUM view names and assign views to a dedicated service owned by a team.

1. Set `trackViewsManually` to `true` when initializing the RUM Browser SDK.

   {% tabs %}
   {% tab label="NPM" %}

   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   datadogRum.init({
         ...,
         trackViewsManually: true,
         ...
   });
   ```

   {% /tab %}
   {% tab label="CDN async" %}

   ```javascript
   window.DD_RUM.onReady(function() {
         window.DD_RUM.init({
            ...,
            trackViewsManually: true,
            ...
         })
   })
   ```

   {% /tab %}
   {% tab label="CDN sync" %}

   ```javascript
   window.DD_RUM &&
         window.DD_RUM.init({
            ...,
            trackViewsManually: true,
            ...
         });
   ```

   {% /tab %}
   {% /tabs %}

2. Start a view for each new page or route change with `startView()`. RUM data is collected when the view starts.

   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   datadogRum.startView('checkout')
   ```

If you use React, Angular, Vue, or another frontend framework, Datadog recommends calling `startView()` from the framework's router so that views line up with route changes.

### Define the view service, version, and context

Starting with [version 4.13.0][3], you can pass an object to `startView()` to define the view name and, optionally, the associated service and version:

- **View Name**: Defaults to the page URL path.
- **Service**: Defaults to the default service specified when creating your RUM application.
- **Version**: Defaults to the default version specified when creating your RUM application.

```javascript
datadogRum.startView({
  name: 'checkout',
  service: 'purchase',
  version: '1.2.3'
})
```

Starting with [version 5.28.0][4], you can also pass a `context` object to `startView()`. The context is added to the view and its child events (such as actions, errors, and timings). To add or replace view context after the view starts, see [Add view attributes][5].

For the attributes collected, see [Data Collected](/real_user_monitoring/setup/data_collected/?platform=browser#view-timing-attributes).

[1]: /real_user_monitoring/setup/enable_rum/track_ui_latency/?platform=browser
[2]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v2170
[3]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v4130
[4]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v5280
[5]: /real_user_monitoring/enrich_rum_data/add_custom_context/?platform=browser#add-view-attributes
