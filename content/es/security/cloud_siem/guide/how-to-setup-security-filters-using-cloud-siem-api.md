---
aliases:
- /es/security_monitoring/guide/how-to-setup-security-filters-using-security-monitoring-api/
- /es/security_platform/guide/how-to-setup-security-filters-using-security-monitoring-api/
- /es/security_monitoring/guide/how-to-setup-security-filters-using-cloud-siem-api/
- /es/cloud_siem/guide/how-to-setup-security-filters-using-security-monitoring-api/
- /es/security_platform/guide/how-to-setup-security-filters-using-cloud-siem-api/
- /es/security_platform/cloud_siem/guide/how-to-setup-security-filters-using-cloud-siem-api/
- /es/security/guide/how-to-setup-security-filters-using-security-monitoring-api/
title: Filtros de seguridad con la API de Cloud SIEM
---

## Información general

El producto de Cloud SIEM analiza el contenido de logs ingeridos para detectar amenazas en tiempo real, por ejemplo, comparando logs con información sobre amenazas o aplicando [reglas de detección][1] para detectar ataques o anomalías.

Datadog cobra por logs analizados en función del número total de gigabytes ingeridos y analizados por el servicio de Datadog Cloud SIEM. Por defecto, Cloud SIEM analiza todos los logs ingeridos para maximizar la cobertura de la detección. Sin embargo, con la [API de Cloud SIEM][2], puedes establecer mediante programación filtros de seguridad para configurar qué subconjunto de logs ingeridos analizar.

En esta guía se tratan los siguientes ejemplos:

* [Configurar el filtro de seguridad por defecto para excluir ciertos logs](#add-an-exclusion)
* [Crear filtros de seguridad personalizados para especificar qué fuentes de log analizar](#create-a-custom-filter)

**Nota**: Los filtros de seguridad solo son necesarios para controlar logs analizados por el producto de Cloud SIEM. No es necesario que escribas filtros de seguridad para excluir logs generados por el Datadog Agent como parte de los productos de Cloud Security Management Threats (`source:runtime-security-agent`) y Cloud Security Management Misconfigurations (`source:compliance-agent`), ya que no se facturan como logs analizados independientemente.

## Requisitos previos

* Para utilizar la API se necesita una clave de API y una clave de aplicación **de un usuario administrador**. Están disponibles en tu [página de clave de API de la cuenta de Datadog][3]. Sustituye `<DATADOG_API_KEY>` y `<DATADOG_APP_KEY>` por tu clave de API de Datadog y tu clave de aplicación de Datadog.

* Esta guía incluye ejemplos de `curl`. Instala [cURL][4] si no lo tienes instalado, o consulta ejemplos de lenguaje adicionales para este endpoint de la API en la [documentación de la API][2].

## Ejemplos

### Añadir una exclusión

Por defecto, existe un único filtro de seguridad que analiza todos los logs recibidos. Se denomina `all ingested logs` y tiene una consulta de `*`. Puedes personalizarlo añadiendo una exclusión para excluir un subconjunto de logs en función de sus etiquetas (tags). Para ello, primero debes recuperar la lista de los filtros de seguridad para obtener el `id` del filtro.

**Llamada a la API:**

```bash
curl -L -X GET 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DATADOG_API_KEY>' \
--header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>'
```

**Respuesta:**

```json
{
    "data": [
        {
            "attributes": {
                "is_enabled": true,
                "is_builtin": true,
                "name": "all ingested logs",
                "filtered_data_type": "logs",
                "exclusion_filters": [],
                "version": 1,
                "query": "*"
            },
            "type": "security_filters",
            "id": "l6l-rmx-mqx"
        }
    ]
}
```

En este ejemplo, el filtro `id` es `"l6l-rmx-mqx"`. A continuación, puedes modificarlo para añadir una exclusión, por ejemplo excluir todos los logs etiquetados con `env:staging`.

**Nota**: `version` indica la versión actual del filtro que deseas actualizar. Este campo es opcional. Si no se proporciona, se actualiza a la última versión.

**Llamada a la API:**

```bash
curl -L -X PATCH 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters/l6l-rmx-mqx' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DATADOG_API_KEY>' \
--header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>' \
--data-raw '{
    "data": {
        "attributes": {
             "exclusion_filters": [
                {
                    "query": "env:staging",
                    "name": "exclude env:staging"
                }
            ],
            "version": 1
        },
        "type": "security_filters"
    }
}'
```

**Respuesta:**

```json
{
    "data": {
        "attributes": {
            "is_enabled": true,
            "is_builtin": true,
            "name": "all ingested logs",
            "filtered_data_type": "logs",
            "exclusion_filters": [
                {
                    "query": "env:staging",
                    "name": "exclude env:staging"
                }
            ],
            "version": 2,
            "query": "*"
        },
        "type": "security_filters",
        "id": "l6l-rmx-mqx"
    }
}
```

### Crear un filtro personalizado

También puedes crear filtros de seguridad personalizados para restringir el análisis a logs especificados explícitamente. Por ejemplo, puedes elegir analizar logs desde AWS CloudTrail con un filtro que solo coincida con `source:cloudtrail`.

**Llamada a la API:**

```bash
curl -L -X POST 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DATADOG_API_KEY>' \
--header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>' \
--data-raw '{
    "data": {
        "type": "security_filters",
        "attributes": {
            "is_enabled": true,
            "name": "cloudtrail",
            "exclusion_filters": [],
            "filtered_data_type": "logs",
            "query": "source:cloudtrail"
        }
    }
}'
```

**Respuesta:**

```json
{
    "data": {
        "attributes": {
            "is_enabled": true,
            "is_builtin": false,
            "name": "cloudtrail",
            "filtered_data_type": "logs",
            "exclusion_filters": [],
            "version": 1,
            "query": "source:cloudtrail"
        },
        "type": "security_filters",
        "id": "qa6-tzm-rp7"
    }
}
```

**Nota**: `version` indica la versión actual del filtro que deseas actualizar. Este campo es opcional. Si no se proporciona, se actualiza a la última versión.

Los filtros de seguridad son inclusivos, lo que significa que un determinado log se analiza **si coincide al menos con un filtro de seguridad**. Si tu objetivo es especificar un subconjunto de logs para analizar, es probable que también desees desactivar el filtro incorporado por defecto denominado `all ingested logs`. Para ello, establece su atributo `is_enabled` en `false`, como se indica a continuación:

**Llamada a la API:**

```bash
curl -L -X PATCH 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters/l6l-rmx-mqx' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DATADOG_API_KEY>' \
--header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>' \
--data-raw '{
    "data": {
        "attributes": {
            "is_enabled": false
        },
        "type": "security_filters"
    }
}'
```

**Respuesta:**

```json
{
    "data": {
        "attributes": {
            "is_enabled": false,
            "is_builtin": true,
            "name": "all ingested logs",
            "filtered_data_type": "logs",
            "exclusion_filters": [
                {
                    "query": "env:staging",
                    "name": "exclude env:staging"
                }
            ],
            "version": 3,
            "query": "*"
        },
        "type": "security_filters",
        "id": "l6l-rmx-mqx"
    }
}
```

**Nota**: `version` indica la versión actual del filtro que deseas actualizar. Este campo es opcional. Si no se proporciona, se actualiza a la última versión.

## Etiquetas y atributos clave para la seguridad

Si tu objetivo es analizar únicamente categorías explícitamente especificadas de logs, ten cuidado de no excluir logs que contengan usuarios y entidades valiosos para la seguridad, o fuentes clave de logs de seguridad. Las tablas siguientes ofrecen ejemplos útiles.

**Usuarios y entidades clave**

| Nombre                  | Consulta                                            |
| --------------------- |--------------------------------------------------|
| Todos los eventos nombrados      | `@evt.name:*`                                    |
| Todas las IPs de los clientes        | `@network.client.ip:*`                           |
| Todas las IPs de destino   | `@network.destination.ip:*`                      |
| Todos los usuarios             | `@usr.id:* OR @usr.name:* @usr.email:*`          |
| Todos los hosts             | `host:* OR instance-id:*`                        |

**Fuentes clave de seguridad**

| Nombre                  | Consulta                                            |
| --------------------- |--------------------------------------------------|
| Logs de seguridad de AWS     | `source:(cloudtrail OR guardduty OR route53)`    |
| Logs de red de AWS      | `source:(vpc OR waf OR elb OR alb)`              |
| Logs de Google Cloud     | `source:gcp*`                                    |
| Logs de Azure            | `source:azure*`                                  |
| Logs de auditoría de Kubernetes | `source:kubernetes.audit`                        |
| Logs del proveedor de identidad| `source:(okta OR gsuite OR auth0)`               |
| Logs de CDN              | `source:(cloudfront OR cloudflare OR fastly)`    |
| Logs de servidor web       | `source:(nginx* OR apache OR iis)`               |

[1]: /es/security/default_rules#cat-cloud-siem
[2]: /es/api/latest/security-monitoring/#get-all-security-filters
[3]: /es/api/v1/authentication/
[4]: https://curl.haxx.se/download.html