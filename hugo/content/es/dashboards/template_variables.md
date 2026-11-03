---
aliases:
- /es/graphing/dashboards/template_variables/correlate-metrics-and-events-using-dashboard-template-variables
- /es/graphing/dashboards/template_variables/how-do-i-overlay-events-onto-my-dashboards
- /es/graphing/dashboards/template_variables/
description: Utilice variables de plantilla para filtrar dinámicamente los widgets
  del Dashboard por etiquetas, atributos y facetas para una exploración de datos flexible.
further_reading:
- link: /dashboards/
  tag: Documentación
  text: Crear Dashboards en Datadog
- link: /dashboards/sharing/
  tag: Documentación
  text: Comparta sus gráficos fuera de Datadog
- link: /dashboards/widgets/
  tag: Documentación
  text: Descubra widgets para su Dashboard
- link: https://www.datadoghq.com/blog/datadog-executive-dashboards
  tag: Blog
  text: Diseñe dashboards ejecutivos efectivos con Datadog
- link: https://www.datadoghq.com/blog/zendesk-cost-optimization
  tag: Blog
  text: 'Optimización de Datadog a escala: observabilidad rentable en Zendesk'
- link: https://www.datadoghq.com/blog/template-variable-associated-values/
  tag: Blog
  text: Utilice variables de plantilla asociadas para refinar sus dashboards
- link: https://www.datadoghq.com/blog/dynamic-template-variable-syntax-dashboards/
  tag: Blog
  text: Acelere los flujos de trabajo del Dashboard con la sintaxis de variables de
    plantilla dinámicas
- link: https://www.datadoghq.com/blog/template-variable-available-values/
  tag: Blog
  text: Filtre Dashboards más rápido con los valores disponibles de las variables
    de plantilla
title: Variables de plantilla
---
## Descripción general {#overview}

Las variables de plantilla le permiten filtrar o agrupar dinámicamente widgets en un Dashboard. Puede crear vistas guardadas a partir de sus selecciones de variables de plantilla para organizar y navegar por sus visualizaciones a través de las selecciones del menú desplegable.

Una variable de plantilla se define mediante:

* {{< ui >}}Tag or Attribute{{< /ui >}}:
    * Etiqueta: Si sigue el [formato de etiquetado][1] recomendado (`<KEY>:<VALUE>`), la *Etiqueta* es el `<KEY>`.
    * Atributo: Utilice una [faceta o medida como variable de plantilla](#logs-apm-and-rum-queries).
* {{< ui >}}Name{{< /ui >}}: Un nombre único para la variable de plantilla que aparece en las consultas del Dashboard. Las variables de plantilla se nombran automáticamente según la etiqueta o el atributo seleccionado.
* {{< ui >}}Default Value{{< /ui >}}: El valor de la etiqueta o el atributo que aparece automáticamente cuando se carga el Dashboard. El valor predeterminado es `*`.
* {{< ui >}}Available Values{{< /ui >}}: Los valores de etiqueta o atributo disponibles para seleccionar en el menú desplegable. El valor predeterminado es `(all)`. La lista de valores disponibles siempre incluye `*`, que consulta todos los valores de la etiqueta o el atributo.

### Valores de las variables de plantilla {#template-variable-values}
Los valores de las variables de plantilla (valores disponibles mediante los menús desplegables de variables de plantilla) se completan según las fuentes que utilizan los widgets en el Dashboard. Por ejemplo, si su Dashboard tiene widgets que consultan registros, solo se muestran los valores de los registros. Si su Dashboard tiene widgets que consultan registros, métricas y RUM, se muestran los valores de los registros, las métricas y RUM.

Para la mayoría de las fuentes, los valores de las variables de plantilla son relevantes para el intervalo de tiempo global de su Dashboard. Por ejemplo:
- Si el intervalo de tiempo de su Dashboard está configurado en los últimos 15 minutos, solo se muestran los valores de las variables de plantilla de los últimos 15 minutos. 
- Si el intervalo de tiempo de su Dashboard está configurado para el 15 de agosto pasado de 12:00 a.m. a 11:59 p.m., solo se muestran los valores de ese intervalo de tiempo.

| Fuente de datos                                     | Periodo de consulta de datos   |
|--------------------------------------           |---------------------|
| Métricas                                         | Ahora - 48 horas      |
| Cloud Cost                                      | Ahora - 48 horas      |
| Todas las demás fuentes                               | Intervalo de tiempo del Dashboard |

**Nota**: Si no ve la etiqueta o el atributo que busca, puede ser porque esos datos no se han reportado a Datadog recientemente. Además, todos los datos consultados para las variables de plantilla están sujetos a la política de retención. Para obtener más información, consulte [Datos históricos][4].

### Diseño del Dashboard {#dashboard-layout}
Para evitar que las variables saturen el encabezado, el Dashboard muestra un subconjunto pequeño. Puede hacer clic en el botón **+ N** para ver las N variables adicionales presentes en su Dashboard. 


Si necesita ver todas las variables a la vez mientras se desplaza, haga clic en **Expandir variables de plantilla**. 

## Agregar una variable de plantilla {#add-a-template-variable}
Para agregar una variable de plantilla en un Dashboard:
1. Haga clic en {{< ui >}}Add Variable{{< /ui >}} (o {{< ui >}}\+{{< /ui >}} si ya existen variables de plantilla)
2. Seleccione de una lista de variables de plantilla recomendadas o busque la etiqueta específica que tiene en mente.
4. Seleccione los widgets a los que desea aplicar esta variable de plantilla.
6. Haga clic en {{< ui >}}Save{{< /ui >}}.


### Configure la variable de plantilla {#configure-template-variable}
Cuando el panel lateral de variables de plantilla está abierto, puede:
* Aplicar (o eliminar) esta variable a los widgets seleccionados (tenga en cuenta las opciones {{< ui >}}Select All{{< /ui >}} o {{< ui >}}Deselect All{{< /ui >}})
* Cambiar entre filtrado y agrupación
* Cambiar el nombre de visualización de la variable (que se muestra en el encabezado y en la consulta del widget)
* Seleccione un valor predeterminado del menú desplegable
* Obtenga una vista previa de los valores del menú desplegable y configúrelos aún más con una consulta de búsqueda

## Filtro de equipos {#team-filter}

Una variable de plantilla cuya clave de etiqueta sea `team` se representa como el [filtro de equipos][5] en lugar de como un selector de valor de etiqueta simple. Esto se aplica tanto a Dashboards como a notebooks.

El filtro de equipos agrega:

- Una lista que abarca tanto los Datadog Teams en su organización como los valores de etiqueta `team` que no tienen un equipo coincidente.
- Selección con reconocimiento de jerarquía. Seleccionar un equipo también selecciona los equipos debajo de él. Mantenga presionada la tecla Shift y haga clic en un equipo para seleccionarlo sin sus subequipos, o sus subequipos sin el equipo.
- Búsqueda tanto en identificadores de equipo como en nombres de visualización de equipo.

{{< img src="/dashboards/template_variables/team-template-variable.png" alt="Encabezado del Dashboard donde las variables cluster, env y region son selectores de valor simples y la variable de equipo está abierta como el filtro de equipos." style="width:100%;" >}}

La selección con reconocimiento de jerarquía solo aparece cuando la clave de etiqueta de la variable es `team`. Una variable basada en cualquier otra clave de etiqueta se representa como un selector de valor de etiqueta simple sin noción de jerarquía de equipo. Si la variable de equipo en un Dashboard ofrece jerarquía y la de otro Dashboard no, compare la clave de etiqueta detrás de cada variable.

Para una variable `team`, el filtro enumera a todos los equipos de su organización. Los valores establecidos en {{< ui >}}Available Values{{< /ui >}} se agregan a esa lista en lugar de restringirla.

### Utilice el filtro de equipo con una clave de etiqueta diferente {#use-the-team-filter-with-a-different-tag-key}

Algunos datos registran la propiedad del equipo bajo una clave de etiqueta distinta a `team`, como `team_attribution`, `attributes.team` o `usr.team`. Una variable de plantilla definida en una de esas claves le ofrece una lista plana de cadenas de etiquetas y ninguna jerarquía.

Para obtener una selección de equipo con reconocimiento de jerarquía para esos datos, defina la variable de plantilla en la clave de etiqueta `team` y haga referencia al valor seleccionado con `$team.value` en cada consulta de widget. La clave de etiqueta de la variable determina el selector que obtiene; la clave de etiqueta en la que filtra una consulta de widget es independiente y no tiene que coincidir.

1. Agregue una variable de plantilla con la clave de etiqueta `team`. Se representa como el filtro de equipo.
1. En cada consulta de widget, filtre por la clave de etiqueta que utilizan sus datos y coloque `$team.value` donde va el valor.

La misma sustitución funciona para cualquier clave de etiqueta. Escriba la consulta como lo haría normalmente, luego reemplace el identificador de equipo con `$team.value`:

| Widget | Consulta con un identificador de equipo | Consulta con `$team.value` |
|---|---|---|
| Case Management (`attributes.team`) | `attributes.team:payments-platform` | `attributes.team:$team.value` |
| Cloud Cost (`team_attribution`) | `sum:all.cost{team_attribution:payments-platform}` | `sum:all.cost{team_attribution:$team.value}` |

#### Cómo se resuelven las selecciones {#how-selections-resolve}

`$team.value` se expande a cada identificador de equipo seleccionado, combinado con `OR`, utilizando la clave de etiqueta que escribió en la consulta. Seleccionar los equipos `payments-platform` y `payments-fraud` resuelve los dos ejemplos anteriores como:

```text
attributes.team:(payments-platform OR payments-fraud)
```

```text
sum:all.cost{team_attribution:payments-platform OR team_attribution:payments-fraud}
```

Seleccionar un equipo principal se expande al equipo principal y a cada equipo debajo de él, cada uno como su propio identificador. Por lo tanto, una selección de jerarquía filtra sus datos en el mismo conjunto de identificadores que lo haría un widget etiquetado con `team`. Seleccionar un equipo sin sus subequipos, o sus subequipos sin el equipo, se expande de la misma manera. Solo se incluyen los identificadores en esa selección.

La expansión es una lista de identificadores de equipo. Para que un widget devuelva resultados, sus datos deben estar etiquetados con esos identificadores.

## Edite una variable de plantilla {#edit-a-template-variable}
1. Pase el cursor sobre la variable de plantilla en el encabezado del Dashboard y haga clic en **Editar**. Aparece el panel lateral de la variable de plantilla.
2. Utilice las opciones del panel para personalizar la variable o aplicar la variable a más widgets.


## Vistas guardadas {#saved-views}

### Cree {#create}

1. Haga clic en el menú desplegable {{< ui >}}Saved Views{{< /ui >}} a la izquierda de las variables de plantilla en su Dashboard. Cuando actualiza el valor de una variable de plantilla, el valor no se guarda automáticamente en una vista.
1. Para guardar los valores actuales de sus variables de plantilla en una vista, seleccione {{< ui >}}Save selections as view{{< /ui >}} del menú desplegable {{< ui >}}Saved Views{{< /ui >}}.
1. Ingrese un nombre único para la vista con una descripción opcional.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

{{< img src="/dashboards/template_variables/saved_view_create.png" alt="Cree vistas guardadas seleccionando guardar selecciones como vista" style="width:100%;" >}}

Su vista guardada aparece en el menú desplegable. Haga clic en la vista para recuperar los valores de las variables de plantilla guardados anteriormente.

### Eliminar {#delete}

1. Haga clic en el menú desplegable de vistas guardadas y coloque el cursor sobre la vista guardada deseada.
1. Haga clic en {{< ui >}}Delete View{{< /ui >}}.

### Modifique {#modify}

El {{< ui >}}Default view{{< /ui >}} solo se puede editar cambiando los valores predeterminados de las variables de plantilla. Para editar la vista predeterminada:
1. Coloque el cursor sobre las plantillas.
1. Haga clic en {{< ui >}}Edit{{< /ui >}} cuando aparezca el botón.
1. Haga clic en {{< ui >}}Done{{< /ui >}} para guardar.

Para modificar los valores de las variables de plantilla para otras vistas guardadas:
1. Seleccione la vista guardada deseada en el menú desplegable.
1. Edite las variables de plantilla para que tengan los nuevos modelos deseados.
1. Abra el menú desplegable de nuevo.
1. Haga clic en {{< ui >}}Save Changes{{< /ui >}}.

{{< img src="/dashboards/template_variables/saved_views_update_template_variable.png" alt="Modifique las variables de plantilla de sus vistas guardadas" style="width:100%;" >}}

Para editar el título y la descripción:
1. Coloque el cursor sobre la vista guardada deseada en el menú desplegable.
1. Haga clic en {{< ui >}}Edit{{< /ui >}}.
1. Modifique el título o la descripción.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

## Uso {#usage}

Las variables de plantilla se utilizan en widgets y superposiciones de eventos.

### Consultas de registros, APM y RUM {#logs-apm-and-rum-queries}

Las variables de plantilla funcionan con widgets de registros, APM y RUM porque comparten las mismas etiquetas. Puede definir variables de plantilla de registro, APM y RUM basadas en facetas. Estas variables comienzan con `@`, por ejemplo: `@http.status_code`.

En los widgets de registro, APM y RUM, puede usar comodines en medio de un valor (por ejemplo, `eng*@example.com`) o usar múltiples comodines en un valor (por ejemplo, `*prod*`).

**Nota**: El uso de {{< ui >}}Add to all{{< /ui >}} para este tipo de variable de plantilla añade la variable a todos los widgets de registro, APM y RUM.

### Widgets {#widgets}

Al crear o editar un widget, las variables de plantilla de filtro existentes se muestran como opciones en el campo `from`, y las variables de plantilla de agrupar por existentes se muestran como opciones después del campo `by`. Por ejemplo, si configura la variable de plantilla `environment`, la opción `$environment` está disponible como una variable dinámica en el widget.

{{< img src="dashboards/template_variables/dynamic_template_variable.png" alt="La variable de plantilla se puede establecer dinámicamente en los widgets" style="width:100%;">}}

Seleccionar **production** para el valor `environment` ajusta dinámicamente el alcance de los widgets con la variable `$environment` al entorno de producción.

Cuando cambia el valor de una variable de plantilla, la URL del Dashboard se actualiza para reflejar el valor de la variable de plantilla con el formato `&tpl_var_<TEMPLATE_VARIABLE_NAME>=<TEMPLATE_VARIABLE_VALUE>`. Por ejemplo, un Dashboard con la variable de plantilla `$env` cambiada a `prod` tendría el parámetro de URL `&tpl_var_env=prod`.

Para incluir el valor en la consulta, añádalo con la sintaxis `$<TEMPLATE_VARIABLE_NAME>.value`. Por ejemplo, con una variable de plantilla llamada `service`, use `env:staging-$service.value`.

Pase el cursor sobre los campos de variables de plantilla para ver de un vistazo los widgets que usan esa variable resaltados en el Dashboard.

#### Variables de plantilla asociadas {#associated-template-variables}

Al seleccionar un valor de variable de plantilla, los valores asociados se muestran en la parte superior del selector. Los valores asociados se calculan a partir de otros valores de variables de plantilla seleccionados en la página e identifican sin problemas los valores relacionados sin ninguna configuración.

#### Texto {#text}

Para widgets basados en texto, puede mostrar la etiqueta/atributo y el valor de una variable de plantilla con `$<TEMPLATE_VARIABLE_NAME>`, su clave con `$<TEMPLATE_VARIABLE_NAME>.key` o su valor con `$<TEMPLATE_VARIABLE_NAME>.value`. Esto puede ir después de cualquier carácter no alfanumérico y puede ir seguido de un espacio en blanco o cualquiera de los siguientes caracteres: `#`, `$`, `%`, `=`, `;`, `"`, `(`, `)`, `[`, `]`, `{`, `}`, `^`, `*`, `+`, `|` y `?`.

**Nota**: La sintaxis de comodín no es compatible después de una variable de plantilla.

Por ejemplo, con una variable de plantilla llamada `env`, con la etiqueta/atributo `environment`, y con un valor seleccionado de `dev`:
* `$env` muestra `environment:dev`
* `$env.key` muestra `environment`
* `$env.value` muestra `dev`
* `$env*` busca el valor exacto `dev*` NO `dev{dynamic-wildcard-value}`

### Superposición de eventos {#events-overlay}

Use la búsqueda de superposición de eventos con variables de plantilla para encontrar eventos que compartan ciertas etiquetas con las métricas en su Dashboard. La búsqueda de superposición de eventos se aplica a través de un gráfico individual.

Los valores de las variables de plantilla del Dashboard se pueden capturar directamente usando la sintaxis `$<TEMPLATE_VARIABLE_KEY>.value` en el campo de búsqueda de eventos.

**Nota**: Las variables de plantilla del Dashboard deben ser etiquetas de métricas, no etiquetas de eventos.

#### Dashboard {#dashboard}

Desde su Dashboard, busque eventos con variables de plantilla usando el formato:

```text
<TAG_KEY>:$<TEMPLATE_VARIABLE_NAME>.value
```

Por ejemplo, buscar `region:$region.value` con un valor de `us-east1` para la variable de plantilla `region` muestra eventos etiquetados con `region:us-east1`. Además, el momento de los eventos está marcado por barras rosas en los gráficos.

Use comas para buscar usando múltiples variables de plantilla, por ejemplo: `role:$role.value,env:$env.value`

**Nota**: Una vez que presione *enter* para buscar, `$region.value` se actualiza al valor en el menú desplegable de la variable de plantilla.

#### Widgets {#widgets-1}

Desde sus widgets, superponga el momento de los eventos usando variables de plantilla con el formato:

```text
$<TEMPLATE_VARIABLE_NAME>
```

Por ejemplo, ingrese `$region` en el cuadro de búsqueda de superposiciones de eventos. Esto busca eventos con el valor en el menú desplegable de la variable de plantilla `region`.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/#define-tags
[2]: /es/logs/explorer/facets/
[3]: /es/real_user_monitoring/explorer/?tab=facets#setup-facets-measures
[4]: /es/dashboards/faq/historical-data/
[5]: /es/account_management/teams/#team-filter