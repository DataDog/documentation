---
title: API Roles
kind: documentation
beta: true
further_reading:
- link: account_management/rbac/log_management/
  tag: Documentation
  text: RBAC pour Log Management
---

<div class="alert alert-warning">
Pour activer cette fonctionnalité, contactez votre représentant commercial ou votre chargé de compte.
</div>

L'API Roles peut être utilisée pour créer et gérer des rôles Datadog, ainsi que pour définir les autorisations globales et les utilisateurs associés à chaque rôle.

L'accès à certaines ressources de compte spécifiques peut être accordé à des rôles depuis l'application Datadog sans passer par cette API. Par exemple, l'accès en lecture à un index de log spécifique peut être accordé à un rôle Datadog depuis la [page Pipelines][1]. 

## Requêtes

Tous les endpoints d'API ci-dessous peuvent avoir deux endpoints de host différents :

* Si vous utilisez le site américain de Datadog : `https://api.datadoghq.com/api/`.
* Si vous utilisez le site européen de Datadog : `https://api.datadoghq.eu/api/`.

### Récupérer tous les rôles


Renvoie tous les rôles, y compris leurs noms et UUID.

| Méthode | Chemin de l'endpoint | Charge utile requise |
|--------|--------------|------------------|
| `GET`  | `/v2/roles`  | Aucune charge utile       |

##### ARGUMENTS

* **`page[size]`** [*facultatif*, *défaut*=**0**] :
Numéro de page des rôles à renvoyer pour une page donnée.
* **`page[count]`** [*facultatif*, *défaut*=**10**] :
Nombre de rôles à renvoyer pour une page donnée.
* **`sort`** [*facultatif*, *défaut*=**name**] :
Trie les rôles selon un champ donné. L'ordre de tri est **croissant** par défaut. L'ordre de tri est **décroissant** si le champ est précédé par un signe négatif (par ex. : *sort=-name*).
    Options : **name**, **modified_at**
* **`filter`**[*facultatif*, *défaut*=**None**] :
    Filtre tous les rôles selon une chaîne donnée.


{{< tabs >}}
{{% tab "Exemple" %}}

```sh
curl -X GET "https://app.datadoghq.com/api/v2/roles" \
     -H "DD-API-KEY: <VOTRE_CLÉ_API_DATADOG>" \
     -H "DD-APPLICATION-KEY: <VOTRE_CLÉ_APPLICATION_DATADOG>"
```

Remplacez les paramètres fictifs `<VOTRE_CLÉ_API_DATADOG>` et `<VOTRE_CLÉ_APPLICATION_DATADOG>` par les [clés d'API et d'application de votre organisation][1].

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Réponse" %}}

```json
{
    "meta": {
        "page": {
            "total_count": 7
        }
    },
    "data": [
        {
            "type": "roles",
            "id": "$ROLE_UUID",
                "attributes": {
                "created_at": "2000-02-29T16:50:43.607749+00:00",
                "user_count": 2122,
                "modified_at": "2000-02-29T16:50:43.607749+00:00",
                "uuid": "$ROLE_UUID",
                "name": "$ROLE_NAME"
            },
            "relationships": {
                "permissions": {
                    "data": [
                        {
                            "type": "permissions",
                            "id": "$PERMISSION_UUID"
                        },
                        {
                            "type": "permissions",
                            "id": "$PERMISSION_UUID"
                        }
                    ]
                }
            }
        }
    ]
}
```

{{% /tab %}}
{{< /tabs >}}

### Récupérer un rôle

Renvoie un rôle spécifique, y compris son nom et son UUID.

| Méthode | Chemin de l'endpoint            | Charge utile requise |
|--------|-------------------------|------------------|
| `GET`  | `/v2/roles/<UUID_RÔLE>` | Aucune charge utile       |

{{< tabs >}}
{{% tab "Exemple" %}}

```sh
curl -X GET "https://app.datadoghq.com/api/v2/roles/<UUID_RÔLE>" \
     -H "DD-API-KEY: <VOTRE_CLÉ_API_DATADOG>" \
     -H "DD-APPLICATION-KEY: <VOTRE_CLÉ_APPLICATION_DATADOG>"
```

Remplacez les paramètres fictifs `<VOTRE_CLÉ_API_DATADOG>` et `<VOTRE_CLÉ_APPLICATION_DATADOG>` par les [clés d'API et d'application de votre organisation][1]. Consultez la [section UUID des autorisations](#uuid-des-autorisations) pour obtenir la liste des UUID pouvant être utilisés pour le paramètre `<UUID_RÔLE>`.

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Réponse" %}}

```json
{
    "data": {
            "type": "roles",
            "id": "$ROLE_UUID",
                "attributes": {
                "created_at": "2000-02-29T16:50:43.607749+00:00",
                "user_count": 2122,
                "modified_at": "2000-02-29T16:50:43.607749+00:00",
                "uuid": "$ROLE_UUID",
                "name": "$ROLE_NAME"
            },
            "relationships": {
                "permissions": {
                    "data": [
                        {
                            "type": "permissions",
                            "id": "$PERMISSION_UUID"
                        },
                        {
                            "type": "permissions",
                            "id": "$PERMISSION_UUID"
                        }
                    ]
                }
            }
        }
}
```

{{% /tab %}}
{{< /tabs >}}

### Créer un rôle


Crée un rôle. Renvoie le nom et l'UUID du rôle.

| Méthode | Chemin de l'endpoint | Charge utile requise                           |
|--------|--------------|--------------------------------------------|
| `POST` | `/v2/roles`  | **type="roles"**<br>**attributes["name"]** |

{{< tabs >}}
{{% tab "Exemple" %}}

```sh
curl -X POST \
        "https://app.datadoghq.com/api/v2/roles" \
        -H "Content-Type: application/json" \
        -H "DD-API-KEY: <VOTRE_CLÉ_API_DATADOG>" \
        -H "DD-APPLICATION-KEY: <VOTRE_CLÉ_APPLICATION_DATADOG>" \
        -d '{
            "data": {
                "type": "roles",
                    "attributes": {
                        "name": <NOM_RÔLE>
                    }
            }
        }'
```
Remplacez les paramètres fictifs `<VOTRE_CLÉ_API_DATADOG>` et `<VOTRE_CLÉ_APPLICATION_DATADOG>` par les [clés d'API et d'application de votre organisation][1]. Consultez la [section UUID des autorisations](#uuid-des-autorisations) pour obtenir la liste des valeurs disponibles pour le paramètre `<NOM_RÔLE>`.

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Réponse" %}}

```json
{
    "data": {
            "type": "roles",
            "id": "$ROLE_UUID",
                "attributes": {
                "created_at": "2000-02-29T16:50:43.607749+00:00",
                "user_count": 0,
                "modified_at": "2000-02-29T16:50:43.607749+00:00",
                "uuid": "$ROLE_UUID",
                "name": "$ROLE_NAME"
            },
            "relationships": {
                "permissions": {
                    "data": []
                }
            }
        }
}

```

{{% /tab %}}
{{< /tabs >}}

### Mettre à jour un rôle

Met à jour le nom d'un rôle existant. Renvoie le nom et l'UUID du rôle.

| Méthode  | Chemin de l'endpoint            | Charge utile requise                           |
|---------|-------------------------|--------------------------------------------|
| `PATCH` | `/v2/roles/<UUID_RÔLE>` | **type="roles"**<br>**attributes["name"]** |

{{< tabs >}}
{{% tab "Exemple" %}}

```sh
curl -X PATCH \
         "https://app.datadoghq.com/api/v2/roles" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <VOTRE_CLÉ_API_DATADOG>" \
         -H "DD-APPLICATION-KEY: <VOTRE_CLÉ_APPLICATION_DATADOG>" \
         -d '{
             "data": {
                 "type": "roles",
                 "attributes": {
                     "name": <NOM_RÔLE>
                }
             }
         }'
```

Remplacez les paramètres fictifs `<VOTRE_CLÉ_API_DATADOG>` et `<VOTRE_CLÉ_APPLICATION_DATADOG>` par les [clés d'API et d'application de votre organisation][1]. Consultez la [section UUID des autorisations](#uuid-des-autorisations) pour obtenir la liste des valeurs disponibles pour le paramètre `<NOM_RÔLE>`.

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Réponse" %}}

```json
{
    "data": {
            "type": "roles",
            "id": "$ROLE_UUID",
                "attributes": {
                "created_at": "2000-02-29T16:50:43.607749+00:00",
                "user_count": 0,
                "modified_at": "2000-02-29T16:50:43.607749+00:00",
                "uuid": "$ROLE_UUID",
                "name": "$ROLE_NAME"
            },
            "relationships": {
                "permissions": {
                    "data": []
                }
            }
        }
}

```

{{% /tab %}}
{{< /tabs >}}

### Supprimer un rôle

Supprime un rôle.

| Méthode   | Chemin de l'endpoint            | Charge utile requise |
|----------|-------------------------|------------------|
| `DELETE` | `/v2/roles/<UUID_RÔLE>` | Aucune charge utile       |

{{< tabs >}}
{{% tab "Exemple" %}}

```sh
curl -X DELETE "https://app.datadoghq.com/api/v2/roles/<UUID_RÔLE>" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <VOTRE_CLÉ_API_DATADOG>" \
         -H "DD-APPLICATION-KEY: <VOTRE_CLÉ_APPLICATION_DATADOG>"
```

Remplacez les paramètres fictifs `<VOTRE_CLÉ_API_DATADOG>` et `<VOTRE_CLÉ_APPLICATION_DATADOG>` par les [clés d'API et d'application correspondantes de votre organisation][1]. Consultez la [section UUID des autorisations](#uuid-des-autorisations) pour obtenir la liste des UUID pouvant être utilisés pour le paramètre `<UUID_RÔLE>`.

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Réponse" %}}

```sh
HTTP/2 204
```

{{% /tab %}}
{{< /tabs >}}


### Récupérer les autorisations

Renvoie une liste de toutes les autorisations, y compris le nom, la description et l'UUID.

| Méthode | Chemin de l'endpoint      | Charge utile requise |
|--------|-------------------|------------------|
| `GET`  | `/v2/permissions` | Aucune charge utile       |

{{< tabs >}}
{{% tab "Exemple" %}}

```sh
curl -X GET "https://app.datadoghq.com/api/v2/permissions" \
             -H "Content-Type: application/json" \
             -H "DD-API-KEY: <VOTRE_CLÉ_API_DATADOG>" \
             -H "DD-APPLICATION-KEY: <VOTRE_CLÉ_APPLICATION_DATADOG>"
```

Remplacez les paramètres fictifs `<VOTRE_CLÉ_API_DATADOG>` et `<VOTRE_CLÉ_APPLICATION_DATADOG>` par les [clés d'API et d'application de votre organisation][1].

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Réponse" %}}

```json
{
    "data": [{
        "type": "permissions",
        "id": "$PERMISSION_UUID",
        "attributes": {
            "display_name": "Logs metrics write",
            "description": "Update a custom metric",
            "name": "logs_metrics_write",
            "created": "2000-02-29T14:26:26.983187+00:00",
            "group_name": "Logs",
            "display_type": "other",
            "uuid": "$PERMISSION_UUID"
        }
    }]
}
```

{{% /tab %}}
{{< /tabs >}}

### Récupérer les autorisations d'un rôle

Renvoie une liste de toutes les autorisations d'un rôle unique.

| Méthode | Chemin de l'endpoint                        | Charge utile requise |
|--------|-------------------------------------|------------------|
| `GET`  | `/v2/roles/<UUID_RÔLE>/permissions` | Aucune charge utile       |

{{< tabs >}}
{{% tab "Exemple" %}}

```sh
curl -X GET "https://app.datadoghq.com/api/v2/roles/<UUID_RÔLE>/permissions" \
             -H "Content-Type: application/json" \
             -H "DD-API-KEY: <VOTRE_CLÉ_API_DATADOG>" \
             -H "DD-APPLICATION-KEY: <VOTRE_CLÉ_APPLICATION_DATADOG>"
```

Remplacez les paramètres fictifs `<VOTRE_CLÉ_API_DATADOG>` et `<VOTRE_CLÉ_APPLICATION_DATADOG>` par les [clés d'API et d'application de votre organisation][1]. Consultez la [section UUID des autorisations](#uuid-des-autorisations) pour obtenir la liste des UUID pouvant être utilisés pour le paramètre `<UUID_RÔLE>`.

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Réponse" %}}

```json
{
    "data": [{
        "type": "permissions",
        "id": "$PERMISSION_UUID",
        "attributes": {
            "display_name": "Logs metrics write",
            "description": "Update a custom metric",
            "name": "logs_metrics_write",
            "created": "2000-02-29T14:26:26.983187+00:00",
            "group_name": "Logs",
            "display_type": "other",
            "uuid": "<UUID_AUTORISATION>"
        }
    }]
}
```

{{% /tab %}}
{{< /tabs >}}

### Accorder une autorisation à un rôle

Ajoute une autorisation à un rôle.

| Méthode | Chemin de l'endpoint                        | Charge utile requise                                                  |
|--------|-------------------------------------|-------------------------------------------------------------------|
| `POST` | `/v2/roles/<UUID_RÔLE>/permissions` | **data["type"]="permissions"**<br>**data["id"]=$PERMISSION_UUID** |

{{< tabs >}}
{{% tab "Exemple" %}}

```sh
curl -X POST \
        https://app.datadoghq.com/api/v2/roles/<UUID_RÔLE>/permissions \
        -H "Content-Type: application/json" \
        -H "DD-API-KEY: <VOTRE_CLÉ_API_DATADOG>" \
        -H "DD-APPLICATION-KEY: <VOTRE_CLÉ_APPLICATION_DATADOG>" \
        -d '{
                "data":
                {
                    "type": "permissions",
                    "id": <UUID_AUTORISATION>
                }
            }'
```

Remplacez les paramètres fictifs `<VOTRE_CLÉ_API_DATADOG>` et `<VOTRE_CLÉ_APPLICATION_DATADOG>` par les [clés d'API et d'application de votre organisation][1]. Consultez la [section UUID des autorisations](#uuid-des-autorisations) pour obtenir la liste des ID pouvant être utilisés pour les paramètres <UUID_AUTORISATION>` et `<UUID_RÔLE>`.

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Réponse" %}}

```json
{
    "data": [{
        "type": "permissions",
        "id": "$PERMISSION_UUID",
        "attributes": {
            "display_name": "Logs metrics write",
            "description": "Update a custom metric",
            "name": "logs_metrics_write",
            "created": "2000-02-29T14:26:26.983187+00:00",
            "group_name": "Logs",
            "display_type": "other",
            "uuid": "<UUID_AUTORISATION>"
        }
    }]
}
```

{{% /tab %}}
{{< /tabs >}}

### Révoquer les autorisations d'un rôle

Supprime une autorisation pour un rôle.

| Méthode   | Chemin de l'endpoint                        | Charge utile requise                                                  |
|----------|-------------------------------------|-------------------------------------------------------------------|
| `DELETE` | `/v2/roles/<UUID_RÔLE>/permissions` | **data["type"]="permissions"**<br>**data["id"]=$PERMISSION_UUID** |

{{< tabs >}}
{{% tab "Exemple" %}}

```sh
curl -X DELETE \
        "https://app.datadoghq.com/api/v2/roles/<UUID_RÔLE>/permissions" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <VOTRE_CLÉ_API_DATADOG>" \
         -H "DD-APPLICATION-KEY: <VOTRE_CLÉ_APPLICATION_DATADOG>" \
         -d '{
             "data":
             {
                 "type": "permissions",
                 "id": <UUID_AUTORISATION>
             }
         }'
```

Remplacez les paramètres fictifs `<VOTRE_CLÉ_API_DATADOG>` et `<VOTRE_CLÉ_APPLICATION_DATADOG>` par les [clés d'API et d'application de votre organisation][1]. Consultez la [section UUID des autorisations](#uuid-des-autorisations) pour obtenir la liste des ID pouvant être utilisés pour les paramètres <UUID_AUTORISATION>` et `<UUID_RÔLE>`.

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Réponse" %}}

```json
{
    "data": [{
        "type": "permissions",
        "id": "$DIFFERENT_PERMISSION_UUID",
        "attributes": {
            "display_name": "Logs metrics read",
            "description": "Update a read metric",
            "name": "logs_metrics_read",
            "created": "2000-02-29T14:26:26.983187+00:00",
            "group_name": "Logs",
            "display_type": "other",
            "uuid": "$DIFFERENT_PERMISSION_UUID"
        }
    }]
}
```

{{% /tab %}}
{{< /tabs >}}

### Ajouter un utilisateur à un rôle

Ajoute un utilisateur à un rôle.

| Méthode | Chemin de l'endpoint                  | Charge utile requise                                        |
|--------|-------------------------------|---------------------------------------------------------|
| `POST` | `/v2/roles/<UUID_RÔLE>/users` | **data["type"]="users"**<br>**data["id"]=$USER_HANDLE** |

{{< tabs >}}
{{% tab "Exemple" %}}

```sh
curl -X POST \
         "https://app.datadoghq.com/api/v2/roles/<UUID_RÔLE>/users" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <VOTRE_CLÉ_API_DATADOG>" \
         -H "DD-APPLICATION-KEY: <VOTRE_CLÉ_APPLICATION_DATADOG>" \
         -d '{
             "data": {
                 "type": "users",
                 "id": "user@example.org"
             }
         }'
```

Remplacez les paramètres fictifs `<VOTRE_CLÉ_API_DATADOG>` et `<VOTRE_CLÉ_APPLICATION_DATADOG>` par les [clés d'API et d'application de votre organisation][1]. Consultez la [section UUID des autorisations](#uuid-des-autorisations) pour obtenir la liste des UUID pouvant être utilisés pour le paramètre `<UUID_RÔLE>`.

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Réponse" %}}

```json
{
    "data": [{
        "type": "users",
        "id": "user@example.org",
        "attributes": {
            "handle": "user@example.org",
            "name": "Example user",
            "title": null,
            "created_at": "2000-02-29T14:26:26.983187+00:00",
            "org_id": 99,
            "disabled": false,
            "verified": true,
            "email": "user@example.org"
        }
    }]
}
```

{{% /tab %}}
{{< /tabs >}}

### Supprimer le rôle d'un utilisateur

Supprime le rôle d'un utilisateur.

| Méthode   | Chemin de l'endpoint                  | Charge utile requise                                        |
|----------|-------------------------------|---------------------------------------------------------|
| `DELETE` | `/v2/roles/<UUID_RÔLE>/users` | **data["type"]="users"**<br>**data["id"]=$USER_HANDLE** |

{{< tabs >}}
{{% tab "Exemple" %}}

```sh
curl -X DELETE \
         "https://app.datadoghq.com/api/v2/roles/<UUID_RÔLE>/users" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <VOTRE_CLÉ_API_DATADOG>" \
         -H "DD-APPLICATION-KEY: <VOTRE_CLÉ_APPLICATION_DATADOG>" \
         -d '{
             "data": {
                 "type": "users",
                 "id": "user@example.org"
             }
         }'
```

Remplacez les paramètres fictifs `<VOTRE_CLÉ_API_DATADOG>` et `<VOTRE_CLÉ_APPLICATION_DATADOG>` par les [clés d'API et d'application correspondantes de votre organisation][1]. Consultez la [section UUID des autorisations](#uuid-des-autorisations) pour obtenir la liste des UUID pouvant être utilisés pour le paramètre `<UUID_RÔLE>`.

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Réponse" %}}

```json
{
    "data": [{
        "type": "users",
        "id": "user2@example.org",
        "attributes": {
            "handle": "user2@example.org",
            "name": "Example user 2",
            "title": null,
            "created_at": "2000-02-29T14:26:26.983187+00:00",
            "org_id": 99,
            "disabled": false,
            "verified": true,
            "email": "user2@example.org"
        }
    }]
}
```

{{% /tab %}}
{{< /tabs >}}

## UUID des autorisations

Pour accorder ou retirer une autorisation de rôle globale, vous devez utiliser l'UUID du rôle et celui de l'autorisation.

Pour obtenir la liste des UUID de rôle, utilisez l'appel d'API `GET roles`.

Les UUID des autorisations sont les suivants :

{{< tabs >}}
{{% tab "Site américain de Datadog" %}}
| name                         | UUID                                 | description                                  |
|------------------------------|--------------------------------------|----------------------------------------------|
| admin                        | 984a2bd4-d3b4-11e8-a1ff-a7f660d43029 | Accès en lecture et écriture à l'ensemble du contenu de Datadog  |
| standard                     | 984d2f00-d3b4-11e8-a200-bb47109e9987 | Accès en lecture et écriture à la majorité du contenu de Datadog |
| read_only                    | 984fe6fa-d3b4-11e8-a201-47a7999cc331 | Accès en lecture à la majorité du contenu de Datadog           |
| logs_read_index_data         | 5e605652-dd12-11e8-9e53-375565b8970e | Accès en lecture à un sous-ensemble d'index de logs             |
| logs_modify_indexes          | 62cc036c-dd12-11e8-9e54-db9995643092 | Mise à jour de la définition des index de logs         |
| logs_live_tail               | 6f66600e-dd12-11e8-9e55-7f30fbb45e73 | Accès à la fonctionnalité Live Tail                 |
| logs_generate_metrics        | 979df720-aed7-11e9-99c6-a7eb8373165a | Accès à la fonctionnalité Generate Metrics          |
| logs_write_exclusion_filters | 7d7c98ac-dd12-11e8-9e56-93700598622d | Mise à jour d'un sous-ensemble de filtres d'exclusion     |
| logs_write_pipelines         | 811ac4ca-dd12-11e8-9e57-676a7f0beef9 | Mise à jour d'un sous-ensemble de  pipelines de logs         |
| logs_write_processors        | 84aa3ae4-dd12-11e8-9e58-a373a514ccd0 | Mise à jour des processeurs de log dans un index        |
| logs_write_archives          | 87b00304-dd12-11e8-9e59-cbeb5f71f72f | Mise à jour de la configuration des archives externes   |
| logs_public_config_api       | 1a92ede2-6cb2-11e9-99c6-2b3a4a0cdf0a | Accès à l'API de configuration des logs publique (lecture/écriture)      |

{{% /tab %}}
{{% tab "Site européen de Datadog" %}}
| name                         | UUID                                 | description                                  |
|------------------------------|--------------------------------------|----------------------------------------------|
| admin                        | f1624684-d87d-11e8-acac-efb4dbffab1c | Accès en lecture et écriture à l'ensemble du contenu de Datadog  |
| standard                     | f1666372-d87d-11e8-acac-6be484ba794a | Accès en lecture et écriture à la majorité du contenu de Datadog |
| read_only                    | f1682b6c-d87d-11e8-acac-9f3040c65f48 | Accès en lecture à la majorité du contenu de Datadog           |
| logs_read_index_data         | 4fbb1652-dd15-11e8-9308-77be61fbb2c7 | Accès en lecture à un sous-ensemble d'index de logs             |
| logs_modify_indexes          | 4fbd1e66-dd15-11e8-9308-53cb90e4ef1c | Mise à jour de la définition des index de logs         |
| logs_live_tail               | 4fbeec96-dd15-11e8-9308-d3aac44f93e5 | Accès à la fonctionnalité Live Tail                 |
| logs_generate_metrics        | 06f715e2-aed9-11e9-aac6-eb5723c0dffc | Accès à la fonctionnalité Generate Metrics          |
| logs_write_exclusion_filters | 4fc2807c-dd15-11e8-9308-d3bfffb7f039 | Mise à jour d'un sous-ensemble des filtres d'exclusion     |
| logs_write_pipelines         | 4fc43656-dd15-11e8-9308-f3e2bb5e31b4 | Mise à jour d'un sous-ensemble des pipelines de log         |
| logs_write_processors        | 505f4538-dd15-11e8-9308-47a4732f715f | Mise à jour des processeurs de log dans un index        |
| logs_write_archives          | 505fd138-dd15-11e8-9308-afd2db62791e | Mise à jour de la configuration des archives externes   |
| logs_public_config_api       | bd837a80-6cb2-11e9-8fc4-339b4b012214 | Accès à l'API de configuration des logs publique (lecture/écriture)      |

{{% /tab %}}
{{< /tabs >}}

## Accorder des autorisations dans des contextes limités

Certaines autorisations peuvent être accordées dans un contexte limité. Vous pouvez le faire manuellement à partir de la [page Pipelines][1] de l'application Datadog ou par programmation via l'API Role, en ajoutant le bon « contexte » à la charge utile. Les autorisations suivantes peuvent être accordées dans un contexte limité :

| Nom de l'autorisation                | Nom du contexte | Format                                   | Description                                                     |
|--------------------------------|------------|------------------------------------------|-----------------------------------------------------------------|
| `logs_read_index_data`         | indexes    | Liste des noms d'index (chaîne)             | Accorder un accès en lecture à certains index de logs uniquement.                         |
| `logs_write_exclusion_filters` | indexes    | Liste des noms d'index (chaîne)             | Autoriser la mise à jour des filtres d'exclusion pour certains index uniquement. |
| `logs_write_processors`        | pipelines  | Liste des ID de pipeline de processing (chaîne) | Autoriser la mise à jour de processeurs de certains pipelines uniquement.       |

Par exemple, pour accorder à un rôle nommé `support` un accès en lecture à seulement deux index nommés `main` et` support`, votre appel d'API doit ressembler à ceci :

```sh
curl -X POST \
  "https://app.datadoghq.com/api/v1/roles/${UUIDRÔLE}/permissions/${AUTORISATION}?api_key=${CLÉ_API}&application_key=${CLÉ_APP}" \
  -H "Content-type: application/json" \
  -d '{
        "scope": {
            "indexes": [
                "main",
                "support"
            ]
        }
      }'
```

Pour accorder un accès en écriture à seulement deux pipelines de processing dont les ID sont respectivement `abcd-1234` et` bcde-2345`, votre appel d'API doit ressembler à ceci :

```sh
curl -X POST \
    "https://app.datadoghq.com/api/v1/roles/${UUIDRÔLE}/permissions/${AUTORISATION}?api_key=${CLÉ_API}&application_key=${CLÉ_APP}"
    -H "Content-type: application/json" \
    -d '{
          "scope": {
            "pipelines": [
                  "abcd-1234",
                  "bcde-2345"
             ]
         }
       }'
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines
