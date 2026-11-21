{% alert level="info" %}
Tracking background events may lead to additional sessions, which can impact billing. For questions, [contact Datadog support][1].
{% /alert %}

You can track events such as crashes and network requests when your application is in the background (for example, when no active view is available).

Add the following snippet during initialization in your Datadog configuration:

```javascript
rumConfiguration.trackBackgroundEvents = true;
```

[1]: /help/
