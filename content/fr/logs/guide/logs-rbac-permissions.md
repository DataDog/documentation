---
title: Autorisations RBAC pour les logs
kind: guide
further_reading:
  - link: /logs/guide/logs-rbac
    tag: Documentation
    text: Configuration du RBAC pour les logs
  - link: account_management/rbac/permissions
    tag: Documentation
    text: En savoir plus sur les autorisations RBAC
---
## Présentation

Après avoir créé des [rôles RBAC pour les logs][1], attribuez des [autorisations][2] à un rôle ou supprimez-les de ce rôle.

{{< tabs >}}
{{% tab "Interface utilisateur" %}}

Attribuez directement des autorisations à un rôle ou supprimez-les de ce rôle en [modifiant le rôle depuis l'application Datadog][1].

{{< img src="account_management/rbac/logs_permissions.png" alt="Autorisations de logs"  style="width:75%;" >}}

[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

Attribuez directement des autorisations à un rôle ou supprimez-les de ce rôle via l'[API Permission Datadog][1].

[1]: /fr/api/v2/roles/
{{% /tab %}}
{{< /tabs >}}

Vous trouverez plus de détails sur chaque autorisation ci-dessous.

## Accès à la configuration des logs

### `logs_generate_metrics`

Permet à un rôle de [générer des métriques][3].

Cette autorisation est globale et permet à la fois de créer de nouvelles métriques et de modifier ou de supprimer des métriques existantes.

### `logs_write_facets`

Permet à un rôle de [créer, modifier et supprimer des facettes][4].

Cette autorisation est globale et permet à la fois de créer de nouvelles facettes et de modifier ou de supprimer des facettes existantes.

### `logs_modify_indexes`

Permet à un rôle de créer et de modifier des [index de logs][5], notamment à l'aide des actions suivantes :

- Configurer des [filtres d'index][6] pour définir les logs devant intégrer un index
- Définir les paramètres de [rétention des logs][7] d'un index
- Accorder les autorisations [logs_read_index_data](#logs-read-index-data) et [logs_write_exclusion_filters](#logs-write-exclusion-filters) pour un index spécifique à un autre rôle

Cette autorisation est globale et permet à la fois de créer de nouveaux index et de modifier des index existants.

**Remarque** : cette autorisation accorde également les autorisations [logs_read_index_data](#logs-read-index-data) et [logs_write_exclusion_filters](#logs-write-exclusion-filters) en arrière-plan.


### `logs_write_exclusion_filters`

Permet à un rôle de créer et de modifier des [filtres d'exclusion][8] dans un index.

Cette autorisation peut être globale ou limitée à un sous-ensemble d'index.

**Sous-ensemble d'index** :

{{< tabs >}}
{{% tab "Interface utilisateur" %}}

1. Supprimez l'autorisation globale accordée au rôle.
2. Accordez cette autorisation au rôle depuis [la page Index de l'application Datadog][1] en modifiant un index et en ajoutant le rôle dans le champ « Grant editing Exclusion Filters of this index to » (voir la capture d'écran ci-dessous).

{{< img src="account_management/rbac/logs_write_exclusion_filters.png" alt="Logs Write Exclusion Filters"  style="width:75%;" >}}


[1]: /fr/logs/log_configuration/indexes/
{{% /tab %}}
{{% tab "API" %}}

Cette configuration est uniquement prise en charge via l'interface utilisateur.

{{% /tab %}}
{{< /tabs >}}

### `logs_write_pipelines`

Permet à un rôle de créer et de modifier des [pipelines de traitement de logs][9], notamment à l'aide des actions suivantes :

- Définir le nom du pipeline
- Définir des filtres de pipeline pour déterminer les logs qui doivent passer par le pipeline de traitement
- Réorganiser les pipelines
- Accorder l'autorisation [logs_write_processors](#logs-write-processors) pour un pipeline spécifique à un autre rôle
- Gérer les [attributs standard][10] ou les [facettes utilisées pour les alias][11]

**Remarque** : cette autorisation accorde également les autorisations [Logs_Write_Processors](#logs-write-processors) (pour tous les processeurs sur tous les pipelines) en arrière-plan.


### `logs_write_processors`

Permet à un rôle de créer, de modifier ou de supprimer des processeurs et des pipelines imbriqués.

Cette autorisation peut être globale ou limitée à un sous-ensemble de pipelines.

{{< tabs >}}
{{% tab "Interface utilisateur" %}}

Accordez l'autorisation à un ou plusieurs rôles dans la fenêtre d'un pipeline spécifique.

{{< img src="account_management/rbac/logs_write_processors.png" alt="Logs Write Processors"  style="width:75%;" >}}

{{% /tab %}}
{{% tab "API" %}}

1. [Récupérez l'ID de rôle][1] du rôle que vous souhaitez attribuer à des pipelines spécifiques.
2. [Récupérez l'ID d'autorisation][2] pour l'API `logs_write_processors` de votre région.
3. [Récupérez le ou les ID de pipeline][3] du ou des pipelines pour lesquels vous souhaitez attribuer ce rôle.
4. Accordez l'autorisation à ce rôle avec l'appel suivant :

```sh
curl -X POST \
        https://app.datadoghq.com/api/v1/role/<RÔLE_UUID>/permission/<AUTORISATION_UUID> \
        -H "Content-Type: application/json" \
        -H "DD-API-KEY: <VOTRE_CLÉ_API_DATADOG>" \
        -H "DD-APPLICATION-KEY: <VOTRE_CLÉ_APPLICATION_DATADOG>" \
        -d '{
                "scope": {
                    "pipelines": [ "<ID_PIPELINE-X>", "<ID_PIPELINE-Y>"]
                }
            }'
```

[1]: /fr/api/v2/roles/#list-roles
[2]: /fr/api/v2/roles/#list-permissions
[3]: /fr/api/v1/logs-pipelines/#get-all-pipelines
{{% /tab %}}
{{< /tabs >}}

### `logs_write_archives`

Permet à un rôle de créer, de modifier ou de supprimer des [archives de logs][12], notamment à l'aide des actions suivantes :

- Configurer des filtres d'archive pour définir les logs qui doivent intégrer l'archive
- Définir le nom de l'archive
- Réorganiser les archives
- Limiter l'autorisation [logs_read_archives](#logs-read-archives) à un sous-ensemble de rôles

Cette autorisation est globale et permet à la fois de créer de nouvelles archives et de modifier ou de supprimer les archives existantes.

### `logs_read_archives`

Permet à un rôle d'accéder aux informations de configuration des archives. Utilisée conjointement avec [Logs_Write_Historical_Views](#logs-write-historical-views), cette autorisation permet également de déclencher une [réintégration][13] à partir des archives.

Cette autorisation peut être limitée à un sous-ensemble d'archives. Une archive sans restriction est accessible par toute personne disposant d'un rôle et de l'autorisation `logs_read_archives`. Une archive présentant des restrictions est uniquement accessible aux utilisateurs possédant un des rôles enregistrés, à condition que ces rôles disposent de l'autorisation `logs_read_archives`.

Dans l'exemple suivant, en supposant que tous les rôles à l'exception de `Guest` disposent de l'autorisation `logs_read_archive` :

* L'archive Staging est accessible à tous les utilisateurs, à l'exception des utilisateurs ayant **uniquement** le rôle `Guest`.
* L'archive Prod est accessible à tous les utilisateurs ayant le rôle `Customer Support`.
* L'archive Security-Audit n'est pas accessible aux utilisateurs ayant le rôle `Customer Support`, sauf s'ils ont également le rôle `Audit & Security`.

{{< img src="account_management/rbac/logs_archives_list.png" alt="Créer un rôle personnalisé"  style="width:90%;">}}

{{< tabs >}}
{{% tab "Interface utilisateur" %}}

Créez une archive ou mettez une archive existante à jour en la modifiant.

{{< img src="account_management/rbac/logs_archive_restriction.png" alt="Créer un rôle personnalisé"  style="width:90%;">}}

{{% /tab %}}
{{% tab "API" %}}

Utilisez l'API Logs Archives pour [attribuer][1] ou [révoquer][2] un rôle pour une archive donnée.


[1]: /fr/api/v2/logs-archives/#grant-role-to-an-archive
[2]: /fr/api/v2/logs-archives/#revoke-role-from-an-archive
{{% /tab %}}
{{< /tabs >}}

### `logs_write_historical_views`

Permet à un rôle d'écrire des vues historiques, c'est-à-dire d'utiliser la fonctionnalité [Log Rehydration*][13].

Cette autorisation est globale et permet aux utilisateurs de lancer une réintégration à partir d'archives pour lesquelles ils disposent de l'autorisation [Logs_Read_Archives](#logs-read-archives).

{{< img src="account_management/rbac/logs_hv_roles_combination.png" alt="Écrire une vue historique"  style="width:70%;">}}

Dans l'exemple ci-dessus :

* Les membres ayant le rôle `ADMIN` **peuvent** lancer une réintégration à partir de l'archive `Audit`, car ils disposent de l'autorisation logs_write_historical_view ainsi que de l'autorisation logs_read_archives pour cette archive.
* Les membres ayant le rôle `AUDIT` ne **peuvent pas** lancer de réintégration à partir de l'archive `Audit`, car ils ne disposent pas de l'autorisation logs_historical_view.
* Les membres ayant le rôle `PROD` ne **peuvent pas** lancer de réintégration à partir de l'archive `Audit`, car ils ne disposent pas de l'autorisation logs_read_archives.


Lors de l'attribution de tags `team:audit` à tous les logs réintégrés à partir de l'archive `Audit`, assurez-vous que les membres avec le rôle `Audit` qui sont limités à la lecture des logs `team:audit` ne peuvent accéder qu'au contenu réintégré. Pour en savoir plus sur l'ajout de tags et la réintégration, consultez la [section relative à la configuration des archives de logs][12].

Pour les logs `service:ci-cd` réintégrés à partir de l'archive `Prod`, notez ce qui suit :

* Si vous **n'utilisez pas** l'autorisation obsolète [logs_read_index_data](#logs-read-index-data), ces logs sont accessibles aux membres ayant le rôle `CI-CD`.
* Si vous **utilisez** l'autorisation obsolète [logs_read_index_data](#logs-read-index-data), ces logs ne sont pas accessibles aux membres ayant le rôle `CI-CD`, car la vue historique qui en résulte est limitée aux membres ayant le rôle `PROD` ou `ADMIN`.


### `logs_public_config_api`

Permet de consulter, de créer ou de modifier une configuration de log via l'API Datadog :

* Consulter et configurer des [archives][14] via l'API
* Consulter et configurer des [Index][15] via l'API
* Consulter et configurer des [pipelines][16] via l'API
* Consulter et configurer des [requêtes de restriction][17] via l'API
* Consulter et configurer des [métriques générées à partir de logs][18] via l'API

L'autorisation logs_public_config_api accorde uniquement l'autorisation d'effectuer des actions par le biais de l'API. Par exemple, si un utilisateur ne dispose pas de l'autorisation [logs_write_exclusion_filter](#logs-write-exclusion-filters), il ne pourra pas mettre à jour le taux d'échantillonnage via l'API, et ce même s'il dispose de l'autorisation logs_public_config_api.

## Accès aux données de log

Accordez les autorisations suivantes pour gérer l'accès en lecture à des sous-ensembles de données de log :

* [Logs_Read_Data](#logs-read-data) (conseillé) : offre une granularité supérieure en permettant de restreindre l'accès d'un rôle aux logs correspondant à des requêtes de restriction de logs.
* [Logs_Read_Index_Data](#logs-read-index-data) : autorisation anciennement utilisée pour restreindre l'accès aux données de log d'index spécifiques (cette autorisation reste nécessaire pour accéder aux données indexées).

### `logs_read_data`

Accès en lecture aux données de log. Si cette autorisation est accordée, d'autres restrictions peuvent être appliquées, par exemple avec `logs_read_index_data` ou via une [requête de restriction][17].

Les rôles sont cumulatifs : si un utilisateur dispose de plusieurs rôles, toutes les autorisations de chacun des rôles déterminent les données auxquelles il a accès.

**Exemple** :

* Si un utilisateur dispose d'un rôle avec un accès en lecture aux données de logs ainsi que d'un rôle sans accès en lecture aux données de logs, alors il peut lire les données.
* Si un utilisateur est limité à `service:sandbox` par un rôle, et qu'il est limité à `env:prod` par un autre rôle, alors l'utilisateur peut accéder à tous les logs de `env:prod` et `service:sandbox`.

{{< img src="account_management/rbac/logs_rq_roles_combination.png" alt="Accès en lecture aux données"  style="width:70%;">}}


{{< tabs >}}
{{% tab "Interface utilisateur" %}}

Pour limiter les utilisateurs de manière à ce qu'ils puissent voir uniquement les logs correspondant à une requête de restriction, utilisez la [page Data Access][1] dans l'application Datadog pour :

1. [Créer](#creer-une-requete-de-restriction) une requête de restriction.
2. [Assigner](#assigner-un-role-a-une-requete-de-restriction) un ou plusieurs rôles à cette requête de restriction.
3. [Vérifier](#verifier-les-requetes-de-restriction) quels rôles et utilisateurs sont assignés aux requêtes de restriction.


Cette vue répertorie les éléments suivants :

* **Section `Restricted Access`** : toutes les requêtes de restriction, ainsi que le ou les rôles associés.
* **Section `Unrestricted Access`** : tous les rôles qui disposent de l'autorisation `log_read_data` sans restriction supplémentaire.
* **Section `No Access`** : tous les rôles qui ne disposent pas de l'autorisation `log_read_data`.


## Créer une requête de restriction

Créez une requête de restriction en définissant son filtre de requête. La nouvelle requête apparaît dans la liste des restrictions sans aucun rôle associé.

{{< img src="account_management/rbac/logs_rq-create.gif" alt="Créer une requête de restriction"  style="width:70%;">}}


### Assigner un rôle à une requête de restriction

Choisissez un rôle et assignez-le à la requête de restriction de votre choix.

*Remarque* : n'oubliez pas qu'un rôle peut être associé à une seule requête de restriction. Par conséquent, si vous assignez un rôle à une requête de restriction, il perd tout lien avec la requête de restriction à laquelle il était déjà associé.

{{< img src="account_management/rbac/logs_rq-assign_roles.gif" alt="Assigner un rôle à une requête de restriction"  style="width:70%;">}}

De la même manière, utilisez cette action de déplacement pour accorder un `Unrestricted Access` à un rôle ou, à l'inverse, pour le transformer en rôle de type `No Access`.

### Vérifier les requêtes de restriction

Cette page affiche un maximum de 50 requêtes de restriction à la fois et de 50 rôles par section. Si vous avez des centaines ou des milliers de rôles et de requêtes de restriction, utilisez les filtres pour affiner la vue :

* À l'aide du filtre de requête de restriction :

{{< img src="account_management/rbac/logs_rq-filter.png" alt="Filtrer les requêtes de restriction"  style="width:70%;">}}

* À l'aide du filtre de rôle :

{{< img src="account_management/rbac/logs_rq-view_as_role.png" alt="Visualisation des rôles"  style="width:70%;">}}

* À l'aide du filtre d'utilisateur, qui vous permet de visualiser facilement le contenu auquel peut accéder un utilisateur spécifique associé à plusieurs rôles :

{{< img src="account_management/rbac/logs_rq-view_as_user.png" alt="Visualisation des rôles"  style="width:70%;">}}

[1]: https://app.datadoghq.com/logs/pipelines/data-access
{{% /tab %}}
{{% tab "API" %}}

Révoquez ou accordez cette autorisation avec [l'API Roles][1].
Utilisez des [requêtes de restriction][2] pour restreindre l'autorisation à un sous-ensemble de données de log.

[1]: /fr/api/#roles
[2]: /fr/api/?lang=bash#roles-restriction-queries-for-logs
{{% /tab %}}
{{< /tabs >}}

## Autorisations héritées

Ces autorisations sont activées globalement par défaut pour tous les utilisateurs.

L'autorisation [logs_read_data](#logs-read-data) vient s'ajouter à ces autorisations obsolètes. Par exemple, imaginons qu'un utilisateur est limité à la requête `service:api`.

* Si cet utilisateur dispose de l'autorisation [logs_read_index_data](#logs-read-index-data) pour les index `audit` et `errors` uniquement, il verra uniquement les logs `service:api` dans ces index.
* Si cet utilisateur dispose de l'autorisation [logs_live_tail](#logs-live-tail), il verra uniquement les logs `service:api` dans le Live tail.


### `logs_read_index_data`

Permet à un rôle de lire des index de logs. L'accès peut être accordé globalement ou limité à un sous-ensemble d'index de logs.

Pour limiter cette autorisation à un sous-ensemble d'index, supprimez d'abord les autorisations `logs_read_index_data` et `logs_modify_indexes` du rôle. Suivez ensuite les étapes suivantes :

{{< tabs >}}
{{% tab "Interface utilisateur" %}}

Accordez à ce rôle l'accès à l'index depuis la [page de configuration][1].

{{< img src="account_management/rbac/logs_read_index_data.png" alt="Accorder l'accès en lecture pour les index à des rôles spécifiques" style="width:75%;" >}}


[1]: https://app.datadoghq.com/logs/indexes
{{% /tab %}}
{{% tab "API" %}}

* [Récupérez l'ID de rôle][1] du rôle que vous souhaitez attribuer à des pipelines spécifiques.
* [Récupérez l'ID d'autorisation][2] pour l'API `logs_write_processors` de votre région.
* [Récupérez l'ID d'index][3] de l'index pour lequel vous souhaitez attribuer ce rôle.
* Accordez l'autorisation à ce rôle avec l'appel suivant :

```bash
curl -X POST \
        https://app.datadoghq.com/api/v1/role/<RÔLE_UUID>/permission/<AUTORISATION_UUID> \
        -H "Content-Type: application/json" \
        -H "DD-API-KEY: <VOTRE_CLÉ_API_DATADOG>" \
        -H "DD-APPLICATION-KEY: <VOTRE_CLÉ_APPLICATION_DATADOG>" \
        -d '{
                "scope": {
                    "indexes": ["<ID_INDEX-1>",["<ID_INDEX-2>"]
                }
            }'
```


[1]: /fr/api/v2/roles/#list-roles
[2]: /fr/api/v2/roles/#list-permissions
[3]: /fr/api/v1/logs-indexes/#get-all-indexes
{{% /tab %}}
{{< /tabs >}}

### `logs_live_tail`

Permet à un rôle d'utiliser la fonctionnalité [Live Tail][19].

Cette autorisation est globale et accorde l'accès à la fonction Livetail indépendamment de l'autorisation [logs_read_index_data](#logs-read-index-data).

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Log Rehydration est une marque déposée de Datadog, Inc.

[1]: /fr/logs/guide/logs-rbac/
[2]: /fr/account_management/rbac/permissions
[3]: /fr/logs/logs_to_metrics/
[4]: /fr/logs/explorer/facets/#overview
[5]: /fr/logs/indexes
[6]: /fr/logs/indexes#indexes-filters
[7]: /fr/logs/indexes#update-log-retention
[8]: /fr/logs/indexes#exclusion-filters
[9]: /fr/logs/log_configuration/pipelines
[10]: /fr/logs/log_configuration/attributes_naming_convention/#standard-attributes
[11]: /fr/logs/explorer/facets/#alias-facets
[12]: /fr/logs/archives
[13]: /fr/logs/archives/rehydrating
[14]: /fr/api/v2/logs-archives/
[15]: /fr/api/v1/logs-indexes/
[16]: /fr/api/v1/logs-pipelines/
[17]: /fr/api/v2/logs-restriction-queries/
[18]: /fr/api/v2/logs-metrics/
[19]: /fr/logs/explorer/live_tail/