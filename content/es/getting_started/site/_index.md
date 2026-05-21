---
algolia:
  tags:
  - site
  - datadog site
description: Aprende sobre los diferentes sitios de Datadog para tu región y requisitos
  de seguridad, incluyendo opciones que cumplen con las normativas gubernamentales.
further_reading:
- link: https://learn.datadoghq.com/courses/dashboards-slos
  tag: Centro de Aprendizaje
  text: Cree Perspectivas Críticas para el Negocio Usando Tableros y SLOs
- link: /agent/configuration/dual-shipping/
  tag: Guía
  text: Envío Dual
title: Comenzando con los Sitios de Datadog
---
## Resumen {#overview}

Datadog ofrece diferentes sitios en todo el mundo. Cada sitio es completamente independiente y no se pueden compartir datos entre ellos. Cada sitio le brinda beneficios (por ejemplo, regulaciones de seguridad gubernamentales) o le permite almacenar sus datos en ubicaciones específicas alrededor del mundo.

## Responsabilidad compartida {#shared-responsibility}

La responsabilidad de mantener los datos de los usuarios seguros se comparte entre Datadog y los desarrolladores que utilizan los productos de Datadog.

Datadog es responsable de:
- Proporcionar un producto confiable que maneje los datos de manera segura cuando se transmiten y almacenan en la plataforma de Datadog.
- Asegurar que los problemas de seguridad se identifiquen de acuerdo con las políticas internas.

Los desarrolladores son responsables de:
- Aprovechar los valores de configuración y las opciones de privacidad de datos proporcionadas por Datadog.
- Asegurar la integridad del código dentro de sus entornos.

## Acceda al sitio de Datadog {#access-the-datadog-site}

| Sitio    | URL del Sitio                    | Parámetro del Sitio      | Ubicación |
|---------|-----------------------------|---------------------|----------|
| US1     | `https://app.datadoghq.com` | `datadoghq.com`     | US       |
| US3     | `https://us3.datadoghq.com` | `us3.datadoghq.com` | US       |
| US5     | `https://us5.datadoghq.com` | `us5.datadoghq.com` | US       |
| EU1     | `https://app.datadoghq.eu`  | `datadoghq.eu`      | EU (Alemania) |
| US1-FED | `https://app.ddog-gov.com`  | `ddog-gov.com`      | US       |
| US2-FED | `https://us2.ddog-gov.com`  | `us2.ddog-gov.com`  | US       |
| AP1     | `https://ap1.datadoghq.com` | `ap1.datadoghq.com` | Japón |
| AP2     | `https://ap2.datadoghq.com` | `ap2.datadoghq.com` | Australia |

Si tienes un dominio personalizado, como `demo.datadoghq.com`, puedes encontrar tu sitio listado en la parte superior de la página **Mis Preferencias**.

{{< img src="getting_started/site/site-in-preferences.png" alt="La parte superior de la página Mis Preferencias en Datadog, mostrando el nombre de la organización y la URL del sitio" style="width:80%" >}}

Para navegar a **Mis Preferencias**, haz clic en tu avatar de perfil en la esquina inferior izquierda, luego selecciona **Mis Preferencias** del menú.

{{< img src="getting_started/site/my-preferences-menu.png" alt="El menú de cuenta de Datadog, accesible haciendo clic en tu avatar de perfil en la navegación inferior izquierda, mostrando la opción Mis Preferencias bajo Configuraciones Personales" style="width:80%" >}}

Para enviar datos a más de un destino a través de múltiples puntos de conexión, consulta la guía de [Envío Dual][2].

## Dominios SDK {#sdk-domains}

Consulta [Puntos de conexión soportados para dominios SDK][3].

## Navega la documentación de Datadog por sitio {#navigate-the-datadog-documentation-by-site}

Diferentes sitios de Datadog pueden soportar diferentes funcionalidades dependiendo de los requisitos de seguridad de la instancia. Por lo tanto, la documentación puede variar entre sitios. Puedes usar el menú desplegable de selección de sitio en el lado derecho de cualquier página en la documentación de Datadog para seleccionar el sitio de Datadog sobre el que deseas ver información.

{{< img src="getting_started/site/site-selector-gs-with-tags.png" alt="El menú desplegable del selector de sitios en el lado derecho del sitio de Documentación" style="width:100%" >}}

Por ejemplo, para ver la documentación de los sitios de Datadog para el Gobierno, selecciona **US1-FED** o **US2-FED**.

## Accede a los sitios de Datadog para el Gobierno {#access-the-datadog-for-government-sites}

### US1-FED {#us1-fed}

El sitio de Datadog para el Gobierno (US1-FED) es el sitio autorizado de FedRAMP Moderate de Datadog. US1-FED está destinado a permitir que las agencias y socios del gobierno de EE. UU. monitoreen sus aplicaciones e infraestructura. Para obtener información sobre los controles y marcos de seguridad y cumplimiento de US1-FED, así como sobre cómo apoya a FedRAMP, consulta la [página de Seguridad][1].

### US2-FED {#us2-fed}

El sitio de Datadog para el Gobierno (US2-FED) está en proceso de autorización IL5. US2-FED está destinado a permitir que las agencias y socios del gobierno de EE. UU. monitoreen sus aplicaciones e infraestructura. Para más información, envía un correo electrónico a [fedramp@datadoghq.com][4].

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/security/
[2]: /es/agent/configuration/dual-shipping/
[3]: /es/real_user_monitoring/#supported-endpoints-for-sdk-domains
[4]: mailto:fedramp@datadoghq.com