---
algolia:
  tags:
  - log usage
  - grok
  - grok parser
  - logs parsing
  - Extracting Attributes
  - Remapping attributes
  - parsing
aliases:
- /fr/logs/guide/logs-monitors-on-volumes/
description: Bonnes pratiques pour gérer et surveiller efficacement vos logs dans
  Datadog.
further_reading:
- link: https://www.datadoghq.com/architecture/a-guide-to-log-management-indexing-strategies-with-datadog/
  tag: Architecture Center
  text: Guide des stratégies d'indexation de Log Management avec Datadog
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Apprendre à traiter vos logs
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: En savoir plus sur le parsing
- link: https://www.datadoghq.com/blog/log-management-policies/
  tag: Blog
  text: Comment mettre en œuvre des politiques de Log Management avec vos équipes
- link: https://www.datadoghq.com/blog/volkswagen-organizations/
  tag: Blog
  text: Bonnes pratiques pour gérer les organisations Datadog à grande échelle
- link: https://www.youtube.com/watch?v=2OEzAE7c2c0&list=PLdh-RwQzDsaM9Sq_fi-yXuzhmE7nOlqLE&index=1&pp=iAQB
  tag: Vidéo
  text: 'Conseils et astuces Datadog : Améliorez l''utilisation des logs avec les
    filtres d''exclusion de logs Datadog'
- link: https://learn.datadoghq.com/courses/debugging-log-pipelines
  tag: Centre d'apprentissage
  text: Débogage des pipelines de logs
title: Bonnes pratiques de Log Management
---
## Présentation {#overview}

Datadog Log Management collecte, traite, archive, explore et surveille vos logs, afin que vous ayez une visibilité sur les problèmes de votre système. Cependant, il peut être difficile d'obtenir le bon niveau de visibilité à partir de vos logs et le débit des logs peut varier considérablement, créant une utilisation inattendue des ressources.

Par conséquent, ce guide vous présente diverses bonnes pratiques de Log Management et configurations de compte qui vous offrent une flexibilité en matière de gouvernance, d'attribution d'utilisation et de contrôle budgétaire. Plus précisément, comment :

- [Configurer plusieurs index pour segmenter vos logs](#set-up-multiple-indexes-for-log-segmentation)
- [Configurer plusieurs archives pour le stockage à long terme](#set-up-multiple-archives-for-long-term-storage)
- [Configurer le contrôle d'accès basé sur les rôles (RBAC) pour les rôles personnalisés](#set-up-rbac-for-custom-roles)

Ce guide explique également comment surveiller l'utilisation de vos logs en :

- [Configurez des alertes sur les pics de trafic de logs inattendus](#alert-on-unexpected-log-traffic-spikes)
- [Configurez des alertes sur les logs indexés lorsque le volume dépasse un seuil spécifié](#alert-when-an-indexed-log-volume-passes-a-specified-threshold)
- [Surveillez quels index sont interrogés activement](#monitor-which-indexes-are-queried-actively)
- [Configurez des filtres d'exclusion sur les logs à haut volume](#set-up-exclusion-filters-on-high-volume-logs)

Si vous souhaitez transformer vos logs ou masquer des données sensibles dans vos logs avant qu'ils ne quittent votre environnement, découvrez comment [agréger, traiter et transformer vos données de log avec Observability Pipelines][29].

## Configuration du compte de log {#log-account-configuration}

### Configurer plusieurs index pour la segmentation des logs {#set-up-multiple-indexes-for-log-segmentation}

Configurer plusieurs index si vous souhaitez segmenter vos logs pour différentes périodes de rétention ou quotas quotidiens, le suivi de l'utilisation et la facturation.

Par exemple, si vous avez des logs qui ne doivent être conservés que pendant 7 jours, tandis que d'autres logs doivent être conservés pendant 30 jours, utilisez plusieurs index pour séparer les logs selon les deux périodes de rétention.

Pour configurer plusieurs index :

1. Accédez à [Log Indexes][1].
2. Cliquez sur {{< ui >}}New Index{{< /ui >}} ou {{< ui >}}Add a new index{{< /ui >}}.
3. Saisissez un nom pour l'index.
4. Saisissez la requête de recherche pour filtrer les logs que vous souhaitez inclure dans cet index.
5. Définissez le quota quotidien pour limiter le nombre de logs stockés dans un index par jour.
6. Définissez la période de rétention selon la durée pendant laquelle vous souhaitez conserver ces logs.
7. Cliquez sur {{< ui >}}Save{{< /ui >}}.

La définition de quotas quotidiens sur vos index peut aider à éviter les dépassements de facturation lorsque de nouvelles sources de logs sont ajoutées ou si un développeur modifie involontairement les niveaux de journalisation en mode débogage. Consultez [Alerte sur les index atteignant leur quota quotidien](#alert-on-indexes-reaching-their-daily-quota) pour savoir comment configurer un monitor afin d'être alerté lorsqu'un pourcentage du quota quotidien est atteint au cours des dernières 24 heures.

### Configurez le stockage pour une rétention à long terme {#set-up-storage-for-long-term-retention}

Si vous souhaitez conserver des logs pendant une période prolongée tout en maintenant des vitesses de requête similaires à l'indexation standard, configurez [Flex Logs][30]. Ce niveau est le mieux adapté aux logs qui nécessitent une rétention plus longue et qui doivent être interrogés en urgence. Flex Logs dissocie les coûts de stockage des coûts de calcul, ce qui vous permet de conserver davantage de logs plus longtemps de manière rentable sans sacrifier la visibilité. Les logs qui doivent être fréquemment interrogés doivent être stockés dans des index standard.

### Configurez plusieurs archives pour le stockage à long terme {#set-up-multiple-archives-for-long-term-storage}

Si vous souhaitez stocker vos logs pendant de plus longues périodes, configurez [Log Archives][2] pour envoyer vos logs vers un système optimisé pour le stockage, tel qu'Amazon S3, Azure Storage ou Google Cloud Storage. Utilisez [Archive Search][32] pour interroger ces logs directement depuis le stockage en temps réel. Lorsque vous avez besoin d'un accès complet à la plateforme ou d'une rétention plus longue, utilisez le mode **Recherche et réhydratation** d'Archive Search. Avec plusieurs archives, vous pouvez segmenter les logs pour des raisons de conformité et maîtriser les coûts.

#### Définissez une taille d'analyse maximale pour gérer les coûts {#set-up-max-scan-size-to-manage-costs}

Définissez une limite sur le volume de logs pouvant être analysés en une seule fois. Lors de la configuration d'une archive, vous pouvez définir le volume maximal de données de logs pouvant être analysé par requête Archive Search ou par réhydratation. Consultez [Define maximum scan size][4] pour plus d'informations.

### Configurez le RBAC pour les rôles personnalisés {#set-up-rbac-for-custom-roles}

Il existe trois [rôles Datadog par défaut][5] : Admin, Standard et Read-only. Vous pouvez également créer des rôles personnalisés avec des ensembles d'autorisations uniques. Par exemple, vous pouvez créer un rôle qui empêche les utilisateurs de modifier les politiques de rétention d'index afin d'éviter des pics de coûts imprévus. De même, vous pouvez restreindre les personnes autorisées à modifier les configurations de parsing de logs afin d'éviter des modifications indésirables sur des structures et formats de logs bien définis.

Pour configurer des rôles personnalisés avec des autorisations :

1. Connectez-vous à [Datadog][6] en tant qu'administrateur.
2. Accédez à [Organization Settings > Roles][7].
3. Pour activer les rôles personnalisés, cliquez sur la roue dentée en haut à gauche, puis cliquez sur {{< ui >}}Enable{{< /ui >}}.
4. Une fois activé, cliquez sur {{< ui >}}New Role{{< /ui >}}.
5. Saisissez un nom pour le nouveau rôle.
6. Sélectionnez les autorisations pour le rôle. Cela vous permet de restreindre l'accès à certaines actions, telles que la réhydratation de logs et la création de métriques basées sur les logs. Consultez [Log Management Permissions][8] pour plus de détails.
7. Cliquez sur {{< ui >}}Save{{< /ui >}}.

Consultez [How to Set Up RBAC for Logs][9] pour obtenir un guide étape par étape sur la façon de configurer et d'attribuer un rôle avec des autorisations spécifiques pour un cas d'utilisation exemple.

## Surveillez l'utilisation des logs {#monitor-log-usage}

Vous pouvez surveiller votre utilisation des logs en configurant les éléments suivants :

- [Configurez des alertes en cas de pics de trafic de logs inattendus](#alert-on-unexpected-log-traffic-spikes)
- [Configurez une alerte lorsqu'un volume de logs indexés dépasse un seuil spécifié](#alert-when-an-indexed-log-volume-passes-a-specified-threshold)

### Configurez une alerte en cas de pics de trafic de logs inattendus {#alert-on-unexpected-log-traffic-spikes}

#### Métriques d'utilisation des logs {#log-usage-metrics}

Par défaut, les [métriques d'utilisation des logs][10] sont disponibles pour suivre le nombre de logs ingérés, d'octets ingérés et de logs indexés. Ces métriques sont gratuites et conservées pendant 15 mois :

- `datadog.estimated_usage.logs.ingested_bytes`
- `datadog.estimated_usage.logs.ingested_events`

Consultez les [monitors de détection d'anomalies][11] pour connaître les étapes de création de monitors d'anomalies avec les métriques d'utilisation.

**Remarque** : Datadog recommande de définir l'unité sur `byte` pour `datadog.estimated_usage.logs.ingested_bytes` dans la [page de résumé des métriques][12] :

{{< img src="logs/guide/logs_estimated_bytes_unit.png" alt="La page de résumé des métriques affichant le panneau latéral datadog.estimated_usage.logs.ingested_bytes avec l'unité définie sur octet" style="width:70%;">}}

#### Monitors de détection d'anomalies {#anomaly-detection-monitors}

Créez un monitor de détection d'anomalies pour être alerté en cas de pics inattendus d'indexation de logs :

1. Accédez à [Monitors > New Monitor][13] et sélectionnez {{< ui >}}Anomaly{{< /ui >}}.
2. Dans la section **Define the metric**, sélectionnez la métrique `datadog.estimated_usage.logs.ingested_events`.
3. Dans le champ **from**, ajoutez le tag `datadog_is_excluded:false` pour surveiller les logs indexés et non les logs ingérés.
4. Dans le champ **sum by**, ajoutez les tags `service` et `datadog_index`, afin d'être averti si un service spécifique présente un pic ou cesse d'envoyer des logs dans un index.
5. Définissez les conditions d'alerte pour qu'elles correspondent à votre cas d'utilisation. Par exemple, configurez le monitor pour qu'il vous alerte si les valeurs évaluées se situent en dehors de la plage attendue.
6. Ajoutez un titre pour la notification et un message contenant des instructions exploitables. Par exemple, voici une notification avec des liens contextuels :
    ```text
    An unexpected amount of logs has been indexed in the index: {{datadog_index.name}}

    1. [Check Log patterns for this service](https://app.datadoghq.com/logs/patterns?from_ts=1582549794112&live=true&to_ts=1582550694112&query=service%3A{{service.name}} )
    2. [Ajoutez un filtre d'exclusion sur le modèle bruyant](https://app.datadoghq.com/logs/pipelines/indexes)
    ```
7. Cliquez sur {{< ui >}}Create{{< /ui >}}.

### Alertez lorsqu'un volume de logs indexés dépasse un seuil spécifié {#alert-when-an-indexed-log-volume-passes-a-specified-threshold}

Configurez un monitor pour vous alerter si le volume de logs indexés dans n'importe quel périmètre de votre infrastructure (par exemple, `service`, `availability-zone`, etc.) augmente de manière inattendue.

1. Accédez à le [Log Explorer][14].
2. Saisissez une [requête de recherche][15] incluant le nom de l'index (par exemple, `index:main`) pour capturer le volume de logs que vous souhaitez surveiller.
3. Cliquez sur {{< ui >}}More...{{< /ui >}} et sélectionnez {{< ui >}}Create monitor{{< /ui >}}.
4. Ajoutez des tags (par exemple, `host, `services, etc.) dans le champ {{< ui >}}group by{{< /ui >}}.
5. Saisissez le {{< ui >}}Alert threshold{{< /ui >}} correspondant à votre cas d'utilisation. Optionnellement, saisissez un {{< ui >}}Warning threshold{{< /ui >}}.
6. Ajoutez un titre de notification, par exemple :
    ```
    Unexpected spike on indexed logs for service {{service.name}}
    ```
6. Add a message, for example:
    ```
    Le volume sur ce service a dépassé le seuil. Définissez un filtre d'exclusion supplémentaire ou augmentez le taux d'échantillonnage pour réduire le volume.
    ```
7. Cliquez sur {{< ui >}}Create{{< /ui >}}.

#### Alertez sur le volume de logs indexés depuis le début du mois {#alert-on-indexed-logs-volume-since-the-beginning-of-the-month}

Exploitez la métrique `datadog.estimated_usage.logs.ingested_events` filtrée sur `datadog_is_excluded:false` pour ne compter que les logs indexés et utilisez la [fenêtre cumulative du monitor de métriques][28] pour surveiller le nombre depuis le début du mois.

{{< img src="logs/guide/monthly_usage_monitor.png" alt="Configurez un monitor pour alerter sur le nombre de logs indexés depuis le début du mois" style="width:70%;">}}

#### Alerter sur les index atteignant leur quota quotidien {#alert-on-indexes-reaching-their-daily-quota}

[Configurez un quota quotidien][16] sur les index pour éviter d'indexer plus d'un nombre donné de logs par jour. Si un index a un quota quotidien, Datadog recommande de configurer le [monitor qui notifie le volume de cet index](#alert-when-an-indexed-log-volume-passes-a-specified-threshold) pour alerter lorsque 80 % de ce quota est atteint au cours des dernières 24 heures.

Un événement est généré lorsque le quota quotidien est atteint. Ces événements possèdent le tag `datadog_index` qui inclut le nom de l'index. Par conséquent, une fois cet événement généré, vous pouvez [créer une facette][17] sur le tag `datadog_index`, afin de pouvoir utiliser `datadog_index` dans l'étape `group by` pour configurer un monitor multi-alertes.

Pour configurer un monitor afin d'être alerté lorsque le quota quotidien est atteint pour un index :

1. Accédez à [Monitors > New Monitor][13] et cliquez sur {{< ui >}}Event{{< /ui >}}.
2. Saisissez : `source:datadog datadog_index:* "daily quota reached"` dans la section **Define the search query**. Incluez `datadog_index:*` pour vous assurer que seuls les événements liés aux index sont sélectionnés.
3. Dans le champ **Count of**, ajoutez `datadog_index` pour grouper par index. Cela met à jour la requête pour lire `Show Count of * by datadog_index (datadog_index)`.
4. Pour **Evaluate the query over**, sélectionnez **current day**. Pour **Starting at**, sélectionnez l'heure à laquelle les index sont réinitialisés. Cela maintient le monitor en état d'alerte jusqu'à la réinitialisation du quota. Voici un exemple de ce à quoi ressemble la requête de recherche lorsqu'elle est définie dans Datadog :
   {{< img src="logs/guide/daily_quota_notification_search_query.png" alt="La configuration de la requête de recherche de l'alerte Datadog sur l'atteinte du quota d'index" style="width:100%;">}}
5. Dans la section **Définir les conditions d'alerte**, sélectionnez `above or equal to` et saisissez `1` pour le **Seuil d'alerte**.
6. Ajoutez un titre et un message de notification dans la section {{< ui >}}Configure notifications and automations{{< /ui >}}. Le bouton {{< ui >}}Multi Alert{{< /ui >}} est automatiquement sélectionné car le monitor est regroupé par `datadog_index(datadog_index)`.
7. Cliquez sur {{< ui >}}Save{{< /ui >}}.

**Remarque** : Le tag `datadog_index(datadog_index)` n'est disponible que lorsqu'un événement a déjà été généré.

Voici un exemple de ce à quoi ressemble la notification dans Slack :

{{< img src="logs/guide/daily_quota_notification.png" alt="Une notification Slack sur le quota quotidien atteint sur datadog_index:retention-7" style="width:70%;">}}

### Consultez le dashboard d'estimation de l'utilisation {#review-the-estimated-usage-dashboard}

Une fois que vous commencez à ingérer des logs, un [dashboard][18] prêt à l'emploi résumant vos métriques d'utilisation des logs est automatiquement installé dans votre compte.

{{< img src="logs/guide/logslight.png" alt="Le dashboard d'estimation de l'utilisation des logs montrant la répartition des indexés et ingérés dans différents widgets" style="width:70%;">}}

**Remarque** : Les métriques utilisées dans ce dashboard sont des estimations et peuvent différer des chiffres de facturation officiels.

Pour trouver ce dashboard, accédez à {{< ui >}}Dashboards{{< /ui >}} > {{< ui >}}Dashboards List{{< /ui >}} et recherchez [Log Management - Estimated Usage][19].

### Surveillez les index qui sont activement interrogés{#monitor-which-indexes-are-queried-actively}

La surveillance de l'activité des requêtes vous aide à évaluer la valeur de vos données indexées et à optimiser les coûts. Par exemple, vous pouvez identifier les index qui sont rarement interrogés afin de réduire la rétention ou de déplacer les données vers Flex Logs ou des archives.

Pour analyser quels index sont activement interrogés :

1. Accédez à l'[Audit Trail][31]. Ce lien pré-remplit la requête et le regroupement requis.
2. Vérifiez que la requête est définie sur `@evt.name:"Log Management" @action:queried`.
3. Sélectionnez la {{< ui >}}Table{{< /ui >}} visualisation pour afficher une liste classée des index les plus et les moins utilisés pour la période sélectionnée.
4. Dans la section {{< ui >}}By{{< /ui >}}, regroupez les logs par `@asset.new_value.query.indexes`.

### Configurez des filtres d'exclusion sur les logs à haut volume {#set-up-exclusion-filters-on-high-volume-logs}

Lorsque vos monitors d'utilisation vous alertent, vous pouvez configurer des filtres d'exclusion et augmenter le taux d'échantillonnage pour réduire le volume. Consultez [Filtres d'exclusion][20] pour savoir comment les configurer. Vous pouvez également utiliser [Log Patterns][21] pour regrouper et identifier les logs à haut volume. Ensuite, dans le panneau latéral Log Pattern, cliquez sur {{< ui >}}Add Exclusion Filter{{< /ui >}} pour ajouter un filtre afin d'arrêter l'indexation de ces logs.

{{< img src="logs/guide/patterns_exclusion.png" alt="La page de Log Explorer affichant les détails du panneau latéral d'un modèle avec le bouton d'ajout de filtre d'exclusion en haut" style="width:80%;">}}

Même si vous utilisez des filtres d'exclusion, vous pouvez toujours visualiser les tendances et les anomalies sur l'ensemble de vos données de log à l'aide de métriques basées sur les logs. Consultez [Générer des métriques à partir des logs ingérés][22] pour plus d'informations.

### Activez Sensitive Data Scanner pour la détection des informations personnellement identifiables (PII) {#enable-sensitive-data-scanner-for-personally-identifiable-information-pii-detection}

Si vous souhaitez prévenir les fuites de données et limiter les risques de non-conformité, utilisez Sensitive Data Scanner pour identifier, marquer et, éventuellement, masquer ou hacher les données sensibles. Par exemple, vous pouvez rechercher des numéros de carte de crédit, des numéros de routage bancaire et des clés d'API dans vos logs, spans APM et événements RUM. Consultez [Sensitive Data Scanner][23] pour savoir comment configurer les règles d'analyse afin de déterminer quelles données analyser.

**Remarque** : [Sensitive Data Scanner][24] est un produit facturable séparément.

### Activez Audit Trail pour voir les activités des utilisateurs {#enable-audit-trail-to-see-user-activities}

Si vous souhaitez voir les activités des utilisateurs, comme qui a modifié la rétention d'un index ou qui a modifié un filtre d'exclusion, activez Audit Trail pour voir ces événements. Consultez [Événements Audit Trail][25] pour obtenir une liste des événements spécifiques à la plateforme et au produit disponibles. Pour activer et configurer Audit Trail, suivez les étapes de la [documentation Audit Trail][26].

**Remarque** : [Audit Trail][27] est un produit facturable séparément.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines/indexes
[2]: /fr/logs/log_configuration/archives/
[4]: /fr/logs/log_configuration/archives/?tab=awss3#define-maximum-scan-size
[5]: /fr/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[6]: https://app.datadoghq.com/
[7]: https://app.datadoghq.com/organization-settings/roles
[8]: /fr/account_management/rbac/permissions/?tab=ui#log-management
[9]: /fr/logs/guide/logs-rbac/
[10]: /fr/logs/logs_to_metrics/#logs-usage-metrics
[11]: /fr/monitors/types/anomaly/
[12]: https://app.datadoghq.com/metric/summary?filter=datadog.estimated_usage.logs.ingested_bytes&metric=datadog.estimated_usage.logs.ingested_bytes
[13]: https://app.datadoghq.com/monitors/create
[14]: https://app.datadoghq.com/logs
[15]: /fr/logs/explorer/search/
[16]: /fr/logs/indexes/#set-daily-quota
[17]: /fr/events/explorer/facets
[18]: https://app.datadoghq.com/dash/integration/logs_estimated_usage
[19]: https://app.datadoghq.com/dashboard/lists?q=Log+Management+-+Estimated+Usage
[20]: /fr/logs/log_configuration/indexes/#exclusion-filters
[21]: /fr/logs/explorer/analytics/patterns
[22]: /fr/logs/log_configuration/logs_to_metrics/
[23]: /fr/security/sensitive_data_scanner/
[24]: https://www.datadoghq.com/pricing/?product=sensitive-data-scanner#sensitive-data-scanner
[25]: /fr/account_management/audit_trail/events/
[26]: /fr/account_management/audit_trail/
[27]: https://www.datadoghq.com/pricing/?product=audit-trail#audit-trail
[28]: /fr/monitors/configuration/?tab=thresholdalert#evaluation-window
[29]: /fr/observability_pipelines/
[30]: /fr/logs/log_configuration/flex_logs/
[31]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40action%3Aqueried&agg_m=count&agg_m_source=base&agg_q=%40asset.new_value.query.indexes&agg_q_source=base&agg_t=count&audit__diff=unified&cols=log_usr.id%2Clog_action%2Clog_evt.name&fromUser=true&messageDisplay=expanded-md&refresh_mode=sliding&stream_sort=desc&top_n=10&top_o=top&viz=query_table&x_missing=true&live=true
[32]: /fr/logs/explorer/archive_search/