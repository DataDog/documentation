---
aliases:
- /es/integrations/hyperv
app_id: hyper-v
categories:
- nube
- sistema operativo y sistema
- Windows
custom_kind: integración
description: Monitoriza la tecnología de virtualización de Hyper-V de Microsoft.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-microsoft-hyperv-with-datadog
  tag: blog
  text: Monitorizar Microsoft Hyper-V con Datadog
integration_version: 3.0.0
media: []
supported_os:
- Windows
title: HyperV
---
## Información general

Este check monitoriza [Hyper-V](https://docs.microsoft.com/en-us/windows-server/virtualization/hyper-v/hyper-v-on-windows-server) a través del Datadog Agent.

## Configuración

### Instalación

El check de Hyper-V se incluye en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest). No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. Edita el archivo `hyperv.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para recopilar tus datos de rendimiento de Hyper-V. Consulta el [hyperv.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/hyperv/datadog_checks/hyperv/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

**Nota**: Las versiones 1.5.0 o posteriores de este check utilizan una nueva implementación para la recopilación de métricas, que requiere Python 3. Para hosts que no pueden utilizar Python 3, o si deseas utilizar una versión anterior de este check, consulta la siguiente [configuración](https://github.com/DataDog/integrations-core/blob/7.33.x/hyperv/datadog_checks/hyperv/data/conf.yaml.example).

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `hyperv` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **hyperv.dynamic_memory_balancer.available_memory** <br>(gauge) | La cantidad de memoria que queda en el nodo.<br>_Se muestra como byte_ |
| **hyperv.dynamic_memory_balancer.average_pressure** <br>(gauge) | Este contador representa la presión media en la VM.<br>_Se muestra en porcentaje_ |
| **hyperv.hypervisor_logical_processor.context_switches_per_sec** <br>(gauge) | La velocidad combinada a la que todos los procesadores del ordenador pasan de un subproceso a otro.<br>_Se muestra como operación_ |
| **hyperv.hypervisor_logical_processor.guest_run_time** <br>(gauge) | El porcentaje de tiempo empleado por el procesador en código invitado.<br>_Se muestra como porcentaje_ |
| **hyperv.hypervisor_logical_processor.hypervisor_run_time** <br>(gauge) | Porcentaje de tiempo dedicado por el procesador al código del hipervisor.<br>_Se muestra como porcentaje_ |
| **hyperv.hypervisor_logical_processor.idle_time** <br>(gauge) | Porcentaje de tiempo que pasa el procesador en estado inactivo.<br>_Se muestra como porcentaje_ |
| **hyperv.hypervisor_logical_processor.total_run_time** <br>(gauge) | Porcentaje de tiempo dedicado por el procesador al código del huésped y del hipervisor.<br>_Se muestra como porcentaje_ |
| **hyperv.hypervisor_root_virtual_processor.guest_run_time** <br>(gauge) | Porcentaje de tiempo empleado por el procesador virtual en código huésped.<br>_Se muestra como porcentaje_ |
| **hyperv.hypervisor_root_virtual_processor.hypervisor_run_time** <br>(gauge) | Porcentaje de tiempo dedicado por el procesador virtual al código del hipervisor.<br>_Se muestra como porcentaje_ |
| **hyperv.hypervisor_root_virtual_processor.total_run_time** <br>(gauge) | Porcentaje de tiempo dedicado por el procesador virtual al código del huésped y del hipervisor.<br>_Se muestra como porcentaje_ |
| **hyperv.hypervisor_virtual_processor.guest_run_time** <br>(gauge) | Porcentaje de tiempo empleado por el procesador virtual en código huésped.<br>_Se muestra como porcentaje_ |
| **hyperv.hypervisor_virtual_processor.hypervisor_run_time** <br>(gauge) | Porcentaje de tiempo dedicado por el procesador virtual al código del hipervisor.<br>_Se muestra como porcentaje_ |
| **hyperv.hypervisor_virtual_processor.total_run_time** <br>(gauge) | Porcentaje de tiempo dedicado por el procesador virtual al código del huésped y del hipervisor.<br>_Se muestra como porcentaje_ |
| **hyperv.virtual_network_adapter.bytes_per_sec** <br>(gauge) | La velocidad a la que se envían y reciben bytes a través de cada adaptador de red.<br>_Se muestra como byte_ |
| **hyperv.vm_vid_partition.physical_pages_allocated** <br>(gauge) | El número de páginas físicas asignadas.<br>_Se muestra como bloque_ |
| **hyperv.vm_vid_partition.remote_physical_pages** <br>(gauge) | El número de páginas físicas no asignadas desde el nodo NUMA preferido.<br>_Se muestra como bloque_ |

### Checks de servicio

Hyper-V no incluye checks de servicio.

### Eventos

Hyper-V no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitorizar Microsoft Hyper-V con Datadog](https://www.datadoghq.com/blog/monitor-microsoft-hyperv-with-datadog)