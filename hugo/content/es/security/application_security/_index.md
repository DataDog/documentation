---
algolia:
  tags:
  - asm
  - App and API Protection
aliases:
- /es/security_platform/application_security
- /es/security/application_security/enabling/single_step
- /es/security/application_security/enabling/compatibility
- /es/security/application_security/enabling
- /es/security/application_security/getting_started
- /es/security/application_security/threats
- /es/security/application_security/setup/standalone
cascade:
  site_support_id: application_security_override
description: Haga un seguimiento de las amenazas dirigidas al sistema de producción,
  aprovechando el contexto de ejecución proporcionado por trazas distribuidas.
further_reading:
- link: https://www.datadoghq.com/blog/secure-api-with-datadog
  tag: Blog
  text: 'Del descubrimiento a la defensa: Protegiendo las APIs con Datadog App and
    API Protection'
- link: /security/application_security/how-it-works/
  tag: Documentación
  text: Cómo funciona App and API Protection
- link: https://www.datadoghq.com/product/security-platform/application-security-monitoring/
  tag: Página del producto
  text: Datadog App and API Protection
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: Blog
  text: Obtenga visibilidad de los riesgos, vulnerabilidades y ataques con APM Security
    View
- link: https://www.datadoghq.com/blog/aws-waf-datadog/
  tag: Blog
  text: Hacer un seguimiento de la actividad de AWS WAF con Datadog
- link: https://www.datadoghq.com/blog/security-inbox-prioritization/
  tag: Blog
  text: Cómo prioriza los riesgos de seguridad Datadog Security Inbox
- link: https://www.datadoghq.com/blog/understanding-your-waf/
  tag: Blog
  text: 'Entendiendo su WAF: Cómo abordar las brechas comunes en la seguridad de aplicaciones
    web'
- link: https://www.datadoghq.com/blog/mitigate-account-takeovers/
  tag: Blog
  text: Mitigue la apropiación de cuentas con Datadog App and API Protection
- link: https://learn.datadoghq.com/courses/app-protection-block-attacks
  tag: Centro de aprendizaje
  text: Bloquee ataques a aplicaciones con App and API Protection
site_support_id: application_security_override
title: App and API Protection
---
{{% site-region region="us,us3,us5,eu,ap1,ap2,uk1" %}}

<div class="alert alert-info">
AI Guard está en versión preliminar. Obtenga barreras de seguridad en tiempo real para sus aplicaciones y agentes de IA. AI Guard ayuda a proteger sus AI apps y agentes en tiempo real contra prompt injection, jailbreaking, tool misuse y sensitive data exfiltration attacks. Complete este <a href="https://www.datadoghq.com/product-preview/ai-security/">formulario</a> para solicitar acceso.
</div>

{{% /site-region %}}

{{< img src="/security/application_security/app-sec-landing-page.png" alt="Un panel de señales de seguridad en Datadog, que muestra flujos de ataque y gráficos de llama." width="75%">}}

**App and API Protection (AAP)** proporciona visibilidad y seguridad unificadas para sus aplicaciones y API, ayudándole a detectar, investigar y prevenir amenazas en cargas de trabajo modernas.

Ya sea que esté defendiendo APIs de cara al público, servicios internos o aplicaciones orientadas al usuario, AAP equipa a sus equipos con detección de amenazas en tiempo real OOTB, evaluación de postura y protecciones dentro de la aplicación.

<div class="alert alert-info">Anteriormente conocido como Application Security Monitoring (ASM), AAP ahora va más allá de la detección de amenazas en tiempo de ejecución para incluir capacidades de descubrimiento de API, gestión de postura y protección.</div>

## Capacidades clave {#key-capabilities}

### Descubrimiento de API y gestión de postura {#api-discovery-and-posture-management}

* Detecte automáticamente todas las API expuestas por sus servicios.  
* Identifique puntos de conexión sin protección, indocumentados o excesivamente permisivos.  
* Obtenga hallazgos detallados y contextuales vinculados a puntos de conexión específicos, configuraciones incorrectas y comportamiento observado.  
* Evalúe las configuraciones de API frente a reglas de postura basadas en las mejores prácticas de seguridad y marcos de cumplimiento (por ejemplo, OWASP API Top 10).
* Verifique activamente la accesibilidad y autenticación de los puntos de conexión con [Endpoint Scanning][17].

### Detección y protección de amenazas en tiempo de ejecución {#runtime-threat-detection-and-protection}

* Detecte amenazas en tiempo real, como ataques de inyección, intentos de apropiación de cuentas y abuso de aplicaciones.  
* Correlacione patrones de ataque de múltiples señales en información procesable.  
* Bloquee el tráfico malicioso con reglas de WAF en la aplicación utilizando atributos como IP, agente de usuario, encabezados y más.

## Casos de uso {#use-cases}

* Proteja los datos de los clientes en las API de producción  
* Detecte y bloquee el relleno de credenciales y los ataques de ATO  
* Mantenga el cumplimiento de la postura de API en todos los equipos y entornos  
* Investigue incidentes con datos correlacionados de traza, registro y seguridad

## Implementación de AAP en Datadog {#aap-implementation-in-datadog}

Si tiene curiosidad sobre cómo está estructurada la Protección de aplicaciones y API y cómo utiliza los datos de seguimiento para identificar problemas de seguridad, lea [Cómo funciona la Protección de aplicaciones y API][3].

## Configure su entorno {#configure-your-environment}

Con la tecnología de [reglas preconfiguradas][4], AAP detecta amenazas sin necesidad de configuración manual. Si ya tiene configurado [APM][1] de Datadog en un servidor físico o virtual, la [configuración][16] solo requiere establecer una variable de entorno para comenzar.

Para comenzar a configurar su entorno para detectar y proteger amenazas con AAP, siga la documentación de habilitación para cada producto. Una vez configurado AAP, puede comenzar a investigar y remediar señales de seguridad en el [explorador de señales de seguridad][6].

## Investigue y remedie señales de seguridad {#investigate-and-remediate-security-signals}

En el [explorador de señales de seguridad][6], haga clic en cualquier señal de seguridad para ver qué sucedió y los pasos sugeridos para mitigar el ataque. En el mismo panel, visualice las trazas con su flujo correlacionado de ataque e información de solicitud para obtener más contexto.

## Prevención de exploits frente a WAF en la aplicación {#exploit-prevention-vs-in-app-waf}

Esta sección proporciona un resumen de Exploit Prevention y cómo difiere de las reglas de Web Application Firewall en la aplicación.

Datadog AAP incluye las funciones de [Exploit Prevention][14] y [In-App WAF][15] para proteger sus aplicaciones contra exploits. Exploit Prevention es una extensión de In-App WAF. Exploit Prevention aprovecha In-App WAF como primera línea de defensa y luego bloquea los ataques que el WAF no detectó.

Exploit Prevention aprovecha Runtime Application Self-Protection (RASP) para determinar si una solicitud de aplicación interactúa con una ruta de código vulnerable y, luego, la protege de tipos específicos de vulnerabilidades:

- Inyección SQL (SQLi)
- Falsificación de solicitud del lado del servidor (SSRF)
- Inclusión de archivos locales (LFI)
- Inyección de comandos

Para conocer la compatibilidad de bibliotecas, consulte [Exploit Prevention][13].

Además de detectar patrones maliciosos en la solicitud, Exploit Prevention se diferencia de In-App WAF al rastrear las acciones realizadas por la aplicación (consulta SQL ejecutada, archivos accedidos, etcétera). Exploit Prevention puede determinar si la entrada del usuario modificó la consulta SQL o restringió un archivo de manera perjudicial, y bloquearla. 

Por ejemplo, en un ataque de inyección SQL, el objetivo del atacante es tomar el control de la consulta SQL y cambiar su significado. Exploit Prevention analiza la consulta SQL antes de su ejecución y busca cualquier parámetro de usuario en la consulta. Si está presente, Exploit Prevention verifica si el analizador SQL interpretó el parámetro como múltiples tokens SQL (cambiando el significado de la consulta SQL). Exploit Prevention marca la consulta como inyectada.

## Deshabilitar AAP {#disable-aap}

Para obtener información sobre cómo deshabilitar AAP o sus funciones, consulte lo siguiente:

- [Disabling AAP][10]

## Próximos pasos {#next-steps}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/
[2]: /es/agent/
[3]: /es/security/application_security/how-it-works/
[4]: /es/security/default_rules/?category=cat-application-security
[6]: https://app.datadoghq.com/security
[7]: https://dashcon.io/appsec
[8]: /es/security/code_security/software_composition_analysis/
[9]: /es/security/code_security/
[10]: /es/security/application_security/troubleshooting/#disabling-aap
[11]: /es/security/application_security/troubleshooting/#disabling-software-composition-analysis
[12]: /es/security/application_security/troubleshooting/#disabling-code-security
[13]: /es/security/application_security/exploit-prevention/#library-compatibility
[14]: /es/security/application_security/exploit-prevention/
[15]: /es/security/application_security/waf-integration/
[16]: /es/security/application_security/setup/
[17]: /es/security/application_security/api_posture/endpoint_scanning/