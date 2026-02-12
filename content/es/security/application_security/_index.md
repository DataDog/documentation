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
description: Monitoriza amenazas dirigidas al sistema de producción basándote en el
  contexto de ejecución proporcionado por las trazas (traces) distribuidas.
further_reading:
- link: /security/application_security/how-it-works/
  tag: Documentación
  text: Cómo funciona App and API Protection
- link: https://www.datadoghq.com/product/security-platform/application-security-monitoring/
  tag: Página del producto
  text: Datadog App and API Protection
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: Blog
  text: Obtener visibilidad sobre riesgos, vulnerabilidades y ataques con la vista
    de seguridad de APM
- link: https://www.datadoghq.com/blog/aws-waf-datadog/
  tag: Blog
  text: Monitorización de actividades WAF de AWS con Datadog
- link: https://www.datadoghq.com/blog/security-inbox-prioritization/
  tag: Blog
  text: Cómo priorizar los riesgos de seguridad del Buzón de seguridad de Datadog
- link: https://www.datadoghq.com/blog/understanding-your-waf/
  tag: Blog
  text: 'Comprender tu WAF: cómo solucionar las lagunas más comunes en la seguridad
    de las aplicaciones web'
- link: https://www.datadoghq.com/blog/mitigate-account-takeovers/
  tag: Blog
  text: Mitigar las tomas de control de cuentas con Datadog App and API Protection
title: App and API Protection
---

{{< img src="/security/application_security/app-sec-landing-page.png" alt="Panel de señales de seguridad en Datadog, que muestra flujos de ataque y gráficas de llamas" width="75%">}}

**App & API Protection (AAP)** proporciona visibilidad y seguridad unificadas para tus aplicaciones y APIs, ayudándote a detectar, investigar y prevenir amenazas en las cargas de trabajo modernas.

Tanto si defiendes APIs públicas como servicios internos o aplicaciones orientadas al usuario, AAP equipa tus Teams con detección de amenazas predeterminada en tiempo real, evaluación de la postura y protecciones dentro de la aplicación.

<div class="alert alert-info">Anteriormente conocida como Application Security Monitoring (ASM), AAP ahora va más allá de la detección de amenazas en tiempo de ejecución para incluir funciones de detección de API, gestión de la postura y protección.</div>


## Capacidades clave

### Detección de API y gestión de la postura

* Detecta automáticamente todas las APIs expuestas por tus servicios.  
* Identifica los endpoints desprotegidos, no registrados o excesivamente permisivos.  
* Obtén resultados detallados y contextuales vinculados a endpoints específicos, configuraciones erróneas y comportamientos observados.  
* Evalúa las configuraciones de API en función de las reglas de postura basadas en las mejores prácticas de seguridad y los marcos de cumplimiento (por ejemplo, OWASP API Top 10).

### Detección y protección de amenazas en tiempo de ejecución

* Detecta amenazas en tiempo real, como ataques de inyección, intentos de toma de control de cuentas y abuso de aplicaciones.  
* Correlaciona los patrones de ataque multiseñal y conviértelos en información práctica.  
* Bloquea el tráfico malicioso con reglas WAF integradas en la aplicación utilizando atributos como IP, agente de usuario, encabezados, etc.

## Casos prácticos

* Protege los datos de los clientes en las APIs de producción.
* Detecta y bloquea los ataques de relleno de credenciales y ATO.  
* Mantén el cumplimiento de la postura de la API en equipos y en los entornos.
* Investiga incidentes con datos correlacionados de trazas, log y seguridad.

## Aplicación de AAP en Datadog

Si tienes curiosidad por saber cómo se estructura App and API Protection y cómo utiliza los datos de rastreo para identificar problemas de seguridad, consulta [Cómo funciona App and API Protection][3].

## Configuración de tu entorno

Gracias a las [reglas predefinidas][4], AAP detecta amenazas sin necesidad de configuración manual. Si ya tienes Datadog [APM][1] configurado en un host físico o virtual, la instalación solo requiere establecer una variable de entorno para empezar.

Para empezar a configurar tu entorno para detectar y proteger amenazas con AAP, sigue la documentación de habilitación de cada producto. Una vez configurado el AAP, puedes empezar a investigar y corregir las señales de seguridad en [Security Signals Explorer][6].

## Investigar y corregir señales de seguridad

En el [Security Signals Explorer][6], haz clic en cualquier señal de seguridad para ver qué ha sucedido y qué pasos se sugieren para mitigar el ataque. En el mismo panel, consulta trazas con sus flujos de ataque correlacionados y solicita información para disponer de un mayor contexto.

## Exploit Prevention frente a WAF en la aplicación

En esta sección, se ofrece un resumen de Exploit Prevention y en qué se diferencia de las reglas de Web Application Firewall (WAF) en la aplicación.

Datadog AAP incluye las funciones [Exploit Prevention][14] y [WAF en la aplicación][15] para proteger tus aplicaciones contra vulnerabilidades. Exploit Prevention es una extensión de WAF en la aplicación. Exploit Prevention aprovecha WAF en la aplicación como primera línea de defensa y bloquea los ataques que el WAF no detecta.

Exploit Prevention aprovecha la tecnología de Runtime Application Self-Protection (RASP) para determinar si una solicitud de aplicación interactúa con una ruta de código vulnerable y, a continuación, la protege de tipos de vulnerabilidad específicos:

- Inyección SQL (SQLi)
- Falsificación de solicitudes del lado del servidor (SSRF)
- Inclusión de archivos locales (LFI)
- Inserción de comandos

Para conocer la compatibilidad de las bibliotecas, consulta [Exploit Prevention][13].

Además de detectar patrones maliciosos en la solicitud, Exploit Prevention se diferencia de WAF en la aplicación por el seguimiento de las acciones realizadas por la aplicación (consulta SQL ejecutada, archivos a los que se accede, etc.). Exploit Prevention es capaz de determinar si la entrada del usuario modificó la consulta SQL o restringió un archivo de forma perjudicial y bloquearlo. 

Por ejemplo, en un ataque de inyección SQL, el objetivo del atacante es tomar el control de la consulta SQL y cambiar su significado. Exploit Prevention analiza la consulta SQL antes de su ejecución y comprueba si hay algún parámetro de usuario en la consulta. Si hay alguno presente, Exploit Prevention comprueba si el analizador SQL interpretó el parámetro como múltiples tokens SQL (cambiando el significado de la consulta SQL). En ese caso, Exploit Prevention marca la consulta como inyectada.

## Desactivar AAP

Para obtener información sobre cómo desactivar AAP o sus funciones, consulta lo siguiente:

- [Desactivar AAP][10]

## Siguientes pasos

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