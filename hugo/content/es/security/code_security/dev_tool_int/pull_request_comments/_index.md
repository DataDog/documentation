---
aliases:
- /es/static_analysis/github_pull_requests
- /es/code_analysis/github_pull_requests/
- /es/security/code_security/dev_tool_int/github_pull_requests/
description: Aprenda a configurar comentarios de solicitudes de extracción para repositorios
  analizados por Code Security.
title: Comentarios de solicitudes de extracción
---
## Descripción general {#overview}
Code Security publica comentarios directamente en las solicitudes de extracción (PR) en su sistema de gestión de código fuente (SCM) cuando se detectan vulnerabilidades en los repositorios habilitados. Esto le ayuda a ver y corregir problemas en contexto antes de fusionar el código. Los comentarios son conscientes de las diferencias, lo que significa que solo marcan problemas nuevos introducidos en las líneas modificadas en la solicitud de extracción.

Existen dos tipos de comentarios de solicitudes de extracción:
- **Comentario en línea**: Marca un hallazgo individual de Code Security en líneas específicas de código y sugiere una corrección (si está disponible).
        
    {{< img src="/code_security/github_inline_pr_comment_light.png" alt="Un bot de Datadog ha publicado un comentario en línea en una solicitud de extracción de GitHub marcando una \"Crítica: Vulnerabilidad de código\". El comentario sugiere reemplazar el código os.system(command) con os.system(shlex.quote(command)) para sanitizar la llamada al proceso." style="width:100%;" >}}

    For SAST vulnerabilities and code quality violations that don't have an available suggested fix, the inline comment includes a {{< ui >}}Fix with Cursor{{< /ui >}} link. Click it to open the pull request's branch in Cursor with a tailored remediation prompt for the finding. When a suggested fix is available, the comment shows a committable suggestion instead. To handle the Cursor deep link, install the [Datadog extension for VS Code and Cursor](/ide_plugins/vscode/?tab=cursor).

    {{< img src="code_security/dev_tool_int/pull_request_comments/fix-with-cursor.png" alt="Un comentario en línea de un bot de Datadog en una solicitud de extracción de GitHub que marca una infracción de calidad de código, con un enlace de Fix with Cursor debajo del hallazgo" style="width:100%;" >}}
- **Comentario de resumen**: Combina todos los hallazgos de Datadog en un solo comentario. Este comentario aparece solo si su solicitud de extracción contiene problemas que requieren atención. Después de que se abordan esos hallazgos, el comentario se edita automáticamente para confirmar que su solicitud de extracción ahora está limpia.
  
    {{< img src="/code_security/github_summary_comment_injections_light.png" alt="Un bot de Datadog ha publicado un comentario de resumen en una solicitud de extracción de GitHub. El comentario tiene una sección de \"Advertencias\" que enumera cuatro vulnerabilidades de código críticas, como inyecciones de SQL y de comandos, con enlaces a los archivos y líneas de código específicos." style="width:100%;" >}}

Puede configurar los comentarios de solicitudes de extracción a nivel de organización o de repositorio en [Repository Settings][7], con los siguientes controles:
- Habilitar/deshabilitar comentarios de solicitudes de extracción por tipo de análisis (SAST, SCA estático, Secrets, IaC)
- Establecer umbrales de gravedad para cada tipo de análisis
- Excluir hallazgos de archivos de prueba o dependencias de desarrollo/prueba
- Filtrar hallazgos identificados como falsos positivos por Bits AI

Obtenga más información sobre [los comentarios de PR en Datadog][11].

**Nota**: Los comentarios de PR no son verificaciones de PR. Para configurar las verificaciones, consulte [PR Gates][10].

## Requisitos previos {#prerequisites}
- Debe tener habilitada la integración de código fuente de Datadog para su proveedor. Los comentarios de PR son compatibles con los repositorios de [GitHub][2], [GitLab][8] y [Azure DevOps][9].  
- Sus repositorios deben tener habilitado(s) el/los producto(s) de Code Security relevantes. Para habilitar Code Security en la aplicación, navegue a la [{{< ui >}}Code Security{{< /ui >}} página de configuración][4].

<div class="alert alert-info">
  Los comentarios de PR no son compatibles con las solicitudes de extracción en repositorios públicos, ni en solicitudes de extracción dirigidas a una rama de destino en un repositorio diferente al de la rama fuente (es decir, repositorios bifurcados que intentan fusionarse en el repositorio principal).
</div>

## Configurar los comentarios de las solicitudes de extracción {#set-up-pull-request-comments}
Siga los pasos a continuación según su proveedor de gestión de código fuente.

{{< tabs >}}
{{% tab "GitHub" %}}

<div class="alert alert-info">Si utiliza el escaneo alojado en Datadog, habilite el interruptor para el tipo de escaneo deseado (por ejemplo, Static Code Analysis (SAST)) después de completar los pasos de configuración de GitHub.
Si utiliza <a href="/security/code_security/static_analysis/github_actions/">GitHub Actions</a> para ejecutar sus escaneos, active la acción en <code>push</code> para que los comentarios aparezcan una vez que se complete la configuración de GitHub.</div>

### Conecte su(s) cuenta(s) de GitHub a Datadog {#connect-your-github-accounts-to-datadog}
Para obtener instrucciones de configuración, lea la documentación de la [integración de código fuente de GitHub de Datadog][2].

### Cree o actualice una GitHub App {#create-or-update-a-github-app}
Si ya tiene una GitHub App conectada a Datadog, actualícela. De lo contrario, cree una nueva GitHub App.

<div class="alert alert-info">Los permisos que otorga a la aplicación de GitHub determinan qué funciones de la <a href="/integrations/github/">integración de GitHub</a> están disponibles para la configuración.</div>

#### Cree e instale una GitHub App {#create-and-install-a-github-app}

1. En Datadog, navegue a [{{< ui >}}Integrations{{< /ui >}} > {{< ui >}}GitHub Applications{{< /ui >}} > {{< ui >}}Add New GitHub Application{{< /ui >}}][3].
2. Complete los detalles requeridos, como el nombre de la organización de GitHub.
3. En {{< ui >}}Select Features{{< /ui >}}, marque la casilla {{< ui >}}Code Security: Pull Request Review Comments{{< /ui >}}.
4. En {{< ui >}}Edit Permissions{{< /ui >}}, verifique que el permiso {{< ui >}}Pull Requests{{< /ui >}} esté configurado en {{< ui >}}Read & Write{{< /ui >}}.
5. Haga clic en {{< ui >}}Create App in GitHub{{< /ui >}}.
6. Ingrese un nombre para su GitHub App y envíelo.
7. Haga clic en {{< ui >}}Install GitHub App{{< /ui >}}.
8. Elija en qué repositorios se debe instalar la GitHub App y luego haga clic en {{< ui >}}Install & Authorize{{< /ui >}}.

    {{< img src="ci/static-analysis-install-github-app.png" alt="Pantalla de instalación de GitHub App" style="width:50%;" >}}

#### Actualice una GitHub App existente {#update-an-existing-github-app}

1. En Datadog, navegue a [{{< ui >}}Integrations{{< /ui >}} > {{< ui >}}GitHub Applications{{< /ui >}}][5] y busque la GitHub App que desea usar para Code Security.
   {{< img src="ci/static-analysis-existing-github-app.png" alt="Ejemplo de un comentario de Static Code Analysis en una solicitud de extracción" style="width:90%;" >}}
2. En la pestaña {{< ui >}}Features{{< /ui >}}, consulte la sección {{< ui >}}Code Security: Pull Request Comments{{< /ui >}} para determinar si su GitHub App necesita permisos adicionales. Si es así, haga clic en {{< ui >}}Update permissions in GitHub{{< /ui >}} para editar la configuración de la GitHub App.
3. En {{< ui >}}Repository permissions{{< /ui >}}, establezca el acceso {{< ui >}}Pull Requests{{< /ui >}} en {{< ui >}}Read and write{{< /ui >}}.
   {{< img src="ci/static-analysis-pr-read-write-permissions.png" alt="El menú desplegable para el permiso de lectura y escritura de solicitudes de extracción" style="width:90%;" >}}
4. Debajo del encabezado {{< ui >}}Subscribe to events{{< /ui >}}, marque la casilla {{< ui >}}Pull request{{< /ui >}}.
   {{< img src="ci/static-analysis-pr-review-comment.png" alt="La casilla de verificación para el permiso de comentarios de revisión de solicitudes de extracción" style="width:90%;" >}}


[2]: /es/integrations/github/
[3]: https://app.datadoghq.com/integrations/github/add
[5]: https://app.datadoghq.com/integrations/github/configuration

{{% /tab %}}
{{% tab "GitLab" %}}

Consulte las instrucciones de configuración del código fuente de GitLab[8] para conectar los repositorios de GitLab a Datadog.

[8]: /es/integrations/gitlab-source-code/

{{% /tab %}}
{{% tab "DevOps" %}}

Consulte las [instrucciones de configuración del código fuente de Azure][9] para conectar los repositorios de Azure DevOps a Datadog.

[9]: /es/integrations/azure-devops-source-code/#source-code-functionality

{{% /tab %}}
{{< /tabs >}}

## Opciones de configuración {#configuration-options}

Antes de habilitar los comentarios en las PR, asegúrese de que **al menos una capacidad de análisis de Code Security esté habilitada en el repositorio.** Incluso si los comentarios en las PR están configurados a nivel de organización, solo se agregan en los repositorios donde un tipo de análisis compatible (por ejemplo, SAST, SCA o IaC) está activo. Los repositorios sin ningún tipo de análisis habilitado no recibirán comentarios en las PR.

Los comentarios en las PR se pueden configurar a nivel de organización o a nivel de repositorio:
- **Nivel de organización:** La configuración se aplica a todos los repositorios de la organización que tengan al menos una capacidad de análisis habilitada.
- **Nivel de repositorio:** La configuración anula los valores predeterminados de la organización para el repositorio seleccionado.

Al configurar los comentarios en las PR, puede:
- Habilitar o deshabilitar comentarios para tipos de análisis específicos (SAST, SCA, IaC).
- Establecer umbrales de gravedad mínima para controlar cuándo aparecen los comentarios.
- Excluir comentarios sobre hallazgos en archivos de prueba o dependencias de desarrollo/prueba para evitar el ruido de problemas de baja prioridad.
- Filtrar los hallazgos identificados como falsos positivos por Bits AI.

## Configurar los comentarios en las PR a nivel de organización {#configure-pr-comments-at-the-organization-level}

1. En Datadog, navegue a [{{< ui >}}Security{{< /ui >}} > {{< ui >}}Code Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][7].
1. En {{< ui >}}Repository Settings{{< /ui >}}, haga clic en {{< ui >}}Global PR Comment Configuration{{< /ui >}}.
1. Configure los ajustes:
    - {{< ui >}}Enable PR comments for all scan types and severities{{< /ui >}}: Habilite esto para aplicar comentarios de PR en todos los tipos y niveles de gravedad.
    - {{< ui >}}Enable for Static Analysis (SAST){{< /ui >}}: Active esta opción para habilitar los comentarios de PR para SAST. Si está habilitado, especifique un umbral mínimo de gravedad. Además, seleccione {{< ui >}}Exclude PR comments if violations are detected in test files{{< /ui >}} para evitar comentarios sobre problemas encontrados en archivos de prueba. Seleccione {{< ui >}}Filter out findings identified as false positives by Bits AI{{< /ui >}} para excluir los hallazgos que Bits AI ha identificado como falsos positivos. Seleccione {{< ui >}}Include public repositories{{< /ui >}} para comentar en repositorios públicos.
    - {{< ui >}}Enable for Software Composition Analysis (SCA){{< /ui >}}: Active esta opción para habilitar los comentarios de PR para SCA. Si está habilitado, especifique un umbral mínimo de gravedad. Además, seleccione {{< ui >}}Exclude PR comments if violations are detected in test or dev dependencies{{< /ui >}} para evitar comentarios sobre problemas encontrados en dependencias que solo existen en entornos de desarrollo o prueba. Seleccione {{< ui >}}Include public repositories{{< /ui >}} para comentar en repositorios públicos.
    - {{< ui >}}Enable for Secret Scanning (Secrets){{< /ui >}}: Active esta opción para habilitar los comentarios de PR para Secrets. Si está habilitado, especifique un umbral mínimo de gravedad. Además, seleccione {{< ui >}}Exclude PR comments if secrets are detected in test files{{< /ui >}} para evitar comentarios sobre secretos encontrados en archivos de prueba. Seleccione {{< ui >}}Include public repositories{{< /ui >}} para comentar en repositorios públicos.
    - {{< ui >}}Enable for Infrastructure-as-Code (IaC){{< /ui >}}: Active esta opción para habilitar los comentarios de PR para IaC. Si está habilitado, especifique un umbral mínimo de gravedad. Además, seleccione {{< ui >}}Exclude PR comments if violations are detected in test files{{< /ui >}} para evitar comentarios sobre problemas encontrados en archivos de prueba. Seleccione {{< ui >}}Filter out findings identified as false positives by Bits AI{{< /ui >}} para excluir los hallazgos que Bits AI ha identificado como falsos positivos. Seleccione {{< ui >}}Include public repositories{{< /ui >}} para comentar en repositorios públicos.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

## Configure los comentarios de PR a nivel de repositorio {#configure-pr-comments-at-the-repository-level}

1. En Datadog, navegue a [{{< ui >}}Security{{< /ui >}} > {{< ui >}}Code Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][7].
1. En {{< ui >}}Repository Settings{{< /ui >}}, seleccione un repositorio de la lista.
1. Configure los ajustes:
    - {{< ui >}}Enable PR comments for all scan types and severities{{< /ui >}}: Habilite esto para aplicar comentarios de PR en todos los tipos y niveles de gravedad.
    - {{< ui >}}Enable for Static Analysis (SAST){{< /ui >}}: Active esta opción para habilitar los comentarios de PR para SAST. Si está habilitado, especifique un umbral mínimo de gravedad. Además, seleccione {{< ui >}}Exclude PR comments if violations are detected in test files{{< /ui >}} para evitar comentarios sobre problemas encontrados en archivos de prueba. Seleccione {{< ui >}}Filter out findings identified as false positives by Bits AI{{< /ui >}} para excluir los hallazgos que Bits AI ha identificado como falsos positivos.
    - {{< ui >}}Enable for Software Composition Analysis (SCA){{< /ui >}}: Active esta opción para habilitar los comentarios de PR para SCA. Si está habilitado, especifique un umbral mínimo de gravedad. Además, seleccione {{< ui >}}Exclude PR comments if violations are detected in test or dev dependencies{{< /ui >}} para evitar comentarios sobre problemas encontrados en dependencias que solo existen en entornos de desarrollo o prueba.
    - {{< ui >}}Enable for Secret Scanning (Secrets){{< /ui >}}: Active esta opción para habilitar los comentarios de PR para Secrets. Si está habilitado, especifique un umbral mínimo de gravedad. Además, seleccione {{< ui >}}Exclude PR comments if secrets are detected in test files{{< /ui >}} para evitar comentarios sobre secretos encontrados en archivos de prueba.
    - {{< ui >}}Enable for Infrastructure-as-Code (IaC){{< /ui >}}: Active esta opción para habilitar los comentarios de PR para IaC. Si está habilitado, especifique un umbral mínimo de gravedad. Además, seleccione {{< ui >}}Exclude PR comments if violations are detected in test files{{< /ui >}} para evitar comentarios sobre problemas encontrados en archivos de prueba. Seleccione {{< ui >}}Filter out findings identified as false positives by Bits AI{{< /ui >}} para excluir los hallazgos que Bits AI ha identificado como falsos positivos.
    - {{< ui >}}Block all comments in this repository{{< /ui >}}: Active esta opción para desactivar todos los comentarios para este repositorio, anulando la configuración global.
1. Haga clic en {{< ui >}}Save Configuration{{< /ui >}}.

[1]: /es/security/code_security/
[2]: /es/integrations/github/
[3]: https://app.datadoghq.com/integrations/github/add
[4]: https://app.datadoghq.com/security/configuration/code-security/setup
[5]: https://app.datadoghq.com/integrations/github/configuration
[6]: /es/security/code_security/static_analysis/github_actions/
[7]: https://app.datadoghq.com/security/configuration/code-security/settings
[8]: /es/integrations/gitlab-source-code/
[9]: https://docs.datadoghq.com/es/integrations/azure-devops-source-code/#source-code-functionality
[10]: /es/quality_gates/?tab=staticanalysis#setup
[11]: /es/integrations/guide/source-code-integration/?tab=codesecurity#pr-comments