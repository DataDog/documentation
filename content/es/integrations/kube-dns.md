---
aliases:
- /es/integrations/kube_dns
app_id: kube-dns
categories:
- rastreo
- kubernetes
- red
custom_kind: integración
description: Realiza un seguimiento de todas tus métricas de Kube DNS con Datadog
integration_version: 7.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Kube DNS
---
## Información general

Obtén métricas del servicio kube-dns en tiempo real para:

- Visualizar y monitorizar métricas DNS recopiladas con el complemento kube-dns de Kubernetes a través de Prometheus

Consulta https://github.com/kubernetes/kubernetes/tree/master/cluster/addons/dns para obtener más información sobre kube-dns.

## Configuración

### Instalación

El check de kube-dns está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesitas instalar nada más en tus servidores.

### Configuración

Edita el archivo `kube_dns.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory). Ve el [kube_dns.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

#### Usar la detección de servicios

Si estás utilizando un pod de Agent por nodo worker de Kubernetes, utiliza las siguientes anotaciones en tu pod de kube-dns para recuperar los datos automáticamente.

```yaml
apiVersion: v1
kind: Pod
metadata:
  annotations:
    service-discovery.datadoghq.com/kubedns.check_names: '["kube_dns"]'
    service-discovery.datadoghq.com/kubedns.init_configs: '[{}]'
    service-discovery.datadoghq.com/kubedns.instances: '[[{"prometheus_endpoint":"http://%%host%%:10055/metrics", "tags":["dns-pod:%%host%%"]}]]'
```

**Observaciones:**

- La etiqueta "dns-pod" rastrea la IP del pod de DNS de destino. Las otras etiquetas están relacionadas con el agente dd que está sondeando la información utilizando la detección de servicios.
- Las anotaciones de detección de servicios deben realizarse en pod. En caso de un despliegue, añade las anotaciones a los metadatos de la especificación de la plantilla.

### Validación

[Ejecuta el subcomando `status` del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `kube_dns` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **kubedns.cachemiss_count** <br>(gauge) | Número de solicitudes DNS que han fallado la caché.<br>_Se muestra como solicitud_ |
| **kubedns.cachemiss_count.count** <br>(count) | Número instantáneo de solicitudes DNS realizadas que han provocado una pérdida de caché.<br>_Se muestra como solicitud_ |
| **kubedns.error_count** <br>(gauge) | Número de solicitudes DNS que han dado lugar a un error.<br>_Se muestra como error_ |
| **kubedns.error_count.count** <br>(count) | Número instantáneo de solicitudes DNS realizadas que han dado lugar a un error.<br>_Se muestra como error_ |
| **kubedns.request_count** <br>(gauge) | Número total de solicitudes DNS realizadas.<br>_Se muestra como solicitud_ |
| **kubedns.request_count.count** <br>(count) | Número instantáneo de solicitudes DNS realizadas.<br>_Se muestra como solicitud_ |
| **kubedns.request_duration.seconds.count** <br>(gauge) | Número de solicitudes en las que se evalúa la métrica kubedns.request_duration.seconds.sum.<br>_Se muestra como solicitud_ |
| **kubedns.request_duration.seconds.sum** <br>(gauge) | Tiempo (en segundos) que tardó en resolverse cada solicitud.<br>_Se muestra en segundos_ |
| **kubedns.response_size.bytes.count** <br>(gauge) | Número de respuestas en las que se evalúa la métrica kubedns.response_size.bytes.sum.<br>_Se muestra como respuesta_ |
| **kubedns.response_size.bytes.sum** <br>(gauge) | Tamaño de la respuesta devuelta en bytes.<br>_Se muestra como byte_ |

### Eventos

El check de kube-dns no incluye ningún evento.

### Checks de servicio

**kubedns.up**

Devuelve `CRITICAL` si Kube DNS no está en buen estado.

_Estados: ok, critical_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).