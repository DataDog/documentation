---
app_id: cyral
categories:
- almacenes de datos
- seguridad
custom_kind: integración
description: Recopila métricas de tiempo de ejecución de una instancia de Cyral que
  monitoriza MySQL.
integration_version: 0.1.0
media: []
supported_os:
- Linux
title: Cyral
---
## Información general

Este check monitoriza un auxiliar [Cyral](https://cyral.com/) MySQL a través del Datadog Agent.

## Configuración

El check de Cyral no está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que es necesario instalarlo.

### Instalación

Para el Agent v7.21 o posterior/v6.21 o posterior, sigue las instrucciones a continuación para instalar el check de Cyral en tu host. Consulta [Uso de integraciones de la comunidad](https://docs.datadoghq.com/agent/guide/use-community-integrations/) para realizar la instalación con el Docker Agent o versiones anteriores del Agent.

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-cyral==<INTEGRATION_VERSION>
   ```

1. Configura tu integración de forma similar a las [integraciones](https://docs.datadoghq.com/getting_started/integrations/) centrales.

### Configuración

1. Edita el archivo `cyral.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent para comenzar a recopilar tus datos de rendimiento de cyral. Consulta [el cyral.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-extras/blob/master/cyral/datadog_checks/cyral/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

   ```yaml
   init_config:

   instances:
    # url of the metrics endpoint of prometheus
    - prometheus_url: http://localhost:9018/metrics
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `cyral` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **cyral.analysis_time** <br>(count) | Tiempo empleado en realizar el análisis<br>_Se muestra en milisegundos_ |
| **cyral.authentication_failure_count** <br>(count) | Número de fallos de autenticación|
| **cyral.catalog_query_count** <br>(count) | |
| **cyral.closed_client_conns_count** <br>(count) | |
| **cyral.closed_listeners_count** <br>(count) | |
| **cyral.high_latency_query_count** <br>(count) | Número de consultas que superan el umbral (configurable)|
| **cyral.open_client_conns_count** <br>(count) | |
| **cyral.open_listeners_count** <br>(count) | |
| **cyral.policy_eval_time** <br>(count) | |
| **cyral.policy_eval_time_counter** <br>(count) | |
| **cyral.policy_violation_count** <br>(count) | Número de consultas con infracciones de la política|
| **cyral.portscan_count** <br>(count) | Número de intentos de portscan detectados|
| **cyral.queries_with_errors** <br>(count) | |
| **cyral.query_duration_count** <br>(count) | Número de incrementos a query_duration|
| **cyral.query_duration_sum** <br>(count) | Duración total de las consultas en milisegundos|
| **cyral.repo_dial_errors_count** <br>(count) | |
| **cyral.row_count** <br>(count) | Número de filas por consulta|
| **cyral.sql_parse_time** <br>(count) | Tiempo de parseo en milisegundos|
| **cyral.sql_parse_time_counter** <br>(count) | Número de incrementos de sql_parse_time|
| **cyral.storage_watch_events_count** <br>(count) | |
| **cyral.wire_dial_errors_count** <br>(count) | |
| **cyral.wire_parse_duration** <br>(count) | |
| **cyral.wire_parse_duration_increments** <br>(count) | |

### Checks de servicio

Cyral no incluye checks de servicio.

### Eventos

Cyral no incluye eventos.

## Solucionar problemas

### No se puede conectar el Agent

```text
    cyral
    -------
      - instance #0 [ERROR]: "('Connection aborted.', error(111, 'Connection refused'))"
      - Collected 0 metrics, 0 events & 0 service check
```

Comprueba que la `url` en `cyral.yaml` sea correcta.

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).