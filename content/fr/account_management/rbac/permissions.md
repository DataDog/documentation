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
| dashboards_read         | Possibilité de consulter les dashboards              | non    |
| dashboards_write        | Possibilité de créer et de modifier des dashboards | non    |
| dashboards_public_share | Possibilité de partager des dashboards en externe  | non    |

## Monitors

La liste ci-dessous répertorie les autorisations disponibles pour les monitors :

| Nom              | Description                                  | Limitation possible |
| ----------------- | -------------------------------------------- | -------- |
| monitors_read     | Possibilité de consulter les monitors                     | non    |
| monitors_write    | Possibilité de modifier, désactiver et supprimer des monitors | non    |
| monitors_downtime | Possibilité de définir des downtimes pour vos monitors   | non    |

## Log Management

La liste ci-dessous répertorie les autorisations disponibles pour la configuration des logs et les données de log :

| Nom                         | Description                                | Limitation possible |
| ---------------------------- | ------------------------------------------ | -------- |
| logs_read_data               | Accès en lecture aux données de log. Si l'accès est accordé, d'autres restrictions peuvent être appliquées (telles que `logs_read_index_data` ou via des requêtes de restrictions).       | oui     |
| logs_read_index_data         | Lecture d'un sous-ensemble de données de log (par index)       | oui     |
| logs_modify_indexes          | Mise à jour de la définition des index de logs       | non    |
| logs_live_tail               | Accès à la fonctionnalité Live Tail               | non    |
| logs_write_exclusion_filters | Mise à jour d'un sous-ensemble de filtres d'exclusion   | oui     |
| logs_write_pipelines         | Mise à jour d'un sous-ensemble de pipelines de logs       | oui     |
| logs_write_processors        | Mise à jour des processeurs de logs d'un index      | oui     |
| logs_write_archives          | Mise à jour de la configuration des archives externes | non    |
| logs_read_archives          | Réintégration des logs de cette archive ; consultez les détails de la configuration d'archives | oui    |
| logs_public_config_api       | Accès à l'API de configuration des logs publique (lecture/écriture)    | non    |
| logs_generate_metrics        | Accès à la fonctionnalité Generate Metrics        | non    |

Plus de détails sur les autorisations sont fournis ci-dessous.

### Accès aux paramètres de configuration des logs

#### logs_generate_metrics

Permet à un rôle d'utiliser la fonctionnalité Generate Metrics. Cette autorisation est globale et s'applique à la configuration de toutes les métriques générées à partir des logs.

{{< tabs >}}
{{% tab "Application Datadog" %}}

Accédez à votre [page Roles sur Datadog][1] et cochez la case `other` pour le rôle qui vous intéresse, comme illustré ci-dessous :
{{< img src="account_management/rbac/logs_generate_metrics_access.png" alt="Créer un rôle personnalisé"  style="width:90%;">}}


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

Cette autorisation peut être accordée ou révoquée avec [l'API Roles][1].


[1]: /fr/api/v2/roles/
{{% /tab %}}
{{< /tabs >}}

#### logs_modify_indexes

Permet à un rôle de créer et de modifier des index de log, notamment en effectuant les actions suivantes :

- Configurer des requêtes d'inclusion pour définir les logs qui doivent être ajoutés à un index
- Définir les paramètres de rétention des logs pour un index
- Limiter les rôles ayant un accès en lecture à un index (`logs_read_index_data`)
- Définir les rôles autorisés à modifier les filtres d'exclusion pour un index (`logs_write_exclusion_filters`)

**Remarque** : cette autorisation accorde également un accès en lecture à tous les index de log et un accès en écriture à tous les filtres d'exclusion d'index.

{{< tabs >}}
{{% tab "Application Datadog" %}}

Accédez à votre [page Roles sur Datadog][1] et cochez la case `other` pour le rôle qui vous intéresse, comme illustré ci-dessous :
{{< img src="account_management/rbac/logs_modify_indexes_access.png" alt="Créer un rôle personnalisé" style="width:90%;">}}


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

Cette autorisation peut être accordée ou révoquée avec [l'API Roles][1].


[1]: /fr/api/v2/roles/
{{% /tab %}}
{{< /tabs >}}

#### logs_write_exclusion_filters

Permet de créer ou de modifier les filtres d'exclusion dans un index. Cette autorisation peut être globale ou limitée à un sous-ensemble d'index.

{{< tabs >}}
{{% tab "Application Datadog" %}}

**Accès global** :

Accédez à votre [page Roles sur Datadog][1] et cochez la case `write` pour le rôle qui vous intéresse, comme illustré ci-dessous :

{{< img src="account_management/rbac/logs_write_exclusion_filters_access.png" alt="Créer un rôle personnalisé"  style="width:90%;">}}

**Sous-ensemble d'index** :

1. Supprimez l'autorisation globale accordée au rôle.
2. Accordez cette autorisation à un rôle depuis [la page Processing Pipelines de l'application Datadog][2] en modifiant un index et en ajoutant un rôle au champ « Grant editing Exclusion Filters of this index to » (voir la capture d'écran ci-dessous).

{{< img src="account_management/rbac/logs_write_exclusion_filters.png" alt="Accorder l'accès en écriture pour les filtres d'exclusion d'index à des rôles spécifiques" style="width:75%;" >}}


[1]: https://app.datadoghq.com/access/roles
[2]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Cette autorisation peut être accordée ou révoquée avec [l'API Roles][1].


[1]: /fr/api/v2/roles/
{{% /tab %}}
{{< /tabs >}}

#### logs_write_pipelines

Permet de créer et de modifier des pipelines de traitement de logs. Le rôle pourra alors notamment définir des filtres de correspondance pour sélectionner les logs devant passer par le pipeline de traitement, mais aussi définir le nom du pipeline et limiter les rôles ayant un accès en écriture aux processeurs au sein de ce pipeline (`logs_write_processors`).

{{< tabs >}}
{{% tab "Application Datadog" %}}

Accédez à votre [page Roles sur Datadog][1] et cochez la case `other` pour le rôle qui vous intéresse, comme illustré ci-dessous :
{{< img src="account_management/rbac/logs_write_pipeline_access.png" alt="Créer un rôle personnalisé"  style="width:90%;">}}


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

Cette autorisation peut être accordée ou révoquée avec [l'API Roles][1].

Pour accorder un accès en écriture à seulement deux pipelines de traitement dont les ID sont respectivement `abcd-1234` et `bcde-2345` :

1. Supprimez l'autorisation globale `logs_write_pipelines` pour le rôle si elle est déjà attribuée.
2. Récupérez l'UUID du rôle que vous souhaitez modifier.
3. Utilisez l'API [Get Permission][2] API pour trouver l'UUID de l'autorisation `logs_write_pipelines` de votre région.
4. Accordez l'autorisation à ce rôle avec l'appel suivant :

```sh
curl -X POST \
        https://app.datadoghq.com/api/v1/role/<UUID_ROLE>/permission/<UUID_AUTORISATION> \
        -H "Content-Type: application/json" \
        -H "DD-API-KEY: <VOTRE_CLE_API_DATADOG>" \
        -H "DD-APPLICATION-KEY: <VOTRE_CLE_APPLICATION_DATADOG>" \
        -d '{
                "scope": {
                    "pipelines": [
                        "abcd-1234",
                        "bcde-2345"
                    ]
                }
            }'
```


[1]: /fr/api/v2/roles/
[2]: /fr/api/v2/roles/#list-permissions
{{% /tab %}}
{{< /tabs >}}

#### logs_write_processors

Permet de créer ou de modifier les processeurs dans un pipeline de traitement.

{{< tabs >}}
{{% tab "Application Datadog" %}}

**Accès global** :

Accédez à votre [page Roles sur Datadog][1] et cochez la case `write` pour le rôle qui vous intéresse, comme illustré ci-dessous :

{{< img src="account_management/rbac/logs_write_processors_access.png" alt="Créer un rôle personnalisé"  style="width:90%;">}}

**Sous-ensemble de pipelines** :

1. Supprimez les autorisations `logs_write_processors` et `logs_write_pipelines` du rôle.
2. Cette autorisation peut être accordée à un rôle depuis [la page Processing Pipelines de l'application Datadog][2] en modifiant un pipeline de traitement et en ajoutant un rôle au champ « Grant editing Processors of this index to » (voir la capture d'écran ci-dessous).

{{< img src="account_management/rbac/logs_write_processors.png" alt="Accorder l'accès en écriture pour les processeurs à des rôles spécifiques" style="width:75%;" >}}


[1]: https://app.datadoghq.com/access/roles
[2]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Cette autorisation peut être accordée ou révoquée avec [l'API Roles][1].


[1]: /fr/api/v2/roles/
{{% /tab %}}
{{< /tabs >}}

#### logs_write_archives

Permet de créer ou de modifier des archives de log.

{{< tabs >}}
{{% tab "Application Datadog" %}}

Accédez à votre [page Roles sur Datadog][1] et cochez la case `other` pour le rôle qui vous intéresse, comme illustré ci-dessous :
{{< img src="account_management/rbac/logs_write_archives_access.png" alt="Créer un rôle personnalisé" style="width:90%;">}}


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

Cette autorisation peut être accordée ou révoquée avec [l'API Roles][1].


[1]: /fr/api/v2/roles/
{{% /tab %}}
{{< /tabs >}}


#### logs_read_archives

Permet la réintégration de logs à partir d'archives et l'accès aux informations de configuration des archives. Cette autorisation peut être limitée à un sous-ensemble d'archives.

{{< tabs >}}
{{% tab "Application Datadog" %}}

Accédez à votre [page Roles sur Datadog][1] et cochez la case `read` pour le rôle qui vous intéresse, comme illustré ci-dessous :
{{< img src="account_management/rbac/logs_read_archive_access.png" alt="Créer un rôle personnalisé" style="width:90%;">}}

Attribuez ensuite ce rôle à l'archive. Créez l'archive, ou mettez-la à jour à tout moment en la modifiant. 
{{< img src="account_management/rbac/logs_archive_restriction.png" alt="Créer un rôle personnalisé" style="width:90%;">}}

Une archive sans restriction est accessible par toute personne disposant d'un rôle et de l'autorisation `logs_read_archives`. Une archive présentant des restrictions est uniquement accessible aux utilisateurs disposant d'un des rôles enregistrés, à condition que ces rôles disposent de l'autorisation `logs_read_archives`.

Dans l'exemple suivant, en supposant que tous les rôles à l'exception de `Guest` disposent de l'autorisation `logs_read_archive` :

* L'archive Staging est accessible à tous les utilisateurs, à l'exception des utilisateurs ayant **uniquement** le rôle `Guest`.
* L'archive Prod est accessible à tous les utilisateurs ayant le rôle `Customer Support`.
* L'archive Security-Audit n'est pas accessible aux utilisateurs ayant le rôle `Customer Support`, sauf s'ils ont également le rôle `Audit & Security`.

{{< img src="account_management/rbac/logs_archives_list.png" alt="Créer un rôle personnalisé"  style="width:90%;">}}


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

L'autorisation `logs_read_archive` peut être accordée ou révoquée avec [l'API Roles][1].

Une archive peut être limitée à un sous-ensemble de rôles avec [l'API Archive][2].


[1]: /fr/api/v2/roles/
[2]: /fr/api/v2/logs-archives/
{{% /tab %}}
{{< /tabs >}}

#### logs_public_config_api

Permet de créer ou de modifier une configuration de log avec l'API Datadog.

{{< tabs >}}
{{% tab "Application Datadog" %}}

Accédez à votre [page Roles sur Datadog][1] et cochez la case `other` pour le rôle qui vous intéresse, comme illustré ci-dessous :
{{< img src="account_management/rbac/logs_public_config_api_access.png" alt="Créer un rôle personnalisé" style="width:90%;">}}


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

Cette autorisation peut être accordée ou révoquée avec [l'API Roles][1].


[1]: /fr/api/v2/roles/
{{% /tab %}}
{{< /tabs >}}

### Accès aux données de log

Accordez les autorisations suivantes pour gérer l'accès en lecture à des sous-ensembles de données de log :

* `logs_read_data` (conseillé) : offre une granularité supérieure en permettant de restreindre l'accès d'un rôle aux logs correspondants à des requêtes de restriction de logs. 
* `logs_read_index_data` : permet de restreindre l'accès aux données de log d'index spécifiques (cette autorisation reste nécessaire pour accéder aux données indexées).

Ces autorisations peuvent également être utilisées ensemble. Un rôle peut restreindre un utilisateur à un sous-ensemble d'index tout en appliquant une requête de restriction pour limiter l'accès au sein de ces index.

**Exemple** : l'utilisateur A a accès à l'index `audit` et à l'index `errors`, mais cet accès est limité à la requête `service:api`.
Lorsqu'il consulte le Log Explorer, cet utilisateur peut uniquement voir les logs associés à `service:api` dans les index `audit` et `errors`.

De plus, l'accès à la fonctionnalité Live Tail peut être restreint avec l'autorisation `logs_live_tail`, quelles que soient les données auxquelles cet utilisateur a accès.

#### logs_read_data

Accès en lecture aux données de log. Si cette autorisation est accordée, d'autres restrictions peuvent être appliquées telles que `logs_read_index_data` ou via une [requête de restriction][3].

Les combinaisons de rôles sont permissives. Si un utilisateur dispose de plusieurs rôles, le rôle le plus permissif s'applique.

**Exemple** :

* Si un utilisateur dispose d'un rôle avec un accès en lecture aux données de logs ainsi que d'un rôle sans accès en lecture aux données de logs, alors il peut lire les données.
* Si un utilisateur est limité à service:sandbox par un rôle, et qu'il est limité à env:staging par un autre rôle, alors l'utilisateur peut accéder à tous les logs de env:staging et service:sandbox.


{{< tabs >}}
{{% tab "Application Datadog" %}}

**Accorder un accès en lecture global aux données de log** :

Accédez à votre [page Roles sur Datadog][1] et cochez la case `write` pour le rôle qui vous intéresse, comme illustré ci-dessous :

{{< img src="account_management/rbac/logs_read_data_access.png" alt="Accès en lecture aux données"  style="width:70%;">}}

**Restreindre l'accès en lecture à un sous-ensemble de logs** :

Cette configuration est uniquement prise en charge par l'API.
[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

Révoquez ou accordez cette autorisation avec [l'API Roles][1]. 
Utilisez des [requêtes de restriction][2] pour restreindre l'autorisation à un sous-ensemble de données de log. 



[1]: /fr/api/#roles
[2]: /fr/api/?lang=bash#roles-restriction-queries-for-logs
{{% /tab %}}
{{< /tabs >}}


#### logs_read_index_data

Permet de lire des index de logs spécifiques. L'accès peut être accordé globalement ou limité à un sous-ensemble d'index de logs.
Si vous utilisez `logs_read_data` et des requêtes de restriction, l'autorisation `logs_read_index_data` **doit** être définie pour accorder un accès global aux logs indexés.

{{< tabs >}}
{{% tab "Application Datadog" %}}

**Accès global** :

Accédez à votre [page Roles sur Datadog][1] et cochez la case `write` pour le rôle qui vous intéresse, comme illustré ci-dessous :

{{< img src="account_management/rbac/logs_read_index_data_access.png" alt="Accès en lecture aux données d'index"  style="width:90%;">}}

**Sous-ensemble d'index** :

1. Supprimez les autorisations `logs_read_index_data` et `logs_modify_indexes` du rôle.
2. Ces autorisations peuvent uniquement être accordées à un rôle depuis [la page Index Configuration de l'application Datadog][2], en modifiant un index et en ajoutant un rôle au champ « Grant access of this index's content to ».

{{< img src="account_management/rbac/logs_read_index_data.png" alt="Accorder l'accès en lecture pour les index à des rôles spécifiques" style="width:75%;" >}}


[1]: https://app.datadoghq.com/access/roles
[2]: https://app.datadoghq.com/logs/pipelines/indexes
{{% /tab %}}
{{% tab "API" %}}

Cette autorisation peut être accordée ou révoquée avec [l'API Roles][1].
Par exemple, pour accorder à un rôle un accès en lecture à seulement deux index appelés `main` et `support`, votre appel d'API doit ressembler à ce qui suit :

1. Supprimez l'autorisation globale `logs_read_index_data` pour le rôle si elle est déjà attribuée.
2. Récupérez l'UUID du rôle que vous souhaitez modifier.
3. Utilisez l'API [Get Permission][2] pour trouver l'UUID de l'autorisation `logs_write_pipelines` de votre région.
4. Accordez l'autorisation à ce rôle avec l'appel suivant :

```bash
curl -X POST \
        https://app.datadoghq.com/api/v1/role/<UUID_ROLE>/permission/<UUID_AUTORISATION> \
        -H "Content-Type: application/json" \
        -H "DD-API-KEY: <VOTRE_CLÉ_API_DATADOG>" \
        -H "DD-APPLICATION-KEY: <VOTRE_CLÉ_APPLICATION_DATADOG>" \
        -d '{
                "scope": {
                    "indexes": [
                        "main",
                        "support"
                    ]
                }
            }'
```


[1]: /fr/api/v2/roles/
[2]: /fr/api/v2/roles/#list-permissions
{{% /tab %}}
{{< /tabs >}}


#### logs_live_tail

Permet à un rôle d'utiliser la fonctionnalité Live Tail.

{{< tabs >}}
{{% tab "Application Datadog" %}}

Accédez à votre [page Roles sur Datadog][1] et cochez la case `other` pour le rôle qui vous intéresse, comme illustré ci-dessous :
{{< img src="account_management/rbac/logs_livetail_access.png" alt="Créer un rôle personnalisé"  style="width:90%;">}}


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

Cette autorisation peut être accordée ou révoquée avec [l'API Roles][1].


[1]: /fr/api/#roles
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/users/#edit-a-user-s-roles
[2]: /fr/api/v2/roles/#list-permissions
[3]: /fr/api/v2/logs-restriction-queries/