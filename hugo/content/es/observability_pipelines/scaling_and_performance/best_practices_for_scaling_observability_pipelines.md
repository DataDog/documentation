---
aliases:
- /es/observability_pipelines/best_practices_for_scaling_observability_pipelines/
description: Conozca la arquitectura de agregador recomendada, la optimización de
  instancias y las prácticas de planificación de capacidad para escalar Observability
  Pipelines Worker en implementaciones grandes.
further_reading:
- link: https://www.datadoghq.com/architecture/op-vm-deployment/
  tag: Centro de arquitectura
  text: Implementación de VM de Observability Pipelines
- link: https://www.datadoghq.com/architecture/observability-pipelines-kubernetes-deployment/
  tag: Centro de arquitectura
  text: Implementación de Observability Pipelines para Kubernetes
title: Prácticas recomendadas para escalar Observability Pipelines
---
<div class="alert alert-info">
Esta guía es para implementaciones a gran escala de nivel de producción.
</div>

## Descripción general {#overview}

Implemente Observability Pipelines Worker en su infraestructura, tal como lo haría con cualquier otro servicio, para interceptar, manipular y reenviar datos a sus destinos. Cada instancia de Observability Pipelines Worker está diseñada para operar de forma independiente, lo que le permite escalar su arquitectura con equilibrio de carga.

Esta guía lo lleva a través del patrón de agregador recomendado para nuevos usuarios de Observability Pipelines Worker, específicamente:

- [Modelos y enfoques de arquitectura](#architecture)
- [Optimización de la instancia](#optimize-the-instance) para que pueda escalar horizontalmente el agregador de Observability Pipelines Worker.
- Puntos de partida para estimar su capacidad de recursos para la [planificación de capacidad y el escalado](#capacity-planning-and-scaling) de Observability Pipelines Worker.

## Arquitectura {#architecture}

Esta sección cubre:

- Modelos de arquitectura:
	- [Modelo basado en VM](#vm-based-architecture)
	- [Modelo basado en Kubernetes](#kubernetes-based-architecture)
- [Enfoque centralizado frente a descentralizado](#centralized-vs-decentralized-approach)
- [Elección de una arquitectura basada en VM frente a una basada en Kubernetes](#choosing-a-vm-based-vs-kubernetes-based-architecture)

### Modelos de arquitectura {#architecture-models}

Existen dos modelos de arquitectura comunes:

- **Arquitectura basada en máquinas virtuales (VM)**: Un modelo basado en servidor con un balanceador de carga al frente.
- **Arquitectura basada en Kubernetes**: Un modelo basado en contenedores que opcionalmente puede tener un controlador de ingreso o un balanceador de carga al frente (para fuentes externas al clúster, un servicio de Kubernetes maneja las solicitudes internas del clúster).

Ambos modelos pueden aplicarse a un enfoque centralizado o descentralizado. En un enfoque centralizado, los Workers operan a escala global, a través de centros de datos o regiones. En un enfoque descentralizado, los Workers operan a escala local, es decir, en la región, el centro de datos o el clúster donde se encuentra la fuente de datos. Para entornos a gran escala que abarcan muchos centros de datos, regiones o cuentas de proveedores de nube, un modelo híbrido puede ser apropiado.

Por lo general, Datadog recomienda operar el Worker lo más cerca posible de la fuente de datos. Esto podría requerir una mayor carga administrativa y de infraestructura, pero reduce las preocupaciones sobre problemas de tránsito de red y puntos únicos de falla.

Para ambos modelos, Datadog recomienda escalar los Workers [horizontalmente][1] para manejar una mayor carga y mantener una alta disponibilidad. Puede lograr esto utilizando un grupo de instancias administrado (como un grupo de autoescalado) o autoescalado horizontal de pods.

El Worker también puede escalarse [verticalmente][2], lo que aprovecha núcleos y memoria adicionales sin necesidad de configuración adicional. Para ciertos procesadores, como el procesador Sensitive Data Scanner con muchas reglas habilitadas, o casos de uso de procesamiento pesado, el Worker se beneficia de núcleos adicionales para permitir la ejecución de hilos en paralelo. Al escalar verticalmente, Datadog recomienda limitar el tamaño de una instancia para procesar no más del 33% de su volumen total. Esto permite una alta disponibilidad en caso de falla de un nodo.

#### Arquitectura basada en VM {#vm-based-architecture}

El siguiente diagrama de arquitectura es para una arquitectura basada en servidor, donde un balanceador de carga acepta tráfico de fuentes basadas en push. Si solo se utilizan fuentes basadas en pull, no se requiere un balanceador de carga. En el diagrama, el Worker es parte de un grupo de instancias administrado que escala según las necesidades de procesamiento. Consulte [Implementación de VM de Observability Pipelines][9] para obtener más detalles.

{{< img src="observability_pipelines/scaling_best_practices/vm-infra.png" alt="Diagrama que muestra al Worker como parte de un grupo de instancias administrado" style="width:100%;" >}}


#### Arquitectura basada en Kubernetes {#kubernetes-based-architecture}

El siguiente diagrama de arquitectura es para una arquitectura basada en contenedores, donde el servicio de Kubernetes actúa como enrutador para el statefulset y acepta tráfico de fuentes basadas en push. Si envía telemetría desde fuera del clúster, establezca [service.type en `LoadBalancer`][3] o instale un [controlador de ingreso][4] y configure un [ingreso][5] para el enrutamiento. El Worker se ejecuta como parte de un statefulset y admite el escalado automático horizontal de pods para ajustar la capacidad según las necesidades de procesamiento. Al igual que la arquitectura basada en VM, los Workers también pueden escalar verticalmente y aprovechar múltiples núcleos para el procesamiento paralelo. Consulte [Observability Pipelines para la implementación de Kubernetes][10] para obtener más detalles.

{{< img src="observability_pipelines/scaling_best_practices/containerized-infra.png" alt="Diagrama que muestra al Worker como parte de un statefulset" style="width:100%;" >}}

### Elegir entre una arquitectura basada en VM y una basada en Kubernetes {#choosing-a-vm-based-vs-kubernetes-based-architecture}

Elija la arquitectura basada en Kubernetes si:

- Sus fuentes de registros están dentro de un clúster de Kubernetes y desea utilizar el enfoque descentralizado
- Su organización utiliza Kubernetes intensamente y tiene experiencia con él

Elija la arquitectura basada en VM si su organización está más centrada en VM y no tiene experiencia con Kubernetes.

Elegir entre los dos modelos depende de lo que su organización esté mejor equipada para hacer desde una perspectiva de infraestructura. Cada modelo ofrece la capacidad de escalar automáticamente según la utilización de la CPU, que generalmente es la restricción principal para Observability Pipelines. Consulte [Optimizar la instancia][6] para obtener más información.

### Enfoque centralizado frente a descentralizado {#centralized-vs-decentralized-approach}

Datadog recomienda el enfoque descentralizado de implementar los Workers lo más cerca posible de la fuente de datos. Esto significa colocar los Workers dentro de cada ubicación donde se origina la información, como la región, el clúster o el centro de datos. El modelo descentralizado es mejor para entornos con grandes volúmenes de datos porque:

- Minimiza el tránsito de red entre regiones o entre centros de datos
- Evita posibles problemas de rendimiento relacionados con la transferencia de datos entre regiones o entre cuentas
- Ayuda a reducir los costos de transferencia de datos al mantener el procesamiento local en las fuentes de datos
- Reduce la latencia de entrega de registros al procesar datos en la fuente antes de reenviarlos

Una implementación centralizada ejecuta Workers en una sola ubicación, agregando datos de múltiples regiones, clústeres o centros de datos. Un único grupo de Workers puede recibir datos de múltiples clústeres de Kubernetes o cuentas de AWS. Este enfoque funciona mejor para volúmenes de datos más bajos o cuando ya existe una interconexión de red entre esos entornos. Tenga en cuenta que las transferencias de datos de alto volumen entre regiones o cuentas pueden generar costos adicionales.

Un modelo híbrido es un buen compromiso entre los enfoques descentralizado y centralizado, particularmente para implementaciones de infraestructura grandes y dispersas. Por ejemplo, si tiene seis regiones y en cada región tiene 10 clústeres de Kubernetes, en lugar de:

- Implementar Workers en cada clúster, lo que resulta en 60 implementaciones
- Implementar Workers en una región y enrutar el tráfico entre regiones, lo que introduce un punto único de falla

Un enfoque híbrido utiliza un clúster de Kubernetes dedicado o un grupo de instancias administrado en cada región, lo que resulta en solo seis implementaciones. Los 10 clústeres dentro de cada región envían sus datos a la implementación regional de Observability Pipelines Worker (OPW).

## Optimice la instancia {#optimize-the-instance}

### Dimensionamiento de la instancia {#instance-sizing}

Según las pruebas de rendimiento para una canalización que utiliza 12 procesadores para transformar datos, el Observability Pipelines Worker puede manejar aproximadamente 1 TB por vCPU al día. Por ejemplo, si tiene 4 TB de eventos al día, debe aprovisionar suficiente capacidad de cómputo más un margen para cubrir sus volúmenes. Esto podría ser tres máquinas o contenedores de dos núcleos, o una máquina o contenedor de seis núcleos. 

El Observability Pipelines Worker casi siempre está limitado por la CPU y, dado que las métricas de utilización de CPU no producen falsos positivos, proporcionan la señal más fuerte para el escalado automático. Datadog recomienda implementar Workers como parte de un grupo de escalado automático o implementarlos con [Horizontal Pod Autoscaling][7] habilitado. No dependa de un número configurado estáticamente de máquinas virtuales o contenedores. Esto ayuda a garantizar que pueda manejar de forma segura los picos de tráfico sin pérdida de datos y mantener una alta disponibilidad si un Observability Pipelines Worker deja de funcionar.

Para entornos de alto rendimiento, Datadog recomienda tipos de máquinas más grandes porque normalmente tienen un mayor ancho de banda de red. Consulte la documentación de su proveedor de nube para obtener detalles (por ejemplo, [ancho de banda de red de instancia de Amazon EC2][8]).

| Proveedor de nube| Recomendación (mínima) |
| ------------- | ------------------------ |
| AWS           | c7i.xlarge               |
| Azure         | F4s v2       	           |
| Google Cloud  | c2-standard-4            |

**Nota**: 1 vCPU = 1 CPU física ARM o 0.5 CPU física Intel con hyperthreading.

### Dimensionamiento de CPU {#cpu-sizing}

La mayoría de las cargas de trabajo de Observability Pipelines Worker están limitadas por la CPU y se benefician de las CPU modernas.

| Proveedor de nube| Recomendación                                                        |
| ------------- | --------------------------------------------------------------------- |
| AWS           | Intel Xeon de última generación, 8 vCPUs (recomendado), al menos 4 vCPUs |
| Azure         | Intel Xeon de última generación, 8 vCPUs (recomendado), al menos 4 vCPUs |
| Google Cloud  | Intel Xeon de última generación, 8 vCPUs (recomendado), al menos 4 vCPUs |
| Privado       | Intel Xeon de última generación, 8 vCPUs (recomendado), al menos 4 vCPUs |

### Arquitecturas de CPU {#cpu-architectures}

Observability Pipelines Worker se ejecuta en arquitecturas de CPU x86 y ARM modernas.

### Dimensionamiento de memoria {#memory-sizing}

Debido al sistema de tipos afines de Observability Pipelines Worker, la memoria rara vez es una limitación para las cargas de trabajo de Observability Pipelines Worker. Por lo tanto, Datadog recomienda un mínimo de ≥2 GiB de memoria por vCPU. El uso de memoria aumenta con el número de destinos debido al almacenamiento en búfer y el procesamiento por lotes en memoria. Si tiene muchos destinos, considere aumentar la memoria.

### Dimensionamiento de disco {#disk-sizing}

Necesita 500MB de espacio en disco para instalar Observability Pipelines Worker.

## Planificación de capacidad y escalado {#capacity-planning-and-scaling}

### Unidades para estimaciones {#units-for-estimations}

Las siguientes unidades son puntos de partida para estimar su capacidad de recursos, pero pueden variar según su carga de trabajo.

| Unidad                  | Tamaño      | Rendimiento de Observability Pipelines Worker*|
| ----------------------| --------- | ----------------------------------------- |
| Evento de registro no estructurado| ~512 bytes| ~10 MiB/s/vCPU                            |
| Evento de registro estructurado  | ~1.5 KB   | ~25 MiB/s/vCPU                            |

*Estos números son conservadores para fines de estimación. 1 vCPU = 1 CPU física ARM y 0.5 CPU física Intel.

### Escalado {#scaling}

#### Escalado horizontal {#horizontal-scaling}

El escalado horizontal se refiere a distribuir el tráfico entre múltiples instancias de Observability Pipelines Worker. Observability Pipelines Worker tiene una arquitectura sin elementos compartidos y no requiere nodos líderes ni ninguna coordinación de ese tipo que pueda complicar el escalado.

Para fuentes basadas en push, coloque un balanceador de carga de red frente a sus instancias de Observability Pipelines Worker y escálelas según sea necesario.

No se requiere un balanceador de carga para fuentes basadas en pull. Implemente Observability Pipelines Worker y escálelo según sea necesario. Su sistema de publicación-suscripción coordina el acceso exclusivo a los datos cuando Observability Pipelines Worker solicita leerlos.

##### Balanceo de carga {#load-balancing}

Solo se requiere un balanceador de carga para fuentes basadas en push, como los agents. No necesita un balanceador de carga si utiliza exclusivamente fuentes basadas en pull, como Kafka.

###### Balanceo de carga del lado del cliente {#client-side-load-balancing}

No se recomienda el balanceo de carga del lado del cliente. El balanceo de carga del lado del cliente se refiere a que los clientes realizan el balanceo de carga del tráfico entre múltiples instancias de Observability Pipelines Worker. Aunque este enfoque parece más sencillo, puede ser menos confiable y más complicado porque:

- El balanceo de carga con una conmutación por error adecuada es complejo. Los problemas en esta área son delicados, ya que pueden provocar la pérdida de datos o incidentes que interrumpan sus servicios. Esto se agrava si trabaja con varios tipos de clientes.
- El objetivo del agregador Observability Pipelines Worker es trasladar la responsabilidad de sus agents, y asumir el balanceo de carga ayuda a lograrlo.

###### Tipos de balanceadores de carga {#load-balancer-types}

Datadog recomienda balanceadores de carga de capa 4 (L4) (balanceadores de carga de red), ya que admiten los protocolos de Observability Pipelines Worker (TCP, UDP y HTTP). Incluso si envía exclusivamente tráfico HTTP (capa 7), Datadog recomienda balanceadores de carga L4 por su rendimiento y simplicidad.

| Proveedor de nube| Recomendación                                                |
| ------------- | --------------------------------------------------------------|
| AWS           | AWS Network Load Balancer (NLB)                               |
| Azure         | Azure Internal Load Balancer                                  |
| Google Cloud  | Internal TCP/UDP Network Load Balancer                        |
| Privado       | HAProxy, NGINX u otro balanceador de carga con soporte de capa 4 |

###### Configuraciones del balanceador de carga {#load-balancer-configurations}

Al configurar clientes y balanceadores de carga, Datadog recomienda la siguiente configuración general:

- Utilice una estrategia de balanceo de carga simple de tipo round-robin.
- No habilite el balanceo de carga entre zonas a menos que el tráfico entre zonas esté muy desequilibrado.
- Configure los balanceadores de carga para usar el punto de conexión de la API de salud de Observability Pipelines Worker para la salud del objetivo.
- Asegúrese de que sus instancias de Observability Pipelines Worker se registren o eliminen automáticamente a medida que escalan.
- Habilite keep-alive con un tiempo de espera de inactividad no mayor a un minuto tanto para sus clientes como para sus balanceadores de carga.
- Si es compatible, habilite la concurrencia de conexión y la agrupación de conexiones en sus agents. Si eso no es compatible, considere la arquitectura unificada que implementa Observability Pipelines Worker en el borde. La agrupación de conexiones asegura que grandes volúmenes de datos se distribuyan a través de múltiples conexiones para ayudar a equilibrar el tráfico.

###### Puntos críticos del balanceador de carga {#load-balancer-hot-spots}

Los puntos críticos de balanceo de carga ocurren cuando una o más instancias de Observability Pipelines Worker reciben tráfico desproporcionado. Los puntos críticos generalmente ocurren debido a una de dos razones:

1. Se está enviando una cantidad sustancial de tráfico a través de una sola conexión.
2. El tráfico en una zona de disponibilidad es mucho mayor que en las otras.

En estos casos, se recomiendan las siguientes tácticas de mitigación respectivas:

1. Divida las conexiones grandes en múltiples conexiones. La mayoría de los clientes permiten la concurrencia y la agrupación de conexiones, lo que distribuye los datos en múltiples conexiones. Esta táctica permite que su balanceador de carga distribuya la conexión entre múltiples instancias de Observability Pipelines Worker. Si su cliente no admite esto, considere la arquitectura unificada, donde Observability Pipelines Worker puede implementarse adicionalmente en el borde.
2. Habilite el balanceo de carga entre zonas en su balanceador de carga. El balanceo entre zonas equilibra todo el tráfico de la zona de disponibilidad entre todas las instancias de Observability Pipelines Worker.

#### Escalado vertical {#vertical-scaling}

El modelo de concurrencia de Observability Pipelines Worker se escala automáticamente para aprovechar todas las vCPUs. No se requieren configuraciones de concurrencia ni cambios de configuración. Al escalar verticalmente, Datadog recomienda limitar el tamaño de una instancia para procesar no más del 50% de su volumen total e implementar al menos dos instancias de Observability Pipelines Worker para lograr alta disponibilidad.

#### Escalado automático {#auto-scaling}

El escalado automático debe basarse en el uso promedio de CPU. Para la gran mayoría de las cargas de trabajo, Observability Pipelines Worker está limitado por la CPU. El uso de CPU es la señal más sólida para el escalado automático, ya que no produce falsos positivos. Datadog recomienda que utilice la siguiente configuración, ajustándola según sea necesario:

- CPU promedio con un objetivo de utilización del 85%.
- Un período de estabilización de cinco minutos para escalar hacia arriba y hacia abajo.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/observability_pipelines/scaling_and_performance/best_practices_for_scaling_observability_pipelines/#horizontal-scaling
[2]: /es/observability_pipelines/scaling_and_performance/best_practices_for_scaling_observability_pipelines/#vertical-scaling
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L208-L209
[4]: https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/
[5]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L238
[6]: /es/observability_pipelines/scaling_and_performance/best_practices_for_scaling_observability_pipelines/#optimize-the-instance
[7]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L70-L85
[8]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-network-bandwidth.html
[9]: https://www.datadoghq.com/architecture/op-vm-deployment/
[10]: https://www.datadoghq.com/architecture/observability-pipelines-kubernetes-deployment/