---
aliases:
- /es/service_management/app_builder/tables/
- /es/service_management/app_builder/components/tables
description: Funciones avanzadas de componentes de tablas, como el filtrado del lado
  del cliente, el filtrado del lado del servidor, indicadores de carga y valores dinámicos.
disable_toc: false
further_reading:
- link: /service_management/app_builder/components/
  tag: Documentación
  text: Componentes
- link: /service_management/app_builder/build/
  tag: Documentación
  text: Crear aplicaciones
title: Tablas
---

En esta página se describen las funciones avanzadas que puedes utilizar para manipular componentes de tablas en tus aplicaciones App Builder.

## Filtrado del lado del cliente

Cuando ya tienes una lista completa de elementos y quieres filtrarlos, existen varios métodos para hacerlo del lado del cliente.

### Filtrado por columnas

En **Columns** (Columnas), amplía una columna y activa la opción **Filterable** (Filtrable) para permitir a los usuarios filtrar por las entradas de esa columna. Cuando está activada, aparece un menú desplegable en la cabecera de la tabla que permite al usuario seleccionar un elemento de esa columna para filtrar.

### Filtrar por intervalo de fechas

Para permitir el filtrado por intervalo de fechas, en **Appearance** (Apariencia) activa la opción **Has Date Range Filter** (Tiene filtro de intervalo de fechas) y selecciona una ruta de datos por la que filtrar. Cuando está activada, aparece un menú desplegable en la cabecera de la tabla que permite al usuario seleccionar un periodo de tiempo por el que filtrar.

### Filtrar con búsqueda

Para añadir una barra de búsqueda a tu tabla, **Appearance** (Apariencia) activa la opción **Is Searchable** (Se puede buscar).

### Filtrar una tabla con un componente de entrada de texto o de búsqueda

Un uso frecuente consiste en filtrar un componente de tabla utilizando el valor de un componente de entrada de texto.

Por ejemplo, si quieres enumerar tus dashboards en una tabla que puedas filtrar utilizando un componente de entrada de texto, puedes hacer lo siguiente: 

1. Añadir una nueva consulta utilizando el botón **+**.
1. Buscar "List dashboards" (Enumerar dashboards) y hacer clic en la acción **List Dashboards**. Debes asignar un nombre a tu consulta `listDashboards0`.
1. Añadir un componente de entrada de texto o de búsqueda a tu aplicación. Debes asignarle el nombre `searchInput`.
1. Añadir un componente de tabla.
1. Configurar la propiedad **data source** (fuente de datos) de la tabla con los datos filtrados por el componente de entrada de texto o búsqueda que creaste. En este ejemplo, debes configurar **data source** con la siguiente expresión:

    ```
    ${listDashboards0?.outputs.dashboards.filter(row => row.title.includes(searchInput.value))}
    ```

Puedes escribir texto en el componente de entrada de texto y las filas de la tabla se filtrarán por ese texto.

### Filtrar una tabla con un componente seleccionado

Otro uso frecuente consiste en filtrar una tabla utilizando un componente seleccionado.

Por ejemplo, si quieres enumerar tus dashboards en una tabla que puedas filtrar utilizando un componente seleccionado, puedes hacer lo siguiente: 

1. Añadir una nueva consulta utilizando el botón **+**.
1. Buscar "List dashboards" (Enumerar dashboards) y hacer clic en la acción **List Dashboards**. Debes asignar un nombre a tu consulta `listDashboards0`.
1. Añadir un componente seleccionadoa tu aplicación. Debes asignarle el nombre `selectInput`.
1. Añadir un componente de tabla.
1. Configurar la propiedad **data source** (fuente de datos) a tus datos filtrados por el componente seleccionado. En este ejemplo, debes configurar **data source** con la siguiente expresión:

    ```
    ${listDashboards0?.outputs.dashboards.filter(row => row.title.includes(selectInput.value))}
    ```

Puedes seleccionar un valor del componente seleccionado y las filas de la tabla se filtrarán por ese valor.

### Filtrar los resultados de la consulta mediante una transformación posterior a la consulta

Si quieres filtrar los resultados de una consulta en sí, y luego utilizar esos resultados en tu tabla, realiza los siguientes pasos:

1. Añade una nueva consulta utilizando el botón **+**.
1. Busca "List dashboards" (Enumerar dashboards) y haz clic en la acción **List Dashboards**. Asigna un nombre a tu consulta `listDashboards0`.
1. Añade un componente de entrada de texto o de búsqueda a tu aplicación. Asígnale el nombre `searchInput`.
1. Añade un componente de tabla y configura su propiedad **data source** (fuente de datos) a la consulta que añadiste.
1. Amplía la sección **Advanced** (Avanzado) de la consulta y busca **Post-query Transformation** (Transformación posterior a la consulta).
1. Sustituya `return outputs` por la línea siguiente:

    ```
    outputs.dashboards.filter(row => row.title.includes(searchInput.value))
    ```

Puedes escribir texto en el componente de entrada de texto y las filas de la tabla se filtrarán por ese texto.

Si necesita el resultado de la consulta original, sin transformar, puedes referenciarlo como `${listDashboards0.rawOutputs}`.

## Filtrado del lado del servidor

En algunos casos, es posible que quieras filtrar valores del lado del servidor y emitir nuevas solicitudes cuando el usuario introduce un valor en una entrada, como por ejemplo un componente de entrada de texto.

En este caso, puedes activar el filtrado del lado del servidor editando la consulta directamente.

Por ejemplo, en el plano del [pipeline de solicitudes de extracción de GitHub][4], la consulta `listOpenedPulls` tiene una entrada que obtiene la siguiente URL:

```
https://api.github.com/search/issues?q=org:${organizationInput.value}+author:${userNameInput.value}+type:pr+state:open
```

La API de GitHub acepta parámetros de consulta para filtrar por organización, autor o tipo de solicitud de extracción. La URL de entrada de la consulta anterior contiene expresiones de plantilla para `organizationInput.value`, que es el valor del componente de entrada de texto "Organización", y `userNameInput.value`, que es el valor del componente de entrada de texto "Nombre de usuario". Si defines la configuración de ejecución de la consulta en automática, la consulta se actualizará automáticamente cuando cambien los valores de estas expresiones de plantilla y se actualizarán los valores de la tabla.


## Mostrar un indicador de carga

Si quieres mostrar un indicador de carga en una tabla mientras se obtienen los datos, puedes configurar el valor `isLoading` _de la tabla_ igual a la propiedad `isLoading` _de la consulta_. Por ejemplo:

1. Sigue los pasos de [filtrado con una entrada de texto][2].
1. En las propiedades de tu tabla, en **Appearance** (Apariencia), haz clic en el **&lt;/&gt;** junto a **Is Loading** (Se está cargando) para abrir el editor de código.
1. Configura el valor `isLoading` de la tabla con la siguiente expresión:

    ```
    ${listDashboards0.isLoading}
    ```

La tabla muestra un indicador de carga cuando se escribes texto nuevo en el componente de entrada de texto.

## Valores dinámicos de la tabla

Puedes utilizar la propiedad **data source** (fuente de datos) de un componente de tabla para rellenar dinámicamente los valores de la tabla y restringir qué objetos se introducen en la tabla como columnas.

Por ejemplo, el plano del [resumidor de solicitudes de extracción de GitHub][3] utiliza una serie de consultas de GitHub para resumir una lista de solicitudes de extracción en un repositorio. La consulta utiliza la entrada de la fuente de datos para restringir la tabla a 6 columnas: `title`,`Summary`,`updated_at`,`user`,`html_url` y `state`. El código resaltado rellena dinámicamente la columna de usuario de cada solicitud de extracción con el avatar del autor y el nombre de usuario de GitHub.

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

En la tabla, la columna **User** (Usuario) se rellena con un avatar y un nombre de usuario de GitHub para cada autor de una solicitud pull.



## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tienes preguntas o comentarios? Únete al canal **#app-builder** en [Datadog Community Slack][0].

[0]: https://datadoghq.slack.com/
[1]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=pagerduty_oncall_manager&viewMode=preview
[2]: /es/service_management/app_builder/components/tables/#filtering-with-a-text-input
[3]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=github-pr-summarizer
[4]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=github-pr-dashboard&viewMode=preview