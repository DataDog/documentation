---
disable_toc: false
further_reading:
- link: https://docs.datadoghq.com/monitors/configuration/?tab=thresholdalert#evaluation-frequency
  tag: Documentación
  text: Más información sobre la frecuencia de evaluación del monitor
- link: /monitors/downtimes
  tag: Documentación
  text: Tiempos de inactividad
- link: /monitors/configuration/?tab=thresholdalert#evaluation-window
  tag: Documentación
  text: Intervalos continuos
kind: Guía
title: Personalizar las frecuencias de evaluación del monitor
---

## Información general

Establece una hora de evaluación específica y controla la frecuencia de evaluación de los monitores para realizar un seguimiento de la ejecución de trabajos críticos que se ejecutan en tu entorno. Las programaciones personalizadas de monitor te permiten alertar sobre sistemas y procesos que no necesitan estar continuamente monitorizados, como los trabajos cron.

Las programaciones personalizadas de monitor son compatibles con eventos, logs y monitores de métricas con intervalos de programación diarios, semanales y mensuales.

## Configuración

{{< img src="/monitors/guide/custom_schedules/add_custom_schedule.png" alt="Botón para añadir una programación personalizada en la configuración del monitor" style="width:100%;" >}}

Haz clic en **Add Custom Schedule** (Añadir programación personalizada) para configurar tu frecuencia de evaluación.

<div class="alert alert-warning">Una vez que se ha activado una programación personalizada en un monitor, la programación no se puede desactivar. Las programaciones personalizadas solo pueden añadirse o eliminarse durante la creación del monitor.
</div>

{{< tabs >}}
{{% tab "Day" %}}
Selecciona la hora del día en la que deseas que el monitor evalúe.

Por ejemplo, el siguiente monitor comprueba todos los días a las 8:00PM que el trabajo de copia de seguridad diario generó un evento con éxito para cada instancia de base de datos.

{{< img src="monitors/guide/custom_schedules/custom_day.png" alt="Configuración del monitor para comprobar todos los días a las 8PM que se ha generado un evento con éxito para cada instancia de base de datos como resultado del trabajo de copia de seguridad diario" style="width:100%;" >}}

{{% /tab %}}

{{% tab "Week" %}}
Selecciona los días de la semana así como la hora del día a la que deseas que el monitor evalúe.

Por ejemplo, el siguiente monitor comprueba cada semana el martes y el sábado a las 6:00AM que los correos electrónicos de marketing han sido enviados para cada campaña individual.

{{< img src="monitors/guide/custom_schedules/custom_week.png" alt="Configuración del monitor para comprobar cada semana el martes y el sábado a las 6:00AM que los correos electrónicos de marketing han sido enviados para cada campaña individual" style="width:100%;" >}}

{{% /tab %}}

{{% tab "Month" %}}
Selecciona el día del mes así como la hora del día en la que deseas que el monitor evalúe.

Por ejemplo, el siguiente monitor comprueba el primer día de cada mes si el cron job que genera las facturas de los clientes se ha ejecutado correctamente.

{{< img src="monitors/guide/custom_schedules/custom_month.png" alt="Configuración del monitor para comprobar el primer día de cada mes si el cron job que genera las facturas de los clientes se ha ejecutado correctamente." style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

## RRULES

Regla de recurrencia (RRULE) es un nombre de propiedad del [iCalendar RFC][1], que es el estándar para definir eventos recurrentes. Utiliza el [generador oficial de RRULE][2] para generar reglas recurrentes. Aprovecha las RRULEs para abordar casos de uso de programación más avanzados.

Para escribir una RRULE personalizada para tu monitor, haz clic en **Use RRULE** (Usar RRULE).

**Notas**: 
- No se admiten atributos que especifiquen la duración en RRULE (por ejemplo, DTSTART, DTEND, DURATION).
- Las frecuencias de evaluación deben ser de un día o más. Para frecuencias de evaluación más cortas, utiliza las programaciones predeterminadas del monitor.

#### Ejemplo: el monitor evalúa el último día del mes
```text
FREQ=MONTHLY;BYMONTHDAY=28,29,30,31;BYSETPOS=-1
```
{{< img src="monitors/guide/custom_schedules/RRULE_last_day_month.png" alt="Sintaxis RRULE utilizada en la interfaz de usuario para evaluar el último día del mes" style="width:90%;" >}}

#### Ejemplo: el monitor evalúa cada dos meses el primer y el último domingo del mes:

```text
FREQ=MONTHLY;INTERVAL=2;BYDAY=1SU,-1SU
```

{{< img src="monitors/guide/custom_schedules/RRULE_month_last_sunday.png" alt="Sintaxis RRULE utilizada en la interfaz de usuario para evaluar cada dos meses el primer y último domingo del mes" style="width:90%;" >}}

## Alertar el comportamiento de monitores con programación personalizada

Los monitores que utilizan la programación por defecto ejecutan la consulta con la frecuencia de evaluación por defecto y envían alertas en función de las transiciones de estado del monitor (por ejemplo, cuando un monitor pasa de WARN a OK o de OK a ALERT).

La línea de tiempo siguiente ilustra el comportamiento de un monitor con programación por defecto. El monitor envía alertas correspondientes a los cambios de estado.

{{< img src="monitors/guide/custom_schedules/alerting_behavior_regular.png" alt="Diagrama visual que muestra cuando un monitor envía una alerta basada en transiciones de estado del monitor para la programación por defecto con una frecuencia de evaluación de treinta minutos" style="width:100%;" >}}

Los monitores con programaciones personalizadas, por otra parte, evalúan diaria, semanal o mensualmente y envían alertas basadas en los resultados de las evaluaciones individuales. Cada evaluación es independiente de la anterior y envía una notificación cuando el resultado no es correcto.

La línea de tiempo que se muestra a continuación ilustra el comportamiento de un monitor que se ejecuta con una programación personalizada. A diferencia de la programación por defecto del monitor, la programación personalizada del monitor envía una alerta durante su tiempo de evaluación en función del estado del monitor.
{{< img src="monitors/guide/custom_schedules/alerting_behavior_custom.png" alt="Diagrama visual que muestra cuando un monitor envía una alerta en función del estado del monitor para la programación personalizada con una frecuencia de evaluación diaria" style="width:100%;" >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://icalendar.org/rrule-tool.html
[2]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html