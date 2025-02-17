---
aliases:
- /es/security_platform/guide/how-appsec-works/
- /es/security_platform/application_security/how-appsec-works/
- /es/security/guide/how-appsec-works/
further_reading:
- link: https://www.datadoghq.com/blog/datadog-application-security/
  tag: Blog
  text: Presentación de Datadog Application Security
title: Cómo funciona Datadog Application Security
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Application Security Management no es compatible con el <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Resumen

Datadog Application Security ofrece una capacidad de observación de los ataques a la aplicación que tienen como objetivo explotar las vulnerabilidades del código o abusar de la lógica de negocio de tu aplicación, y de cualquier actor malintencionado que tenga como objetivo tus sistemas. Proporciona:

- **Observabilidad de los ataques**: brinda información sobre los ataques a la aplicación dirigidos a las vulnerabilidades del código o a la lógica empresarial.
- **Monitorización basada en trazas**: utiliza las mismas bibliotecas de rastreo que Datadog APM para monitorar el tráfico y detectar amenazas a la seguridad.
- **Señales de seguridad**: genera automáticamente señales de seguridad cuando se detectan ataques o abusos de la lógica empresarial, centrándose en amenazas significativas en lugar de en intentos individuales.
- **Opciones de notificación**: ofrece notificaciones a través de Slack, correo electrónico o PagerDuty en función de la configuración de las señales de seguridad.
- **Seguridad integrada**: integrada dentro de la aplicación, proporciona una mejor identificación y clasificación de amenazas mediante el acceso a los datos de rastreo.
- **Funcionalidad WAF mejorada**: funciones como un cortafuegos de aplicaciones web (WAF), pero con contexto de aplicación adicional, lo que mejora la precisión y reduce los falsos positivos.

### Identificación de servicios expuestos a ataques de aplicaciones.

[Threat Management][1] de Datadog Application Security utiliza la información que APM ya está recopilando para marcar trazas (traces) que contienen intentos de ataque. Aunque APM recopila una muestra del tráfico de tus aplicaciones, es necesario habilitar Application Security en la biblioteca de rastreo para monitorizar y proteger eficazmente tus servicios.

Los servicios expuestos a ataques de aplicaciones se resaltan directamente en las vistas de seguridad integradas en el ([Catálogo de software][2] de APM, la [Página de servicios][3] y [Trazas][4]).

Datadog Threat Monitoring and Detection identifica a los atacantes recopilando las direcciones IP de los clientes, la información de la cuenta de inicio de sesión (por ejemplo, cuenta de usuario/ID) y las etiquetas (tags) de usuario añadidas manualmente en todas las solicitudes.

<div class="alert alert-info"><strong>Habilitación con 1 clic</strong><br>
Si tu servicio se está ejecutando con <a href="/agent/remote_config/#enabling-remote-configuration">un Agent con la Configuración remota habilitada y una versión de biblioteca de rastreo compatible</a>, puedes <a href="https://app.datadoghq.com/security/configuration/asm/setup">habilitar Application Security</a> desde la interfaz de usuarios de Datadog sin una configuración adicional del Agent o las bibliotecas de rastreo.</div>

## Compatibilidad

Para que Datadog Application Security sea compatible con tu configuración de Datadog, debes tener APM habilitado y [enviando trazas (traces) a Datadog][6]. Application Security utiliza las mismas bibliotecas que APM, por lo que no necesitas desplegar ni mantener otra biblioteca. 

Los pasos para habilitar Datadog Application Security son específicos de cada lenguaje de tiempo de ejecución. Consulta si tu lenguaje es compatible con los requisitos previos de Application Security de cada producto.

## Monitorización serverless

Datadog Application Security para AWS Lambda proporciona una amplia visibilidad de los atacantes que tienen como objetivo tus funciones. Gracias al rastreo distribuido, que te proporciona una descripción del ataque rica en contexto, puedes evaluar el impacto y corregir la amenaza de forma eficaz.

Consulta [Habilitar Application Security para Serverless][8] para obtener más información sobre cómo configurarlo.

## Rendimiento

Datadog Application Security utiliza procesos ya contenidos en el Agent y en APM, por lo que las implicaciones de rendimiento al utilizarlo son insignificantes. 

Cuando APM está habilitado, la biblioteca de Datadog genera trazas distribuidas. Datadog Application Security señala las actividades de seguridad mediante trazas, utilizando patrones de ataque conocidos. La correlación entre los patrones de ataque y el contexto de ejecución proporcionado por las trazas distribuidas activa señales de seguridad basadas en reglas de detección.

{{< img src="security/application_security/How_Appsec_Works_June2023.png" alt="Diagrama que muestra que la biblioteca del rastreador Datadog funciona a nivel de servicio de aplicación y envía trazas al backend de Datadog. El backend de Datadog marca las señales de seguridad procesables y envía una notificación a la aplicación correspondiente, como PagerDuty, Jira o Slack." >}}

## Muestreo y conservación de datos

En la biblioteca de rastreo, Datadog Application Security recopila todas las trazas que incluyen datos de seguridad. Un [filtro de conservación][9] predeterminado garantiza la conservación de todas las trazas relacionadas con la seguridad en la plataforma Datadog.

Los datos de las trazas de seguridad se conservan durante 90 días. Los datos de rastreo subyacentes se conservan durante 15 días.

## Privacidad de los datos

De forma predeterminada, Application Security recopila información de las trazas de seguridad para ayudarte a comprender por qué la solicitud se ha marcado como sospechosa. Antes de enviar los datos, Application Security los analiza en busca de patrones y palabras clave que indiquen que los datos son confidenciales. Si los datos se consideran confidenciales, se sustituyen por una marca `<redacted>`. Esto indica que la solicitud era sospechosa, pero que los datos de la solicitud no pudieron ser recopilados por motivos de seguridad de los datos.

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

Para configurar la información que Application Security oculta, consulta la [configuración de la seguridad de datos][17]

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


Datadog Application Security incluye más de 100 firmas de ataque que te ayudan a protegerte contra [muchos tipos diferentes de ataques][14], incluidas, entre otras, las siguientes categorías:

* Inyecciones SQL
* Inyecciones de código
* Inyecciones de shell
* Inyecciones NoSQL
* Cross-Site Scripting (XSS)
* Falsificación de solicitudes del lado del servidor (SSRF)

## Seguridad de la API

<div class="alert alert-info">La seguridad de la API está en Vista previa.</div>

Datadog Application Security proporciona visibilidad de las amenazas dirigidas a tus API. Utiliza la [lista de endpoints][27] en el Catálogo de software para monitorizar el estado de la API y las métricas de rendimiento, donde puedes ver los ataques dirigidos a tus API. Esta vista incluye la IP del atacante y la información de autenticación, así como los encabezados de solicitud que muestran detalles sobre cómo se formó el ataque. Utilizando tanto Application Security como la gestión de API, puedes mantener una visión completa de la superficie de ataque de tu API y responder para mitigar las amenazas.

## Cómo protege Datadog Application Security contra Log4Shell

Datadog Application Security identifica las cargas útiles de ataque Log4j Log4Shell y proporciona una visibilidad de las aplicaciones vulnerables que intentan cargar un código malicioso de forma remota. Cuando se combina con el resto de [Cloud SIEM de Datadog][16], puedes investigar para identificar la actividad frecuente posterior a la explotación y corregir en forma proactiva los servicios web Java potencialmente vulnerables que actúan como vectores del ataque.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/threats/
[2]: /es/tracing/software_catalog/#security-view
[3]: /es/tracing/services/service_page/#security
[4]: /es/tracing/trace_explorer/trace_view/?tab=security#more-information
[5]: /es/security/code_security/software_composition_analysis/
[6]: /es/tracing/trace_collection/
[8]: /es/security/application_security/serverless/
[9]: /es/tracing/trace_pipeline/trace_retention/
[10]: /es/tracing/configure_data_security/?tab=http
[11]: /es/security/application_security/threats/library_configuration/#exclude-specific-parameters-from-triggering-detections
[12]: https://owasp.org/www-project-modsecurity-core-rule-set/
[13]: /es/security/default_rules/?category=cat-application-security
[14]: https://app.datadoghq.com/security/appsec/event-rules
[15]: https://app.datadoghq.com/security/appsec/vm/library
[16]: /es/security/cloud_siem/
[17]: /es/security/application_security/threats/library_configuration/#data-security-considerations
[25]: /es/security/application_security/threats/add-user-info#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces
[26]: /es/agent/remote_config/#enabling-remote-configuration
[27]: /es/software_catalog/endpoints/
[28]: /es/security/code_security/iast/
[29]: https://docs.datadoghq.com/es/security/code_security/