---
algolia:
  tags:
  - sitio
  - sitio de Datadog
further_reading:
- link: https://learn.datadoghq.com/courses/dd-201
  tag: Centro de aprendizaje
  text: 'Curso avanzado de Datadog: Conviértete en superusuario'
- link: /agent/configuration/dual-shipping/
  tag: Guía
  text: Envío doble
title: Empezando con los sitios de Datadog
---

## Información general

Datadog ofrece distintos sitios en todo el mundo. Cada uno es totalmente independiente del resto, y no puedes compartir datos entre ellos. Todos los sitios presentan ventajas (por ejemplo, normativas de seguridad del gobierno) o te permiten almacenar tus datos en localizaciones concretas de todo el mundo.

## Responsabilidad compartida

La responsabilidad de mantener seguros los datos de los usuarios es compartida entre Datadog y los desarrolladores que utilizan los productos de Datadog.

Datadog es responsable de:
- Proporcionar un producto fiable que gestione los datos de forma segura cuando se transmitan a la plataforma Datadog y se almacenen en ella.
- Garantizar que los problemas de seguridad se identifican de acuerdo con las políticas internas.

Los promotores son responsables de:
- Aprovechar los valores de configuración y las opciones de privacidad de datos que ofrece Datadog.
- Garantizar la integridad del código dentro de sus entornos.

## Acceder al sitio de Datadog

Puedes identificar en qué sitio te encuentras consultando la URL de tu sitio web de Datadog en la siguiente tabla.

{{< img src="getting_started/site/site.png" alt="La URL del sitio en tu pestaña del navegador" style="width:40%" >}}

| Sitio    | URL del sitio                    | Parámetro del sitio      | Localización |
|---------|-----------------------------|---------------------|----------|
| US1     | `https://app.datadoghq.com` | `datadoghq.com`     | EE. UU.       |
| US3     | `https://us3.datadoghq.com` | `us3.datadoghq.com` | EE. UU.       |
| US5     | `https://us5.datadoghq.com` | `us5.datadoghq.com` | EE. UU.       |
| EU1     | `https://app.datadoghq.eu`  | `datadoghq.eu`      | UE       |
| US1-FED | `https://app.ddog-gov.com`  | `ddog-gov.com`      | EE. UU.       |
| AP1     | `https://ap1.datadoghq.com` | `ap1.datadoghq.com` | Japón |

**Nota**: Para enviar datos a más de un destino a través de varios endpoints, consulta la guía [Envío doble][2].

## Dominios SDK

Consulta [Endpoints compatibles con dominios de SDK][3].

## Navega por la documentación de Datadog por sitio.

Distintos sitios de Datadog admiten distintas funcionalidades según los requisitos de seguridad de la instancia. Por tanto, la documentación puede variar de un sitio a otro. Utiliza el menú desplegable del selector de sitios en el lateral derecho de cualquier página de la documentación de Datadog para seleccionar el sitio de Datadog sobre el que quieres obtener información.

{{< img src="getting_started/site/site-selector.png" alt="El menú desplegable del selector de sitios en el lateral derecho del sitio de la Documentación" style="width:100%" >}}

Por ejemplo, para ver la documentación del sitio Datadog for Government, selecciona **US1-FED**.

{{% site-region region="gov" %}}

## Acceder al sitio Datadog for Government

El objetivo del sitio Datadog for Government (US1-FED) es permitir a las agencias gubernamentales de EE. UU. y sus asociados monitorizar sus aplicaciones e infraestructura. Para obtener información sobre los controles y marcos de seguridad y cumplimiento del sitio Datadog for Government, además de su compatibilidad con FedRAMP, consulta la [página de seguridad][1].

[1]: https://www.datadoghq.com/security/
{{% /site-region %}}

## Leer más

{{< nombre parcial="whats-next/whats-next.html" >}}

[2]: /es/agent/configuration/dual-shipping/
[3]: /es/real_user_monitoring/#supported-endpoints-for-sdk-domains