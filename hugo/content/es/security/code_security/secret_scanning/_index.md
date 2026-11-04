---
algolia:
  tags:
  - secrets scanning
  - secret scanning
  - datadog static analysis
  - SAST
description: Utilice Datadog Secret Scanning para encontrar secretos expuestos en
  el código fuente.
further_reading:
- link: https://www.datadoghq.com/blog/code-security-secret-scanning
  tag: Blog
  text: Detecte y bloquee credenciales expuestas con Datadog Secret Scanning
is_beta: true
title: Secret Scanning
---
{{< callout url="https://www.datadoghq.com/product-preview/generic-secret-scanning-in-code/" header="Encuentre secretos genéricos en su código" >}}
Generic Secret Scanning está en vista previa. Busca tokens internos y contraseñas que no coinciden con un patrón de proveedor.
{{< /callout >}}

Datadog Secret Scanning escanea el código para encontrar secretos expuestos. Datadog también intenta validar los secretos y mostrar su estado (válido, no válido) para ayudarle a priorizar la remediación de secretos.

## Configure Secret Scanning {#set-up-secret-scanning}

Los escaneos pueden ejecutarse en sus Pipelines de CI/CD o directamente en Datadog con escaneo alojado (compatible con GitHub, Azure DevOps y GitLab). Para comenzar, vaya a [{{< ui >}}Code Security Setup{{< /ui >}}][1] y haga clic en {{< ui >}}Activate scanning for your repositories{{< /ui >}} o aprenda cómo configurar Secret Scanning usando [GitHub actions][5] o con [otros proveedores de CI][6].

## Reglas de Secret Scanning {#secret-scanning-rules}

Datadog Secret Scanning funciona con [Sensitive Data Scanner (SDS)][3] e incluye todas las reglas de la
[categoría de secretos y credenciales de SDS][4]. Para un subconjunto de detecciones, Secret Scanning verifica automáticamente si las claves detectadas están activas con [validación activa de terceros][17]. 

## Cómo funciona {#how-it-works}

Secret Scanning se integra directamente con sus repositorios para detectar continuamente secretos filtrados en su código. Creado sobre el analizador estático de Datadog, escanea cada confirmación en todas las ramas de cada repositorio configurado. Los hallazgos se muestran con contexto de repositorio, rama y ruta de archivo para que su equipo pueda identificar, priorizar y remediar los secretos expuestos en la fuente.

Cada escaneo analiza el contenido completo de cada archivo en el contexto en la confirmación escaneada, no solo las líneas o archivos que cambió la confirmación. Cuando Datadog escanea un repositorio por primera vez con escaneo alojado, también escanea el historial completo de Git del repositorio. Consulte [Detectar secretos en el historial de Git](#detect-secrets-in-git-history).

El escaneo con reconocimiento de diferencias, que está disponible para [Static Code Analysis][18], no es compatible con Secret Scanning.

## Capacidades clave {#key-capabilities}

### Detecte secretos en el historial de Git {#detect-secrets-in-git-history}

Eliminar un secreto de un archivo no lo elimina del repositorio. El secreto permanece en confirmaciones (commits) anteriores, donde cualquier persona con acceso al repositorio puede recuperarlo.

Cuando un repositorio se analiza por primera vez con el análisis alojado, Datadog analiza su historial completo de Git en todas las ramas, además de la confirmación (commit) más reciente. Los secretos que ya no están presentes en la confirmación (commit) más reciente de la rama predeterminada se informan como hallazgos de solo historial.

Los hallazgos de solo historial se etiquetan como {{< ui >}}Detected in Git History{{< /ui >}} en la lista. Para revisarlos:

- **En todos los repositorios**: Vaya a [{{< ui >}}Vulnerabilities{{< /ui >}} > {{< ui >}}Secret Scanning (Secrets){{< /ui >}}][15] y filtre por la faceta {{< ui >}}Is Git History{{< /ui >}}.
- **Para un solo repositorio**: Vaya a [{{< ui >}}Repositories{{< /ui >}}][14], seleccione el repositorio y abra la pestaña {{< ui >}}Leaked Secrets{{< /ui >}}.

El panel de detalles del hallazgo muestra dónde se encuentra el secreto en el historial del repositorio:

- {{< ui >}}Introduced in{{< /ui >}}: La confirmación (commit) que agregó el secreto y el autor de esa confirmación.
- {{< ui >}}Removed in{{< /ui >}}: La confirmación (commit) que eliminó el secreto. Si el secreto todavía está presente en una rama o etiqueta no fusionada, esto muestra {{< ui >}}Not removed{{< /ui >}}.

<div class="alert alert-info">El historial de Git se analiza una vez, cuando un repositorio se analiza por primera vez con el análisis alojado. Un secreto que todavía está presente en una rama o etiqueta no fusionada, pero no en la rama predeterminada, se informa como un hallazgo de solo historial. Los análisis de CI analizan solo la confirmación (commit) analizada.</div>

<div class="alert alert-warning">Los hallazgos de solo historial no se cierran automáticamente mediante análisis posteriores, y reescribir el historial de Git no los cierra. Rote o revoque la credencial expuesta y, luego, <a href="#mute-findings">silencie el hallazgo</a>.</div>

### Revise los secretos expuestos en las solicitudes de extracción (pull requests) {#review-exposed-secrets-in-pull-requests}

Cuando una solicitud de extracción (pull request) introduce un secreto filtrado, Datadog agrega automáticamente comentarios en línea para marcar la exposición. También puede abrir una nueva solicitud de extracción desde Datadog para remediar el hallazgo directamente. Para obtener más información, consulte [Pull Request Comments][7]. 

### Bloquee automáticamente las filtraciones con PR Gates {#automatically-block-leaks-with-pr-gates}

Utilice [PR Gates][11] para evitar que los secretos filtrados se fusionen en su rama principal. Datadog escanea cada solicitud de extracción en busca de secretos expuestos e informa un estado de aprobado o fallido directamente a GitHub, Azure DevOps o GitLab (en vista previa).

De forma predeterminada, las comprobaciones son informativas, pero puede hacer que bloqueen la fusión cuando se detectan secretos. Para obtener instrucciones de configuración, consulte [Set up PR Gate Rules][12].

### Exclusiones en línea {#inline-exclusions}

Puede agregar exclusiones en línea para evitar que ciertos hallazgos aparezcan en los resultados del análisis. Comente `no-dd-secrets` para ignorar los secretos detectados en la siguiente línea.

### Visualizar y filtrar hallazgos {#view-and-filter-findings}

Después de configurar Secret Scanning, cada confirmación en un repositorio escaneado activa un escaneo. Los hallazgos se resumen en la página [{{< ui >}}Code Security Vulnerabilities{{< /ui >}}][15] y se agrupan por repositorio en la página [{{< ui >}}Code Security Repositories{{< /ui >}}][14].

En la pestaña {{< ui >}}Secret Scanning (Secrets){{< /ui >}}, utilice filtros para limitar los resultados por facetas como:

- Gravedad
- Estado (abierto, silenciado, corregido)
- {{< ui >}}Validation Status{{< /ui >}}
- Equipo
- Visibilidad del repositorio
- {{< ui >}}Is Git History{{< /ui >}}

### Crear tickets de Jira a partir de hallazgos {#create-jira-tickets-from-findings}

Puede crear un ticket de Jira bidireccional directamente desde cualquier hallazgo para realizar un seguimiento y remediar problemas en los flujos de trabajo existentes. El estado del ticket permanece sincronizado entre Datadog y Jira. Para obtener más información, consulte [Sincronización bidireccional de tickets con Jira][16].

### Declarar un incidente a partir de un secreto filtrado {#declare-an-incident-from-a-leaked-secret}
[Declare un incidente][13] a partir de un hallazgo haciendo clic en {{< ui >}}Declare incident{{< /ui >}} en el panel lateral de Secret Scanning. El incidente se pre-llena con todos los metadatos de detección.

### Silenciar hallazgos {#mute-findings}

Para suprimir un hallazgo, haga clic en {{< ui >}}Mute{{< /ui >}} en el panel de detalles del hallazgo. Esto abre un flujo de trabajo donde puede [crear una Regla de silenciamiento][10] para el filtrado consciente del contexto por valores de etiqueta (por ejemplo, por `repository`). Silenciar un hallazgo lo oculta y lo excluye de los informes.

Para restaurar un hallazgo silenciado, haga clic en {{< ui >}}Unmute{{< /ui >}} en el panel de detalles. También puede utilizar el filtro {{< ui >}}Status{{< /ui >}} en la página [{{< ui >}}Code Security Vulnerabilities{{< /ui >}}][15] para revisar los hallazgos silenciados.

## Próximos pasos {#next-steps}

1. Configure [Secret Scanning][1] en su entorno.
2. Configure [Automation Pipelines][10] para automatizar la clasificación inicial.
3. Revise los hallazgos en la página [{{< ui >}}Code Security Vulnerabilities{{< /ui >}}][15].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: /es/security/code_security/static_analysis/setup
[3]: /es/security/sensitive_data_scanner/
[4]: /es/security/sensitive_data_scanner/scanning_rules/library_rules/?category=Secrets+and+credentials#overview
[5]: /es/security/code_security/secret_scanning/github_actions
[6]: /es/security/code_security/secret_scanning/generic_ci_providers
[7]: /es/security/code_security/dev_tool_int/pull_request_comments/
[8]: /es/security/automation_pipelines/mute
[9]: https://app.datadoghq.com/integrations/github/
[10]: /es/security/automation_pipelines/
[11]: /es/pr_gates/
[12]: /es/pr_gates/setup
[13]: /es/incident_response/incident_management/investigate/declare/#from-a-leaked-secret
[14]: https://app.datadoghq.com/ci/code-analysis?
[15]: https://app.datadoghq.com/security/code-security/secrets
[16]: /es/security/ticketing_integrations#bidirectional-ticket-syncing-with-jira
[17]: /es/security/code_security/secret_scanning/secret_validation/
[18]: /es/security/code_security/static_analysis/setup/#diff-aware-scanning