---
description: Aprenda a visualizar las estadísticas y los registros del Worker, y a
  usar los comandos tap y top para inspeccionar eventos y diagnosticar problemas de
  configuración de Observability Pipelines.
disable_toc: false
title: Solución de problemas
---
## Descripción general {#overview}

Si experimenta un comportamiento inesperado con Datadog Observability Pipelines (OP), hay algunos problemas comunes que puede investigar, y esta guía puede ayudar a resolver problemas rápidamente. Si continúa teniendo problemas, comuníquese con el [soporte de Datadog][1] para obtener más ayuda.

## Visualizar las estadísticas y los registros del Observability Pipelines Worker {#view-observability-pipelines-worker-stats-and-logs}

Para visualizar información sobre los Observability Pipelines Workers que se ejecutan para una canalización activa:

1. Navegue a [Observability Pipelines][2].
1. Seleccione su canalización.
1. Haga clic en la pestaña {{< ui >}}Workers{{< /ui >}} para ver la utilización de memoria y CPU de los Workers, las estadísticas de tráfico y cualquier error.
1. Para visualizar los estados y las versiones de los Workers, haga clic en la pestaña {{< ui >}}Latest Deployment & Setup{{< /ui >}}.
1. Para visualizar los registros de los Workers, haga clic en el engranaje en la parte superior derecha de la página y luego seleccione {{< ui >}}View OPW Logs{{< /ui >}}. Consulte [Sintaxis de búsqueda de registros][3] para obtener detalles sobre cómo filtrar sus registros. Para visualizar los registros de un Worker específico, agregue `@op_worker.id:<worker_id>` a la consulta de búsqueda.<br>**Nota**: Si no visualiza los registros del Observability Pipelines Worker, asegúrese de estar [indexando los registros del Worker][10] en Log Management.

## Inspeccione los eventos enviados a través de su canalización para identificar problemas de configuración {#inspect-events-sent-through-your-pipeline-to-identify-setup-issues}

Si puede acceder a sus Observability Pipelines Workers localmente, use el comando `tap` para visualizar los datos sin procesar enviados a través de la fuente y los procesadores de su canalización.

### Habilite la API del Observability Pipelines Worker {#enable-the-observability-pipelines-worker-api}

 La API del Observability Pipelines Worker le permite interactuar con los procesos del Worker con los comandos `tap` y `top`. Si está utilizando los gráficos de Helm proporcionados al [configurar una canalización][4], entonces la API ya se ha habilitado. De lo contrario, asegúrese de que la variable de entorno `DD_OP_API_ENABLED` esté establecida en `true` en `/etc/observability-pipelines-worker/bootstrap.yaml`. Consulte [Opciones de arranque][5] para obtener más información. Esto configura la API para que escuche en `localhost` y el puerto `8686`, que es lo que espera la CLI para `tap`.

 **Nota**: Consulte [Habilitar sondeos de actividad y preparación][15] para obtener instrucciones sobre cómo exponer el punto de conexión `/health`. Después de exponer el punto de conexión, configure los balanceadores de carga para usar el punto de conexión `/health` de la API para verificar que el Worker esté en funcionamiento.

### Utilice `top` para encontrar el ID del componente {#use-top-to-find-the-component-id}

Necesita el ID del componente de la fuente o del procesador para `tap` en él. Utilice el comando `top` para encontrar el ID del componente al que desea `tap`:

```
observability-pipelines-worker top
```

Consulte [Comandos del Worker][13] para obtener una lista de comandos y opciones.

### Utilice `tap` para visualizar sus datos {#use-tap-to-see-your-data}

Si se encuentra en el mismo servidor que el Worker, ejecute el siguiente comando para `tap` la salida del componente:

```
observability-pipelines-worker tap <component_ID>
```

Si está utilizando un entorno de contenedor, utilice el comando `docker exec` o `kubectl exec` para obtener un shell en el contenedor y ejecutar el comando `tap` anterior.

Consulte [Comandos del Worker][13] para obtener una lista de comandos y opciones.

## Habilitar registros de depuración {#enable-debug-logs}

Para ver los registros de depuración, reinicie el Worker con la variable de entorno `VECTOR_LOG` establecida en `debug`. Por ejemplo, si está ejecutando el Worker en Docker, agregue `-e VECTOR_LOG=debug` al comando `docker run`:

```
docker run -i -e DD_API_KEY=<DATADOG_API_KEY> \
   -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
   -e VECTOR_LOG=debug \
   datadog/observability-pipelines-worker run
```

## Identifique Workers en un entorno de Kubernetes usando nombres de Pod y de clúster {#identify-workers-in-a-kubernetes-environment-using-pod-and-cluster-names}

{{% observability_pipelines/install_worker/pod_cluster_name_worker %}}

## Problemas de registros del Worker {#worker-logs-issues}

### No hay registros del Worker en Log Explorer {#no-worker-logs-in-log-explorer}

Si no visualiza los registros del Worker en [Log Explorer][12], asegúrese de que no se estén excluyendo en sus canalizaciones de registros. Los registros del Worker deben estar indexados en Log Management para una funcionalidad óptima. Los registros proporcionan información de despliegue, como el estado del Worker, la versión y cualquier error, que se muestra en la interfaz de usuario de Observability Pipelines. Los registros también son útiles para solucionar problemas del Worker o de las canalizaciones. Si los registros del Worker no están indexados en Log Management, la pestaña Latest Deploy and Setup muestra un estado de carga perpetuo en lugar del estado actual del Worker. Todos los registros del Worker tienen la etiqueta `source:op_worker`.

### Registros duplicados de Observability Pipelines {#duplicate-observability-pipelines-logs}

Si visualiza registros duplicados de Observability Pipelines en [Log Explorer][7] y su Agent se está ejecutando en un contenedor de Docker, debe excluir los registros de Observability Pipelines usando la variable de entorno `DD_CONTAINER_EXCLUDE_LOGS`. Para Helm, utilice `datadog.containerExcludeLogs`. Esto evita registros duplicados, ya que el Worker también envía sus propios registros directamente a Datadog. Consulte [Colección de registros de Docker][8] o [Configuración de variables de entorno para Helm][9] para obtener más información.

## Problemas y errores del Worker {#worker-issues-and-errors}

### Error al instalar una nueva versión del Worker {#getting-an-error-when-installing-a-new-version-of-the-worker}

Si intenta instalar una versión nueva del Worker en una instancia que ejecuta una versión anterior del Worker, recibirá un error. Debe [desinstalar][11] la versión anterior antes de poder instalar la versión nueva del Worker.

### El Worker no se inicia {#worker-is-not-starting}

Si el Worker no se inicia, los registros del Worker no se envían a Datadog y no son visibles en Log Explorer para la resolución de problemas. Para visualizar los registros localmente, utilice el siguiente comando:

- Para un entorno basado en VM:
    ```
    sudo journalctl -u observability-pipelines-worker.service -b
    ```

- Para Kubernetes:
    ```
    kubectl logs <pod-name>
    ```
    An example of `<pod-name>` is `opw-observability-pipelines-worker-0`.

### Error de conexión múltiple al usar persistencia en Kubernetes {#multi-attach-error-when-using-persistence-on-kubernetes}

Si habilitó el [almacenamiento en búfer de disco][24] para los destinos y visualiza un pod de Worker atascado en `Pending` con un error de conexión múltiple de volumen después de que Kubernetes lo reprograma en un nodo nuevo, esto es normal. El error ocurre porque el volumen persistente del nodo anterior no ha terminado de desconectarse. El pod se recupera por sí solo.

Datadog recomienda mantener la configuración predeterminada `podManagementPolicy: Parallel` del StatefulSet del Worker incluso cuando vea este error. Cambiar a `OrderedReady` reduce la frecuencia con la que aparece el error, pero impide que el StatefulSet escale mientras las réplicas en terminación finalizan su apagado ordenado. Esto ralentiza la respuesta de su canalización ante un aumento repentino de eventos.

### Error de verificación de certificado {#certificate-verify-failed}

Si visualiza un error con `certificate verify failed` y `self-signed certificate in certificate chain`, consulte [Certificados TLS][16]. Observability Pipelines no acepta certificados autofirmados porque no son seguros.

### Asegúrese de que su organización tenga habilitada la RC {#ensure-your-organization-is-enabled-for-rc}

Si visualiza el error `Please ensure you organization is enabled for RC`, asegúrese de que su clave de API de Worker tenga [Remote Configuration habilitada][17]. Consulte [Security considerations][19] para obtener información sobre las salvaguardas implementadas para Remote Configuration.

### El Worker no está recibiendo registros de la fuente {#the-worker-is-not-receiving-logs-from-the-source}

Si ha configurado su fuente para enviar registros al Worker, asegúrese de que el puerto en el que el Worker está escuchando sea el mismo puerto al que la fuente está enviando los registros.

Si está utilizando RHEL y necesita reenviar registros desde un puerto (por ejemplo, UDP/514) al puerto en el que el Worker está escuchando (por ejemplo, UDP/1514, que es un puerto sin privilegios), puede usar [`firewalld`][14] para reenviar registros del puerto 514 al puerto 1514.

### Error de conexión fallida {#failed-to-connect-error}

Si visualiza un error similar a uno de estos errores:

```
Failed to connect to 34.44.228.240 port 80 after 56 ms: Couldn't connect to server
```

```
connect to 35.82.252.23 port 80  failed: Operation timed out
```

```
Failed to connect to ab52a1d16fxxxxxxxabd90c7526a1-1xxxx.us-west-2.elb.amazonaws.com port 80 after 225027 ms: Couldn't connect to server
```

Y usted:

- Tiene un firewall entre su fuente y sus Workers, asegúrese de que el tráfico esté permitido a través del puerto elegido entre la fuente y el Worker.
- Tiene un firewall entre los Workers y su destino, asegúrese de que permita el tráfico desde sus Workers hacia el destino a través del puerto definido.

Pruebe la conectividad con el punto de conexión de Observability Pipelines Worker usando el comando `curl` desde la ubicación de su fuente, siempre que tenga acceso a la shell de la fuente. Por ejemplo, si tiene una fuente Datadog Agent, el comando curl es algo así:

```
curl --location 'http://ab52a1d102c6f4a3c823axxx-xxxxx.us-west-2.elb.amazonaws.com:80/api/v2/logs' -d '{"ddsource": "my_datadog","ddtags": "env:test","hostname": "i-02a4fxxxxx","message": "hello","service": "test"}' -v
```

El comando curl que utilice se basa en el puerto que esté usando, así como en la ruta y la carga útil esperada de su fuente.

**Nota**: Consulte [Add domains to firewall allowlist][21] para obtener la lista de dominios que deben agregarse a su lista de permitidos si está utilizando un firewall.

### Error de demasiados archivos {#too-many-files-error}

Si visualiza el error `Too many files` y los procesos del Worker se reinician repetidamente, podría deberse a un límite bajo de descriptores de archivo en el servidor. Para resolver este problema en entornos Linux, establezca `LimitNOFILE` en la configuración del servicio systemd en `65,536` para aumentar el límite de descriptores de archivo.

### Envío de la fuente interrumpido durante el proceso{#source-send-interrupted-mid-flight}

Si ve registros de error `Source send interrupted mid-flight; pipeline may be overloaded or shutting down`, un problema interrumpió la operación de envío antes de que el Worker enviara todos los eventos del lote hacia el destino. El Worker descarta cualquier evento restante en ese lote e incrementa la métrica `component_discarded_events_total`. Las posibles causas de la interrupción pueden incluir contrapresión, apagado del Worker o reinicios del Worker.

Para investigar si la interrupción se debió a un reinicio o apagado del Worker, intente correlacionar la marca de tiempo del error con los registros del ciclo de vida del Worker, como `Vector has stopped`, `Shutting down...`, o con eventos de reinicio de pod o contenedor alrededor de la misma hora.

Para investigar si el error se debe a contrapresión, utilice el dashboard [Observability Pipelines Overview][29] para solucionar problemas. Puede filtrar por ID de canalizaciones, servidor, ID de Worker y componentes. Verifique lo siguiente:

1. Utilización del búfer de destino
    - Un búfer cerca de su capacidad máxima es una señal de contrapresión. Considere [elegir un búfer de disco][26] o aumentar el tamaño del búfer para ayudar a absorber los picos de tráfico y mitigar la contrapresión. Consulte [métricas de búfer][25] para hacer un seguimiento de la utilización del búfer.
2. Utilización de CPU del Worker
    - El uso elevado y sostenido de CPU en los Workers durante picos de tráfico indica que la canalización no tiene suficiente capacidad de cómputo. Consulte [Mejores prácticas para escalar Observability Pipelines][27] para obtener orientación sobre el dimensionamiento y el escalado automático de los Workers.
    - El procesador Sensitive Data Scanner consume muchos recursos de CPU y también puede causar un uso elevado de CPU. Consulte [Mejores prácticas para optimizar el rendimiento][28] para obtener más información.

## Problemas generales de la canalización {#general-pipeline-issues}

### Falta la variable de entorno {#missing-environment-variable}

Si ve el error `Configuration is invalid. Missing environment variable $<env_var>`, asegúrese de agregar las variables de entorno para su fuente, procesadores y destinos al instalar el Worker. Consulte [Variables de entorno][18] para obtener una lista de variables de entorno de fuente, procesador y destino.

## Problemas de la canalización de registros {#logs-pipeline-issues}

### Los registros no se están enviando al destino {#logs-are-not-getting-forwarded-to-the-destination}

Ejecute el comando `netstat -anp | find "<port_number>"` para verificar que el puerto en el que el destino está escuchando no esté siendo utilizado por otro servicio.

### Observación de registros retrasados en el destino {#seeing-delayed-logs-at-the-destination}

Los destinos de Observability Pipelines agrupan los eventos antes de enviarlos a la integración descendente. Por ejemplo, los destinos Amazon S3, Google Cloud Storage y Azure Storage tienen un tiempo de espera de procesamiento por lotes de 900 segundos. Si los otros parámetros de procesamiento por lotes (máximo de eventos y máximo de bytes) no se han cumplido dentro del tiempo de espera de 900 segundos, el lote se vacía a los 900 segundos. Esto significa que el componente de destino puede tardar hasta 15 minutos en enviar un lote de eventos a la integración descendente.

Estos son los parámetros de procesamiento por lotes para cada destino:

{{% observability_pipelines/destination_batching %}}

Consulte [Procesamiento por lotes de eventos de destinos][6] para obtener más información.

## Problemas del componente {#component-issues}

### Error al sincronizar el estado de la cuota {#failed-to-sync-quota-state-error}

El procesador de cuotas está sincronizado en todos los Workers de una organización de Datadog. Para la sincronización, existe un límite de tasa predeterminado de 50 Workers por organización. Cuando hay más de 50 Workers para una organización:
- El procesador continúa ejecutándose, pero no se sincroniza correctamente con los otros Workers, lo que puede provocar que se envíen registros después de haber alcanzado el límite de cuota.
- El Worker imprime `Failed to sync quota state errors`.
- [Comuníquese con el soporte técnico][20] si desea aumentar el número predeterminado de Workers por organización.

### Las métricas generadas tienen una marca de tiempo basada en el tiempo de procesamiento en lugar de la marca de tiempo del registro {#generated-metrics-are-timestamped-with-the-processing-time-instead-of-the-log-timestamp}

Si las métricas generadas por el procesador Generate Metrics tienen una marca de tiempo basada en el tiempo de procesamiento del registro en lugar de la marca de tiempo del registro, verifique si el registro `timestamp` está en formato de cadena. El procesador Generate Metrics requiere que el campo `timestamp` sea de un tipo de marca de tiempo analizado. Consulte [Convertir marca de tiempo de cadena a formato de marca de tiempo][23] para obtener instrucciones.

###  Error al convertir el campo de marca de tiempo {#error-converting-timestamp-field}

Si utiliza el destino Databricks (Zerobus) y ve un error de Worker similar al siguiente, verifique si las marcas de tiempo en sus registros están en formato de cadena:

```
Protobuf encoding failed: Error converting timestamp field: Can't convert '2012-04-23T10[41]15Z' to i64: invalid digit found in string
```

Si las marcas de tiempo de sus registros están en formato de cadena y su tabla de Databricks tiene una columna de marca de tiempo declarada como tipo `TIMESTAMP`, debe convertir la marca de tiempo de cadena a formato de marca de tiempo. Consulte [Convertir marcas de tiempo de cadena a formato de marca de tiempo][22] para obtener más información.

[1]: /es/help/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /es/logs/explorer/search_syntax/
[4]: /es/observability_pipelines/configuration/set_up_pipelines/#set-up-a-pipeline
[5]: /es/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/#bootstrap-options
[6]: /es/observability_pipelines/destinations/#event-batching-intro
[7]: https://app.datadoghq.com/logs/
[8]: /es/containers/docker/log/?tab=containerinstallation#linux
[9]: /es/containers/guide/container-discovery-management/?tab=helm#setting-environment-variables
[10]: /es/observability_pipelines/configuration/install_the_worker/#index-your-worker-logs
[11]: /es/observability_pipelines/install_the_worker#uninstall-the-worker
[12]: https://app.datadoghq.com/logs
[13]: /es/observability_pipelines/configuration/install_the_worker/worker_commands/
[14]: https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/7/html/security_guide/sec-port_forwarding#sec-Adding_a_Port_to_Redirect
[15]: /es/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/#enable-the-health-check-endpoint-and-the-liveness-and-readiness-probes
[16]: /es/observability_pipelines/sources/#tls-certificates
[17]: https://app.datadoghq.com/organization-settings/remote-config/setup
[18]: /es/observability_pipelines/guide/environment_variables/
[19]: /es/remote_configuration/#security-considerations
[20]: /es/help/
[21]: /es/observability_pipelines/configuration/install_the_worker/#add-domains-to-firewall-allowlist
[22]: /es/observability_pipelines/destinations/databricks#convert-string-timestamps-to-timestamp-format
[23]: /es/observability_pipelines/processors/generate_metrics/#convert-string-timestamp-to-timestamp-format
[24]: /es/observability_pipelines/scaling_and_performance/buffering_and_backpressure/#destination-buffers
[25]: /es/observability_pipelines/scaling_and_performance/buffering_and_backpressure/#buffer-metrics
[26]: /es/observability_pipelines/scaling_and_performance/buffering_and_backpressure/#choosing-buffer-types
[27]: /es/observability_pipelines/scaling_and_performance/best_practices_for_scaling_observability_pipelines/
[28]: /es/observability_pipelines/processors/sensitive_data_scanner/?tab=libraryrules#best-practices-to-optimize-performance
[29]: https://app.datadoghq.com/dash/integration/32326/observability-pipelines-overview