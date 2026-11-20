---
description: Apprenez à configurer l'échantillonnage basé sur les ressources afin
  de contrôler l'ingestion des traces en fonction des ressources spécifiques et des
  points de terminaison pour optimiser les coûts.
disable_toc: false
further_reading:
- link: /tracing/trace_pipeline/ingestion_mechanisms
  tag: Documentation
  text: Mécanismes d'ingestion
- link: /tracing/trace_pipeline/ingestion_controls
  tag: Documentation
  text: Page Ingestion Control
- link: https://www.datadoghq.com/architecture/optimizing-distributed-tracing-best-practices-for-remaining-within-budget-and-capturing-critical-traces/
  tag: Architecture Center
  text: 'Optimiser le traçage distribué : bonnes pratiques pour respecter le budget
    et capturer les traces critiques'
site_support_id: resource_based_sampling
title: Échantillonnage basé sur les ressources
---
## Présentation {#overview}

La configuration à distance vous permet de définir dynamiquement les [taux d'échantillonnage par service et par nom de ressource][7], depuis le Datadog UI, sans avoir à redéployer votre service.

## Prérequis {#requirements}

- Datadog Agent [7.41.1][2] ou version ultérieure.
- [Remote Configuration][3] activée pour votre Agent.
- `APM Remote Configuration Write` [permissions][4]. Si vous ne disposez pas de ces autorisations, demandez à votre administrateur Datadog de les mettre à jour depuis les paramètres de votre organisation.

### Version de la bibliothèque de tracing {#tracing-library-version}

Vous trouverez ci-dessous la version minimale du SDK requise pour cette fonctionnalité :

Langage  | Version minimale requise
----------|--------------------------
Java      | [v1.34.0][5]
Go        | [v1.64.0][6]
Python    | [v.2.9.0][10]
Ruby      | [v2.4.0][11]
Node.js   | [v5.16.0][12]
PHP       | [v1.4.0][15]
.NET      | [v.2.53.2][13]
C++       | [v0.2.2][14]

## Consultez les taux d'échantillonnage par ressource sur la page Ingestion Control {#see-sampling-rates-by-resource-in-the-ingestion-control-page}

Pour voir les taux d'échantillonnage configurés par ressource, accédez au résumé de l'ingestion de service [Service Ingestion summary][1] dans les Ingestion controls. Le tableau répertorie le taux d'échantillonnage appliqué par ressource du service.

{{< img src="/tracing/trace_indexing_and_ingestion/resource_sampling_rates.png" alt="Tableau des taux d'échantillonnage par ressource" style="width:100%;">}}

- La colonne `Ingested bytes` affiche les octets ingérés à partir des spans du service et de la ressource, tandis que la colonne `Downstream bytes` affiche les octets ingérés à partir des spans où la décision d'échantillonnage est prise à partir de ce service et de cette ressource, y compris les octets provenant des services en aval dans la chaîne d'appel.
- La colonne `Configuration` indique où le taux d'échantillonnage de la ressource est appliqué : 
  - `Automatic` si le [default head-based sampling mechanism][8] de l'Agent s'applique.
  - `Local Configured` si une [règle d'échantillonnage][7] a été définie localement dans le SDK.
  - `Remote Configured` si une règle d'échantillonnage à distance a été définie depuis l'interface utilisateur Datadog. Pour savoir comment configurer des règles d'échantillonnage depuis la page Ingestion Control, lisez la section sur la [configuration à distance des règles d'échantillonnage](#remotely-configure-sampling-rules-for-the-service).

## Configurer à distance les règles d'échantillonnage pour le service {#remotely-configure-sampling-rules-for-the-service}

Pour configurer les taux d'échantillonnage pour le service par nom de ressource : 
1. Cliquez sur {{< ui >}}Manage Ingestion rate{{< /ui >}}. Si l'option de configuration à distance est désactivée, assurez-vous que les [prérequis](#compatibility-requirements) listés sont tous remplis.
   {{< img src="/tracing/trace_indexing_and_ingestion/sampling_configuration_modal.png" alt="Fenêtre modale de configuration" style="width:100%;">}}
1. Cliquez sur {{< ui >}}Add new rule{{< /ui >}} pour définir les taux d'échantillonnage pour certaines ressources. Les règles d'échantillonnage utilisent les motifs glob pour la correspondance, vous pouvez donc utiliser des caractères génériques (`*`) pour faire correspondre plusieurs ressources en même temps.
1. Cliquez sur {{< ui >}}Apply{{< /ui >}} pour enregistrer la configuration.

La configuration devrait prendre effet en moins d'une minute. Vous pouvez observer les changements de configuration depuis le [Live Search Explorer][9].

Depuis le {{< ui >}}Service Ingestion Summary{{< /ui >}}, les ressources pour lesquelles les taux d'échantillonnage sont appliqués à distance devraient apparaître comme `Remote Configured` dans la colonne {{< ui >}}Configuration{{< /ui >}}.



## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_pipeline/ingestion_controls#service-ingestion-summary
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.41.1
[3]: /fr/tracing/guide/remote_config/
[4]: /fr/account_management/rbac/permissions/
[5]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.34.0
[6]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.63.1
[7]: /fr/tracing/trace_pipeline/ingestion_mechanisms#in-tracing-libraries-user-defined-rules
[8]: /fr/tracing/trace_pipeline/ingestion_mechanisms#in-the-agent
[9]: /fr/tracing/trace_explorer/#live-search-for-15-minutes
[10]: https://github.com/DataDog/dd-trace-py/releases/tag/v2.9.0
[11]: https://github.com/DataDog/dd-trace-rb/releases/tag/v2.4.0
[12]: https://github.com/DataDog/dd-trace-js/releases/tag/v5.16.0
[13]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.53.2
[14]: https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.2.2
[15]: https://github.com/DataDog/dd-trace-php/releases/tag/1.4.0