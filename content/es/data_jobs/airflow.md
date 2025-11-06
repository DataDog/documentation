---
further_reading:
- link: https://www.datadoghq.com/blog/data-jobs-monitoring/
  tag: Blog
  text: Solucionar problemas y optimizar cargas de trabajo de procesamiento de datos
    con Data Jobs Monitoring
- link: https://www.datadoghq.com/blog/data-observability-monitoring
  tag: Blog
  text: Observar el ciclo de vida de los datos con Datadog
- link: /data_jobs
  tag: Documentación
  text: Monitorización de Data Jobs
is_beta: true
private: true
title: Habilitar Data Jobs Monitoring para Apache Airflow
---

{{< callout url="#" btn_hidden="true" header="Data Jobs Monitoring para Apache Airflow está en Vista previa" >}}
Para probar la vista previa de la monitorización Airflow, sigue las instrucciones que se indican a continuación.
{{< /callout >}}

[Data Jobs Monitoring][1] ofrece una visibilidad del rendimiento y la fiabilidad de los flujos de trabajo ejecutados por los DAG de Apache Airflow.

{{< tabs >}}
{{% tab "Kubernetes" %}}
## Requisitos

* [Apache Airflow 2.5.0][1] o posterior
* [apache-airflow-providers-openlineage][2] u [openlineage-airflow][5] en función de tu versión de Airflow

## Configuración

Para empezar, sigue las instrucciones que se indican a continuación.

1. Instala el proveedor `openlineage` para **tanto los programadores como los workers de Airflow** añadiendo lo siguiente en tu archivo `requirements.txt` o dondequiera que se gestionen las dependencias de Airflow:

    Para **Airflow 2.7 o posterior**:

      ```text
      apache-airflow-providers-openlineage
      ```

    Para **Airflow 2.5 y 2.6** :

      ```text
      openlineage-airflow
      ```

2. Configura el proveedor `openlineage`. La opción más sencilla consiste en configurar las siguientes variables de entorno y ponerlas a disposición de los pods en los que ejecutan planificadores y workers de Airflow:

   ```shell
   export OPENLINEAGE_URL=<DD_DATA_OBSERVABILITY_INTAKE>
   export OPENLINEAGE_API_KEY=<DD_API_KEY>
   export AIRFLOW__OPENLINEAGE__NAMESPACE=${AIRFLOW_ENV_NAME}
   ```
   * Sustituye `<DD_DATA_OBSERVABILITY_INTAKE>` por `https://data-obs-intake.`{{< region-param key="dd_site" code="true" >}}.
   * Sustituye `<DD_API_KEY>` por tu [clave de API Datadog][4] válida.
   * Si estás utilizando **Airflow v2.7 o v2.8**, añade también estas dos variables de entorno junto con las anteriores. Esto soluciona un problema de configuración de OpenLinage solucionado en `apache-airflow-providers-openlineage` v1.7, mientras que Airflow v2.7 y v2.8 utilizan versiones anteriores.
      ```shell
      #!/bin/sh
      # Required for Airflow v2.7 & v2.8 only
      export AIRFLOW__OPENLINEAGE__CONFIG_PATH=""
      export AIRFLOW__OPENLINEAGE__DISABLED_FOR_OPERATORS=""
      ```

   Consulta la documentación oficial [configuration-openlineage][3] para ver otras configuraciones compatibles del proveedor `openlineage`.

3. Activa una actualización de tus pods de Airflow y espera a que finalicen.

[1]: https://github.com/apache/airflow/releases/tag/2.5.0
[2]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[3]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/configurations-ref.html#configuration-openlineage
[4]: https://docs.datadoghq.com/es/account_management/api-app-keys/#api-keys
[5]: https://openlineage.io/docs/integrations/airflow/


## Validación

En Datadog, consulta la página [Monitorización de trabajos de datos][2] para ver una lista de tus ejecuciones de trabajos de Airflow después de la configuración. 

## Resolución de problemas

Establece `OPENLINEAGE_CLIENT_LOGGING` en `DEBUG` junto con las otras variables de entorno establecidas previamente para el cliente de OpenLineage y sus módulos secundarios. Esto puede ser útil para solucionar problemas durante la configuración del proveedor `openlineage`.

{{% /tab %}}

{{% tab "Amazon MWAA" %}}
## Requisitos

* [Apache Airflow 2.5.0][1] o posterior
* [apache-airflow-providers-openlineage][2] u [openlineage-airflow][8] en función de tu versión de Airflow

## Configuración

Para empezar, sigue las instrucciones que se indican a continuación.

1. Instala el proveedor `openlineage` añadiendo lo siguiente en tu archivo `requirements.txt`:

    Para **Airflow 2.7 o posterior**:

      ```text
      apache-airflow-providers-openlineage
      ```

    Para **Airflow 2.5 y 2.6** :

      ```text
      openlineage-airflow
      ```

2. Configura el proveedor `openlineage`. La opción más sencilla es definir las siguientes variables de entorno en tu [script de inicio de Amazon MWAA][3]:

   ```shell
   #!/bin/sh
   export OPENLINEAGE_URL=<DD_DATA_OBSERVABILITY_INTAKE>
   export OPENLINEAGE_API_KEY=<DD_API_KEY>
   export AIRFLOW__OPENLINEAGE__NAMESPACE=${AIRFLOW_ENV_NAME}
   ```

   * Sustituye completamente `<DD_DATA_OBSERVABILITY_INTAKE>` por `https://data-obs-intake.`{{< region-param key="dd_site" code="true" >}}.
   * Sustituye completamente `<DD_API_KEY>` por tu [clave de API Datadog][5] válida.
   * Si estás utilizando **Airflow v2.7 o v2.8**, añade también estas dos variables de entorno al script de inicio. Esto soluciona un problema de configuración de OpenLinage solucionado en `apache-airflow-providers-openlineage` v1.7, mientras que Airflow v2.7 y v2.8 utilizan versiones anteriores.
      ```shell
      #!/bin/sh
      # Required for Airflow v2.7 & v2.8 only
      export AIRFLOW__OPENLINEAGE__CONFIG_PATH=""
      export AIRFLOW__OPENLINEAGE__DISABLED_FOR_OPERATORS=""
      ```

   Consulta la documentación oficial [configuration-openlineage][4] para ver otras configuraciones compatibles del proveedor `openlineage`.

3. Despliega tu `requirements.txt` actualizado y el [script de inicio de Amazon MWAA][3] en tu carpeta de Amazon S3 configurada para tu entorno de Amazon MWAA.

4. Opcionalmente, configura la recopilación de logs para correlacionar los logs de tarea con las ejecuciones de DAG en DJM:
   1. Configura Amazon MWAA para [enviar logs a CloudWatch][9].
   2. [Envía los logs a Datadog][10].

[1]: https://github.com/apache/airflow/releases/tag/2.5.0
[2]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[3]: https://docs.aws.amazon.com/mwaa/latest/userguide/using-startup-script.html
[4]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/configurations-ref.html#configuration-openlineage
[5]: https://docs.datadoghq.com/es/account_management/api-app-keys/#api-keys
[6]: https://docs.aws.amazon.com/mwaa/latest/userguide/mwaa-create-role.html
[7]: https://app.datadoghq.com/data-jobs/
[8]: https://openlineage.io/docs/integrations/airflow/
[9]: https://docs.aws.amazon.com/mwaa/latest/userguide/monitoring-airflow.html#monitoring-airflow-enable
[10]: /es/integrations/amazon_web_services/?tab=roledelegation#log-collection

## Validación

En Datadog, consulta la página [Monitorización de trabajos de datos][7] para ver una lista de tus ejecuciones de trabajos de Airflow después de la configuración. 

## Resolución de problemas

Asegúrate de que tu rol de ejecución configurado para tu entorno Amazon MWAA tiene los permisos adecuados para `requirements.txt` y el [script de inicio de Amazon MWAA][3]. Esto es necesario si administras tu propio rol de ejecución y es la primera vez que añades esos archivos de respaldo. Si es necesario, consulta la guía oficial de [roles de ejecución de Amazon MWAA][6] para ver más detalles.

Establece `OPENLINEAGE_CLIENT_LOGGING` en `DEBUG` en el [script de inicio de Amazon MWAA][3] para el cliente OpenLineage y sus módulos secundarios. Esto puede ser útil para solucionar problemas durante la configuración del proveedor `openlineage`.


{{% /tab %}}

{{% tab "Astronomer" %}}

<div class="alert alert-danger">
Para los clientes de Astronomer que utilizan Astro, <a href=https://www.astronomer.io/docs/learn/airflow-openlineage#lineage-on-astro>Astro ofrece funciones de linaje que dependen del proveedor Airflow OpenLineage</a>. Data Jobs Monitoring depende del mismo proveedor OpenLineage y utiliza el transporte <a href=https://openlineage.io/docs/client/python#composite>Composite</a> para añadir transporte adicional.
</div>

## Requisitos

* [Astro Runtime v12.1.0 o posterior][1]
* [`apache-airflow-providers-openlineage` 1.11.0 o posterior][2]
* [`openlineage-python` 1.23.0 o posterior][8]

## Configuración

1. Para configurar el proveedor de OpenLineage, define las siguientes variables de entorno. Puedes configurar estas variables en tu despliegue de Astronomer utilizando cualquiera de los siguientes métodos:

    - [Desde la interfaz de usuario de Astro][5]: ve a la configuración de despliegue y añade directamente las variables de entorno.
    - [En el archivo Docker][11]: define las variables de entorno en tu `Dockerfile` para asegurarte de que se incluyen durante el proceso de compilación.

    ```shell
    OPENLINEAGE__TRANSPORT__TYPE=composite
    OPENLINEAGE__TRANSPORT__TRANSPORTS__DATADOG__TYPE=http
    OPENLINEAGE__TRANSPORT__TRANSPORTS__DATADOG__URL=<DD_DATA_OBSERVABILITY_INTAKE>
    OPENLINEAGE__TRANSPORT__TRANSPORTS__DATADOG__AUTH__TYPE=api_key
    OPENLINEAGE__TRANSPORT__TRANSPORTS__DATADOG__AUTH__API_KEY=<DD_API_KEY>
    OPENLINEAGE__TRANSPORT__TRANSPORTS__DATADOG__COMPRESSION=gzip
    ```

    * Sustituye `<DD_DATA_OBSERVABILITY_INTAKE>` por `https://data-obs-intake.`{{< region-param key="dd_site" code="true" >}}.
    * Sustituye `<DD_API_KEY>` por tu [clave de API Datadog][7] válida.

    **Opcional:**
    * Define `AIRFLOW__OPENLINEAGE__NAMESPACE` con un nombre único para tu despliegue de Airflow. Esto permite a Datadog separar lógicamente los trabajos de este despliegue de los de otros despliegues de Airflow.
    * Define `OPENLINEAGE_CLIENT_LOGGING` en `DEBUG` para el cliente OpenLineage y sus módulos secundarios para generar logs a un nivel de generación de logs `DEBUG`. Esto puede ser útil para solucionar problemas durante la configuración del proveedor de OpenLineage.

    Para gestionar las variables de entorno de un despliegue, consulta la [guía oficial de Astronomer][10]. Para ver otras configuraciones compatibles del proveedor de OpenLineage, consulta la [referencia para la configuración de OpenLineage][6] de Apache Airflow.

3. Activa una actualización de tu despliegue y espera a que finalice.

[1]: https://www.astronomer.io/docs/astro/runtime-release-notes#astro-runtime-1210
[2]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[3]: https://www.astronomer.io/docs/astro/runtime-provider-reference
[4]: https://www.astronomer.io/docs/astro/cli/develop-project
[5]: https://www.astronomer.io/docs/astro/manage-env-vars#using-the-astro-ui
[6]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/configurations-ref.html#configuration-openlineage
[7]: https://docs.datadoghq.com/es/account_management/api-app-keys/#api-keys
[8]: https://github.com/OpenLineage/OpenLineage/releases/tag/1.23.0
[9]: https://www.astronomer.io/docs/astro/runtime-provider-reference#astro-runtime-1210
[10]: https://www.astronomer.io/docs/astro/environment-variables/#management-options
[11]: https://www.astronomer.io/docs/astro/manage-env-vars#using-your-dockerfile

## Validación

En Datadog, consulta la página [Monitorización de trabajos de datos][2] para ver una lista de tus ejecuciones de trabajos de Airflow después de la configuración. 


## Solucionar problemas
Comprueba que las variables de entorno de OpenLineage están correctamente configuradas en el despliegue de Astronomer.

**Nota**: Utilizando el archivo `.env` para agregar las variables entorno no funciona porque las variables sólo se aplican a la local de flujo de aire entorno.
{{% /tab %}}

{{< /tabs >}}

## Configuración avanzada

### Vincular tus trabajos de Spark con tareas de Airflow
Puedes solucionar de forma más eficiente los problemas de las tareas de Airflow que ejecutan trabajos de Spark conectando la información de ejecución y la telemetría del trabajo de Spark con la tarea de Airflow correspondiente.

**Requisitos previos**: Actualmente, tus trabajos de Spark se monitorizan a través de [Data Jobs Monitoring][2] y se envían a través de [SparkSubmitOperator][5] desde tus trabajos de Airflow.

Para ver el vínculo entre la tarea de Airflow y la aplicación de Spark que has enviado, sigue los pasos que se indican a continuación:

1. Configura Airflow para desactivar la carga perezosa de complementos de Airflow definiendo la [configuración lazy_load_plugins][3] como `False` en tu `airflow.cfg` o exportando la siguiente variable de entorno donde se ejecutan tus planificadores y workers de Airflow:

   ```shell
   export AIRFLOW__CORE__LAZY_LOAD_PLUGINS='False'
   ```

2. Actualiza el archivo DAG de tu trabajo de Airflow añadiendo las siguientes configuraciones Spark a tu [SparkSubmitOperator][5], al que envías tu aplicación Spark:

   ```python
     SparkSubmitOperator(
       conf={
         "spark.openlineage.parentJobNamespace": "{{ macros.OpenLineageProviderPlugin.lineage_job_namespace() }}",
         "spark.openlineage.parentJobName": "{{ macros.OpenLineageProviderPlugin.lineage_job_name(task_instance) }}",
         "spark.openlineage.parentRunId": "{{ macros.OpenLineageProviderPlugin.lineage_run_id(task_instance) }}",
       },
     )
   ```

   Para ver definiciones de las macros referenciadas, consulta [Macros de trabajo y ejecución de linaje][4].

3. Una vez que hayas vuelto a desplegar tu entorno Airflow con la [configuración lazy_load_plugins][3] actualizada y el archivo DAG actualizado, y que tu DAG Airflow se haya vuelto a ejecutar, ve a la página [Data Jobs Monitoring][2]. A continuación, podrás encontrar tu última ejecución de un trabajo de Airflow y ver un SpanLink en la traza (trace) de ejecución del trabajo de Airflow para la traza de la aplicación Spark lanzada. Esto permite solucionar los problemas de Airflow o Spark en un solo lugar.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/data_jobs
[2]: https://app.datadoghq.com/data-jobs/
[3]: https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html#lazy-load-plugins
[4]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/macros.html#lineage-job-run-macros
[5]: https://airflow.apache.org/docs/apache-airflow-providers-apache-spark/stable/_api/airflow/providers/apache/spark/operators/spark_submit/index.html#airflow.providers.apache.spark.operators.spark_submit.SparkSubmitOperator