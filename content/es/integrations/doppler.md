---
app_id: doppler
app_uuid: e22c8861-f652-42a9-9582-6470504b421f
assets:
  dashboards:
    Doppler: assets/dashboards/doppler_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 25660413
    source_type_name: doppler
  oauth: assets/oauth_clients.json
author:
  homepage: https://doppler.com
  name: Doppler
  sales_email: sales@doppler.com
  support_email: support@doppler.com
categories:
- seguridad
- herramientas de desarrollo
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/doppler/README.md
display_on_public_website: true
draft: false
git_integration_title: doppler
integration_id: doppler
integration_title: Doppler
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: doppler
public_title: Doppler
short_description: Gestión de secretos de Doppler
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Category::Security
  - Categoría::Herramientas de desarrollo
  - Category::Log Collection
  - Oferta::Integración
  - Submitted Data Type::Logs
  configuration: README.md#Configuración
  description: Gestión de secretos de Doppler
  media:
  - caption: Organizar los secretos en proyectos
    image_url: images/projects.png
    media_type: imagen
  - caption: Configurar la visibilidad de secretos para evitar accesos accidentales
    image_url: images/secret-visibility.png
    media_type: imagen
  - caption: Proporcionar secretos existentes o generar valores criptográficamente
      aleatorios
    image_url: images/generate.png
    media_type: imagen
  - caption: Configurar la rotación automática
    image_url: images/rotation.png
    media_type: imagen
  - caption: Permitir a los desarrolladores anular los valores de las configuraciones
      personales
    image_url: images/personal-config.png
    media_type: imagen
  - caption: Seguimiento de todas las lecturas y escrituras secretas
    image_url: images/version-history.png
    media_type: imagen
  - caption: Analizar los patrones de actividad
    image_url: images/dashboard.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Doppler
  uninstallation: README.md#Desinstalación
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

[Doppler][1] es un gestor de secretos diseñado pensando tanto en la seguridad como en la productividad de los desarrolladores.
Doppler te permite almacenar secretos de forma segura (por ejemplo: claves de API, credenciales de bases de datos y otros valores confidenciales) y entregarlos a tus aplicaciones.

Esta integración envía logs de actividad de [Doppler][1] a Datadog, lo que te permite monitorizar los cambios en tu lugar de trabajo.
Esto incluye:

- Modificaciones de proyectos, entornos y secretos
- Cambios en tu equipo, incluidos nuevos miembros, cambios de roles y bajas
- Cambios en la configuración del lugar de trabajo, como integraciones y las funciones de seguridad.

Doppler no recopila ningún dato de tu cuenta de Datadog.

## Configuración

### Instalación

1. Haz clic en **Connect Accounts** (Conectar cuentas) en el cuadro de integración de Doppler para conectar Datadog con Doppler.
2. Inicia sesión en Doppler o crea una cuenta si aún no lo has hecho.
3. Selecciona el lugar de trabajo de Doppler que deseas configurar. Este paso se omitirá automáticamente si sólo tienes un lugar de trabajo.
4. Haz clic en **Settings** (Configuración) para acceder a la configuración de tu lugar de trabajo.
5. En **Logging Services** > **Datadog** (Servicios de registro > Datadog), haz clic en **Connect** (Conectar).
6. Elige tu sitio de Datadog en el menú desplegable.
7. Inicia sesión en Datadog. Este paso se omitirá si ya has iniciado sesión.
8. Revisa los permisos de Datadog que se concederán a Doppler y haz clic en **Authorize** (Autorizar).

Una vez finalizada la instalación, los logs de actividad de Doppler empezarán a fluir automáticamente a Datadog.

### Configuración

La integración enviará automáticamente todos los logs de actividad de Doppler a Datadog, no hay otra configuración disponible en este momento.

### Validación

Durante la instalación, Doppler crea un log de prueba para verificar que las credenciales instaladas funcionan correctamente. Comprueba que este log de prueba está presente en tus logs para verificar la instalación.

## Datos recopilados

Doppler no recopila ninguna información de tu cuenta de Datadog.

### Desinstalación

- Ve a la [configuración del lugar de trabajo de Doppler][2] y desconecta la integración de Datadog
- Elimina todas las claves de API asociadas a esta integración buscando el nombre de la integración en la [página Claves de API de Datadog][3].

### Métricas

Doppler no incluye métricas.

### Checks de servicio

Doppler no incluye ningún check de servicio.

### Logs

Doppler crea un log para cada entrada en el [Log de actividad de Doppler][4] de tu lugar de trabajo. El tipo de log, así como cualquier parámetro de log asociado, se incluirán en la carga útil.

### Eventos

Doppler no produce ningún evento de Datadog.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Doppler][5].

[1]: https://www.doppler.com
[2]: https://dashboard.doppler.com/workplace/settings
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.doppler.com/docs/workplace-logs
[5]: https://support.doppler.com