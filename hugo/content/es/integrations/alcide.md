---
categories:
- recopilación de logs
- Seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/alcide.md
description: Ingesta y proceso de tus logs de Alcide
doc_link: https://docs.datadoghq.com/integrations/alcide/
has_logo: true
integration_id: alcide
integration_title: Alcide
is_public: true
name: alcide
public_title: Integración de Datadog y Alcide
short_description: Ingesta y proceso de tus logs de Alcide
version: '1.0'
---

## Información general

Alcide brinda servicios de auditoría y monitorización de anomalías en Kubernetes. Esta integración permite a Datadog ingerir y procesar logs de Alcide.

## Configuración

### Instalación

Datadog habilita automáticamente un pipeline de procesamiento de logs cuando se detectan logs de Alcide. No se requiere ningún paso de instalación.

### Configuración

En Alcide, selecciona la pestaña _Integrations_ (Integraciones) y ve a la sección _Detections Integrations Configuration_ (Configuración de las integraciones de detección), que se utiliza para configurar integraciones para los logs de información de amenazas.

1. Selecciona **HTTP API** (API HTTP) como destino.

2. En la casilla URL, introduce `https://http-intake.logs.<DATADOG_SITE>/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&ddsource=alcide`. Sustituye el valor del parámetro `<DATADOG_SITE>` por `datadoghq.com` para el sitio de EE. UU., o por `datadoghq.eu` para el sitio de la UE. Sustituye el valor del parámetro `<DATADOG_API_KEY>` por su [clave de API de Datadog][1].

3. En _Entities Types_ (Tipos de entidades), selecciona los tipos sobre los que deseas reenviar información de amenazas. Datadog recomienda seleccionarlos todos.

4. En _Detection Categories_ (Categorías de detección), selecciona las categorías que desea reenviar. Datadog recomienda seleccionar tanto _incidents_ (incidencias) como _anomalies_ (anomalías).

5. En _Detection Confidence_ (Confianza de detección), selecciona los niveles de confianza deseados. Datadog recomienda seleccionar al menos _high_ (alto) y _medium_ (medio).

6. Opcionalmente, puedes crear filtros de inclusión y exclusión de entidades utilizando las casillas _Entities Matching_ y _Entities Not Matching_ (Entidades coincidentes y Entidades no coincidentes).

A continuación, ve a la sección _Selected Audit Entries Integration Configuration_ (Configuración de la integración de entradas de auditoría seleccionadas), situada debajo de la sección anterior. Esta sección se utiliza para configurar integraciones para los logs de auditoría.

1. Selecciona **HTTP API** (API HTTP) como destino.

2. En la casilla URL, introduce `https://http-intake.logs.<DATADOG_SITE>/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&ddsource=alcide`. Sustituye el valor del parámetro `<DATADOG_SITE>` por `datadoghq.com` para el sitio de EE. UU., o por `datadoghq.eu` para el sitio de la UE. Sustituye el valor del parámetro `<DATADOG_API_KEY>` por su [clave de API de Datadog][1].

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][2].

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /es/help/