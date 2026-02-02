---
categories:
- log collection
- Security
description: Ingesta y proceso de tus logs de Alcide
doc_link: https://docs.datadoghq.com/integrations/alcide/
dependencies: ["https://github.com/DataDog/documentation/blob/master/content/en/integrations/alcide.md"]
has_logo: true
integration_title: Alcide
is_public: true
custom_kind: integration
name: alcide
public_title: Integración de Datadog y Alcide
short_description: Ingesta y proceso de tus logs de Alcide
version: '1.0'
integration_id: "alcide"
---

## Información general

Alcide proporciona servicios de auditoría y monitorización de anomalías de Kubernetes. Esta integración permite a Datadog ingerir y procesar registros de Alcide.

## Ajuste

### Instalación

Datadog habilita automáticamente un pipeline de procesamiento de logs cuando se detectan logs de Alcide. No se requiere ningún paso de instalación.

### Configuración

En Alcide, seleccione la pestaña _Integrations_ y vaya a la sección _Detections Integrations Configuration_ (Configuración de las integraciones de detección), que se utiliza para configurar integraciones para los logs de información de amenazas.

1. Seleccione **HTTP API** como destino.

2. En el cuadro URL, introduzca `https://http-intake.logs.<DATADOG_SITE>/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&ddsource=alcide`. Sustitúyase el `<DATADOG_SITE>` de valor del marcador de posición por `datadoghq.com` para el sitio de EE.UU. o por `datadoghq.eu` para el sitio de la UE. Reemplace el `<DATADOG_API_KEY>` de valor del marcador de posición por su [clave API Datadog][1].

3. En _Entities Types_, seleccione los tipos sobre los que desea reenviar la información de amenazas. Datadog recomienda seleccionar todos estos.

4. En _Detection Categories_, seleccione las categorías que desea reenviar. Datadog recomienda seleccionar tanto _incidents_ como _anomalies_.

5. En _Detection Confidence_, seleccione los niveles de confianza deseados. Datadog recomienda seleccionar al menos _high_ y _medium_.

6. Opcionalmente, puede crear filtros de inclusión y exclusión de entidades utilizando las casillas _Entities Matching_ y _Entities Not Matching_.

Luego, vaya a la sección _Selected Audit Entries Integration Configuratio_, ubicada debajo de la sección anterior. Esta sección se utiliza para configurar integraciones para registros de auditoría.

1. Seleccione **HTTP API** como destino.

2. En el cuadro URL, introduzca `https://http-intake.logs.<DATADOG_SITE>/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&ddsource=alcide`. Sustitúyase el `<DATADOG_SITE>` de valor del marcador de posición por `datadoghq.com` para el sitio de EE.UU. o por `datadoghq.eu` para el sitio de la UE. Reemplace el `<DATADOG_API_KEY>` de valor del marcador de posición por su [clave API Datadog][1].

## Solucionar problemas

¿Necesitas ayuda? Contactar con el [equipo de asistencia][2] de Datadog.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /help/
