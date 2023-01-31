---
aliases:
- /fr/tracing/trace_ingestion/control_page
- /fr/tracing/trace_ingestion/ingestion_control_page
- /fr/account_management/billing/usage_control_apm/
- /fr/tracing/app_analytics/
- /fr/tracing/guide/ingestion_control_page/
description: Découvrez comment contrôler les taux d'ingestion avec la solution APM.
further_reading:
- link: /tracing/trace_ingestion/mechanisms/
  tag: Documentation
  text: Mécanismes d'ingestion
- link: /tracing/trace_retention/
  tag: Documentation
  text: Rétention des traces
- link: /tracing/trace_retention/usage_metrics/
  tag: Documentation
  text: Métriques d'utilisation
kind: documentation
title: Contrôles d'ingestion
---

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-1.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Parcours d'une trace" >}}

Les contrôles d'ingestion permettent de choisir les traces qui sont envoyées à Datadog par vos applications. Les statistiques et les [métriques][1] sont toujours calculées en fonction de toutes les traces, et ne sont pas impactées par les contrôles d'ingestion.

La page Ingestion Control présente la configuration d'ingestion de vos applications et services au niveau de l'Agent et des bibliothèques de tracing. Depuis la [page de configuration du contrôle d'ingestion][2], vous pouvez accomplir ce qui suit 
- Étudier les potentiels problèmes de configuration d'ingestion, par exemple un Agent avec des ressources de processeur ou de mémoire limitées, et prendre des mesures en conséquence
- Vérifier la configuration d'ingestion pour chaque service et ajuster les taux d'échantillonnage de traces par seconde pour les services ayant un débit élevé
- Identifier les mécanismes d'ingestion qui échantillonnent le plus de traces

{{< img src="tracing/trace_indexing_and_ingestion/ingestion_control_page.png" style="width:100%;" alt="Aperçu de la page Ingestion Control" >}}

Toutes les métriques de la page représentent le trafic en temps réel généré au cours de l'**heure passée**. Cette page tient compte de toutes les modifications apportées à un Agent ou une bibliothèque.

## Synthèse de l'ensemble des environnements

Consultez une vue d'ensemble des données ingérées au cours de la dernière heure, ainsi qu'une estimation de votre utilisation mensuelle par rapport à votre allocation mensuelle. L'estimation est calculée en fonction de l'infrastructure APM active (hosts, tâches Fargate et fonctions sans serveur).

Si votre utilisation mensuelle est inférieure à `100%`, votre volume de données ingérées ne devrait pas dépasser votre [allocation mensuelle par host][3]. Toute valeur supérieure à `100%` indique que le volume d'ingestion mensuelle devrait dépasser votre allocation mensuelle.

## Tableau des services

Le tableau des services fournit des informations sur la configuration d'ingestion de chaque service :

Name
: Le nom de chaque service envoyant des traces à Datadog. Le tableau contient des services root et non root dont les données ont été ingérées au cours de la dernière heure.

Ingested Traces/s
: Le nombre moyen de traces ingérées toutes les secondes par Datadog pour le service au cours de la dernière heure.

Ingested Bytes/s
: Le nombre moyen d'octets ingérés toutes les secondes par Datadog pour le service au cours de la derrière heure.

Downstream Bytes/s
: Le nombre moyen d'octets ingérés par seconde, y compris pour les spans provenant de services en aval dont les décisions d'ingestion ont été prises au niveau du service. Cela inclut les octets de toutes les spans enfant descendantes, ainsi que ceux des spans interceptées par le [service d'échantillonnage de traces d'erreur][4], le [service d'échantillonnage de traces rares][5] et le mécanisme [App Analytics][6]. 

Traffic Breakdown
: Une analyse détaillée de la destination de chaque trace générée par le service. Consultez la rubrique [Analyse du trafic](#analyse-du-trafic) pour en savoir plus.

Ingestion Configuration
: Affiche `Automatic` si le [mécanisme d'échantillonnage en amont par défaut][7] de l'Agent est appliqué. Si l'ingestion a été configurée dans les bibliothèques de tracing à l'aide de [règles définies par l'utilisateur][8], la valeur `Configured` est indiquée. Pour en savoir plus sur la configuration de l'ingestion pour un service, découvrez comment [modifier le taux d'ingestion par défaut](#configurer-le-taux-d-ingestion-d-un-service).

Infrastructure
: Les hosts, les conteneurs et les fonctions sur lesquels le service s'exécute.

Service status
: Affiche `Limited Resource` lorsque des spans ont été perdues en raison de ressources de processeur ou de mémoire limitées, `Legacy Setup` lorsque des spans ont été ingérées via l'ancien [mécanisme App Analytics][6] ou `OK` dans les autres situations.

Filtrez la page par environnement, configuration et statut pour visualiser les services qui nécessitent une action de votre part. Pour réduire le volume global d'ingestion, triez le tableau en fonction de la colonne `Downstream Bytes/s`. Vous pourrez ainsi identifier les services qui ingèrent le plus gros volume de données.

**Remarque** : le tableau repose sur les [métriques d'utilisation][9] `datadog.estimated_usage.apm.ingested_spans` et `datadog.estimated_usage.apm.ingested_bytes`. Ces métriques possèdent les tags `service`, `env` et `ingestion_reason`.

### Analyse du trafic

La colonne Traffic Breakdown présente la destination de toutes les traces émises par le service. Elle vous permet d'estimer la part du trafic qui est ingéré et perdu, et d'identifier les raisons derrière ces pertes.

{{< img src="tracing/trace_indexing_and_ingestion/service_traffic_breakdown.png" style="width:100%;" alt="Analyse du trafic des traces ingérées" >}}

La colonne affiche les informations suivantes :

- **Complete traces ingested** (bleu) : le pourcentage de traces ingérées par Datadog.
- **Complete traces not retained** (gris) : le pourcentage de traces qui n'ont délibérément pas été envoyées à Datadog par l'Agent ou le traceur. Selon votre configuration, il peut y avoir deux raisons à cela :

    1. Par défaut, l'[Agent transmet un taux d'ingestion][7] aux services en fonction de leur trafic.
    2. Il est possible de [configurer][8] manuellement un service afin d'ingérer un certain pourcentage de traces au niveau de la bibliothèque de tracing.

- **Complete traces dropped by the tracer rate limiter**  (orange) : si vous choisissez de configurer manuellement le taux d'ingestion du service, en définissant un pourcentage à l'aide de règles, un limiteur de débit est automatiquement activé. Par défaut, il restreint l'ingestion à 100 traces par seconde. Consultez la documentation relative au [limiteur de débit][8] pour configurer manuellement ce taux.

- **Traces dropped due to the Agent CPU or RAM limit** (rouge) : ce mécanisme peut entraîner la perte de spans et créer des spans incomplètes. Pour y remédier, augmentez l'allocation en CPU et en mémoire de l'infrastructure sur laquelle l'Agent s'exécute.

## Synthèse de l'ingestion d'un service

Cliquez sur la ligne d'un service pour afficher sa synthèse d'ingestion. Cette vue détaillée fournit des informations exploitables sur la configuration d'ingestion du service.

{{< img src="tracing/trace_indexing_and_ingestion/service_ingestion_summary.png" style="width:100%;" alt="Synthèse d'ingestion d'un service" >}}

Parcourez la liste des motifs d'ingestion sous **Ingestion reasons breakdown** pour identifier les mécanismes responsables de l'ingestion de votre service. Chaque motif d'ingestion est lié à un [mécanisme d'ingestion][10] spécifique. Lorsque vous modifiez la configuration d'ingestion de votre service, la série temporelle représentant les données ingérées lors de la dernière heure vous permet de vérifier si le nombre d'octets et de spans ingérés augmente ou diminue à la suite de votre changement.

Si la majorité de l'ingestion de votre service est causée par des décisions prises par vos services en amont, étudiez plus en détail les principaux responsables. Par exemple, pour un service non root (qui ne **décide donc jamais** d'échantillonner des traces), vous pouvez visualiser tous les services en amont responsables de l'ingestion du service. Pour réduire votre volume global d'ingestion, configurez des services root en amont.

Pour approfondir votre analyse, consultez le [dashboard APM Trace - Estimated Usage][11]. Il contient des informations d'ordre général sur l'ingestion ainsi que des graphiques représentant des données réparties par `service`, `env` et `ingestion reason`.

### Configurer le taux d'ingestion d'un service

Cliquez sur **Manage Ingestion Rate** pour configurer le taux d'ingestion de votre service.

{{< img src="tracing/trace_indexing_and_ingestion/service_ingestion_rate_config.png" style="width:100%;" alt="Modifier le taux d'ingestion d'un service" >}}

Pour choisir d'envoyer un pourcentage spécifique du trafic d'un service, ajoutez un bloc de code généré à la configuration du traceur pour ce service.

1. Sélectionnez le service pour lequel vous souhaitez modifier le pourcentage de spans ingérées.
2. Choisissez le langage du service.
3. Choisissez le pourcentage d'ingestion désiré.
4. Appliquez la configuration appropriée générée à partir de ces choix pour le service indiqué, et redéployez-le.
5. Accédez à la page Ingestion Control pour vérifier que votre nouveau pourcentage a été appliqué. Une partie du graphique Ingestion reasons breakdown doit désormais être dédiée à `ingestion_reason:rule`.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/guide/metrics_namespace/
[2]: https://app.datadoghq.com/apm/traces/ingestion-control
[3]: https://www.datadoghq.com/pricing/?product=apm--continuous-profiler#apm--continuous-profiler
[4]: /fr/tracing/trace_ingestion/mechanisms#error-traces
[5]: /fr/tracing/trace_ingestion/mechanisms#rare-traces
[6]: /fr/tracing/trace_ingestion/mechanisms#single-spans-app-analytics
[7]: /fr/tracing/trace_ingestion/mechanisms#in-the-agent
[8]: /fr/tracing/trace_ingestion/mechanisms#in-tracing-libraries-user-defined-rules
[9]: /fr/tracing/trace_retention_and_ingestion/usage_metrics
[10]: /fr/tracing/trace_ingestion/mechanisms
[11]: https://app.datadoghq.com/dash/integration/30337/app-analytics-usage