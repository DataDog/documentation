---
aliases:
- /es/integraciones/citrix_hypervisor
app_id: citrix-hypervisor
categories:
- nube
- recopilación de logs
custom_kind: integración
description: Monitoriza el estado y el rendimiento de un host de Citrix Hypervisor.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-citrix-hypervisor-datadog/
  tag: blog
  text: Monitoriza el rendimiento de Citrix Hypervisor con Datadog
integration_version: 6.0.0
media: []
supported_os:
- linux
- macos
- windows
title: Citrix Hypervisor
---
## Información general

Este check monitoriza [Citrix Hypervisor](https://www.citrix.com/products/citrix-hypervisor/) con el Datadog Agent.

## Configuración

Sigue las siguientes instrucciones para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de Citrix Hypervisor está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest).
No es necesaria ninguna instalación adicional en tu servidor.\
La forma recomendada de monitorizar hipervisores Citrix es instalar un Datadog Agent en cada hipervisor.

#### Usuario de Datadog

La integración de Citrix Hypervisor requiere un usuario con acceso al menos [`read-only`](https://docs.citrix.com/en-us/xencenter/7-1/rbac-roles.html) para monitorizar el servicio.

### Configuración

#### host

1. Edita el archivo `citrix_hypervisor.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para comenzar a recopilar tus datos de rendimiento de Citrix Hypervisor. Consulta el [ejemplo citrix_hypervisor.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/citrix_hypervisor/datadog_checks/citrix_hypervisor/data/conf.yaml.example) para ver todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

#### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade este bloque de configuración a tu archivo `citrix_hypervisor.d/conf.yaml` para empezar a recopilar tus logs de Citrix Hypervisor:

   ```yaml
   logs:
   - type: file
     path: /var/log/xensource.log
     source: citrix_hypervisor
   ```

   Cambia el valor de `path` y configúralo para tu entorno. Consulta el [archivo de ejemplo `citrix_hypervisor.d/conf.yaml` ](https://github.com/DataDog/integrations-core/blob/master/citrix_hypervisor/datadog_checks/citrix_hypervisor/data/conf.yaml.example) para ver todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `citrix_hypervisor` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **citrix_hypervisor.host.cache_hits** <br>(gauge) | IntelliCache tiene éxito en el repositorio de almacenamiento<br>_Mostrado como éxito_ |
| **citrix_hypervisor.host.cache_misses** <br>(gauge) | IntelliCache falla en el repositorio de almacenamiento<br>_Mostrado como fallo_. |
| **citrix_hypervisor.host.cache_size** <br>(gauge) | Repositorio de almacenamiento de tamaño de IntelliCache|
| **citrix_hypervisor.host.cpu** <br>(gauge) | Uso medio de la CPU<br>_Mostrado como porcentaje_. |
| **citrix_hypervisor.host.memory.free_kib** <br>(gauge) | Memoria disponible en el hipervisor<br>_Mostrado como kibibyte_ |
| **citrix_hypervisor.host.memory.reclaimed** <br>(gauge) | Memoria recuperada en el hipervisor|
| **citrix_hypervisor.host.memory.reclaimed_max** <br>(gauge) | Memoria máxima recuperada en el hipervisor|
| **citrix_hypervisor.host.memory.total_kib** <br>(gauge) | Memoria total en el hipervisor<br>_Mostrado como kibibyte_ |
| **citrix_hypervisor.host.pif.rx** <br>(gauge) | Kib de interfaz de red recibida<br>_Mostrado como kibibyte_ |
| **citrix_hypervisor.host.pif.tx** <br>(gauge) | Kib de interfaz de red enviada<br>_Mostrado como kibibyte_ |
| **citrix_hypervisor.host.pool.session_count** <br>(gauge) | Número de sesiones en el grupo de recursos<br>_Mostrado como sesión_ |
| **citrix_hypervisor.host.pool.task_count** <br>(gauge) | Número de tareas en el grupo de recursos<br>_Mostrado como tarea_ |
| **citrix_hypervisor.host.xapi.allocation_kib** <br>(gauge) | Asignación de memoria XAPI<br>_Mostrado como kibibyte_ |
| **citrix_hypervisor.host.xapi.free_memory_kib** <br>(gauge) | Memoria XAPI disponible<br>_Mostrada como kibibyte_ |
| **citrix_hypervisor.host.xapi.live_memory_kib** <br>(gauge) | Memoria activa XAPI<br>_Mostrado como kibibyte_ |
| **citrix_hypervisor.host.xapi.memory_usage_kib** <br>(gauge) | Uso de memoria XAPI<br>_Mostrado como kibibyte_ |
| **citrix_hypervisor.host.xapi.open_fds** <br>(gauge) | Descriptores de archivo XAPI abiertos|
| **citrix_hypervisor.vm.cpu** <br>(gauge) | Uso de la CPU de la máquina virtual<br>_Mostrado como porcentaje_. |
| **citrix_hypervisor.vm.memory** <br>(gauge) | Uso de memoria de máquina virtual<br>_Mostrado como kibibyte_ |

### Eventos

La integración de Citrix Hypervisor no incluye eventos.

### Checks de servicio

**citrix_hypervisor.can_connect**

Devuelve `CRITICAL` si el Agent no puede alcanzar el endpoint RRD. En caso contrario, devuelve `OK`.

_Estados: ok, crítico_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitoriza el rendimiento de Citrix Hypervisor con Datadog](https://www.datadoghq.com/blog/monitor-citrix-hypervisor-datadog/)