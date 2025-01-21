---
further_reading:
- link: /data_jobs
  tag: Documentación
  text: Data Jobs Monitoring
title: Habilitar Data Jobs Monitoring para Databricks
---

[Data Jobs Monitoring][7] ofrece visibilidad sobre el rendimiento y la fiabilidad de tus trabajos de Apache Spark y Databricks.

## Ajustes

Sigue estos pasos para habilitar Data Jobs Monitoring para Databricks.

1. [Configura la integración Datadog-Databricks](#configure-the-datadog-databricks-integration) para un espacio de trabajo de Databricks.
1. [Instala el Datadog Agent](#install-the-datadog-agent-on-your-databricks-clusters) en tus clústeres de Databricks en el espacio de trabajo.


### Configurar la integración Datadog-Databricks

1. En tu espacio de trabajo de Databricks, haz clic en tu perfil en la esquina superior derecha y ve a **Configuración**. Selecciona **Desarrollador** en la barra lateral izquierda. Junto a **Tokens de acceso**, haz clic en **Manage** (Gestionar).
1. Haz clic en **Generate new token** (Generar nuevo token), introduce "Integración Datadog" en el campo **Comentario**, elimina el valor predeterminado en **Ciclo de vida (días)** y haz clic en **Generate* (Generar). Toma nota de tu token.

   **Importante:**
   * Asegúrate de eliminar el valor por defecto en **Ciclo de vida (días)** para que el token no caduque y no se rompa la integración.
   * Asegúrate de que la cuenta que genera el token tiene [acceso de VISTA][9] para los trabajos y clústeres de Databricks que quieres monitorizar.

   También puedes seguir la [documentación oficial de Databricks][10] para generar un token de acceso para un [elemento principal de servicio][11].

1. En Datadog, abre el cuadro de la integración Databricks.
1. En la pestaña **Configurar**, haz clic en **Add Databricks Workspace** (Añadir espacio de trabajo de Databricks).
1. Introduce un nombre de espacio de trabajo, la URL de tu espacio de trabajo de Databricks y el token de Databricks que generaste.
   {{< img src="data_jobs/databricks/configure-workspace-form.png" alt="En el cuadro de la integración Datadog-Databricks se muestra un espacio de trabajo de Databricks. Este espacio de trabajo tiene un nombre, una URL y un token de API." style="width:100%;" >}}
1. En la sección **Seleccionar productos para configurar la integración**, asegúrate de que el producto Data Jobs Monitoring está **Habilitado**.
1. En la sección **Configuración del Datadog Agent**, elige
  - [Gestionado por Datadog (recomendado)](?tab=datadogmanagedglobalinitscriptrecommended#install-the-datadog-agent): Datadog instala y gestiona el Agent con un script init global en el espacio de trabajo.
  - [Manualmente](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent): Sigue las [siguientes instrucciones](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent) para instalar y gestionar el script init para instalar el Agent globalmente o en clústeres de Databricks específicos.

### Instalar el Datadog Agent

El Datadog Agent debe instalarse en clústeres de Databricks para monitorizar trabajos de Databricks que se ejecutan en clústeres multipropósito o de trabajo.

{{< tabs >}}
{{% tab "Script init global de Datadog Datadog (Recomendado)" %}}

Datadog puede instalar y gestionar un script init global en el espacio de trabajo de Databricks. El Datadog Agent se instala en todos los clústeres del espacio de trabajo, cuando se inician.

#### Al integrar un espacio de trabajo con Datadog

1. En la sección **Seleccionar productos para configurar la integración**, asegúrate de que el producto Data Jobs Monitoring está **Habilitado**.
1. En la sección **Configuración del Datadog Agent**, selecciona el conmutador **Gestionado por Datadog**.
1. Haz clic en **Select API Key** (Seleccionar clave de API) para seleccionar una clave de API Datadog existente o crear una nueva clave de API Datadog.
1. Haz clic en **Save Databricks Workspace** (Guardar el espacio de trabajo de Databricks).
   {{< img src="data_jobs/databricks/configure-data-jobs-monitoring-new.png" alt="En el cuadro de la integración Datadog-Databricks, configuración del Datadog Agent al agregar un espacio de trabajo de Databricks. Datadog puede instalar y gestionar un script init global." style="width:100%;" >}}

#### Al añadir el script init a un espacio de trabajo de Databricks ya integrado con Datadog

1. En la pestaña **Configurar**, haz clic en el espacio de trabajo en la lista de espacios de trabajo.
1. Haz clic en la pestaña **Productos configurados**.
1. Asegúrate de que el producto Data Jobs Monitoring está **Habilitado**.
1. En la sección **Configuración del Datadog Agent**, selecciona el conmutador **Gestionado por Datadog**.
1. Haz clic en **Select API Key** (Seleccionar clave de API) para seleccionar una clave de API Datadog existente o crear una nueva clave de API Datadog.
1. Haz clic en **Save** (Guardar) en la parte inferior de la ventana del navegador.
   {{< img src="data_jobs/databricks/configure-data-jobs-monitoring-existing.png" alt="En el cuadro de la integración Datadog-Databricks, configuración del Datadog Agent para un espacio de trabajo de Databricks ya agregado a la integración. Datadog puede instalar y gestionar un script init global." style="width:100%;" >}}

{{% /tab %}}

{{% tab "Instalar manualmente un script init global" %}}

1. En Databricks, haz clic en tu nombre para mostrar (dirección de correo electrónico) en la esquina superior derecha de la página.
1. Selecciona **Configuración** y haz clic en la pestaña **Cálculo**.
1. En la sección **Clústeres multipropósito**, junto a **Scripts init globales**, haz clic en **Manage** (Gestionar).
1. Haz clic en **Add** (Añadir). Asigna un nombre a tu script. A continuación, en el campo **Script**, copia y pega el siguiente script, recordando sustituir los parámetros por los valores de tus parámetros.

   ```shell
   #!/bin/bash

   # Required parameters
   export DD_API_KEY=<YOUR API KEY>
   export DD_SITE=<YOUR DATADOG SITE>
   export DATABRICKS_WORKSPACE="<YOUR WORKSPACE NAME>"

   # Download and run the latest init script
   bash -c "$(curl -L https://dd-data-jobs-monitoring-setup.s3.amazonaws.com/scripts/databricks/databricks_init_latest.sh)" || true
   ```

   El script anterior define los parámetros requeridos, descarga y ejecuta el último script init para Data Jobs Monitoring en Databricks. Si quieres fijar tu script a una versión específica, puedes sustituir el nombre del archivo en la URL por `databricks_init_1.5.1.sh` para utilizar la última versión estable.

1. Para habilitar la secuencia de comandos para todos los clústeres nuevos reiniciados, activa el conmutador **Habilitado**.
   {{< img src="data_jobs/databricks/toggle.png" alt="Interfaz de usuario de Databricks, parámetros de administrador, scripts init globales. En la lista hay un script llamado 'install-datadog-agent' con un conmutador activado." style="width:100%;" >}}
1. Haz clic en **Add** (Añadir).

#### Definir los parámetros necesarios del script init

Proporciona los valores de los parámetros del script init al principio del script init global.

```bash
export DD_API_KEY=<YOUR API KEY>
export DD_SITE=<YOUR DATADOG SITE>
export DATABRICKS_WORKSPACE="<YOUR WORKSPACE NAME>"
```

También puedes configurar aquí otros parámetros del script init y variables de entorno de Datadog, como `DD_ENV` y `DD_SERVICE`. El script puede configurarse utilizando los siguientes parámetros:

| Variable                 | Descripción                                                                                                                                                      | Valor predeterminado |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| DD_API_KEY               | Tu [clave de API Datadog][1].                                                                                                                                        |         |
| DD_SITE                  | Tu [sitio Datadog][2].                                                                                                                                           |         |
| DATABRICKS_WORKSPACE     | Nombre de tu espacio de trabajo de Databricks. Debe coincidir con el nombre proporcionado en el [paso de la integración Datadog-Databricks](#configure-the-datadog-databricks-integration). Encierra el nombre entre comillas dobles si contiene espacios en blanco. |         |
| DRIVER_LOGS_ENABLED      | Recopila logs de unidades Spark en Datadog.                                                                                                                          | falso   |
| WORKER_LOGS_ENABLED      | Recopila logs de workers Spark en Datadog.                                                                                                                         | falso   |
| DD_DJM_ADD_LOGS_TO_FAILURE_REPORT      | Incluye logs del script init para la depuración cuando informes de un fallo a Datadog. | falso |

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /es/getting_started/site/

{{% /tab %}}

{{% tab "Instalar manualmente en un clúster específico" %}}

1. En Databricks, crea un archivo de script init en **Espacio de trabajo** con el siguiente contenido. Asegúrate de anotar la ruta del archivo.
   ```shell
   #!/bin/bash

   # Download and run the latest init script
   bash -c "$(curl -L https://dd-data-jobs-monitoring-setup.s3.amazonaws.com/scripts/databricks/databricks_init_latest.sh)" || true
   ```

   El script anterior descarga y ejecuta el último script init para Data Jobs Monitoring en Databricks. Si quieres fijar tu script a una versión específica, puedes sustituir el nombre del archivo en la URL por `databricks_init_1.3.1.sh` para utilizar la última versión estable.

1. En la página de configuración del clúster, haz clic en el conmutador **Opciones avanzadas**.
1. En la parte inferior de la página, ve a la pestaña **Scripts init**.

   {{< img src="data_jobs/databricks/init_scripts.png" alt="Interfaz de usuario de Databricks, configuración del clúster, opciones avanzadas. Pestaña Scripts init. Menú desplegable 'Destino' y selector de archivos 'Ruta del script init'." style="width:80%;" >}}

   - En el menú desplegable **Destino**, selecciona `Workspace`.
   - En **Ruta del script init**, introduce la ruta de tu script init.
   - Haz clic en **Add** (Añadir).

#### Definir los parámetros necesarios del script init

1. En Databricks, en la página de configuración del clúster, haz clic en el conmutador **Opciones avanzadas**.
2. En la parte inferior de la página, ve a la pestaña **Spark**.
   {{< img src="data_jobs/databricks/configure-databricks-cluster-init-script-quoted.png" alt="Interfaz de usuario, opciones avanzadas de configuración del clúster, pestaña Spark. Un cuadro de texto llamado 'Variables de entorno' contiene valores para DD_API_KEY y DD_SITE." style="width:100%;" >}}

   En el cuadro de texto **Variables de entorno**, introduce los valores de los parámetros del script init.

   ```text
   DD_API_KEY=<YOUR API KEY>
   DD_SITE=<YOUR DATADOG SITE>
   DATABRICKS_WORKSPACE="<YOUR WORKSPACE NAME>"
   ```

   También puedes configurar aquí otros parámetros del script init y variables de entorno de Datadog, como `DD_ENV` y `DD_SERVICE`. El script puede configurarse utilizando los siguientes parámetros:

| Variable                 | Descripción                                                                                                                                                      | Valor predeterminado |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| DD_API_KEY               | Tu [clave de API Datadog][1].                                                                                                                                        |         |
| DD_SITE                  | Tu [sitio Datadog][2].                                                                                                                                           |         |
| DATABRICKS_WORKSPACE     | Nombre de tu espacio de trabajo de Databricks. Debe coincidir con el nombre proporcionado en el [paso de la integración Datadog-Databricks](#configure-the-datadog-databricks-integration). Encierra el nombre entre comillas dobles si contiene espacios en blanco. |         |
| DRIVER_LOGS_ENABLED      | Recopila logs de unidades Spark en Datadog.                                                                                                                          | falso   |
| WORKER_LOGS_ENABLED      | Recopila logs de workers Spark en Datadog.                                                                                                                         | falso   |
| DD_DJM_ADD_LOGS_TO_FAILURE_REPORT      | Incluye logs del script init para la depuración cuando informes de un fallo a Datadog. | falso |


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /es/getting_started/site/

3. Haz clic en **Confirmar**.

{{% /tab %}}

{{< /tabs >}}

### Reiniciar clústeres en ejecución

El script init instala el Agent cuando se inician clústeres.

Los clústeres multipropósito en ejecución o los clústeres de trabajos de larga duración deben reiniciarse manualmente para que el script init instale el Datadog Agent.

En los trabajos programados que se ejecutan en clústeres de trabajos, el script init instala el Datadog Agent automáticamente durante la siguiente ejecución.

## Validación

En Datadog, consulta la página [Data Jobs Monitoring][6] para ver una lista de todos tus trabajos de Databricks.

## Solucionar problemas

{{% djm-install-troubleshooting %}}

Si el Agent no está instalado, consulta los logs de instalación que se encuentran en `/tmp/datadog-djm-init.log`.

Si necesita más ayuda del servicio de asistencia de Datadog, añade la siguiente variable entorno al script init. Esto asegura que los logs se envíen a Datadog cuando se produce un fallo.
  ```shell
  export DD_DJM_ADD_LOGS_TO_FAILURE_REPORT=true
  ```

## Configuración avanzada

### Tramos (spans) de etiquetas (tags) en tiempo de ejecución

{{% djm-runtime-tagging %}}

### Agregar métricas de clúster de ejecuciones únicas de trabajos
Esta configuración es aplicable si quieres datos de uso de recursos de clúster sobre tus trabajos y crear un nuevo trabajo y clúster para cada ejecución a través del [endpoint de la API de ejecución única][8] (común cuando se utilizan herramientas de orquestación fuera de Databricks como Airflow o Azure Data Factory).

Si envías trabajos de Databricks a través del [endpoint de la API de ejecución única][8], cada ejecución de trabajo tiene un ID de trabajo único. Esto puede dificultar la agrupación y el análisis de métricas de clúster de trabajos que utilizan clústeres efímeros. Para agregar el uso de clústeres del mismo trabajo y evaluar el rendimiento de varias ejecuciones, debes configurar la variable `DD_JOB_NAME` dentro de `spark_env_vars` de cada `new_cluster` con el mismo valor de `run_name` que la carga útil de la solicitud.

A continuación se muestra un ejemplo de cuerpo de solicitud de ejecución única de un trabajo:

   {{< highlight json "hl_lines=2 18" >}}
   {
      "run_name": "Example Job",
      "idempotency_token": "8f018174-4792-40d5-bcbc-3e6a527352c8",
      "tasks": [
         {
            "task_key": "Example Task",
            "description": "Description of task",
            "depends_on": [],
            "notebook_task": {
               "notebook_path": "/Path/to/example/task/notebook",
               "source": "WORKSPACE"
            },
            "new_cluster": {
               "num_workers": 1,
               "spark_version": "13.3.x-scala2.12",
               "node_type_id": "i3.xlarge",
               "spark_env_vars": {
                  "DD_JOB_NAME": "Example Job"
               }
            }
         }
      ]
   }
   {{< /highlight >}}

### Configurar Data Jobs Monitoring con restricciones de red de Databricks
Debido a las [restricciones de red de Databricks][12], es posible que Datadog no tenga acceso a tus API Databricks, algo que es necesario para recopilar trazas (traces) de ejecuciones de trabajos de Databricks junto con etiquetas y otros metadatos.

Si estás controlando el acceso a la API Databricks a través de listas de acceso IP, la lista de autorizaciones específica de Datadog {{< region-param key="ip_ranges_url_webhooks" link="true" text="IP addresses" >}} permite a tu clúster realizar todas estas interacciones con servicios Datadog. Para ver más detalles sobre cómo gestionar las listas de acceso IP en Databricks, consulta la [documentación de Databricks][13].

Si estás utilizando [Databricks Private Connectivity][14], los pasos para configurar la conexión dependen de tu proveedor de nube.
{{< whatsnext desc="Consulta la guía de tu entorno en la nube:" >}}
 {{< nextlink href="agent/guide/private-link" >}}Conectarse a Datadog a través de AWS Private Link{{< /nextlink >}}
 {{< nextlink href="agent/guide/azure-private-link" >}}Conectarse a Datadog a través de Azure Private Link{{< /nextlink >}}
 {{< nextlink href="agent/guide/gcp-private-service-connect" >}}Conectarse a Datadog a través de GCP Private Service Connect{{< /nextlink >}}
{{< /whatsnext >}}

Si necesitas más ayuda, ponte en contacto con el [equipo de asistencia][15] de Datadog.

## Para leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/databricks?search=databricks
[4]: https://docs.databricks.com/en/security/secrets/index.html
[6]: https://app.datadoghq.com/data-jobs/
[7]: /es/data_jobs
[8]: https://docs.databricks.com/api/workspace/jobs/submit
[9]: https://docs.databricks.com/en/security/auth-authz/access-control/index.html#job-acls
[10]: https://docs.databricks.com/en/admin/users-groups/service-principals.html#manage-personal-access-tokens-for-a-service-principal
[11]: https://docs.databricks.com/en/admin/users-groups/service-principals.html#what-is-a-service-principal
[12]: https://docs.databricks.com/en/security/network/front-end/index.html
[13]: https://docs.databricks.com/en/security/network/front-end/ip-access-list.html
[14]: https://www.databricks.com/trust/security-features/secure-your-data-with-private-networking
[15]: https://www.datadoghq.com/support/