---
app_id: databricks
app_uuid: f99b6e79-f50a-479d-b916-955a577e4f41
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10152
    source_type_name: Databricks
  logs:
    source: spark
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- gestión de costos
- recopilación de logs
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/databricks/README.md
display_on_public_website: true
draft: false
git_integration_title: databricks
integration_id: databricks
integration_title: Databricks
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: databricks
public_title: Databricks
short_description: Monitoriza el rendimiento, la fiabilidad y el costo de tus trabajos
  de Apache Spark y Databricks.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Cost Management
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Monitoriza el rendimiento, la fiabilidad y el costo de tus trabajos
    de Apache Spark y Databricks.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/data-jobs-monitoring/
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/data-observability-monitoring/
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/databricks-monitoring-datadog/
  support: README.md#Support
  title: Databricks
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-core -->


<div class="alert alert-warning">
<a href="https://docs.datadoghq.com/data_jobs/">Data Jobs Monitoring</a> te ayuda a observar, solucionar problemas y optimizar los costos de tus trabajos y clústeres de Databricks.<br/><br/>
Esta página se limita a la documentación para la ingesta de las métricas y logs de utilización de clústeres de Databricks.
</div>

![Dashboard predeterminado de Databricks][1]

## Información general

Monitoriza tus clústeres de [Databricks][2] con la [integración de Spark][3] de Datadog.

Esta integración unifica logs, métricas de la infraestructura y del rendimiento de Spark, proporcionando visibilidad en tiempo real del estado de tus nodos y el rendimiento de tus trabajos. Puede ayudarte a depurar errores, ajustar el rendimiento e identificar problemas como particiones de datos ineficientes o clústeres con la memoria agotada.

Para más detalles, consulta [Monitorizar Databricks con Datadog][4].

## Configuración

### Instalación

Monitoriza Databricks Spark con la [integración de Datadog Spark][5]. Instala el [Datadog Agent ][6] en tus clústeres siguiendo las instrucciones para la [configuración](#configuration) para tu clúster apropiado. Después, instala la [integración de Spark][5] en Datadog para autoinstalar el dashboard de Información general de Databricks.

### Configuración

Configura la integración de Spark para monitorizar tu clúster de Apache Spark en Databricks y recopilar el sistema y las métricas de Spark.

Cada script descrito a continuación puede modificarse para adaptarlo a tus necesidades. Por ejemplo, puedes:
- Añadir etiquetas (tags) específicas a tus instancias.
- Modificar la configuración de la integración de Spark.


{{% site-region region="us,us3,us5,eu,gov,ap1" %}}
También puedes definir o modificar variables de entorno con la ruta del script de inicio del ámbito del clúster a través de la interfaz de usuario, de la CLI de Databricks o invocando la API de clústeres.
  - Configura `DD_API_KEY` para identificar mejor tus clústeres.
  - Configura `DD_ENV` para identificar mejor tus clústeres.
  - Configura `DD_SITE` en tu sitio: {{< region-param key="dd_site" code="true" >}}. De modo predeterminado es `datadoghq.com`
{{% /site-region %}}


<div class="alert alert-warning">Por razones de seguridad, no se recomienda definir la variable de entorno `DD_API_KEY` en texto simple directamente en la interfaz de usuario. En su lugar, utiliza <a href="https://docs.databricks.com/en/security/secrets/index.html">secretos de Databricks</a>.</div>



#### Con un script de inicio global

Un script de inicial global se ejecuta en cada clúster creado en tu espacio de trabajo. Las secuencias de scripts de inicio globales son útiles cuando se desea aplicar configuraciones o pantallas de seguridad de bibliotecas en toda la organización. 

<div class="alert alert-info">Solo los administradores del espacio de trabajo pueden gestionar scripts de inicio globales.</div>
<div class="alert alert-info">Los scripts de inicio globales solo se ejecutan en clústeres configurados con un único usuario o en el modo de acceso compartido sin aislamiento de legacy. Por lo tanto, Databricks recomienda configurar todos los scripts de inicio como ámbito de clúster y gestionarlos en todo el espacio de trabajo mediante políticas de clúster.</div>

Utiliza la interfaz de usuario de Databricks para editar los scripts de inicio globales:

1. Elige uno de los siguientes scripts para instalar el Agent en el controlador o en los nodos controlador y trabajador del clúster.
2. Modifica el script para adaptarlo a tus necesidades. Por ejemplo, puedes añadir etiquetas (tags) o definir una configuración específica para la integración.
3. Ve a la configuración de administración y haz clic en la pestaña **Scripts de inicio globales**.
4. Haz clic en el botón **+ Añadir**.
5. Dale un nombre al script, por ejemplo `Datadog init script` y pégalo en el campo **Script**.
6. Haz clic en el conmutador **Habilitado** para activarlo.
7. Haz clic en el botón **Añadir**.

Después de estos pasos, cualquier nuevo clúster utiliza el script en forma automática. Puedes encontrar más información sobre scripts de inicio globales en la [documentación oficial de Databricks][7].

<div class="alert alert-info">Puedes definir varios scripts de inicio y especificar su orden en la interfaz de usuario.</div>

{{< tabs >}}
{{% tab "Solo controlador" %}}
##### Instala el Datadog Agent en el controlador

Instala el Datadog Agent en el nodo del controlador del clúster. 

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
  DD_TAGS="entorno:\${DD_ENV}", "databricks_cluster_id:\${DB_CLUSTER_ID}", "databricks_cluster_name:\${DB_CLUSTER_NAME}", "spark_host_ip:\${DB_DRIVER_IP}", "spark_node:driver", "databricks_instance_type:\${DB_INSTANCE_TYPE}", "databricks_is_job_cluster:\${DB_IS_JOB_CLUSTER}".

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

  mientras[ -z \$DB_DRIVER_PORT ]; haz
    si [ -e "/tmp/driver-env.sh" ]; entonces
      DB_DRIVER_PORT="\$(grep -i "CONF_UI_PORT" /tmp/driver-env.sh | cut -d'=' -f2)"
    fi
    eco "Waiting 2 seconds for DB_DRIVER_PORT"
    sleep 2
  hecho

  eco "DB_DRIVER_PORT=\$DB_DRIVER_PORT"

  # ESCRIBIR ARCHIVO DE CONFIGURACIÓN PARA INTEGRACIÓN DE SPARK CON MÉTRICAS DE STREAMING ESTRUCTURADAS ACTIVADAS
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

  # ACTIVAR LOGS EN datadog.yaml PARA RECOPILAR LOGS DEL CONTROLADOR
  sed -i '/.*logs_enabled:.*/a logs_enabled: true' /etc/datadog-agent/datadog.yaml
fi

eco "Restart the agent"
sudo service datadog-agent restart
EOF

chmod a+x /tmp/start_datadog.sh
/tmp/start_datadog.sh >> /tmp/datadog_start.log 2>&1 & disown
```

{{% /tab %}}
{{% tab "Todos los nodos" %}}
##### Instale el Datadog Agent en los nodos controlador y trabajador del clúster

Instale el Datadog Agent en los nodos controlador y trabajador del clúster

<div class="alert alert-warning">Deberás definir el valor de la variable `DD_API_KEY` en el script.</div>

```script de shell
#!/bin/bash
cat <<EOF > /tmp/start_datadog.sh
#!/bin/bash

fecha -u +"%Y-%m-%d %H:%M:%S UTC"
eco "Running on the driver? \$DB_IS_DRIVER"
eco "Driver ip: \$DB_DRIVER_IP"

DB_CLUSTER_NAME=$(echo "$DB_CLUSTER_NAME" | sed -e 's/ /_/g' -e "s/'/_/g")
DD_API_KEY='<YOUR_API_KEY>'

si [[ \${DB_IS_DRIVER} = "TRUE" ]]; entonces
  eco "Installing Datadog Agent on the driver (master node)."

  # CONFIGURAR ETIQUETAS (TAGS) DEL HOST PARA EL CONTROLADOR
  DD_TAGS="entorno:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${DB_DRIVER_IP}","spark_node:driver","databricks_instance_type:\${DB_INSTANCE_TYPE}","databricks_is_job_cluster:\${DB_IS_JOB_CLUSTER}"

  # INSTALAR LA ÚLTIMA VERSIÓN DEL DATADOG AGENT PARA LOS NODOS CONTROLADOR Y TRABAJADOR
  DD_INSTALL_ONLY=true \
    DD_API_KEY=\$DD_API_KEY \
    DD_HOST_TAGS=\$DD_TAGS \
    DD_HOSTNAME="\$(hostname | xargs)" \
    DD_SITE="\${DD_SITE:-datadoghq.com}" \
    bash -c "\$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"

  eco "Datadog Agent is installed"

  mientras [ -z \$DB_DRIVER_PORT ]; haz
    si [ -e "/tmp/driver-env.sh" ]; entonces
      DB_DRIVER_PORT="\$(grep -i "CONF_UI_PORT" /tmp/driver-env.sh | cut -d'=' -f2)"
    fi
    eco "Waiting 2 seconds for DB_DRIVER_PORT"
    sleep 2
  hecho

  eco "DB_DRIVER_PORT=\$DB_DRIVER_PORT"

  # ESCRIBIR EL ARCHIVO DE CONFIGURACIÓN PARA LA INTEGRACIÓN DE SPARK CON MÉTRICAS DE STREAMING ESTRUCTURADAS ACTIVADAS
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
      ruta: /databricks/driver/logs/*.log
      fuente: spark
      servicio: databricks
      log_processing_rules:
        - tipo: multi_line
          nombre: new_log_start_with_date
          patrón: \d{2,4}[\-\/]\d{2,4}[\-\/]\d{2,4}.*" > /etc/datadog-agent/conf.d/spark.d/spark.yaml

  eco "Spark integration configured"

  # ACTIVAR LOGS EN datadog.yaml PARA RECOPILAR LOGS DEL CONTROLADOR
  sed -i '/.*logs_enabled:.*/a logs_enabled: true' /etc/datadog-agent/datadog.yaml
o
  eco "Installing Datadog Agent on the worker."

  # CONFIGURAR ETIQUETAS (TAGS) DEL HOST PARA TRABAJADORES
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${SPARK_LOCAL_IP}","spark_node:worker","databricks_instance_type:\${DB_INSTANCE_TYPE}","databricks_is_job_cluster:\${DB_IS_JOB_CLUSTER}"

  # INSTALAR LA ÚLTIMA VERSIÓN DEL DATADOG AGENT 7 EN LOS NODOS CONTROLADOR Y TRABAJADOR
  # CONFIGURAR NOMBRE DEL HOST EXPLÍCITAMENTE EN datadog.yaml PARA IMPEDIR QUE EL AGENT FALLE EN LA VERSIÓN 7.40+
  # CONSULTA https://github.com/DataDog/datadog-agent/issues/14152 PARA CAMBIAR
  DD_INSTALL_ONLY=true DD_API_KEY=\$DD_API_KEY DD_HOST_TAGS=\$DD_TAGS DD_HOSTNAME="\$(hostname | xargs)" bash -c "\$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"

  eco "Datadog Agent is installed"
fi

# Evitar conflictos en el puerto 6062
eco "process_config.expvar_port: 6063" >> /etc/datadog-agent/datadog.yaml

eco "Restart the agent"
sudo service datadog-agent restart
EOF

chmod a+x /tmp/start_datadog.sh
/tmp/start_datadog.sh >> /tmp/datadog_start.log 2>&1 & disown

```

{{% /tab %}}
{{< /tabs >}}

#### Con un script de inicio de ámbito de clúster 

Los scripts de inicio de ámbito de clúster son scripts de inicio definidos en la configuración del clúster. Los scripts de inicio de ámbito de clúster se aplican a los clústeres que creas y a los creados para ejecutar trabajos. Databricks admite la configuración y el almacenamiento de scripts de inicio a través de:
- Archivos de área de trabajo
- Volúmenes de Unity Catalog
- Almacenamiento de objetos en la nube

Utiliza la interfaz de usuario de Databricks para editar el clúster y ejecutar el script de inicio:

1. Elige uno de los siguientes scripts para instalar el Agent en el controlador o en los nodos controlador y trabajador del clúster.
2. Modifica el script para adaptarlo a tus necesidades. Por ejemplo, puedes añadir etiquetas (tags) o definir una configuración específica para la integración.
3. Guarda el script en tu área de trabajo con el menú **Área de trabajo** de la izquierda. Si utilizas **Unity Catalog Volume**, guarda el script en tu **Volume** con el menú **Catalog** de la izquierda.
4. En la página de configuración del clúster, haz clic en el conmutador de opciones **Avanzadas**.
5. En las **Variables de entorno**, especifica la variable de entorno `DD_API_KEY` y, opcionalmente, las variables de entorno `DD_ENV` y `DD_SITE`.
6. Ve a la pestaña **Scripts de inicio**.
7. En el menú desplegable **Destino**, selecciona el tipo de destino `Workspace`. Si utilizas **Unity Catalog Volume**, en el menú desplegable **Destino**, selecciona el tipo de destino `Volume`.
8. Especifica una ruta al script de inicio. 
9. Haz clic en el botón **Añadir**.

Si guardaste tu `datadog_init_script.sh` directamente en el área de trabajo `Shared`, puedes acceder al archivo en la siguiente ruta: `/Shared/datadog_init_script.sh`.

Si guardaste tu `datadog_init_script.sh` directamente en un área de trabajo del usuario, puedes acceder al archivo en la siguiente ruta: `/Users/$EMAIL_ADDRESS/datadog_init_script.sh`.

Si guardaste to `datadog_init_script.sh` directamente en un `Unity Catalog Volume`, puedes acceder al archivo en la siguiente ruta: `/Volumes/$VOLUME_PATH/datadog_init_script.sh`.

Puedes encontrar más información sobre los scripts de inicio del clúster en la [documentación oficial de Databricks][7].

{{< tabs >}}
{{% tab "Solo controlador" %}}
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

  si bien [ -z \$DB_DRIVER_PORT ]; haz
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
{{% tab "Todos los nodos" %}}
##### Instalar el Datadog Agent en los nodos controlador y trabajador

Instalar el Datadog Agent en los nodos controlador y trabajador del clúster

```script de shell
#!/bin/bash
cat <<EOF > /tmp/start_datadog.sh
#!/bin/bash

fecha -u +"%Y-%m-%d %H:%M:%S UTC"
eco "Running on the driver? \$DB_IS_DRIVER"
eco "Driver ip: \$DB_DRIVER_IP"

DB_CLUSTER_NAME=$(echo "$DB_CLUSTER_NAME" | sed -e 's/ /_/g' -e "s/'/_/g")

si [[ \${DB_IS_DRIVER} = "TRUE" ]]; entonces
  eco "Installing Datadog Agent on the driver (master node)."

  # CONFIGURAR ETIQUETAS (TAGS) DEL HOST PARA EL CONTROLADOR
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${DB_DRIVER_IP}","spark_node:driver","databricks_instance_type:\${DB_INSTANCE_TYPE}","databricks_is_job_cluster:\${DB_IS_JOB_CLUSTER}"

  # INSTALAR LA ÚLTIMA VERSIÓN DEL DATADOG AGENT 7 EN LOS NODOS CONTROLADOR Y TRABAJADOR
  DD_INSTALL_ONLY=true \
    DD_API_KEY=\$DD_API_KEY \
    DD_HOST_TAGS=\$DD_TAGS \
    DD_HOSTNAME="\$(hostname | xargs)" \
    DD_SITE="\${DD_SITE:-datadoghq.com}" \
    bash -c "\$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"

  eco "Datadog Agent is installed"

  si bien [ -z \$DB_DRIVER_PORT ]; haz
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
      ruta: /databricks/driver/logs/*.log
      fuente: spark
      servicio: databricks
      log_processing_rules:
        - type: multi_line
          nombre: new_log_start_with_date
          patrón: \d{2,4}[\-\/]\d{2,4}[\-\/]\d{2,4}.*" > /etc/datadog-agent/conf.d/spark.d/spark.yaml

  eco "Spark integration configured"

  # ACTIVAR LOGS EN datadog.yaml PARA RECOPILAR LOGS DEL CONTROLADOR
  sed -i '/.*logs_enabled:.*/a logs_enabled: true' /etc/datadog-agent/datadog.yaml
o
  eco "Installing Datadog Agent on the worker."

  # CONFIGURAR ETIQUETAS (TAGS) DEL HOST PARA TRABAJADORES
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${SPARK_LOCAL_IP}","spark_node:worker","databricks_instance_type:\${DB_INSTANCE_TYPE}","databricks_is_job_cluster:\${DB_IS_JOB_CLUSTER}"

  # INSTALAR LA ÚLTIMA VERSIÓN DEL DATADOG AGENT 7 EN LOS NODOS CONTROLADOR Y TRABAJADOR
  # CONFIGURAR EL NOMBRE DEL HOST EXPLÍCITAMENTE EN datadog.yaml PARA IMPEDIR QUE EL AGENT FALLE EN LA VERSIÓN 7.40+
  # CONSULTA https://github.com/DataDog/datadog-agent/issues/14152 PARA CAMBIOS
  DD_INSTALL_ONLY=true DD_API_KEY=\$DD_API_KEY DD_HOST_TAGS=\$DD_TAGS DD_HOSTNAME="\$(hostname | xargs)" bash -c "\$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"

  eco "Datadog Agent is installed"
fi

# Evitar conflictos en el puerto 6062
eco "process_config.expvar_port: 6063" >> /etc/datadog-agent/datadog.yaml

eco "Restart the agent"
sudo service datadog-agent restart
EOF

chmod a+x /tmp/start_datadog.sh
/tmp/start_datadog.sh >> /tmp/datadog_start.log 2>&1 & disown
```

{{% /tab %}}
{{< /tab >}}

## Datos recopilados

### Métricas

Consulta la [documentación de la integración de Spark][8] para obtener una lista de métricas recopiladas.

### Checks de servicio

Consulta la [documentación de la integración de Spark][9] para obtener la lista de chechs de servicio recopilados.

### Eventos

La integración de Databricks no incluye ningún evento.

## Solucionar problemas

Puedes solucionar los problemas tú mismo habilitando el [terminal web de Databricks][10] o utilizando una [notebook Databricks][11]. Consulta la documentación de [Solucionar problemas del Agent][12] para obtener información sobre pasos útiles para solucionar problemas. 

¿Necesitas ayuda? Ponte en contacto con [soporte técnico de Datadog][13].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Cargar un script en el Unity Catalog Volume][14]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/databricks/images/databricks_dashboard.png
[2]: https://databricks.com/
[3]: https://docs.datadoghq.com/es/integrations/spark/?tab=host
[4]: https://www.datadoghq.com/blog/databricks-monitoring-datadog/
[5]: https://app.datadoghq.com/integrations/spark
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: https://docs.databricks.com/clusters/init-scripts.html#global-init-scripts
[8]: https://docs.datadoghq.com/es/integrations/spark/#metrics
[9]: https://docs.datadoghq.com/es/integrations/spark/#service-checks
[10]: https://docs.databricks.com/en/clusters/web-terminal.html
[11]: https://docs.databricks.com/en/notebooks/index.html
[12]: https://docs.datadoghq.com/es/agent/troubleshooting/
[13]: https://docs.datadoghq.com/es/help/
[14]: https://docs.databricks.com/en/ingestion/add-data/upload-to-volume.html#upload-files-to-a-unity-catalog-volume