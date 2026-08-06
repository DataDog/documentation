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
description: Monitoree las amenazas dirigidas al sistema de producción, aprovechando
  el contexto de ejecución proporcionado por las trazas distribuidas.
further_reading:
- link: https://www.datadoghq.com/blog/secure-api-with-datadog
  tag: Blog
  text: 'Del descubrimiento a la defensa: Asegurando APIs con Datadog App and API
    Protection'
- link: /security/application_security/how-it-works/
  tag: Documentación
  text: Cómo funciona App and API Protection
- link: https://www.datadoghq.com/product/security-platform/application-security-monitoring/
  tag: Página del producto
  text: Datadog App and API Protection
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: Blog
  text: Obtenga visibilidad de los riesgos, vulnerabilidades y ataques con APM Security
    View.
- link: https://www.datadoghq.com/blog/aws-waf-datadog/
  tag: Blog
  text: Monitoree la actividad de AWS WAF con Datadog
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
  text: Bloquee ataques a aplicaciones con Application & API Protection
title: App and API Protection
---
{{% site-region region="us,us3,us5,eu,ap1,ap2,uk1" %}}

<div class="alert alert-info">
AI Guard está en versión preliminar. Obtenga protecciones de seguridad en tiempo real para sus aplicaciones y agentes de IA. AI Guard ayuda a proteger sus aplicaciones y agentes de IA en tiempo real contra ataques de inyección de prompts, jailbreaking, uso indebido de herramientas y exfiltración de datos confidenciales. Complete este <a href="https://www.datadoghq.com/product-preview/ai-security/">formulario</a> para solicitar acceso.
</div>

{{% /site-region %}}

{{< img src="/security/application_security/app-sec-landing-page.png" alt="Un panel de señales de seguridad en Datadog, que muestra flujos de ataque y flame graphs" width="75%">}}

**App & API Protection (AAP)** proporciona visibilidad y seguridad unificadas para sus aplicaciones y API, ayudándole a detectar, investigar y prevenir amenazas en cargas de trabajo modernas.

Ya sea que esté defendiendo API públicas, servicios internos o aplicaciones orientadas al usuario, AAP equipa a sus equipos con detección de amenazas OOTB en tiempo real, evaluación de postura y protecciones dentro de la aplicación.

<div class="alert alert-info">Anteriormente conocida como Application Security Monitoring (ASM), AAP ahora va más allá de la detección de amenazas en tiempo de ejecución para incluir capacidades de descubrimiento de API, gestión de postura y protección.</div>

## Capacidades clave {#key-capabilities}

### Descubrimiento de API y gestión de postura {#api-discovery-and-posture-management}

* Detecte automáticamente todas las API expuestas por sus servicios.  
* Identifique puntos de conexión desprotegidos, indocumentados o excesivamente permisivos.  
* Obtenga hallazgos detallados y contextuales vinculados a puntos de conexión específicos, configuraciones incorrectas y comportamiento observado.  
* Evalúe las configuraciones de API frente a reglas de postura basadas en las mejores prácticas de seguridad y marcos de cumplimiento (por ejemplo, OWASP API Top 10).
* Verifique activamente la accesibilidad y autenticación de los puntos de conexión con [Endpoint Scanning][17].

### Detección y protección de amenazas en tiempo de ejecución {#runtime-threat-detection-and-protection}

* Detecte amenazas en tiempo real como ataques de inyección, intentos de apropiación de cuentas y abuso de aplicaciones.  
* Correlacione patrones de ataque de múltiples señales en información procesable.  
* Bloquee el tráfico malicioso con reglas de In-App WAF utilizando atributos como IP, user agent, encabezados y más.

## Casos de uso {#use-cases}

* Proteja los datos de los clientes en las API de producción  
* Detecte y bloquee el relleno de credenciales y ataques de ATO  
* Mantenga el cumplimiento de la postura de API en todos los equipos y entornos  
* Investigue incidentes con datos correlacionados de trazas, registros y seguridad

## Implementación de AAP en Datadog {#aap-implementation-in-datadog}

Si tiene curiosidad sobre cómo está estructurada App and API Protection y cómo utiliza los datos de trazas para identificar problemas de seguridad, lea [Cómo funciona App and API Protection][3].

## Configure su entorno {#configure-your-environment}

Con el respaldo de las [reglas preconfiguradas][4] proporcionadas, AAP detecta amenazas sin necesidad de configuración manual. Si ya tiene configurado Datadog [APM][1] en un host físico o virtual, la [configuración][16] solo requiere establecer una variable de entorno para comenzar.

Para comenzar a configurar su entorno para detectar y proteger amenazas con AAP, siga la documentación de habilitación para cada producto. Una vez que AAP esté configurado, puede comenzar a investigar y remediar señales de seguridad en el [Explorador de señales de seguridad][6].

## Investigue y remedie señales de seguridad {#investigate-and-remediate-security-signals}

En el [Explorador de señales de seguridad][6], haga clic en cualquier señal de seguridad para ver qué sucedió y los pasos sugeridos para mitigar el ataque. En el mismo panel, vea las trazas con su flujo de ataque correlacionado e información de solicitud para obtener más contexto.

## Prevención de exploits frente a In-App WAF {#exploit-prevention-vs-in-app-waf}

Esta sección proporciona un resumen de la Prevención de exploits y cómo difiere de las reglas de In-App WAF.

Datadog AAP incluye las funciones de [Exploit Prevention][14] y [In-App WAF][15] para proteger sus aplicaciones contra exploits. La Prevención de exploits es una extensión de In-App WAF. La Prevención de exploits aprovecha In-App WAF como primera línea de defensa y luego bloquea los ataques que éste no detectó.

La Prevención de exploits aprovecha la tecnología de Autoprotección de aplicaciones en tiempo de ejecución (RASP) para determinar si una solicitud de aplicación interactúa con una ruta de código vulnerable y, luego, la protege contra tipos de vulnerabilidad específicos:

- Inyección SQL (SQLi)
- Falsificación de solicitud del lado del servidor (SSRF)
- Inclusión de archivos locales (LFI)
- Inyección de comandos

Para conocer la compatibilidad de la biblioteca, consulte [Exploit Prevention][13].

Además de detectar patrones maliciosos en la solicitud, la Prevención de exploits se diferencia de In-App WAF al realizar un seguimiento de las acciones ejecutadas por la aplicación (consulta SQL ejecutada, archivos accedidos, etcétera). La Prevención de exploits puede determinar si la entrada del usuario modificó la consulta SQL o restringió un archivo de manera perjudicial, y bloquearlo. 

Por ejemplo, en un ataque de inyección SQL, el objetivo del atacante es tomar el control de la consulta SQL y cambiar su significado. La Prevención de exploits analiza la consulta SQL antes de su ejecución y verifica si existe algún parámetro de usuario en la consulta. Si existe uno, la Prevención de exploits verifica si el analizador SQL interpretó el parámetro como múltiples tokens SQL (cambiando el significado de la consulta SQL). En ese caso, la Prevención de exploits marca la consulta como inyectada.

## Deshabilitar AAP {#disable-aap}

Para obtener información sobre cómo deshabilitar AAP o sus funciones, consulte lo siguiente:

- [Deshabilitar AAP][10]

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