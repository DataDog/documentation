---
aliases:
- /fr/tracing/trace_ingestion/control_page
- /fr/tracing/trace_ingestion/ingestion_control_page
- /fr/account_management/billing/usage_control_apm/
- /fr/tracing/app_analytics/
- /fr/tracing/guide/ingestion_control_page/
- /fr/tracing/trace_ingestion/ingestion_controls
description: Découvrez comment contrôler les taux d'ingestion avec la solution APM.
further_reading:
- link: /tracing/trace_pipeline/ingestion_mechanisms/
  tag: Documentation
  text: Mécanismes d'ingestion
- link: /tracing/trace_pipeline/metrics/
  tag: Documentation
  text: Métriques d'utilisation
title: Paramètres d'ingestion
---

{{< img src="tracing/apm_lifecycle/ingestion_sampling_rules.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Règles d'échantillonnage de l'ingestion" >}}

Les paramètres d'ingestion permettent de choisir les traces qui sont envoyées à Datadog par vos applications. Les [métriques APM][1] sont toujours calculées en fonction de l'intégralité des traces, et ne sont pas impactées par les paramètres d'ingestion.

La page Ingestion Control présente les paramètres d'ingestion configurés pour vos applications et services au niveau de l'Agent et des bibliothèques de tracing. Depuis la [page de configuration des paramètres d'ingestion][2], vous pouvez :
- Consulter les paramètres d'ingestion configurés pour chaque service et ajuster les taux d'échantillonnage des traces pour les services ayant un débit de traces élevé
- Identifier les mécanismes d'ingestion qui échantillonnent le plus de traces
- Étudier les potentiels problèmes de configuration de l'ingestion, par exemple un Agent avec des ressources de processeur ou de mémoire limitées, et prendre des mesures en conséquence

{{< img src="tracing/trace_indexing_and_ingestion/ingestion_controls_page.png" style="width:100%;" alt="Aperçu de la page Ingestion Control" >}}

Toutes les métriques de la page représentent le trafic en temps réel généré au cours de l'**heure passée**. Cette page tient compte de toutes les modifications apportées à un Agent ou une bibliothèque.

## Synthèse de l'ensemble des environnements

Consultez une vue d'ensemble des données ingérées au cours de la dernière heure, ainsi qu'une estimation de votre utilisation mensuelle par rapport à votre allocation mensuelle. L'estimation est calculée en fonction de l'infrastructure APM active (hosts, tâches Fargate et fonctions sans serveur).

Si votre utilisation mensuelle est inférieure à `100%`, votre volume de données ingérées ne devrait pas dépasser votre [allocation mensuelle][3]. Toute valeur supérieure à `100%` indique que le volume mensuel de données ingérées devrait dépasser votre allocation mensuelle.

## Gérer l'ingestion pour l'ensemble des services au niveau de l'Agent

Avant de modifier les paramètres d'ingestion de vos services dans les bibliothèques de tracing, il est nécessaire de configurer une partie du volume ingéré depuis l'Agent Datadog.

Cliquez sur **Manage Agent Ingestion** pour obtenir des instructions relatives à la configuration de l'échantillonnage par l'Agent.

{{< img src="tracing/trace_indexing_and_ingestion/agent_level_configurations_modal.png" style="width:70%;" alt="Fenêtre de configuration au niveau de l'Agent" >}}

Il est possible de configurer l'échantillonnage de trois mécanismes d'ingestion différents dans l'Agent Datadog :
- **[Échantillonnage en amont][4]** : si aucune règle d'échantillonnage n'est définie pour un service, l'Agent Datadog calcule automatiquement les taux d'échantillonnage à appliquer dans les bibliothèques, avec un objectif de 10 traces par seconde et par Agent. Le paramètre `DD_APM_MAX_TPS` vous permet de modifier le nombre de traces cible par seconde.
-  **[Échantillonnage des spans d'erreur][5]** : pour les traces qui n'ont pas été interceptées par l'échantillonnage en mont, l'Agent Datadog récupère les traces d'erreur locales à hauteur de 10 traces par seconde et par Agent maximum. Le paramètre `DD_APM_ERROR_TPS` vous permet de modifier le nombre de traces cible par seconde.
-  **[Échantillonnage des spans rares][6]** : pour les traces qui n'ont pas été interceptées par l'échantillonnage en mont, l'Agent Datadog récupère les traces rares locales à hauteur de 5 traces par seconde et par Agent maximum. Ce paramètre est désactivé par défaut. Utilisez `DD_APM_ENABLE_RARE_SAMPLER` pour activer la collecte des traces rares.

**Remarque** : la tranche `Other Ingestion Reasons` des graphiques circulaires (représentée en gris) correspond aux autres motifs d'ingestion qui _ne peuvent pas être configurés_ au niveau de l'Agent Datadog.

### Configuration à distance des paramètres d'ingestion de l'Agent

<div class="alert alert-warning">La fonctionnalité Remote Configuration pour les paramètres d'ingestion est disponible en version bêta. Contactez l'<a href="/help/">assistance Datadog</a> pour y accéder.</div>

Il est possible de configurer ces paramètres à distance à partir de la version [7.42.0][13] de l'Agent. Consultez la section [Fonctionnement de Remote Configuration][14] pour découvrir comment activer cette fonctionnalité dans vos Agents.

La fonctionnalité Remote Configuration vous permet de modifier les paramètres sans avoir à redémarrer l'Agent. Cliquez sur `Apply` pour enregistrer vos modifications et appliquer la nouvelle configuration sans attendre.

**Remarque** : les paramètres configurés à distance prévalent sur les configurations locales, à savoir les variables d'environnement et le fichier de configuration `datadog.yaml`.

## Gérer l'ingestion pour un service spécifique au niveau de la bibliothèque

Le tableau des services fournit des informations sur les volumes ingérés et les paramètres d'ingestion pour chaque service :

Type
: Le type de service : service Web, base de données, cache, navigateur, etc.

Name
: Le nom de chaque service envoyant des traces à Datadog. Le tableau contient des services root et non root dont les données ont été ingérées au cours de la dernière heure.

Ingested Traces/s
: Le nombre moyen de traces ingérées toutes les secondes pour le service au cours de la dernière heure.

Ingested Bytes/s
: Le nombre moyen d'octets ingérés toutes les secondes par Datadog pour le service au cours de la derrière heure.

Downstream Bytes/s
: Le nombre moyen d'octets ingérés par seconde pour les *décisions d'ingestion prises au niveau du service*. Cela inclut les octets de toutes les spans enfant en aval qui suivent la décision prise en amont de la trace, ainsi que les spans interceptées par le [service d'échantillonnage de traces d'erreur][5], le [service d'échantillonnage de traces rares][6] et le mécanisme [App Analytics][7]. 

Traffic Breakdown
: Une analyse détaillée du trafic échantillonné et du trafic non échantillonné pour les traces initiées par le service. Consultez la section [Analyse du trafic](#analyse-du-trafic) pour en savoir plus.

Ingestion Configuration
: Affiche `Automatic` si le [mécanisme d'échantillonnage en amont par défaut][4] de l'Agent est appliqué. Si l'ingestion a été configurée dans les bibliothèques de tracing à l'aide de [règles d'échantillonnage des traces][8], la valeur `Configured` est indiquée. Pour en savoir plus sur la configuration de l'ingestion pour un service, découvrez comment [modifier le taux d'ingestion par défaut](#configurer-le-taux-d-ingestion-d-un-service).

Infrastructure
: Les hosts, les conteneurs et les fonctions sur lesquels le service s'exécute.

Service status
: Affiche `Limited Resource` lorsque des spans ont été perdues parce que les ressources CPU ou RAM [allouées dans la configuration de l'Agent Datadog][9] sont insuffisantes, `Legacy Setup` lorsque des spans ont été ingérées via l'ancien [mécanisme App Analytics][7] ou `OK` dans les autres cas.

Filtrez la page par environnement, configuration et statut pour visualiser les services qui nécessitent une action de votre part. Pour réduire le volume global d'ingestion, triez le tableau en fonction de la colonne `Downstream Bytes/s`. Vous pourrez ainsi identifier les services qui ingèrent le plus gros volume de données.

**Remarque** : le tableau repose sur les [métriques d'utilisation][10] `datadog.estimated_usage.apm.ingested_spans` et `datadog.estimated_usage.apm.ingested_bytes`. Ces métriques possèdent les tags `service`, `env` et `ingestion_reason`.

### Analyse du trafic

La colonne Traffic Breakdown présente la destination de toutes les traces émises par le service. Elle vous permet d'estimer la part du trafic qui est ingéré et perdu, et d'identifier les raisons derrière ces pertes.

{{< img src="tracing/trace_indexing_and_ingestion/service_traffic_breakdown.png" style="width:100%;" alt="Analyse du trafic des traces ingérées" >}}

La colonne affiche les informations suivantes :

- **Complete traces ingested** (bleu) : le pourcentage de traces ingérées par Datadog.
- **Complete traces not retained** (gris) : le pourcentage de traces qui n'ont délibérément pas été envoyées à Datadog par l'Agent ou la bibliothèque de tracing. Selon votre configuration, il peut y avoir deux raisons à cela :

    1. Par défaut, l'[Agent applique un taux d'ingestion][4] aux services en fonction de leur trafic.
    2. Il est possible de [configurer][8] manuellement un service afin d'ingérer un certain pourcentage de traces au niveau de la bibliothèque de tracing.

- **Complete traces dropped by the tracer rate limiter** (orange) : si vous choisissez de configurer manuellement le taux d'ingestion du service, en définissant un pourcentage à l'aide de règles d'échantillonnage des traces, un limiteur de débit est automatiquement activé. Par défaut, il restreint l'ingestion à 100 traces par seconde. Consultez la documentation relative au [limiteur de débit][8] pour configurer manuellement ce taux.

- **Traces dropped due to the Agent CPU or RAM limit** (rouge) : ce mécanisme peut entraîner la perte de spans et créer des spans incomplètes. Pour y remédier, augmentez l'allocation en CPU et en mémoire de l'infrastructure sur laquelle l'Agent s'exécute.

## Synthèse de l'ingestion d'un service

Cliquez sur la ligne d'un service pour afficher sa synthèse d'ingestion. Cette vue détaillée fournit des informations exploitables sur la configuration d'ingestion du service.

{{< img src="tracing/trace_indexing_and_ingestion/service_ingestion_summary.png" style="width:100%;" alt="Synthèse d'ingestion d'un service" >}}

Parcourez la liste des motifs d'ingestion sous **Ingestion reasons breakdown** pour identifier les mécanismes responsables de l'ingestion de votre service. Chaque motif d'ingestion est lié à un [mécanisme d'ingestion][11] spécifique. Lorsque vous modifiez les paramètres d'ingestion de votre service, la série temporelle représentant les données ingérées lors de la dernière heure vous permet de vérifier si le nombre d'octets et de spans ingérés augmente ou diminue à la suite de votre changement.

Si la majorité de l'ingestion de votre service est causée par des décisions prises par vos services en amont, étudiez plus en détail la liste des principaux **Sampling decision makers**. Par exemple, pour un service non root (qui ne **décide donc jamais** d'échantillonner des traces), vous pouvez visualiser tous les services en amont responsables de l'ingestion du service. Pour réduire votre volume global d'ingestion, configurez des services root en amont.

Pour approfondir votre analyse, consultez le [dashboard APM Trace - Estimated Usage][12]. Il contient des informations d'ordre général sur l'ingestion ainsi que des graphiques représentant des données réparties par `service`, `env` et `ingestion reason`.

### Versions de l'Agent et des bibliothèques de tracing

Consultez la section **Datadog Agent & Tracing Library Versions** pour vérifier les versions utilisées par votre service. Comparez les versions utilisées aux dernières versions publiées pour vous assurer que vos Agents et vos bibliothèques sont à jour.

{{< img src="tracing/trace_indexing_and_ingestion/agent_tracer_version.png" style="width:90%;" alt="Versions de l'Agent et des bibliothèques de tracing" >}}

**Remarque** : vous devez passer à l'Agent v6.34 ou v7.34 pour que ces versions soient indiquées.

### Configurer le taux d'ingestion d'un service

Cliquez sur **Manage Ingestion Rate** pour obtenir des instructions relatives à la configuration du taux d'ingestion de votre service.

{{< img src="tracing/trace_indexing_and_ingestion/service_ingestion_rate_config.png" style="width:100%;" alt="Modifier le taux d'ingestion d'un service" >}}

Pour choisir d'envoyer un certain pourcentage du trafic d'un service, ajoutez une variable d'environnement ou un bloc de code généré à la configuration de la bibliothèque de tracing pour ce service.

1. Sélectionnez le service pour lequel vous souhaitez modifier le pourcentage de spans ingérées.
2. Choisissez le langage du service.
3. Choisissez le pourcentage d'ingestion désiré.
4. Appliquez la configuration appropriée générée à partir de ces choix pour le service indiqué, et redéployez-le. **Remarque** : le nom du service est sensible à la casse et doit correspondre à la casse du nom réel de votre service.
5. Sur la page Ingestion Control, vérifiez que le nouveau pourcentage défini a bien été appliqué en examinant la colonne Traffic Breakdown, qui indique le taux d'échantillonnage en vigueur. Le motif d'ingestion indiqué pour le service correspond à `ingestion_reason:rule`.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/metrics/metrics_namespace/
[2]: https://app.datadoghq.com/apm/traces/ingestion-control
[3]: https://www.datadoghq.com/pricing/?product=apm--continuous-profiler#apm--continuous-profiler
[4]: /fr/tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[5]: /fr/tracing/trace_pipeline/ingestion_mechanisms/#error-traces
[6]: /fr/tracing/trace_pipeline/ingestion_mechanisms/#rare-traces
[7]: /fr/tracing/trace_pipeline/ingestion_mechanisms/#single-spans-app-analytics
[8]: /fr/tracing/trace_pipeline/ingestion_mechanisms/#in-tracing-libraries-user-defined-rules
[9]: /fr/tracing/troubleshooting/agent_rate_limits/#maximum-cpu-percentage
[10]: /fr/tracing/trace_pipeline/metrics
[11]: /fr/tracing/trace_pipeline/ingestion_mechanisms/
[12]: https://app.datadoghq.com/dash/integration/30337/app-analytics-usage
[13]: https://github.com/DataDog/datadog-agent/releases/tag/7.42.0
[14]: /fr/agent/guide/how_remote_config_works/#enabling-remote-configuration