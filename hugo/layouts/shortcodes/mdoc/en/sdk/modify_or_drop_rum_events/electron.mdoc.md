Use `beforeSendRum` to modify or drop RUM events from the main process and from renderers before the SDK sends them to Datadog. The callback receives the event and an object with the `source` of the event, either `'main'` or `'renderer'`.

```typescript
await init({
  // ...
  beforeSendRum: (event, { source }) => {
    if (event.type === 'error') {
      event.error.message = event.error.message.replace(/token=[^&\s]+/g, 'token=[REDACTED]');
      event.error.stack = event.error.stack?.replace(/token=[^&\s]+/g, 'token=[REDACTED]');
    }
    if (source === 'main' && event.context?.internal === true) {
      return false;
    }
    return true;
  },
});
```

## Drop RUM events

Return `false` to drop an event. Any other return value keeps the event. View, execution context, and native crash events cannot be dropped.

## Modifiable attributes

You can modify the following fields:

- All events: `context`, `service`, `version`, and `execution_context.name`
- Renderer events: `view.name`, `view.url`, and `view.referrer`
- Renderer view events: `view.performance.lcp.resource_url`
- Errors: `error.message`, `error.stack`, `error.handling_stack`, `error.resource.url`, `error.fingerprint`, and `_dd.debug_ids`
- Resources: `resource.url`, GraphQL variables, request and response headers, and WebSocket close reasons and protocols
- Actions: `action.target.name`
- Long tasks: script source URLs, invokers, and `_dd.debug_ids`

All other fields, such as identifiers, session, and application, stay unchanged.

When you write the `beforeSendRum` callback, consider the following:

- The callback is synchronous. Keep it fast.
- Editable string fields must remain strings. To clear a field, set it to an empty string. Deleting a field or setting it to `null` or `undefined` is ignored.
- If the callback throws an error, the SDK logs the error and sends the event unchanged.
- The SDK does not detect personally identifiable information (PII) automatically.

## Renderer events

Events from renderers go through the `beforeSend` callback of the [Browser SDK][1] first, and then through `beforeSendRum` after the main process adds its context. Dropping a renderer event in `beforeSendRum` prevents its upload, but does not undo what the Browser SDK already counted or the activity the Electron SDK already recorded in the session.

[1]: /real_user_monitoring/enrich_rum_data/modify_or_drop_rum_events/?platform=browser
