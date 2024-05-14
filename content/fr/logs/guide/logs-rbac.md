---
aliases:
- /fr/logs/guide/restrict-access-to-log-events-with-restriction-queries
further_reading:
- link: /logs/guide/logs-rbac-permissions/
  tag: Documentation
  text: En savoir plus sur les autorisations RBAC pour les logs
- link: /logs/explorer/
  tag: Documentation
  text: En savoir plus sur la vue Log Explorer
- link: /logs/explorer/#patterns
  tag: Documentation
  text: Se familiariser avec la vue Log Pattern
- link: /logs/live_tail/
  tag: Documentation
  text: Explorer la fonctionnalité Live Tail
kind: guide
title: Configuration du RBAC pour les logs
---

## Présentation

Les logs peuvent contenir des **informations sensibles** qui peuvent être [nettoyées][1] ou dont l'accès peut être restreint à certains utilisateurs autorisés de votre organisation. Il peut également être préférable de segmenter vos utilisateurs afin qu'ils **n'interfèrent pas entre eux** durant les processus de configuration et de contrôle du budget.

Ce guide fournit une méthodologie pour le développement de rôles Datadog personnalisés qui permettent aux utilisateurs d'accéder aux logs et aux fonctionnalités associées de manière conforme.

### Plusieurs équipes

Supposons que votre organisation se compose de plusieurs équipes. L'une d'entre elles est l'équipe **ACME** (Applicative Component Making Errors), dont les membres traitent les logs ACME à des fins de dépannage et d'audit.

Ce guide suppose également que l'équipe ACME comprend deux catégories d'utilisateurs :

* **`ACME Admin`** : un rôle pour les utilisateurs chargés de la collecte des logs ACME, des pipelines et des filtres d'exclusion.
* **`ACME User`** : un rôle permettant aux utilisateurs d'accéder aux logs ACME, ainsi que de créer des monitors ou des dashboards à partir de ces logs.

**Remarque** : vous pouvez adapter ce guide de façon à n'utiliser qu'un seul rôle ACME (en consolidant les autorisations des administrateurs ACME et des utilisateurs ACME) par souci de simplicité, ou de façon à utiliser un plus grand nombre de rôles pour des autorisations plus granulaires.

Bien que ce guide se concentre sur l'équipe ACME, cette configuration peut être appliquée à toutes les autres équipes de votre organisation. Les membres de l'équipe ACME **peuvent** également faire partie d'autres équipes au sein de votre organisation. Les autorisations sont cumulatives dans Datadog, et les utilisateurs qui font partie de plusieurs équipes bénéficient de l'ensemble des autorisations octroyées par chacune des équipes dont ils sont membres.

### Le rôle d'administrateur Datadog

Ce guide vous explique comment vous pouvez, en tant qu'administrateur Datadog, mettre en place un environnement sécurisé pour que les membres de l'équipe ACME puissent interagir avec leurs logs (sans interférer avec les logs des autres équipes) tout en limitant l'accès à ces logs aux utilisateurs ACME.

**Remarque** : vous pouvez adapter le présent guide afin que les administrateurs ACME soient également des administrateurs Datadog.

Ce guide aborde les étapes suivantes :

1. [Prérequis](#prerequis) pour les administrateurs.
2. **Configuration des rôles** de l'équipe ACME et **affectation des membres** : [Configurer des rôles](#configurer-des-roles).
3. **Limitation de l'accès aux logs** dans toute l'application Datadog avec des requêtes de restriction : [Restreindre l'accès aux logs](#restreindre-l-acces-aux-logs).
4. Configuration des autorisations relatives aux **ressources de log** (à savoir les pipelines, les index et les archives) : [Restreindre l'accès aux ressources de log](#restreindre-l-acces-aux-ressources-de-log).

## Prérequis

### Appliquer un tag aux logs entrants

Appliquez un tag `team:acme` à vos logs entrants ACME afin de pouvoir trier vos logs dans Datadog.

{{< img src="logs/guide/rbac/team_tag.png" alt="Appliquer un tag d'équipe à vos logs" style="width:60%;">}}

Par exemple, dans le cadre de la collecte de logs Docker, associez le tag `team:acme` aux logs issus de ce conteneur en utilisant les [étiquettes Docker comme tags][2]. Reportez-vous à la [section sur le tagging][3] pour une présentation plus générale.

### Se connecter en tant qu'administrateur Datadog

Pour continuer à suivre les instructions de ce guide, le rôle Admin Datadog ou un rôle similaire doit être attribué à votre compte utilisateur. Vous avez besoin des autorisations suivantes :

* Créer des rôles et affecter des utilisateurs à des rôles
* Créer des [pipelines de logs][4], des [index de logs][5] et des [archives de logs][6]
* Si vous souhaitez effectuer ces opérations par l'intermédiaire de l'API, vous devez disposer des autorisations nécessaires à l'utilisation de l'[API Log Configuration][7].

Vérifiez dans la [liste des utilisateurs][8] que vous disposez de toutes ces autorisations. Si ce n'est pas le cas, demandez à un administrateur Datadog de les configurer pour vous.


### Obtenir une clé d'API et une clé d'application

**Remarque** : cette section n'est nécessaire que si vous avez l'intention d'utiliser l'API Datadog, ce qui nécessite l'obtention d'une clé d'API et d'une clé d'application auprès d'un administrateur.

Les clés d'API et les clés d'application sont disponibles sur la [page des clés d'API de votre compte Datadog][9]. Pour en savoir plus, consultez la section [Clés d'API et d'application][10] de la documentation.

Assurez-vous que la clé d'application que vous utilisez est associée à votre compte utilisateur ou à un compte utilisateur qui dispose d'autorisations similaires.

{{< img src="logs/guide/rbac/app-api_keys.png" alt="Vérifier les clés d'API et d'application" style="width:60%;">}}

Tout au long de ce guide, vous devrez remplacer chaque occurrence de `<CLÉ_API_DATADOG>` et `<CLÉ_APPLICATION_DATADOG>` par vos clés d'API et d'application Datadog, respectivement. Ce guide suppose également que vous avez accès à un terminal avec `CURL`.


### Récupérer les ID des autorisations

**Remarque** : cette section n'est nécessaire que si vous avez l'intention d'utiliser l'API Datadog pour configurer le RBAC.

Utilisez l'[API Permissions][11] pour obtenir la liste de toutes les autorisations existantes. Vous obtiendrez un tableau d'autorisations tel que celui ci-dessous (l'autorisation `logs_read_data` est associée à l'`<ID_AUTORISATION>` `1af86ce4-7823-11ea-93dc-d7cad1b1c6cb` ; c'est tout ce que vous devez savoir sur cette autorisation).

```bash
curl -X GET "https://app.datadoghq.com/api/v2/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>"
```

```json
[...]
{
    "type": "permissions",
    "id": "1af86ce4-7823-11ea-93dc-d7cad1b1c6cb",
    "attributes": {
        "name": "logs_read_data",
        "display_name": "Logs Read Data",
        [...]
    }
}
[...]
```

**Remarque** : les ID des autorisations changent en fonction du site Datadog (américain, européen, etc.) que vous utilisez.

## Configurer des rôles
Cette section explique comment créer deux rôles, `ACME Admin` et `ACME User`, comment accorder à ces deux rôles des autorisations minimales pour les logs (ainsi que des autorisations étendues plus loin dans ce guide), et comment attribuer l'un des deux rôles à des utilisateurs.

### Créer un rôle

{{< tabs >}}
{{% tab "Interface utilisateur" %}}

Depuis la [section Groups][1] de la page Organization Settings de Datadog, utilisez le bouton Add Role dans l'onglet Role pour créer les rôles `ACME Admin` et `ACME User`.

{{< img src="logs/guide/rbac/add_role.png" alt="Ajouter un nouveau rôle" style="width:60%;">}}

Lors de la création d'un rôle :

* Créez le rôle avec un accès standard.
* Accordez les autorisations Read Index Data et Live Tail. Il s'agit d'[autorisations obsolètes][2] que vous pouvez activer en toute sécurité.

Vous trouverez de plus amples informations sur la création de rôles dans la section [Gestion de compte][3].


[1]: https://app.datadoghq.com/access/roles
[2]: /fr/account_management/rbac/permissions?tab=ui#legacy-permissions
[3]: /fr/account_management/rbac/?tab=datadogapplication#create-a-custom-role
{{% /tab %}}
{{% tab "API" %}}

Répétez les étapes suivantes pour les rôles `ACME Admin` et `ACME User` :

1. Si le rôle n'existe pas encore, créez le rôle avec l'[API Role Creation][1]. Dans l'exemple suivant, `dcf7c550-99cb-11ea-93e6-376cebac897c` est l'ID du rôle.

```bash
curl -X POST "https://app.datadoghq.com/api/v2/roles" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>" -d '{"data": {"type": "roles","attributes": {"name": "ACME Admin"}}}'
```

``` json
[...]
"type": "roles",
"id": "dcf7c550-99cb-11ea-93e6-376cebac897c",
"attributes": { "name": "ACME Admin", [...] }
[...]
```

2. **Sinon**, si le rôle existe déjà, utilisez l'[API Role List][2] pour obtenir son ID.

``` bash
curl -X GET "https://app.datadoghq.com/api/v2/roles?page[size]=10&page[number]=0&sort=name&filter=ACME" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>"'
```

``` json
[...]
"type": "roles",
"id": "dcf7c550-99cb-11ea-93e6-376cebac897c",
"attributes": { "name": "ACME Admin", [...] }
[...]
```

3. Vérifiez les autorisations existantes pour le rôle (les rôles qui viennent d'être créés doivent uniquement avoir un accès en lecture aux monitors et aux dashboards).

``` bash
curl -X GET "https://app.datadoghq.com/api/v2/roles/<ID_RÔLE>/permissions" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>"

```

3. Attribuez les autorisations `standard`, `logs_read_index_data` et `logs_live_tail` au rôle à l'aide de l'[API Grant Permissions][3]. Reportez-vous à la section [Récupérer les ID des autorisations](#recuperer-les-ID-des-autorisations) pour obtenir les ID correspondants.

``` bash
curl -X POST "https://app.datadoghq.com/api/v2/roles/<ID_RÔLE>/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>" -d '{"data": {"type":"permissions","id": "<ID_AUTORISATION>"}}'

```

4. **Si besoin**, révoquez toutes les autres autorisations liées aux logs à l'aide de l'[API Révoquer une autorisation][4].

``` bash
curl -X DELETE "https://app.datadoghq.com/api/v2/roles/<ID_RÔLE>/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>" -d '{"data": {"type":"permissions","id": "<ID_AUTORISATION>"}}'

```

[1]: /fr/api/v2/roles/#create-role
[2]: /fr/api/v2/roles/#list-roles
[3]: /fr/api/v2/roles/#grant-permission-to-a-role
[4]: /fr/api/v2/roles/#revoke-permission
{{% /tab %}}
{{< /tabs >}}

### Associer un utilisateur à un rôle

Maintenant que vos rôles sont configurés avec leurs autorisations, attribuez-les à vos utilisateurs.

{{< tabs >}}
{{% tab "Interface utilisateur" %}}

Depuis la [section Team][1] de Datadog, accédez à l'onglet User. Choisissez un utilisateur et attribuez-lui le rôle `ACME Admin` ou `ACME User`, en plus des rôles qui lui sont peut-être déjà attribués. Vous trouverez de plus amples informations sur la gestion des utilisateurs dans la section [Gestion de compte][2].

{{< img src="logs/guide/rbac/assign_user.png" alt="Supprimer une invitation dans la vue sous forme de tableau" style="width:60%;">}}
{{< img src="logs/guide/rbac/assign_user2.png" alt="Supprimer une invitation dans la vue sous forme de tableau" style="width:60%;">}}

[1]: https://app.datadoghq.com/access/users
[2]: /fr/account_management/users/
{{% /tab %}}
{{% tab "API" %}}

À l'aide de l'[API List Users][1], récupérez l'ID de l'utilisateur auquel vous souhaitez attribuer le rôle `ACME Admin` ou `ACME User`. Puisque cette API est paginée, vous devrez peut-être filtrer les résultats, en utilisant, par exemple, le nom de l'utilisateur comme paramètre de requête. Dans l'exemple suivant, l'ID de l'utilisateur est `1581e993-eba0-11e9-a77a-7b9b056a262c`.

``` bash
curl -X GET "https://api.datadoghq.com/api/v2/users?page[size]=10&page[number]=0&sort=name&filter=smith" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>"
```

``` json
[...]
"type": "users",
"id": "1581e993-eba0-11e9-a77a-7b9b056a262c",
"attributes": {
    "name": "John Smith",
    "handle": "john.smith@company.com",
    [...]
},
[...]
```

**Associer des utilisateurs à des rôles ACME**

Pour chaque utilisateur, utilisez l'[API Assign Role][2] pour l'ajouter à ce rôle.

``` bash
curl -X POST "https://api.datadoghq.com/api/v2/roles/<ID_RÔLE>/users" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>" -d '{"data": {"type":"users","id":"<ID_UTILISATEUR>"}}'
```

**Supprimer un rôle par défaut pour un utilisateur**

Vérifiez si l'utilisateur dispose déjà de rôles et notez les identifiants de ces rôles. Nous vous conseillons de supprimer les rôles Datadog par défaut pour ces utilisateurs. En effet, ces rôles peuvent être associés à des autorisations supplémentaires que vous ne souhaitez peut-être pas accorder à l'utilisateur.

``` bash
curl -X DELETE "https://api.datadoghq.com/api/v2/roles/<ID_RÔLE>/users" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>" -d '{"data": {"type":"users","id":"<ID_UTILISATEUR>"}}'
```

[1]: /fr/api/v2/users/#list-all-users
[2]: /fr/api/v2/roles/#add-a-user-to-a-role
{{% /tab %}}
{{< /tabs >}}

## Restreindre l'accès aux logs

Cette section explique comment accorder aux membres de l'équipe ACME (à la fois les membres `ACME Admin` et `ACME User`) l'accès aux logs `team:acme` uniquement. À cette fin, l'autorisation [Logs_Read_Data][12] est utilisée avec des requêtes de restriction pour limiter l'accès.

Afin d'optimiser la granularité et de faciliter la maintenance, il est **déconseillé** d'étendre les autorisations des utilisateurs ACME pour leur permettre d'accéder à davantage de logs. Ne limitez pas d'autres rôles à la requête de restriction `team:acme`. Il est préférable d'attribuer plusieurs rôles aux utilisateurs en fonction des éléments auxquels chacun d'entre eux, individuellement, doit accéder.

Cette section explique comment :

1. Créer une requête de restriction `team:acme`
2. Associer cette requête de restriction aux rôles ACME

**Remarque** : **seule une** requête de restriction peut être associée à un rôle. Si vous associez une requête de restriction à un rôle, toute requête de restriction déjà associée à ce rôle sera supprimée.

{{< tabs >}}
{{% tab "Interface utilisateur" %}}

Utilisez la [page Data Access][1] dans l'application Datadog pour :

* Créer une requête de restriction `team:acme`
* Associer les rôles `ACME Admin` et `ACME User` à cette requête de restriction

{{< img src="logs/guide/rbac/restriction_queries.png" alt="Restreindre l'accès aux logs" style="width:60%;">}}

Référez-vous à la [section sur l'autorisation `logs_read_data`][1] pour en savoir plus.

[1]: https://app.datadoghq.com/logs/pipelines/data-access
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[API Create Restriction Query][1] pour créer une requête de restriction. Notez l'ID de la requête de restriction (`76b2c0e6-98fa-11ea-93e6-775bd9258d59` dans l'exemple suivant).

``` bash
curl -X POST "https://app.datadoghq.com/api/v2/logs/config/restriction_queries" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>" -d '{"data": {"type": "logs_restriction_queries","attributes": {"restriction_query": "team:acme"}}}'
```

``` json
{
    "data": {
        "type": "logs_restriction_queries",
        "id": "76b2c0e6-98fa-11ea-93e6-775bd9258d59",
        "attributes": {
            "restriction_query": "team:acme",
            "created_at": "2020-05-18T11:26:48.887750+00:00",
            "modified_at": "2020-05-18T11:26:48.887750+00:00"
        }
    }
}

```

Ensuite, associez la requête de restriction précédente aux rôles ACME à l'aide de l'[API Restriction Query][2]. Répétez cette opération avec les ID des rôles `ACME Admin` et `ACME User`.

``` bash
curl -X POST "https://app.datadoghq.com/api/v2/logs/config/restriction_queries/<ID_REQUÊTE_RESTRICTION>/roles" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>" -d '{"data": {"type": "roles","id": "<ID_RÔLE>"}}'
```

Enfin, activez les autorisations `logs_read_data` pour le rôle à l'aide de l'[API Grant Permissions][3]. Reportez-vous à la section [Récupérer les ID des autorisations](#recuperer-les-ID-des-autorisations) pour obtenir les ID correspondants.

``` bash
curl -X POST "https://app.datadoghq.com/api/v2/roles/<ID_RÔLE>/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>" -d '{"data": {"type":"permissions","id": "<ID_AUTORISATION>"}}'

```

Si vous le souhaitez, vérifiez que la configuration est correcte :

* Obtenez la liste des rôles associés à la requête à l'aide de l'[API Get Roles][4]. Seuls `ACME Admin` et `ACME User` doivent s'afficher dans les résultats.
* Inversement, récupérez la requête de restriction associée à l'un ou l'autre des rôles à l'aide de l'[API Get Restriction Query][5]. La requête de restriction `team:acme` doit s'afficher.


[1]: /fr/api/v2/logs-restriction-queries/#create-a-restriction-query
[2]: /fr/api/v2/logs-restriction-queries/#grant-role-to-a-restriction-query
[3]: /fr/api/v2/roles/#grant-permission-to-a-role
[4]: /fr/api/v2/logs-restriction-queries/#list-roles-for-a-restriction-query
[5]: /fr/api/v2/logs-restriction-queries/#get-restriction-query-for-a-given-role
{{% /tab %}}
{{< /tabs >}}


## Restreindre l'accès aux ressources de log

Cette section explique comment accorder aux membres disposant du rôle `ACME Admin` l'autorisation d'interagir avec les ressources de log ACME (à savoir, les pipelines de logs, les index de logs et les archives de logs).

Ainsi :

* Seuls les membres `ACME Admin` pourront interagir avec les ressources de log ACME.
* Les membres `ACME Admin` ou `ACME User` ne pourront pas interagir avec les ressources des autres équipes.
* Les membres `ACME Admin` ou `ACME User` ne pourront pas interférer avec les configurations « Admin » de niveau supérieur, telles que les logs transmis dans leurs ressources, les limitations budgétaires ou les [règles de restriction d'accès aux logs] (#restreindre-l-acces-aux-logs).


Afin d'optimiser la granularité et de faciliter la maintenance, il est **déconseillé** d'accorder à d'autres rôles l'autorisation de modifier les ressources de log ACME. Il est préférable d'accorder le rôle `ACME Admin` à certains utilisateurs de ces autres rôles.

### Pipelines de logs

Créez un [pipeline][13] pour les logs `team:acme`. Attribuez l'autorisation [Write Processor][14] aux membres `ACME Admin`, mais **limitez** cette autorisation à ce pipeline ACME « racine ».

{{< img src="logs/guide/rbac/pipelines.png" alt="Pipeline ACME" style="width:60%;">}}

### Index de logs

Créez un ou plusieurs [index][15] pour les logs `team:acme`. La création de plusieurs index peut s'avérer utile si l'équipe ACME a besoin d'un contrôle budgétaire précis (par exemple, des index avec des périodes de rétention différentes ou des index avec des quotas différents). Attribuez l'autorisation [Write Exclusion Filters][16] aux membres de l'équipe `ACME Admin`, mais **limitez** cette autorisation à cet ou ces index ACME.

{{< img src="logs/guide/rbac/indexes.png" alt="Index ACME" style="width:60%;">}}

### Archives de logs

#### Lire les archives

Créez une ou plusieurs [archives][17] pour les logs`team:acme`. Attribuez l'autorisation [Read Archives][18] aux membres `ACME Admin`, mais **limitez** cette autorisation à cette ou ces archives ACME.

{{< img src="logs/guide/rbac/archives.png" alt="Archives ACME" style="width:60%;">}}

La création de plusieurs archives peut s'avérer utile si vous disposez de différentes politiques de cycle de vie en fonction des logs (par exemple, pour les logs de production et de staging). N'oubliez pas que la réintégration des logs ne fonctionne que pour une seule archive à la fois, bien qu'il soit possible de lancer plusieurs réintégrations à partir de plusieurs archives en même temps.

#### Écrire des vues historiques

Attribuez l'autorisation [logs_write_historical_views][19] aux membres `ACME Admin`. Cette autorisation permet à un rôle d'effectuer des réintégrations à partir d'archives.

**Si vous le souhaitez**, vous pouvez configurer vos archives de logs de manière à ce que le tag `team:acme` soit appliqué à tous les logs réintégrés à partir d'une archive précise, que le tag ait déjà été appliqué ou non à ces logs dans l'archive. [Cette option][20] vous permet d'assurer la cohérence avec vos politiques de restriction existantes, ainsi que de supprimer les restrictions obsolètes qui empêchent les logs d'être acheminés ou indexés dans Datadog.

{{< img src="logs/guide/rbac/archives.png" alt="Tags ACME lors de la réintégration" style="width:60%;">}}

**Remarque** : **si** vous utilisez l'autorisation obsolète [logs_read_index_data][21], ajoutez le rôle `ACME User` aux archives ACME en plus du rôle `ACME Admin`. Étant donné que les utilisateurs disposant du rôle `ACME User` ne sont pas autorisés à effectuer une réintégration à partir des archives, ils ne disposeront pas d'autorisations sensibles. Toutefois, l'autorisation logs_read_index_data est ainsi automatiquement limitée à la vue historique obtenue, permettant ainsi aux utilisateurs d'accéder au contenu.

{{< img src="logs/guide/rbac/rehydration_index.png" alt="Autorisation de réintégration d'index" style="width:60%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/logs/advanced_log_collection/?tab=configurationfile#scrub-sensitive-data-from-your-logs
[2]: /fr/agent/docker/tag/?tab=containerizedagent#extract-labels-as-tags
[3]: /fr/getting_started/tagging/
[4]: /fr/account_management/rbac/permissions?tab=ui#logs_write_pipelines
[5]: /fr/account_management/rbac/permissions?tab=ui#logs_modify_indexes
[6]: /fr/account_management/rbac/permissions?tab=ui#logs_write_archives
[7]: /fr/account_management/rbac/permissions?tab=ui#logs_public_config_api
[8]: https://app.datadoghq.com/organization-settings/users
[9]: https://app.datadoghq.com/organization-settings/api-keys
[10]: /fr/account_management/api-app-keys/
[11]: /fr/api/v2/roles/#list-permissions
[12]: /fr/account_management/rbac/permissions?tab=ui#logs_read_data
[13]: /fr/logs/log_configuration/pipelines
[14]: /fr/account_management/rbac/permissions?tab=ui#logs_write_processors
[15]: /fr/logs/indexes/
[16]: /fr/account_management/rbac/permissions?tab=ui#logs_write_exclusion_filters
[17]: /fr/logs/archives/
[18]: /fr/account_management/rbac/permissions?tab=ui#logs_read_archives
[19]: /fr/account_management/rbac/permissions?tab=ui#logs_write_historical_view
[20]: /fr/logs/archives#datadog-permissions
[21]: /fr/account_management/rbac/permissions?tab=ui#logs_read_index_data