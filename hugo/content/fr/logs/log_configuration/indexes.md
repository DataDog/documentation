---
aliases:
- /fr/logs/dynamic_volume_control
- /fr/logs/indexes/
description: Contrôler le volume de logs indexés par Datadog
further_reading:
- link: https://www.datadoghq.com/architecture/a-guide-to-log-management-indexing-strategies-with-datadog/
  tag: Architecture Center
  text: Guide des stratégies d'indexation de Log Management avec Datadog
- link: /logs/explorer/#visualize
  tag: Documentation
  text: Effectuer des analyses de logs
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Apprendre à traiter vos logs
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: En savoir plus sur le parsing
- link: https://www.datadoghq.com/blog/logging-without-limits/
  tag: Blog
  text: Logging without Limits*
- link: https://www.datadoghq.com/blog/zendesk-cost-optimization/#optimizing-log-usage-to-manage-volume-and-cost
  tag: Blog
  text: 'Optimisation de Datadog à grande échelle : une observabilité économique chez
    Zendesk'
- link: https://learn.datadoghq.com/courses/log-indexes
  tag: Centre d'apprentissage
  text: Gérer et surveiller les volumes de logs indexés
title: Index
---
Les index de logs offrent un contrôle granulaire de votre budget de Log Management en vous permettant de segmenter les données en groupes de valeurs, selon la rétention, les quotas, le suivi de l'utilisation et la facturation. Les index se trouvent sur la [page de configuration][1] dans la section Indexes. Double-cliquez dessus ou cliquez sur le bouton *modifier* pour voir plus d'informations sur le nombre de logs indexés au cours des 3 derniers jours, ainsi que la période de rétention pour ces logs :

{{< img src="logs/indexes/index_details.jpg" alt="détails de l'index" style="width:70%;">}}

Vous pouvez utiliser des logs indexés pour la [recherche à facettes][2], les [patterns][3], les [analyses][4] et la [surveillance][6].

## Indexes multiples {#multiple-indexes}

Par défaut, chaque nouveau compte reçoit un index unique représentant un ensemble monolithique de tous vos logs. Datadog recommande d'utiliser plusieurs index si vous avez besoin de :

* Plusieurs [périodes de rétention](#update-log-retention)
* Plusieurs [quotas quotidiens](#set-daily-quota), pour un meilleur contrôle budgétaire.

Le Log Explorer prend en charge l'envoi de [requêtes sur plusieurs index][7].

### Ajouter des index {#add-indexes}

Utilisez le bouton {{< ui >}}New Index{{< /ui >}} pour créer un nouvel index. Il existe un nombre maximal d'index que vous pouvez créer pour chaque compte, fixé à 100 par défaut.

{{< img src="logs/indexes/add-index.png" alt="Ajouter un index" style="width:70%;">}}

**Remarque** : Les noms d'index doivent commencer par une lettre et ne peuvent contenir que des lettres minuscules, des chiffres ou le caractère « - ».

<div class="alert alert-info">
<a href="/help">Contactez le support Datadog</a> si vous devez augmenter le nombre maximal d'index pour votre compte.
</div>

### Supprimer des index {#delete-indexes}

Pour supprimer un index de votre organisation, utilisez l'icône {{< ui >}}Delete{{< /ui >}} dans la barre d'actions de l'index. Seuls les utilisateurs disposant de l'autorisation `Logs delete data` peuvent utiliser cette option.

{{< img src="logs/indexes/delete-index.png" alt="Supprimer l'index" style="width:70%;">}}

<div class="alert alert-danger">
Vous ne pouvez pas recréer un index portant le même nom que celui qui a été supprimé. 
</div>

**Remarque :** L'index supprimé n'acceptera plus de nouveaux logs entrants. Les logs contenus dans l'index supprimé ne sont plus disponibles pour les requêtes. Une fois que tous les logs ont expiré conformément à la période de rétention applicable, l'index n'apparaîtra plus sur la page Index.



## Filtres d'index {#indexes-filters}

Les filtres d'index permettent un contrôle dynamique des logs qui sont dirigés vers quels index. Par exemple, si vous créez un premier index filtré sur l'attribut `status:notice`, un deuxième index filtré sur l'attribut `status:error`, et un dernier sans aucun filtre (l'équivalent de `*`), tous vos logs `status:notice` iraient dans le premier index, tous vos logs `status:error` dans le deuxième index, et le reste irait dans le dernier.

{{< img src="logs/indexes/multi_index.png" alt="Indexes multiples" style="width:70%;">}}

**Remarque** : **Les logs sont assignés au premier index dont le filtre correspond**, utilisez le glisser-déposer sur la liste des index pour les réorganiser selon votre cas d'utilisation.

## Filtres d'exclusion {#exclusion-filters}

Par défaut, les index de logs ne possèdent pas de filtre d'exclusion. Ainsi, tous les logs correspondant à leur filtre sont indexés.

Mais comme vos logs n'ont pas tous la même valeur, les filtres d'exclusion contrôlent quels logs entrant dans votre index doivent être supprimés. Les logs exclus sont écartés des index, mais continuent de transiter par le [Livetail][8] et peuvent être utilisés pour [générer des métriques][9] et être [archivés][10].

Pour ajouter un filtre d'exclusion, procédez comme suit :

1. Accédez à [Log Indexes][11].
2. Développez l'index pour lequel vous souhaitez ajouter un filtre d'exclusion. 
3. Cliquez sur {{< ui >}}Add an Exclusion Filter{{< /ui >}}.

Les filtres d'exclusion sont définis par une requête, une règle d'échantillonnage et un bouton d'activation :

* La **requête** par défaut est `*`, ce qui signifie que tous les logs entrant dans l'index seraient exclus. Réduisez la portée du filtre d'exclusion à un sous-ensemble de logs uniquement [avec une requête de log][12].
* La **règle d'échantillonnage** par défaut est `Exclude 100% of logs`celle qui correspond à la requête. Adaptez le taux d'échantillonnage de 0 % à 100 % et décidez si le taux d'échantillonnage s'applique aux logs individuels ou à un groupe de logs défini par les valeurs uniques de n'importe quel attribut.
  * Si le taux d'échantillonnage s'applique aux logs individuels, l'échantillonnage est effectué sur la base de l'existence d'ID de trace dans les logs, s'ils sont présents. Dans ce scénario, les logs échantillonnés ont une probabilité accrue d'être corrélés avec des traces échantillonnées, afin de promouvoir des données de télémétrie unifiées.
  * Si la valeur unique d'un ID de trace est choisie pour l'échantillonnage, le comportement est le même que pour les logs individuels.
* Le **commutateur** par défaut est actif, ce qui signifie que les logs circulant dans l'index sont effectivement exclus conformément à la configuration du filtre d'exclusion. Désactivez ceci pour ignorer ce filtre d'exclusion pour les nouveaux logs circulant dans l'index.

**Remarque** : Les filtres d'index pour les logs ne sont traités qu'avec le premier filtre d'exclusion **actif** correspondant. Si un log correspond à un filtre d'exclusion (même si le log n'est pas exclu par échantillonnage), il ignore tous les filtres d'exclusion suivants dans la séquence.

Glissez et déposez les filtres d'exclusion de la liste pour les réorganiser selon vos cas d'utilisation.

{{< img src="logs/indexes/reorder_index_filters.png" alt="réorganiser les filtres d'index" style="width:80%;">}}

### Exemples {#examples}

#### Désactiver, activer {#switch-off-switch-on}

Vous pourriez ne pas avoir besoin de vos logs DEBUG jusqu'à ce que vous en ayez réellement besoin lorsque votre plateforme subit un incident, ou que vous souhaitiez observer attentivement le déploiement d'une version critique de votre application. Configurez un filtre d'exclusion à 100 % sur le `status:DEBUG`, et activez-le ou désactivez-le depuis l'interface utilisateur Datadog ou via l'[API][13] lorsque nécessaire.

{{< img src="logs/indexes/enable_index_filters.png" alt="activer les filtres d'index" style="width:80%;">}}

#### Surveillez les tendances {#keep-an-eye-on-trends}

Que faire si vous ne souhaitez pas conserver tous les logs de vos requêtes de serveur d'accès web ? Vous pourriez choisir d'indexer tous les logs 3xx, 4xx et 5xx, mais d'exclure 95 % des logs 2xx : `source:nginx AND http.status_code:[200 TO 299]` pour suivre les tendances.
**Astuce** : Transformez les logs d'accès web en indicateurs clés de performance significatifs avec une [métrique générée à partir de vos logs][9], comptant le nombre de requêtes et étiquetée par code de statut, [navigateur][14] et [pays][15].

{{< img src="logs/indexes/sample_200.png" alt="activer les filtres d'index" style="width:80%;">}}

#### Échantillonnage cohérent avec les entités de haut niveau {#sampling-consistently-with-higher-level-entities}

Vous avez des millions d'utilisateurs qui se connectent à votre site web chaque jour. Et bien que vous n'ayez pas besoin d'observabilité sur chaque utilisateur, vous souhaitez tout de même conserver une vue d'ensemble pour certains. Configurez un filtre d'exclusion s'appliquant à tous les logs de production (`env:production`) et excluez les logs pour 90 % des `@user.email` :

{{< img src="logs/indexes/sample_user_id.png" alt="activer les filtres d'index" style="width:80%;">}}

Vous pouvez utiliser l'APM conjointement avec les Logs, grâce à l'[injection d'ID de trace dans les logs][16]. En ce qui concerne les utilisateurs, vous n'avez pas besoin de conserver tous vos logs, mais il est essentiel de vous assurer que les logs offrent toujours une vue complète d'une trace pour le dépannage.
Configurez un filtre d'exclusion appliqué aux logs de votre service instrumenté (`service:my_python_app`) et excluez les logs pour 50 % des `Trace ID` - assurez-vous d'utiliser le [remapper d'ID de trace][17] en amont dans vos pipelines.

{{< img src="logs/indexes/sample_trace_id.png" alt="activer les filtres d'index" style="width:80%;">}}

Pour garantir un échantillonnage cohérent parmi plusieurs index :

1. Créez une règle d'exclusion dans chaque index.
2. Utilisez le **même taux d'échantillonnage** et le **même attribut** définissant l'entité de niveau supérieur pour toutes les règles d'exclusion.
3. Vérifiez attentivement les règles d'exclusion, les **filtres** et leur **ordre respectif** (les logs ne passent que par la première règle d'exclusion correspondante).

Dans els exemples suivants :

{{< img src="logs/indexes/cross-index_sampling.png" alt="activer les filtres d'index" style="width:80%;">}}

* En général, tous les logs avec un `request_id` spécifique sont soit conservés, soit exclus (avec une probabilité de 50 %).
* Les logs avec un tag `threat:true` ou `compliance:true` sont conservés indépendamment du `request_id`.
* `DEBUG` les logs sont indexés de manière cohérente avec la règle d'échantillonnage `request_id`, sauf si le filtre d'exclusion des logs de débogage est activé, auquel cas ils sont échantillonnés.
* 50 % des `2XX` logs d'accès web avec un `request_id` réel sont conservés. Tous les autres logs d'accès web `2XX` sont échantillonnés sur la base de la règle de filtre d'exclusion de 90 %.

## Mettre à jour la rétention des logs {#update-log-retention}

Le paramètre de rétention de l'index détermine la durée pendant laquelle les logs sont stockés et consultables dans Datadog. Vous pouvez définir la rétention sur n'importe quelle valeur autorisée dans la configuration de votre compte.

Pour activer l'ajout de rétentions supplémentaires qui ne figurent pas dans votre contrat actuel, contactez Customer Success à l'adresse suivante : `success@datadoghq.com`. Une fois les rétentions supplémentaires activées, vous devez mettre à jour les périodes de rétention pour vos index.

{{< img src="logs/indexes/log_retention.png" alt="détails de l'index" style="width:70%;">}}

**Remarque** : Pour utiliser des rétentions qui ne figurent pas dans votre contrat actuel, [l'option][21] doit être activée par un administrateur dans les paramètres de votre organisation.

## Définir un quota quotidien {#set-daily-quota}

Vous pouvez définir un quota quotidien pour limiter strictement le nombre de logs stockés dans un index par jour. Ce quota s'applique à tous les logs qui auraient dû être stockés (par exemple, après l'application des filtres d'exclusion).
Une fois le quota quotidien atteint, les logs ne sont plus indexés mais restent disponibles dans le [livetail][18], [envoyés vers vos archives][10] et utilisés pour [générer des métriques à partir des logs][9].

Ce quota peut être configuré ou supprimé à tout moment en modifiant l'index :
- Définir un quota quotidien en millions de logs
- (Facultatif) Définissez une heure de réinitialisation personnalisée ; par défaut, les quotas quotidiens d'index sont réinitialisés automatiquement à [14h00 UTC][19]
- (Facultatif) Définissez un seuil d'avertissement en pourcentage du quota quotidien (minimum 50 %)

**Remarque** : Les modifications apportées aux quotas quotidiens et aux seuils d'avertissement prennent effet immédiatement.

{{< img src="logs/indexes/daily_quota_config.png" alt="détails de l'index" style="width:70%;">}}

Un événement est généré lorsque le quota journalier ou le seuil d'avertissement est atteint :

{{< img src="logs/indexes/daily_quota_warning_events.png" alt="Quota quotidien et événements d'avertissement" style="width:90%;">}}

Consultez la rubrique [Surveiller l'utilisation des logs][20] pour découvrir comment surveiller votre utilisation et envoyer des alertes à ce sujet.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}
<br>
*Logging without Limits est une marque déposée de Datadog, Inc.

[1]: https://app.datadoghq.com/logs/pipelines/
[2]: /fr/logs/explorer/#visualization
[3]: /fr/logs/explorer/patterns/
[4]: /fr/logs/explorer/analytics/
[6]: /fr/monitors/types/log/
[7]: /fr/logs/explorer/facets/#the-index-facet
[8]: /fr/logs/live_tail/
[9]: /fr/logs/logs_to_metrics/
[10]: /fr/logs/archives/
[11]: https://app.datadoghq.com/logs/pipelines/indexes
[12]: /fr/logs/search_syntax/
[13]: /fr/api/v1/logs-indexes/#update-an-index
[14]: /fr/logs/log_configuration/processors/user_agent_parser/
[15]: /fr/logs/log_configuration/processors/geoip_parser/
[16]: /fr/tracing/other_telemetry/connect_logs_and_traces/
[17]: /fr/logs/log_configuration/processors/trace_remapper/
[18]: /fr/logs/live_tail/#overview
[19]: https://www.timeanddate.com/worldclock/converter.html
[20]: /fr/logs/guide/best-practices-for-log-management/#monitor-log-usage
[21]: /fr/account_management/org_settings/#out-of-contract-retention-periods-for-log-indexes