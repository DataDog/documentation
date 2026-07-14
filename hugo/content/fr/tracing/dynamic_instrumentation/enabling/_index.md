---
aliases:
- /fr/dynamic_instrumentation/enabling/
further_reading:
- link: /agent/
  tag: Documentation
  text: Bien débuter avec lʼAgent Datadog
private: false
title: Activation de lʼinstrumentation dynamique
type: multi-code-lang
---

Lʼinstrumentation dynamique est une fonctionnalité permettant de prendre en charge les bibliothèques de tracing de Datadog. Si vous utilisez déjà [la solution APM pour collecter des traces][1] pour votre application, assurez-vous que votre bibliothèque de tracing est à jour, puis activez lʼinstrumentation dynamique pour votre application.

Sélectionnez votre runtime ci-dessous pour découvrir comment activer lʼinstrumentation dynamique pour votre application :

{{< card-grid card_width="170px" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/java" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/python" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/dotnet" src="integrations_logos/dotnet-core.png" alt="Dotnet" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/dotnet" src="integrations_logos/dotnet-framework.png" alt="Dotnet" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/nodejs" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/ruby" src="integrations_logos/ruby.png" alt="Ruby" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/php" src="integrations_logos/php.png" alt="PHP" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/go" src="integrations_logos/go-metro.png" alt="Go" >}}
{{< /card-grid >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_collection/