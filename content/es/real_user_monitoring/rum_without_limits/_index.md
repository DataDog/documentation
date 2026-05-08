---
description: Conserva solo los datos RUM que necesites, manteniendo una visibilidad
  total de las métricas de rendimiento para tus aplicaciones.
further_reading:
- link: /real_user_monitoring/rum_without_limits/retention_filters
  tag: Documentación
  text: Conservar datos con filtros de retención
- link: /real_user_monitoring/guide/retention_filter_best_practices/
  tag: Guía
  text: Mejores prácticas para los filtros de retención
- link: /real_user_monitoring/rum_without_limits/metrics
  tag: Documentación
  text: Analizar el rendimiento con métricas
- link: https://www.datadoghq.com/blog/rum-without-limits/
  tag: Blog
  text: 'Presentamos RUM without LimitsTM: captura todo, conserva lo que importa'
title: RUM without Limits
---

<div class="alert alert-info">RUM without Limits se activa automáticamente para los clientes con planes de RUM no comprometidos. Ponte en contacto con tu equipo de cuentas o con <a href="/help/">el servicio de asistencia de Datadog</a> para activar esta función.</div>

{{< img src="real_user_monitoring/rum_without_limits/rum-without-limits-overview.png" alt="Página de panel lateral de las métricas de uso estimado" style="width:90%" >}}

## Información general

RUM without Limits te proporciona flexibilidad sobre tus volúmenes de sesiones RUM al desacoplar la ingesta de datos de sesión de la indexación. Esto te permite:

- Establecer filtros de retención dinámicamente desde la interfaz de usuario de Datadog sin tener que tomar decisiones de muestreo previas ni cambiar el código.
- Conservar las sesiones con errores o problemas de rendimiento y descartar las menos significativas, como las que tienen pocas interacciones con el usuario.

Aunque solo se conserve una fracción de las sesiones, Datadog proporciona [métricas de rendimiento][1] para todas las sesiones ingestadas. Esto garantiza una visión general precisa y a largo plazo del estado y el rendimiento de la aplicación, incluso si solo se conserva una fracción de los datos de sesión.

**Nota**: En el modo RUM without Limits, solo puedes utilizar los filtros predeterminados en la [página de Resumen de monitorización del rendimiento][7]. Esto te permite ver todo el conjunto de datos y evita métricas de rendimiento sesgadas, ya que los datos se muestrean y hay menos etiquetas disponibles que en los atributos de eventos.

Esta página identifica los componentes clave de RUM without Limits que pueden ayudarte a gestionar los volúmenes de tus sesiones RUM dentro de tu presupuesto de observabilidad.

### Para nuevas aplicaciones

Para empezar a trabajar con RUM without Limits para nuevas aplicaciones, en el paso de [instrumentación][2]:

1. Asegúrate de que `sessionSampleRate` está configurado al 100%. Datadog recomienda configurarlo a este porcentaje para una visibilidad óptima y precisión de las métricas.

2. Elige una `sessionReplaySampleRate` que satisfaga tus necesidades de observabilidad.

3. Para aplicaciones con la integración [APM activada][3], configura el porcentaje de sesiones para las que deseas asegurarte de que las trazas de backend de APM se ingieren con `traceSampleRate` (navegador), `traceSampler` (Android) o `sampleRate` (iOS).

4. Habilita `traceContextInjection: sampled` para permitir que las bibliotecas de rastreo de backend tomen sus propias decisiones de muestreo para las sesiones en las que el SDK de RUM decida no conservar la traza.

   <div class="alert alert-danger">Los pasos 1, 3 y 4 pueden afectar a la ingesta de trazas de APM. Para garantizar que los volúmenes ingestados de tramos permanezcan estables, configura <code>traceSampleRate</code> con el valor de <code>sessionSampleRate</code> configurado anteriormente. Por ejemplo, si solías tener configurado <code>sessionSampleRate</code> al 10 % y lo aumentas al 100 % para RUM without Limits, reduce <code>traceSampleRate</code> del 100 % al 10 % para ingerir la misma cantidad de trazas.</div>

5. Despliega tu aplicación para aplicar la configuración.

### Para aplicaciones existentes
Los usuarios existentes de RUM deben volver a desplegar las aplicaciones para utilizar plenamente RUM without Limits. Asegúrate de que la frecuencia de muestreo de la sesión es del 100 % para todas las aplicaciones.

#### Paso 1: Ajustar la frecuencia de muestreo
Si ya estás recopilando repeticiones, para aumentar la frecuencia de muestreo de la sesión es necesario reducir la frecuencia de muestreo de las repeticiones para recopilar el mismo número de repeticiones (consulta el ejemplo siguiente). La frecuencia de muestreo de repetición se basa en la frecuencia de muestreo de sesión existente.

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

1. Ve a [**Digital Experiences > Real User Monitoring > Manage Applications**][4] (Experiencias digitales > Real User Monitoring > Gestionar aplicaciones).
1. Haz clic en la aplicación que deseas migrar.
1. Haz clic en la pestaña **SDK Configuration** (Configuración del SDK).
1. Asegúrate de que `sessionSampleRate` está ajustado al 100 %.
1. Establece `sessionReplaySampleRate` a una velocidad que resulte en el mismo número de repeticiones antes de aumentar la velocidad de muestreo de la sesión.
1. Utiliza el fragmento de código generado para actualizar tu código fuente y volver a desplegar tus aplicaciones para asegurarte de que se aplica la nueva configuración.

#### Paso 2: Ajustar el rastreo

Si has aumentado `sessionSampleRate`, podrías aumentar el número de tramos de APM ingestados, ya que el SDK de RUM tiene la capacidad de anular las decisiones de muestreo de las trazas de backend para realizar la correlación.

Para simplificar esto, establece `traceSampleRate` en un porcentaje inferior al 100 % (a la `sessionSampleRate` establecida anteriormente) y establece `traceContextInjection: sampled` para permitir que las bibliotecas de rastreo de backend tomen sus propias decisiones de muestreo para las sesiones en las que el SDK de RUM decida no mantener la traza.

#### Paso 3: Crear filtros de retención

En las aplicaciones móviles, pueden convivir muchas versiones concurrentes. Sin embargo, las versiones existentes no envían necesariamente el 100 % de las sesiones, lo que significa que la creación de nuevos filtros de retención reduce los datos disponibles en Datadog para estas versiones de aplicaciones.

Datadog recomienda crear los mismos filtros de retención para todas las versiones de la aplicación, independientemente de si la tasa de muestreo del SDK está configurada al 100 % o no. En última instancia, todas las sesiones valiosas se siguen recopilando aunque algunas sesiones no se ingieran para algunas versiones antiguas.

Consulta los filtros de retención y casos de uso sugeridos en [Prácticas recomendadas del filtro de retención][5].

## Siguientes pasos

Crea y configura [filtros de retención][6].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/rum_without_limits/metrics
[2]: /es/real_user_monitoring/browser/setup/
[3]: /es/real_user_monitoring/platform/connect_rum_and_traces/
[4]: https://app.datadoghq.com/rum/list
[5]: /es/real_user_monitoring/guide/retention_filter_best_practices/
[6]: /es/real_user_monitoring/rum_without_limits/retention_filters
[7]: https://app.datadoghq.com/rum/performance-monitoring