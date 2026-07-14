---
app_id: fluentbit
categories:
- métricas
custom_kind: integración
description: Recopila métricas internas de Fluent Bit para cada complemento en ejecución.
integration_version: 1.0.2
media: []
supported_os:
- linux
- macos
- windows
title: Fluent Bit (Agent)
---
## Información general

Esta check monitoriza las métricas de [Fluent Bit](https://fluentbit.io) a través del Datadog Agent. Para enviar logs a Datadog con Fluent Bit y conocer el complemento de salida de Fluent Bit Datadog, consulta la documentación de [Fluent Bit](https://docs.datadoghq.com/logs/guide/fluentbit/).

## Configuración de Fluent Bit

Fluent Bit no expone sus métricas internas por defecto. Debes activar el servidor HTTP integrado que expone el endpoint de métricas.

```
[SERVICE]
    http_server on
```

Para obtener más información, consulta la [documentación] oficial (https://docs.fluentbit.io/manual/administration/monitoring).

## Configuración

Sigue las siguientes instrucciones para instalar y configurar esta check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

Para el Agent v7.21+/v6.21+, sigue las siguientes instrucciones para instalar la check de Fluent Bit en tu host. Consulta [Utilizar integraciones de Community (https://app.datadoghq.com/account/settings/agent/latest) para realizar la instalación con Docker Agent o versiones anteriores del Agent.

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-fluentbit==<INTEGRATION_VERSION>
   ```

1. Configura tu integración de forma similar a las [integraciones] del núcleo (https://docs.datadoghq.com/agent/kubernetes/integrations/).

### Configuración

1. Edita el archivo `fluentbit.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent para comenzar a recopilar tus datos de rendimiento fluentbit.

   ```yaml
   init_config:

   instances:
       ## @param metrics_endpoint - string - required
       ## The URL to Fluent Bit internal metrics per loaded plugin in Prometheus format.
       #
     - metrics_endpoint: http://127.0.0.1:2020/api/v1/metrics/prometheus
   ```

   Consulta el archivo [ejemplo de fluentbit.d/conf.yaml](https://github.com/DataDog/integrations-extras/blob/master/fluentbit/datadog_checks/fluentbit/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `fluentbit` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **fluentbit.input.records.count** <br>(count) | Número de registros procesados por la entrada.<br>_Mostrado como entrada_ |
| **fluentbit.input.bytes.count** <br>(count) | Número de bytes procesados por la entrada.<br>_Mostrado como byte_ |
| **fluentbit.filter.add_records.count** <br>(count) | Número de registros añadidos por el filtro.<br>_Mostrado como entrada_ |
| **fluentbit.filter.drop_records.count** <br>(count) | Número de registros descartados por el filtro.<br>_Mostrado como entrada_ |
| **fluentbit.output.proc_records.count** <br>(count) | Número de registros procesados por la salida.<br>_Mostrado como entrada_ |
| **fluentbit.output.proc_bytes.count** <br>(count) | Número de bytes procesados por la salida.<br>_Mostrado como byte_ |
| **fluentbit.output.errors.count** <br>(count) | Número de errores en la salida.<br>_Mostrado como error_ |
| **fluentbit.output.retries.count** <br>(count) | Número de reintentos en la salida.<br>_Mostrado como intento_ |
| **fluentbit.output.retries_failed.count** <br>(count) | Número de lotes abandonados por haberse alcanzado el número máximo de reintentos.<br>_Mostrado como error_ |
| **fluentbit.output.retried_records.count** <br>(count) | Número de registros reintentados por la salida.<br>_Mostrado como entrada_ |
| **fluentbit.output.dropped_records.count** <br>(count) | Número de registros descartados por la salida.<br>_Mostrado como entrada_ |
| **fluentbit.build_info** <br>(gauge) | El valor es siempre 1. La versión y el tipo se incluyen como tags (etiquetas).|

### Eventos

La integración de Fluent Bit no incluye ningún evento.

### Checks de servicio

La integración de Fluent Bit no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Enviar logs de Fluent Bit a Datadog](https://docs.datadoghq.com/logs/guide/fluentbit/)