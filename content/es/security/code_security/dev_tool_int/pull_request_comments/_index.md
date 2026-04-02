---
aliases:
- /es/static_analysis/github_pull_requests
- /es/code_analysis/github_pull_requests/
- /es/security/code_security/dev_tool_int/github_pull_requests/
description: Aprende a configurar comentarios de solicitudes de incorporación de cambios
  para repositorios explorados por Code Security.
title: Comentarios de solicitudes de incorporación de cambios
---

## Información general
Code Security puede publicar comentarios directamente en las solicitudes de incorporación de cambios de tu sistema de gestión de código (SCM) source (fuente) cuando se detecten vulnerabilidades. Esto te ayuda a ver y solucionar los problemas en contexto antes de fusionar el código. Los comentarios tienen reconocimiento diferente, lo que significa que solo marcan los nuevos problemas introducidos en las líneas modificadas en la solicitud de incorporación de cambios.

Existen dos tipos de comentarios de solicitudes de incorporación de cambios:
- **Comentario en línea**: Marca una conclusión individual de Code Security en líneas específicas de código y sugiere una corrección (si está disponible).

    {{< img src="/code_security/github_inline_pr_comment_light.png" alt="A Datadog bot has posted an inline comment on a GitHub pull request flagging a \"Critical: Code Vulnerability\". Este comentario sugiere sustituir el código os.system(command) con os.system(shlex.quote(command)) para depurar la llamada de proceso." style="width:100%;" >}}
- **Comentario resumido**: Combina todas las conclusiones de Datadog en un único comentario. 

    {{< img src="/code_security/github_summary_comment_injections_light.png" alt="Un bot de Datadog ha publicado un comentario resumido en una solicitud de incorporación de cambios de GitHub. El comentario tiene una sección \"Warnings\" (Advertencias) en la que se enumeran vulnerabilidades críticas de código, como SQL e inserciones de comandos, con vínculos a los archivos y líneas específicas de código." style="width:100%;" >}}

Puedes configurar los comentarios de PR a nivel de la organización o del repositorio en [Configuración del repositorio][7], con los siguientes controles:
- Activación/desactivación de comentarios de PR por tipo de exploración (pruebas de seguridad de aplicaciones estáticas (SAST), SCA estático, secretos, IaC)
- Configuración de umbrales de gravedad para cada tipo de exploración
- Exclusión de los resultados de los archivos test o de las dependencias desarrollo/test 

**Nota**: Los comentarios de PR no son checks de PR. Para configurar las checks, consulta [Quality Gates][10].

## Requisitos previos
- Debes tener activada la integración de código source (fuente) de Datadog para tu proveedor. Los comentarios de PR son compatibles con los repositorios de [GitHub][2], [GitLab][8] y Azure DevOps ([en vista previa][9]).  
- Tus repositorios deben tener activados los productos Code Security correspondientes. Para actvar Code Security en la aplicación, ve a la [page (página) de configuración de **Code Security**][4].  

## Configurar comentarios de solicitud de incorporación de cambios
Sigue los pasos que se indican a continuación en función de tu proveedor de gestión de códigos source (fuente).

{{< tabs >}}
{{% tab "GitHub" %}}

<div class="alert alert-info">Si utilizas la exploración alojada en Datadog, activa la alternancia del tipo de exploración que desees (por ejemplo, Análisis estático de código (pruebas de seguridad de aplicaciones estáticas (SAST))) una vez completados los pasos de configuración de GitHub.
Si utilizas <a href="/security/code_security/static_analysis/github_actions/">Acciones de GitHub</a> para ejecutar tus exploraciones, activa la opción acción en <code>inserción</code> para que aparezcan los comentarios una vez completada la configuración de GitHub.</div>

### Conecta tu(s) cuenta(s) de GitHub a Datadog
Para obtener instrucciones de configuración, lee la documentación de [integración de código source (fuente) de Datadog y GitHub][2].

### Crear o actualizar una aplicación de GitHub
Si ya tienes una aplicación de GitHub conectada a Datadog, actualízala. De lo contrario, crea una nueva aplicación de GitHub.

<div class="alert alert-info">Los permisos que concedas a la aplicación de GitHub determinan qué funciones de <a href="/integrations/github/">integración de GitHub</a> están disponibles para la configuración.</div>

#### Crear e instalar una aplicación GitHub

1. En Datadog, ve a [**Integraciones** > **Aplicaciones GitHub** > **Añadir una nueva aplicación GitHub**][3].
2. Rellena los datos necesarios, como el nombre de la organización GitHub.
3. En **Seleccionar función**, marca la casilla **Code Security: Comentarios de revisión de solicitudes de extracción**.
4. En **Editar permisos**, comprueba que el permiso **Solicitudes de extracción** está configurado para **Lectura y escritura**.
5. Haz clic en **Create App in GitHub** (Crear aplicación en GitHub).
6. Introduce un nombre para tu aplicación y envíalo.
7. Haz clic en **Install GitHub App** (Instalar aplicación GitHub).
8. Elige en qué repositorios debe instalarse la aplicación y luego haz clic en **Install & Authorize** (Instalar y autorizar).

    {{< img src="ci/static-analysis-install-github-app.png" alt="Pantalla de instalación de la aplicación de GitHub" style="width:50%;" >}}

#### Actualizar una GitHub App existente

1. En Datadog, ve a [**Integraciones > Aplicaciones GitHub**][5] y busca la aplicación GitHub que quieres utilizar para la seguridad del código.
   {{< img src="ci/static-analysis-existing-github-app.png" alt="Ejemplo de comentario de Static Code Analysis en una solicitud de extracción" style="width:90%;" >}}
2. En la pestaña **Características**, observa la sección **Code Security: Comentarios de solicitudes de extracción** para determinar si tu aplicación GitHub necesita permisos adicionales. Si es así, haz clic en **Update permissions in GitHub** (Actualizar permisos en GitHub) para editar la configuración de la aplicación.
3. En **Permisos de repositorio**, configura el acceso a **Solicitudes de extracción** como **Lectura y escritura**.
   {{< img src="ci/static-analysis-pr-read-write-permissions.png" alt="Desplegable correspondiente al permiso de lectura y escritura en solicitudes de extracción" style="width:90%;" >}}
4. Bajo el título **Suscribirse a eventos**, marca la casilla **Solicitud de extracción**.
   {{< img src="ci/static-analysis-pr-review-comment.png" alt="Casilla correspondiente al permiso para comentarios de revisión en solicitudes de extracción" style="width:90%;" >}}


[2]: /es/integrations/github/
[3]: https://app.datadoghq.com/integrations/github/add
[5]: https://app.datadoghq.com/integrations/github/configuration

{{% /tab %}}
{{% tab "GitLab" %}}

Consulta las instrucciones de configuración de l[Código source (fuente) de GitLab][8] para conectar GitLab a Datadog.

[8]: /es/integrations/gitlab-source-code/

{{% /tab %}}
{{% tab "Azure DevOps" %}}

Azure DevOps para Code Security está en vista previa. [Solicita acceso para unirte a la vista previa][9].

[9]: https://www.datadoghq.com/product-preview/azure-devops-integration-code-security/

{{% /tab %}}
{{< /tabs >}}

## Opciones de configuración

Antes de activar los comentarios de PR, asegúrate de que **al menos una capacidad de exploración de Code Security esté activada en el repositorio.** Incluso si los comentarios de PR están configurados a nivel de la organización, solo se añaden en repositorios donde está activo un tipo de exploración admitido (por ejemplo, pruebas de seguridad de aplicaciones estáticas (SAST), SCA o IaC). Los repositorios sin ningún tipo de exploración activado no recibirán comentarios de PR.

Los comentarios de PR pueden configurarse a nivel de la organización o a nivel del repositorio:
- **Nivel de la organización:** La configuración se aplica a todos los repositorios de la organización que tengan activada al menos una capacidad de exploración.
- **Nivel del repositorio:** La configuración sustituye los valores predeterminados de la organización para el repositorio seleccionado.

Al configurar los comentarios de PR, puedes:
- Activar o desactivar comentarios para tipos específicos de exploración (pruebas de seguridad de aplicaciones estáticas (SAST), SCA, IaC).
- Configura umbrales mínimos de gravedad para controlar cuándo aparecen los comentarios.
- Excluye los comentarios de los resultados en los archivos test o en las dependencias desarrollo/test para evitar el ruido de los problemas de baja prioridad.

## Configurar los comentarios de PR a nivel de la organización

1. En Datadog, ve a [**Seguridad** > **Code Security** > **Configuración**][7].
1. En **Configuración del repositorio**, haz clic en **Global PR Comment Configuration** (Configuración global de comentarios en solicitudes de extracción).
1. Configura los parámetros:
    - **Activar comentarios en solicitudes de extracción para todos los tipos y gravedades de análisis**: Habilita esta opción para aplicar comentarios en solicitudes de extracción para todos los tipos y gravedades.
    - **Activar para Static Analysis (SAST)**: Activa esta opción para habilitar comentarios en solicitudes de extracción para SAST. Si está activada, especifica un umbral de gravedad mínimo. Además, selecciona **Excluir comentarios en solicitudes de extracción, si se detectan infracciones en archivos de test** para evitar comentarios sobre problemas encontrados en archivos de test.
    - **Activar para Software Composition Analysis (SCA)**: Activa esta opción para habilitar comentarios en solicitudes de extracción para SCA. Si está activada, especifica un umbral de gravedad mínimo. Además, selecciona **Excluir comentarios en solicitudes de extracción, si se detectan infracciones en dependencias de test o desarrollo** para evitar comentarios sobre problemas encontrados en dependencias existentes, sólo en entornos de test o desarrollo.
    - **Activar para Infrastructure-as-Code (IaC)**: Activa esta opción para habilitar comentarios en solicitudes de extracción para IaC. Si está activada, especifica un umbral de gravedad mínimo.
1. Haz clic en **Save** (Guardar).

## Configurar comentarios de PR a nivel del repositorio

1. En Datadog, ve a [**Seguridad** > **Code Security** > **Configuración**][7].
1. En **Configuración del repositorio**, selecciona un repositorio de la lista.
1. Configura los parámetros:
    - **Activar comentarios en solicitudes de extracción para todos los tipos y gravedades de análisis**: Habilita esta opción para aplicar comentarios en solicitudes de extracción para todos los tipos y gravedades.
    - **Activar para Static Analysis (SAST)**: Activa esta opción para habilitar comentarios en solicitudes de extracción para SAST. Si está activada, especifica un umbral de gravedad mínimo. Además, selecciona **Excluir comentarios en solicitudes de extracción, si se detectan infracciones en archivos de test** para evitar comentarios sobre problemas encontrados en archivos de test.
    - **Activar para Software Composition Analysis (SCA)**: Activa esta opción para habilitar comentarios en solicitudes de extracción para SCA. Si está activada, especifica un umbral de gravedad mínimo. Además, selecciona **Excluir comentarios en solicitudes de extracción, si se detectan infracciones en dependencias de test o desarrollo** para evitar comentarios sobre problemas encontrados en dependencias existentes, sólo en entornos de test o desarrollo.
    - **Activar para Infrastructure-as-Code (IaC)**: Activa esta opción para habilitar comentarios en solicitudes de extracción para IaC. Si está activada, especifica un umbral de gravedad mínimo.
    - **Bloquear todos los comentarios en este repositorio**: Activa esta opción para desactivar todos los comentarios de este repositorio, anulando la configuración global.
1. Haz clic en **Save configuration** (Guardar configuración).

[1]: /es/security/code_security/
[2]: /es/integrations/github/
[3]: https://app.datadoghq.com/integrations/github/add
[4]: https://app.datadoghq.com/security/configuration/code-security/setup
[5]: https://app.datadoghq.com/integrations/github/configuration
[6]: /es/security/code_security/static_analysis/github_actions/
[7]: https://app.datadoghq.com/security/configuration/code-security/settings
[8]: /es/integrations/gitlab-source-code/
[9]: https://www.datadoghq.com/product-preview/azure-devops-integration-code-security/
[10]: /es/quality_gates/?tab=staticanalysis#setup