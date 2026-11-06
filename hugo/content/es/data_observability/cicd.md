---
description: Verifique automáticamente las solicitudes de extracción que modifican
  modelos de dbt para detectar el impacto aguas abajo y la desviación de datos antes
  de fusionarlas.
further_reading:
- link: /data_observability/
  tag: Documentación
  text: Descripción general de Data Observability
- link: /data_observability/data_catalog/
  tag: Documentación
  text: Catálogo de datos
- link: /data_observability/lineage/
  tag: Documentación
  text: Linaje
- link: /data_observability/quality_monitoring/
  tag: Documentación
  text: Quality Monitoring
- link: /data_observability/jobs_monitoring/
  tag: Documentación
  text: Jobs Monitoring
title: CI/CD
---
## Descripción general {#overview}

{{< img src="data_observability/cicd/cicd-overview.png" alt="La página de informe de la función CI/CD" style="width:100%;" >}}

Las verificaciones de CI/CD de Data Observability se ejecutan automáticamente cuando abre una solicitud de extracción (PR) que modifica modelos de dbt. Las verificaciones le brindan la información que necesita para decidir si un cambio es seguro para fusionarlo.

Datadog publica los resultados como un comentario en su PR, y el comentario se actualiza cada vez que envía nuevos cambios. También hay un informe completo disponible en Datadog, y obtendrá un enlace al mismo en el comentario de la solicitud de extracción.

## Tipos de verificación {#check-types}

### Linaje de impacto {#impact-lineage}

El linaje de impacto crea un gráfico de todo lo que se encuentra aguas abajo de los modelos de dbt modificados. Úselo para evaluar el alcance de un cambio antes de fusionarlo. Vea qué tablas, paneles y otros consumidores dependen de los modelos que modificó, y dirija la revisión a los propietarios correctos.

Consulte [Linaje][1] para obtener más detalles sobre cómo Datadog crea y navega por los gráficos de linaje.

### Detección de desviaciones {#drift-detection}

La detección de desviaciones compara los datos producidos por sus modelos antes y después de sus cambios mediante una serie de verificaciones estadísticas. Úsela para confirmar que un cambio en el modelo produce el resultado esperado, o para detectar efectos secundarios no deseados, como cambios significativos en el recuento de filas, cambios en la tasa de nulos o cambios de cardinalidad en los valores de una columna.

## Configuración {#setup}

### 1. Conecte su proveedor de control de código fuente y su proyecto de dbt {#1-connect-your-source-control-provider-and-dbt-project}

1. Conecte su [proveedor de control de código fuente][2]. Las verificaciones de CI/CD admiten GitHub, GitLab, Bitbucket Cloud y Azure DevOps.
2. Conecte la [cuenta de fuente de datos compatible][3] donde se ejecutan sus modelos de dbt.
3. Conecte su proyecto de [dbt Cloud][4] o [dbt Core][5] a Datadog. También puede conectar su proyecto de dbt mientras configura las verificaciones de CI/CD.

### 2. Seleccione su proyecto de dbt y su repositorio {#2-select-your-dbt-project-and-repository}

1. Desde la configuración de CI/CD, haga clic en {{< ui >}}Add CI/CD Checks{{< /ui >}}.
2. Seleccione el proyecto de dbt para el que desea agregar verificaciones.
3. Seleccione el trabajo principal para el proyecto. Este es el trabajo con mayor conocimiento de su esquema de dbt.
4. Si Datadog no infiere automáticamente el repositorio de su proveedor de control de código fuente, selecciónelo manualmente.

{{< img src="data_observability/cicd/cicd-connection.png" alt="La página de creación de la función CI/CD" style="width:100%;" >}}

#### Configuración avanzada {#advanced-settings}

Si su proyecto de dbt no se encuentra en la raíz de su repositorio, puede especificar la ruta a su proyecto de dbt en la configuración avanzada.

### 3. Configurar verificaciones {#3-configure-checks}

Puede habilitar cada verificación de forma independiente. Habilitar todas las verificaciones genera los informes más completos.

#### Linaje de impacto {#impact-lineage-1}

El linaje de impacto genera un gráfico de los activos aguas abajo que pueden verse afectados por los cambios en su modelo.

##### Configuración general {#general-settings}

| Configuración                            | Descripción                                                          |
| ---------------------------------- | -------------------------------------------------------------------- |
| `Run on Draft Pull/Merge Requests` | Habilite esta opción para ejecutar la verificación en solicitudes de extracción o fusión preliminares. |

#### Detección de desviaciones {#drift-detection-1}

La detección de desviaciones compara el estado actual de sus datos en la rama con una línea base y marca cualquier desviación. Datadog utiliza las ejecuciones de dbt de su canalización de CI como activadores para las verificaciones de detección de desviaciones. Para **dbt Core**, debe enviar eventos de OpenLineage desde su trabajo de CI para que Datadog reciba estas ejecuciones. Consulte la [documentación de configuración de OpenLineage][6]. Para **dbt Cloud**, configure el trabajo de CI que se ejecuta en las solicitudes de extracción en la configuración `CI Job URL` en la sección [dbt Cloud](#dbt-cloud).

Datadog también debe poder leer las tablas que su trabajo de CI crea para compararlas. El rol que creó durante la configuración de Snowflake (`DATADOG_ROLE` de forma predeterminada) necesita `USAGE` y `SELECT` en la base de datos en la que su trabajo de CI materializa los modelos. La configuración de la integración de Snowflake de Datadog incluye un procedimiento `grant_database_access` que otorga esto en todas las tablas y vistas actuales y futuras en cada esquema de una base de datos. Ejecútelo para la base de datos en la que escribe su trabajo de CI:

```sql
CALL grant_database_access('["<CI_DATABASE>"]', '<ROLE_NAME>');
```

Si su CI crea una base de datos efímera por solicitud de extracción, llame al procedimiento como parte de ese paso de aprovisionamiento para que cada base de datos nueva sea legible. Consulte [Configuración de Snowflake][8] para ver la definición del procedimiento. Sin este acceso, Datadog recibe la ejecución de CI pero no puede consultar las tablas de CI, y la detección de desviaciones falla.

Para **dbt Core**, la detección de desviaciones también requiere que el número de solicitud de extracción se adjunte a sus eventos de OpenLineage a través de la faceta `sourceCodeLocation`. Esto requiere la versión `openlineage-dbt` 1.46.0 o posterior y la variable de entorno `OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__DISABLED=false`. Consulte [Establecer las variables de entorno][7]. Si su trabajo de CI de dbt Core se ejecuta dentro de un contenedor, necesita una configuración adicional. Consulte la sección [Ejecución de su trabajo de CI de dbt Core en un contenedor](#running-your-dbt-core-ci-job-in-a-container).

##### Configuración general {#general-settings-1}

| Configuración                            | Descripción                                                                                                                                                   |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Run on Draft Pull/Merge Requests` | Habilite esta opción para ejecutar la verificación en solicitudes de extracción o fusión preliminares.                                                                                          |
| `Threshold`                        | El umbral para la detección de desviaciones (por ejemplo, `0.1` para un 10% de desviación). Si una métrica supera este umbral, aparece como una advertencia en los resultados de la verificación.      |
| `Downstream Checks`                | Cuando un modelo de dbt cambia, se generan verificaciones de detección de desviaciones para él y para cualquier modelo de dbt aguas abajo. Esta configuración controla hasta qué punto se ejecutan las verificaciones aguas abajo. |

##### dbt Cloud {#dbt-cloud}

| Configuración      | Descripción                                                                                                                                                                                                                   |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CI Job URL` | El localizador para el trabajo de CI de dbt Cloud que se activa mediante solicitudes de extracción y materializa modelos de dbt para CI. Datadog recibe los eventos de ejecución de este trabajo a través de la integración de dbt Cloud. Estos suelen verse como `https://cloud.getdbt.com/...`. |

**Bitbucket Cloud y Azure DevOps**

Si su repositorio de Azure DevOps utiliza la integración nativa de Azure DevOps de dbt Cloud (planes Enterprise), los trabajos de CI se inician automáticamente. Omita esta sección.

De lo contrario, inicie el trabajo de CI desde su Pipeline con la [API administrativa de dbt Cloud][9]. Primero, reemplace estos marcadores de posición en el ejemplo para su proveedor de CI:

| Marcador de posición | Valor |
| ----------- | ----- |
| `<DBT_CLOUD_HOST>` | Su nombre de servidores de dbt Cloud, por ejemplo `cloud.getdbt.com`. |
| `<ACCOUNT_ID>` | Su ID de cuenta de la URL del trabajo de CI de dbt Cloud. |
| `<CI_JOB_ID>` | Su ID de trabajo de CI de la misma URL. |

{{< tabs >}}
{{% tab "Bitbucket Pipelines" %}}

1. Cree un token de API de dbt Cloud que pueda ejecutar trabajos.
2. En Bitbucket, guarde el token como una variable de repositorio segura llamada `DBT_API_KEY`.
3. Agregue el siguiente paso a `bitbucket-pipelines.yml`. Si su archivo ya contiene `pipelines`, agregue este paso debajo de `pipelines > pull-requests > '**'`.

```yaml
pipelines:
  pull-requests:
    '**':
      - step:
          name: Trigger dbt Cloud CI job
          script:
            - |
              curl --fail -X POST "https://<DBT_CLOUD_HOST>/api/v2/accounts/<ACCOUNT_ID>/jobs/<CI_JOB_ID>/run/" \
                -H "Authorization: Token $DBT_API_KEY" \
                -H "Content-Type: application/json" \
                -d "{\"cause\": \"Bitbucket PR #$BITBUCKET_PR_ID\",
                     \"git_sha\": \"$BITBUCKET_COMMIT\",
                     \"non_native_pull_request_id\": $BITBUCKET_PR_ID,
                     \"schema_override\": \"dbt_cloud_pr_<CI_JOB_ID>_$BITBUCKET_PR_ID\"}"
```

{{% /tab %}}
{{% tab "Azure Pipelines" %}}

Para un repositorio en Azure Repos:

1. Cree un token de API de dbt Cloud que pueda ejecutar trabajos.
2. Guarde el token como una variable secreta de Azure Pipelines llamada `DBT_API_KEY`.
3. Agregue una [política de rama de validación de compilación][10] en la rama de destino para ejecutar su pipeline para las solicitudes de extracción.
4. Agregue este paso de Bash a la sección `steps` de su pipeline. El bloque `env` pasa los valores del secreto y de la solicitud de extracción al script, y el `condition` omite el paso en las compilaciones que no son para una solicitud de extracción.

```yaml
steps:
  - bash: |
      curl --fail -X POST "https://<DBT_CLOUD_HOST>/api/v2/accounts/<ACCOUNT_ID>/jobs/<CI_JOB_ID>/run/" \
        -H "Authorization: Token $DBT_API_KEY" \
        -H "Content-Type: application/json" \
        -d "{\"cause\": \"Azure DevOps PR #$PR_NUMBER\",
             \"git_sha\": \"$HEAD_SHA\",
             \"non_native_pull_request_id\": $PR_NUMBER,
             \"schema_override\": \"dbt_cloud_pr_<CI_JOB_ID>_$PR_NUMBER\"}"
    displayName: Trigger dbt Cloud CI job
    condition: eq(variables['Build.Reason'], 'PullRequest')
    env:
      DBT_API_KEY: $(DBT_API_KEY)
      PR_NUMBER: $(System.PullRequest.PullRequestId)
      HEAD_SHA: $(System.PullRequest.SourceCommitId)
```

{{% /tab %}}
{{< /tabs >}}

**Notas**:
- Incluya tanto `non_native_pull_request_id` como `git_sha`, y establezca `git_sha` en el commit principal de la solicitud de extracción. Datadog utiliza ambos para hacer coincidir la ejecución con la solicitud de extracción.
- `schema_override` mantiene las tablas de CI fuera de sus esquemas de producción. Incluir el ID del trabajo evita que dos trabajos de CI escriban en el mismo esquema.
- dbt Cloud no elimina estos esquemas para las ejecuciones activadas por API. Límpielos según un horario.

##### dbt Core {#dbt-core}

| Configuración            | Descripción                                                                                                                                                                                                                                        |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CI Job Name`      | El nombre del trabajo que se activa mediante solicitudes de extracción, materializa modelos de dbt para CI y envía eventos de OpenLineage a Datadog.                                                                                                                   |
| `CI Job Namespace` | La variable OPENLINEAGE_NAMESPACE especificada al enviar eventos de OpenLineage desde el trabajo especificado anteriormente. Consulte [Establecer las variables de entorno][7]. Si no configura esta variable al enviar eventos de OpenLineage, no necesita especificarla aquí. |

**Bitbucket Cloud y Azure DevOps**

Primero, complete la configuración en [Set the environment variables][7]. Luego, en el paso que ejecuta `dbt-ol`, establezca estas dos variables con los valores para su proveedor de CI:

- `OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__PULL_REQUEST_NUMBER`
- `OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__VERSION`

| Proveedor de CI | `PULL_REQUEST_NUMBER` | `VERSION` |
| ----------- | --------------------- | --------- |
| Bitbucket Pipelines | `$BITBUCKET_PR_ID` | `$BITBUCKET_COMMIT` |
| Azure Pipelines con Azure Repos | `$(System.PullRequest.PullRequestId)` | `$(System.PullRequest.SourceCommitId)` |
| Azure Pipelines con un repositorio de GitHub | `$(System.PullRequest.PullRequestNumber)` | `$(System.PullRequest.SourceCommitId)` |

Establezca `VERSION` explícitamente. En estos proveedores, las compilaciones de solicitudes de extracción hacen checkout de un commit de fusión, por lo que el commit detectado desde git no es el commit principal de la solicitud de extracción, y la ejecución no coincide con la solicitud de extracción.

Para Azure Repos, agregue una [política de rama de validación de compilación][10] en la rama de destino para que el pipeline se ejecute con el contexto de la solicitud de extracción.

#### Ejecución de su trabajo de CI de dbt Core en un contenedor {#running-your-dbt-core-ci-job-in-a-container}

Si su ejecutor de CI inicia dbt Core con `docker run`, pase la URL del repositorio, el SHA de confirmación principal de la solicitud de extracción y el número de la solicitud de extracción al contenedor. El contenedor no hereda automáticamente el contexto de git del ejecutor.

Datadog necesita que los tres valores en la faceta `sourceCodeLocation` coincidan con la ejecución de la solicitud de extracción y muestren los resultados de la desviación.

Para **GitHub Actions**, lea los valores en el ejecutor y páselos al contenedor:

```shell
# On the CI runner, before launching the container:
PR_NUMBER=$(jq -r '.pull_request.number'  "$GITHUB_EVENT_PATH")
HEAD_SHA=$(jq -r '.pull_request.head.sha' "$GITHUB_EVENT_PATH")   # the pull request's head commit, not the merge commit
REPO_URL="${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}"

docker run \
  -e OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__DISABLED=false \
  -e OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__REPO_URL="$REPO_URL" \
  -e OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__PULL_REQUEST_NUMBER="$PR_NUMBER" \
  -e OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__VERSION="$HEAD_SHA" \
  <YOUR_IMAGE> <YOUR_DBT_OL_COMMAND>
```

El flujo de trabajo debe ejecutarse cuando se abre o actualiza una solicitud de extracción:

```yaml
on:
  pull_request:
    types: [opened, synchronize, reopened]
```

Para otros proveedores de CI, reemplace los valores asignados a `PR_NUMBER`, `HEAD_SHA` y `REPO_URL` en el ejemplo anterior. Ejecute el trabajo como un pipeline de solicitud de extracción (un pipeline de solicitud de fusión de GitLab, un pipeline de Bitbucket `pull-requests` o una compilación de Azure Pipelines iniciada por una política de validación de compilación). De lo contrario, estos valores están vacíos.

{{< tabs >}}
{{% tab "GitLab CI" %}}

```shell
PR_NUMBER="$CI_MERGE_REQUEST_IID"
# In merged results pipelines, use $CI_MERGE_REQUEST_SOURCE_BRANCH_SHA instead.
HEAD_SHA="$CI_COMMIT_SHA"
REPO_URL="$CI_PROJECT_URL"
```

{{% /tab %}}
{{% tab "Bitbucket Pipelines" %}}

```shell
PR_NUMBER="$BITBUCKET_PR_ID"
HEAD_SHA="$BITBUCKET_COMMIT"
REPO_URL="https://bitbucket.org/$BITBUCKET_REPO_FULL_NAME"
```

{{% /tab %}}
{{% tab "Azure Pipelines" %}}

```shell
# For a GitHub repository, use $SYSTEM_PULLREQUEST_PULLREQUESTNUMBER instead.
PR_NUMBER="$SYSTEM_PULLREQUEST_PULLREQUESTID"
HEAD_SHA="$SYSTEM_PULLREQUEST_SOURCECOMMITID"
REPO_URL="$SYSTEM_PULLREQUEST_SOURCEREPOSITORYURI"
```

{{% /tab %}}
{{< /tabs >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/data_observability/lineage/
[2]: /es/integrations/#cat-source-control
[3]: /es/data_observability/quality_monitoring/#supported-data-sources
[4]: /es/data_observability/jobs_monitoring/dbt/?tab=dbtcloud
[5]: /es/data_observability/jobs_monitoring/dbt/?tab=dbtcore
[6]: /es/data_observability/jobs_monitoring/openlineage/
[7]: /es/data_observability/jobs_monitoring/dbt/?tab=dbtcore#set-the-environment-variables
[8]: /es/data_observability/quality_monitoring/data_warehouses/snowflake/
[9]: https://docs.getdbt.com/docs/deploy/ci-jobs#trigger-a-ci-job-with-the-api-
[10]: https://learn.microsoft.com/en-us/azure/devops/repos/git/branch-policies#build-validation