---
app_id: cisco-duo
app_uuid: 8d3e0e2f-df52-4a12-a976-3ded71553a3a
assets:
  dashboards:
    Cisco Duo - Activity Logs: assets/dashboards/cisco_duo_activity_logs.json
    Cisco Duo - Administrator Logs: assets/dashboards/cisco_duo_administrator_logs.json
    Cisco Duo - Authentication Logs: assets/dashboards/cisco_duo_authentication_logs.json
    Cisco Duo - Offline Enrollment Logs: assets/dashboards/cisco_duo_offline_enrollment_logs.json
    Cisco Duo - Telephony Logs: assets/dashboards/cisco_duo_telephony_logs.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 6576439
    source_type_name: cisco-duo
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
- https://github.com/DataDog/integrations-core/blob/master/cisco_duo/README.md
display_on_public_website: true
draft: false
git_integration_title: cisco_duo
integration_id: cisco-duo
integration_title: Cisco Duo
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: cisco_duo
public_title: Cisco Duo
short_description: Obtén información sobre logs Cisco Duo.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Recopilación de logs
  - Categoría::Seguridad
  - Tipo de datos enviados::Logs
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Obtén información sobre logs Cisco Duo.
  media:
  - caption: Cisco Duo - Logs de autenticación
    image_url: images/cisco_duo_authentication_logs.png
    media_type: imagen
  - caption: Cisco Duo - Logs de actividad
    image_url: images/cisco_duo_activity_logs.png
    media_type: imagen
  - caption: Cisco Duo - Logs de administrador
    image_url: images/cisco_duo_administrator_logs.png
    media_type: imagen
  - caption: Cisco Duo - Logs de telefonía
    image_url: images/cisco_duo_telephony_logs.png
    media_type: imagen
  - caption: Cisco Duo - Logs de inscripción sin conexión
    image_url: images/cisco_duo_offline_enrollment_logs.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Cisco Duo
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->
## Información general

[Cisco Duo][1] es una solución de autenticación multifactor (MFA) y acceso seguro. Añade una capa adicional de seguridad exigiendo a los usuarios que verifiquen su identidad a través de un segundo factor, como una aplicación móvil, antes de obtener acceso a aplicaciones o sistemas. Duo se utiliza a menudo para mejorar la seguridad del acceso remoto y ayuda a proteger contra el acceso no autorizado, incluso si las contraseñas se ven comprometidas.

Esta integración ingiere los siguientes logs:
- Autenticación
- Actividad
- Administrador
- Telefonía
- Inscripción sin conexión

La integración Cisco Duo recopila de forma constante logs de autenticación multifactor (MFA) y de acceso seguro, canalizándolos hacia Datadog para su análisis. Aprovechando el pipeline de logs integrado, estos logs se analizan y enriquecen, permitiendo realizar búsquedas y análisis con facilidad. La integración proporciona información sobre los eventos de autenticación fraudulenta, la cronología de la actividad de autenticación, las localizaciones de los dispositivos de autenticación a los que se accedió y mucho más, a través de dashboards predefinidos.

## Configuración

### Configuración

#### Obtener credenciales API de Cisco Duo

1. Regístrate para obtener una [**cuenta Duo**][2].
2. Inicia sesión en el [**Panel de administrador Duo**][3].
3. Ve a **Aplicaciones**.
4. Haz clic en **Protect an Application** (Proteger una aplicación) y busca la entrada de la _API de administrador_ en la lista de aplicaciones.
6. Haz clic en **Protect** (Proteger) para configurar la aplicación y recuperar tu `integration key`, `secret key` y `API hostname`. Esta información se utilizará para configurar la integración Cisco Duo.
7. Asegúrate de que el permiso _Conceder lectura de logs_ está seleccionado y haz clic en **Save Changes** (Guardar cambios).

#### Configuración de la integración Cisco Duo-Datadog

Configura el endpoint Datadog para reenviar logs de Cisco Duo a Datadog.

1. Ve a `Cisco Duo`.
2. Añade tus credenciales Cisco Duo.

| Parámetros de Cisco Duo | Descripción  |
| -------------------- | ------------ |
| Host                 | El nombre de host de la API de Cisco Duo. Es la parte `XXXXXXXX` de `https://api-XXXXXXXX.duosecurity.com`.  |
| Clave de integración      | La clave de la integración Cisco Duo.    |
| Clave secreta           | La clave secreta de Cisco Duo.         |

## Datos recopilados

### Logs

La integración Cisco Duo recopila y reenvía logs de autenticación Cisco Duo, actividad, administrador, telefonía e inscripción sin conexión a Datadog.

### Métricas

La integración Cisco Duo no incluye métricas.

### Eventos

La integración Cisco Duo no incluye eventos.

## Compatibilidad

Para obtener más ayuda, ponte en contacto con el [servicio de asistencia de Datadog][4].

[1]: https://duo.com/
[2]: https://signup.duo.com/
[3]: https://admin.duosecurity.com/
[4]: https://docs.datadoghq.com/es/help/