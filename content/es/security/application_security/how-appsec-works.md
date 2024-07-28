---
aliases:
- /security_platform/guide/how-appsec-works/
- /security_platform/application_security/how-appsec-works/
- /security/guide/how-appsec-works/
further_reading:
- link: /security/application_security/enabling/compatibility
  tag: Documentación
  text: Obtener más información sobre la compatibilidad de lenguajes y marcos
- link: https://www.datadoghq.com/blog/datadog-application-security/
  tag: Blog
  text: Presentación de la seguridad de las aplicaciones en Datadog
- link: /security/application_security/enabling/
  tag: Documentación
  text: Habilitar Application Security Management
title: Cómo funciona Application Security Management en Datadog
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Application Security Management no es compatible con el <a href="/getting_started/site">sitioDatadog </a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Resumen

Datadog Application Security Management (ASM) proporciona una capacidad de observación de los ataques a nivel de aplicación que tienen como objetivo explotar las vulnerabilidades a nivel de código o abusar de la lógica empresarial de tu aplicación y de cualquier actor malicioso que tenga como objetivo sus sistemas.

Además, ASM detecta los riesgos incorporados en tus aplicaciones, por ejemplo a través de bibliotecas y dependencias vulnerables que la aplicación utiliza en tiempo de ejecución.

Datadog APM registra información, mediante trazas (traces), sobre cada solicitud de la aplicación. Datadog ASM utiliza las mismos bibliotecas de rastreo que APM para monitorizar tu tráfico. ASM marca los intentos de ataque basándose en las trazas de seguridad que coinciden con patrones de ataque conocidos o en [etiquetas (tags) con información de lógica de empresarial][25]. Las señales de seguridad se crean automáticamente cuando Datadog detecta ataques a aplicaciones o abusos de la lógica empresarial que afectan a tus servicios. Las señales identifican amenazas significativas para tu revisión, en lugar de evaluar cada intento de ataque individual. Dependiendo de los parámetros de tus señales de seguridad, puedes recibir notificaciones desde Slack, correo electrónico o PagerDuty.

Los cortafuegos de aplicaciones web (WAF) tradicionales suelen desplegarse en el perímetro y no tienen contexto del comportamiento de la aplicación. Dado que ASM está integrado en la aplicación, tiene acceso a los datos de rastreo, lo que lo hace más eficaz a la hora de localizar y clasificar las amenazas. Datadog ASM aprovecha los patrones de ataque conocidos, de forma similar a un cortafuegos de aplicaciones Web (WAF), pero con contexto adicional de la aplicación para aumentar la relación señal-ruido, lo que reduce los falsos positivos.

### Identificar servicios expuestos a ataques de aplicaciones

La [Gestión de las amenazas][1] de Datadog ASM utiliza la información que APM ya está recopilando, y marca las trazas que contienen intentos de ataque. Los servicios expuestos a ataques a las aplicaciones se destacan directamente en las vistas de seguridad integradas en el ([Catálogo de servicios][2], la [Página del servicio][3] y las [Trazas][4]) de APM.

Debido a que APM recopila una muestra del tráfico de tu aplicación, habilitar ASM en la biblioteca de rastreo es necesario para efectivamente monitorizar y proteger tus servicios de forma efectiva.

La monitorización y la detección de amenazas de Datadog identifica a los actores maliciosos mediante la recopilación de las direcciones IP de los clientes y las etiquetas de usuario añadidas manualmente etiquetas en todas las solicitudes.

<div class="alert alert-info"><strong>Habilitación con 1 clic</strong><br>
Si tu servicio se está ejecutando con un <a href="/agent/remote_config/#enabling-remote-configuration">Agent con la configuración remota habilitada y una versión de biblioteca de rastreo que lo admita</a>, puedes <a href="/security/application_security/enabling/">habilitar ASM</a> desde la interfaz de usuario de Datadog sin una configuración adicional del Agent o de las bibliotecas de rastreo.</div>

### Identificar los servicios vulnerables

El [Análisis de la composición del software][5] de Datadog utiliza varias fuentes de datos de vulnerabilidades conocidas relacionadas con bibliotecas de software de código abierto, además de información proporcionada por el equipo de investigación de seguridad de Datadog, para emparejar las bibliotecas de las que depende tu aplicación en tiempo de ejecución con tus vulnerabilidades potenciales, y recomendar correcciones.

## Compatibilidad

Para que Datadog ASM sea compatible con tu configuración de Datadog, debes haber habilitado APM y [enviar trazas a Datadog][6]. ASM utiliza las mismas bibliotecas que APM, por lo que no necesitas desplegar ni mantener ninguna otra biblioteca. Los pasos para habilitar Datadog ASM son específicos del lenguaje de tiempo de ejecución. Comprueba si tu lenguaje es compatible en [los requisitos previos de ASM][7].

### Monitorización serverless

Datadog ASM para AWS Lambda ofrece una visibilidad detallada de los atacantes que apuntan a tus funciones. Con el rastreo distribuido, que facilita un contexto pormenorizado del ataque, puedes evaluar el alcance y dar solución a la amenaza de forma efectiva.

Para obtener información sobre la configuración, consulta [Habilitar ASM para serverless][8].

## Rendimiento

Datadog ASM utiliza procesos que ya están en el Agent y en APM, por lo que su uso tiene pocas implicaciones en cuanto al rendimiento. Cuando APM está habilitado, la biblioteca de Datadog genera trazas distribuidas. Datadog ASM marca la actividad de seguridad en las trazas mediante patrones de ataque conocidos. La correlación entre los patrones de ataque y el contexto de ejecución proporcionado por la traza distribuida activa señales de seguridad basadas en reglas de detección.

{{< img src="security/application_security/How_Appsec_Works_June2023.png" alt="Diagrama que muestra que la biblioteca del rastreador Datadog funciona a nivel de servicio de aplicación y envía trazas al backend de Datadog. El backend de Datadog marca las señales de seguridad procesables y envía una notificación a la aplicación correspondiente, como PagerDuty, Jira or Slack." >}}

## Muestreo y conservación de datos

En la biblioteca de rastreo, Datadog ASM recopila todos los trazas que incluyen datos de seguridad. Un [filtro de conservación][9] predeterminado garantiza la conservación de todas las trazas relacionadas con la seguridad en la plataforma Datadog.

Los datos de las trazas de seguridad se conservan durante 90 días. Los datos de rastreo subyacentes se conservan durante 15 días.

## Privacidad de los datos

Por defecto, ASM recopila información de las trazas de seguridad para ayudarte a entender por qué la solicitud se ha marcado como sospechosa. Antes de enviar los datos, ASM los analiza en busca de patrones y palabras clave que indiquen que los datos son confidenciales. Si esos datos se consideran confidenciales, se sustituyen por una marca `<redacted>`. Esto indica que la solicitud era sospechosa, pero que los datos de la solicitud no pudieron recopilarse por motivos de seguridad de los datos.

Los siguientes son algunos ejemplos de datos que se marcan como confidenciales por defecto:
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

Para configurar la información que ASM oculta, consulta la [configuración de seguridad de los datos][17].

## Métodos de detección de amenazas

Datadog utiliza varias fuentes de patrones, incluido el [conjunto de reglas básicas de OWASP ModSecurity][12] para detectar amenazas y vulnerabilidades conocidas en solicitudes HTTP. Cuando una solicitud HTTP coincide con una de [las reglas de detección predefinidas][13], se genera una señal de seguridad en Datadog.

**Actualizaciones automáticas de patrones de amenazas:** Si tu servicio se ejecuta con [un Agent con la configuración remota habilitada y una versión de biblioteca de rastreo que lo admita][26], los patrones de amenazas que se utilizan para monitorizar tu servicio se actualizan automáticamente cada vez que Datadog publica actualizaciones.

Las señales de seguridad se crean automáticamente cuando Datadog detecta ataques significativos dirigidos a tus servicios de producción. Te proporcionan una visibilidad de los atacantes y servicios comprometidos. Puedes establecer reglas de detección personalizadas con umbrales para determinar de qué ataques quieres recibir notificaciones.

## Protección integrada

{{% asm-protect %}}


## Clasificación del intento de ataque

Aprovechando la información de rastreo distribuida, los intentos de ataque se clasifican como seguros, desconocidos o dañinos.
* Los intentos de ataque clasificados como seguros no pueden vulnerar tu aplicación, por ejemplo, cuando un ataque de inyección PHP apunta a un servicio escrito en Java.
* La clasificación de desconocido se asigna cuando no hay suficiente información para emitir un juicio definitivo sobre la probabilidad de éxito del ataque.
* Se muestra una clasificación dañina cuando hay pruebas de que el atacante ha encontrado alguna vulnerabilidad a nivel del código.



## Cobertura de la monitorización de amenazas


Datadog ASM incluye más de 100 firmas de ataques que ayudan a proteger frente a [diversos tipos de ataques][14], incluyendo, entre otras, las siguientes categorías:

* Inyecciones SQL
* Inyecciones de código
* Inyecciones de shell
* Inyecciones NOSQL
* Secuencia de comandos en sitios cruzados (XSS)
* Falsificación de solicitudes del lado del servidor (SSRF)

## Detección de vulnerabilidades integrada

Datadog ASM ofrece capacidades de detección incorporadas que te avisan de las vulnerabilidades detectadas en tus dependencias de código abierto. Los detalles de esa información se muestran en el [Explorador de vulnerabilidades][15] e identifican la gravedad, los servicios afectados, la infraestructura potencialmente vulnerable y las instrucciones para solucionar los riesgos detectados.

Para obtener más información, consulta [Análisis de la composición del software][5].

## Seguridad de la API

<div class="alert alert-info">La seguridad de la API está en beta privada.</div>

Datadog Application Security Management (ASM) proporciona visibilidad de las amenazas dirigidas a tus API. Utiliza el [Catálogo de API][27] para monitorizar la salud y las métricas de rendimiento de las API, donde puedes ver los ataques dirigidos a tus API. Esta vista incluye la IP del atacante y la información de autenticación, así como las cabeceras de solicitud que muestran detalles sobre cómo se ha formado el ataque. Utilizando ASM y la gestión de las API, puedes tener una visión completa de la superficie de ataque a tu API y responder para mitigar las amenazas.

## Cómo protege Datadog ASM frente a Log4Shell

Datadog ASM identifica las cargas útiles de ataque Log4j Log4Shell y proporciona una visibilidad de las aplicaciones vulnerables que intentan cargar código malicioso de forma remota. Cuando se combina con el resto de Datadog [Cloud SIEM][16], puedes investigar la actividad habitual posterior a la explotación y corregir los servicios web Java potencialmente vulnerables que actúan como vectores de ataque.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/threats/
[2]: /es/tracing/service_catalog/#security-view
[3]: /es/tracing/services/service_page/#security
[4]: /es/tracing/trace_explorer/trace_view/?tab=security#more-information
[5]: /es/security/application_security/software_composition_analysis/
[6]: /es/tracing/trace_collection/
[7]: /es/security/application_security/enabling/#prerequisites
[8]: /es/security/application_security/enabling/serverless/
[9]: /es/tracing/trace_pipeline/trace_retention/
[10]: /es/tracing/configure_data_security/?tab=http
[11]: /es/security/application_security/threats/library_configuration/#exclude-specific-parameters-from-triggering-detections
[12]: https://owasp.org/www-project-modsecurity-core-rule-set/
[13]: /es/security/default_rules/?category=cat-application-security
[14]: https://app.datadoghq.com/security/appsec/event-rules
[15]: https://app.datadoghq.com/security/appsec/vm
[16]: /es/security/cloud_siem/
[17]: /es/security/application_security/threats/library_configuration/#data-security-considerations
[25]: /es/security/application_security/threats/add-user-info#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces
[26]: /es/agent/remote_config/#enabling-remote-configuration
[27]: /es/tracing/api_catalog/