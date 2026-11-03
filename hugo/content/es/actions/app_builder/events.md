---
aliases:
- /es/app_builder/events
- /es/service_management/app_builder/events
description: Configure los activadores y reacciones de eventos de los componentes
  de la interfaz de usuario, incluidas las funciones de estado para interacciones
  y comportamientos dinámicos de la aplicación.
disable_toc: false
further_reading:
- link: /actions/app_builder/build/
  tag: Documentación
  text: Crear aplicaciones
- link: /actions/app_builder/components/
  tag: Documentación
  text: Componentes
- link: https://learn.datadoghq.com/courses/app-builder-integration
  tag: Centro de aprendizaje
  text: Cree aplicaciones de autoservicio con App Builder para Third-Party Integrations
title: Eventos
---
Los componentes de la interfaz de usuario pueden activar reacciones en un {{< ui >}}Event{{< /ui >}}. Los activadores de eventos difieren según el componente. Por ejemplo, un componente de botón puede activar una reacción en un evento de clic, y un componente de tabla puede activar una reacción en un evento de cambio de página o de clic en una fila de la tabla. Para ver qué activadores de eventos están disponibles para un componente determinado, consulte [Components][1].

Un evento puede establecer el estado de un componente de la interfaz de usuario, abrir o cerrar un modal, activar otra consulta o incluso ejecutar JavaScript personalizado.

Por ejemplo, el plano [GitHub PR summarizer][2] utiliza un botón {{< ui >}}Summarize{{< /ui >}} con un evento que se activa al hacer clic. El evento utiliza la reacción {{< ui >}}Trigger Query{{< /ui >}} que ejecuta la consulta `summarizePulls`.

Además de trabajar con eventos manualmente, puede usar Bits AI para configurar controladores de eventos, configurar acciones controladas por eventos y optimizar la lógica de eventos:
   1. Haga clic en el icono {{< ui >}}Build with AI{{< /ui >}} (**<i class="icon-bits-ai"></i>**).
   1. Ingrese un prompt personalizado para un evento, o pruebe el prompt `How can you help me with events?`.


## Eventos y reacciones {#events-and-reactions}

En App Builder, los eventos y las reacciones funcionan juntos para determinar el comportamiento de los componentes. 

Tanto los componentes (como los clics en botones o los envíos de formularios) como las acciones (como la finalización de una ejecución) pueden activar eventos. Los eventos difieren según el componente que utilice. Para obtener detalles sobre eventos específicos de cada componente, consulte [Components][1].

Las reacciones especifican qué sucede cuando se activa un evento. Cualquier componente que pueda activar un evento tiene las siguientes reacciones disponibles: 
- {{< ui >}}Close Modal{{< /ui >}}
- {{< ui >}}Custom{{< /ui >}}
- {{< ui >}}Download File{{< /ui >}}
- {{< ui >}}Open Modal{{< /ui >}}
- {{< ui >}}Open Side Panel{{< /ui >}}
- {{< ui >}}Close Side Panel{{< /ui >}}
- {{< ui >}}Open URL{{< /ui >}}
- {{< ui >}}Set Component State{{< /ui >}}
- {{< ui >}}Set State Variable Value{{< /ui >}}
- {{< ui >}}Toast Notification{{< /ui >}}
- {{< ui >}}Trigger Action{{< /ui >}}

### Reacciones personalizadas {#custom-reactions}

Las reacciones personalizadas permiten casos de uso más avanzados o comportamientos personalizados más allá de las reacciones integradas. Por ejemplo, puede ejecutar acciones de forma condicional según otros datos en la aplicación. El siguiente ejemplo activa diferentes acciones según el equipo del usuario actual:

```javascript
${() => {
    console.log("Trigger actions by team")
    const teams = global?.user?.teams ?? []
    if (teams.some(t => t?.name === "team1")) {
        makeRequest0?.fetch()
    } else if (teams.some(t => t?.name === "team2")) {
        makeRequest1?.fetch()
    } else {
        makeRequest2?.fetch()
    }
}}
```

## Funciones de estado {#state-functions}

App Builder proporciona funciones para algunos tipos de cambios de estado de la aplicación. Estas funciones están disponibles con la reacción {{< ui >}}Set Component State{{< /ui >}} para componentes específicos y en los ganchos posteriores a la consulta.

setIsOpen
: Establece el estado de un modal como abierto o cerrado según el valor booleano que proporcione.<br>
**Ejemplo**: Consulte la sección de la página de documentación de [Components][1] para el componente **modal**.

setPageIndex
: Establece la propiedad `pageIndex` del componente de tabla en la página que especifique. Funciona con el tipo de paginación del lado del servidor.<br>
**Ejemplo**: Consulte la sección de la página de documentación de [Components][1] para el componente **tabla**.

setSelectedRow
: Establece la propiedad `selectedRow` del componente de tabla en la fila que especifique.<br>
**Ejemplo**: Consulte la sección de la página de documentación de [Components][1] para el componente **tabla**.

setTabIndex
: Establece la propiedad `selectedTabIndex` del componente de tabla en el índice de pestaña que especifique.<br>
**Ejemplo**: Consulte la sección de la página de documentación de [Components][1] para el componente **tab**.

setValue
: Establece el valor de un elemento en el valor que proporcione a la función.<br>
**Ejemplos**: Consulte las secciones de la página de documentación de [Components][1] para los componentes **form**, **number input**, **radio button**, **search**, **select**, **text area** y **text input**.

Para ver qué funciones de estado están disponibles para un componente determinado, consulte [Components][1].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tiene preguntas o comentarios? Únase al canal **#app-builder** en el [Datadog Community Slack][8].

[1]: /es/actions/app_builder/components
[2]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=github-pr-summarizer
[8]: https://chat.datadoghq.com/