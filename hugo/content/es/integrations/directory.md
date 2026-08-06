---
app_id: sistema
categories:
- sistema operativo y sistema
custom_kind: integración
description: La integración Directory informa de las métricas de archivos de un directorio
  proporcionado
integration_version: 4.0.1
media: []
supported_os:
- Linux
- macOS
- Windows
title: Directory
---
## Información general

Captura métricas de los directorios y archivos que elijas. El Agent recopila:

- Número de archivos
- Tamaño del archivo
- Tiempo de la última modificación
- Tiempo de la creación

## Configuración

### Instalación

El check Directory está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesitas instalar nada más en tu servidor.

### Configuración

1. Edita el archivo `directory.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para comenzar a recopilar tus datos de rendimiento de Directory. Consulta el [ejemplo directory.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/directory/datadog_checks/directory/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

   ```yaml
   init_config:

   instances:
     ## @param directory - string - required
     ## The directory to monitor. On windows, please make sure you escape back-slashes otherwise the YAML
     ## parser fails (eg. - directory: "C:\\Users\\foo\\Downloads").
     #
     - directory: "<DIRECTORY_PATH>"
   ```

   Asegúrate de que el usuario que ejecuta el proceso del Agent (normalmente `datadog-agent`) tiene acceso de lectura a los directorios, subdirectorios y archivos que configuras.

   **Nota**: En Windows cuando añada su directorio, utilice doble barra invertida `C:\\path\\to\\directory` en lugar de barra invertida simple `C:\path\to\directory` para que se ejecute la comprobación. De lo contrario, la comprobación del directorio falla con un rastreo que termina en el error: `found unknown escape character in "<string>"`.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `directory` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **system.disk.directory.bytes** <br>(gauge) | Tamaño total del directorio<br>_Se muestra en bytes_ |
| **system.disk.directory.file.bytes** <br>(gauge) | Tamaño total del archivo<br>_Se muestra en bytes_ |
| **system.disk.directory.file.created_sec_ago** <br>(gauge) | Duración desde la creación<br>_Se muestra en segundos_ |
| **system.disk.directory.file.modified_sec_ago** <br>(gauge) | Duración desde la última modificación<br>_Se muestra en segundos_ |
| **system.disk.directory.files** <br>(gauge) | Número de archivos en el directorio<br>_Se muestra como archivo_ |
| **system.disk.directory.folders** <br>(gauge) | Número de carpetas en el directorio<br>_Se muestra como archivo_ |

### Eventos

El check de Directory no incluye eventos.

### Checks de servicio

**system.disk.directory.exists**

Devuelve `WARNING` si el Agent no puede encontrar o acceder al directorio a monitorizar, y devuelve `OK` en caso contrario.

_Estados: ok, warning_

## Solucionar problemas

Cuando se ejecuta la comprobación en directorios muy grandes y la recursión está configurada como true, ten en cuenta que es una operación intensiva en E/S y uso de CPU. Puede ser necesario ajustar la frecuencia de comprobación por defecto, cada 15 segundos.

Por ejemplo, si hay un directorio con 15.000 archivos y subdirectorios y el check se ejecuta cada 30 a 40 segundos con un uso elevado de CPU, si no configuras una frecuencia menos frecuente de check, el check con un uso elevado de CPU se ejecuta de forma efectiva y continua.

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).