---
title: API Roles
kind: documentation
private: true
beta: true
further_reading:
- link: account_management/rbac/log_management/
  tag: Documentation
  text: RBAC pour Log Management
---

<div class="alert alert-warning">
Demandez à votre représentant commercial ou responsable du succès client d'activer cette fonctionnalité.
</div>

L'API Roles peut être utilisée pour créer et gérer des rôles Datadog, ainsi que pour définir les autorisations globales et les utilisateurs associés à chaque rôle.

Les autorisations d'accès à des ressources de comptes spécifiques peuvent être accordées à des rôles dans l'application Datadog sans utiliser cette API. Par exemple, l'accès en lecture à un index de log spécifique peut être accordé à un rôle dans l'application Datadog depuis la [page Pipelines][1]. 

### Récupérer tous les rôles

Description : renvoie tous les rôles, y compris leurs noms et UUID.  
Méthode : GET  
Endpoint : `api/v1/roles`  
Charge utile requise : aucune charge utile

##### ARGUMENTS


* **`sort_field`** [*facultatif*, *défaut*=**name**] :
    trie les rôles selon un champ donné.
    Valeurs autorisées : **name**
* **`sort_dir`** [*facultatif*, *défaut*=**asc**] :
    l'ordre de tri.
    Valeurs autorisées : **asc** ou **desc**.
* **`start`** [*facultatif*, *défaut*=**0**] :
    Nombre par page
* **`count`** [*facultatif*, *défaut*=**10**] :
     Nombre de rôles à renvoyer par page.

Exemple :

```sh
curl -X GET "https://app.datadoghq.com/api/v1/roles?api_key=${CLÉ_API}&application_key=${CLÉ_APP}"

# Réponse :
# [{
#   "id": <nombre>,
#   "name": <chaîne>,
#   "uuid": <chaîne>
#  }, ...]
```

### Récupérer un rôle

Description : renvoie un rôle spécifique, y compris son nom et son UUID.  
Méthode : GET  
Endpoint : `api/v1/roles/$UUID_RÔLE`  
Charge utile requise : aucune charge utile  
Exemple :

```sh
curl -X GET "https://app.datadoghq.com/api/v1/roles/${UUIDRÔLE}?api_key=${CLÉ_API}&application_key=${CLÉ_APP}"

# Response:
# {
#  "id": <nombre>,
#  "name": <chaîne>,
#  "uuid": <chaîne>
# }
```

### Créer un rôle

Description : crée un rôle. Renvoie l'UUID et le nom du rôle.  
Méthode : POST  
Endpoint : `api/v1/roles`  
Charge utile requise : « nom »  
Exemple :

```sh
curl -X POST -H "Content-type: application/json" -d "{\"name\":\"${NOMRÔLE}\"}" "https://app.datadoghq.com/api/v1/roles?api_key=${CLÉ_API}&application_key=${CLÉ_APP}"
```

### Mettre à jour le rôle

Description : met à jour le nom d'un rôle existant. Renvoie l'UUID et le nom du rôle.  
Méthode : PUT  
Endpoint : `api/v1/roles/$UUID_RÔLE`  
Charge utile : « nom »  
Exemple :

```sh
curl -X PUT -H "Content-type: application/json" -d "{\"name\":\"${NOMRÔLE}\"}" "https://app.datadoghq.com/api/v1/roles/${UUIDRÔLE}?api_key=${CLÉ_API}&application_key=${CLÉ_APP}"
```

### Supprimer le rôle

Description : supprime un rôle.  
Méthode : DELETE  
Endpoint : `api/v1/roles/$UUID_RÔLE`  
Charge utile requise : aucune charge utile  
Exemple :

```sh
curl -X DELETE "https://app.datadoghq.com/api/v1/roles/${UUIDRÔLE}?api_key=${CLÉ_API}&application_key=${CLÉ_APP}"
```

### Récupérer les autorisations

Description : renvoie une liste de toutes les autorisations, y compris le nom, la description, l'uuid.  
Méthode : GET  
Endpoint : `api/v1/permissions`  
Charge utile requise : aucune charge utile  
Exemple :

```sh
curl -X GET "https://app.datadoghq.com/api/v1/permissions?api_key=${CLÉ_API}&application_key=${CLÉ_APP}"

# Réponse :
# [{
#   "created_at": <chaîne>,
#   "description": <chaîne>,
#   "display_name": <chaîne>,
#   "uuid": <chaîne>,
#   "name": <chaîne>
# }, ...]
```

### Accorder une autorisation à un rôle

Description : ajoute une autorisation à un rôle.  
Méthode : POST  
Endpoint : `api/v1/role/$UUID_RÔLE/permissions/$UUID_AUTORISATION`  
Charge utile requise : vide (`{}`)  
Exemple :

```sh
curl -X POST -H "Content-type: application/json" -d "{}" "https://app.datadoghq.com/api/v1/role/${UUIDRÔLE}/permissions/${AUTORISATION}?api_key=${CLÉ_API}&application_key=${CLÉ_APP}"
```

### Révoquer une autorisation d'un rôle

Description : supprime l'autorisation d'un rôle.  
Méthode : DELETE  
Endpoint : `api/v1/role/$UUID_RÔLE/permissions/$UUID_AUTORISATION`  
Charge utile requise : vide (`{}`)  
Exemple :

```sh
curl -X DELETE -H "Content-type: application/json" -d "{}" "https://app.datadoghq.com/api/v1/role/${UUIDRÔLE}/permissions/${AUTORISATION}?api_key=${CLÉ_API}&application_key=${CLÉ_APP}"
```

### Ajouter un utilisateur à un rôle

Description : Ajoute un utilisateur à un rôle.  
Méthode : POST  
Endpoint : `api/v1/roles/$RUUID_RÔLE/user/$HANDLE_UTILISATEUR`  
Charge utile requise : vide (`{}`)  
Exemple :

```sh
curl -X POST -H "Content-type: application/json" -d "{}" "https://app.datadoghq.com/api/v1/roles/${UUIDRÔLE}/user/${UTILISATEUR}?api_key=${CLÉ_API}&application_key=${CLÉ_APP}"
```

### Supprimer le rôle d'un utilisateur

Description : supprime le rôle d'un utilisateur.  
Méthode : DELETE  
Endpoint : `api/v1/roles/$UUID_RÔLE/user/$HANDLE_UTILISATEUR`  
Charge utile requise : vide (`{}`)  
Exemple :

```sh
curl -X DELETE -H "Content-type: application/json" -d "{}" "https://app.datadoghq.com/api/v1/roles/${UUIDRÔLE}/user/${UTILISATEUR}?api_key=${CLÉ_API}&application_key=${CLÉ_APP}"
```

## UUID des autorisations

Vous devez désormais consulter et utiliser l'UUID du rôle (A) et de l'autorisation (B) afin d'accorder une autorisation globale à un rôle ou de retirer une autorisation.

L'UUID d'un rôle peut être trouvé dans l'appel d'API `GET roles`.

Les UUID des autorisations sont les suivants :

{{< tabs >}}
{{% tab "Site américain de Datadog" %}}
|             nom             |                 uuid                 |                 description                  |
|------------------------------|--------------------------------------|----------------------------------------------|
| admin                        | 984a2bd4-d3b4-11e8-a1ff-a7f660d43029 | Autorisations de lecture/écriture sur l'ensemble du contenu de Datadog  |
| standard                     | 984d2f00-d3b4-11e8-a200-bb47109e9987 | Autorisations de lecture/écriture sur la plupart du contenu de Datadog |
| read_only                    | 984fe6fa-d3b4-11e8-a201-47a7999cc331 | Autorisations de lecture sur la plupart du contenu de Datadog           |
| logs_read_index_data         | 5e605652-dd12-11e8-9e53-375565b8970e | Lecture d'un sous-ensemble de tous les index de log             |
| logs_modify_indexes          | 62cc036c-dd12-11e8-9e54-db9995643092 | Mise à jour de la définition des index de log         |
| logs_live_tail               | 6f66600e-dd12-11e8-9e55-7f30fbb45e73 | Accès à la fonctionnalité Live Tail                 |
| logs_write_exclusion_filters | 7d7c98ac-dd12-11e8-9e56-93700598622d | Mise à jour d'un sous-ensemble des filtres d'exclusion     |
| logs_write_pipelines         | 811ac4ca-dd12-11e8-9e57-676a7f0beef9 | Mise à jour d'un sous-ensemble de pipelines de log         |
| logs_write_processors        | 84aa3ae4-dd12-11e8-9e58-a373a514ccd0 | Mise à jour des processeurs de log dans un index        |
| logs_write_archives          | 87b00304-dd12-11e8-9e59-cbeb5f71f72f | Mise à jour de la configuration des archives externes   |
| logs_public_config_api       | 1a92ede2-6cb2-11e9-99c6-2b3a4a0cdf0a | Accès à l'API de configuration des logs publique      |

{{% /tab %}}
{{% tab "Site européen de Datadog" %}}
|             nom             |                 uuid                 |                 description                  |
|------------------------------|--------------------------------------|----------------------------------------------|
| admin                        | f1624684-d87d-11e8-acac-efb4dbffab1c | Autorisations de lecture/écriture sur l'ensemble du contenu de Datadog  |
| standard                     | f1666372-d87d-11e8-acac-6be484ba794a | Autorisations de lecture/écriture sur la plupart du contenu de Datadog |
| read_only                    | f1682b6c-d87d-11e8-acac-9f3040c65f48 | Autorisations de lecture sur la plupart du contenu de Datadog           |
| logs_read_index_data         | 4fbb1652-dd15-11e8-9308-77be61fbb2c7 | Lecture d'un sous-ensemble de tous les index de log             |
| logs_modify_indexes          | 4fbd1e66-dd15-11e8-9308-53cb90e4ef1c | Mise à jour de la définition des index de log         |
| logs_live_tail               | 4fbeec96-dd15-11e8-9308-d3aac44f93e5 | Accès à la fonctionnalité Live Tail                 |
| logs_write_exclusion_filters | 4fc2807c-dd15-11e8-9308-d3bfffb7f039 | Mise à jour d'un sous-ensemble des filtres d'exclusion     |
| logs_write_pipelines         | 4fc43656-dd15-11e8-9308-f3e2bb5e31b4 | Mise à jour d'un sous-ensemble de pipelines de log         |
| logs_write_processors        | 505f4538-dd15-11e8-9308-47a4732f715f | Mise à jour des processeurs de log dans un index        |
| logs_write_archives          | 505fd138-dd15-11e8-9308-afd2db62791e | Mise à jour de la configuration des archives externes   |
| logs_public_config_api       | bd837a80-6cb2-11e9-8fc4-339b4b012214 | Accès à l'API de configuration des logs publique      |

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines
