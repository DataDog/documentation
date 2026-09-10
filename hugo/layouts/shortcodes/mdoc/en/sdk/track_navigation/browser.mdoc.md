## Automatically track views

By default, the Browser SDK tracks a new view whenever the page URL path changes. For most sites this means each page load is tracked automatically, with no setup required.

## Manually track views

For single-page applications where the URL doesn't always change between screens, or where you want to use your own view names, use `startView()`:

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.startView('checkout')
```

You can also pass an object with a `name`, `service`, and `version` to associate the view with specific metadata:

```javascript
datadogRum.startView({
  name: 'checkout',
  service: 'purchase',
  version: '1.2.3'
})
```

If you use React, Angular, Vue, or another frontend framework, Datadog recommends calling `startView()` from the framework's router so that views line up with route changes. See [React router instrumentation](#react-router-instrumentation) for a React Router example.
