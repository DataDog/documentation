---
app_id: aspdotnet
categories:
- lenguajes
- recopilación de logs
- Windows
custom_kind: integración
description: Rastreo en tiempo real de las métricas de tus servicios ASP.NET
integration_version: 4.2.0
media: []
supported_os:
- Windows
title: ASP.NET
---
## Información general

Obtén métricas de ASP.NET en tiempo real para:

- Visualizar y monitorizar estados de ASP.NET
- Recibir notificaciones sobre fallos y eventos de ASP.NET

## Configuración

### Instalación

El check de ASP.NET está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesitas instalar nada más en tus servidores.

### Configuración

1. Edita el archivo `aspdotnet.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para empezar a recopilar tus datos de rendimiento de ASP.NET. Consulta el [aspdotnet.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/aspdotnet/datadog_checks/aspdotnet/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent)

**Nota**: Las versiones 1.9.0 o posteriores de este check utilizan una nueva implementación para la recopilación de métricas, que requiere Python 3. Para hosts que no pueden utilizar Python 3, o si deseas utilizar una versión anterior de este check, consulta la siguiente [configuración](https://github.com/DataDog/integrations-core/blob/7.33.x/aspdotnet/datadog_checks/aspdotnet/data/conf.yaml.example).

#### Recopilación de logs

ASP.NET utiliza el registro IIS (Internet Information Services). Sigue las [instrucciones de configuración de IIS](https://docs.datadoghq.com/integrations/iis/?tab=host#setup) para ver los logs relacionados con las solicitudes y los fallos de ASP.NET.

Las excepciones y los eventos de nivel 500 no controlados relacionados con tu aplicación ASP.NET se pueden ver con el Log de eventos de la aplicación de Windows.

### Validación

[Ejecuta el subcomando del Agent `status` ](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `aspdotnet` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aspdotnet.application_restarts** <br>(gauge) | Muestra el número de veces que se ha reiniciado la aplicación durante la vida del servidor web.|
| **aspdotnet.applications.forms_authentication.failure** <br>(gauge) | Número de solicitudes de acceso fallidas realizadas<br>_Se muestra como solicitud_ |
| **aspdotnet.applications.forms_authentication.successes** <br>(gauge) | Número de solicitudes de acceso realizadas con éxito<br>_Se muestra como solicitud_ |
| **aspdotnet.applications.requests.executing** <br>(gauge) | Muestra el número de solicitudes que se están ejecutando actualmente.<br>_Se muestra como solicitud_ |
| **aspdotnet.applications.requests.in_queue** <br>(gauge) | Muestra el número de solicitudes en la cola de solicitudes de la aplicación.<br>_Se muestra como solicitud_ |
| **aspdotnet.applications.requests.persec** <br>(gauge) | Muestra el número de solicitudes ejecutadas por segundo.<br>_Se muestra como solicitud_ |
| **aspdotnet.request.wait_time** <br>(gauge) | Muestra el número de ms que la solicitud más reciente estuvo esperando en la cola.<br>_Se muestra como milisegundo_ |
| **aspdotnet.worker_process_restarts** <br>(gauge) | Muestra el número de veces que se ha reiniciado un proceso worker en el ordenador.|

### Eventos

El check de ASP.NET no incluye eventos.

### Checks de servicio

El check de ASP.NET no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).