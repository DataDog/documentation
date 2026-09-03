---
aliases:
- /es/integrations/logzio
app_id: logz-io
categories:
- event management
- ai/ml
custom_kind: integración
description: ELK con tecnología de IA como servicio
integration_version: 1.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Logz.io
---
## Información general

Logz.io es una plataforma SaaS unificada que recopila y analiza logs, métricas, y trazas (traces). La plataforma incluye funciones de IA para mejorar la resolución de problemas, reducir el tiempo de respuesta y ayudar a gestionar los costos.

Esta integración te permite:

- Ver alertas de Logz.io en tiempo real en Datadog

![import_alert_from_logz](https://raw.githubusercontent.com/DataDog/integrations-extras/master/logzio/images/import_alert_from_logz.jpg)

- Incorporar eventos de alertas en un dashboard para identificar correlaciones con métricas

![dashboard](https://raw.githubusercontent.com/DataDog/integrations-extras/master/logzio/images/dashboard.png)

## Configuración

### Instalación

Importa tus alertas a Datadog realizando los siguientes pasos:

1. Utiliza una [clave de la API de Datadog](https://app.datadoghq.com/organization-settings/api-keys) para crear un nuevo endpoint de alerta en Logz.io.
1. Crea una nueva alerta en Logz.io para una consulta específica.

Para una descripción más detallada de la configuración, consulta [Correlación de logs con Logz.io y Datadog](http://logz.io/blog/log-correlation-datadog).

## Datos recopilados

### Métricas

El check de Logz.io no incluye métricas.

### Eventos

El check de Logz.io no incluye eventos.

### Checks de servicio

El check de Logz.io no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).