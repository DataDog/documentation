---
aliases:
- /es/security/application_security/software_composition_analysis/setup/
- /es/security/application_security/software_composition_analysis/
- /es/code_analysis/software_composition_analysis/
- /es/security/application_security/vulnerability_management/
disable_toc: false
title: Software Composition Analysis
---
## Información general
Software Composition Analysis (SCA) detecta bibliotecas de código abierto, tanto en tus repositorios como en tus servicios en ejecución, y te proporciona una visibilidad de extremo a extremo de las vulnerabilidades de librería y la gestión de licencias desde el desarrollo hasta la producción.

El uso de Software Composition Analysis proporciona a las organizaciones los siguientes beneficios:
- Identificación de vulnerabilidades emergentes y conocidas que afectan a bibliotecas de código abierto
- Priorización basada en el riesgo y corrección basada en la detección de vulnerabilidades en tiempo de ejecución
- Identificación de paquetes maliciosos, fin de vida útil de librerías y riesgos en bibliotecas basada en las normas OpenSSF

Datadog SCA utiliza una base de datos propia. La base de datos procede de Open Source Vulnerabilities (OSV), National Vulnerability Database (NVD), asesores de GitHub y otros asesores del ecosistema de lenguajes, así como de los hallazgos del propio equipo de investigación de seguridad de Datadog.

## Configurar Software Composition Analysis
Se admiten los siguientes lenguajes:
- Python
- JavaScript
- Java
- C#
- Go
- Ruby
- PHP

También es posible [cargar un SBOM de terceros a Datadog][13].

SCA admite la detección de dependencias tanto estática como en tiempo de ejecución:
- Para la detección estática, puedes analizar a través de tus pipelines CI/CD o directamente a través de Datadog con análisis alojado (sólo GitHub). Ve a la [página de configuración de Code Security][4] o consulta la [configuración estática][1] para empezar.
- Para la detección en tiempo de ejecución, puedes habilitar fácilmente SCA en tus servicios instrumentados con Datadog APM. Consulta la [configuración del tiempo de ejecución][2] para empezar.

## Buscar y filtrar resultados
### Explorador de vulnerabilidades
El explorador de [vulnerabilidades][11] proporciona una vista centrada en las vulnerabilidades de librería detectadas por SCA, junto con las vulnerabilidades detectadas por otras funcionalidades de seguridad del código (SAST e IAST). Todas las vulnerabilidades mostradas en este explorador se detectan en la rama por defecto de un repositorio analizado o que afecta a un servicio en ejecución.

### Puntuación de la gravedad de Datadog
Cada vulnerabilidad tiene una puntuación de la gravedad base definida. Para ayudar a priorizar las medidas correctivas, Datadog transforma la puntuación CVSS básica en la puntuación de la gravedad de Datadog teniendo en cuenta las pruebas de solicitudes o ataques sospechosos, la sensibilidad empresarial o la exposición a Internet del entorno, y el riesgo de exploits exitosos.

A una puntuación base se le pueden aplicar cuatro modificadores de la puntuación. Dos de ellos son proporcionados por el contexto de ejecución:
 - La vulnerabilidad está en producción
 - El servicio afectado por la vulnerabilidad está siendo atacado

Dos de ellos proceden del contexto de CVE:
 - Si hay un exploit disponible
 - La probabilidad de explotación

Datadog muestra cómo se ajusta la puntuación CVSS base a la puntuación de la gravedad de Datadog en función de los factores anteriores.

### Explorador de repositorios
El explorador de [repositorios][12] proporciona una vista centrada en los repositorios de todos los resultados de análisis de Static Code Analysis (SAST) y Software Composition Analysis (SCA). Haz clic en un repositorio para analizar los resultados de **Vulnerabilidades de librería** y **Catálogo de librerías** de SCA, limitados a la rama y al commit elegidos.
* La pestaña **Vulnerabilidades de librería** contiene las versiones de librerías vulnerables encontradas por Datadog SCA
* La pestaña **Library Catalog** (Catálogo de librerías) contiene todas las bibliotecas (vulnerables o no) que ha encontrado Datadog SCA.

Los pasos recomendados para corregir las vulnerabilidades detectadas se pueden encontrar en el panel lateral de cada vulnerabilidad en SCA. Se proporcionan pasos para actualizar la librería a la versión más segura (no vulnerable), así como a la versión más cercana.

Para filtrar los resultados, usa las facetas que se encuentran a la izquierda de la lista o la barra de búsqueda en la parte superior. Los resultados se pueden filtrar por facetas de servicio o equipo. Para obtener más información sobre cómo se vinculan los resultados a los servicios y equipos de Datadog, consulta [Empezando con Code Security]][5].

Cada fila representa una combinación única de librería y versión. Cada combinación está asociada con la confirmación y la rama específicas que se seleccionan en los filtros en la parte superior de la página (de manera predeterminada, la última confirmación en la rama predeterminada del repositorio que seleccionaste).

Haz clic en una biblioteca con una vulnerabilidad para abrir un panel lateral que contiene información sobre los pasos de corrección

<!-- {{< img src="code_security/software_composition_analysis/sca-violation.png" alt="Panel lateral de una infracción de SCA" style="width:80%;">}} -->

### Inventario de librerías
El [inventario][8] de librerías te ayuda a entender la lista de librerías y sus versiones, que se utilizan en tu base de código y se ejecutan en servicios desplegados. Para cada versión de librería, puedes evaluar la frecuencia con la que se utiliza, el riesgo de su licencia y entender el estado cada biblioteca (por ejemplo, si ha llegado al fin de su vida útil, si no recibe mantenimiento, etc.).


### Contexto de vulnerabilidad de librerías en APM
SCA enriquece la información que ya recopila Application Performance Monitoring (APM), marcando las bibliotecas que coinciden con los avisos de vulnerabilidad actuales. Los servicios potencialmente vulnerables se destacan directamente en la vista **Seguridad** integrada en el [Catálogo de software APM][10].
- Si está llegando al final de su vida
- Si se trata de un paquete malicioso
- Estado de esta versión de librería basada en su desglose de la puntuación OpenSSF
- Cadena de suministro de software y gestión de la lista de materiales de software (SBOM)

<!-- ### Corrección

El Explorador de vulnerabilidades ofrece recomendaciones para la corrección de las vulnerabilidades detectadas. Estas recomendaciones te permiten cambiar el estado de una vulnerabilidad, asignarla a un equipo para su revisión y crear un incidente en Jira para su seguimiento. También incluyen un conjunto de enlaces y referencias de sitios web o fuentes de información para ayudarte a entender el contexto de cada vulnerabilidad. -->

<!-- **Nota**: Para crear incidentes de vulnerabilidades de SCA en Jira, debes configurar la integración Jira y tener el permiso `manage_integrations`. Para ver instrucciones detalladas, consulta la documentación de la [integración Jira][11] y del [Control del acceso basado en roles][9]. -->

[1]: /es/security/code_security/software_composition_analysis/setup_static/
[2]: /es/security/code_security/software_composition_analysis/setup_runtime/
[3]: https://app.datadoghq.com/security/appsec/vm
[4]: https://app.datadoghq.com/security/configuration/code-security/setup
[5]: /es/getting_started/code_security/
[8]: https://app.datadoghq.com/security/appsec/inventory/libraries
[9]: /es/account_management/rbac/permissions/#integrations
[10]: https://app.datadoghq.com/services?lens=Security
[11]: https://app.datadoghq.com/security/appsec/vm/library
[12]: https://app.datadoghq.com/ci/code-analysis
[13]: /security/code_security/software_composition_analysis/setup_static/#upload-third-party-sbom-to-datadog

