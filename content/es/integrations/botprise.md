---
app_id: botprise
categories:
- events
custom_kind: integración
description: Integración Botprise para monitorizar eventos generados
integration_version: 1.0.0
media: []
supported_os:
- Linux
- Windows
- macOS
title: Botprise
---
## Información general

La integración de Botprise en Datadog te permite enviar eventos generados por [Botprise](https://www.botprise.com/) a Datadog mediante webhooks. Ayuda a monitorizar tus aplicaciones y a garantizar que Botprise funciona como se espera.

![image-datadog-botprise-events](https://raw.githubusercontent.com/DataDog/integrations-extras/master/botprise/images/datadog-botprise-events.png)

## Configuración

Para utilizar la integración Botprise-Datadog, debes ser cliente de Botprise. Para obtener más información sobre Botprise, consulta [https://www.botprise.com/](https://www.botprise.com/).

### Instalación

### Configuración

1. Instala el Datadog Agent en tus dispositivos de laboratorio.
1. Una vez realizada la instalación, tus dispositivos empezarán a enviar datos a Datadog. Visualiza los datos en la [lista de hosts de Datadog](https://app.datadoghq.com/infrastructure/map).
1. En Datadog, crea un monitor para cada uno de los hosts. Datadog genera alertas basadas en las reglas del monitor.
1. Configura cada monitor para [métricas](https://docs.datadoghq.com/metrics/) y el valor de umbral respectivo.
1. Modifica la configuración del monitor para crear un ticket de [ServiceNow](https://developer.servicenow.com/dev.do#!/home) para cada una de las alertas entrantes.
1. Genera una [clave de API y una clave de aplicación](https://docs.datadoghq.com/account_management/api-app-keys/) para llamar a las API Rest de Datadog.

## Datos recopilados

### Métricas

La integración Botprise no proporciona métricas.

### Checks de servicio

La integración Botprise no incluye checks de servicio.

### Eventos

Todos los eventos se envían al flujo (stream) de eventos de Datadog.

### Configuración

Para utilizar la API Datadog, debes ingresar una [clave de API y una clave de aplicación](https://docs.datadoghq.com/account_management/api-app-keys/).

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).