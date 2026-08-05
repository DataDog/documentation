---
description: Mantenga solo los datos de RUM que necesita mientras mantiene plena visibilidad
  de las métricas de rendimiento de sus aplicaciones.
further_reading:
- link: /real_user_monitoring/rum_without_limits/retention_filters
  tag: Documentación
  text: Retener datos con filtros de retención
- link: /real_user_monitoring/guide/retention_filter_best_practices/
  tag: Guía
  text: Mejores prácticas de filtros de retención
- link: /real_user_monitoring/rum_without_limits/metrics
  tag: Documentación
  text: Analice el rendimiento con métricas.
- link: /real_user_monitoring/rum_without_limits/retention_quotas
  tag: Documentación
  text: Controle los costos con cuotas de retención.
- link: https://www.datadoghq.com/blog/rum-without-limits/
  tag: Blog
  text: 'Presente RUM without Limits™: Capture todo, conserve lo que importa.'
- link: https://learn.datadoghq.com/courses/rum-retention-filters
  tag: Centro de aprendizaje
  text: 'Laboratorio interactivo: Filtros de retención de RUM'
title: RUM without Limits
---
<div class="alert alert-info">RUM without Limits se habilita automáticamente para clientes con planes de RUM no comprometidos. Contacte a su equipo de cuentas o <a href="/help/">soporte de Datadog</a> para habilitar esta función.</div>

{{< img src="real_user_monitoring/rum_without_limits/rum-without-limits-overview.png" alt="Detalles de métricas de uso estimadas en el panel lateral" style="width:90%" >}}

## Resumen {#overview}

RUM without Limits le proporciona flexibilidad sobre los volúmenes de sus sesiones de RUM al desacoplar la ingestión de datos de sesión de la indexación. Esto le permite:

- Establezca dinámicamente filtros de retención desde la interfaz de usuario de Datadog sin decisiones de muestreo anticipadas o cambios de código
- Retenga sesiones con errores o problemas de rendimiento y descarte las menos significativas, como aquellas con pocas interacciones de usuario.

Incluso si retiene solo una fracción de sus sesiones, Datadog proporciona [métricas de rendimiento][1] para todas las sesiones ingeridas. Esto asegura una visión precisa y a largo plazo de la salud y el rendimiento de la aplicación, incluso si solo se retiene una fracción de los datos de sesión.

**Nota**: En modo RUM sin límites, solo puedes usar filtros predeterminados en la [página de resumen de monitoreo de rendimiento][7]. Esto le permite ver todo el conjunto de datos y evita métricas de rendimiento sesgadas, ya que los datos son muestreados y hay menos etiquetas disponibles que en los atributos de evento.

Esta página identifica los componentes clave de RUM without Limits que pueden ayudarle a gestionar los volúmenes de sus sesiones de RUM dentro de su presupuesto de observabilidad.

### Para nuevas aplicaciones {#for-new-applications}

Para comenzar con RUM without Limits para nuevas aplicaciones, en el paso de [instrumentación][2]:

1. Asegúrese de que el `sessionSampleRate` esté configurado al 100%. Datadog recomienda configurarlo a esta tasa para una visibilidad óptima y precisión en las métricas.

2. Elija un `sessionReplaySampleRate` que satisfaga sus necesidades de observabilidad.

3. Para aplicaciones con la [integración APM habilitada][3], configure el porcentaje de sesiones para las cuales desea asegurarse de que las trazas de backend de APM sean ingeridas con `traceSampleRate` (navegador), `traceSampler` (Android) o `sampleRate` (iOS).

4. Habilite `traceContextInjection: sampled` para permitir que los SDK de backend tomen sus propias decisiones de muestreo para las sesiones en las que el SDK de RUM decida no mantener la traza.

   <div class="alert alert-danger">Los pasos 1, 3 y 4 pueden afectar la ingestión de sus trazas APM. Para asegurar que los volúmenes de span ingeridos permanezcan estables, configure el <code>traceSampleRate</code> al previamente configurado <code>sessionSampleRate</code>. Por ejemplo, si solía tener <code>sessionSampleRate</code> configurado al 10% y lo aumenta al 100% para RUM without Limits, disminuya el <code>traceSampleRate</code> del 100% al 10% en consecuencia para ingerir la misma cantidad de trazas.</div>

5. Despliegue su aplicación para aplicar la configuración.

### Para aplicaciones existentes {#for-existing-applications}
Los usuarios existentes de RUM deben volver a desplegar las aplicaciones para utilizar RUM without Limits. Asegúrese de que la tasa de muestreo de su sesión sea del 100% para todas las aplicaciones.

#### Paso 1: Ajuste las tasas de muestreo {#step-1-adjust-sampling-rates}
Si ya está recopilando repeticiones, aumentar la tasa de muestreo de la sesión requiere reducir la tasa de muestreo de repeticiones para recopilar el mismo número de repeticiones (ver ejemplo a continuación). La tasa de muestreo de repeticiones se basa en la tasa de muestreo de sesión existente.

Antes:

```java
   sessionSampleRate: 20,
   sessionReplaySampleRate: 10,
```

Después:

```java
   sessionSampleRate: 100,
   sessionReplaySampleRate: 2,
```

1. Navegue a [**Experiencias Digitales > Monitoreo de Usuarios Reales > Administrar Aplicaciones**][4].
1. Haga clic en la aplicación que desea migrar.
1. Haga clic en la pestaña **Configuración del SDK**.
1. Asegúrese de que `sessionSampleRate` esté configurado al 100%.
1. Establezca `sessionReplaySampleRate` a una tasa que resulte en el mismo número de repeticiones antes de aumentar la tasa de muestreo de sesión.
1. Utilice el fragmento de código generado para actualizar su código fuente y volver a implementar sus aplicaciones para asegurarse de que se aplique la nueva configuración.

#### Paso 2: Ajuste el rastreo {#step-2-adjust-tracing}

Si ha aumentado `sessionSampleRate`, podría aumentar el número de spans de APM ingeridos, ya que el SDK de RUM tiene la capacidad de anular las decisiones de muestreo de los rastros de backend para hacer la correlación.

Para aliviar esto, establezca `traceSampleRate` a un porcentaje por debajo del 100% (al `sessionSampleRate` previamente establecido) y establezca `traceContextInjection: sampled` para permitir que los SDK de backend tomen sus propias decisiones de muestreo para sesiones en las que el SDK de RUM decida no mantener la traza.

#### Paso 3: Cree filtros de retención {#step-3-create-retention-filters}

En aplicaciones móviles, muchas versiones concurrentes pueden coexistir. Sin embargo, las versiones existentes no envían necesariamente el 100% de las sesiones, lo que significa que crear nuevos filtros de retención reduce los datos disponibles en Datadog para estas versiones de la aplicación.

Datadog recomienda crear los mismos filtros de retención para todas las versiones de la aplicación, independientemente de si la tasa de muestreo del SDK está configurada al 100% o no. En última instancia, todas las sesiones valiosas se recopilan incluso si algunas sesiones no se ingieren para algunas versiones anteriores.

Vea los filtros de retención sugeridos y los casos de uso en [Retention Filter Best Practices][5].

## Próximos pasos {#next-steps}

Cree y configure [filtros de retención][6].

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/rum_without_limits/metrics
[2]: /es/real_user_monitoring/application_monitoring/browser/setup/
[3]: /es/real_user_monitoring/platform/connect_rum_and_traces/
[4]: https://app.datadoghq.com/rum/list
[5]: /es/real_user_monitoring/guide/retention_filter_best_practices/
[6]: /es/real_user_monitoring/rum_without_limits/retention_filters
[7]: https://app.datadoghq.com/rum/performance-monitoring