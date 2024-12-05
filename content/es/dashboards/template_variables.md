---
aliases:
- /es/graphing/dashboards/template_variables/correlate-metrics-and-events-using-dashboard-template-variables
- /es/graphing/dashboards/template_variables/how-do-i-overlay-events-onto-my-dashboards
- /es/graphing/dashboards/template_variables/
further_reading:
- link: https://www.datadoghq.com/blog/template-variable-associated-values/
  tag: Blog
  text: Usa variables de plantilla asociadas para reajustar tus dashboards
- link: https://www.datadoghq.com/blog/dynamic-template-variable-syntax-dashboards/
  tag: Blog
  text: Acelerar flujos de trabajo de dashboards con la sintaxis dinámica de variables
    de plantilla
- link: https://www.datadoghq.com/blog/template-variable-available-values/
  tag: Blog
  text: Filtrar dashboards más rápidamente con los valores disponibles de variables
    de plantilla
- link: /dashboards/
  tag: Documentación
  text: Crear dashboards en Datadog
- link: /dashboards/sharing/
  tag: Documentación
  text: Compartir gráficos fuera de Datadog
- link: /dashboards/widgets/
  tag: Documentación
  text: Descubrir widgets para dashboards
title: Variables de plantilla
---

## Información general

Las variables de plantilla te permiten filtrar dinámicamente uno o más widgets en un dashboard. Puedes crear vistas guardadas, a partir de tus selecciones de variables de plantilla, para organizar y navegar por tus visualizaciones a través de las selecciones desplegables. 

Una variable de plantilla se determina por:

* **Tag or Attribute** (Etiqueta o atributo):
    * Etiqueta: Si aplicas el [formato de etiquetado][1] recomendado (`<KEY>:<VALUE>`), la *Etiqueta* es la `<KEY>`.
    * Atributo: Usa una [faceta o medida como variable de plantilla](#logs-apm-and-rum-queries).
* **Name** (Nombre): Un nombre único para la variable de plantilla que aparece en las consultas del dashboard. Las variables de plantilla reciben automáticamente el nombre de la etiqueta o atributo seleccionado.
* **Default Value** (Valor predeterminado): El valor de la etiqueta o el atributo que aparece automáticamente cuando se carga el dashboard. El valor por defecto es `*`.
* **Available Values** (Valores disponibles): Los valores de la etiqueta o el atributo disponibles en el menú desplegable. Por defecto, `(all)`. La lista de valores disponibles siempre incluye `*`, que consulta todos los valores de la etiqueta o el atributo.

## Añadir una variable de plantilla

Para añadir una variable de plantilla en un dashboard:
1. Haga clic en **Add Variables** (Añadir variables). 
1. Si las variables de plantilla ya están definidas, pasa el cursor sobre el encabezado del dashboard y haz clic en el botón **Edit** (Editar) para acceder al modo de edición.
1. En el modo de edición, haz clic en el icono **+ (más)** para crear una nueva variable de plantilla.
1. (Opcional) Después de seleccionar una etiqueta, haz clic en el botón **+ Configure Dropdown Values** (+ Configurar valores desplegables), para cambiar el nombre de la variable y establecer valores predeterminados o disponibles.
  {{< img src="dashboards/template_variables/add_template_variable_configure_dropdown_values.png" alt="Añadir ventana emergente de la variable que muestra el botón **+ Configure Dropdown Values** (+ Configurar valores desplegables)" style="width:80%;" >}}

## Editar una variable de plantilla

Para editar una variable de plantilla en un dashboard:
1. Haz clic en el botón **Edit** (Editar) del encabezado del dashboard.
1. En el modo de edición, haz clic en una variable de plantilla y realiza cambios en la ventana emergente.
1. Para reorganizar las variables en el encabezado, pasa el cursor sobre una variable, y luego haz clic y arrastra el asa del icono de arrastre.
  {{< img src="dashboards/template_variables/edit_template_variable_drag.png" alt="Ventana emergente del modo de edición de una variable de plantilla que muestra el icono de arrastre y te permite volver a acomodar el orden" style="width:100%;" >}}

## Aplicar una variable de plantilla a widgets

Para añadir una variable de plantilla a las consultas de widgets:
1. Haz clic en el botón **Edit** (Editar) del encabezado del dashboard.
1. En el modo de edición, haz clic en una variable de plantilla para abrir su ventana emergente.
1. Haz clic en **Select Widgets** (Seleccionar widgets), para entrar al modo de selección de widgets.
1. El banner muestra el número de fuentes que utilizan la variable. En el ejemplo siguiente, la variable de plantilla `env` se utiliza en 20 gráficos del dashboard:
  {{< img src="dashboards/template_variables/apply_template_variable_to_widgets.png" alt="Ejemplo de dashboard que muestra la confirmación para aplicar la variable de plantilla 'env' a 20 widgets" style="width:100%;" >}}
1. Haz clic en widgets individuales para obtener una vista previa del gráfico con la variable de plantilla interpolada.
1. Para añadir o eliminar de todos los widgets de un grupo, selecciona la casilla de verificación situada en la esquina derecha del grupo.
1. Para añadir o eliminar de todos los widgets del dashboard, haz clic en **Select All** (Seleccionar todo) o **Deselect All** (Deseleccionar todo) en el banner de selección.
1. Haz clic en **Save** (Guardar) o en  **X** en el banner para salir del modo de selección de widgets.

## Vistas guardadas

### Crear

Haz clic en el menú desplegable **Saved Views** (Vistas guardadas) a la izquierda de las variables de plantilla en tu dashboard. Al actualizar el valor de una variable de plantilla, dicho valor no se guarda automáticamente en una vista.

{{< img src="dashboards/template_variables/saved_views_dropdown_options.png" alt="Opciones de menú desplegable de vistas guardadas para definir las variables de plantilla seleccionadas como vista predeterminada o la vista guardada" style="width:90%;" >}}

Para guardar los valores actuales de las variables de plantilla en una vista, selecciona **Save selections as view** (Guardar la selección como vista) en el menú desplegable **Saved Views** (Vistas guardadas). Escribe un nombre único para la vista y haz clic en **Save** (Guardar).

La vista guardada aparecerá en el menú desplegable. Haz clic en ella para recuperar los valores de las variables de plantilla que habías guardado anteriormente.

### Eliminar

Si quieres eliminar una vista, haz clic en el menú desplegable de vistas guardadas y selecciona **Manage views...** (Gestionar vistas). A continuación, aparecerá una ventana emergente con tus vistas guardadas con un icono de papelera junto a cada una. Haz clic en la papelera que corresponda para eliminar esa vista.

### Modificar

Si deseas modificar la **Default view** (Vista predeterminada), haz clic en el icono del lápiz y actualiza los valores de la variable de plantilla. A continuación, haz clic en **Done** (Hecho) para guardar los cambios. Si se modifica algún valor en las otras vistas, guarda los valores como una nueva vista y luego elimina la vista original.

## API

Las variables de plantilla se utilizan en widgets y superposiciones de eventos.

### Consultas de logs, APM y RUM

Las variables de plantilla funcionan con widgets de logs, APM, y RUM, ya que comparten las mismas etiquetas. Puedes definir variables de plantilla de logs, APM, y RUM, en función de las facetas. Estas variables empiezan por `@`,; por ejemplo: `@http.status_code`.

En los widgets de log, APM y RUM, se pueden utilizar comodines en mitad de un valor (por ejemplo, `eng*@example.com`) o varios comodines en un valor (por ejemplo, `*prod*`).

**Nota**: Si se utiliza la opción **Add to all** (Añadir a todos) para este tipo de variable de plantilla, esta se añade a todos los widgets de log, APM y RUM.

### Ruby

Al crear o editar un widget, las variables de plantilla existentes se muestran como opciones en el campo `from`. Por ejemplo, si configuras la variable de plantilla `environment`, la opción `$environment` estará disponible como variable dinámica en el widget.

{{< img src="dashboards/template_variables/dynamic_template_variable.png" alt="La variable de plantilla puede definirse de forma dinámica en los widgets" style="width:100%;">}}

Al seleccionar **production** (producción) para el valor `environment`, los widgets con la variable `$environment` se incluyen en el entorno de producción de forma dinámica.

Cuando se cambia el valor de una variable de plantilla, la URL del dashboard se actualiza para incluir el nuevo valor con el formato `&tpl_var_<TEMPLATE_VARIABLE_NAME>=<TEMPLATE_VARIABLE_VALUE>`. Por ejemplo, si en un dashboard la variable de plantilla `$env` se cambia por `prod`, el parámetro URL será `&tpl_var_env=prod`.

Para incluir el valor en la consulta, añádelo con la sintaxis `$<TEMPLATE_VARIABLE_NAME>.value`. Por ejemplo, con una variable de plantilla denominada `service`, utiliza `env:staging-$service.value`.

Pasa el ratón por encima de los campos de la variable de plantilla para ver de un rápido vistazo los widgets que utilizan esa variable resaltados en el dashboard.

#### Variables de plantilla asociadas

Al seleccionar un valor de una variable de plantilla, los valores asociados se muestran en la parte superior del selector. Los valores asociados se determinan a partir de otros valores de variables de plantilla seleccionados en la página, e identifican perfectamente los valores relacionados sin tener que configurar nada más,

#### Texto

En el caso de widgets basados en texto, puedes mostrar la etiqueta o el atributo de una variable y su valor con `$<TEMPLATE_VARIABLE_NAME>`, su clave con `$<TEMPLATE_VARIABLE_NAME>.key` o su valor con `$<TEMPLATE_VARIABLE_NAME>.value`. Esto puede ir después de cualquier carácter no alfanumérico y puede ir seguido de un espacio en blanco o de cualquiera de los siguientes caracteres: `#`, `$`, `%`, `=`, `;`, `"`, `(`, `)`, `[`, `]`, `{`, `}`, `^`, `*`, `+`, `|` y `?`.

**Nota**: No se admite la sintaxis comodín a continuación de una variable de plantilla.

Por ejemplo, con una variable de plantilla denominada `env`, con una etiqueta o un atributo `environment` y con un valor seleccionado como `dev`:
* `$env` muestra `environment:dev`
* `$env.key` muestra `environment`
* `$env.value` muestra `dev`
* `$env*` busca el valor exacto `dev*` NO `dev{dynamic-wildcard-value}`

### Superposiciones de eventos

Utiliza la opción de búsqueda de superposiciones de eventos con las variables de plantilla para encontrar eventos que compartan unas etiquetas específicas con las métricas de tu dashboard. Esta búsqueda se aplica a través de un gráfico individual.

Es posible capturar directamente los valores de las variables de plantilla del dashboard utilizando la sintaxis `$<TEMPLATE_VARIABLE_KEY>.value` en el campo de búsqueda de eventos.

**Nota**: Las variables de plantilla del dashboard deben ser etiquetas de métricas, no de eventos.

#### Dashboard

Desde tu dashboard, busca eventos con variables de plantilla. Para ello, utiliza el siguiente formato:

```text
<TAG_KEY>:$<TEMPLATE_VARIABLE_NAME>.value
```

Por ejemplo, si se busca `region:$region.value` con un valor `us-east1` para la variable de plantilla `region`, se muestran los eventos con la etiqueta `region:us-east1`. Además, el momento en que se produjeron los eventos está marcado con barras rosas en los gráficos.

comas para hacer búsquedas con múltiples variables de plantilla. Por ejemplo: `role:$role.value,env:$env.value`

**Nota**: Cuando pulses *enter* (introducir) para buscar, `$region.value` se actualiza al valor del menú desplegable de la variable de plantilla.

#### Ruby

Desde tus widgets, superpón el cronograma de los eventos. Para ello, utiliza las variables de plantilla con el siguiente formato:

```text
$<TEMPLATE_VARIABLE_NAME>
```

Por ejemplo, introduce `$region` en la casilla de búsqueda de eventos superpuestos. De este modo se buscan los eventos con el valor en el menú desplegable de la variable de plantilla `region`.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/#define-tags
[2]: /es/logs/explorer/facets/
[3]: /es/real_user_monitoring/explorer/?tab=facets#setup-facets-measures