## Advanced configuration

After you have RUM Auto-Instrumentation set up, configure **User Attributes** and **Allowed Tracing URLs** directly from the Datadog UI without modifying your application code.

### User attributes

User Attributes allow you to associate RUM sessions with specific users, enabling you to:
- Track individual user journeys across your application
- Filter and search sessions by user details
- Gain insights into user-specific issues and behaviors

Configure three user properties: **User ID**, **User Name**, and **User Email**.

#### Source types

For each user attribute, select how the RUM SDK should extract the value:

| Source | Description | Example |
|--------|-------------|---------|
| **JavaScript** | Read from a JavaScript variable on the page | `window.currentUser.id` or `dataLayer.user.email` |
| **Cookie** | Read from a browser cookie | Cookie name: `user_session` |
| **DOM** | Read from an HTML element's text content or attribute | CSS selector: `#user-id` or `[data-user-email]` |

#### Regex extractor (optional)

Use a regex pattern to extract specific values when your source contains extra characters. For example:
- Source value: `user_id=12345;session=abc`
- Regex pattern: `user_id=(\d+)`
- Extracted value: `12345`

If your regex pattern includes a capture group (parentheses), the SDK extracts that value. Otherwise, it extracts the entire matched string.

### Allowed tracing URLs

Configure allowed tracing URLs to connect your RUM sessions to backend APM traces. This provides end-to-end visibility from the browser to your backend services.

When a user's browser makes a request to an allowed URL, the RUM SDK injects trace headers. Your backend APM agent reads these headers and links the backend trace to the RUM session.

#### Configuration

Add the URLs of your backend services that you want to connect to RUM:

| Field | Description |
|-------|-------------|
| **URL** | The backend URL to trace. Use an exact URL (for example, `https://api.example.com`) or enable **Regex** for pattern matching (for example, `https://.*\.example\.com`). |
| **Propagator Type** | The trace header format your backend expects. Options: `datadog`, `tracecontext` (W3C), `b3`, `b3multi`. Select multiple if needed. |

<div class="alert alert-info">Tracing requires a configured <strong>service name</strong>. Set this in the App Attributes section.</div>

#### Learn more

See [Connect RUM and Traces][1] for detailed information about RUM and APM integration.

[1]: /real_user_monitoring/platform/connect_rum_and_traces/