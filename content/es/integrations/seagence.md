---
app_id: seagence
app_uuid: 94f4e504-c98c-466f-b934-5e5ee0331944
assets:
  dashboards:
    seagence_overview: assets/dashboards/seagence_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10360
    source_type_name: Seagence
  monitors:
    Seagence detected a defect: assets/monitors/defect_detection_monitor.json
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.seagence.com/
  name: Seagence Technologies
  sales_email: sales@seagence.com
  support_email: support@seagence.com
categories:
- alertas
- automatización
- gestión de eventos
- herramientas de desarrollo
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/seagence/README.md
display_on_public_website: true
draft: false
git_integration_title: seagence
integration_id: seagence
integration_title: Seagence
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: seagence
public_title: Seagence
short_description: Herramienta de detección y resolución de defectos en tiempo real
  que elimina la depuración.
supported_os:
- cualquiera
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Any
  - Submitted Data Type::Events
  - Category::Alerting
  - Category::Automation
  - Category::Event Management
  - Category::Developer Tools
  - Offering::Integration
  configuration: README.md#Setup
  description: Herramienta de detección y resolución de defectos en tiempo real que
    elimina la depuración.
  media:
  - caption: Dashboard de la información general de los defectos de Seagence
    image_url: images/datadog-dashboard.png
    media_type: imagen
  - caption: Monitor de detección de defectos en Seagence
    image_url: images/seagence-datadog-monitor.png
    media_type: imagen
  - caption: Rutas de ejecución de éxitos y defectos
    image_url: images/defect-and-successexecution-paths-1440x810.png
    media_type: imagen
  - caption: Clústeres de defectos y éxitos
    image_url: images/defect-and-success-clusters.png
    media_type: imagen
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/seagence-datadog-marketplace/
  support: README.md#Support
  title: Seagence
  uninstallation: README.md#Uninstallation
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-extras -->


## Información general

[Seagence][1] es una herramienta de detección y resolución de defectos en tiempo real de categoría de producción para aplicaciones Java. Utilizando la tecnología ExecutionPath, Seagence detecta defectos conocidos y desconocidos causados por diversos problemas como problemas de multithreading, excepciones ingeridas, manejadas y no manejadas y otros, incluidos defectos que se disfrazan en un código de respuesta de HTTP de 200 éxitos.

Con esta integración, el backend de Seagence analiza continuamente el flujo (stream) de datos del Seagence Agent para detectar defectos cuando se producen, incluida la causa raíz del defecto. Cuando se detecta un defecto, la integración enviará un evento a Datadog para alertar a tu equipo. Usando el dashboard predefinido, tienes visibilidad de los defectos detectados y las causas raíz para eliminar la depuración y solucionar problemas. Encontrarás más detalles sobre el defecto en [SeagenceWeb][2].

## Configuración

### Instalación

Visita [Seagence][1] para registrarte gratuitamente. Una vez registrado, ve al ícono de Seagence en la [página Integraciones de Datadog][3] y haz clic en **Instalar integración**. Haz clic en **Conectar cuentas** en el ícono, que le guiará a través del flujo de Datadog OAuth2 para conceder a Seagence acceso para publicar eventos en tu cuenta de Datadog.

Después de conectar tus cuentas, ve a la pestaña "Activos" en el ícono. Haz clic en **Monitores recomendados** > **Monitor de detección de defectos de Seagence**. Esto te redirigirá para crear el monitor predefinido. Haz clic en **Create** (Crear) al final de la página para instalar el monitor de Seagence.

### Configuración

Usando la opción `-javaagent`, adjunta el Java Agent de Seagence a tu aplicación. Descarga el Java Agent desde tu cuenta de Seagence. Para obtener más información, visita [empezando][4] en [Seagence][1].

## Desinstalación

Para eliminar la integración de Datadog de Seagence:
1. Desinstala la integración de Datadog haciendo clic en **Desinstalar integración**. Una vez desinstalada la integración, se revocan todas las autorizaciones anteriores.
2. Asegúrate de que todas las claves de la API asociadas a la integración se han desactivado buscando el nombre de la integración en la [página de gestión de claves de la API][5].
3. Elimina el monitor asociado yendo a **Monitores** > **Gestionar monitores**. Pasa el ratón por encima de **Monitor de detección de Defectos de Seagence** y haz clic en **Borrar**.
4. Elimina la opción `-javaagent` de los parámetros del tiempo de ejecución de Java de tu aplicación.


## Datos recopilados

### Métricas

Seagence no incluye ninguna métrica.

### Checks de servicio

Seagence no incluye ningún check de servicio.

### Eventos

Seagence publica un evento en Datadog cuando detecta un defecto.

## Asistencia técnica

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Seagence][6].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Detecta problemas a nivel de código en Java con Seagence y Datadog][7]

[1]: https://www.seagence.com
[2]: https://app.seagence.com/SeagenceWeb/
[3]: https://app.datadoghq.com/integrations/seagence
[4]: https://seagence.com/product/getting-started/
[5]: https://app.datadoghq.com/organization-settings/api-keys?filter=Seagence
[6]: mailto:support@seagence.com
[7]: https://www.datadoghq.com/blog/seagence-datadog-marketplace/