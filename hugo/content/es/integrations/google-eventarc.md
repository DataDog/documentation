---
aliases:
- /es/integrations/google_eventarc
app_id: google-eventarc
categories:
- nube
- google cloud
custom_kind: integración
description: Eventarc te permite importar eventos desde servicios Google, SaaS y tus
  propias aplicaciones.
further_reading:
- link: https://www.datadoghq.com/blog/incident-response-eventarc-datadog/
  tag: blog
  text: Automatizar los flujos de trabajo de respuesta a incidentes con Eventarc y
    Datadog
media: []
title: Google Eventarc
---
## Información general

Envía tus eventos de Datadog a [Eventarc](https://cloud.google.com/eventarc/docs) para su entrega a servicios Google, lo que te permite iniciar flujos de trabajo impulsados por Eventarc con notificaciones de monitor de Datadog.

## Configuración

1. Asegúrate de que la [integración GCP] (https://docs.datadoghq.com/integrations/google-cloud-platform/) principal está instalada para cada proyecto GCP que reciba notificaciones.

1. [Crear un canal Eventarc](https://cloud.google.com/eventarc/docs/third-parties/create-channels) en la consola de Google Cloud.

1. En la aplicación Datadog, define el nombre y el token de activación de tu canal en la [sección de notificaciones](https://docs.datadoghq.com/monitors/notify/) de un monitor utilizando la sintaxis que se muestra en el siguiente ejemplo:

![Sección "Dinos lo que está pasando" de la página de configuración de un monitor de Datadog con el título HDD Disk Size Above Capacity (Tamaño de disco duro supera la capacidad) y una línea en el cuerpo de la notificación que envía a un canal eventarc con el siguiente ejemplo: La notificación de alerta será enviada a @eventarc-datadog-sandbox_us-central1_my-channel que activará Cloud Function: Bump Quota.][5]

### Validación

Una vez activada la integración, el canal pasa de **Pendiente** a **Activo** en la consola de Google Cloud.

### Acciones automatizadas

Configura nuevos canales de salida de notificaciones para monitores a fin de iniciar acciones automatizadas con la integración GCP Eventarc. Con las acciones automatizadas, puedes configurar tus recursos GCP para:

- Utilizar monitores Datadog para iniciar flujos de trabajo de Eventarc
- Vincular, dentro de Google, funciones Cloud, BigQuery, etc., con monitores Datadog
- Utilizar la información contenida en el evento de alerta para ejecutar pipelines y runbooks de corrección automática, ejecutar consultas de análisis, etc.

La lista completa de recursos a los que puedes apuntar está disponible en la [documentación de GCP](https://cloud.google.com/eventarc/docs/targets).

## Datos recopilados

### Métricas

La integración Google Eventarc no incluye métricas.

### Eventos

El Google Eventarc integración no incluye ninguna eventos.

### Checks de servicio

La integración Google Eventarc no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Automatizar los flujos de trabajo de respuesta a incidentes con Eventarc y Datadog](https://www.datadoghq.com/blog/incident-response-eventarc-datadog/)