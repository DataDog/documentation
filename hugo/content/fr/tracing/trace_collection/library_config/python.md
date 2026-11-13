---
code_lang: python
code_lang_weight: 20
further_reading:
- link: https://github.com/DataDog/dd-trace-py
  tag: Code source
  text: Code source
- link: https://ddtrace.readthedocs.io/en/stable/
  tag: Site externe
  text: Documents relatives à l'API
- link: /tracing/trace_collection/trace_context_propagation/
  tag: Documentation
  text: Propager le contexte de traces
- link: tracing/glossary/
  tag: Documentation
  text: Explorer vos services, ressources et traces
- link: tracing/
  tag: Documentation
  text: Utilisation avancée
- link: /opentelemetry/interoperability/environment_variable_support
  tag: Documentation
  text: Configuration des variables d'environnement OpenTelemetry
title: Configuration du SDK Python
type: multi-code-lang
---
Une fois le SDK intégré à votre code et le Datadog Agent configuré pour collecter les données APM, vous pouvez configurer le SDK selon vos besoins, notamment en configurant [Unified Service Tagging][1].

{{% apm-config-visibility %}}

## Mode sans Agent {#agentless-mode}

À partir de `ddtrace` v4.15.0, vous pouvez envoyer des données directement à Datadog sans Datadog Agent. Pour activer le mode sans Agent, définissez les variables d'environnement suivantes :

- `DD_AGENTLESS_ENABLED` : `true`
- `DD_API_KEY` : votre [clé d'API][3] Datadog
- `DD_SITE` : votre [site Datadog][4]

```shell
export DD_AGENTLESS_ENABLED=true
export DD_API_KEY=<YOUR_API_KEY>
export DD_SITE={{< region-param key="dd_site" >}}
```

Si `DD_AGENTLESS_ENABLED` est `true` et que `DD_API_KEY` n'est pas défini, le SDK génère une erreur au démarrage.

En mode sans Agent, le SDK envoie directement les données suivantes à Datadog :

- Traces
- [Remote Configuration][5]
- [Dynamic Instrumentation][6]
- [Test Optimization][7]
- [LLM Observability][8]

Les fonctionnalités suivantes nécessitent un Agent et n'ont aucun effet en mode sans Agent :

- [Runtime metrics][9]
- [Profiling][10]
- Tracer flares

`DD_CIVISIBILITY_AGENTLESS_ENABLED` et `DD_LLMOBS_AGENTLESS_ENABLED` prennent par défaut la valeur de `DD_AGENTLESS_ENABLED`. Définissez explicitement l'une de ces deux valeurs pour remplacer le réglage du mode sans Agent pour le produit concerné.

Lors de l'utilisation de **ddtrace-run**, les [options de variables d'environnement][2] suivantes peuvent être utilisées :

## Clés de configuration {#configuration-keys}

{{< partial name="apm/registry-config-list.html" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/unified_service_tagging
[2]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtracerun
[3]: /fr/account_management/api-app-keys/#api-keys
[4]: /fr/getting_started/site/
[5]: /fr/remote_configuration/
[6]: /fr/tracing/trace_collection/dynamic_instrumentation/
[7]: /fr/tests/
[8]: /fr/llm_observability/
[9]: /fr/tracing/metrics/runtime_metrics/
[10]: /fr/profiler/