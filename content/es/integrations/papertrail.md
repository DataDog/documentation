---
app_id: papertrail
categories:
- event management
- notifications
custom_kind: integración
description: Visualiza, realiza búsquedas y discute sobre logs de Papertrail en tu
  flujo (stream) de eventos de Datadog.
integration_version: 1.0.0
media: []
title: Papertrail
---
![Ejemplo de Papertrail](images/papertrailexample.png)

## Información general

Utiliza Papertrail y Datadog para:

- Convertir los datos de logs de formato libre en métricas procesables.
- Evitar los conocimientos operativos aislados. Visualiza y correlaciona métricas derivadas de logs junto con métricas a nivel de sistema.

## Configuración

### Instalación

Para capturar métricas de Papertrail:

1. En el [visor de eventos](https://papertrailapp.com/events) de Papertrail, guarda una búsqueda de los evento de log que deben ser graficados.

1. Ingresa el nombre de la búsqueda y haz clic en el botón **Save & Setup an Alert** (Guardar y configurar una alerta).

1. En Gráficas y métricas, elige Datadog.
   ![Notificaciones Papertrail](images/papertrailnotify.png)

1. Elige la frecuencia de tus alertas y otros detalles.

1. Proporciona tu clave de API Datadog, introduce el nombre elegido para tu métrica y, opcionalmente, introduce algunas etiquetas (tags) para asociar a la métrica.
   ![Notificaciones Papertrail](images/papertraildetails.png)

1. Haz clic en el botón **Create Alert** (Crear alerta).

Papertrail actualiza Datadog según el intervalo elegido.

### Configuración

No es necesario ningún paso de configuración para esta integración.

## Datos recopilados

### Métricas

La integración de Papertrail no incluye métricas.

### Eventos

La integración de Papertrail recopila eventos.

### Checks de servicio

La integración de Papertrail no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).