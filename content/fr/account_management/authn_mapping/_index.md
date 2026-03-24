---
aliases:
- /fr/account_management/authen_mapping/
beta: true
description: Associez automatiquement les groupes de fournisseurs d'identité aux rôles
  Datadog en utilisant l'Authentication Mapping API pour les systèmes d'authentification
  fédérés.
further_reading:
- link: /account_management/rbac/log_management/
  tag: Documentation
  text: RBAC pour la gestion des logs.
title: API de mapping des rôles pour l'authentification fédérée.
---
Si vous utilisez des mécanismes d'authentification fédérée, cette API vous permet d'associer automatiquement des groupes d'utilisateurs aux rôles dans Datadog en utilisant les attributs envoyés par votre fournisseur d'identité. Pour créer et gérer des mappings d'authentification via l'API, les utilisateurs doivent utiliser une clé d'application appartenant à une personne disposant de la permission de gestion des accès.

**Remarque** : Si vous êtes un utilisateur SAML, Datadog recommande fortement de passer à l'utilisation de cette API.

Vous pouvez également créer et gérer des mappings dans l'interface utilisateur de Datadog, dans l'onglet **Mappings** de la gestion des utilisateurs. Voir [mapping de groupe SAML][1] pour plus d'informations.

## Requêtes

Tous les points de terminaison de l'API ci-dessous utilisent le point de terminaison d'hôte suivant :

* `https://api.{{< region-param key="dd_site" >}}/api/` pour votre région Datadog.

### Créez un nouveau mapping d'authentification.

Créez un nouveau mapping AuthN à partir d'un corps JSON. Renvoie le nouveau mappage AuthN créé.

| Méthode | Chemin du point de terminaison | Charge utile requise |
|--------|----------------------|------------------|
| `POST` | `/v2/authn_mappings` | JSON             |

##### ARGUMENTS

* **`role["data"]["id"]`** [* requis *, pas de valeur par défaut] :
 Le `ID` du rôle à mapper. L'API des rôles peut être utilisée pour créer et gérer les rôles Datadog, les permissions globales qu'ils accordent et les utilisateurs qui leur appartiennent.
 **Remarque** : Cet attribut doit être présenté comme faisant partie d'un bloc de relation `role` dans les requêtes. Voir l'exemple ci-dessous pour plus de détails. Lorsque vous créez un rôle, il se voit attribuer un ID. Pour plus d'informations sur la recherche du `ID` pour le rôle que vous souhaitez associer, consultez la [documentation de l'API des rôles][2].
* **`attributes["attribute_key"]`** [* requis *, pas de valeur par défaut] :
 Le `attribute_key` est la partie clé d'une paire clé/valeur qui représente un attribut envoyé par votre fournisseur d'identité. Vous pouvez définir ceux-ci pour votre propre cas d'utilisation. Par exemple, `attribute_key` pourrait être `member-of` et le `attribute_value` pourrait être `Development`.
* **`attributes["attribute_value"]`** [* requis *, pas de valeur par défaut] :
 Le `attribute_value` est la partie valeur d'une paire clé/valeur qui représente un attribut envoyé par votre fournisseur d'identité. Vous pouvez définir ceux-ci pour votre propre cas d'utilisation. Par exemple, `attribute_key` pourrait être `member-of` et le `attribute_value` pourrait être `Development`.

{{< tabs >}}
{{% tab "Exemple" %}}

```sh
curl -X POST \
    "https://api.<YOUR_DD_SITE>/api/v2/authn_mappings" \
    -H "Content-Type: application/json" \
    -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
    -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
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

- Remplacez `<YOUR_DATADOG_API_KEY>` et `<YOUR_DATADOG_APPLICATION_KEY>` par les clés [API et application correspondantes][1] pour votre organisation.
- Remplacez `<YOUR_DD_SITE>` par {{< region-param key="dd_site" code="true" >}}

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

### Obtenir tous les mappages AuthN

Renvoie une liste de mappages AuthN

| Méthode | Chemin de l'endpoint        | Charge utile requise          |
|--------|----------------------|---------------------------|
| `GET`  | `/v2/authn_mappings` | Paramètres de requête optionnels |

##### ARGUMENTS

* **`sort`** [*optionnel*, *par défaut*=**created\_at**] :
  Attribut de tri et direction—par défaut en ordre croissant, `-<attribute>` trie en ordre décroissant. Peut également trier sur les attributs de relation `role.name`, `saml_assertion_attribute.attribute_key`, `saml_assertion_attribute.attribute_value`.
* **`page[number]`** [*optionnel*, *par défaut*=**0**, *minimum*=**0**] :
  La page de résultats à retourner.
* **`page[size]`** [*optionnel*, *par défaut*=**10**] :
  Le nombre de résultats à retourner sur chaque page.
* **`filter`** [*optionnel*, par défaut=aucun] :
  Filtrer par tags sous forme de chaînes. Par exemple, `Billing Users`.

{{< tabs >}}
{{% tab "Exemple" %}}

```sh
curl -X GET "https://api.<YOUR_DD_SITE>/api/v2/authn_mappings" \
     -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
     -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>"
```

- Remplacez `<YOUR_DATADOG_API_KEY>` et `<YOUR_DATADOG_APPLICATION_KEY>` par les clés [API et application correspondantes][1] pour votre organisation.
- Remplacer `<YOUR_DD_SITE>` par {{< region-param key="dd_site" code="true" >}}

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

### Obtenir un mappage AuthN spécifique

Renvoie un mappage AuthN spécifique par UUID.

| Méthode | Chemin de l'endpoint | Charge utile requise |
|--------|--------------------------|------------------|
| `GET`  | `/authn_mappings/{authn_mapping_id}` | Paramètre d'URL |

##### ARGUMENTS

* **`{authn_mapping_id}`** [* requis *, pas de valeur par défaut] :
  Remplacez `{authn_mapping_id}` par l'ID du mappage AuthN que vous souhaitez consulter.

{{< tabs >}}
{{% tab "Exemple" %}}

```sh
curl -X GET "https://api.<YOUR_DD_SITE>/api/v2/authn_mappings/{authn_mapping_id}" \
     -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
     -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>"
```

- Remplacez `<YOUR_DATADOG_API_KEY>` et `<YOUR_DATADOG_APPLICATION_KEY>` par les clés [API et application correspondantes][1] pour votre organisation.
- Remplacer `<YOUR_DD_SITE>` par {{< region-param key="dd_site" code="true" >}}

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

### Mettre à jour le mappage

Met à jour le mappage AuthN `role`, `saml_assertion_attribute_id`, ou les deux à partir d'un corps JSON. Renvoie le mappage AuthN mis à jour.

| Méthode | Chemin de l'endpoint | Charge utile requise |
|---------|-----------------------------------------|---------------------|
| `PATCH` | `/v2/authn_mappings/{authn_mapping_id}` | Paramètre d'URL, JSON |

##### ARGUMENTS

* **`{authn_mapping_id}`** [* requis *, pas de valeur par défaut] :
  Remplacez `{authn_mapping_id}` par l'ID du mappage AuthN que vous souhaitez mettre à jour. Ceci est requis à la fois dans le chemin de la requête et dans le corps de la requête.
* **`role["data"]["id"]`** [* optionnel *, * par défaut * = aucun] :
 Le `ID` du rôle à mapper. L'API des rôles peut être utilisée pour créer et gérer les rôles Datadog, les permissions globales qu'ils accordent et les utilisateurs qui leur appartiennent.
 **Remarque** : Cet attribut doit être présenté comme faisant partie d'un bloc de relation `role` dans les requêtes. Voir l'exemple ci-dessous pour plus de détails. Lorsque vous créez un rôle, il se voit attribuer un ID. Pour plus d'informations sur la recherche du `ID` pour le rôle que vous souhaitez associer, consultez la [documentation de l'API des rôles][2].
* **`attributes["attribute_key"]`** [* optionnel *, * par défaut *= aucun]:
 Le `attribute_key` est la partie clé d'une paire clé/valeur qui représente un attribut envoyé par votre fournisseur d'identité. Vous pouvez définir ceux-ci pour votre propre cas d'utilisation. Par exemple, `attribute_key` pourrait être `member-of` et le `attribute_value` pourrait être `Development`.
* **`attributes["attribute_value"]`** [* optionnel *, * par défaut *= aucun]:
 Le `attribute_value` est la partie valeur d'une paire clé/valeur qui représente un attribut envoyé par votre fournisseur d'identité. Vous pouvez définir ceux-ci pour votre propre cas d'utilisation. Par exemple, `attribute_key` pourrait être `member-of` et le `attribute_value` pourrait être `Development`.

{{< tabs >}}
{{% tab "Exemple" %}}

```sh
curl -X PATCH \
    "https://api.<YOUR_DD_SITE>/api/v2/authn_mappings/{UUID}" \
    -H "Content-Type: application/json" \
    -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
    -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
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

- Remplacez `<YOUR_DATADOG_API_KEY>` et `<YOUR_DATADOG_APPLICATION_KEY>` par les clés [API et application correspondantes][1] pour votre organisation.
- Remplacez `<YOUR_DD_SITE>` par {{< region-param key="dd_site" code="true" >}}

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

### Supprimer le mapping

Supprime un mapping AuthN spécifique.

| Méthode   | Chemin d'endpoint                           | Charge utile requise |
|----------|-----------------------------------------|------------------|
| `DELETE` | `/v2/authn_mappings/{authn_mapping_id}` | Paramètre d'URL |

##### ARGUMENTS

* **`{authn_mapping_id}`** [* requis *, pas de valeur par défaut] :
  Remplacez `{authn_mapping_id}` par l'ID de la correspondance AuthN que vous souhaitez supprimer.

{{< tabs >}}
{{% tab "Exemple" %}}

```sh
curl -X DELETE "https://api.<YOUR_DD_SITE>/api/v2/authn_mappings/{UUID}" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
         -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>"
```

- Remplacez `<YOUR_DATADOG_API_KEY>` et `<YOUR_DATADOG_APPLICATION_KEY>` par les clés [API et application correspondantes][1] pour votre organisation.
- Remplacez `<YOUR_DD_SITE>` par {{< region-param key="dd_site" code="true" >}}

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Réponse" %}}

```sh
HTTP/2 204
```

{{% /tab %}}
{{< /tabs >}}

### Obtenir l'activation du mapping AuthN

Vérifiez si les mappings AuthN sont activés ou désactivés.

| Méthode   | Chemin d'endpoint              | Charge utile requise |
|----------|----------------------------|------------------|
| `GET`    | `/v1/org_preferences`      | Aucun             |

{{< tabs >}}
{{% tab "Exemple" %}}

```sh
curl -X GET \
         "https://api.<YOUR_DD_SITE>/api/v1/org_preferences" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
         -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
```

- Remplacez `<YOUR_DATADOG_API_KEY>` et `<YOUR_DATADOG_APPLICATION_KEY>` par les clés [API et application correspondantes][1] pour votre organisation.
- Remplacez `<YOUR_DD_SITE>` par {{< region-param key="dd_site" code="true" >}}

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

### Activer ou désactiver tous les mappings

<div class="alert alert-danger">
Lorsque les mappings sont activés, tous les utilisateurs se connectant via SAML voient leurs rôles supprimés et se voient réattribuer de nouveaux rôles en fonction des valeurs contenues dans leur assertion SAML. Il est important de confirmer que vous recevez bien les assertions SAML attendues lors de votre connexion avant d'activer l'application des mappings.
</div>

Active/désactive l'application de tous les mappings AuthN.

| Méthode   | Chemin d'endpoint               | Charge utile requise |
|----------|-----------------------------|------------------|
| `POST`   | `/v1/org_preferences`       | JSON             |

##### ARGUMENTS

* **`{preference_type}`** [* requis *, pas de valeur par défaut] :
  Préférence à mettre à jour, requise pour être "saml_authn_mapping_roles"
* **`{preference_data}`** [* requis *, pas de valeur par défaut] :
  Données servant à mettre à jour la préférence, devant être true ou false : true pour activer tous les mappings, false pour les désactiver.

{{< tabs >}}
{{% tab "Exemple" %}}

```sh
curl -X POST \
    "https://api.<YOUR_DD_SITE>/api/v1/org_preferences" \
    -H "Content-Type: application/json" \
    -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
    -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
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

- Remplacez `<YOUR_DATADOG_API_KEY>` et `<YOUR_DATADOG_APPLICATION_KEY>` par les clés [API et application correspondantes][1] pour votre organisation.
- Remplacer `<YOUR_DD_SITE>` par {{< region-param key="dd_site" code="true" >}}

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

## Lectures complémentaires

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/saml/mapping
[2]: /fr/api/v2/roles/#list-roles