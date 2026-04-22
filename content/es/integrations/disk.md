---
app_id: sistema
categories:
- sistema operativo y sistema
custom_kind: integración
description: El check de disco recopila métricas de los discos montados.
integration_version: 7.1.0
media: []
supported_os:
- Linux
- macOS
- Windows
title: Disco
---
## Información general

Recopila métricas relacionadas con el uso del disco y E/S.

## Configuración

### Instalación

El check de disco está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesitas instalar nada más en tu servidor.

### Configuración

El check de disco está activado por defecto, y el Agent recopila métricas en todas las particiones locales. Para configurar el check con opciones personalizadas, edita el archivo `disk.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory). Consulta el [ejemplo disk.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/disk/datadog_checks/disk/data/conf.yaml.default) para conocer todas las opciones de configuración disponibles.

#### Nota para hosts Windows

Existen tres casos en los que se puede utilizar el check de disco:

1. Monitorización de unidades físicas

La monitorización de unidades físicas representadas por una letra de disco (por ejemplo, C:, D:, etc.) es compatible con el check de disco sin ninguna consideración especial.

2. Monitorización de puntos de instalación anidados

La monitorización de carpetas montadas dentro de un sistema de archivos requiere permisos de administrador. Esto se debe a que la llamada a la función de Windows subyacente [FindFirstVolumeMountPoint](https://docs.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-findfirstvolumemountpointw) requiere permisos administrativos.
Para recopilar estas métricas sin conceder permisos de administrador al Agent, utiliza el [check PDH](https://docs.datadoghq.com/integrations/pdh_check/#pagetitle) para recopilar métricas de puntos de montaje a partir de los contadores de rendimiento correspondientes.

3. Monitorización de archivos compartidos

La recopilación de métricas de puntos de montaje para compartir archivos en Windows solo se admite utilizando la opción `create_mounts` en la configuración.
En Windows, cada carpeta montada solo es visible para el usuario que montó el recurso para compartir.
Por lo tanto, la opción `create_mounts` permite al Agent crear los puntos de montaje para la monitorización en el contexto del usuario del Agent.

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `disk` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **system.disk.free** <br>(gauge) | Cantidad de espacio libre en disco<br>_Se muestra en bytes_ |
| **system.disk.in_use** <br>(gauge) | Cantidad de espacio en disco en uso como porcentaje del total<br>_Se muestra como fracción_ |
| **system.disk.read_time** <br>(count) | Tiempo en ms dedicado a la lectura por dispositivo<br>_Se muestra en milisegundos_ |
| **system.disk.read_time_pct** <br>(rate) | Porcentaje de tiempo dedicado a leer del disco<br>_Se muestra como porcentaje_ |
| **system.disk.total** <br>(gauge) | Cantidad total de espacio en disco<br>_Se muestra en bytes_ |
| **system.disk.used** <br>(gauge) | Cantidad de espacio en disco en uso<br>_Se muestra en bytes_ |
| **system.disk.utilized** <br>(gauge) | Cantidad de espacio en disco en uso como porcentaje del total.<br>_Se muestra como porcentaje_ |
| **system.disk.write_time** <br>(count) | Tiempo en ms dedicado a la escritura por dispositivo<br>_Se muestra en milisegundos_ |
| **system.disk.write_time_pct** <br>(rate) | Porcentaje de tiempo dedicado a la escritura en disco<br>_Se muestra como porcentaje_ |
| **system.fs.inodes.free** <br>(gauge) | Número de inodos libres<br>_Se muestra como inodo_ |
| **system.fs.inodes.in_use** <br>(gauge) | Número de inodos en uso como porcentaje del total<br>_Se muestra como fracción_ |
| **system.fs.inodes.total** <br>(gauge) | Número total de inodos<br>_Se muestra como inodo_ |
| **system.fs.inodes.used** <br>(gauge) | Número de inodos en uso.<br>_Se muestra como inodo_ |
| **system.fs.inodes.utilized** <br>(gauge) | Número de inodos en uso como porcentaje del total<br>_Se muestra como porcentaje_ |

### Eventos

El check de disco no incluye eventos.

### Checks de servicio

**disk.read_write**

Devuelve `CRITICAL` si el sistema de archivos está en modo de solo lectura.

**Nota**: Este check de servicio no está activado por defecto. Para activar el check de servicio, configura `service_check_rw` como `true` en el archivo `conf.yaml` del check de disco.

_Estados: ok, critical, unknown_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).