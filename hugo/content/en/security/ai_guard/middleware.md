---
title: Control Evaluations with Middleware
description: Skip, tag, or log AI Guard evaluations in Python applications with middleware.
---

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">AI Guard isn't available in the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

AI Guard middleware lets you decide in Python code which requests AI Guard evaluates and run your own logic around each evaluation. Use middleware to skip evaluations for traffic you trust, add custom tags to evaluations, or log evaluation outcomes. The AI Guard policy for the service still decides what's unsafe and whether AI Guard blocks unsafe requests.

## Supported SDK versions

Middleware is supported for Python applications instrumented with automatic or manual integrations, or the SDK. Middleware requires `dd-trace-py` 4.17.0 or later.

The Datadog SDKs for Node.js, Java, and Ruby don't support middleware.

## Register middleware

Register middleware at application startup, so the middleware runs around every AI Guard evaluation that follows.

Middleware classes run in registration order.

Middleware errors don't break your application. If a hook raises an exception, the SDK ignores the exception and logs the exception at debug level. If `should_evaluate` raises an exception, AI Guard evaluates the request.

**Before you begin**: [Set up AI Guard][1] for the application.

1. Create a subclass of `AIGuardMiddleware` and override one or more of its hooks:

   | Hook | When it runs | Use the hook to |
   | --- | --- | --- |
   | `should_evaluate(context)` | Before the evaluation starts, before AI Guard creates the span. | Skip the evaluation by returning `False`. Any other return value, including `None`, lets the evaluation run. |
   | `pre_evaluate(context)` | Inside the AI Guard span, right before the request to AI Guard. | Add tags to the AI Guard span, or store values for `post_evaluate`. |
   | `post_evaluate(context)` | One time, after the evaluation finishes, whether AI Guard allows, denies, or blocks the request, or the request fails. | Log, count, or tag the outcome. |

   For the values each hook can read from `context`, see the [Hook attributes](#hook-attributes) section.

1. At application startup, register an instance of the middleware class with `register_middleware`:

   ```python
   from ddtrace.aiguard.middleware import AIGuardMiddleware, EvaluationDirection, register_middleware


   class InputOnly(AIGuardMiddleware):
       """Evaluate the messages sent to the model, not the model responses."""

       def should_evaluate(self, context):
           return context.request.direction is EvaluationDirection.INPUT


   register_middleware(InputOnly())
   ```

   If you use LiteLLM Proxy, register middleware in the proxy process, not in the agents behind the proxy. Define the middleware in its own Python module that the proxy can import, such as a module on the proxy's `PYTHONPATH`. Then import that module from the `guardrails.py` file that imports the AI Guard guardrail. LiteLLM Proxy can load `guardrails.py` more than once, but Python imports your module only one time, so the middleware is registered one time:

   ```python
   # aiguard_middleware.py, on the proxy's PYTHONPATH
   from ddtrace.aiguard.middleware import AIGuardMiddleware, register_middleware


   class InputOnly(AIGuardMiddleware):
       ...


   register_middleware(InputOnly())
   ```

   ```python
   # guardrails.py
   import aiguard_middleware  # noqa: F401
   from ddtrace.aiguard.integrations.litellm import DatadogAIGuardGuardrail

   __all__ = ["DatadogAIGuardGuardrail"]
   ```

Registered middleware can't be unregistered. To remove middleware, remove the `register_middleware` calls from your code.

## Skip evaluations for trusted traffic

Skip evaluations for traffic you trust, such as calls through one integration or requests to an internal route.

<div class="alert alert-warning">Skipped requests go to the model without an evaluation, and no AI Guard span records the skipped requests. Skip only requests that you trust.</div>

**Before you begin**: [Register middleware](#register-middleware) in a Python application with `dd-trace-py` 4.17.0 or later.

1. To skip requests, override `should_evaluate` in a middleware class so that the method returns `False` for each request to skip and `True` for all other requests.

   The values in the [Hook attributes](#hook-attributes) section identify each request, such as `context.request.integration` for the integration or the HTTP route on `context.local_root_span`.

After a middleware class skips a request:

- SDK calls return an `ALLOW` action with the reason `skipped by middleware`, no attack categories or Sensitive Data Scanner findings, and the original messages. A skipped request never reaches AI Guard, so sensitive data redaction doesn't apply. If you forward `result.messages` to the model, the model receives the unredacted messages.
- Middleware classes registered later don't check the request.
- No `post_evaluate` hooks run for the request.

To confirm which requests are skipped, see the [Verify middleware](#verify-middleware) section.

For example, this middleware class skips calls through the LangChain integration and requests to the `/internal/summarize` route:

```python
from ddtrace.aiguard.middleware import AIGuardMiddleware, register_middleware


class SkipInternalTraffic(AIGuardMiddleware):
    def should_evaluate(self, context):
        # Skip calls made through the LangChain integration.
        if context.request.integration == "langchain":
            return False
        # Skip requests served by an internal route.
        root = context.local_root_span
        if root is not None and root.get_tag("http.route") == "/internal/summarize":
            return False
        return True


register_middleware(SkipInternalTraffic())
```

## Tag and log evaluations

Give evaluations from integrations the same custom tags as SDK calls, and keep your own record of the evaluations that fail or that AI Guard doesn't allow.

<div class="alert alert-info">The SDK doesn't filter tags that middleware sets on the AI Guard span. Never set the key <code>ai_guard</code> or keys with the <code>ai_guard.</code> prefix, because those keys misreport the evaluation in Datadog.</div>

**Before you begin**: [Register middleware](#register-middleware) in a Python application with `dd-trace-py` 4.17.0 or later.

1. In a middleware class, override one or both of these hooks:

   - **To tag evaluations**, override `pre_evaluate` and set tags on `context.ai_guard_span`. If the tag value comes from the application request, read the value from `context.local_root_span`.
   - **To log evaluation outcomes**, override `post_evaluate` and read `context.result`. When the request fails, `context.result` is `None`, and `context.error` holds the exception.

To search for evaluations by a custom tag, see [Find evaluations by custom tag][2].

For example, this middleware class copies a tenant tag from the application request span to the AI Guard span, and logs every evaluation that fails or that AI Guard doesn't allow:

```python
import logging

from ddtrace.aiguard.middleware import AIGuardMiddleware, register_middleware

log = logging.getLogger(__name__)


class TenantTagging(AIGuardMiddleware):
    def pre_evaluate(self, context):
        root = context.local_root_span
        tenant = root.get_tag("tenant") if root is not None else None
        if tenant:
            context.ai_guard_span.set_tag("tenant", tenant)

    def post_evaluate(self, context):
        if context.result is None:
            log.warning("AI Guard evaluation failed: %s", context.error)
        elif context.result["action"] != "ALLOW":
            log.info(
                "AI Guard %s on %s %s: %s",
                context.result["action"],
                context.request.integration,
                context.request.target.value,
                context.result["reason"],
            )


register_middleware(TenantTagging())
```

## Verify middleware

Verify middleware to confirm that AI Guard evaluates the requests you expect and skips only the requests you trust. Skipped requests create no AI Guard span, so the standard setup verification doesn't show skipped requests.

**Before you begin**: To verify skips from automatic or manual integrations, log or count each skip in `should_evaluate`, right before the method returns `False`. Integrations don't return evaluations to your code, so your own log or counter is the only record of a skip.

1. Send a request that the middleware doesn't skip, and confirm that the AI Guard span appears, as described in [Verify the setup][3].

   If the middleware sets tags, the tags appear on the AI Guard span.

1. Send a request that the middleware skips, and confirm the skip:

   - **For SDK calls**, confirm that the evaluate method returns the action `ALLOW` with the reason `skipped by middleware`.
   - **For automatic and manual integrations**, confirm that your log or counter in `should_evaluate` records the skip.

## Hook attributes

Hook attributes describe where a request comes from, what the request contains, and how AI Guard evaluated the request, so middleware can decide what to do with each request. All hooks of one evaluation share the same `AIGuardContext` object.

| Attribute | Description | Available in |
| --- | --- | --- |
| `request.source` | `"sdk"` for an SDK call. `"auto"` for an automatic integration or a manual integration. | All hooks |
| `request.integration` | The integration that triggered the evaluation: `"openai"`, `"anthropic"`, `"langchain"`, `"strands"`, or `"litellm"`. `"none"` for SDK calls. | All hooks |
| `request.direction` | `EvaluationDirection.OUTPUT` when the last message comes from the assistant, `EvaluationDirection.INPUT` otherwise. | All hooks |
| `request.target` | `EvaluationTarget.TOOL` for a tool call or tool result, `EvaluationTarget.PROMPT` otherwise. | All hooks |
| `request.messages` | The ordered list of messages to evaluate. Don't modify the list. | All hooks |
| `local_root_span` | The local root span of the application trace, such as the HTTP request span, or `None`. | All hooks |
| `ai_guard_span` | The AI Guard span. `None` in `should_evaluate`, because the span doesn't exist yet. | `pre_evaluate`, `post_evaluate` |
| `result` | The evaluation that AI Guard returned, including when the request is blocked. `None` if the request failed. Don't modify the result. Changing the result changes only the evaluation that SDK calls return to your code, not whether AI Guard blocks the request. | `post_evaluate` |
| `error` | The exception that the evaluate method is about to raise: `AIGuardAbortError` when the request is blocked, or `AIGuardClientError` when the request failed. `None` otherwise. | `post_evaluate` |
| `state` | A dictionary for sharing values between the hooks of one evaluation. | All hooks |

[1]: /security/ai_guard/setup/
[2]: /security/ai_guard/setup/sdk/?prog_lang=python#find-evaluations-by-custom-tag
[3]: /security/ai_guard/setup/#verify
