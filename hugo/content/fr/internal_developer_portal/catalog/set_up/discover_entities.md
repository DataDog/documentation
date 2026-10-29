---
aliases:
- /fr/software_catalog/set_up/existing_datadog_user
- /fr/software_catalog/import_entries_dd/
- /fr/software_catalog/enrich_default_catalog/import_entries_dd
- /fr/service_catalog/import_entries_dd/
- /fr/service_catalog/enrich_default_catalog/import_entries_dd
- /fr/service_catalog/customize/import_entries_dd
- /fr/software_catalog/customize/import_entries_dd
- /fr/internal_developer_portal/software_catalog/set_up/discover_entities
description: Découvrez comment Catalog détecte automatiquement les entités à partir
  d'APM, d'USM et de RUM, et comment importer des entités supplémentaires à partir
  des métriques et des logs d'infrastructure.
disable_toc: false
further_reading:
- link: logs/processing/pipelines
  tag: Documentation
  text: Pipelines de traitement de logs
title: Découvrir des entités
---
## Présentation {#overview}

Catalog détecte automatiquement les entités à partir de Datadog Application Performance Monitoring (APM), Universal Service Monitoring (USM) et Real User Monitoring (RUM). Vous pouvez également le configurer pour importer des entités à partir des métriques et des logs d'infrastructure.

## Découverte automatique avec APM, USM et RUM {#automatic-discovery-with-apm-usm-and-rum}

Datadog Catalog est pré-rempli avec des entrées détectées via [APM][1], la découverte automatique basée sur eBPF avec [Universal Service Monitoring][2] et les applications RUM.

Toutes les entités détectées automatiquement apparaissent dans le Component Selector de Catalog.

APM et USM détectent automatiquement les types d'entités suivants : `service`, `datastore`, `queue`, `external providers`, `inferred services` et `endpoints`. Les SDK Datadog identifient les dépendances des services instrumentés et les classent comme bases de données, files d'attente ou API tierces, même si ces dépendances ne sont pas directement instrumentées. L'instrumentation personnalisée peut affecter la façon dont les entités sont découvertes et la façon dont `service tag` est attribué. Pour en savoir plus, consultez [APM Inferred Services][3].

RUM est responsable de la découverte des entités `frontend apps`.

Pour plus d'informations sur la découverte des endpoints, consultez [Découvrir les endpoints à partir d'APM][5].

**Remarque** : Les [métriques de performance][6] d'une entité sont liées à ses [opérations principales][7]. Si un service est détecté uniquement par USM, la vue de performance affiche les [métriques USM][9] ; si une entité est détectée uniquement par APM, ou à la fois par APM et USM, la vue de performance affiche les [métriques de trace][8] d'APM.

### Gestion des services nommés automatiquement {#managing-automatically-named-services}

Pour ajuster la façon dont les entités déduites apparaissent dans le Catalog, vous pouvez :

- [Créer une règle de renommage][18] pour identifier une entité par un nom personnalisé.
- [Filtrer les entités][3] par type (base de données, file d'attente, tiers).
- [Supprimer les remplacements de service][4] tels que `service:my-service-http-client` de votre catalogue ou de votre carte.

### Exigences de corrélation pour APM {#correlation-requirements-for-apm}

Pour assurer une auto-corrélation correcte entre APM et le Catalog, suivez ces bonnes pratiques :

- Assurez-vous que vos versions du SDK Datadog et du Datadog Agent prennent en charge les [entités déduites][15].
- Évitez les [remplacements de service][16] arbitraires et utilisez plutôt les [entités déduites][15]. 
  - Les remplacements de service arbitraires peuvent rendre la corrélation peu fiable et encombrer votre catalogue. Ils rendent également le Catalogue difficile à utiliser pour ceux qui ne sont pas familiers avec les noms de remplacement.
- [Renommez les entités déduites][14], comme les datastores et les files d'attente, pour qu'elles correspondent aux conventions de nommage de votre équipe.
- Utilisez le [Unified Service Tagging][17] pour vous assurer que les noms de service, les environnements et les versions correspondent dans APM, l'infrastructure et les définitions du catalogue.
  - Dans Datadog APM, un service est un identifiant utilisé pour regrouper les traces et agréger les métriques, et non nécessairement un service logique. Définissez ce qui constitue un « service » pour votre organisation (par exemple, un espace de noms Kubernetes, un déploiement ou un pod individuel) et appliquez cette définition de manière cohérente sur toutes les sources de télémétrie. 


## Importer des entités à partir de l'infrastructure et des logs {#import-entities-from-infrastructure-and-logs}

Vous pouvez importer des services depuis d'autres télémétries Datadog contenant le `DD_SERVICE` [tag][10] pour remplir le Catalog. Pour découvrir des `kind:service` entités via les métriques d'infrastructure ou les logs Datadog, accédez à l'onglet [**Importer des entrées**][11] du Catalog. 

{{< img src="tracing/software_catalog/import_entries.png" alt="Onglet Importer des entrées dans la section de configuration et de paramétrage du Catalog" style="width:90%;" >}}

Après l'importation, les entrées apparaissent dans l'onglet **Explorer**. Les entrées peuvent expirer à moins que vous n'ajoutiez des métadonnées, telles que le propriétaire ou les contacts, en [utilisant l'API][12], l'[intégration GitHub][13] ou l'[intégration GitLab][14].

Pour supprimer les services importés de la vue **Explorer** par défaut, cliquez sur **Clear Previously Imported Services** dans l'onglet [**Importer des entrées**][11]. Cela supprime tous les services qui ne possèdent pas de métadonnées ou qui ne disposent pas de télémétrie APM, Universal Service Monitoring (USM) ou Real User Monitoring (RUM).

{{< img src="tracing/software_catalog/clear_imported_services.png" alt="Confirmez la suppression des services précédemment importés dans la section de configuration et de paramétrage du Catalog" style="width:90%;" >}}


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/
[2]: /fr/universal_service_monitoring/
[3]: /fr/tracing/services/inferred_services/
[4]: /fr/tracing/guide/service_overrides/
[5]: /fr/internal_developer_portal/catalog/endpoints/
[6]: https://app.datadoghq.com/software?lens=performance
[7]: /fr/tracing/guide/configuring-primary-operation/
[8]: /fr/tracing/metrics/metrics_namespace/
[9]: /fr/universal_service_monitoring/guide/using_usm_metrics/#usm-metrics-vs-apm-metrics
[10]: /fr/getting_started/tagging/unified_service_tagging/
[11]: https://app.datadoghq.com/software/settings/get-started
[12]: /fr/internal_developer_portal/catalog/entity_model/
[13]: /fr/integrations/github/
[14]: /fr/integrations/gitlab-source-code/
[14]: /fr/tracing/services/renaming_rules/#step-3-name-your-rule-and-review
[15]: /fr/tracing/services/inferred_services/?tab=agentv7600#set-up-inferred-services
[16]: /fr/tracing/guide/service_overrides/#how-service-overrides-are-set
[17]: /fr/getting_started/tagging/unified_service_tagging/
[18]: /fr/tracing/services/renaming_rules/