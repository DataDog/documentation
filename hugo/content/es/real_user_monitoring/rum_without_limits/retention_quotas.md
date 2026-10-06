---
description: Aprenda a limitar el número de sesiones de RUM retenidas por día con
  cuotas de retención.
further_reading:
- link: /real_user_monitoring/rum_without_limits/
  tag: Documentación
  text: RUM without Limits
- link: /real_user_monitoring/rum_without_limits/retention_filters
  tag: Documentación
  text: Retenga datos con filtros de retención
- link: /real_user_monitoring/rum_without_limits/metrics
  tag: Documentación
  text: Analice el rendimiento con métricas
- link: /real_user_monitoring/guide/retention_filter_best_practices/
  tag: Guía
  text: Prácticas recomendadas para filtros de retención
title: Controle los costos con cuotas de retención
---
## Descripción general {#overview}

Las cuotas de retención le permiten limitar el número de sesiones retenidas por día en sus filtros de retención.

Esto le brinda un control de costos más estricto y evita picos de facturación inesperados causados por aumentos repentinos de tráfico o filtros mal configurados.

## Cómo funcionan las cuotas {#how-quotas-work}

Usted define una cuota diaria como un número máximo de sesiones retenidas. Después de alcanzar la cuota, puede elegir uno de dos comportamientos:

- {{< ui >}}Stop retention{{< /ui >}}: Datadog no retiene sesiones adicionales durante el resto del día y descarta todas las sesiones entrantes hasta que la cuota se restablezca.
- {{< ui >}}Slow down retention{{< /ui >}}: La retención continúa, pero a una tasa más lenta. Datadog retiene solo el 10% de las sesiones que normalmente se retendrían.

## Configuración {#setup}

Para configurar una cuota de retención para una aplicación:

1. En Datadog, navegue a {{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Real User Monitoring{{< /ui >}} > {{< ui >}}Manage Applications{{< /ui >}}.
2. Seleccione su aplicación.
3. Vaya a {{< ui >}}Product Settings{{< /ui >}} > {{< ui >}}Retention Filters{{< /ui >}}.
4. Establezca un umbral de cuota diaria, una hora de restablecimiento y un comportamiento para cuando se alcance la cuota.

{{< img src="real_user_monitoring/rum_without_limits/retention-quotas-configuration.png" alt="El panel de configuración de cuotas de retención que muestra el umbral de cuota diaria, la hora de restablecimiento y las opciones de comportamiento." style="width:65%" >}}

<div class="alert alert-info">Las cuotas no se aplican a las sesiones retenidas por <a href="/real_user_monitoring/rum_without_limits/retention_filters/#permanent-retention-filters">Permanent Retention Filters</a>.</div>

La configuración se realiza a nivel de aplicación, lo que significa que puede aplicar diferentes estrategias de retención por aplicación. Cualquier cambio en la configuración (límite de cuota, comportamiento de retención, hora de restablecimiento) se aplica al instante.

## Haga un seguimiento del uso de la cuota {#monitor-quota-usage}

La página de filtros de retención muestra un desglose de las sesiones de usuario retenidas, incluidas las sesiones bloqueadas una vez que se alcanza la cuota. Para paneles y alertas, utilice la métrica `rum.measure.usage.quota_blocked_sessions`.

{{< img src="real_user_monitoring/rum_without_limits/retention-quotas-usage.png" alt="Un gráfico de desglose diario que muestra las sesiones de usuario retenidas por filtros personalizados, las sesiones retenidas por filtros permanentes y las sesiones bloqueadas una vez alcanzada la cuota." style="width:100%" >}}

## API {#api}

Las cuotas de retención también se pueden administrar a través de [APIs][1].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/api/latest/rum-retention-quotas/