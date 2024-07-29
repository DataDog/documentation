---
aliases:
- /security_platform/application_security
description: Monitoriza amenazas dirigidas al sistema de producción basándote en el
  contexto de ejecución proporcionado por las trazas (traces) distribuidas.
further_reading:
- link: /security/application_security/how-appsec-works/
  tag: Documentación
  text: Cómo funciona Application Security Management
- link: /security/application_security/threats/
  tag: Documentación
  text: Gestión de amenazas
- link: /security/application_security/software_composition_analysis/
  tag: Documentación
  text: Análisis de la composición del software
- link: /security/application_security/enabling/#compatibility
  tag: Documentación
  text: Obtener más información sobre la compatibilidad de lenguajes y marcos
- link: https://www.datadoghq.com/product/security-platform/application-security-monitoring/
  tag: Página del producto
  text: Datadog Application Security Management
- link: https://www.datadoghq.com/blog/datadog-application-security/
  tag: Blog
  text: Anuncio sobre la seguridad de las aplicaciones de Datadog
- link: https://www.datadoghq.com/blog/secure-serverless-applications-with-datadog-asm/
  tag: Blog
  text: Aplicaciones serverless seguras con Datadog ASM
- link: https://www.datadoghq.com/blog/securing-cloud-native-applications/
  tag: Blog
  text: Prácticas recomendadas para la seguridad de las aplicaciones en entornos nativos
    de la nube
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: Blog
  text: Obtener visibilidad sobre riesgos, vulnerabilidades y ataques con la vista
    de seguridad de APM
- link: https://www.datadoghq.com/blog/block-attackers-application-security-management-datadog/
  tag: Blog
  text: Bloqueo de atacantes en tus aplicaciones y API con Datadog Application Security
    Management
- link: https://www.datadoghq.com/blog/threat-modeling-datadog-application-security-management/
  tag: Blog
  text: Creación de modelos de amenazas con Datadog Application Security Management
- link: https://www.datadoghq.com/blog/aws-waf-datadog/
  tag: Blog
  text: Monitorización de actividades WAF de AWS con Datadog
title: Application Security Management
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Application Security Management no es compatible con el <a href="/getting_started/site">sitio de Datadog </a> ({{< region-param key="dd_site_name" >}}) seleccionado.</div>
{{< /site-region >}}

{{< img src="/security/application_security/app-sec-landing-page.png" alt="Panel de señales de seguridad en Datadog, que muestra flujos (flows) de ataque y gráficos de llamas" width="75%">}}

Application Security Management (ASM) de Datadog ofrece protección frente a ataques a nivel de aplicación cuyo fin es aprovechar vulnerabilidades en el código, como Server-Side-Request-Forgery (SSRF), SQL injection, Log4Shell y Reflected Cross-Site-Scripting (XSS). Puedes monitorizar y proteger aplicaciones hospedadas directamente en un servidor, Docker, Kubernetes, AWS ECS y (para los lenguajes compatibles) AWS Fargate.

ASM utiliza [bibliotecas de rastreo][1] de Datadog y el [Datadog Agent][2] para identificar servicios expuestos a ataques dirigidos a aplicaciones. Una vez configurado, ASM utiliza reglas de detección en la aplicación para detectar amenazas en el entorno de tu aplicación y protegerte frente a estas, además de activar señales de seguridad cada vez que un ataque afecta al sistema de producción o que se activa una vulnerabilidad desde el código.

Cuando se detecta una amenaza, se genera una señal de seguridad en Datadog. En el caso de las señales de seguridad de gravedad `HIGH` o `CRITICAL`, es posible enviar notificaciones a Slack y PagerDuty o por correo electrónico para notificar al equipo y proporcionar contexto en tiempo real sobre las amenazas.

Una vez activada una señal de seguridad, podrás investigar y aplicar las medidas de protección en Datadog rápidamente. Utiliza los datos detallados de observabilidad proporcionados por el rastreo distribuido de ASM y APM en una sola vista para solucionar problemas de aplicaciones. Analiza los flujos de ataque, consulta gráficos de llamas y revisa datos de trazas y logs para detectar vulnerabilidades de las aplicaciones. Elimina los cambios de contexto al pasar directamente de los datos de aplicación a los pasos de corrección y mitigación, y todo ello desde el mismo panel.

Con ASM, puedes abrirte paso entre el ruido de los datos continuos de trazas para centrarte en asegurar y proteger tu entorno.

Hasta que corrijas por completo las posibles vulnerabilidades del código de tu aplicación, ASM te permite ralentizar a los atacantes bloqueando sus IP de forma temporal o permanente, con un solo clic.

## Entender cómo se implementa la seguridad de las aplicaciones en Datadog

Si quieres saber cómo está estructurado Application Security Management y cómo utiliza datos de rastreo para identificar problemas de seguridad, consulta [Cómo funciona Application Security Management][3].

## Configuración de tu entorno

Valiéndose de las [reglas predefinidas] proporcionadas[4], ASM detecta amenazas sin configuración manual. Si ya tienes configurado [APM][1] de Datadog en un host físico o virtual, para la configuración sólo es necesario definir una variable de entorno para empezar.

Para empezar a configurar tu entorno para detectar amenazas y protegerte de ellas con ASM, consulta la [documentación sobre la activación][5]. Tras configurar ASM, podrás empezar a investigar y corregir señales de seguridad en el [Explorador de señales de seguridad][6].

## Investigar y corregir señales de seguridad

En el [Explorador de señales de seguridad][6], haz clic en cualquier señal de seguridad para ver qué ha sucedido y qué pasos se sugieren para mitigar el ataque. En el mismo panel, consulta trazas con sus flujos de ataque correlacionados y solicita información para disponer de un mayor contexto.

## Investigar riesgos introducidos en bibliotecas y dependencias de código abierto anteriores

El [Análisis de composición del software (SCA)][8] te muestra cuándo están en riesgo tus servicios ya que utiliza o tiene dependencias de bibliotecas de código abierto que tienen vulnerabilidades conocidas. Investiga los hallazgos sobre vulnerabilidades y protege tu software siguiendo los consejos de corrección o investigando la causa de la vulnerabilidad.

## Siguientes pasos

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/
[2]: /es/agent/
[3]: /es/security/application_security/how-appsec-works/
[4]: /es/security/default_rules/?category=cat-application-security
[5]: /es/security/application_security/enabling/
[6]: https://app.datadoghq.com/security
[7]: https://dashcon.io/appsec
[8]: /es/security/application_security/software_composition_analysis/