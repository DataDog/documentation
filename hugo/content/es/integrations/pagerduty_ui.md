---
app_id: pagerduty-ui
app_uuid: fbbb4a11-4a8f-4911-bdf7-bd867d9bdfb2
assets:
  dashboards:
    PagerDuty for Datadog: assets/dashboards/pagerduty_overview.json
author:
  homepage: https://pagerduty.com
  name: PagerDuty
  sales_email: sales@pagerduty.com
  support_email: support@pagerduty.com
categories:
- events
- colaboración
- rum
- seguimiento de problemas
- notificaciones
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/pagerduty/README.md
display_on_public_website: true
draft: false
git_integration_title: pagerduty_ui
integration_id: pagerduty-ui
integration_title: Interfaz de usuario de PagerDuty
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: pagerduty_ui
public_title: Interfaz de usuario de PagerDuty
short_description: Monitorización de tus incidentes de PagerDuty desde tu dashboard
  de Datadog
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Alertas
  - Categoría::Colaboración
  - Categoría::Incidentes
  - Categoría::Seguimiento de problemas
  - Categoría::Notificaciones
  - Oferta:Extensión de la interfaz de usuario
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  configuration: README.md#Configuración
  description: Monitorización de tus incidentes de PagerDuty desde tu dashboard de
    Datadog
  media:
  - caption: Página de inicio
    image_url: images/landing_page.png
    media_type: imagen
  - caption: Dashboard de estado de PagerDuty
    image_url: images/status_dashboard.jpg
    media_type: imagen
  - caption: Dashboard de estado de PagerDuty
    image_url: images/status_dashboard2.jpg
    media_type: imagen
  - caption: Incidentes de PagerDuty
    image_url: images/incidents.jpg
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Interfaz de usuario de PagerDuty
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

PagerDuty es una plataforma de operaciones en tiempo real que continuamente procesa, analiza
y enruta los datos de eventos. El sistema actúa como un punto de agregación para los datos procedentes de múltiples
herramientas de monitorización y puede proporcionar una visión holística del estado actual de tus operaciones. PagerDuty
permite a los clientes de Datadog dar una respuesta más eficaz a los incidentes y, al mismo tiempo, aumentar la visibilidad
y la responsabilidad a lo largo del ciclo de vida del incidente. PagerDuty ofrece dos nuevas aplicaciones que
te ofrecen todas las capacidades de nuestra plataforma de operaciones en tiempo real, dondequiera que trabajes,
sin necesidad de cambiar de herramienta. Añade nuevos widgets, Dashboard de estado de PagerDuty
e Incidentes de PagerDuty, directamente a tu dashboard para ver el dashboard de estado del servicio y responder
a incidentes de alta urgencia directamente desde Datadog en tiempo real.

### Dashboard de estado de PagerDuty

El Dashboard de estado de PagerDuty proporciona a los responsables técnicos, a los responsables de negocios
y a los jefes técnicos y empresariales una visión compartida y en directo del estado del sistema para mejorar
la concientización de los problemas operativos. Muestra el estado actual de servicio y envía
notificaciones para alertar a los usuarios cuando los servicios empresariales son afectadas. Esta función
mejora la comunicación entre los equipos de respuesta y las partes interesadas durante los incidentes.

#### Funciones principales

- Los equipos pueden visualizar el dashboard de estado del servicio directamente desde Datadog para obtener una visión rápida y en tiempo real del estado del sistema de su equipo.
- Los usuarios pueden activar manualmente un incidente desde la aplicación PagerDuty en Datadog si identifican un problema que saben que el equipo de ingeniería querrá examinar de inmediato.
- El widget muestra el estado actual de los principales servicios empresariales y su impacto en estos para proporcionar un contexto completo mientras se trabaja en los incidentes.
- Mejora la comunicación entre los equipos de respuesta y las partes interesadas durante los incidentes.


#### Requisitos
- La integración está disponible para todos los clientes de PagerDuty. Sin embargo, la siguiente función sólo está disponible para los clientes de Pagerduty Business Plan y superiores.

### Incidentes de PagerDuty

Incidentes de PagerDuty te permite tomar medidas ante incidentes directamente desde la
interfaz de Datadog. Te permite visualizar incidentes activos en PagerDuty
y te brinda la capacidad para reconocerlos y resolverlos luego de una navegación ininterrumpida de regreso a
PagerDuty, sin tener que cambiar de contexto entre las herramientas.

#### Funciones incluidas
- Visualización de hasta 20 incidentes activos y de alta urgencia para tus equipos
- Capacidad para reconocer y resolver incidentes para tus equipos
- Posibilidad de navegar en PagerDuty para ver incidentes individuales y sus servicios, así como aquellos de la lista de incidentes


## Configuración

1. En tu cuenta de Datadog, ve a Dashboards. Selecciona el dashboard al que quieres añadir el widget Dashboard de estado o [crea un nuevo dashboard][1].

2. En el dashboard, haz clic en **+Add Widgets** (+Añadir widgets) a la derecha del título del dashboard. Desplázate hacia la derecha por los widgets, luego arrastra y suelta el/los widget(s) de **PagerDuty** en la posición deseada en tu dashboard.

3. En el modal del Editor de widgets personalizados, haz clic en **Connect** (Conectar). Selecciona tu **región de servicio** y luego **inicia sesión** en tu cuenta de PagerDuty. Una vez que se te redirija al Editor de widgets personalizados, aparecerá una vista previa de cómo se verá el widget. Debajo de la vista previa, en **Opciones de widgets**, también puedes seleccionar las funcionalidades adicionales que le gustaría que el dashboard tuviera por defecto. También puedes cambiar el **Título del widget**. Para añadir el widget a tu dashboard, haz clic en **Done** (Listo).

## Agent

Ponte en contacto con [el equipo de ventas de PagerDuty][2] si quieres ser cliente de
PagerDuty, o con [el servicio de asistencia de Datadog][3] si necesitas solucionar algún problema.

Ponte en contacto con [el equipo de ventas de Pagerduty][2] si quieres
pasarte a un plan que incluya la función del dashboard de estado e Incidentes de Pagerduty.

[1]: https://docs.datadoghq.com/es/dashboards/#new-dashboard
[2]: https://www.pagerduty.com/contact-sales/
[3]: https://www.datadoghq.com/support/