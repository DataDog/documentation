---
aliases:
- /es/security_platform/guide/how-appsec-works/
- /es/security_platform/application_security/how-appsec-works/
further_reading:
- link: /security/application_security/enabling/#compatibility
  tag: Documentación
  text: Obtén más información sobre la compatibilidad de lenguajes y marcos
- link: https://www.datadoghq.com/blog/datadog-application-security/
  tag: Blog
  text: Introducción sobre la seguridad de aplicaciones de Datadog
- link: /security/application_security/enabling/
  tag: Documentación
  text: Activar Application Security Management
title: Cómo funciona Application Security Management en Datadog
---

## Información general

Application Security Management (ASM) de Datadog ofrece visibilidad a nivel de aplicación sobre los ataques que pretenden explotar vulnerabilidades del código o abusar de la lógica empresarial de tu aplicación, así como sobre cualquier atacante que tenga tus sistemas en el punto de mira.

Además, ASM detecta los riesgos incorporados en tus aplicaciones; por ejemplo, a través de bibliotecas y dependencias vulnerables que la aplicación utiliza en tiempo de ejecución.

Datadog APM registra información (llamada "trazas") sobre cada solicitud de la aplicación. Datadog ASM usa las mismas bibliotecas de rastreo que APM para monitorizar tu tráfico, y avisa sobre los intentos de ataques basándose en solicitudes sospechosas que coinciden con patrones de ataque conocidos o [información de lógica empresarial en etiquetas][25]. Las señales de seguridad se generan automáticamente cuando Datadog detecta ataques a aplicaciones o abusos de la lógica empresarial que afectan a tus servicios. Las señales identifican amenazas relevantes para que puedas revisarlas, en lugar de evaluar cada intento de ataque por separado. Según la configuración de tus señales de seguridad, recibirás notificaciones por Slack, correo electrónico o PagerDuty.

Los firewalls de aplicaciones web (WAF) tradicionales suelen desplegarse en el perímetro y no tienen contexto del comportamiento de la aplicación. Como ASM se integra en la aplicación, tiene acceso a los datos de trazas, por lo que resulta más eficaz a la hora de localizar y clasificar las amenazas. Datadog ASM aprovecha los patrones de ataque conocidos, de forma similar a un firewall de aplicaciones web (WAF), pero con contexto adicional sobre la aplicación para aumentar la relación señal-ruido, lo cual disminuye los falsos positivos.

### Identificar servicios expuestos a ataques de aplicaciones

La [protección y monitorización frente a amenazas][1] de Datadog ASM usa la información que APM ya está recopilando y avisa de las trazas que contienen intentos de ataque. Los servicios expuestos a ataques de aplicaciones se resaltan directamente en las vistas de seguridad integradas en ([Catálogo de servicios][2], [Página de servicios][3] y [Trazas][4]) de APM.

Como APM recopila una muestra del tráfico de tu aplicación, es necesario activar ASM en la biblioteca de rastreo para monitorizar y proteger tus servicios con eficacia.

La protección y monitorización frente a amenazas de Datadog identifica a los atacantes recopilando las direcciones IP de los clientes y las etiquetas de usuario añadidas manualmente en todas las solicitudes.

<div class="alert alert-info"><strong>Beta: activación con 1 clic</strong><br>
Si tu servicio está ejecutándose con <a href="/agent/remote_config/#enabling-remote-configuration">un Agent que tenga activada la configuración remota y una versión de la biblioteca de rastreo compatible</a>, puedes <a href="/security/application_security/enabling/">activar ASM</a> desde la interfaz de Datadog sin tener que hacer otros ajustes en el Agent ni en las bibliotecas de rastreo.</div>

### Identificar servicios vulnerables

La [gestión de vulnerabilidades de aplicaciones][5] de Datadog utiliza varias fuentes de datos sobre vulnerabilidades conocidas relacionadas con bibliotecas de software de código abierto, además de información proporcionada por el equipo de investigación de seguridad de Datadog, para contrastar las bibliotecas de las que depende tu aplicación en tiempo de ejecución con sus posibles vulnerabilidades y recomendar las correcciones pertinentes.

## Compatibilidad

Para que Datadog ASM sea compatible con tu configuración de Datadog, debes haber activado APM y [enviar trazas a Datadog][6]. ASM utiliza las mismas bibliotecas que APM, por lo que no necesitas desplegar ni mantener ninguna otra biblioteca. Los pasos para activar Datadog ASM son específicos del lenguaje de ejecución. Comprueba si tu lenguaje está admitido en [Requisitos previos de ASM][7].

### Monitorización serverless

<div class="alert alert-info">La compatibilidad de ASM con AWS Lambda está en fase beta. La detección de amenazas se realiza mediante la extensión Datadog Lambda.</div>

Datadog ASM para AWS Lambda ofrece una visibilidad detallada de los atacantes que tienen tus funciones por objetivo. Con el rastreo distribuido, que facilita un contexto pormenorizado del ataque, puedes evaluar el alcance y poner solución a la amenaza con eficacia.

Consulta más información sobre la configuración en [Activar ASM para serverless][8].

## Rendimiento

Datadog ASM utiliza procesos que ya están en el Agent y APM, por lo que su uso tiene pocas implicaciones en cuanto al rendimiento. Cuando APM está activado, la biblioteca de Datadog genera trazas distribuidas. Datadog ASM informa sobre la actividad de seguridad en las trazas mediante patrones de ataque conocidos. La correlación entre los patrones de ataque y el contexto de ejecución proporcionado por la traza distribuida activa señales de seguridad basadas en reglas de detección.

{{< img src="security/application_security/How_Application_Security_Works_d1.png" alt="Un diagrama ilustra que la biblioteca de rastreo de Datadog opera a nivel de servicio en la aplicación y envía trazas al backend de Datadog. El backend de Datadog marca las señales de seguridad procesables y envía una notificación a la aplicación que corresponda, como PagerDuty, Jira o Slack." >}}

## Muestreo y retención de datos

En la biblioteca de rastreo, Datadog ASM recopila todas las trazas que incluyen datos de seguridad. Un [filtro de retención][9] predeterminado garantiza la retención de todas las trazas relacionadas con la seguridad en la plataforma Datadog.

Los datos de las solicitudes sospechosas se conservan durante 90 días. Los datos de trazas subyacentes se conservan durante 15 días.

## Privacidad de datos

Por defecto, ASM recopila información de las solicitudes sospechosas para ayudarte a entender por qué la petición se ha marcado como sospechosa. Antes de enviar los datos, ASM los analiza en busca de patrones y palabras clave que indiquen que los datos son confidenciales. Si esos datos se consideran confidenciales, se sustituyen por un aviso `<redacted>`. Esto indica que la solicitud era sospechosa, pero que los datos de la solicitud no pudieron recopilarse por motivos de seguridad.

Estos son algunos ejemplos de datos que se marcan como sensibles por defecto:
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

Para configurar la información redactada por ASM, consulta la [configuración de seguridad de datos][17].

## Métodos de detección de las amenazas

Datadog usa varias fuentes de patrones, incluido el [conjunto de reglas básicas de seguridad OWASP ModSecurity][12] para detectar amenazas y vulnerabilidades conocidas en las peticiones HTTP. Cuando una petición HTTP coincide con una de [las reglas de detección OOTB][13], se genera una señal de seguridad en Datadog.

**Actualizaciones automáticas de patrones de amenazas:** Si tu servicio se ejecuta con [un Agente con la configuración remota activada y una versión de la biblioteca de rastreo que la admita][26] , los patrones de amenazas que se utilizan para monitorizar tu servicio se actualizan automáticamente cada vez que Datadog publica actualizaciones.

Las señales de seguridad se crean automáticamente cuando Datadog detecta ataques significativos dirigidos a tus servicios de producción. Dan visibilidad sobre los atacantes y servicios en el punto de mira. Puedes establecer reglas de detección personalizadas con umbrales para determinar de qué ataques quieres recibir notificaciones.

## Protección integrada

{{% asm-protect %}}


## Clasificación del intento de ataque

A partir de la información de rastreo distribuida, los intentos de ataque se clasifican como seguros, desconocidos o dañinos. 
* Los intentos de ataque clasificados como seguros no pueden vulnerar tu aplicación; por ejemplo, cuando un ataque de inyección PHP tiene por objetivo un servicio programado en Java.
* La clasificación de desconocido se asigna cuando no hay suficiente información para emitir un juicio definitivo sobre la probabilidad de que el ataque prospere.
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

Datadog ASM ofrece capacidades de detección integradas que te avisan de las vulnerabilidades detectadas en tus dependencias de código abierto. Los detalles de esa información se muestran en el [explorador de vulnerabilidades][15] e identifican la gravedad, los servicios afectados, la infraestructura potencialmente vulnerable y las instrucciones para solucionar los riesgos detectados.

Consulta más información en [Gestión de vulnerabilidades de las aplicaciones][5].

## Cómo protege Datadog ASM frente a Log4Shell

Datadog ASM identifica las cargas útiles de ataque Log4j Log4Shell y da visibilidad sobre las aplicaciones vulnerables que intentan cargar código dañino en remoto. Cuando se combina con el resto de [Cloud SIEM][16] de Datadog, puedes investigar la actividad habitual posterior a la explotación y corregir los servicios web Java potencialmente vulnerables que actúan como vector de ataque.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/threats/
[2]: /es/tracing/service_catalog/#security-view
[3]: /es/tracing/services/service_page/#security
[4]: /es/tracing/trace_explorer/trace_view/?tab=security#more-information
[5]: /es/security/application_security/risk_management/
[6]: /es/tracing/trace_collection/
[7]: /es/security/application_security/enabling/#prerequisites
[8]: /es/security/application_security/enabling/serverless/
[9]: /es/tracing/trace_pipeline/trace_retention/
[10]: /es/tracing/configure_data_security/?tab=http
[11]: /es/security/application_security/threats/library_configuration/#exclude-specific-parameters-from-triggering-detections
[12]: https://owasp.org/www-project-modsecurity-core-rule-set/
[13]: /es/security/default_rules/#cat-application-security
[14]: https://app.datadoghq.com/security/appsec/event-rules
[15]: https://app.datadoghq.com/security/appsec/vm
[16]: /es/security/cloud_siem/
[17]: /es/security/application_security/threats/library_configuration/#data-security-considerations
[25]: /es/security/application_security/threats/add-user-info#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces
[26]: /es/agent/remote_config/#enabling-remote-configuration