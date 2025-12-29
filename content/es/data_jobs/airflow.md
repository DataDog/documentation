---
description: Monitoriza procesos de Apache Airflow DAG con Data Jobs Monitoring utilizando
  el proveedor OpenLineage a través de Kubernetes, Amazon MWAA y otras plataformas.
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
### Requisitos

* [Apache Airflow 2.5.0][1] o posterior
* [apache-airflow-providers-openlineage][2] u [openlineage-airflow][5] en función de tu versión de Airflow

### Configuración

Para empezar, sigue las instrucciones que se indican a continuación.

1. Instala el proveedor `openlineage` para **los programadores y los workers de Airflow** añadiendo lo siguiente en tu archivo `requirements.txt` o dondequiera que se gestionen las dependencias de Airflow:

    Para **Airflow 2.7 o posterior**:

      ```text
      apache-airflow-providers-openlineage
      ```

    Para **Airflow 2.5 y 2.6** :

      ```text
      openlineage-airflow
      ```

2. Configura el proveedor `openlineage`. Elige una de las siguientes opciones de configuración y establece las variables de entorno, poniéndolas a disposición de los pods en los que ejecutes programadores y workers de Airflow:

   **Opción 1: transporte de Datadog (Recomendado)**

   **Requisitos**: requiere `apache-airflow-providers-openlineage` versión 2.7.3 o posterior y `openlineage-python` versión 1.37.0 o posterior.

   ```shell
   export DD_API_KEY=<DD_API_KEY>
   export DD_SITE=<DD_SITE>
   export OPENLINEAGE__TRANSPORT__TYPE=datadog
   # OPENLINEAGE_NAMESPACE sets the 'env' tag value in Datadog. You can hardcode this to a different value
   export OPENLINEAGE_NAMESPACE=${AIRFLOW_ENV_NAME}
   ```
   * Sustituye `<DD_API_KEY>` por tu [clave de API Datadog][4] válida.
   * Sustituye `<DD_SITE>` por tu sitio de Datadog (por ejemplo, {{< region-param key="dd_site" code="true" >}}). 

   **Opción 2: transporte compuesto**

   **Requisitos**: requiere `apache-airflow-providers-openlineage` versión 1.11.0 o posterior y `openlineage-python` versión 1.37.0 o posterior.

   Utiliza esta opción si ya estás utilizando OpenLineage con otro sistema y deseas añadir Datadog como destino adicional. El transporte compuesto envía eventos a todos los transportes configurados.

   Por ejemplo, si utilizas un transporte HTTP para enviar eventos a otro sistema:

   ```shell
   # Your existing HTTP transport configuration
   export OPENLINEAGE__TRANSPORT__TYPE=composite
   export OPENLINEAGE__TRANSPORT__TRANSPORTS__EXISTING__TYPE=http
   export OPENLINEAGE__TRANSPORT__TRANSPORTS__EXISTING__URL=<YOUR_EXISTING_URL>
   export OPENLINEAGE__TRANSPORT__TRANSPORTS__EXISTING__AUTH__TYPE=api_key
   export OPENLINEAGE__TRANSPORT__TRANSPORTS__EXISTING__AUTH__API_KEY=<YOUR_EXISTING_API_KEY>

   # Add Datadog as an additional transport
   export DD_API_KEY=<DD_API_KEY>
   export DD_SITE=<DD_SITE>
   export OPENLINEAGE__TRANSPORT__TRANSPORTS__DATADOG__TYPE=datadog
   # OPENLINEAGE_NAMESPACE sets the 'env' tag value in Datadog. You can hardcode this to a different value
   export OPENLINEAGE_NAMESPACE=${AIRFLOW_ENV_NAME}
   ```
   * Sustituye `<DD_API_KEY>` por tu [clave de API Datadog][4] válida.
   * Sustituye `<DD_SITE>` por tu sitio de Datadog (por ejemplo, {{< region-param key="dd_site" code="true" >}}).
   * Sustituye `<YOUR_EXISTING_URL>` y `<YOUR_EXISTING_API_KEY>` por tu configuración de transporte de OpenLineage existente.

   En este ejemplo, los eventos de OpenLineage se envían tanto a tu sistema actual como a Datadog. Puedes configurar múltiples transportes dándole a cada uno un nombre único (como `EXISTING` y `DATADOG` en el ejemplo anterior).

   **Opción 3: Configuración simple**

   Esta opción utiliza la configuración basada en URL y funciona con todas las versiones del proveedor de OpenLineage:

   ```shell
   export OPENLINEAGE_URL=<DD_DATA_OBSERVABILITY_INTAKE>
   export OPENLINEAGE_API_KEY=<DD_API_KEY>
   # OPENLINEAGE_NAMESPACE sets the 'env' tag value in Datadog. You can hardcode this to a different value
   export OPENLINEAGE_NAMESPACE=${AIRFLOW_ENV_NAME}
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

4. Opcionalmente, configura la recopilación de logs para correlacionar logs de tarea con las ejecuciones de DAG en Data Jobs Monitoring. La correlación requiere que el directorio de logs siga el [formato de nombre de archivo predeterminado de log][6].

   El valor `PATH_TO_AIRFLOW_LOGS` es `$AIRFLOW_HOME/logs` en despliegues estándar, pero puede diferir si se personaliza. Añade la siguiente anotación a tu pod:
   ```yaml
   ad.datadoghq.com/base.logs: '[{"type": "file", "path": "PATH_TO_AIRFLOW_LOGS/*/*/*/*.log", "source": "airflow"}]'
   ```

   La adición de `"source": "airflow"` permite la extracción de los atributos necesarios para la correlación por parte del pipeline de logs de la [integración Airflow][8].

   Estas rutas de archivo son relativas al contenedor del Agent. Monta el directorio que contiene el archivo de log en el contenedor de la aplicación y en el contenedor del Agent para que el Agent pueda acceder a él. Para obtener más información, consulta [Recopilar logs de un archivo de log local del contenedor][10].

   **Nota**: La recopilación de logs requiere que el Datadog Agent ya esté instalado en tu clúster de Kubernetes. Si aún no lo has instalado, consulta la [documentación de instalación de Kubernetes][9].

   Para conocer más métodos de configuración de la recopilación de logs en Kubernetes, consulta la [sección de configuración de Kubernetes y de las integraciones][7].


[1]: https://github.com/apache/airflow/releases/tag/2.5.0
[2]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[3]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/configurations-ref.html#configuration-openlineage
[4]: https://docs.datadoghq.com/es/account_management/api-app-keys/#api-keys
[5]: https://openlineage.io/docs/integrations/airflow/
[6]: https://airflow.apache.org/docs/apache-airflow/2.9.3/configurations-ref.html#log-filename-template
[7]: https://docs.datadoghq.com/es/containers/kubernetes/integrations/?tab=annotations#configuration
[8]: https://docs.datadoghq.com/es/integrations/airflow/?tab=containerized
[9]: https://docs.datadoghq.com/es/containers/kubernetes/installation/?tab=datadogoperator#installation
[10]: https://docs.datadoghq.com/es/containers/kubernetes/log/?tab=datadogoperator#from-a-container-local-log-file


### Validación

En Datadog, consulta la página [Monitorización de trabajos de datos][2] para ver una lista de tus ejecuciones de trabajos de Airflow después de la configuración. 

### Solucionar problemas

Establece `OPENLINEAGE_CLIENT_LOGGING` en `DEBUG` junto con las otras variables de entorno establecidas previamente para el cliente de OpenLineage y sus módulos secundarios. Esto puede ser útil para solucionar problemas durante la configuración del proveedor `openlineage`.

{{% /tab %}}

{{% tab "Amazon MWAA" %}}
### Requisitos

* [Apache Airflow 2.5.0][1] o posterior
* [apache-airflow-providers-openlineage][2] u [openlineage-airflow][8] en función de tu versión de Airflow

### Instalación

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
   # AIRFLOW__OPENLINEAGE__NAMESPACE sets the 'env' tag value in Datadog. You can hardcode this to a different value
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

### Validación

En Datadog, consulta la página [Monitorización de trabajos de datos][7] para ver una lista de tus ejecuciones de trabajos de Airflow después de la configuración. 

### Solucionar problemas

Asegúrate de que tu rol de ejecución configurado para tu entorno Amazon MWAA tiene los permisos adecuados para `requirements.txt` y el [script de inicio de Amazon MWAA][3]. Esto es necesario si administras tu propio rol de ejecución y es la primera vez que añades esos archivos de respaldo. Si es necesario, consulta la guía oficial de [roles de ejecución de Amazon MWAA][6] para ver más detalles.

Establece `OPENLINEAGE_CLIENT_LOGGING` en `DEBUG` en el [script de inicio de Amazon MWAA][3] para el cliente OpenLineage y sus módulos secundarios. Esto puede ser útil para solucionar problemas durante la configuración del proveedor `openlineage`.


{{% /tab %}}

{{% tab "Astronomer" %}}

<div class="alert alert-danger">
Para los clientes de Astronomer que utilizan Astro, <a href=https://www.astronomer.io/docs/learn/airflow-openlineage#lineage-on-astro>Astro ofrece funciones de linaje que dependen del proveedor de Airflow OpenLineage</a>. Data Jobs Monitoring depende del mismo proveedor de OpenLineage y utiliza el transporte <a href=https://openlineage.io/docs/client/python#composite>Compuesto</a> para añadir transporte adicional.
</div>

### Requisitos

* [Astro Runtime v12.1.0 o posterior][1]
* [`apache-airflow-providers-openlineage` 1.11.0 o posterior][2]
* [`openlineage-python` 1.23.0 o posterior][8]

### Instalación

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
    * Configura `AIRFLOW__OPENLINEAGE__NAMESPACE` con un nombre único para la etiqueta (tag) `env` en todos los DAG del despliegue de Airflow. Esta acción permite a Datadog separar lógicamente los trabajos de este despliegue de los trabajos de otros despliegues de Airflow.
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

### Validación

En Datadog, consulta la página [Monitorización de trabajos de datos][2] para ver una lista de tus ejecuciones de trabajos de Airflow después de la configuración. 


### Solucionar problemas
Comprueba que las variables de entorno de OpenLineage están correctamente configuradas en el despliegue de Astronomer.

**Nota**: El uso del archivo `.env` para añadir las variables de entorno no funciona porque las variables solo se aplican al entorno local de Airflow.
{{% /tab %}}
{{% tab "Google Cloud Composer" %}}
<div class="alert alert-danger">
Data Jobs Monitoring para Airflow aún no es compatible con el linaje de datos de <a href=https://cloud.google.com/composer/docs/composer-2/lineage-integration>Dataplex</a>. La configuración de OpenLineage para Data Jobs Monitoring anula la configuración de transporte de Dataplex existente.
</div>

### Requisitos

* [Cloud Composer 2][1] o posterior
* [apache-airflow-providers-openlineage][2]

### Instalación

Para empezar, sigue las instrucciones que se indican a continuación.


1. En la pestaña Advanced Configuration (Configuración avanzada), en **Airflow configuration override** (Anulación de la configuración de Airflow), haz clic en **Add Airflow configuration override** (Añadir anulación de la configuración de Airflow) y configura estos ajustes:

   - En la sección 1, introduce `openlineage`.
   - En la clave 1, introduce `disabled`.
   - En Valor 1, introduce `False` para asegurarte de que OpenLineage está activado.

   - En la sección 2, introduce `openlineage`.
   - En la clave 2, introduce `transport`.
   - En Valor 2, introduce lo siguiente:

     ```text
     {
      "type": "http",
      "url": "<DD_DATA_OBSERVABILITY_INTAKE>",
      "auth": {
         "type": "api_key",
         "api_key": "<DD_API_KEY>"
      }
     }
     ```

   * Sustituye completamente `<DD_DATA_OBSERVABILITY_INTAKE>` por `https://data-obs-intake.`{{< region-param key="dd_site" code="true" >}}.
   * Sustituye completamente `<DD_API_KEY>` por tu [clave de API Datadog][5] válida.


   Consulta las páginas oficiales de documentación de [Airflow][4] y [Composer][3] para conocer otras configuraciones compatibles del proveedor `openlineage` en Google Cloud Composer.

2. Tras iniciar el entorno Composer, instala el proveedor `openlineage` añadiendo el siguiente paquete en la pestaña de paquetes Pypi de tu página de entorno:
      ```text
      apache-airflow-providers-openlineage
      ```


[1]: https://cloud.google.com/composer/docs/composer-versioning-overview
[2]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[3]: https://cloud.google.com/composer/docs/airflow-configurations
[4]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/configurations-ref.html#configuration-openlineage
[5]: https://docs.datadoghq.com/es/account_management/api-app-keys/#api-keys
[7]: https://app.datadoghq.com/data-jobs/

### Validación

En Datadog, consulta la página [Monitorización de trabajos de datos][7] para ver una lista de tus ejecuciones de trabajos de Airflow después de la configuración. 

### Solucionar problemas

Establece `OPENLINEAGE_CLIENT_LOGGING` en `DEBUG` en la pestaña Environment variables (Variables de entorno) de la página de Composer para el cliente OpenLineage y sus módulos secundarios. Esto puede ser útil para solucionar problemas al configurar el proveedor `openlineage`.

{{% /tab %}}
{{< /tabs >}}

## Configuración avanzada

### Vincula tus trabajos dbt con tareas de Airflow

Puedes monitorizar tus trabajos dbt que se estén ejecutando en Airflow conectando la telemetría dbt con las respectivas tareas de Airflow, utilizando la [integración dbt de OpenLineage][6].

Para ver el vínculo entre las tareas de Airflow y los trabajos dbt, sigue estos pasos:

1. Instala `openlineage-dbt`. Consulta [Uso de dbt con Amazon MWAA][7] para configurar dbt en el entorno virtual.

```shell
pip3 install openlineage-dbt>=1.36.0
```

2. Cambia la invocación dbt por `dbt-ol` (wrapper de OpenLineage para dbt).

Además, añade el indicador --consume-structured-logs para ver los trabajos de dbt mientras el comando se está ejecutando.

```bash
dbt-ol run --consume-structured-logs --project-dir=$TEMP_DIR --profiles-dir=$PROFILES_DIR
```

3. En tu archivo DAG, añade la variable OPENLINEAGE_PARENT_ID al entorno de la tarea de Airflow que ejecuta el proceso dbt:

```python
dbt_run = BashOperator(
    task_id="dbt_run",
    dag=dag,
    bash_command=f"dbt-ol run --consume-structured-logs --project-dir=$TEMP_DIR --profiles-dir=$PROFILES_DIR",
    append_env=True,
    env={
        "OPENLINEAGE_PARENT_ID": "{{ macros.OpenLineageProviderPlugin.lineage_parent_id(task_instance) }}",
    },
)
```

### Vincula tus trabajos de Spark con tareas de Airflow

La integración de OpenLineage puede inyectar automáticamente la información del trabajo principal de Airflow (espacio de nombre, nombre de trabajo, id de ejecución) en las propiedades de la aplicación Spark. Esto crea una relación principal-secundario entre las tareas de Airflow y los trabajos de Spark, lo que te permite solucionar problemas de ambos sistemas en un solo lugar.

**Nota**: Esta función requiere `apache-airflow-providers-openlineage` versión 2.1.0 o posterior (compatible desde Airflow 2.9+).

1. **Verifica la compatibilidad de los operadores**: consulta la [documentación de Apache Airflow OpenLineage][8] para confirmar que tus operadores de Spark son compatibles. Esta característica solo funciona con operadores específicos como SparkSubmitOperator y LivyOperator.

2. Asegúrate de que tus trabajos de Spark son monitorizados activamente a través de [Data Jobs Monitoring][2].

3. Habilita la inyección automática de información del trabajo principal estableciendo la siguiente configuración:

```shell
AIRFLOW__OPENLINEAGE__SPARK_INJECT_PARENT_JOB_INFO=true
```

Esto inyecta automáticamente propiedades de trabajo principal para todos los operadores de Spark compatibles. Para desactivarlo para operadores específicos, establece `openlineage_inject_parent_job_info=False` en el operador.


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/data_jobs
[2]: https://app.datadoghq.com/data-jobs/
[3]: https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html#lazy-load-plugins
[4]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/macros.html#lineage-job-run-macros
[5]: https://airflow.apache.org/docs/apache-airflow-providers-apache-spark/stable/_api/airflow/providers/apache/spark/operators/spark_submit/index.html#airflow.providers.apache.spark.operators.spark_submit.SparkSubmitOperator
[6]: https://openlineage.io/docs/integrations/dbt/
[7]: https://docs.aws.amazon.com/mwaa/latest/userguide/samples-dbt.html
[8]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/guides/user.html#passing-parent-job-information-to-spark-jobs