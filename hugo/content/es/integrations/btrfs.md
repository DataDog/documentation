---
app_id: btrfs
categories:
- sistema operativo y sistema
custom_kind: integración
description: Monitoriza el uso en volúmenes Btrfs para que puedas responder antes
  de que se llenen.
integration_version: 4.0.0
media: []
supported_os:
- Linux
- macOS
title: Btrfs
---
![Métrica BTRFS](https://raw.githubusercontent.com/DataDog/integrations-core/master/btrfs/images/btrfs_metric.png)

## Información general

Obtén métricas de Btrfs en tiempo real para:

- Visualizar y monitorizar esta estados de Btrfs.

## Configuración

### Instalación

El check de Btrfs está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesitas instalar nada más en tus servidores que utilizan al menos un sistema de archivos Btrfs.

### Configuración

1. Edita el archivo `btrfs.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory). Consulta el [ejemplo btrfs.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/btrfs/datadog_checks/btrfs/data/conf.yaml.example) para ver todas las opciones de configuración disponibles:

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `btrfs` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **system.disk.btrfs.free** <br>(gauge) | Espacio libre en un dispositivo<br>_Se muestra en bytes_ |
| **system.disk.btrfs.total** <br>(gauge) | Cantidad total de espacio en un dispositivo<br>_Se muestra en bytes_ |
| **system.disk.btrfs.unallocated** <br>(gauge) | Cantidad de espacio no asignado en un dispositivo<br>_Se muestra en bytes_ |
| **system.disk.btrfs.usage** <br>(gauge) | Cantidad de espacio utilizado en un dispositivo como fracción del total<br>_Se muestra como fracción_ |
| **system.disk.btrfs.used** <br>(gauge) | Espacio utilizado en un dispositivo<br>_Se muestra en bytes_ |

### Eventos

El check de Btrfs no incluye eventos.

### Checks de servicio

El check de Btrfs no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).