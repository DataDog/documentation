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

Dimensione su clúster de registros BYOC (Bring Your Own Cloud) en tres pasos:

1. Estime su volumen de ingesta diario en TB/día.
2. Elija una [configuración inicial](#starter-configurations) para ese volumen.
3. Haga un seguimiento del clúster y ajuste los conteos de réplicas y los tamaños de los pods.

La capacidad del buscador depende de la concurrencia de consultas, la complejidad de las consultas y la cantidad de datos escaneados, no solo del volumen de ingesta.

Estas recomendaciones asumen CPU x86 modernas, como las utilizadas en los tipos de instancia AWS M6, o CPU equivalentes de otros proveedores de nube. Las CPU basadas en ARM, como AWS Graviton, pueden ofrecer una mejor eficiencia de costos con un rendimiento comparable.

## Configuraciones iniciales {#starter-configurations}

Utilice estos totales como punto de partida:

- **Indexadores:** 2 vCPUs por TB/día
- **Compactadores:** 1 vCPU por 2 TB/día
- **Buscadores:** aproximadamente el doble del total de vCPU de los indexadores. Las cargas de trabajo con uso intensivo de análisis pueden necesitar hasta el doble de los valores mostrados en la tabla.

Los totales de almacenamiento de objetos asumen una retención de 30 días y una relación de compresión de 6x.

|   Volumen diario |  Indexadores | Compactadores |  Buscadores | Almacenamiento de objetos |
|---------------:|----------:|-----------:|-----------:|---------------:|
|   **1 TB/día** |   2 vCPUs |   0.5 vCPUs |    4 vCPUs |          ~5 TB |
|  **10 TB/día** |  20 vCPUs |     5 vCPUs |   40 vCPUs |         ~50 TB |
| **100 TB/día** | 200 vCPUs |    50 vCPUs |  400 vCPUs |        ~500 TB |

Tamaño recomendado para cada pod:

| Volumen diario        | Indexadores        | Compactadores      | Buscadores        |
|---------------------|----------------:|----------------:|-----------------:|
| **Hasta 30 TB/día** |  4 vCPUs, 16 GB |  4 vCPUs, 16 GB |  16 vCPUs, 64 GB |
| **Más de 30 TB/día** |  8 vCPUs, 32 GB |  8 vCPUs, 32 GB | 64 vCPUs, 256 GB |

<div class="alert alert-info">
<strong>Facturación frente a aprovisionamiento:</strong> Las vCPU aprovisionadas y las vCPU facturadas son diferentes. Un clúster de producción se aprovisiona intencionalmente en exceso para absorber los picos de ingesta y búsqueda. Comuníquese con su representante de Datadog para obtener orientación sobre la facturación.
</div>

## Dimensione cada componente {#size-each-component}

Ajuste la configuración inicial componente por componente. Para conocer el rol que desempeña cada componente, consulte [Architecture][2].

### Indexadores {#indexers}

- **Rendimiento:** 2 vCPUs por TB/día
- **Memoria:** 4 GB RAM por vCPU
- **Tipo de almacenamiento:** Almacenamiento en bloque conectado a la red para el registro de escritura anticipada. Consulte [Configure persistent storage for indexers][3].

{{% collapse-content title="Dimensionamiento por recuento de eventos" level="h4" expanded=false %}}
Si conoce su recuento diario de eventos pero no su volumen en bytes, utilice esta fórmula para estimar:

$$\\text\"Volumen diario (TB)\" = {\\text\"eventos por día\" × \\text\"tamaño promedio de evento (bytes)\"} / 10^\{12\}$$

Por ejemplo, con 1 mil millones de eventos/día con un tamaño promedio de 1 KB:

`1,000,000,000 × 1,000 / 1,000,000,000,000 = 1 TB/day`

Los tamaños típicos de los eventos de registro varían desde 500 bytes (syslog corto) hasta 2-3 KB (JSON con etiquetas de Kubernetes). Mida una muestra representativa de sus registros para obtener un promedio preciso.
{{% /collapse-content %}}

### Compactadores {#compactors}

- **Rendimiento:** 1 vCPU por 2 TB/día
- **Memoria:** 4 GB RAM por vCPU
- **Tipo de almacenamiento:** SSD local. Utilice instancias con SSD locales, como AWS M8gd.

### Buscadores {#searchers}

Dimensione los buscadores según la carga de trabajo de búsqueda esperada, no solo por el volumen de ingesta. Un punto de partida es aproximadamente el doble del total de vCPUs de los indexadores.

- **Rendimiento:** Las consultas de términos (`status:error AND message:exception`) generalmente usan menos CPU que las búsquedas con comodines o de eventos completos. Las consultas de agregación necesitan más CPU y memoria.
- **Memoria:** 4 GB RAM por cada vCPU del buscador. Aprovisione más RAM si espera muchas solicitudes de agregación simultáneas.

Si la latencia de búsqueda es alta, agregue réplicas de buscador o aumente la memoria por pod. Consulte [Escalar buscadores según sus patrones de consulta][4].

### Otros servicios {#other-services}

Asigne los siguientes recursos para estos componentes ligeros:

| Servicio | vCPUs | RAM | Réplicas |
|---------|-------|-----|----------|
| **Plano de control** | 2 | 4 GB | 1 |
| **Metastore** | 2 | 4 GB | 2 |
| **Janitor** | 2 | 4 GB | 1 |

### Base de datos PostgreSQL {#postgresql-database}

- **Tamaño de la instancia:** Para la mayoría de los casos de uso, una instancia de PostgreSQL con 1 vCPU y 4 GB de RAM es suficiente.
- **Recomendación de Amazon RDS:** En Amazon RDS, comience con el tipo de instancia `t4g.medium`.
- **Alta disponibilidad:** Habilite la implementación Multi-AZ con una réplica en espera.

Habilite las copias de seguridad automáticas en la base de datos del metastore. Consulte [Habilitar copias de seguridad automáticas en su base de datos de metastore][5].

### Almacenamiento de objetos {#object-storage}

BYOC Logs comprime e indexa los datos de registro antes de almacenarlos en el almacenamiento de objetos. La compresión suele ser de 5x a 8x, lo que se traduce en unos 125-200 GB almacenados por TB ingerido al día.

$$\\text\"Datos almacenados por día\" = {\\text\"Volumen diario\"} / {\\text\"relación de compresión\"}$$

$$\\text\"Almacenamiento total\" = \\text\"Datos almacenados por día\" × \\text\"período de retención (días)\"$$

<div class="alert alert-info">
Utilice almacenamiento de objetos de nivel estándar (por ejemplo, S3 Standard o GCS Standard) para datos activos. Los niveles de menor costo, como S3 Infrequent Access o GCS Nearline, no están validados para su uso con BYOC Logs.
</div>

Para estimar el volumen y el costo de las solicitudes PUT, consulte [Estimación de solicitudes de almacenamiento de objetos][6].

## Niveles de dimensionamiento del gráfico de Helm {#helm-chart-sizing-tiers}

Establezca `indexer.podSize` y `searcher.podSize` para que coincidan con la CPU y la memoria por pod en la [configuración inicial](#starter-configurations). El valor predeterminado es `xlarge`. Cada ajuste preestablecido también aplica tamaños de cola de ingesta y caché de búsqueda.

| `podSize` | CPU | Memoria |
|---|---:|---:|
| `large` | 2 | 8Gi |
| `xlarge` | 4 | 16Gi |
| `2xlarge` | 8 | 32Gi |
| `4xlarge` | 16 | 64Gi |
| `6xlarge` | 24 | 96Gi |
| `8xlarge` | 32 | 128Gi |

{{% collapse-content title="Solicitudes reales en Kubernetes" level="h3" expanded=false %}}
Cada `podSize` solicita menos de su CPU y memoria nominales, para dejar espacio para kube-system, DaemonSets y complementos. Los montos de reserva siguen el [cálculo de reserva de nodos de GKE](https://docs.cloud.google.com/kubernetes-engine/docs/concepts/plan-node-sizes#resource_reservations), más 250m de CPU y 512Mi de memoria por nodo para DaemonSets y complementos.

| `podSize` | Solicitud de CPU real | Solicitud/límite de memoria real |
|---|---:|---:|
| `large` | 1600m | 5700Mi |
| `xlarge` | 3600m | 13100Mi |
| `2xlarge` | 7600m | 28500Mi |
| `4xlarge` | 15600m | 59300Mi |
| `6xlarge` | 23600m | 90100Mi |
| `8xlarge` | 31600m | 120900Mi |

```text
Actual CPU request = (nominal pod CPU - Kubernetes system CPU reservation - 250m), rounded down to the nearest 100m
Actual memory request/limit = (nominal pod memory - Kubernetes system memory reservation - 512Mi), rounded down to the nearest 100Mi
```
{{% /collapse-content %}}

Consulte el mapa de dimensionamiento del gráfico de Helm [1] para ver la configuración completa.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/cloudprem/sizing-map.yaml
[2]: /es/byoc-logs/introduction/architecture/
[3]: /es/byoc-logs/operate/best_practices/#configure-persistent-storage-for-indexers
[4]: /es/byoc-logs/operate/best_practices/#scale-searchers-based-on-your-query-patterns
[5]: /es/byoc-logs/operate/best_practices/#enable-automated-backups-on-your-metastore-database
[6]: /es/byoc-logs/operate/object_storage_requests/