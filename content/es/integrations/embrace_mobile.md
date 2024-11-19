---
app_id: embrace-mobile
app_uuid: 86988058-9b89-45a8-b92f-5473a96e4a36
assets:
  dashboards:
    Embrace Overview: assets/dashboards/embrace_mobile_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - embrace.session_total.five_minute
      - embrace.session_total.hourly
      - embrace.session_total.daily
      - embrace.crash_total.five_minute
      - embrace.crash_total.hourly
      - embrace.crash_total.daily
      - embrace.users_total.daily
      metadata_path: metadata.csv
      prefix: embrace.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 25653134
    source_type_name: Embrace
author:
  homepage: https://embrace.io
  name: Embrace
  support_email: support@embrace.io
categories:
- seguimiento de problemas
- métricas
- mobile
- la red
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/embrace_mobile/README.md
display_on_public_website: true
draft: false
git_integration_title: embrace_mobile
integration_id: embrace-mobile
integration_title: Embrace móvil
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: embrace_mobile
public_title: Embrace móvil
short_description: Observabilidad móvil para iOS, Android, React Native y Unity
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Seguimiento de incidencias
  - Categoría::Metricas
  - Categoría::Móvil
  - Categoría::Red
  - Oferta::Extensión de la interfaz de usuario
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  configuration: README.md#Configuración
  description: Observabilidad móvil para iOS, Android, React Native y Unity
  media:
  - caption: Monitoriza los datos de fallos y de red de Embrace directamente desde
      Datadog añadiendo widgets.
    image_url: images/datadog_dashboard.jpg
    media_type: imagen
  - caption: Investiga los fallos accediendo a las trazas (traces) de stack tecnológico
      de cada sesión de usuario afectada, junto con los detalles de la aplicación
      y la sesión. Para obtener más contexto, navega directamente a la repetición
      completa de una sesión de usuario en Embrace.
    image_url: images/datadog_side_panel.jpg
    media_type: imagen
  - caption: Las repeticiones de sesiones de usuarios de Embrace proporcionan todos
      los detalles técnicos y de comportamiento de cada sesión de usuario en una visualización
      basada en el tiempo. Identifica al instante la causa original, sin tener que
      reproducir manualmente los problemas.
    image_url: images/embrace_session.jpg
    media_type: imagen
  - caption: Optimiza los flujos de usuarios clave mediante el seguimiento de los
      tiempos, de los resultados y de las acciones de los usuarios. Identifica rápidamente
      dónde los usuarios frustrados abandonan experiencias lentas o congeladas y soluciónalas
      para aumentar la participación y los ingresos.
    image_url: images/embrace_app_performance.jpg
    media_type: imagen
  - caption: Monitoriza métricas clave con dashboards en tiempo real. Realiza un seguimiento
      del rendimiento, la estabilidad, la participación, la monetización y mucho más
      de forma simple, para que los equipos puedan centrarse en los datos que les
      interesan.
    image_url: images/embrace_dashboard.jpg
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Embrace móvil
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

[Embrace][1] es una plataforma móvil de observabilidad y de datos que permite a los equipos móviles ofrecer experiencias de usuario óptimas para 
optimizar el rendimiento, priorizar y corregir problemas, y monitorizar funciones, versiones y segmentos
personalizados. En esencia, Embrace convierte los complejos datos móviles en acción. Al recopilar datos exhaustivos a nivel de sesión para
cada una de las experiencias del usuario, Embrace extrae información de gran alcance para impulsar tu crecimiento.

Una vez instalada la integración, Embrace proporciona dashboards que realizan un seguimiento de las métricas clave del estado móvil. En caso de regresión, puedes inspeccionar 
los detalles completos de cada sesión de usuario afectada, sin tener que reproducirla manualmente. 

## Configuración

1. Inicia una prueba gratuita y sigue la [documentación de Embrace][2]. **Antes de ver métricas en Datadog, necesitas seguir esta documentación.**
1. Una vez finalizada la configuración de la integración Embrace, vuelve a Datadog para conectar ambas plataformas.
1. Autentícate y conecta tu cuenta de Embrace a Datadog iniciando sesión con tus credenciales.
1. Crea un nuevo dashboard en Datadog. Selecciona el widget de Embrace para visualizar los datos de Embrace con métricas de fallos o de red.
1. Haz clic en "Details" (Detalles) para profundizar en Embrace desde Datadog.

## Asistencia

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://embrace.io
[2]: https://embrace.io/docs/
[3]: https://docs.datadoghq.com/es/help/