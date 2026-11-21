## Add global attributes

Attach custom attributes from the main process to all subsequent RUM events, including events from renderers.

```typescript
import {
  setGlobalContext,
  setGlobalContextProperty,
  removeGlobalContextProperty,
  clearGlobalContext,
  getGlobalContext,
} from '@datadog/electron-sdk';

setGlobalContext({ team: 'checkout', build: '1.2.3' });

// Update one attribute and leave the others untouched
setGlobalContextProperty('feature_flag', 'new-cart');
removeGlobalContextProperty('feature_flag');

// Read a copy of the current context
const context = getGlobalContext();

clearGlobalContext();
```

The SDK sends the attributes in the `context` field of each event. `setGlobalContext` replaces the whole context. To change a single attribute, use `setGlobalContextProperty`.

Renderers keep their own global context, set with `datadogRum.setGlobalContext` in the Browser SDK. The SDK merges both contexts on renderer events, and the renderer value wins on a key conflict. See [Add Custom Context for the Browser SDK][1].

[1]: /real_user_monitoring/enrich_rum_data/add_custom_context/?platform=browser
