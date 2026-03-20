---
aliases:
- /es/integrations/dbt_cloud
app_id: dbt-cloud
categories:
- nube
- herramientas de desarrollo
- métricas
custom_kind: integración
description: Obtén estadísticas sobre ejecuciones, rendimiento de trabajos y mucho
  más desde tu cuenta de dbt Cloud.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-dbt-cloud-with-datadog/
  tag: blog
  text: Monitoriza dbt Cloud con Datadog
integration_version: 1.0.0
media:
- caption: Dashboard de dbt Cloud
  image_url: images/dbt-dashboard-screenshot.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: dbt Cloud
---
## Información general

La integración de Datadog con [dbt Cloud](https://www.getdbt.com/product/dbt-cloud) te permite recopilar y visualizar métricas clave de tus ejecuciones, modelos y tests de dbt. Mediante la integración de dbt Cloud con Datadog, puedes:

- Monitorizar el rendimiento y el estado de tus ejecuciones de dbt.
- Ver los tiempos de ejecución, los tiempos de compilación y los códigos de estado de las ejecuciones, los modelos y los tests.
- Correlacionar las métricas de dbt con los datos de otros servicios de tu stack.

## Configuración

### Requisitos previos

- Una cuenta de dbt Cloud.
- Un token de API con los permisos necesarios.

### Paso 1: genera un token de API en dbt Cloud

1. En dbt Cloud, ve a **User Profile** (Perfil de usuario) > **API Tokens** (Tokens de API) > **Service Tokens** (Tokens de servicio).
1. Haz clic en **+ Create Service Token** (+ Crear token de servicio).
1. Indica un nombre para el token.
1. Establece los permisos del token:
   - Para las métricas de la API administrativa: asegúrate de que el token tenga acceso a las ejecuciones y los trabajos.
   - Para las métricas de la API de Discovery (opcional): Asegúrate de que el token tenga privilegios de **Metadata API** (API de metadatos) y de que hayas [activado la api de descubrimiento](https://docs.getdbt.com/docs/dbt-cloud-apis/discovery-api) para tu project (proyecto).
1. Haz clic en **Save** (Guardar) y copia el **API Token** (Token de API) generado.

### Paso 2: conecta tu cuenta de dbt Cloud a Datadog

1. En la plataforma de Datadog, navega hasta **Integrations** (Integraciones).
1. Busca **dbt Cloud** y selecciona la integración.
1. Rellena el dominio de la cuenta, el dominio de metadatos (opcional) y el token de API.
1. Haz clic en el botón **Guardar** para guardar la configuración.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **dbt_cloud.runs.total** <br>(count) | El número total de ejecuciones de dbt ejecutadas.<br>_Mostrado como ejecución_ |
| **dbt_cloud.runs.elapsed_time** <br>(gauge) | El tiempo transcurrido de ejecuciones de dbt en segundos.<br>_Mostrado como segundo_ |
| **dbt_cloud.runs.status_code** <br>(gauge) | El código de estado de ejecuciones de dbt.|
| **dbt_cloud.runs.failures** <br>(count) | Count de ejecuciones de job (generic) de dbt fallidas.|
| **dbt_cloud.models.execution_time** <br>(gauge) | El tiempo de ejecución de los modelos dbt en segundos.<br>_Mostrado como segundo_ |
| **dbt_cloud.models.compile_time** <br>(gauge) | El tiempo de compilación de los modelos dbt en segundos.<br>_Mostrado como segundo_ |
| **dbt_cloud.tests.execution_time** <br>(gauge) | El tiempo de ejecución de las tests de dbt en segundos.<br>_Mostrado como segundo_ |
| **dbt_cloud.tests.compile_time** <br>(gauge) | El tiempo de compilación de las tests de dbt en segundos.<br>_Mostrado como segundo_ |

### Checks de servicio

La integración de dbt Cloud no incluye checks de servicio.

### Eventos

La integración de dbt Cloud no incluye eventos.

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitoriza dbt Cloud con Datadog](https://www.datadoghq.com/blog/monitor-dbt-cloud-with-datadog/)

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/) para obtener ayuda.