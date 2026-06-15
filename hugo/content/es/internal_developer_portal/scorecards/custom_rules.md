---
aliases:
- /es/tracing/software_catalog/scorecards/custom_rules
- /es/tracing/service_catalog/scorecards/custom_rules
- /es/service_catalog/scorecards/custom_rules
- /es/software_catalog/scorecards/custom_rules
further_reading:
- link: /tracing/software_catalog/
  tag: Documentación
  text: Catálogo de software
- link: /api/latest/service-scorecards/
  tag: Documentación
  text: API de scorecards
- link: https://www.datadoghq.com/blog/service-scorecards/
  tag: Blog
  text: Priorizar y promover las prácticas de observabilidad recomendadas del servicio
    con scorecards
- link: https://www.datadoghq.com/blog/datadog-custom-scorecards/
  tag: Blog
  text: Formalizar las prácticas recomendadas con scorecards personalizadas
- link: /continuous_integration/dora_metrics/
  tag: Documentación
  text: Seguimiento de las métricas DORA con Datadog
title: Reglas personalizadas
---

Las reglas personalizadas te permiten codificar las expectativas de tu organización sobre tus componentes de software, equipos, etc. Tú decides los criterios de evaluación, la frecuencia y la entrada de datos. Puedes crear reglas personalizadas a través de la [API Scorecards][2] o a través de [Datadog Workflow Automation][9]. Si no estás familiarizado con el producto Workflow Automation, puedes empezar [a crear tu primera regla personalizada de Scorecards con IA][10].


## Creación de reglas personalizadas

Para añadir y evaluar reglas personalizadas mediante la [API de Scorecards][2]:

1. Especifica el nombre de la regla, la scorecard a la que pertenece, una descripción de la regla y un propietario para pasarla a `/scorecard/rules`.
2. Envía un resultado `pass`, `fail` o `skip` por cada tupla `{rule, entity}` que estés evaluando a `/scorecard/outcomes/batch`.
3. Ve un resumen de los resultados y las observaciones en el dashboard de Scorecards.

Tras la configuración inicial, las reglas también pueden activarse o desactivarse a través de la API. 


Para evaluar y añadir reglas personalizadas en la interfaz de Scorecards: 

1. Haz clic en **Create Rule** (Crear regla) en la página de scorecards.
2. Especifica el nombre de la regla, la scorecard a la que pertenece, una descripción de la regla, el equipo propietario, a qué nivel pertenece la regla y un contexto de aplicación, si es necesario.
3. Ve a la regla que creaste y selecciona **Edit Outcome** (Editar resultado), junto a la entidad que quieres evaluar.
4. Selecciona el resultado pertinente de `pass`, `fail` o `skip` y añade una observación opcional que describa el motivo del resultado. 
5. Ve un resumen de los resultados y las observaciones en el dashboard de Scorecards.

{{< img src="/tracing/software_catalog/scorecard-create-and-update-rule-ui.mp4" alt="Usuario crea y evalúa una regla personalizada en la interfaz de usuario de scorecards" video="true" style="width:90%;" >}}

## Evaluar reglas personalizadas mediante Workflow Automation

Workflow Automation te permite automatizar la evaluación de tus reglas personalizadas en Datadog utilizando la acción [**Update scorecard rule outcome** (Actualizar resultado de regla de scorecard)][3]. 

Cuando creas una regla personalizada, puedes evaluarla utilizando una de las siguientes opciones:
- **Añadir flujo de trabajo**:
  - Crea un flujo de trabajo desde cero.
  - Crea un flujo de trabajo a partir de un [plano de scorecards][4].
  - Vincula un flujo de trabajo personalizado existente.
- **Utiliza la [API de scorecards][8]**.

{{< img src="tracing/internal_developer_portal/custom-evaluation-prompt.png" alt="Panel lateral de reglas personalizadas que muestra dos opciones para evaluar esa regla: Add Workflow (Añadir flujo de trabajo) y Explore the Scorecards API (Explorar la API de scorecards)" style="width:100%;" >}}

### Crear un flujo de trabajo

Después de crear tu regla personalizada, elige la opción **Add Workflow** (Añadir flujo de trabajo) cuando se te pida que configures tus criterios de evaluación. A partir de ahí, puedes crear un flujo de trabajo desde cero o utilizar un plano.

{{% collapse-content title="Desde cero" level="h4" expanded=false id="workflow-from-scratch" %}}

{{< img src="/tracing/software_catalog/scorecards_workflow_example.png" alt="Flujo de trabajo que evalúa si una entidad tiene un nivel definido en el Catálogo de software" style="width:90%;" >}}

Para crear un flujo de trabajo desde cero: 

1. Configura un cronograma para la ejecución de tu flujo de trabajo.
1. Haz clic en el icono más (+) para añadir un paso.
1. Selecciona la acción [**List entity definitions** (Listar definiciones de entidades)][6] para recuperar todas las entidades definidas del Catálogo de software.
1. Haz clic en el icono más (+) para añadir un paso.
1. Selecciona [For loop (Para bucle)][7] para iterar sobre cada entidad una a una.
1. Selecciona la acción necesaria para recuperar tus datos de evaluación (por ejemplo: "List Monitors" (Listar monitores) o "Get Repository Content" (Obtener contendio de repositorio) de GitHub).
1. Transforma los datos devueltos mediante una función JavaScript personalizada para generar resultados de aprobado/no aprobado para cada entidad.
1. Utiliza la acción [**Update scorecard rule outcome** (Actualizar resultado de regla de scorecard)][3] para enviar los resultados a Scorecards.
1. Ejecuta el flujo de trabajo para ver tus evaluaciones de tu regla personalizada aparecer en scorecards.
1. Publica tu flujo de trabajo. Los flujos de trabajo no publicados no se ejecutan automáticamente.

{{% /collapse-content %}}

{{% collapse-content title="A partir de un plano" level="h4" expanded=false id="workflow-from-blueprint" %}}

{{< img src="/tracing/internal_developer_portal/start-from-blueprint2.png" alt="'Modal 'Start from a blueprint' (Empezar a partir de un plano) en la aplicación Datadog que muestra algunos cuadros con planos de scorecards" style="width:90%;" >}}

En lugar de crear un flujo de trabajo desde cero, puedes empezar con un plano de scorecard:

1. Explora los [planos de scorecards][4] y selecciona uno.
1. Edita el plano para crear tu flujo de trabajo personalizado.

   **Nota**: Todos los planos de scorecards incluyen la acción [**Update scorecard rule outcome** (Actualizar resultado de regla de scorecard)][3] para enviar los resultados a scorecards. No elimines este paso.

1. Ejecuta el flujo de trabajo para ver tus evaluaciones de tu regla personalizada aparecer en scorecards.
1. Publica tu flujo de trabajo. Los flujos de trabajo no publicados no se ejecutan automáticamente.

{{% /collapse-content %}}

Una vez creado el flujo de trabajo, este se vincula automáticamente a la regla de scorecard. Haz clic en el enlace para abrir el flujo de trabajo, realizar cambios y ver detalles como el propietario, el historial de ejecución y la fecha de la última modificación.

{{< img src="tracing/internal_developer_portal/linked-workflow.png" alt="Panel detallado de una scorecard individual donde se resalta la automatización del flujo de trabajo vinculado" style="width:100%;" >}}

Todos los flujos de trabajo creados desde  la página de scorecards o desde un plano de scorecards se etiquetan automáticamente con `source: scorecards` para su búsqueda y filtrado.

**Nota**: Al hacer clic en el botón rojo de desvinculación de una regla de scorecard, se elimina el flujo de trabajo de la regla, pero no se despublica automáticamente el flujo de trabajo. Para evitar que se ejecuten evaluaciones, también debes despublicar los flujos de trabajo desvinculados.

### Vincular flujo de trabajo existente

Después de crear tu regla personalizada, elige la opción **Add Workflow** (Añadir flujo de trabajo) para configurar sus criterios de evaluación. Busca y selecciona un flujo de trabajo existente para vincularlo a la regla. 

También puedes vincular un flujo de trabajo existente a cualquier regla personalizada que ya genere resultados:
1. Haz clic en la regla personalizada.
1. Selecciona **Link Workflow** (Vincular flujos de trabajo).
1. Busca un flujo de trabajo y selecciónalo para vincularlo a la regla.

{{< img src="tracing/internal_developer_portal/link-workflow.png" alt="Panel detallado de una regla personalizada individual con una flecha que destaca el botón <b>Link Workflow<b> (Vincular flujo de trabajo)" style="width:100%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/software_catalog/scorecards/scorecard_configuration/
[2]: /es/api/latest/service-scorecards/
[3]: https://app.datadoghq.com/workflow/action-catalog#com.datadoghq.dd/com.datadoghq.dd.software_catalog/com.datadoghq.dd.software_catalog.updateScorecardRuleOutcome
[4]: https://app.datadoghq.com/workflow/blueprints?selected_category=SCORECARDS
[5]: /es/service_management/workflows/build/
[6]: https://app.datadoghq.com/actions/action-catalog#/com.datadoghq.dd.softwarecatalog.listCatalogEntity
[7]: https://app.datadoghq.com/workflow/action-catalog#//com.datadoghq.core.forLoop
[8]: /es/api/latest/service-scorecards/
[9]: /es/actions/workflows/
[10]: /es/actions/workflows/build/#create-a-workflow-with-ai