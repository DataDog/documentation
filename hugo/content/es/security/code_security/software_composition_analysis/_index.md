---
aliases:
- /es/security/application_security/software_composition_analysis/setup/
- /es/security/application_security/software_composition_analysis/
- /es/code_analysis/software_composition_analysis/
- /es/security/application_security/vulnerability_management/
disable_toc: false
further_reading:
- link: /security/code_security/software_composition_analysis/setup_static/
  tag: Documentación
  text: Configure Software Composition Analysis (SCA) estático
- link: /security/code_security/software_composition_analysis/setup_runtime/
  tag: Documentación
  text: Configure Software Composition Analysis (SCA) en tiempo de ejecución
- link: /security/code_security/software_composition_analysis/library_inventory
  tag: Documentación
  text: Inventario de bibliotecas
- link: /security/code_security/software_composition_analysis/cve_explorer
  tag: Documentación
  text: CVE Explorer
- link: /pr_gates/
  tag: Documentación
  text: PR Gates
- link: https://www.datadoghq.com/blog/code-security-secret-scanning
  tag: Blog
  text: Detecte y bloquee credenciales expuestas con Datadog Secret Scanning
- link: https://www.datadoghq.com/blog/smart-vulnerability-remediation/
  tag: Blog
  text: Adopte un enfoque más inteligente para la corrección de vulnerabilidades con
    Datadog
- link: https://www.datadoghq.com/blog/remediate-faster-code-security
  tag: Blog
  text: Remedie vulnerabilidades transitivas más rápido con Datadog Software Composition
    Analysis
- link: https://www.datadoghq.com/blog/devsecops-2026-study-learnings
  tag: Blog
  text: Aprendizajes clave del estudio State of DevSecOps 2026
- link: https://www.datadoghq.com/blog/secure-your-github-ecosystem/
  tag: Blog
  text: 'Seguridad en CI/CD: Cómo proteger su ecosistema de GitHub'
title: Software Composition Analysis
---
## Descripción general {#overview}

Software Composition Analysis (SCA) detecta bibliotecas de código abierto tanto en sus repositorios como en sus servicios en ejecución, proporcionando visibilidad de extremo a extremo de las vulnerabilidades de las bibliotecas y la gestión de licencias desde el desarrollo hasta la producción.

El uso de Software Composition Analysis proporciona a las organizaciones los siguientes beneficios:
- Identificación de vulnerabilidades emergentes y conocidas que afectan a las bibliotecas de código abierto
- Priorización y corrección basadas en el riesgo mediante la detección de vulnerabilidades en tiempo de ejecución
- Identificación de paquetes maliciosos, bibliotecas al final de su vida útil y el nivel de riesgo que presentan las bibliotecas según los estándares OpenSSF
- Exporte una Software Bill of Materials (SBOM) de las bibliotecas detectadas en formato CycloneDX 1.6 o SPDX 2.3

## Cómo funciona {#how-it-works}

SCA admite dos modos de detección complementarios:
- **La detección estática** escanea repositorios mediante el análisis de archivos de dependencia (archivos de bloqueo y manifiestos). De forma predeterminada, los escaneos se ejecutan cuando una confirmación actualiza un manifiesto o archivo de bloqueo de dependencia compatible en un repositorio habilitado. También puede ejecutar SCA en su pipeline de CI/CD (los trabajos de CI son compatibles para eventos de `push`). Consulte [Configure Software Composition Analysis (SCA) estático][1] para comenzar.
- **La detección en tiempo de ejecución** identifica las bibliotecas que cargan y utilizan sus servicios durante la ejecución mediante la instrumentación de Datadog APM. Consulte [Configure Software Composition Analysis (SCA) en tiempo de ejecución][2] para comenzar.

Cuando Datadog ingiere un nuevo aviso, este se compara con su último inventario de bibliotecas conocido y aparece en el Explorador de vulnerabilidades, incluso si no ha vuelto a escanear el repositorio. El Explorador de repositorios tiene un alcance de confirmación y refleja lo que se sabía en el momento en que se ejecutó el escaneo; por lo tanto, un escaneo que se ejecutó antes de que Datadog ingiriera el aviso no mostrará ese aviso recién publicado en el Explorador de repositorios para esa confirmación. Consulte [Comprender las vistas de SCA](#understanding-sca-views) para obtener más detalles.

## Base de datos de vulnerabilidades {#vulnerability-database}

Datadog SCA recurre a múltiples fuentes públicas y privadas para construir una base de datos propietaria y curada. Estas fuentes incluyen la [National Vulnerability Database (NVD)][21], la [GitHub Advisory Database][22], [osv.dev][23], avisos específicos del ecosistema como la [PyPA's Advisory Database][24] y la [Global Security Database][25], [Datadog GuardDog][26], y Datadog Security Research.

Datadog utiliza estas fuentes para identificar vulnerabilidades conocidas, paquetes maliciosos y amenazas emergentes a la cadena de suministro en los ecosistemas compatibles. Hay un máximo de 1 hora entre el momento en que se publica una nueva vulnerabilidad y el momento en que aparece en Datadog, y las vulnerabilidades emergentes suelen aparecer en Datadog en cuestión de minutos. Los paquetes maliciosos se reportan en Datadog en un plazo de 6 horas.

## Fuentes de exploits públicos {#public-exploit-sources}

Datadog identifica si una vulnerabilidad tiene un exploit público conocido agregando datos de múltiples fuentes públicas, incluyendo CISA (Catálogo de vulnerabilidades explotadas conocidas), Exploit-DB, NIST (National Vulnerability Database) y GitHub (referencias de exploits públicos).

Cuando Datadog identifica un exploit público para una vulnerabilidad de cualquiera de estas fuentes, marca el hallazgo para ayudarle a priorizar la corrección.

## Capacidades clave {#key-capabilities}

### Revise y priorice las vulnerabilidades {#review-and-prioritize-vulnerabilities}

El [Explorador de vulnerabilidades][11] proporciona una visualización centrada en las vulnerabilidades de biblioteca detectadas por SCA, junto con las vulnerabilidades detectadas por otras capacidades de Code Security (SAST, IAST, escaneo de secretos e IaC). Todas las vulnerabilidades en el explorador se detectan en la rama predeterminada en la última confirmación de un repositorio escaneado, o están afectando a un servicio en ejecución.

#### Puntuación de severidad de Datadog {#datadog-severity-score}

Para ayudar a priorizar la corrección, Datadog modifica la puntuación CVSS base a la **Datadog Severity Score**, incorporando el contexto de tiempo de ejecución y señales de explotabilidad. Estos factores ayudan a distinguir el riesgo teórico de las vulnerabilidades que tienen más probabilidades de ser explotadas en entornos del mundo real. La siguiente tabla describe cómo influye cada factor en la puntuación final.

| Factor de riesgo                       | Cómo se evalúa                                                  | Impacto en la puntuación                                    |
|-----------------------------------|----------------------------------------------------------------------|--------------------------------------------------------|
| Puntuación CVSS base                   | Puntuación CVSS publicada para la vulnerabilidad.                          | Punto de partida para la puntuación de gravedad.                 |
| Accesibilidad                      | Si la función vulnerable está referenciada en el código fuente (detectada estáticamente a nivel de repositorio). | Aumenta cuando se descubre que la función vulnerable es accesible en el código. |
| Contexto de tiempo de ejecución en producción        | Si el servicio afectado se está ejecutando en un entorno de producción. | Disminuye si el servicio no se está ejecutando en producción. |
| Bajo ataque                      | Evidencia de actividad de ataque activa dirigida al servicio.            | Disminuye si no se observa actividad de ataque.     |
| Disponibilidad de exploits              | Disponibilidad de exploits públicos para la vulnerabilidad.               | Disminuye si no hay ningún exploit disponible.                  |
| Probabilidad de explotación (EPSS) | Probabilidad de explotación en el mundo real basada en datos de EPSS.            | Disminuye cuando la probabilidad de explotación es baja. |

#### Ver detalles de la vulnerabilidad {#view-vulnerability-details}

Haga clic en una vulnerabilidad en el explorador de vulnerabilidades para abrir su panel lateral.

##### Repositorios {#repositories}

La sección {{< ui >}}Repositories{{< /ui >}} enumera los archivos y repositorios donde Static SCA detectó la vulnerabilidad de la biblioteca. Para cada hallazgo, muestra los servicios y equipos asociados, el estado del hallazgo y las acciones de triage. Expanda una fila para visualizar su desglose de gravedad y, cuando esté disponible, las ubicaciones accesibles.

##### Servicios afectados {#impacted-services}

La sección {{< ui >}}Impacted services{{< /ui >}} enumera los servicios donde Runtime SCA detectó la vulnerabilidad de la biblioteca. Para cada servicio, muestra los entornos, los detalles de las dependencias, la accesibilidad, los equipos asociados, el estado del hallazgo y cuándo lo detectó Datadog por última vez.

##### Infraestructura afectada {#impacted-infrastructure}

Cuando Runtime SCA detecta servicios afectados, la sección {{< ui >}}Impacted Infrastructure{{< /ui >}} enumera los servidores donde se ejecuta la versión de la biblioteca afectada. También muestra los servicios asociados, los entornos y la hora de la última implementación.

Para investigar la infraestructura afectada:

1. Revise los servidores, servicios, entornos y la hora de la última implementación afectados.
1. Seleccione {{< ui >}}View Host{{< /ui >}} para investigar un servidor.
1. Seleccione {{< ui >}}View Vulnerabilities in Cloud Security{{< /ui >}} para revisar las vulnerabilidades abiertas del servidor.

### Visualizar hallazgos por repositorio {#view-findings-by-repository}

El [Explorador de repositorios][12] proporciona una vista centrada en el repositorio de todos los resultados de escaneo en Static Code Analysis (SAST), Software Composition Analysis (SCA), Secrets Scanning e Infrastructure as Code (IaC). Haga clic en un repositorio para analizar {{< ui >}}Library Vulnerabilities{{< /ui >}} y {{< ui >}}Library Catalog{{< /ui >}} resultados de SCA limitados a la rama y el commit que haya elegido.
* La pestaña {{< ui >}}Library Vulnerabilities{{< /ui >}} contiene las versiones de bibliotecas vulnerables encontradas por Datadog SCA
* La pestaña {{< ui >}}Library Catalog{{< /ui >}} contiene todas las bibliotecas (vulnerables o no) encontradas por Datadog SCA.

Los pasos recomendados para corregir las vulnerabilidades detectadas se pueden encontrar en el panel lateral de cada vulnerabilidad en SCA. Se proporcionan pasos para actualizar la biblioteca a la versión más segura (no vulnerable), así como a la versión más cercana.

Para filtrar sus resultados, utilice las facetas a la izquierda de la lista o la barra de búsqueda en la parte superior. Los resultados se pueden filtrar por facetas de servicio o equipo. Para obtener más información sobre cómo se vinculan los resultados a los servicios y equipos de Datadog, consulte [Vincular hallazgos a servicios y equipos de Datadog][18].

Cada fila representa una combinación única de biblioteca y versión. Cada combinación está asociada con el commit y la rama específicos que se seleccionan en los filtros en la parte superior de la página (de forma predeterminada, el commit más reciente en la rama predeterminada del repositorio que seleccionó).

Haga clic en una biblioteca con una vulnerabilidad para abrir un panel lateral que contiene información sobre los pasos de corrección.

<!-- {{< img src="code_security/software_composition_analysis/sca-violation.png" alt="Panel lateral para una infracción de SCA" style="width:80%;">}} -->

### Corrección {#remediation}

Datadog SCA admite el uso de agentes de codificación y [Bits Code][31] para aplicar correcciones a bibliotecas vulnerables. También puede usar [Bits Code Automation][32] para generar automáticamente correcciones para las vulnerabilidades a medida que se encuentran o según un horario.

<div class="alert alert-info">Las correcciones de SCA en Bits Code requieren acceso a Internet para aplicar actualizaciones de bibliotecas. Para configurar el acceso a Internet, consulte <a href="/bits_ai/bits_code/setup/#configure-internet-access">Configurar el acceso a Internet</a>.</div>

Para visualizar y corregir vulnerabilidades:

1. En Datadog, navegue a [{{< ui >}}Security{{< /ui >}} > {{< ui >}}Code Security{{< /ui >}} > {{< ui >}}Vulnerabilities{{< /ui >}}][11] y seleccione {{< ui >}}Libraries (SCA){{< /ui >}}.
2. Seleccione una vulnerabilidad para abrir un panel lateral con detalles sobre el hallazgo y la biblioteca afectada.
3. En la sección {{< ui >}}Next Steps{{< /ui >}} > {{< ui >}}Remediation{{< /ui >}}, haga clic en {{< ui >}}Remediate with AI{{< /ui >}}
4. Seleccione Bits Code u otro agente de codificación. Con Bits Code, puede elegir entre:
   - [{{< ui >}}Single fix{{< /ui >}}](#single-fix): Genera una corrección para esta biblioteca vulnerable
     - Si ya se ha generado una corrección, seleccione {{< ui >}}View fix and create PR{{< /ui >}} para visualizar la [sesión de corrección](#remediation-session-details) existente.
   - [{{< ui >}}Create automation{{< /ui >}}](#create-automation): Abre un modal emergente donde puede crear una [Bits Code automation][32]

#### Single fix {#single-fix}

Utilice **Single fix** para abrir una sesión de Bits Code para corregir esta vulnerabilidad única. Puede revisar el diff propuesto, hacer preguntas de seguimiento, editar el parche y crear una solicitud de extracción para aplicar la corrección a su repositorio de código fuente.

Visualice todas las sesiones de Bits Code en {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Code{{< /ui >}} > [{{< ui >}}Sessions{{< /ui >}}][33].

#### Create automation {#create-automation}

Utilice **Create automation** para crear una [Bits Code automation][32] para generar correcciones para vulnerabilidades de SCA automáticamente, ya sea a medida que se encuentran o según un horario.

Seleccionar esta opción abre un modal {{< ui >}}Automate with Bits{{< /ui >}} con la acción {{< ui >}}Remediate SCA vulnerabilities{{< /ui >}} prellenada. Complete el formulario, incluyendo la especificación de un activador y una salida, luego haga clic en {{< ui >}}Create Automation{{< /ui >}}. Consulte [Automations][32] para obtener más información sobre acciones, activadores y resultados.

Visualice todas las automatizaciones de Bits Code en {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Code{{< /ui >}} > [{{< ui >}}Automations{{< /ui >}}][34].

#### Detalles de la sesión de corrección {#remediation-session-details}

Cada sesión de Bits Code muestra el ciclo de vida de una corrección generada por IA para que pueda revisar y validar los cambios antes de fusionarlos. Incluye:

- El hallazgo de seguridad original y el cambio de código propuesto
- Una explicación de cómo y por qué Bits Code generó la corrección
- Resultados de CI (si están habilitados) para validar que el parche es seguro de implementar
- Opciones para refinar la corrección o {{< ui >}}Create PR{{< /ui >}} para aplicar los cambios a su repositorio de fuente

También puede visualizar todas las sesiones de corrección en [**Sessions**][33].

#### Corregir con Cursor {#fix-with-cursor}
En lugar de Bits Code, puede generar una corrección con un agente de codificación de IA como Cursor:

1. En el cuadro de diálogo {{< ui >}}Remediate with AI{{< /ui >}}, seleccione la pestaña {{< ui >}}Coding agent{{< /ui >}}.
2. En {{< ui >}}Generate your fix directly from Claude Code, Codex, or Cursor{{< /ui >}}, haga clic en {{< ui >}}Open{{< /ui >}} junto a {{< ui >}}Fix with Cursor{{< /ui >}}. Datadog abre Cursor con un aviso personalizado que incluye la actualización de biblioteca recomendada para la vulnerabilidad.

Para usar un agente diferente, haga clic en {{< ui >}}Copy{{< /ui >}} junto a {{< ui >}}Copy fix prompt{{< /ui >}} y pegue el aviso en el agente de su elección.

Puede iniciar este flujo desde la sección {{< ui >}}Remediation{{< /ui >}} del panel lateral de una vulnerabilidad, o desde la tabla {{< ui >}}Repositories{{< /ui >}}. Cada fila de la tabla representa un repositorio o archivo que contiene la biblioteca vulnerable.

Para manejar el enlace profundo de Cursor, instale la [extensión de Datadog para VS Code y Cursor](/ide_plugins/vscode/?tab=cursor).

{{< img src="code_security/software_composition_analysis/fix-with-cursor.png" alt="El cuadro de diálogo Remediate with AI con la pestaña Coding agent seleccionada, que muestra las opciones Fix with Cursor y Copy fix prompt" style="width:100%;" >}}

### Bloquee automáticamente cambios riesgosos con PR Gates {#automatically-block-risky-changes-with-pr-gates}

Utilice [PR Gates][16] para aplicar estándares de seguridad para bibliotecas de código abierto antes de que se fusionen los cambios. Datadog escanea las dependencias introducidas en cada solicitud de extracción (pull request), identifica vulnerabilidades o infracciones de licencia que superan el umbral de gravedad configurado e informa un estado de aprobado o fallido a GitHub o Azure DevOps.

Puede configurar PR Gates para bloquear en:
- **Security vulnerabilities**: bibliotecas con CVE conocidos por encima de un umbral de gravedad configurado.
- **Infracciones de licencia**: bibliotecas que utilizan licencias que no cumplen con la política de su organización.

PR Gates marca una verificación de PR como fallida solo si el desarrollador introduce una nueva infracción en esa PR. Las infracciones que ya existían en la base de código antes de que se creara la rama de la PR no provocan que la verificación falle. De forma predeterminada, las verificaciones fallidas son informativas y no bloquean la fusión, pero puede configurarlas como bloqueantes en GitHub o Azure DevOps para evitar fusiones cuando se detectan problemas críticos. Para obtener instrucciones de configuración, consulte [Configurar reglas de puerta de PR][17].

### Administre su inventario de la biblioteca {#manage-your-library-inventory}

El [Inventario de la biblioteca][8] proporciona visibilidad de las bibliotecas de terceros detectadas en toda su base de código. Datadog recopila esta información de:

* **SCA estático**, que identifica todas las bibliotecas referenciadas en sus repositorios, y
* **SCA en tiempo de ejecución**, que detecta las bibliotecas que realmente se cargan y utilizan sus servicios en tiempo de ejecución.

Utilice el Inventario de la biblioteca para comprender de qué dependencias depende, dónde se utilizan y si contienen vulnerabilidades conocidas o riesgos de licencia.

Para obtener más información sobre cómo se genera el inventario, en qué se diferencian los datos estáticos y de tiempo de ejecución, y cómo interpretar los detalles de la biblioteca (uso, vulnerabilidades, licencias, versiones y puntuación OpenSSF), consulte [Inventario de la biblioteca][14].

### Exportar una lista de materiales de software (SBOM) {#export-a-software-bill-of-materials}

Exporte un SBOM de sus bibliotecas de terceros directamente desde el [Inventario de la biblioteca][8]. El SBOM exportado incluye bibliotecas detectadas tanto de forma estática (con SCA estático) como en tiempo de ejecución (con SCA en tiempo de ejecución), lo que le brinda una vista única y completa de su cadena de suministro de software.

Datadog admite los siguientes formatos de SBOM:

- **CycloneDX 1.6**
- **SPDX 2.3**

Utilice el SBOM exportado para compartir datos de dependencia con consumidores intermedios, cumplir con los requisitos normativos y de cumplimiento, o alimentar otras herramientas de la cadena de suministro.

Para obtener detalles sobre cómo generar y descargar un SBOM, consulte [Inventario de la biblioteca][29].

### Explorar el catálogo completo de CVE {#explore-the-full-cve-catalog}

Utilice el [Explorador de CVE][15] para buscar cada CVE y aviso de seguridad rastreado por Datadog, incluidos aquellos que no afectan a su entorno. Esto le ayuda a evaluar la exposición a vulnerabilidades recién publicadas antes de que aparezcan en sus hallazgos.

Para los CVE que afectan a paquetes detectados en sus repositorios y servicios escaneados, Datadog los marca automáticamente como afectados. Los activos que no se han escaneado no muestran un estado de afectados.

Para cada CVE, puede visualizar la puntuación de gravedad, la disponibilidad de exploits, la puntuación EPSS, el estado de CISA KEV, los paquetes afectados y las versiones de corrección. Consulte [Explorador de CVE][27] para obtener más detalles.

### Crear tickets a partir de hallazgos {#create-tickets-from-findings}

Puede crear un ticket bidireccional en Jira o ServiceNow directamente desde cualquier hallazgo para realizar un seguimiento y remediar problemas en sus flujos de trabajo existentes. El estado del ticket permanece sincronizado entre Datadog y su herramienta de tickets. Para obtener más información, consulte [Integraciones de tickets][19].

<div class="alert alert-info">La creación de tickets solo está disponible para hallazgos de vulnerabilidades de bibliotecas detectados en repositorios (SCA estático). Los hallazgos detectados exclusivamente en servicios en ejecución no admiten la creación de tickets.</div>

### Silenciar hallazgos {#mute-findings}

Para suprimir un hallazgo, haga clic en {{< ui >}}Mute{{< /ui >}} en el panel de detalles del hallazgo. Esto abre un flujo de trabajo donde puede [crear una regla de automatización][20] para el filtrado según el contexto por valores de etiqueta (por ejemplo, por `repository`). Silenciar un hallazgo lo oculta y lo excluye de los informes.

<div class="alert alert-info">El silenciamiento solo está disponible para hallazgos de vulnerabilidades de bibliotecas detectados en repositorios (SCA estático). Los hallazgos detectados exclusivamente en servicios en ejecución no se pueden silenciar.</div>

Para restaurar un hallazgo silenciado, haga clic en {{< ui >}}Unmute{{< /ui >}} en el panel de detalles. También puede usar el filtro {{< ui >}}Status{{< /ui >}} en el [Explorador de vulnerabilidades][11] para revisar los hallazgos silenciados.

### Contexto de vulnerabilidad de biblioteca en APM {#library-vulnerability-context-in-apm}

SCA enriquece la información que Application Performance Monitoring (APM) ya recopila al marcar las bibliotecas que coinciden con los avisos de vulnerabilidad actuales. Los servicios potencialmente vulnerables se resaltan directamente en la vista de Security en el [Catálogo de APM][10].

## Entender las vistas de SCA {#understanding-sca-views}

El Explorador de repositorios y el Explorador de vulnerabilidades cumplen propósitos complementarios pero distintos.

El Explorador de repositorios refleja una instantánea puntual de las bibliotecas y vulnerabilidades detectadas en el momento del escaneo. Muestra qué bibliotecas estaban presentes en un repositorio determinado en una confirmación específica, junto con cualquier vulnerabilidad que se conociera en el momento del escaneo. Esta vista no se actualiza retroactivamente si se publican nuevos avisos después de que se ejecute el escaneo.

El Explorador de vulnerabilidades proporciona una vista en tiempo real que se compara continuamente con la base de datos de avisos más reciente. Si se publica un nuevo aviso de vulnerabilidad después de un escaneo de repositorio, aparece automáticamente en el Explorador de vulnerabilidades, incluso si el repositorio no se ha vuelto a escanear o si su último escaneo fue en una confirmación anterior. Esto garantiza que su exposición a vulnerabilidades esté siempre actualizada.

<div class="alert alert-info"><b>Ejemplo</b>: Si un escaneo se ejecuta a las 10:00 AM y se publica un aviso de CVE para una biblioteca en su repositorio a las 4:00 PM, el Explorador de repositorios para esa confirmación no mostrará el CVE, pero el Explorador de vulnerabilidades lo reflejará tan pronto como el aviso esté disponible en la base de datos de Datadog.</div>

### Coincidencia retroactiva de avisos {#retroactive-advisory-matching}

Datadog compara continuamente los avisos recién publicados con el inventario de bibliotecas almacenado de escaneos anteriores. Esto actualiza los registros de vulnerabilidades en el Explorador de vulnerabilidades sin alterar las instantáneas originales del Explorador de repositorios. Esto significa:

- No necesita activar un nuevo escaneo para que una CVE recién publicada aparezca en el Explorador de vulnerabilidades.
- El Explorador de vulnerabilidades refleja el riesgo más actual basado en su último inventario de bibliotecas conocido, incluso para confirmaciones anteriores.
- El Explorador de repositorios sigue siendo un registro fijo y puntual de lo que se conocía en el momento del escaneo y no se actualiza cuando se publican nuevos avisos.

### Ciclo de vida de la vulnerabilidad {#vulnerability-lifecycle}

Datadog rastrea las vulnerabilidades de SCA de manera diferente según dónde se detecten. **SCA estático** Los hallazgos tienen como contexto un **repositorio** y se basan en escaneos de repositorios. **SCA en tiempo de ejecución** Los hallazgos tienen como contexto un **servicio** y se basan en bibliotecas que son cargadas y utilizadas por servicios en ejecución.

Se abre una vulnerabilidad cuando Datadog detecta una biblioteca vulnerable en el contexto relevante. Se cierra una vulnerabilidad cuando Datadog ya no la detecta de acuerdo con las reglas de ciclo de vida para ese producto.

| Producto | Contexto | Escenario | Cuándo se abre una vulnerabilidad | Cuándo se cierra una vulnerabilidad |
|---|---|---|---|---|
| SCA estático | Repositorio | Escaneo de repositorio | Datadog detecta una biblioteca vulnerable en un repositorio escaneado. | La vulnerabilidad no se detectó en la última confirmación escaneada. |
| SCA en tiempo de ejecución | Servicio | Servicio de larga duración | Datadog detecta una biblioteca vulnerable en un servicio en ejecución. | Después de un día, si la vulnerabilidad no se vuelve a detectar y el servicio se está ejecutando en todos los entornos donde se detectó la vulnerabilidad. |
| SCA en tiempo de ejecución | Servicio | Biblioteca cargada más tarde en el ciclo de vida del servicio | Datadog detecta una biblioteca vulnerable en un servicio en ejecución. | Después de cinco días, si la vulnerabilidad no se vuelve a detectar durante ese período. |
| SCA en tiempo de ejecución | Servicio | Servicio o trabajo de corta duración | Datadog detecta una biblioteca vulnerable en un servicio en ejecución. | Después de cinco días, si la vulnerabilidad no se vuelve a detectar durante ese período. |

## Compatibilidad de lenguaje de Software Composition Analysis {#sca-language-support}

Software Composition Analysis (SCA) admite los siguientes lenguajes:

{{< card-grid image_width="80" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/python_avatar.svg" alt="python" image_width="50" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/javascript_large.png" alt="javascript" image_width="50" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/java_avatar.svg" alt="java" image_width="50" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/golang-avatar.png" alt="Go" image_width="60" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/ruby_avatar.svg" alt="ruby" image_width="50" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/php_opcache.png" alt="php" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/rust.png" alt="rust" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/cpp.png" alt="c++" image_width="60" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/dart.svg" alt="dart" image_width="50" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/swift_avatar.svg" alt="swift" image_width="50" >}}
{{< /card-grid >}}

## Personalice su configuración {#customize-your-configuration}

Puede excluir rutas del escaneo de Software Composition Analysis estático configurando `ignore-paths` en Datadog o en un archivo `code-security.datadog.yaml`. Para obtener la referencia completa de configuración de Software Composition Analysis, consulte [Configuración de Software Composition Analysis (SCA)][30]. Para obtener información sobre las ubicaciones de configuración, la precedencia y la combinación, consulte [Referencia de configuración de Code Security][28].

## Próximos pasos {#next-steps}

1. [Configure Software Composition Analysis estático][1] para escanear sus repositorios.
2. [Configure Software Composition Analysis en tiempo de ejecución][2] para detectar bibliotecas cargadas por sus servicios en ejecución.
3. Revise y clasifique los hallazgos en el [Explorador de vulnerabilidades][11].
4. Configure [PR Gates][16] para bloquear cambios riesgosos antes de que se fusionen.
5. Utilice el [Explorador de CVE][15] para evaluar de forma proactiva la exposición a vulnerabilidades recién publicadas.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/security/code_security/software_composition_analysis/setup_static/
[2]: /es/security/code_security/software_composition_analysis/setup_runtime/
[3]: https://app.datadoghq.com/security/appsec/vm
[8]: https://app.datadoghq.com/security/appsec/inventory/libraries
[9]: /es/account_management/rbac/permissions/#integrations
[10]: https://app.datadoghq.com/services?lens=Security
[11]: https://app.datadoghq.com/security/appsec/vm/library
[12]: https://app.datadoghq.com/ci/code-analysis
[13]: /es/security/code_security/software_composition_analysis/setup_static/#upload-third-party-sbom-to-datadog
[14]: /es/security/code_security/software_composition_analysis/library_inventory
[15]: https://app.datadoghq.com/security/code-security/detection-coverage/advisories
[16]: /es/pr_gates/
[17]: /es/pr_gates/setup
[18]: /es/security/code_security/software_composition_analysis/setup_static/?tab=github#link-findings-to-datadog-services-and-teams
[19]: /es/security/ticketing_integrations
[20]: /es/security/automation_pipelines/mute
[21]: https://nvd.nist.gov/
[22]: https://docs.github.com/en/code-security/concepts/vulnerability-reporting-and-management/about-the-github-advisory-database
[23]: https://google.github.io/osv.dev/data/
[24]: https://github.com/pypa/advisory-database
[25]: https://github.com/cloudsecurityalliance/gsd-database
[26]: https://github.com/DataDog/guarddog
[27]: /es/security/code_security/software_composition_analysis/cve_explorer/
[28]: /es/security/code_security/guides/configuration/
[29]: /es/security/code_security/software_composition_analysis/library_inventory/#export-a-software-bill-of-materials-sbom
[30]: /es/security/code_security/software_composition_analysis/configuration/
[31]: /es/bits_ai/bits_code
[32]: /es/bits_ai/bits_code/automations
[33]: https://app.datadoghq.com/code
[34]: https://app.datadoghq.com/code/automations