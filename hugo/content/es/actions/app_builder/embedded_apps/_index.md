---
aliases:
- /es/service_management/app_builder/embedded_apps
description: Incruste aplicaciones publicadas en tableros y sincronícelas con variables
  de plantilla y marcos de tiempo para obtener acciones dinámicas y contextuales.
disable_toc: false
further_reading:
- link: https://app.datadoghq.com/actions/action-catalog/
  tag: Aplicación
  text: Action Catalog
title: Incruste aplicaciones de App Builder
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App Builder está en versión preliminar en el sitio de Datadog Government US1-FED.
</div>
{{< /site-region >}}


Cuando tiene aplicaciones de Datadog App Builder incrustadas en sus tableros, puede realizar acciones directas en sus recursos, y todos los datos y el contexto relevantes están disponibles de inmediato. Vincule su aplicación con el marco de tiempo y las variables de plantilla del tablero para establecer dinámicamente el contexto de las acciones de la aplicación, lo que le permite llevar a cabo acciones en su entorno en cualquier contexto necesario.

<div class="alert alert-info">Esta página describe cómo incrustar aplicaciones de App Builder, las cuales usted crea en Datadog con un editor de arrastrar y soltar de bajo código. Para incrustar una aplicación creada con <a href="/actions/datadog_apps/">Datadog Apps</a>, que usted escribe localmente como código en React y TypeScript, consulte <a href="/actions/datadog_apps/embed_apps/">Incrustar aplicaciones</a>.</div>

## Agregue aplicaciones a su tablero {#add-apps-to-your-dashboard}

Agregue una aplicación publicada anteriormente a su tablero arrastrando el tipo de widget {{< ui >}}App{{< /ui >}} desde la bandeja de widgets del tablero:

{{< img src="/actions/app_builder/embedded_apps/app-widget-select.png" alt="La bandeja de widgets del tablero con el tipo de widget de Aplicación resaltado" style="width:30%;">}}

Aparece el modal del Editor de aplicaciones, lo que le permite seleccionar una aplicación y asignarle un título:

{{< img src="/actions/app_builder/embedded_apps/app-editor.png" alt="El modal del Editor de aplicaciones con una aplicación seleccionada y un título de widget" style="width:80%;">}}

## Sincronice su aplicación con las variables de plantilla y de marco de tiempo del tablero {#sync-your-app-with-dashboard-template-and-time-frame-variables}

Puede vincular su aplicación a variables de plantilla en cualquier lugar que admita expresiones de plantilla en sus consultas o elementos de aplicación. También puede vincular su aplicación al marco de tiempo seleccionado en su tablero.

Cuando cambia el valor de una variable de plantilla o un marco de tiempo en el tablero, los elementos de la aplicación vinculados se actualizan automáticamente. Por ejemplo, cuando selecciona un valor `instance_id` usando el menú desplegable de variables de plantilla o directamente desde un gráfico, el valor `instance_id` se agrega al filtro de la aplicación. Esto le permite realizar acciones en esa instancia específica:

{{< img src="actions/app_builder/embedded_apps/template_variables.mp4" alt="Selección de un valor de variable de plantilla desde un gráfico" video="true">}}


### Ejemplos de variables de plantilla {#template-variable-examples}

Para completar un componente de selección con una lista de todas las variables de plantilla disponibles, agregue la siguiente expresión de plantilla al campo {{< ui >}}Options{{< /ui >}} de su componente de selección:

{{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.templateVariables?.map(tvar => tvar.name )}
{{< /code-block >}}

Para listar todos los valores disponibles de una variable de plantilla específica, utilice la siguiente expresión de plantilla:

{{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.templateVariables?.find(v => v.name === '<TEMPLATE_VARIABLE_NAME>')?.availableValues}
{{< /code-block >}}

Para listar todos los valores disponibles al usar un componente de selección, utilice la siguiente expresión de plantilla:

{{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.templateVariables?.find(v => v.name === '<TEMPLATE_VARIABLE_NAME>')?.availableValues.map(availableValue => {return {label: availableValue, value:availableValue}})}
{{< /code-block >}}

Para obtener el valor seleccionado de una variable de plantilla, utilice las siguientes expresiones de plantilla:

- Para una variable de plantilla de selección única:
   {{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.templateVariables?.find(v => v.name === '<TEMPLATE_VARIABLE_NAME>')?.value}
{{< /code-block >}}
- Para una variable de plantilla de selección múltiple:
   {{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.templateVariables?.find(v => v.name === '<TEMPLATE_VARIABLE_NAME>')?.values}
{{< /code-block >}}

### Ejemplos de marco de tiempo {#time-frame-examples}

Para obtener el valor inicial del marco de tiempo, utilice las siguientes expresiones de plantilla:

- Para la marca de tiempo numérica:
   {{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.timeframe?.start}
{{< /code-block >}}
- Para una fecha y hora con formato:
   {{< code-block lang="json" disable_copy="false">}}
${new Date(global?.dashboard?.timeframe?.start).toLocaleString()}
{{< /code-block >}}

Para obtener el valor final del marco de tiempo, utilice las siguientes expresiones de plantilla:

- Para la marca de tiempo numérica:
   {{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.timeframe?.end}
{{< /code-block >}}
- Para una fecha y hora con formato:
   {{< code-block lang="json" disable_copy="false">}}
${new Date(global?.dashboard?.timeframe?.end).toLocaleString()}
{{< /code-block >}}

Para agregar un botón que establezca el valor de un componente selector de rango de fechas al marco de tiempo del tablero, realice los siguientes pasos:

1. Agregue un componente selector de rango de fechas a su aplicación y asígnele el nombre "dateRangePicker0".
1. Agregue un botón a su aplicación.
1. En {{< ui >}}Events{{< /ui >}}, complete los siguientes valores:
    - {{< ui >}}Event{{< /ui >}}: {{< ui >}}click{{< /ui >}}
    - {{< ui >}}Reaction{{< /ui >}}: {{< ui >}}Set Component State{{< /ui >}}
    - {{< ui >}}Component{{< /ui >}}: {{< ui >}}dateRangePicker0{{< /ui >}}
    - {{< ui >}}State Function{{< /ui >}}: {{< ui >}}setValue{{< /ui >}}
    - {{< ui >}}Value{{< /ui >}}: `${global?.dashboard?.timeframe}`
1. Guarde y publique su aplicación.

## Agregue aplicaciones a Catalog {#add-apps-to-catalog}

Agregue una aplicación publicada al tablero de [Self-Service Actions][2] en [Catalog][3] para proporcionar a los desarrolladores un lugar central para aprovisionar infraestructura, estructurar servicios, solucionar problemas y más.

Para agregar a Self-Service Actions, primero asegúrese de que su aplicación esté publicada y que los permisos estén definidos. A continuación, puede hacer clic en {{< ui >}}Add to Self-Service Actions{{< /ui >}}.

{{< img src="tracing/software_catalog/self-service-ui.png" alt="Self-Service Actions" style="width:100%;" >}}

Una vez agregada, puede visualizar y usar su aplicación en Catalog.

{{< img src="tracing/software_catalog/self-service-publish.png" alt="Publicar en Self-Service Actions" style="width:100%;" >}}


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tiene preguntas o comentarios? Únase al canal **#app-builder** en el [Datadog Community Slack][1].

[1]: https://chat.datadoghq.com/
[2]: https://app.datadoghq.com/software/self-service
[3]: https://app.datadoghq.com/software