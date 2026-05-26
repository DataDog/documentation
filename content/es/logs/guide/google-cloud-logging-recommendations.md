---
further_reading:
- link: /logs/explorer/
  tag: Documentación
  text: Aprender a explorar tus logs
title: Recomendaciones para la configuración del reenvío de logs de Google Cloud
---

{{< jqmath-vanilla >}}

## Información general

En esta guía se recomiendan parámetros de configuración para el reenvío de logs a través de la integración con Google Cloud.

## Recomendaciones de configuración

### Tipo de máquina

Configura `--worker-machine-type` como `n2-standard-4` para obtener la mejor relación rendimiento-coste. Este tipo de worker admite alrededor de 12.000 EPS.

### Recuento de máquinas

El autoescalado de Dataflow ajusta el número de workers en función de la carga. Puedes configurar `--max-workers` para limitar el número de workers necesarios para los picos de EPS, lo que puede ayudar a evitar el exceso de aprovisionamiento.

El almacenamiento de máquinas de workers se aprovisiona estáticamente:

Un pipeline de autoescalado aprovisiona un disco persistente para cada worker de transmisión potencial. El tamaño de disco por defecto es de 400 GB. `--max-workers` define el máximo y los discos se instalan en los workers que se están ejecutando, incluso al inicio.

Cada worker puede adjuntar hasta 15 discos persistentes, por lo que el mínimo de workers iniciales es ⌈--max-workers/15⌉. Por ejemplo, con `--max-workers=25`:

- El almacenamiento se fija en 25 discos persistentes (10 TB en total).
- Calcula escalas desde un mínimo de 2 workers (⌈25/15⌉) hasta 20.
Los grandes discos no utilizados pueden añadir costes si solo unos pocos workers trabajan la mayor parte del tiempo.

Para dimensionar tus workers, sigue estos pasos:

1. Calcula el promedio de eventos por segundo (EPS) con la siguiente fórmula:

$$(\text"Average EPS" ≃ {\text"Daily log volume (Terabytes)"} / {\text"Average message size (Kilobytes)"} × 10^9 / {24 × 3600})$$

Ejemplo: 1 TB al día y mensajes de 1 KB da alrededor de 11,500 EPS.

2. Calcula el pico sostenido de EPS con la siguiente fórmula, en la que el multiplicador N representa la naturaleza impredecible del volumen de generación de logs:

$$(\text"Peak EPS" = N × \text"Average EPS")$$

Ejemplo: Con N=2 y 11,500 de EPS medio, el pico de EPS es de alrededor de 23.000.

3. Calcula el número máximo necesario de vCPU con la siguiente fórmula:

$$(\text"Max vCPU" = ⌈{\text"Peak EPS"} / 3000⌉)$$

Ejemplo: 23.000 EPS pico ⇒ ⌈23/3⌉ = 8 núcleos vCPU.

**Nota**: Una sola vCPU en el pipeline de Datadog Dataflow procesa típicamente alrededor de 3000 EPS (asumiendo que no hay límites de baja tasa). Un worker de `n2-standard-4` (4 vCPU) maneja hasta unos 12.000 EPS.

4. Calcule el número máximo de workers de Dataflow con la siguiente fórmula:

$$(\text"Max workers" = ⌈{\text"Max vCPU"} / 4⌉)$$

Ejemplo: 8 vCPU y 4 vCPU por worker ⇒ 2 workers.

En este ejemplo, `--max-workers` se configura en `2`. Utiliza tus propios valores para el dimensionamiento de la producción.

### Paralelismo

Configura el parámetro `parallelism` al doble del total de vCPU a través del número máximo de workers en la plantilla Pub/Sub a Datadog Dataflow.

Esto maximiza las conexiones paralelas al endpoint de logs de Datadog y aumenta el EPS.

El valor por defecto `1` desactiva el paralelismo y limita el rendimiento. Anúlalo para obtener de dos a cuatro conexiones por vCPU con el máximo de workers. Como orientación, multiplica el número máximo de workers por vCPU por worker y, a continuación, duplica el resultado.

Para determinar el número total de conexiones paralelas a Datadog a través de todos los workers de Dataflow, utiliza la siguiente fórmula:

$$(\text"Parallelism" = {\text"Max vCPU"} × 2)$$

Ejemplo: 4 vCPU ⇒ 4 × 2 = 8.

Para este ejemplo, deberías configurar el parámetro de paralelismo en un valor de `8` basándote en el cálculo del ejemplo anterior. Sin embargo, recuerda utilizar tus propios valores y cálculos exclusivos cuando despliegues esta arquitectura de referencia en tu entorno.

### Recuento de lotes

Configura el parámetro `batchCount` en 10-50 eventos por solicitud para enviar lotes en lugar de eventos individuales a Datadog.

La agrupación por lotes aumenta los EPS y reduce la carga en el endpoint de logs de Datadog. Si tu caso de uso puede tolerar un retraso máximo de almacenamiento en buffer de dos segundos, utiliza 10-50 eventos por solicitud.

$$(\text"batchCount" ≥ 10)$$

En este ejemplo con mensajes de 1 KB, agrupa al menos 10 eventos por solicitud. Ajusta este valor en función de tu entorno.

Para ver más detalles sobre rendimiento y optimización de costes, consulta [Planificar tu pipeline de Datadog][1].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.cloud.google.com/dataflow/docs/guides/plan-pipelines