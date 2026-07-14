---
aliases:
- /es/developers/marketplace/
description: Obtén información sobre el Marketplace de Datadog.
further_reading:
- link: https://www.datadoghq.com/partner/
  tag: Socio de la red
  text: Socio de la red de Datadog
- link: https://www.datadoghq.com/blog/datadog-marketplace/
  tag: Blog
  text: Ampliar el alcance de tu monitorización a través del Marketplace de Datadog
- link: /developers/integrations/create_a_tile
  tag: Documentación
  text: Crear un cuadro
- link: /developers/integrations/agent_integration
  tag: Documentación
  text: Crear una integración basada en el Agent
title: Crear una oferta de Marketplace
type: Documentación
---
## Información general

El [Marketplace de Datadog][2] es un mercado digital donde los socios tecnológicos pueden presentar sus ofertas pagas a los usuarios de Datadog.

Mientras que la página **Integraciones** incluye integraciones creadas tanto por Datadog, como por los socios tecnológicos, sin coste alguno, la página **Marketplace** es una plataforma comercial para que los clientes y los socios tecnológicos de Datadog compren y vendan diversas ofertas, como integraciones basadas en el Agent o en las API, licencias de software y servicios profesionales.

{{< img src="developers/marketplace/marketplace_overview.png" alt="Página del Marketplace de Datadog" style="width:100%" >}}

## Mostrar una oferta

Los siguientes tipos de ofertas son compatibles con el Marketplace de Datadog:

integraciones
: Integraciones del Marketplace que envían datos de terceros a la cuenta Datadog de un usuario (o los extraen de esta) a través del [Datadog Agent][19] o la [API de Datadog][15]. Estas integraciones pueden contener diversos tipos de datos, como métricas, eventos, logs, trazas, etc.

Licencias de software
: Las licencias de software te permiten entregar y proporcionar licencias de soluciones de software a los clientes a través del Marketplace de Datadog.

Servicios profesionales
: Los servicios profesionales te permiten ofrecer los servicios de implementación, soporte o gestión de tu equipo durante un periodo de tiempo determinado.

## Puedes unirte al Marketplace de Datadog 

Los socios del Marketplace tienen ventajas exclusivas que no están disponibles para los socios tecnológicos que muestran integraciones listas para utilizar:

- **Colaboración para la comercialización** que incluye una entrada en el blog, una cita para un comunicado de prensa y la amplificación en redes sociales, con acceso a recursos exclusivos de ventas y marketing, centrados en acelerar el crecimiento de los socios.
- **Formación y asistencia** para la capacitación en ventas internas.
- **Oportunidades exclusivas de patrocinio** para conferencias y eventos (como [Datadog DASH][20]) a un precio con descuento.
- **Generación de nuevos clientes potenciales** a partir de la detección de usuarios.

## Puedes unirte a la red de socios de Datadog 

Antes de publicar una oferta en el Marketplace de Datadog, debes añadir tu solicitud de inscripción en la sección **Socios tecnológicos** de la [red de socios de Datadog][3]. Una vez aprobada tu solicitud, podrás empezar a desarrollar tu oferta.

## Solicitar una cuenta sandbox

Todos los socios tecnológicos pueden solicitar una cuenta sandbox exclusiva en Datadog para ayudarles con sus desarrollos.

Para solicitar una cuenta sandbox:

1. Inicia sesión en el [portal para socios de Datadog][6].
2. En tu página de inicio, haz clic en el botón **Learn More** (Obtener más información), en **Sandbox Access* (Acceso sandbox).
3. Selecciona **Request Sandbox Upgrade** (Solicitar actualización de sandbox).

<div class="alert alert-info">Si ya eres parte de una organización Datadog (incluida una organización de prueba), es posible que tengas que cambiar a tu nueva sandbox. Para obtener más información, consulta la <a href="https://docs.datadoghq.com/account_management/org_switching/">documentación sobre gestión de cuentas </a>.</div>

La creación de un sandbox para desarrolladores puede tardar uno o dos días laborables. Una vez creado tu sandbox, puedes [invitar a nuevos miembros de tu organización][7] para colaborar con ellos.

## Solicitar acceso al Marketplace

Para solicitar acceso al repositorio privado del Marketplace, envía un correo electrónico a <a href="mailto:marketplace@datadoghq.com">marketplace@datadoghq.com.</a> Una vez que se te haya concedido el acceso, podrás ver un [ejemplo de solicitud de extracción][12] en el repositorio del Marketplace, que incluye anotaciones y prácticas recomendadas.

## Coordinar las oportunidades de comercialización (GTM)

Una vez que se activa un mosaico de Marketplace, los socios tecnológicos pueden reunirse con el equipo de marketing para socios de Datadog a fin de coordinar una estrategia conjunta de comercialización (GTM), que incluye lo siguiente:

- Una cita de Datadog para los comunicados de prensa de los socios
- Una entrada en el blog [Monitores de Datadog][21]
- Amplificación de las publicaciones en las redes sociales

## Para empezar

Para empezar a crear una integración basada en una API, una licencia de software o un servicio profesional, consulta [Crear un cuadro][13]. Si te interesa crear una integración basada en el Agent y venderla en el Marketplace de Datadog, consulta [Crear una integración basada en el Agent][19].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations
[2]: https://app.datadoghq.com/marketplace
[3]: https://partners.datadoghq.com/
[5]: https://docs.datadoghq.com/es/developers/datadog_apps
[6]: https://partners.datadoghq.com/English/
[7]: /es/account_management/users/#add-new-members-and-manage-invites
[8]: https://learn.datadoghq.com/courses/intro-to-integrations
[9]: https://learn.datadoghq.com/
[10]: https://chat.datadoghq.com/
[11]: https://docs.datadoghq.com/es/developers/authorization/
[12]: https://github.com/DataDog/marketplace/pull/107
[13]: https://docs.datadoghq.com/es/developers/integrations/create_a_tile
[15]: https://docs.datadoghq.com/es/developers/integrations/api_integration
[19]: https://docs.datadoghq.com/es/developers/integrations/agent_integration
[20]: https://www.dashcon.io/
[21]: https://www.datadoghq.com/blog/