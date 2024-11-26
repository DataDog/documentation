---
app_id: cebrio
app_uuid: a1fa9510-af05-4950-ad67-4eed3f14d4bf
assets:
  dashboards:
    Zebrium Root Cause as a Service Sample Dashboard: assets/dashboards/root_cause_as_a_service_sample_dashboard.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: zebrium.logs.all.count
      metadata_path: metadata.csv
      prefix: zebrium.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10272
    source_type_name: zebrium
author:
  homepage: https://www.zebrium.com
  name: Zebrium
  sales_email: hello@zebrium.com
  support_email: support@zebrium.com
categories:
- automatización
- notificaciones
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/zebrium/README.md
display_on_public_website: true
draft: false
git_integration_title: zebrium
integration_id: zebrium
integration_title: Zebrium RCaaS
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: zebrium
public_title: Zebrium RCaaS
short_description: Descubrir la causa raíz de los problemas directamente en tus dashboards
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Automatización
  - Categoría::Notificaciones
  - Oferta::Extensión de la interfaz de usuario
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  configuration: README.md#Configuración
  description: Descubrir la causa raíz de los problemas directamente en tus dashboards
  media:
  - caption: 'Vídeo: Buscador de causas raíz para Datadog.'
    image_url: images/Zebrium-Root_Cause_as_a_Service_thumb.png
    media_type: vídeo
    vimeo_id: 703040365
  - caption: Widget de Zebrium que muestra dos detecciones de causas raíz (punto rojo
      sobre líneas verticales).
    image_url: images/Zebrium_Root_Cause_Finder_Widget.png
    media_type: imagen
  - caption: Resumen de las causas raíz de Zebrium, que se muestra en un panel lateral.
    image_url: images/Zebrium_Root_Cause_Finder_With_Side_Panel.png
    media_type: imagen
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/find-the-root-cause-faster-with-zebrium/
  support: README.md#Soporte
  title: Zebrium RCaaS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

Cuando sabes que hay un problema y no tienes certeza de lo que lo ha causado, [Zebrium][1] te muestra la causa raíz directamente en tus dashboards de Datadog. Funciona utilizando Machine Learning en logs, sin necesidad de capacitación manual ni definición de reglas, y logra precisión en menos de 24 horas. 

Utilizar Zebrium es muy sencillo. Cuando necesites solucionar un problema, basta con añadir la aplicación Zebrium a tu dashboard de Datadog y consultar los detalles de la detección correspondiente.

Zebrium se integra con Datadog de dos maneras: 1) una aplicación Datadog con un widget de dashboard personalizado y 2) una integración de eventos y métricas.

### 1) Aplicación Datadog

La aplicación Zebrium ofrece un widget de dashboard interactivo y precreado que muestra los problemas detectados a lo largo del tiempo y te permite profundizar en la causa raíz de estos problemas (así como en las métricas). Este método proporciona la experiencia de usuario más sencilla.

### 2) Integración de eventos y métricas

Con la integración, la detección de eventos y métricas de Zebrium se envían directamente a Datadog. Puedes visualizarlos como prefieras (se proporciona un ejemplo de dashboard). Este método debe utilizarse si quieres personalizar la forma en que aparecen los datos de Zebrium en tus dashboards.

## Configuración

### Integración de eventos y métricas

La integración de eventos y métricas de Zebrium utiliza una [clave de API Datadog][2] que debe ser creada por un administrador de Datadog. Una vez obtenida la clave de API Datadog, consulta la [documentación de Zebrium para la integración Datadog][3] para aprender a configurar la integración de eventos y métricas de Zebrium para Datadog.

### Widget de dashboard

1. Haz clic en **Install Integration** (Instalar integración) en la parte superior derecha de este panel.
2. Ve a un dashboard de Datadog existente o crea uno nuevo.
3. Pulsa el botón **Add Widgets** (Añadir widgets) para exponer el cajón de widgets.
4. Busca **Zebrium** en la sección **Apps** (Aplicaciones) del cajón de widgets.
5. Haz clic o arrastra el icono del widget ***Zebrium Root Cause Finder*** (Buscador de causas raíz de Zebrium) para añadirlo a tu dashboard de Datadog.
6. Abre la [interfaz de usuario de Zebrium][4] en una nueva pestaña de navegador y crea un token de acceso para tu despliegue. 
   - Selecciona el menú de hamburguesa en la parte superior derecha de la interfaz de usuario de Zebrium y elige Access Tokens (Tokens de acceso).
   - Haz clic en el botón Add Access Token (Añadir token de acceso), introduce un nombre para el token, selecciona el despliegue para el token y configura el rol como visor. 
   - Haz clic en Add (Añadir) y copia el token en el portapapeles. 
7. En el editor de widgets de la interfaz de usuario de Datadog, introduce la siguiente información:
   - **Endpoint de API**: Se trata de la URL absoluta a la raíz de tu instancia de Zebrium. Por lo general es **https://cloud.zebrium.com**.
   - **Token**: Pega el token que creaste en el paso 6 anterior.
   - **Grupo de servicios**: Se trata del nombre del grupo de servicios del que quieres mostrar datos. O introduce "All" (Todo), para mostrar los datos de todos los grupos de servicios de este despliegue. 
9. Si lo prefieres, puedes poner un título al widget.
10. Pulsa **Save** (Guardar) para finalizar la configuración del widget del dashboard de Datadog.

## Compatibilidad

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

## Leer más

Más enlaces, artículos y documentación útiles:

- [Buscar la causa raíz más rápidamente con Datadog y Zebrium][6]

[1]: https://www.zebrium.com
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.zebrium.com/docs/monitoring/datadog_autodetect/
[4]: https://cloud.zebrium.com
[5]: http://docs.datadoghq.com/help
[6]: https://www.datadoghq.com/blog/find-the-root-cause-faster-with-zebrium/