---
aliases:
- /es/observability_pipelines/architecture/preventing_data_loss/
title: (LEGACY) Prevención de la pérdida de datos
---

<div class="alert alert-info">
Esta guía es para despliegues a nivel de producción a gran escala.
</div>

## Alta durabilidad

La alta durabilidad es la capacidad de conservar los datos cuando se producen errores en el sistema. La arquitectura del agregador está diseñada para asumir la responsabilidad de la alta durabilidad. Esto simplifica tu estrategia de durabilidad al desplazar la carga de tus Agents y localizarla en tus agregadores. Además, este enfoque concentrado permite estrategias de durabilidad que serían difíciles de implementar en todos los nodos de Agent.

{{< img src="observability_pipelines/production_deployment_overview/high_durability.png" alt="Un diagrama en el que se muestra cómo el Observability Pipelines Worker envía datos a un almacenamiento de bloques replicado" style="width:100%;" >}}

Para lograr una alta durabilidad:

1. Configura tus Agents para que sean simples forwarders de datos y transmitan los datos directamente a tu agregador del Observability Pipelines Worker. Esto reduce la cantidad de tiempo que tus datos están expuestos a pérdidas en la periferia, ya que aún no son redundantes.

2. Elige un destino altamente duradero que sirva como sistema de registro (por ejemplo, Amazon S3). Este sistema es responsable de la durabilidad de los datos en reposo y suele denominarse archivos o lagos de datos.

Por último, configura los sinks del Observability Pipelines Worker que escriben datos en tu sistema de registro para activar los [reconocimientos de extremo a extremo](#using-end-to-end-acknowledgment) y los buffers de disco. Por ejemplo:

```
sinks:
    aws_s3:
        acknowledgments: true
        buffer:
            type: "disk"
```

## Directrices para la prevención de la pérdida de datos

### Uso del reconocimiento de extremo a extremo

Un problema con el proceso del sistema operativo del Observability Pipelines Worker podría suponer un riesgo de pérdida de datos almacenados en memoria durante el tiempo del problema. Activa la característica de reconocimiento de extremo a extremo del Observability Pipelines Worker para mitigar el riesgo de pérdida de datos:

```
sinks:
    aws_s3:
        acknowledgments: true
```

Con esta característica activada, el Observability Pipelines Worker no responde a los Agents hasta que los datos hayan persistido de forma duradera. Esto evita que el Agent libere los datos antes de los esperado y los envíe de nuevo si no se ha recibido un reconocimiento.

{{< img src="observability_pipelines/production_deployment_overview/end_to_end_acknowledgments.png" alt="Un diagrama en el que se muestran reconocimientos enviados desde la fuente del Observability Pipelines Worker de vuelta al cliente" style="width:100%;" >}}

### Gestión de errores en los nodos

Los errores en los nodos se refieren al error completo de un nodo individual. También se pueden tratar mediante reconocimientos de extremo a extremo. Consulta [Uso del reconocimiento de extremo a extremo](#using-end-to-end-acknowledgment) para ver más detalles.

### Gestión de errores en el disco

Los errores en el disco se refieren al error de un disco individual. La pérdida de datos relacionada con los errores en el disco se puede mitigar mediante un sistema de archivos de alta durabilidad en el que los datos se repliquen en varios discos, como el almacenamiento en bloques (por ejemplo, Amazon EBS).

### Gestión de errores en el procesamiento de los datos

El Observability Pipelines Worker puede tener problemas, como no poder analizar un log, al intentar procesar datos malformados. Hay dos maneras de mitigar este problema:

1. **Archivado directo**: dirige los datos directamente desde tus fuentes a tu archivo. Esto garantiza que los datos lleguen a tu archivo sin riesgo de eliminación. Además, estos datos pueden volver a reproducirse una vez corregido el error de procesamiento.

2. **Enrutamiento de eventos con errores**: el Observability Pipelines Worker ofrece el enrutamiento de eventos con errores para usuarios que deseen archivar datos procesados, como datos estructurados y enriquecidos. Ciertas transformaciones del Observability Pipelines Worker vienen con una salida abandonada que puede conectarse a un sink para su durabilidad y reproducción.

#### ¿Cuál es la mejor estrategia?

Si la durabilidad es el criterio más importante, utiliza el método de archivado directo, ya que aborda los casos de pérdida de datos. Utiliza el método de enrutamiento de eventos con errores, también conocido como lago de datos, si prefieres analizar los datos en tu archivo. Esto tiene la ventaja de utilizar tu archivo o lago de datos para análisis a largo plazo. Los [archivos de logs][1] de Datadog y Amazon Athena son ejemplos de soluciones de almacenamiento de archivos.

### Gestión de errores en el destino

Los errores en el destino se refieren al error total de un destino descendente (por ejemplo, Elasticsearch). La pérdida de datos se puede mitigar en caso de problemas con el destino descendente mediante el uso de buffers de disco lo suficientemente grandes como para soportar el tiempo de interrupción. Esto permite que los datos permanezcan en buffer mientras el servicio está inactivo y se vacíen cuando el servicio vuelva a funcionar. Por este motivo, se recomiendan los buffers de disco lo suficientemente grandes como para contener al menos una hora de datos. Consulta [Optimización de la instancia][2] para ver más detalles.

[1]: /es/logs/log_configuration/archives
[2]: /es/observability_pipelines/legacy/architecture/optimize