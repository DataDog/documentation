---
app_id: boundary
categories:
- Configuración e implementación
- recopilación de logs
custom_kind: integración
description: Monitorización de controladores y trabajadores de Boundary.
integration_version: 4.0.0
media: []
supported_os:
- linux
- Windows
- MacOS
title: Boundary
---
## Información general

Este check monitoriza [Boundary](https://www.boundaryproject.io) a través del Datadog Agent . La versión mínima compatible de Boundary es `0.8.0`.

## Configuración

Sigue las instrucciones siguientes para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de Boundary está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest).
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

#### Escucha

Debe configurarse un escucha con un objetivo `ops` en el archivo `config.hcl` para habilitar la recopilación de métricas. El siguiente es un ejemplo de estrofa de escucha:

```hcl
controller {
  name = "boundary-controller"
  database {
    url = "postgresql://<username>:<password>@10.0.0.1:5432/<database_name>"
  }
}

listener "tcp" {
  purpose = "api"
  tls_disable = true
}

listener "tcp" {
  purpose = "ops"
  tls_disable = true
}
```

El bloque `boundary.controller.health` [check de servicio](#service-checks) se presenta como `WARNING` cuando el controlador se está apagando. Para habilitar este periodo de gracia de apagado, actualiza el bloque `controller` con una duración de espera definida:

```hcl
controller {
  name = "boundary-controller"
  database {
    url = "env://BOUNDARY_PG_URL"
  }
  graceful_shutdown_wait_duration = "10s"
}
```

#### Datadog Agent

1. Edita el archivo `boundary.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para empezar a recopilar tus datos de rendimiento de Boundary. Consulta el [ejemplo boundary.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/boundary/datadog_checks/boundary/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent] (https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `boundary` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **boundary.cluster.client.grpc.request_duration_seconds.bucket** <br>(count) | Histograma de latencias de solicitudes gRPC entre el clúster y cualquiera de sus clientes.<br>_Se muestra en segundos_ |
| **boundary.cluster.client.grpc.request_duration_seconds.count** <br>(count) | Histograma de latencias de solicitudes gRPC entre el clúster y cualquiera de sus clientes.<br>_Se muestra en segundos_ |
| **boundary.cluster.client.grpc.request_duration_seconds.sum** <br>(count) | Histograma de latencias de solicitudes gRPC entre el clúster y cualquiera de sus clientes.<br>_Se muestra en segundos_ |
| **boundary.controller.api.http.request_duration_seconds.bucket** <br>(count) | Histograma de latencias de solicitudes HTTP.<br>_Se muestra en segundos_ |
| **boundary.controller.api.http.request_duration_seconds.count** <br>(count) | Histograma de latencias de solicitudes HTTP.<br>_Se muestra en segundos_ |
| **boundary.controller.api.http.request_duration_seconds.sum** <br>(count) | Histograma de latencias de solicitudes HTTP.<br>_Se muestra en segundos_ |
| **boundary.controller.api.http.request_size_bytes.bucket** <br>(count) | Histograma del tamaño de las solicitudes HTTP.<br>_Se muestra en bytes_ |
| **boundary.controller.api.http.request_size_bytes.count** <br>(count) | Histograma del tamaño de las solicitudes HTTP.<br>_Se muestra en bytes_ |
| **boundary.controller.api.http.request_size_bytes.sum** <br>(count) | Histograma del tamaño de las solicitudes HTTP.<br>_Se muestra en bytes_ |
| **boundary.controller.api.http.response_size_bytes.bucket** <br>(count) | Histograma de tamaños de respuesta para respuestas HTTP.<br>_Se muestra en bytes_ |
| **boundary.controller.api.http.response_size_bytes.count** <br>(count) | Histograma de tamaños de respuesta para respuestas HTTP.<br>_Se muestra en bytes_ |
| **boundary.controller.api.http.response_size_bytes.sum** <br>(count) | Histograma de tamaños de respuesta para respuestas HTTP.<br>_Se muestra en bytes_ |
| **boundary.controller.cluster.grpc.request_duration_seconds.bucket** <br>(count) | Histograma de latencias de solicitudes gRPC.<br>_Se muestra en segundos_ |
| **boundary.controller.cluster.grpc.request_duration_seconds.count** <br>(count) | Histograma de latencias de solicitudes gRPC.<br>_Se muestra en segundos_ |
| **boundary.controller.cluster.grpc.request_duration_seconds.sum** <br>(count) | Histograma de latencias de solicitudes gRPC.<br>_Se muestra en segundos_ |
| **boundary.worker.proxy.http.write_header_duration_seconds.bucket** <br>(count) | Histograma del tiempo transcurrido desde que se establece la conexión TLS hasta que se escribe la primera cabecera http desde el servidor.<br>_Se muestra en segundos_ |
| **boundary.worker.proxy.http.write_header_duration_seconds.count** <br>(count) | Histograma del tiempo transcurrido desde que se establece la conexión TLS hasta que se escribe la primera cabecera http desde el servidor.<br>_Se muestra en segundos_ |
| **boundary.worker.proxy.http.write_header_duration_seconds.sum** <br>(count) | Histograma del tiempo transcurrido desde que se establece la conexión TLS hasta que se escribe la primera cabecera http desde el servidor.<br>_Se muestra en segundos_ |
| **boundary.worker.proxy.websocket.active_connections** <br>(gauge) | Recuento de conexiones proxy de websocket abiertas (a workers de Boundary).<br>_Se muestra como conexión_ |
| **boundary.worker.proxy.websocket.received_bytes.count** <br>(count) | Recuento de bytes recibidos para conexiones proxy de websocket de workers.<br>_Se muestra en bytes_ |
| **boundary.worker.proxy.websocket.sent_bytes.count** <br>(count) | Recuento de bytes enviados para conexiones proxy de websocket de workers.<br>_Se muestra en bytes_ |

### Eventos

La integración de Boundary no incluye ningún evento.

### Checks de servicio

**boundary.openmetrics.health**

Devuelve `CRITICAL` si el Agent no puede conectarse al endpoint de OpenMetrics, en caso contrario devuelve `OK`.

_Estados: ok, crítico_

**boundary.controller.health**

Devuelve `CRITICAL` si el Agent no puede conectarse al endpoint de estado del controlador, `WARNING` si el controlador ha recibido una señal de apagado, de lo contrario devuelve `OK`.

_Estados: ok, advertencia, crítico_

### Recopilación de logs

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Para empezar a recopilar tus logs de Boundary, añade este bloque de configuración a tu archivo `boundary.d/conf.yaml`:

   ```yaml
   logs:
      - type: file
        source: boundary
        path: /var/log/boundary/events.ndjson
   ```

   Cambia el valor del parámetro `path` en función de tu entorno. Consulta el [ejemplo de archivo `boundary.d/conf.yaml`](https://github.com/DataDog/integrations-core/blob/master/boundary/datadog_checks/boundary/data/conf.yaml.example)para conocer todas las opciones de configuración disponibles.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).