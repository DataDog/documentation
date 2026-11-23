---
algolia:
  tags:
  - static analysis
  - datadog static analysis
  - code quality
  - SAST
aliases:
- /es/code_analysis/static_analysis
description: Conozca Datadog Static Code Analysis para escanear el código en busca
  de problemas de calidad y vulnerabilidades de seguridad antes de que su código llegue
  a producción.
further_reading:
- link: https://www.datadoghq.com/blog/secure-your-github-ecosystem/
  tag: Blog
  text: 'Seguridad en CI/CD: Cómo proteger su ecosistema de GitHub'
- link: https://www.datadoghq.com/blog/bitsai-dev-agent-code-security
  tag: Blog
  text: Presentamos Bits Code para Code Security
- link: https://www.datadoghq.com/blog/code-security-secret-scanning
  tag: Blog
  text: Detecte y bloquee credenciales expuestas con Datadog Secret Scanning
- link: https://www.datadoghq.com/blog/using-llms-to-filter-out-false-positives/
  tag: Blog
  text: Uso de LLMs para filtrar falsos positivos del análisis estático de código
is_beta: false
title: Análisis estático de código (SAST)
---
{{% site-region region="gov,gov2" %}}
<div class="alert alert-warning">
    Code Security no está disponible para el {{< region-param key="dd_site_name" >}} sitio.
</div>
{{% /site-region %}}


## Descripción general {#overview}

El Análisis estático de código es la capacidad de Static Application Security Testing (SAST) de Datadog. SAST es una técnica de prueba de software de caja transparente que analiza el código de preproducción de un programa sin necesidad de ejecutarlo.

El Análisis estático de código le ayuda a identificar vulnerabilidades de seguridad y problemas de mantenibilidad al principio del ciclo de vida de desarrollo de software (SDLC) para garantizar que solo el código más seguro y de mayor calidad llegue a producción. Proporciona a las organizaciones los siguientes beneficios:

* Las aplicaciones son menos vulnerables a las brechas de seguridad con el tiempo, debido a que las nuevas vulnerabilidades se detectan mediante análisis SAST antes de que el código llegue a producción.
* Elimina las conjeturas al cumplir con los estándares de código de una organización, lo que permite a su equipo de desarrollo enviar código compatible sin impactos significativos en la velocidad de desarrollo.
* Incorpore a los desarrolladores más rápido porque el Análisis de código estático permite a una organización mantener una base de código más legible con el tiempo.

## Configure el Análisis de código estático {#set-up-static-code-analysis}

El Análisis de código estático permite escanear vulnerabilidades de seguridad y malas prácticas de programación en los siguientes lenguajes y tecnologías:

{{< card-grid card_width="130px" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Python" src="integrations_logos/python_avatar.svg" alt="python" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=JavaScript" src="integrations_logos/javascript_large.png" alt="javascript" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=TypeScript" src="integrations_logos/typescript_large.svg" alt="typescript" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Java" src="integrations_logos/java_avatar.svg" alt="java" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=CSharp" src="integrations_logos/dotnet_avatar.svg" alt="c sharp" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Go" src="integrations_logos/golang-avatar.png" alt="Go" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Ruby" src="integrations_logos/ruby_avatar.svg" alt="ruby" image_width="60" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=PHP" src="integrations_logos/php_opcache.png" alt="php" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Docker" src="integrations_logos/docker_avatar.svg" alt="docker" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=YAML" src="integrations_logos/yaml.png" alt="yaml" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Kotlin" src="integrations_logos/kotlin.png" alt="kotlin" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Elixir" src="integrations_logos/elixir.png" alt="elixir" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Apex" src="integrations_logos/salesforce_large.svg" alt="apex" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Swift" src="integrations_logos/swift_large.svg" alt="swift" >}}
  {{< image-card href="/security/code_security/static_analysis/setup/?tab=circleciorbs#upload-third-party-static-analysis-results-to-datadog" src="integrations_logos/datadog_avatar.svg" alt="Otro" >}}
{{< /card-grid >}}

Los análisis pueden ejecutarse a través de sus canalizaciones de CI/CD o directamente en Datadog con análisis alojado.  
Para comenzar, vaya a la [{{< ui >}}Code Security{{< /ui >}} página de configuración][12] o consulte la [Documentación de configuración][9].

## Integre en el ciclo de vida de desarrollo {#integrate-into-the-development-lifecycle}

### Gestión de código fuente {#source-code-management}
{{< whatsnext desc="Durante las revisiones de código, Datadog puede marcar automáticamente las infracciones de Análisis de código estático en las solicitudes de extracción añadiendo comentarios de revisión en línea en la(s) línea(s) de código correspondiente(s). Esto es compatible con repositorios de GitHub, GitLab y Azure DevOps (alojados en la nube). Cuando corresponde, Datadog también proporciona correcciones sugeridas que pueden aplicarse directamente en la solicitud de extracción." >}}
    {{< nextlink href="static_analysis/github_pull_requests" >}}Solicitudes de extracción{{< /nextlink >}}
{{< /whatsnext >}}

### IDEs {#ides}
{{< whatsnext desc="Puede identificar vulnerabilidades de código en tiempo real mientras edita un archivo en su Entorno de desarrollo integrado (IDE). Consulte la documentación específica de la integración para obtener más información:">}}
    {{< nextlink href="ide_plugins/idea/code_security/" >}}Complemento de Datadog para IDEs de JetBrains{{< /nextlink >}}
    {{< nextlink href="ide_plugins/vscode/code_security/" >}}Extensión de Datadog para Visual Studio Code y Cursor{{< /nextlink >}}
{{< /whatsnext >}}

## Busque y filtre resultados {#search-and-filter-results}
Después de configurar el Análisis de código estático, se ejecuta un análisis en cada confirmación (commit) en un repositorio analizado. Las infracciones se resumen por repositorio en la [{{< ui >}}Code Security Repositories{{< /ui >}} página][1]. Haga clic en un repositorio para analizar los resultados de {{< ui >}}Code Vulnerabilities{{< /ui >}} y {{< ui >}}Code Quality{{< /ui >}} del Análisis de código estático.

* La pestaña {{< ui >}}Code Vulnerabilities{{< /ui >}} contiene las infracciones encontradas por las reglas de Datadog en la [categoría de Security][2].
* La pestaña {{< ui >}}Code Quality{{< /ui >}} contiene las infracciones encontradas por las reglas de Datadog en las [categorías de Mejores prácticas, Estilo de código, Propensión a errores o Rendimiento][3].

Para filtrar sus resultados, utilice las facetas a la izquierda de la lista o realice una búsqueda. Los resultados se pueden [filtrar por facetas de servicio o equipo][13].

Cada fila representa una infracción. Cada infracción está asociada con el commit y la rama específicos que se seleccionan en los filtros en la parte superior de la página (de forma predeterminada, los resultados se muestran para el commit más reciente en la rama predeterminada del repositorio que está viendo).

Haga clic en una infracción para abrir un panel lateral que contiene información sobre el contexto de la infracción y dónde se originó.

<!-- {{< img src="code_security/static_analysis/static-analysis-violation.png" alt="Panel lateral para una infracción de análisis estático" style="width:80%;">}}  -->

El contenido de la infracción se muestra en pestañas:

- {{< ui >}}Details{{< /ui >}}: Una descripción de la infracción y las líneas de código que la causaron. Para ver el fragmento de código infractor, configure la integración de código fuente relevante para su proveedor ([GitHub][4], [GitLab][5], Azure[6]).
- {{< ui >}}Remediation{{< /ui >}}: Una o más correcciones de código que pueden resolver la infracción, con opciones de remediación.
- {{< ui >}}Event{{< /ui >}}: Metadatos JSON sobre la infracción.

### Filtre falsos positivos {#filter-out-false-positives}
Para un subconjunto de vulnerabilidades de SAST, Bits AI puede revisar el contexto y evaluar si es más probable que sea un positivo verdadero o falso, junto con una breve explicación del razonamiento. 

Para obtener más información, consulte [Análisis de código estático mejorado con IA][17].

## Personalice su configuración {#customize-your-configuration}
Para personalizar qué reglas de Análisis de código estático están configuradas en sus repositorios o en toda su organización, consulte la [documentación de configuración][8].

## Vincule los hallazgos a los servicios y equipos de Datadog {#link-findings-to-datadog-services-and-teams}
Para vincular hallazgos a servicios y equipos de Datadog, consulte la [documentación de configuración][13].

## Aplique correcciones sugeridas {#apply-suggested-fixes}
<!-- {{< img src="code_security/static_analysis/static-analysis-fixes.png" alt="Pestaña de correcciones de una violación de análisis estático" style="width:80%;">}} -->

En el Análisis de código estático de Datadog, existen dos tipos de correcciones sugeridas:

1. **Corrección sugerida determinista:** Para violaciones simples como problemas de linting, el analizador de reglas proporciona automáticamente correcciones con plantilla.
2. **Corrección sugerida por IA:** Para violaciones complejas, las correcciones generalmente no están disponibles de antemano. En su lugar, puede utilizar correcciones sugeridas por IA, que emplean GPT-4 de OpenAI para generar una corrección sugerida. Puede elegir entre correcciones {{< ui >}}Text{{< /ui >}} y {{< ui >}}Unified Diff{{< /ui >}}, que generan instrucciones en texto plano o un cambio de código para resolver la violación, respectivamente.

<!-- {{< img src="code_security/static_analysis/static-analysis-default-fix.png" alt="Indicador visual de una corrección sugerida de análisis estático predeterminada" style="width:60%;">}}

{{< img src="code_security/static_analysis/static-analysis-ai-fix.png" alt="Indicador visual de una corrección sugerida de análisis estático por IA" style="width:60%;">}} -->

### Corrija una vulnerabilidad o un problema de calidad directamente desde Datadog {#fix-a-vulnerability-or-quality-issue-directly-from-datadog}

<!-- {{< img src="ci/sast_one_click_light.png" alt="Ejemplo de corrección con un solo clic para Code Security" style="width:90%;" >}} -->

Si GitHub es su administrador de código fuente, puede enviar un cambio de código para corregir un problema de SAST directamente desde Datadog de dos maneras.

#### Abra una solicitud de extracción {#open-a-pull-request}
Si el permiso {{< ui >}}Pull Requests{{< /ui >}} de su aplicación de GitHub está configurado en {{< ui >}}Read & Write{{< /ui >}}, la corrección con un solo clic está habilitada para todos los hallazgos de Análisis de código estático con una corrección sugerida disponible.

Siga estos pasos para corregir una vulnerabilidad y abrir una solicitud de extracción:
1. Visualice un resultado de SAST específico en Code Security.
2. Haga clic en {{< ui >}}Fix Violation{{< /ui >}} en el panel lateral del resultado.
3. Seleccione {{< ui >}}Open a Pull Request{{< /ui >}}.
4. Ingrese un título de solicitud de extracción y un mensaje de confirmación.
5. Haga clic en {{< ui >}}Create PR{{< /ui >}}.

#### Confirmar directamente en la rama actual {#commit-directly-to-the-current-branch}
También puede corregir una vulnerabilidad confirmando directamente en la rama en la que se encontró el resultado.

Para confirmar una corrección sugerida:

1. Visualice un resultado de SAST específico en Code Security.
2. Haga clic en {{< ui >}}Fix Violation{{< /ui >}} en el panel lateral del resultado.
3. Haga clic en {{< ui >}}Commit to current branch{{< /ui >}}.

### Corregir con Cursor {#fix-with-cursor}
Puede delegar la corrección de un hallazgo de SAST a un agente de codificación de IA como Cursor.

1. Visualice un resultado de SAST específico en Code Security.
2. En la sección {{< ui >}}Next Steps{{< /ui >}} > {{< ui >}}Remediation{{< /ui >}} del panel lateral, haga clic en {{< ui >}}Remediate with AI{{< /ui >}}.
3. Seleccione la pestaña {{< ui >}}Coding agent{{< /ui >}}.
4. En {{< ui >}}Generate your fix directly from Claude Code, Codex, or Cursor{{< /ui >}}, haga clic en {{< ui >}}Open{{< /ui >}} junto a {{< ui >}}Fix with Cursor{{< /ui >}}. Datadog abre Cursor con un aviso de corrección personalizado para el hallazgo. Revise los cambios sugeridos antes de confirmarlos.

Para usar un agente de codificación de IA diferente, haga clic en {{< ui >}}Copy{{< /ui >}} junto a {{< ui >}}Copy fix prompt{{< /ui >}} y pegue el aviso en el agente de su elección.

Para manejar el enlace profundo de Cursor, instale la [extensión de Datadog para VS Code y Cursor](/ide_plugins/vscode/?tab=cursor).

{{< img src="code_security/static_analysis/fix-with-cursor.png" alt="El cuadro de diálogo Remediate with AI con la pestaña Coding agent seleccionada, que muestra las opciones Fix with Cursor y Copy fix prompt" style="width:100%;" >}}

## Informe falsos positivos {#report-false-positives}
Si cree que una infracción específica es un falso positivo, puede marcarla como tal incluyendo un motivo, lo cual envía un informe directamente a Datadog. Las presentaciones se revisan periódicamente para mejorar la calidad del conjunto de reglas con el tiempo.

<!-- {{< img src="code_security/static_analysis/flag-false-positive.png" alt="Botón para reportar una infracción de análisis de código estático como falso positivo" style="width:60%;">}} -->

## <!-- Lecturas adicionales

{{< partial name="whats-next/whats-next.html" >}} -->

[1]: https://app.datadoghq.com/ci/code-analysis
[2]: /es/security/code_security/static_analysis_rules?categories=Security
[3]: /es/security/code_security/static_analysis_rules?categories=Best+Practices&categories=Code+Style&categories=Error+Prone&categories=Performance
[4]: /es/integrations/github/
[5]: /es/integrations/gitlab-source-code/
[6]: https://en.wikipedia.org/wiki/Camel_case
[7]: https://en.wikipedia.org/wiki/Snake_case
[8]: /es/security/code_security/static_analysis/setup/#customize-your-configuration
[9]: /es/security/code_security/static_analysis/setup
[10]: /es/security/code_security/dev_tool_int/github_pull_requests/
[11]: /es/getting_started/code_security/
[12]: https://app.datadoghq.com/security/configuration/code-security/setup
[13]: /es/security/code_security/static_analysis/setup/?tab=github#link-findings-to-datadog-services-and-teams
[14]: /es/account_management/teams/
[15]: /es/integrations/github/#connect-github-teams-to-datadog-teams
[16]: /es/integrations/azure-devops-source-code/
[17]: /es/security/code_security/static_analysis/ai_enhanced_sast/