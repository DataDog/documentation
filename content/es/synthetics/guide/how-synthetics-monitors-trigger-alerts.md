---
description: Conoce cómo las reglas de alerta, los reintentos y los umbrales de ubicación
  determinan cuándo un monitor de Synthetic Monitoring alerta o se recupera.
further_reading:
- link: /synthetics/notifications/
  tag: Documentación
  text: Más información sobre las notificaciones de Synthetic Monitoring
- link: /synthetics/guide/synthetic-test-retries-monitor-status/
  tag: Guía
  text: Comprender los reintentos de test y el estado de monitor
- link: /synthetics/guide/uptime-percentage-widget/
  tag: Guía
  text: Monitorizar el tiempo de actividad del sitio web con SLOs
title: Conoce las alertas de Synthetic Monitoring
---

Synthetic Monitoring evalúa los resultados del test **a lo largo del tiempo**, no las ejecuciones individuales del test.  
En la página se explica cómo Datadog determina cuándo una notificación de Synthetic Monitoring activa una alerta o se recupera, y por qué las alertas pueden comportarse de forma distinta a la esperada.

Utiliza esta página para comprender:

- [Por qué un monitor alertó más tarde de lo esperado](#example-fast-retries-causing-a-delay-in-alerting)
- [Por qué un monitor se recupera aunque los fallos sigan siendo visibles](#alert-and-recovery-behavior)
- [Por qué un fallo en un test no activó una alerta](#common-reasons-for-unexpected-alert-behavior)
- [Cómo se calcula el tiempo de actividad global](#global-uptime-and-alert-state)

## Motivos habituales de un comportamiento de alerta inesperado

Si un monitor no alerta o se recupera inesperadamente, comprueba lo siguiente:

- [Alineación de duración mínima y frecuencia del test](#test-frequency-and-minimum-duration)
- [Configuración de reintentos rápidos](#fast-retries)
- [Alcance de la localización](#location-based-evaluation)
- [Resultados de la ejecución del test](#test-runs-that-generate-alerts) dentro de la ventana de evaluación
- Si se ha puesto en pausa el test

## Cómo funciona la evaluación de alertas

Synthetic Monitoring no activa alertas basadas en una única ejecución fallida. En su lugar, evalúa continuamente los resultados de test en el siguiente orden:

1. El test se ejecuta en función de su horario de configuración.
2. Se aplican [Reintentos rápidos](#fast-retries), si están configurados.
3. Los resultados de test se agregan en todas las ubicaciones.
4. Los fallos se evalúan a lo largo del tiempo utilizando las reglas de alerta.
5. El monitor cambia entre el [estado](#monitor-status-reference) **OK**, **Alerta** o **Sin datos** según se cumplan o dejen de cumplirse las condiciones de alerta.

### Ejecuciones de tests que generan alertas
| Tipo de ejecución de test                           | Evaluado para alertas |
|-----------------------------------------|------------------------|
| Ejecuciones programadas                          | Sí                    |
| Ejecuciones desencadenadas por Continuous Integration Continuous Delivery                    | No                     |
| Ejecuciones activadas manualmente (test sin pausa) | Sí, si cambia el estado  |
| Ejecuciones activadas manualmente (test en pausa)   | No                     |

## Reintentos rápidos

Los reintentos rápidos vuelven a ejecutar automáticamente las ejecuciones fallidas de test. Un test configurado con *n* reintentos puede ejecutarse hasta *n + 1* veces por ejecución programada (incluido el intento original).

{{< img src="synthetics/guide/monitors_trigger_alerts/fast_retry_2.png" alt="Paso de condiciones de reintento de un synthetics test" style="width:80%;" >}}

Si tienes una [duración mínima](#alerting-rules) configurada como regla de alerta, el temporizador se inicia cuando falla la última ejecución de reintento rápido. Las ejecuciones de reintento rápido aparecen en los resultados de test con una etiqueta `(fast retry)` en la columna **Run Type** (Tipo de ejecución).

{{< img src="synthetics/guide/monitors_trigger_alerts/fast_retry_test_runs_2.png" alt="Pantalla de ejecuciones de test de un Synthetics test, con el tipo de ejecución Programada (reintento rápido) resaltado" style="width:100%;" >}}

## Reglas de alerta

Las reglas de alerta definen cuándo se permite que un monitor cambie de estado en función de los fallos de test a lo largo del tiempo. Cuando se activan los reintentos rápidos, el monitor espera hasta que finalizan todos los intentos de reintento antes de marcar una ejecución de test como fallida o activar las evaluaciones de alerta. Una alerta solo se activa cuando todas las condiciones de alerta se cumplen de forma continua durante el tiempo configurado.

Las reglas de alerta suelen incluir:

- **[Duración mínima](#test-frequency-and-minimum-duration) (retardo de alerta)**
  Cuánto tiempo deben persistir los fallos antes de activar una alerta.

- **[Alcance de la localización](#location-based-evaluation)**
  Por ejemplo, *cualquier 1 de N ubicaciones* o *todas las ubicaciones*. <br></br>

  {{< img src="synthetics/guide/monitors_trigger_alerts/schedule_and_alert_2.png" alt="Pantalla de ejecuciones de test de un Synthetics test, con el tipo de ejecución Programada (reintento rápido) resaltado" style="width:80%;" >}}

<div class="alert alert-info">Si alguna parte de la regla de alerta deja de ser verdadera durante la ventana de evaluación, el temporizador de duración mínima se reinicia.</div>

## Frecuencia y duración mínima del test

La frecuencia y la duración mínima del test trabajan juntas para determinar cuándo un monitor puede alertar. Estos dos ajustes se confunden a menudo porque ambos afectan al tiempo de alerta, pero tienen propósitos diferentes:

- **Frecuencia del test**: la frecuencia con la que se ejecuta el test. Esto determina la rapidez con la que se pueden detectar fallos y la frecuencia con la que se evalúan las reglas de alerta.
- **Duración mínima**: cuánto tiempo debe fallar continuamente el test antes de alertar. Esto evita que se activen alertas por problemas breves y transitorios.
  <br>**Nota**: Si tienes activados los [reintentos rápidos](#fast-retries), el temporizador de duración mínima se inicia cuando falla la ejecución del último reintento rápido de test.

Entender cómo interactúan estos ajustes ayuda a explicar por qué las alertas pueden tardar más en activarse de lo esperado, especialmente cuando la duración mínima supera la frecuencia del test.

### Ejemplo: alertas activadas inmediatamente

- Reintentos rápidos (no configurados)
- Frecuencia de test: 15 minutos
- Duración mínima: 13 minutos
- Alcance de la localización: 1 de 1

Con la configuración anterior, la alerta se activa 13 minutos después de que las ejecuciones programadas de test hayan fallado:

| Tiempo | Evento | Resultado | Estado del monitor |
|------|-------|--------|----------------|
| t0 | Ejecuciones programadas de test  | Aprobada | OK |
| t15 | Ejecuciones programadas de test | Fallo | OK (se inicia el temporizador de duración mínima)|
| t28 | N/A |Fallo | ALERTA (13 minutos transcurridos)|

**Nota**: Esta configuración no se recomienda porque carece de reintentos rápidos y alerta de un único fallo, lo que puede dar lugar a falsos positivos por problemas transitorios. En su lugar, considera acortar la frecuencia de test a 5 minutos o habilitar reintentos rápidos. Este enfoque permite ejecuciones adicionales de test durante problemas transitorios, reduciendo los falsos positivos y asegurando al mismo tiempo alertas oportunas para problemas reales y persistentes.

### Ejemplo: los reintentos rápidos provocan un retraso en la alerta

- Reintentos rápidos: 2 reintentos, con 1 minuto entre reintentos.
- Frecuencia de test: 30 minutos
- Duración mínima: 5 minutos
- Alcance de la localización: 1 de 1

Con la configuración anterior, el temporizador de duración mínima se inicia cuando falla el segundo reintento rápido:
| Tiempo | Evento | Resultado | Estado de monitor |
|------|-------|--------|----------------|
| t0 | Ejecuciones programadas de test | Aprobada | OK |
| t30 | Ejecuciones programadas de test | Fallida | OK |
| t31 | Primer reintento rápido para la ejecución de test programada en t30  | Fallida | OK |
| t32 | Segundo reintento rápido para la ejecución de test programada en t30 | Fallida | OK (Duración mínima de inicio del temporizador)|
| t37 | N/A | Fallida | ALERTA (5 minutos transcurridos) |
| t60 | Ejecuciones programadas de test | Aprobada | OK |

**Nota**: Debido a que se configuraron reintentos rápidos, la alerta se activó en t37 en lugar de t35, añadiendo un retraso de 2 minutos.

### Prácticas recomendadas

- Si necesitas una alerta inmediata, establece la duración mínima en `0` para alertar en cuanto se produzca un fallo. Este enfoque, sin embargo, no permite ejecuciones adicionales de test durante problemas transitorios, lo que conduce a falsos positivos. En su lugar, habilita los reintentos rápidos para gestionar problemas transitorios como fallos de red. Para los tests que se ejecutan con frecuencia, empareja los reintentos rápidos con una duración mínima más larga para reducir el ruido de las alertas.
- Evita [solapar reintentos rápidos con ejecuciones programadas de test][3] para ayudarte a determinar qué reintentos rápidos están asociados con sus ejecuciones programadas relacionadas de test.

## Evaluación basada en la localización

Las reglas de localización determinan **cuántas localizaciones deben fallar** para que se active una alerta.

Los patrones comunes incluyen:

- Fallo desde 1 de _N_ lugares
- Fallo desde todas las ubicaciones
- En un momento, todos los lugares estaban fallando

Un monitor puede recuperarse incluso si **algunas ubicaciones siguen fallando**, siempre y cuando las reglas de alerta configuradas dejen de cumplirse durante la ventana de evaluación.

## Comportamiento de alerta y recuperación

Una recuperación no requiere que todas las ejecuciones de test sean aprobadas, solo que las condiciones de alerta dejen de ser ciertas.

- **Las notificaciones de alerta** se envían cuando se cumplen las reglas de alerta.
- **Las notificaciones de recuperación** se envían cuando dejan de cumplirse las reglas de alerta.

## Tiempo de actividad global y estado de alerta

**El tiempo de actividad global** representa el porcentaje de tiempo que tu monitor estuvo en buen estado (estado`OK` ) durante el periodo seleccionado.

Se basa en el tiempo que el monitor ha permanecido en estado `OK` en comparación con el periodo total de monitorización. Cualquier tiempo que el monitor pase en un estado `ALERT` disminuye el tiempo de actividad global.

Dado que esta métrica se basa en la duración del estado de monitor y no en el estado de una ejecución de test, no puede calcularse de forma fiable a partir de la relación entre los resultados satisfactorios del test y el número total de ejecuciones de test durante el mismo periodo.

Según la frecuencia de test, puede haber ocasiones en las que el ratio pueda utilizarse para "aproximarse" al tiempo de actividad global. En algunas configuraciones de alerta básicas, como un test que se ejecuta cada minuto con una duración mínima de 0, el ratio podría aproximarse aproximadamente al tiempo de actividad global.

La fórmula para calcular el tiempo de actividad global es:

```
Global Uptime = ((Total Period - Time in Alert) / Total Period) × 100
```

### Ejemplo de cálculo

El siguiente ejemplo muestra cómo se calcula un tiempo de actividad global del 95,83 %.

1. Identifica el periodo de monitorización.

   El monitor tiene un alcance de `Jan 12, 10:56 AM - Jan 12, 4:56 PM`, un periodo de 360 minutos:

   {{< img src="synthetics/guide/monitors_trigger_alerts/global_uptime.png" alt="Una ejecución de synthetics test que muestra un tiempo de actividad global de 95.83 %" style="width:100%;" >}}

2. Determinar el tiempo de permanencia en estado de alerta.

   Amplía el rango de tiempo para identificar cuándo el monitor estuvo en estado de alerta:

   {{< img src="synthetics/guide/monitors_trigger_alerts/global_uptime_video.mp4" alt="Video de una ejecución de Synthetics test, con alcance de la fecha del periodo de alerta" video=true >}}

   El periodo de alerta es `Jan 12, 3:46 PM – Jan 12, 4:01 PM`, aproximadamente 15 minutos.

3. Aplica la fórmula.

   ```text {hl_lines=[3]}
   Periodo total = 360 minutos
   Tiempo en alerta = 15 minutos
   Tiempo de actividad global = ((360 - 15) / 360) × 100 = 95.83 %
   ```
<div class="alert alert-info">Silenciar un monitor de Synthetic Monitoring solo silencia las notificaciones; el test continúa ejecutándose en horario, por lo que el tiempo de actividad global no se ve afectado. Poner en pausa un test de Synthetic Monitoring detiene las ejecuciones por completo, lo que afecta al tiempo de actividad global ya que no se generan resultados durante ese tiempo.</div>

## Referencia de estado del monitor

OK
: el monitor está en buen estado. O bien todas las ejecuciones de test son correctas, o bien los fallos no han cumplido las condiciones de alerta (duración mínima y requisitos de ubicación).

ALERT
: se han cumplido las condiciones de alerta. El test ha estado fallando continuamente durante la duración mínima configurada en el número requerido de ubicaciones.

NO DATA
: el monitor no ha recibido ningún resultado de test de ninguna ubicación (gestionada, privada o Datadog Agent) durante el periodo consultado. Las causas comunes incluyen: <br></br>

  - **El test está en pausa**: los tests en pausa no se ejecutan y no producen datos.
  - **Configuración avanzada del horario**: el periodo consultado queda fuera de las ventanas de horario configuradas del test.
  - **Retraso en la ejecución del test**: el test aún no se ha ejecutado durante el periodo seleccionado. Esto suele ocurrir con ubicaciones privadas sobrecargadas, lo que puede provocar tiempos de espera intermitentes, ejecuciones perdidas, lagunas en el horario del test, o que la ubicación privada haya dejado de informar. 
      Cuando se presentan estos síntomas, se asignan demasiados test a la ubicación privada para que pueda manejarlos. Esto se puede resolver añadiendo workers, aumentando la concurrencia o añadiendo recursos informáticos. Consulta [Dimensionamiento de ubicaciones privadas][4] para obtener más información.
  - **Retraso en la ingesta de datos**: los resultados de test aún no se han procesado y no están disponibles para el periodo consultado.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[3]: /es/synthetics/guide/synthetic-test-retries-monitor-status/#retries-that-overlap-with-other-test-runs
[4]: /es/synthetics/platform/private_locations/dimensioning