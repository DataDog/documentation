---
aliases:
- /es/account_management/authen_mapping/
beta: true
further_reading:
- link: /account_management/rbac/log_management/
  tag: Documentación
  text: Control de acceso basado en roles para gestionar logs
title: API para asignar atributos de autenticación federada a un rol
---

Si estás utilizando mecanismos de autenticación federada, esta API te permite asignar de forma automática grupos de usuarios a roles de Datadog utilizando atributos enviados por tu proveedor de identidades. Para crear y gestionar las asignaciones de autenticación a través de la API, los usuarios deben utilizar una clave de aplicación que pertenezca a un usuario con el permiso de gestión de acceso.

**Nota**: Si eres usuario de SAML y has estado utilizando la versión beta existente del mecanismo de asignación federada (`roles_v2_saml`), Datadog te recomienda encarecidamente que migres a esta API.

También puede crear y gestionar asignaciones en la interfaz de usuario de Datadog, en la pestaña **Mappings** (Asignaciones) de User Management (Gestión de usuarios). Consulta la [asignación de grupos SAML][1] para obtener más información.

## Solicitudes

Todos los endpoints de la API que aparecen a continuación utilizan el siguiente endpoint de host:

* `https://api.{{< region-param key="dd_site" >}}/api/` para tu región de Datadog.

### Crear una nueva asignación de autenticación

Crea una nueva asignación de AuthN a partir de un conjunto JSON. Devuelve la asignación de AuthN que se acaba de crear.

| Método | Ruta del endpoint        | Carga útil obligatoria |
|--------|----------------------|------------------|
| `POST` | `/v2/authn_mappings` | JSON             |

##### ARGUMENTOS

* **`role["data"]["id"]`** [*obligatorio*, sin default]:
 El `ID` del rol que se va a utilizar para asignar. La API de roles se puede utilizar para crear y gestionar roles de Datadog, así como para definir los permisos generales que se conceden y los usuarios asociados a cada rol.
 **Nota**: Este atributo debe presentarse en las solicitudes como parte de un bloque de relación de `role`. Para obtener más información, consulta el siguiente ejemplo. Cuando se crea un rol, se le asigna un ID. Para obtener más información sobre cómo encontrar el `ID` del rol que quieres asignar, consulta la [documentación sobre la API de roles][2].
* **`attributes["attribute_key"]`** [*obligatorio*, sin default]:
 La `attribute_key` es la clave de un par clave/valor que representa un atributo que envía tu proveedor de identidades. Puedes definir estos pares en función de tus necesidades. Por ejemplo, la `attribute_key` se podría definir como `member-of` y el `attribute_value` podría ser `Development`.
* **`attributes["attribute_value"]`** [*obligatorio*, sin default]:
 El `attribute_value` es el valor de un par clave/valor que representa un atributo que envía tu proveedor de identidades. Puedes definir estos pares en función de tus necesidades. Por ejemplo, la `attribute_key` se podría definir como `member-of` y el `attribute_value` podría ser `Development`.

{{< tabs >}}
{{% tab "Ejemplo" %}}

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

- Reemplaza `<YOUR_DATADOG_API_KEY>` y `<YOUR_DATADOG_APPLICATION_KEY>` por las correspondientes [claves de API y aplicación][1] de tu organización.
- Reemplaza `<YOUR_DD_SITE>` por {{< region-param key="dd_site" code="true" >}}

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Respuesta" %}}

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

### Consultar todas las asignaciones de autenticación

Devuelve una lista con las asignaciones de autenticación.

| Método | Ruta del endpoint        | Carga útil obligatoria          |
|--------|----------------------|---------------------------|
| `GET`  | `/v2/authn_mappings` | Parámetros de consulta opcionales |

##### ARGUMENTOS

* **`sort`** [*opcional*, *default*=**created\_at**]:
  Atributo y orden de clasificación; el orden predeterminado es ascendente, mientras que el `-<attribute>` clasifica en orden descendente. También es posible la clasificación según los atributos de relación `role.name`, `saml_assertion_attribute.attribute_key`, `saml_assertion_attribute.attribute_value`.
* **`page[number]`** [*opcional*, *default*=**0**, *minimum*=**0**]:
  La página de resultados que devolverá.
* **`page[size]`** [*opcional*, *default*=**10**]:
  El número de resultados que devolverá por página.
* **`filter`** [*opcional*, default=none]:
  Filtrar por etiquetas (tags) en forma de cadenas. Ejemplo: `Billing Users`.

{{< tabs >}}
{{% tab "Ejemplo" %}}

```sh
curl -X GET "https://api.<YOUR_DD_SITE>/api/v2/authn_mappings" \
     -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
     -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>"
```

- Reemplaza `<YOUR_DATADOG_API_KEY>` y `<YOUR_DATADOG_APPLICATION_KEY>` por las correspondientes [claves de API y aplicación][1] de tu organización.
- Reemplaza `<YOUR_DD_SITE>` por {{< region-param key="dd_site" code="true" >}}

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Respuesta" %}}

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

### Consultar una asignación de autenticación específica

Devuelve una asignación de autenticación a través de su UUID.

| Método | Ruta del endpoint            | Carga útil obligatoria |
|--------|--------------------------|------------------|
| `GET`  | `/authn_mappings/{authn_mapping_id}` | Parámetro de URL    |

##### ARGUMENTOS

* **`{authn_mapping_id}`** [*obligatorio*, sin default]:
  Reemplaza `{authn_mapping_id}` por el ID de la asignación de autenticación que deseas ver.

{{< tabs >}}
{{% tab "Ejemplo" %}}

```sh
curl -X GET "https://api.<YOUR_DD_SITE>/api/v2/authn_mappings/{authn_mapping_id}" \
     -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
     -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>"
```

- Reemplaza `<YOUR_DATADOG_API_KEY>` y `<YOUR_DATADOG_APPLICATION_KEY>` por las correspondientes [claves de API y aplicación][1] de tu organización.
- Reemplaza `<YOUR_DD_SITE>` por {{< region-param key="dd_site" code="true" >}}

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Respuesta" %}}

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

### Actualizar una asignación

Actualiza el `role` de la asignación de autenticación, el `saml_assertion_attribute_id` o ambos a partir de un cuerpo JSON. Devuelve la asignación de autenticación actualizada.

| Método  | Ruta del endpoint                           | Carga útil obligatoria    |
|---------|-----------------------------------------|---------------------|
| `PATCH` | `/v2/authn_mappings/{authn_mapping_id}` | Parámetro de URL, JSON |

##### ARGUMENTOS

* **`{authn_mapping_id}`** [*obligatorio*, sin default]:
  Reemplaza `{authn_mapping_id}` por el ID de la asignación de autenticación que deseas actualizar. Este valor es necesario tanto en la ruta de la solicitud como en el cuerpo de la misma.
* **`role["data"]["id"]`** [*opcional*, *default*=none]:
 El `ID` del rol que se va a utilizar para asignar. La API de roles se puede utilizar para crear y gestionar roles de Datadog, así como para definir los permisos generales que se conceden y los usuarios asociados a cada rol.
 **Nota**: Este atributo debe presentarse en las solicitudes como parte de un bloque de relación de `role`. Para obtener más información, consulta el siguiente ejemplo. Cuando se crea un rol, se le asigna un ID. Para obtener más información sobre cómo encontrar el `ID` del rol que quieres asignar, consulta la [documentación sobre la API de roles][2].
* **`attributes["attribute_key"]`** [*opcional*, *default*=none]:
 La `attribute_key` es la clave de un par clave/valor que representa un atributo que envía tu proveedor de identidades. Puedes definir estos pares en función de tus necesidades. Por ejemplo, la `attribute_key` se podría definir como `member-of` y el `attribute_value` podría ser `Development`.
* **`attributes["attribute_value"]`** [*opcional*, *default*=none]:
 El `attribute_value` es el valor de un par clave/valor que representa un atributo que envía tu proveedor de identidades. Puedes definir estos pares en función de tus necesidades. Por ejemplo, la `attribute_key` se podría definir como `member-of` y el `attribute_value` podría ser `Development`.

{{< tabs >}}
{{% tab "Ejemplo" %}}

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

- Reemplaza `<YOUR_DATADOG_API_KEY>` y `<YOUR_DATADOG_APPLICATION_KEY>` por las correspondientes [claves de API y aplicación][1] de tu organización.
- Reemplaza `<YOUR_DD_SITE>` por {{< region-param key="dd_site" code="true" >}}

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Respuesta" %}}

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

### Eliminar una asignación

Elimina una asignación de autenticación específica.

| Método   | Ruta del endpoint                           | Carga útil obligatoria |
|----------|-----------------------------------------|------------------|
| `DELETE` | `/v2/authn_mappings/{authn_mapping_id}` | Parámetro de URL    |

##### ARGUMENTOS

* **`{authn_mapping_id}`** [*obligatorio*, sin default]:
  Reemplaza `{authn_mapping_id}` por el ID de la asignación de autenticación que deseas eliminar.

{{< tabs >}}
{{% tab "Ejemplo" %}}

```sh
curl -X DELETE "https://api.<YOUR_DD_SITE>/api/v2/authn_mappings/{UUID}" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
         -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>"
```

- Reemplaza `<YOUR_DATADOG_API_KEY>` y `<YOUR_DATADOG_APPLICATION_KEY>` por las correspondientes [claves de API y aplicación][1] de tu organización.
- Reemplaza `<YOUR_DD_SITE>` por {{< region-param key="dd_site" code="true" >}}

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Respuesta" %}}

```sh
HTTP/2 204
```

{{% /tab %}}
{{< /tabs >}}

### Consultar el indicador de activación de la asignación de autenticación

Comprueba si las asignaciones de autenticación están activadas o desactivadas.

| Método   | Ruta del endpoint              | Carga útil obligatoria |
|----------|----------------------------|------------------|
| `GET`    | `/v1/org_preferences`      | Ninguna             |

{{< tabs >}}
{{% tab "Ejemplo" %}}

```sh
curl -X GET \
         "https://api.<YOUR_DD_SITE>/api/v1/org_preferences" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
         -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
```

- Reemplaza `<YOUR_DATADOG_API_KEY>` y `<YOUR_DATADOG_APPLICATION_KEY>` por las correspondientes [claves de API y aplicación][1] de tu organización.
- Reemplaza `<YOUR_DD_SITE>` por {{< region-param key="dd_site" code="true" >}}

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Respuesta" %}}

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

### Activar o desactivar las asignaciones

<div class="alert alert-warning">
Al activar las asignaciones, se eliminan los roles de todos los usuarios que inician sesión con SAML y se les reasignan unos teniendo en cuenta los valores de su aserción SAML. Recuerda verificar que recibes las aserciones SAML previstas en tu conexión antes de activar la aplicación de asignaciones.
</div>

Activa/desactiva la aplicación de todas las asignaciones de autenticación.

| Método   | Ruta del endpoint               | Carga útil obligatoria |
|----------|-----------------------------|------------------|
| `POST`   | `/v1/org_preferences`       | JSON             |

##### ARGUMENTOS

* **`{preference_type}`** [*obligatorio*, sin default]:
  Preferencia para actualizar; debe ser "saml_authn_mapping_roles"
* **`{preference_data}`** [*obligatorio*, sin default]:
  Datos con los que actualizar la preferencia. Debe ser true o false: true para activar todas las asignaciones, false para desactivarlas.

{{< tabs >}}
{{% tab "Ejemplo" %}}

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

- Reemplaza `<YOUR_DATADOG_API_KEY>` y `<YOUR_DATADOG_APPLICATION_KEY>` por las correspondientes [claves de API y aplicación][1] de tu organización.
- Reemplaza `<YOUR_DD_SITE>` por {{< region-param key="dd_site" code="true" >}}

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Respuesta" %}}

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

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/saml/mapping
[2]: /es/api/v2/roles/#list-roles