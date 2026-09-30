---
description: Configure horarios de seguimiento personalizados con intervalos diarios,
  semanales o mensuales para trabajos críticos utilizando patrones RRULE para una
  programación avanzada.
disable_toc: false
further_reading:
- link: https://docs.datadoghq.com/monitors/configuration/?tab=thresholdalert#evaluation-frequency
  tag: Documentación
  text: Obtenga información sobre la frecuencia de evaluación del seguimiento
- link: /monitors/downtimes
  tag: Documentación
  text: Tiempos de inactividad
- link: /monitors/configuration/?tab=thresholdalert#evaluation-window
  tag: Documentación
  text: Ventanas de tiempo acumulativas
title: Personalice las frecuencias de evaluación del seguimiento
---
## Descripción general {#overview}

Establezca una hora de evaluación específica y controle la frecuencia de evaluación del seguimiento para realizar un seguimiento de la ejecución de trabajos críticos que se ejecutan en su entorno. Los horarios personalizados de seguimiento le permiten recibir alertas sobre sistemas y procesos que no necesitan ser objeto de seguimiento continuo, como los trabajos cron.

Los horarios personalizados de seguimiento son compatibles con seguimientos de eventos, registros y métricas con intervalos de programación diarios, semanales y mensuales.

## Configuración {#configuration}

{{< img src="/monitors/guide/custom_schedules/add_custom_schedule.png" alt="Botón para agregar un horario personalizado en la configuración del seguimiento" style="width:100%;" >}}

Haga clic en {{< ui >}}Add Custom Schedule{{< /ui >}} para configurar su frecuencia de evaluación.

<div class="alert alert-danger">Cuando un horario personalizado está habilitado en un seguimiento, no se puede deshabilitar. Los horarios personalizados solo se pueden agregar o eliminar durante la creación del seguimiento. La configuración {{< ui >}}Remove non-reporting groups{{< /ui >}} no está disponible. Para solucionar esto, cree un nuevo seguimiento sin horarios personalizados.
</div>

{{< tabs >}}
{{% tab "Día" %}}
Seleccione la hora del día en la que desea que el seguimiento realice la evaluación.

Por ejemplo, el siguiente seguimiento realiza una verificación todos los días a las 8:00 PM para asegurar que el trabajo de respaldo diario haya generado un evento de éxito para cada instancia de base de datos.

{{< img src="monitors/guide/custom_schedules/custom_day.png" alt="Configuración del seguimiento para verificar todos los días a las 8:00 PM que se haya generado un evento de éxito para cada instancia de base de datos como resultado del trabajo de respaldo diario" style="width:100%;" >}}

{{% /tab %}}

{{% tab "Semana" %}}
Seleccione los días de la semana, así como la hora del día en la que desea que el seguimiento realice la evaluación.

Por ejemplo, el siguiente seguimiento realiza una verificación cada semana los martes y sábados a las 6:00 AM para asegurar que se hayan enviado correos electrónicos de marketing para cada campaña individual.

{{< img src="monitors/guide/custom_schedules/custom_week.png" alt="Configuración del seguimiento para verificar cada semana los martes y sábados a las 6 a. m. que se hayan enviado correos electrónicos de marketing para cada campaña individual." style="width:100%;" >}}

{{% /tab %}}

{{% tab "Mes" %}}
Seleccione el día del mes, así como la hora del día en la que desea que el seguimiento realice la evaluación.

Por ejemplo, el siguiente seguimiento realiza una verificación el primer día de cada mes para asegurar que el trabajo cron que genera las facturas de los clientes se haya ejecutado correctamente.

{{< img src="monitors/guide/custom_schedules/custom_month.png" alt="Configuración del seguimiento para verificar el primer día de cada mes si el trabajo cron que genera las facturas de los clientes se ha ejecutado correctamente." style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

## RRULES {#rrules}

La regla de recurrencia (RRULE) es un nombre de propiedad del [iCalendar RFC][1], que es el estándar para definir eventos recurrentes. Utilice el [generador oficial de RRULE][2] para generar reglas recurrentes. Aproveche las RRULE para cubrir casos de uso de horarios más avanzados.

Para escribir una RRULE personalizada para su seguimiento, haga clic en {{< ui >}}Use RRULE{{< /ui >}}.

**Notas**:
- No se admiten atributos que especifiquen la duración en RRULE (por ejemplo, DTSTART, DTEND, DURATION).
- Las frecuencias de evaluación deben ser de un día o más. Para frecuencias de evaluación más cortas, utilice los horarios de seguimiento predeterminados.

#### Ejemplo: El seguimiento evalúa el último día del mes {#example-monitor-evaluates-on-the-last-day-of-the-month}

```text
FREQ=MONTHLY;BYMONTHDAY=28,29,30,31;BYSETPOS=-1
```
{{< img src="monitors/guide/custom_schedules/RRULE_last_day_month.png" alt="Sintaxis RRULE utilizada en la interfaz de usuario para evaluar el último día del mes" style="width:90%;" >}}

#### Ejemplo: El seguimiento evalúa cada dos meses el primer y último domingo del mes: {#example-monitor-evaluates-every-other-month-on-the-first-and-last-sunday-of-the-month}

```text
FREQ=MONTHLY;INTERVAL=2;BYDAY=1SU,-1SU
```

{{< img src="monitors/guide/custom_schedules/RRULE_month_last_sunday.png" alt="Sintaxis RRULE utilizada en la interfaz de usuario para evaluar cada dos meses el primer y último domingo del mes" style="width:90%;" >}}

## Comportamiento Alerting de los seguimientos con horarios personalizados {#alerting-behavior-of-monitors-with-custom-schedules}

Los seguimientos que utilizan los horarios de seguimiento predeterminados ejecutan la consulta con la frecuencia de evaluación predeterminada y envían alertas basadas en las transiciones de estado del seguimiento (por ejemplo, cuando un seguimiento pasa de WARN a OK o de OK a ALERT).

La línea de tiempo a continuación ilustra el comportamiento de un seguimiento con horarios de seguimiento predeterminados. El seguimiento envía alertas correspondientes a los cambios de estado.

{{< img src="monitors/guide/custom_schedules/alerting_behavior_regular.png" alt="Diagrama visual que muestra cuándo envía una alerta un seguimiento según las transiciones de estado del seguimiento para el horario de seguimiento predeterminado con una frecuencia de evaluación de treinta minutos." style="width:100%;" >}}

Los seguimientos con horarios personalizados, por otro lado, se evalúan de forma diaria, semanal o mensual y envían alertas según los resultados de las evaluaciones individuales. Cada evaluación es independiente de la anterior y envía una notificación cuando el resultado no es OK.

La línea de tiempo a continuación ilustra el comportamiento de un seguimiento que se ejecuta con un horario personalizado. A diferencia del seguimiento con horario de seguimiento predeterminado, el seguimiento con horario personalizado envía una alerta durante su tiempo de evaluación según el estado del seguimiento.
{{< img src="monitors/guide/custom_schedules/alerting_behavior_custom.png" alt="Diagrama visual que muestra cuándo envía una alerta un seguimiento según el estado del seguimiento para el horario personalizado con una frecuencia de evaluación diaria." style="width:100%;" >}}

## Retención de grupo {#group-retention}

De forma predeterminada, [los grupos se retienen][3] durante 24 o 48 horas después de que un grupo deja de informar, luego se eliminan del seguimiento. Los seguimientos con horarios personalizados retienen los grupos por mucho más tiempo, y su retención se ajusta según la frecuencia de evaluación que usted configure:
| Frecuencia de evaluación | Retención de grupo |
|-----------------------|------------------|
| Diaria                 | 30 días          |
| Semanal                | 90 días          |
| Mensual               | 180 días         |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://icalendar.org/rrule-tool.html
[2]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[3]: https://docs.datadoghq.com/es/monitors/configuration/?tab=thresholdalert#group-retention-time