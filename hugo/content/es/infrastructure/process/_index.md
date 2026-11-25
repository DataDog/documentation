---
aliases:
- /es/guides/process
- /es/graphing/infrastructure/process/
further_reading:
- link: /infrastructure/process/generate_process_metrics/
  tag: Documentación
  text: Aumente la retención de datos de procesos con métricas
- link: /infrastructure/livecontainers
  tag: Documentación
  text: Obtenga visibilidad en tiempo real de todos los contenedores en su entorno
- link: https://www.datadoghq.com/blog/live-process-monitoring/
  tag: Blog
  text: Monitoree sus procesos con Datadog
- link: https://www.datadoghq.com/blog/monitor-third-party-software-with-live-processes/
  tag: Blog
  text: Correlacione el rendimiento del software y el consumo de recursos con vistas
    guardadas
- link: https://www.datadoghq.com/blog/process-level-data/
  tag: Blog
  text: Solucione problemas más rápido con datos de red y aplicaciones a nivel de
    proceso
- link: https://www.datadoghq.com/blog/watchdog-live-processes/
  tag: Blog
  text: Solucione anomalías en el rendimiento de la carga de trabajo con Watchdog
    Insights para Live Processes
title: Live Processes
---
<div class="alert alert-info">
Live Processes y Live Process Monitoring están incluidos en el plan Enterprise. Para todos los demás planes, comuníquese con su representante de cuenta o <a href="mailto:success@datadoghq.com">success@datadoghq.com</a> para solicitar esta función.
</div>

## Introducción {#introduction}

Live Processes de Datadog le brinda visibilidad en tiempo real de los procesos que se ejecutan en su infraestructura. Utilice Live Processes para:

* Ver todos sus procesos en ejecución en un solo lugar
* Desglosar el consumo de recursos en sus servidores y contenedores a nivel de proceso
* Consultar los procesos que se ejecutan en un servidor específico, en una zona específica o que ejecutan una carga de trabajo específica
* Monitorear el rendimiento del software interno y de terceros que ejecuta utilizando métricas del sistema con una granularidad de dos segundos
* Agregar contexto a sus paneles y cuadernos

{{< img src="infrastructure/process/live_processes_main.png" alt="Descripción general de Live Processes" >}}

## Instalación {#installation}

Si está utilizando Agent 5, siga este [proceso de instalación específico][1]. Si está utilizando Agent 6 o 7, [consulte las instrucciones a continuación][2].

{{< tabs >}}
{{% tab "Linux/Windows" %}}

Una vez instalado el Datadog Agent, habilite la recopilación de Live Processes editando el [archivo de configuración principal del Agent][1] y estableciendo el siguiente parámetro en `true`:

```yaml
process_config:
  process_collection:
    enabled: true
```

Además, algunas opciones de configuración pueden establecerse como variables de entorno.

**Nota**: Las opciones establecidas como variables de entorno anulan los ajustes definidos en el archivo de configuración.

Una vez completada la configuración, [reinicie el Agent][2].


[1]: /es/agent/configuration/agent-configuration-files/
[2]: /es/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

Siga las instrucciones para el [Docker Agent][1], pasando los siguientes atributos, además de cualquier otra configuración personalizada según corresponda:

```text
-v /etc/passwd:/etc/passwd:ro
-e DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED=true
```

**Nota**:

- Para recopilar información de contenedores en la instalación estándar, el usuario `dd-agent` debe tener permisos para acceder a `docker.sock`.
- Ejecutar el Agent como contenedor aún le permite recopilar procesos del servidor.


[1]: /es/agent/docker/#run-the-docker-agent
{{% /tab %}}
{{% tab "Helm" %}}

Actualice su archivo [datadog-values.yaml][1] con la siguiente configuración de recopilación de procesos:

```yaml
datadog:
    # (...)
    processAgent:
        enabled: true
        processCollection: true
```

Luego, actualice su Helm chart:

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

**Nota**: Ejecutar el Agent como contenedor aún le permite recopilar procesos del servidor.

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Datadog Operator" %}}

En su `datadog-agent.yaml`, establezca `features.liveProcessCollection.enabled` en `true`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    liveProcessCollection:
      enabled: true
```

{{% k8s-operator-redeploy %}}

**Nota**: Ejecutar el Agent como contenedor aún le permite recopilar procesos del servidor.

{{% /tab %}}
{{% tab "Kubernetes (Manual)" %}}

En el manifiesto `datadog-agent.yaml` utilizado para crear el DaemonSet, agregue las siguientes variables de entorno, montaje de volumen y volumen:

```yaml
 env:
    - name: DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED
      value: "true"
  volumeMounts:
    - name: passwd
      mountPath: /etc/passwd
      readOnly: true
  volumes:
    - hostPath:
        path: /etc/passwd
      name: passwd
```

Consulte las páginas de documentación de la [instalación de DaemonSet][1] estándar y del [Docker Agent][2] para obtener más información.

**Nota**: Ejecutar el Agent como contenedor aún le permite recopilar procesos del servidor.

[1]: /es/containers/guide/kubernetes_daemonset
[2]: /es/agent/docker/#run-the-docker-agent
{{% /tab %}}
{{% tab "AWS ECS Fargate" %}}

<div class="alert alert-info">Puede ver sus procesos de ECS Fargate en Datadog. Para ver su relación con los contenedores de ECS Fargate, utilice el Datadog Agent v7.50.0 o posterior.</div>

Para recopilar procesos, el Datadog Agent debe ejecutarse como un contenedor dentro de la tarea.

Para habilitar el monitoreo de procesos en ECS Fargate, establezca la variable de entorno `DD_PROCESS_AGENT_PROCESS_COLLECTION_ENABLED` en `true` en la definición del contenedor del Datadog Agent dentro de la definición de la tarea.

Por ejemplo:

```json
{
    "taskDefinitionArn": "...",
    "containerDefinitions": [
        {
            "name": "datadog-agent",
            "image": "public.ecr.aws/datadog/agent:latest",
            ...
            "environment": [
                {
                    "name": "DD_PROCESS_AGENT_PROCESS_COLLECTION_ENABLED",
                    "value": "true"
                }
                ...
             ]
         ...
         }
    ]
  ...
}
```

Para comenzar a recopilar información de procesos en ECS Fargate, agregue el [parámetro `pidMode`][3] a la definición de la tarea y establézcalo en `task` de la siguiente manera:

```text
"pidMode": "task"
```

Una vez habilitado, utilice la faceta `AWS Fargate` Containers en la [página de Live Processes][1] para filtrar los procesos que se ejecutan en ECS, o ingrese `fargate:ecs` en la consulta de búsqueda.

{{< img src="infrastructure/process/fargate_ecs.png" alt="Procesos en AWS Fargate" >}}

Para obtener más información sobre la instalación del Datadog Agent con AWS ECS Fargate, consulte la [documentación de integración de ECS Fargate][2].

[1]: https://app.datadoghq.com/process
[2]: /es/integrations/ecs_fargate/#installation
[3]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#other_task_definition_params

{{% /tab %}}
{{< /tabs >}}

### Estadísticas de E/S {#io-stats}

El system-probe de Datadog, que se ejecuta con privilegios elevados, puede recopilar estadísticas de E/S y de archivos abiertos. Para recopilar estas estadísticas, habilite el módulo de procesos del system-probe:

1. Copie la configuración de ejemplo del system-probe:

   ```shell
   sudo -u dd-agent install -m 0640 /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
   ```

2. Edite `/etc/datadog-agent/system-probe.yaml` para habilitar el módulo de procesos:

   ```yaml
   system_probe_config:
     process_config:
       enabled: true
   ```

5. [Reinicie el Agent][12]:

   ```shell
   sudo systemctl restart datadog-agent
   ```

   **Nota**: Si el comando `systemctl` no está disponible en su sistema, ejecute el siguiente comando en su lugar: `sudo service datadog-agent restart`


### Huella de recopilación de procesos optimizada {#optimized-process-collection-footprint}

En Linux, la huella general del Datadog Agent se reduce al ejecutar la recopilación de contenedores y procesos en el Datadog Agent principal (en lugar del Process Agent por separado). En Datadog Agent v7.65.0+, esto está habilitado de forma predeterminada.  **Nota**: el Process Agent sigue siendo necesario para [Cloud Network Monitoring][14].

El estado del Agent para esta función aparece en la sección `Process Component`, por ejemplo:

```text
=================
Process Component
=================


  Enabled Checks: [process rtprocess]
  System Probe Process Module Status: Not running
  Process Language Detection Enabled: False

  =================
  Process Endpoints
  =================
    https://process.datadoghq.com. - API Key ending with:
        - *****

  =========
  Collector
  =========
    Last collection time: 2026-01-14 10:04:49
    Docker socket: /var/run/docker.sock
    Number of processes: 48
    Number of containers: 0
    Process Queue length: 0
    RTProcess Queue length: 0
    Connections Queue length: 0
    Event Queue length: 0
    Pod Queue length: 0
    Process Bytes enqueued: 0
    RTProcess Bytes enqueued: 0
    Connections Bytes enqueued: 0
    Event Bytes enqueued: 0
    Pod Bytes enqueued: 0
    Drop Check Payloads: []
    Number of submission errors: 0
```

### Depuración de argumentos de proceso {#process-arguments-scrubbing}

Para ocultar datos confidenciales en la página Live Processes, el Agent depura los argumentos confidenciales de la línea de comandos del proceso. Esta función está habilitada de forma predeterminada y oculta el valor de cualquier argumento de proceso que coincida con una de las siguientes palabras.

```text
"password", "passwd", "mysql_pwd", "access_token", "auth_token", "api_key", "apikey", "secret", "credentials", "stripetoken"
```

**Nota**: La coincidencia **no distingue entre mayúsculas y minúsculas**.

{{< tabs >}}
{{% tab "Linux/Windows" %}}

Defina su propia lista para combinarla con la predeterminada, usando el campo `custom_sensitive_words` en el archivo `datadog.yaml` bajo la sección `process_config`. Use comodines (`*`) para definir su propio contexto de coincidencia. Sin embargo, no se admite un solo comodín (`'*'`) como palabra confidencial.

```yaml
process_config:
    scrub_args: true
    custom_sensitive_words: ['personal_key', '*token', 'sql*', '*pass*d*']
```

**Nota**: Las palabras en `custom_sensitive_words` deben contener solo caracteres alfanuméricos, guiones bajos o comodines (`'*'`). No se admite una palabra confidencial que consista únicamente en comodines.

La siguiente imagen muestra un proceso en la página Live Processes cuyos argumentos han sido ocultados mediante la configuración anterior.

{{< img src="infrastructure/process/process_arg_scrubbing.png" alt="Depuración de argumentos de proceso" style="width:100%;">}}

Establezca `scrub_args` en `false` para deshabilitar por completo la depuración de argumentos de proceso.

También puede depurar **todos** los argumentos de los procesos habilitando la marca `strip_proc_arguments` en su archivo de configuración `datadog.yaml`:

```yaml
process_config:
    strip_proc_arguments: true
```

{{% /tab %}}

{{% tab "Helm" %}}

Puede usar el chart de Helm para definir su propia lista, la cual se combina con la predeterminada. Agregue las variables de entorno `DD_SCRUB_ARGS` y `DD_CUSTOM_SENSITIVE_WORDS` a su archivo `datadog-values.yaml` y actualice su Helm chart de Datadog:

```yaml
datadog:
    # (...)
    processAgent:
        enabled: true
        processCollection: true
    agents:
        containers:
            processAgent:
                env:
                - name: DD_SCRUB_ARGS
                  value: "true"
                - name: DD_CUSTOM_SENSITIVE_WORDS
                  value: "personal_key,*token,*token,sql*,*pass*d*"
```


Use comodines (`*`) para definir su propio contexto de coincidencia. Sin embargo, no se admite un solo comodín (`'*'`) como palabra confidencial.

Establezca `DD_SCRUB_ARGS` en `false` para deshabilitar por completo la depuración de argumentos de proceso.

Alternativamente, puede depurar **todos** los argumentos de los procesos habilitando la variable `DD_STRIP_PROCESS_ARGS` en su archivo `datadog-values.yaml`:

```yaml
datadog:
    # (...)
    processAgent:
        enabled: true
        processCollection: true
agents:
    containers:
        processAgent:
            env:
            - name: DD_STRIP_PROCESS_ARGS
              value: "true"
```

{{% /tab %}}
{{< /tabs >}}


## Consultas {#queries}

### Delimitar el contexto de los procesos {#scoping-processes}

Los procesos son, por naturaleza, objetos de cardinalidad extremadamente alta. Para refinar su contexto y ver los procesos relevantes, puede usar filtros de texto y de etiquetas.

#### Filtros de texto {#text-filters}

Cuando ingresa una cadena de texto en la barra de búsqueda, se utiliza la búsqueda difusa para consultar los procesos que contienen esa cadena de texto en sus líneas de comando o rutas. Ingrese una cadena de dos o más caracteres para ver los resultados. A continuación se muestra el entorno de demostración de Datadog, filtrado con la cadena `postgres /9.`.

**Nota**: `/9.` ha coincidido en la ruta del comando y `postgres` coincide con el comando en sí.

{{< img src="infrastructure/process/postgres.png" alt="Postgres" style="width:80%;">}}

Para combinar varias búsquedas de cadenas en una consulta compleja, utilice cualquiera de los siguientes operadores booleanos:

`AND`
: **Intersección**: ambos términos están en los eventos seleccionados (si no se agrega nada, se toma AND de forma predeterminada)<br> **Ejemplo**: `java AND elasticsearch`

`OR`
: **Unión**: cualquiera de los términos está contenido en los eventos seleccionados <br> **Ejemplo**: `java OR python`

`NOT` / `!`
: **Exclusión**: el siguiente término NO está en el evento. Puede usar la palabra `NOT` o el carácter `!` para realizar la misma operación<br> **Ejemplo**: `java NOT elasticsearch` o `java !elasticsearch`

Use paréntesis para agrupar operadores. Por ejemplo, `(NOT (elasticsearch OR kafka) java) OR python`.

#### Filtros de etiquetas {#tag-filters}

También puede filtrar sus procesos mediante [etiquetas][3] de Datadog, como `host`, `pod`, `user` y `service`. Ingrese los filtros de etiquetas directamente en la barra de búsqueda o selecciónelos en el panel de facetas a la izquierda de la página.

Datadog genera automáticamente una etiqueta `command` para que pueda filtrar por:

- Software de terceros, por ejemplo: `command:mongod`, `command:nginx`
- Software de gestión de contenedores, por ejemplo:  `command:docker`, `command:kubelet`
- Cargas de trabajo comunes, por ejemplo:  `command:ssh`, `command:CRON`

#### Etiquetas de entorno en contenedores {#containerized-environment-tags}

Además, los procesos en contenedores ECS también se etiquetan mediante:

- `task_name`
- `task_version`
- `ecs_cluster`

Los procesos en contenedores de Kubernetes se etiquetan mediante:

- `pod_name`
- `kube_service`
- `kube_namespace`
- `kube_replica_set`
- `kube_daemon_set`
- `kube_job`
- `kube_deployment`
- `kube_cluster_name`

Si tiene configurado [Unified Service Tagging][4], `env`, `service` y `version` se detectan automáticamente.
Tener estas etiquetas disponibles le permite vincular datos de APM, registros, métricas y procesos.
**Nota**: Esta configuración se aplica solo a entornos en contenedores.

#### Reglas para crear etiquetas personalizadas {#rules-to-create-custom-tags}
<div class="alert alert-info">
Requiere los <code>Process Tags Read</code> y <code>Process Tag Write</code>  permisos de rol de Datadog<br/>
</div>

Puede crear definiciones de reglas para agregar etiquetas manuales a los procesos según la línea de comandos.

1. En la pestaña **Manage Process Tags**, seleccione el botón _New Process Tag Rule_
2. Seleccione un proceso para usar como referencia
3. Defina los criterios de parseo y coincidencia para su etiqueta
4. Si la validación es correcta, cree una nueva regla

Una vez creada una regla, las etiquetas están disponibles para todos los valores de línea de comandos de procesos que coincidan con los criterios de la regla. Estas etiquetas están disponibles en la búsqueda y se pueden usar en la definición de [Live Process Monitors][6] y [Custom Metrics][13].

## Gráfico de dispersión {#scatter-plot}

Utilice el análisis de gráfico de dispersión para comparar dos métricas entre sí a fin de comprender mejor el rendimiento de sus contenedores.

Para acceder al análisis de gráfico de dispersión [en la página Processes][5], haga clic en el botón _Show Summary graph_ y luego seleccione la pestaña "Scatter Plot":

{{< img src="infrastructure/process/scatterplot_selection.png" alt="Selección de gráfico de dispersión" style="width:60%;">}}

De forma predeterminada, el gráfico agrupa por la clave de etiqueta `command`. El tamaño de cada punto representa la cantidad de procesos en ese grupo, y al hacer clic en un punto se muestran los procesos y contenedores individuales que contribuyen al grupo.

Las opciones en la parte superior del gráfico le permiten controlar su análisis de gráfico de dispersión:

- Selección de métricas para mostrar.
- Selección del método de agregación para ambas métricas.
- Selección de la escala de ambos ejes X e Y (_Linear_/_Log_).

{{< img src="infrastructure/process/scatterplot.png" alt="Inspección de contenedor" style="width:80%;">}}

## Monitores de procesos {#process-monitors}

Use el [Live Process Monitor][6] para generar alertas basadas en el conteo de cualquier grupo de procesos en servidores o etiquetas. Puede configurar alertas de procesos en la [página Monitors][7]. Para obtener más información, consulte la [documentación de Live Process Monitor][6].

{{< img src="infrastructure/process/process_monitor.png" alt="Process Monitor" style="width:80%;">}}

## Procesos en paneles y cuadernos {#processes-in-dashboards-and-notebooks}

Puede graficar métricas de procesos en paneles y cuadernos usando el [widget de series temporales][8]. Para configurar:
1. Seleccione Processes como fuente de datos
2. Filtre usando cadenas de texto en la barra de búsqueda
3. Seleccione una métrica de proceso para graficar
4. Filtre usando etiquetas en el campo `From`

{{< img src="infrastructure/process/process_widget.png" alt="widget de procesos" style="width:80%;">}}

## Monitoreo de software de terceros {#monitoring-third-party-software}

### Integraciones autodetectadas {#autodetected-integrations}

Datadog utiliza la recolección de procesos para autodetectar las tecnologías que se ejecutan en sus servidores. Esto identifica las Integrations de Datadog que pueden ayudarle a hacer un seguimiento de estas tecnologías. Estas integraciones autodetectadas se muestran en la [búsqueda de Integrations][1]:

{{< img src="getting_started/integrations/ad_integrations.png" alt="Integrations autodetectadas" >}}

Cada integración tiene uno de dos tipos de estado:

- **+ Detected**: Esta integración no está habilitada en ninguno de los servidores que la ejecutan.
- **✓ Partial Visibility**: Esta integración está habilitada en algunos de los servidores pertinentes, pero no en todos.

Los servidores que ejecutan la integración, pero en los que no está habilitada, se pueden encontrar en la pestaña **Hosts** del mosaico de integraciones.

### Vistas de integración {#integration-views}

{{< img src="infrastructure/process/integration_views.png" alt="Vistas de integración" >}}

Después de que se ha detectado un software de terceros, Live Processes ayuda a analizar el rendimiento de ese software.
1. Para comenzar, haga clic en *Views* en la parte superior derecha de la página para abrir una lista de opciones preestablecidas, incluidas Nginx, Redis y Kafka.
2. Seleccione una vista para limitar la página solo a los procesos que ejecutan ese software.
3. Al inspeccionar un proceso pesado, cambie a la pestaña *Integration Metrics* para analizar el estado del software en el servidor subyacente. Si ya ha habilitado la integración de Datadog correspondiente, puede ver todas las métricas de rendimiento recopiladas de la integración para distinguir entre un problema a nivel de servidor y uno a nivel de software. Por ejemplo, ver picos correlacionados en la CPU del proceso y la latencia de consultas de MySQL puede indicar que una operación intensiva, como un escaneo completo de tabla, está retrasando la ejecución de otras consultas de MySQL que dependen de los mismos recursos subyacentes.

Puede personalizar las vistas de integración (por ejemplo, al agregar una consulta para procesos de Nginx por servidor) y otras consultas personalizadas haciendo clic en el botón *+Save* en la parte superior de la página. Esto guarda su consulta, las selecciones de columnas de la tabla y la configuración de visualización. Cree vistas guardadas para acceder rápidamente a los procesos que le interesan sin configuración adicional y para compartir datos de procesos con sus compañeros de equipo.

## Procesos en toda la plataforma {#processes-across-the-platform}

### Live Containers {#live-containers}

Live Processes añade visibilidad adicional a sus implementaciones de contenedores mediante el monitoreo de los procesos que se ejecutan en cada uno de sus contenedores. Haga clic en un contenedor en la página [Live Containers][9] para ver su árbol de procesos, incluidos los comandos que está ejecutando y su consumo de recursos. Utilice estos datos junto con otras métricas de contenedores para determinar la causa raíz de los contenedores o implementaciones con fallas.

### APM {#apm}

En [APM Traces][10], puede hacer clic en el tramo de un servicio para ver los procesos que se ejecutan en su infraestructura subyacente. Los procesos del tramo de un servicio se correlacionan con los servidores o pods en los que se ejecuta el servicio en el momento de la solicitud. Analice métricas de procesos como CPU y memoria RSS junto con errores a nivel de código para distinguir entre problemas específicos de la aplicación y problemas de infraestructura más amplios. Al hacer clic en un proceso, accederá a la página Live Processes. Los procesos relacionados no son compatibles con las trazas de serverless y de navegador.

### Cloud Network Monitoring {#cloud-network-monitoring}

Cuando inspecciona una dependencia en la página [Network Analytics][11], puede ver los procesos que se ejecutan en la infraestructura subyacente de los endpoints, como los servicios que se comunican entre sí. Utilice los metadatos de proceso para determinar si una conectividad de red deficiente (indicada por un alto número de retransmisiones TCP) o una alta latencia de llamadas de red (indicada por un alto tiempo de ida y vuelta TCP) podrían deberse a cargas de trabajo pesadas que consumen los recursos de esos endpoints y, por lo tanto, afectan la salud y la eficiencia de su comunicación.

## Monitoreo en tiempo real {#real-time-monitoring}

Los procesos normalmente se recopilan con una resolución de 10 s. Mientras trabaja activamente con la página Live Processes, las métricas se recopilan con una resolución de 2 s y se muestran en tiempo real, lo cual es importante para métricas volátiles como la CPU. Sin embargo, para el contexto histórico, las métricas se ingieren con la resolución predeterminada de 10 s.

## Información adicional {#additional-information}

- La recopilación de datos en tiempo real (2 s) se desactiva después de 30 minutos. Para reanudar la recopilación en tiempo real, actualice la página.
- En implementaciones de contenedores, el archivo `/etc/passwd` montado en el `docker-dd-agent` es necesario para recopilar nombres de usuario para cada proceso. Este es un archivo público y Process Agent no utiliza ningún campo excepto el nombre de usuario. Si el Agent se ejecuta sin privilegios, el montaje no ocurre. Incluso sin acceso al archivo `/etc/passwd`, todas las funciones excepto el campo de metadatos `user` siguen funcionando. **Nota**: Live Processes solo utiliza el archivo `passwd` del servidor y no realiza la resolución de nombres de usuario para los usuarios creados dentro de los contenedores.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/faq/agent-5-process-collection/
[2]: /es/agent/
[3]: /es/getting_started/tagging/
[4]: /es/getting_started/tagging/unified_service_tagging
[5]: https://app.datadoghq.com/process
[6]: /es/monitors/types/process/
[7]: https://app.datadoghq.com/monitors/create/live_process
[8]: /es/dashboards/widgets/timeseries/#pagetitle
[9]: /es/infrastructure/livecontainers/
[10]: /es/tracing/
[11]: /es/network_monitoring/cloud_network_monitoring/network_analytics
[12]: /es/agent/configuration/agent-commands/#restart-the-agent
[13]: /es/metrics/custom_metrics/
[14]: /es/network_monitoring/cloud_network_monitoring/