---
aliases:
- /es/graphing/dashboards/template_variables/correlate-metrics-and-events-using-dashboard-template-variables
- /es/graphing/dashboards/template_variables/how-do-i-overlay-events-onto-my-dashboards
- /es/graphing/dashboards/template_variables/
description: Utilice variables de plantilla para filtrar dinámicamente los widgets
  de los tableros por etiquetas, atributos y facetas para una exploración de datos
  flexible.
further_reading:
- link: /dashboards/
  tag: Documentación
  text: Cree tableros en Datadog
- link: /dashboards/sharing/
  tag: Documentación
  text: Comparta sus gráficos fuera de Datadog
- link: /dashboards/widgets/
  tag: Documentación
  text: Descubra widgets para su tablero
- link: https://www.datadoghq.com/blog/datadog-executive-dashboards
  tag: Blog
  text: Diseñe tableros ejecutivos efectivos con Datadog
- link: https://www.datadoghq.com/blog/zendesk-cost-optimization
  tag: Blog
  text: 'Optimizando Datadog a gran escala: Observabilidad rentable en Zendesk'
- link: https://www.datadoghq.com/blog/template-variable-associated-values/
  tag: Blog
  text: Utilice variables de plantilla asociadas para refinar sus tableros
- link: https://www.datadoghq.com/blog/dynamic-template-variable-syntax-dashboards/
  tag: Blog
  text: Acelere los flujos de trabajo de los tableros con la sintaxis dinámica de
    variables de plantilla
- link: https://www.datadoghq.com/blog/template-variable-available-values/
  tag: Blog
  text: Filtre tableros más rápido con los valores disponibles de variables de plantilla
title: Variables de Plantilla
---
## Resumen {#overview}

Las variables de plantilla le permiten filtrar o agrupar dinámicamente los widgets en un tablero. Cree vistas guardadas a partir de sus selecciones de variables de plantilla para organizar y navegar por sus visualizaciones mediante las selecciones desplegables.

Una variable de plantilla se define por:

* {{< ui >}}Tag or Attribute{{< /ui >}}:
    * Etiqueta: Si sigue el [formato de etiquetado recomendado][1] (`<KEY>:<VALUE>`), la *Etiqueta* es el `<KEY>`.
    * Atributo: Utiliza una [faceta o medida como la variable de plantilla](#logs-apm-and-rum-queries).
* {{< ui >}}Name{{< /ui >}}: Un nombre único para la variable de plantilla que aparece en las consultas del tablero. Las variables de plantilla se nombran automáticamente según la etiqueta o atributo seleccionado.
* {{< ui >}}Default Value{{< /ui >}}: El valor de la etiqueta o atributo que aparece automáticamente cuando se carga el tablero. Por defecto es `*`.
* {{< ui >}}Available Values{{< /ui >}}: Los valores de la etiqueta o atributo disponibles para selección en el menú desplegable. Por defecto es `(all)`. La lista de valores disponibles siempre incluye `*`, que consulta todos los valores de la etiqueta o atributo.

### Valores de variables de plantilla {#template-variable-values}
Los valores de las variables de plantilla (valores disponibles mediante los menús desplegables de variables de plantilla) se completan según las fuentes que utilizan los widgets en el tablero. Por ejemplo, si su tablero tiene widgets que consultan registros, solo se muestran los valores de los registros. Si su tablero tiene widgets que consultan registros, métricas y RUM, se muestran los valores de registros, métricas y RUM.

Para la mayoría de las fuentes, los valores de las variables de plantilla son relevantes para el marco de tiempo global de su tablero. Por ejemplo:
- Si el marco de tiempo de su tablero está configurado para los últimos 15 minutos, solo se muestran los valores de las variables de plantilla de los últimos 15 minutos. 
- Si el marco de tiempo de su tablero está configurado para el 15 de agosto pasado de 12:00 a.m. a 11:59 p.m., solo se muestran los valores de ese marco de tiempo.

| Fuente de datos                                     | Período de consulta de datos   |
|--------------------------------------           |---------------------|
| Métricas                                         | Ahora - 48 horas      |
| Costo en la nube                                      | Ahora - 48 horas      |
| Todas las demás fuentes                               | Marco de tiempo del tablero |

**Nota**: Si no ve la etiqueta o atributo que está buscando, puede ser porque esos datos no se han reportado a Datadog recientemente. Además, todos los datos consultados para las variables de plantilla están sujetos a la política de retención de datos. Para más información, consulte [Datos Históricos][4].

### Diseño del tablero {#dashboard-layout}
Para evitar que las variables saturen el encabezado, el panel muestra un pequeño subconjunto. Puede hacer clic en el botón **+ N** para ver las N variables adicionales presentes en su tablero. 


Si necesita ver todas las variables a la vez mientras se desplaza, haga clic en **Expandir variables de plantilla**. 


## Agregue una variable de plantilla {#add-a-template-variable}
Para agregar una variable de plantilla en un tablero:
1. Haga clic en {{< ui >}}Add Variable{{< /ui >}} (o en {{< ui >}}+{{< /ui >}} si ya existen variables de plantilla)
2. Seleccione de una lista de variables de plantilla recomendadas o busque la etiqueta específica que tenga en mente.
4. Seleccione los widgets a los que se aplicará esta variable de plantilla.
6. Haga clic en {{< ui >}}Save{{< /ui >}}.


### Configure la variable de plantilla {#configure-template-variable}
Cuando el panel lateral de la variable de plantilla esté abierto, puede:
* Aplique (o quite) esta variable a los widgets seleccionados (note las opciones {{< ui >}}Select All{{< /ui >}} o {{< ui >}}Deselect All{{< /ui >}})
* Alterne entre filtrar y agrupar
* Cambie el nombre de visualización de la variable (mostrado en el encabezado y en la consulta del widget)
* Seleccione un valor predeterminado del menú desplegable
* Previsualice los valores del menú desplegable y configúrelos más a fondo con una consulta de búsqueda


## Edite una variable de plantilla {#edit-a-template-variable}
1. Pase el cursor sobre la variable de plantilla en el encabezado del tablero y haga clic en **Editar**. El panel lateral de la variable de plantilla aparece.
2. Utilice las opciones del panel para personalizar la variable o aplicarla a más widgets.


## Vistas guardadas {#saved-views}

### Cree {#create}

1. Haga clic en el menú desplegable {{< ui >}}Saved Views{{< /ui >}} a la izquierda de las variables de plantilla en su tablero. Cuando actualiza el valor de una variable de plantilla, el valor no se guarda automáticamente en una vista.
1. Para guardar los valores actuales de sus variables de plantilla en una vista, seleccione {{< ui >}}Save selections as view{{< /ui >}} del menú desplegable {{< ui >}}Saved Views{{< /ui >}}.
1. Ingrese un nombre único para la vista con una descripción opcional.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

{{< img src="/dashboards/template_variables/saved_view_create.png" alt="Cree vistas guardadas seleccionando guardar selecciones como vista" style="width:100%;" >}}

Su vista guardada aparece en el menú desplegable. Haga clic en la vista para recuperar los valores de variables de plantilla que guardó previamente.

### Elimine {#delete}

1. Haga clic en el menú desplegable de vistas guardadas y pase el cursor sobre la vista guardada deseada.
1. Haga clic en {{< ui >}}Delete View{{< /ui >}}.

### Modifique {#modify}

El {{< ui >}}Default view{{< /ui >}} solo puede ser editado cambiando los valores predeterminados de las variables de plantilla. Para editar la Vista Predeterminada:
1. Pase el cursor sobre las plantillas.
1. Haga clic en {{< ui >}}Edit{{< /ui >}} cuando aparezca el botón.
Haga clic en  para guardar.
1. Haga clic en {{< ui >}}Done{{< /ui >}} para guardar.

Para modificar los valores de las variables de plantilla para otras vistas guardadas:
1. Seleccione la vista guardada deseada del menú desplegable.
Edite las variables de plantilla para tener los nuevos modelos deseados.
Abra el menú desplegable nuevamente.
Haga clic en .
1. Edite las variables de plantilla para tener los nuevos modelos deseados.
1. Abra el menú desplegable nuevamente.
1. Haga clic en {{< ui >}}Save Changes{{< /ui >}}.

{{< img src="/dashboards/template_variables/saved_views_update_template_variable.png" alt="Modifique las variables de plantilla de sus vistas guardadas" style="width:100%;" >}}

Para editar el título y la descripción:
1. Pase el cursor sobre la vista guardada deseada del menú desplegable.
1. Haga clic en {{< ui >}}Edit{{< /ui >}}.
1. Modifique el título o la descripción.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

## Uso {#usage}

Las variables de plantilla se utilizan en widgets y superposiciones de eventos.

### Registros, consultas de APM y RUM {#logs-apm-and-rum-queries}

Las variables de plantilla funcionan con widgets de registros, APM y RUM porque comparten las mismas etiquetas. Puedes definir variables de plantilla de registros, APM y RUM basadas en facetas. Estas variables comienzan con `@`, por ejemplo: `@http.status_code`.

En widgets de registros, APM y RUM, puedes usar comodines en medio de un valor (por ejemplo, `eng*@example.com`) o usar múltiples comodines en un valor (por ejemplo, `*prod*`).

**Nota**: Usar {{< ui >}}Add to all{{< /ui >}} para este tipo de variable de plantilla agrega la variable a todos los widgets de log, APM y RUM.

### Widgets {#widgets}

Al crear o editar un widget, las variables de plantilla de filtro existentes se muestran como opciones en el campo `from`, y las variables de plantilla de agrupación existentes se muestran como opciones después del campo `by`. Por ejemplo, si configuras la variable de plantilla `environment`, la opción `$environment` está disponible como una variable dinámica en el widget.

{{< img src="dashboards/template_variables/dynamic_template_variable.png" alt="La variable de plantilla se puede establecer dinámicamente en los widgets." style="width:100%;">}}

Al seleccionar **producción** para el valor `environment`, se limitan dinámicamente los widgets con la variable `$environment` al entorno de producción.

Cuando cambia el valor de una variable de plantilla, la URL del tablero se actualiza para reflejar el valor de la variable de plantilla con el formato `&tpl_var_<TEMPLATE_VARIABLE_NAME>=<TEMPLATE_VARIABLE_VALUE>`. Por ejemplo, un tablero con la variable de plantilla `$env` cambiada a `prod` tendría el parámetro de URL `&tpl_var_env=prod`.

Para incluir el valor en la consulta, añádalo con la sintaxis `$<TEMPLATE_VARIABLE_NAME>.value`. Por ejemplo, con una variable de plantilla llamada `service`, use `env:staging-$service.value`.

Pase el cursor sobre los campos de la variable de plantilla para ver de un vistazo los widgets que utilizan esa variable resaltados en el tablero.

#### Variables de plantilla asociadas {#associated-template-variables}

Al seleccionar un valor de variable de plantilla, los valores asociados se muestran en la parte superior del selector. Los valores asociados se calculan a partir de otros valores de variables de plantilla seleccionados en la página, e identifican sin problemas los valores relacionados sin ninguna configuración.

#### Texto {#text}

Para widgets basados en texto, puede mostrar la etiqueta/atributo y el valor de una variable de plantilla con `$<TEMPLATE_VARIABLE_NAME>`, su clave con `$<TEMPLATE_VARIABLE_NAME>.key`, o su valor con `$<TEMPLATE_VARIABLE_NAME>.value`. Esto puede venir después de cualquier carácter no alfanumérico, y puede ser seguido por un espacio en blanco o cualquiera de los siguientes caracteres: `#`, `$`, `%`, `=`, `;`, `"`, `(`, `)`, `[`, `]`, `{`, `}`, `^`, `*`, `+`, `|`, y `?`.

**Nota**: La sintaxis de comodín no es compatible después de una variable de plantilla.

Por ejemplo, con una variable de plantilla llamada `env`, con etiqueta/atributo `environment`, y con un valor seleccionado de `dev`:
* `$env` muestra `environment:dev`
* `$env.key` muestra `environment`
* `$env.value` muestra `dev`
* `$env*` busca el valor exacto `dev*` NO `dev{dynamic-wildcard-value}`

### Superposición de eventos {#events-overlay}

Utilice la búsqueda de superposición de eventos con variables de plantilla para encontrar eventos que compartan ciertas etiquetas con las métricas en su tablero. La búsqueda de superposición de eventos se aplica a través de un gráfico individual.

Los valores de las variables de plantilla del tablero pueden ser capturados directamente utilizando la sintaxis `$<TEMPLATE_VARIABLE_KEY>.value` en el campo de búsqueda de eventos.

**Nota**: Las variables de plantilla del tablero deben ser etiquetas de métricas, no etiquetas de eventos.

#### Tablero {#dashboard}

Desde su tablero, busque eventos con variables de plantilla utilizando el formato:

```text
<TAG_KEY>:$<TEMPLATE_VARIABLE_NAME>.value
```

Por ejemplo, buscar `region:$region.value` con un valor de `us-east1` para la variable de plantilla `region` muestra eventos etiquetados con `region:us-east1`. Además, el tiempo de los eventos está marcado por barras rosas en los gráficos.

Utilice comas para buscar utilizando múltiples variables de plantilla, por ejemplo: `role:$role.value,env:$env.value`

**Nota**: Una vez que presione *enter* para buscar, `$region.value` se actualiza al valor en el menú desplegable de la variable de plantilla.

#### Widgets {#widgets-1}

Desde sus widgets, superponga el tiempo de los eventos utilizando variables de plantilla con el formato:

```text
$<TEMPLATE_VARIABLE_NAME>
```

Por ejemplo, ingrese `$region` en el cuadro de búsqueda de superposición de eventos. Esto busca eventos con el valor en el menú desplegable de la variable de plantilla `region`.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/#define-tags
[2]: /es/logs/explorer/facets/
[3]: /es/real_user_monitoring/explorer/?tab=facets#setup-facets-measures
[4]: /es/dashboards/faq/historical-data/