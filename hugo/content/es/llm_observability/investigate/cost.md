---
aliases:
- /es/llm_observability/monitoring/cost/
description: Haga un seguimiento de los tokens y costos de sus LLM.
title: Costo
---
{{< img src="llm_observability/ao_cost_overview.png" alt="Cost Overview en Agent Observability." style="width:100%;" >}}

Agent Observability calcula automáticamente un costo estimado para cada solicitud de LLM, utilizando los modelos de precios públicos de los proveedores y los recuentos de tokens anotados en los tramos de LLM/embedding.

Al agregar esta información a través de trazas y aplicaciones, puede obtener información sobre los patrones de usuario de sus modelos LLM y su impacto en el gasto general.

Casos de uso:
- Vea y comprenda de dónde proviene el gasto en LLM, a nivel de modelo, solicitud y aplicación
- Realice un seguimiento de los cambios en el uso de tokens y el costo a lo largo del tiempo para protegerse de manera proactiva contra facturas más altas en el futuro
- Correlacione el costo de LLM con el rendimiento general de la aplicación, las versiones del modelo, los proveedores de modelos y los detalles del prompt en una sola visualización

## Configuración del seguimiento de costos {#setting-up-cost-monitoring}

Datadog ofrece dos formas de hacer un seguimiento de sus costos de LLM:
- [Automático](#automatic): Utilice las tarifas públicas de los [proveedores de LLM compatibles](#supported-providers)
- [Manual](#manual): Para tarifas de precios personalizadas, modelos autohospedados o proveedores no compatibles, proporcione manualmente sus propios valores de costo.

### Automático {#automatic}
Si sus solicitudes de LLM involucran a cualquiera de los [proveedores compatibles enumerados](#supported-providers), Datadog calcula automáticamente el costo de cada solicitud según lo siguiente:

- Recuentos de tokens adjuntos al tramo de LLM/embedding, proporcionados ya sea por [instrumentación automática][1] o por anotación manual del usuario
- Las tarifas de precios públicos del proveedor del modelo

### Manual {#manual}
Para proporcionar información de costos manualmente, siga los pasos de instrumentación descritos en la [Referencia del SDK][2] o la [API][3]. Al configurar sus costos manualmente (por ejemplo, configurando `total_cost`), la unidad debe estar en dólares; sin embargo, la unidad se almacenará como nanodólares.

<div class="alert alert-info">Si proporciona información de costos parcial, Datadog intenta estimar la información faltante. Por ejemplo, si proporciona un costo total pero no los valores de costo de entrada/salida, Datadog utiliza los precios del proveedor y los valores de tokens anotados en su tramo para calcular los valores de costo de entrada/salida. Esto puede causar una discrepancia entre el costo total proporcionado manualmente y la suma de los costos de entrada/salida calculados por Datadog. Datadog siempre muestra el costo total proporcionado tal cual, incluso si estos valores difieren.</div>

#### Cómo se calculan los conteos de tokens {#how-token-counts-are-calculated}
Las siguientes relaciones se aplican a los campos de uso de tokens:
{{< img src="llm_observability/llm_token_relationships.png" alt="Diagrama que muestra cómo Agent Observability calcula los conteos de tokens: total_tokens es la suma de input_tokens y output_tokens; input_tokens es la suma de non_cached_input_tokens, cache_read_input_tokens y cache_write_input_tokens; reasoning_output_tokens es un subconjunto de output_tokens." style="width:100%;" >}}

Cuando se proporcionan todos los subcomponentes de un campo de token, Datadog calcula automáticamente el campo de token principal, por lo que no es necesario enviarlo por separado.

Por ejemplo:
- `input_tokens` se puede inferir de `non_cached_input_tokens`, `cache_read_input_tokens` y `cache_write_input_tokens`
- `total_tokens` se puede inferir de input_tokens y output_tokens

Datadog recomienda proporcionar el desglose completo de tokens de caché siempre que la información de uso de caché esté disponible. Datadog aplica automáticamente las tarifas de lectura y escritura de caché específicas de cada proveedor al calcular los costos de entrada en caché.

Si solo se proporciona `input_tokens`, Datadog trata todos los tokens de entrada como tokens de entrada no almacenados en caché. Proporcionar solo un desglose parcial de caché puede resultar en conteos de tokens inexactos o discrepancias en los costos.

## Proveedores admitidos {#supported-providers}
Datadog calcula automáticamente el costo de las solicitudes de LLM realizadas a los siguientes proveedores admitidos utilizando la información de precios disponible públicamente en la documentación oficial de estos proveedores.

Datadog admite costos estimados para [más de 800 modelos][4], desde OpenAI, Hugging Face, Gemini, Anthropic hasta modelos servidos por OpenRouter.

## Métricas {#metrics}

Encuentre las métricas de costo y tokens disponibles en [Métricas de Agent Observability][5]. Las métricas de costo estimado se miden en **nanodólares** y las métricas de tokens se miden en **tokens**.

Las métricas de costo incluyen una etiqueta `source` para indicar el origen del valor:
- `source:auto` — calculado automáticamente
- `source:user` — proporcionado manualmente

### Desgloses de costo y tokens {#cost-and-token-breakdowns}

`ml_obs.span.llm.cost` y `ml_obs.span.llm.tokens` son métricas de conteo que dividen el uso de costos y tokens mediante las siguientes etiquetas. El costo incluye tramos de LLM y de incrustación, además de los costos de los tramos de herramientas proporcionados por el usuario. El uso de tokens incluye solo tramos de LLM. Para el uso de tokens de incrustación, utilice `ml_obs.span.embedding.input.tokens`.

Los desgloses automáticos de tokens de OpenAI Realtime requieren `ddtrace` 4.17.0 o posterior para Python. Para Node.js, utilice `dd-trace` 6.25.0 o posterior (v6), o 5.136.0 o posterior (v5). Consulte [instrumentación multimodal][11] para conocer las integraciones compatibles.

Los cargos por herramientas del proveedor son cargos por herramientas integradas, como la búsqueda web, en los tramos de LLM. Los costos de los tramos de herramientas proporcionados por el usuario son costos que usted suministra manualmente en los tramos de herramientas.

| Etiqueta | Valores | Descripción |
|-----|--------|-------------|
| `io_type` | `input`, `output`, `unknown` | Contribución de entrada o salida. |
| `input_type` | `non_cached`, `cache_read`, `cache_write`, `unknown` | Categoría de caché para valores de entrada. Omitido para otras direcciones. |
| `output_type` | `reasoning`, `non_reasoning`, `unknown` | Categoría de razonamiento para valores de salida cuando los datos establecen la categoría. Los cargos por herramientas que no son de tokens omiten esta etiqueta. |
| `token_modality` | `text`, `audio`, `image`, `unknown`, `other` | Modalidad de token. `other` se aplica únicamente a las contribuciones de costos que no corresponden a tokens, como los cargos por herramientas del proveedor y los costos de los tramos de herramientas proporcionados por el usuario. |
| `ttl` | `5m`, `1h` | Tiempo de vida de escritura en caché cuando ese desglose está disponible. Omitido para otras contribuciones. |

Para las etiquetas de desglose aplicables, los detalles no disponibles utilizan `unknown`. Un valor `unknown` no significa uso cero. Por ejemplo, si un proveedor no informa el uso de caché, los tokens de entrada se etiquetan como `input_type:unknown`. Cuando el uso de caché o razonamiento no se puede asignar a modalidades individuales, los valores mantienen su categoría conocida y utilizan `token_modality:unknown`.

### Elija entre métricas totales y de desglose {#choose-between-total-and-breakdown-metrics}

Utilice las métricas totales para estadísticas por tramo y las métricas de desglose para comparar el uso entre categorías.

#### Analice los totales por tramo {#analyze-totals-per-span}

Utilice las distribuciones `ml_obs.span.llm.total.cost` y `ml_obs.span.llm.total.tokens` para obtener promedios y percentiles por tramo. Cada distribución registra una observación total por tramo aplicable. El costo total incluye los tramos de LLM y de incrustación, además de los costos de los tramos de herramientas proporcionados por el usuario. Los tokens totales incluyen solo los tramos de LLM.

Por ejemplo, grafique el costo promedio y el uso promedio de tokens por tramo:

```text
avg:ml_obs.span.llm.total.cost{ml_app:my-app}
avg:ml_obs.span.llm.total.tokens{ml_app:my-app}
```

#### Analice el uso por categoría {#analyze-usage-by-category}

Utilice `ml_obs.span.llm.cost` y `ml_obs.span.llm.tokens` para comparar el costo y el uso de tokens entre categorías. Utilice `sum` con `.as_count()` para agregar contribuciones. Estas métricas no proporcionan promedios ni percentiles por tramo.

Por ejemplo, las siguientes consultas grafican el costo por entrada o salida y modalidad, y los tokens de entrada por categoría de caché y modalidad:

```text
sum:ml_obs.span.llm.cost{ml_app:my-app} by {io_type,token_modality}.as_count()
sum:ml_obs.span.llm.tokens{ml_app:my-app,io_type:input} by {input_type,token_modality}.as_count()
```

Para un tramo con un costo total o recuento de tokens válido, sus valores de desglose suman ese total. Cuando no hay un total disponible para el costo o los tokens, las métricas de desglose conservan los valores de entrada o salida disponibles. La distribución total correspondiente no recibe ninguna observación.

No sume las métricas de desglose a las métricas `.total.*` correspondientes al calcular los totales, ya que eso cuenta el mismo uso dos veces.

## Etiquetas personalizadas en métricas de costo y tokens {#custom-tags-on-cost-and-tokens-metrics}

Las métricas de costo y tokens de LLM de Datadog vienen con etiquetas OOTB como `model_name`, `model_provider` y `ml_app`. Para desglosar el gasto de LLM por atributos específicos de su aplicación (por ejemplo, equipo, nivel de cliente o función), puede promover un subconjunto de sus etiquetas de tramo como etiquetas personalizadas en las métricas de costo y tokens generadas.

<div class="alert alert-info">Las etiquetas personalizadas se aplican solo a las métricas de <strong>costo</strong> (<code>ml_obs.span.* cost</code>) y <strong>tokens</strong> (<code>ml_obs.span.* tokens</code>) de LLM. Otras métricas de tramos (como <code>ml_obs.span.duration</code>) no se ven afectadas.</div>

### Cómo funciona {#how-it-works}

1. Etiquete sus tramos de LLM con los atributos por los cuales desea desglosar el gasto, usando el parámetro `tags` del SDK (o instrumentación automática)
2. En la misma anotación, marque cuáles de esas claves de etiqueta deben propagarse a las métricas de costo pasando las claves al parámetro `cost_tags` (Python) o `costTags` (Node.js). Consulte la [Referencia del SDK][7] para ver la sintaxis de instrumentación completa y las reglas de tiempo
3. Una vez propagadas, esas claves de etiqueta aparecen como etiquetas en las métricas de costo y tokens de LLM. Puede usarlas en cualquier lugar de Datadog que utilice estas métricas: dashboards, monitors, notebooks y búsqueda de trazas

<div class="alert alert-warning">Configure solo etiquetas con valores acotados (como <code>team</code>, <code>customer_tier</code>, o <code>feature</code>). Las etiquetas con valores no acotados o de alta cardinalidad (como IDs de usuario o IDs de solicitud) no son totalmente compatibles y pueden truncarse u omitirse de las métricas resultantes.</div>

### Caso de uso: Filtrar y agrupar el gasto por un atributo de la aplicación {#use-case-filter-and-group-spend-by-an-application-attribute}

Use etiquetas personalizadas para desglosar el gasto por atributos que no forman parte de las etiquetas de métricas OOTB. Cree un widget de dashboard de `ml_obs.span.llm.total.cost` agrupado por `team` para ver qué equipos impulsan el consumo con su uso de LLM a lo largo del tiempo, y configure un monitor de métricas con la misma consulta para generar alertas independientes por equipo (o nivel de cliente, función o entorno) cuando el uso supere un umbral.

### Caso de uso: Seguimiento de la efectividad del almacenamiento en caché de prompts {#use-case-track-prompt-caching-effectiveness}

Muchos proveedores de LLM almacenan en caché los prefijos de prompt reutilizados para reducir el procesamiento repetido. Etiquetar tramos con identificadores de prompt como "prompt_version" o "prompt_template_id", y luego desglosar las métricas por esas etiquetas, le permite:

- Compare las variantes de prompt según la eficacia con que reutilizan la caché del proveedor. Por ejemplo, realizar un seguimiento de la tasa de aciertos de caché utilizando la fórmula `ml_obs.span.llm.input.cache_read.tokens / ml_obs.span.llm.input.cache_write.tokens` 
- Identifique los prompts que llenan la caché, pero rara vez la reutilizan, lo que suele indicar que los prefijos son inestables o que la invalidación es agresiva
- Detecte prompts que omiten el almacenamiento en caché por completo porque el prefijo es demasiado corto para calificar o cambia con cada llamada.
- Genere alertas ante regresiones del almacenamiento en caché detectadas en las métricas de tokens antes de que provoquen un aumento de los costos

{{< img src="llm_observability/cost_tags_cache.png" alt="Dashboard que compara tokens de entrada de lectura de caché, escritura de caché y sin caché agrupados por una etiqueta personalizada prompt_version." style="width:100%;" >}}

## Visualizar costos en Agent Observability {#view-costs-in-agent-observability}
En Agent Observability, seleccione {{< ui >}}Cost{{< /ui >}} en la navegación izquierda para abrir _Cost Overview_. Esta página muestra su gasto estimado en IA en todas sus aplicaciones, proveedores y modelos de LLM para el rango de tiempo seleccionado.

Cost Overview incluye:
- {{< ui >}}Spend breakdown{{< /ui >}}: Un diagrama de Sankey de sus {{< ui >}}Total Estimated Spend{{< /ui >}}, comparado con el período anterior. Seleccione {{< ui >}}By app{{< /ui >}}, {{< ui >}}By provider{{< /ui >}} o {{< ui >}}Custom Tags{{< /ui >}} para analizar qué aplicaciones, proveedores o [etiquetas personalizadas](#custom-tags-on-cost-and-tokens-metrics) representan su gasto. Cada entrada muestra el monto gastado, su participación en el gasto total y el cambio respecto al período anterior.
- {{< ui >}}Cost Savings Opportunity{{< /ui >}}: [Insights][8] que identifican formas específicas de reducir el gasto, como prompts que no utilizan el caché de prompts del proveedor. Cada insight enumera la aplicación afectada y los ahorros estimados. [Frontier model sizing][9] destaca el gasto en modelos premium para priorizar pruebas con modelos de menor costo.
- {{< ui >}}Cost Trend{{< /ui >}}: Una visualización de series temporales del gasto en una o todas las aplicaciones. Agrúpela por aplicación, servicio, nombre de modelo, proveedor de modelo o etiquetas personalizadas, y agregue filtros para limitar los resultados.
- {{< ui >}}Wasted Spend{{< /ui >}}: Gasto en llamadas fallidas, respuestas de baja calidad y problemas encontrados por [Insights][8], desglosado por aplicación. Para el desperdicio identificado por Insights, abra el hallazgo para revisar la causa raíz, las trazas afectadas y la solución recomendada. Consulte [cómo mide Insights el gasto desperdiciado][10].
- {{< ui >}}Cache Efficiency{{< /ui >}}: Ahorros netos por almacenamiento en caché de prompts, junto con la tasa de aciertos de caché, la tasa de reutilización de caché y el costo de entrada no almacenada en caché. Para obtener métricas de caché precisas, proporcione el [desglose completo de tokens de caché](#how-token-counts-are-calculated).

Para visualizar los costos de una sola aplicación, haga clic en la aplicación en el diagrama de Sankey de Cost Overview. Alternativamente, selecciónela desde {{< ui >}}Applications{{< /ui >}} y abra la pestaña {{< ui >}}Cost{{< /ui >}}. La _Cost view_ de la aplicación incluye:
- {{< ui >}}Filter{{< /ui >}}: Opciones para limitar Cost view a atributos específicos
- {{< ui >}}Total Cost (Estimated){{< /ui >}} y {{< ui >}}Total Tokens{{< /ui >}}: Resúmenes desglosados por tipo de token, incluidos tokens de salida, entrada no almacenada en caché, entrada de lectura de caché, entrada de escritura de caché y tokens de incrustación
- {{< ui >}}Cost Trend{{< /ui >}}: Gasto a lo largo del tiempo, agrupado por modelo, proveedor, tipo de token o etiquetas personalizadas
- {{< ui >}}Most Expensive LLM Calls{{< /ui >}}: Una lista de sus solicitudes más costosas

{{< img src="llm_observability/cost_tracking_trace_v2.png" alt="Datos de costos en el detalle de la traza." style="width:100%;" >}}

Los datos de costos también están disponibles en las trazas y los tramos de su aplicación, lo que le permite comprender el costo tanto a nivel de solicitud (traza) como de operación (tramo).
Haga clic en cualquier traza o tramo para abrir una vista detallada en un panel lateral que incluye métricas de costos para la traza completa y para cada llamada individual a LLM.
En la parte superior de la vista de traza, el banner muestra información de costos agregada para la traza completa, incluido el costo estimado y el total de tokens. Al pasar el cursor sobre estos valores, se muestra un desglose de los tokens y costos de entrada y salida.

Al seleccionar un tramo individual de LLM, se muestran métricas de costos similares específicas de esa solicitud de LLM.

Para consultar datos relacionados con los costos en la página Traces, utilice las facetas {{< ui >}}Cost{{< /ui >}} del lado izquierdo. 

Alternativamente, consulte directamente los siguientes atributos de tramo:
- `@metrics.input_tokens` / `@metrics.estimated_input_cost`
- `@metrics.output_tokens` / `@metrics.estimated_output_cost`
- `@metrics.total_tokens` / `@metrics.estimated_total_cost`
- `@metrics.non_cached_input_tokens` / `@metrics.estimated_non_cached_input_cost`
- `@metrics.cache_read_input_tokens` / `@metrics.estimated_cache_read_input_cost`
- `@metrics.cache_write_input_tokens` / `@metrics.estimated_cache_write_input_cost`
- `@metrics.reasoning_output_tokens` / `@metrics.estimated_reasoning_output_cost`

## Solucionar problemas de monitoreo de costos de LLM {#troubleshoot-llm-cost-monitoring}

Si los valores de costo de LLM faltan en una traza o parecen inexactos, consulte las siguientes secciones para conocer las causas y soluciones comunes.

### La traza muestra "PARTIAL COST" o "COST UNAVAILABLE" {#trace-shows-partial-cost-or-cost-unavailable}

Cada tramo de LLM en una traza tiene un precio independiente. La advertencia aparece cuando a uno o más tramos de LLM en la traza les falta una estimación de costo:

- {{< ui >}}PARTIAL COST{{< /ui >}}: Datadog calculó los costos de algunos tramos de LLM en la traza, pero no de los demás. El valor {{< ui >}}Estimated Cost{{< /ui >}} refleja la suma solo de los tramos para los cuales se calculó el costo.
- {{< ui >}}COST UNAVAILABLE{{< /ui >}}: Datadog no pudo calcular el costo de ningún tramo de LLM en la traza.

Pase el cursor sobre la advertencia para ver la cantidad de tramos afectados, el motivo por el cual falta el costo y los nombres de los tramos afectados. Los motivos se clasifican en una de las siguientes categorías.

#### Proveedor de modelo no compatible {#unsupported-model-provider}

El proveedor del modelo LLM en el tramo no está en la [lista de proveedores compatibles](#supported-providers), por lo que Datadog no tiene tarifas de precios públicas que aplicar.

Cómo solucionar el problema:
- Verifique que el `model_provider` del tramo coincida con un identificador de proveedor compatible. Consulte la [lista de proveedores compatibles](#supported-providers).
- Proporcione manualmente los valores de costo en el tramo. Consulte la [Referencia del SDK][2] o la [API][3].

#### Nombre de modelo no compatible {#unsupported-model-name}

El proveedor de LLM es compatible, pero el `model_name` en el tramo no coincide con ninguna entrada en el [catálogo de precios][4] del proveedor. Esto suele ocurrir cuando el nombre del modelo está mal escrito, abreviado o utiliza un alias interno.

Cómo solucionar el problema:
- Actualice el `model_name` del tramo para que coincida con el nombre oficial en el [catálogo de precios][4] del proveedor.
- Para variantes implementadas de forma privada o personalizadas de un modelo compatible, proporcione manualmente los valores de costo en el tramo. Consulte la [Referencia del SDK][2] o la [API][3].

#### Faltan conteos de tokens {#missing-token-counts}

El tramo no tiene anotaciones de `input_tokens` o `output_tokens`, por lo que Datadog no tiene valores de tokens para el cálculo de costos. (Para tramos de incrustación, solo se requiere `input_tokens`.)

Cómo solucionar el problema:
- Para la [auto-instrumentación][1], confirme que su proveedor y la versión del SDK sean compatibles.
- Para la instrumentación manual, anote los conteos de tokens de entrada y salida en el tramo. Consulte la [Referencia del SDK][2] o la [API][3].

### Costo inexacto cuando la caché de prompts está habilitada {#inaccurate-cost-when-prompt-caching-is-enabled}

Si un tramo incluye solo `input_tokens` y `output_tokens` agregados, pero le falta `cache_read_input_tokens`, `cache_write_input_tokens` o `non_cached_input_tokens`, Datadog aplica la tarifa de entrada estándar a todo el `input_tokens`.

Para los proveedores que admiten la caché de prompts, las lecturas de caché, las escrituras de caché y las entradas no almacenadas en caché se facturan a diferentes tarifas. Sin este desglose, el cálculo del costo de entrada puede ser inexacto.

Cómo solucionar el problema:
- Para la [auto-instrumentación][1], verifique que su proveedor y la versión del SDK emitan conteos de tokens específicos de caché.
- Para la instrumentación manual, anote `cache_read_input_tokens`, `cache_write_input_tokens` y `non_cached_input_tokens` además de `input_tokens`. Consulte la [Referencia del SDK][2] o la [API][3].

[1]: /es/llm_observability/instrument/auto_instrumentation
[2]: /es/llm_observability/instrument/sdk/?tab=python#monitoring-costs
[3]: /es/llm_observability/instrument/api/#metrics
[4]: https://github.com/pydantic/genai-prices/tree/main?tab=readme-ov-file#providers
[5]: /es/llm_observability/investigate/metrics/#llm-cost-metrics
[7]: /es/llm_observability/instrument/sdk/#adding-custom-tags-to-cost-and-tokens-metrics
[8]: /es/llm_observability/investigate/insights/
[9]: /es/llm_observability/investigate/insights/#frontier-model-sizing
[10]: /es/llm_observability/investigate/insights/#wasted-spend
[11]: /es/llm_observability/instrument/multimodal/#automatic-instrumentation