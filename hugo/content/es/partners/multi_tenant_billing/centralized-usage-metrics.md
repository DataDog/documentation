---
description: Haga un seguimiento de las métricas de uso en todas las organizaciones
  de clientes conectadas desde una Organización de administración.
title: Métricas de uso centralizadas
---
## Descripción general {#overview}

Métricas de uso centralizadas permite a la Organización de administración del socio (Organización de administración) supervisar el uso y las métricas de uso estimadas de cada organización de cliente conectada. Las métricas se consolidan en la Organización de administración etiquetadas por cliente, de modo que los socios pueden filtrar y atribuir el uso en toda su cartera de clientes desde un único conjunto de tableros, seguimientos y alertas.

Datadog produce dos tipos de métricas de uso:

- **Métricas de uso estimadas** en el espacio de nombres `datadog.estimated_usage.*`. Estas métricas se actualizan en cuestión de minutos y proporcionan una vista del uso casi en tiempo real. Las métricas de uso estimadas pueden diferir del uso facturable en aproximadamente un 10-20% en promedio, con una mayor varianza para las organizaciones de bajo uso. Vea [Métricas de uso estimadas][1] para obtener la referencia completa de las métricas.
- **Métricas de uso** en la fuente de consulta {{< ui >}}Usage{{< /ui >}}. Estas métricas provienen de la misma canalización de medición y facturación que genera la factura, por lo que realizan un seguimiento preciso del Plan y uso. Las métricas de uso son menos inmediatas que las métricas de uso estimadas, pero lo suficientemente precisas para las conversaciones sobre facturación.

Utilice las métricas de uso estimadas para detectar picos de uso de forma temprana, y las métricas de uso para informar cifras que se reconcilien con la factura.

## Etiquetas de atribución {#attribution-tags}

Las métricas consolidadas llevan dos etiquetas:

- `account_name`: El nombre de la organización principal (la Organización de administración).
- `child_org_name`: El nombre de la organización secundaria (la organización del cliente), en relación con la principal.

## Métricas de uso de consultas {#query-usage-metrics}

Al crear un widget de tablero o un seguimiento:

- Para las métricas de uso estimadas, seleccione {{< ui >}}Metrics{{< /ui >}} como fuente y utilice una métrica `datadog.estimated_usage.*`.
- Para las métricas de uso, seleccione {{< ui >}}Usage{{< /ui >}} como fuente y elija un tipo de uso, por ejemplo, {{< ui >}}Infra Hosts{{< /ui >}}.

Para las métricas de uso estimadas, utilice la etiqueta `child_org_name` para filtrar o agrupar la consulta. Por ejemplo, consulte el uso estimado de servidores de infraestructura para cada cliente:

```
sum:datadog.estimated_usage.hosts{*} by {child_org_name}
```

{{< img src="partners/multi_tenant_billing/usage_metrics_rollup.png" alt="Fuente de métricas que muestra las métricas de uso estimadas y la etiqueta child_org_name." style="width:100%;" >}}

Para las métricas de uso, filtre por `child_org_name` para delimitar el contexto de la consulta a un cliente, o agrupe por `child_org_name` para comparar clientes.

{{< img src="partners/multi_tenant_billing/usage_source_infra_hosts.png" alt="Fuente de consulta de uso con servidores de infraestructura seleccionados." style="width:100%;" >}}

Para que coincida con los totales de Plan & Usage, utilice un resumen de 1 hora para productos de tipo servidor y grafique en UTC, ya que los informes de Plan & Usage están en UTC.

## Related docs {#related-docs}

- [Visibilidad de costos y uso][2]: datos de costos y uso facturable en todas las organizaciones de clientes conectadas.

[1]: /es/account_management/billing/usage_metrics/
[2]: /es/partners/multi_tenant_billing/cost-and-usage-visibility/