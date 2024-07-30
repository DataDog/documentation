---
aliases:
- /security_platform/guide/how-appsec-works/
further_reading:
- link: /security_platform/application_security/setup_and_configure/#compatibility
  tag: Documentación
  text: Obtener más información sobre la compatibilidad de lenguajes y marcos
- link: https://www.datadoghq.com/blog/datadog-application-security/
  tag: Blog
  text: Presentación de la seguridad de las aplicaciones en Datadog
- link: /security_platform/application_security/getting_started/
  tag: Documentación
  text: Empezar con Application Security Management
title: Cómo funciona Application Security Management en Datadog
---

## Información general

[Datadog Application Security Management (ASM)][2] proporciona una capacidad de observación de los ataques a nivel de aplicación que pretenden explotar vulnerabilidades a nivel de código.

APM registra información sobre cada solicitud HTTP, denominada traza (trace). Datadog ASM utiliza la información que ya recopila APM y marca los intentos de ataque basados en solicitudes sospechosas que coinciden con patrones de ataque conocidos. Las señales de seguridad son una agregación de solicitudes sospechosas. Dependiendo de los parámetros de tus señales de seguridad, puedes recibir notificaciones desde Slack, correo electrónico o PagerDuty.

Los firewalls de aplicaciones web (WAF) tradicionales suelen desplegarse en el perímetro y no tienen un contexto del comportamiento de la aplicación. Para garantizar la eficacia de ASM, debe estar integrado en la aplicación para tener acceso a los datos. Datadog ASM aprovecha los patrones de ataque conocidos, de forma similar a los firewalls de aplicaciones web (WAF), pero con contexto adicional de la aplicación para aumentar la relación señal-ruido, lo que reduce los falsos positivos.

## Compatibilidad

Para que Datadog ASM sea compatible con tu configuración de Datadog, debes haber habilitado APM y [enviar trazas a Datadog][1]. ASM utiliza las mismas bibliotecas que APM, por lo que no necesitas desplegar ni mantener ninguna otra biblioteca. Los pasos para habilitar Datadog ASM son específicos del lenguaje de tiempo de ejecución. Comprueba si tu lenguaje es compatible en [los requisitos previos de ASM][2].

## Rendimiento

Datadog ASM utiliza procesos que ya están en el Agent y en APM, por lo que su uso tiene pocas implicaciones en cuanto al rendimiento. Cuando APM está habilitado, la biblioteca de Datadog genera trazas distribuidas. Datadog ASM marca la actividad de seguridad en las trazas mediante patrones de ataque conocidos. La correlación entre los patrones de ataque y el contexto de ejecución proporcionado por la traza distribuida activa señales de seguridad basadas en reglas de detección.

{{< img src="security/application_security/How_Application_Security_Works_d1.png" alt="Un diagrama ilustra que la biblioteca del rastreador Datadog funciona a nivel de servicio de la aplicación y envía trazas al backend de Datadog. El backend de Datadog marca las señales de seguridad procesables y envía una notificación a la aplicación correspondiente, como PagerDuty, Jira o Slack." >}}

## Privacidad de los datos

Existen múltiples métodos para evitar que tu información confidencial sea indexada. Para tomar medidas adicionales, puedes configurar [depuradores personalizados y estáticos][3] y utilizar [filtros de exclusión][4].


**Nota:** Datadog ASM no ofusca automáticamente la información confidencial o PII. Para evitar que estos datos confidenciales se envíen a Datadog, [configura el Agent o el rastreador Datadog para la seguridad de los datos][3].

Ponte en contacto con el servicio de asistencia para eliminar los datos confidenciales que puedan haber sido indexados.

## Métodos de detección de amenazas

Datadog utiliza varias fuentes de patrones, incluido el [conjunto de reglas básicas de OWASP ModSecurity][5] para detectar amenazas y vulnerabilidades conocidas en solicitudes HTTP. Cuando una solicitud HTTP coincide con una de [las reglas de detección predefinidas][6], se genera una señal de seguridad en Datadog.

Las señales de seguridad se crean automáticamente cuando Datadog detecta ataques significativos dirigidos a tus servicios de producción. Te proporcionan una visibilidad de los atacantes y servicios comprometidos. Puedes establecer reglas de detección personalizadas con umbrales para determinar de qué ataques quieres recibir notificaciones.

## Cobertura

Datadog ASM clasifica los intentos de ataque en diferentes tipos de amenazas:

* Los **Ataques no clasificados** coinciden con las solicitudes HTTP entrantes con patrones de ataque conocidos. Por ejemplo, no se encuentra ninguna correlación con la lógica empresarial del servicio después de correlacionarla con el contexto de ejecución proporcionado por la traza.
* Los **Ataques contextualizados** correlacionan los intentos de ataque al servicio que tiene una lógica empresarial coincidente. Por ejemplo, patrones de inyección SQL en un servicio que ejecuta sentencias SQL.
* Una **Vulnerabilidad se activa** cuando un intento de ataque pone en evidencia que una vulnerabilidad ha sido explotada con éxito, tras coincidir con patrones de ataque conocidos.

Datadog ASM incluye más de 100 patrones de ataque que ayudan a proteger contra [muchos tipos diferentes de ataques][7], incluyendo las siguientes vulnerabilidades:

* Inyecciones SQL
* Inyecciones de código
* Inyecciones de shell
* Inyecciones NoSQL
* Secuencia de comandos en sitios cruzados (XSS)
* Falsificación de peticiones del lado del servidor (SSRF)

## Cómo protege Datadog ASM frente a Log4Shell

Datadog ASM identifica las cargas útiles de ataque Log4j Log4Shell y proporciona una visibilidad de las aplicaciones vulnerables que intentan cargar código malicioso de forma remota. Cuando se combina con el resto de Datadog [Cloud SIEM][8], puedes investigar la actividad habitual posterior a la explotación y corregir los servicios web Java potencialmente vulnerables que actúan como vectores de ataque.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/
[2]: /es/security_platform/application_security/getting_started/#prerequisites
[3]: /es/tracing/configure_data_security/?tab=http
[4]: /es/security_platform/cloud_siem/guide/how-to-setup-security-filters-using-cloud-siem-api/
[5]: https://owasp.org/www-project-modsecurity-core-rule-set/
[6]: /es/security_platform/default_rules/#cat-application-security
[7]: https://app.datadoghq.com/security/appsec/event-rules
[8]: /es/security_platform/cloud_siem/