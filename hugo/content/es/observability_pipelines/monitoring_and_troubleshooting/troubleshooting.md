---
disable_toc: false
title: Resolución de problemas
---
## Resumen {#overview}

Si experimenta un comportamiento inesperado con Datadog Observability Pipelines (OP), hay algunos problemas comunes que puede investigar, y esta guía puede ayudar a resolverlos rápidamente. Si continúa teniendo problemas, comuníquese con [el soporte de Datadog][1] para obtener más ayuda.

## Ver estadísticas y registros de Observability Pipelines Worker {#view-observability-pipelines-worker-stats-and-logs}

Para ver información sobre los Observability Pipelines Worker que se están ejecutando para una canalización activa:

1. Navegue a [Observability Pipelines][2].
1. Seleccione su canalización.
1. Haga clic en la pestaña **Observability Pipelines Worker** para ver la utilización de memoria y CPU de los Observability Pipelines Worker, estadísticas de tráfico y cualquier error.
1. Para ver los estados y versiones de los Observability Pipelines Worker, haga clic en la pestaña **Última Implementación y Configuración**.
1. Para ver los registros de los Observability Pipelines Worker, haga clic en el engranaje en la parte superior derecha de la página, luego seleccione **Ver registros de Observability Pipelines Worker**. Consulte [Sintaxis de Búsqueda de Registros][3] para obtener detalles sobre cómo filtrar sus registros. Para ver registros de un Observability Pipelines Worker específico, agregue `@op_worker.id:<worker_id>` a la consulta de búsqueda.<br>**Nota**: Si no está viendo los registros de Observability Pipelines Worker, asegúrese de que está [indexando los registros de Observability Pipelines Worker][10] en Log Management.

## Inspeccione los eventos enviados a través de su canalización para identificar problemas de configuración {#inspect-events-sent-through-your-pipeline-to-identify-setup-issues}

Si puede acceder a sus Observability Pipelines Worker localmente, use el comando `tap` para ver los datos en bruto enviados a través de la fuente y los procesadores de su canalización.

### Habilite la API de Observability Pipelines Worker {#enable-the-observability-pipelines-worker-api}

 La API de Observability Pipelines Worker le permite interactuar con los procesos del Worker con los comandos `tap` y `top`. Si está utilizando los gráficos de Helm proporcionados cuando [configuró una canalización][4], entonces la API ya ha sido habilitada. De lo contrario, asegúrese de que la variable de entorno `DD_OP_API_ENABLED` esté configurada en `true` en `/etc/observability-pipelines-worker/bootstrap.yaml`. Consulte [Opciones de Bootstrap][5] para más información. Esto configura la API para escuchar en `localhost` y en el puerto `8686`, que es lo que la CLI para `tap` está esperando.

 **Nota**: Consulta [Habilitar la sonda de disponibilidad y preparación][15] para obtener instrucciones sobre cómo exponer el punto de conexión `/health`. Después de exponer el punto de conexión, configura los balanceadores de carga para usar el punto de conexión de la API `/health` para verificar que el Worker esté en funcionamiento.

### Usa `top` para encontrar el ID del componente {#use-top-to-find-the-component-id}

Necesitas el ID del componente de la fuente o del procesador para `tap` en él. Usa el comando `top` para encontrar el ID del componente en el que deseas `tap`:

```
observability-pipelines-worker top
```

Consulta [Comandos del Worker][13] para obtener una lista de comandos y opciones.

### Usa `tap` para ver tus datos {#use-tap-to-see-your-data}

Si estás en el mismo servidor que el Worker, ejecuta el siguiente comando para `tap` la salida del componente:

```
observability-pipelines-worker tap <component_ID>
```

Si estás utilizando un entorno en contenedor, usa el comando `docker exec` o `kubectl exec` para acceder a una shell en el contenedor y ejecutar el comando `tap` anterior.

Consulta [Comandos del Worker][13] para obtener una lista de comandos y opciones.

## Habilitar registros de depuración {#enable-debug-logs}

Para ver los registros de depuración, reinicia el Worker con la variable de entorno `VECTOR_LOG` configurada en `debug`. Por ejemplo, si estás ejecutando el Worker en Docker, agrega `-e VECTOR_LOG=debug` al comando `docker run`:

```
docker run -i -e DD_API_KEY=<DATADOG_API_KEY> \
   -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
   -e VECTOR_LOG=debug \
   datadog/observability-pipelines-worker run
```

## Identificar Workers en un entorno de Kubernetes usando nombres de Pod y de clúster {#identify-workers-in-a-kubernetes-environment-using-pod-and-cluster-names}

{{% observability_pipelines/install_worker/pod_cluster_name_worker %}}

## Problemas de registros del Worker {#worker-logs-issues}

### Sin registros del Worker en el Explorador de Registros {#no-worker-logs-in-log-explorer}

Si no ves registros del Worker en [explorador de registros][12], asegúrate de que no estén siendo excluidos en tus canalizaciones de registros. Los registros del Worker deben estar indexados en Log Management para un funcionamiento óptimo. Los registros proporcionan información sobre el despliegue, como el estado del Worker, la versión y cualquier error, que se muestra en la interfaz de usuario de Observability Pipelines. Los registros también son útiles para solucionar problemas del Worker o de las canalizaciones. Todos los registros de Worker tienen la etiqueta `source:op_worker`.

### Registros duplicados de Observabilidad de Pipelines {#duplicate-observability-pipelines-logs}

Si ves registros duplicados de Observability Pipelines en [explorador de registros][7] y tu agente está ejecutándose en un contenedor Docker, debes excluir los registros de Observability Pipelines utilizando la variable de entorno `DD_CONTAINER_EXCLUDE_LOGS`. Para Helm, usa `datadog.containerExcludeLogs`. Esto previene registros duplicados, ya que el Worker también envía sus propios registros directamente a Datadog. Consulta [Recolección de logs de Docker][8] o [Configuración de variables de entorno para Helm][9] para más información.

## Problemas y errores del Worker {#worker-issues-and-errors}

### Obteniendo un error al instalar una nueva versión del Worker {#getting-an-error-when-installing-a-new-version-of-the-worker}

Si intentas instalar una nueva versión del Worker en una instancia que está ejecutando una versión anterior del Worker, obtienes un error. Necesitas [desinstalar][11] la versión anterior antes de poder instalar la nueva versión del Worker.

### El Worker no está iniciando {#worker-is-not-starting}

Si el Worker no está iniciando, los registros del Worker no se envían a Datadog y no son visibles en el Explorador de Registros para solucionar problemas. Para ver los registros localmente, usa el siguiente comando:

- Para un entorno basado en VM:
    ```
    sudo journalctl -u observability-pipelines-worker.service -b
    ```

- Para Kubernetes:
    ```
    kubectl logs <pod-name>
    ```
    An example of `<pod-name>` is `opw-observability-pipelines-worker-0`.

### La verificación del certificado falló {#certificate-verify-failed}

Si ves un error con `certificate verify failed` y `self-signed certificate in certificate chain`, consulta [certificados TLS][16]. Observability Pipelines no acepta certificados autofirmados porque no son seguros.

### Asegúrese de que su organización esté habilitada para RC {#ensure-your-organization-is-enabled-for-rc}

Si ve el error `Please ensure you organization is enabled for RC`, asegúrese de que su clave de API de Worker tenga [Remote Configuration habilitada][17]. Consulte [Consideraciones de seguridad][19] para obtener información sobre las salvaguardias implementadas para Remote Configuration.

### El Worker no está recibiendo registros de la fuente {#the-worker-is-not-receiving-logs-from-the-source}

Si ha configurado su fuente para enviar registros al Worker, asegúrese de que el puerto en el que el Worker está escuchando sea el mismo puerto al que la fuente está enviando registros.

Si está utilizando RHEL y necesita reenviar registros de un puerto (por ejemplo, UDP/514) al puerto en el que el Worker está escuchando (por ejemplo, UDP/1514, que es un puerto no privilegiado), puede usar [`firewalld`][14] para reenviar registros del puerto 514 al puerto 1514.

### Error de conexión fallida {#failed-to-connect-error}

Si ve un error similar a uno de estos errores:

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

- Si tiene un firewall entre su fuente y sus Workers, asegúrese de que el tráfico esté permitido a través del puerto elegido entre la fuente y el Worker.
- Si tiene un firewall entre los Workers y su destino, asegúrese de que permita el tráfico de sus Workers al destino a través del puerto definido.

Puede probar su conectividad a su punto final de Worker de tuberías de observabilidad utilizando el comando `curl` desde su ubicación de origen, siempre que tenga acceso a la terminal de la máquina de origen. Por ejemplo, si tiene una fuente de Agente de Datadog, el comando curl se ve algo así:

```
curl --location 'http://ab52a1d102c6f4a3c823axxx-xxxxx.us-west-2.elb.amazonaws.com:80/api/v2/logs' -d '{"ddsource": "my_datadog","ddtags": "env:test","hostname": "i-02a4fxxxxx","message": "hello","service": "test"}' -v
```

El comando curl que utiliza se basa en el puerto que está utilizando, así como en la ruta y la carga útil esperada de su fuente.

**Nota**: Consulte [Agregar dominios a la lista de permitidos del firewall][21] para obtener la lista de dominios que deben agregarse a su lista de permitidos si está utilizando un firewall.

### Error de demasiados archivos {#too-many-files-error}

Si ve el error `Too many files` y los procesos del Worker se reinician repetidamente, podría deberse a un límite bajo de descriptores de archivo en el host. Para resolver este problema en entornos Linux, establezca `LimitNOFILE` en la configuración del servicio systemd a `65,536` para aumentar el límite de descriptores de archivo.

## Problemas generales de la canalización {#general-pipeline-issues}

### Falta la variable de entorno {#missing-environment-variable}

Si ves el error `Configuration is invalid. Missing environment variable $<env_var>`, asegúrate de agregar las variables de entorno para tu fuente, procesadores y destinos cuando instales el Worker. Consulta [Variables de Entorno][18] para obtener una lista de las variables de entorno de fuente, procesador y destino.

## Problemas de la canalización de logs {#logs-pipeline-issues}

### Los registros no se están enviando al destino {#logs-are-not-getting-forwarded-to-the-destination}

Ejecuta el comando `netstat -anp | find "<port_number>"` para verificar que el puerto al que está escuchando el destino no esté siendo utilizado por otro servicio.

### Viendo registros retrasados en el destino {#seeing-delayed-logs-at-the-destination}

Los destinos de Observability Pipelines agrupan eventos antes de enviarlos a la integración posterior. Por ejemplo, los destinos de Amazon S3, Google Cloud Storage y Azure Storage tienen un tiempo de espera de agrupamiento de 900 segundos. Si los otros parámetros de agrupamiento (eventos máximos y bytes máximos) no se han cumplido dentro del tiempo de espera de 900 segundos, el agrupamiento se vacía a los 900 segundos. Esto significa que el componente de destino puede tardar hasta 15 minutos en enviar un agrupamiento de eventos a la integración posterior.

Estos son los parámetros de agrupamiento para cada destino:

{{% observability_pipelines/destination_batching %}}

Consulta [agrupamiento de eventos][6] para más información.

## Problemas de componentes {#component-issues}

### Error al sincronizar el estado de la cuota {#failed-to-sync-quota-state-error}

El procesador de cuota está sincronizado en todos los Workers de una organización de Datadog. Para la sincronización, hay un límite de tasa predeterminado de 50 Workers por organización. Cuando hay más de 50 Workers para una organización:
- El procesador continúa funcionando, pero no se sincroniza correctamente con los otros Workers, lo que puede resultar en registros enviados después de que se haya alcanzado el límite de cuota.
- El Worker imprime `Failed to sync quota state errors`.
- [Contacte al soporte][20] si desea aumentar el número predeterminado de Workers por organización.

###  Error al convertir el campo de marca de tiempo {#error-converting-timestamp-field}

Si está utilizando el destino de Databricks (Zerobus) y ve un error de Worker similar al siguiente, verifique si las marcas de tiempo en sus registros están en formato de cadena:

```
Protobuf encoding failed: Error converting timestamp field: Can't convert '2012-04-23T10[41]15Z' to i64: invalid digit found in string
```

Si las marcas de tiempo de sus registros están en formato de cadena y su tabla de Databricks tiene una columna de marca de tiempo declarada como tipo `TIMESTAMP`, debe convertir las marcas de tiempo de cadena a formato de marca de tiempo. Consulte [Convertir marcas de tiempo de cadena a formato de marca de tiempo][22] para más información.

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