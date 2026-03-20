---
app_id: databricks
categories:
- nube
- gestión de costos
- recopilación de logs
custom_kind: integración
description: Monitoriza la fiabilidad y el coste de tu entorno de Databricks.
further_reading:
- link: https://www.datadoghq.com/blog/data-jobs-monitoring/
  tag: blog
  text: Solucionar problemas y optimizar cargas de trabajo de procesamiento de datos
    con Data Jobs Monitoring
- link: https://www.datadoghq.com/blog/data-observability-monitoring/
  tag: blog
  text: Observar el ciclo de vida de los datos con Datadog
- link: https://www.datadoghq.com/blog/databricks-monitoring-datadog/
  tag: blog
  text: Monitorización de Databricks con Datadog
integration_version: 1.0.0
media: []
supported_os:
- Linux
- Windows
- macOS
title: Databricks
---
<div class="alert alert-info">
<a href="https://docs.datadoghq.com/data_jobs/">Data Jobs Monitoring</a> te ayuda a observar, solucionar problemas y optimizar los costes de tus trabajos y clústeres de Databricks.<br/><br/>
Esta página se limita a la documentación para la ingesta de métricas de servicio del modelo de Databricks, datos de utilización del clúster y tablas de referencia.
</div>

[Dashboard de Databricks por defecto](https://raw.githubusercontent.com/DataDog/integrations-core/master/databricks/images/databricks_dashboard.png)

## Información general

Datadog ofrece varias capacidades de monitorización de Databricks.

[Data Jobs Monitoring](https://www.datadoghq.com/product/data-jobs-monitoring/) proporciona monitorización para tus trabajos y clústeres de Databricks. Puedes detectar trabajos y flujos de trabajo de Databricks problemáticos en cualquier punto de tus pipelines de datos, corregir trabajos fallidos y de larga ejecución con mayor rapidez y optimizar los recursos de clúster para reducir costes.

[Cloud Cost Management](https://www.datadoghq.com/product/cloud-cost-management/) te ofrece una vista para analizar todos tus costes de DBU de Databricks junto con el gasto en la nube asociado.

[Log Management](https://www.datadoghq.com/product/log-management/) te permite agregar y analizar logs de tus trabajos y clústeres de Databricks. Puedes recopilar estos logs como parte de [Data Jobs Monitoring](https://www.datadoghq.com/product/data-jobs-monitoring/).

[Infrastructure Monitoring](https://docs.datadoghq.com/integrations/databricks/?tab=driveronly) te ofrece un subconjunto limitado de la funcionalidad de Data Jobs Monitoring: visibilidad de la utilización de recursos de tus clústeres de Databricks y métricas de rendimiento de Apache Spark.

Las [Tablas de referencia](https://docs.datadoghq.com/reference_tables) te permiten importar metadatos de tu espacio de trabajo de Databricks a Datadog. Estas tablas mejoran tu telemetría de Datadog con contexto crítico como nombres de espacios de trabajo, definiciones de trabajo, configuraciones de clúster y roles de usuario.

Las métricas de servicio de modelos brindan información sobre el rendimiento de la infraestructura de servicio de modelos de Databricks. Con estas métricas, puedes detectar endpoints que tienen una tasa de errores alta, una latencia alta, un aprovisionamiento excesivo o insuficiente, entre otros.

## Configuración

### Instalación

Obtén información sobre el estado de tu infraestructura que sirve a modelos siguiendo las instrucciones de [configuración que sirve a modelos](#model-serving-configuration).

Monitoriza aplicaciones de Databricks Spark con la [integración de Datadog Spark](https://app.datadoghq.com/integrations/spark). Instala el [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) en tus clústeres siguiendo las instrucciones de [configuración](#spark-configuration) para tu clúster apropiado. Consulta las instrucciones de [configuración de Spark](#spark-configuration).

### Configuración

#### Configuración que sirve al modelo

{{< tabs >}}

{{% tab "Use a Service Principal for OAuth" %}}

<div class="alert alert-warning">Los nuevos espacios de trabajo deben autenticarse mediante OAuth. Los espacios de trabajo integrados con un token de acceso personal siguen funcionando y pueden cambiar a OAuth en cualquier momento. Después de que un espacio de trabajo empiece a utilizar OAuth, no podrá volver a un token de acceso personal.</div>

1. En tu cuenta de Databricks, haz clic en **User Management** (Gestión de usuarios) en el menú de la izquierda. A continuación, en la pestaña **Service principals** (Entidades principales de servicio), haz clic en **Add service principal** (Añadir entidad principal de servicio).
1. En la pestaña **Credentials & secrets** (Credenciales y secretos), haz clic en **Generate secret** (Generar secreto). Establece **Lifetime (days)** (Vida útil (días)) en el valor máximo permitido (730) y, a continuación, haz clic en **Generate** (Generar). Anota tu ID de cliente y tu secreto de cliente. Anota también el ID de tu cuenta, que puedes encontrar haciendo clic en tu perfil en la esquina superior derecha.
1. Haz clic en **Workspaces** (Espacios de trabajo) en el menú de la izquierda y, a continuación, selecciona el nombre de tu espacio de trabajo.
1. Ve a la pestaña **Permissions** (Permisos) y haz clic en **Add permissions** (Añadir permisos).
1. Busca la entidad principal de servicio que has creado y asígnale el permiso **Admin**.
1. En Datadog, abre el cuadro de la integración Databricks.
1. En la pestaña **Configurar**, haz clic en **Add Databricks Workspace** (Añadir espacio de trabajo de Databricks).
1. Introduce un nombre de espacio de trabajo, la URL de tu espacio de trabajo de Databricks, el ID de cuenta y el ID y secreto de cliente que has generado.
1. En la sección **Seleccionar recursos para configurar la colección**, asegúrate de que **Métricas - Al servicio del modelo** está **Habilitado**.

{{% /tab %}}

{{% tab "Use a Personal Access Token (Legacy)" %}}

<div class="alert alert-warning">Esta opción sólo está disponible para espacios de trabajo creados antes del 7 de julio de 2025. Los nuevos espacios de trabajo deben autenticarse mediante OAuth.</div>

1. En tu espacio de trabajo de Databricks, haz clic en tu perfil en la esquina superior derecha y ve a **Configuración**. Selecciona **Desarrollador** en la barra lateral izquierda. Junto a **Tokens de acceso**, haz clic en **Manage** (Gestionar).

1. Haz clic en **Generate new token** (Generar nuevo token), introduce "Datadog Integration" en el campo **Comentario**, elimina el valor predeterminado en **Vida útil (días)** y haz clic en **Generate** (Generar). Toma nota de tu token.

   **Importante:**

   - Asegúrate de borrar el valor por defecto en **Vida útil (días)** para que el token no caduque y no se rompa la integración.
   - Asegúrate de que la cuenta que genera el token tiene [acceso CAN VIEW](https://docs.databricks.com/en/security/auth-authz/access-control/index.html#job-acls) para los trabajos y clústeres de Databricks que deseas monitorizar.

   Como alternativa, sigue la [documentación oficial de Databricks](https://docs.databricks.com/en/admin/users-groups/service-principals.html#what-is-a-service-principal) para generar un token de acceso para una [entidad principal de servicio](https://docs.databricks.com/en/admin/users-groups/service-principals.html#what-is-a-service-principal).

1. En Datadog, abre el cuadro de la integración Databricks.

1. En la pestaña **Configurar**, haz clic en **Add Databricks Workspace** (Añadir espacio de trabajo de Databricks).

1. Introduce un nombre de espacio de trabajo, la URL de tu espacio de trabajo de Databricks y el token de Databricks que generaste.

1. En la sección **Seleccionar recursos para configurar la colección**, asegúrate de que **Métricas - Al servicio del modelo** está **Habilitado**.

{{% /tab %}}

{{< /tabs >}}

#### Configuración de la tabla de referencia

1. Configura un espacio de trabajo en el cuadro de integración de Databricks de Datadog.
1. En el panel de detalle de las cuentas, haz clic en **Reference Tables** (Tablas de referencia).
1. En la pestaña **Reference Tables** (Tablas de referencia), haz clic en **Add New Reference Table** (Añadir nueva tabla de referencia).
1. Proporciona el **nombre de la tabla de referencia**, el **nombre de la tabla de Databricks** y la **clave principal** de tu vista o tabla de Databricks.

- Para obtener resultados óptimos, crea una vista en Databricks que incluya únicamente los datos específicos que deseas enviar a Datadog. Esto significa generar una tabla dedicada que refleje el ámbito exacto necesario para tu caso de uso.

5. Haz clic en **Save** (Guardar).

#### Configuración de Spark

Configura la integración de Spark para monitorizar tu clúster de Apache Spark en Databricks y recopilar el sistema y las métricas de Spark.

Cada script descrito a continuación puede modificarse para adaptarlo a tus necesidades. Por ejemplo, puedes:

- Añadir etiquetas (tags) específicas a tus instancias.
- Modificar la configuración de la integración de Spark.

{{% site-region region="us,us3,us5,eu,gov,ap1" %}}

También puedes definir o modificar variables de entorno con la ruta del script init en el ámbito del clúster utilizando la interfaz de usuario, la CLI de Databricks o invocando la API de clústeres:

- Configura `DD_API_KEY` para identificar mejor tus clústeres.
- Configura `DD_ENV` para identificar mejor tus clústeres.
- Configura `DD_SITE` en tu sitio: {{< region-param key="dd_site" code="true" >}}. De modo predeterminado es `datadoghq.com`

{{% /site-region %}}

<div class="alert alert-warning">Por razones de seguridad, no se recomienda definir la variable de entorno `DD_API_KEY` en texto simple directamente en la interfaz de usuario. En su lugar, utiliza <a href="https://docs.databricks.com/en/security/secrets/index.html">secretos de Databricks</a>.</div>

#### Con un script de inicio global

Un script init global se ejecuta en cada clúster creado en tu área de trabajo. Los scripts init globales son útiles cuando se desea aplicar configuraciones de bibliotecas o pantallas de seguridad en toda la organización.

<div class="alert alert-info">Solo los administradores del área de trabajo pueden gestionar scripts de inicio globales.</div>
<div class="alert alert-info">Los scripts de inicio globales solo se ejecutan en clústeres configurados con un único usuario o en el modo de acceso compartido sin aislamiento de legacy. Por lo tanto, Databricks recomienda configurar todos los scripts de inicio como ámbito de clúster y gestionarlos en toda el área de trabajo mediante políticas de clúster.</div>

Utiliza la interfaz de usuario de Databricks para editar los scripts de inicio globales:

1. Elige uno de los siguientes scripts para instalar el Agent en el controlador o en los nodos controlador y trabajador del clúster.
1. Modifica el script para adaptarlo a tus necesidades. Por ejemplo, puedes añadir etiquetas (tags) o definir una configuración específica para la integración.
1. Ve a la configuración de administración y haz clic en la pestaña **Scripts de inicio globales**.
1. Haz clic en el botón **+ Añadir**.
1. Dale un nombre al script, por ejemplo `Datadog init script` y pégalo en el campo **Script**.
1. Haz clic en el conmutador **Habilitado** para activarlo.
1. Haz clic en el botón **Añadir**.

Después de estos pasos, cualquier clúster nuevo utiliza el script automáticamente. Puedes encontrar más información sobre scripts init globales en la [documentación oficial de Databricks](https://docs.databricks.com/clusters/init-scripts.html#global-init-scripts).

<div class="alert alert-info">Puedes definir varios scripts de inicio y especificar su orden en la interfaz de usuario.</div>

{{< tabs >}}

{{% tab "Driver only" %}}

##### Instala el Datadog Agent en el controlador

Instala el Datadog Agent en el nodo controlador del clúster.

<div class="alert alert-warning">Es necesario definir el valor de la variable `DD_API_KEY` en el script.</div>

``script de shell
#!/bin/bash
cat <<EOF > /tmp/start_datadog.sh
#!/bin/bash

fecha -u +"%Y-%m-%d %H:%M:%S UTC"
eco "Running on the driver? \$DB_IS_DRIVER"
eco "Driver ip: \$DB_DRIVER_IP"

DB_CLUSTER_NAME=$(echo "$DB_CLUSTER_NAME" | sed -e 's/ /_/g' -e "s/'/_/g")
DD_API_KEY='<YOUR_API_KEY>'

si [[ \${DB_IS_DRIVER} = "TRUE" ]]; entonces
  eco "Installing Datadog Agent on the driver..."

  # CONFIGURAR ETIQUETAS (TAGS) DEL HOST PARA EL CONTROLADOR
  DD_TAGS="entorno:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${DB_DRIVER_IP}","spark_node:driver","databricks_instance_type:\${DB_INSTANCE_TYPE}","databricks_is_job_cluster:\${DB_IS_JOB_CLUSTER}"

  # INSTALAR LA ÚLTIMA VERSIÓN DEL DATADOG AGENT 7 EN LOS NODOS CONTROLADOR Y TRABAJADOR
  DD_INSTALL_ONLY=true \
    DD_API_KEY=\$DD_API_KEY \
    DD_HOST_TAGS=\$DD_TAGS \
    DD_HOSTNAME="\$(hostname | xargs)" \
    DD_SITE="\${DD_SITE:-datadoghq.com}" \
    bash -c "\$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"

  # Evitar conflictos en el puerto 6062
  eco "process_config.expvar_port: 6063" >> /etc/datadog-agent/datadog.yaml

  eco "Datadog Agent is installed"

  si bien[ -z \$DB_DRIVER_PORT ]; haz
    si [ -e "/tmp/driver-env.sh" ]; entonces
      DB_DRIVER_PORT="\$(grep -i "CONF_UI_PORT" /tmp/driver-env.sh | cut -d'=' -f2)"
    fi
    eco "Waiting 2 seconds for DB_DRIVER_PORT"
    sleep 2
  hecho

  eco "DB_DRIVER_PORT=\$DB_DRIVER_PORT"

  # ESCRIBIR ARCHIVO DE CONFIGURACIÓN DE INTEGRACIÓN DE SPARK CON MÉTRICAS DE STREAMING ESTRUCTURADAS ACTIVADAS
  # MODIFICAR PARA INCLUIR OTRAS OPCIONES EN spark.d/conf.yaml.example
  eco "init_config:
instancias:
    - spark_url: http://\${DB_DRIVER_IP}:\${DB_DRIVER_PORT}
      spark_cluster_mode: spark_driver_mode
      cluster_name: \${DB_CLUSTER_NAME}
      streaming_metrics: true
      executor_level_metrics: true
logs:
    - tipo: archivo
      ruta: /databricks/driver/Logs/*.log
      fuente: spark
     servicio: databricks
      log_processing_rules:
        - tipo: multi_line
          nombre: new_log_start_with_date
          patrón: \d{2,4}[\-\/]\d{2,4}[\-\/]\d{2,4}.*" > /etc/datadog-agent/conf.d/spark.d/spark.yaml

  eco "Spark integration configured"

  # ACTIVAR LOGS EN Datadog.yaml PARA RECOPILAR LOGS DEL CONTROLADOR
  sed -i '/.*logs_enabled:.*/a logs_enabled: true' /etc/datadog-agent/datadog.yaml
fi

eco "Restart the agent"
sudo service datadog-agent restart
EOF

chmod a+x /tmp/start_datadog.sh
/tmp/start_datadog.sh >> /tmp/datadog_start.log 2>&1 & disown
```

{{% /tab %}}

{{% tab "All nodes" %}}

##### Install the Datadog Agent on driver and worker nodes

Install the Datadog Agent on the driver and worker nodes of the cluster.

<div class="alert alert-warning">You will need to define the value of the `DD_API_KEY` variable inside the script.</div>

```shell script
#!/bin/bash
cat <<EOF > /tmp/start_datadog.sh
#!/bin/bash

date -u +"%Y-%m-%d %H:%M:%S UTC"
echo "Running on the driver? \$DB_IS_DRIVER"
echo "Driver ip: \$DB_DRIVER_IP"

DB_CLUSTER_NAME=$(echo "$DB_CLUSTER_NAME" | sed -e 's/ /_/g' -e "s/'/_/g")
DD_API_KEY='<YOUR_API_KEY>'

if [[ \${DB_IS_DRIVER} = "TRUE" ]]; then
  echo "Installing Datadog Agent on the driver (master node)."

  # CONFIGURE HOST TAGS FOR DRIVER
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${DB_DRIVER_IP}","spark_node:driver","databricks_instance_type:\${DB_INSTANCE_TYPE}","databricks_is_job_cluster:\${DB_IS_JOB_CLUSTER}"

  # INSTALL THE LATEST DATADOG AGENT 7 ON DRIVER AND WORKER NODES
  DD_INSTALL_ONLY=true \
    DD_API_KEY=\$DD_API_KEY \
    DD_HOST_TAGS=\$DD_TAGS \
    DD_HOSTNAME="\$(hostname | xargs)" \
    DD_SITE="\${DD_SITE:-datadoghq.com}" \
    bash -c "\$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"

  echo "Datadog Agent is installed"

  while [ -z \$DB_DRIVER_PORT ]; do
    if [ -e "/tmp/driver-env.sh" ]; then
      DB_DRIVER_PORT="\$(grep -i "CONF_UI_PORT" /tmp/driver-env.sh | cut -d'=' -f2)"
    fi
    echo "Waiting 2 seconds for DB_DRIVER_PORT"
    sleep 2
  done

  echo "DB_DRIVER_PORT=\$DB_DRIVER_PORT"

  # WRITING CONFIG FILE FOR SPARK INTEGRATION WITH STRUCTURED STREAMING METRICS ENABLED
  # MODIFY TO INCLUDE OTHER OPTIONS IN spark.d/conf.yaml.example
  echo "init_config:
instances:
    - spark_url: http://\${DB_DRIVER_IP}:\${DB_DRIVER_PORT}
      spark_cluster_mode: spark_driver_mode
      cluster_name: \${DB_CLUSTER_NAME}
      streaming_metrics: true
      executor_level_metrics: true
logs:
    - type: file
      path: /databricks/driver/logs/*.log
      source: spark
      service: databricks
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: \d{2,4}[\-\/]\d{2,4}[\-\/]\d{2,4}.*" > /etc/datadog-agent/conf.d/spark.d/spark.yaml

  echo "Spark integration configured"

  # ENABLE LOGS IN datadog.yaml TO COLLECT DRIVER LOGS
  sed -i '/.*logs_enabled:.*/a logs_enabled: true' /etc/datadog-agent/datadog.yaml
else
  echo "Installing Datadog Agent on the worker."

  # CONFIGURE HOST TAGS FOR WORKERS
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${SPARK_LOCAL_IP}","spark_node:worker","databricks_instance_type:\${DB_INSTANCE_TYPE}","databricks_is_job_cluster:\${DB_IS_JOB_CLUSTER}"

  # INSTALL THE LATEST DATADOG AGENT 7 ON DRIVER AND WORKER NODES
  # CONFIGURE HOSTNAME EXPLICITLY IN datadog.yaml TO PREVENT AGENT FROM FAILING ON VERSION 7.40+
  # SEE https://github.com/DataDog/datadog-agent/issues/14152 FOR CHANGE
  DD_INSTALL_ONLY=true DD_API_KEY=\$DD_API_KEY DD_HOST_TAGS=\$DD_TAGS DD_HOSTNAME="\$(hostname | xargs)" bash -c "\$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"

  echo "Datadog Agent is installed"
fi

# Avoid conflicts on port 6062
echo "process_config.expvar_port: 6063" >> /etc/datadog-agent/datadog.yaml

echo "Restart the agent"
sudo service datadog-agent restart
EOF

chmod a+x /tmp/start_datadog.sh
/tmp/start_datadog.sh >> /tmp/datadog_start.log 2>&1 & disown

```

{{% /tab %}}

{{< /tabs >}}

#### Con un script init en el clúster

Los scripts de inicio de ámbito de clúster son scripts de inicio definidos en la configuración del clúster. Los scripts de inicio de ámbito de clúster se aplican a los clústeres que creas y a los creados para ejecutar trabajos. Databricks admite la configuración y el almacenamiento de scripts de inicio a través de:

- Archivos de área de trabajo
- Unity Catalog Volumes
- Almacenamiento de objetos en la nube

Utiliza la interfaz de usuario de Databricks para editar el clúster y ejecutar el script de inicio:

1. Elige uno de los siguientes scripts para instalar el Agent en el controlador o en los nodos controlador y trabajador del clúster.
1. Modifica el script para adaptarlo a tus necesidades. Por ejemplo, puedes añadir etiquetas (tags) o definir una configuración específica para la integración.
1. Guarda el script en tu área de trabajo con el menú **Área de trabajo** de la izquierda. Si utilizas **Unity Catalog Volume**, guarda el script en tu **Volume** con el menú **Catalog** de la izquierda.
1. En la página de configuración del clúster, haz clic en el conmutador de opciones **Avanzadas**.
1. En las **Variables de entorno**, especifica la variable de entorno `DD_API_KEY` y, opcionalmente, las variables de entorno `DD_ENV` y `DD_SITE`.
1. Ve a la pestaña **Scripts de inicio**.
1. En el menú desplegable **Destino**, selecciona el tipo de destino `Workspace`. Si utilizas **Unity Catalog Volume**, en el menú desplegable **Destino**, selecciona el tipo de destino `Volume`.
1. Especifica una ruta al script init.
1. Haz clic en el botón **Añadir**.

Si guardaste tu `datadog_init_script.sh` directamente en el área de trabajo `Shared`, puedes acceder al archivo en la siguiente ruta: `/Shared/datadog_init_script.sh`.

Si guardaste tu `datadog_init_script.sh` directamente en un área de trabajo del usuario, puedes acceder al archivo en la siguiente ruta: `/Users/$EMAIL_ADDRESS/datadog_init_script.sh`.

Si guardaste tu `datadog_init_script.sh` directamente en un `Unity Catalog Volume`, puedes acceder al archivo en la siguiente ruta: `/Volumes/$VOLUME_PATH/datadog_init_script.sh`.

Puedes encontrar más información sobre los scripts init de clúster en la [documentación oficial de Databricks](https://docs.databricks.com/clusters/init-scripts.html#global-init-scripts).

{{< tabs >}}

{{% tab "Driver only" %}}

##### Instala el Datadog Agent en el controlador

Instala el Datadog Agent en el nodo controlador del clúster.

``script de shell
#!/bin/bash
cat <<EOF > /tmp/start_datadog.sh
#!/bin/bash

fecha -u +"%Y-%m-%d %H:%M:%S UTC"
eco "Running on the driver? \$DB_IS_DRIVER"
eco "Driver ip: \$DB_DRIVER_IP"

DB_CLUSTER_NAME=$(echo "$DB_CLUSTER_NAME" | sed -e 's/ /_/g' -e "s/'/_/g")

si [[ \${DB_IS_DRIVER} = "TRUE" ]]; entonces
  eco "Installing Datadog Agent on the driver..."

  # CONFIGURAR ETIQUETAS (TAGS) DEL HOST PARA EL CONTROLADOR
  DD_TAGS="entorno:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${DB_DRIVER_IP}","spark_node:driver","databricks_instance_type:\${DB_INSTANCE_TYPE}","databricks_is_job_cluster:\${DB_IS_JOB_CLUSTER}"

  # INSTALAR LA ÚLTIMA VERSIÓN DEL DATADOG AGENT 7 EN LOS NODOS CONTROLADOR Y TRABAJADOR
  DD_INSTALL_ONLY=true \
    DD_API_KEY=\$DD_API_KEY \
    DD_HOST_TAGS=\$DD_TAGS \
    DD_HOSTNAME="\$(hostname | xargs)" \
    DD_SITE="\${DD_SITE:-datadoghq.com}" \
    bash -c "\$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"

  # Evitar conflictos en el puerto 6062
  eco "process_config.expvar_port: 6063" >> /etc/datadog-agent/datadog.yaml

  eco "Datadog Agent is installed"

  si bien[ -z \$DB_DRIVER_PORT ]; haz
    si [ -e "/tmp/driver-env.sh" ]; entonces
      DB_DRIVER_PORT="\$(grep -i "CONF_UI_PORT" /tmp/driver-env.sh | cut -d'=' -f2)"
    fi
    eco "Waiting 2 seconds for DB_DRIVER_PORT"
    sleep 2
  hecho

  eco "DB_DRIVER_PORT=\$DB_DRIVER_PORT"

  # ESCRIBIR ARCHIVO DE CONFIGURACIÓN DE INTEGRACIÓN DE SPARK CON MÉTRICAS DE STREAMING ESTRUCTURADAS ACTIVADAS
  # MODIFICAR PARA INCLUIR OTRAS OPCIONES EN spark.d/conf.yaml.example
  eco "init_config:
instancias:
    - spark_url: http://\${DB_DRIVER_IP}:\${DB_DRIVER_PORT}
      spark_cluster_mode: spark_driver_mode
      cluster_name: \${DB_CLUSTER_NAME}
      streaming_metrics: true
      executor_level_metrics: true
logs:
    - tipo: archivo
      ruta: /databricks/driver/Logs/*.log
      fuente: spark
     servicio: databricks
      log_processing_rules:
        - tipo: multi_line
          nombre: new_log_start_with_date
          patrón: \d{2,4}[\-\/]\d{2,4}[\-\/]\d{2,4}.*" > /etc/datadog-agent/conf.d/spark.d/spark.yaml

  eco "Spark integration configured"

  # ACTIVAR LOGS EN Datadog.yaml PARA RECOPILAR LOGS DEL CONTROLADOR
  sed -i '/.*logs_enabled:.*/a logs_enabled: true' /etc/datadog-agent/datadog.yaml
fi


eco "Restart the agent"
sudo service datadog-agent restart
EOF

chmod a+x /tmp/start_datadog.sh
/tmp/start_datadog.sh >> /tmp/datadog_start.log 2>&1 & disown
```

{{% /tab %}}

{{% tab "All nodes" %}}

##### Install the Datadog Agent on driver and worker nodes

Install the Datadog Agent on the driver and worker nodes of the cluster.

```shell script
#!/bin/bash
cat <<EOF > /tmp/start_datadog.sh
#!/bin/bash

date -u +"%Y-%m-%d %H:%M:%S UTC"
echo "Running on the driver? \$DB_IS_DRIVER"
echo "Driver ip: \$DB_DRIVER_IP"

DB_CLUSTER_NAME=$(echo "$DB_CLUSTER_NAME" | sed -e 's/ /_/g' -e "s/'/_/g")

if [[ \${DB_IS_DRIVER} = "TRUE" ]]; then
  echo "Installing Datadog Agent on the driver (master node)."

  # CONFIGURE HOST TAGS FOR DRIVER
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${DB_DRIVER_IP}","spark_node:driver","databricks_instance_type:\${DB_INSTANCE_TYPE}","databricks_is_job_cluster:\${DB_IS_JOB_CLUSTER}"

  # INSTALL THE LATEST DATADOG AGENT 7 ON DRIVER AND WORKER NODES
  DD_INSTALL_ONLY=true \
    DD_API_KEY=\$DD_API_KEY \
    DD_HOST_TAGS=\$DD_TAGS \
    DD_HOSTNAME="\$(hostname | xargs)" \
    DD_SITE="\${DD_SITE:-datadoghq.com}" \
    bash -c "\$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"

  echo "Datadog Agent is installed"

  while [ -z \$DB_DRIVER_PORT ]; do
    if [ -e "/tmp/driver-env.sh" ]; then
      DB_DRIVER_PORT="\$(grep -i "CONF_UI_PORT" /tmp/driver-env.sh | cut -d'=' -f2)"
    fi
    echo "Waiting 2 seconds for DB_DRIVER_PORT"
    sleep 2
  done

  echo "DB_DRIVER_PORT=\$DB_DRIVER_PORT"

  # WRITING CONFIG FILE FOR SPARK INTEGRATION WITH STRUCTURED STREAMING METRICS ENABLED
  # MODIFY TO INCLUDE OTHER OPTIONS IN spark.d/conf.yaml.example
  echo "init_config:
instances:
    - spark_url: http://\${DB_DRIVER_IP}:\${DB_DRIVER_PORT}
      spark_cluster_mode: spark_driver_mode
      cluster_name: \${DB_CLUSTER_NAME}
      streaming_metrics: true
      executor_level_metrics: true
logs:
    - type: file
      path: /databricks/driver/logs/*.log
      source: spark
      service: databricks
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: \d{2,4}[\-\/]\d{2,4}[\-\/]\d{2,4}.*" > /etc/datadog-agent/conf.d/spark.d/spark.yaml

  echo "Spark integration configured"

  # ENABLE LOGS IN datadog.yaml TO COLLECT DRIVER LOGS
  sed -i '/.*logs_enabled:.*/a logs_enabled: true' /etc/datadog-agent/datadog.yaml
else
  echo "Installing Datadog Agent on the worker."

  # CONFIGURE HOST TAGS FOR WORKERS
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${SPARK_LOCAL_IP}","spark_node:worker","databricks_instance_type:\${DB_INSTANCE_TYPE}","databricks_is_job_cluster:\${DB_IS_JOB_CLUSTER}"

  # INSTALL THE LATEST DATADOG AGENT 7 ON DRIVER AND WORKER NODES
  # CONFIGURE HOSTNAME EXPLICITLY IN datadog.yaml TO PREVENT AGENT FROM FAILING ON VERSION 7.40+
  # SEE https://github.com/DataDog/datadog-agent/issues/14152 FOR CHANGE
  DD_INSTALL_ONLY=true DD_API_KEY=\$DD_API_KEY DD_HOST_TAGS=\$DD_TAGS DD_HOSTNAME="\$(hostname | xargs)" bash -c "\$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"

  echo "Datadog Agent is installed"
fi

# Avoid conflicts on port 6062
echo "process_config.expvar_port: 6063" >> /etc/datadog-agent/datadog.yaml

echo "Restart the agent"
sudo service datadog-agent restart
EOF

chmod a+x /tmp/start_datadog.sh
/tmp/start_datadog.sh >> /tmp/datadog_start.log 2>&1 & disown
```

{{% /tab %}}

{{< /tabs >}}

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **databricks.model_serving.cpu_usage_percentage** <br>(gauge) | Uso medio de la CPU utilizada en todas las réplicas durante el último minuto<br>_Se muestra como porcentaje_ |
| **databricks.model_serving.gpu_mem_usage_percentage.avg** <br>(gauge) | Uso medio de memoria de GPU utilizado en todas las GPU durante el minuto<br>_Se muestra como porcentaje_ |
| **databricks.model_serving.gpu_mem_usage_percentage.max** <br>(gauge) | Uso máximo de memoria de GPU utilizado en todas las GPU durante el minuto<br>_Se muestra como porcentaje_. |
| **databricks.model_serving.gpu_mem_usage_percentage.min** <br>(gauge) | Uso mínimo de memoria de GPU utilizado en todas las GPU durante el minuto<br>_Se muestra como porcentaje_ |
| **databricks.model_serving.gpu_usage_percentage.avg** <br>(gauge) | Uso medio de la GPU utilizada en todas las GPU durante el minuto<br>_Se muestra como porcentaje_. |
| **databricks.model_serving.gpu_usage_percentage.max** <br>(gauge) | Uso máximo de la GPU utilizado en todas las GPU durante el minuto<br>_Se muestra como porcentaje_ |
| **databricks.model_serving.gpu_usage_percentage.min** <br>(gauge) | Uso mínimo de la GPU utilizado en todas las GPU durante el minuto<br>_Se muestra como porcentaje_ |
| **databricks.model_serving.mem_usage_percentage** <br>(gauge) | Uso medio de la memoria utilizada en todas las réplicas durante el último minuto<br>_Se muestra como porcentaje_ |
| **databricks.model_serving.provisioned_concurrent_requests_total** <br>(gauge) | Número de concurrencias provisionadas durante el último minuto<br>_Se muestra como solicitud_ |
| **databricks.model_serving.request_4xx_count_total** <br>(gauge) | Número de errores 4xx durante el último minuto<br>_Se muestra como solicitud_ |
| **databricks.model_serving.request_5xx_count_total** <br>(gauge) | Número de errores 5xx durante el último minuto<br>_Se muestra como solicitud_ |
| **databricks.model_serving.request_count_total** <br>(gauge) | Número de solicitudes durante el último minuto<br>_Se muestra como solicitud_ |
| **databricks.model_serving.request_latency_ms.75percentile** <br>(gauge) | Percentil 75 de latencia de solicitud en milisegundos durante el minuto<br>_Se muestra en milisegundos_ |
| **databricks.model_serving.request_latency_ms.90percentile** <br>(gauge) | Percentil 90 de latencia de solicitud en milisegundos durante el minuto<br>_Se muestra en milisegundos_ |
| **databricks.model_serving.request_latency_ms.95percentile** <br>(gauge) | Percentil 95 de latencia de solicitud en milisegundos durante el minuto<br>_Se muestra en milisegundos_ |
| **databricks.model_serving.request_latency_ms.99percentile** <br>(gauge) | Percentil 99 de latencia de solicitud en milisegundos durante el minuto<br>_Se muestra en milisegundos_ |s

#### Métricas de servicio del modelo

Consulta [metadata.csv](https://github.com/DataDog/integrations-core/blob/master/databricks/metadata.csv) para obtener una lista de las métricas proporcionadas por esta integración.

#### Métricas de Spark

Consulta la [documentación de la integración de Spark](https://docs.datadoghq.com/integrations/spark/#metrics) para obtener una lista de las métricas de Spark recopiladas.

### Checks de servicio

Consulta la [documentación de la integración de Spark](https://docs.datadoghq.com/integrations/spark/#service-checks) para ver la lista de checks de servicio recopilados.

### Eventos

La integración de Databricks no incluye ningún evento.

## Solucionar problemas

Puedes solucionar los problemas habilitando el [terminal web de Databricks](https://docs.databricks.com/en/clusters/web-terminal.html) o utilizando un [notebook de Databricks](https://docs.databricks.com/en/notebooks/index.html). Consulta la documentación [Solución de problemas del Agent](https://docs.datadoghq.com/agent/troubleshooting/) para obtener información sobre pasos útiles para la resolución de problemas.

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Carga de un script a Unity Catalog Volume](https://docs.databricks.com/en/ingestion/add-data/upload-to-volume.html#upload-files-to-a-unity-catalog-volume)