---
aliases:
- /es/developers/ide_plugins/vscode/code_security/
further_reading:
- link: /security/code_security/
  tag: Documentación
  text: Más información sobre Code Security
- link: /security/code_security/static_analysis/static_analysis_rules/
  tag: Documentación
  text: Reglas de análisis estático
- link: /security/code_security/secret_scanning/
  tag: Documentación
  text: Más información sobre Secret Scanning
- link: /security/code_security/iac_security/
  tag: Documentación
  text: Más información sobre IaC Security
title: Code Security
type: documentation
---
## Descripción general {#overview}

La extensión de Datadog para VS Code y Cursor le ayuda a detectar y solucionar problemas de seguridad antes de que confirme sus cambios. [Static Code Analysis](#static-code-analysis) detecta vulnerabilidades, errores y problemas de mantenibilidad. [Secret Scanning](#secret-scanning) encuentra credenciales expuestas como claves de API, tokens y contraseñas. [IaC Scanning](#infrastructure-as-code-iac-scanning) detecta configuraciones erróneas en la nube antes de que las despliegue.

## Static Code Analysis{#static-code-analysis}

La extensión ejecuta reglas de [Static Code Analysis][1] en los archivos fuente de su espacio de trabajo. Identifica vulnerabilidades de seguridad, errores y problemas de mantenibilidad antes de que confirme sus cambios.

Static Code Analysis es compatible con muchos lenguajes de programación. Para obtener una lista completa, consulte [Static Code Analysis Rules][2]. Los problemas se muestran en el editor de código fuente y puede aplicar las correcciones sugeridas directamente.

{{< img src="/ide_plugins/vscode/static_analysis.mp4" alt="Vista previa de Static Code Analysis" style="width:100%" video=true >}}

### Empiece con Static Code Analysis{#get-started-with-static-code-analysis}

Cuando abre un archivo fuente, la extensión busca [`code-security.datadog.yaml`][3] en la raíz de su repositorio y le solicita que cree uno si no existe.

{{< img src="/ide_plugins/vscode/static-analysis-onboard.png" alt="Banner de incorporación para configurar Static Code Analysis con archivos de Python" style="width:75%;" >}}

Después de crear el archivo de configuración, el analizador se ejecuta automáticamente en segundo plano cuando abre un archivo. Para habilitar Static Code Analysis para un lenguaje específico, ejecute el comando `Datadog: Configure Static Analysis Languages` desde la paleta de comandos (`Shift` + `Cmd/Ctrl` + `P`).

Para analizar una carpeta o espacio de trabajo completo, haga clic derecho en una carpeta en el explorador de archivos y seleccione **Datadog Code Security > Analyze Folder** o **Analyze Workspace**.

### Editor de reglas {#rule-editor}

Escriba y pruebe [custom Static Code Analysis rules][4] sin salir de su IDE. Utilice el editor de reglas para diseñar la lógica de detección para estándares internos, patrones de seguridad o verificaciones de mantenibilidad específicas para su base de código.

Para abrir el editor de reglas, ejecute el comando `Datadog: New DDSA Rule` desde la paleta de comandos (`Shift` + `Cmd/Ctrl` + `P`), o haga clic derecho en un archivo YAML en el explorador de archivos y seleccione **Datadog Code Security > Open in DDSA Rule Editor**.

{{< img src="/ide_plugins/vscode/static-analysis-rule-editor.png" alt="SAST rule editor en la extensión de Datadog para VS Code" style="width:100%;" >}}

El editor de reglas proporciona los siguientes paneles.

- A **Tree-sitter query editor** para la coincidencia de patrones contra el árbol de sintaxis abstracta.
- A **JavaScript rule panel** para expresar la lógica de detección y reportar violaciones.
- **Archivos de prueba conformes y no conformes** que se ejecutan contra la regla mientras edita, con los conteos de coincidencias esperados y reales mostrados en tiempo real.
- Una **visualización de árbol AST** que muestra cómo el analizador representa su código de prueba.

Importe una regla existente desde el disco, o exporte una regla terminada y súbala a Datadog.

## Secret Scanning {#secret-scanning}

La extensión ejecuta [Secret Scanning][5] en los archivos fuente de su espacio de trabajo. Marca las credenciales expuestas, como claves de API, tokens y contraseñas, antes de que confirme sus cambios. El contenido de los archivos se escanea localmente y los hallazgos se muestran en el editor mientras escribe.

{{< img src="/ide_plugins/vscode/secret_scanning.mp4" alt="Vista previa de Secret Scanning" style="width:100%" video=true >}}

### Comience con Secret Scanning {#get-started-with-secret-scanning}

Secret Scanning está habilitado de forma predeterminada y se ejecuta en segundo plano cada vez que abre un archivo fuente. Para escanear una carpeta o un espacio de trabajo completo, haga clic derecho en una carpeta en el explorador de archivos y seleccione **Datadog Code Security > Analyze Folder** o **Analyze Workspace**.

{{< img src="/ide_plugins/vscode/secret-scanning-batch-analysis.png" alt="Informe de análisis por lotes con una sección de Secret Scanning que enumera los hallazgos por archivo" style="width:100%;" >}}

No se requiere configuración local; las reglas de escaneo se obtienen de Datadog. Se escanean todos los archivos de texto y se omiten los archivos binarios.

<div class="alert alert-info">Secret Scanning requiere que inicie sesión en Datadog, porque las reglas de detección se obtienen de su organización de Datadog.</div>

### Revisar hallazgos {#review-findings}

Los secretos detectados se muestran en tres lugares:

- **En línea en el editor**: cada hallazgo aparece como un subrayado en el secreto detectado, con una gravedad derivada de la prioridad de la regla.
- **Panel de problemas**: todos los hallazgos se enumeran con la fuente `Datadog`.
- **Visualización de información de archivos**: los hallazgos se agrupan junto con otros problemas de Code Security.

{{< img src="/ide_plugins/vscode/secret-scanning-findings.png" alt="Un secreto detectado que se muestra en línea en el editor con un diagnóstico al pasar el cursor, junto con el panel de Problemas y la Visualización de información de archivos" style="width:100%;" >}}

### Suprimir un hallazgo {#suppress-a-finding}

Para suprimir una detección individual, utilice la acción de código para el secreto marcado a fin de insertar un comentario `no-dd-secrets` en la línea superior. El comentario suprime todos los hallazgos de secretos en la línea siguiente.

### Activar o desactivar Secret Scanning {#turn-secret-scanning-on-or-off}

Para alternar Secret Scanning, ejecute el comando `Datadog: Turn on Secret Scanning` o `Datadog: Turn off Secret Scanning` desde la paleta de comandos (`Shift` + `Cmd/Ctrl` + `P`), o cambie la configuración `datadog.codeSecurity.setup.secretScanning.enabled`.

## IaC Scanning{#infrastructure-as-code-iac-scanning}

La extensión ejecuta reglas de [IaC Security][6] en los archivos IaC compatibles en su espacio de trabajo. Detecta configuraciones erróneas en la nube, como la falta de cifrado o un acceso demasiado permisivo. Los archivos se escanean localmente a medida que los edita y los hallazgos se muestran en tiempo real.

### Comience con IaC Scanning {#get-started-with-iac-scanning}

IaC Scanning está habilitado de forma predeterminada y se ejecuta automáticamente en segundo plano cada vez que abre o edita un archivo de IaC compatible. No se requiere una configuración de escáner por separado. La extensión respeta la configuración y las exclusiones de IaC en `code-security.datadog.yaml`. Para ver las opciones de configuración, consulte [Configure IaC Security][7]. Para ver las reglas disponibles, consulte [IaC Security Rules][8].

### Revisar hallazgos {#review-findings-1}

Las configuraciones erróneas de IaC se muestran en tres lugares:

- **En línea en el editor**: cada hallazgo se resalta en la línea afectada. Pase el cursor sobre él para visualizar la gravedad, la descripción y la regla.
- **Panel de problemas**: todos los hallazgos se enumeran con la fuente `Datadog`.
- **Visualización de información de archivos**: los hallazgos se agrupan en **Infraestructura como código** junto con otros Code Security issues.

{{< img src="/ide_plugins/vscode/iac_real_time_analysis.mp4" alt="Varios hallazgos de IaC resaltados en línea en archivos Dockerfile y Terraform, con un diagnóstico al pasar el cursor, una acción de corrección rápida para suprimir un hallazgo con un comentario y los hallazgos correspondientes en la Visualización de información de código y el panel de Problemas." style="width:100%" video=true >}}

### Suprimir un hallazgo {#suppress-a-finding-1}

Para suprimir los hallazgos de IaC en una línea, utilice la acción de código `Datadog: Ignore IaC violations on this line`. La extensión inserta un comentario `dd-iac-scan ignore-line` sobre la línea afectada utilizando la sintaxis de comentario adecuada para el archivo.

### Turn IaC Scanning on or off{#turn-iac-scanning-on-or-off}

Para alternar el IaC Scanning, cambie la configuración `datadog.iacScanning.setup.enabled`.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/code_security/static_analysis/
[2]: /es/security/code_security/static_analysis/static_analysis_rules/
[3]: /es/security/code_security/static_analysis/configuration/
[4]: /es/security/code_security/static_analysis/custom_rules/
[5]: /es/security/code_security/secret_scanning/
[6]: /es/security/code_security/iac_security/
[7]: /es/security/code_security/iac_security/configuration/
[8]: /es/security/code_security/iac_security/iac_rules/