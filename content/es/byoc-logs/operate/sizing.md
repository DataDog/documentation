---
aliases:
- /es/cloudprem/configure/cluster_sizing/
- /es/cloudprem/operate/sizing/
description: Obtenga información sobre el dimensionamiento de clústeres para registros
  BYOC
further_reading:
- link: /byoc-logs/configure/ingress/
  tag: Documentación
  text: Configurar la ingesta de registros BYOC
- link: /byoc-logs/configure/pipelines/
  tag: Documentación
  text: Configurar el procesamiento de registros BYOC
- link: /byoc-logs/introduction/architecture/
  tag: Documentación
  text: Obtenga más información sobre la arquitectura de registros BYOC
title: Dimensionamiento del clúster
---
{{< jqmath-vanilla >}}

## Descripción general {#overview}

Un dimensionamiento adecuado del clúster ayuda a garantizar un rendimiento óptimo, eficiencia de costos y confiabilidad para su implementación de registros BYOC (Bring Your Own Cloud). Sus requisitos de dimensionamiento dependen de varios factores, incluidos el volumen de ingesta de registros, los patrones de consulta, el período de retención y la complejidad de sus datos de registro.

Los [ejemplos de dimensionamiento](#sizing-examples) a continuación proporcionan configuraciones iniciales para volúmenes de registro diarios comunes. Para obtener una guía más detallada sobre cada componente, consulte las secciones siguientes.

<div class="alert alert-tip">
Utilice su volumen diario de registros esperado y las tasas de ingesta máxima como puntos de partida, luego supervise el rendimiento de su clúster y ajuste el dimensionamiento según sea necesario.
</div>

## Ejemplos de dimensionamiento {#sizing-examples}

La siguiente tabla proporciona configuraciones iniciales para volúmenes de registros diarios comunes. Estas son recomendaciones de referencia; ajústelas según el rendimiento que observe.

Como regla general para una carga de trabajo mixta, planifique alrededor de 12 vCPU por TB/día ingerido: 4 vCPU para indexadores y 8 vCPU para buscadores. Las cargas de trabajo de análisis pesado necesitan el doble.

Estas recomendaciones de vCPU asumen CPU x86 modernas, como los tipos de instancia AWS m6 (o equivalentes en otras nubes). Las CPU basadas en ARM, como AWS Graviton, pueden ofrecer una mejor eficiencia de costos con el mismo rendimiento.

| Volumen diario | Pods de indexador | Tamaño de pod de indexador | Pods de buscador | Tamaño de pod de buscador | Almacenamiento de objetos (retención de 30 días, compresión ~6x) |
|-------------|-------------|-----------------|---------------|-------------------|-----------------------------------------------------|
| **1 TB/día** | 2 | large | 2 | xlarge | ~5 TB |
| **5 TB/día** | 5 | xlarge | 5 | 2xlarge | ~25 TB |
| **10 TB/día** | 10 | xlarge | 5 | 4xlarge | ~50 TB |
| **50 TB/día** | 25 | 2xlarge | 13 | 8xlarge | ~250 TB |
| **100 TB/día** | 50 | 2xlarge | 25 | 8xlarge | ~500 TB |

<div class="alert alert-info">
<strong>Facturación frente a aprovisionamiento:</strong> Las vCPU aprovisionadas y las vCPU facturadas son diferentes. Un clúster de producción se aprovisiona intencionalmente en exceso para absorber los picos de ingesta y búsqueda. Comuníquese con su representante de Datadog para obtener orientación sobre la facturación.
</div>

## Indexadores {#indexers}

Los indexadores reciben registros de los agentes de Datadog, luego los procesan, indexan y almacenan como archivos de índice (llamados _splits_) en el almacenamiento de objetos. El dimensionamiento adecuado es fundamental para mantener el rendimiento de la ingesta y garantizar que su clúster pueda manejar su volumen de registros.

| Especificación | Recomendación | Notas |
|---------------|----------------|-------|
| **Rendimiento** | 5 MB/s por vCPU | Rendimiento base para determinar el dimensionamiento inicial. El rendimiento real depende de las características de los registros (tamaño, número de atributos, nivel de anidamiento). |
| **Memoria** | 4 GB de RAM por vCPU | |
| **Tamaño mínimo de pod** | 2 vCPU, 8 GB de RAM | Mínimo recomendado para pods de indexador |
| **Capacidad de almacenamiento** | Al menos 250 GB | Requerido para datos temporales mientras se crean y combinan archivos de índice |
| **Tipo de almacenamiento** | Almacenamiento en bloque conectado a la red | Por ejemplo: Amazon EBS gp3, Azure Managed Disks o GCP Persistent Disk. Los datos se almacenan temporalmente en un registro de escritura anticipada (WAL) antes de cargarse en el almacenamiento de objetos. El WAL no se replica, por lo que el uso de SSD locales (efímeros) aumenta el riesgo de perder unos minutos de datos si el disco falla. El almacenamiento en bloque conectado a la red proporciona redundancia integrada. |
| **E/S de disco** | ~20 MB/s por vCPU | Equivalente a 320 IOPS por vCPU para Amazon EBS (asumiendo 64 KB por IOPS) |


{{% collapse-content title="Ejemplo: Dimensionamiento para 1 TB de registros por día" level="h4" expanded=false %}}
Para indexar 1 TB de registros por día (~11.6 MB/s), siga estos pasos:

1. **Calcule las vCPU:** `11.6 MB/s ÷ 5 MB/s per vCPU ≈ 2.3 vCPUs`
2. **Calcule la RAM:** `2.3 vCPUs × 4 GB RAM ≈ 9 GB RAM`
3. **Agregue margen:** Comience con un pod de indexador configurado con **3 vCPU, 12 GB de RAM y un disco de 200 GB**. Ajuste estos valores según el rendimiento observado y las necesidades de redundancia.
{{% /collapse-content %}}

{{% collapse-content title="Dimensionamiento por recuento de eventos" level="h4" expanded=false %}}
Si conoce su recuento diario de eventos pero no su volumen en bytes, utilice esta fórmula para estimar:

$$\\text\"Volumen diario (TB)\" = {\\text\"eventos por día\" × \\text\"tamaño promedio de evento (bytes)\"} / 10^\{12\}$$

Por ejemplo, con 1 mil millones de eventos/día a un tamaño promedio de 1 KB:

`1,000,000,000 × 1,000 / 1,000,000,000,000 = 1 TB/day`

Los tamaños típicos de eventos de registro varían de 500 bytes (syslog corto) a 2-3 KB (JSON con etiquetas de Kubernetes). Mida una muestra representativa de sus registros para obtener un promedio preciso.
{{% /collapse-content %}}

## Buscadores {#searchers}

Los buscadores gestionan las consultas de búsqueda desde la interfaz de usuario de Datadog, leen metadatos del Metastore y obtienen datos del almacenamiento de objetos.

Un punto de partida general es aprovisionar aproximadamente el doble del número total de vCPU asignadas a los indexadores. Consulte nuestros ejemplos de dimensionamiento.

- **Rendimiento:** El rendimiento de la búsqueda depende en gran medida de la carga de trabajo (complejidad de la consulta, concurrencia, cantidad de datos escaneados). Por ejemplo, las consultas de términos (`status:error AND message:exception`) suelen ser computacionalmente menos costosas que las consultas de búsqueda con comodines o de eventos completos.
- **Memoria:** 4 GB de RAM por vCPU de buscador. Aprovisione más RAM si espera muchas solicitudes de agregación simultáneas.


## Otros servicios {#other-services}

Asigne los siguientes recursos para estos componentes ligeros:

| Servicio | vCPU | RAM | Réplicas |
|---------|-------|-----|----------|
| **Plano de control** | 2 | 4 GB | 1 |
| **Metastore** | 2 | 4 GB | 2 |
| **Janitor** | 2 | 4 GB | 1 |

## Estimación de almacenamiento de objetos {#object-storage-estimation}

BYOC Logs comprime e indexa los datos de registros antes de almacenarlos en el almacenamiento de objetos. La tasa de compresión depende del formato, la estructura y la redundancia de los datos.

| Métrica | Rango típico |
|--------|---------------|
| **Relación de compresión** | 5x a 8x (entrada sin procesar respecto al tamaño almacenado) |
| **Almacenamiento por TB/día ingerido** | 125-200 GB/día en almacenamiento de objetos |

Para estimar sus requisitos de almacenamiento de objetos:

$$\\text\"Datos almacenados por día\" = {\\text\"Volumen diario\"} / {\\text\"relación de compresión\"}$$

$$\\text\"Almacenamiento total\" = \\text\"Datos almacenados por día\" × \\text\"período de retención (días)\"$$

{{% collapse-content title="Ejemplo: Almacenamiento para 10 TB/día con una retención de 30 días" level="h4" expanded=false %}}
Suponiendo una relación de compresión de 6x:

1. **Almacenado por día:** `10 TB / 6 ≈ 1.67 TB/day`
2. **Total por 30 días:** `1.67 TB × 30 ≈ 50 TB`

Utilice almacenamiento de objetos de nivel estándar (por ejemplo, S3 Standard, GCS Standard) para datos activos. Los niveles de menor costo, como S3 Infrequent Access o GCS Nearline, no están validados para su uso con BYOC Logs.
{{% /collapse-content %}}

## Base de datos PostgreSQL {#postgresql-database}

- **Tamaño de la instancia:** Para la mayoría de los casos de uso, una instancia de PostgreSQL con 1 vCPU y 4 GB de RAM es suficiente
- **Recomendación de AWS RDS:** Si utiliza AWS RDS, el tipo de instancia `t4g.medium` es un punto de partida adecuado
- **Alta disponibilidad:** Habilite la implementación Multi-AZ con una réplica en espera para alta disponibilidad

## Niveles de dimensionamiento del Helm chart {#helm-chart-sizing-tiers}

El Helm chart de registros BYOC proporciona niveles de recursos predefinidos a través de los parámetros `indexer.podSize` y `searcher.podSize`. `podSize` selecciona los requisitos de recursos del pod y los parámetros de ajuste de Quickwit relacionados. El `podSize` predeterminado es `xlarge` para ambos componentes. Cada ajuste preestablecido está diseñado para dejar espacio en un nodo coincidente para los componentes del sistema de Kubernetes, DaemonSets y complementos.

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

Los ajustes preestablecidos no establecen un límite de CPU, lo que permite que un pod utilice la CPU inactiva en su nodo sin ser limitado. Las solicitudes y los límites de memoria son iguales para mantener el uso de memoria dentro de la capacidad asignable del nodo.

Los valores que definen los tamaños de la cola de ingesta y los tamaños de la caché de búsqueda se aplican automáticamente para el nivel seleccionado. Consulte el [Helm chart sizing map][1] para obtener la configuración completa. Para obtener más detalles sobre cada parámetro, consulte la documentación de Quickwit para [indexer parameters][2], [ingest API parameters][3] y [searcher parameters][4].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/cloudprem/sizing-map.yaml
[2]: https://quickwit.io/docs/configuration/node-config#indexer-configuration
[3]: https://quickwit.io/docs/configuration/node-config#ingest-api-configuration
[4]: https://quickwit.io/docs/configuration/node-config#searcher-configuration