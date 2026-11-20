---
aliases:
- /es/service_management/app_builder/tables/
- /es/service_management/app_builder/components/tables
description: Funciones avanzadas del componente de tabla, incluyendo filtrado del
  lado del cliente, filtrado del lado del servidor, indicadores de carga y valores
  dinámicos.
disable_toc: false
further_reading:
- link: /actions/app_builder/components/
  tag: Documentación
  text: Componentes
- link: /actions/app_builder/build/
  tag: Documentación
  text: Crear aplicaciones
title: Tablas
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App Builder está en versión preliminar en el sitio de Datadog Government US1-FED.
</div>
{{< /site-region >}}

Esta página describe las funciones avanzadas que puede usar para manipular componentes de tabla en sus aplicaciones de App Builder.

## Filtrado del lado del cliente{#client-side-filtering}

Cuando ya tiene una lista completa de elementos y desea filtrarlos, existen múltiples métodos para hacerlo en el lado del cliente.

### Filtrado de columnas{#column-filtering}

En {{< ui >}}Columns{{< /ui >}}, expanda una columna y habilite la opción {{< ui >}}Filterable{{< /ui >}} para permitir que los usuarios filtren por entradas en esa columna. Cuando se habilita, aparece un menú desplegable en el encabezado de la tabla que permite al usuario seleccionar un elemento de esa columna para filtrar.

### Filtrar por rango de fechas{#filter-by-date-range}

Para permitir el filtrado por rango de fechas, en {{< ui >}}Appearance{{< /ui >}}, habilite la opción {{< ui >}}Has Date Range Filter{{< /ui >}} y seleccione una ruta de datos para filtrar. Cuando se habilita, aparece un menú desplegable en el encabezado de la tabla que permite al usuario seleccionar un tramo de tiempo para filtrar.

### Filtrar con búsqueda{#filter-with-search}

Para agregar una barra de búsqueda a su tabla, en {{< ui >}}Appearance{{< /ui >}}, habilite la opción {{< ui >}}Is Searchable{{< /ui >}}.

### Filtrar una tabla con una entrada de texto o un componente de búsqueda{#filter-a-table-with-a-text-input-or-search-component}

Un caso de uso común es filtrar un componente de tabla usando el valor en un componente de entrada de texto.

Por ejemplo, si desea listar sus tableros en una tabla que pueda filtrar usando un componente de entrada de texto, podría hacer lo siguiente:

1. Agregue una nueva consulta usando el botón {{< ui >}}\+{{< /ui >}}.
1. Busque "listar dashboards" y haga clic en la acción {{< ui >}}List Dashboards{{< /ui >}}. Nombre su consulta `listDashboards0`.
1. Agregue una entrada de texto o un componente de búsqueda a su aplicación. Nómbrelo `searchInput`.
1. Agregue un componente de tabla.
1. Establezca la propiedad {{< ui >}}data source{{< /ui >}} de la tabla con sus datos filtrados por el componente de entrada de texto o de búsqueda que creó. En este ejemplo, establezca {{< ui >}}data source{{< /ui >}} con la siguiente expresión:

    ```
    ${listDashboards0?.outputs.dashboards.filter(row => row.title.includes(searchInput.value))}
    ```

Puede escribir texto en el componente de entrada de texto y las filas de la tabla se filtrarán según ese texto.

### Filtrar una tabla con un componente de selección {#filter-a-table-with-a-select-component}

Otro caso de uso común es filtrar una tabla mediante un componente de selección.

Por ejemplo, si desea listar sus tableros en una tabla que pueda filtrar mediante un componente de selección, podría hacer lo siguiente:

1. Agregue una nueva consulta usando el botón {{< ui >}}\+{{< /ui >}}.
1. Busque "listar dashboards" y haga clic en la acción {{< ui >}}List Dashboards{{< /ui >}}. Nombre su consulta `listDashboards0`.
1. Agregue un componente de selección a su aplicación. Nómbrelo `selectInput`.
1. Agregue un componente de tabla.
1. Establezca la propiedad {{< ui >}}data source{{< /ui >}} de la tabla a sus datos filtrados por el componente de selección. En este ejemplo, establezca {{< ui >}}data source{{< /ui >}} con la siguiente expresión:

    ```
    ${listDashboards0?.outputs.dashboards.filter(row => row.title.includes(selectInput.value))}
    ```

Puede seleccionar un valor del componente de selección y las filas de la tabla se filtrarán según ese valor.

### Filtrar resultados de consulta mediante una transformación posterior a la consulta {#filter-query-results-using-a-post-query-transformation}

Si desea filtrar los resultados de una consulta en sí, y luego usar esos resultados en su tabla, realice los siguientes pasos:

1. Agregue una nueva consulta usando el botón {{< ui >}}\+{{< /ui >}}.
1. Busque "listar dashboards" y haga clic en la acción {{< ui >}}List Dashboards{{< /ui >}}. Nombre su consulta `listDashboards0`.
1. Agregue una entrada de texto o un componente de búsqueda a su aplicación. Nómbrelo `searchInput`.
1. Agregue un componente de tabla y establezca su propiedad {{< ui >}}data source{{< /ui >}} a la consulta que agregó.
1. Expanda la sección {{< ui >}}Advanced{{< /ui >}} de la consulta y busque {{< ui >}}Post-query Transformation{{< /ui >}}.
1. Reemplace `return outputs` con la siguiente línea:

    ```
    outputs.dashboards.filter(row => row.title.includes(searchInput.value))
    ```

Puede escribir texto en el componente de entrada de texto y las filas de la tabla se filtrarán según ese texto.

Si necesita el resultado de la consulta original y sin transformar, puede hacer referencia a él como `${listDashboards0.rawOutputs}`.

## Filtrado del lado del servidor {#server-side-filtering}

En algunos casos, es posible que desee filtrar los valores del lado del servidor y emitir nuevas solicitudes cuando el usuario ingresa un valor en una entrada, como un componente de entrada de texto.

En este caso, puede habilitar el filtrado del lado del servidor editando la consulta directamente.

Por ejemplo, en el blueprint [GitHub PR pipeline][4], la consulta `listOpenedPulls` tiene una entrada que obtiene la siguiente URL:

```
https://api.github.com/search/issues?q=org:${organizationInput.value}+author:${userNameInput.value}+type:pr+state:open
```

La API de GitHub acepta parámetros de consulta para filtrar según la organización, el autor o el tipo de solicitud de extracción. La URL de entrada de la consulta anterior contiene expresiones de plantilla para `organizationInput.value`, que es el valor del componente de entrada de texto "Organización", y `userNameInput.value`, que es el valor del componente de entrada de texto "Nombre de usuario". Si establece la configuración de ejecución de la consulta en automático, la consulta se actualiza automáticamente cuando cambian los valores de estas expresiones de plantilla y los valores de la tabla se actualizan.


## Mostrar un indicador de carga {#showing-a-loading-indicator}

Si desea mostrar un indicador de carga en una tabla mientras se obtienen los datos, puede establecer el valor `isLoading` de la _tabla_ igual a la propiedad `isLoading` de la _consulta_. Por ejemplo:

1. Siga los pasos en [filtrado con una entrada de texto][2].
1. En las propiedades de su tabla, debajo de {{< ui >}}Appearance{{< /ui >}}, haga clic en {{< ui >}}&lt;/&gt;{{< /ui >}} junto a {{< ui >}}Is Loading{{< /ui >}} para abrir el editor de código.
1. Establezca el valor `isLoading` de la tabla en la siguiente expresión:

    ```
    ${listDashboards0.isLoading}
    ```

La tabla muestra un indicador de carga cuando escribe texto nuevo en el componente de entrada de texto.

## Valores de tabla dinámicos {#dynamic-table-values}

Puede usar la propiedad {{< ui >}}data source{{< /ui >}} de un componente de tabla para completar dinámicamente los valores de la tabla y restringir qué objetos se incluyen en la tabla como columnas.

Por ejemplo, el blueprint [GitHub PR Summarizer][3] utiliza una serie de consultas de GitHub para resumir una lista de solicitudes de extracción en un repositorio. La consulta utiliza la entrada de la fuente a continuación para limitar la tabla a 6 columnas: `title`, `Summary`, `updated_at`, `user`, `html_url` y `state`. El código resaltado completa dinámicamente la columna de usuario para cada solicitud de extracción con el avatar y el nombre de usuario de GitHub del autor.

{{< highlight js "hl_lines=17" >}}
${(() => {
    const summaryById = Object.fromEntries(
        summarizePulls.outputs.map(({id, summary}) => [id, summary])
    );
    return listPulls.outputs.map(result => {
        const {title, updated_at, user, state, html_url} = result;
        const updatedAt = new Date(result.updated_at);
        let summary;
        if (summarizePulls.isLoading) {
            summary = 'Summarizing';
        } else {
            summary = summaryById[result.id] ?? 'N/A';
        }
        return {
            title: `**${title}**`,
            updated_at: updatedAt.toLocaleString(),
            user: {label: user.login, src: user.avatar_url},
            summary,
            state, html_url};
    })
})()}
{{< /highlight >}}

En la tabla, la columna {{< ui >}}User{{< /ui >}} se completa con un avatar y el nombre de usuario de GitHub para cada autor de PR.



## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tiene preguntas o comentarios? Únase al canal **#app-builder** en el [Datadog Community Slack][0].

[0]: https://chat.datadoghq.com/
[1]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=pagerduty_oncall_manager&viewMode=preview
[2]: /es/actions/app_builder/components/tables/#filtering-with-a-text-input
[3]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=github-pr-summarizer
[4]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=github-pr-dashboard&viewMode=preview