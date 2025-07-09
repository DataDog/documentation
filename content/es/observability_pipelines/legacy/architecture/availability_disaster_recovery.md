---
aliases:
- /es/observability_pipelines/architecture/availability_disaster_recovery/
title: (LEGACY) Alta disponibilidad y recuperación ante desastres
---

<div class="alert alert-info">
Esta guía es para grandes despliegues a nivel de producción.
</div>

En el contexto de Observability Pipelines, la alta disponibilidad se refiere a que el worker de Observability Pipelines permanezca disponible si se produce algún problema en el sistema.

{{< img src="observability_pipelines/production_deployment_overview/high_availability.png" alt="Diagrama que muestra la zona de disponibilidad uno con el balanceador de carga uno fuera de línea y ambos agentes enviando datos al balanceador de carga dos, y luego al worker uno y al worker dos. En la zona de disponibilidad dos, el worker tres está inactivo, por lo que ambos balanceadores de carga envían datos al worker N" style="width:65%;" >}}

Para lograr una alta disponibilidad:

1. Despliega al menos dos instancias del worker de Observability Pipelines en cada zona de disponibilidad.
2. Despliegue el worker de Observability Pipelines en al menos dos zonas de disponibilidad.
3. Enfrenta tus instancias del worker de Observability Pipelines con un balanceador de carga que equilibre el tráfico entre las instancias del worker de Observability Pipelines. Para obtener más información, consulta [Planificación y escalado de capacidades][1].

## Mitigación en casos de fallo

### Gestión de problemas relacionados con los procesos del worker de Observability Pipelines

Para mitigar un problema relacionado con el proceso de un sistema, distribuye el worker de Observability Pipelines entre varios nodos y enfréntalos con un balanceador de carga de red que pueda redirigir el tráfico a otra instancia del worker de Observability Pipelines. Además, la autorreparación automatizada a nivel de plataforma debería reiniciar el proceso o sustituir el nodo.

{{< img src="observability_pipelines/production_deployment_overview/process_failure.png" alt="Diagrama que muestra tres nodos, cada uno de los cuales tiene un worker de Observability Pipelines" style="width:45%;" >}}

### Mitigación de fallos en nodos

Para mitigar un problema relacionado con un nodo, distribuye el worker de Observability Pipelines entre varios nodos y enfréntalos con un balanceador de carga de red que pueda redirigir el tráfico a otro nodo del worker de Observability Pipelines. Además, la autorreparación automatizada a nivel de plataforma debería sustituir el nodo.

{{< img src="observability_pipelines/production_deployment_overview/node_failure.png" alt="Diagrama que muestra datos dirigiéndose al balanceador de carga del nodo uno, pero dado que el worker de Observability Pipelines está inactivo en el nodo uno, los datos se envían a los workers del nodo dos y del nodo N" style="width:40%;" >}}

### Gestión de los fallos en las zonas de disponibilidad

Para mitigar los problemas relacionados con las zonas de disponibilidad, despliega el worker de Observability Pipelines en varias zonas de disponibilidad.

{{< img src="observability_pipelines/production_deployment_overview/availability_zone_failure.png" alt="Diagrama que muestra los balanceadores de carga y el worker de Observability Pipelines inactivos en la zona de disponibilidad uno, sin embargo los balanceadores de carga y los workers de la zona N siguen enviando y recibiendo datos" style="width:45%;" >}}

### Mitigación de fallos en regiones

El worker de Observability Pipelines está diseñado para enrutar datos de observabilidad internos y no debe conmutar por error a otra región, sino que debería desplegarse en todas tus regiones. Por lo tanto, si toda tu red o región fallan, el worker de Observability Pipelines falla con ellas. Para obtener más información, consulta [Redes][2].

## Recuperación ante desastres

### Recuperación ante desastres internos

El worker de Observability Pipelines es una herramienta de nivel de infraestructura diseñada para enrutar datos internos de observabilidad. Implementa una arquitectura de nada compartido y no gestiona estados que deban replicarse o transferirse a un sitio de recuperación ante desastres (DR). Por lo tanto, si toda tu región falla, el worker de Observability Pipelines falla con ella. Por lo tanto, debes instalar el worker de Observability Pipelines en tu sitio de DR como parte de tu plan de DR más amplio.

### Recuperación ante desastres externos

Si estás utilizando un destino gestionado, como Datadog, el worker de Observability Pipelines puede facilitar el enrutamiento automático de datos a tu sitio de DR Datadog utilizando la función de disyuntor del worker de Observability Pipelines.

{{< img src="observability_pipelines/production_deployment_overview/external_disaster_recovery.png" alt="Diagrama que muestra workers de Observability Pipelines en diferentes zonas, donde todos envían datos al mismo destino de recuperación ante desastres" style="width:75%;" >}}

[1]: /es/observability_pipelines/legacy/architecture/capacity_planning_scaling
[2]: /es/observability_pipelines/legacy/architecture/networking