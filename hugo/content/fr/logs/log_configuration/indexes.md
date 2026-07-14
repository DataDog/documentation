---
aliases:
- /fr/logs/dynamic_volume_control
- /fr/logs/indexes/
description: Contrôler le volume de logs indexés par Datadog
further_reading:
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
  text: 'Optimiser Datadog à grande échelle : observabilité rentable chez Zendesk'
- link: https://learn.datadoghq.com/courses/log-indexes
  tag: Centre d'apprentissage
  text: Gérer et surveiller les volumes de logs indexés
title: Index
---
Les index de logs offrent un contrôle granulaire sur votre budget de gestion des logs en vous permettant de segmenter les données en groupes de valeur pour différentes périodes de conservation, quotas, surveillance de l'utilisation et facturation. Les index se trouvent sur la [page de configuration][1] dans la section Indexes. Double-cliquez dessus ou cliquez sur le bouton *Modifier* pour voir davantage d'informations sur le nombre de logs indexés au cours des 3 derniers jours, ainsi que la période de conservation de ces logs :

{{< img src="logs/indexes/index_details.jpg" alt="détails de l'index" style="width:70%;">}}

Vous pouvez utiliser des logs indexés pour la [recherche à facettes][2], les [patterns][3], les [analyses][4] et la [surveillance][6].

## Plusieurs index {#multiple-indexes}

Par défaut, chaque nouveau compte obtient un seul index représentant un ensemble monolithique de tous vos logs. Datadog recommande d'utiliser plusieurs index si vous avez besoin de :

* Plusieurs [périodes de conservation](#update-log-retention)
* Plusieurs [quotas journaliers](#set-daily-quota), pour un meilleur contrôle du budget.

Le Log Explorer prend en charge l'envoi de [requêtes sur plusieurs index][7].

### Ajouter des index {#add-indexes}

Utilisez le bouton "Nouveau index" pour créer un nouvel index. Il y a un nombre maximum d'index que vous pouvez créer pour chaque compte, fixé à 100 par défaut.

{{< img src="logs/indexes/add-index.png" alt="Ajouter un index" style="width:70%;">}}

**Remarque** : Les noms d'index doivent commencer par une lettre et ne peuvent contenir que des lettres minuscules, des chiffres ou le caractère '-'.

<div class="alert alert-info">
<a href="/help">Contactez le support Datadog</a> si vous avez besoin d'augmenter le nombre maximum d'index pour votre compte.
</div>

### Supprimer des index {#delete-indexes}

Pour supprimer un index de votre organisation, utilisez l'"icône de suppression" dans la barre d'actions de l'index. Seuls les utilisateurs ayant la `Logs delete data` permission peuvent utiliser cette option.

{{< img src="logs/indexes/delete-index.png" alt="Supprimer l'index" style="width:70%;">}}

<div class="alert alert-danger">
Vous ne pouvez pas recréer un index avec le même nom que celui qui a été supprimé. 
</div>

**Remarque :** L'index supprimé n'acceptera plus de nouveaux journaux entrants. Les journaux de l'index supprimé ne sont plus disponibles pour les requêtes. Après que tous les journaux aient expiré selon la période de conservation applicable, l'index n'apparaîtra plus sur la page des Index.



## Filtres d'index {#indexes-filters}

Les filtres d'index permettent un contrôle dynamique sur les journaux qui entrent dans quels index. Par exemple, si vous créez un premier index filtré sur l'attribut `status:notice`, un deuxième index filtré sur l'attribut `status:error`, et un dernier sans aucun filtre (l'équivalent de `*`), tous vos journaux `status:notice` iraient au premier index, tous vos journaux `status:error` iraient au deuxième index, et le reste irait au dernier.

{{< img src="logs/indexes/multi_index.png" alt="Indexes multiples" style="width:70%;">}}

**Remarque** : **Les logs entrent dans le premier index auquel leur filtre s'applique**, utilisez le glisser-déposer sur la liste des index pour les réorganiser selon votre cas d'utilisation.

## Filtres d'exclusion {#exclusion-filters}

Par défaut, les index de logs ne possèdent pas de filtre d'exclusion. Ainsi, tous les logs correspondant à leur filtre sont indexés.

Mais comme vos journaux ne sont pas tous et également précieux, les filtres d'exclusion contrôlent quels journaux entrant dans votre index doivent être supprimés. Les logs exclus sont écartés des index, mais continuent de passer par le [Livetail][8] et peuvent être utilisés pour [générer des métriques][9] et être archivés[10].

Pour ajouter un filtre d'exclusion, procédez comme suit :

1. Naviguez vers [Index de journaux][11].
2. Développez l'index pour lequel vous souhaitez ajouter un filtre d'exclusion. 
3. Cliquez sur **Ajouter un filtre d'exclusion**.

Les filtres d'exclusion sont définis par une requête, une règle d'échantillonnage et un bouton d'activation :

* La **requête** par défaut est `*`, ce qui signifie que tous les journaux entrant dans l'index seraient exclus. Limitez le filtre d'exclusion à un sous-ensemble de journaux [avec une requête de journal][12].
* La **règle d'échantillonnage** par défaut est `Exclude 100% of logs` correspondant à la requête. Adaptez le taux d'échantillonnage de 0 % à 100 %, et décidez si le taux d'échantillonnage s'applique aux journaux individuels ou à un groupe de journaux définis par les valeurs uniques de tout attribut.
  * Si le taux d'échantillonnage s'applique aux journaux individuels, l'échantillonnage est effectué sur l'existence des identifiants de trace dans les journaux, s'ils sont présents. Dans ce scénario, les journaux échantillonnés ont une chance accrue d'être corrélés avec les traces échantillonnées, afin de promouvoir des données de télémétrie unifiées.
  * Si la valeur unique d'un ID de trace est choisie pour l'échantillonnage, le comportement est le même que pour les journaux individuels.
* Le **commutateur** par défaut est actif, ce qui signifie que les journaux circulant dans l'index sont en réalité rejetés selon la configuration du filtre d'exclusion. Désactivez ceci pour ignorer ce filtre d'exclusion pour les nouveaux journaux circulant dans l'index.

**Remarque** : Les filtres d'index pour les journaux ne sont traités qu'avec le premier **filtre d'exclusion** actif correspondant. Si un journal correspond à un filtre d'exclusion (même si le journal n'est pas échantillonné), il ignore tous les filtres d'exclusion suivants dans la séquence.

Glissez et déposez les filtres d'exclusion de la liste pour les réorganiser selon vos cas d'utilisation.

{{< img src="logs/indexes/reorder_index_filters.png" alt="réorganiser les filtres d'index" style="width:80%;">}}

### Exemples {#examples}

#### Désactiver, activer {#switch-off-switch-on}

Vous n'aurez peut-être pas besoin de vos journaux DEBUG jusqu'à ce que vous en ayez réellement besoin lorsque votre plateforme subit un incident, ou que vous souhaitiez observer attentivement le déploiement d'une version critique de votre application. Configurez un filtre d'exclusion de 100 % sur le `status:DEBUG`, et activez-le et désactivez-le depuis l'interface utilisateur de Datadog ou via l'[API][13] lorsque nécessaire.

{{< img src="logs/indexes/enable_index_filters.png" alt="activer les filtres d'index" style="width:80%;">}}

#### Surveillez les tendances {#keep-an-eye-on-trends}

Que faire si vous ne souhaitez pas conserver tous les journaux de vos requêtes de serveur d'accès web ? Vous pourriez choisir d'indexer tous les journaux 3xx, 4xx et 5xx, mais d'exclure 95 % des journaux 2xx : `source:nginx AND http.status_code:[200 TO 299]` pour suivre les tendances.
**Astuce** : Transformez les journaux d'accès web en KPI significatifs avec une [métrique générée à partir de vos journaux][9], comptant le nombre de requêtes et étiquetée par code d'état, [navigateur][14] et [pays][15].

{{< img src="logs/indexes/sample_200.png" alt="activer les filtres d'index" style="width:80%;">}}

#### Échantillonnez de manière cohérente avec des entités de niveau supérieur {#sampling-consistently-with-higher-level-entities}

Vous avez des millions d'utilisateurs se connectant à votre site web chaque jour. Et bien que vous n'ayez pas besoin d'observabilité sur chaque utilisateur, vous souhaitez tout de même garder une vue d'ensemble pour certains. Configurez un filtre d'exclusion s'appliquant à tous les journaux de production (`env:production`) et excluez les journaux pour 90 % des `@user.email` :

{{< img src="logs/indexes/sample_user_id.png" alt="activer les filtres d'index" style="width:80%;">}}

Vous pouvez utiliser APM en conjonction avec les journaux, grâce à l'[injection de l'ID de trace dans les journaux][16]. En ce qui concerne les utilisateurs, vous n'avez pas besoin de conserver tous vos journaux, mais il est essentiel de s'assurer que les journaux donnent toujours une vue d'ensemble complète d'une trace pour le dépannage.
Mettez en place un filtre d'exclusion appliqué aux journaux de votre service instrumenté (`service:my_python_app`) et excluez les journaux pour 50 % des `Trace ID` - assurez-vous d'utiliser le [remappeur d'ID de trace][17] en amont dans vos pipelines.

{{< img src="logs/indexes/sample_trace_id.png" alt="activer les filtres d'index" style="width:80%;">}}

Pour garantir un échantillonnage cohérent parmi plusieurs index :

1. Créez une règle d'exclusion dans chaque index.
2. Utilisez le **même taux d'échantillonnage** et le **même attribut** définissant l'entité de niveau supérieur pour toutes les règles d'exclusion.
3. Vérifiez à nouveau les règles d'exclusion, **les filtres** et **l'ordre respectif** (les journaux ne passent que par la première règle d'exclusion correspondante).

Dans els exemples suivants :

{{< img src="logs/indexes/cross-index_sampling.png" alt="activer les filtres d'index" style="width:80%;">}}

* En général, tous les journaux avec un `request_id` spécifique sont soit conservés, soit exclus (avec une probabilité de 50 %).
* Les journaux avec un `threat:true` ou `compliance:true` tag sont conservés indépendamment du `request_id`.
* `DEBUG` Les journaux sont indexés de manière cohérente avec la règle d'échantillonnage `request_id`, sauf si le filtre d'exclusion des journaux de débogage est activé, auquel cas ils sont échantillonnés.
* 50 % des `2XX` journaux d'accès web avec un `request_id` réel sont conservés. Tous les autres `2XX` journaux d'accès web sont échantillonnés en fonction de la règle de filtre d'exclusion de 90 %.

## Mettez à jour la conservation des journaux {#update-log-retention}

Le paramètre de conservation de l'index détermine combien de temps les journaux sont stockés et consultables dans Datadog. Vous pouvez définir la conservation à n'importe quelle valeur autorisée dans la configuration de votre compte.

Pour activer l'ajout de conservations supplémentaires qui ne figurent pas dans votre contrat actuel, contactez Customer Success à : `success@datadoghq.com`. Après que des conservations supplémentaires ont été activées, vous devez mettre à jour les périodes de conservation pour vos index.

{{< img src="logs/indexes/log_retention.png" alt="détails de l'index" style="width:70%;">}}

**Remarque** : Pour utiliser des conservations qui ne figurent pas dans votre contrat actuel, [l'option][21] doit être activée par un administrateur dans les paramètres de votre organisation.

## Définissez un quota quotidien {#set-daily-quota}

Vous pouvez définir un quota quotidien pour limiter strictement le nombre de journaux qui sont stockés dans un index par jour. Ce quota s'applique à tous les journaux qui auraient dû être stockés (comme après l'application des filtres d'exclusion).
Une fois le quota quotidien atteint, les journaux ne sont plus indexés mais restent disponibles dans le [livetail][18], [envoyés à vos archives][10], et utilisés pour [générer des métriques à partir des journaux][9].

Ce quota peut être configuré ou supprimé à tout moment en modifiant l'index :
- Définissez un quota quotidien en millions de journaux
- (Optionnel) Définissez une heure de réinitialisation personnalisée ; par défaut, les quotas quotidiens d'indexation se réinitialisent automatiquement à [14h00 UTC][19]
- (Optionnel) Définissez un seuil d'avertissement en pourcentage du quota quotidien (minimum 50%)

**Remarque** : Les modifications des quotas quotidiens et des seuils d'avertissement prennent effet immédiatement.

{{< img src="logs/indexes/daily_quota_config.png" alt="détails de l'index" style="width:70%;">}}

Un événement est généré lorsque le quota journalier ou le seuil d'avertissement est atteint :

{{< img src="logs/indexes/daily_quota_warning_events.png" alt="Quota quotidien et événements d'avertissement" style="width:90%;">}}

Consultez la rubrique [Surveiller l'utilisation des logs][20] pour découvrir comment surveiller votre utilisation et envoyer des alertes à ce sujet.

## Lectures complémentaires {#further-reading}

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