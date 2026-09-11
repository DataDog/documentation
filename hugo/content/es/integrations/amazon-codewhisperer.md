---
aliases:
- /es/integrations/amazon_codewhisperer
app_id: amazon-codewhisperer
categories:
- aws
- métricas
- nube
- ia/ml
- herramientas de desarrollo
custom_kind: integración
description: Amazon CodeWhisperer es un servicio de recomendación de código basado
  en ML.
media: []
title: Amazon CodeWhisperer
---
## Información general

Amazon CodeWhisperer es un servicio con tecnología de machine learning que ayuda a mejorar la productividad de los desarrolladores generando recomendaciones de código basadas en sus comentarios en lenguaje natural y el código en el entorno de desarrollo integrado (IDE).

Activa esta integración para ver todas tus métricas de CodeWhisperer en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `CodeWhisperer` está habilitado en la pestaña `Metric Collection`.
1. Instala la integración [Datadog - Amazon CodeWhisperer](https://app.datadoghq.com/integrations/amazon-codewhisperer).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.codewhisperer.daily_active_user_trend** <br>(count) | Número de usuarios activos en un periodo de 1 día.<br>_Se muestra como usuario_ |
| **aws.codewhisperer.invocations** <br>(count) | Número de invocaciones.<br>_Se muestra como invocación_ |
| **aws.codewhisperer.monthly_active_unique_users** <br>(count) | Número de usuarios únicos que están activos en un mes determinado.<br>_Se muestra como usuario_ |
| **aws.codewhisperer.subscription_count** <br>(count) | Número de usuarios con suscripciones de pago.<br>_Se muestra como usuario_ |

### Eventos

La integración de Amazon CodeWhisperer no incluye ningún evento.

### Checks de servicio

La integración de Amazon CodeWhisperer no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).