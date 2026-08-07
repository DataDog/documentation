---
algolia:
  tags:
  - metrics without limits
aliases:
- /es/metrics/faq/metrics-without-limits/
- /es/metrics/guide/metrics-without-limits-getting-started/
- /es/metrics/faq/why-is-my-save-button-disabled/
description: Desacopla la ingestión e indexación de métricas personalizadas para controlar
  volúmenes y costos al seleccionar qué etiqueta permanece consultable.
further_reading:
- link: https://www.datadoghq.com/blog/metrics-without-limits
  tag: Blog
  text: Controla dinámicamente el volumen de métricas personalizadas con Metrics without
    Limits™
- link: https://dtdg.co/fe
  tag: Habilitación de la Fundación
  text: Únete a una sesión interactiva para desbloquear todo el potencial de las métricas
title: Métricas sin Límites™
---
## Resumen {#overview}

Metrics without Limits™ te proporciona flexibilidad y control sobre los volúmenes de tus métricas personalizadas al desacoplar la ingestión e indexación de métricas personalizadas. Solo pagas por las etiquetas de métricas personalizadas que son valiosas para tu organización.

Metrics without Limits™ te permite configurar etiquetas en todos los tipos de métricas en la aplicación al seleccionar una lista de permitidos de etiquetas que permanecerán consultables en Datadog; esto elimina automáticamente las etiquetas no esenciales adjuntas a métricas a nivel de aplicación o negocio (por ejemplo, `host`). Alternativamente, puedes configurar una lista de bloqueados de etiquetas en la aplicación para eliminar y excluir etiquetas; esto retiene automáticamente las etiquetas esenciales restantes que proporcionan valor comercial a tus equipos. Estas funcionalidades de configuración se encuentran en la página [Resumen de Métricas][1].

Esta página identifica los componentes clave de Metrics without Limits™ que pueden ayudarte a gestionar los volúmenes de tus métricas personalizadas dentro de tu presupuesto de observabilidad.

### Configuración de etiquetas para una sola métrica {#configuration-of-tags-for-a-single-metric}

#### Lista de permitidos de etiquetas {#allowlist-of-tags}

1. Haz clic en cualquier nombre de métrica para abrir su panel lateral de detalles. 
2. Haz clic en **Gestionar Etiquetas**, luego en **Incluir etiquetas** para configurar las etiquetas que deseas que permanezcan como consultables en tableros, notebooks, seguimiento y otros productos de Datadog.
3. Define tu lista de permitidos de etiquetas. 
Por defecto, el modal de configuración de etiquetas se pre-puebla con una lista de permitidos recomendada por Datadog de etiquetas que han sido consultadas activamente en tableros, notebooks, seguimiento o a través de la API en los últimos 30 días. Las etiquetas recomendadas se distinguen con un ícono de gráfico de líneas. 
   a.Adicionalmente, incluya etiquetas que se utilizan en los activos (tableros, seguimiento, notebooks y SLOs). Estas etiquetas se utilizan en los activos, pero no se consultan activamente y están marcadas con un ícono de objetivo. Agregar estas asegura que no pierda visibilidad sobre sus activos críticos. 
4. Revise el *Volumen Nuevo Estimado* de métricas personalizadas indexadas que resulta de esta posible configuración de etiquetas.
5. Haga clic en **Guardar**.

{{< img src="metrics/mwl_example_include_tags-compressed_03182025.mp4" alt="Configuración de Etiquetas con Lista Permitida" video=true style="width:100%" >}}

{{< img src="metrics/tags_used_assets.png" alt="Mostrando a los clientes que pueden agregar etiquetas utilizadas en los activos en su configuración de MWL" style="width:100%" >}}

Puede [crear][2], [editar][3], [eliminar][4] y [estimar el impacto][5] de su configuración de etiquetas a través de las Metrics APIs.

#### Lista de bloqueo de etiquetas {#blocklist-of-tags}

1. Haga clic en cualquier nombre de métrica para abrir su panel lateral de detalles.
2. Haga clic en **Administrar Etiquetas**, luego en **Excluir Etiquetas**. 
3. Defina su lista de bloqueo de etiquetas. Las etiquetas definidas en la lista de bloqueo **no** son consultables en tableros y monitores. Las etiquetas que han sido consultadas activamente en tableros, notebooks, monitores y a través de la API en los últimos 30 días se distinguen con un ícono de gráfico de líneas.
4. Revise el *Volumen Nuevo Estimado* de métricas personalizadas indexadas que resulta de esta posible configuración de etiquetas.
5. Haga clic en **Guardar**.

{{< img src="metrics/mwl-example-tag-exclusion-compressed_04032025.mp4" alt="Configuración de Etiquetas con Exclusión de Etiquetas" video=true style="width:100%" >}}

Establezca el parámetro `exclude_tags_mode: true` en la API de Métricas para [crear][2] y [editar][3] una lista de bloqueo de etiquetas.

**Nota:** Para que las etiquetas sean gestionadas en una métrica, la métrica debe tener un tipo declarado. Esto se realiza típicamente cuando se envía una métrica, pero también puede hacerse manualmente utilizando el `Edit` botón para una métrica en Metrics Summary.

#### Utiliza la API {#use-the-api}

Puede [crear][2], [editar][3], [eliminar][4] y [estimar el impacto][5] de su configuración de etiquetas a través de las API de Métricas.

### Configura múltiples métricas a la vez {#configure-multiple-metrics-at-a-time}

Optimiza los volúmenes de tus métricas personalizadas utilizando la función de [configuración de etiquetas de métricas en bloque][7]. Para especificar las métricas que se van a configurar, haz clic en **Configurar Métricas**, luego en **Administrar Etiquetas*** en la página de Metrics Summary. Selecciona la métrica o el espacio de nombres de métrica que deseas configurar, luego elige hacer una de las siguientes acciones:
   - [Permitir que todas las etiquetas](#allow-all-tags) anulen cualquier configuración de etiquetas anterior y hagan que todas las etiquetas sean consultables.
   - [Incluir o excluir etiquetas](#include-or-exclude-tags) para definir etiquetas consultables y no consultables, respectivamente.

#### Permitir todas las etiquetas {#allow-all-tags}

{{< img src="metrics/bulk_allow_all_tags.png" alt="La opción Administrar Etiquetas con Permitir todas las etiquetas seleccionada en la sección Configurar etiquetas" style="width:100%" >}}

Esta opción está seleccionada por defecto y anula las configuraciones de etiquetas establecidas anteriormente para hacer que todas las etiquetas sean consultables.

#### Incluir o excluir etiquetas {#include-or-exclude-tags}

Al seleccionar etiquetas para incluir o excluir, elige [anular configuraciones de etiquetas existentes](#override-existing-tag-configurations) o [mantener configuraciones de etiquetas existentes](#keep-existing-tag-configurations).

##### Anular configuraciones de etiquetas existentes {#override-existing-tag-configurations}

{{< img src="metrics/bulk_include_tags.png" alt="La opción Administrar Etiquetas con Incluir etiquetas y Anular seleccionada en la sección Configurar etiquetas. Las opciones para incluir etiquetas consultadas activamente en tableros y monitores de los últimos 90 días y Etiquetas específicas están seleccionadas" style="width:100%" >}}

Todas las configuraciones de etiquetas existentes para las métricas seleccionadas son anuladas, y defines una nueva configuración de etiquetas. Esto te permite hacer que todas las etiquetas sean consultables en todos los nombres de métricas. Si eliges **incluir etiquetas**, puedes seleccionar incluir una o ambas de las siguientes:
   - Etiquetas consultadas activamente en Datadog de los últimos 30, 60 o 90 días.
   - Un conjunto específico de etiquetas que defines.

##### Mantener las configuraciones de etiquetas existentes {#keep-existing-tag-configurations}

{{< img src="metrics/bulk_exclude_tags.png" alt="La opción Administrar Etiquetas con Excluir etiquetas y Mantener seleccionadas en la sección Configurar etiquetas" style="width:100%" >}}

Las configuraciones de etiquetas existentes se mantienen, y defines una nueva configuración de etiquetas que se agregará a la configuración.

#### Utilice la API {#use-the-api-1}

Puede [configurar][13] y [eliminar][14] etiquetas para múltiples métricas a través de la API.

**Nota**: Utilice el atributo `include_actively_queried_tags_window` para incluir solo etiquetas consultadas activamente dentro de un marco de tiempo dado.

## Métricas sin Límites™ facturación {#metrics-without-limits-billing}

Configurar sus etiquetas le da control sobre qué métricas personalizadas se pueden consultar, reduciendo en última instancia su conteo facturable de métricas personalizadas. Métricas sin Límites™ desacopla los costos de ingestión de los costos de indexación. Puede seguir enviando a Datadog todos sus datos (todo se ingesta) y puede especificar una lista de etiquetas que desea que permanezcan consultables en la plataforma de Datadog. Si el volumen de datos que Datadog está ingiriendo para sus métricas configuradas difiere del volumen más pequeño que indexa, puede ver dos volúmenes distintos en su página de Uso así como en la página de Resumen de Métricas. 

- **Métricas Personalizadas Ingeridas**: El volumen original de métricas personalizadas basado en todas las etiquetas ingeridas.
- **Métricas Personalizadas Indexadas**: El volumen de métricas personalizadas que permanece consultable en la plataforma de Datadog (basado en cualquier configuración de Métricas sin Límites™).

**Nota: Bajo la tarifa de cardinalidad, solo las métricas configuradas contribuyen a su volumen de métricas personalizadas ingeridas.** Si una métrica no está configurada con Métricas sin Límites™, solo se le cobrará por su volumen de métricas personalizadas indexadas.

Aprenda más sobre [Facturación de Métricas Personalizadas][8].

### Bajo la tarifa de Nombre de Métrica {#under-metric-name-pricing}

Si su organización utiliza [tarifa de Nombre de Métrica][15] en lugar de tarifa de cardinalidad, la relación ingerida-contra-indexada funciona de manera diferente:

| Aspecto                                       | Tarifa de cardinalidad                                              | Tarifa de Nombre de Métrica                                                                  |
|----------------------------------------------|------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| Métricas que contribuyen al volumen ingerido | Solo métricas configuradas con Metrics without Limits™ | Todas las métricas (cada punto de datos enviado) |
| Multiplicador de métrica de distribución | El comportamiento depende de la configuración de Metrics without Limits™ | Se aplica tanto a lo ingerido como a lo indexado, independientemente de la configuración |

Para obtener detalles completos sobre el modelo, consulte [Precios por nombre de métrica para Custom Metrics][15].

## Comenzando con Metrics without Limits™ {#getting-started-with-metrics-without-limits}

1. Configure sus 20 métricas principales en su [Plan & Usage page][9] desde la Metrics Summary page o utilizando la [API][2].
   Puede usar la configuración de métricas en bloque (`*` sintaxis) para configurar etiquetas en múltiples métricas. Datadog le notifica cuando se completa el trabajo de configuración en bloque.

**Nota:** Si está utilizando la [API de Configuración de Etiquetas][2], use primero la [API de estimación de cardinalidad de configuración de etiquetas][5] para validar el impacto potencial de sus configuraciones de etiquetas antes de crear configuraciones de etiquetas. Si la interfaz de usuario o la API de estimación devuelve un número resultante de indexados que es mayor que lo ingerido, no guarde su configuración de etiquetas.

2. Configure sus métricas no consultadas con configuraciones de etiquetas vacías.

   A medida que sus equipos continúan limpiando métricas ruidosas que nunca se consultan en la plataforma Datadog, puede minimizar instantáneamente los costos de estas métricas no consultadas configurándolas con una lista de permitidos vacía de etiquetas. 

3. Revise su uso y facturación. Después de configurar sus métricas, el impacto de sus cambios se puede validar de tres maneras: 

   - Antes de guardar su configuración, el estimador de cardinalidad de configuración de etiquetas devuelve el número estimado resultante de Custom Metrics indexadas, que debe ser menor que el volumen de Custom Metrics ingeridas.
   - Después de guardar su configuración, el panel lateral de detalles de la Metrics Summary debería mostrar que sus Custom Metrics indexadas son menores que el volumen de Custom Metrics ingeridas.
   - 24 horas después de haber guardado su configuración, también puede ver el impacto en la tabla **Top Custom Metrics** de su página de Plan y Uso. Debería haber una reducción en el volumen de Custom Metrics entre la pestaña **Month-to-Date** y la pestaña **Most Recent Day** de esta tabla.

## Mejores prácticas {#best-practices}

- Puede configurar alertas en su métrica de [uso estimado de Custom Metrics en tiempo real][10] para que pueda correlacionar picos en Custom Metrics con configuraciones.

- [Control de acceso basado en roles][11] para Metrics without Limits™ también está disponible para controlar qué usuarios tienen permisos para usar esta función que tiene implicaciones de facturación.

- Los eventos de auditoría le permiten rastrear cualquier configuración de etiquetas o agregaciones percentuales que se hayan realizado y que puedan correlacionarse con picos en Custom Metrics. Busque "tags:audit" y "configuración de etiqueta consultable" o "agregaciones percentuales" en su [Events Stream][12].

\*Metrics without Limits es una marca registrada de Datadog, Inc.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/summary
[2]: /es/api/latest/metrics/#create-a-tag-configuration
[3]: /es/api/latest/metrics/#update-a-tag-configuration
[4]: /es/api/latest/metrics/#delete-a-tag-configuration
[5]: /es/api/latest/metrics/#tag-configuration-cardinality-estimator
[6]: /es/metrics/#time-and-space-aggregation
[7]: /es/metrics/summary/#configuration-of-multiple-metrics
[8]: /es/account_management/billing/custom_metrics/
[9]: https://app.datadoghq.com/billing/usage
[10]: /es/account_management/billing/usage_metrics/
[11]: /es/account_management/rbac/permissions/?tab=ui#metrics
[12]: https://app.datadoghq.com/event/stream
[13]: /es/api/latest/metrics/#configure-tags-for-multiple-metrics
[14]: /es/api/latest/metrics/#delete-tags-for-multiple-metrics
[15]: /es/account_management/billing/metric_name_pricing/