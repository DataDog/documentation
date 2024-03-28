---
aliases:
- /es/getting_started/application_security/vulnerability_management
further_reading:
- link: https://www.datadoghq.com/blog/datadog-software-composition-analysis/
  tag: Blog
  text: Mitigar las vulnerabilidades de las bibliotecas de terceros con Datadog Software
    Composition Analysis
- link: /code_analysis/software_composition_analysis/
  tag: Documentación
  text: Más información sobre Software Composition Analysis en código fuente
- link: /security/application_security/software_composition_analysis
  tag: Documentación
  text: Más información sobre Software Composition Analysis en bibliotecas de ASM
- link: /security/application_security/how-appsec-works
  tag: Documentación
  text: Cómo funciona Application Security Management
- link: /security/application_security/getting_started
  tag: Documentación
  text: Audit Trail (trazas de auditoría)
- link: https://securitylabs.datadoghq.com/
  tag: Laboratorios de seguridad
  text: Investigación sobre seguridad, informes, consejos y vídeos de Datadog
kind: documentation
title: Empezando con Software Composition Analysis
---


## Información general

Datadog [Software Composition Analysis][1] (SCA) monitorea de manera continua tu entorno de producción en busca de vulnerabilidades en las bibliotecas de código abierto de las que dependen tus aplicaciones. Puedes identificar y priorizar la corrección de las vulnerabilidades más importantes según el impacto empresarial.

Esta guía te mostrará las prácticas recomendadas para poner en marcha tu equipo con SCA.

## Fase 1: Habilitar
1. Verifica la [Compatibilidad con ASM][2] para ver si tu servicio es compatible.
2. Habilita Software Composition Analysis en tus servicios. 
   - Dirígete a [**Security (Seguridad) -> Configuration (Configuración) -> Application Security (Seguridad de la aplicación) -> Quick Start Guide (Guía de inicio rápido)**][4].
   - Expande **Enable Vulnerability Detection** (Habilitar la detección de vulnerabilidades).
   - Haz clic en **Start Activation** (Iniciar activación).
   - Elige los servicios para proteger con ASM.

   O

   - Dirígete a [**Security (Seguridad) -> Configuration (Configuración) -> Application Security (Seguridad de la aplicación) -> Setup (Ajuste)**][9].
   - Haz clic en **Get Started** (Empezar) a fin de habilitar Software Composition Analysis para el análisis estático en el código fuente.
   - Selecciona y configura tu proveedor de CI/CD.
   - Haz clic en **Get Started** (Empezar) a fin de habilitar Software Composition Analysis para el análisis del tiempo de ejecución en servicios en ejecución.
   - Elige los servicios para proteger con ASM.
   - Haz clic en **Get Started** (Empezar) a fin de habilitar Software Composition Analysis para la seguridad del código.
   - Selecciona tu lenguaje de programación y reinicia tus servicios.

   {{< img src="getting_started/appsec/asm_sca_setup.png" alt="Página de configuración de Software Composition Analysis." style="width:100%;" >}}

## Fase 2: Identificar
1. **Identificar vulnerabilidades**: dirígete a [**Security (Seguridad) -> Application Security (Seguridad de la aplicación) -> Vulnerabilities (Vulnerabilidades)**][5]. 
   - Ordena por `Status`, `Vulnerability Source` y `Severity`.
   - Para cambiar al punto de vista de confirmación del repositorio de código, haz clic en el botón **static** (estático). Para cambiar al punto de vista en tiempo real de las aplicaciones que ya se están ejecutando, haz clic en el botón **runtime** (tiempo de ejecución).

   {{< img src="/security/application_security/software_composition_analysis/asm_sca_vulnerabilities_2.png" alt="Página del explorador de Software Composition Analysis (SCA) que muestra las vulnerabilidades ordenadas por estático o tiempo de ejecución." style="width:100%;" >}}

   Cada vulnerabilidad tiene su propio estado para ayudar a priorizar y gestionar los hallazgos:

   | Estado         | Descripción                                                                                   |
   | -------------- | ----------------------------------------------------------------------------------------------| 
   |  Open (Abierta)          |  Datadog ha detectado la vulnerabilidad.                                              |
   |  In Progress (En curso)   |  Un usuario ha marcado la vulnerabilidad como En curso, pero Datadog la sigue detectando.            |
   |  Muted (Silenciada)         |  Un usuario ha ignorado la vulnerabilidad, por lo que ya no se puede ver en la lista de Abierta, pero Datadog aún la detecta. |
   |  Remediated (Corregida)    |  Un usuario ha marcado la vulnerabilidad como resuelta, pero Datadog todavía la puede ver.   |
   |  Auto-Closed (Cerrada automáticamente)   |  Datadog ya no detecta la vulnerabilidad.                                          |                              

   **Nota**: Las vulnerabilidades Remediated (Corregidas) y Auto-Closed (Cerradas automáticamente) se vuelven a abrir si Datadog detecta la vulnerabilidad de nuevo.

3. Para ver detalles adicionales, haz clic en la vulnerabilidad. Esto abre un panel que incluye información sobre:
    - Los servicios afectados.
    - Fecha en la que se detectó la vulnerabilidad por última vez.
    - Descripción de la vulnerabilidad.
    - Pasos de corrección recomendados.
    - Puntuación de vulnerabilidad. </br> </br>

      {{< img src="getting_started/appsec/appsec-vuln-explorer_3.png" alt="Vista detallada de Application Vulnerability Management de la vulnerabilidad." style="width:100%;" >}}

      **Nota**: La gravedad de una vulnerabilidad en SCA se modifica a partir de la puntuación base para tener en cuenta la presencia de ataques y la sensibilidad empresarial del entorno en el que se detecta la vulnerabilidad. Por ejemplo, si no se detecta ningún entorno en producción, se reduce la gravedad.</br> </br>

      La puntuación de vulnerabilidad ajustada incluye el contexto completo de cada servicio:
        - La gravedad original de la vulnerabilidad.
        - Pruebas de solicitudes sospechosas.
        - Entornos sensibles o expuestos a Internet.

      La gravedad se puntúa de la siguiente manera:
      | Puntuación CVSS    | Calificación cualitativa
      | --------------| -------------------|  
      |   `0.0`         | Ninguno                |
      |   `0.1 - 3.9`   | Bajo                 |
      |   `4.0 - 6.9`   | Medio              |
      |   `7.0 – 8.9`   | Alto                |
      |   `9.0 – 10.0`  | Crítico            |

4. De manera opcional, descarga la lista de materiales de software (SBOM) para tu servicio. Mientras visualizas los detalles de una vulnerabilidad, haz clic en [View in Service Catalog][6] (Ver en catálogo de servicios). Desde aquí puedes dirijirte a la [Vista de seguridad][7] de tu servicio y descargar la SBOM en la [pestaña bibliotecas][8]. 

## Fase 3: Corregir
1. **Priorizar la respuesta y corregir**: mientras estés en el [Explorador de vulnerabilidades][5], toma medidas:

    - Cambia el estado de una vulnerabilidad.
    - Asígnala a un miembro del equipo para que la revise.
    - Crea una incidencia de Jira. A fin de crear incidencias de Jira para vulnerabilidades de SCA, debes configurar la integración de Jira y tener el permiso `manage_integrations`. Para obtener instrucciones detalladas, consulta la documentación de la [Integración de Jira][11], así como la documentación del [Control de acceso basado en roles][10].
    - Repasa los pasos de corrección recomendados.
    - Consulta los enlaces y las fuentes de información para comprender el contexto detrás de cada vulnerabilidad.

   **Nota**: Añadir un asignado a la vulnerabilidad no genera un notificación sobre la asignación. Esta acción solo muestra su nombre como una anotación de la vulnerabilidad.

   {{< img src="getting_started/appsec/appsec-vuln-remediation_3.png" alt="Pasos recomendados por Application Vulnerability Management para corregir la vulnerabilidad." style="width:100%;" >}}


## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/vulnerability_management/
[2]: /es/security/application_security/enabling/compatibility/
[3]: /es/security/application_security/enabling/
[4]: https://app.datadoghq.com/security/configuration/asm/onboarding
[5]: https://app.datadoghq.com/security/appsec/vm
[6]: https://app.datadoghq.com/services
[7]: /es/tracing/service_catalog/#security-view
[8]: /es/tracing/service_catalog/#investigate-a-service
[9]: https://app.datadoghq.com/security/configuration/asm/setup
[10]: /es/account_management/rbac/permissions/#integrations
[11]: /es/integrations/jira/