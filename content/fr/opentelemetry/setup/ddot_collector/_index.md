---
aliases:
- /fr/opentelemetry/agent/
further_reading:
- link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
  tag: Blog
  text: Datadog LLM Observability prend en charge nativement les conventions sémantiques
    OpenTelemetry GenAI
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: Blog
  text: Centralisez et gérez votre pipeline OpenTelemetry avec la passerelle DDOT
- link: https://www.datadoghq.com/blog/datadog-distribution-otel-collector/
  tag: Blog
  text: Unifiez OpenTelemetry et Datadog avec le Collecteur DDOT
- link: https://learn.datadoghq.com/courses/using-ddot
  tag: Centre d'apprentissage
  text: Utilisation de la distribution Datadog du Collecteur OpenTelemetry
title: Distribution Datadog du Collecteur OpenTelemetry
---
{{< callout btn_hidden="true" >}}
Le Collecteur DDOT pour Kubernetes est <strong>Généralement Disponible</strong>. Vous pouvez commencer en suivant les <a href="#get-started">instructions ci-dessous</a>.
<br><br>
Le déploiement du Collecteur DDOT sur des hôtes bare-metal et des machines virtuelles basées sur Linux est <strong>en Aperçu</strong>. Pour commencer, suivez la <a href="/opentelemetry/setup/ddot_collector/install/linux">documentation Linux</a>.
{{< /callout >}}

## Aperçu {#overview}

La distribution Datadog du Collecteur OpenTelemetry (DDOT) est une solution open source qui combine la flexibilité d'OpenTelemetry (OTel) avec les capacités d'observabilité complètes de Datadog. Cette solution intégrée comprend :

- Un ensemble sélectionné de [composants OpenTelemetry](#included-components) optimisés pour la performance et la fiabilité avec Datadog, avec la possibilité d'ajouter des composants supplémentaires de votre choix
- Des capacités complètes de collecte et de traitement des données de l'Agent Datadog pour une intégration transparente et un suivi robuste, y compris le support de l'[Automatisation de Flotte Datadog][9] pour le Collecteur DDOT (voir [Avantages clés](#key-benefits))
- [Composants Datadog personnalisés](#custom-datadog-components) conçus pour offrir la meilleure expérience d'intégration

{{< img src="/opentelemetry/setup/ddot-collector-2.png" alt="Aperçu de l'architecture pour le Collecteur DDOT, qui est intégré dans l'Agent Datadog." style="width:100%;" >}}

## Avantages clés {#key-benefits}

Le Collecteur DDOT offre :

### Une observabilité complète {#comprehensive-observability}

- Accès {{< translate key="integration_count" >}} Intégrations Datadog, [Surveillance des conteneurs en direct][3], [Surveillance du réseau cloud][7], et [Surveillance des services universels][5] (avec eBPF) et plus encore
- Exploitez les intégrations apportées par la communauté OpenTelemetry pour collecter la télémétrie au format natif du protocole OpenTelemetry (OTLP)
- Contrôlez vos données OTLP avec les capacités de traitement et de routage du Collecteur

### Gestion de flotte simplifiée {#simplified-fleet-management}

- Gérez à distance des flottes de Collecteurs DDOT avec [Automatisation de flotte Datadog][9]
- Obtenez une visibilité sur l'ensemble de votre configuration, de vos dépendances et de votre environnement d'exécution
- Accélérez votre intégration grâce à l'enrichissement de balisage prêt à l'emploi pour les données OTLP, activant automatiquement [unified service tagging][1]

### Fiabilité et ressources d'entreprise {#enterprise-reliability-and-resources}

- Bénéficiez des pratiques de sécurité robustes de Datadog, y compris des analyses et des scans de vulnérabilité réguliers
- Accédez à l'équipe de support mondial de Datadog pour obtenir de l'aide lors de l'intégration et du dépannage

## Composants inclus {#included-components}

<div class="alert alert-info">
  <strong>Besoin de composants OpenTelemetry supplémentaires&nbsp;?</strong> Si vous avez besoin de composants au-delà de ceux inclus dans le package par défaut, suivez <a href="/opentelemetry/setup/ddot_collector/custom_components">Utiliser des composants OpenTelemetry personnalisés</a> pour étendre les capacités de l'Agent Datadog. Pour une liste des composants inclus par défaut, consultez la section suivante <a href="#opentelemetry-collector-components">Les composants du Collecteur OpenTelemetry</a>.
</div>

### Versions du Collecteur OpenTelemetry {#opentelemetry-collector-versions}

Le tableau suivant montre quelles versions du Collecteur OpenTelemetry sont incluses dans chaque version DDOT :

| Version DDOT | Version bêta | Version stable |
|---|---|---|
| 7.78.0 | v0.147.0 | v1.53.0 |
| 7.77.0 | v0.145.0 | v1.51.1-0.20260205185216-81bc641f26c0 |
| 7.76.0 | v0.144.0 | v1.50.0 |
| 7.75.0 | v0.142.0 | v1.48.0 |
| 7.74.0 | v0.140.0 | v1.46.0 |
| 7.73.0 | v0.138.0 | v1.44.0 |
| 7.72.0 | v0.136.0 | v1.42.0 |
| 7.71.0 | v0.133.0 | v1.39.0 |
| 7.70.0 | v0.131.0 | v1.37.0 |
| 7.69.0 | v0.129.0 | v1.35.0 |

### Niveaux de support {#support-levels}

Pour des détails sur Datadog, la communauté et le support des composants personnalisés, voir [Niveaux de support][57] sur la page de compatibilité.

### Composants du Collecteur OpenTelemetry {#opentelemetry-collector-components}

Par défaut, le Collecteur DDOT est livré avec les composants suivants du Collecteur. Vous pouvez également voir la liste au format [YAML][11].

{{% collapse-content title="Récepteurs" level="p" %}}

- [filelogreceiver][16]
- [fluentforwardreceiver][17]
- [hostmetricsreceiver][18]
- [jaegerreceiver][19]
- [otlpreceiver][20]
- [prometheusreceiver][21]
- [receivercreator][22]
- [zipkinreceiver][23]
- [nopreceiver][24]

{{% /collapse-content %}}

{{% collapse-content title="Processeurs" level="p" %}}

- [attributesprocessor][25]
- [batchprocessor][26]
- [cumulativetodeltaprocessor][27]
- [filterprocessor][28]
- [groupbyattributeprocessor][29]
- [k8sattributesprocessor][30]
- [memorylimiterprocessor][31]
- [probabilisticsamplerprocessor][32]
- [resourcedetectionprocessor][33]
- [resourceprocessor][34]
- routingprocessor (deprecated and removed in v7.71.0; use the [routingconnector][56] instead)
- [tailsamplingprocessor][36]
- [transformprocessor][37]

{{% /collapse-content %}}

{{% collapse-content title="Exportateurs" level="p" %}}

- [datadogexporter][38]
- [debugexporter][39]
- [loadbalancingexporter][55]
- [otlpexporter][40]
- [otlphttpexporter][41]
- [sapmexporter][42]
- [nopexporter][43]

{{% /collapse-content %}}

{{% collapse-content title="Connecteurs" level="p" %}}

- [datadogconnector][44]
- [routingconnector][56] (disponible depuis la version 7.68.0)
- [spanmetricsconnector][45]

{{% /collapse-content %}}

{{% collapse-content title="Extensions" level="p" %}}

- [healthcheckextension][46]
- [observer][47]
- [pprofextension][48]
- [zpagesextension][49]

{{% /collapse-content %}}

### Composants personnalisés Datadog {#custom-datadog-components}

En plus des composants OpenTelemetry standard, Datadog fournit et maintient les composants personnalisés suivants :

{{% collapse-content title="Composants Datadog" level="p" %}}

- [Infrastructure Attribute Processor][50] : Un composant OpenTelemetry qui attribue automatiquement [Kubernetes tags][53] à la télémétrie OTLP (métriques, traces et logs) émise par un pod ou un conteneur individuel au sein d'un pod. Ce composant permet [unified service tagging][54] et la corrélation de la télémétrie pour la surveillance des environnements Kubernetes.

- [Converter][51] : Un composant convertisseur OpenTelemetry qui améliore les configurations fournies par l'utilisateur. Il offre une API pour retourner à la fois les configurations originales et améliorées, vérifiant automatiquement les erreurs de configuration connues pour réduire les erreurs. Cela garantit une intégration transparente des configurations existantes du Collecteur OpenTelemetry avec l'Agent.

- [DD Flare Extension][52] : Un composant d'extension OpenTelemetry pour générer l'Agent Flare, qui contient des informations de diagnostic provenant à la fois du Collecteur DDOT et de l'Agent à des fins de dépannage.

{{% /collapse-content %}}

## Commencer {#get-started}

Que vous soyez nouveau sur Datadog ou déjà familier avec OpenTelemetry, les guides suivants vous aideront à commencer en fonction de votre situation spécifique.

### Démarrage rapide avec le package Agent par défaut {#quick-start-with-the-default-agent-package}

Le package Agent par défaut de Datadog comprend le Collecteur DDOT avec un [ensemble sélectionné de composants OpenTelemetry inclus](#included-components), conçu pour répondre à la plupart des besoins dès le départ. Ce guide est adapté si vous êtes :

- Mise en place de la surveillance depuis le début sans avoir besoin de composants OpenTelemetry en dehors des [composants inclus](#included-components)
- Utilisation de l'Agent Datadog et souhaitant tester la fonctionnalité OpenTelemetry avec les composants inclus
- Transition de l'OpenTelemetry Collector vers l'Agent Datadog sans nécessiter de composants au-delà de ceux inclus par défaut
- (Optionnel) Si vous avez besoin de composants OpenTelemetry au-delà de ceux fournis dans le package par défaut, suivez [Utiliser des composants OpenTelemetry personnalisés][2] pour étendre les capacités de l'Agent Datadog.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/install/kubernetes" >}}Démarrage rapide avec le package Agent par défaut{{< /nextlink >}}
{{< /whatsnext >}}

### Migrer de l'OpenTelemetry Collector vers le Datadog Agent {#migrate-from-opentelemetry-collector-to-datadog-agent}

Ce guide vous aide à migrer d'une configuration existante d'OpenTelemetry Collector vers le Datadog Agent, y compris dans les scénarios où l'ajout de composants OpenTelemetry est nécessaire. Ce guide est adapté si vous êtes :

- Transition de l'OpenTelemetry Collector tout en préservant votre configuration existante
- Migration de vos configurations OpenTelemetry existantes pour maintenir la continuité
- (Optionnel) Si vous avez besoin de composants OpenTelemetry au-delà de ceux fournis dans le package par défaut, suivez [Utiliser des composants OpenTelemetry personnalisés][2] pour étendre les capacités du Datadog Agent

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/guide/migrate/ddot_collector" >}}Migrer de l'OpenTelemetry Collector vers le Datadog Agent{{< /nextlink >}}
{{< /whatsnext >}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/unified_service_tagging/
[2]: /fr/opentelemetry/setup/ddot_collector/custom_components
[3]: /fr/containers/
[4]: /fr/security/sensitive_data_scanner/
[5]: /fr/universal_service_monitoring/
[7]: /fr/network_monitoring/cloud_network_monitoring/
[9]: /fr/agent/fleet_automation/
[11]: https://github.com/DataDog/datadog-agent/blob/main/comp/otelcol/collector-contrib/impl/manifest.yaml
[16]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/filelogreceiver/README.md
[17]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/fluentforwardreceiver/README.md
[18]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/hostmetricsreceiver/README.md
[19]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/jaegerreceiver/README.md
[20]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/receiver/otlpreceiver/README.md
[21]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/prometheusreceiver/README.md
[22]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/receivercreator/README.md
[23]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/zipkinreceiver/README.md
[24]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/receiver/nopreceiver#readme
[25]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/attributesprocessor/README.md
[26]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/batchprocessor/README.md
[27]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/cumulativetodeltaprocessor/README.md
[28]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/filterprocessor/README.md
[29]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/groupbyattrsprocessor/README.md
[30]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/k8sattributesprocessor/README.md
[31]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/memorylimiterprocessor/README.md
[32]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/probabilisticsamplerprocessor/README.md
[33]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/resourcedetectionprocessor/README.md
[34]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/resourceprocessor/README.md
[36]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/tailsamplingprocessor/README.md
[37]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/transformprocessor/README.md
[38]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/README.md
[39]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/debugexporter/README.md
[40]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlpexporter/README.md
[41]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlphttpexporter/README.md
[42]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/sapmexporter/README.md
[43]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/nopexporter/README.md
[44]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/datadogconnector/README.md
[45]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/spanmetricsconnector/README.md
[46]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/healthcheckextension/README.md
[47]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/observer/README.md
[48]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/pprofextension/README.md
[49]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/extension/zpagesextension/README.md
[50]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/otlp/components/processor/infraattributesprocessor#readme
[51]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/converter#readme
[52]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/ddflareextension#readme
[53]: /fr/containers/kubernetes/tag/?tab=datadogoperator#out-of-the-box-tags
[54]: /fr/getting_started/tagging/unified_service_tagging/?tab=kubernetes
[55]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/loadbalancingexporter/README.md
[56]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/routingconnector/README.md
[57]: /fr/opentelemetry/compatibility/#support-levels