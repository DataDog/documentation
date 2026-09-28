---
aliases:
- /es/cloud_cost_management/tag_pipelines/
- /es/cloud_cost_management/tags/tag_pipelines/
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Obtenga información sobre Cloud Cost Management
- link: /getting_started/tagging/
  tag: Documentación
  text: Primeros pasos con las etiquetas
- link: /integrations/guide/reference-tables
  tag: Documentación
  text: Obtenga información sobre las Reference Tables
- link: https://www.datadoghq.com/blog/cloud-cost-management-ai-costs/
  tag: Blog
  text: Atribuya los costos de IA entre proveedores con Datadog Cloud Cost Management
- link: https://www.datadoghq.com/blog/cloud-cost-management-oci
  tag: Blog
  text: Administre y optimice sus costos de OCI con Datadog Cloud Cost Management
title: Tag Pipelines
---
## Descripción general {#overview}

Las etiquetas son la base para todo el análisis y la asignación de Cloud Cost Management. Le permiten desglosar los gastos por servicio, equipo, proyecto, entorno o cualquier dimensión relevante para su negocio. Tag Pipelines aplican el uso de etiquetas estandarizadas en sus recursos en la nube y ayudan a garantizar una atribución de costos precisa y coherente en toda su organización.

Con [Tag Pipelines][1], puede crear reglas de etiquetas para solucionar las etiquetas faltantes o incorrectas en sus facturas de la nube. También puede crear nuevas etiquetas inferidas que se alineen con una lógica de negocio específica para mejorar la precisión de su seguimiento de costos. Estas etiquetas estandarizadas potencian todas las capacidades de análisis de costos, incluida la asignación de costos de contenedor, las reglas de asignación personalizadas y las recomendaciones de costos.

Tag Pipelines se aplican a las métricas de Cloud Cost de todos los proveedores. Las reglas que cree afectan a todos los datos de costos y recomendaciones de costos, garantizando la coherencia en los dashboards, monitores y los informes de asignación.

Cuando se modifican las Tag Pipelines, las nuevas reglas se aplican automáticamente a los datos de los últimos tres meses. La actualización de los datos históricos puede tardar hasta 24 horas en completarse después de agregar o modificar reglas.

Todos los usuarios nuevos tienen habilitada de forma predeterminada la regla recomendada para [activar la normalización de etiquetas][6].

## Crear un conjunto de reglas {#create-a-ruleset}

Puede administrar los conjuntos de reglas de Tag Pipelines mediante la [API][7], [Terraform][8] o directamente en Datadog siguiendo las instrucciones a continuación.

Para crear un conjunto de reglas, navegue a [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Tag Pipelines{{< /ui >}}][1].

<div class="alert alert-danger"> Puede crear hasta 100 reglas. Las tablas de referencia basadas en API no son compatibles. </div>

Antes de crear reglas individuales, cree un conjunto de reglas (una carpeta para sus reglas) haciendo clic en {{< ui >}}+ New Ruleset{{< /ui >}}.

Dentro de cada conjunto de reglas, haga clic en {{< ui >}}+ Add New Rule{{< /ui >}} y seleccione un tipo de regla: {{< ui >}}Add tag{{< /ui >}}, {{< ui >}}Alias tag keys{{< /ui >}} o {{< ui >}}Map multiple tags{{< /ui >}}. Estas reglas se ejecutan en un orden secuencial y determinista de arriba a abajo.

{{< img src="cloud_cost/pipelines-create-ruleset-1.png" alt="Una lista de reglas de etiquetas en la página de Tag Pipelines que muestra varias categorías como equipo, cuenta, servicio, departamento, unidad de negocio y más" style="width:60%;" >}}

Puede organizar las reglas y los conjuntos de reglas para ayudar a garantizar que el orden de ejecución coincida con su lógica de negocio.

### Agregar etiqueta {#add-tag}

Agregue una nueva etiqueta (clave + valor) basada en la presencia de etiquetas existentes en sus datos de Cloud Cost.

Por ejemplo, puede crear una regla para etiquetar todos los recursos con su unidad de negocio según los servicios de los que forman parte esos recursos.

{{< img src="cloud_cost/pipelines-add-tag-2.png" alt="Agregue una nueva etiqueta de unidad de negocio a los recursos con servicio:process-agent o servicio:process-billing." style="width:60%;" >}}

En la sección {{< ui >}}Additional options{{< /ui >}}, tiene las siguientes opciones:

- {{< ui >}}Action when tag `{tag}` exists{{< /ui >}} - Elija qué hacer si la etiqueta especificada (`business-unit` en el ejemplo anterior) ya existe:
  - {{< ui >}}Don't apply the rule{{< /ui >}} - Omite la regla si la etiqueta ya existe, conservando el valor original.
  - {{< ui >}}Append the tag{{< /ui >}} - Agrega el nuevo valor a la etiqueta existente sin eliminar el valor original.
  - {{< ui >}}Replace the tag{{< /ui >}} - Reemplaza el valor de la etiqueta existente con el nuevo valor. <div class="alert alert-warning">El reemplazo de etiquetas puede sobrescribir los datos existentes. Use esta opción con precaución.</div>
- {{< ui >}}Apply case-insensitive matching to resource tags{{< /ui >}} - Permite que las etiquetas definidas en el campo `To resources with tag(s)` y las etiquetas de los datos de costos no distingan entre mayúsculas y minúsculas. Por ejemplo, si las etiquetas de recursos de la interfaz de usuario son: `foo:bar` y la etiqueta de los datos de costos es `Foo:bar`, entonces ambas pueden coincidir.

### Alias de claves de etiqueta {#alias-tag-keys}

Asigne los valores de etiqueta existentes a una etiqueta más estandarizada.

Por ejemplo, si su organización desea utilizar la clave de etiqueta `application` estándar, pero varios equipos tienen una variación de esa etiqueta (como `app`, `webapp` o `apps`), puede crear un alias de `apps` a `application`. Cada regla de etiqueta de alias le permite asignar un máximo de 25 claves de etiqueta a una nueva etiqueta.

{{< img src="cloud_cost/pipelines-alias-tag-4.png" alt="Agregue la etiqueta de aplicación a los recursos con la etiqueta app, webapp o apps." style="width:60%;" >}}

Agregue la etiqueta de aplicación a los recursos con las etiquetas `app`, `webapp` o `apps`. La regla deja de ejecutarse para cada recurso después de encontrar la primera coincidencia. Por ejemplo, si un recurso ya tiene una etiqueta `app`, entonces la regla ya no intenta identificar una etiqueta `webapp` o `apps`.

En la sección {{< ui >}}Additional options{{< /ui >}}, tiene las siguientes opciones:

- {{< ui >}}Action when tag `{tag}` exists{{< /ui >}} - Elija qué hacer si la etiqueta especificada (`application` en el ejemplo anterior) ya existe:
  - {{< ui >}}Don't apply the rule{{< /ui >}} - Omite la regla si la etiqueta ya existe, conservando el valor original.
  - {{< ui >}}Append the tag{{< /ui >}} - Agrega el nuevo valor a la etiqueta existente sin eliminar el valor original.
  - {{< ui >}}Replace the tag{{< /ui >}} - Reemplaza el valor de la etiqueta existente con el nuevo valor. <div class="alert alert-warning">El reemplazo de etiquetas puede sobrescribir los datos existentes. Use esta opción con precaución.</div>
- {{< ui >}}Apply case-insensitive matching to resource tags{{< /ui >}} - Permite que las etiquetas definidas en las claves de etiqueta de alias y las etiquetas de los datos de costos no distingan entre mayúsculas y minúsculas. Por ejemplo, si las etiquetas de recursos de la interfaz de usuario son: `app:bar` y la etiqueta de los datos de costos es `App:bar`, entonces ambas pueden coincidir.

### Asignar varias etiquetas {#map-multiple-tags}

Use [Reference Tables][2] para agregar varias etiquetas a los datos de costos sin crear varias reglas. Esto asigna los valores de la columna de clave principal de su Reference Table a los valores de las etiquetas de costos. Si se encuentra, la canalización agrega las columnas de la Reference Table seleccionada como etiquetas a los datos de costos.

Por ejemplo, si desea agregar información sobre a qué vicepresidencias, organizaciones y unidades de negocio pertenecen las diferentes cuentas de AWS y Azure, puede crear una tabla y asignar las etiquetas.

{{< img src="cloud_cost/pipelines-map-multiple-tags-2.png" alt="Agregue metadatos de cuenta como customer_name usando Reference Tables para Tag Pipelines" style="width:60%;" >}}

Similar a [Alias tag keys](#alias-tag-keys), la regla deja de ejecutarse para cada recurso después de encontrar la primera coincidencia. Por ejemplo, si se encuentra un `application`, entonces la regla ya no intenta encontrar un `subscription_id`.

En la sección {{< ui >}}Additional options{{< /ui >}}, tiene las siguientes opciones:

- {{< ui >}}Action when column exists{{< /ui >}} - Elija qué hacer si las columnas especificadas ya existen:
  - {{< ui >}}Don't apply the rule{{< /ui >}} - Omite la regla si las columnas ya existen, conservando los valores originales.
  - {{< ui >}}Append the column{{< /ui >}} - Agrega los nuevos valores a las columnas existentes sin eliminar los valores originales.
  - {{< ui >}}Replace the column{{< /ui >}} - Reemplaza los valores de columna existentes con los nuevos valores. <div class="alert alert-warning">Reemplazar columnas puede sobrescribir datos existentes. Use esta opción con precaución.</div>
- {{< ui >}}Apply case-insensitive matching for primary key values{{< /ui >}} - Habilita la coincidencia sin distinción entre mayúsculas y minúsculas entre el valor de la clave principal de la tabla de referencia y el valor de la etiqueta en los datos de costos donde la clave de etiqueta coincide con la clave principal. Por ejemplo, si el par de valores de clave principal de la interfaz de usuario es `foo:Bar` y la etiqueta de los datos de costos es `foo:bar`, entonces ambos pueden coincidir.

## Reserved tags {#reserved-tags}

Ciertas etiquetas como `env` y `host` son [reserved tags][4] y forman parte del [Unified Service Tagging][3]. La etiqueta `host` no se puede agregar en Tag Pipelines.

El uso de etiquetas ayuda a correlacionar sus métricas, traces, procesos y logs. Reserved tags como `host` brindan visibilidad y un monitoreo efectivo en toda su infraestructura. Para obtener una correlación óptima y insights accionables, utilice estas etiquetas reservadas como parte de su tagging strategy en Datadog.

## Eliminar etiquetas {#delete-tags}
Para eliminar una etiqueta creada mediante Tag Pipelines, elimine la regla que la creó. En un plazo de 24 horas, la etiqueta se elimina automáticamente de los datos de los últimos tres meses. Para eliminar la etiqueta de datos más antiguos, comuníquese con el [soporte de Datadog][5].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/tag-pipelines
[2]: /es/integrations/guide/reference-tables/?tab=manualupload
[3]: /es/getting_started/tagging/unified_service_tagging/
[4]: /es/getting_started/tagging/
[5]: /es/help/
[6]: /es/cloud_cost_management/tags#how-tags-are-normalized
[7]: /es/api/latest/cloud-cost-management/#create-tag-pipeline-ruleset
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/tag_pipeline_ruleset