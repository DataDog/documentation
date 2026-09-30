---
aliases:
- /es/tracing/faq/resource-trace-doesn-t-show-up-under-correct-service/
description: Conoce las métricas basadas en DDSketch en APM para calcular percentiles
  precisos y distribuciones de latencia con mayor exactitud.
further_reading:
- link: https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/
  tag: Blog
  text: Cálculo preciso de percentiles con DDSketch
- link: https://docs.datadoghq.com/metrics/distributions/
  tag: Documentación
  text: Más información sobre distribuciones
- link: https://docs.datadoghq.com/tracing/guide/metrics_namespace/
  tag: Documentación
  text: Más información sobre las métricas de trazas (traces)
title: Métricas basadas en DDSketch en APM
---

Las métricas de trazas se recopilan automáticamente para tus servicios y recursos, y se conservan durante 15 meses. Los percentiles de latencia existen como series temporales individuales. Estos percentiles también están disponibles como una [métrica de distribución de Datadog][1]. En lugar de tener una métrica diferente para cada percentil y métricas separadas para los servicios, recursos o etiquetas (tags) primarias adicionales, Datadog ofrece una métrica simple:

- `trace.<SPAN_NAME>`:
  - *Requisito previo:* esta métrica existe para cualquier servicio de APM.
  - *Descripción:* Representa las distribuciones de latencia de todos los servicios, recursos y versiones a través de diferentes entornos y etiquetas primarias adicionales.
  - *Tipo de métrica:* [DISTRIBUTION][2]
  - *Etiquetas (tags):* `env`, `service`, `version`, `resource`, `resource_name`, `http.status_code`, `synthetics`, y [etiquetas primarias adicionales][3].

Las páginas Servicio de APM y Recursos utilizan este tipo de métricas automáticamente. Puedes usar las métricas para alimentar tus dashboards y monitores.

**¿Por qué estoy viendo un historial completo de esta nueva métrica?**
- Datadog une cualquier consulta existente en la nueva métrica a una consulta equivalente según las métricas de latencia de larga duración, para no tener que crear varias consultas.

**Estoy viendo un cambio en los valores de mi latencia, ¿qué está pasando?
- Las métricas de distribución de Datadog se basan en [DDSketch][4]. Esto incluye un cambio de garantías de error de rango a garantías de error relativo. Como resultado, ahora se asegura que todos los valores del percentil estimado se acercan más al valor del percentil real.
- En concreto, cabe esperar una reducción de los valores de p99, donde esta diferencia es más notable. Los nuevos valores se centran más en el valor preciso de p99.
- Una cosa a tener en cuenta es que los cálculos de métrica de APM no son exactamente similares a una métrica personalizada de distribución de Datadog que se calcularía en el código. El cálculo se realiza en el backend, por lo que pueden producirse algunas diferencias.

**Utilizo Terraform. ¿Qué significa este cambio para mí?**
- Las métricas siguen existiendo, tus definiciones de Terraform siguen existiendo y siguen funcionando.
- Para aprovechar la [mayor precisión][4] que ofrece el nuevo sistema de métricas basado en DDSketch, cambia tus definiciones de Terraform como se muestra en los siguientes ejemplos.

Percentiles antes:
```
avg:trace.http.request.duration.by.resource_service.99p{service:foo, resource:abcdef1234}
avg:trace.sample_span.duration.by.datacenter_resource_service.75p{datacenter:production, service:bar, resource:ghijk5678}
```

Percentiles después:
```
p99:trace.http.request{service:foo, resource:abcdef1234}
p75:trace.sample_span{datacenter:production, service:bar, resource:ghijk5678}
```

p100 antes:
```
avg:trace.http.request.duration.by.resource_service.100p{service:foo, resource:abcdef1234}
avg:trace.sample_span.duration.by.datacenter_resource_service.100p{datacenter:production, service:bar, resource:ghijk5678}
```
p100 después:
```
max:trace.http.request{service:foo, resource:abcdef1234}
max:trace.sample_span{datacenter:production, service:bar, resource:ghijk5678}
```

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/metrics/distributions/
[2]: /es/metrics/types/?tab=distribution#metric-types
[3]: /es/tracing/guide/setting_primary_tags_to_scope/#add-additional-primary-tags-in-datadog
[4]: https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/