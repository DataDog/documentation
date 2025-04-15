---
description: Conoce las sobrecargas debidas a la integración del Datadog Agent con
  tu base de datos
title: Sobrecargas por la integración del Agent con DBM
---

## Información general

Database Monitoring se ejecuta sobre el Datadog Agent de base. Por defecto, está configurada con unos parámetros de rendimiento óptimos para minimizar el impacto en tu sistema. Sin embargo, tienes la posibilidad de ajustar parámetros como la frecuencia de recopilación de datos y el muestreo de consultas para adaptarlos mejor a tus cargas de trabajo.

Esta página contiene resultados de los tests de sobrecarga de la integración con respecto a bases de datos con Database Monitoring de Datadog activada.

## Resultados de las tests de sobrecarga

{{< tabs >}}
{{% tab "Postgres" %}}
Los tests de sobrecarga de la integración Postgres se ejecutaron en una instancia de máquina de Amazon EC2 `c5.xlarge` (4 vCPU, 8 GB RAM). La base de datos utilizada para los tests fue una instancia de PostgreSQL v14.10 ejecutada en una instancia de Amazon RDS `db.m5.large` (2 vCPU, 8 GB RAM). La base de datos ejecutaba una carga de trabajo TPC-C con 20 almacenes.

| Parámetro                           | Intervalo de recopilación |
| --------------------------------- | ------------------- |
| Comprobar el intervalo mínimo de recopilación     | 15s                 |
| Intervalo de recopilación de métricas de consultas | 10s                 |
| Intervalo de recopilación de muestras de consultas | 10s                 |
| Intervalo de recopilación de parámetros      | 600s                |
| Intervalo de recopilación de esquemas        | 600s                |

* Versión de test del Agent: `7.50.2`
* CPU: ~1% de la CPU utilizada en promedio
* Memoria: ~300 MiB de RAM utilizada (memoria RSS)
* Ancho de banda de red: ~30 KB/s ▼ | 30 KB/s ▲
* Sobrecarga de consultas del Agent en la base de datos: ~1% del tiempo de CPU

**Nota**: El ancho de banda de red es la suma del tráfico entrante y saliente del Agent a la base de datos monitorizada y al backend Datadog.
{{% /tab %}}

{{% tab "MySQL" %}}
Los tests de sobrecarga de la integración MySQL se ejecutaron en una instancia de máquina de Amazon EC2 `c5.xlarge` (4 vCPU, 8 GB RAM). La base de datos utilizada para los tests fue una instancia de MySQL v8.0 ejecutada en una instancia de Amazon RDS `db.m5.large` (2 vCPU, 8 GB RAM). La base de datos ejecutaba una carga de trabajo TPC-C con 20 almacenes.

| Parámetro                              | Intervalo de recopilación |
| ------------------------------------ | ------------------- |
| Comprobar el intervalo mínimo de recopilación        | 15s                 |
| Intervalo de recopilación de métricas de consultas    | 10s                 |
| Intervalo de recopilación de actividades de consultas | 10s                 |
| Intervalo de recopilación de muestras de consultas    | 1s                  |
| Intervalo de recopilación de parámetros         | 600s                |

* Versión de test del Agent: `7.50.2`
* CPU: ~2% de la CPU utilizada en promedio
* Memoria: ~300 MiB de RAM utilizada (memoria RSS)
* Ancho de banda de red: ~40 KB/s ▼ | 30 KB/s ▲
* Sobrecarga de consultas del Agent en la base de datos: ~1% del tiempo de CPU

**Nota**: El ancho de banda de red es la suma del tráfico entrante y saliente del Agent a la base de datos monitorizada y al backend Datadog.
{{% /tab %}}

{{% tab "SQL Server" %}}
Los tests de sobrecarga de la integración SQL Server se ejecutaron en una instancia de máquina de Amazon EC2 `c5.xlarge` (4 vCPU, 8 GB RAM). La base de datos utilizada para los tests fue una instancia de SQL Server 2019 Standard Edition ejecutada en una instancia de Amazon RDS `db.m5.large` (2 vCPU, 8 GB RAM). La base de datos ejecutaba una carga de trabajo TPC-C con 20 almacenes.

| Parámetro                              | Intervalo de recopilación |
| ------------------------------------ | ------------------- |
| Comprobar el intervalo mínimo de recopilación        | 15s                 |
| Intervalo de recopilación de métricas de consultas    | 60s                 |
| Intervalo de recopilación de actividades de consultas | 10s                 |
| Intervalo de recopilación de parámetros         | 600s                |

* Versión de test del Agent: `7.50.2`
* CPU: ~1% de la CPU utilizada en promedio
* Memoria: ~300 MiB de RAM utilizada (memoria RSS)
* Ancho de banda de red: ~40 KB/s ▼ | 30 KB/s ▲
* Sobrecarga de consultas del Agent en la base de datos: ~1% del tiempo de CPU

**Nota**: El ancho de banda de red es la suma del tráfico entrante y saliente del Agent a la base de datos monitorizada y al backend Datadog.
{{% /tab %}}

{{% tab "Oracle" %}}
Los tests de sobrecarga de la integración Oracle se ejecutaron en una instancia de máquina de Amazon EC2 `c5.xlarge` (4 vCPU, 8 GB RAM). La base de datos utilizada para los tests fue una instancia de Oracle 19c ejecutada en una instancia de Amazon RDS `db.m5.large` (2 vCPU, 8 GB RAM). La base de datos ejecutaba una carga de trabajo TPC-C con 20 almacenes.

| Parámetro                              | Intervalo de recopilación |
| ------------------------------------ | ------------------- |
| Comprobar el intervalo mínimo de recopilación        | 10s                 |
| Intervalo de recopilación de métricas de consultas    | 60s                 |
| Intervalo de recopilación de actividades de consultas | 10s                 |

* Versión de test del Agent: `7.53.0`
* CPU: ~0.2% de la CPU utilizada en promedio
* Memoria: ~270 MiB de RAM utilizada (memoria RSS)
* Ancho de banda de red: ~6 KB/s ▼ | 4 KB/s ▲
* Sobrecarga de consultas del Agent en la base de datos: ~0.2% del tiempo de CPU

**Nota**: El ancho de banda de red es la suma del tráfico entrante y saliente del Agent a la base de datos monitorizada y al backend Datadog.
{{% /tab %}}
{{< /tabs >}}