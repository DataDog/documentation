---
aliases:
- /fr/account_management/authen_mapping/
beta: true
further_reading:
- link: /account_management/rbac/log_management/
  tag: Documentation
  text: RBAC pour Log Management
title: API de mappage d'attributs d'authentification fédérée à un rôle
---

Si vous utilisez un système d'authentification fédérée, cette API vous permet de mapper automatiquement des groupes d'utilisateurs à des rôles dans Datadog à l'aide d'attributs envoyés par votre fournisseur d'identité. Pour créer et gérer des mappages d'authentification via l'API, les utilisateurs doivent utiliser une clé d'application appartenant à un utilisateur disposant de l'autorisation de gestion de l'accès.

**Remarque** : si vous êtes un utilisateur SAML et que vous faites partie de la bêta du système de mappage fédéré existant (`roles_v2_saml`), Datadog vous conseille fortement de migrer vers cette API.

Vous pouvez également créer et gérer des mappages dans l'interface Datadog, sous l'onglet **Mappings** de la rubrique User Management. Consultez la section [Mappage de groupes SAML][1] pour en savoir plus.

## Requêtes

Tous les endpoints d'API ci-dessous utilisent l'endpoint de host suivant :

* `https://api.{{< region-param key="dd_site" >}}/api/` pour votre région Datadog.

### Créer un mappage d'authentification

Crée un mappage d'authentification à partir d'un corps JSON. Renvoie le mappage d'authentification qui vient d'être créé.

| Méthode | Chemin de l'endpoint        | Charge utile requise |
|--------|----------------------|------------------|
| `POST` | `/v2/authn_mappings` | JSON             |

##### ARGUMENTS

* **`role["data"]["id"]`** [*obligatoire*, aucune valeur par défaut] :
 `ID` du rôle à utiliser pour le mappage. L'API Roles peut être utilisée pour créer et gérer des rôles Datadog, ainsi que pour définir les autorisations globales et les utilisateurs associés à chaque rôle.
 **Remarque** : cet attribut doit être intégré au sein d'un bloc de relation `role` dans les requêtes. Consultez l'exemple ci-dessous pour en savoir plus. Lorsque vous créez un rôle, un ID lui est attribué. Pour découvrir comment récupérer l'`ID` du rôle auquel vous souhaitez mapper les attributs, consultez la [documentation sur l'API Roles][2].
* **`attributes["attribute_key"]`** [*obligatoire*, aucune valeur par défaut] :
 `attribute_key` correspond à la clé dans une paire clé/valeur, qui représente un attribut envoyé par votre fournisseur d'identité. Vous pouvez définir ces paires en fonction de vos besoins. Par exemple, `attribute_key` peut être définie sur `member-of` et `attribute_value` peut être définie sur `Development`.
* **`attributes["attribute_value"]`** [*obligatoire*, aucune valeur par défaut] :
 `attribute_value` correspond à la valeur dans une paire clé/valeur, qui représente un attribut envoyé par votre fournisseur d'identité. Vous pouvez définir ces paires en fonction de vos besoins. Par exemple, `attribute_key` peut être définie sur `member-of` et `attribute_value` peut être définie sur `Development`.

{{< tabs >}}
{{% tab "Exemple" %}}

```sh
curl -X POST \
    "https://api.<VOTRE_SITE_DD>/api/v2/authn_mappings" \
    -H "Content-Type: application/json" \
    -H "DD-API-KEY: <VOTRE_CLÉ_API_DATADOG>" \
    -H "DD-APPLICATION-KEY: <VOTRE_CLÉ_APPLICATION_DATADOG>" \
    -d '{
            "data": {
                "type": "authn_mappings",
                "attributes": {
                    "attribute_key": "member-of",
                    "attribute_value": "Development"
                },
                "relationships": {
                    "role": {
                        "data": {
                            "id": "123e4567-e89b-12d3-a456-426655445555",
                            "type": "roles"
                        }
                    }
                }
            }
        }'
```

- Remplacez `<VOTRE_CLÉ_API_DATADOG>` et `<VOTRE_CLÉ_APPLICATION_DATADOG>` par les [clés d'API et d'application][1] de votre organisation.
- Remplacez `<VOTRE_SITE_DD>` par {{< region-param key="dd_site" code="true" >}}.

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Réponse" %}}

```json
{
    "data": {
        "attributes": {
            "created_at": "2019-11-04 17:41:29.015504",
            "modified_at": "2019-11-04 17:41:29.015504",
            "role_uuid": "00000000-0000-0000-0000-000000000000",
            "saml_assertion_attribute_id": 0
        },
        "type": "authn_mappings",
        "id": "123e4567-e89b-12d3-a456-426655440000",
        "relationships": {
            "saml_assertion_attribute": {
                "data": {
                    "id": 0,
                    "type": "saml_assertion_attributes"
                }
            },
            "role": {
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
                    "permissions": {
                        "data": [
                            {
                                "id": "123e4567-e89b-12d3-a456-426655441000",
                                "type": "permissions"
                            }
                        ]
                    }
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
```

{{% /tab %}}
{{< /tabs >}}

### Récupérer tous les mappages d'authentification

Renvoie la liste des mappages d'authentification

| Méthode | Chemin de l'endpoint        | Charge utile requise          |
|--------|----------------------|---------------------------|
| `GET`  | `/v2/authn_mappings` | Paramètres de requête facultatifs |

##### ARGUMENTS

* **`sort`** [*facultatif*, *valeur par défaut*=**created\_at**] :
  l'attribut et l'ordre de tri. Par défaut, le tri est effectué dans l'ordre croissant. Utilisez `-<attribute>` pour trier dans l'ordre décroissant. Il est également possible d'effectuer le tri en fonction des attributs de relation `role.name`, `saml_assertion_attribute.attribute_key` et `saml_assertion_attribute.attribute_value`.
* **`page[number]`** [*facultatif*, *défault*=**0**, *minimum*=**0**] :
  la page de résultats à renvoyer.
* **`page[size]`** [*facultatif*, *défaut*=**10**] :
  le nombre de résultats à renvoyer par page.
* **`filter`** [*facultatif*, aucune valeur par défaut] :
  filtre par tags sous forme de chaînes. Par exemple, `Billing Users`.

{{< tabs >}}
{{% tab "Exemple" %}}

```sh
curl -X GET "https://api.<VOTRE_SITE_DD>/api/v2/authn_mappings" \
     -H "DD-API-KEY: <VOTRE_CLÉ_API_DATADOG>" \
     -H "DD-APPLICATION-KEY: <VOTRE_CLÉ_APPLICATION_DATADOG>"
```

- Remplacez `<VOTRE_CLÉ_API_DATADOG>` et `<VOTRE_CLÉ_APPLICATION_DATADOG>` par les [clés d'API et d'application][1] de votre organisation.
- Remplacez `<VOTRE_SITE_DD>` par {{< region-param key="dd_site" code="true" >}}.

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
          "saml_assertion_attribute": {
            "data": {"id": 0, "type": "saml_assertion_attributes"}
          },
          "role": {
            "data": {
              "id": "123e4567-e89b-12d3-a456-426655440000",
              "type": "roles"
            }
          }
        },
        "attributes": {
          "created_at": "2019-11-04 17:41:29.015504",
          "modified_at": "2019-11-04 17:41:29.015504",
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
            "permissions": {
                "data": [
                  {
                    "id": "123e4567-e89b-12d3-a456-426655440000",
                    "type": "permissions"
                  }
                ]
            }
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
        "total_count": 1,
        "total_filtered_count": 1,
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
| `GET`  | `/authn_mappings/{authn_mapping_id}` | Paramètre d'URL    |

##### ARGUMENTS

* **`{authn_mapping_id}`** [*obligatoire*, aucune valeur par défaut] :
  remplace `{authn_mapping_id}` par l'ID du mappage d'authentification à récupérer.

{{< tabs >}}
{{% tab "Exemple" %}}

```sh
curl -X GET "https://api.<VOTRE_SITE_DD>/api/v2/authn_mappings/{authn_mapping_id}" \
     -H "DD-API-KEY: <VOTRE_CLÉ_API_DATADOG>" \
     -H "DD-APPLICATION-KEY: <VOTRE_CLÉ_APPLICATION_DATADOG>"
```

- Remplacez `<VOTRE_CLÉ_API_DATADOG>` et `<VOTRE_CLÉ_APPLICATION_DATADOG>` par les [clés d'API et d'application][1] de votre organisation.
- Remplacez `<VOTRE_SITE_DD>` par {{< region-param key="dd_site" code="true" >}}.

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Réponse" %}}

```json
{
    "data": {
        "attributes": {
            "created_at": "2019-11-04 17:41:29.015504",
            "modified_at": "2019-11-04 17:41:29.015504",
            "uuid": "123e4567-e89b-12d3-a456-426655440000",
            "saml_assertion_attribute_id": 0
        },
        "type": "authn_mappings",
        "id": "123e4567-e89b-12d3-a456-426655440000",
        "relationships": {
            "saml_assertion_attribute": {
                "data": {
                    "id": 0,
                    "type": "saml_assertion_attributes"
                }
            },
            "role": {
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
                    "permissions": {
                        "data": [
                            {
                                "id": "123e4567-e89b-12d3-a456-426655440000",
                                "type": "permissions"
                            }
                        ]
                    }
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

| Méthode  | Chemin de l'endpoint                           | Charge utile requise    |
|---------|-----------------------------------------|---------------------|
| `PATCH` | `/v2/authn_mappings/{authn_mapping_id}` | Paramètre d'URL, JSON |

##### ARGUMENTS

* **`{authn_mapping_id}`** [*obligatoire*, aucune valeur par défaut] :
  remplace `{authn_mapping_id}` par l'ID du mappage d'authentification à mettre à jour. Cette valeur est requise dans le chemin et dans le corps de la requête.
* **`role["data"]["id"]`** [*facultatif*, *aucune valeur par défaut*] :
 `ID` du rôle à utiliser pour le mappage. L'API Roles peut être utilisée pour créer et gérer des rôles Datadog, ainsi que pour définir les autorisations globales et les utilisateurs associés à chaque rôle.
 **Remarque** : cet attribut doit être intégré au sein d'un bloc de relation `role` dans les requêtes. Consultez l'exemple ci-dessous pour en savoir plus. Lorsque vous créez un rôle, un ID lui est attribué. Pour découvrir comment récupérer l'`ID` du rôle auquel vous souhaitez mapper les attributs, consultez la [documentation sur l'API Roles][2].
* **`attributes["attribute_key"]`** [*facultatif*, *aucune valeur par défaut*] :
 `attribute_key` correspond à la clé dans une paire clé/valeur, qui représente un attribut envoyé par votre fournisseur d'identité. Vous pouvez définir ces paires en fonction de vos besoins. Par exemple, `attribute_key` peut être définie sur `member-of` et `attribute_value` peut être définie sur `Development`.
* **`attributes["attribute_value"]`** [*facultatif*, *aucune valeur par défaut*] :
 `attribute_value` correspond à la valeur dans une paire clé/valeur, qui représente un attribut envoyé par votre fournisseur d'identité. Vous pouvez définir ces paires en fonction de vos besoins. Par exemple, `attribute_key` peut être définie sur `member-of` et `attribute_value` peut être définie sur `Development`.

{{< tabs >}}
{{% tab "Exemple" %}}

```sh
curl -X PATCH \
    "https://api.<VOTRE_SITE_DD>/api/v2/authn_mappings/{UUID}" \
    -H "Content-Type: application/json" \
    -H "DD-API-KEY: <VOTRE_CLÉ_API_DATADOG>" \
    -H "DD-APPLICATION-KEY: <VOTRE_CLÉ_APPLICATION_DATADOG>" \
    -d '{
            "data": {
                "type": "authn_mappings",
                "id": "{authn_mapping_id}",
                "attributes": {
                    "attribute_key": "member-of",
                    "attribute_value": "Developer"
                }
                "relationships": {
                "role": {
                    "data": {
                            "id": "123e4567-e89b-12d3-a456-426655440000",
                            "type": "roles"
                        }
                    }
                }
            }
        }'
```

- Remplacez `<VOTRE_CLÉ_API_DATADOG>` et `<VOTRE_CLÉ_APPLICATION_DATADOG>` par les [clés d'API et d'application][1] de votre organisation.
- Remplacez `<VOTRE_SITE_DD>` par {{< region-param key="dd_site" code="true" >}}.

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Réponse" %}}

```json
{
    "data": {
        "attributes": {
            "created_at": "2019-11-04 17:41:29.015504",
            "modified_at": "2019-11-04 17:41:29.015504",
            "saml_assertion_attribute_id": 0
        },
        "type": "authn_mappings",
        "id": "123e4567-e89b-12d3-a456-426655440000",
        "relationships": {
            "saml_assertion_attribute": {
                "data": {
                    "id": 0,
                    "type": "saml_assertion_attributes"
                }
            },
            "role": {
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

| Méthode   | Chemin de l'endpoint                           | Charge utile requise |
|----------|-----------------------------------------|------------------|
| `DELETE` | `/v2/authn_mappings/{authn_mapping_id}` | Paramètre d'URL    |

##### ARGUMENTS

* **`{authn_mapping_id}`** [*obligatoire*, aucune valeur par défaut] :
  remplace `{authn_mapping_id}` par l'ID du mappage d'authentification à supprimer.

{{< tabs >}}
{{% tab "Exemple" %}}

```sh
curl -X DELETE "https://api.<VOTRE_SITE_DD>/api/v2/authn_mappings/{UUID}" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <VOTRE_CLÉ_API_DATADOG>" \
         -H "DD-APPLICATION-KEY: <VOTRE_CLÉ_APPLICATION_DATADOG>"
```

- Remplacez `<VOTRE_CLÉ_API_DATADOG>` et `<VOTRE_CLÉ_APPLICATION_DATADOG>` par les [clés d'API et d'application][1] de votre organisation.
- Remplacez `<VOTRE_SITE_DD>` par {{< region-param key="dd_site" code="true" >}}.

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Réponse" %}}

```sh
HTTP/2 204
```

{{% /tab %}}
{{< /tabs >}}

### Récupérer l'indicateur d'activation d'un mappage d'authentification

Vérifiez si des mappages d'authentification sont activés ou désactivés.

| Méthode   | Chemin de l'endpoint              | Charge utile requise |
|----------|----------------------------|------------------|
| `GET`    | `/v1/org_preferences`      | Aucun             |

{{< tabs >}}
{{% tab "Exemple" %}}

```sh
curl -X GET \
         "https://api.<VOTRE_SITE_DD>/api/v1/org_preferences" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <VOTRE_CLÉ_API_DATADOG>" \
         -H "DD-APPLICATION-KEY: <VOTRE_CLÉ_APPLICATION_DATADOG>" \
```

- Remplacez `<VOTRE_CLÉ_API_DATADOG>` et `<VOTRE_CLÉ_APPLICATION_DATADOG>` par les [clés d'API et d'application][1] de votre organisation.
- Remplacez `<VOTRE_SITE_DD>` par {{< region-param key="dd_site" code="true" >}}.

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Réponse" %}}

```json
{
  "data": {
    "attributes": {
        "preference_data": "saml_authn_mapping_roles",
        "preference_type": true
    },
    "type": "org_preferences",
    "id": 1,
  },
}
```

{{% /tab %}}
{{< /tabs >}}

### Activer ou désactiver tous les mappages

<div class="alert alert-warning">
Lorsque les mappages sont activés, tous les utilisateurs qui se connectent via SAML verront leurs rôles retirés puis réattribués en fonction des valeurs de leur assertion SAML. Assurez-vous de vérifier que vous recevez bien les assertions SAML prévues dans votre connexion avant d'activer l'application des mappages.
</div>

Active/désactive l'application de tous les mappages d'authentification.

| Méthode   | Chemin de l'endpoint               | Charge utile requise |
|----------|-----------------------------|------------------|
| `POST`   | `/v1/org_preferences`       | JSON             |

##### ARGUMENTS

* **`{preference_type}`** [*obligatoire*, aucune valeur par défaut] :
  préférence à mettre à jour, doit être « saml_authn_mapping_roles ».
* **`{preference_data}`** [*obligatoire*, aucune valeur par défaut] :
  données avec lesquelles mettre à jour la préférence. Doit être true ou false : true pour activer tous les mappages, false pour les désactiver.

{{< tabs >}}
{{% tab "Exemple" %}}

```sh
curl -X POST \
    "https://api.<VOTRE_SITE_DD>/api/v1/org_preferences" \
    -H "Content-Type: application/json" \
    -H "DD-API-KEY: <VOTRE_CLÉ_API_DATADOG>" \
    -H "DD-APPLICATION-KEY: <VOTRE_CLÉ_APPLICATION_DATADOG>" \
    -d '{
        "data": {
            "type": "org_preferences",
            "attributes": {
                "preference_type": "saml_authn_mapping_roles",
                "preference_data": true
            }
        }
    }'
`
```

- Remplacez `<VOTRE_CLÉ_API_DATADOG>` et `<VOTRE_CLÉ_APPLICATION_DATADOG>` par les [clés d'API et d'application][1] de votre organisation.
- Remplacez `<VOTRE_SITE_DD>` par {{< region-param key="dd_site" code="true" >}}.

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Réponse" %}}

```json
{
  "data": {
    "attributes": {
        "preference_type": "saml_authn_mapping_roles",
        "preference_data": true
    },
    "type": "org_preferences",
    "id": 1,
  },
}
```

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/saml/mapping
[2]: /fr/api/v2/roles/#list-roles