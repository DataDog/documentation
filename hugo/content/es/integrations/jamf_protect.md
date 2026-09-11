---
app_id: jamf-protect
app_uuid: a863cfe8-5ba4-45ae-923c-d273510f099c
assets:
  dashboards:
    jamf-protect-overview: assets/dashboards/jamf_protect_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10433
    source_type_name: jamf_logs
author:
  homepage: https://www.jamf.com/products/jamf-protect/
  name: Jamf Protect
  sales_email: support@jamf.com
  support_email: support@jamf.com
categories:
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/jamf_protect/README.md
display_on_public_website: true
draft: false
git_integration_title: jamf_protect
integration_id: jamf-protect
integration_title: Jamf Protect
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: jamf_protect
public_title: Jamf Protect
short_description: Seguridad de endpoints y defensa frente a amenazas móviles (MTD)
  para Mac y dispositivos móviles.
supported_os:
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Security
  - Offering::Integration
  configuration: README.md#Setup
  description: Seguridad de endpoints y defensa frente a amenazas móviles (MTD) para
    Mac y dispositivos móviles.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Jamf Protect
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general
[Jamf Protect][1] es una solución de seguridad integral diseñada específicamente para los endpoints de Apple, incluidos los de macOS, iOS y iPadOS y otras plataformas compatibles. Jamf Protect mejora las funciones de seguridad integradas de Apple y ofrece detección en tiempo real de aplicaciones, scripts y actividades de usuario maliciosas.

Jamf Protect no solo detecta el malware y el adware conocidos, sino que también previene las amenazas desconocidas y bloquea el tráfico de comando y control y los dominios de riesgo. Además, proporciona información detallada sobre la actividad de los endpoints, lo que asegura su estado y el cumplimiento, y respalda la respuesta ante incidencias con flujos de trabajo automatizados. Esta integración recopilará logs desde eventos de Jamf Protect que puede analizarse mediante Datadog. Esta integración monitoriza los logs de Jamf Protect tanto para macOS Security como para Jamf Security Cloud.

## Configuración

### Requisitos previos

- URL de entrada de Datadog. Utiliza la [documentación de logs de la API de Datadog][2] y selecciona tu sitio de Datadog en la parte superior de la página.
- Tus [claves de API de Datadog y claves de aplicación][3].

### Instalación

Navega hasta la [página de Integraciones][4] y busca el cuadro de "Jamf Protect".

### Portal de seguridad de macOS
1. En Jamf Protect, haz clic en **Actions** (Acciones).
2.  Haz clic en **Create Actions** (Crear acciones).
3.  En el campo *Action Config Name* (Nombre de configuración de la acción), introduce un nombre (como `Datadog`).
4.  (Opcional) Para recopilar alertas, haz clic en  **Remote Alert Collection Endpoints** (Endpoints de recopilación de alertas remotas) y añade lo siguiente:

    a. **URL:** `https://${DATADOG_INTAKE_URL}/api/v2/logs?ddsource=jamfprotect&service=alerts`

    b. Establece **Min Severity & Max Severity** (Gravedad mínima y gravedad máxima).

    c. Haz clic en **+ Add HTTP Header** (+ Añadir encabezado HTTP) dos veces y añade los siguientes campos de encabezado HTML: 
      ```
      Name: DD-API-KEY
      Value: <API_Key>
      ```
      ```
      Name: DD-APPLICATION-KEY
      Value: <APPLICATION_KEY>
      ```

5. (Opcional) Para recopilar logs unificados, haz clic en **+ Unified Logs Collection Endpoints** (Endpoints de recopilación de logs unificados) y añade lo siguiente.

    a. **URL:** `https://${DATADOG_INTAKE_URL}/api/v2/logs?ddsource=jamfprotect&service=unifiedlogs`

    b. Haz clic en **+ Add HTTP Header** (+ Añadir encabezado HTTP) dos veces y añade los siguientes campos de encabezado HTML.
      ```
      Name: DD-API-KEY
      Value: <API_Key>
      ```
      ```
      Name: DD-APPLICATION-KEY
      Value: <APPLICATION_KEY>
      ```

6. (Opcional) Para recopilar datos de telemetría, haz clic en **+ Telemetry Collection Endpoints** (+ Endpoints de recopilación de telemetría).

    a.  **URL:** `https://${DATADOG_INTAKE_URL}/api/v2/logs?ddsource=jamfprotect&service=telemetry`

    b. Haz clic en **+ Add HTTP Header** (+ Añadir encabezado HTTP) dos veces y añade los siguientes campos de encabezado HTML.
      ```
      Name: DD-API-KEY
      Value: <API_Key>
      ```
      ```
      Name: DD-APPLICATION-KEY
      Value: <APPLICATION_KEY>
      ```

7. Haz clic en **Save** (Guardar).

### Actualizar tu plan para utilizar acciones configuradas

1. Haz clic en **Plans** (Planes).
1. Busca el plan asignado a los dispositivos.
1. Haz clic en **Edit** (Editar) junto al nombre del plan.
1. Selecciona la acción en el menú desplegable *Action Configuration* (Configuración de la acción). Este es el nombre de configuración de la acción que contiene la configuración de Datadog.
1. Haz clic en **Save** (Guardar).

### (Opcional) Jamf Security Cloud

1.  Haz clic en **Integrations** (Integraciones) en el flujo de eventos de amenaza.
2.  Haz clic en **Data Streams** (Flujos de datos).
3.  Haz clic en **New Configuration** (Nueva configuración).
4.  Selecciona **Threat Events** (Eventos de amenazas).
5.  Selecciona **Generic HTTP** (HTTP genérico). 
6.  Haz clic en **Continue** (Continuar).
    | **Configuración**        | **Detalles**                         |
    |--------------------------|-------------------------------------|
    | **Nombre**                 | Datadog (Amenaza)                    |
    | **Protocolo**             | HTTPS                               |
    | **Nombre de host/IP del servidor**   | `${DATADOG_INTAKE_URL}`             |
    | **Puerto**                 | 443                                 |
    | **Endpoint**             | `api/v2/logs?ddsource=jamfprotect&` |

7.  Haz clic en **Create option "DD-API-KEY"** (Crear opción "DD-API-KEY ").
    ```
    Header Value: <API_Key>
    Header Name: DD-APPLICATION-KEY
    ```
8.  Haz clic en **Create option "DD-APPLICATION-KEY"** (Crear opción "DD-APPLICATION-KEY").
    ```
    Header Value: <APPLICATION_KEY>
    ```
9.  Haz clic en **Test Configuration** (Configuración del test).

10.  Si es exitosa, haz clic en **Create Configuration** (Crear configuración).

### (Opcional) Network Traffic Stream

1.  Haz clic en **Integrations** (Integraciones).
2.  Haz clic en **Data Streams** (Flujos de datos).
3.  Haz clic en **New Configuration** (Nueva configuración).
4.  Selecciona **Threat Events** (Eventos de amenazas).

5. Selecciona **Generic HTTP** (HTTP genérico). 

6.  Haz clic en **Continue** (Continuar).
    a.  **Nombre de configuration**: Datadog (Threat)

    b.  **Protocolo:** **HTTPS**

    c.  **Servidor** **Nombre de host/IP:** `${DATADOG_INTAKE_URL}`

    d.  **Puerto:** **443**

    e.  **Endpoint:** `api/v2/logs?ddsource=jamfprotect&service=networktraffic`

    f. **Encabezados adicionales:**

        i.  **Header Name:** DD-API-KEY

        1.  Click **Create option "DD-API-KEY"**.

        ii.  **Header Value:** <API_Key>

           i. Header Name: DD-APPLICATION-KEY

        iv.  Click **Create option "DD-APPLICATION-KEY"**.

           i. Header Value: <APPLICATION_KEY>

7.  Haz clic en **Test Configuration** (Configuración del test).
8.  Si es exitosa, haz clic en **Create Configuration** (Crear configuración).

### Validación

Navega al [Logs Explorer][5] y busca `source:jamfprotect` para validar que estás recibiendo logs.

## Datos recopilados

### Logs

La integración de Jamf Protect te permite enviar [logs de auditoría de Jamf][6] a Datadog.

### Métricas

Jamf Protect no incluye ninguna métrica.

### Checks de servicio

Jamf Protect no incluye ningún check de servicio.

### Eventos

Jamf Protect no incluye ningún evento.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][7].

## Para leer más

Más enlaces, artículos y documentación útiles:

[Documentación de la integración de Jamf de Datadog con Jamf Protect][8]

[1]: https://www.jamf.com/products/jamf-protect/
[2]: https://docs.datadoghq.com/es/api/latest/logs/#send-logs
[3]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[4]: https://app.datadoghq.com/integrations
[5]: https://app.datadoghq.com/logs
[6]: https://learn.jamf.com/bundle/jamf-protect-documentation/page/Audit_Logs.html
[7]: https://docs.datadoghq.com/es/help/
[8]: https://learn.jamf.com/en-US/bundle/jamf-protect-documentation/page/SecurityIntegration_Datadog.html