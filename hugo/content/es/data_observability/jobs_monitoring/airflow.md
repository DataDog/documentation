---
aliases:
- /es/data_jobs/airflow
description: 'Haga un seguimiento de los flujos de trabajo de DAG de Apache Airflow
  con Data Observability: Jobs Monitoring mediante el proveedor OpenLineage en Kubernetes,
  Amazon MWAA y otras plataformas.'
further_reading:
- link: https://www.datadoghq.com/blog/data-jobs-monitoring/
  tag: blog
  text: Solucione problemas y optimice las cargas de trabajo de procesamiento de datos
    con Data Jobs Monitoring
- link: https://www.datadoghq.com/blog/data-observability-monitoring
  tag: blog
  text: Observación del ciclo de vida de los datos con Datadog
- link: /data_jobs
  tag: Documentación
  text: 'Data Observability: Jobs Monitoring'
title: 'Habilite Data Observability: Jobs Monitoring para Apache Airflow'
---
[Data Observability: Jobs Monitoring][1] proporciona visibilidad sobre el rendimiento y la confiabilidad de los flujos de trabajo ejecutados por los DAG de Apache Airflow.

## Configuración {#setup}

Elija su plataforma de Airflow y siga los pasos de configuración.

{{< tabs >}}
{{% tab "Kubernetes" %}}
### Requisitos {#requirements}

* [Apache Airflow 2.7][1] o posterior, incluyendo Airflow 3
* [apache-airflow-providers-openlineage][2]

### Configuración {#setup-1}

Para comenzar, siga las instrucciones a continuación.

1. Identifique la versión de Airflow utilizada por su implementación. Por ejemplo, verifique la etiqueta de la imagen de Airflow, los valores de Helm, el manifiesto de implementación o la versión reportada en su interfaz de usuario de Airflow.

2. Utilice la [referencia de versiones del proveedor OpenLineage](#openlineage-provider-version-reference) y el [registro de cambios del proveedor OpenLineage](https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/changelog.html) para identificar la versión más reciente del proveedor que sea compatible con su versión de Airflow.

3. Instale el `openlineage` proveedor para **tanto los programadores como los trabajadores de Airflow** fijando la versión del proveedor en su archivo `requirements.txt` o dondequiera que se gestionen sus dependencias de Airflow:

    ```text
    apache-airflow-providers-openlineage==<PROVIDER_VERSION>
    ```

   Si su implementación utiliza restricciones, establezca `apache-airflow-providers-openlineage` en el archivo de restricciones de Airflow a la misma versión. Además, actualice cada dependencia de OpenLineage requerida por esa versión del proveedor a las versiones mínimas enumeradas en la [referencia de versiones del proveedor OpenLineage](#openlineage-provider-version-reference).

4. Configure el `openlineage` proveedor. Elija una de las siguientes opciones de configuración y establezca las variables de entorno, haciéndolas disponibles para los pods donde ejecuta los programadores y trabajadores de Airflow:

   **Opción 1: Datadog Transport (recomendado)**

   **Requisitos**: Requiere la versión `apache-airflow-providers-openlineage` 2.7.3 o posterior y la versión `openlineage-python` 1.37.0 o posterior.

   ```shell
   export DD_API_KEY=<DD_API_KEY>
   export DD_SITE=<DD_SITE>
   export OPENLINEAGE__TRANSPORT__TYPE=datadog
   # OPENLINEAGE_NAMESPACE sets the 'env' tag value in Datadog. You can hardcode this to a different value
   export OPENLINEAGE_NAMESPACE=${AIRFLOW_ENV_NAME}
   ```
   * Reemplace `<DD_API_KEY>` con su [clave de Datadog API][4] válida.
   * Reemplace `<DD_SITE>` con su sitio de Datadog (por ejemplo, {{< region-param key="dd_site" code="true" >}}). 

   **Opción 2: Composite Transport**

   **Requisitos**: Requiere `apache-airflow-providers-openlineage` versión 1.11.0 o posterior y `openlineage-python` versión 1.37.0 o posterior.

   Utilice esta opción si ya está utilizando OpenLineage con otro sistema y desea agregar Datadog como un destino adicional. El transporte composite envía eventos a todos los transportes configurados.

   Por ejemplo, si está utilizando un transporte HTTP para enviar eventos a otro sistema:

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
   * Reemplace `<DD_API_KEY>` con su [clave de Datadog API][4] válida.
   * Reemplace `<DD_SITE>` con su sitio de Datadog (por ejemplo, {{< region-param key="dd_site" code="true" >}}).
   * Reemplace `<YOUR_EXISTING_URL>` y `<YOUR_EXISTING_API_KEY>` con su configuración de transporte de OpenLineage existente.

   En este ejemplo, los eventos de OpenLineage se envían tanto a su sistema existente como a Datadog. Puede configurar múltiples transportes asignando a cada uno un nombre único (como `EXISTING` y `DATADOG` en el ejemplo anterior).

   **Opción 3: Configuración simple**

   Esta opción utiliza la configuración basada en URL y funciona con todas las versiones del proveedor de OpenLineage:

   ```shell
   export OPENLINEAGE_URL=<DD_DATA_OBSERVABILITY_INTAKE>
   export OPENLINEAGE_API_KEY=<DD_API_KEY>
   # OPENLINEAGE_NAMESPACE sets the 'env' tag value in Datadog. You can hardcode this to a different value
   export OPENLINEAGE_NAMESPACE=${AIRFLOW_ENV_NAME}
   ```
   * Reemplace `<DD_DATA_OBSERVABILITY_INTAKE>` con `https://data-obs-intake.`{{< region-param key="dd_site" code="true" >}}.
   * Reemplace `<DD_API_KEY>` con su [clave de Datadog API][4] válida.

   * Si está utilizando **Airflow v2.7 o v2.8**, agregue también estas dos variables de entorno junto con las anteriores. Esto soluciona un problema de configuración de OpenLineage corregido en `apache-airflow-providers-openlineage` v1.7, mientras que Airflow v2.7 y v2.8 utilizan versiones anteriores.
      ```shell
      #!/bin/sh
      # Required for Airflow v2.7 & v2.8 only
      export AIRFLOW__OPENLINEAGE__CONFIG_PATH=""
      export AIRFLOW__OPENLINEAGE__DISABLED_FOR_OPERATORS=""
      ```

   Consulte la documentación oficial [configuration-openlineage][3] para otras configuraciones admitidas del proveedor `openlineage`.

5. Active una actualización de sus pods de Airflow y espere a que finalice.

6. Opcionalmente, configure la recopilación de registros para correlacionar los registros de tareas con las ejecuciones de DAG en Data Observability: Jobs Monitoring. La correlación requiere que el directorio de registros siga el [formato de nombre de archivo de registro predeterminado][5].

   **Nota:** Para que la correlación de registros funcione, inserte los atributos de contexto de tarea de Airflow (ID de DAG, ID de ejecución, ID de tarea, número de intento) en los registros de tareas como facetas estructuradas en Datadog. Consulte [Inject Airflow Task Context into Logs][11].

   El valor `PATH_TO_AIRFLOW_LOGS` es `$AIRFLOW_HOME/logs` en implementaciones estándar, pero puede diferir si se personaliza. Agregue la siguiente anotación a su pod:
   ```yaml
   ad.datadoghq.com/base.logs: '[{"type": "file", "path": "PATH_TO_AIRFLOW_LOGS/*/*/*/*.log", "source": "airflow"}]'
   ```

   Agregar `"source": "airflow"` permite que el pipeline de registros de la [integración de Airflow][7] extraiga los atributos necesarios para la correlación.

   Estas rutas de archivo son relativas al contenedor del Agent. Monte el directorio que contiene el archivo de registro tanto en el contenedor de la aplicación como en el del Agent para que el Agent pueda acceder a él. Para obtener más detalles, consulte [Collect logs from a container local log file][9].

   **Nota**: La recopilación de registros requiere que el Datadog Agent ya esté instalado en su clúster de Kubernetes. Si aún no lo ha instalado, consulte la [documentación de instalación de Kubernetes][8].

   Para obtener más métodos para configurar la recopilación de registros en Kubernetes, consulte la [sección de configuración de Kubernetes e Integrations][6].


[1]: https://github.com/apache/airflow/releases/tag/2.7.0
[2]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[3]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/configurations-ref.html#configuration-openlineage
[4]: https://docs.datadoghq.com/es/account_management/api-app-keys/#api-keys
[5]: https://airflow.apache.org/docs/apache-airflow/2.9.3/configurations-ref.html#log-filename-template
[6]: /es/containers/kubernetes/integrations/?tab=annotations#configuration
[7]: /es/integrations/airflow/?tab=containerized
[8]: /es/containers/kubernetes/installation/?tab=datadogoperator#installation
[9]: /es/containers/kubernetes/log/?tab=datadogoperator#from-a-container-local-log-file
[11]: /es/data_observability/jobs_monitoring/airflow_log_context/

### Validación {#validation}

En Datadog, visualice la página [Data Observability: Jobs Monitoring][2] para ver una lista de las ejecuciones de sus trabajos de Airflow después de la configuración.

### Solución de problemas {#troubleshooting}

Establezca `OPENLINEAGE_CLIENT_LOGGING` en `DEBUG` junto con las otras variables de entorno establecidas anteriormente para el cliente de OpenLineage y sus módulos secundarios. Esto puede ser útil para solucionar problemas durante la configuración del proveedor `openlineage`.

Para ejecutar una verificación automatizada de su configuración de OpenLineage, consulte [Solucionar problemas de configuración de Airflow con el DAG de validación de OpenLineage][10].

[10]: /es/data_observability/jobs_monitoring/airflow_troubleshooting_dag/

{{% /tab %}}

{{% tab "Amazon MWAA" %}}
### Requisitos {#requirements-1}

* [Apache Airflow 2.7.0][1] o posterior, incluyendo Airflow 3
* [apache-airflow-providers-openlineage][2]

### Configuración {#setup-2}

<div class="alert alert-info"><strong>Si está utilizando Airflow 2.7.2, 2.8.1 o 2.9.2</strong>: las restricciones predeterminadas de MWAA fijan <code>apache-airflow-providers-openlineage</code> versiones anteriores. Estas versiones incluyen problemas conocidos que pueden degradar la experiencia de Data Observability. Para actualizar a versiones del proveedor con correcciones, consulte <a href="/data_observability/jobs_monitoring/airflow_mwaa_upgrade/">Actualizar el proveedor de OpenLineage en Amazon MWAA para Airflow 2.7.2, 2.8.1 y 2.9.2</a>.</div>

Para comenzar, siga las instrucciones a continuación.

1. Verifique su versión de Airflow en Amazon MWAA y elija la versión del proveedor de OpenLineage más reciente compatible con esa versión.

   Si su entorno ejecuta Airflow 2.7.2, 2.8.1 o 2.9.2, siga la [guía de actualización de MWAA][11] para actualizar el proveedor de OpenLineage y las restricciones de dependencia relacionadas antes de configurar el transporte. Para otras versiones de Amazon MWAA, utilice la [referencia de versiones del proveedor de OpenLineage](#openlineage-provider-version-reference).

1. Agregue el proveedor a su archivo `requirements.txt`:

    ```text
    apache-airflow-providers-openlineage
    ```

1. Configure el proveedor `openlineage`. La opción más sencilla es establecer las siguientes variables de entorno en su [script de inicio de Amazon MWAA][3]:

   ```shell
   #!/bin/sh
   export OPENLINEAGE_URL=<DD_DATA_OBSERVABILITY_INTAKE>
   export OPENLINEAGE_API_KEY=<DD_API_KEY>
   # AIRFLOW__OPENLINEAGE__NAMESPACE sets the 'env' tag value in Datadog. You can hardcode this to a different value
   export AIRFLOW__OPENLINEAGE__NAMESPACE=${AIRFLOW_ENV_NAME}
   ```

   * Reemplace `<DD_DATA_OBSERVABILITY_INTAKE>` completamente con `https://data-obs-intake.`{{< region-param key="dd_site" code="true" >}}.
   * Reemplace `<DD_API_KEY>` completamente con su [clave de Datadog API][5] válida.
   * Si está utilizando **Airflow v2.7 o v2.8**, agregue también estas dos variables de entorno al script de inicio. Esto soluciona un problema de configuración de OpenLineage corregido en `apache-airflow-providers-openlineage` v1.7, mientras que Airflow v2.7 y v2.8 utilizan versiones anteriores.
      ```shell
      #!/bin/sh
      # Required for Airflow v2.7 & v2.8 only
      export AIRFLOW__OPENLINEAGE__CONFIG_PATH=""
      export AIRFLOW__OPENLINEAGE__DISABLED_FOR_OPERATORS=""
      ```

   Verifique la documentación oficial [configuration-openlineage][4] para conocer otras configuraciones admitidas del proveedor `openlineage`.

   La resolución de dependencias de Amazon MWAA está controlada por las restricciones de MWAA. Si el proveedor compatible más reciente entra en conflicto con los valores predeterminados de MWAA, siga el patrón de restricciones personalizadas en la [guía de actualización de MWAA][11].

1. Implemente su `requirements.txt` actualizado y el [script de inicio de Amazon MWAA][3] en su carpeta de Amazon S3 configurada para su entorno de Amazon MWAA.

1. Opcionalmente, configure Log Collection para correlacionar los registros de tareas con las ejecuciones de DAG en Jobs Monitoring:
   1. Configure Amazon MWAA para [enviar registros a CloudWatch][9].
   2. [Envíe los registros a Datadog][10].

[1]: https://github.com/apache/airflow/releases/tag/2.7.0
[2]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[3]: https://docs.aws.amazon.com/mwaa/latest/userguide/using-startup-script.html
[4]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/configurations-ref.html#configuration-openlineage
[5]: https://docs.datadoghq.com/es/account_management/api-app-keys/#api-keys
[6]: https://docs.aws.amazon.com/mwaa/latest/userguide/mwaa-create-role.html
[7]: https://app.datadoghq.com/data-jobs/
[8]: https://openlineage.io/docs/integrations/airflow/
[9]: https://docs.aws.amazon.com/mwaa/latest/userguide/monitoring-airflow.html#monitoring-airflow-enable
[10]: /es/integrations/amazon_web_services/?tab=roledelegation#log-collection
[11]: /es/data_observability/jobs_monitoring/airflow_mwaa_upgrade/

### Validación {#validation-1}

En Datadog, visualice la página [Data Observability: Jobs Monitoring][7] para ver una lista de las ejecuciones de sus trabajos de Airflow después de la configuración.

### Solución de problemas {#troubleshooting-1}

Asegúrese de que su rol de ejecución configurado para su entorno de Amazon MWAA tenga los permisos correctos para `requirements.txt` y el [script de inicio de Amazon MWAA][3]. Esto es necesario si usted administra su propio rol de ejecución y es la primera vez que agrega esos archivos de soporte. Consulte la guía oficial [rol de ejecución de Amazon MWAA][6] para obtener detalles si es necesario.

Establezca `OPENLINEAGE_CLIENT_LOGGING` en `DEBUG` en el [script de inicio de Amazon MWAA][3] para el cliente de OpenLineage y sus módulos secundarios. Esto puede ser útil para solucionar problemas durante la configuración del proveedor `openlineage`.

Para ejecutar una verificación automatizada de su configuración de OpenLineage, consulte [Solución de problemas de la configuración de Airflow con el DAG de validación de OpenLineage][12].

[12]: /es/data_observability/jobs_monitoring/airflow_troubleshooting_dag/

{{% /tab %}}

{{% tab "Astronomer" %}}

<div class="alert alert-danger">
Para los clientes de Astronomer que utilizan Astro, <a href=https://www.astronomer.io/docs/learn/airflow-openlineage#lineage-on-astro>Astro ofrece funciones de linaje que dependen del proveedor de OpenLineage de Airflow</a>. Data Observability: Jobs Monitoring depende del mismo proveedor de OpenLineage y utiliza el transporte <a href=https://openlineage.io/docs/client/python#composite>Composite</a> para añadir otro transporte.
</div>

### Requisitos {#requirements-2}

* [Astro Runtime 12.1.0+][1]
* [`apache-airflow-providers-openlineage` 1.11.0+][2]
* [`openlineage-python` 1.23.0+][8]

### Configuración {#setup-3}

1. Verifique que su Astro Runtime incluya `apache-airflow-providers-openlineage` 1.11.0 o posterior y `openlineage-python` 1.23.0 o posterior. Si administra las dependencias de Airflow en su imagen de despliegue, fije las versiones compatibles en su Dockerfile antes de configurar el transporte.

2. Para configurar el proveedor de OpenLineage, defina las siguientes variables de entorno.

    ```shell
    OPENLINEAGE__TRANSPORT__TYPE=composite
    OPENLINEAGE__TRANSPORT__TRANSPORTS__DATADOG__TYPE=http
    OPENLINEAGE__TRANSPORT__TRANSPORTS__DATADOG__URL=<DD_DATA_OBSERVABILITY_INTAKE>
    OPENLINEAGE__TRANSPORT__TRANSPORTS__DATADOG__AUTH__TYPE=api_key
    OPENLINEAGE__TRANSPORT__TRANSPORTS__DATADOG__AUTH__API_KEY=<DD_API_KEY>
    OPENLINEAGE__TRANSPORT__TRANSPORTS__DATADOG__COMPRESSION=gzip
    ```

    * Replace `<DD_DATA_OBSERVABILITY_INTAKE>` with `https://data-obs-intake.`{{< region-param key="dd_site" code="true" >}}.
    * Reemplace `<DD_API_KEY>` con su [clave de Datadog API][7] válida.

    **Optional:**
    * Set `AIRFLOW__OPENLINEAGE__NAMESPACE` with a unique name for the `env` tag on all DAGs in the Airflow deployment. This allows Datadog to logically separate this deployment's jobs from those of other Airflow deployments.
    * Set `OPENLINEAGE_CLIENT_LOGGING` to `DEBUG` for the OpenLineage client and its child modules to log at a `DEBUG` logging level. This can be useful for troubleshooting during the configuration of an OpenLineage provider.

    You can configure these variables in your Astronomer deployment using either of the following methods:

    - [From the Astro UI][5]: Navigate to your deployment settings and add the environment variables directly.
    - [In the Dockerfile][11]: Define the environment variables in your `Dockerfile` to ensure they are included during the build process.

    See the [Astronomer official guide][10] for managing environment variables for a deployment. See Apache Airflow's [OpenLineage Configuration Reference][6] for other supported configurations of the OpenLineage provider.

3. Active una actualización en su despliegue y espere a que finalice.

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

### Validación {#validation-2}

En Datadog, visualice la página [Data Observability: Jobs Monitoring][2] para ver una lista de las ejecuciones de sus trabajos de Airflow después de la configuración.


### Solución de problemas {#troubleshooting-2}
Verifique que las variables de entorno de OpenLineage estén configuradas correctamente en el despliegue de Astronomer.

**Nota**: El uso del archivo `.env` para agregar las variables de entorno no funciona porque las variables solo se aplican al entorno local de Airflow.

Para ejecutar una verificación automatizada de su configuración de OpenLineage, consulte [Solución de problemas de la configuración de Airflow con el DAG de validación de OpenLineage][12].

[12]: /es/data_observability/jobs_monitoring/airflow_troubleshooting_dag/

{{% /tab %}}
{{% tab "Google Cloud Composer" %}}
<div class="alert alert-danger">
Data Observability: Jobs Monitoring para Airflow aún no es compatible con el linaje de datos de <a href=https://cloud.google.com/composer/docs/composer-2/lineage-integration>Dataplex</a>. La configuración de OpenLineage para Data Observability: Jobs Monitoring anula la configuración de transporte de Dataplex existente.
</div>

### Requisitos {#requirements-3}

* [Cloud Composer 2][1] o posterior
* [apache-airflow-providers-openlineage][2]

### Configuración {#setup-4}

Para comenzar, siga las instrucciones a continuación.

1. Verifique la versión de Airflow y la versión del proveedor de OpenLineage para su entorno de Cloud Composer. Si necesita cambiar la versión del proveedor, revise la guía de gestión de paquetes de Google Cloud Composer y la [referencia de la versión del proveedor de OpenLineage](#openlineage-provider-version-reference) antes de cambiar los paquetes del entorno.

2. En la pestaña {{< ui >}}Advanced Configuration{{< /ui >}}, bajo {{< ui >}}Airflow configuration override{{< /ui >}}, haga clic en {{< ui >}}Add Airflow configuration override{{< /ui >}} y configure estos ajustes:

   - En Section 1, ingrese `openlineage`.
   - En Key 1, ingrese `disabled`.
   - En Value 1, ingrese `False` para asegurarse de que OpenLineage esté activado.

   - En Section 2, ingrese `openlineage`.
   - En Key 2, ingrese `transport`.
   - En Value 2, ingrese lo siguiente:

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

   * Reemplace `<DD_DATA_OBSERVABILITY_INTAKE>` completamente con `https://data-obs-intake.`{{< region-param key="dd_site" code="true" >}}.
   * Reemplace `<DD_API_KEY>` completamente con su [clave de Datadog API][5] válida.

**Opcional:** Configure el espacio de nombres de OpenLineage para establecer el valor de la etiqueta `env` en Datadog:
   - En Section 3, ingrese `openlineage`.
   - En Key 3, ingrese `namespace`.
   - En Value 3, ingrese el valor de su entorno de Composer (por ejemplo, prod, dev, staging o test).
   
**Nota:** Si [Dataplex][6] está habilitado, el espacio de nombres ya está configurado de forma predeterminada con el nombre del entorno de Composer. Configurar manualmente el espacio de nombres de OpenLineage aquí le permite, opcionalmente, anular este valor predeterminado.

Verifique las páginas de documentación oficial de [Airflow][4] y [Composer][3] para conocer otras configuraciones admitidas del proveedor `openlineage` en Google Cloud Composer.

[1]: https://cloud.google.com/composer/docs/composer-versioning-overview
[2]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[3]: https://cloud.google.com/composer/docs/airflow-configurations
[4]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/configurations-ref.html#configuration-openlineage
[5]: https://docs.datadoghq.com/es/account_management/api-app-keys/#api-keys
[6]: https://cloud.google.com/composer/docs/composer-2/lineage-integration
[7]: https://app.datadoghq.com/data-jobs/

### Validación {#validation-3}

En Datadog, visualice la página [Data Observability: Jobs Monitoring][7] para ver una lista de las ejecuciones de sus trabajos de Airflow después de la configuración.

### Solución de problemas {#troubleshooting-3}

Establezca `OPENLINEAGE_CLIENT_LOGGING` en `DEBUG` en la pestaña {{< ui >}}Environment variables{{< /ui >}} de la página de Composer para el cliente de OpenLineage y sus módulos secundarios. Esto puede ser útil para la solución de problemas mientras configura el proveedor `openlineage`.

Para ejecutar una verificación automatizada de su configuración de OpenLineage, consulte [Solucionar problemas de configuración de Airflow con el DAG de validación de OpenLineage][8].

[8]: /es/data_observability/jobs_monitoring/airflow_troubleshooting_dag/

{{% /tab %}}
{{< /tabs >}}

## Problemas conocidos {#known-issues}

En Airflow 2.x, marcar manualmente una ejecución de DAG o una tarea como fallida no actualiza su estado en Data Observability: Jobs Monitoring. Para las ejecuciones afectadas, las duraciones de los tramos y las métricas de duración pueden ser inexactas.

## Referencia de versión del proveedor de OpenLineage {#openlineage-provider-version-reference}

Data Observability: Jobs Monitoring utiliza el proveedor de OpenLineage de Apache Airflow para emitir eventos de DAG y tareas de Airflow. Para obtener la mejor experiencia, Datadog recomienda utilizar la versión más reciente del proveedor de OpenLineage que sea compatible con su versión de Airflow.

**Airflow 2.11 o posterior, incluido Airflow 3**
: **Versión recomendada del proveedor**: `2.20.3`
: **Dependencias mínimas requeridas**:
: - `apache-airflow-providers-common-sql>=1.32.0`
: - `apache-airflow-providers-common-compat>=1.15.0`
: - `openlineage-integration-common>=1.47.0`
: - `openlineage-python>=1.47.0`
: - `openlineage-integration-common>=1.52.0`
: - `openlineage-python>=1.52.0`
: **Notas**: Esta es la versión más reciente del proveedor. El proveedor `2.20.3` requiere Python 3.11 o posterior. El proveedor `2.9.0` y versiones posteriores requieren Airflow 2.11 o posterior.

**Airflow 2.10.x**
: **Versión recomendada del proveedor**: `2.8.0`
: **Dependencias mínimas requeridas**:
: - `apache-airflow-providers-common-sql>=1.20.0`
: - `apache-airflow-providers-common-compat>=1.8.0`
: - `openlineage-integration-common>=1.38.0`
: - `openlineage-python>=1.38.0`
: **Notas**: Esta es la versión más reciente del proveedor compatible con Airflow 2.10. El proveedor `2.9.0` y las versiones posteriores requieren Airflow 2.11 o posterior.

**Airflow 2.9.x**
: **Versión recomendada del proveedor**: `2.2.0`
: **Dependencias mínimas requeridas**:
: - `apache-airflow-providers-common-sql>=1.20.0`
: - `apache-airflow-providers-common-compat>=1.4.0`
: - `openlineage-integration-common>=1.31.0`
: - `openlineage-python>=1.31.0`
: **Notas**: Esta es la versión más reciente del proveedor compatible con Airflow 2.9. El proveedor `2.3.0` y las versiones posteriores requieren Airflow 2.10 o posterior.

**Airflow 2.8.x**
: **Versión recomendada del proveedor**: `1.14.0`
: **Dependencias mínimas requeridas**:
: - `apache-airflow-providers-common-sql>=1.20.0`
: - `apache-airflow-providers-common-compat>=1.2.1`
: - `openlineage-integration-common>=1.24.2`
: - `openlineage-python>=1.24.2`
: **Notas**: Esta es la versión más reciente del proveedor compatible con Airflow 2.8. El proveedor `2.0.0` y las versiones posteriores requieren Airflow 2.9 o posterior.

**Airflow 2.7.x**
: **Versión recomendada del proveedor**: `1.10.0`
: **Dependencias mínimas requeridas**:
: - `apache-airflow-providers-common-sql>=1.6.0`
: - `openlineage-integration-common>=1.16.0`
: - `openlineage-python>=1.16.0`
: **Notas**: Esta es la versión del proveedor más reciente compatible con Airflow 2.7. El proveedor `1.11.0` y posteriores requieren Airflow 2.8 o posterior. Para Airflow 2.7 y 2.8, agregue las variables de configuración adicionales que se muestran en los pasos de configuración. Si utiliza Amazon MWAA 2.7.2, consulte la guía de actualización de MWAA para obtener los wheels con parches de Datadog.

Revise el [registro de cambios del proveedor de OpenLineage](https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/changelog.html) antes de actualizar, ya que las versiones del proveedor pueden cambiar la versión mínima de Airflow admitida o agregar restricciones de dependencia requeridas.

## Configuración avanzada{#advanced-configuration}

### Vincule sus trabajos de dbt con tareas de Airflow {#link-your-dbt-jobs-with-airflow-tasks}

<div class="alert alert-info">El <code>lineage_root_*</code> las macros utilizadas a continuación requieren <code>apache-airflow-providers-openlineage</code> 2.3.0 o posterior. En versiones anteriores del proveedor (por ejemplo, Airflow 2.9.2 con el proveedor 2.2.0), consulte <a href="#backport-openlineage-lineage-macros-for-older-provider-versions">Adaptación de las macros de linaje de OpenLineage para versiones anteriores del proveedor</a>.</div>

Puede hacer un seguimiento de sus trabajos de dbt que se ejecutan en Airflow conectando la telemetría de dbt con las tareas de Airflow respectivas, utilizando [integración de dbt con OpenLineage][6].

Para visualizar el vínculo entre las tareas de Airflow y los trabajos de dbt, siga estos pasos:

1. Instale `openlineage-dbt`. Consulte [Uso de dbt con Amazon MWAA][7] para configurar dbt en el entorno virtual.

```shell
pip3 install openlineage-dbt>=1.39.0
```

2. Cambie la invocación de dbt a `dbt-ol` (envoltorio de OpenLineage para dbt).

Además, agregue la opción --consume-structured-logs para visualizar los trabajos de dbt mientras el comando aún se está ejecutando.

```bash
dbt-ol run --consume-structured-logs --project-dir=$TEMP_DIR --profiles-dir=$PROFILES_DIR
```

3. En su archivo DAG, establezca las variables de entorno parent y root-parent de OpenLineage en la tarea de Airflow que ejecuta el proceso de dbt para que los trabajos de dbt se vinculen tanto a la tarea padre inmediata como a la ejecución más externa del DAG en Datadog:

```python
dbt_run = BashOperator(
    task_id="dbt_run",
    dag=dag,
    bash_command=f"dbt-ol run --consume-structured-logs --project-dir=$TEMP_DIR --profiles-dir=$PROFILES_DIR",
    append_env=True,
    env={
        "OPENLINEAGE_PARENT_JOB_NAMESPACE": "{{ lineage_job_namespace() }}",
        "OPENLINEAGE_PARENT_JOB_NAME": "{{ lineage_job_name(task_instance) }}",
        "OPENLINEAGE_PARENT_RUN_ID": "{{ lineage_run_id(task_instance) }}",
        "OPENLINEAGE_ROOT_PARENT_JOB_NAMESPACE": "{{ lineage_root_job_namespace(task_instance) }}",
        "OPENLINEAGE_ROOT_PARENT_JOB_NAME": "{{ lineage_root_job_name(task_instance) }}",
        "OPENLINEAGE_ROOT_PARENT_RUN_ID": "{{ lineage_root_run_id(task_instance) }}",
    },
)
```

### Vincule sus trabajos de Spark con tareas de Airflow {#link-your-spark-jobs-with-airflow-tasks}

<div class="alert alert-info">El <code>lineage_root_*</code> las macros requieren <code>apache-airflow-providers-openlineage</code> 2.3.0 o posterior. En versiones anteriores del proveedor (por ejemplo, Airflow 2.9.2 con el proveedor 2.2.0), consulte <a href="#backport-openlineage-lineage-macros-for-older-provider-versions">Adaptación de las macros de linaje de OpenLineage para versiones anteriores del proveedor</a>.</div>

La integración de OpenLineage puede inyectar automáticamente la información del trabajo padre de Airflow (espacio de nombres, nombre del trabajo, ID de ejecución) en las propiedades de la aplicación Spark. Esto crea una relación de padre-hijo entre las tareas de Airflow y los trabajos de Spark, lo que le permite solucionar problemas de ambos sistemas en un solo lugar.

**Nota**: Esta función requiere la versión `apache-airflow-providers-openlineage` 2.1.0 o posterior (compatible a partir de Airflow 2.9+).

1. **Verifique la compatibilidad del operador**: Verifique en la [documentación de Apache Airflow OpenLineage][8] que sus operadores de Spark sean compatibles. Esta función solo funciona con operadores específicos como SparkSubmitOperator y LivyOperator.

2. Asegúrese de que se haga un seguimiento activo de sus trabajos de Spark mediante [Data Observability: Jobs Monitoring][2].

3. Habilite la inyección automática de información del trabajo padre con la siguiente configuración:

```shell
AIRFLOW__OPENLINEAGE__SPARK_INJECT_PARENT_JOB_INFO=true
```

Esto inyecta automáticamente las propiedades del trabajo padre para todos los operadores de Spark compatibles. Para deshabilitar esta función en operadores específicos, establezca `openlineage_inject_parent_job_info=False` en el operador.

#### Inyecte manualmente la información del trabajo padre para operadores no compatibles {#manually-inject-parent-job-information-for-unsupported-operators}

Para los operadores que no admiten la inyección automática (por ejemplo, un `BashOperator` que ejecuta la CLI de AWS para iniciar un trabajo de Amazon EMR Serverless), utilice las [macros de linaje de OpenLineage Airflow][4] para pasar los identificadores del padre y del padre raíz como propiedades de configuración de Spark:

```python
from datetime import datetime

from airflow import DAG
from airflow.operators.bash import BashOperator

with DAG(
    dag_id="emr_serverless_with_openlineage_parent",
    start_date=datetime(2026, 1, 1),
    schedule_interval=None,
    catchup=False,
) as dag:

    submit = BashOperator(
        task_id="start_emr_serverless_job",
        bash_command=r"""
set -euo pipefail

aws emr-serverless start-job-run \
  --application-id <APPLICATION_ID> \
  --execution-role-arn <EXECUTION_ROLE_ARN> \
  --name <JOB_NAME> \
  --region <AWS_REGION> \
  --mode STREAMING \
  --job-driver '{"sparkSubmit": {
    "entryPoint": "<JAR_URL>",
    "entryPointArguments": ["--config-key", "<CONFIG_KEY>", "--stage", "<STAGE>"],
    "sparkSubmitParameters": "\
--conf spark.app.name=<APP_NAME> \
--conf spark.openlineage.parentJobNamespace={{ lineage_job_namespace() }} \
--conf spark.openlineage.parentJobName={{ lineage_job_name(task_instance) }} \
--conf spark.openlineage.parentRunId={{ lineage_run_id(task_instance) }} \
--conf spark.openlineage.rootParentJobNamespace={{ lineage_root_job_namespace(task_instance) }} \
--conf spark.openlineage.rootParentJobName={{ lineage_root_job_name(task_instance) }} \
--conf spark.openlineage.rootParentRunId={{ lineage_root_run_id(task_instance) }}\
"
  }}'
""",
    )
```

### Adaptación de las macros de linaje de OpenLineage para versiones anteriores del proveedor {#backport-openlineage-lineage-macros-for-older-provider-versions}

Las macros `lineage_root_job_namespace`, `lineage_root_job_name` y `lineage_root_run_id`, que emiten los identificadores del DAG más externo para vincularlo con el padre raíz, se agregaron en `apache-airflow-providers-openlineage` 2.3.0. Si no puede actualizar el proveedor (por ejemplo, Amazon MWAA en Airflow 2.9.2 fija la versión del proveedor en 2.2.0), defina las macros faltantes como `user_defined_macros` en el DAG:

```python
from __future__ import annotations

from datetime import datetime

from airflow import DAG
from airflow.operators.bash import BashOperator
from airflow.providers.openlineage import conf as ol_conf
from airflow.providers.openlineage.plugins.adapter import OpenLineageAdapter


def _logical_date(ti):
    return getattr(ti, "logical_date", None) or ti.execution_date


def _clear_number(ti) -> int:
    return ti.get_dagrun().clear_number


def _root_from_conf(ti, key):
    ol = (ti.get_dagrun().conf or {}).get("openlineage") or {}
    return ol.get(key) or None


def lineage_job_namespace():
    return ol_conf.namespace()


def lineage_job_name(ti):
    return f"{ti.dag_id}.{ti.task_id}"


def lineage_run_id(ti):
    return OpenLineageAdapter.build_task_instance_run_id(
        dag_id=ti.dag_id,
        task_id=ti.task_id,
        try_number=ti.try_number,
        logical_date=_logical_date(ti),
        map_index=ti.map_index,
    )


def lineage_root_job_namespace(ti):
    return _root_from_conf(ti, "rootParentJobNamespace") or ol_conf.namespace()


def lineage_root_job_name(ti):
    return _root_from_conf(ti, "rootParentJobName") or ti.dag_id


def lineage_root_run_id(ti):
    forwarded = _root_from_conf(ti, "rootParentRunId")
    if forwarded:
        return forwarded
    return OpenLineageAdapter.build_dag_run_id(
        dag_id=ti.dag_id,
        logical_date=_logical_date(ti),
        clear_number=_clear_number(ti),
    )


OL_MACROS = {
    "lineage_job_namespace": lineage_job_namespace,
    "lineage_job_name": lineage_job_name,
    "lineage_run_id": lineage_run_id,
    "lineage_root_job_namespace": lineage_root_job_namespace,
    "lineage_root_job_name": lineage_root_job_name,
    "lineage_root_run_id": lineage_root_run_id,
}


with DAG(
    dag_id="<YOUR_DAG_ID>",
    start_date=datetime(2026, 1, 1),
    schedule_interval=None,
    catchup=False,
    user_defined_macros=OL_MACROS,
) as dag:
    submit = BashOperator(
        task_id="<YOUR_TASK_ID>",
        bash_command="...",
    )
```

Con `user_defined_macros` configurado en el DAG, las llamadas a `{{ lineage_*() }}` and `{{ lineage_root_*() }}` en sus plantillas de tareas se resuelven en valores que coinciden con las macros integradas incluidas con el proveedor 2.3.0+, por lo que los trabajos de Spark o dbt descendentes pueden vincularse al padre raíz de Airflow en Datadog.

### Excluir DAG específicos de Jobs Monitoring {#exclude-specific-dags-from-jobs-monitoring}

<div class="alert alert-info">El <code>emission_policy</code> la configuración requiere <code>apache-airflow-providers-openlineage</code> 2.19.0 o posterior, lo cual requiere Airflow 2.11 o posterior.</div>

Para evitar que DAG específicos envíen eventos de OpenLineage a Datadog, agregue una regla `emission_policy` para cada DAG a la sección `[openlineage]` de su configuración de Airflow:

```ini
[openlineage]
emission_policy = [{"scope": {"dag_id": "<YOUR_DAG_ID>"}, "controls": {"emit": false}}]
```

Reemplace `<YOUR_DAG_ID>` con el ID del DAG que desea excluir.

Para excluir varios DAG que comparten un patrón de nomenclatura, establezca `match_mode` en `regex`:

```ini
[openlineage]
emission_policy = [{"scope": {"dag_id": "^staging_.*"}, "match_mode": "regex", "controls": {"emit": false}}]
```

Establezca `emission_policy` de la misma manera que establece las otras opciones del proveedor de OpenLineage para su plataforma, como una anulación de configuración de Airflow o la variable de entorno `AIRFLOW__OPENLINEAGE__EMISSION_POLICY`. Reinicie los schedulers y workers de Airflow para aplicar el cambio.

Para alcances y controles adicionales, consulte la [documentación de la política de emisión de OpenLineage][9].


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/data_jobs
[2]: https://app.datadoghq.com/data-jobs/
[3]: https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html#lazy-load-plugins
[4]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/macros.html#lineage-job-run-macros
[5]: https://airflow.apache.org/docs/apache-airflow-providers-apache-spark/stable/_api/airflow/providers/apache/spark/operators/spark_submit/index.html#airflow.providers.apache.spark.operators.spark_submit.SparkSubmitOperator
[6]: https://openlineage.io/docs/integrations/dbt/
[7]: https://docs.aws.amazon.com/mwaa/latest/userguide/samples-dbt.html
[8]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/spark.html#automatic-injection
[9]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/emission_policy.html