---
title: Autorisations des rôles Datadog
kind: documentation
aliases:
  - /fr/account_management/faq/managing-global-role-permissions
further_reading:
  - link: /account_management/rbac/
    tag: Documentation
    text: 'Découvrir comment créer, mettre à jour et supprimer un rôle'
  - link: '/api/v2/roles/#enumerer-les-autorisations'
    tag: Documentation
    text: Gérer vos autorisations avec l'API Permission
---
Une fois votre rôle créé, vous pouvez attribuer ou supprimer des autorisations pour ce rôle directement en [le mettant à jour depuis l'application Datadog][1] ou via [l'API Permission de Datadog][2]. Vous trouverez ci-dessous la liste des autorisations disponibles.

## Présentation

### Autorisations générales

Les autorisations générales définissent les niveaux d'accès minimum pour votre rôle. Les [autorisations avancées](#autorisations-avancees) permettent ensuite d'accorder des droits supplémentaires.

| Nom de l'autorisation | Description                                                                                                                                                                                                                                                                                           |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| admin           | Cette autorisation donne au rôle la possibilité de consulter et de modifier tous les éléments liés à votre organisation Datadog, sauf si une autorisation spécifique a été définie. Il s'agit notamment des informations de facturation et d'utilisation ainsi que des outils de gestion des utilisateurs, des clés, des rôles, des autorisations et de l'organisation. Cette autorisation inclut toutes les autorisations accordées par l'Accès standard. |
| standard        | Cette autorisation donne au rôle la possibilité de consulter et modifier les composants de votre organisation Datadog, sauf si une autorisation spécifique a été définie. Il s'agit notamment de l'APM, des Événements ainsi que d'autres fonctionnalités qui ne concernent pas la gestion des comptes.                                                                    |

**Remarque** : il n'existe pas d'autorisation `read-only` étant donné qu'elle est définie par l'absence des autorisations `admin` et `standard` pour un rôle.

### Autorisations avancées

Par défaut, les utilisateurs existants sont déjà associés à l'un des trois rôles Datadog par défaut : Admin, Standard ou Read-Only. Tous les utilisateurs sont donc déjà autorisés à lire l'ensemble des types de données. Les utilisateurs avec le rôle Admin ou Standard disposent quant à eux d'un droit d'écriture sur ces ressources.

**Remarque** : lorsque vous attribuez un nouveau rôle personnalisé à un utilisateur, assurez-vous de supprimer le rôle Datadog par défaut attribué à cet utilisateur afin d'appliquer les nouvelles autorisations de rôle.

En plus des autorisations générales, il est possible de définir des autorisations plus granulaires pour des ressources ou des types de données spécifiques. Les autorisations peuvent être globales ou limitées à un sous-ensemble d'éléments. Vous trouverez ci-dessous les détails de ces options et leur impact sur chacune des autorisations disponibles.

## Dashboards

La liste ci-dessous répertorie les autorisations disponibles pour les dashboards :

| Nom                    | Description                             | Limitation possible |
| ----------------------- | --------------------------------------- | -------- |
| `dashboards_read`         | Possibilité de consulter les dashboards              | non    |
| `dashboards_write`        | Possibilité de créer et de modifier des dashboards | non    |
| `dashboards_public_share` | Possibilité de partager des dashboards en externe  | non    |

## Monitors

La liste ci-dessous répertorie les autorisations disponibles pour les monitors :

| Nom              | Description                                  | Limitation possible |
| ----------------- | -------------------------------------------- | -------- |
| `monitors_read`     | Possibilité de consulter les monitors                     | non    |
| `monitors_write`    | Possibilité de modifier, désactiver et supprimer des monitors | non    |
| `monitors_downtime` | Possibilité de définir des downtimes pour vos monitors   | non    |

## Security Monitoring

La liste ci-dessous répertorie les autorisations disponibles pour les ressources Security Monitoring :

| Nom                             | Description                                         | Limitation possible |
| -------------------------------- | --------------------------------------------------- | -------- |
| `security_monitoring_rules_read`   | Possibilité de consulter les règles de détection                     | false    |
| `security_monitoring_rules_write`  | Possibilité de créer, modifier et supprimer des règles de détection | false    |
| `security_monitoring_signals_read` | Possibilité de consulter les signaux de sécurité                    | non    |

## Log Management

Vous trouverez ci-dessous la liste des autorisations pour les ressources de configuration des logs et leurs données, ainsi qu'un profil type d'utilisateur auquel les autorisations sont généralement accordées. Pour obtenir des recommandations sur l'attribution d'autorisations à des membres d'équipe, consultez le [guide sur le RBAC pour les logs][3].

| Nom                                                           | Description                                | Limitation possible |  Utilisateur type |
| -------------------------------------------------------------- | ------------------------------------------ | -------- | ------------- |
| [`logs_read_data`](#logs_read_data)                            | Accès en lecture aux données de log                    | true     | Lecture seule     |
| [`logs_modify_indexes`](#logs_modify_indexes)                  | Mise à jour de la définition des index de logs       | false    | Admin         |
| [`logs_write_facets`](#logs_write_facets)                      | Création, mise à jour et suppression de facettes de log       | false    | Standard      |
| [`logs_write_exclusion_filters`](#logs_write_exclusion_filters)| Mise à jour des filtres d'exclusion des index           | true     | Standard      |
| [`logs_write_pipelines`](#logs_write_pipelines)                | Mise à jour des pipelines de logs                       | false    | Admin         |
| [`logs_write_processors`](#logs_write_processors)              | Mise à jour des processeurs de logs d'un pipeline    | true     | Standard      |
| [`logs_write_archives`](#logs_write_archives)                  | Mise à jour de la configuration des archives externes | false    | Admin         |
| [`logs_read_archives`](#logs_read_archives)                    | Consultation des détails de la configuration d'archives, accès au contenu à partir des archives | true     | Standard |
| [`logs_write_historical_views`](#logs_write_historical_views)  | Réintégration de données à partir des archives               | false    | Standard      |
| [`logs_public_config_api`](#logs_public_config_api)            | Accès à l'API de configuration des logs publique (lecture/écriture)    | false    | Admin         |
| [`logs_generate_metrics`](#logs_generate_metrics)              | Possibilité de générer des métriques        | false    | Standard      |


Le contrôle RBAC pour Log Management comprend également deux autorisations obsolètes, remplacées par une autorisation `logs_read_data` plus spécifique et plus étendue :

| Nom                                              | Description                                | Limitation possible |  Profil type |
| ------------------------------------------------- | ------------------------------------------ | -------- | ------------- |
| [`logs_live_tail`](#logs_live_tail)               | Accès à la fonctionnalité Live Tail               | false    | Lecture seule     |
| [`logs_read_index_data`](#logs_read_index_data)  | Lecture d'un sous-ensemble de données de log (par index)       | true     | Lecture seule     |


{{< tabs >}}
{{% tab "Interface utilisateur" %}}

Une fois votre rôle créé, vous pouvez attribuer ou supprimer des autorisations pour ce rôle directement en [le mettant à jour depuis l'application Datadog][1].

{{< img src="account_management/rbac/logs_permissions.png" alt="Autorisations de logs"  style="width:75%;" >}}


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

Une fois votre rôle créé, vous pouvez attribuer ou supprimer des autorisations pour ce rôle directement via [l'API Permission de Datadog][1].


[1]: /fr/api/v2/roles/
{{% /tab %}}
{{< /tabs >}}

Vous trouverez plus de détails sur ces autorisations ci-dessous.

### Accès aux paramètres de configuration des logs

#### logs_generate_metrics

Permet à un rôle de [générer des métriques][4].

Cette autorisation est globale et permet à la fois de créer de nouvelles métriques et de modifier ou de supprimer des métriques existantes.

#### logs_write_facets

Permet à un rôle de [créer, modifier et supprimer des facettes][5].

Cette autorisation est globale et permet à la fois de créer de nouvelles facettes et de modifier ou de supprimer des facettes existantes.

Cette autorisation n'a aucune incidence sur la gestion des [attributs standard][6] ou des [facettes utilisées pour les alias][7].

#### logs_modify_indexes

Permet à un rôle de créer et de modifier des [index de logs][8], notamment en effectuant les actions suivantes :

- Configurer des [filtres d'index][9] pour définir les logs qui doivent être ajoutés à un index
- Définir des [paramètres de rétention des logs][10] pour un index
- Accorder les autorisations [logs_read_index_data](#logs-read-index-data) et [logs_write_exclusion_filters](#logs-write-exclusion-filters) pour un index spécifique à un autre rôle.

Cette autorisation est globale et permet à la fois de créer de nouveaux index et de modifier des index existants.

**Remarque** : cette autorisation accorde également les autorisations [logs_read_index_data](#logs-read-index-data) et [logs_write_exclusion_filters](#logs-write-exclusion-filters) en arrière-plan.


#### logs_write_exclusion_filters

Permet à un rôle de créer et de modifier des [filtres d'exclusion][11] dans un index.

Cette autorisation peut être globale ou limitée à un sous-ensemble d'index.

**Sous-ensemble d'index** :

{{< tabs >}}
{{% tab "Interface utilisateur" %}}

1. Supprimez l'autorisation globale accordée au rôle.
2. Accordez cette autorisation au rôle depuis [la page Index de l'application Datadog][2] en modifiant un index et en ajoutant le rôle dans le champ « Grant editing Exclusion Filters of this index to » (voir la capture d'écran ci-dessous).

{{< img src="account_management/rbac/logs_write_exclusion_filters.png" alt="Logs Write Exclusion Filters"  style="width:75%;" >}}

{{% /tab %}}
{{% tab "API" %}}

Cette configuration est uniquement prise en charge via l'interface utilisateur.

{{% /tab %}}
{{< /tabs >}}


#### logs_write_pipelines

Permet à un rôle de créer et de modifier des [pipelines de traitement de logs][12], notamment en effectuant les actions suivantes :

- Définir le nom du pipeline
- Définir des [filtres des pipelines][13] pour déterminer les logs qui doivent passer par le pipeline de traitement
- Réorganiser les pipelines
- Accorder l'autorisation [logs_write_processors](#logs-write-processors) pour un pipeline spécifique à un autre rôle

**Remarque** : cette autorisation accorde également les autorisations [Logs_Write_Processors](#logs-write-processors) (pour tous les processeurs sur tous les pipelines) en arrière-plan.


#### logs_write_processors

Permet à un rôle de créer, de modifier ou de supprimer des processeurs et des pipelines imbriqués.

Cette autorisation peut être globale ou limitée à un sous-ensemble de pipelines.

{{< tabs >}}
{{% tab "Interface utilisateur" %}}

Accordez l'autorisation à un ou plusieurs rôles dans la fenêtre d'un pipeline spécifique.

{{< img src="account_management/rbac/logs_write_processors.png" alt="Logs Write Processors"  style="width:75%;" >}}

{{% /tab %}}
{{% tab "API" %}}

Tout d'abord,

* [Récupérez l'ID de rôle][1] du rôle que vous souhaitez attribuer à des pipelines spécifiques.
* [Récupérez l'ID d'autorisation][2] pour l'API `logs_write_processors` de votre région.
* [Récupérez le ou les ID de pipeline][3] du ou des pipelines pour lesquels vous souhaitez attribuer ce rôle.
* Accordez l'autorisation à ce rôle avec l'appel suivant :

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

#### logs_write_archives

Permet à un rôle de créer, de modifier ou de supprimer des [archives de logs][14], notamment en effectuant les actions suivantes :

- Configurer des [filtres d'archives][13] pour définir les logs qui doivent être ajoutés à une archive
- Définir le nom de l'archive
- Réorganiser les archives
- Limiter l'autorisation [logs_read_archives](#logs-read-archives) à un sous-ensemble de rôles.

Cette autorisation est globale et permet à la fois de créer de nouvelles archives et de modifier ou de supprimer les archives existantes.

#### logs_read_archives

Permet d'accéder aux informations de configuration des archives. Utilisée en conjonction avec [logs_write_historical_views](#logs-write-historical-view), cette autorisation permet également de lancer une [réintégration][15] à partir des archives.

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

#### logs_write_historical_views

Permet à un rôle d'écrire des vues historiques, c'est-à-dire d'utiliser la fonctionnalité [Log Rehydration*][15].

Cette autorisation est globale et permet aux utilisateurs de lancer une réintégration à partir d'archives pour lesquelles ils disposent de l'autorisation [logs_read_archive][16].

{{< img src="account_management/rbac/logs_hv_roles_combination.png" alt="Écrire une vue historique"  style="width:70%;">}}

Dans l'exemple ci-dessus :

* Les membres ayant le rôle `ADMIN` **peuvent** lancer une réintégration à partir de l'archive `Audit`, car ils disposent de l'autorisation logs_write_historical_view ainsi que de l'autorisation logs_read_archives pour cette archive.
* Les membres ayant le rôle `AUDIT` ne **peuvent pas** lancer de réintégration à partir de l'archive `Audit`, car ils ne disposent pas de l'autorisation logs_historical_view.
* Les membres ayant le rôle `PROD` ne **peuvent pas** lancer de réintégration à partir de l'archive `Audit`, car ils ne disposent pas de l'autorisation logs_read_archives.


Lors de l'attribution de tags `team:audit` à tous les logs réintégrés à partir de l'archive `Audit`, assurez-vous que les membres ayant le rôle `Audit` qui sont limités à la lecture des logs `team:audit` ne peuvent accéder qu'au contenu réintégré. Pour en savoir plus sur l'ajout de tags et la réintégration, consultez la [section dédiée à la configuration des archives de logs][14].

Pour les logs `service:ci-cd` réintégrés à partir de l'archive `Prod`, notez ce qui suit :

* Si vous **n'utilisez pas** l'autorisation obsolète [logs_read_index_data](#logs-read-index-data), ces logs sont accessibles aux membres ayant le rôle `CI-CD`.
* Si vous **utilisez** l'autorisation obsolète [logs_read_index_data](#logs-read-index-data), ces logs ne sont pas accessibles aux membres ayant le rôle `CI-CD`, car la vue historique qui en résulte est limitée aux membres ayant le rôle `PROD` ou `ADMIN`.


#### logs_public_config_api

Permet de créer ou de modifier une configuration de log avec l'API Datadog :

* Configuration des [archives][17] via l'API
* Configuration des [index][18] via l'API
* Configuration des [pipelines][19] via l'API
* Configuration des [requêtes de restriction][20] via l'API

L'autorisation logs_public_config_api accorde uniquement l'autorisation d'effectuer des actions par le biais de l'API. Par exemple, si un utilisateur ne dispose pas de l'autorisation [logs_write_exclusion_filter](#logs-write-exclusion-filters), il ne pourra pas mettre à jour le taux d'échantillonnage via l'API, et ce même s'il dispose de l'autorisation logs_public_config_api.

### Accès aux données de log

Accordez les autorisations suivantes pour gérer l'accès en lecture à des sous-ensembles de données de log :

* [Logs_Read_Data](#logs-read-data) (conseillé) : offre une granularité supérieure en permettant de restreindre l'accès d'un rôle aux logs correspondant à des requêtes de restriction de logs.
* [Logs_Read_Index_Data](#logs-read-index-data) : autorisation anciennement utilisée pour restreindre l'accès aux données de log d'index spécifiques (cette autorisation reste nécessaire pour accéder aux données indexées).

#### logs_read_data

Accès en lecture aux données de log. Si cette autorisation est accordée, d'autres restrictions peuvent être appliquées telles que `logs_read_index_data` ou via une [requête de restriction][20].

Les rôles sont cumulatifs : si un utilisateur dispose de plusieurs rôles, l'ensemble de toutes les autorisations de chacun des rôles détermine les données auxquelles il a accès.

**Exemple** :

* Si un utilisateur dispose d'un rôle avec un accès en lecture aux données de logs ainsi que d'un rôle sans accès en lecture aux données de logs, alors il peut lire les données.
* Si un utilisateur est limité à `service:sandbox` par un rôle, et qu'il est limité à `env:prod` par un autre rôle, alors l'utilisateur peut accéder à tous les logs de `env:prod` et `service:sandbox`.

{{< img src="account_management/rbac/logs_rq_roles_combination.png" alt="Accès en lecture aux données"  style="width:70%;">}}


{{< tabs >}}
{{% tab "Interface utilisateur" %}}

Pour limiter les utilisateurs de manière à ce qu'ils puissent voir uniquement les logs correspondant à une requête de restriction, utilisez la [page Data Access][1] dans l'application Datadog pour :

1. [Créer](#creer-une-requete-de-restriction) une requête de restriction.
2. [Assigner](#assigner-un-role-a-une-requete-de-restriction) un ou plusieurs rôles à cette requête de restriction.
3. [Vérifier](#verifier-les-requetes-de-restriction) quels rôles et utilisateurs sont assignés à quelles requêtes de restriction.


Cette vue répertorie les éléments suivants :

* **Section `Restricted Access`** : toutes les requêtes de restriction, ainsi que le ou les rôles associés.
* **Section `Unrestricted Access`** : tous les rôles qui disposent de l'autorisation `log_read_data` sans restriction supplémentaire.
* **Section `No Access`** : tous les rôles qui ne disposent pas de l'autorisation `log_read_data`.


##### Créer une requête de restriction

Créez une requête de restriction en définissant le filtre de la requête. La nouvelle requête apparaît dans la liste des restrictions sans aucun rôle associé.

{{< img src="account_management/rbac/logs_rq-create.gif" alt="Créer une requête de restriction"  style="width:70%;">}}


##### Assigner un rôle à une requête de restriction

Choisissez un rôle et assignez-le à la requête de restriction prévue.

*Remarque* : n'oubliez pas qu'un rôle peut être associé à une seule requête de restriction. Par conséquent, si vous assignez un rôle à une requête de restriction, il perd tout lien avec la requête de restriction à laquelle il était déjà associé.

{{< img src="account_management/rbac/logs_rq-assign_roles.gif" alt="Assigner un rôle à une requête de restriction"  style="width:70%;">}}

De la même manière, utilisez cette action de déplacement pour accorder un `Unrestricted Access` à un rôle ou, à l'inverse, pour le transformer en rôle de type `No Access`.

##### Vérifier les requêtes de restriction

Cette page affiche un maximum de 50 requêtes de restriction à la fois, et de 50 rôles par section. Si vous avez des centaines ou des milliers de rôles et de requêtes de restriction, utilisez les filtres pour affiner la vue :

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

### Autorisations obsolètes

Ces autorisations sont activées globalement par défaut pour tous les utilisateurs.

L'autorisation [logs_read_data](#logs-read-data) vient s'ajouter à ces autorisations obsolètes. Par exemple, imaginons qu'un utilisateur est limité à la requête `service:api`.

* Si cet utilisateur dispose de l'autorisation [logs_read_index_data](#logs-read-index-data) pour les index `audit` et `errors` uniquement, il verra uniquement les logs `service:api` dans ces index.
* Si cet utilisateur dispose de l'autorisation [logs_live_tail](#logs-live-tail), il verra uniquement les logs `service:api` dans le Live tail.


#### logs_read_index_data

Permet à un rôle de lire des index de logs. L'accès peut être accordé globalement ou limité à un sous-ensemble d'index de logs.

Pour limiter cette autorisation à un sous-ensemble d'index, supprimez d'abord les autorisations `logs_read_index_data` et `logs_modify_indexes` du rôle. Ensuite :

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

#### logs_live_tail

Permet à un rôle d'utiliser la fonctionnalité [Live Tail][21].

Cette autorisation est globale et accorde l'accès à la fonction Livetail indépendamment de l'autorisation [logs_read_index_data](#logs-read-index-data).

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Log Rehydration est une marque déposée de Datadog, Inc.

[1]: /fr/account_management/users/#edit-a-user-s-roles
[2]: /fr/api/v2/roles/#list-permissions
[3]: /fr/logs/guide/logs-rbac/?tab=ui#overview
[4]: /fr/logs/logs_to_metrics/
[5]: /fr/logs/explorer/facets/#overview
[6]: /fr/logs/processing/attributes_naming_convention/#standard-attributes-in-log-configuration
[7]: /fr/logs/explorer/facets/#alias-facets
[8]: /fr/logs/indexes
[9]: /fr/logs/indexes#indexes-filters
[10]: /fr/logs/indexes#update-log-retention
[11]: /fr/logs/indexes#exclusion-filters
[12]: /fr/logs/processing/pipelines/
[13]: /fr/logs/processing/pipelines/#pipeline-filters
[14]: /fr/logs/archives
[15]: /fr/logs/archives/rehydrating
[16]: #logs_read_archives
[17]: /fr/api/v2/logs-archives/
[18]: /fr/api/v1/logs-indexes/
[19]: /fr/api/v1/logs-pipelines/
[20]: /fr/api/v2/logs-restriction-queries/
[21]: /fr/logs/explorer/live_tail/