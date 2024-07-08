---
aliases:
- /es/tracing/faq/resource-trace-doesn-t-show-up-under-correct-service/
further_reading:
- link: https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/
  tag: Blog
  text: Cálculo preciso de percentiles con DDSketch
- link: https://docs.datadoghq.com/metrics/distributions/
  tag: Documentación
  text: Más información sobre distribuciones
- link: https://docs.datadoghq.com/tracing/guide/metrics_namespace/
  tag: Documentación
  text: Más información sobre trazas métricas
title: Métricas basadas en DDSketch en APM
---

Las trazas métricas se recopilan automáticamente para tus servicios y recursos y se conservan durante 15 meses. Los percentiles de latencia existen como series temporales individuales. Estos percentiles también están disponibles como una [métrica de distribución de Datadog][1]. En lugar de tener un métrica diferente para cada percentil y métricas separadas para servicios, recursos o segunda etiqueta primaria, Datadog ofrece una simple métrica:

- `trace.<SPAN_NAME>`:
  - *Requisito:* Esta métrica existe para cualquier servicio APM.
  - *Descripción:* Representa las distribuciones de latencia para todos los servicios, recursos y versiones a través de diferentes entornos y segunda etiqueta primaria.
  - *tipo de métrica:* [DISTRIBUCIÓN][2]
  - *etiquetas:* `env`, `service`, `version`, `resource` y [la segunda etiqueta primaria][3].

Las páginas de servicio APM y de recursos utilizan este tipo de métrica automáticamente. Puedes usar las métricas para alimentar tus dashboards y monitores.

**¿Cómo estoy viendo un historial completo de esta nueva métrica?**
- Datadog une cualquier consulta existente en la nueva métrica a una consulta equivalente en las métricas basada en la latencia de larga duración para no tener que crear varias consultas.

**Estoy viendo un cambio en los valores de mi latencia, ¿qué está pasando?
- Las métricas de distribución de Datadog se basan en [DDSketch][4]. Esto incluye un cambio de garantías de error de rango a garantías de error relativo. Como resultado, ahora se garantiza que todos los valores del percentil estimado se acercan más al valor del percentil real.
- En concreto, cabe esperar una reducción de los valores de p99, donde esta diferencia es más notable. Los nuevos valores se centran más en el valor preciso de p99.
- Una cosa a tener en cuenta es que los cálculos de métrica APM no son exactamente similares a una métrica personalizada de distribución de Datadog que se calcularía en el código. El cálculo se realiza en el backend, por lo que pueden producirse algunas diferencias.

**Utilizo Terraform. ¿Qué significa este cambio para mí?**
- Las métricas siguen existiendo, tus definiciones de Terraform siguen existiendo y siguen funcionando.
- Para aprovechar la [mayor precisión][4] que ofrece el nuevo sistema de métricas basado en DDSketch cambia tus definiciones de Terraform como se muestra en los siguientes ejemplos.

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
[3]: /es/tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[4]: https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/