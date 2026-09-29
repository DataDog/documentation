---
aliases:
- /es/getting_started/code_analysis/
description: Proteja las aplicaciones con herramientas de SAST, SCA e IAST para detectar
  vulnerabilidades en código propio y bibliotecas de código abierto.
further_reading:
- link: https://learn.datadoghq.com/courses/code-security-SAST
  tag: Centro de aprendizaje
  text: Escriba código seguro con Datadog Code Security
title: Introducción a Code Security
---
## Descripción general {#overview}

Datadog Code Security le ayuda a proteger y mantener el código propio y las bibliotecas de código abierto de sus aplicaciones desde el desarrollo hasta la producción.

Ofrece un conjunto de herramientas para ayudarle a proteger su código a lo largo del ciclo de vida de desarrollo de software:

- **Análisis estático de código (SAST)** utiliza un método de Static Application Security Testing para escanear sus repositorios en busca de problemas de seguridad y calidad en el código propio, proporcionando sugerencias de corrección para evitar que estos problemas lleguen a producción.
- **Software Composition Analysis (SCA)** detecta bibliotecas de código abierto vulnerables presentes en sus repositorios y que afectan a sus servicios en tiempo de ejecución, ayudándole a proteger y mantener su cadena de suministro de software.
- **Análisis de código en tiempo de ejecución (IAST)** utiliza un método de prueba de seguridad de aplicaciones interactivas para detectar vulnerabilidades que afectan a sus servicios en tiempo de ejecución.

## Configure Code Security {#set-up-code-security}

### Bibliotecas de código abierto {#open-source-libraries}

Datadog Software Composition Analysis detecta vulnerabilidades en bibliotecas y cataloga las dependencias dentro de su base de código y los servicios en ejecución.

Consulte [Software Composition Analysis][1] para configurar la detección de vulnerabilidades de bibliotecas estáticas y/o en tiempo de ejecución.

### Código propio {#first-party-code}

{{< whatsnext desc="Existen dos formas de proteger y mantener su código propio con Datadog:">}}
    {{< nextlink href="security/code_security/static_analysis/setup/" >}}Configuración de Análisis estático de código (SAST){{< /nextlink >}}
    {{< nextlink href="security/code_security/iast/setup/" >}}Configuración de Análisis de código en tiempo de ejecución (IAST){{< /nextlink >}}
{{< /whatsnext >}}

## Integraciones de herramientas para desarrolladores {#developer-tool-integrations}

### Habilite comentarios de solicitudes de extracción {#enable-pull-request-comments}

Datadog puede actuar como un revisor de código automático para marcar vulnerabilidades y violaciones de calidad en las solicitudes de extracción de GitHub. Para obtener más información, consulte [GitHub Pull Requests][2].

{{< img src="/security/application_security/code_security/github_suggestion.png" alt="Revisión de código de Datadog en Github" style="width:100%;" >}}

### Instale integraciones de IDE {#install-ide-integrations}

Instale los [complementos de IDE de Datadog][5] para identificar problemas de Code Security directamente en su editor de código. Dependiendo de su IDE, los complementos admiten las siguientes capacidades:

- Análisis estático de código (SAST)
- Software Composition Analysis (SCA)
- Análisis de código en tiempo de ejecución (IAST)
- Secret Scanning
- Escaneo de Infraestructura como Código (IaC)

{{< whatsnext desc="Para obtener instrucciones de configuración y detalles sobre las capacidades admitidas, consulte la documentación de su editor de código preferido:">}}
    {{< nextlink href="ide_plugins/idea/code_security/" >}}<u>IDEs de JetBrains</u>: IntelliJ IDEA, GoLand, PyCharm, RubyMine, WebStorm y PhpStorm{{< /nextlink >}}
    {{< nextlink href="ide_plugins/vscode/code_security/" >}}<u>Visual Studio Code y Cursor</u>{{< /nextlink >}}
{{< /whatsnext >}}

### Personalice la configuración de su repositorio {#customize-your-repository-settings}
En [Code Security Settings][3], puede administrar qué repositorios tienen habilitados los comentarios de PR, así como [personalizar la configuración][11] de qué reglas de Análisis estático de código (SAST) se aplican en todos los repositorios o dentro de ellos. Para ver todas las reglas predeterminadas proporcionadas por Datadog, consulte [SAST Rules][4].

### Configure PR Gates {#set-up-pr-gates}

Datadog proporciona [PR Gates][6] como una capacidad de la plataforma para ayudarle a mantener y aplicar estándares de seguridad y calidad para los cambios introducidos en su base de código. Para obtener más información, consulte [PR Gate setup][7].

## Priorice las vulnerabilidades con contexto de tiempo de ejecución {#prioritize-vulnerabilities-with-runtime-context}

Code Security ofrece **vistas centradas en vulnerabilidades** de todas las vulnerabilidades de bibliotecas y código detectadas tanto a partir del escaneo estático de repositorios como de la detección de servicios en tiempo de ejecución.

### Explore vulnerabilidades {#explore-vulnerabilities}

Para las vulnerabilidades de bibliotecas, cada fila en la tabla representa una vulnerabilidad específica que afecta a una versión de biblioteca. Dependiendo de si tiene habilitada la detección estática o en tiempo de ejecución, la columna {{< ui >}}Detected In{{< /ui >}} muestra los repositorios y/o servicios específicos afectados por esta vulnerabilidad.

En el panel lateral para una vulnerabilidad de biblioteca individual en SCA, además de los detalles sobre la vulnerabilidad, Datadog muestra:

- Un {{< ui >}}Severity breakdown{{< /ui >}} de la instancia de mayor gravedad de esta vulnerabilidad observada en sus repositorios y sus servicios. Para cada ubicación detectada de la vulnerabilidad en sus repositorios y/o servicios, Datadog ajusta el puntaje de gravedad base de la vulnerabilidad según factores ambientales. Para obtener más información, consulte [Puntaje de gravedad de Datadog][8].
- Una {{< ui >}}Repositories{{< /ui >}} tabla de todas las instancias donde se detectó la vulnerabilidad en sus repositorios. Para cada instancia, Datadog muestra si la dependencia está clasificada como directa o transitiva, el estado de remediación de la vulnerabilidad, así como los pasos de remediación específicos.
- Una {{< ui >}}Impacted Services{{< /ui >}} tabla de todos los servicios en ejecución afectados por esta vulnerabilidad de biblioteca. Un servicio se ve afectado por una vulnerabilidad de biblioteca si la biblioteca se cargó en tiempo de ejecución y fue detectada por los SDK de aplicación de Datadog.

 Las gravedades se califican de la siguiente manera:
| Puntaje CVSS    | Clasificación cualitativa
| --------------| -------------------|
|   `0.0`         | Ninguno                |
|   `0.1 - 3.9`   | Baja                 |
|   `4.0 - 6.9`   | Media              |
|   `7.0 - 8.9`   | Alta                |
|   `9.0 - 10.0`  | Crítica            |

### Explorar resultados por repositorio {#explore-results-per-repository}

Code Security también ofrece **vistas centradas en el repositorio** de los resultados de escaneos estáticos, lo que permite un filtrado granular en todas las ramas y confirmaciones para los repositorios escaneados.

Haga clic en un repositorio en la página {{< ui >}}Repositories{{< /ui >}} para acceder a una vista más detallada donde puede personalizar la consulta de búsqueda por rama (con la rama predeterminada apareciendo primero) y por confirmación (comenzando con la más reciente).

{{< tabs >}}
{{% tab "Análisis estático de código (SAST)" %}}

Puede utilizar las siguientes facetas listas para usar para crear una consulta de búsqueda para identificar y resolver malas prácticas de codificación en la pestaña {{< ui >}}Code Quality{{< /ui >}} o riesgos de seguridad en la pestaña {{< ui >}}Code Vulnerabilities{{< /ui >}}.

| Nombre de la faceta                        | Descripción                                                             |
|-----------------------------------|-------------------------------------------------------------------------|
| Estado del resultado                     | Filtra los resultados según el estado de finalización del análisis.         |
| ID de la regla                           | Reglas específicas que activaron los hallazgos.                             |
| Nombre de la herramienta                         | Determina qué herramientas contribuyeron al análisis.                     |
| CWE (Enumeración de debilidades comunes) | Filtra los hallazgos por categorías de vulnerabilidad reconocidas.                |
| Tiene correcciones                         | Filtra los problemas para los cuales hay correcciones sugeridas disponibles.                 |
| Mensaje de resultado                    | Contiene descripciones o mensajes concisos asociados con los hallazgos. |
| Descripción de la regla                  | Contiene la justificación detrás de cada regla.                                |
| Archivo fuente                       | Contiene los archivos donde se detectaron los problemas.                          |
| Versión de la herramienta                      | Filtra los resultados por la versión de las herramientas utilizadas.                       |

Puede acceder a las correcciones sugeridas directamente desde los resultados para abordar vulnerabilidades de seguridad o mejorar las prácticas de calidad del código.

{{< img src="/getting_started/code_analysis/suggested_fix.png" alt="Una corrección de código sugerida en la pestaña Correcciones de un resultado de Análisis de código" style="width:100%" >}}

{{% /tab %}}
{{% tab "Software Composition Analysis" %}}

Puede utilizar las siguientes facetas listas para usar para crear una consulta de búsqueda para identificar y abordar riesgos de seguridad en bibliotecas de terceros en la pestaña {{< ui >}}Library Vulnerabilities{{< /ui >}} o revisar su inventario de bibliotecas en la pestaña {{< ui >}}Library Catalog{{< /ui >}}.

| Nombre de la faceta         | Descripción                                                    |
|--------------------|----------------------------------------------------------------|
| Nombre de la dependencia    | Identifica las bibliotecas por nombre.                              |
| Versión de la dependencia | Filtra por versiones específicas de bibliotecas.                     |
| Lenguaje           | Ordena las bibliotecas por el lenguaje de programación.                   |
| Puntuación              | Ordena la puntuación de riesgo o calidad de las dependencias.           |
| Gravedad           | Filtra las vulnerabilidades según su clasificación de gravedad.        |
| Plataforma           | Distingue las bibliotecas por la plataforma para la que están destinadas. |

Puede acceder a los informes de vulnerabilidad y localizar los archivos fuente donde se descubrió la vulnerabilidad en sus proyectos, junto con información sobre los propietarios del código del archivo.

{{< img src="/security/application_security/code_security/sci_vulnerabilities.png" alt="Un enlace al código fuente directamente en GitHub desde una vulnerabilidad de biblioteca detectada" style="width:100%" >}}

{{% /tab %}}
{{< /tabs >}}

## Notifique, remedie e informe {#notify-remediate-and-report}

Code Security le ayuda a configurar flujos de trabajo para realizar un seguimiento y gestionar la remediación de los hallazgos:

- Configure [reglas de notificación][9] para notificar a su(s) equipo(s) sobre nuevos hallazgos a través de Slack, Jira, correo electrónico y más
- Realice un seguimiento de las vulnerabilidades por servicio y equipo en la página {{< ui >}}Code Security Summary{{< /ui >}}.

## Vincule los hallazgos a los servicios y equipos de Datadog {#link-findings-to-datadog-services-and-teams}

{{% security-products/link-findings-to-datadog-services-and-teams %}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/code_security/software_composition_analysis/
[2]: /es/security/code_security/dev_tool_int/github_pull_requests/
[3]: https://app.datadoghq.com/security/configuration/code-security/setup
[4]: /es/security/code_security/static_analysis/static_analysis_rules/
[5]: /es/security/code_security/dev_tool_int/ide_plugins/
[6]: /es/pr_gates/
[7]: /es/pr_gates/setup
[8]: /es/security/code_security/software_composition_analysis/#datadog-severity-score
[9]: https://app.datadoghq.com/security/configuration/notification-rules
[10]: /es/account_management/teams/
[11]: /es/security/code_security/static_analysis/setup/#customize-your-configuration