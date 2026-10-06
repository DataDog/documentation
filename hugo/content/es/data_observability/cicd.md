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

1. Conecte su [proveedor de control de código fuente][2]. Las verificaciones de CI/CD son compatibles con GitHub y GitLab.
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

##### dbt Core {#dbt-core}

| Configuración            | Descripción                                                                                                                                                                                                                                        |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CI Job Name`      | El nombre del trabajo que se activa mediante solicitudes de extracción, materializa modelos de dbt para CI y envía eventos de OpenLineage a Datadog.                                                                                                                   |
| `CI Job Namespace` | La variable OPENLINEAGE_NAMESPACE especificada al enviar eventos de OpenLineage desde el trabajo especificado anteriormente. Consulte [Establecer las variables de entorno][7]. Si no configura esta variable al enviar eventos de OpenLineage, no necesita especificarla aquí. |

#### Ejecución de su trabajo de CI de dbt Core en un contenedor {#running-your-dbt-core-ci-job-in-a-container}

Si su trabajo de CI de dbt Core se ejecuta dentro de un contenedor que inicia el ejecutor de CI (por ejemplo, un flujo de trabajo de GitHub Actions que ejecuta el trabajo con `docker run`), el contenedor no hereda el contexto de git del ejecutor de CI. Como resultado, la URL del repositorio, el SHA de confirmación y el número de solicitud de extracción no se detectan automáticamente, y la faceta `sourceCodeLocation` se envía sin ellos. Datadog utiliza estos valores para hacer coincidir la ejecución con la solicitud de extracción que abrió o actualizó, por lo que sin ellos no aparecen resultados de desviación en la solicitud de extracción.

El siguiente ejemplo utiliza GitHub Actions; en otros proveedores de CI, los nombres de las variables de entorno difieren, pero el enfoque es el mismo. En el ejecutor de CI, lea los valores y páselos al contenedor explícitamente:

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