---
aliases:
- /es/data_observability/jobs_monitoring/dbtcore
- /es/data_observability/jobs_monitoring/dbtcloud
description: Conecte dbt Cloud o dbt Core a Datadog para obtener metadatos de ejecución
  de trabajos y linaje de modelos.
further_reading:
- link: /data_observability/
  tag: Documentación
  text: Aprenda sobre Data Observability
- link: https://www.datadoghq.com/blog/understanding-dbt/
  tag: Blog
  text: 'Comprender dbt: conceptos básicos y mejores prácticas'
title: dbt
---
## Descripción general {#overview}

Datadog puede acceder a los metadatos de su dbt Cloud o dbt Core para extraer información sobre las ejecuciones de trabajos, incluidas las duraciones de ejecución, los modelos generados por dbt y las relaciones de linaje entre modelos. Datadog compara la tabla de su almacén de datos con los modelos de dbt para determinar la causalidad y las consecuencias de un error en la tabla.

{{< tabs >}}
{{% tab "dbt Cloud" %}}

Siga los pasos a continuación para conectar dbt Cloud a Datadog.

## Genere un token de API en dbt Cloud {#generate-an-api-token-in-dbt-cloud}

Cree un token de servicio en dbt Cloud para que Datadog pueda acceder a los metadatos de su cuenta.

1. En dbt Cloud, vaya a {{< ui >}}User Profile{{< /ui >}} > {{< ui >}}API Tokens{{< /ui >}} > {{< ui >}}Service Tokens{{< /ui >}}.
2. Haga clic en {{< ui >}}\+ Create Service Token{{< /ui >}}.
3. Proporcione un nombre para el token.
4. Establezca los permisos del token:
   - Si crea el webhook en dbt Cloud usted mismo, utilice el conjunto de permisos {{< ui >}}Stakeholder/Read-Only{{< /ui >}} limitado a los proyectos de dbt Cloud relevantes.
   - Si Datadog crea y administra el webhook, utilice permisos {{< ui >}}Developer{{< /ui >}} para el plan dbt Cloud Enterprise o permisos {{< ui >}}Account Admin{{< /ui >}} para el plan dbt Cloud Team.
5. Haga clic en {{< ui >}}Save{{< /ui >}} y copie el token de API generado.

## Conecte su cuenta de dbt Cloud a Datadog {#connect-your-dbt-cloud-account-to-datadog}

Utilice el token de API para configurar la integración en Data Observability.

1. Navegue a [{{< ui >}}Datadog Data Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][1].
2. En la sección {{< ui >}}dbt Cloud{{< /ui >}}, haga clic en {{< ui >}}Configure{{< /ui >}}.
3. Si ya ha creado una cuenta de integración de dbt Cloud, asegúrese de haberla actualizado con el token de API con los permisos descritos anteriormente.
4. Si no, cree una cuenta. Complete las secciones {{< ui >}}Account Name{{< /ui >}}, {{< ui >}}Account Id{{< /ui >}}, {{< ui >}}Account Url{{< /ui >}} y {{< ui >}}API Token{{< /ui >}}.
5. Haga clic en {{< ui >}}Save{{< /ui >}} para guardar su configuración.

## Configure webhooks {#configure-webhooks}

En la configuración de Data Observability, expanda la cuenta de dbt Cloud y elija cómo Datadog recibe los eventos de ejecución de trabajos de dbt Cloud.

### Cree el webhook en dbt Cloud usted mismo {#create-the-webhook-in-dbt-cloud-yourself}

Utilice esta opción si desea usar un token de servicio {{< ui >}}Stakeholder/Read-Only{{< /ui >}} para la ingesta de artefactos.

1. Seleccione {{< ui >}}I'll manage the webhook in dbt Cloud myself{{< /ui >}}.
2. Copie la URL del webhook de Datadog.
3. En dbt Cloud, vaya a {{< ui >}}Account Settings{{< /ui >}} > {{< ui >}}Webhooks{{< /ui >}} > {{< ui >}}Create New Webhook{{< /ui >}}.
4. Pegue la URL del webhook de Datadog en el campo de URL del webhook.
5. Habilite los eventos {{< ui >}}Job Run Started{{< /ui >}} y {{< ui >}}Job Run Completed{{< /ui >}}. Para contextualizar la ingesta a trabajos específicos, seleccione esos trabajos en la configuración del webhook de dbt Cloud.
6. Guarde el webhook en dbt Cloud.
7. Copie el secreto HMAC de dbt Cloud, péguelo en el campo {{< ui >}}HMAC secret from dbt Cloud{{< /ui >}} en Datadog y haga clic en {{< ui >}}Save{{< /ui >}}.

**Nota**: Después de guardar, los webhooks que usted mismo cree pueden tardar hasta 5 minutos en comenzar a aceptar tráfico de dbt Cloud.

Si elimina una configuración de webhook administrada por el usuario en Datadog más adelante, elimine el webhook de dbt Cloud manualmente.

### Permita que Datadog administre el webhook {#let-datadog-manage-the-webhook}

Utilice esta opción si desea que Datadog cree y mantenga el webhook en dbt Cloud.

1. Seleccione {{< ui >}}Datadog-managed{{< /ui >}}.
2. Haga clic en {{< ui >}}Save{{< /ui >}}.

Este modo requiere un token de dbt Cloud con permisos de {{< ui >}}Developer{{< /ui >}} para el plan dbt Cloud Enterprise o permisos de {{< ui >}}Account Admin{{< /ui >}} para el plan dbt Cloud Team.

## ¿Qué sigue? {#whats-next}

Después de su próxima ejecución de trabajo de dbt, debería comenzar a ver los datos de ejecución de trabajo y linaje en [Datadog Data Observability][2], como se muestra a continuación.

{{< img src="data_observability/data-obs-dbt-cloud-final.png" alt="Descripción general de Data Observability que muestra las ejecuciones de trabajo de dbt como un gráfico de barras apiladas a lo largo del tiempo y una tabla de cuentas de dbt Cloud conectadas con su estado." style="width:100%;" >}}

[1]: https://app.datadoghq.com/data-obs/settings/integrations
[2]: https://app.datadoghq.com/data-obs/catalog?integration=dbt

{{% /tab %}}

{{% tab "dbt Core" %}}

Siga los pasos a continuación para conectar dbt Core a Datadog.

**Nota**: Si ejecuta dbt Core con un orquestador externo (como Airflow) y desea correlacionar las tareas del orquestador con las ejecuciones de dbt, siga primero las [instrucciones de integración de Airflow][1].

## Obtenga su clave de Datadog API {#retrieve-your-datadog-api-key}

1. [Siga estas instrucciones][2] para crear u obtener una clave de Datadog API.

## Instale openlineage-dbt {#install-openlineage-dbt}

1. Instale el paquete `openlineage-dbt`. Consulte [Uso de dbt con Amazon MWAA][3] para configurar este paquete en su entorno virtual.

   ```shell
   pip3 install openlineage-dbt>=1.39.0
   ```

## Establezca las variables de entorno {#set-the-environment-variables}

1. Establezca las siguientes variables de entorno. Reemplace `datadoghq.com` con el [sitio de Datadog][4] correspondiente para su organización. Para obtener más información sobre los sitios de Datadog predefinidos, consulte la [documentación de OpenLineage][5].

   ```shell
   export DD_SITE=datadoghq.com
   export DD_API_KEY=<YOUR_DATADOG_API_KEY>
   export OPENLINEAGE__TRANSPORT__TYPE=datadog

   # OPENLINEAGE_NAMESPACE determines the Datadog tag value for the environment (similar to how the service tag identifies the application).
   # Typical values are dev, staging, or prod, but you can over ride it with any custom value.
   export OPENLINEAGE_NAMESPACE=<YOUR_ENV>

   # Optional, for debugging purposes
   export OPENLINEAGE_CLIENT_LOGGING=DEBUG

   # Required for CI/CD Drift Detection (requires openlineage-dbt >= 1.46.0).
   # Attaches the sourceCodeLocation facet (repository URL, commit SHA, and pull
   # request number) so Datadog can associate the dbt run with a pull request.
   # Disabled by default; not required for job monitoring alone.
   export OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__DISABLED=false
   ```

   Para las [verificaciones de CI/CD][8], el número de solicitud de extracción se detecta automáticamente cuando la ejecución expone `GITHUB_REF` (flujos de trabajo de GitHub Actions activados por una solicitud de extracción) o `CI_MERGE_REQUEST_IID` (canalizaciones de solicitud de fusión de GitLab). Si ninguna de las variables está presente, establezca el número de solicitud de extracción explícitamente:

   ```shell
   export OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__PULL_REQUEST_NUMBER=<PR_NUMBER>
   ```

   Si su trabajo de CI se ejecuta dentro de un contenedor que no hereda el contexto git del runner (por ejemplo, un flujo de trabajo de GitHub Actions que inicia un contenedor), la URL del repositorio, el SHA del commit y el número de solicitud de extracción no se detectan automáticamente, por lo que debe pasar los tres explícitamente. Consulte [Ejecución de su trabajo de CI de dbt Core en un contenedor](/data_observability/cicd/#running-your-dbt-core-ci-job-in-a-container).

## Actualice la invocación de dbt {#update-the-dbt-invocation}

1. Cambie sus invocaciones de dbt para utilizar el wrapper de OpenLineage (`dbt-ol`) en lugar de llamar a `dbt` directamente. Esto se aplica a cualquier comando de dbt que desee rastrear en Datadog, como `run`, `build` y `test`. Para obtener la lista completa de comandos disponibles, consulte la [documentación de dbt][7].
2. Agregue la marca `--consume-structured-logs` para visualizar los trabajos de dbt mientras el comando aún se está ejecutando.

   ```shell
   # Run models
   dbt-ol run --consume-structured-logs --openlineage-dbt-job-name <YOUR_DBT_JOB_NAME>

   # Run tests (required to see test failures in Datadog)
   dbt-ol test --consume-structured-logs --openlineage-dbt-job-name <YOUR_DBT_JOB_NAME>

   # Run build (runs models, tests, seeds, and snapshots)
   dbt-ol build --consume-structured-logs --openlineage-dbt-job-name <YOUR_DBT_JOB_NAME>
   ```

## ¿Qué sigue? {#whats-next-1}

Después de la siguiente ejecución de su trabajo de dbt, debería comenzar a ver los datos de ejecución del trabajo y de linaje en [Datadog Data Observability][6], como se muestra a continuación.

{{< img src="data_observability/data-obs-dbt-cloud-final.png" alt="Descripción general de Data Observability que muestra las ejecuciones de trabajos de dbt y el linaje de modelos." style="width:100%;" >}}

[1]: /es/data_jobs/airflow/?tab=kubernetes
[2]: /es/account_management/api-app-keys/#add-an-api-key-or-client-token
[3]: https://docs.aws.amazon.com/mwaa/latest/userguide/samples-dbt.html
[4]: /es/getting_started/site/#access-the-datadog-site
[5]: https://openlineage.io/docs/client/python/#predefined-datadog-sites
[6]: https://app.datadoghq.com/data-obs/catalog?integration=dbt
[7]: https://docs.getdbt.com/docs/running-a-dbt-project/run-your-dbt-projects
[8]: /es/data_observability/cicd/

{{% /tab %}}
{{< /tabs >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}