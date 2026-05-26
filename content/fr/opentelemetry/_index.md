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
  tag: Blog
  text: Partenariat de Datadog avec OpenTelemetry
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: Blog
  text: Surveiller les apps instrumentées avec OpenTelemetry grâce à la prise en charge
    du contexte des traces W3C
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
- link: https://learn.datadoghq.com/courses/understanding-opentelemetry
  tag: Centre d'apprentissage
  text: Comprendre OpenTelemetry
title: OpenTelemetry dans Datadog
---
{{< learning-center-callout hide_image="true" header="Essayez \"Introduction à OTel avec Datadog\" dans le Centre d'apprentissageer" btn_title="Inscrivez-vous maintenant" btn_url="https://learn.datadoghq.com/courses/otel-with-datadog">}}
  Apprenez à configurer OpenTelemetry pour exporter des métriques, des traces et des journaux vers Datadog, et explorez les données collectées sur la plateforme.
{{< /learning-center-callout >}}

## Aperçu {#overview}

[OpenTelemetry][1] (OTel) fournit des protocoles standardisés pour la collecte et le routage des données de télémétrie. Datadog prend en charge plusieurs façons de collecter et d'analyser les données de télémétrie provenant d'applications instrumentées par OpenTelemetry, que vous utilisiez l'infrastructure Datadog existante ou que vous préfériez une configuration neutre vis-à-vis des fournisseurs.

### Pourquoi OpenTelemetry avec Datadog&nbsp;? {#why-opentelemetry-with-datadog}

Datadog fournit une observabilité avancée pour toute la télémétrie d'application, quelle que soit sa source. En prenant en charge OpenTelemetry, Datadog offre :

- **Flexibilité et choix**&nbsp;: Utilisez une instrumentation standardisée tout en conservant la liberté de vous adapter à l'évolution de vos besoins technologiques.
- **Support complet des langages**&nbsp;: Surveillez de manière cohérente les applications sur l'ensemble de votre pile technologique.
- **Instrumentation unifiée**&nbsp;: Maintenez une approche unique de l'instrumentation à travers vos systèmes.
- **Analytique puissante**&nbsp;: Combinez la standardisation d'OpenTelemetry avec les capacités d'analyse, de visualisation et d'alerte robustes de Datadog.

Que vous utilisiez déjà OpenTelemetry ou que vous envisagiez de l'adopter, Datadog propose des options flexibles pour répondre à vos besoins.

### Décisions clés {#key-decisions}

Deux décisions principales sont à prendre lorsque vous utilisez OpenTelemetry avec Datadog :

- [Comment instrumenter vos applications](#instrument-your-applications)
- [Comment envoyer vos données à Datadog](#send-opentelemetry-data-to-datadog)

Les fonctionnalités qui vous sont disponibles dépendent de ces choix. Par exemple, utiliser l'API OpenTelemetry avec le SDK Datadog donne accès à plus de fonctionnalités Datadog que d'utiliser uniquement le SDK OpenTelemetry.

Pour en savoir plus, consultez la page relative à la [compatibilité des fonctionnalités][9].

## Instrumentez vos applications {#instrument-your-applications}

Il existe plusieurs façons d'instrumenter vos applications avec OpenTelemetry et Datadog. Chaque approche offre différentes fonctionnalités et niveaux de neutralité vis-à-vis des fournisseurs.

- **OpenTelemetry complet**&nbsp;: Utilisez le SDK et l'API OpenTelemetry pour une configuration neutre vis-à-vis des fournisseurs.
- **API OpenTelemetry**&nbsp;: Utilisez l'API OpenTelemetry avec l'implémentation SDK de Datadog.
- **Bibliothèques d'instrumentation OpenTelemetry**&nbsp;: Étendez l'observabilité de Datadog à d'autres frameworks et technologies.

Pour en savoir plus, consultez la section [Instrumenter vos applications][8].

## Envoyez les données OpenTelemetry à Datadog {#send-opentelemetry-data-to-datadog}

Si vos applications et services sont instrumentés avec des bibliothèques OpenTelemetry, vous pouvez choisir comment envoyer les données de traces, de métriques et de logs à Datadog.

<div class="alert alert-info"><strong>Vous ne savez pas quelle configuration est la bonne pour vous ?</strong><br> Consultez le tableau <a href="/opentelemetry/compatibility/">Compatibilité des fonctionnalités</a> pour comprendre quelles fonctionnalités de Datadog sont prises en charge.</div>

### Option 1 : Utilisez l'Agent Datadog avec le Collecteur DDOT (Recommandé) {#option-1-use-the-datadog-agent-with-ddot-collector-recommended}

{{< img src="/opentelemetry/setup/ddot-collector-2.png" alt="Aperçu de l'architecture pour le Collecteur DDOT, qui est intégré dans l'Agent Datadog." style="width:100%;" >}}

**Idéal pour**&nbsp;: Les utilisateurs cherchant à bénéficier à la fois de la neutralité vis-à-vis des fournisseurs OTel et des innovations de l'écosystème Datadog, telles que&nbsp;:

- Automatisation de flotte
- Surveillance en temps réel des conteneurs
- Explorateur Kubernetes
- Processus en temps réel
- Surveillance du réseau cloud
- Surveillance des services universels
- {{< translate key="integration_count" >}}+ Intégrations Datadog

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/" >}}En savoir plus sur l'utilisation de l'Agent Datadog avec le Collecteur DDOT{{< /nextlink >}}
{{< /whatsnext >}}

### Option 2 : Utilisez le Collecteur OpenTelemetry {#option-2-use-the-opentelemetry-collector}

{{< img src="/opentelemetry/setup/otel-collector.png" alt="Diagramme : le SDK OpenTelemetry dans le code envoie des données via OTLP à un hôte exécutant le Collecteur OpenTelemetry avec l'Exportateur Datadog, qui les transfère à la Plateforme d'Observabilité de Datadog." style="width:100%;" >}}

**Idéal pour** : les utilisateurs d'OTel, qu'ils soient nouveaux ou existants, souhaitant une configuration entièrement neutre vis-à-vis des fournisseurs.

- Neutralité totale vis-à-vis des fournisseurs pour l'envoi de données OpenTelemetry à Datadog
- Options de configuration flexibles telles que le tail-based sampling et les transformations de données

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/" >}}En savoir plus sur l'utilisation du Collecteur OTel{{< /nextlink >}}
{{< /whatsnext >}}

### Options de configuration supplémentaires {#additional-setup-options}

Pour d'autres options de configuration, y compris l'ingestion directe d'OTLP, voir [Envoyer des données à Datadog][7].

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[7]: /fr/opentelemetry/setup
[8]: /fr/opentelemetry/instrument/
[9]: /fr/opentelemetry/compatibility/