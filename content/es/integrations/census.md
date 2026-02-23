---
app_id: census
categories:
- automatización
custom_kind: integración
description: Envía tus métricas y eventos sincronizadas de Census a Datadog.
integration_version: 1.0.0
media:
- caption: Dashboard con información general de sincronización de Census
  image_url: images/census_dashboard.png
  media_type: imagen
supported_os:
- Linux
- Windows
- macOS
title: Census
---
## Información general

[Census](https://www.getcensus.com/) es una plataforma ETL inversa que convierte tu almacén de datos en un centro de operaciones comerciales y de marketing, lo que permite a los equipos disponer de datos fiables y procesables. Sincroniza los datos de una fuente de verdad como un almacén de datos a un sistema de acciones como un CRM, una plataforma de publicidad u otra aplicación SaaS para operacionalizar los datos.

Census se integra con Datadog para ofrecer a los desarrolladores la posibilidad de monitorizar sus flujos de trabajo de Census y realizar un seguimiento del número de sincronizaciones exitosas y fallidas. Esta integración envía [métricas](##metrics) y eventos a Datadog desde Census.

## Requisitos

Para habilitar esta integración, se requiere una suscripción de nivel Census Platform (o posterior).

## Configuración

1. Inicia sesión en tu [cuenta de Census](https://app.getcensus.com/).
1. Ve al espacio de trabajo de Census que quieres conectar a tu cuenta de Datadog.
1. Ve a la pestaña de configuración del espacio de trabajo y haz clic en **Configure** (Configurar) en el cuadro de Datadog.
1. Haz clic en **Connect** (Conectar) para conectarte a tu cuenta de Datadog mediante OAuth2.
1. Vuelve a Datadog y abre el dashboard Census predefinido.

### Validación

Ejecuta una sincronización en tu espacio de trabajo Census y consulta las métricas y los eventos correspondientes en el dashboard Census de tu cuenta de Datadog. Tras la finalización de la sincronización, las métricas y los eventos pueden tardar hasta un par de minutos en ser transmitidos a Datadog.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **census.syncs.rows_processed** <br>(count) | Número de filas procesadas por una sola sincronización.<br>_Se muestra como elemento_ |
| **census.syncs.sync_completed** <br>(count) | Número de sincronizaciones completadas.<br>_Se muestra como unidad_ |

### Checks de servicio

Census no incluye checks de servicios.

### Eventos

Esta integración envía eventos de finalización de sincronizaciones a Datadog.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).