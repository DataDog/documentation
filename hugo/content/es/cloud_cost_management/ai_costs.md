---
description: Obtenga visibilidad unificada del gasto en IA entre proveedores, normalice
  los datos de costos y atribuya el uso a usuarios y equipos.
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Cloud Cost Management
- link: /cloud_cost_management/setup/saas_costs
  tag: Documentación
  text: Costos de SaaS e IA
- link: /cloud_cost_management/allocation/custom_allocation_rules
  tag: Documentación
  text: Reglas de asignación personalizadas
- link: /cloud_cost_management/allocation/tag_pipelines
  tag: Documentación
  text: Tag Pipelines
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
  text: Pronóstico
- link: https://www.datadoghq.com/blog/cloud-cost-management-ai-costs/
  tag: Blog
  text: Atribuya los costos de IA entre proveedores con Datadog Cloud Cost Management
- link: https://www.datadoghq.com/blog/making-agentic-token-costs-visible-in-production/
  tag: Blog
  text: Hacer visibles los costos de tokens de agentes en producción
- link: https://www.datadoghq.com/blog/cloud-cost-skill-bits-chat/
  tag: Blog
  text: Responda cualquier pregunta sobre costos más rápido con la habilidad Cloud
    Cost en Bits Chat.
- link: https://www.datadoghq.com/blog/how-datadog-saves-money-by-optimizing-ai-usage/
  tag: Blog
  text: Cómo Datadog ahorra más de $1 millón cada mes optimizando el uso de IA
- link: https://www.datadoghq.com/blog/federal-agencies-ai-spend-cloud-cost-management/
  tag: Blog
  text: 'Más allá de la era de la IA de $1: Cómo las agencias federales pueden construir
    la evidencia para las renovaciones del año fiscal 2027'
- link: https://www.datadoghq.com/blog/cursor-cloud-cost-management/
  tag: Blog
  text: Administre los costos de Cursor con Datadog Cloud Cost Management
title: Costos de IA
---
## Descripción general {#overview}

Costos de IA en Cloud Cost Management ofrece a los equipos de FinOps y de ingeniería un destino unificado para analizar el gasto en IA entre proveedores, incluidos Amazon Bedrock, Anthropic, Google Gemini, OpenAI, Vertex AI, GitHub Copilot y Cursor. Visualice el gasto total en IA junto con sus costos de infraestructura en la nube existentes, analícelo con etiquetas normalizadas, rastree anomalías de costos, identifique oportunidades de optimización y atribuya el uso a los usuarios y claves de API específicos que lo generan.

## Requisitos previos {#prerequisites}

Para usar Costos de IA, debe tener configurado al menos uno de los siguientes proveedores compatibles para [Cloud Cost Management][1]:

| Proveedor de IA | Método de configuración |
|---|---|
| Amazon Bedrock | [Integración con AWS][2] |
| Amazon SageMaker | [Integración con AWS][2] |
| Anthropic   | [Integración SaaS][3] |
| Azure Foundry   | [Integración con Azure][18] |
| Google Gemini  | [Integración con Google Cloud][4] |
| OpenAI     | [Integración SaaS][5] |
| Vertex AI  | [Integración con Google Cloud][4] |
| GitHub Copilot | [GitHub Copilot][15] |
| Cursor | [Cursor][16] |

## Resumen de costos de IA {#ai-cost-summary}

Después de conectar sus proveedores de IA, navegue a [**Cloud Cost** > **Summarize** > **AI**][6] para visualizar la página de resumen de costos de IA.

{{< img src="cloud_cost/ai_costs/ccm-ai-costs-overview.png" alt="El panel de resumen de costos de IA, que muestra las tendencias de gasto diario durante un período de un mes, una lista de los principales impulsores de costos y un gráfico de anomalía." responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

La página de resumen de costos de IA proporciona:

- **Costo total de IA**: Costo de IA agregado y cambio de costo durante el período de tiempo seleccionado.
- **Costo diario de IA**: Tendencias de costos diarios en los proveedores seleccionados durante el período de tiempo seleccionado. Use el menú desplegable **Filter to** para definir qué proveedores aparecen en el gráfico.
- **Principales impulsores de costos**: Los modelos, proyectos, servicios y usuarios que generan la mayor parte del gasto.
- **Anomalías de costos de IA activas**: [Anomalías][7] de costos detectadas de forma proactiva en todos los proveedores conectados. Seleccione una anomalía para abrir un panel lateral con más detalles y opciones para realizar más acciones.
- **Recomendaciones de costos de IA**: [Recomendaciones][17] de costos y oportunidades de optimización detectadas en todos los proveedores conectados. Seleccione una recomendación para abrir un panel lateral con más detalles y opciones para realizar más acciones.
- **Paneles de costos de IA**: Plantillas de panel listas para usar para cada proveedor compatible, que combinan datos de costos con señales de uso como el consumo de tokens, la distribución de modelos y el análisis de usuario.

## Etiquetas de IA normalizadas {#normalized-ai-tags}

Los datos de costos de IA de todos los proveedores compatibles se normalizan en un conjunto coherente de etiquetas. Utilice estas etiquetas para filtrar, agrupar, comparar y planificar el gasto en IA en paneles, [monitores][8], [presupuestos][9], [pronósticos][10] y otras herramientas de Datadog. Utilice [Cloud Cost Explorer][11] para consultar y comparar el gasto entre proveedores sin necesidad de escribir lógica por proveedor.

Las siguientes etiquetas están disponibles para todos los proveedores de IA compatibles:

| Nombre de la etiqueta&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Descripción de la etiqueta |
|---|---|
| `providername` | El proveedor de IA. |
| `model` | El identificador del modelo de IA (por ejemplo, `claude-opus-4-6`, `gpt-4.1`). |
| `model_name` | El nombre del modelo legible por humanos (por ejemplo, `Claude Opus 4.6`). |
| `token_direction` | Si los tokens se están consumiendo (entrada) o generando (salida) dentro de un servicio o aplicación. |
| `token_category` | La categoría específica de tokens consumidos, como tokens de entrada, tokens de salida o tokens relacionados con operaciones de almacenamiento en caché y búsqueda (por ejemplo, `cached input`, `cache write`, `standard input`, `output`). |
| `project` | El proyecto, espacio de trabajo o entorno al que pertenecen los costos de IA. |

## Atribuir el gasto de IA a las fuentes {#attribute-ai-spend-to-sources}

Las reglas de asignación listas para usar (OOTB) [12] utilizan datos de observabilidad de Datadog para atribuir los costos de IA a los usuarios, claves de API y otras fuentes que los generaron. Las reglas de asignación OOTB no requieren configuración y están disponibles para Anthropic y OpenAI. La asignación a nivel de usuario también es compatible con Cursor.


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

Configure [Tag Pipelines][13] para asignar etiquetas OOTB (como `user_email`) a equipos, servicios o unidades de negocio para informes agregados:

{{< img src="cloud_cost/ai_costs/ccm-tag-pipeline-ai-costs.png" alt="La página de Configuración de reglas de Tag Pipelines, que muestra los valores de user_email asignados a valores de equipo a través de una tabla de referencia existente, y opciones adicionales de asignación de etiquetas." responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

Después de la asignación, el gasto atribuido aparece en los paneles específicos del proveedor y en los [Cost Reports][14]:

{{< img src="cloud_cost/ai_costs/ccm-anthropic-ai-cost-reporting.png" alt="Un panel específico del proveedor con un gráfico de barras apiladas que muestra el gasto diario del proveedor atribuido por equipo y nombre de modelo, y una lista de resumen de las atribuciones de gasto." responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

## Lecturas adicionales {#further-reading}

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
[17]: /es/cloud_cost_management/recommendations
[18]: /es/cloud_cost_management/setup/azure/?tab=terraform