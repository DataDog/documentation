---
aliases:
- /es/observability_pipelines/architecture/capacity_planning_scaling/
title: (LEGACY) Planificación y ampliación de la capacidad
---

<div class="alert alert-info">
Esta guía es para despliegues a nivel de producción a gran escala.
</div>

## Unidades para estimaciones

Las unidades siguientes son puntos de partida para estimar la capacidad de tus recursos, pero pueden variar en función de tu carga de trabajo.

| Unidad                  | Tamaño      | Rendimiento del worker de Observability Pipelines*|
| ----------------------| --------- | ----------------------------------------- |
| Evento de log no estructurado| ~512 bytes| ~10 MiB/s/vCPU                            |
| Evento de log estructurado  | ~1,5 KB   | ~25 MiB/s/vCPU                            |
| Evento de métrica          | ~256 bytes| ~25 MiB/s/vCPU                            |
| Evento del tramo de traza      | ~1,5 KB   | ~25 MiB/s/vCPU                            |

*Estas cifras son conservadoras a efectos de la estimación. 1 vCPU = 1 CPU física de ARM y 0,5 CPU físicas de Intel.

## Escalado

### Escalado horizontal

El escalado horizontal se refiere a la distribución del tráfico a través de múltiples instancias del worker de Observability Pipelines. El worker de Observability Pipelines tiene una arquitectura compartida y no requiere nodos líderes ni ningún tipo de coordinación que pudiera complicar el escalado.

Para las fuentes basadas en push, enfrenta tus instancias del worker de Observability Pipelines con un balanceador de carga de red y modifica la escala subiéndolas y bajándolas según sea necesario.

{{< img src="observability_pipelines/production_deployment_overview/horizontal_scaling_push.png" alt="Un diagrama que muestra una región de la nube dividida por agentes, balanceadores de carga de red y un agregador del worker de Observability Pipelines, y todos los datos de los agentes que se envían al balanceador de carga, los workers de Observability Pipelines y, luego, a otros destinos" style="width:60%;" >}}

No se requiere un balanceador de carga para fuentes basadas en pull. Despliega el worker de Observability Pipelines y amplía o reduce la capacidad según sea necesario. Tu sistema de publicación-suscripción coordina el acceso exclusivo a los datos cuando el worker de Observability Pipelines solicita leerlos.

{{< img src="observability_pipelines/production_deployment_overview/horizontal_scaling_pull.png" alt="Un diagrama que muestra una región de la nube dividida por agentes, brokers y un agregador de Observability Pipelines. Los datos de los agentes se envían a los brokers, luego, se envían entre el broker y los workers de Observability Pipelines y, luego, se envían desde los brokers hacia otros destinos" style="width:60%;" >}}

Consulta [Configuraciones avanzadas][1] para obtener más información sobre cargas de trabajo mixtas (fuentes basadas en push y pull).

#### Balanceo de carga

Un balanceador de carga sólo es obligatorio para fuentes basadas en push, como los agentes. No necesitas un balanceador de carga si utilizas exclusivamente fuentes basadas en pull, como Kafka.

##### Balanceo de carga del lado del cliente

El balanceo de carga del lado del cliente no es recomendado. El balanceo de carga del lado del cliente se refiere a los clientes que hacen el balanceo de carga del tráfico a través de múltiples instancias del worker de Observability Pipelines. Aunque este enfoque parece más sencillo, puede ser menos fiable y más complicado porque:

- El balanceo de carga con una conmutación por error adecuada es complejo. Los problemas en este ámbito son delicados, ya que pueden provocar pérdidas de datos o incidencias que interrumpan tus servicios. Esto se agrava si se trabaja con varios tipos de clientes.
- El objetivo del agregador del worker de Observability Pipelines es transferir la responsabilidad de los agentes y el balanceo de carga ayuda a conseguirlo.

##### Tipos de balanceadores de carga

Datadog recomienda los balanceadores de carga de Capa 4 (L4) (balanceadores de carga de red), ya que admiten los protocolos del worker de Observability Pipelines (TCP, UDP y HTTP). Incluso si envías exclusivamente tráfico HTTP (Capa 7), Datadog recomienda los balanceadores de carga L4 por su rendimiento y sencillez.

| Proveedor de la nube| Recomendación                                                |
| ------------- | --------------------------------------------------------------|
| AWS           | AWS Network Load Balancer (NLB)                               |
| Azure         | Balanceador de carga interno de Azure                                  |
| Google Cloud  | Balanceador de carga de red TCP/UDP interno                        |
| Privado       | HAProxy, Nginx u otro balanceador de carga compatible con la capa 4 |

##### Configuraciones del balanceador de carga

A la hora de configurar clientes y balanceadores de carga, Datadog recomienda los siguientes ajustes generales:

- Utiliza una estrategia sencilla de rotación del balanceo de carga.
- No actives el balanceo de carga entre zonas a menos que el tráfico entre zonas esté muy desequilibrado.
- Configura balanceadores de carga para utilizar el endpoint de la API de estado del worker de Observability Pipelines para el estado del objetivo.
- Asegúrate de que tus instancias del worker de Observability Pipelines se registran o desregistran automáticamente a medida que escalan. Consulta [Redes][2] para obtener más información.
- Habilita keep-alive con un tiempo de espera no superior a un minuto, tanto para tus clientes como para los balanceadores de carga.
- Si es compatible, habilita la concurrencia y agrupación de conexiones en tus agentes. Si no se admite, considera la arquitectura unificada que despliega el worker de Observability Pipelines en la periferia. La agrupación de conexiones garantiza que los grandes volúmenes de datos se repartan entre varias conexiones para balancear el tráfico.

##### Puntos calientes del balanceador de carga

Los puntos calientes del balanceo de carga se producen cuando una o más instancias del worker de Observability Pipelines reciben un tráfico desproporcionado. Los puntos calientes suelen producirse por una de estas dos razones:

1. Se está enviando una cantidad considerable de tráfico a través de una única conexión.
2. El tráfico en una zona de disponibilidad es mucho mayor que en las demás.

En estos casos, se recomiendan las siguientes tácticas de mitigación respectivas:

1. Divide las conexiones grandes en varias conexiones. La mayoría de los clientes permiten la concurrencia de conexiones y la agrupación que distribuye los datos en varias conexiones. Esta táctica permite a tu balanceador de carga distribuir la conexión entre varias instancias del worker de Observability Pipelines. Si tu cliente no admite esto, considera la arquitectura unificada, donde el worker de Observability Pipelines puede desplegarse adicionalmente en la periferia.
2. Habilita el balanceo de carga entre zonas en tu balanceador de carga. El balanceo entre zonas equilibra todo el tráfico de la zona de disponibilidad en todas las instancias del worker de Observability Pipelines.

### Escalado vertical

El modelo de concurrencia del worker de Observability Pipelines se escala automáticamente para aprovechar todas las vCPUs. No se requieren ajustes de concurrencia ni cambios en la configuración. Al escalar verticalmente, Datadog recomienda limitar el tamaño de una instancia para que procese no más del 50 % de tu volumen total y desplegar al menos dos instancias del worker de Observability Pipelines para una alta disponibilidad.

### Escalado automático

El escalado automático debe basarse en la utilización media de la CPU. Para la gran mayoría de las cargas de trabajo, el worker de Observability Pipelines está limitado por la CPU. La utilización de la CPU es la señal más fuerte para el escalado automático, ya que no produce falsos positivos. Datadog recomienda utilizar la siguiente configuración, ajustándola según sea necesario:

- CPU media con un objetivo de utilización del 85 %.
- Un periodo de estabilización de cinco minutos para ampliar y reducir la capacidad.

[1]: /es/observability_pipelines/legacy/architecture/advanced_configurations
[2]: /es/observability_pipelines/legacy/architecture/networking