---
algolia:
  tags:
  - Software Composition Analysis
  - Datos recopilados
  - SCA
  - AVM
  - GuardDog
aliases:
- /es/security/application_security/risk_management/
- /es/security/application_security/vulnerability_management/
further_reading:
- link: /getting_started/application_security/software_composition_analysis
  tag: Guía
  text: Empezando con Software Composition Analysis
- link: /security/application_security/code_security
  tag: documentation
  text: Habilitación de la detección de vulnerabilidades de la seguridad del código
    en los servicios
- link: /code_analysis/software_composition_analysis/
  tag: documentation
  text: Configuración de Software Composition Analysis en pipelines CI
- link: https://www.datadoghq.com/blog/datadog-software-composition-analysis/
  tag: Blog
  text: Mitigar las vulnerabilidades de las bibliotecas de terceros con Datadog Software
    Composition Analysis
- link: https://www.datadoghq.com/blog/iast-datadog-application-vulnerability-management/
  tag: Blog
  text: Mejora de la seguridad de las aplicaciones en producción con la gestión de
    vulnerabilidades de las aplicaciones
- link: https://securitylabs.datadoghq.com/articles/guarddog-identify-malicious-pypi-packages/
  tag: Blog
  text: 'Encontrar paquetes de PyPI maliciosos a través del análisis estático del
    código: conoce a GuardDog'
- link: https://www.datadoghq.com/blog/sca-prioritize-vulnerabilities/
  tag: Blog
  text: Priorización de la corrección de vulnerabilidades con el análisis de composición
    de software (SCA) de Datadog
- link: https://www.datadoghq.com/blog/smart-vulnerability-remediation/
  tag: Blog
  text: Datadog ofrece una corrección de vulnerabilidades más inteligente
title: Software Composition Analysis
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Application Security Management no es compatible con el <a href="/getting_started/site">sitioDatadog </a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Información general

Datadog Software Composition Analysis (SCA) te ayuda a aprovechar el código abierto con confianza. Las capacidades de SCA incluyen la detección de vulnerabilidades, el riesgo empresarial (inventario de bibliotecas e información sobre licencias) y la evaluación de la calidad de bibliotecas de código abierto en tus servicios.

Lo que hace que Datadog SCA sea único es su cobertura integral del ciclo de vida del desarrollo de software: desde el código que envían los desarrolladores hasta las aplicaciones de producción que ya se están ejecutando en Datadog.

Datadog SCA utiliza una base de datos propia. La base de datos procede de Open Source Vulnerabilities (OSV), National Vulnerability Database (NVD), asesores de GitHub y otros asesores del ecosistema de lenguajes. Además, el equipo de investigación de Datadog Security evalúa los hallazgos de vulnerabilidades y malware. Para obtener más información, consulta el proyecto [GuardDog][13] de GitHub.


Comprueba la compatibilidad de ASM con cada producto de ASM para ver si tu servicio es compatible.


## Inventario de bibliotecas

El inventario de bibliotecas Datadog SCA te ayuda a entender la lista de bibliotecas y sus versiones, que componen tu aplicación. Para acceder al Explorador de bibliotecas, ve a [**Seguridad** > **Seguridad de la aplicación** > **Catálogo** > **Bibliotecas**][8].

Datadog SCA abarca el ciclo de vida de desarrollo de tu software desde el código hasta la producción, detecta bibliotecas a lo largo del ciclo de vida de una aplicación y te alerta de vulnerabilidades, riesgos, licencias y mucho más.

{{< img src="/security/application_security/software_composition_analysis/asm_library_explorer.png" alt="Página del Explorador de bibliotecas de Software Composition Analysis (SCA) que muestra vulnerabilidades de biblioteca agrupadas por biblioteca." style="width:100%;" >}}

## Explorar y gestionar vulnerabilidades de SCA

<div class="alert alert-info">Datadog Software Composition Analysis puede encontrar bibliotecas vulnerables a lo largo del ciclo de vida de desarrollo de software (SDLC). Application Security resume los resultados encontrados en las ramas predeterminadas de tus repositorios y en tus servicios en ejecución. Para ver las vulnerabilidades encontradas en diferentes ramas y commits, consulta <a href="/code_analysis/software_composition_analysis" target="_blank">Análisis del código</a> para ver más detalles.</div>

El [Explorador de vulnerabilidades][3] muestra una completa lista de bibliotecas de código abierto detectadas por Datadog SCA e informa de las vulnerabilidades de seguridad asociadas a ellas.

Datadog SCA utiliza dos técnicas para analizar tus servicios:

- Análisis estático del código en los repositorios (punto de vista estático)
- Análisis del tiempo de ejecución en los servicios desplegados (punto de vista del tiempo de ejecución)

La combinación de ambas técnicas monitoriza las bibliotecas el código abierto de extremo a extremo, desde la confirmación del repositorio de código (punto de vista estático) hasta las aplicaciones que se ejecutan en producción (punto de vista del tiempo de ejecución).

Para cambiar al punto de vista del commit de repositorios de código, selecciona **Estática**. La vista estática muestra las vulnerabilidades del _código fuente_ de tus repositorios.

Para cambiar al punto de vista en _tiempo real_ de las aplicaciones que ya se están ejecutando, selecciona **Runtime** (Tiempo de ejecución). La vista del tiempo de ejecución es la vista en directo de los servicios monitorizados por Datadog.

{{< img src="/security/application_security/software_composition_analysis/asm_sca_vulnerabilities.png" alt="Página del Explorador de Software Composition Analysis (SCA) que muestra vulnerabilidades ordenadas por punto de vista estático o del tiempo de ejecución." style="width:100%;" >}}

Selecciona una vulnerabilidad específica para ver sus detalles, incluidos los servicios afectados, el desglose de la puntuación de la gravedad y los pasos de corrección recomendados.

En el explorador de detalles de una vulnerabilidad, puedes ver la infraestructura afectada. Esta vista te ofrece una mejor perspectiva de tu exposición global a los ataques.

## Puntuación de la gravedad de Datadog

Cada vulnerabilidad tiene una puntuación de la gravedad base definida. Para ayudar a priorizar las medidas correctivas, Datadog transforma la puntuación CVSS básica en la puntuación de la gravedad de Datadog teniendo en cuenta las pruebas de solicitudes o ataques sospechosos, la sensibilidad empresarial o la exposición a Internet del entorno, y el riesgo de exploits exitosos.

A una puntuación base se le pueden aplicar cuatro modificadores de la puntuación. Dos de ellos son proporcionados por el contexto de ejecución:
 - La vulnerabilidad está en producción
 - El servicio afectado por la vulnerabilidad está siendo atacado

Dos de ellos proceden del contexto de CVE:
 - Si hay un exploit disponible
 - La probabilidad de explotación

Datadog muestra cómo se ajusta la puntuación CVSS base a la puntuación de la gravedad de Datadog en función de los factores anteriores.

{{< img src="security/application_security/vulnerability-score-modified_3.png" alt="Página de detalles de la vulnerabilidad que muestra una puntuación de gravedad modificada" style="width:100%;" >}}

Consulta [Empezando con Software Composition Analysis][7] para obtener más información sobre la puntuación de vulnerabilidad ajustada.

## Corrección

El explorador de vulnerabilidades ofrece recomendaciones de corrección para las vulnerabilidades detectadas. Las recomendaciones te permiten cambiar el estado de una vulnerabilidad, asignarla a un miembro del equipo para su revisión y crear una incidencia de Jira para su seguimiento. También incluyen una colección de enlaces y referencias a sitios web o fuentes de información como ayuda para comprender el contexto que hay detrás de cada vulnerabilidad.

**Nota**: Para crear incidencias de Jira para las vulnerabilidades del SCA, debes configurar la integración de Jira y contar con el permiso `manage_integrations`. Para obtener instrucciones detalladas, consulta la documentación sobre la [integración de Jira][11] y sobre el [control de acceso basado en roles][10].

{{< img src="getting_started/appsec/appsec-vuln-remediation_3.png" alt="Página de detalles de vulnerabilidades de la gestión de vulnerabilidades de aplicaciones que muestra los servicios afectados, enlaces a la infraestructura, correcciones sugeridas y enlaces a más información." style="width:100%;" >}}

## Configurar Software Composition Analysis

Software Composition Analysis (SCA) contiene capacidades adicionales que te permiten escanear en busca de vulnerabilidades en tus pipelines CI utilizando [Análisis del código][9]. Con SCA para el análisis del código, puedes identificar las bibliotecas de código abierto vulnerables que se han importado a la base de código.

Para configurar vulnerabilidades en tus pipelines de CI, ve a [Security -> Application Security -> Settings (Seguridad -> Seguridad de aplicaciones -> Configuración)][12].

En **Software Composition Analysis (SCA)**, haz clic en **Get Started** (Empezar) para activar el análisis de composición de software, y selecciona tus repositorios y servicios.

Consulta [Empezando con Software Composition Analysis][7] para obtener instrucciones más detalladas.

## Información sobre riesgos en las vistas de APM

Software Composition Analysis enriquece la información que APM ya está recopilando y marca las bibliotecas que coinciden con los avisos de vulnerabilidad actuales. Los servicios potencialmente vulnerables se destacan directamente en la vista **Security** (Seguridad) integrada en el [Catálogo de servicios de APM][2].

{{< img src="security/application_security/threats/threats-on-svc-cat_3.png" alt="Información de la vulnerabilidad que se muestra en el Catálogo de servicios de APM" style="width:100%;" >}}

## Desactivar Software Composition Analysis

Para obtener información sobre cómo desactivar Software Composition Analysis, consulta [Desactivación de Software Composition Analysis][14].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help/
[2]: https://app.datadoghq.com/services?lens=Security
[3]: https://app.datadoghq.com/security/appsec/vm
[4]: https://app.datadoghq.com/security/appsec
[5]: https://app.datadoghq.com/security/appsec/landing
[7]: /es/getting_started/application_security/software_composition_analysis
[8]: https://app.datadoghq.com/security/appsec/inventory/libraries
[9]: /es/code_analysis/software_composition_analysis/setup/?tab=githubactions
[10]: /es/account_management/rbac/permissions/#integrations
[11]: /es/integrations/jira/
[12]: https://app.datadoghq.com/security/configuration/asm/setup
[13]: https://github.com/DataDog/guarddog
[14]: /es/security/application_security/troubleshooting/#disabling-software-composition-analysis