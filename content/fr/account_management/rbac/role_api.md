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
|--------|---------------|------------------|
| `GET`  | `/v2/roles`   | Aucune charge utile       |

##### ARGUMENTS

* **`page[size]`** [*facultatif*, *défaut*=**10**] :
Nombre de rôles à renvoyer pour une page donnée.
* **`page[number]`** [*facultatif*, *défaut*=**0**] :
Numéro de page spécifique à renvoyer.
* **`sort`** [*facultatif*, *défaut*=**name**] :
Trie les rôles selon un champ donné. L'ordre de tri est **croissant** par défaut. L'ordre de tri est **décroissant** si le champ est précédé par un signe négatif (par ex. : *sort=-name*).
  * Options : **name**, **modified_at**, **user_count**
* **`filter`**[*facultatif*, *défaut*=**None**] :
Filtre tous les rôles selon une chaîne donnée.

{{< tabs >}}
{{% tab "Exemple" %}}

{{< code-block lang="bash" filename="roles.sh" >}}
curl -X GET "https://app.datadoghq.com/api/v2/roles" \
     -H "DD-API-KEY: <VOTRE_CLÉ_API_DATADOG>" \
     -H "DD-APPLICATION-KEY: <VOTRE_CLÉ_APPLICATION_DATADOG>"
{{< /code-block >}}

Remplacez les paramètres fictifs `<VOTRE_CLÉ_API_DATADOG>` et `<VOTRE_CLÉ_APPLICATION_DATADOG>` par les [clés d'API et d'application de votre organisation][1].

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Réponse" %}}

```json
{
  "meta": {"page": {"total_filtered_count": 7, "total_count": 7}},
  "data": [
    {
      "type": "roles",
      "id": "$ROLE_UUID",
      "attributes": {
        "name": "$ROLE_NAME",
        "created_at": "2000-02-29T16:50:43.607749+00:00",
        "modified_at": "2000-02-29T16:50:43.607749+00:00",
        "user_count": 2122
      },
      "relationships": {
        "permissions": {
          "data": [
            {"type": "permissions", "id": "$PERMISSION_UUID"},
            {"type": "permissions", "id": "$PERMISSION_UUID"}
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

| Méthode | Chemin de l'endpoint           | Charge utile requise |
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
      "name": "$ROLE_NAME",
      "created_at": "2000-02-29T16:50:43.607749+00:00",
      "modified_at": "2000-02-29T16:50:43.607749+00:00",
      "user_count": 2122
    },
    "relationships": {
      "permissions": {
        "data": [
          {"type": "permissions", "id": "$PERMISSION_UUID"},
          {"type": "permissions", "id": "$PERMISSION_UUID"}
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
|--------|---------------|--------------------------------------------|
| `POST` | `/v2/roles`   | **type="roles"**<br>**attributes["name"]** |

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
      "name": "$ROLE_NAME",
      "created_at": "2000-02-29T16:50:43.607749+00:00",
      "modified_at": "2000-02-29T16:50:43.607749+00:00"
    },
    "relationships": {
      "permissions": {
        "data": [{"type": "permissions", "id": "$PERMISSION_UUID"}]
      }
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

### Mettre à jour un rôle

Met à jour le nom d'un rôle existant. Renvoie le nom et l'UUID du rôle.

| Méthode  | Chemin de l'endpoint           | Charge utile requise                                                 |
|---------|-------------------------|------------------------------------------------------------------|
| `PATCH` | `/v2/roles/<UUID_RÔLE>` | **type="roles"**<br>**id="UUID_RÔLE"**<br>**attributes["name"]** |

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
                 "id": <UUID_RÔLE>,
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
      "name": "$ROLE_NAME",
      "created_at": "2000-02-29T16:50:43.607749+00:00",
      "modified_at": "2000-02-29T16:50:43.607749+00:00"
    },
    "relationships": {
      "permissions": {
        "data": [{"type": "permissions", "id": "$PERMISSION_UUID"}]
      }
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

### Supprimer un rôle

Supprime un rôle.

| Méthode   | Chemin de l'endpoint           | Charge utile requise |
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

| Méthode | Chemin de l'endpoint     | Charge utile requise |
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
  "data": [
    {
      "type": "permissions",
      "id": "$PERMISSION_UUID",
      "attributes": {
        "name": "logs_metrics_write",
        "display_name": "Logs metrics write",
        "description": "Update a custom metric",
        "created": "2000-02-29T14:26:26.983187+00:00",
        "group_name": "Logs",
        "display_type": "other",
        "restricted": false
      }
    }
  ]
}
```

{{% /tab %}}
{{< /tabs >}}

### Récupérer les autorisations d'un rôle

Renvoie une liste de toutes les autorisations d'un rôle unique.

| Méthode | Chemin de l'endpoint                       | Charge utile requise |
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
  "data": [
    {
      "type": "permissions",
      "id": "$PERMISSION_UUID",
      "attributes": {
        "name": "logs_metrics_write",
        "display_name": "Logs metrics write",
        "description": "Update a custom metric",
        "created": "2000-02-29T14:26:26.983187+00:00",
        "group_name": "Logs",
        "display_type": "other",
        "restricted": false
      }
    }
  ]
}
```

{{% /tab %}}
{{< /tabs >}}

### Accorder une autorisation à un rôle

Ajoute une autorisation à un rôle.

| Méthode | Chemin de l'endpoint                       | Charge utile requise                                                  |
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
  "data": [
    {
      "type": "permissions",
      "id": "$PERMISSION_UUID",
      "attributes": {
        "name": "logs_metrics_write",
        "display_name": "Logs metrics write",
        "description": "Update a custom metric",
        "created": "2000-02-29T14:26:26.983187+00:00",
        "group_name": "Logs",
        "display_type": "other",
        "restricted": false
      }
    }
  ]
}
```

{{% /tab %}}
{{< /tabs >}}

### Révoquer les autorisations d'un rôle

Supprime une autorisation pour un rôle.

| Méthode   | Chemin de l'endpoint                       | Charge utile requise                                                  |
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
  "data": [
    {
      "type": "permissions",
      "id": "$DIFFERENT_PERMISSION_UUID",
      "attributes": {
        "name": "logs_metrics_write",
        "display_name": "Logs metrics write",
        "description": "Update a custom metric",
        "created": "2000-02-29T14:26:26.983187+00:00",
        "group_name": "Logs",
        "display_type": "other",
        "restricted": false
      }
    }
  ]
}
```

{{% /tab %}}
{{< /tabs >}}

### Ajouter un utilisateur à un rôle

Ajoute un utilisateur à un rôle.

| Méthode | Chemin de l'endpoint                 | Charge utile requise                                      |
|--------|-------------------------------|-------------------------------------------------------|
| `POST` | `/v2/roles/<UUID_RÔLE>/users` | **data["type"]="users"**<br>**data["id"]=$USER_UUID** |

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
                 "id": <UUID_UTILISATEUR>
             }
         }'
```

Remplacez les paramètres fictifs `<VOTRE_CLÉ_API_DATADOG>` et `<VOTRE_CLÉ_APPLICATION_DATADOG>` par les [clés d'API et d'application de votre organisation][1]. Vous pouvez également récupérer l'`UUID_UTILISATEUR` via l'endpoint https://app.datadoghq.com/api/v2/current_user : celui-ci est indiqué à la ligne `id` sous le type de données `users`.

Consultez la [section UUID des autorisations](#uuid-des-autorisations) pour obtenir la liste des UUID pouvant être utilisés pour le paramètre `<UUID_RÔLE>`.

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Réponse" %}}

```json
{
  "meta": {"page": {"total_count": 1}},
  "data": [
    {
      "type": "users",
      "id": "$USER_UUID",
      "attributes": {
        "name": "Example user",
        "handle": "user@example.org",
        "created_at": "2000-02-29T14:26:26.983187+00:00",
        "email": "user@example.org",
        "icon": "https://secure.gravatar.com/avatar/abc123abc123",
        "title": null,
        "verified": true,
        "disabled": false,
        "allowed_login_methods": [],
        "status": "Active"
      },
      "relationships": {
        "roles": {"data": [{"type": "roles", "id": "$ROLE_UUID"}]},
        "org": {"data": {"type": "orgs", "id": "$ORG_UUID"}}
      }
    }
  ]
}
```

{{% /tab %}}
{{< /tabs >}}

### Supprimer le rôle d'un utilisateur

Supprime le rôle d'un utilisateur.

| Méthode   | Chemin de l'endpoint                 | Charge utile requise                                      |
|----------|-------------------------------|-------------------------------------------------------|
| `DELETE` | `/v2/roles/<UUID_RÔLE>/users` | **data["type"]="users"**<br>**data["id"]=$USER_UUID** |

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
                 "id": <UUID_UTILISATEUR>
             }
         }'
```

Remplacez les paramètres fictifs `<VOTRE_CLÉ_API_DATADOG>` et `<VOTRE_CLÉ_APPLICATION_DATADOG>` par les [clés d'API et d'application de votre organisation][1]. Vous pouvez également récupérer l'`UUID_UTILISATEUR` via l'endpoint https://app.datadoghq.com/api/v2/current_user : celui-ci est indiqué à la ligne `id` sous le type de données `users`.

Consultez la [section UUID des autorisations](#uuid-des-autorisations) pour obtenir la liste des UUID pouvant être utilisés pour le paramètre `<UUID_RÔLE>`.

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Réponse" %}}

```json
{
  "meta": {"page": {"total_count": 1}},
  "data": [
    {
      "type": "users",
      "id": "$USER_UUID",
      "attributes": {
        "name": "Example user",
        "handle": "user@example.org",
        "created_at": "2000-02-29T14:26:26.983187+00:00",
        "email": "user@example.org",
        "icon": "https://secure.gravatar.com/avatar/abc123abc123",
        "title": null,
        "verified": true,
        "disabled": false,
        "allowed_login_methods": [],
        "status": "Active"
      },
      "relationships": {
        "roles": {"data": [{"type": "roles", "id": "$ROLE_UUID"}]},
        "org": {"data": {"type": "orgs", "id": "$ORG_UUID"}}
      }
    }
  ]
}
```

{{% /tab %}}
{{< /tabs >}}

### Récupérer les utilisateurs associés à un rôle

Récupérer tous les utilisateurs associés à un rôle

| Méthode | Chemin de l'endpoint                 | Charge utile requise |
|--------|-------------------------------|------------------|
| `GET`  | `/v2/roles/<UUID_RÔLE>/users` | Aucune charge utile       |

##### ARGUMENTS

* **`page[size]`** [*facultatif*, *défaut*=**10**] :
Nombre d'utilisateurs à renvoyer pour une page donnée.
* **`page[number]`** [*facultatif*, *default*=**0**] :
Numéro de page spécifique à renvoyer.
* **`sort`** [*facultatif*, *défaut*=**name**] :
Trie les utilisateurs selon un champ donné. L'ordre de tri est **croissant** par défaut. L'ordre de tri est **décroissant** si le champ est précédé par un signe négatif (par ex. : *sort=-name*).
  * Options : **name**, **email**, **status**
* **`filter` **[*facultatif*, *défaut*=**None**] :
Filtre tous les utilisateurs selon une chaîne donnée.

{{< tabs >}}
{{% tab "Exemple" %}}

```sh
curl -X GET "https://app.datadoghq.com/api/v2/roles/<UUID_RÔLE>/users" \
     -H "DD-API-KEY: <VOTRE_CLÉ_API_DATADOG>" \
     -H "DD-APPLICATION-KEY: <VOTRE_CLÉ_APPLICATION_DATADOG>"
```

Remplacez les paramètres fictifs `<VOTRE_CLÉ_API_DATADOG>` et `<VOTRE_CLÉ_APPLICATION_DATADOG>` par les [clés d'API et d'application correspondantes de votre organisation][1]. Consultez la [section UUID des autorisations](#uuid-des-autorisations) pour obtenir la liste des UUID pouvant être utilisés pour le paramètre `<UUID_RÔLE>`.

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Réponse" %}}

```json
{
  "included": [
    {
      "type": "roles",
      "id": "$ROLE_UUID",
      "attributes": {
        "name": "$ROLE_NAME",
        "created_at": "2000-02-29T16:50:43.607749+00:00",
        "modified_at": "2000-02-29T16:50:43.607749+00:00"
      },
      "relationships": {
        "permissions": {
          "data": [
            {"type": "permissions", "id": "$PERMISSION_UUID"},
            {"type": "permissions", "id": "$PERMISSION_UUID"}
          ]
        }
      }
    }
  ],
  "meta": {"page": {"total_filtered_count": 1, "total_count": 1}},
  "data": [
    {
      "type": "users",
      "id": "$USER_UUID",
      "attributes": {
        "name": "Example user",
        "handle": "user@example.org",
        "created_at": "2000-02-29T14:26:26.983187+00:00",
        "email": "user@example.org",
        "icon": "https://secure.gravatar.com/avatar/abc123abc123",
        "title": null,
        "verified": true,
        "disabled": false,
        "allowed_login_methods": [],
        "status": "Active"
      },
      "relationships": {
        "roles": {"data": [{"type": "roles", "id": "$ROLE_UUID"}]},
        "org": {"data": {"type": "orgs", "id": "$ORG_UUID"}}
      }
    }
  ]
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
| nom                           | UUID                                 | description                                   |
|------------------------------|--------------------------------------|-----------------------------------------------|
| admin                        | 984a2bd4-d3b4-11e8-a1ff-a7f660d43029 | Accès en lecture et écriture à l'ensemble du contenu de Datadog    |
| standard                     | 984d2f00-d3b4-11e8-a200-bb47109e9987 | Accès en lecture et écriture à la majorité du contenu de Datadog   |
| logs_read_index_data         | 5e605652-dd12-11e8-9e53-375565b8970e | Accès en lecture à un sous-ensemble d'index de logs               |
| logs_modify_indexes          | 62cc036c-dd12-11e8-9e54-db9995643092 | Mise à jour de la définition des index de logs           |
| logs_live_tail               | 6f66600e-dd12-11e8-9e55-7f30fbb45e73 | Accès à la fonctionnalité Live Tail                   |
| logs_write_exclusion_filters | 7d7c98ac-dd12-11e8-9e56-93700598622d | Mise à jour d'un sous-ensemble de filtres d'exclusion       |
| logs_write_pipelines         | 811ac4ca-dd12-11e8-9e57-676a7f0beef9 | Mise à jour d'un sous-ensemble de pipelines de log           |
| logs_write_processors        | 84aa3ae4-dd12-11e8-9e58-a373a514ccd0 | Mise à jour des processeurs de log dans un index          |
| logs_write_archives          | 87b00304-dd12-11e8-9e59-cbeb5f71f72f | Mise à jour de la configuration des archives externes     |
| logs_public_config_api       | 1a92ede2-6cb2-11e9-99c6-2b3a4a0cdf0a | Accès à l'API de configuration des logs publique (lecture/écriture)        |
| logs_generate_metrics        | 979df720-aed7-11e9-99c6-a7eb8373165a | Accès à la fonctionnalité Générer des métriques            |
| dashboards_read              | d90f6830-d3d8-11e9-a77a-b3404e5e9ee2 | Possibilité de consulter les dashboards                     |
| dashboards_write             | d90f6831-d3d8-11e9-a77a-4fd230ddbc6a | Possibilité de créer et de modifier des dashboards        |
| dashboards_public_share      | d90f6832-d3d8-11e9-a77a-bf8a2607f864 | Possibilité de partager des dashboards à l'extérieur         |
| monitors_read                | 4441648c-d8b1-11e9-a77a-1b899a04b304 | Possibilité de consulter les monitors                       |
| monitors_write               | 48ef71ea-d8b1-11e9-a77a-93f408470ad0 | Possibilité de modifier, de désactiver et de supprimer des monitors  |
| monitors_downtime            | 4d87d5f8-d8b1-11e9-a77a-eb9c8350d04f | Possibilité de définir des downtimes pour vos monitors     |

{{% /tab %}}
{{% tab "Site européen de Datadog" %}}
| nom                           | UUID                                 | description                                   |
|------------------------------|--------------------------------------|-----------------------------------------------|
| admin                        | f1624684-d87d-11e8-acac-efb4dbffab1c | Accès en lecture et écriture à l'ensemble du contenu de Datadog    |
| standard                     | f1666372-d87d-11e8-acac-6be484ba794a | Accès en lecture et écriture à la majorité du contenu de Datadog   |
| logs_read_index_data         | 4fbb1652-dd15-11e8-9308-77be61fbb2c7 | Accès en lecture à un sous-ensemble d'index de logs               |
| logs_modify_indexes          | 4fbd1e66-dd15-11e8-9308-53cb90e4ef1c | Mise à jour de la définition des index de logs           |
| logs_live_tail               | 4fbeec96-dd15-11e8-9308-d3aac44f93e5 | Accès à la fonctionnalité Live Tail                   |
| logs_write_exclusion_filters | 4fc2807c-dd15-11e8-9308-d3bfffb7f039 | Mise à jour d'un sous ensemble de filtres d'exclusion       |
| logs_write_pipelines         | 4fc43656-dd15-11e8-9308-f3e2bb5e31b4 | Mise à jour d'un sous-ensemble de pipelines de log           |
| logs_write_processors        | 505f4538-dd15-11e8-9308-47a4732f715f | Mise à jour des processeurs de log dans un index          |
| logs_write_archives          | 505fd138-dd15-11e8-9308-afd2db62791e | Mise à jour de la configuration des archives externes     |
| logs_public_config_api       | bd837a80-6cb2-11e9-8fc4-339b4b012214 | Accès à l'API de configuration des logs publique (lecture/écriture)        |
| logs_generate_metrics        | 06f715e2-aed9-11e9-aac6-eb5723c0dffc | Accès à la fonctionnalité Générer des métriques            |
| dashboards_read              | 2147a4f0-d3d9-11e9-a614-83d5d3c791ee | Possibilité de consulter les dashboards                     |
| dashboards_write             | 2149e512-d3d9-11e9-a614-bb8f0dcf0205 | Possibilité de créer et de modifier des dashboards        |
| dashboards_public_share      | 214c10b2-d3d9-11e9-a614-3759c7ad528f | Possibilité de partager des dashboards à l'extérieur         |
| monitors_read                | c898551e-d8b2-11e9-a336-e3a79c23bd8d | Possibilité de consulter les monitors                       |
| monitors_write               | cdc3e3d2-d8b2-11e9-943b-e70db6c573b8 | Possibilité de modifier, de désactiver et de supprimer des monitors  |
| monitors_downtime            | d3159858-d8b2-11e9-a336-e363d6ef331b | Possibilité de définir des downtimes pour vos monitors     |

{{% /tab %}}
{{< /tabs >}}

## Accorder des autorisations dans des contextes limités

Certaines autorisations peuvent être accordées dans un contexte limité. Vous pouvez le faire manuellement à partir de la [page Pipelines][1] de l'application Datadog ou par programmation via l'API Role, en ajoutant le bon « contexte » à la charge utile. Les autorisations suivantes peuvent être accordées dans un contexte limité :

| Nom de l'autorisation                | Nom du contexte | Format                                   | Description                                                    |
|--------------------------------|------------|------------------------------------------|----------------------------------------------------------------|
| `logs_read_index_data`         | indexes    | Liste de noms d'index (chaîne)             | Accorder un accès en lecture à certains index de logs uniquement                         |
| `logs_write_exclusion_filters` | indexes    | Liste de noms d'index (chaîne)             | Autoriser la mise à jour des filtres d'exclusion pour certains index uniquement |
| `logs_write_processors`        | pipelines  | Liste d'ID de pipeline de processing (chaîne) | Autoriser la mise à jour de processeurs de certains pipelines uniquement       |

Par exemple, pour accorder à un rôle nommé `support` un accès en lecture à seulement deux index nommés `main` et` support`, votre appel d'API doit ressembler à ceci :

```sh
curl -X POST \
        https://app.datadoghq.com/api/v2/roles/<UUID_RÔLE>/permissions \
        -H "Content-Type: application/json" \
        -H "DD-API-KEY: <VOTRE_CLÉ_API_DATADOG>" \
        -H "DD-APPLICATION-KEY: <VOTRE_CLÉ_APPLICATION_DATADOG>" \
        -d '{
                "data": {
                    "type": "permissions",
                    "id": <UUID_AUTORISATION>,
                    "scope": {
                        "indexes": [
                            "main",
                            "support"
                        ]
                    }
                }
            }'
```

Pour accorder un accès en écriture à seulement deux pipelines de processing dont les ID sont respectivement `abcd-1234` et` bcde-2345`, votre appel d'API doit ressembler à ceci :

```sh
curl -X POST \
        https://app.datadoghq.com/api/v2/roles/<UUID_RÔLE>/permissions \
        -H "Content-Type: application/json" \
        -H "DD-API-KEY: <VOTRE_CLÉ_API_DATADOG>" \
        -H "DD-APPLICATION-KEY: <VOTRE_CLÉ_APPLICATION_DATADOG>" \
        -d '{
                "data": {
                    "type": "permissions",
                    "id": <UUID_AUTORISATION>,
                    "scope": {
                        "pipelines": [
                            "abcd-1234",
                            "bcde-2345"
                        ]
                    }
                }
            }'
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines
