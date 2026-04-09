---
title: Manual Integrations
private: true
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

## Set up the Datadog Agent

Datadog SDKs use the [Datadog Agent][2] to send AI Guard data to Datadog. The Agent must be running and accessible to the SDK for you to see data in Datadog.

If you don't use the Datadog Agent, the AI Guard evaluator API still works, but you can't see AI Guard traces in Datadog.

## Supported frameworks and libraries

{{< tabs >}}
{{% tab "Python" %}}
<!-- TODO: confirm supported versions and tracer versions -->
| Framework                                    | Supported Versions | Tracer Version |
|----------------------------------------------|--------------------|----------------|
| [Amazon Strands](#amazon-strands)            | <!-- TODO -->      | <!-- TODO -->  |
| [LiteLLM Proxy](#litellm-proxy)             | <!-- TODO -->      | <!-- TODO -->  |

{{% /tab %}}
{{< /tabs >}}

## Integrations

{{% collapse-content title="Amazon Strands" level="h3" expanded=false id="amazon-strands" %}}
{{< tabs >}}
{{% tab "Python" %}}
<!-- TODO: add setup instructions, supported versions, and traced operations for Amazon Strands with AI Guard -->

The Amazon Strands integration enables AI Guard evaluations for applications built with the [Amazon Strands Agents SDK][1].

### Setup

<!-- TODO: add setup steps -->

### Traced operations

<!-- TODO: add traced operations -->

[1]: https://github.com/strands-agents/sdk-python
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="LiteLLM Proxy" level="h3" expanded=false id="litellm-proxy" %}}
{{< tabs >}}
{{% tab "Python" %}}
<!-- TODO: add setup instructions, supported versions, and traced operations for LiteLLM Proxy with AI Guard -->

The LiteLLM Proxy integration enables AI Guard evaluations for applications using the [LiteLLM Proxy][1].

### Setup

<!-- TODO: add setup steps -->

### Traced operations

<!-- TODO: add traced operations -->

[1]: https://docs.litellm.ai/docs/simple_proxy
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: /agent/?tab=Host-based
