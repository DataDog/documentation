---
further_reading:
- link: /tracing/trace_pipeline/ingestion_controls/
  tag: Documentation
  text: Page de contrôle de l'ingestion

title: Contrôle du volume d'ingestion avec le tracing distribué d'APM
---

## Présentation

La [page de contrôle de l'ingestion][1] fournit des informations détaillées sur la configuration de l'ingestion pour tous les services, que ce soit au niveau de l'Agent ou des bibliothèques de tracing. Tous les [mécanismes d'ingestion][2] sont détaillés dans la documentation publique et peuvent être configurés.

La page de contrôle de l'ingestion vous offre une visibilité complète sur votre volume de spans ainsi qu'un ensemble de contrôles pratiques. Grâce à cette page, vous pouvez :
- ingérer les données les plus pertinentes, en fonction de votre entreprise et de vos objectifs d'observabilité ;
- réduire les coûts liés au réseau en envoyant uniquement les données de tracing utilisées sur la plateforme Datadog ;
- contrôler et gérer vos coûts globaux.

## Répercussions de la diminution du volume d'ingestion de traces

{{< img src="/tracing/guide/trace_ingestion_volume_control/sampling_25_percent.png" alt="Échantillonnage de l'ingestion APM indiquant que 25 % des traces ont été ingérées" style="width:70%;" >}}

Si vous choisissez de réduire le volume d'ingestion de certains services, les **[métriques][3] liées aux requêtes, aux erreurs et à la latence** (à savoir les métriques RED, pour Requête, Erreurs et Durée) restent justes, car elles sont calculées à partir de l'ensemble du trafic de l'application, sans tenir compte de la configuration de l'échantillonnage. Ces métriques sont fournies lorsque vous adoptez la solution APM Datadog. Afin de garantir une visibilité complète sur le trafic de votre application, vous pouvez vous servir de ces métriques pour créer des dashboards, monitors et SLO. Vous pourrez ainsi identifier les erreurs potentielles concernant un service ou une ressource.

Les données des traces sont très répétitives. Pour cette raison, lorsque vous échantillonnez l'ingestion, vous pouvez tout de même étudier des échantillons de traces afin d'analyser la source d'une erreur. Pour les services à haut débit, vous n'avez généralement pas besoin de recueillir chaque requête : les problèmes suffisamment graves sont systématiquement détectables dans plusieurs traces. Les contrôles d'ingestion vous permettent de visualiser les données dont vous avez besoin pour diagnostiquer des problèmes tout en respectant votre marge d'erreur.

#### Métriques générées à partir de spans

Les [métriques générées à partir de spans][4] reposent sur les spans ingérées.

Toute diminution des taux d'échantillonnage de l'ingestion a une incidence sur les métriques de type **count**. Les métriques de type **distribution**, par exemple les mesures `duration`, ne sont pas concernées par la réduction. En effet, l'échantillonnage est relativement uniforme, ce qui fait que la distribution de la latence continue à fournir une image précise du trafic.

#### Monitors

La diminution du volume d'ingestion a une incidence sur les monitors de **métrique** basés sur des [métriques générées à partir de spans](#metriques-generees-a-partir-de-spans). Les monitors basés sur des métriques **trace.__** demeurent fidèles, car ces métriques sont calculées à partir de l'ensemble du trafic.

Les monitors [**d'analyse de traces**][5] basés sur des counts sont également affectés par une diminution. Vérifiez si vous avez créé ce type de monitor en recherchant des monitors `type:trace-analytics` depuis la page de gestion des monitors.

## Évaluer la configuration d'ingestion de vos services

Pour évaluer le statut actuel de l'instrumentation de vos applications, rendez-vous sur la [page de contrôle de l'ingestion des traces][1]. Cette dernière fournit des informations détaillées sur la configuration de l'Agent et des bibliothèques de tracing.

### Vérifier si l'allocation d'ingestion mensuelle a été ou non dépassée

Utilisez le KPI d'utilisation mensuelle de l'ingestion pour estimer votre utilisation par rapport à l'allocation mensuelle de 150 Go de spans ingérées par host APM (cette allocation est cumulée pour tous les hosts APM).

{{< img src="/tracing/guide/trace_ingestion_volume_control/ingestion_overage.png" alt="KPI d'ingestion excédentaire indiquant une estimation de 170 % de l'utilisation mensuelle (23,3 To tous les mois pour l'ensemble de l'infrastructure)" style="width:40%;" >}}

### Analyse avancée de l'utilisation d'APM

La configuration d'ingestion peut être analysée pour chaque service. Cliquez sur la ligne d'un service pour afficher une synthèse de l'ingestion pour ce service comportant les informations suivantes :
- **Répartition des motifs d'ingestion** : découvrez le volume d'ingestion généré par chaque [mécanisme d'ingestion][2].
- **Principaux responsables de l'échantillonnage** : consultez les services en amont qui prennent des décisions d'échantillonnage pour les spans ingérées dans le cadre du [mécanisme d'ingestion par défaut][6].

Vous pouvez également consulter un [dashboard prêt à l'emploi][7] afin d'obtenir davantage d'insights sur les tendances historiques relatives à votre utilisation de l'ingestion et au volume associé. Dupliquez ce dashboard pour pouvoir modifier les widgets et approfondir vos analyses.

## Réduire votre volume d'ingestion

### Identifier les services à l'origine de la majorité du volume d'ingestion

Pour identifier les services à l'origine de la majorité du volume d'ingestion, triez le tableau en fonction de la colonne **Downstream Bytes/s**. Cela vous permet de visualiser les services qui prennent le plus de décisions d'échantillonnage et affectent par la même occasion les services en aval.

Lorsqu'un service initie une trace, la colonne **Downstream Bytes/s** tient également compte du volume de spans provenant des services en aval pour lesquels le service a pris des décisions d'échantillonnage.

La colonne **Traffic Breakdown** offre une bonne indication de la configuration d'échantillonnage du service.

Si le service possède une valeur Downstream Bytes/s élevée et un taux d'échantillonnage important (ce taux est indiqué dans la section bleue de la colonne Traffic Breakdown), la diminution du taux d'échantillonnage de ce service devrait avoir une incidence conséquente sur le volume d'ingestion.

{{< img src="/tracing/guide/trace_ingestion_volume_control/sampling_99_percent.png" alt="Échantillonnage de l'ingestion APM, avec 99 % des traces ingérées et un échantillonnage nul" style="width:70%;" >}}

### Configurer de façon globale le taux d'échantillonnage de l'ingestion au niveau de l'Agent

La colonne **Configuration** indique si des règles d'échantillonnage ont été configurées pour vos services. Si les principaux services possèdent une configuration `AUTOMATIC` dans le tableau, tout changement de la **configuration de l'Agent** entraînera une diminution globale du volume pour l'ensemble des services.

Pour diminuer le volume d'ingestion au niveau de l'Agent, configurez `DD_APM_MAX_TPS` (valeur par défaut : `10`) afin de réduire la part du volume d'échantillonnage en amont. Pour en savoir plus, consultez la documentation relative au [mécanisme d'échantillonnage par défaut][6].

En outre, pour réduire le volume de traces [error][8] et [rare][9], procédez comme suit : 
- Configurez `DD_APM_ERROR_TPS` pour diminuer la part de l'échantillonnage d'erreurs.
- Définissez `DD_APM_DISABLE_RARE_SAMPLER` sur true pour interrompre l'échantillonnage de traces rare.

### Configurer de façon autonome le taux d'échantillonnage de l'ingestion pour les services au niveau de la bibliothèque

Lorsque vous configurez des taux d'échantillonnage pour plusieurs services à haut débit, il est possible de réduire une grande partie du volume d'ingestion excédentaire.

Cliquez sur un service pour afficher la **synthèse d'ingestion du service**. Consultez la **répartition des motifs d'ingestion** dans le volet latéral pour obtenir une vue d'ensemble de la part du volume d'ingestion attribuée à chaque mécanisme.

Si l'échantillonnage en amont (`auto` ou `rule`) constitue le principal motif pour la majorité du volume d'ingestion, vous pouvez configurer le volume en définissant une règle d'échantillonnage au niveau de la bibliothèque de tracing.

Cliquez sur le bouton **Manage Ingestion Rate** pour configurer un taux d'échantillonnage pour le service. Sélectionnez le langage du service ainsi que le taux d'échantillonnage de l'ingestion à appliquer.

**Remarque** : vous devez redéployer l'application pour que les modifications apportées à la configuration s'appliquent. Datadog vous conseille de modifier la configuration à l'aide de [variables d'environnement][10].

## Définition des motifs d'ingestion

_Vérifiez quels mécanismes d'ingestion sont à l'origine de la majorité du volume d'ingestion._

Par défaut, le mécanisme d'échantillonnage de traces est basé sur un fonctionnement en amont. La décision d'échantillonnage d'une trace est prise au début de son cycle de vie, puis propagée en aval dans le contexte des requêtes, afin que vous puissiez toujours visualiser et analyser des traces complètes.

L'échantillonnage en amont est configurable dans les bibliothèques de tracing ou depuis l'Agent Datadog :

| Motif d'ingestion   | Lieu             | Description du mécanisme d'ingestion | Valeur par défaut |
|--------------------|-------------------|-----------------------|---------|
| `auto`             | [Agent](#configurer-de-facon-globale-le-taux-d-echantillonnage-de-l-ingestion-au-niveau-de-l-Agent)             | L'Agent Datadog applique des taux d'échantillonnage aux bibliothèques de tracing.    | 10 traces par seconde et par Agent |
| `rule`             | [Bibliothèques de tracing](#configurer-de-facon-autonome-le-taux-d-echantillonnage-d-ingestion-pour-les-services-au-niveau-de-la-bibliothèque)  | Les bibliothèques définissent le pourcentage d'échantillonnage pour certains services.   | null                 |


Plusieurs autres motifs d'ingestion peuvent s'afficher dans la page de contrôle de l'ingestion et, sous la forme de tag, dans la métrique `datadog.estimated_usage.apm.ingested_bytes`. Ces motifs d'ingestion peuvent être à l'origine de votre volume d'ingestion :

| Motif d'ingestion   | Lieu             | Description du mécanisme d'ingestion | Valeur par défaut |
|--------------------|-------------------|-----------------------|---------|
| `error`            | [Agent](#configurer-de-facon-globale-le-taux-d-echantillonnage-de-l-ingestion-au-niveau-de-l-Agent)             | Échantillonnage des erreurs non interceptées par l'échantillonnage en amont.             | 10 traces par seconde et par Agent (null si des règles sont définies) |
| `rare`            | [Agent](#configurer-de-facon-globale-le-taux-d-echantillonnage-de-l-ingestion-au-niveau-de-l-Agent)             |  Échantillonnage de traces rare (permettant de couvrir toutes les combinaisons d'un ensemble de tags de span).        | 5 traces par seconde et par Agent (null si des règles sont définies) |
| `manual`             | Dans le code         | Remplacement d'une décision dans le code visant à conserver ou à ignorer une span et ses enfants.    | null |
| `analytics`          | Agent et bibliothèques de tracing | [Mécanisme d'ingestion obsolète][11] permettant d'échantillonner des spans individuelles sans la trace complète.   | null                 |

D'autres solutions peuvent également être à l'origine d'un volume de spans échantillonnées :

- `synthetics` et `synthetics-browser` : les tests Browser et API sont associés à la trace générée par le test.
- `rum` : les requêtes provenant d'applications Web et mobiles sont liées aux traces correspondantes du backend.
- `lambda` et `xray` : il s'agit des traces générées par les fonctions AWS Lambda et instrumentées avec des bibliothèques X-Ray ou Datadog.

Consultez la [documentation relative aux mécanismes d'ingestion][2] pour en savoir plus sur les motifs d'ingestion.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_pipeline/ingestion_controls
[2]: /fr/tracing/trace_pipeline/ingestion_mechanisms/
[3]: /fr/tracing/metrics/metrics_namespace/
[4]: /fr/tracing/trace_pipeline/generate_metrics/
[5]: /fr/monitors/create/types/apm/?tab=analytics
[6]: /fr/tracing/trace_pipeline/ingestion_mechanisms/#head-based-sampling
[7]: /fr/tracing/trace_pipeline/metrics/
[8]: /fr/tracing/trace_pipeline/ingestion_mechanisms/#error-traces
[9]: /fr/tracing/trace_pipeline/ingestion_mechanisms/#rare-traces
[10]: /fr/tracing/trace_pipeline/ingestion_mechanisms//?tab=environmentvariables#in-tracing-libraries-user-defined-rules
[11]: /fr/tracing/legacy_app_analytics