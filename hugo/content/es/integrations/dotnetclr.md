---
app_id: dotnetclr
categories:
- lenguajes
- Windows
custom_kind: integración
description: Visualizar y monitorizar estados de Dotnetclr
integration_version: 4.2.0
media: []
supported_os:
- Windows
title: CLR de .NET
---
## Información general

Obtén métricas del servicio CLR .NET en tiempo real para:

- Visualiza y monitoriza estados CLR .NET.
- Recibe notificaciones sobre fallos y eventos CLR .NET.

## Configuración

### Instalación

El check CLR de .NET se incluye en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest). No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. Edita el archivo `dotnetclr.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para comenzar a recopilar tus datos de rendimiento del CLR de .NET. Consulta el [dotnetclr.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/dotnetclr/datadog_checks/dotnetclr/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.
1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

**Nota**: Las versiones 1.10.0 o posteriores de este check utilizan una nueva implementación para la recopilación de métricas, que requiere Python 3. Para hosts que no pueden utilizar Python 3, o si deseas utilizar una versión anterior de este check, consulta la siguiente [configuración](https://github.com/DataDog/integrations-core/blob/7.33.x/dotnetclr/datadog_checks/dotnetclr/data/conf.yaml.example).

## Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `dotnetclr` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **dotnetclr.exceptions.thrown_persec** <br>(gauge) | El número de excepciones lanzadas por segundo.<br>_Se muestra como ocurrencia_ |
| **dotnetclr.memory.committed.heap_bytes** <br>(gauge) | El número total de bytes comprometidos.<br>_Se muestra como byte_ |
| **dotnetclr.memory.reserved.heap_bytes** <br>(gauge) | El número total de bytes reservados.<br>_Se muestra como byte_ |
| **dotnetclr.memory.time_in_gc** <br>(gauge) | El porcentaje de tiempo en la recolección de elementos no usados.<br>_Se muestra como porcentaje_ |

### Checks de servicio

El check de CLR .NET no incluye checks de servicio.

### Eventos

El check de CLR .NET no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).