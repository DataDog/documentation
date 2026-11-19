---
aliases:
- /es/tracing/software_catalog/scorecards/custom_rules
- /es/tracing/service_catalog/scorecards/custom_rules
- /es/service_catalog/scorecards/custom_rules
- /es/software_catalog/scorecards/custom_rules
description: Cree reglas personalizadas de Scorecard con una consulta DDSQL, la API
  de Scorecards o Workflow Automation para codificar las expectativas de su organización
  respecto de los componentes de software.
further_reading:
- link: /internal_developer_portal/catalog/
  tag: Documentación
  text: Catalog
- link: /api/latest/service-scorecards/
  tag: Documentación
  text: Scorecards API
- link: https://www.datadoghq.com/blog/service-scorecards/
  tag: Blog
  text: Priorice y promueva las mejores prácticas de observabilidad de servicio con
    Scorecards
- link: https://www.datadoghq.com/blog/datadog-custom-scorecards/
  tag: Blog
  text: Formalice las mejores prácticas con Scorecards personalizados
- link: /delivery_performance/dora_metrics/
  tag: Documentación
  text: Realice un seguimiento de DORA Metrics con Datadog
title: Reglas personalizadas
---
Las reglas personalizadas le permiten codificar las expectativas de su organización sobre sus componentes de software, equipos y más. Usted decide los criterios de evaluación, la frecuencia y la entrada de datos. Puede crear reglas personalizadas escribiendo una consulta [DDSQL][1] o enviando resultados a través de la [API de Scorecards][2] o [Datadog Workflow Automation][3].


## Crear reglas personalizadas {#create-custom-rules}

1. Navegue a la página [{{< ui >}}Scorecards{{< /ui >}}][4] y haga clic en {{< ui >}}Create Rule{{< /ui >}}.
2. Especifique el nombre de la regla, el scorecard al que pertenece, una descripción de la regla, el equipo propietario y a qué nivel pertenece la regla.
3. En {{< ui >}}Define evaluation logic{{< /ui >}}, elija cómo evalúa Datadog la regla:
   - {{< ui >}}Write a DDSQL Query{{< /ui >}}: utilice esta opción para reglas que evalúan datos disponibles en Datadog. Consulte [Evaluar reglas personalizadas mediante DDSQL](#evaluate-custom-rules-using-ddsql).
   - {{< ui >}}Use a Workflow or Scorecards API{{< /ui >}}: utilice esta opción para evaluar entidades y enviar resultados desde fuera de Scorecards. Consulte [Evaluar reglas personalizadas mediante Workflow Automation](#evaluate-custom-rules-using-workflow-automation) y [Evaluar reglas personalizadas mediante la API de Scorecards o la interfaz de usuario](#evaluate-custom-rules-using-the-scorecards-api-or-the-ui).

El contexto define a qué entidades se aplica una regla. Para las reglas que utilizan un flujo de trabajo o la API de Scorecards, especifique el contexto después de elegir el método de evaluación. El contexto debe incluir al menos un tipo de entidad y puede utilizar metadatos de las definiciones de entidad en IDP Catalog, como `kind`, `team` o `tier`. Para las reglas que utilizan DDSQL, defina el contexto en la cláusula `WHERE` de la consulta. Para obtener más información, consulte [Definir el contexto de las reglas de Scorecard][5].

Para cambiar la forma en que se evalúa una regla existente, edite la regla y seleccione una opción diferente en {{< ui >}}Define evaluation logic{{< /ui >}}. Si cambia una regla a DDSQL, debe ejecutar una prueba exitosa antes de poder guardarla, y Datadog eliminará cualquier flujo de trabajo vinculado de la regla. Si cambia una regla de DDSQL a un flujo de trabajo o a la API de Scorecards, Datadog eliminará la consulta DDSQL de la regla.

## Evaluar reglas personalizadas mediante DDSQL {#evaluate-custom-rules-using-ddsql}

Su consulta debe:

- Devolver un `entity_kind`, un `entity_key` y un `state` para cada entidad.
- Establecer `state` en `pass`, `fail` o `skip`.
- Usar la cláusula `WHERE` para definir el contexto de la regla.

Después de seleccionar {{< ui >}}Write a DDSQL Query{{< /ui >}}:

{{< img src="/internal_developer_portal/scorecards/custom_rule_ddsql.png" alt="La página New Rule con una consulta DDSQL que verifica si cada servicio tiene un enlace a documentos, un resultado de prueba exitoso y una vista previa de las entidades que pasan y fallan." style="width:100%;" >}}

1. Escriba su consulta en el editor. Reemplace cada marcador de posición en la plantilla de consulta, o copie una consulta completa desde la pestaña {{< ui >}}Examples{{< /ui >}} en el panel {{< ui >}}DDSQL Help{{< /ui >}}. Use la pestaña {{< ui >}}Data Sources{{< /ui >}} para ver las fuentes de datos y columnas disponibles.
   - Opcionalmente, haga clic en {{< ui >}}Ask Bits{{< /ui >}} para abrir Bits Chat y redactar una consulta a partir de su prompt.
2. Haga clic en {{< ui >}}Run Test{{< /ui >}} para evaluar la consulta en todas las entidades dentro del contexto. Debe ejecutar una prueba exitosa antes de poder guardar la regla.
3. Revise los resultados en el panel {{< ui >}}Preview{{< /ui >}}.
4. Haga clic en {{< ui >}}Create Rule{{< /ui >}}. Datadog evalúa la consulta cada 4 horas y actualiza un resultado solo si este cambió.
5. En la página de la regla, vea la consulta y una descripción general de los resultados:
   - La sección {{< ui >}}Evaluation{{< /ui >}} muestra cuándo se ejecutó la consulta correctamente por última vez.
   - La columna {{< ui >}}Last Updated{{< /ui >}} muestra la última vez que cambió un resultado.
   - Para editar la consulta, haga clic en {{< ui >}}Edit{{< /ui >}}.

## Evaluar reglas personalizadas mediante la API de Scorecards o la interfaz de usuario {#evaluate-custom-rules-using-the-scorecards-api-or-the-ui}

Puede enviar resultados para una regla personalizada desde sus propios sistemas a través de la API de Scorecards, o establecerlos manualmente para cada entidad en la interfaz de usuario de Scorecards.

### Usar la API de Scorecards {#use-the-scorecards-api}

Para agregar y evaluar reglas personalizadas mediante la [API de Scorecards][2]:

1. Especifique el nombre, el scorecard, la descripción, el propietario, el nivel y el contexto de la regla. Pase estos valores a `/scorecard/rules`.
2. Para cada tupla `{rule, entity}` que evalúe, envíe un resultado de `pass`, `fail` o `skip` a `/scorecard/outcomes/batch`. Opcionalmente, incluya un comentario que describa el motivo del resultado.
3. Vea una descripción general de los resultados y comentarios en el panel de Scorecards.

Después de la configuración inicial, las reglas también pueden habilitarse o deshabilitarse a través de la API.

### Usar la interfaz de usuario de Scorecards {#use-the-scorecards-ui}

Para evaluar una regla personalizada manualmente en la interfaz de usuario de Scorecards, primero cree la regla como se describe en [Crear reglas personalizadas](#create-custom-rules). Luego:

1. Navegue a la regla que creó y seleccione {{< ui >}}Edit Outcome{{< /ui >}} junto a la entidad que desea evaluar.
2. Seleccione el resultado relevante de `pass`, `fail` o `skip` y agregue un comentario opcional que describa el motivo del resultado. 
3. Vea una descripción general de los resultados y comentarios en el panel de Scorecards.

## Evaluar reglas personalizadas mediante Workflow Automation {#evaluate-custom-rules-using-workflow-automation}

Workflow Automation le permite automatizar la evaluación de sus reglas personalizadas en Datadog mediante la acción [{{< ui >}}Update scorecard rule outcome{{< /ui >}}][6]. 

### Crear un flujo de trabajo {#create-workflow}

Después de crear su regla personalizada, elija la opción {{< ui >}}Add Workflow{{< /ui >}} cuando se le solicite configurar sus criterios de evaluación. Desde ahí, puede crear un flujo de trabajo desde cero o utilizar una plantilla.

{{% collapse-content title="Desde cero" level="h4" expanded=false id="workflow-from-scratch" %}}

{{< img src="/tracing/software_catalog/scorecards_workflow_example.png" alt="Flujo de trabajo que evalúa si una entidad tiene un nivel definido en Catalog" style="width:90%;" >}}

Para crear un flujo de trabajo desde cero: 

1. Establezca un horario para la ejecución de su flujo de trabajo.
1. Haga clic en el icono de más ({{< ui >}}\+{{< /ui >}}) para añadir un paso.
1. Seleccione la [acción {{< ui >}}List entity definitions{{< /ui >}}][7] para obtener todas las entidades definidas en Catalog.
1. Haga clic en el icono de más ({{< ui >}}\+{{< /ui >}}) para añadir un paso.
1. Seleccione [{{< ui >}}For loop{{< /ui >}}][8] para iterar sobre cada entidad una por una.
1. Seleccione la acción necesaria para obtener sus datos de evaluación (por ejemplo: {{< ui >}}List monitors{{< /ui >}} o {{< ui >}}Get repository content{{< /ui >}} de GitHub). 
1. Transforme los datos devueltos mediante una función de JavaScript personalizada para generar resultados de aprobado/reprobado para cada entidad.
1. Utilice la [acción {{< ui >}}Update scorecard rule outcome{{< /ui >}}][6] para enviar los resultados a Scorecards.
1. Ejecute el flujo de trabajo para ver cómo aparecen sus evaluaciones en Scorecards para su regla personalizada.
1. Publique el flujo de trabajo; los flujos de trabajo no publicados no se ejecutan automáticamente. 

{{% /collapse-content %}}

{{% collapse-content title="Desde una plantilla" level="h4" expanded=false id="workflow-from-blueprint" %}}

En lugar de crear un flujo de trabajo desde cero, puede comenzar con una plantilla de Scorecards: 

1. Explore [plantillas de Scorecards][9] y seleccione una. 
1. Edite la plantilla para crear su flujo de trabajo personalizado. 
   
   **Nota**: Todas las plantillas de Scorecards incluyen la [acción {{< ui >}}Update scorecard rule outcome{{< /ui >}}][6] para enviar los resultados a Scorecards. No elimine este paso.

1. Ejecute el flujo de trabajo para ver cómo aparecen sus evaluaciones en Scorecards para su regla personalizada.
1. Publique el flujo de trabajo; los flujos de trabajo no publicados no se ejecutan automáticamente. 

{{% /collapse-content %}}

Después de crear el flujo de trabajo, este se vincula automáticamente a la regla de Scorecard. Haga clic en el enlace para abrir el flujo de trabajo, realizar cambios y ver detalles como el propietario, el historial de ejecución y la fecha de última modificación.

{{< img src="/internal_developer_portal/scorecards/linked-workflow.png" alt="El panel detallado de un Scorecard individual, que resalta la automatización del flujo de trabajo vinculado" style="width:100%;" >}}

Todos los flujos de trabajo creados desde la página {{< ui >}}Scorecards{{< /ui >}} o desde una plantilla de Scorecards se etiquetan automáticamente con `source: scorecards` para su búsqueda y filtrado. 

**Nota**: Hacer clic en el botón rojo de desvincular en una regla de Scorecard elimina el flujo de trabajo de la regla, pero no despublica automáticamente el flujo de trabajo. Para evitar que se ejecuten las evaluaciones, también debe despublicar cualquier flujo de trabajo desvinculado.

### Vincular flujo de trabajo existente {#link-existing-workflow}

Después de crear su regla personalizada, elija la opción {{< ui >}}Add Workflow{{< /ui >}} para configurar sus criterios de evaluación. Busque y seleccione un flujo de trabajo existente para vincularlo a la regla. 

También puede vincular un flujo de trabajo existente a cualquier regla personalizada que ya genere resultados:
1. Haga clic en la regla personalizada.
1. Seleccione {{< ui >}}Link Workflow{{< /ui >}}.
1. Busque un flujo de trabajo y selecciónelo para vincularlo a la regla.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/ddsql_reference/
[2]: /es/api/latest/service-scorecards/
[3]: /es/actions/workflows/
[4]: https://app.datadoghq.com/software/scorecards
[5]: /es/internal_developer_portal/scorecards/scorecard_configuration/#scope-scorecard-rules
[6]: https://app.datadoghq.com/workflow/action-catalog#com.datadoghq.dd/com.datadoghq.dd.software_catalog/com.datadoghq.dd.software_catalog.updateScorecardRuleOutcome
[7]: https://app.datadoghq.com/actions/action-catalog#/com.datadoghq.dd.softwarecatalog.listCatalogEntity
[8]: https://app.datadoghq.com/workflow/action-catalog#//com.datadoghq.core.forLoop
[9]: https://app.datadoghq.com/workflow/blueprints?selected_category=SCORECARDS