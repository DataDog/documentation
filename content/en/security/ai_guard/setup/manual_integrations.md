---
title: Manual Integrations
further_reading:
- link: /security/ai_guard/setup/automatic_integrations/
  tag: Documentation
  text: Automatic Integrations
- link: /security/ai_guard/setup/sdk/
  tag: Documentation
  text: SDK
---

{{< site-region region="gov" >}}<div class="alert alert-danger">AI Guard isn't available in the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

Manual integrations require additional configuration to enable AI Guard protection. Follow the instructions for each framework to set up AI Guard evaluations.

## Supported frameworks and libraries
### Python

| Framework                         | Supported Versions | SDK Version |
| --------------------------------- | ------------------ | -------------- |
| [Amazon Strands](#amazon-strands) | >= 1.29.0          | >= 4.7.0       |
| [LiteLLM Proxy](#litellm-proxy)   | >= 1.78.5          | >= 4.8.0       |

{{< partial name="security-platform/aiguard-sdk-setup.md" target="manual" >}}

## Integrations

### Amazon Strands
#### Python

The Amazon Strands integration enables AI Guard evaluations for applications built with the [Amazon Strands Agents SDK][1].

##### Setup

Install dd-trace-py v4.7.0 or later:

```shell
pip install ddtrace>=4.7.0
```

Next, define the entry point for the integration with a plugin or hook provider:

* Plugin (recommended):

```python
from ddtrace.appsec.ai_guard import AIGuardStrandsPlugin

agent = Agent(
    model=model,
    plugins=[AIGuardStrandsPlugin()]
)
```

* HookProvider (legacy):

```python
from ddtrace.appsec.ai_guard import AIGuardStrandsHookProvider

agent = Agent(
    model=model,
    hooks=[AIGuardStrandsHookProvider()]
)
```

[1]: https://github.com/strands-agents/sdk-python

### LiteLLM Proxy
#### Python

The LiteLLM Proxy integration enables AI Guard evaluations for applications using the [LiteLLM Proxy][1].

##### Setup

Install dd-trace-py v4.8.0 or later:

```shell
pip install ddtrace>=4.8.0
```

Import Datadog's LiteLLM guardrail next to your configuration file (for example, `guardrails.py`):

```python
from ddtrace.appsec.ai_guard.integrations.litellm import DatadogAIGuardGuardrail

__all__ = ["DatadogAIGuardGuardrail"]
```

Add the imported guardrail to your configuration file:

```yaml
guardrails:
  - guardrail_name: datadog_ai_guard
    litellm_params:
      guardrail: guardrails.DatadogAIGuardGuardrail
      mode: [pre_call, post_call]
      on_input: true
      on_output: true
      block: true
```

The guardrail supports all three modes: `pre_call`, `post_call`, and `during_call`.

By default, the guardrail follows the blocking configuration set in the AI Guard service settings. To disable blocking, set the `block` parameter to `false` (equivalent to the `block` option in the [SDK][2] and [REST API][3]).

[1]: https://docs.litellm.ai/docs/simple_proxy
[2]: /security/ai_guard/setup/sdk/
[3]: /security/ai_guard/setup/http_api/

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
