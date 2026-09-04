---
aliases:
- /es/integrations/cert_manager
app_id: cert-manager
categories:
- seguridad
- configuración y despliegue
- rastreo
custom_kind: integración
description: Rastreo de tus métricas de cert-manager con Datadog
integration_version: 6.0.0
media: []
supported_os:
- linux
- macos
- windows
title: cert-manager
---
## Información general

Este check recopila métricas de [cert-manager](https://github.com/jetstack/cert-manager).

![Dashboard con información general de Cert-Manager](https://raw.githubusercontent.com/DataDog/integrations-core/master/cert_manager/images/overview_dashboard.png)

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery](https://app.datadoghq.com/account/settings/agent/latest) para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de cert_manager se incluye en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest). No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. Edita el archivo `cert_manager.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para empezar a recopilar tus datos de rendimiento cert_manager. Consulta el [ejemplo cert_manager.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/cert_manager/datadog_checks/cert_manager/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `cert_manager` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **cert_manager.certificate.expiration_timestamp** <br>(gauge) | Fecha a partir de la cual expira el certificado. Expresado como Unix Epoch Time<br>_Se muestra en segundos_ |
| **cert_manager.certificate.ready_status** <br>(gauge) | Estado de preparación del certificado|
| **cert_manager.certificate.renewal_timestamp** <br>(gauge) | Fecha en la que se renovará el certificado. Expresado como Unix Epoch Time<br>_Se muestra en segundos_ |
| **cert_manager.clock_time** <br>(gauge) | Hora del reloj en segundos (a partir de 1970/01/01 UTC)<br>_Se muestra en segundos_ |
| **cert_manager.controller.sync_call.count** <br>(count) | Número de llamadas a sync() realizadas por un controlador|
| **cert_manager.http_acme_client.request.count** <br>(count) | Número de solicitudes realizadas por el cliente ACME|
| **cert_manager.http_acme_client.request.duration.count** <br>(count) | Recuento de las latencias de solicitudes HTTP en segundos para el cliente ACME|
| **cert_manager.http_acme_client.request.duration.quantile** <br>(gauge) | Cuantiles de las latencias de solicitudes HTTP en segundos para el cliente ACME|
| **cert_manager.http_acme_client.request.duration.sum** <br>(count) | Suma de las latencias de solicitudes HTTP en segundos para el cliente ACME|

### Eventos

La integración de cert_manager no incluye ningún evento.

### Checks de servicio

**cert_manager.openmetrics.health**

Devuelve `CRITICAL` si el Agent no se puede conectar con el endpoint de OpenMetrics, en caso contrario devuelve `OK`.

_Estados: ok, crítico_

## Solucionar problemas

### Duplicar etiquetas (tags) de nombre

Cada nombre de certificado se expone dentro de la etiqueta (label) `name`, en la carga útil de Prometheus, y el Datadog Agent lo convierte en una etiqueta (tag). Si tus hosts también utilizan la etiqueta (tag) `name` (por ejemplo, recopilada automáticamente por la [integración AWS](https://docs.datadoghq.com/integrations/amazon_web_services/)), las métricas procedentes de esta integración presentarán ambos valores. Para evitar etiquetas (tags) `name` duplicadas, puedes utilizar el [parámetro de configuración`rename_labels`](https://github.com/DataDog/integrations-core/blob/81b91a54328f174c5c1e92cb818640cba1ddfec3/cert_manager/datadog_checks/cert_manager/data/conf.yaml.example#L153-L155) para asignar la etiqueta (label) de Prometheus `name` a la etiqueta (tag) de Datadog `cert_name` . De este modo, te aseguras de tener un único valor dentro de la etiqueta (tag) `cert_name` para identificar tus certificados:

```yaml
init_config:
instances:
- openmetrics_endpoint: <OPENMETRICS_ENDPOINT>
  rename_labels:
    name: cert_name
```

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).