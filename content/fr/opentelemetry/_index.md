---
algolia:
  tags:
  - opentelemetry
  - open telemetry
  - otel
aliases:
- /fr/tracing/setup_overview/open_standards/
- /fr/opentelemetry/interoperability/
cascade:
  algolia:
    rank: 70
further_reading:
- link: /opentelemetry/compatibility/
  tag: Documentation
  text: Compatibilité des fonctionnalités
- link: /opentelemetry/instrument/
  tag: Documentation
  text: Instrumenter vos applications
- link: /opentelemetry/setup/
  tag: Documentation
  text: Envoyer des données à Datadog
- link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
  tag: GitHub
  text: Partenariat de Datadog avec OpenTelemetry
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: GitHub
  text: Surveiller les applications instrumentées avec OpenTelemetry grâce à la prise
    en charge du contexte des traces W3C
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/
  tag: Blog
  text: Envoyer des métriques et des traces depuis le Collector OpenTelemetry vers
    Datadog via l'exportateur Datadog
- link: https://www.datadoghq.com/blog/opentelemetry-logs-datadog-exporter/
  tag: Blog
  text: Transmettre des logs depuis le Collector OpenTelemetry avec l'exportateur
    Datadog
- link: https://www.datadoghq.com/about/latest-news/press-releases/datadog-announces-opentelemetry-protocol-support/
  tag: Blog
  text: Ingestion OTLP dans l'Agent
- link: https://www.datadoghq.com/blog/aws-opentelemetry-lambda-layer-datadog/
  tag: Blog
  text: En savoir plus sur la couche Lambda gérée AWS pour OpenTelemetry
- link: https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/
  tag: Blog
  text: Mettre en corrélation les événements RUM Datadog avec les traces de vos applications
    instrumentées via OpenTelemetry
- link: https://www.datadoghq.com/blog/opentelemetry-runtime-metrics-datadog/
  tag: Blog
  text: Surveillez les métriques d'exécution des applications instrumentées avec OTel
    via la solution APM de Datadog
- link: https://www.datadoghq.com/blog/otel-deployments/
  tag: Blog
  text: Comment choisir votre déploiement OpenTelemetry
- link: https://learn.datadoghq.com/courses/otel-with-datadog
  tag: Centre d'apprentissage
  text: Introduction à OpenTelemetry avec Datadog
title: OpenTelemetry dans Datadog
---

{{< learning-center-callout hide_image="true" header="Try \"Essayez l'Introduction à OTel avec Datadog dans le centre d'apprentissage" btn_title="Inscrivez-vous" btn_url="https://learn.datadoghq.com/courses/otel-with-datadog">}}
  Découvrez comment configurer OpenTelemetry pour exporter des métriques, des traces et des logs vers Datadog, et explorez les données collectées sur la plateforme.
{{< /learning-center-callout >}}

## Section Overview

[OpenTelemetry][1] (OTel) fournit des protocoles standardisés pour collecter et router les données de télémétrie. Datadog prend en charge plusieurs méthodes pour collecter et analyser les données de télémétrie issues d'applications instrumentées avec OpenTelemetry, que vous utilisiez l'infrastructure Datadog existante ou une configuration indépendante du fournisseur.

### Pourquoi utiliser OpenTelemetry avec Datadog ?

Datadog fournit une observabilité avancée pour toute votre télémétrie applicative, quelle qu'en soit la source. En prenant en charge OpenTelemetry, Datadog propose :

- **La souplesse et la liberté** : utilisez une instrumentation standardisée tout en conservant la flexibilité nécessaire à l'évolution de votre infrastructure.
- **La prise en charge complète des langages** : surveillez vos applications de façon cohérente sur l'ensemble de votre pile technologique.
- **Une instrumentation unifiée** : appliquez une approche unique à l'instrumentation de vos systèmes.
- **Des analyses puissantes** : associez la standardisation d'OpenTelemetry aux capacités d'analyse, de visualisation et d'alerte de Datadog.

Que vous utilisiez déjà OpenTelemetry ou que vous envisagiez de l'adopter, Datadog propose des options flexibles pour répondre à vos besoins.

### Décisions clés

Deux décisions principales sont à prendre lorsque vous utilisez OpenTelemetry avec Datadog :

- [Comment instrumenter vos applications](#instrumenter-vos-applications) 
- [Comment envoyer vos données à Datadog](#envoyer-des-donnees-opentelemetry-a-datadog)

Les fonctionnalités disponibles dépendent de ces choix. Par exemple, l'utilisation de l'API OpenTelemetry avec le SDK de Datadog donne accès à plus de fonctionnalités Datadog que l'utilisation du SDK OpenTelemetry seul.

Pour en savoir plus, consultez la page relative à la [compatibilité des fonctionnalités][9].

## Instrumenter vos applications

Il existe plusieurs manières d'instrumenter vos applications avec OpenTelemetry et Datadog. Chaque approche propose des fonctionnalités et un niveau d'indépendance vis-à-vis des fournisseurs différents.

- **OpenTelemetry complet** : utilisez le SDK et l'API OpenTelemetry pour une configuration neutre vis-à-vis du fournisseur.
- **API OpenTelemetry** : utilisez l'API OpenTelemetry avec l'implémentation du SDK de Datadog.
- **Bibliothèques d'instrumentation OpenTelemetry** : étendez l'observabilité de Datadog à d'autres frameworks et technologies.

Pour en savoir plus, consultez la section [Instrumenter vos applications][8].

## Envoyer des données OpenTelemetry à Datadog

Si vos applications et services sont instrumentés avec des bibliothèques OpenTelemetry, vous pouvez choisir comment envoyer les données de traces, de métriques et de logs à Datadog.

<div class="alert alert-info"><strong>Vous ne savez pas quelle configuration est la plus adaptée ?</strong><br> Consultez le tableau <a href="/opentelemetry/compatibility/">Compatibilité des fonctionnalités</a> pour savoir quelles fonctionnalités Datadog sont prises en charge.</div>

### Option 1 : utiliser le collector OpenTelemetry

{{< img src="/opentelemetry/setup/otel-collector.png" alt="Diagramme : le SDK OpenTelemetry dans le code envoie des données via OTLP vers un host exécutant le collector OpenTelemetry avec le Datadog Exporter, qui les transmet à la plateforme d'observabilité de Datadog." style="width:100%;" >}}

**Idéal pour** : les utilisateurs OTel (nouveaux ou existants) souhaitant une configuration totalement indépendante du fournisseur.

- Neutralité totale vis-à-vis du fournisseur pour l'envoi des données OpenTelemetry vers Datadog
- Options de configuration flexibles comme l'échantillonnage basé sur la fin des traces (tail-based sampling) et les transformations de données

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/" >}}En savoir plus sur l'utilisation du collector OTel{{< /nextlink >}}
{{< /whatsnext >}}

### Option 2 : Utiliser l'Agent Datadog avec le collector DDOT

{{< img src="/opentelemetry/setup/ddot-collector-2.png" alt="Vue d'ensemble de l'architecture du collector DDOT, intégré à l'Agent Datadog." style="width:100%;" >}}

**Idéal pour** : les utilisateurs actuels de Datadog ou les équipes ayant besoin de fonctionnalités basées sur l'Agent, comme :

- Fleet Automation
- Container Monitoring en direct
- Kubernetes Explorer
- Live processes
- Surveillance du réseau cloud
- Universal Service Monitoring
- {{< translate key="integration_count" >}}+ intégrations Datadog

<div class="alert alert-info">Pour consulter la liste complète des fonctionnalités basées sur l'Agent, consultez la section <strong>OTel vers l'Agent Datadog (OTLP)</strong> dans la page relative à la <a href="/opentelemetry/compatibility/">compatibilité des fonctionnalités</a>.</div>

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/" >}}En savoir plus sur l'utilisation de l'Agent Datadog avec le collector DDOT{{< /nextlink >}}
{{< /whatsnext >}}

### Autres options de configuration

Pour d'autres options de configuration, y compris un déploiement sans Agent, consultez la section [Envoyer des données à Datadog][7].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[7]: /fr/opentelemetry/setup
[8]: /fr/opentelemetry/instrument/
[9]: /fr/opentelemetry/compatibility/