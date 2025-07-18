---
further_reading:
- link: https://learn.datadoghq.com/courses/dd-201
  tag: Centro de aprendizaje
  text: 'Curso avanzado de Datadog: Conviértete en superusuario'
kind: documentación
title: Empezando con los sitios de Datadog
---

## Información general

Datadog ofrece distintos sitios en todo el mundo. Cada sitio es totalmente independiente del resto, y no es posible compartir datos entre ellos. Todos los sitios proporcionan ventajas (por ejemplo, normativas oficiales de seguridad) o te permiten almacenar tus datos en localizaciones concretas de todo el mundo.

## Accede al sitio de Datadog

Puedes identificar en qué sitio te encuentras consultando la URL de tu sitio web de Datadog en la siguiente tabla.

{{< img src="getting_started/site/site.png" alt="URL del sitio en la pestaña de tu navegador" style="width:40%" >}}

| Sitio    | URL del sitio                    | Parámetro del sitio      | Localización |
|---------|-----------------------------|---------------------|----------|
| US1     | `https://app.datadoghq.com` | `datadoghq.com`     | EE. UU.       |
| US3     | `https://us3.datadoghq.com` | `us3.datadoghq.com` | EE. UU.       |
| US5     | `https://us5.datadoghq.com` | `us5.datadoghq.com` | EE. UU.       |
| EU1     | `https://app.datadoghq.eu`  | `datadoghq.eu`      | UE       |
| US1-FED | `https://app.ddog-gov.com`  | `ddog-gov.com`      | EE. UU.       |

Todo el tráfico de Datadog se transmite a través de SSL (predeterminado: 443) a los siguientes dominios:

### Logs

| Sitio | URL del sitio                                      |
|------|-----------------------------------------------|
| US1  | https://logs.browser-intake-datadoghq.com     |
| US3  | https://logs.browser-intake-us3-datadoghq.com |
| US5  | https://logs.browser-intake-us5-datadoghq.com |
| EU1  | https://mobile-http-intake.logs.datadoghq.eu  |

### Trazas (traces)

| Sitio | URL del sitio                                           |
|------|----------------------------------------------------|
| US1  | https://trace.browser-intake-datadoghq.com         |
| US3  | https://trace.browser-intake-us3-datadoghq.com     |
| US5  | https://trace.browser-intake-us5-datadoghq.com     |
| EU1  | https://public-trace-http-intake.logs.datadoghq.eu |

### RUM

| Sitio | URL del sitio                                     |
|------|----------------------------------------------|
| US1  | https://rum.browser-intake-datadoghq.com     |
| US3  | https://rum.browser-intake-us3-datadoghq.com |
| US5  | https://rum.browser-intake-us5-datadoghq.com |
| EU1  | https://rum-http-intake.logs.datadoghq.eu    |

## Navega por la documentación de Datadog de cada sitio

Cada sitio de Datadog admite distintas funciones según los requisitos de seguridad de la instancia. Por tanto, la documentación puede variar de un sitio a otro. Utiliza el menú desplegable en el lateral derecho de cualquier página de la documentación de Datadog para seleccionar el sitio de Datadog sobre el que quieres consultar información.

{{< img src="getting_started/site/site-selector.png" alt="Menú desplegable de sitios en el lateral derecho del sitio de documentación" style="width:100%" >}}

Por ejemplo, para ver la documentación del sitio Datadog for Government, selecciona **US1-FED**.

{{< site-region region="gov" >}}

## Accede al sitio Datadog for Government

El objetivo del sitio Datadog for Government (US1-FED) es permitir a las administraciones públicas y sus asociados en EE. UU. monitorizar sus aplicaciones e infraestructura. Para obtener información sobre los controles y marcos de seguridad y cumplimiento del sitio Datadog for Government, además de su compatibilidad con FedRAMP, consulta la [página de seguridad][1].

[1]: https://www.datadoghq.com/security/
{{< /site-region >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}