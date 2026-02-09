---
algolia:
  tags:
  - sitio
  - sitio de Datadog
description: Infórmate sobre los distintos sitios Datadog de tu región y los requisitos
  de seguridad, incluidas las opciones que cumplen las normas gubernamentales.
further_reading:
- link: https://learn.datadoghq.com/courses/dashboards-slos
  tag: Centro de aprendizaje
  text: Crea perspectivas críticas para la empresa utilizando dashboards y SLOs
- link: /agent/configuration/dual-shipping/
  tag: Guía
  text: Envío dual
title: Empezando con los sitios de Datadog
---

## Información general

Datadog ofrece distintos sitios en todo el mundo. Cada uno es totalmente independiente del resto, y no puedes compartir datos entre ellos. Todos los sitios presentan ventajas (por ejemplo, normativas de seguridad del gobierno) o te permiten almacenar tus datos en localizaciones concretas de todo el mundo.

## Responsabilidad compartida

La responsabilidad de mantener seguros los datos de los usuarios es compartida entre Datadog y los desarrolladores que utilizan los productos de Datadog.

Datadog es responsable de:
- Proporcionar un producto fiable que gestione los datos de forma segura cuando se transmiten a la plataforma Datadog y se almacenan en ella.
- Garantizar que los problemas de seguridad se identifiquen de acuerdo con las políticas internas.

Los desarrolladores son responsables de:
- Aprovechar los valores de configuración y las opciones de privacidad de los datos que ofrece Datadog.
- Garantizar la integridad del código en sus entornos.

## Acceder al sitio de Datadog

Puedes identificar en qué sitio te encuentras consultando la URL de tu sitio web de Datadog en la siguiente tabla.

{{< img src="getting_started/site/site.png" alt="La URL del sitio en tu pestaña del navegador" style="width:40%" >}}

| Sitio    | URL del sitio                    | Parámetro del sitio      | Localización |
|---------|-----------------------------|---------------------|----------|
| US1     | `https://app.datadoghq.com` | `datadoghq.com`     | EE. UU.       |
| US3     | `https://us3.datadoghq.com` | `us3.datadoghq.com` | EE. UU.       |
| US5     | `https://us5.datadoghq.com` | `us5.datadoghq.com` | EE. UU.       |
| UE1     | `https://app.datadoghq.eu`  | `datadoghq.eu`      | UE (Alemania) |
| US1-FED | `https://app.ddog-gov.com`  | `ddog-gov.com`      | EE. UU.       |
| AP1     | `https://ap1.datadoghq.com` | `ap1.datadoghq.com` | Japón |
| AP2     | `https://ap2.datadoghq.com` | `ap2.datadoghq.com` | Australia |

Para enviar datos a más de un destino a través de varios endpoints, consulta la guía [Envío doble][2].

## Dominios SDK

Consulta [Endpoints compatibles con dominios de SDK][3].

## Navega por la documentación de Datadog por sitio.

Distintos sitios de Datadog admiten distintas funcionalidades según los requisitos de seguridad de la instancia. Por tanto, la documentación puede variar de un sitio a otro. Utiliza el menú desplegable del selector de sitios en el lateral derecho de cualquier página de la documentación de Datadog para seleccionar el sitio de Datadog sobre el que quieres obtener información.

{{< img src="getting_started/site/site-selector-gs-with-tags.png" alt="El menú desplegable del selector de sitio a la derecha del sitio de Documentación" style="width:100%" >}}

Por ejemplo, para ver la documentación del sitio Datadog for Government, selecciona **US1-FED**.

## Acceder al sitio Datadog for Government

El sitio Datadog for Government (US1-FED) es el sitio FedRAMP Moderate Authorized de Datadog. US1-FED está pensado para permitir que las agencias gubernamentales y socios de EE.UU. monitoricen sus aplicaciones e infraestructuras. Para obtener información sobre los controles y frameworks de seguridad y conformidad de US1-FED, así como sobre su compatibilidad con FedRAMP, consulta la [page (página) Seguridad][1].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/security/
[2]: /es/agent/configuration/dual-shipping/
[3]: /es/real_user_monitoring/#supported-endpoints-for-sdk-domains