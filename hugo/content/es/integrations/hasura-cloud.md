---
aliases:
- /es/integrations/hasura_cloud
app_id: hasura-cloud
categories:
- nube
- recopilación de logs
- rastreo
custom_kind: integración
description: Monitorización de tu proyecto Hasura Cloud
integration_version: 1.1.1
media: []
supported_os:
- linux
- windows
- macos
title: Hasura Cloud
---
## Información general

[Hasura Cloud](https://hasura.io/cloud/) proporciona una API GraphQL escalable, altamente disponible, distribuida globalmente,
segura, lista para la producción en tus fuentes de datos.

La integración Datadog es una función de observabilidad de Hasura Cloud que exporta
logs, métricas y trazas (traces) de operación de tu proyecto Hasura Cloud a tu dashboard de Datadog.

## Configuración

Para configurar la integración Hasura Cloud en Datadog para tu proyecto Hasura Cloud, proporciona una clave de API Datadog y una región a Hasura Cloud.

Consulta la [documentación de Hasura Cloud](https://hasura.io/docs/latest/observability/integrations/datadog/) para saber cómo configurar la integración Datadog para tu proyecto de Hasura Cloud.

Una vez hecho lo anterior, ve a la sección [Logs](https://app.datadoghq.com/logs) en Datadog y crea facetas para los siguientes campos de nivel superior:

- `operation_name`
- `operation_type`
- `error_code`
- `is_error`

Consulta la [documentación de facetas de logs de Datadog](https://docs.datadoghq.com/logs/explorer/facets/#create-facets) para obtener información sobre la creación de facetas a partir de logs.

Los logs, las métricas, y las trazas de tu proyecto Hasura Cloud se envían automáticamente a Datadog cuando tu proyecto recibe tráfico.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **hasura_cloud.requests_per_minute** <br>(gauge) | Número de solicitudes por minuto|
| **hasura_cloud.average_execution_time** <br>(gauge) | Tiempo medio de ejecución de la solicitud<br>_Se muestra en segundos_ |
| **hasura_cloud.success_rate** <br>(gauge) | Porcentaje de éxito de las solicitudes|
| **hasura_cloud.active_subscriptions** <br>(gauge) | Número de suscripciones activas|
| **hasura_cloud.websockets_open** <br>(gauge) | Número de websockets abiertos|

### Checks de servicio

La integración Hasura Cloud no incluye checks de servicio.

### Eventos

La integración Hasura Cloud no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).