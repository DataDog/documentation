---
aliases:
- /es/integrations/amazon_certificate_manager
app_id: amazon-certificate-manager
categories:
- aws
- nube
- configuración y despliegue
- recopilación de logs
- aprovisionamiento
custom_kind: integración
description: AWS Certificate Manager le permite aprovisionar, gestionar y desplegar
  fácilmente certificados SSL/TLS públicos y privados.
media: []
title: AWS Certificate Manager
---
## Información general

AWS Certificate Manager te permite aprovisionar, gestionar y desplegar certificados SSL/TLS para su uso con servicios de AWS y recursos internos conectados.

Activa esta integración para ver todas tus métricas de Certificate Manager en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `CertificateManager` está habilitado en la pestaña `Metric Collection`.
1. Instala la integración [Datadog - AWS Certificate Manager](https://app.datadoghq.com/integrations/amazon-certificate-manager).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.certificatemanager.days_to_expiry** <br>(gauge) | Número de días que faltan para que caduque el certificado.<br>_Se muestra como días_ |

### Eventos

La integración de AWS Certificate Manager admite la caducidad de certificados y los eventos de cambio de estado de EventBridge.

### Checks de servicio

La integración de AWS Certificate Manager no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).