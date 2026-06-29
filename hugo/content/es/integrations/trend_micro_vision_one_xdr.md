---
app_id: trend-micro-vision-one-xdr
app_uuid: 5efb1591-f9ef-45a3-8b8e-9f716df68f16
assets:
  dashboards:
    Trend Micro Vision One XDR - Observed Attack Techniques: assets/dashboards/trend_micro_vision_one_xdr_observed_attack_techniques.json
    Trend Micro Vision One XDR - Workbench Alerts: assets/dashboards/trend_micro_vision_one_xdr_workbench_alerts.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 22902543
    source_type_name: Trend Micro Vision One XDR
  logs:
    source: trend-micro-vision-one-xdr
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
- https://github.com/DataDog/integrations-core/blob/master/trend_micro_vision_one_xdr/README.md
display_on_public_website: true
draft: false
git_integration_title: trend_micro_vision_one_xdr
integration_id: trend-micro-vision-one-xdr
integration_title: Trend Micro Vision One XDR
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: trend_micro_vision_one_xdr
public_title: Trend Micro Vision One XDR
short_description: Obtener información sobre logs de Trend Micro Vision One XDR
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Obtener información sobre logs de Trend Micro Vision One XDR
  media:
  - caption: Trend Micro Vision One XDR - Alertas de Workbench
    image_url: images/trend_micro_vision_one_xdr_workbench_alerts.png
    media_type: imagen
  - caption: Trend Micro Vision One XDR - Técnicas de ataque observadas
    image_url: images/trend_micro_vision_one_xdr_oat.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Trend Micro Vision One XDR
---

<!--  FUENTE https://github.com/DataDog/integrations-core -->
## Información general

[Trend Micro Vision One XDR][1] recopila y correlaciona automáticamente los datos en varias capas de seguridad: correo electrónico, endpoint, servidor, carga de trabajo en la nube y red. Esto permite una detección más rápida de las amenazas, mejora la investigación y los tiempos de respuesta mediante un análisis de seguridad mejorado.

Esta integración ingiere los siguientes logs:

- **Alertas de Workbench**: Este endpoint contiene información sobre todas las alertas independientes activadas por modelos de detección.
- **Técnicas de ataque observadas**: Este endpoint contiene información sobre técnicas de ataque observadas a partir de fuentes de datos de Detecciones, Actividad de endpoint, Actividad en la nube, Actividad de correo electrónico, Actividad móvil, Actividad de red, Actividad en contenedor y Actividad de identidad.

Esta integración recopila logs de las fuentes mencionadas anteriormente y las envía a Datadog para ser analizados con nuestros productos Explorador de logs y Cloud SIEM
* [Explorador de logs][2]
* [Cloud SIEM][3]

## Configuración

### Generar credenciales de API en Trend Micro Vision One XDR

1. En la consola de Trend Vision One, ve al menú de la barra lateral izquierda y accede a **Administration > API Keys** (Administración > Claves de API).
2. Genera un nuevo token de autenticación. Haz clic en **Add API key** (Añadir clave de API). Especifica la configuración de la nueva clave de API con lo siguiente:
    - **Nombre**: Un nombre significativo que pueda ayuda identificar la clave de API.
    - **Rol**: El rol de usuario asignado a la clave. Selecciona **SIEM** en el menú desplegable.
    - **Tiempo de caducidad**: El tiempo de validez de la clave de API.
    - **Estado**: Si la clave de API está habilitada.
    - **Detalles**: Información adicional sobre la clave de API.
3. Haz clic en **Add** (Añadir).
4. Para identificar la región host de tu consola de Trend Micro Vision One XDR, consulta [aquí][4].

### Conectar tu cuenta de Trend Micro Vision One XDR a Datadog

1. Añade tu región host y tu clave de API.
    | Parámetros | Descripción |
    | ----------- | ------------------------------------------------------- |
    | Región host  | La región de tu consola de Trend Micro Vision One XDR.  |
    | Clave de API | La clave de API de tu consola de Trend Micro Vision One XDR. |

2. Haz clic en el botón Save (Guardar) para guardar la configuración.

## Datos recopilados

### Logs
La integración Trend Micro Vision One XDR recopila y reenvía alertas de Workbench y logs de las técnicas de ataque observadas a Datadog.

### Métricas

Trend Micro Vision One XDR no incluye métricas.

### Checks de servicio

Trend Micro Vision One XDR no incluye checks de servicios.

### Eventos

Trend Micro Vision One XDR no incluye eventos.

## Ayuda

Para obtener más ayuda, ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://www.trendmicro.com/en_in/business/products/detection-response/xdr.html
[2]: https://docs.datadoghq.com/es/logs/explorer/
[3]: https://www.datadoghq.com/product/cloud-siem/
[4]: https://success.trendmicro.com/en-US/solution/ka-0015959
[5]: https://docs.datadoghq.com/es/help/