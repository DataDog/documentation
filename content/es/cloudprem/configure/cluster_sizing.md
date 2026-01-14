---
description: Más información sobre el dimensionamiento de clústeres para CloudPrem
further_reading:
- link: /cloudprem/configure/ingress/
  tag: Documentación
  text: Configurar el ingreso a CloudPrem
- link: /cloudprem/configure/processing/
  tag: Documentación
  text: Configurar el procesamiento de logs de CloudPrem
- link: /cloudprem/architecture/
  tag: Documentación
  text: Más información sobre la arquitectura de CloudPrem
title: Dimensionamiento de clústeres
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem is in Preview" >}}
  Únete a la vista previa de CloudPrem para acceder a las nuevas funciones de gestión autoalojadas de logs.
{{< /callout >}}

## Información general

Un dimensionamiento adecuado del clúster garantiza un rendimiento, una rentabilidad y una fiabilidad óptimos de tu despliegue de CloudPrem. Los requisitos de dimensionamiento dependen de varios factores, como el volumen de ingestión de logs, los patrones de consulta y la complejidad de los datos de tus logs.

Esta guía proporciona recomendaciones básicas para dimensionar los componentes de tu clúster CloudPrem: indexadores, buscadores, servicios de soporte y la base de datos PostgreSQL.

<div class="alert alert-tip">
Utiliza el volumen diario previsto de logs y las frecuencias de ingestión máximas como puntos de partida, y a continuación monitoriza el rendimiento de tu clúster y ajusta el dimensionamiento según sea necesario.
</div>

## Indexadores

Los indexadores reciben logs de los Datadog Agents, luego los procesan, indexan y almacenan como archivos de índice (llamados _splits_) en el almacenamiento de objetos. Un dimensionamiento adecuado es fundamental para mantener el rendimiento de la ingesta y garantizar que el clúster pueda gestionar el volumen de logs.

| Especificación | Recomendación | Notas |
|---------------|----------------|-------|
| **Performance** (Rendimiento) | 5 MB/s por vCPU | Rendimiento de referencia para determinar el dimensionamiento inicial. El rendimiento real depende de las características del log (tamaño, número de atributos, nivel de anidamiento). |
| **Memoria** | 4 GB de RAM por vCPU | |
| **Tamaño mínimo de pod** | 2 vCPU, 8 GB RAM | Mínimo recomendado para pods de indexador |
| **Capacidad de almacenamiento** | Al menos 200 GB | Necesario para los datos temporales durante la creación y fusión de ficheros de índice |
| **Tipo de almacenamiento** | SSD locales (preferido) | También se pueden utilizar discos duros locales o almacenamiento en bloque conectado a la red (Amazon EBS, Azure Managed Disks). |
| **E/S de disco** | ~20 MB/s por vCPU | Equivalente a 320 IOPS por vCPU para Amazon EBS (suponiendo 64 KB IOPS) |


{{% collapse-content title="Ejemplo: Dimensionamiento de 1 TB de logs por día" level="h4" expanded=false %}}
Para indexar 1 TB de logs por día (~11.6 MB/s), sigue los siguientes pasos:

1. **Calcular vCPU:** `11.6 MB/s ÷ 5 MB/s per vCPU ≈ 2.3 vCPUs`
2. **Calcular RAM:** `2.3 vCPUs × 4 GB RAM ≈ 9 GB RAM`
3. **Agregar headroom:** Comienza con un pod de indexador configurado con **3 vCPU, 12 GB de RAM y un disco de 200 GB**. Ajusta estos valores en función del rendimiento observado y las necesidades de redundancia.
{{% /collapse-content %}}

## Buscadores

Los buscadores gestionan las consultas de búsqueda desde la interfaz de usuario Datadog, leen metadatos del metastore y obtienen datos del almacenamiento de objetos.

Un punto de partida general es aprovisionar aproximadamente el doble del número total de vCPU asignadas a los Indexadores.

- **Rendimiento:** El rendimiento de las búsquedas depende en gran medida de la carga de trabajo (complejidad de la consulta, simultaneidad, cantidad de datos analizados). Por ejemplo, las consultas de términos (`status:error AND message:exception`) suelen ser menos costosas computacionalmente que las agregaciones.
- **Memoria:** 4 GB de RAM por vCPU de buscador. Proporciona más RAM, si esperas varias solicitudes de agregación simultáneas.

## Otros servicios

Asigna los siguientes recursos a estos componentes ligeros:

| Servicio | vCPU | RAM | Réplicas |
|---------|-------|-----|----------|
| **Plano de control** | 2 | 4 GB | 1 |
| **Metastore** | 2 | 4 GB | 2 |
| **Janitor** | 2 | 4 GB | 1 |

## Base de datos PostgreSQL

- **Tamaño de la instancia:** En la mayoría de los casos de uso, una instancia PostgreSQL con 1 vCPU y 4 GB de RAM es suficiente.
- **Recomendación de AWS RDS:** Si utilizas AWS RDS, el tipo de instancia `t4g.medium` es un punto de partida adecuado.
- **Alta disponibilidad:** Habilita el despliegue Multi-AZ con una réplica en espera para una alta disponibilidad.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}