---
description: Obtenga visibilidad unificada sobre el gasto en IA a través de proveedores,
  normalice los datos de costos y atribuya el uso a los usuarios y equipos.
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Cloud Cost Management
- link: /cloud_cost_management/setup/saas_costs
  tag: Documentación
  text: Costos de SaaS e IA
- link: /cloud_cost_management/allocation/custom_allocation_rules
  tag: Documentación
  text: Reglas de Asignación Personalizadas
- link: /cloud_cost_management/allocation/tag_pipelines
  tag: Documentación
  text: Etiquetas de Pipelines
- link: /cloud_cost_management/reporting
  tag: Documentación
  text: Informes
- link: /cloud_cost_management/cost_changes/monitors
  tag: Documentación
  text: Monitores de Cloud Cost
- link: /cloud_cost_management/planning/budgets
  tag: Documentación
  text: Presupuestos
- link: /cloud_cost_management/planning/forecasting
  tag: Documentación
  text: Pronósticos
title: Costos de IA
---
## Resumen {#overview}

Los costos de IA en Cloud Cost Management ofrecen a los equipos de FinOps y de ingeniería un destino unificado para analizar el gasto en IA a través de proveedores, incluyendo Amazon Bedrock, Anthropic, Google Gemini, OpenAI, Vertex AI, GitHub Copilot y Cursor. Visualice el gasto total en IA junto a los costos de su infraestructura en la nube, analícelo con etiquetas normalizadas, rastree anomalías de costos y atribuya el uso a los usuarios específicos y claves de API que lo impulsan.

## Requisitos Previos {#prerequisites}

Para utilizar los costos de IA, debe tener al menos uno de los siguientes proveedores compatibles configurados para [Cloud Cost Management][1]:

| Proveedor de IA | Método de Configuración |
|---|---|
| Amazon Bedrock | [integración de AWS][2] |
| Anthropic   | [integración de SaaS][3] |
| Google Gemini  | [Integración de Google Cloud][4] |
| OpenAI     | [Integración de SaaS][5] |
| Vertex AI  | [Integración de Google Cloud][4] |
| GitHub Copilot | [GitHub Copilot][15] |
| Cursor | [Cursor][16] |

## Resumen de costos de IA {#ai-cost-summary}

Después de conectar a sus proveedores de IA, navegue a [**Cloud Cost** > **Resumir** > **IA**][6] para ver la página de resumen de costos de IA.

{{< img src="cloud_cost/ai_costs/ccm-ai-costs-overview.png" alt="El tablero de resumen de costos de IA, que muestra las tendencias de gasto diario durante un período de un mes, una lista de los principales impulsores de gasto y un gráfico de anomalías." responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

La página de resumen de costos de IA proporciona:

- **Costo total de IA**: Costo agregado de IA y cambio de costo durante el período de tiempo seleccionado.
- **Costo diario de IA**: Tendencias de costo diario entre los proveedores seleccionados durante el período de tiempo seleccionado. Utilice el **Filtro para** desplegable para definir qué proveedores aparecen en el gráfico.
- **Principales impulsores de costo**: Los modelos, proyectos, servicios y usuarios que generan el mayor gasto.
- **Anomalías de costo de IA activas**: Costos [anomalías][7] detectados proactivamente entre todos los proveedores conectados. Seleccione una anomalía para abrir un panel lateral con más detalles y opciones para realizar una acción adicional.
- **Tableros de costos de IA**: Plantillas de tablero listas para usar para cada proveedor compatible, combinando datos de costos con señales de uso como consumo de tokens, distribución de modelos y análisis de usuarios.

## Etiquetas de IA normalizadas {#normalized-ai-tags}

Los datos de costos de IA de todos los proveedores compatibles están normalizados a un conjunto consistente de etiquetas. Utilice estas etiquetas para filtrar, agrupar, comparar y planificar el gasto en IA a través de tableros, [monitores][8], [presupuestos][9], [pronósticos][10] y otras herramientas de Datadog. Utilice [Cloud Cost Explorer][11] para consultar y comparar gastos entre proveedores sin escribir lógica por proveedor.

Las siguientes etiquetas están disponibles para todos los proveedores de IA compatibles:

| Nombre de la etiqueta&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | Descripción de la etiqueta |
|---|---|
| `providername` | El proveedor de IA. |
| `model` | El identificador del modelo de IA (por ejemplo, `claude-opus-4-6`, `gpt-4.1`). |
| `model_name` | El nombre del modelo legible por humanos (por ejemplo, `Claude Opus 4.6`). |
| `token_direction` | Si se están consumiendo (entrada) o generando (salida) tokens dentro de un servicio o aplicación. |
| `token_category` | La categoría específica de tokens consumidos, como tokens de entrada, tokens de salida o tokens relacionados con operaciones de almacenamiento en caché y búsqueda (por ejemplo, `cached input`, `cache write`, `standard input`, `output`). |
| `project` | El proyecto, espacio de trabajo o entorno al que pertenecen los costos de IA. |

## Atribuya el gasto de IA a las fuentes {#attribute-ai-spend-to-sources}

Las reglas de asignación listas para usar (OOTB) utilizan datos de observabilidad de Datadog para atribuir los costos de IA a los usuarios, claves de API y otras fuentes que los generaron. Las reglas de asignación OOTB no requieren configuración y están disponibles para Anthropic y OpenAI.

Las siguientes etiquetas están disponibles a través de las reglas de asignación OOTB:

{{< tabs >}}
{{% tab "Anthropic" %}}

- `api_key_id`
- `api_key_name`
- `context_window`
- `model`
- `model_id`
- `org_id`
- `org_name`
- `service_tier`
- `user_email`
- `user_id`
- `user_name`
- `workspace_id`
- `workspace_name`

{{% /tab %}}
{{% tab "OpenAI" %}}

- `account_id`
- `account_name`
- `api_key_id`
- `batch`
- `endpoint`
- `model`
- `org_id`
- `project_id`
- `project_name`
- `user_email`
- `user_id`

{{% /tab %}}
{{< /tabs >}}

Configura [Tag Pipelines][13] para mapear etiquetas OOTB (como `user_email`) a equipos, servicios o unidades de negocio para informes agregados:

{{< img src="cloud_cost/ai_costs/ccm-tag-pipeline-ai-costs.png" alt="La página de configuración de la regla de Tag Pipelines, que muestra los valores de user_email mapeados a valores de equipo a través de una tabla de referencia existente, y opciones adicionales de mapeo de etiquetas." responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

Después de mapear, el gasto atribuido aparece en tableros específicos del proveedor y en [Informes de Costos][14]:

{{< img src="cloud_cost/ai_costs/ccm-anthropic-ai-cost-reporting.png" alt="Un tablero específico del proveedor con un gráfico de barras apiladas que muestra el gasto diario del proveedor atribuido por equipo y nombre del modelo, y una lista resumen de las atribuciones de gasto." responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/cloud_cost_management/
[2]: /es/cloud_cost_management/setup/aws
[3]: /es/cloud_cost_management/setup/saas_costs/?tab=anthropic#configure-your-saas-accounts
[4]: /es/cloud_cost_management/setup/google_cloud
[5]: /es/cloud_cost_management/setup/saas_costs/?tab=openai#configure-your-saas-accounts
[6]: https://app.datadoghq.com/cost/summarize/ai-costs
[7]: /es/cloud_cost_management/cost_changes/anomalies/
[8]: /es/cloud_cost_management/cost_changes/monitors
[9]: /es/cloud_cost_management/planning/budgets
[10]: /es/cloud_cost_management/planning/forecasting
[11]: https://app.datadoghq.com/cost/explorer
[12]: /es/cloud_cost_management/allocation/custom_allocation_rules/?tab=even
[13]: /es/cloud_cost_management/allocation/tag_pipelines
[14]: /es/cloud_cost_management/reporting
[15]: /es/cloud_cost_management/setup/saas_costs/?tab=github#configure-your-saas-accounts
[16]: /es/cloud_cost_management/setup/saas_costs/?tab=cursor#configure-your-saas-accounts