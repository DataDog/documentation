---
algolia:
  tags:
  - Análisis de composición de software
  - Datos recopilados
  - SCA
  - AVM
  - GuardDog
aliases:
- /security/application_security/risk_management/
- /security/application_security/vulnerability_management/
further_reading:
- link: /getting_started/application_security/software_composition_analysis
  tag: Guía
  text: Empezando con el análisis de composición de software
- link: /security/application_security/code_security
  tag: documentation
  text: Habilitación de la detección de vulnerabilidades de la seguridad del código
    en los servicios
- link: /code_analysis/software_composition_analysis/
  tag: documentation
  text: Configuración del análisis de composición de software en los pipelines de
    CI
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
  text: 'Encontrar paquetes de PyPI maliciosos a través del análisis estático de código:
    conoce a GuardDog'
- link: https://www.datadoghq.com/blog/sca-prioritize-vulnerabilities/
  tag: Blog
  text: Priorización de la corrección de vulnerabilidades con el análisis de composición
    de software (SCA) de Datadog
title: Análisis de composición de software
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Application Security Management no es compatible con el <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Información general

El análisis de composición de software (SCA) de Datadog ayuda a aprovechar el código abierto con confianza. Las capacidades de SCA incluyen la detección de vulnerabilidades, el riesgo empresarial (inventario de bibliotecas e información de licencias) y la evaluación de la calidad de las bibliotecas de código abierto en los servicios. 

Lo que hace que el SCA de Datadog sea único es su cobertura de extremo a extremo del ciclo de vida del desarrollo de software: desde el código que los desarrolladores confirman hasta las aplicaciones de producción que ya se ejecutan en el despliegue de Datadog.

El SCA de Datadog utiliza una base de datos mantenida propia. La base de datos se obtiene de Open Source Vulnerabilities (OSV), National Vulnerability Database (NVD), avisos de GitHub y otros avisos del ecosistema de lenguajes. Además, el equipo de investigación de seguridad de Datadog evalúa las vulnerabilidades y los hallazgos de malware. Para obtener más información, consulta el proyecto de GitHub [GuardDog][13].


Consulta [Compatibilidad de ASM][6] para ver si tu servicio es compatible.



## Inventario de bibliotecas

El inventario de bibliotecas del SCA de Datadog ayuda a comprender la lista de bibliotecas y sus versiones que componen una aplicación. Para acceder al explorador de bibliotecas, ve a [**Security** (Seguridad) > **Application Security** (Seguridad de aplicaciones) > **Catalog** (Catálogo) > **Libraries** (Bibliotecas)][8].

Dado que el SCA Datadog cubre el ciclo de vida del desarrollo de software de extremo a extremo, las bibliotecas se detectan durante todo el ciclo de vida de la aplicación. El inventario de bibliotecas contiene todo lo que necesitas saber sobre ellas, incluido el nombre y la versión, y otros aspectos de riesgo, como licencias y aspectos de calidad. 

{{< img src="/security/application_security/software_composition_analysis/asm_library_explorer.png" alt="Página del explorador de la biblioteca del análisis de composición de software (SCA) que muestra las vulnerabilidades de la biblioteca agrupadas por biblioteca." style="width:100%;" >}}

## Exploración y gestión de vulnerabilidades del SCA

<div class="alert alert-info">El análisis de composición de software de Datadog puede encontrar bibliotecas vulnerables a lo largo del ciclo de vida de desarrollo de software (SDLC). La seguridad de las aplicaciones resume los resultados encontrados en las ramas predeterminadas de los repositorios y en los servicios en ejecución. Para ver las vulnerabilidades encontradas en diferentes ramas y confirmaciones, consulta <a href="/code_analysis/software_composition_analysis" target="_blank">Análisis del código</a> a fin de obtener más información.</div>

El [explorador de vulnerabilidades][3] muestra una completa lista de los bibliotecas de código abierto detectadas por el SCA de Datadog e informa de las vulnerabilidades de seguridad asociadas a ellas. 

El SCA de Datadog aprovecha dos técnicas para analizar los servicios:

- Análisis estático del código en los repositorios (punto de vista estático)
- Análisis del tiempo de ejecución en los servicios desplegados (punto de vista del tiempo de ejecución)

La combinación de ambas técnicas monitoriza las bibliotecas el código abierto de extremo a extremo, desde la confirmación del repositorio de código (punto de vista estático) hasta las aplicaciones que se ejecutan en producción (punto de vista del tiempo de ejecución).

Para cambiar al punto de vista de confirmación de repositorios de código, selecciona **Static** (Estático). La vista estática muestra las vulnerabilidades del _código fuente_ de los repositorios. 

Para cambiar al punto de vista en _tiempo real_ de las aplicaciones que ya se están ejecutando, selecciona **Runtime** (Tiempo de ejecución). La vista del tiempo de ejecución es la vista en directo de los servicios monitorizados por Datadog.

{{< img src="/security/application_security/software_composition_analysis/asm_sca_vulnerabilities.png" alt="Página del explorador del análisis de composición de software (SCA) que muestra vulnerabilidades ordenadas por punto de vista estático o del tiempo de ejecución." style="width:100%;" >}}

Selecciona una vulnerabilidad específica para ver sus detalles, incluidos los servicios afectados, la puntuación desglosada de la gravedad y los pasos de corrección recomendados.

En el explorador de detalles de una vulnerabilidad, puedes ver la infraestructura afectada. Esta vista te ofrece una mejor perspectiva de tu exposición global a los ataques.

Dentro de ASM, la puntuación base de la gravedad de una vulnerabilidad se modifica utilizando los ataques existentes y lo sensible que es para la empresa el entorno en el que se detecta la vulnerabilidad. Por ejemplo, si no se detecta ningún entorno en producción, se reduce la gravedad.

La puntuación de vulnerabilidad ajustada incluye el contexto completo de cada servicio:

- La gravedad original de la vulnerabilidad
- Pruebas de solicitudes sospechosas
- Entornos sensibles o expuestos a Internet

{{< img src="security/application_security/vulnerability-score-modified_3.png" alt="Página de detalles de la vulnerabilidad que muestra una puntuación de gravedad modificada" style="width:100%;" >}}

Consulta [Empezando con el análisis de composición de software][7] para obtener más información sobre la puntuación de vulnerabilidad ajustada.

## Corrección

El explorador de vulnerabilidades ofrece recomendaciones de corrección para las vulnerabilidades detectadas. Las recomendaciones te permiten cambiar el estado de una vulnerabilidad, asignarla a un miembro del equipo para su revisión y crear una incidencia de Jira para su seguimiento. También incluyen una colección de enlaces y referencias a sitios web o fuentes de información como ayuda para comprender el contexto que hay detrás de cada vulnerabilidad.

**Nota**: Para crear incidencias de Jira para las vulnerabilidades del SCA, debes configurar la integración de Jira y contar con el permiso `manage_integrations`. Para obtener instrucciones detalladas, consulta la documentación sobre la [integración de Jira][11] y sobre el [control de acceso basado en roles][10].

{{< img src="getting_started/appsec/appsec-vuln-remediation_3.png" alt="Página de detalles de vulnerabilidades de la gestión de vulnerabilidades de aplicaciones que muestra los servicios afectados, enlaces a la infraestructura, correcciones sugeridas y enlaces a más información." style="width:100%;" >}}

## Configuración del análisis de composición de software

El análisis de composición de software (SCA) contiene capacidades adicionales que te permiten escanear en busca de vulnerabilidades en tus pipelines de CI utilizando [análisis del código][9]. Con el SCA para el análisis del código, puedes identificar las bibliotecas de código abierto vulnerables que se han importado a la base de código.

Para configurar vulnerabilidades en tus pipelines de CI, ve a [Security (Seguridad) -> Application Security (Seguridad de aplicaciones) -> Settings (Configuración)][12].

En **Software Composition Analysis (SCA)** (Análisis de composición de software [SCA]), haz clic en **Get Started** (Empezar) para activar el análisis de composición de software, y selecciona tus repositorios y servicios.

Consulta [Empezando con el análisis de composición de software][7] para obtener instrucciones más detalladas.

## Información sobre riesgos en las vistas de APM

El análisis de composición de software enriquece la información que APM ya está recopilando y marca las bibliotecas que coinciden con los avisos de vulnerabilidad actuales. Los servicios potencialmente vulnerables se destacan directamente en la vista **Security** (Seguridad) integrada en el [Catálogo de servicios de APM][2].

{{< img src="security/application_security/threats/threats-on-svc-cat_3.png" alt="Información de la vulnerabilidad que se muestra en el Catálogo de servicios de APM" style="width:100%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help/
[2]: https://app.datadoghq.com/services?lens=Security
[3]: https://app.datadoghq.com/security/appsec/vm
[4]: https://app.datadoghq.com/security/appsec
[5]: https://app.datadoghq.com/security/appsec/landing
[6]: /es/security/application_security/enabling/compatibility
[7]: /es/getting_started/application_security/software_composition_analysis
[8]: https://app.datadoghq.com/security/appsec/inventory/libraries
[9]: /es/code_analysis/software_composition_analysis/setup/?tab=githubactions
[10]: /es/account_management/rbac/permissions/#integrations
[11]: /es/integrations/jira/
[12]: https://app.datadoghq.com/security/configuration/asm/setup
[13]: https://github.com/DataDog/guarddog