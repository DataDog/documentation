---
aliases:
- /es/guides/agent_checks/
- /es/agent/agent_checks
- /es/developers/agent_checks/
description: Aprende a desarrollar y publicar una oferta en la página de integraciones.
further_reading:
- link: /developers/integrations/agent_integration/
  tag: Documentación
  text: Crear una integración del Agent
- link: /developers/integrations/api_integration/
  tag: Documentación
  text: Crear una integración de API
- link: /developers/integrations/marketplace_offering/
  tag: Documentación
  text: Aprende a vender una integración en Datadog Marketplace
- link: /developers/
  tag: Documentación
  text: Aprende a desarrollar en la plataforma de Datadog
title: Crear una integración
---
## Información general

Esta página te explica cómo los socios tecnológicos pueden [crear una integración](#create-a-datadog-integration) mediante el [Datadog Agent][11] o la [API de Datadog][12] y hacer una lista de su oferta en la página **Integraciones** o **Marketplace**. 

{{< tabs >}}
{{% tab "Integraciones" %}}

La página [Integraciones][101] incluye integraciones, creadas tanto por Datadog como por nuestros socios tecnológicos, disponibles _sin coste_ para los clientes de Datadog. 

{{< img src="developers/integrations/integrations_overview.png" alt="Página de integraciones de Datadog" style="width:100%;" >}}

[101]: https://app.datadoghq.com/integrations

{{% /tab %}}
{{% tab "Marketplace" %}}

La [página Marketplace][101] es una plataforma comercial para que los socios tecnológicos _vendan_ una variedad de ofertas, incluidas integraciones, licencias de software y servicios profesionales a los clientes de Datadog.

{{< img src="developers/marketplace/marketplace_updated_overview.png" alt="La página de Datadog Marketplace" style="width:100%" >}}

[101]: https://app.datadoghq.com/marketplace

{{% /tab %}}
{{< /tabs >}}

### Beneficios

Al crear una integración, puedes obtener los siguientes beneficios:

Correlación de tus datos con los datos de observabilidad de los usuarios
: aprovecha Datadog para aumentar el valor de tu plataforma permitiendo a los clientes ver los datos de tu plataforma junto al resto de su stack tecnológico.

Reducción del tiempo medio de resolución (MTTR) para los clientes 
: cuando la cuenta de un cliente se enriquece con los datos de integración, este puede ver una visión más completa de todo su stack tecnológico, lo que le permite depurar y solucionar los problemas con mayor rapidez. 

Aumento de la adopción y la visibilidad 
: asegurar la funcionalidad nativa de Datadog reduce la fricción al momento de la adopción y muestra un cuadro en la [página de integraciones][10] o en la [página de Marketplace][17] que ofrece una visibilidad clave a todos los clientes de Datadog.

## Para empezar

### Puedes unirte a la red de socios de Datadog 

Antes de publicar una integración en Datadog, primero solicita el seguimiento del **Socio tecnológico** de la [red de socios de Datadog][5]. Una vez aprobada tu solicitud, podrás empezar a desarrollar tu integración.

### Solicitar una cuenta sandbox

Todos los socios tecnológicos pueden solicitar una cuenta sandbox dedicada a Datadog para ayudar a desarrollar su integración. Esta cuenta sandbox tiene una licencia gratuita que puedes utilizar para enviar datos, crear dashboards y mucho más. 

<div class="alert alert-info">Si ya eres parte de una organización Datadog (incluida una organización de prueba), es posible que tengas que cambiar a tu nueva sandbox. Para obtener más información, consulta la <a href="https://docs.datadoghq.com/account_management/org_switching/">documentación sobre gestión de cuentas </a>.</div>

Para solicitar una cuenta sandbox:

1. Inicia sesión en el [Portal de socios de Datadog][5].
2. En tu página de inicio, haz clic en el botón **Learn More** (Obtener más información), en **Sandbox Access* (Acceso sandbox).
3. Selecciona **Request Sandbox Upgrade** (Solicitar actualización de sandbox).

La creación de un sandbox para desarrolladores puede tardar uno o dos días hábiles. Una vez creado tu sandbox, puedes [invitar a nuevos miembros de tu organización][6] para colaborar con ellos.

### Explorar los recursos de aprendizaje

Una vez que te hayas unido al seguimiento de **Socios tecnológicos** y hayas solicitado una cuenta sandbox, podrás obtener más información sobre el desarrollo de una oferta:

* Completar el curso bajo demanda [**Introducción a integraciones de Datadog**][7] en el [Centro de aprendizaje de Datadog][8].
* Leer la documentación sobre la creación de [integraciones basadas en API][1] y la configuración de un [cliente OAuth 2.0 para integraciones basadas en API][9].
* Leer la documentación sobre la creación de [integraciones basadas en el Agent][2].

Para obtener más información sobre la venta de una integración de Datadog u otro tipo de oferta, consulta [Crear una oferta de Marketplace][4].

## Crear una integración de Datadog

### Responsabilidades

Como autor de la integración, eres responsable del mantenimiento del código y de asegurar que la integración funcione correctamente en todos los [sitios de Datadog][15]. Si encuentras algún problema de configuración, [ponte en contacto con el soporte][16].

### Integraciones basadas en Agent

Las integraciones basadas en el Agent utilizan el [Datadog Agent][11] para enviar datos a través de checks escritos por Socios tecnológicos. El código de implementación de estas integraciones se aloja en Datadog.

Las integraciones del Agent son las más adecuadas para recopilar datos de sistemas o aplicaciones que residen en una red de área local (LAN) o en una nube privada virtual (VPC). [Para crear una integración del Agent][2] es necesario publicar y desplegar la solución como un wheel de Python (`.whl`).

### Integraciones basadas en API

Las integraciones basadas en API pueden enviar telemetría (como métricas, trazas (traces), logs, etc.) desde plataformas externas mediante la [API de Datadog][12]. De esta manera, los clientes pueden visualizar y correlacionar estos datos con los del resto de su stack tecnológico, lo que les permite analizar y solucionar problemas rápidamente. Las integraciones basadas en API también pueden leer datos de Datadog una vez que los clientes [autorizan el acceso mediante OAuth][13]. 

Los socios tecnológicos escriben y alojan el código de implementación que compone la integración. [Crear una integración de API][1] es útil para los socios tecnológicos que crean un conector entre Datadog y otra plataforma SaaS.

## Requisitos
Todas las integraciones deben incluir lo siguiente:
* Un dashboard de integración predefinido
* 3 o más imágenes para tu cuadro
* OAuth (solo para integraciones de API)
* Un pipeline de log (solo para integraciones de logs)
* Monitor recomendado (para integraciones que envían métricas)

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/developers/integrations/api_integration/
[2]: https://docs.datadoghq.com/es/developers/integrations/agent_integration/
[3]: https://docs.datadoghq.com/es/integrations/
[4]: https://docs.datadoghq.com/es/developers/integrations/marketplace_offering/
[5]: https://partners.datadoghq.com/
[6]: https://docs.datadoghq.com/es/account_management/users/#add-new-members-and-manage-invites
[7]: https://learn.datadoghq.com/courses/intro-to-integrations
[8]: https://learn.datadoghq.com/
[9]: https://docs.datadoghq.com/es/developers/authorization/
[10]: https://app.datadoghq.com/integrations
[11]: https://docs.datadoghq.com/es/agent/
[12]: https://docs.datadoghq.com/es/api/latest/
[13]: https://docs.datadoghq.com/es/developers/authorization/
[14]: https://docs.datadoghq.com/es/metrics/custom_metrics/
[15]: https://docs.datadoghq.com/es/getting_started/site/
[16]: https://docs.datadoghq.com/es/help/
[17]: https://app.datadoghq.com/marketplace