---
description: Aprenda a usar el Análisis de registros para identificar las causas raíz
  más comunes de fallas en las canalizaciones de CI.
further_reading:
- link: /continuous_integration/search/#pipeline-details-and-executions
  tag: Documentación
  text: Aprenda a buscar y administrar las ejecuciones de sus canalizaciones
- link: /continuous_integration/guides/identify_highest_impact_jobs_with_critical_path
  tag: Documentación
  text: Identifique trabajos de CI en la ruta crítica para reducir la duración de
    la canalización
title: Use el Análisis de registros para identificar las causas raíz en trabajos de
  CI fallidos.
---
## Descripción general {#overview}

Esta guía explica cómo usar el Análisis de registros para determinar la causa raíz más común de los trabajos de CI fallidos. Esto puede ayudar a mejorar la experiencia del usuario con las canalizaciones de CI.

Datadog también utiliza este clasificador para potenciar los [reintentos automáticos de trabajos][10], que vuelven a ejecutar los trabajos cuyas fallas probablemente sean transitorias.

### Comprender el Análisis de registros {#understanding-logs-analysis}

CI Visibility utiliza un modelo LLM para generar mensajes de error mejorados y categorizarlos con un dominio y subdominio, según los registros relevantes recopilados de cada trabajo de CI fallido.

{{< img src="continuous_integration/failed_jobs_ai_gen_errors.png" alt="Trabajos de CI fallidos con errores generados por LLM" width="90%">}}

#### ¿Cómo identifica CI Visibility los registros relevantes de un trabajo de CI? {#how-does-ci-visibility-identify-the-relevant-logs-of-a-ci-job}

CI Visibility considera que una línea de registro es relevante cuando no ha aparecido en los registros recopilados de las ejecuciones exitosas anteriores de ese trabajo de CI. La relevancia de los registros solo se calcula para los registros provenientes de trabajos de CI fallidos.

Puede verificar si una línea de registro se ha considerado relevante usando la etiqueta `@relevant:true` en el Explorador de registros.

#### ¿Qué información utiliza el modelo LLM como entrada? {#what-information-does-the-llm-model-use-as-input}

Si un trabajo de CI fallido tiene registros relevantes, el modelo LLM utiliza las últimas 100 líneas de registro relevantes como entrada. Si un trabajo de CI fallido no tiene registros relevantes, CI Visibility envía las últimas 100 líneas de registro.

Cada línea de registro se escanea previamente para redactar cualquier información potencialmente confidencial antes de ser utilizada.

<div class="alert alert-info">
El modelo LLM puede clasificar errores con mensajes similares en subdominios distintos pero relacionados. Por ejemplo, si el mensaje de error es <code>Cannot connect to docker daemon</code>, se clasifica generalmente bajo <code>domain:platform</code> y <code>subdomain:network</code>. Sin embargo, el modelo LLM a veces puede clasificarlo bajo <code>subdomain:infrastructure</code> en su lugar.
</div>

#### Dominios y subdominios {#domains-and-subdomains}

Los errores se clasifican con un dominio y un subdominio:

##### Dominios {#domains}

| Dominio   | Descripción                                                                                                                                                       |
|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `code`     | Fallos causados por el código que se está compilando y probando en la canalización de CI. Deben ser corregidos por el desarrollador que modificó el código.           |
| `platform` | Fallos causados por razones externas al código que se está compilando y probando. Estos fallos pueden provenir del proveedor de CI, la infraestructura subyacente o dependencias externas. No están relacionados con los cambios de código del desarrollador y, a menudo, deben ser corregidos por el equipo responsable de todo el sistema de CI. |
| `unknown`  | Se utiliza cuando los registros no revelan una causa raíz clara del fallo del trabajo.                                                                                                |

##### Subdominios {#subdomains}

Haga clic en una pestaña de dominio para ver los subdominios correspondientes:

{{< tabs >}}
{{% tab "Código" %}}

| Subdominio | Causa                                     | Ejemplos                                                                                                                   |
|-----------|-------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| `build`     | Errores de compilación o construcción. | `Compilation error in processor_test.go:28:50`                                                                             |
| `test`      | Fallas de prueba.              | `7 failed tests. Error: Can't find http.request.headers.x-amzn-trace-id in span's meta.`                                   |
| `quality`   | Fallas de formato o linting.     | `Detected differences in files after running 'go fmt'. To fix, run 'go fmt' on the affected files and commit the changes.` |
| `security`  | Violaciones de seguridad.         | `Security violation: Use of weak SHA1 hash for security. Consider usedforsecurity=False.`                                  |

{{% /tab %}}
{{% tab "Plataforma" %}}

| Subdominio      | Causa                                                                                         | Ejemplos                                                                                                                                              |
|----------------|-----------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| `assembly`       | Errores en la generación de artefactos o errores de ensamblaje durante la ejecución de un script. | `Artifact generation failed due to rejected file 'domains/backend/cart-shopping-proto/mod.info' that exists in the repository.`                       |
| `deployment`     | Errores durante implementaciones, o relacionados con configuraciones de implementaciones.             | `Subprocess command returned non-zero exit status 1 during deployment config generation.`                                                             |
| `infrastructure` | Errores relacionados con la infraestructura en la que se ejecutó el trabajo.                 | `Invalid docker image reference format for tag 'registry.gitlab.com/cart-shopping/infrastructure/backend-deploy-image:AE/create-kubectl-image'.`      |
| `network`        | Errores de conectividad con otras dependencias.                                  | `Connection refused when accessing localhost:8080.`                                                                                                   |
| `credentials`    | Errores de autenticación; credenciales faltantes o incorrectas.                          | `Failed to get image auth for docker.elastic.co. No credentials found. Unable to pull image 'docker.elastic.co/elasticsearch/elasticsearch:7.17.24'.` |
| `dependencies`   | Errores al instalar o actualizar dependencias necesarias para ejecutar el trabajo.       | `Package 'systemd-container' cannot be installed. Depends on 'libsystemd-shared' v255.4-1ubuntu8.4 but v255.4-1ubuntu8.5 is to be installed.`         |
| `git`            | Errores al ejecutar comandos de git.                                                   | `Automatic merge failed due to conflicts between branches 'cart-shopping-new-feature' and 'staging'.`                                                 |
| `checks`         | Errores en el cumplimiento requerido de las verificaciones durante la ejecución del trabajo de CI.            | `Release note not found during changelog validation`                                                                                                  |
| `setup`          | Errores al configurar el trabajo de CI.                                                 | `Execution failed during the TLS setup or client dialing process.`                                                                                    |
| `script`         | Errores sintácticos en el script del trabajo de CI.                                    | `No tests ran due to file or directory not found.`                                                                                                    |

{{% /tab %}}
{{% tab "Desconocido" %}}

| Subdominio | Descripción                     | Ejemplo                                                 |
|-----------|---------------------------------|---------------------------------------------------------|
| desconocido   | No se pudo categorizar el error. | `Job failed with exit code 1. View full logs or trace.` |

{{% /tab %}}
{{< /tabs >}}

### Proveedores de CI compatibles {#supported-ci-providers}

El análisis de registros está disponible para los siguientes proveedores de CI:

* [Azure Pipelines][8]
* [Buildkite][12]
* [CircleCI][13]
* [GitHub Actions][1]
* [GitLab][2]

**Nota:** El análisis de registros puede requerir una configuración específica del proveedor de CI. Consulte la sección **Análisis de registros** en la [página de configuración de Pipeline Visibility][6] para su proveedor.

<div class="alert alert-info">Si le interesa el análisis de registros pero su proveedor de CI aún no es compatible, complete <a href="https://forms.gle/vSrqS5QwitgHf9wG6" target="_blank">este formulario</a>.</div>

## Identifique los errores más recurrentes en sus canalizaciones de CI {#identify-the-most-recurrent-errors-in-your-ci-pipelines}

### Uso de la página de estado de CI {#using-the-ci-health-page}

[CI Health][3] proporciona una visión general de alto nivel del estado y el rendimiento de sus canalizaciones de CI. Ayuda a los equipos de DevOps e ingeniería a hacer un seguimiento de los trabajos de CI, detectar fallos y optimizar el rendimiento de las compilaciones.

En esta página, puede ver un desglose de los errores en sus canalizaciones de CI dividido por dominio de error. Haga clic en una canalización de CI y revise la columna {{< ui >}}Breakdown{{< /ui >}} en la sección {{< ui >}}Failed Executions{{< /ui >}}.

{{< img src="continuous_integration/ci_health_failed_executions_breakdown.png" alt="Desglose del análisis de fallos de trabajos de CI en CI Health" width="90%">}}

### Uso de facetas {#using-facets}

Utilice las facetas `@error.message`, `@error.domain` y `@error.subdomain` para identificar los errores más recurrentes en sus canalizaciones de CI. Al usar esas facetas, puede crear Dashboards y cuadernos personalizados.

{{< img src="continuous_integration/failed_jobs_ai_gen_errors_facets.png" alt="Trabajos de CI fallidos filtrados por error.domain y error.subdomain" width="90%">}}

Estas facetas solo están disponibles cuando se utiliza `ci_level:job` en una consulta. Si no se puede calcular el análisis de fallos de los trabajos de CI (por ejemplo, si no está utilizando un proveedor de CI compatible), estas facetas contendrán la información de error proveniente del proveedor de CI.

### Uso de la plantilla de Dashboard {#using-the-dashboard-template}

Puede importar la plantilla de Dashboard {{< ui >}}CI Visibility - CI Jobs Failure Analysis{{< /ui >}}:

1. Abra la plantilla de Dashboard [civisibility-ci-jobs-failure-analysis-dashboard.json][4] y copie el contenido en el portapapeles.
2. Cree un [Nuevo Dashboard][5] en Datadog.
3. Pegue el contenido copiado en el nuevo Dashboard.
4. Guarde el Dashboard.

{{< img src="continuous_integration/ci_jobs_failure_analysis_dashboard.png" alt="Dashboard de análisis de registros" width="90%">}}

### Uso de comentarios de PR {#using-pr-comments}

Puede agregar el análisis de registros en sus comentarios de PR.

{{< img src="continuous_integration/pr_comment.png" alt="Comentario de PR con análisis de registros incluido" width="90%">}}

Para que se publiquen los PR Comments, sus repositorios deben estar integrados con Datadog. Para obtener más información, consulte [Conecte sus repositorios Git a Datadog][7].

Habilite PR Comments desde [**CI/CD Optimization** > **Settings** > **Repositories**][11]:

1. Elija dónde aplicar la configuración:
   - Seleccione la pestaña **Organization** para habilitar PR Comments para cada repositorio de forma predeterminada.
   - Seleccione la pestaña **Repository-specific** para habilitar PR Comments para un solo repositorio.
1. En **General**, active **PR Comments**.


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]:/es/continuous_integration/pipelines/github/
[2]:/es/continuous_integration/pipelines/gitlab/
[3]:https://app.datadoghq.com/ci/pipelines/health/
[4]:/es/resources/json/civisibility-ci-jobs-failure-analysis-dashboard.json
[5]:/es/dashboards/
[6]:/es/continuous_integration/pipelines/#setup
[7]:/es/integrations/guide/source-code-integration/#connect-your-git-repositories-to-datadog
[8]:/es/continuous_integration/pipelines/azure/
[10]:/es/continuous_integration/pipelines/automatic_retries/
[11]:https://app.datadoghq.com/ci/settings/ci-cd/repositories
[12]:/es/continuous_integration/pipelines/buildkite/
[13]:/es/continuous_integration/pipelines/circleci/