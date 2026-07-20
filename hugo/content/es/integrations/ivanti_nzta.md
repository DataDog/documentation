---
app_id: ivanti-nzta
app_uuid: c161337b-578b-4c24-bc14-adf35e0ee0ed
assets:
  dashboards:
    Ivanti nZTA - Alerts: assets/dashboards/ivanti_nzta_alerts.json
    Ivanti nZTA - Analytics Logs: assets/dashboards/ivanti_nzta_analytics_logs.json
    Ivanti nZTA - Applications Access: assets/dashboards/ivanti_nzta_applications_access.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 38201876
    source_type_name: Ivanti nZTA
  logs:
    source: ivanti-nzta
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
- https://github.com/DataDog/integrations-core/blob/master/ivanti_nzta/README.md
display_on_public_website: true
draft: false
git_integration_title: ivanti_nzta
integration_id: ivanti-nzta
integration_title: Ivanti nZTA
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: ivanti_nzta
public_title: Ivanti nZTA
short_description: Obtén información sobre los logs de Ivanti nZTA
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Obtén información sobre los logs de Ivanti nZTA
  media:
  - caption: 'Ivanti nZTA: logs analíticos'
    image_url: images/ivanti_nzta_analytics_logs.png
    media_type: imagen
  - caption: 'Ivanti nZTA: alertas'
    image_url: images/ivanti_nzta_alerts.png
    media_type: imagen
  - caption: 'Ivanti nZTA: acceso a aplicaciones'
    image_url: images/ivanti_nzta_applications_access.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Ivanti nZTA
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

[Ivanti nZTA][1] es una solución SaaS basada en la nube que ofrece autenticación de confianza cero y control de acceso para infraestructuras de aplicaciones. Permite a los administradores definir políticas de acceso seguro de usuarios y dispositivos. Esto garantiza la visibilidad de las aplicaciones, el control de acceso y una seguridad robusta.

Esta integración ingiere los siguientes logs:

- **Logs analíticos**: este endpoint contiene información sobre la actividad del sistema a través de logs de administrador, logs de acceso y logs de evento.
- **Alertas**: este endpoint contiene información sobre alertas activadas por Ivanti nZTA, incluyendo riesgos de seguridad y cambios de configuración.
- **Acceso a aplicaciones**: este endpoint contiene información sobre la aplicación a la que han accedido los usuarios.

Esta integración recopila logs de las fuentes enumeradas anteriormente y los envía a Datadog para su análisis con nuestros productos Log Explorer y Cloud SIEM 

- [Log Explorer][2]
- [Cloud SIEM][3]

## Configuración

### Generar credenciales de API en Ivanti nZTA

#### Crear un nuevo usuario administrador

1. Inicia sesión en tu plataforma de Ivanti nZTA.
2. Ve a **Secure Access** > **Manage Users** (Acceso seguro > Administrar usuarios).
3. Ve a la pestaña **Authentication Servers** (Servidores de autenticación).
4. En **Admin Auth** (Autenticación del administrador), haz clic en **Create User** (Crear usuario) e introduce los siguientes datos:
   - **Nombre completo**: introduce un nombre descriptivo e identificable.
   - **Nombre de usuario**: introduce un nombre de usuario único.
   - **Contraseña: introduce una contraseña segura.
   - **Confirmar la contraseña**: vuelve a introducir la contraseña.
5. Desmarca la casilla **Temporary password** (Contraseña temporal).
6. Haz clic en **Create User** (Crear usuario).

**Nota**: Utiliza un usuario administrador recién creado únicamente para esta integración, en lugar del inicio de sesión de la interfaz de usuario, para garantizar una ejecución sin problemas.

#### Identificar al host

1. Para identificar el host de tu Ivanti nZTA, comprueba la URL de la plataforma de Ivanti nZTA.
   <br>**Por ejemplo**: `example.pulsezta.net`

### Conecta tu cuenta de Ivanti nZTA a Datadog

1. Añade tu host, nombre de usuario y contraseña.

   | Parámetros | Descripción |
   | ---------- | ------------------------------------------------------- |
   | Host | El host de tu plataforma de Ivanti nZTA.                  |
   | Nombre de usuario | El nombre de usuario del administrador de inquilinos de tu plataforma de Ivanti nZTA. |
   | Contraseña | La contraseña de tu plataforma de Ivanti nZTA.              |

2. Haz clic en **Save** (Guardar).

## Datos recopilados

### Logs

La integración de Ivanti nZTA recopila y envía logs de análisis, alertas y logs de acceso a aplicaciones a Datadog.

### Métricas

La integración de Ivanti nZTA no incluye ninguna métrica.

### Checks de servicio

La integración de Ivanti nZTA no incluye ningún check de servicio.

### Eventos

La integración de Ivanti nZTA no incluye ningún evento.

## Asistencia técnica

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog][4].

[1]: https://www.ivanti.com/products/ivanti-neurons-zero-trust-access
[2]: https://docs.datadoghq.com/es/logs/explorer/
[3]: https://www.datadoghq.com/product/cloud-siem/
[4]: https://docs.datadoghq.com/es/help/