---
algolia:
  tags:
  - site
  - datadog site
description: Aprenda sobre los diferentes sitios de Datadog para su región y requisitos
  de seguridad, incluyendo opciones que cumplen con las normativas gubernamentales.
further_reading:
- link: https://learn.datadoghq.com/courses/dashboards-slos
  tag: Centro de Aprendizaje
  text: Cree Perspectivas Críticas para el Negocio Usando Tableros y SLOs
- link: /agent/configuration/dual-shipping/
  tag: Guía
  text: Envío Doble
title: Comenzando con los Sitios de Datadog
---
## Resumen {#overview}

Datadog ofrece diferentes sitios en todo el mundo. Cada sitio es completamente independiente, y no se pueden compartir datos entre sitios. Cada sitio le brinda beneficios (por ejemplo, regulaciones de seguridad gubernamentales) o le permite almacenar sus datos en ubicaciones específicas alrededor del mundo.

## Responsabilidad compartida {#shared-responsibility}

La responsabilidad de mantener los datos de los usuarios seguros se comparte entre Datadog y los desarrolladores que utilizan los productos de Datadog.

Datadog es responsable de:
- Proporcionar un producto confiable que maneje los datos de manera segura cuando se transmiten y almacenan en la plataforma de Datadog.
- Asegurar que los problemas de seguridad se identifiquen de acuerdo con las políticas internas.

Los desarrolladores son responsables de:
- Aprovechar los valores de configuración y las opciones de privacidad de datos proporcionadas por Datadog.
- Asegurar la integridad del código dentro de sus entornos.

## Acceda al sitio de Datadog {#access-the-datadog-site}

Puede identificar en qué sitio se encuentra al comparar la URL de su sitio web de Datadog con la URL del sitio en la tabla a continuación.

{{< img src="getting_started/site/site.png" alt="La URL del sitio en la pestaña de su navegador" style="width:40%" >}}

| Sitio    | URL del sitio                    | Parámetro del sitio      | Ubicación |
|---------|-----------------------------|---------------------|----------|
| US1     | `https://app.datadoghq.com` | `datadoghq.com`     | US       |
| US3     | `https://us3.datadoghq.com` | `us3.datadoghq.com` | US       |
| US5     | `https://us5.datadoghq.com` | `us5.datadoghq.com` | US       |
| EU1     | `https://app.datadoghq.eu`  | `datadoghq.eu`      | EU (Alemania) |
| US1-FED | `https://app.ddog-gov.com`  | `ddog-gov.com`      | US       |
| AP1     | `https://ap1.datadoghq.com` | `ap1.datadoghq.com` | Japón |
| AP2     | `https://ap2.datadoghq.com` | `ap2.datadoghq.com` | Australia |

Para enviar datos a más de un destino a través de múltiples puntos de conexión, consulte la guía de [Envío Dual][2].

## Dominios de SDK {#sdk-domains}

Consulte [Puntos de conexión compatibles para dominios de SDK][3].

## Navegue por la documentación de Datadog por sitio {#navigate-the-datadog-documentation-by-site}

Diferentes sitios de Datadog pueden soportar diferentes funcionalidades dependiendo de los requisitos de seguridad de la instancia. Por lo tanto, la documentación puede variar entre sitios. Puede usar el menú desplegable del selector de sitio en el lado derecho de cualquier página en la documentación de Datadog para seleccionar el sitio de Datadog sobre el que desea ver información.

{{< img src="getting_started/site/site-selector-gs-with-tags.png" alt="El menú desplegable del selector de sitio en el lado derecho del sitio de Documentación" style="width:100%" >}}

Por ejemplo, para ver la documentación del sitio de Datadog para Gobierno, seleccione **US1-FED**.

## Acceda al sitio de Datadog para Gobierno {#access-the-datadog-for-government-site}

El sitio de Datadog para Gobierno (US1-FED) es el sitio autorizado de FedRAMP Moderate de Datadog. US1-FED está diseñado para permitir que las agencias gubernamentales de US y sus socios supervisen sus aplicaciones e infraestructura. Para obtener información sobre los controles y marcos de seguridad y cumplimiento de US1-FED, así como sobre cómo apoya a FedRAMP, consulte la [página de Seguridad][1].

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/security/
[2]: /es/agent/configuration/dual-shipping/
[3]: /es/real_user_monitoring/#supported-endpoints-for-sdk-domains