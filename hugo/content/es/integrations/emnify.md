---
app_id: emnify
categories:
- iot
- métricas
custom_kind: integración
description: Monitores y dashboard para métricas de uso de datos de EMnify
integration_version: 1.0.0
media:
- caption: El dashbord todo en uno te permite observar el consumo de la organización
    y analizar los patrones de uso de tu inventario de dispositivos.
  image_url: images/data_usage_dashboard.png
  media_type: imagen
- caption: Monitoriza cuando el intercambio de datos se ha detenido inesperadamente
    para un dispositivo.
  image_url: images/datastop_monitor.png
  media_type: imagen
- caption: Predice y notifica cuando el consumo de datos hubiera superado las previsiones.
  image_url: images/above_forecast_monitor.png
  media_type: imagen
- caption: Recibe una notificación cuando la recepción de datos de un dispositivo
    sea superior a la habitual.
  image_url: images/high_data_monitor.png
  media_type: imagen
- caption: Recibe una notificación cuando un dispositivo tenga una transmisión de
    datos superior a la habitual.
  image_url: images/high_transmission_monitor.png
  media_type: imagen
title: EMnify
---
## Información general

[EMnify](https://www.emnify.com/) es una plataforma celular de conectividad IoT que mantiene los dispositivos
conectados y seguros.

Utiliza la integración de Datadog-EMnify para recopilar métricas y el uso de datos de los dispositivos de IoT EMnify.

## Configuración

Sigue la [guía de integración de EMnify](https://www.emnify.com/integration-guides/emnify-datastreamer-integration-for-datadog) para configurar la transmisión de datos de uso, utilizando las secciones **Integration steps** (Pasos de la integración) y **Verifying the integration** (Verificación de la integración).

### Monitores

Todo el mundo tiene diferentes patrones de uso, por lo que para que los monitores reflejen tu caso específico debes
definir límites y sensibilidad en función de la carga de trabajo.
Para obtener más información, consulta la documentación [Monitor de previsión](https://docs.datadoghq.com/monitors/create/types/forecasts/?tab=linear) y [Monitor de anomalías)](https://docs.datadoghq.com/monitors/create/types/anomaly/).

### Dashboard

Elige un periodo de tiempo en el [dashboard](https://app.datadoghq.com/dashboard/lists?q=emnify) para filtrar los datos mostrados.

## Soporte

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de EMnify](https://support.emnify.com/hc/en-us).