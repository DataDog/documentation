---
aliases:
- /es/security_platform/guide/how-appsec-works/
- /es/security_platform/application_security/how-appsec-works/
- /es/security/application_security/how-appsec-works/
- /es/security/guide/how-appsec-works/
title: Cómo funciona la protección de aplicaciones y API en Datadog
---

## Información general

La protección de aplicaciones y API (AAP) de Datadog proporciona observabilidad de los ataques a nivel de aplicaciones y API que pretenden explotar vulnerabilidades y abusar de la lógica de negocio de las aplicaciones, así como la observabilidad de cualquier malhechor que se dirija a tus sistemas. La AAP realiza acciones como las siguientes:

- Detecta y monitoriza los ataques a nivel de aplicaciones y API
- Marca las traces (trazas) que contienen intentos de ataque utilizando los datos de APM 
- Destaca los servicios expuestos en las vistas de seguridad (Software Catalog, page (página) Servicio, Traces (Trazas))
- Identifica a los malhechores recopilando las IP de los clientes y la información de los usuarios.
- Proporciona actualizaciones automáticas de patrones de amenazas y señales de seguridad
- Admite protección integrada y calificación de ataques
- Ofrece visibilidad de las amenazas y los detalles de los ataques a la API
- Ayuda a identificar y responder a vulnerabilidades como Log4Shell

### Identifica los servicios expuestos a ataques de aplicaciones

La gestión de amenazas de la protección de aplicaciones y API de Datadog utiliza la información que APM ya está recopilando para marcar las traces (trazas) que contienen intentos de ataque. Aunque APM recopila una muestra del tráfico de tus aplicaciones, es necesario activar la protección de aplicaciones y API en la biblioteca de rastreo para monitorizar y proteger eficazmente tus servicios.

Los servicios expuestos a ataques de aplicaciones se destacan directamente en las vistas de seguridad integradas en APM ([Software Catalog][2], [Page (página) de servicio][3], [Traces (Trazas)][4]).

La monitorización y detección de amenazas de Datadog identifica a los malhechores recopilando las direcciones IP de los clientes, la información de la cuenta de inicio de sesión (por ejemplo, cuenta/ID de usuario) y las tags (etiquetas) de usuario añadidas manualmente en todas las solicitudes.

<div class="alert alert-info"><strong>Habilitación con 1 clic</strong><br>
Si tu servicio se ejecuta en <a href="/agent/remote_config/#enabling-remote-configuration"> un Agent con la configuración remota activada y una versión de la biblioteca de rastreo compatible</a>, puedes <a href="https://app.datadoghq.com/security/configuration/asm/setup">activar la protección de aplicaciones y API</a> desde la interfaz de usuario de Datadog sin necesidad de configurar el Agent ni las bibliotecas de rastreo.</div>

## Compatibilidad

App and API Protection utiliza las mismas bibliotecas que APM, por lo que no es necesario desplegar y mantener otra biblioteca. Los pasos para activar Datadog App and API Protection son específicos de cada lenguaje de ejecución. Consulta las [guías de configuración de App and API Protection][6] para comprobar si tu lenguaje es compatible.

## Monitorización serverless

La protección de aplicaciones y API de Datadog para AWS Lambda proporciona una visibilidad profunda de los atacantes que atacan tus funciones. Gracias al rastreo distribuido, que proporciona una imagen contextual del ataque, puedes evaluar el impacto y corregir la amenaza de forma eficaz.

Lee [Activar la protección de aplicaciones y API para Serverless][8] para obtener información sobre cómo configurarlo.

## Rendimiento

La protección de aplicaciones y API de Datadog utiliza procesos ya contenidos en el Agent y APM, por lo que las implicaciones de rendimiento al utilizarlo son insignificantes. 

Cuando APM está activado, la biblioteca de Datadog genera traces (trazas) distribuidas. La protección de aplicaciones y API de Datadog marca la actividad de seguridad en las traces (trazas) utilizando patrones de ataque conocidos. La correlación entre los patrones de ataque y el contexto de ejecución proporcionado por la trace (traza) distribuida activa señales de seguridad basadas en reglas de detección.

{{< img src="security/application_security/How_Appsec_Works_June2023.png" alt="Diagrama que muestra que la biblioteca del rastreador Datadog funciona a nivel de servicio de aplicación y envía trazas al backend de Datadog. El backend de Datadog marca las señales de seguridad procesables y envía una notificación a la aplicación correspondiente, como PagerDuty, Jira o Slack." >}}

## Muestreo y conservación de datos

En la biblioteca de traces (trazas), la protección de aplicaciones y API de Datadog recopila todas las traces (trazas) que incluyen datos de seguridad. Un valor predeterminado [retention filter (filtro de retención)][9] garantiza la retención de todas las traces (trazas) relacionadas con la seguridad en la plataforma de Datadog.

Los datos de las trazas de seguridad se conservan durante 90 días. Los datos de rastreo subyacentes se conservan durante 15 días.

## Privacidad de los datos

De forma predeterminada, la protección de aplicaciones y API recopila información de las traces (trazas) de seguridad para ayudarte a comprender por qué la solicitud se ha marcado como sospechosa. Antes de enviar los datos, la protección de aplicaciones y API los analiza en busca de patrones y palabras clave que indiquen que los datos son confidenciales. Si los datos se consideran confidenciales, se sustituyen por un marcador `<redacted>`. Esto indica que la solicitud era sospechosa, pero que los datos de la solicitud no podían recopilarse por motivos de seguridad de los datos.

Los siguientes son algunos ejemplos de datos que se marcan como confidenciales de forma predeterminada:
* `pwd`, `password`, `ipassword`, `pass_phrase`
* `secret`
* `key`, `api_key`, `private_key`, `public_key`
* `token`
* `consumer_id`, `consumer_key`, `consumer_secret`
* `sign`, `signed`, `signature`
* `bearer`
* `authorization`
* `BEGIN PRIVATE KEY`
* `ssh-rsa`

Para configurar la información redactada por la protección de aplicaciones y API, consulta la [configuración de seguridad de datos][17].

## Métodos de detección de amenazas

Datadog utiliza varias fuentes de patrones, incluido el [Conjunto de reglas básicas de OWASP ModSecurity][12] para detectar amenazas y vulnerabilidades conocidas en solicitudes HTTP. Cuando una solicitud HTTP coincide con una de [las reglas de detección predefinidas][13], se genera una señal de seguridad en Datadog.

**Actualizaciones automáticas de patrones de amenazas**: Si tu servicio se ejecuta con [un Agent con la configuración remota habilitada y una versión de biblioteca de rastreo compatible][26], los patrones de amenazas que se utilizan para monitorizar tu servicio se actualizan automáticamente cada vez que Datadog publica actualizaciones.

Las señales de seguridad se crean automáticamente cuando Datadog detecta ataques significativos dirigidos a tus servicios de producción. Te proporcionan una visibilidad de los atacantes y de los servicios comprometidos. Puedes establecer reglas de detección personalizadas con umbrales para determinar de qué ataques quieres recibir notificaciones.

## Protección integrada

{{% asm-protect %}}


## Clasificación del intento de ataque

Mediante la utilización de la información del rastreo distribuido, los intentos de ataque se clasifican como seguros, desconocidos o dañinos.
* Los intentos de ataque clasificados como seguros no pueden vulnerar tu aplicación, por ejemplo, cuando un ataque de inyección PHP se dirige a un servicio escrito en Java.
* La clasificación de desconocido se asigna cuando no hay suficiente información para emitir un juicio definitivo sobre la probabilidad de éxito del ataque.
* Se muestra una clasificación de dañino cuando hay pruebas de que el atacante ha encontrado alguna vulnerabilidad a nivel del código.



## Cobertura de la monitorización de amenazas


La protección de aplicaciones y API de Datadog incluye más de 100 firmas de ataques que ayudan a proteger contra [muchos tipos diferentes de ataques][14], incluidas, entre otras, las siguientes categorías:

* Inyecciones SQL
* Inyecciones de código
* Inyecciones de shell
* Inyecciones NoSQL
* Cross-Site Scripting (XSS)
* Falsificación de solicitudes del lado del servidor (SSRF)

## Seguridad de la API

<div class="alert alert-info">La seguridad de la API está en Vista previa.</div>

La protección de aplicaciones y API de Datadog proporciona visibilidad de las amenazas dirigidas a tus API. Utiliza la [Lista de endpoints][27] en Software Catalog para monitorizar las métricas de rendimiento y estado de las API, donde podrás ver los ataques dirigidos a tus API. Esta vista incluye la IP y la información de autenticación del atacante, así como los encabezados de solicitud que muestran detalles sobre cómo se formó el ataque. Con la protección de aplicaciones y API y la gestión de API, puedes mantener una visión completa de la superficie de ataque de tu API y responder para mitigar las amenazas.

## Cómo la protección de aplicaciones y API de Datadog protege contra Log4Shell

La protección de aplicaciones y API de Datadog identifica las cargas útiles de ataques Log4j Log4Shell y proporciona visibilidad de las aplicaciones vulnerables que intentan cargar código malicioso de forma remota. Cuando se utiliza junto con el resto de [Cloud SIEM de Datadog][16], se puedes investigar para identificar la actividad posterior a la explotación común y corregir proactivamente los servicios web Java potencialmente vulnerables que actúan como un vector de ataque.

[1]: /es/security/workload_protection/
[2]: /es/tracing/software_catalog/#security-view
[3]: /es/tracing/services/service_page/#security
[4]: /es/tracing/trace_explorer/trace_view/?tab=security#more-information
[5]: /es/security/code_security/software_composition_analysis/
[6]: /es/security/application_security/setup/
[8]: /es/security/application_security/serverless/
[9]: /es/tracing/trace_pipeline/trace_retention/
[10]: /es/tracing/configure_data_security/?tab=http
[11]: /es/security/application_security/policies/library_configuration/#exclude-specific-parameters-from-triggering-detections
[12]: https://owasp.org/www-project-modsecurity-core-rule-set/
[13]: /es/security/default_rules/?category=cat-application-security
[14]: https://app.datadoghq.com/security/appsec/event-rules
[15]: https://app.datadoghq.com/security/appsec/vm/library
[16]: /es/security/cloud_siem/
[17]: /es/security/application_security/policies/library_configuration/#data-security-considerations
[26]: /es/agent/remote_config/#enabling-remote-configuration
[27]: /es/software_catalog/endpoints/
[28]: /es/security/code_security/iast/
[29]: /es/security/code_security/