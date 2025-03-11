---
title: Prácticas recomendadas para escalar Observability Pipelines
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Observability Pipelines no está disponible en el sitio US1-FED de Datadog.</div>
{{< /site-region >}}

<div class="alert alert-info">
Esta guía es para despliegues a nivel de producción a gran escala.
</div>

## Información general

Despliega el worker de Observability Pipelines dentro de tu infraestructura, como cualquier otro servicio, para interceptar datos, manipularlos y luego reenviarlos a tus destinos. Cada instancia de worker de Observability Pipelines funciona de forma independiente, por lo que puedes escalar la arquitectura con un simple balanceador de carga.

Esta guía te muestra la arquitectura de agregador recomendada para los nuevos usuarios del worker de Observability Pipelines. En concreto, estos temas:

- [Optimizar la instancia](#optimize-the-instance) para que puedas escalar horizontalmente el agregador del worker de Observability Pipelines.
- Puntos de partida para estimar tu capacidad de recursos para la [planificación y escalado de capacidad](#capacity-planning-and-scaling) del worker de Observability Pipelines.

## Optimizar la instancia

### Dimensionamiento de instancias

Utiliza instancias optimizadas para computación con al menos 8 vCPUs y 16 GiB de memoria. Estas son unidades ideales para escalar horizontalmente el agregador del worker de Observability Pipelines. El worker de Observability Pipelines puede escalar verticalmente y aprovechar automáticamente los recursos adicionales si eliges instancias más grandes. Para mejorar la disponibilidad, elige un tamaño que permita al menos dos instancias del worker de Observability Pipelines para tu volumen de datos.

| Proveedor de la nube| Recomendación                                        |
| ------------- | ----------------------------------------------------- |
| AWS           | c6i.2xlarge (recomendado) o c6g.2xlarge              |
| Azure         | f8                                                    |
| Google Cloud  | c2 (8 vCPUs, 16 GiB de memoria)                           |
| Privado       | 8 vCPUs, 16 GiB de memoria                             |

### Dimensionamiento de la CPU

La mayoría de las cargas de trabajo del worker de Observability Pipelines están limitadas por la CPU y se benefician de las CPU modernas.

| Proveedor de la nube| Recomendación                                                        |
| ------------- | --------------------------------------------------------------------- |
| AWS           | Intel Xeon de última generación, 8 vCPUs (recomendado), al menos 4 vCPUs |
| Azure         | Intel Xeon de última generación, 8 vCPUs (recomendado), al menos 4 vCPUs |
| Google Cloud  | Intel Xeon de última generación, 8 vCPUs (recomendado), al menos 4 vCPUs |
| Privado       | Intel Xeon de última generación, 8 vCPUs (recomendado), al menos 4 vCPUs |

### Arquitecturas de CPU

El worker de Observability Pipelines funciona en arquitecturas de CPU modernas. Las arquitecturas X86_64 ofrecen el mejor rendimiento para el worker de Observability Pipelines.

### Dimensionamiento de la memoria

Debido al sistema de tipos afines del worker de Observability Pipelines, la memoria rara vez está restringida para las cargas de trabajo del worker de Observability Pipelines. Por lo tanto, Datadog recomienda ≥2 GiB de memoria por vCPU como mínimo. El uso de memoria aumenta con el número de destinos debido al almacenamiento en memoria intermedia y a la agrupación por lotes. Si tienes muchos destinos, considera aumentar la memoria.

### Dimensionamiento de discos

Necesitas 500 MB de espacio en disco para instalar el worker de Observability Pipelines.

## Planificación y ampliación de la capacidad

### Unidades para estimaciones

Las unidades siguientes son puntos de partida para estimar la capacidad de tus recursos, pero pueden variar en función de tu carga de trabajo.

| Unidad                  | Tamaño      | Rendimiento del worker de Observability Pipelines*|
| ----------------------| --------- | ----------------------------------------- |
| Evento de log no estructurado| ~512 bytes| ~10 MiB/s/vCPU                            |
| Evento de log estructurado  | ~1,5 KB   | ~25 MiB/s/vCPU                            |

*Estas cifras son conservadoras a efectos de la estimación. 1 vCPU = 1 CPU física de ARM y 0,5 CPU físicas de Intel.

### Escalado

#### Escalado horizontal

El escalado horizontal se refiere a la distribución del tráfico a través de múltiples instancias del worker de Observability Pipelines. El worker de Observability Pipelines tiene una arquitectura compartida y no requiere nodos líderes ni ningún tipo de coordinación que pudiera complicar el escalado.

Para las fuentes basadas en push, enfrenta tus instancias del worker de Observability Pipelines con un balanceador de carga de red y modifica la escala subiéndolas y bajándolas según sea necesario.

{{< img src="observability_pipelines/production_deployment_overview/horizontal_scaling_push.png" alt="Un diagrama que muestra una región de la nube dividida por agentes, balanceadores de carga de red y un agregador del worker de Observability Pipelines, y todos los datos de los agentes que se envían al balanceador de carga, los workers de Observability Pipelines y, luego, a otros destinos" style="width:60%;" >}}

No se requiere un balanceador de carga para fuentes basadas en pull. Despliega el worker de Observability Pipelines y amplía o reduce la capacidad según sea necesario. Tu sistema de publicación-suscripción coordina el acceso exclusivo a los datos cuando el worker de Observability Pipelines solicita leerlos.

{{< img src="observability_pipelines/production_deployment_overview/horizontal_scaling_pull.png" alt="Un diagrama que muestra una región de la nube dividida por agentes, brokers y un agregador de Observability Pipelines. Los datos de los agentes se envían a los brokers, luego, se envían entre el broker y los workers de Observability Pipelines y, luego, se envían desde los brokers hacia otros destinos" style="width:60%;" >}}

##### Balanceo de carga

Un balanceador de carga sólo es obligatorio para fuentes basadas en push, como los agentes. No necesitas un balanceador de carga si utilizas exclusivamente fuentes basadas en pull, como Kafka.

###### Balanceo de carga del lado del cliente

El balanceo de carga del lado del cliente no es recomendado. El balanceo de carga del lado del cliente se refiere a los clientes que hacen el balanceo de carga del tráfico a través de múltiples instancias del worker de Observability Pipelines. Aunque este enfoque parece más sencillo, puede ser menos fiable y más complicado porque:

- El balanceo de carga con una conmutación por error adecuada es complejo. Los problemas en este ámbito son delicados, ya que pueden provocar pérdidas de datos o incidencias que interrumpan tus servicios. Esto se agrava si se trabaja con varios tipos de clientes.
- El objetivo del agregador del worker de Observability Pipelines es transferir la responsabilidad de los agentes, y el balanceo de carga ayuda a conseguirlo.

###### Tipos de balanceadores de carga

Datadog recomienda los balanceadores de carga de Capa 4 (L4) (balanceadores de carga de red), ya que admiten los protocolos del worker de Observability Pipelines (TCP, UDP y HTTP). Incluso si envías exclusivamente tráfico HTTP (Capa 7), Datadog recomienda los balanceadores de carga L4 por su rendimiento y sencillez.

| Proveedor de la nube| Recomendación                                                |
| ------------- | --------------------------------------------------------------|
| AWS           | AWS Network Load Balancer (NLB)                               |
| Azure         | Balanceador de carga interno de Azure                                  |
| Google Cloud  | Balanceador de carga de red TCP/UDP interno                        |
| Privado       | HAProxy, NGINX u otro balanceador de carga compatible con la capa 4 |

###### Configuraciones del balanceador de carga

A la hora de configurar clientes y balanceadores de carga, Datadog recomienda los siguientes ajustes generales:

- Utiliza una estrategia sencilla de rotación del balanceo de carga.
- No actives el balanceo de carga entre zonas a menos que el tráfico entre zonas esté muy desequilibrado.
- Configura balanceadores de carga para utilizar el endpoint de la API de estado del worker de Observability Pipelines para el estado del objetivo.
- Asegúrate de que tus instancias del worker de Observability Pipelines se registran o desregistran automáticamente a medida que escalan.
- Habilita keep-alive con un tiempo de espera no superior a un minuto, tanto para tus clientes como para los balanceadores de carga.
- Si es compatible, habilita la concurrencia y agrupación de conexiones en tus agentes. Si no se admite, considera la arquitectura unificada que despliega el worker de Observability Pipelines en la periferia. La agrupación de conexiones garantiza que los grandes volúmenes de datos se repartan entre varias conexiones para balancear el tráfico.

###### Puntos calientes del balanceador de carga

Los puntos calientes del balanceo de carga se producen cuando una o más instancias del worker de Observability Pipelines reciben un tráfico desproporcionado. Los puntos calientes suelen producirse por una de estas dos razones:

1. Se está enviando una cantidad considerable de tráfico a través de una única conexión.
2. El tráfico en una zona de disponibilidad es mucho mayor que en las demás.

En estos casos, se recomiendan las siguientes tácticas de mitigación respectivas:

1. Divide las conexiones grandes en varias conexiones. La mayoría de los clientes permiten la concurrencia de conexiones y la agrupación que distribuye los datos en varias conexiones. Esta táctica permite a tu balanceador de carga distribuir la conexión entre varias instancias del worker de Observability Pipelines. Si tu cliente no admite esto, considera la arquitectura unificada, donde el worker de Observability Pipelines puede desplegarse adicionalmente en la periferia.
2. Habilita el balanceo de carga entre zonas en tu balanceador de carga. El balanceo entre zonas equilibra todo el tráfico de la zona de disponibilidad en todas las instancias del worker de Observability Pipelines.

#### Escalado vertical

El modelo de concurrencia del worker de Observability Pipelines se escala automáticamente para aprovechar todas las vCPUs. No se requieren ajustes de concurrencia ni cambios en la configuración. Al escalar verticalmente, Datadog recomienda limitar el tamaño de una instancia para que procese no más del 50 % de tu volumen total y desplegar al menos dos instancias del worker de Observability Pipelines para una alta disponibilidad.

#### Escalado automático

El escalado automático debe basarse en la utilización media de la CPU. Para la gran mayoría de las cargas de trabajo, el worker de Observability Pipelines está limitado por la CPU. La utilización de la CPU es la señal más fuerte para el escalado automático, ya que no produce falsos positivos. Datadog recomienda utilizar la siguiente configuración, ajustándola según sea necesario:

- CPU media con un objetivo de utilización del 85 %.
- Un periodo de estabilización de cinco minutos para ampliar y reducir la capacidad.