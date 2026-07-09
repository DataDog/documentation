---
aliases:
- /es/guides/process
- /es/graphing/infrastructure/process/
further_reading:
- link: https://www.datadoghq.com/blog/live-process-monitoring/
  tag: Blog
  text: Monitorea tus procesos con Datadog
- link: /infrastructure/process/generate_process_metrics/
  tag: Documentación
  text: Aumenta la retención de datos de procesos con métricas
- link: /infrastructure/livecontainers
  tag: Documentación
  text: Obtén visibilidad en tiempo real de todos los contenedores en tu entorno
- link: https://www.datadoghq.com/blog/monitor-third-party-software-with-live-processes/
  tag: Blog
  text: Correlaciona el rendimiento del software y el consumo de recursos con vistas
    guardadas
- link: https://www.datadoghq.com/blog/process-level-data/
  tag: Blog
  text: Resuelve problemas más rápido con datos de aplicaciones y redes a nivel de
    proceso
- link: https://www.datadoghq.com/blog/watchdog-live-processes/
  tag: Blog
  text: Soluciona anomalías en el rendimiento de la carga de trabajo con Watchdog
    Insights for Live Processes.
title: Live Processes
---
<div class="alert alert-info">
Live Processes and Live Process Monitoring están incluidos en el plan Enterprise. Para todos los demás planes, contacta a tu representante de cuenta o <a href="mailto:success@datadoghq.com">success@datadoghq.com</a> para solicitar esta función.
</div>

## Introducción {#introduction}

Live Processes de Datadog te brindan visibilidad en tiempo real de los procesos que se ejecutan en tu infraestructura. Utiliza Live Processes para:

* Ver todos tus procesos en ejecución en un solo lugar
* Desglosa el consumo de recursos en tus servidores y contenedores a nivel de proceso.
* Consulta los procesos que se ejecutan en un servidor específico, en una zona específica, o que ejecutan una carga de trabajo específica.
* Monitorea el rendimiento del software interno y de terceros que utilizas mediante métricas del sistema con una granularidad de dos segundos
* Agrega contexto a tus tableros y notebooks

{{< img src="infrastructure/process/live_processes_main.png" alt="Resumen de Procesos en Vivo" >}}

## Instalación {#installation}

Si estás utilizando Agent 5, sigue este [proceso de instalación específico][1]. Si estás utilizando Agent 6 o 7, [consulta las instrucciones a continuación][2].

{{< tabs >}}
{{% tab "Linux/Windows" %}}

Una vez que se haya instalado el Datadog Agent, habilita la recopilación de Live Processes editando el [Agent main configuration file][1] y estableciendo el siguiente parámetro en `true`:

```yaml
process_config:
  process_collection:
    enabled: true
```

Además, algunas opciones de configuración pueden establecerse como variables de entorno.

**Nota**: Las opciones establecidas como variables de entorno anulan los ajustes definidos en el archivo de configuración.

Después de completar la configuración, [reinicia el Agent][2].


[1]: /es/agent/configuration/agent-configuration-files/
[2]: /es/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

Sigue las instrucciones para el [Docker Agent][1], pasando los siguientes atributos, además de cualquier otra configuración personalizada según sea apropiado:

```text
-v /etc/passwd:/etc/passwd:ro
-e DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED=true
```

**Nota**:

- Para recopilar información del contenedor en la instalación estándar, el usuario `dd-agent` debe tener permisos para acceder a `docker.sock`.
- Ejecutar el Agent como un contenedor aún te permite recopilar procesos del servidor.


[1]: /es/agent/docker/#run-the-docker-agent
{{% /tab %}}
{{% tab "Helm" %}}

Actualiza tu archivo [datadog-values.yaml][1] con la siguiente configuración de recopilación de procesos:

```yaml
datadog:
    # (...)
    processAgent:
        enabled: true
        processCollection: true
```

Luego, actualiza tu gráfico de Helm:

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

Ejecutar el Agent como un contenedor aún permite recopilar procesos del servidor.

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Datadog Operator" %}}

En tu `datadog-agent.yaml`, establece `features.liveProcessCollection.enabled` en `true`.

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

Ejecutar el Agent como un contenedor aún permite recopilar procesos del servidor.

{{% /tab %}}
{{% tab "Kubernetes (Manual)" %}}

En el manifiesto `datadog-agent.yaml` utilizado para crear el DaemonSet, agrega las siguientes variables ambientales, montaje de volumen y volumen:

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

Consulta la instalación estándar del [DaemonSet][1] y las páginas de información del [Docker Agent][2] para más documentación.

Ejecutar el Agent como un contenedor aún permite recopilar procesos del servidor.

[1]: /es/containers/guide/kubernetes_daemonset
[2]: /es/agent/docker/#run-the-docker-agent
{{% /tab %}}
{{% tab "AWS ECS Fargate" %}}

<div class="alert alert-info">Puedes ver tus procesos de ECS Fargate en Datadog. Para ver su relación con los contenedores de ECS Fargate, utiliza el Datadog Agent v7.50.0 o posterior.</div>

Para recopilar procesos, el Datadog Agent debe estar ejecutándose como un contenedor dentro de la tarea.

Para habilitar la monitorización de procesos en ECS Fargate, establece la variable de entorno `DD_PROCESS_AGENT_PROCESS_COLLECTION_ENABLED` en `true` en la definición del contenedor del Datadog Agent dentro de la definición de la tarea.

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

Para comenzar a recopilar información de procesos en ECS Fargate, agrega el [`pidMode` parámetro][3] a la Definición de Tarea y configúralo en `task` de la siguiente manera:

```text
"pidMode": "task"
```

Una vez habilitado, utiliza la faceta `AWS Fargate` Containers en la [Live Processes page][1] para filtrar los procesos que se ejecutan en ECS, o ingresa `fargate:ecs` en la consulta de búsqueda.

{{< img src="infrastructure/process/fargate_ecs.png" alt="Procesos en AWS Fargate" >}}

Para más información sobre la instalación del Datadog Agent con AWS ECS Fargate, consulta la [documentación de integración de ECS Fargate][2].

[1]: https://app.datadoghq.com/process
[2]: /es/integrations/ecs_fargate/#installation
[3]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#other_task_definition_params

{{% /tab %}}
{{< /tabs >}}

### Estadísticas de I/O {#io-stats}

Las estadísticas de I/O y archivos abiertos pueden ser recopiladas por el sistema de sondeo de Datadog, que se ejecuta con privilegios elevados. Para recopilar estas estadísticas, habilita el módulo de procesos del sondeo del sistema:

1. Copia la configuración de ejemplo del sistema-probe:

   ```shell
   sudo -u dd-agent install -m 0640 /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
   ```

2. Edita `/etc/datadog-agent/system-probe.yaml` para habilitar el módulo de procesos:

   ```yaml
   system_probe_config:
     process_config:
       enabled: true
   ```

5. [Reiniciar el Agente][12]:

   ```shell
   sudo systemctl restart datadog-agent
   ```

   **Nota**: Si el comando `systemctl` no está disponible en tu sistema, ejecuta el siguiente comando en su lugar: `sudo service datadog-agent restart`


### Huella optimizada para la recopilación de procesos {#optimized-process-collection-footprint}

En Linux, la huella general del Datadog Agent se reduce al ejecutar la recopilación de contenedores y procesos en el Datadog Agent principal (en lugar del Process Agent separado). En la versión v7.65.0+ del Datadog Agent, esto está habilitado por defecto.  **Nota**: el Process Agent sigue siendo necesario para [Cloud Network Monitoring][14].

El estado del Agent para esta función se lista en la sección `Process Component`, por ejemplo:

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

### Limpieza de argumentos de proceso {#process-arguments-scrubbing}

Para ocultar datos sensibles en la página de Live Processes, el Agent elimina argumentos sensibles de la línea de comandos del proceso. Esta función está habilitada por defecto y cualquier argumento de proceso que coincida con una de las siguientes palabras tiene su valor oculto.

```text
"password", "passwd", "mysql_pwd", "access_token", "auth_token", "api_key", "apikey", "secret", "credentials", "stripetoken"
```

**Nota**: La coincidencia es **insensible a mayúsculas**.

{{< tabs >}}
{{% tab "Linux/Windows" %}}

Define tu propia lista para ser fusionada con la predeterminada, utilizando el campo `custom_sensitive_words` en el archivo `datadog.yaml` bajo la sección `process_config`. Usa comodines (`*`) para definir tu propio alcance de coincidencia. Sin embargo, un solo comodín (`'*'`) no es compatible como una palabra sensible.

```yaml
process_config:
    scrub_args: true
    custom_sensitive_words: ['personal_key', '*token', 'sql*', '*pass*d*']
```

**Nota**: Las palabras en `custom_sensitive_words` deben contener solo caracteres alfanuméricos, guiones bajos o comodines (`'*'`). Una palabra sensible que contenga solo comodines no es compatible.

La siguiente imagen muestra un proceso en la página de Live Processes cuyos argumentos han sido ocultados utilizando la configuración anterior.

{{< img src="infrastructure/process/process_arg_scrubbing.png" alt="Limpieza de argumentos de proceso" style="width:100%;">}}

Establezca `scrub_args` en `false` para deshabilitar completamente la limpieza de argumentos del proceso.

También puede limpiar **todos** los argumentos de los procesos habilitando la `strip_proc_arguments` bandera en su `datadog.yaml` archivo de configuración:

```yaml
process_config:
    strip_proc_arguments: true
```

{{% /tab %}}

{{% tab "Helm" %}}

Puede usar el Helm chart para definir su propia lista, que se fusiona con la predeterminada. Agregue las variables de entorno `DD_SCRUB_ARGS` y `DD_CUSTOM_SENSITIVE_WORDS` a su `datadog-values.yaml` archivo, y actualice su Datadog Helm chart:

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


Utilice comodines (`*`) para definir su propio alcance de coincidencia. Sin embargo, un solo comodín (`'*'`) no es compatible como una palabra sensible.

Establezca `DD_SCRUB_ARGS` en `false` para deshabilitar completamente la limpieza de argumentos del proceso.

Alternativamente, puede limpiar **todos** los argumentos de los procesos habilitando la `DD_STRIP_PROCESS_ARGS` variable en su `datadog-values.yaml` archivo:

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

### Definir el alcance de procesos {#scoping-processes}

Los procesos son, por naturaleza, objetos de cardinalidad extremadamente alta. Para refinar tu alcance y ver procesos relevantes, puedes usar filtros de texto y etiquetas.

#### Filtros de texto {#text-filters}

Cuando ingresa una cadena de texto en la barra de búsqueda, se utiliza la búsqueda de cadenas difusas para consultar procesos que contengan esa cadena de texto en sus líneas de comando o rutas. Ingrese una cadena de dos o más caracteres para ver resultados. A continuación se muestra el entorno de demostración de Datadog, filtrado con la cadena `postgres /9.`.

**Nota**: `/9.` ha coincidido en la ruta del comando, y `postgres` coincide con el comando en sí.

{{< img src="infrastructure/process/postgres.png" alt="Postgres" style="width:80%;">}}

Para combinar múltiples búsquedas de cadenas en una consulta compleja, use cualquiera de los siguientes operadores booleanos:

`AND`
: **Intersección**: ambos términos están en los eventos seleccionados (si no se agrega nada, se toma AND por defecto)<br> **Ejemplo**: `java AND elasticsearch`

`OR`
: **Unión**: cualquiera de los términos está contenido en los eventos seleccionados <br> **Ejemplo**: `java OR python`

`NOT` / `!`
: **Exclusión**: el siguiente término NO está en el evento. Puede usar la palabra `NOT` o el carácter `!` para realizar la misma operación<br> **Ejemplo**: `java NOT elasticsearch` o `java !elasticsearch`

Utilice paréntesis para agrupar operadores juntos. Por ejemplo, `(NOT (elasticsearch OR kafka) java) OR python` .

#### Filtros de etiquetas {#tag-filters}

También puede filtrar sus procesos utilizando etiquetas de Datadog [tags][3], como `host`, `pod`, `user` y `service`. Introduzca filtros de etiquetas directamente en la barra de búsqueda, o selecciónelos en el panel de facetas a la izquierda de la página.

Datadog genera automáticamente una etiqueta `command`, para que pueda filtrar por:

- Software de terceros, por ejemplo: `command:mongod`, `command:nginx`
- Software de gestión de contenedores, por ejemplo: `command:docker`, `command:kubelet`
- Cargas de trabajo comunes, por ejemplo: `command:ssh`, `command:CRON`

#### Etiquetas de entorno en contenedores {#containerized-environment-tags}

Además, los procesos en contenedores ECS también están etiquetados por:

- `task_name`
- `task_version`
- `ecs_cluster`

Los procesos en contenedores de Kubernetes están etiquetados por:

- `pod_name`
- `kube_service`
- `kube_namespace`
- `kube_replica_set`
- `kube_daemon_set`
- `kube_job`
- `kube_deployment`
- `kube_cluster_name`

Si tienes la configuración para [unified service tagging][4] en su lugar, `env`, `service` y `version` se recogen automáticamente.
Tener estas etiquetas disponibles le permite vincular APM, registros, métricas y datos de procesos.
**Nota**: Esta configuración se aplica solo a entornos en contenedores.

#### Reglas para crear etiquetas personalizadas {#rules-to-create-custom-tags}
<div class="alert alert-info">
Requiere el <code>Process Tags Read</code> y <code>Process Tag Write</code>  permisos de rol de Datadog<br/>
</div>

Puede crear definiciones de reglas para agregar etiquetas manuales a los procesos basadas en la línea de comandos.

1. En la pestaña **Administrar Etiquetas de Proceso**, selecciona el botón _Nueva Regla de Etiqueta de Proceso_
2. Selecciona un proceso para usar como referencia
3. Define los criterios de parseo y coincidencia para tu etiqueta.
4. Si la validación pasa, crea una nueva regla

Después de que se crea una regla, las etiquetas están disponibles para todos los valores de la línea de comandos del proceso que coinciden con los criterios de la regla. Estas etiquetas están disponibles en la búsqueda y se pueden usar en la definición de [Live Process Monitors][6] y [Custom Metrics][13].

## Gráfico de dispersión {#scatter-plot}

Utiliza el análisis de gráfico de dispersión para comparar dos métricas entre sí con el fin de comprender mejor el rendimiento de tus contenedores.

Para acceder al análisis de gráfico de dispersión [en la página de Procesos][5], haz clic en el botón _Mostrar gráfico de resumen_ y luego selecciona la pestaña "Gráfico de Dispersión":

{{< img src="infrastructure/process/scatterplot_selection.png" alt="Selección de gráfico de dispersión" style="width:60%;">}}

Por defecto, el gráfico agrupa por la clave de etiqueta `command`. El tamaño de cada punto representa el número de procesos en ese grupo, y al hacer clic en un punto se muestran los procesos y contenedores individuales que contribuyen al grupo.

Las opciones en la parte superior del gráfico te permiten controlar tu análisis de gráfico de dispersión:

- Selección de métricas a mostrar.
- Selección del método de agregación para ambas métricas.
- Selección de la escala de ambos ejes X e Y (_Lineal_/_Log_).

{{< img src="infrastructure/process/scatterplot.png" alt="Inspección de contenedor" style="width:80%;">}}

## Monitores de procesos {#process-monitors}

Utiliza el [Live Process Monitor][6] para generar alertas basadas en el conteo de cualquier grupo de procesos a través de hosts o etiquetas. Puedes configurar alertas de procesos en la [página de Monitores][7]. Para aprender más, consulta la [documentación del Live Process Monitor][6].

{{< img src="infrastructure/process/process_monitor.png" alt="Monitor de Proceso" style="width:80%;">}}

## Procesos en tableros y notebooks {#processes-in-dashboards-and-notebooks}

Puedes graficar métricas de procesos en tableros y notebooks utilizando el [Timeseries widget][8]. Para configurar:
1. Selecciona Procesos como fuente de datos
2. Filtra usando cadenas de texto en la barra de búsqueda
3. Selecciona una métrica de proceso para graficar
4. Filtra usando etiquetas en el campo `From`

{{< img src="infrastructure/process/process_widget.png" alt="Widget de Procesos" style="width:80%;">}}

## Monitoreo de software de terceros {#monitoring-third-party-software}

### Integraciones autodetectadas {#autodetected-integrations}

Datadog utiliza la recolección de procesos para autodetectar las tecnologías que se ejecutan en tus hosts. Esto identifica las integraciones de Datadog que pueden ayudarte a monitorear estas tecnologías. Estas integraciones autodetectadas se muestran en la búsqueda de [Integrations][1]:

{{< img src="getting_started/integrations/ad_integrations.png" alt="Integraciones autodetectadas" >}}

Cada integración tiene uno de dos tipos de estado:

- **+ Detectado**: Esta integración no está habilitada en ningún host que la ejecute.
- **✓ Visibilidad Parcial**: Esta integración está habilitada en algunos, pero no en todos los hosts relevantes que la ejecutan.

Los hosts que están ejecutando la integración, pero donde la integración no está habilitada, se pueden encontrar en la pestaña **Hosts** del mosaico de integraciones.

### Vistas de integración {#integration-views}

{{< img src="infrastructure/process/integration_views.png" alt="Vistas de Integración" >}}

Después de que se ha detectado un software de terceros, Live Processes ayuda a analizar el rendimiento de ese software.
1. Para comenzar, haz clic en *Views* en la parte superior derecha de la página para abrir una lista de opciones preestablecidas, incluyendo Nginx, Redis y Kafka.
2. Haz clic en una visualización para limitar la página únicamente a los procesos que ejecutan ese software.
3. Al inspeccionar un proceso pesado, cambia a la pestaña *Métricas de Integración* para analizar la salud del software en el host subyacente. Si ya ha habilitado la integración relevante de Datadog, puede ver todas las métricas de rendimiento recopiladas de la integración para distinguir entre un problema a nivel de host y un problema a nivel de software. Por ejemplo, ver picos correlacionados en el CPU del proceso y la latencia de las consultas de MySQL puede indicar que una operación intensiva, como un escaneo completo de la tabla, está retrasando la ejecución de otras consultas de MySQL que dependen de los mismos recursos subyacentes.

Puede personalizar las vistas de integración (por ejemplo, al agregar una consulta para procesos de Nginx por host) y otras consultas personalizadas haciendo clic en el botón *+Guardar* en la parte superior de la página. Esto guarda su consulta, las selecciones de columnas de tabla y configuraciones de visualización. Crea visualizaciones guardadas para acceder rápidamente a los procesos que te interesan sin configuración adicional y para compartir datos de procesos con tus compañeros de equipo.

## Procesos en toda la plataforma {#processes-across-the-platform}

### Contenedores en Vivo {#live-containers}

Los Procesos en Vivo añaden visibilidad adicional a sus implementaciones de contenedores al monitorear los procesos que se ejecutan en cada uno de sus contenedores. Haga clic en un contenedor en la página [Contenedores en Vivo][9] para ver su árbol de procesos, incluidos los comandos que está ejecutando y su consumo de recursos. Utilice estos datos junto con otras métricas de contenedores para determinar la causa raíz de los contenedores o implementaciones que fallan.

### APM {#apm}

En [Trazas de APM][10], puede hacer clic en el span de un servicio para ver los procesos que se ejecutan en su infraestructura subyacente. Los procesos del span de un servicio están correlacionados con los hosts o pods en los que se ejecuta el servicio en el momento de la solicitud. Analice métricas de procesos como CPU y memoria RSS junto con errores a nivel de código para distinguir entre problemas específicos de la aplicación y problemas más amplios de infraestructura. Hacer clic en un proceso lo lleva a la página de Procesos en Vivo. Los procesos relacionados no son compatibles con trazas sin servidor y de navegador.

### Cloud Network Monitoring {#cloud-network-monitoring}

Cuando inspecciona una dependencia en la página [Network Analytics][11], puede ver procesos que se ejecutan en la infraestructura subyacente de los puntos de conexión, como servicios que se comunican entre sí. Utilice los metadatos del proceso para determinar si la mala conectividad de red (indicada por un alto número de retransmisiones TCP) o la alta latencia de llamadas de red (indicada por un alto tiempo de ida y vuelta TCP) podrían deberse a cargas de trabajo pesadas que consumen los recursos de esos puntos de conexión, afectando así la salud y eficiencia de su comunicación.

## Monitoreo en tiempo real {#real-time-monitoring}

Los procesos se recopilan normalmente con una resolución de 10 segundos. Mientras se trabaja activamente en la página de Live Processes, las métricas se recopilan con una resolución de 2 segundos y se muestran en tiempo real, lo cual es importante para métricas volátiles como la CPU. Sin embargo, para contexto histórico, las métricas se ingieren a la resolución predeterminada de 10 segundos.

## Información adicional {#additional-information}

- La recopilación de datos en tiempo real (2s) se desactiva después de 30 minutos. Para reanudar la recopilación en tiempo real, actualice la página.
- En implementaciones de contenedores, el archivo `/etc/passwd` montado en el `docker-dd-agent` es necesario para recopilar el nombre de usuario para cada proceso. Este es un archivo público y el Process Agent no utiliza ningún campo excepto el nombre de usuario. Si el Agent se está ejecutando sin privilegios, el montaje no ocurre. Incluso sin acceso al archivo `/etc/passwd`, todas las funciones excepto el campo de metadatos `user` siguen funcionando. **Nota**: Live Processes solo utiliza el archivo `passwd` del servidor y no realiza resolución de nombres de usuario para los usuarios creados dentro de contenedores.

## Lectura adicional {#further-reading}

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