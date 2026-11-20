---
aliases:
- /es/integrations/abnormal_security
app_id: abnormal-security
categories:
- seguridad
- recopilación de logs
custom_kind: integración
description: Intégrate con Abnormal Security para obtener amenazas, casos y logs de
  auditoría.
media:
- caption: Dashboard de información general de Abnormal
  image_url: images/overview-dashboard.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: Abnormal Security
---
## Información general

Abnormal Security ofrece una protección completa del correo electrónico mediante una plataforma que comprende el comportamiento humano. Te protege frente a los ataques que se aprovechan del comportamiento humano, como el phishing, la ingeniería social y la apropiación de cuentas.

La integración de Datadog con Abnormal Security recopila logs utilizando la [API de Abnormal Security](https://app.swaggerhub.com/apis/abnormal-security/abx/1.4.3#/info), que genera tres tipos de logs:

- **Logs de amenaza**: los logs de amenaza incluyen cualquier actividad maliciosa o ataque que pueda dañar a una organización, sus datos o su personal.
- **Logs de caso**: los logs de caso incluyen casos de Abnormal que son identificados por Abnormal Security. Estos casos suelen incluir amenazas relacionadas dentro de ellos.
- **Logs de auditoría**: estos logs incluyen las acciones tomadas en el Portal de Abnormal.

## Configuración

### Configuración

1. Inicia sesión en tu [cuenta de Abnormal Security](https://portal.abnormalsecurity.com/home/settings/integrations).
1. Haz clic en **Abnormal REST API** (API de REST de Abnormal).
1. Recupera tu token de autenticación en el Portal de Abnormal.

Este token se utiliza para ver tus amenazas detectadas, casos y logs de auditoría de Abnormal.

### Validación

## Datos recopilados

### Métricas

La integración de Abnormal Security no incluye ninguna métrica.

### Recopilación de logs

Las incidencias, los casos y los logs de auditoría de Abnormal Security aparecerán en la fuente `abnormal-security`.

### Eventos

La integración de Abnormal Security no incluye ningún evento.

### Checks de servicio

La integración de Abnormal Security no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).