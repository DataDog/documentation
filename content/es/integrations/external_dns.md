---
app_id: dns-externo
categories:
- red
custom_kind: integración
description: Seguimiento de las métricas de todos tus DNS externos con Datadog
integration_version: 6.0.0
media: []
supported_os:
- linux
- macos
- windows
title: DNS externo
---
## Información general

Obtén métricas del servicio DNS externo en tiempo real para visualizar y monitorizar métricas de DNS recopiladas por medio del complemento DNS externo Prometheus de Kubernetes.

Para obtener más información sobre el DNS externo, consulta el [repositorio de Github](https://github.com/kubernetes-incubator/external-dns).

## Configuración

### Instalación

El check de DNS externo está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesitas instalar nada más en tus servidores.

### Configuración

Edita el archivo `external_dns.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para apuntar a tu servidor y puerto, configura los másters para monitorizar. Consulta el [ejemplo external_dns.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/external_dns/datadog_checks/external_dns/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

#### Usar la detección de servicios

Si estás utilizando un pod del Datadog Agent por cada nodo de worker Kubernetes, utiliza estas anotaciones de ejemplo en tu pod de dns-externo para recuperar los datos automáticamente:

```yaml
apiVersion: v1
kind: Pod
metadata:
  annotations:
    ad.datadoghq.com/external-dns.check_names: '["external_dns"]'
    ad.datadoghq.com/external-dns.init_configs: '[{}]'
    ad.datadoghq.com/external-dns.instances: '[{"prometheus_url":"http://%%host%%:7979/metrics", "tags":["externaldns-pod:%%host%%"]}]'
```

- La etiqueta (tag) `externaldns-pod` realiza un seguimiento de la IP del pod del DNS de destino. Las demás etiquetas están relacionadas con el Datadog Agent que sondea la información utilizando la detección automática.
- Las anotaciones de Autodiscovery se realizan en el pod. Para el despliegue, añade las anotaciones a los metadatos de la especificación de la plantilla.

### Validación

[Ejecuta el subcomando del Agent `status` ](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `external_dns` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **external_dns.controller.last_sync** <br>(gauge) | Marca de tiempo de la última sincronización exitosa con el proveedor de DNS<br>_Se muestra en segundos_ |
| **external_dns.registry.endpoints.total** <br>(gauge) | Número de endpoints de registro<br>_Se muestra como recurso_ |
| **external_dns.registry.errors.total** <br>(gauge) | Número de errores de registro<br>_Se muestra como error_ |
| **external_dns.source.endpoints.total** <br>(gauge) | Número de endpoints de origen<br>_Se muestra como recurso_ |
| **external_dns.source.errors.total** <br>(gauge) | Número de errores de origen<br>_Se muestra como error_ |

### Eventos

El check del DNS externo no incluye eventos.

### Checks de servicio

**external_dns.prometheus.health**

Devuelve `CRITICAL` si el check no puede acceder al endpoint de métricas o `OK` en caso contrario.

_Estados: ok, critical_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).