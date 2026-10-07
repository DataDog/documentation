---
aliases:
- /es/integrations/jamf_protect
app_id: jamf-protect
categories:
- seguridad
custom_kind: integración
description: Seguridad de endpoints y defensa frente a amenazas móviles (MTD) para
  Mac y dispositivos móviles.
integration_version: 1.0.0
media: []
supported_os:
- windows
- macos
title: Jamf Protect
---
## Información general

[Jamf Protect](https://www.jamf.com/products/jamf-protect/) es una solución de seguridad integral diseñada específicamente para los endpoints de Apple, incluidos los de macOS, iOS y iPadOS y otras plataformas compatibles. Jamf Protect mejora las funciones de seguridad integradas de Apple y ofrece detección en tiempo real de aplicaciones, scripts y actividades de usuario maliciosas.

Jamf Protect no solo detecta el malware y el adware conocidos, sino que también previene las amenazas desconocidas y bloquea el tráfico de comando y control y los dominios de riesgo. Además, proporciona información detallada sobre la actividad de los endpoints, lo que asegura su estado y el cumplimiento, y respalda la respuesta ante incidencias con flujos de trabajo automatizados. Esta integración recopilará logs desde eventos de Jamf Protect que puede analizarse mediante Datadog. Esta integración monitoriza los logs de Jamf Protect tanto para macOS Security como para Jamf Security Cloud.

## Configuración

### Requisitos previos

- URL de admisión de Datadog. Utiliza la [documentación de la API de logs de Datadog](https://docs.datadoghq.com/api/latest/logs/#send-logs) y selecciona tu sitio de Datadog en la parte superior de la página.
- Tus [claves de API de Datadog y de aplicación](https://docs.datadoghq.com/account_management/api-app-keys/).

### Instalación

Navega hasta la [página de Integraciones](https://app.datadoghq.com/integrations) y busca el cuadro "Jamf Protect".

### Portal de seguridad de macOS

1. En Jamf Protect, haz clic en **Actions** (Acciones).

1. Haz clic en **Create Actions** (Crear acciones).

1. En el campo *Action Config Name* (Nombre de configuración de la acción), introduce un nombre (como `Datadog`).

1. (Opcional) Para recopilar alertas, haz clic en  **Remote Alert Collection Endpoints** (Endpoints de recopilación de alertas remotas) y añade lo siguiente:

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

1. (Opcional) Para recopilar logs unificados, haz clic en **+ Unified Logs Collection Endpoints** (Endpoints de recopilación de logs unificados) y añade lo siguiente.

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

1. (Opcional) Para recopilar datos de telemetría, haz clic en **+ Telemetry Collection Endpoints** (+ Endpoints de recopilación de telemetría).

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

1. Haz clic en **Save** (Guardar).

### Actualizar tu plan para utilizar acciones configuradas

1. Haz clic en **Plans** (Planes).
1. Busca el plan asignado a los dispositivos.
1. Haz clic en **Edit** (Editar) junto al nombre del plan.
1. Selecciona la acción en el menú desplegable *Action Configuration* (Configuración de la acción). Este es el nombre de configuración de la acción que contiene la configuración de Datadog.
1. Haz clic en **Save** (Guardar).

### (Opcional) Jamf Security Cloud

1. Haz clic en **Integrations** (Integraciones) en el flujo de eventos de amenaza.

1. Haz clic en **Data Streams** (Flujos de datos).

1. Haz clic en **New Configuration** (Nueva configuración).

1. Selecciona **Threat Events** (Eventos de amenazas).

1. Selecciona **Generic HTTP** (HTTP genérico). 

1. Haz clic en **Continue** (Continuar).
   | **Configuración**        | **Detalles**                         |
   |--------------------------|-------------------------------------|
   | **Nombre**                 | Datadog (Amenaza)                    |
   | **Protocolo**             | HTTPS                               |
   | **Nombre de host/IP del servidor**   | `${DATADOG_INTAKE_URL}`             |
   | **Puerto**                 | 443                                 |
   | **Endpoint**             | `api/v2/logs?ddsource=jamfprotect&` |

1. Haz clic en **Create option "DD-API-KEY"** (Crear opción "DD-API-KEY ").

   ```
   Header Value: <API_Key>
   Header Name: DD-APPLICATION-KEY
   ```

1. Haz clic en **Create option "DD-APPLICATION-KEY"** (Crear opción "DD-APPLICATION-KEY").

   ```
   Header Value: <APPLICATION_KEY>
   ```

1. Haz clic en **Test Configuration** (Configuración del test).

1. Si es exitosa, haz clic en **Create Configuration** (Crear configuración).

### (Opcional) Network Traffic Stream

1. Haz clic en **Integrations** (Integraciones).

1. Haz clic en **Data Streams** (Flujos de datos).

1. Haz clic en **New Configuration** (Nueva configuración).

1. Selecciona **Threat Events** (Eventos de amenazas).

1. Selecciona **Generic HTTP** (HTTP genérico). 

1. Haz clic en **Continue** (Continuar).
   a.  **Nombre de configuration**: Datadog (Threat)

   b.  **Protocolo:** **HTTPS**

   c.  **Servidor** **Nombre de host/IP:** `${DATADOG_INTAKE_URL}`

   d.  **Puerto:** **443**

   e.  **Endpoint:** `api/v2/logs?ddsource=jamfprotect&service=networktraffic`

   f. **Encabezados adicionales:**

   ```
   i.  **Header Name:** DD-API-KEY

   1.  Click **Create option "DD-API-KEY"**.

   ii.  **Header Value:** <API_Key>

      i. Header Name: DD-APPLICATION-KEY

   iv.  Click **Create option "DD-APPLICATION-KEY"**.

      i. Header Value: <APPLICATION_KEY>
   ```

1. Haz clic en **Test Configuration** (Configuración del test).

1. Si es exitosa, haz clic en **Create Configuration** (Crear configuración).

### Validación

Navega hasta el [Logs Explorer](https://app.datadoghq.com/logs) y busca `source:jamfprotect` para validar que estás recibiendo logs.

## Datos recopilados

### Logs

La integración de Jamf Protect te permite enviar [logs de auditoría de Jamf](https://learn.jamf.com/bundle/jamf-protect-documentation/page/Audit_Logs.html) a Datadog.

### Métricas

Jamf Protect no incluye ninguna métrica.

### Checks de servicio

Jamf Protect no incluye ningún check de servicio.

### Eventos

Jamf Protect no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

[Documentación de Jamf integrando Datadog con Jamf Protect](https://learn.jamf.com/en-US/bundle/jamf-protect-documentation/page/SecurityIntegration_Datadog.html)