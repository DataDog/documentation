---
algolia:
  tags:
  - site
  - datadog site
description: Conozca los diferentes sitios de Datadog para su región y requisitos
  de seguridad, incluidas las opciones que cumplen con las normativas gubernamentales.
further_reading:
- link: https://learn.datadoghq.com/courses/dashboards-slos
  tag: Centro de aprendizaje
  text: Cree información estratégica esencial para el negocio mediante Dashboards
    y SLOs
- link: /agent/configuration/dual-shipping/
  tag: Guía
  text: Envío doble
title: Introducción a Datadog Sites
---
## Descripción general {#overview}

Datadog ofrece diferentes sitios en todo el mundo. Cada sitio es completamente independiente y no puede compartir datos entre sitios. Cada sitio le brinda beneficios (por ejemplo, regulaciones de seguridad gubernamentales) o le permite almacenar sus datos en ubicaciones específicas alrededor del mundo.

## Responsabilidad compartida {#shared-responsibility}

La responsabilidad de mantener seguros los datos de los usuarios es compartida entre Datadog y los desarrolladores que utilizan los productos de Datadog.

Datadog es responsable de:
- Proporcionar un producto confiable que maneje los datos de forma segura cuando se transmiten y almacenan en la plataforma de Datadog.
- Garantizar que los problemas de seguridad se identifiquen de acuerdo con las políticas internas.

Los desarrolladores son responsables de:
- Aprovechar los valores de configuración y las opciones de privacidad de datos proporcionadas por Datadog.
- Garantizar la integridad del código dentro de sus entornos.

## Acceda al sitio de Datadog {#access-the-datadog-site}

| Sitio    | URL del sitio                    | Parámetro del sitio      | Ubicación |
|---------|-----------------------------|---------------------|----------|
| US1     | `https://app.datadoghq.com` | `datadoghq.com`     | EE. UU.       |
| US3     | `https://us3.datadoghq.com` | `us3.datadoghq.com` | EE. UU.       |
| US5     | `https://us5.datadoghq.com` | `us5.datadoghq.com` | EE. UU.       |
| EU1     | `https://app.datadoghq.eu`  | `datadoghq.eu`      | UE (Alemania) |
| US1-FED | `https://app.ddog-gov.com`  | `ddog-gov.com`      | EE. UU.       |
| US2-FED | `https://us2.ddog-gov.com`  | `us2.ddog-gov.com`  | EE. UU.       |
| AP1     | `https://ap1.datadoghq.com` | `ap1.datadoghq.com` | Japón |
| AP2     | `https://ap2.datadoghq.com` | `ap2.datadoghq.com` | Australia |
| UK1     | `https://uk1.datadoghq.com` | `uk1.datadoghq.com` | Reino Unido        |

Si tiene un dominio personalizado, como `demo.datadoghq.com`, puede encontrar su sitio en la parte superior de la página {{< ui >}}My Preferences{{< /ui >}}.

{{< img src="getting_started/site/site-in-preferences.png" alt="La parte superior de la página My Preferences en Datadog, que muestra el nombre de la organización y la URL del sitio" style="width:80%" >}}

Para navegar a {{< ui >}}My Preferences{{< /ui >}}, haga clic en el avatar de su perfil en la esquina inferior izquierda y luego seleccione {{< ui >}}My Preferences{{< /ui >}} en el menú.

{{< img src="getting_started/site/my-preferences-menu.png" alt="El menú de la cuenta de Datadog, al que se accede haciendo clic en el avatar de su perfil en la navegación inferior izquierda, que muestra la opción My Preferences en Personal Settings" style="width:80%" >}}

Para enviar datos a más de un destino a través de múltiples endpoints, consulte la guía [Dual Shipping][2].

## Dominios de SDK {#sdk-domains}

Consulte [Endpoints compatibles con los dominios del SDK][3].

## Navegue por la documentación de Datadog por sitio {#navigate-the-datadog-documentation-by-site}

Diferentes sitios de Datadog pueden admitir diferentes funcionalidades según los requisitos de seguridad de la instancia. Por lo tanto, la documentación puede variar entre sitios. Puede usar el menú desplegable del selector de sitio en el lado derecho de cualquier página de la documentación de Datadog para seleccionar el sitio de Datadog sobre el que desea ver información.

{{< img src="getting_started/site/site-selector-gs-with-tags.png" alt="El menú desplegable del selector de sitio en el lado derecho del sitio de documentación" style="width:100%" >}}

Por ejemplo, para ver la documentación de los sitios de Datadog for Government, seleccione {{< ui >}}US1-FED{{< /ui >}} o {{< ui >}}US2-FED{{< /ui >}}.

## Acceda a los sitios de Datadog for Government {#access-the-datadog-for-government-sites}

Para comenzar con Datadog for Government, envíe un correo electrónico a [fed-sales@datadoghq.com][4]. Para obtener información sobre los controles y marcos de seguridad y cumplimiento, consulte la [página de Security][1].

### US1-FED {#us1-fed}

El sitio de Datadog for Government (US1-FED) es el sitio con certificación FedRAMP High de Datadog. US1-FED está diseñado para permitir que las agencias gubernamentales de EE. UU. y sus socios hagan un seguimiento de sus aplicaciones e infraestructura.

### US2-FED {#us2-fed}

El sitio de Datadog for Government (US2-FED) está en proceso de autorización IL5. US2-FED está diseñado para permitir que las agencias gubernamentales de EE. UU. y sus socios hagan un seguimiento de sus aplicaciones e infraestructura.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/security/
[2]: /es/agent/configuration/dual-shipping/
[3]: /es/real_user_monitoring/#supported-endpoints-for-sdk-domains
[4]: mailto:fed-sales@datadoghq.com