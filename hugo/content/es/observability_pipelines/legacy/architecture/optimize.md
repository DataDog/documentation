---
aliases:
- /es/observability_pipelines/architecture/optimize/
title: (LEGACY) Optimización de instancias
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Observability Pipelines no está disponible en el sitio US1-FED de Datadog.</div>
{{< /site-region >}}

<div class="alert alert-info">
Esta guía es para despliegues a nivel de producción a gran escala.
</div>

## Dimensionamiento de instancias

Instancias de cálculo optimizadas con al menos 8 vCPU y 16 GiB de memoria. Estas son unidades ideales para escalar horizontalmente el agregador de Workers de Observability Pipelines. El Worker de Observability Pipelines puede escalar verticalmente y aprovechar automáticamente los recursos adicionales, si eliges instancias más grandes. Para mejorar la disponibilidad, elige un tamaño que permita al menos dos instancias de Worker de Observability Pipelines para tu volumen de datos.

| Proveedor de la nube| Recomendación                                        |
| ------------- | ----------------------------------------------------- |
| AWS           | c6i.2xlarge (recomendado) o c6g.2xlarge              |
| Azure         | f8                                                    |
| Google Cloud  | c2 (8 vCPU, 16 GiB de memoria)                           |
| Privado       | 8 vCPU, 16 GiB de memoria, no se requiere disco local |

## Dimensionamiento de la CPU

La mayoría de las cargas de trabajo de Workers de Observability Pipelines están limitadas por la CPU y se benefician de las CPU modernas.

| Proveedor de la nube| Recomendación                                                        |
| ------------- | --------------------------------------------------------------------- |
| AWS           | Intel Xeon de última generación, 8 vCPU (recomendado), al menos 4 vCPU |
| Azure         | Intel Xeon de última generación, 8 vCPU (recomendado), al menos 4 vCPU |
| Google Cloud  | Intel Xeon de última generación, 8 vCPU (recomendado), al menos 4 vCPU |
| Privado       | Intel Xeon de última generación, 8 vCPU (recomendado), al menos 4 vCPU |

## Arquitecturas de CPU

El Worker de Observability Pipelines funciona en arquitecturas de CPU modernas. Las arquitecturas X86_64 ofrecen el mejor rendimiento para Workers de Observability Pipelines.

## Dimensionamiento de la memoria

Debido al sistema de tipos afines del Worker de Observability Pipelines, la memoria rara vez está restringida a las cargas de trabajo del Worker de Observability Pipelines. Por lo tanto, Datadog recomienda 2 o más GiB de memoria por vCPU como mínimo. El uso de memoria aumenta con el número de destinos debido al almacenamiento en memoria y a la agrupación por lotes. Si tienes muchos destinos, considera utilizar buffers de disco.

## Dimensionamiento de los discos

Si utilizas buffers de disco del Worker de Observability Pipelines para obtener una alta durabilidad (recomendado), proporciona al menos 36 GiB de espacio en disco por vCPU. Siguiendo la recomendación de 8 vCPU, proporciona 288 GiB de espacio en disco (10 MiB * 60 segundos * 60 minutos * 8 vCPU).

| Proveedor de la nube| Recomendación*                                               |
| ------------- | --------------------------------------------------------------|
| AWS           | EBS gp3, 36 GiB por vCPU, sin IOPS ni rendimiento adicionales    |
| Azure         | Ultra-disk o SSD estándar, 36 GiB por vCPU                   |
| Google Cloud  | Discos persistentes equilibrados o SSD, 36 GiB por vCPU             |
| Privado       | Equivalente de almacenamiento en bloque basado en la red, 36 GiB por vCPU       |

*Los tamaños recomendados se calculan con un rendimiento de 10 MiB/s/vCPU del Worker de Observability Pipelines durante una hora. Por ejemplo, una máquina de 8 vCPU necesitaría 288 GiB de espacio en disco (10 MiB * 60 segundos * 60 minutos * 8 vCPU).

### Tipos de disco

Elige un tipo de disco que optimice la durabilidad y la recuperación. Por ejemplo, el almacenamiento en bloque estándar es ideal porque está desacoplado de la instancia y replica los datos en varios discos para ofrecer una alta durabilidad. Los discos locales de alto rendimiento no se recomiendan, ya que su rendimiento supera las necesidades del Worker de Observability Pipelines y su durabilidad se reduce en función del almacenamiento en bloque.

Además, se pueden utilizar los sistemas de archivos de red, como EFS de Amazon, pero sólo si se aprovisiona suficiente rendimiento, ya que los modos de rendimiento en ráfagas no son suficientes. Datadog recomienda configurar al menos el doble del rendimiento máximo esperado, a fin de tener un margen para los picos de demanda. Todos los discos recomendados ofrecen un rendimiento suficiente para evitar problemas.

Para obtener más información sobre por qué se utilizan discos en esta arquitectura, consulta [Prevenir la pérdida de datos][1].

### Sistemas operativos y GCC

Si es posible, elige un sistema operativo basado en Linux con glibc (GNU) v2.14 o posterior (publicado en 2011). El Worker de Observability Pipelines funciona en otras plataformas, pero esta combinación produce el mejor rendimiento en los tests comparativos de Datadog.

[1]: /es/observability_pipelines/legacy/architecture/preventing_data_loss