---
aliases:
- /es/cloudprem/configure/cluster_sizing/
- /es/cloudprem/operate/sizing/
description: Obtenga información sobre el dimensionamiento de clúster para BYOC Logs
further_reading:
- link: /byoc-logs/configure/ingress/
  tag: Documentación
  text: Configure la ingesta de BYOC Logs
- link: /byoc-logs/configure/pipelines/
  tag: Documentación
  text: Configure el procesamiento de BYOC Logs
- link: /byoc-logs/introduction/architecture/
  tag: Documentación
  text: Obtenga más información sobre la arquitectura de BYOC Logs
title: Dimensionamiento del clúster
---
{{< jqmath-vanilla >}}

## Descripción general {#overview}

Un dimensionamiento adecuado del clúster ayuda a garantizar un rendimiento óptimo, una eficiencia de costos y una confiabilidad para su implementación de BYOC Logs (Bring Your Own Cloud). Sus requisitos de dimensionamiento dependen de varios factores, incluidos el volumen de ingesta de registros, los patrones de consulta, el período de retención y la complejidad de sus datos de registros.

Los [ejemplos de dimensionamiento](#sizing-examples) a continuación proporcionan configuraciones de punto de partida para volúmenes diarios de registros comunes. Para obtener una guía más detallada sobre cada componente, consulte las secciones que siguen.

<div class="alert alert-tip">
Utilice su volumen diario de registros esperado y las tasas máximas de ingesta como puntos de partida, luego hace un seguimiento del rendimiento de su clúster y ajuste el dimensionamiento según sea necesario.
</div>

## Ejemplos de dimensionamiento {#sizing-examples}

La siguiente tabla proporciona configuraciones de referencia para volúmenes diarios de registros comunes. Estas recomendaciones están destinadas a ser puntos de partida y deben ajustarse según la utilización de recursos observada y el rendimiento de las consultas.

Como punto de partida, planifique aproximadamente:

- 2 vCPU de indexador por TB de registros ingeridos por día
- 1 vCPU de compactador por 2 TB de registros ingeridos por día

La capacidad del buscador depende de la concurrencia de consultas, la complejidad de las consultas y la cantidad de datos escaneados. Por lo tanto, debe dimensionarse en función de la carga de trabajo de búsqueda esperada en lugar de solo el volumen de ingesta. Las cargas de trabajo con uso intensivo de análisis pueden requerir hasta el doble de la capacidad de búsqueda de referencia que se muestra a continuación.

Estas recomendaciones asumen CPU x86 modernas, como las utilizadas en los tipos de instancia AWS M6, o CPU equivalentes de otros proveedores de nube. Las CPU basadas en ARM, como AWS Graviton, pueden ofrecer una mejor eficiencia de costos con un rendimiento comparable.

La siguiente tabla muestra la capacidad total de vCPU para cada componente.

|   Volumen diario | Total de vCPU del indexador | Total de vCPU del compactador | Total de vCPU del buscador |
|---------------:|--------------------:|----------------------:|---------------------:|
|   **1 TB/día** |                   2 |                   0.5 |                    4 |
|  **10 TB/día** |                  20 |                     5 |                   40 |
| **100 TB/día** |                 200 |                    50 |                  400 |

Utilice las siguientes asignaciones de CPU y memoria por pod como punto de partida para distribuir la capacidad total entre los pods:

| Volumen diario    | Indexador por pod | Compactador por pod | Buscador por pod |
|-----------------|----------------:|------------------:|-----------------:|
| **Hasta 30 TB/día** |  4 vCPUs, 16 GB |    4 vCPUs, 16 GB |  16 vCPUs, 64 GB |
| **Más de 30 TB/día** |  8 vCPUs, 32 GB |    8 vCPUs, 32 GB | 64 vCPUs, 256 GB |

<div class="alert alert-info">
<strong>Facturación frente a aprovisionamiento:</strong> Las vCPU aprovisionadas y las vCPU facturadas son diferentes. Un clúster de producción se aprovisiona intencionalmente en exceso para absorber los picos de ingesta y búsqueda. Comuníquese con su representante de Datadog para obtener orientación sobre la facturación.
</div>

## Indexadores {#indexers}

Los indexadores reciben registros de los agentes de Datadog, luego los procesan, indexan y almacenan como archivos de índice (llamados _splits_) en el almacenamiento de objetos. El dimensionamiento adecuado es fundamental para mantener el rendimiento de la ingesta y garantizar que su clúster pueda manejar su volumen de registros.

| Especificación        | Recomendación                 | Notas                                                                                                                                                                                                                                                                                                                                                                  |
|----------------------|--------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Rendimiento**      | 8 MB/s por vCPU                | Rendimiento base para determinar el dimensionamiento inicial. El rendimiento real depende de las características del registro (tamaño, número de atributos, nivel de anidamiento)                                                                                                                                                                                                                         |
| **Memoria**           | 4 GB de RAM por vCPU              |                                                                                                                                                                                                                                                                                                                                                                        |
| **Tamaño mínimo de Pod** | 2 vCPUs, 8 GB de RAM              | Mínimo recomendado para pods de indexador                                                                                                                                                                                                                                                                                                                                   |
| **Capacidad de almacenamiento** | Al menos 30 GB                 | Requerido para datos temporales mientras se crean y fusionan archivos de índice                                                                                                                                                                                                                                                                                                     |
| **Tipo de almacenamiento**     | Almacenamiento en bloque conectado a la red | Por ejemplo: Amazon EBS gp3, Azure Managed Disks o GCP Persistent Disk. Los datos se almacenan temporalmente en un registro de escritura anticipada (WAL) antes de cargarse en el almacenamiento de objetos. El WAL no se replica, por lo que el uso de SSD locales (efímeros) aumenta el riesgo de perder unos minutos de datos si el disco falla. El almacenamiento en bloque conectado a la red proporciona redundancia integrada. |
| **E/S de disco**         | ~20 MB/s por vCPU              | Equivalente a 320 IOPS por vCPU para Amazon EBS (asumiendo 64 KB por IOPS). Por ejemplo, el rendimiento predeterminado de 125 MiB/s de Amazon EBS gp3 es suficiente para un indexador de 4 vCPU.                                                                                                                                                                                              |


{{% collapse-content title="Ejemplo: Dimensionamiento para 100 TB de registros por día." level="h3" expanded=false %}}
Para indexar 100 TB de registros por día (~1,160 MB/s), siga estos pasos:

1. **Calcule las vCPU:** `1,160 MB/s ÷ 8 MB/s per vCPU ≈ 145 vCPUs`
2. **Calcule la RAM:** `145 vCPUs × 4 GB RAM per vCPU ≈ 580 GB RAM`
3. **Agregue margen:** Comience con 50 pods de indexador, cada uno configurado con **4 vCPU, 16 GB de RAM y un disco de 30 GB**. Ajuste estos valores según el rendimiento observado y las necesidades de redundancia.
{{% /collapse-content %}}

{{% collapse-content title="Dimensionamiento por recuento de eventos" level="h3" expanded=false %}}
Si conoce su recuento diario de eventos pero no su volumen en bytes, utilice esta fórmula para estimar:

$$\\text\"Volumen diario (TB)\" = {\\text\"eventos por día\" × \\text\"tamaño promedio de evento (bytes)\"} / 10^\{12\}$$

Por ejemplo, con 1 mil millones de eventos/día con un tamaño promedio de 1 KB:

`1,000,000,000 × 1,000 / 1,000,000,000,000 = 1 TB/day`

Los tamaños típicos de los eventos de registro varían desde 500 bytes (syslog corto) hasta 2-3 KB (JSON con etiquetas de Kubernetes). Mida una muestra representativa de sus registros para obtener un promedio preciso.
{{% /collapse-content %}}

## Compactadores {#compactors}

El compactador fusiona divisiones de índice pequeñas en otras más grandes para reducir la fragmentación y mejorar la eficiencia de la búsqueda. También elimina las divisiones obsoletas para recuperar almacenamiento.

| Especificación    | Recomendación      | Notas                                                        |
|------------------|---------------------|--------------------------------------------------------------|
| **Rendimiento**  | 1 vCPU por 2 TB/día | Línea base para el dimensionamiento inicial                                  |
| **Memoria**       | 4 GB de RAM por vCPU   |                                                              |
| **Tipo de almacenamiento** | SSD local           | Se recomiendan instancias con SSD locales, como AWS M8gd |

## Buscadores {#searchers}

Los buscadores manejan las consultas de búsqueda desde la interfaz de usuario de Datadog, leyendo metadatos del Metastore y obteniendo datos del almacenamiento de objetos.

Un punto de partida general es aprovisionar aproximadamente el doble del número total de vCPU asignadas a los indexadores. Consulte nuestros ejemplos de dimensionamiento.

- **Rendimiento:** El rendimiento de la búsqueda depende en gran medida de la carga de trabajo (complejidad de la consulta, concurrencia, cantidad de datos escaneados). Por ejemplo, las consultas de términos (`status:error AND message:exception`) suelen ser computacionalmente menos costosas que las consultas de búsqueda con comodines o de eventos completos.
- **Memoria:** 4 GB de RAM por cada vCPU del buscador. Aprovisione más RAM si espera muchas solicitudes de agregación simultáneas.


## Otros servicios {#other-services}

Asigne los siguientes recursos para estos componentes ligeros:

| Servicio | vCPUs | RAM | Réplicas |
|---------|-------|-----|----------|
| **Plano de control** | 2 | 4 GB | 1 |
| **Metastore** | 2 | 4 GB | 2 |
| **Janitor** | 2 | 4 GB | 1 |

## Estimación de almacenamiento de objetos {#object-storage-estimation}

BYOC Logs comprime e indexa los datos de registro antes de almacenarlos en el almacenamiento de objetos. La relación de compresión depende del formato de registro, la estructura y la redundancia en sus datos.

| Métrica | Rango típico |
|--------|---------------|
| **Relación de compresión** | 5x a 8x (entrada sin procesar a tamaño almacenado) |
| **Almacenamiento por TB/día ingerido** | 125-200 GB/día en almacenamiento de objetos |

Para estimar sus requisitos de almacenamiento de objetos:

$$\\text\"Datos almacenados por día\" = {\\text\"Volumen diario\"} / {\\text\"relación de compresión\"}$$

$$\\text\"Almacenamiento total\" = \\text\"Datos almacenados por día\" × \\text\"período de retención (días)\"$$

Los siguientes ejemplos asumen un período de retención de 30 días y una relación de compresión de 6x:

|   Volumen diario | Almacenamiento de objetos |
|---------------:|---------------:|
|   **1 TB/día** |          ~5 TB |
|  **10 TB/día** |         ~50 TB |
| **100 TB/día** |        ~500 TB |

{{% collapse-content title="Ejemplo: Almacenamiento para 10 TB/día con retención de 30 días" level="h3" expanded=false %}}
Suponiendo una relación de compresión de 6x:

1. **Almacenado por día:** `10 TB / 6 ≈ 1.67 TB/day`
2. **Total por 30 días:** `1.67 TB × 30 ≈ 50 TB`

Utilice almacenamiento de objetos de nivel estándar (por ejemplo, S3 Standard, GCS Standard) para datos activos. Los niveles de menor costo, como S3 Infrequent Access o GCS Nearline, no están validados para su uso con BYOC Logs.
{{% /collapse-content %}}

## Base de datos PostgreSQL {#postgresql-database}

- **Tamaño de la instancia:** Para la mayoría de los casos de uso, una instancia de PostgreSQL con 1 vCPU y 4 GB de RAM es suficiente
- **Recomendación de AWS RDS:** Si utiliza AWS RDS, el tipo de instancia `t4g.medium` es un punto de partida adecuado
- **Alta disponibilidad:** Habilite la implementación Multi-AZ con una réplica en espera para alta disponibilidad

## Niveles de dimensionamiento del gráfico de Helm {#helm-chart-sizing-tiers}

El gráfico de Helm de BYOC Logs proporciona niveles de recursos predefinidos a través de los parámetros `indexer.podSize` y `searcher.podSize`. `podSize` selecciona los requisitos de recursos del pod y los parámetros de ajuste de Quickwit relacionados. El `podSize` predeterminado es `xlarge` para ambos componentes. Cada ajuste preestablecido está diseñado para dejar espacio en un nodo coincidente para los componentes del sistema de Kubernetes, DaemonSets y complementos.

Los ajustes preestablecidos tienen en cuenta los recursos reservados para los componentes del sistema de Kubernetes. Las cantidades de reserva se basan en el [cálculo de reserva de nodos de GKE](https://docs.cloud.google.com/kubernetes-engine/docs/concepts/plan-node-sizes#resource_reservations). Se reservan 250m de CPU y 512Mi de memoria adicionales por nodo para DaemonSets y complementos:

```text
Actual CPU request = (nominal pod CPU - Kubernetes system CPU reservation - 250m), rounded down to the nearest 100m
Actual memory request/limit = (nominal pod memory - Kubernetes system memory reservation - 512Mi), rounded down to the nearest 100Mi
```

| `podSize` | Solicitud de CPU nominal | Solicitud de CPU real | Solicitud/límite de memoria nominal | Solicitud/límite de memoria real |
|---|---:|---:|---:|---:|
| `large` | 2 | 1600m | 8Gi | 5700Mi |
| `xlarge` | 4 | 3600m | 16Gi | 13100Mi |
| `2xlarge` | 8 | 7600m | 32Gi | 28500Mi |
| `4xlarge` | 16 | 15600m | 64Gi | 59300Mi |
| `6xlarge` | 24 | 23600m | 96Gi | 90100Mi |
| `8xlarge` | 32 | 31600m | 128Gi | 120900Mi |

Los preajustes no establecen un límite de CPU, lo que permite que un pod utilice la CPU inactiva en su nodo sin ser limitado. Las solicitudes y los límites de memoria son iguales para mantener el uso de memoria dentro de la capacidad asignable del nodo.

Los valores que definen los tamaños de la cola de ingesta y los tamaños de la caché de búsqueda se aplican automáticamente para el nivel seleccionado. Consulte el mapa de dimensionamiento del gráfico de Helm [1] para ver la configuración completa. Para obtener más detalles sobre cada parámetro, consulte la documentación de Quickwit para [parámetros del indexador][2], [parámetros de la API de ingesta][3] y [parámetros del buscador][4].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/cloudprem/sizing-map.yaml
[2]: https://quickwit.io/docs/configuration/node-config#indexer-configuration
[3]: https://quickwit.io/docs/configuration/node-config#ingest-api-configuration
[4]: https://quickwit.io/docs/configuration/node-config#searcher-configuration