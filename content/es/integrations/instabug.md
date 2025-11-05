---
app_id: instabug
app_uuid: 37d9bc39-888f-4bec-b8c5-3c137cf88f84
assets:
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.instabug.com/
  name: Instabug
  sales_email: success@instabug.com
  support_email: support@instabug.com
categories:
- alerta
- rastreo de problemas
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/instabug/README.md
display_on_public_website: true
draft: false
git_integration_title: instabug
integration_id: instabug
integration_title: Instabug
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: instabug
public_title: Instabug
short_description: Monitoriza y rastrea el mantenimiento y el rendimiento de tu aplicación
  móvil.
supported_os:
- linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Offering::UI Extension
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Alerting
  - Category::Issue Tracking
  configuration: README.md#Setup
  description: Monitoriza y rastrea el mantenimiento y el rendimiento de tu aplicación
    móvil.
  media:
  - caption: Utiliza el widget de Instabug para monitorizar el rendimiento general
      de tu aplicación.
    image_url: images/instabug-datadog-widget.png
    media_type: imagen
  - caption: El dashboard de Instabug ofrece a los equipos una descripción general
      sucinta del rendimiento de la aplicación y de los posibles errores o problemas
      que se producen en ella.
    image_url: images/instabug-app-overview.png
    media_type: imagen
  - caption: Con cada comentario o error que envían los usuarios, Instabug captura
      automáticamente todos los detalles que necesitas para comprender por qué los
      usuarios tienen problemas con tu código.
    image_url: images/instabug-bugs.png
    media_type: imagen
  - caption: Prioriza la resolución por las caídas más impactantes para tus usuarios.
    image_url: images/instabug-crashes-list.png
    media_type: imagen
  - caption: Comprende el rendimiento de cada versión de tu aplicación y la adopción
      general.
    image_url: images/instabug-releases-page.png
    media_type: imagen
  - caption: Agrega datos por dispositivo y versión para comprender mejor dónde se
      producen los problemas.
    image_url: images/instabug-crash-details.png
    media_type: imagen
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/instabug-mobile-usability/
  support: README.md#Support
  title: Instabug
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-extras -->

## Información general

[Instabug][1] es una plataforma centrada en los móviles que permite a los equipos de móviles monitorizar, priorizar y depurar los problemas de rendimiento y estabilidad a lo largo del ciclo de vida de desarrollo de aplicaciones móviles.

El widget del dashboard de Instabug en Datadog te ayuda a monitorizar el estado general de tu aplicación y la manera en que los usuarios perciben el rendimiento de tu aplicación con un solo número, el índice de rendimiento de la aplicación. El widget proporciona:
- La puntuación total del índice de rendimiento de la aplicación
- Horas extras del índice de rendimiento de la aplicación
- Desglose de las sesiones en cuatro categorías (`Satisfying`, `Tolerable`, `Frustrating` o `Crashing` )
- Los cinco informes de errores más recientes y el número total de nuevos informes


## Configuración
1. Si aún no lo has hecho, [Regístrate en Instabug][2] de forma gratuita y sigue [los pasos][3] para integrar el SDK en tu aplicación.
2. Después de integrar el SDK de Instabug en tu aplicación, ve a un [dashboard de Datadog][4] nuevo o existente.
3. Pulsa el botón **+ Añadir widgets** o **+ Editar dashboard** para abrir el cajón de widgets.
4. Busca `Instabug` en la pestaña **Aplicaciones** del cajón de widgets.
5. Haz clic o arrastra el icono del widget de Instabug para añadirlo a tu dashboard y abrir el modal del editor de Instabug.
6. Autentícate y conecta tu cuenta de Instabug a Datadog iniciando sesión con tus credenciales de Instabug.
7. Si lo deseas, puedes dar un título al widget.
8. Pulsa **Guardar** para finalizar la configuración del widget del dashboard de Datadog.

## Datos recopilados
La integración de Instabug no incluye ninguna métrica.

## Checks de servicio
La integración de Instabug no incluye ningún check de servicio.

## Soporte
¿Necesitas ayuda? Ponte en contacto con [Soporte técnico de Instabug][5].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Aprovecha el contexto del usuario para depurar problemas de rendimiento móvil con la oferta de Marketplace de Datadog de Instabug][6].

[1]: http://instabug.com
[2]: https://dashboard.instabug.com/signup
[3]: https://docs.instabug.com/docs/introduction
[4]: https://app.datadoghq.com/dashboard/lists
[5]: mailto:support@instabug.com
[6]: https://www.datadoghq.com/blog/instabug-mobile-usability/