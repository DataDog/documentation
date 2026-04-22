## Default Grouping

Error Tracking intelligently groups similar errors into issues. This grouping is based on the following error properties:

- `service`: The service where the error occurred.
- `error.type` or `error.kind`: The class of the error.
- `error.message`: A description of the error.
- `error.stack`: The filename and function name of the top-most meaningful stack frame.

The error stack trace is the code path followed by an error between being thrown and being captured by Datadog instrumentation. Error Tracking evaluates the topmost stack frame (the **location** of the error) and uses it to group the error.

If any stack frame properties differ for two given errors, the two errors are grouped under different issues. For example, Error Tracking does not group issues across services or error types. Error Tracking also ignores numbers, punctuation, and anything that is between quotes or parentheses: only word-like tokens are used.

{% alert level="info" %}
**Tip:** To ensure optimal grouping, enclose variables in your error messages in quotes or parentheses.
{% /alert %}

**Note**: To improve grouping accuracy, Error Tracking removes variable stack frame properties such as versions, ids, dates, and so on.

## Custom Grouping

Error Tracking intelligently groups similar errors into issues with a default strategy. By using _custom fingerprinting_, you can gain full control over the grouping decision and customize the grouping behavior for your error spans.

You can customize grouping by providing an `error.fingerprint` for the error. The fingerprint is provided in an attribute or tag, depending on the error source (see [Setup](#setup) for details). While the value of `error.fingerprint` does not have any particular format or requirement, the content must be a string.

If `error.fingerprint` is provided, the grouping behavior follows these rules:

* Custom grouping takes precedence over the default strategy.
* Custom grouping can be applied only to a subset of your errors and can coexist with the default strategy.
* The content of `error.fingerprint` is used as-is without any modification (although it is converted to a standardized fingerprint format).
* Errors from the same service and with the same `error.fingerprint` attribute are grouped into the same issue.
* Errors with different `service` attributes are grouped into different issues.