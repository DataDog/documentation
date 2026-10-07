---
app_id: orca-security
app_uuid: c5503835-004d-4f4b-bf61-57845767f8e1
assets:
  dashboards:
    Orca Security - Alerts: assets/dashboards/orca_security_alerts.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 32538198
    source_type_name: Orca Security
  logs:
    source: orca_security
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/orca_security/README.md
display_on_public_website: true
draft: false
git_integration_title: orca_security
integration_id: orca-security
integration_title: Orca Security
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: orca_security
public_title: Orca Security
short_description: Obtén información sobre los logs de alerta de Orca Security.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Obtén información sobre los logs de alerta de Orca Security.
  media:
  - caption: 'Orca Security: alertas'
    image_url: images/orca_security_alerts.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Orca Security
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

[Orca Security][1] es una plataforma de seguridad en la nube que identifica, prioriza y corrige los riesgos de seguridad y el cumplimiento. Ofrece funciones como visibilidad en tiempo real, gestión de vulnerabilidades, protección de cargas de trabajo, gestión de la postura de seguridad en la nube y gestión del cumplimiento.
Esta integración ingesta el siguiente log:

- Alerta: incluye información como el estado de la alerta, detalles de la cuenta, el activo donde se detectó la alerta y detalles adicionales.

La integración de Orca Security ingiere sin problemas los datos de logs de alerta utilizando la integración de Orca con Datadog. Antes de ingerir los datos, normaliza y enriquece los logs, garantiza un formato de datos coherente y mejora el contenido de la información para su posterior procesamiento y análisis. La integración proporciona información sobre los logs de alertas a través de dashboard predefinidos.

## Configuración

### Configuración

#### [Configuración de Orca Security para Datadog][2]

1. Inicia sesión en la plataforma de Orca Security.
2. Ve a **Settings** > **Connections** > **Integrations** (Configuración > Conexiones > Integraciones).
3. En la sección **SIEM/SOAR**, selecciona **Datadog** y, a continuación, haz clic en **Connect** (Conectar).

   Se abre la ventana de configuración de Datadog.
4. Especifica los siguientes ajustes:
   - **Clave de API**: añade la clave de API de tu plataforma de Datadog.
   - **Región**: selecciona la región en la que se encuentra tu instancia de Datadog.
5. Haz clic en **Save** (Guardar).
6. Haz clic en **Configure** (Configurar) en la integración de Datadog y activa la integración.
7. Ve a **Automations** (Automatizaciones) y haz clic en **+ Create Automation** (+ Crear automatización).
8. En la sección **Automation Details** (Detalles de la automatización), indica el **Automation Name** (Nombre de la automatización).
9. En la sección **Trigger Query** (Consulta de activación), selecciona todos los valores para el estado de alerta en la consulta. La consulta debe tener este aspecto: `When an alert Alert State is open,in_progress,snoozed,dismissed,closed`
10. En la sección **Define Results** (Definir resultados), activa **Apply to Existing Alerts** (Aplicar a alertas existentes) si las alertas existentes en la plataforma de Orca Security deben reenviarse a Datadog, o desactívalo para reenviar alertas recién generadas/actualizadas.  
**Nota**: Las alertas que se actualizaron hace más de 18 horas no se pueden ingerir en Datadog.
11. En la sección **SIEM/SOAR** bajo la sección **Define Results** (Definir resultados), marca **Datadog** y selecciona **Logs** como tipo de Datadog.
12. Haz clic en **Create** (Crear).

## Datos recopilados

### Logs

La integración de Orca recopila y reenvía logs de alerta de Orca a Datadog.

### Métricas

La integración de Orca no incluye ninguna métrica.

### Eventos

La integración de Orca no incluye ningún evento.

## Ayuda

Para obtener más ayuda, ponte en contacto con el [soporte de Datadog][3].

[1]: https://docs.orcasecurity.io/docs
[2]: https://docs.orcasecurity.io/docs/integrating-datadog
[3]: https://docs.datadoghq.com/es/help/