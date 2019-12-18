---
title: API de mappage d'attributs d'authentification fédérée à un rôle
kind: documentation
beta: true
further_reading:
  - link: account_management/rbac/log_management/
    tag: Documentation
    text: RBAC pour Log Management
---
<div class="alert alert-warning">
L'API de mappage d'attributs d'authentification fédérée à un rôle est actuellement en version bêta fermée. La fonctionnalité et ses performances risquent de ne pas être optimisées, et Datadog se réserve le droit de procéder à des modifications à tout moment et sans préavis. Pour demander l'activation de cette fonctionnalité, contactez votre chargé de compte ou l'<a href="/help">assistance Datadog</a>.
</div>

Si vous utilisez un système d'authentification fédérée, cette API vous permet de mapper automatiquement des groupes d'utilisateurs à des rôles dans Datadog à l'aide d'attributs envoyés par votre fournisseur d'identité.

**Remarque** : si vous êtes un utilisateur SAML et que vous faites partie de la bêta du système de mappage fédéré existant (`roles_v2_saml`), Datadog vous conseille fortement de migrer vers cette API.

## Requêtes

Tous les endpoints d'API ci-dessous peuvent avoir deux endpoints de host différents :

* Si vous utilisez le site américain de Datadog : `https://api.datadoghq.com/api/`.
* Si vous utilisez le site européen de Datadog : `https://api.datadoghq.eu/api/`.

### Créer un mappage d'authentification

Crée un mappage d'authentification à partir d'un corps JSON. Renvoie le mappage d'authentification qui vient d'être créé.

| Méthode | Chemin de l'endpoint        | Charge utile requise |
|--------|----------------------|------------------|
| `POST` | `/v2/authn_mappings` | JSON             |

##### ARGUMENTS

* **`role_uuid`** [*obligatoire*, *défaut*=none] :
  l'`UUID` du rôle à utiliser pour le mappage. L'API Roles peut être utilisée pour créer et gérer des rôles Datadog, ainsi que pour définir les autorisations globales et les utilisateurs associés à chaque rôle. Lorsque vous créez un rôle, un UUID lui est attribué. Pour découvrir comment récupérer le `role_uuid` du rôle auquel vous souhaitez mapper les attributs, consultez la [documentation sur l'API Roles][1].
* **`attribute_key`** [*obligatoire*, *défaut*=none] :
 `attribute_key` correspond à la clé dans une paire clé/valeur, qui représente un attribut envoyé par votre fournisseur d'identité. Vous pouvez définir ces paires en fonction de vos besoins. Par exemple, `attribute_key` peut être définie sur `member-of` et `attribute_value` peut être définie sur `Development`.
* **`attribute_value`** [*obligatoire*, *défaut*=none] :
 `attribute_value` correspond à la valeur dans une paire clé/valeur, qui représente un attribut envoyé par votre fournisseur d'identité. Vous pouvez définir ces paires en fonction de vos besoins. Par exemple, `attribute_key` peut être définie sur `member-of` et `attribute_value` peut être définie sur `Development`.

{{< tabs >}}
{{% tab "Exemple" %}}

```sh
curl -X POST \
         "https://api.datadoghq.com/api/v2/authn_mappings" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <VOTRE_CLÉ_API_DATADOG>" \
         -H "DD-APPLICATION-KEY: <VOTRE_CLÉ_APPLICATION_DATADOG>" \
         -d '{
             "data": {
                 "type": "authn_mappings",
                 "attributes": {
                      "role_uuid": "123e4567-e89b-12d3-a456-426655445555",
                      "attribute_key": "member-of",
                      "attribute_value": "Development"
                }
             }
         }'
```

Remplacez les paramètres fictifs `<VOTRE_CLÉ_API_DATADOG>` et `<VOTRE_CLÉ_APPLICATION_DATADOG>` par les [clés d'API et d'application de votre organisation][1].

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Réponse" %}}

{{< code-block lang="json" filename="response.json" disable_copy="true" >}}
{
  "data": {
    "attributes": {
      "created_at": "2019-11-04 17:41:29.015504",
      "role_uuid": "00000000-0000-0000-0000-000000000000",
      "saml_assertion_attribute_id": 0
    },
    "type": "authn_mappings",
    "id": "123e4567-e89b-12d3-a456-426655440000",
    "relationships": {
      "saml_assertion_attributes": {
        "data": {
          "id": 0,
          "type": "saml_assertion_attributes"
        }
      },
      "roles": {
        "data": {
          "id": "123e4567-e89b-12d3-a456-426655440000",
          "type": "roles"
        }
      }
    }
  },
  "included": [
    {
      "data": {
        "id": "123e4567-e89b-12d3-a456-426655440000",
        "type": "roles",
        "attributes": {
          "created_at": "2019-11-04 17:41:29.015504",
          "modified_at": "2019-11-06 17:41:29.015504",
          "name": "Developer Role"
        },
        "relationships": {
          "data": [
            {
              "id": "123e4567-e89b-12d3-a456-426655441000",
              "type": "permissions"
            }
          ]
        }
      }
    },
    {
      "data": {
        "id": 6,
        "type": "saml_assertion_attributes",
        "attributes": {
          "id": 6,
          "attribute_key": "member-of",
          "attribute_value": "Development"
        }
      }
    }
  ]
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Récupérer tous les mappages d'authentification

Renvoie la liste des mappages d'authentification

| Méthode | Chemin de l'endpoint        | Charge utile requise          |
|--------|----------------------|---------------------------|
| `GET`  | `/v2/authn_mappings` | Paramètres de requête facultatifs |

##### ARGUMENTS

* **`sort`** [*facultatif*, *défaut*=**+**] :
  l'attribut et l'ordre de tri. Par défaut, le tri est effectué dans l'ordre croissant. Définir sur `-` pour trier dans l'ordre décroissant.
* **`page[number]`** [*facultatif*, *défault*=**0**, *minimum*=**0**] :
  la page de résultats à renvoyer.
* **`page[size]`** [*facultatif*, *défaut*=**10**] :
  le nombre de résultats à renvoyer par page.
* **`filter`** [*facultatif*, aucune valeur par défaut] :
  filtrer par tags sous forme de chaînes. Par exemple, `Billing Users`.

{{< tabs >}}
{{% tab "Exemple" %}}

```sh
curl -X GET "https://api.datadoghq.com/api/v2/authn_mappings" \
     -H "DD-API-KEY: <VOTRE_CLÉ_API_DATADOG>" \
     -H "DD-APPLICATION-KEY: <VOTRE_CLÉ_APPLICATION_DATADOG>"
```

Remplacez les paramètres fictifs `<VOTRE_CLÉ_API_DATADOG>` et `<VOTRE_CLÉ_APPLICATION_DATADOG>` par les [clés d'API et d'application de votre organisation][1].

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Réponse" %}}

```json
{
  "data": [
    {
      "type": "authn_mapping",
      "id": "123e4567-e89b-12d3-a456-426655440000",
      "relationships": {
        "saml_assertion_attributes": {
          "data": {
            "id": 0,
            "type": "saml_assertion_attributes"
          }
        },
        "roles": {
          "data": {
            "id": "123e4567-e89b-12d3-a456-426655440000",
            "type": "roles"
          }
        }
      },
      "attributes": {
        "created_at": "2019-11-04 17:41:29.015504",
        "role_uuid": "123e4567-e89b-12d3-a456-426655445555",
        "saml_assertion_attribute_id": 0
      }
    }
  ],
  "included": [
    {
      "data": {
        "id": "123e4567-e89b-12d3-a456-426655440000",
        "type": "roles",
        "attributes": {
          "created_at": "2019-11-04 17:41:29.015504",
          "modified_at": "2019-11-06 17:41:29.015504",
          "name": "Developer Role"
        },
        "relationships": {
          "data": [
            {
              "id": "123e4567-e89b-12d3-a456-426655440000",
              "type": "permissions"
            }
          ]
        }
      }
    },
    {
      "data": {
        "id": 6,
        "type": "saml_assertion_attributes",
        "attributes": {
          "id": 6,
          "attribute_key": "member-of",
          "attribute_value": "Developer"
        }
      }
    }
  ],
  "meta": {
    "page": {
      "total": 0,
      "page_number": 0,
      "page_size": 0
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

### Récupérer un mappage d'authentification spécifique

Renvoie un mappage d'authentification spécifique via son UUID.

| Méthode | Chemin de l'endpoint            | Charge utile requise |
|--------|--------------------------|------------------|
| `GET`  | `/authn_mappings/{UUID}` | Paramètre d'URL    |

##### ARGUMENTS

* **`{UUID}`** [*obligatoire*, aucune valeur par défaut] :
  remplacer `{UUID}` par l'UUID du mappage d'authentification à récupérer.

{{< tabs >}}
{{% tab "Exemple" %}}

```sh
curl -X GET "https://api.datadoghq.com/api/v2/authn_mappings/{UUID}" \
     -H "DD-API-KEY: <VOTRE_CLÉ_API_DATADOG>" \
     -H "DD-APPLICATION-KEY: <VOTRE_CLÉ_APPLICATION_DATADOG>"
```

Remplacez les paramètres fictifs `<VOTRE_CLÉ_API_DATADOG>` et `<VOTRE_CLÉ_APPLICATION_DATADOG>` par les [clés d'API et d'application de votre organisation][1].

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Réponse" %}}

```json
{
  "data": {
    "attributes": {
      "created_at": "2019-11-04 17:41:29.015504",
      "uuid": "123e4567-e89b-12d3-a456-426655440000",
      "role_uuid": "123e4567-e89b-12d3-a456-426655445555",
      "saml_assertion_attribute_id": 0
    },
    "type": "authn_mappings",
    "id": "123e4567-e89b-12d3-a456-426655440000",
    "relationships": {
      "saml_assertion_attributes": {
        "data": {
          "id": 0,
          "type": "saml_assertion_attributes"
        }
      },
      "roles": {
        "data": {
          "id": "123e4567-e89b-12d3-a456-426655440000",
          "type": "roles"
        }
      }
    }
  },
  "included": [
    {
      "data": {
        "id": "123e4567-e89b-12d3-a456-426655440000",
        "type": "roles",
        "attributes": {
          "created_at": "2019-11-04 17:41:29.015504",
          "modified_at": "2019-11-06 17:41:29.015504",
          "uuid": "123e4567-e89b-12d3-a456-426655440000",
          "name": "Developer Role"
        },
        "relationships": {
          "data": [
            {
              "id": "123e4567-e89b-12d3-a456-426655440000",
              "type": "permissions"
            }
          ]
        }
      }
    },
    {
      "data": {
        "id": 6,
        "type": "saml_assertion_attributes",
        "attributes": {
          "id": 6,
          "attribute_key": "member-of",
          "attribute_value": "Developer"
        }
      }
    }
  ]
}
```

{{% /tab %}}
{{< /tabs >}}

### Modifier un mappage

Modifie le `role` ou le `saml_assertion_attribute_id` d'un mappage d'authentification (ou les deux) à partir d'un corps JSON. Renvoie le mappage d'authentification mis à jour.


| Méthode  | Chemin de l'endpoint               | Charge utile requise    |
|---------|-----------------------------|---------------------|
| `PATCH` | `/v2/authn_mappings/{UUID}` | Paramètre d'URL, JSON |

##### ARGUMENTS

* **`{UUID}`** [*obligatoire*, aucune valeur par défaut] :
  remplacer `{UUID}` par l'UUID du mappage d'authentification à modifier.
* **`id`** [*obligatoire*, *défaut*=none] :
  l'UUID du mappage d'authentification à modifier. Cette propriété doit correspondre au paramètre `{UUID}` du chemin dans la requête.
* **`role_uuid`** [*obligatoire*, *défaut*=none] :
  l'API Roles peut être utilisée pour créer et gérer des rôles Datadog, ainsi que pour définir les autorisations globales et les utilisateurs associés à chaque rôle. Lorsque vous créez un rôle, un UUID lui est attribué. Pour découvrir comment récupérer le `role_uuid` d'un rôle afin de le modifier, consultez la [documentation sur l'API Roles][1].
* **`attribute_key`** [*obligatoire*, *défaut*=none] :
 `attribute_key` correspond à la clé d'une paire clé/valeur, qui représente un attribut envoyé par votre fournisseur d'identité. Vous pouvez définir ces paires en fonction de vos besoins. Par exemple, `attribute_key` peut être définie sur `member-of` et `attribute_value` peut être définie sur `Development`.
* **`attribute_value`** [*obligatoire*, *défaut*=none] :
 `attribute_value` correspond à la valeur dans une paire clé/valeur, qui représente un attribut envoyé par votre fournisseur d'identité. Vous pouvez définir ces paires en fonction de vos besoins. Par exemple, `attribute_key` peut être définie sur `member-of` et `attribute_value` peut être définie sur `Development`.

{{< tabs >}}
{{% tab "Exemple" %}}

```sh
curl -X PATCH \
         "https://api.datadoghq.com/api/v2/authn_mappings/{UUID}" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <VOTRE_CLÉ_API_DATADOG>" \
         -H "DD-APPLICATION-KEY: <VOTRE_CLÉ_APPLICATION_DATADOG>" \
         -d '{
             "data": {
                 "type": "authn_mappings",
                 "id": "{UUID}",
                 "attributes": {
                      "role_uuid": "123e4567-e89b-12d3-a456-426655445555",
                      "attribute_key": "member-of",
                      "attribute_value": "Developer"
                }
             }
         }'
```

Remplacez les paramètres fictifs `<VOTRE_CLÉ_API_DATADOG>` et `<VOTRE_CLÉ_APPLICATION_DATADOG>` par les [clés d'API et d'application de votre organisation][1].

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Réponse" %}}

```json
{
  "data": {
    "attributes": {
      "created_at": "2019-11-04 17:41:29.015504",
      "role_uuid": "123e4567-e89b-12d3-a456-426655445555",
      "saml_assertion_attribute_id": 0
    },
    "type": "authn_mappings",
    "id": "123e4567-e89b-12d3-a456-426655440000",
    "relationships": {
      "saml_assertion_attributes": {
        "data": {
          "id": 0,
          "type": "saml_assertion_attributes"
        }
      },
      "roles": {
        "data": {
          "id": "123e4567-e89b-12d3-a456-426655440000",
          "type": "roles"
        }
      }
    }
  },
  "included": [
    {
      "data": {
        "id": "123e4567-e89b-12d3-a456-426655440000",
        "type": "roles",
        "attributes": {
          "created_at": "2019-11-04 17:41:29.015504",
          "modified_at": "2019-11-06 17:41:29.015504",
          "uuid": "123e4567-e89b-12d3-a456-426655440000",
          "name": "Developer Role"
        },
        "relationships": {
          "data": [
            {
              "id": "123e4567-e89b-12d3-a456-426655440000",
              "type": "permissions"
            }
          ]
        }
      }
    },
    {
      "data": {
        "id": 6,
        "type": "saml_assertion_attributes",
        "attributes": {
          "id": 6,
          "attribute_key": "member-of",
          "attribute_value": "Developer"
        }
      }
    }
  ]
}

```

{{% /tab %}}
{{< /tabs >}}

### Supprimer un mappage

Supprime un mappage d'authentification spécifique.

| Méthode   | Chemin de l'endpoint               | Charge utile requise |
|----------|-----------------------------|------------------|
| `DELETE` | `/v2/authn_mappings/{UUID}` | Paramètre d'URL    |

##### ARGUMENTS

* **`{UUID}`** [*obligatoire*, aucune valeur par défaut] :
  remplacer `{UUID}` par l'UUID du mappage d'authentification à supprimer.

{{< tabs >}}
{{% tab "Exemple" %}}

```sh
curl -X DELETE "https://api.datadoghq.com/api/v2/authn_mappings/{UUID}" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <VOTRE_CLÉ_API_DATADOG>" \
         -H "DD-APPLICATION-KEY: <VOTRE_CLÉ_APPLICATION_DATADOG>"
```

Remplacez les paramètres fictifs `<VOTRE_CLÉ_API_DATADOG>` et `<VOTRE_CLÉ_APPLICATION_DATADOG>` par les [clés d'API et d'application de votre organisation][1].

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Réponse" %}}

```sh
HTTP/2 204
```

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/rbac/role_api/?tab=datadogussite#get-all-roles