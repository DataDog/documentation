---
further_reading:
- link: /security/ai_guard/setup/automatic_integrations/
  tag: Documentation
  text: Intégrations automatiques
- link: /security/ai_guard/setup/sdk/
  tag: Documentation
  text: SDK
title: Intégrations manuelles
---
{{< site-region region="gov" >}}<div class="alert alert-danger">AI Guard n'est pas disponible dans le {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

Les intégrations manuelles nécessitent une configuration supplémentaire pour activer la protection AI Guard. Suivez les instructions pour chaque framework afin de configurer les évaluations AI Guard.

## Frameworks et bibliothèques pris en charge {#supported-frameworks-and-libraries}

<div class="alert alert-tip">L'intégration manuelle est prise en charge pour Amazon Strands et LiteLLM Proxy. Pour tout autre framework, ou pour un code d'appel personnalisé pour LLM ou pour un outil, utilisez le <a href="/security/ai_guard/setup/sdk/">SDK</a> pour effectuer l'appel. <code>evaluate()</code> dans votre code.</div>

### Python {#python}

| Framework                         | Versions prises en charge | Version du SDK |
| --------------------------------- | ------------------ | -------------- |
| [Amazon Strands](#amazon-strands) | >= 1.29.0          | >= 4.7.0       |
| [LiteLLM Proxy](#litellm-proxy)   | >= 1.78.5          | >= 4.8.0       |

{{< partial name="security-platform/aiguard-sdk-setup.html" target="manual" >}}

## Intégrations {#integrations}

### Amazon Strands {#amazon-strands}
#### Python {#python-1}

L'intégration Amazon Strands permet les évaluations AI Guard pour les applications créées avec le [Amazon Strands Agents SDK][1].

##### Configuration {#setup}

Installez dd-trace-py v4.7.0 ou une version ultérieure :

```shell
pip install ddtrace>=4.7.0
```

Ensuite, définissez le point d'entrée pour l'intégration avec un plugin ou un fournisseur de hook :

* Plugin (recommandé) :

```python
from ddtrace.appsec.ai_guard import AIGuardStrandsPlugin

agent = Agent(
    model=model,
    plugins=[AIGuardStrandsPlugin()]
)
```

* HookProvider (hérité) :

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

L'intégration LiteLLM Proxy permet les évaluations AI Guard pour les applications utilisant le [LiteLLM Proxy][1].

##### Configuration {#setup-1}

Installez dd-trace-py v4.8.0 ou une version ultérieure :

```shell
pip install ddtrace>=4.8.0
```

Importez la barrière de sécurité Datadog pour LiteLLM à côté de votre fichier de configuration (par exemple, `guardrails.py`) :

```python
from ddtrace.appsec.ai_guard.integrations.litellm import DatadogAIGuardGuardrail

__all__ = ["DatadogAIGuardGuardrail"]
```

Ajoutez la barrière de sécurité importée à votre fichier de configuration :

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

La barrière de sécurité prend en charge les trois modes : `pre_call`, `post_call` et `during_call`.

Par défaut, la barrière de sécurité suit la configuration de blocage définie dans les paramètres du service AI Guard. Pour désactiver le blocage, définissez le paramètre `block` sur `false` (équivalent à l'option `block` dans le [SDK][2] et l'[API REST][3]).

[1]: https://docs.litellm.ai/docs/simple_proxy
[2]: /fr/security/ai_guard/setup/sdk/
[3]: /fr/security/ai_guard/setup/http_api/

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}