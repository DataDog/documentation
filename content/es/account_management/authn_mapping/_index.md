---
aliases:
- /es/account_management/authen_mapping/
beta: true
description: Mapear automáticamente los grupos de proveedores de identidad a los roles
  de Datadog utilizando la API de Mapeo de Autenticación para sistemas de autenticación
  federada.
further_reading:
- link: /account_management/rbac/log_management/
  tag: Documentación
  text: RBAC para la Gestión de Registros
title: Autenticación Federada a la API de Mapeo de Roles
---
Si está utilizando mecanismos de Autenticación Federada, esta API le permite mapear automáticamente grupos de usuarios a roles en Datadog utilizando atributos enviados desde su Proveedor de Identidad. Para crear y gestionar Mapeos de Autenticación a través de la API, los usuarios necesitan utilizar una clave de aplicación que pertenezca a alguien con el permiso de Gestión de Acceso.

**Nota**: Si es un usuario de SAML, Datadog recomienda encarecidamente que transicione a utilizar esta API.

También puede crear y gestionar mapeos en la interfaz de usuario de Datadog, en la pestaña {{< ui >}}Mappings{{< /ui >}} de Gestión de Usuarios. Consulte [mapeo de grupos SAML][1] para más información.

## Solicitudes {#requests}

Todos los puntos finales de la API a continuación están utilizando el siguiente punto final de host:

* `https://api.{{< region-param key="dd_site" >}}/api/` para su región de Datadog.

### Crear un nuevo mapeo de autenticación {#create-a-new-authentication-mapping}

Crear un nuevo Mapeo de AuthN a partir de un cuerpo JSON. Devuelve el nuevo Mapeo de AuthN creado.

| Método | Ruta del punto final | Carga útil requerida |
|--------|----------------------|------------------|
| `POST` | `/v2/authn_mappings` | JSON             |

##### ARGUMENTOS {#arguments}

* **`role["data"]["id"]`** [*requerido*, sin valor predeterminado]:
 El `ID` del Rol al que se mapeará. La API de Roles se puede utilizar para crear y gestionar roles de Datadog, qué permisos globales otorgan y qué usuarios pertenecen a ellos.
 **Nota**: Este atributo debe presentarse como parte de un bloque de `role` relación en las solicitudes. Vea el ejemplo a continuación para más detalles. Cuando crea un Rol, se le asigna un ID. Para más información sobre cómo encontrar el `ID` para el rol al que desea mapear, consulte la [documentación de la API de Roles][2].
* **`attributes["attribute_key"]`** [*requerido*, sin valor predeterminado]:
 El `attribute_key` es la parte clave de un par clave/valor que representa un atributo enviado desde su Proveedor de Identidad. Puede definir estos para su propio caso de uso. Por ejemplo, `attribute_key` podría ser `member-of` y el `attribute_value` podría ser `Development`.
* **`attributes["attribute_value"]`** [*requerido*, sin valor predeterminado]:
 El `attribute_value` es la parte de valor de un par clave/valor que representa un atributo enviado desde su Proveedor de Identidad. Puede definir estos para su propio caso de uso. Por ejemplo, `attribute_key` podría ser `member-of` y el `attribute_value` podría ser `Development`.

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

- Reemplace `<YOUR_DATADOG_API_KEY>` y `<YOUR_DATADOG_APPLICATION_KEY>` con las claves correspondientes [API y de aplicación][1] para su organización.
- Reemplace `<YOUR_DD_SITE>` con {{< region-param key="dd_site" code="true" >}}

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

### Obtenga todos los mapeos de AuthN {#get-all-authn-mappings}

Devuelve una lista de Mapeos de AuthN

| Método | Ruta del endpoint        | Carga útil requerida          |
|--------|----------------------|---------------------------|
| `GET`  | `/v2/authn_mappings` | Parámetros de consulta opcionales |

##### ARGUMENTOS {#arguments-1}

* **`sort`** [*opcional*, *predeterminado*=**creado\_en**]:
  Ordenar atributo y dirección—por defecto en orden ascendente, `-<attribute>` ordena en orden descendente. También se puede ordenar por atributos de relación `role.name`, `saml_assertion_attribute.attribute_key`, `saml_assertion_attribute.attribute_value`.
* **`page[number]`** [*opcional*, *predeterminado*=**0**, *mínimo*=**0**] :
  La página de resultados a devolver.
* **`page[size]`** [*opcional*, *predeterminado*=**10**] :
  El número de resultados a devolver en cada página.
* **`filter`** [*opcional*, predeterminado=ninguno] :
  Filtrar por etiquetas como cadenas. Por ejemplo, `Billing Users`.

{{< tabs >}}
{{% tab "Ejemplo" %}}

```sh
curl -X GET "https://api.<YOUR_DD_SITE>/api/v2/authn_mappings" \
     -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
     -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>"
```

- Reemplace `<YOUR_DATADOG_API_KEY>` y `<YOUR_DATADOG_APPLICATION_KEY>` con las claves correspondientes [API y de aplicación][1] para su organización.
- Reemplace `<YOUR_DD_SITE>` con {{< region-param key="dd_site" code="true" >}}

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

### Obtener un mapeo de AuthN específico {#get-a-specific-authn-mapping}

Devuelve un mapeo de AuthN específico por UUID.

| Método | Ruta del endpoint | Carga útil requerida |
|--------|--------------------------|------------------|
| `GET`  | `/authn_mappings/{authn_mapping_id}` | Parámetro URL |

##### ARGUMENTOS {#arguments-2}

* **`{authn_mapping_id}`** [*requerido*, sin valor predeterminado]:
  Reemplace `{authn_mapping_id}` con el ID del mapeo de AuthN que desea ver.

{{< tabs >}}
{{% tab "Ejemplo" %}}

```sh
curl -X GET "https://api.<YOUR_DD_SITE>/api/v2/authn_mappings/{authn_mapping_id}" \
     -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
     -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>"
```

- Reemplace `<YOUR_DATADOG_API_KEY>` y `<YOUR_DATADOG_APPLICATION_KEY>` con las claves correspondientes [API y de aplicación][1] para su organización.
- Reemplace `<YOUR_DD_SITE>` con {{< region-param key="dd_site" code="true" >}}

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

### Actualizar mapeo {#update-mapping}

Actualiza el mapeo de AuthN `role`, `saml_assertion_attribute_id` o ambos desde un cuerpo JSON. Devuelve el mapeo de AuthN actualizado.

| Método | Ruta del endpoint | Carga útil requerida |
|---------|-----------------------------------------|---------------------|
| `PATCH` | `/v2/authn_mappings/{authn_mapping_id}` | Parámetro URL, JSON |

##### ARGUMENTOS {#arguments-3}

* **`{authn_mapping_id}`** [*requerido*, sin predeterminado]:
  Reemplace `{authn_mapping_id}` con el ID del Mapeo AuthN que desea actualizar. Esto es requerido tanto en la ruta de la solicitud como en el cuerpo de la solicitud.
* **`role["data"]["id"]`** [*opcional*, *predeterminado*=ninguno]:
 El `ID` del Rol al que se asignará. La API de Roles se puede utilizar para crear y gestionar roles de Datadog, qué permisos globales otorgan y qué usuarios pertenecen a ellos.
 **Nota**: Este atributo debe presentarse como parte de un bloque de relación `role` en las solicitudes. Vea el ejemplo a continuación para más detalles. Cuando crea un Rol, se le asigna un ID. Para más información sobre cómo encontrar el `ID` para el rol al que desea asignar, consulte la [documentación de la API de Roles][2].
* **`attributes["attribute_key"]`** [*opcional*, *predeterminado*=ninguno]:
 El `attribute_key` es la parte clave de un par clave/valor que representa un atributo enviado desde su Proveedor de Identidad. Puede definir estos para su propio caso de uso. Por ejemplo, `attribute_key` podría ser `member-of` y el `attribute_value` podría ser `Development`.
* **`attributes["attribute_value"]`** [*opcional*, *predeterminado*=ninguno]:
 El `attribute_value` es la parte de valor de un par clave/valor que representa un atributo enviado desde su Proveedor de Identidad. Puede definir estos para su propio caso de uso. Por ejemplo, `attribute_key` podría ser `member-of` y el `attribute_value` podría ser `Development`.

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

- Reemplace `<YOUR_DATADOG_API_KEY>` y `<YOUR_DATADOG_APPLICATION_KEY>` con las claves correspondientes [API y de aplicación][1] para su organización.
- Reemplace `<YOUR_DD_SITE>` con {{< region-param key="dd_site" code="true" >}}

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

### Eliminar mapeo {#delete-mapping}

Elimina un Mapeo AuthN específico.

| Método   | Ruta del endpoint                           | Carga útil requerida |
|----------|-----------------------------------------|------------------|
| `DELETE` | `/v2/authn_mappings/{authn_mapping_id}` | Parámetro URL |

##### ARGUMENTOS {#arguments-4}

* **`{authn_mapping_id}`** [*requerido*, sin valor predeterminado]:
  Reemplace `{authn_mapping_id}` con el ID del Mapeo AuthN que desea eliminar.

{{< tabs >}}
{{% tab "Ejemplo" %}}

```sh
curl -X DELETE "https://api.<YOUR_DD_SITE>/api/v2/authn_mappings/{UUID}" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
         -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>"
```

- Reemplace `<YOUR_DATADOG_API_KEY>` y `<YOUR_DATADOG_APPLICATION_KEY>` con las claves correspondientes [API y de aplicación][1] para su organización.
- Reemplace `<YOUR_DD_SITE>` con {{< region-param key="dd_site" code="true" >}}

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Respuesta" %}}

```sh
HTTP/2 204
```

{{% /tab %}}
{{< /tabs >}}

### Obtener habilitación de mapeo AuthN {#get-authn-mapping-enablement}

Verifique si los Mapeos AuthN están habilitados o deshabilitados.

| Método   | Ruta del endpoint              | Carga útil requerida |
|----------|----------------------------|------------------|
| `GET`    | `/v1/org_preferences`      | Ninguno             |

{{< tabs >}}
{{% tab "Ejemplo" %}}

```sh
curl -X GET \
         "https://api.<YOUR_DD_SITE>/api/v1/org_preferences" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
         -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
```

- Reemplace `<YOUR_DATADOG_API_KEY>` y `<YOUR_DATADOG_APPLICATION_KEY>` con las claves correspondientes [API y de aplicación][1] para su organización.
- Reemplace `<YOUR_DD_SITE>` con {{< region-param key="dd_site" code="true" >}}

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

### Habilitar o deshabilitar todos los mapeos {#enable-or-disable-all-mappings}

<div class="alert alert-danger">
Cuando los mapeos están habilitados, todos los usuarios que inician sesión con SAML son despojados de sus roles y se les reasignan roles basados en los valores de su afirmación SAML. Es importante confirmar que está recibiendo las afirmaciones SAML esperadas en su inicio de sesión antes de habilitar la aplicación de mapeos.
</div>

Habilita/deshabilita la aplicación de todos los mapeos de AuthN.

| Método   | Ruta del endpoint               | Carga útil requerida |
|----------|-----------------------------|------------------|
| `POST`   | `/v1/org_preferences`       | JSON             |

##### ARGUMENTOS {#arguments-5}

* **`{preference_type}`** [*requerido*, sin valor por defecto]:
  Preferencia para actualizar, requerido que sea "saml_authn_mapping_roles"
* **`{preference_data}`** [*requerido*, sin valor por defecto]:
  Datos para actualizar la preferencia, debe ser verdadero o falso: verdadero para habilitar todos los mapeos, falso para deshabilitar

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

- Reemplace `<YOUR_DATADOG_API_KEY>` y `<YOUR_DATADOG_APPLICATION_KEY>` con las claves correspondientes [API y de aplicación][1] para su organización.
- Reemplace `<YOUR_DD_SITE>` con {{< region-param key="dd_site" code="true" >}}

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

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/saml/mapping
[2]: /es/api/v2/roles/#list-roles