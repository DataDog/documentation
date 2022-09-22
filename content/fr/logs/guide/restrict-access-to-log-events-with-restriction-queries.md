---
title: Restreindre l'accès aux événements de log via des requêtes de restriction
kind: guide
further_reading:
  - link: /logs/explorer/
    tag: Documentation
    text: "En savoir plus sur la vue Log\_Explorer"
  - link: /logs/explorer/patterns/
    tag: Documentation
    text: Se familiariser avec la vue Log Pattern
  - link: /logs/live_tail/
    tag: Documentation
    text: Explorer la fonctionnalité Live Tail
  - link: /logs/logs_to_metrics/
    tag: Documentation
    text: Découvrir comment générer des métriques à partir de logs ingérés
---
## Présentation

Les logs peuvent contenir des informations sensibles qui peuvent être [nettoyées][1]) ou dont l'accès peut être restreint à certains utilisateurs de votre organisation uniquement.

Pour limiter l'accès à un sous-ensemble de logs à un utilisateur ou un groupe d'utilisateurs donné, vous pouvez définir des requêtes de restriction dans Datadog.

Ce guide suppose qu'il existe deux équipes, une équipe **backend** et une équipe **frontend**, et que chaque équipe ne peut voir que ses propres logs associés aux tags `team:frontend` et `team:backend`.

Les étapes suivantes sont abordées pour chaque équipe :

* [Créer le rôle](#role-creation)
* [Créer la requête de restriction](#create-restriction-queries)
* [Ajouter la requête de restriction au rôle](#attach-queries-to-the-role)
* [Ajouter des rôles aux utilisateurs](#attach-role-to-the-user)
* [Supprimer des utilisateurs des rôles Datadog par défaut](#remove-default-roles)

## Prérequis

Ce guide décrit l'utilisation de l'API : vous aurez donc besoin d'obtenir une clé d'API et une clé application auprès d'un administrateur. Elles sont disponibles sur la [page des clés d'API de votre compte Datadog][2].

Tout au long de cet article, vous devez remplacer chaque occurrence de `<CLÉ_API_DATADOG>` et `<CLÉ_APPLICATION_DATADOG>` par vos clé d'API et d'application Datadog, respectivement.

Ce guide suppose également que vous avez accès à un terminal avec `CURL`. 

## Création de rôles

Les rôles peuvent être créés via Datadog, comme indiqué dans [la documentation RBAC][3].

Vous pouvez également utiliser l'API et les étapes suivantes pour créer un rôle.

### Créer un rôle

Utilisez l'[API de création de rôle][4] pour ajouter un rôle `team-frontend` et `team-backend` :

{{< tabs >}}
{{% tab "Backend" %}}

Appel d'API :

```
curl -X POST "https://app.datadoghq.com/api/v2/role" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>" -d '{"data": {"type": "roles","attributes": {"name": "team-backend"}}}'
```

Réponse :

```
{"data":{"type":"roles","id":"dcf7c550-99cb-11ea-93e6-376cebac897c","attributes":{"name":"team-backend","created_at":"2020-05-19T12:25:45.284949+00:00","modified_at":"2020-05-19T12:25:45.284949+00:00"},"relationships":{"permissions":{"data":[{"type":"permissions","id":"d90f6830-d3d8-11e9-a77a-b3404e5e9ee2"},{"type":"permissions","id":"4441648c-d8b1-11e9-a77a-1b899a04b304"}]}}}}
```

{{% /tab %}}
{{% tab "Frontend" %}}

Appel d'API :

```
curl -X POST "https://app.datadoghq.com/api/v2/role" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>" -d '{"data": {"type": "roles","attributes": {"name": "team-frontend"}}}'
```

Réponse :

```
{"data":{"type":"roles","id":"63b970ea-99ca-11ea-93e6-e32eb84de6d6","attributes":{"name":"team-frontend","created_at":"2020-05-19T12:15:12.375425+00:00","modified_at":"2020-05-19T12:15:12.375425+00:00"},"relationships":{"permissions":{"data":[{"type":"permissions","id":"d90f6830-d3d8-11e9-a77a-b3404e5e9ee2"},{"type":"permissions","id":"4441648c-d8b1-11e9-a77a-1b899a04b304"}]}}}}
```

{{% /tab %}}
{{% tab "API générique" %}}

Appel d'API :

```
curl -X POST \
        "https://app.datadoghq.com/api/v2/roles" \
        -H "Content-Type: application/json" \
        -H "DD-API-KEY: <CLÉ_API_DATADOG>" \
        -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>" \
        -d '{
            "data": {
                "type": "roles",
                    "attributes": {
                        "name": <NOM_RÔLE>
                    }
            }
        }'
```

{{% /tab %}}
{{< /tabs >}}

Par défaut, les rôles sont créés avec un accès en lecture seule. L'étape suivante consiste à ajouter des autorisations à ces rôles.
Notez les ID de rôle que vous avez obtenus dans la réponse, car ils sont nécessaires pour attribuer des autorisations à ces rôles.

### Énumérer les autorisations disponibles

Récupérez la [liste de toutes les autorisations existantes][5] :

```
curl -X GET "https://app.datadoghq.com/api/v2/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>"
```

La réponse est un tableau d'autorisations, chaque élément du tableau étant affiché ci-dessous :

```
{
  "data": [
    {
      "attributes": {
        "created": "2019-09-19T10:00:00.000Z",
        "description": "string",
        "display_name": "string",
        "display_type": "string",
        "group_name": "string",
        "name": "string",
        "restricted": false
      },
      "id": "string",
      "type": "string"
    }
  ]
}
```

**Remarque** : les ID des autorisations changent en fonction du site Datadog que vous utilisez (américain ou européen). Assurez-vous de récupérer les ID via l'appel d'API dans la première section.

Il existe deux types d'autorisations :

* [Autorisations générales][6] (Admin, Standard, Read-only)
* [Autorisations avancées][7]

Ce guide part du principe que seul l'accès aux données doit être restreint pour les utilisateurs. Par conséquent, toutes les autorisations leur seront accordées, y compris les autorisations Admin générales.

Pour accéder aux logs dans Datadog, les autorisations suivantes sont indispensables :

* `logs_read_data` : paramètre global utilisé pour donner accès aux données de logs (y compris aux logs réintégrés à partir d'archives et aux logs Live Tail).
* `logs_read_index_data` : autorisations spécifiques pour les données indexées (disponibles dans Log Explorer).
* `logs_live_tail` : accès à la fonctionnalité Live Tail.

Les utilisateurs doivent disposer de ces trois autorisations pour visualiser les logs indexés et ingérés.
L'accès est ensuite restreint avec une requête de restriction, comme indiqué ci-dessous.

### Accorder des autorisations à un rôle

Les autorisations sont ajoutées une par une via l'[API Roles][8]). 

Après avoir récupéré les ID des autorisations adéquates en énumérant les autorisations disponibles, accordez-les à chaque rôle comme indiqué ci-dessous :

{{< tabs >}}
{{% tab "Backend" %}}

Appel d'API (remplacez l'ID du rôle par le vôtre et renseignez l'ID d'autorisation) :

```
curl -X POST "https://app.datadoghq.com/api/v2/roles/dcf7c550-99cb-11ea-93e6-376cebac897c/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>" -d '{"data": {"type":"type": "permissions","id": <ID_AUTORISATION>}}’
```

{{% /tab %}}
{{% tab "Frontend" %}}

Appel d'API (remplacez l'ID du rôle par le vôtre et renseignez l'ID d'autorisation) :

```
curl -X POST "https://app.datadoghq.com/api/v2/roles/63b970ea-99ca-11ea-93e6-e32eb84de6d6/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>" -d '{"data": {"type":"type": "permissions","id": <ID_AUTORISATION>}}’
```
{{% /tab %}}
{{% tab "API générique" %}}

Appel d'API :

```
curl -X POST "https://app.datadoghq.com/api/v2/roles/<ID_RÔLE>/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>" -d '{"data": {"type":"type": "permissions","id": <ID_AUTORISATION>}}’
```

{{% /tab %}}
{{< /tabs >}}

## Créer des requêtes de restriction

Il existe plusieurs façons d'identifier les logs correspondant à chaque équipe. Vous pouvez par exemple utiliser la valeur du service ou ajouter un tag `team` à vos données.

Ce guide part du principe qu'un tag `team` est appliqué aux logs backend et frontend.

{{< tabs >}}
{{% tab "Backend" %}}

Appel d'API :
```
curl -X POST "https://app.datadoghq.com/api/v2/logs/config/restriction_queries" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>" -d '{"data": {"type": "logs_restriction_queries","attributes": {"restriction_query": "team:backend"}}}'
```

Réponse :

```
{
    "data": {
        "type": "logs_restriction_queries",
        "id": "76b2c0e6-98fa-11ea-93e6-775bd9258d59",
        "attributes": {
            "restriction_query": "team:backend",
            "created_at": "2020-05-18T11:26:48.887750+00:00",
            "modified_at": "2020-05-18T11:26:48.887750+00:00"
        }
    }
}
```

{{% /tab %}}
{{% tab "Frontend" %}}

Appel d'API :

```
curl -X POST "https://app.datadoghq.com/api/v2/logs/config/restriction_queries" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>" -d '{"data": {"type": "logs_restriction_queries","attributes": {"restriction_query": "team:frontend"}}}'
```

Réponse :

```
{
    "data": {
        "type": "logs_restriction_queries",
        "id": "b3228a0c-98fa-11ea-93e6-d30e1d2c52ee",
        "attributes": {
            "restriction_query": "team:frontend",
            "created_at": "2020-05-18T11:28:30.284202+00:00",
            "modified_at": "2020-05-18T11:28:30.284202+00:00"
        }
    }
}
```

{{% /tab %}}
{{% tab "API générique" %}}

```
curl -X POST "https://app.datadoghq.com/api/v2/logs/config/restriction_queries" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>" -d '{"data": {"type": "logs_restriction_queries","attributes": {"restriction_query": "<REQUÊTE>"}}}'
```

{{% /tab %}}
{{< /tabs >}}

Vous venez de créer le rôle et la requête pour l'équipe frontend et l'équipe backend.

Vous pouvez maintenant restreindre l'accès aux logs backend et frontend en [ajoutant la requête de restriction au rôle créé][9] avec les ID de rôle et de requête.

## Ajouter des requêtes au rôle

Vous avez obtenu les ID de rôle et de requête à partir de la réponse à l'appel de création de la requête. Utilisez-les pour ajouter la requête au rôle.
Notez que les ID sont propres à cet exemple et qu'en effectuant la même opération depuis votre compte, vous obtiendrez des ID de rôle et de requête différents. Consultez la [documentation sur les autorisations][10] pour obtenir plus d'informations sur les restrictions dans Datadog.

{{< tabs >}}
{{% tab "Backend" %}}

Appel d'API :

```
curl -X POST "https://app.datadoghq.com/api/v2/logs/config/restriction_queries/76b2c0e6-98fa-11ea-93e6-775bd9258d59/roles" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>" -d '{"data": {"type": "roles","id": "dcf7c550-99cb-11ea-93e6-376cebac897c"}}’
```

Confirmez que la requête a bien été ajoutée en [récupérant la liste des rôles associés à la requête][1] : 

```
curl -X GET "https://app.datadoghq.com/api/v2/logs/config/restriction_queries/76b2c0e6-98fa-11ea-93e6-775bd9258d59/roles" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>"
```

Réponse :

```
{
    "data": [{
        "type": "roles",
        "id": "dcf7c550-99cb-11ea-93e6-376cebac897c",
        "attributes": {
            "name": "team-backend"
        }
    }]
}
```

[1]: https://docs.datadoghq.com/fr/api/v2/logs-restriction-queries/#list-roles-for-a-restriction-query
{{% /tab %}}
{{% tab "Frontend" %}}

Appel d'API :

```
curl -X POST "https://app.datadoghq.com/api/v2/logs/config/restriction_queries/b3228a0c-98fa-11ea-93e6-d30e1d2c52ee/roles" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>" -d '{"data": {"type": "roles","id": "63b970ea-99ca-11ea-93e6-e32eb84de6d6"}}’
```

Confirmez que la requête a bien été ajoutée en [récupérant la liste des rôles associés à la requête][1] : 

```
curl -X GET "https://app.datadoghq.com/api/v2/logs/config/restriction_queries/b3228a0c-98fa-11ea-93e6-d30e1d2c52ee/roles" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>"
```

Réponse :

```
{
    "data": [{
        "type": "roles",
        "id": "63b970ea-99ca-11ea-93e6-e32eb84de6d6",
        "attributes": {
            "name": "team-frontend"
        }
    }]
}
```

[1]: https://docs.datadoghq.com/fr/api/v2/logs-restriction-queries/#list-roles-for-a-restriction-query
{{% /tab %}}
{{% tab "API générique" %}}

Appel d'API :

```
curl -X POST "https://app.datadoghq.com/api/v2/logs/config/restriction_queries/<RESTRICTION_QUERY_ID>/roles" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>" -d '{"data": {"type": "roles","id": "<ID_RÔLE>"}}’
```

{{% /tab %}}
{{< /tabs >}}

## Ajouter un rôle à un utilisateur

Enfin, maintenant que vos rôles sont configurés avec leurs autorisations et requêtes de restriction, vous pouvez les attribuer à vos utilisateurs.

### Récupérer les ID des utilisateurs

La première étape consiste à [récupérer la liste des utilisateurs][11] :

```
curl -X GET "https://api.datadoghq.com/api/v2/users" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>"
```

Repérez l'objet `data` dans la réponse et récupérez les ID des utilisateurs qui doivent appartenir au rôle `Backend` ou `Frontend`.

Vérifiez également si des rôles leurs ont déjà été attribués, et les ID de ces rôles.

### Ajouter le rôle à l'utilisateur

Pour chaque utilisateur, [attribuez le rôle backend ou frontend créé][12] :

```
curl -X POST "https://api.datadoghq.com/api/v2/roles/<ID_RÔLE>/users" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>" -d '{"data": {"type":"users","id":"<ID_UTILISATEUR>"}}'
```

### Supprimer les rôles par défaut

Les utilisateurs ont un rôle Datadog par défaut (admin, standard ou read-only). Si c'est la première fois que vous créez des rôles personnalisés et que vous les attribuez à des utilisateurs, il est possible que les utilisateurs disposent toujours de leur rôle par défaut ; ils seraient alors toujours en mesure d'accéder aux données.

Lorsque vous récupérez la liste des utilisateurs, vous obtenez également la liste de leurs rôles. Pour les autres rôles auxquels votre utilisateur appartient, vérifiez s'il s'agit d'un rôle standard ou non :

```
curl -X GET "https://api.datadoghq.com/api/v2/roles/{ID_RÔLE}" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>"
```

Si le nom de ce rôle est Datadog Standard Role ou Datadog Admin Role, [supprimez-le pour cet utilisateur][13]. De cette façon, il appartiendra uniquement au nouveau rôle créé et non au rôle Datadog par défaut.

Notez qu'un utilisateur peut appartenir à plusieurs rôles.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/logs/advanced_log_collection/?tab=configurationfile#scrub-sensitive-data-from-your-logs
[2]: https://app.datadoghq.com/account/settings#api
[3]: /fr/account_management/rbac/?tab=datadogapplication#create-a-custom-role
[4]: /fr/api/v2/roles/#create-role
[5]: /fr/api/v2/roles/#list-permissions
[6]: /fr/account_management/rbac/permissions?tab=datadogapplication#general-permissions
[7]: /fr/account_management/rbac/permissions?tab=datadogapplication#advanced-permissions
[8]: /fr/api/v2/roles/#grant-permission-to-a-role
[9]: /fr/api/v2/logs-restriction-queries/#grant-role-to-a-restriction-query
[10]: /fr/account_management/rbac/permissions?tab=datadogapplication#log-data-access
[11]: /fr/api/v2/users/#list-all-users
[12]: /fr/api/v2/roles/#add-a-user-to-a-role
[13]: /fr/api/v2/roles/#remove-a-user-from-a-role