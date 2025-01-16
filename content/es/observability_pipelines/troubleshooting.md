---
disable_toc: false
title: Solucionar problemas
---

## Información general

Si experimentas un comportamiento inesperado en Observability Pipelines (OP) de Datadog, hay algunos problemas comunes que puedes investigar y esta guía puede ayudarte a resolver los problemas rápidamente. Si sigues teniendo problemas, ponte en contacto con el [servicio de asistencia de Datadog][1] para obtener más ayuda.

## Ver logs y estadísticas del worker de Observability Pipelines

Para ver información sobre los workers de Observability Pipelines que se están ejecutando para un pipeline activo:

1. Ve a [Observability Pipelines][2].
1. Selecciona tu pipeline.
1. Haz clic en la pestaña **Workers** para ver el uso de memoria y CPU de los workers, las estadísticas de tráfico y cualquier error.
1. Para ver el estado y la versión de los workers, haz clic en la pestaña **Último despliegue y configuración**.
1. Para ver logs de los workers, haz clic en el engranaje situado en la parte superior derecha de la página y selecciona **Ver logs OPW**. Para obtener más detalles sobre cómo filtrar tus logs, consulta [Sintaxis de búsqueda de logs][3]. Para ver los logs de un worker específico, añade `@op_work.id:<worker_id>` a la consulta de búsqueda.

## Inspeccionar eventos enviados a través de tu pipeline para identificar problemas de configuración

Si puedes acceder a tus workers de Observability Pipelines localmente, utiliza el comando `tap` para ver los datos sin procesar enviados a través del origen y los procesadores de tu pipeline.

### Habilitar la API del worker de Observability Pipelines

La API del worker de Observability Pipelines te permite interactuar con procesos del worker con el comando `tap`. Si estás utilizando los Helm charts proporcionados cuando [configuraste un pipeline][4], entonces la API ya ha sido habilitada. De lo contrario, asegúrate de que la variable de entorno `DD_OP_API_ENABLED` esté configurara como `true` en `/etc/observability-pipelines-worker/bootstrap.yaml`. Para obtener más información, consulta [Opciones de bootstrap][5]. Esto configura la API para que escuche en `localhost` y el puerto `8686`, que es lo que espera la CLI para `tap`.

### Uso de `top` para encontrar el ID del componente

Necesitas el ID del componente de la fuente o el procesador para `tap`. Utiliza el comando `top` para encontrar el ID del componente en el que quieres `tap`:

```
observability-pipelines-worker top
```

### Uso de `tap` para ver tus datos

Si te encuentras en el mismo host que el worker, ejecuta el siguiente comando para `tap` el resultado del componente:

```
observability-pipelines-worker tap <component_ID>
```

Si estás utilizando un entorno en contenedor, utiliza el comando `docker exec` o `kubectl exec` a fin de tener un intérprete de comandos en el contenedor para ejecutar el comando `tap` anterior.

## Ver logs retrasados en el destino

Los destinos de Observability Pipelines colocan los eventos en lotes antes de enviarlos a la integración posterior. Por ejemplo, los destinos Amazon S3, Google Cloud Storage y Azure Storage tienen un tiempo de espera de lote de 900 segundos. Si los otros parámetros del lote (eventos máximos y bytes máximos) no se han cumplido dentro del tiempo de espera de 900 segundos, el lote se vacía a los 900 segundos. Esto significa que el componente de destino puede tardar hasta 15 minutos en enviar un lote de eventos a la integración posterior.

Estos son los parámetros de lote para cada destino:

{{% observability_pipelines/destination_batching %}}

Para obtener más información, consulta la [colocación de eventos en lotes][6].

[1]: /es/help/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /es/logs/explorer/search_syntax/
[4]: /es/observability_pipelines/set_up_pipelines/#set-up-a-pipeline
[5]: /es/observability_pipelines/advanced_configurations/#bootstrap-options
[6]: /es/observability_pipelines/destinations/#event-batching-intro