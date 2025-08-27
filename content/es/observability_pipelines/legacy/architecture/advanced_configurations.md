---
aliases:
- /es/observability_pipelines/architecture/advanced_configurations/
title: (LEGACY) Configuraciones avanzadas
---

<div class="alert alert-info">
Esta guía es para grandes despliegues a nivel de producción.
</div>

### Múltiples despliegues de agregadores

Como se explica en [Redes][1], Datadog recomienda empezar con un agregador de workers de Observability Pipelines por región. Esto es para evitar complicar en exceso el despliegue inicial de workers de Observability Pipelines, aunque existen casos en los que empezar con varios despliegues es lo ideal:

1. **Si dispones de varias nubes y regiones, despliega el agregador de workers de Observability Pipelines en cada una de ellas para evitar el envío de grandes cantidades de datos a través de Internet. Tu agregador de workers de Observability Pipelines debe recibir datos internos y servir como único punto de salida de tu red.

2. **Gestión independiente.** Tienes equipos que pueden operar y gestionar un agregador de workers de Observability Pipelines de forma independiente para tu caso de uso. Por ejemplo, tu equipo de Ciencia de datos puede ser responsable de operar su propia infraestructura y tiene los medios para operar de forma independiente su propio agregador de workers de Observability Pipelines.

### Múltiples cuentas en la nube

Muchos usuarios tienen varias cuentas en la nube con VPC y clústeres en su interior. En este caso, Datadog sigue recomendando desplegar un agregador de workers de Observability Pipelines por región. Despliega un worker de Observability Pipelines en tu clúster de servicios o herramientas y configura todas tus cuentas de nube para enviar datos a este clúster. Para obtener más información, consulta [Redes][1].

### Sistemas pub-sub

El uso de un sistema de publicación-suscripción (pub-sub) como Kafka no se requiere para hacer que tu arquitectura esté altamente disponible o sea altamente duradera (consulte [Alta disponibilidad y recuperación ante desastres][2]), pero ofrece las siguientes ventajas:

1. **Fiabilidad mejorada.** Los sistemas pub-sub están diseñados para ser sistemas muy fiables y duraderos que cambien con poca frecuencia. Son especialmente fiables si se utiliza una opción gestionada. Es probable que el worker de Observability Pipelines cambie con más frecuencia en función de su propósito. Aísla la inactividad del worker de Observability Pipelines detrás de un sistema pub-sub para aumentar la disponibilidad, desde la percepción de tus clientes, y simplificar la recuperación.


2. **No se requiere un balanceador de carga.** Los sistemas pub-sub eliminan la necesidad de un balanceador de carga. Tu sistema pub-sub se encarga de la coordinación de los consumidores, lo que facilita el escalado horizontal del worker de Observability Pipelines.

#### Partición pub-sub

La partición, también llamado "temas" en la terminología de Kafka, se refiere a la separación de datos en tus sistemas pub-sub. Deberías particionarlos siguiendo las líneas de origen de los datos, como servicio o host que haya generado los datos.

{{< img src="observability_pipelines/production_deployment_overview/partitioning.png" alt="Diagrama que muestra un Agent en un nodo, que envía datos sobre tus servicios en un pub-sub que luego los envía a cuatro workers de Observability Pipelines" style="width:55%;" >}}

#### Configuración pub-sub

Cuando se utiliza un sistema pub-sub, Datadog recomienda los siguientes cambios en la configuración del worker de Observability Pipelines:

- **Activación de los reconocimientos de todos los sumideros de extremo a extremo.** Este parámetro garantiza que el punto de control pub-sub no avance hasta que los datos se hayan escrito correctamente.
- **Uso de buffers de memoria.** No hay necesidad de utilizar buffers de disco del worker de Observability Pipelines cuando se encuentra detrás de un sistema pub-sub. Tu sistema pub-sub está diseñado para el almacenamiento en buffer a largo plazo con alta durabilidad. El worker de Observability Pipelines sólo debería ser responsable de leer, procesar y enrutar los datos (no de la durabilidad).

### Agregación global

En esta sección se ofrecen recomendaciones para realizar cálculos globales en los destinos legacy. Los destinos modernos ya admiten cálculos globales. Por ejemplo, Datadog admite distribuciones (como DDSketch) que resuelven observaciones globales de tus datos de métricas.

La agregación global se refiere a la capacidad de agregar datos para toda una región. Por ejemplo, calcular cuantiles globales para promedios de carga de CPU. Para lograrlo, una única instancia del worker de Observability Pipelines debe tener acceso a las estadísticas de carga media de CPU de cada nodo. Esto no es posible con el escalado horizontal; cada instancia individual del worker de Observability Pipelines sólo tiene acceso a una porción de los datos globales. Por lo tanto, la agregación debe realizarse por niveles.

{{< img src="observability_pipelines/production_deployment_overview/global_aggregation.png" alt="Diagrama que muestra balanceadores de carga enviando datos a un agregador de nivel uno, que tiene varios workers de Observability Pipelines. Luego, los datos se envían del agregador de nivel uno al agregador de nivel dos, que tiene un solo worker" style="width:90%;" >}}

En el diagrama anterior, los agregadores de nivel dos reciben una subflujo (stream) agregado de los datos globales de los agregadores de nivel uno. Esto permite que una única instancia tenga una vista global sin necesidad procesar todo el flujo e introducir un único punto de falla.

#### Recomendaciones

- Limita la agregación global a tareas que puedan reducir los datos, como el cálculo de histogramas globales. Nunca envíes todos los datos a tus agregadores globales.
- Sigue utilizando tus agregadores locales para procesar y entregar la mayoría de los datos y no introducir un único punto de fallo.

[1]: /es/observability_pipelines/legacy/architecture/networking
[2]: /es/observability_pipelines/legacy/architecture/availability_disaster_recovery