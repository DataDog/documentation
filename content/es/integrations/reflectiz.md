---
app_id: reflectiz
app_uuid: 79767e7d-f5db-4528-aeea-1cd68649ccd8
assets:
  dashboards:
    web exposure alerts dashboard: assets/dashboards/WebExposureAlertsDashboard.json
    web exposure rating dashboard: assets/dashboards/WebExposureRatingDashboard.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: reflectiz.v1.rating.overall
      metadata_path: metadata.csv
      prefix: reflectiz.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 5421
    source_type_name: reflectiz
  oauth: assets/oauth_clients.json
author:
  contact_link: https://www.reflectiz.com/
  homepage: https://www.reflectiz.com/
  name: Reflectiz
  sales_email: inbound@reflectiz.com
  support_email: support@reflectiz.com
categories:
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/reflectiz/README.md
display_on_public_website: true
draft: false
git_integration_title: reflectiz
integration_id: reflectiz
integration_title: Reflectiz
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: reflectiz
public_title: Reflectiz
short_description: La integración Reflectiz proporciona información sobre la seguridad
  de tu sitio web.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Security
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Configuración
  description: La integración Reflectiz proporciona información sobre la seguridad
    de tu sitio web.
  media:
  - caption: Dashboard de calificación de la exposición web
    image_url: images/dashboard_2.png
    media_type: imagen
  - caption: Dashboard de alertas de exposición web
    image_url: images/dashboard_1.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Reflectiz
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->
## Información general

La innovadora solución agentless de Reflectiz monitoriza y detecta vulnerabilidades en todas las aplicaciones de primeras, terceras y cuartas parte de tu ecosistema en línea, lo que te proporciona una visibilidad completa de tu exposición al riesgo web. Prioriza y corrige eficazmente los riesgos y los problemas de cumplimiento mediante tu sistema propietario de calificación de la exposición.

Esta integración mejora la seguridad de tu sitio web mediante la introducción de la **Calificación de la exposición web** y las **Alertas de exposición web** en Datadog, lo que permite la evaluación proactiva y la mitigación de los riesgos de seguridad.

La integración ofrece una combinación de logs y métricas para apoyar tanto las calificaciones como las alertas.

### Funciones

- **Calificación de la exposición web**: Obtén una calificación de seguridad clara y completa de los componentes de tu sitio web. La función Reflectiz Rating proporciona una evaluación rápida del estado de seguridad de tu sitio web, lo que te ayuda a comprender dónde te encuentras y qué mejoras son necesarias.
- **Alertas de exposición web**: Mantente al tanto en tiempo real de los posibles riesgos y vulnerabilidades. La integración genera alertas detalladas que te notifican de los errores de configuración, de las actividades sospechosas y de las amenazas emergentes para que puedas tomar medidas inmediatas.
- **Integración continua con Datadog**: Consulta tanto la clasificación como las alertas de riesgo de Reflectiz directamente en tu entorno Datadog. Esto te permitirá monitorizar la seguridad de tu sitio web junto con las métricas de rendimiento e infraestructura, todo en una plataforma centralizada.
- **Priorizar lo que más importa**: Con la calificación y las alertas procesables de Reflectiz, puedes identificar y priorizar fácilmente los riesgos más críticos, centrando tus esfuerzos en las áreas que más atención necesitan.

## Configuración

### En Datadog

1. Ve a la pestaña **integraciones** en Datadog.
2. Busca el cuadro **Reflectiz** y haz clic en **Install Integration** (Instalar integración).
3. Haz clic en **Connect Accounts** (Conectar cuentas) para iniciar el proceso de autorización. Se te redirigirá a la plataforma Reflectiz.

### En la plataforma Reflectiz

1. Introduce tus credenciales de Reflectiz para acceder a tu cuenta.
2. Elige la licencia adecuada para la integración.

Una vez completado este flujo, los datos de alertas de exposición web y de calificación estarán disponibles en los dashboards incluidos.

### Vincular sitios de Reflectiz con hosts

Para que tus datos sean más eficaces y significativos, puedes vincular cada uno de tus sitios de Reflectiz a un host en Datadog:

1. Abre la [lista de hosts][1] de Datadog.
2. Selecciona un host.
3. Añade una etiqueta (tag) en la sección **Etiqueta de usuario**. La etiqueta debe seguir el formato `reflectiz.host.site:{domain}`, donde `domain` es el sitio de Reflectiz que quieres vincular en el formato `example.com`.<br>Si quieres añadir sitios adicionales a un único host, puedes añadir más etiquetas siguiendo el formato `reflectiz.host.site.1:{domain}`, `reflectiz.host.site.2:{domain}`, y así sucesivamente.

Una vez completados estos pasos, todas las métricas y logs se etiquetan con el correspondiente host.


## Desinstalación



1. En Datadog, ve a **Integraciones** > selecciona el cuadro de Reflectiz > haz clic en **Uninstall Integration** (Desinstalar integración).
2. Además, asegúrate de que todas las claves de API asociadas a esta integración se hayan desactivado buscando el nombre de la integración en la [página Claves de API][2].


## Datos recopilados

### Logs

La integración Reflectiz envía diferentes tipos de logs a Datadog, cada uno asociado a un servicio específico. Estos logs proporcionan información detallada sobre los análisis, los riesgos de las aplicaciones y los riesgos de los dominios, lo que te ayuda a monitorizar la seguridad de tu sitio web de forma eficaz.

#### Logs de análisis
- **Nombre de servicio del log**: `reflectiz.v1.scan`
- **Etiquetas**:
  - `reflectiz.site`: El sitio analizado.
  - `reflectiz.scan`: El identificador del análisis.
  - `reflectiz.scan.number`: El identificador del análisis como un número entero (para más opciones de filtrado).

Estos logs se activan cada vez que se ejecuta un análisis en un sitio web.

#### Logs de alertas
- **Nombre de servicio del log**: `reflectiz.v1.alerts`
- **Etiquetas**:
  - `reflectiz.site`: El sitio analizado.
  - `reflectiz.scan`: El identificador del análisis.
  - `reflectiz.scan.number`: El identificador del análisis como un número entero (para más opciones de filtrado).
  - `reflectiz.app`: La aplicación relacionada con la alerta, si está presente.
  - `reflectiz.domain`: El dominio relacionado con la alerta, si está presente.

En estos logs se resaltan las alertas activadas durante el análisis del sitio.


#### Clasificación de logs de análisis
- **Nombre de servicio del log**: `reflectiz.v1.scan`
- **Etiquetas**:
  - `reflectiz.site`: El sitio analizado.
  - `reflectiz.scan`: El identificador del análisis.
  - `reflectiz.scan.number`: El identificador del análisis como un número entero (para más opciones de filtrado).

Estos logs se activan cada vez que se ejecuta un análisis en un sitio web y se calculan las calificaciones, y pueden ser útiles a la hora de filtrar los datos de calificación.

#### Logs de riesgos de la aplicación
- **Nombre de servicio del log**: `reflectiz.v1.rating.app.risks`
- **Etiquetas**:
  - `reflectiz.site`: El sitio analizado.
  - `reflectiz.scan`: El identificador del análisis.
  - `reflectiz.scan.number`: El identificador del análisis como un número entero (para más opciones de filtrado).
  - `reflectiz.app`: La aplicación analizada.

Estos logs destacan los riesgos relacionados con aplicaciones específicas de tu sitio, lo que te ayuda a detectar vulnerabilidades.

#### Logs de riesgos de dominios
- **Nombre de servicio del log**: `reflectiz.v1.rating.domain.risks`
- **Etiquetas**:
  - `reflectiz.site`: El sitio analizado.
  - `reflectiz.scan`: El identificador del análisis.
  - `reflectiz.scan.number`: El identificador del análisis como un número entero (para más opciones de filtrado).
  - `reflectiz.domain`: El dominio analizado.

Estos logs se centran en los riesgos relacionados con los dominios, proporcionando una imagen clara de las vulnerabilidades específicas de cada dominio.


### Métricas
Para ver la lista de métricas proporcionadas por esta integración, consulta [metadata.csv][3].

## Asistencia
Para solicitar asistencia o funciones, ponte en contacto con Reflectiz a través de los siguientes canales:

- Soporte: [support@reflectiz.com][4]
- Ventas: [inbound@reflectiz.com][5]
- Página web: [reflectiz.com][6]

[1]: https://app.datadoghq.com/infrastructure
[2]: https://app.datadoghq.com/organization-settings/api-keys?filter=Reflectiz
[3]: https://github.com/DataDog/integrations-extras/blob/master/reflectiz/metadata.csv
[4]: mailto:support@reflectiz.com
[5]: mailto:inbound@reflectiz.com
[6]: https://reflectiz.com