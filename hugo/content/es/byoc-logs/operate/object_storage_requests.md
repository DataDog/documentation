---
description: Estime la cantidad de solicitudes PUT de almacenamiento de objetos generadas
  por los indexadores y compactadores de BYOC Logs.
further_reading:
- link: /byoc-logs/operate/sizing/
  tag: Documentación
  text: Dimensionamiento del clúster de BYOC Logs
- link: /byoc-logs/introduction/architecture/
  tag: Documentación
  text: Obtenga más información sobre la arquitectura de BYOC Logs
title: Estimación de solicitudes de almacenamiento de objetos
---
{{< jqmath-vanilla >}}

## Descripción general {#overview}

El almacenamiento de objetos (Amazon S3, Google Cloud Storage, Azure Blob Storage) factura tanto los **datos almacenados** como las **solicitudes de API**. Esta página estima las **solicitudes PUT** generadas en la ruta de escritura por los **indexadores** y **compactadores**.

## Indexadores {#indexers}

Cada indexador ejecuta varias **canalizaciones de indexación**, una por vCPU. Cada 30 segundos (el tiempo de espera de confirmación predeterminado), cada canalización carga un archivo de índice (una *división*) al almacenamiento de objetos:

$$\\text\"divisiones por canalización por día\" = \{86400\} / 30 = 2880$$

Un indexador de 4 vCPU ejecuta 4 canalizaciones, por lo que carga **11,520 divisiones por día**.

Las divisiones almacenan datos **comprimidos** (3x o más). En volúmenes típicos, se mantienen por debajo del umbral de carga multiparte de 128 MiB y se cargan como una **única solicitud PUT**. Las divisiones más grandes utilizan carga multiparte y cuestan 3 o más solicitudes PUT.

## Compactadores {#compactors}

Los compactadores **fusionan 10 divisiones en 1**, repetidamente, a lo largo de tres *generaciones* (gen 1, 2, 3). Las divisiones fusionadas son grandes (más de 1 GB) y utilizan carga multiparte, por lo que cada una cuesta 3 o más solicitudes PUT.

El fan-in de 10:1 significa que cada generación produce 10 veces menos divisiones que la anterior. En total, la compactación añade solo alrededor de **un tercio más de solicitudes PUT** además de las divisiones del indexador.

## Estimaciones de solicitudes {#request-estimates}

Las siguientes estimaciones asumen:

- **8 MB/s por vCPU de indexador**, por lo que un indexador de 4 vCPU mantiene 32 MB/s, o ~2.8 TB/día. Consulte [Dimensionamiento del clúster][1].
- **4 canalizaciones de indexación** por indexador, con el tiempo de espera de confirmación predeterminado de 30 segundos
- Un precio de PUT de **$0.005 por cada 1,000 solicitudes** (S3 Standard, `us-east-1`)

Cada indexador carga 11.520 divisiones por día. La compactación añade aproximadamente un tercio, para un total de **~15,360 solicitudes PUT por indexador al día**:

| Volumen diario | Indexadores (4 vCPUs cada uno) | Total de solicitudes PUT por día | Costo aproximado de PUT por mes |
|-------------|-------------------------|----------------------------|----------------------------|
| **1 TB/día** | 1 | ~15,000 | ~$2 |
| **10 TB/día** | 4 | ~61,000 | ~$9 |
| **100 TB/día** | 37 | ~568,000 | ~$85 |

<div class="alert alert-tip">
Las solicitudes PUT escalan con <strong>el número de canalizaciones y la cadencia de confirmación, no con el volumen de ingesta sin procesar</strong>. Aumentar el tiempo de espera de confirmación (por ejemplo, a 60 segundos) reduce aproximadamente a la mitad el número de solicitudes, a costa de una mayor latencia de búsqueda.
</div>

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/byoc-logs/operate/sizing/#indexers