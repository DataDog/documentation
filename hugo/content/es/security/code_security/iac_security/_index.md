---
aliases:
- /es/security/cloud_security_management/iac_scanning/
further_reading:
- link: /security/code_security/iac_security/setup
  tag: Documentación
  text: Configurar IaC Security
- link: /security/code_security/iac_security/configuration
  tag: Documentación
  text: Configurar IaC Security
- link: /security/code_security/iac_security/iac_rules/
  tag: Documentación
  text: Reglas de IaC Security
- link: /security/code_security/iac_security/custom_rules/
  tag: Documentación
  text: IaC Custom Rules
- link: /pr_gates/
  tag: Documentación
  text: PR Gates
- link: https://www.datadoghq.com/blog/datadog-iac-security/
  tag: Blog
  text: Evite que las configuraciones erróneas de la nube lleguen a producción con
    Datadog IaC Security
- link: https://www.datadoghq.com/blog/code-security-secret-scanning
  tag: Blog
  text: Detecte y bloquee credenciales expuestas con Datadog Secret Scanning
- link: https://www.datadoghq.com/blog/github-actions-iac-security/
  tag: Blog
  text: 'Detectar errores de configuración de CI/CD antes que los bots: Asegurar GitHub
    Actions con Datadog IaC Security'
title: Infrastructure as Code (IaC) Security
---
Datadog Infrastructure as Code (IaC) Security detecta errores de configuración en las configuraciones de IaC antes de que se implementen. Marca problemas como la falta de cifrado o el acceso excesivamente permisivo en los archivos almacenados en sus repositorios conectados de GitHub, GitLab o Azure DevOps. Para obtener más información, consulte [IaC Security Rules][13].

{{< img src="/security/infrastructure_as_code/iac_misconfiguration_side_panel.png" alt="Panel lateral de errores de configuración de IaC que muestra detalles del problema de alta gravedad IMDSv1 Enabled, incluido un resumen de seguridad, un fragmento de código, marcas de tiempo de detección y pasos de corrección." width="100%">}}

## Cómo funciona {#how-it-works}

IaC Security se integra con sus repositorios para escanear continuamente en busca de errores de configuración y escanea cada confirmación en todas las ramas para cada repositorio configurado. Cuando se detectan infracciones, los hallazgos se muestran y se vinculan al repositorio, la rama y la ruta de archivo relevantes. Esto le ayuda a identificar, priorizar y corregir errores de configuración directamente en la fuente.

## Capacidades clave {#key-capabilities}

### Revise y corrija las infracciones en las solicitudes de extracción {#review-and-fix-violations-in-pull-requests}

Cuando una solicitud de extracción incluye cambios de infraestructura como código, Datadog agrega comentarios en línea para marcar cualquier infracción. Cuando corresponde, también sugiere correcciones de código que se pueden aplicar directamente en la solicitud de extracción. También puede abrir una nueva solicitud de extracción desde Datadog para corregir un hallazgo. Para obtener más información, consulte [Pull Request Comments][5].

### Corregir con Cursor {#fix-with-cursor}
Puede delegar la corrección de un hallazgo de IaC a un agente de codificación de IA como Cursor.

1. En la página [Code Security Vulnerabilities][3], haga clic en un hallazgo para abrir su panel lateral.
2. En la sección {{< ui >}}Next Steps{{< /ui >}} > {{< ui >}}Remediation{{< /ui >}}, haga clic en {{< ui >}}Remediate with AI{{< /ui >}}.
3. Seleccione la pestaña {{< ui >}}Coding agent{{< /ui >}}.
4. En {{< ui >}}Generate your fix directly from Claude Code, Codex, or Cursor{{< /ui >}}, haga clic en {{< ui >}}Open{{< /ui >}} junto a {{< ui >}}Fix with Cursor{{< /ui >}}. Datadog abre Cursor con un aviso de corrección personalizado para el error de configuración.

Para usar un agente diferente, haga clic en {{< ui >}}Copy{{< /ui >}} junto a {{< ui >}}Copy fix prompt{{< /ui >}} y pegue el aviso en el agente de su elección.

Para manejar el enlace profundo de Cursor, instale la [extensión de Datadog para VS Code y Cursor](/ide_plugins/vscode/?tab=cursor).

{{< img src="code_security/iac_security/fix-with-cursor.png" alt="El cuadro de diálogo Remediate with AI con la pestaña Coding agent seleccionada, que muestra las opciones Fix with Cursor y Copy fix prompt" style="width:100%;" >}}

### Bloquee automáticamente cambios riesgosos con PR Gates {#automatically-block-risky-changes-with-pr-gates}

Utilice [PR Gates][11] para aplicar estándares de seguridad en los cambios de infraestructura como código antes de que se fusionen. Datadog escanea los cambios de IaC en cada solicitud de extracción, identifica cualquier vulnerabilidad por encima del umbral de gravedad configurado e informa un estado de aprobado o fallido a GitHub o Azure DevOps.

De forma predeterminada, las comprobaciones son informativas, pero puede hacer que bloqueen en GitHub o Azure DevOps para evitar la fusión cuando se detectan problemas críticos. Para obtener instrucciones de configuración, consulte [Set up PR Gate Rules][12].

### Visualizar y filtrar hallazgos {#view-and-filter-findings}

Después de configurar IaC Security, cada confirmación en un repositorio escaneado activa un escaneo. Los hallazgos se resumen en la página [Code Security Vulnerabilities][3] y se agrupan por repositorio en la página [Code Security Repositories][6].

Utilice filtros para limitar los resultados por:

- Gravedad
- Estado (abierto, silenciado, corregido)
- Tipo de recurso
- Proveedor de nube
- Ruta del archivo
- Equipo
- Repositorio

Haga clic en cualquier hallazgo para abrir un panel lateral que muestra:

- {{< ui >}}Details{{< /ui >}}: Una descripción y el código relevante que activó el hallazgo. (Para visualizar fragmentos de código, [instale la aplicación de GitHub][9]. )
- {{< ui >}}Remediation{{< /ui >}}: Si están disponibles, se proporcionan sugerencias de corrección de código para los hallazgos que admiten remediación.

### Crear tickets de Jira a partir de hallazgos {#create-jira-tickets-from-findings}

Puede crear un ticket de Jira bidireccional directamente desde cualquier hallazgo para realizar un seguimiento y remediar problemas en los flujos de trabajo existentes. El estado del ticket permanece sincronizado entre Datadog y Jira. Para obtener más información, consulte [Sincronización bidireccional de tickets con Jira][4].

### Silenciar hallazgos {#mute-findings}

Para suprimir un hallazgo, haga clic en {{< ui >}}Mute{{< /ui >}} en el panel de detalles del hallazgo. Esto abre un flujo de trabajo donde puede [crear una Regla de silenciamiento][10] para el filtrado consciente del contexto por valores de etiqueta (por ejemplo, por `service` o `environment`). Silenciar un hallazgo lo oculta y lo excluye de los informes.

Para restaurar un hallazgo silenciado, haga clic en {{< ui >}}Unmute{{< /ui >}} en el panel de detalles. También puede usar el filtro {{< ui >}}Status{{< /ui >}} en la página [Code Security Vulnerabilities][3] para revisar los hallazgos silenciados.

### Excluya reglas, archivos o recursos específicos {#exclude-specific-rules-files-or-resources}

Puede configurar exclusiones para evitar que ciertos hallazgos aparezcan en los resultados del análisis. Las exclusiones pueden basarse en el ID de la regla, la ruta del archivo, el tipo de recurso, la gravedad o la etiqueta.

Las exclusiones se administran a través de un archivo de configuración o comentarios en línea en su código de IaC. Para conocer los formatos admitidos y ver ejemplos de uso, consulte [Configure IaC Security][7].

## Próximos pasos {#next-steps}

1. [Set up IaC Security][1] en su entorno.
2. Configure [IaC Security][2] para reducir los falsos positivos o ignorar los resultados esperados.
3. Revise y clasifique los hallazgos en la página [Code Security Vulnerabilities][3].
4. Cree [IaC Custom Rules][14] para aplicar requisitos específicos de su organización.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/code_security/iac_security/setup
[2]: /es/security/code_security/iac_security/configuration
[3]: https://app.datadoghq.com/security/code-security/iac
[4]: /es/security/ticketing_integrations#bidirectional-ticket-syncing-with-jira
[5]: /es/security/code_security/dev_tool_int/github_pull_requests/
[6]: https://app.datadoghq.com/ci/code-analysis?
[7]: /es/security/code_security/iac_security/configuration/
[8]: /es/security/automation_pipelines/mute
[9]: https://app.datadoghq.com/integrations/github/
[10]: /es/security/automation_pipelines/
[11]: /es/pr_gates/
[12]: /es/pr_gates/setup
[13]: /es/security/code_security/iac_security/iac_rules
[14]: /es/security/code_security/iac_security/custom_rules