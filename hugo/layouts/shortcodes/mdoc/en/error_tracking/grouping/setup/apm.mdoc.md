Custom grouping only needs an error span and an `error.fingerprint` string span tag.

If you aren't already collecting APM traces with Datadog, see the [APM documentation][1] to set up APM.

### Example

If you're already sending APM spans, add a new `error.fingerprint` tag to your error span.

Here's an example in Python:

```python
with tracer.trace("throws.an.error") as span:
  span.set_tag('error.fingerprint', 'my-custom-grouping-material')
  raise Exception("Something went wrong")
```

Exception information is captured and attached to a span if there is one active when the exception is raised.

In this case, `my-custom-grouping-material` is used to group these error spans into a single issue in Error Tracking.

[1]: /tracing/