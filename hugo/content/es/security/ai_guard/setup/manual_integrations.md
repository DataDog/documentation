---
further_reading:
- link: /security/ai_guard/setup/automatic_integrations/
  tag: Documentación
  text: Automatic Integrations
- link: /security/ai_guard/setup/sdk/
  tag: Documentación
  text: SDK
title: Manual Integrations
---
{{< site-region region="gov" >}}<div class="alert alert-danger">AI Guard no está disponible en el {{< region-param key="dd_site_name" >}} sitio.</div>
{{< /site-region >}}

Las integraciones manuales requieren configuración adicional para habilitar la protección de AI Guard. Siga las instrucciones para cada framework para configurar las evaluaciones de AI Guard.

## Marcos de trabajo y bibliotecas compatibles {#supported-frameworks-and-libraries}

<div class="alert alert-tip">La integración manual es compatible con Amazon Strands y LiteLLM Proxy. Para cualquier otro framework, o para código personalizado de LLM o de llamada a herramientas, utilice el <a href="/security/ai_guard/setup/sdk/">SDK</a> para llamar <code>evaluate()</code> en su código.</div>

### Python {#python}

| Framework                         | Versiones compatibles | Versión del SDK |
| --------------------------------- | ------------------ | -------------- |
| [Amazon Strands](#amazon-strands) | >= 1.29.0          | >= 4.7.0       |
| [LiteLLM Proxy](#litellm-proxy)   | >= 1.78.5          | >= 4.8.0       |

{{< partial name="security-platform/aiguard-sdk-setup.html" target="manual" >}}

## Integrations {#integrations}

### Amazon Strands {#amazon-strands}
#### Python {#python-1}

La integración de Amazon Strands habilita las evaluaciones de AI Guard para aplicaciones creadas con el [Amazon Strands Agents SDK][1].

##### Configuración {#setup}

Instale dd-trace-py v4.7.0 o posterior:

```shell
pip install ddtrace>=4.7.0
```

A continuación, defina el punto de entrada para la integración con un complemento o proveedor de hooks:

* Plugin (recomendado):

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

### LiteLLM Proxy {#litellm-proxy}
#### Python {#python-2}

La integración de LiteLLM Proxy habilita evaluaciones de AI Guard para aplicaciones que utilizan [LiteLLM Proxy][1].

##### Configuración {#setup-1}

Instale dd-trace-py v4.8.0 o posterior:

```shell
pip install ddtrace>=4.8.0
```

Importe el guardrail de LiteLLM de Datadog junto a su archivo de configuración (por ejemplo, `guardrails.py`):

```python
from ddtrace.appsec.ai_guard.integrations.litellm import DatadogAIGuardGuardrail

__all__ = ["DatadogAIGuardGuardrail"]
```

Agregue el guardrail importado a su archivo de configuración:

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

El guardrail admite los tres modos: `pre_call`, `post_call` y `during_call`.

De forma predeterminada, el guardrail sigue la configuración de bloqueo establecida en los ajustes del servicio AI Guard. Para deshabilitar el bloqueo, establezca el parámetro `block` en `false` (equivalente a la opción `block` en el [SDK][2] y la [REST API][3]).

[1]: https://docs.litellm.ai/docs/simple_proxy
[2]: /es/security/ai_guard/setup/sdk/
[3]: /es/security/ai_guard/setup/http_api/

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}