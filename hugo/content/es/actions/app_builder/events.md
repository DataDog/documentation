---
aliases:
- /es/app_builder/events
- /es/service_management/app_builder/events
description: Configura los activadores de eventos y las reacciones de los componentes
  de la interfaz de usuario, incluidas las funciones de estado para interacciones
  y comportamientos dinámicos de la aplicación.
disable_toc: false
further_reading:
- link: /service_management/app_builder/build/
  tag: Documentación
  text: Crear aplicaciones
- link: /service_management/app_builder/components/
  tag: Documentación
  text: Componentes
- link: https://learn.datadoghq.com/courses/app-builder-integration
  tag: Centro de aprendizaje
  text: Crea aplicaciones de autoservicio con App Builder para integraciones de terceros
title: Eventos
---

Los componentes de interfaz de usuario pueden desencadenar reacciones en un **evento**. Los desencadenantes de eventos difieren según el componente. Por ejemplo, un componente de botón puede desencadenar una reacción en un evento de clic, y un componente de tabla puede desencadenar una reacción en un evento de cambio de página o de clic en una fila de la tabla. Para ver qué activadores de eventos están disponibles para un componente determinado, consulta [Componentes][1].

Un evento puede establecer el estado de un componente de interfaz de usuario, abrir o cerrar un modal, activar otra consulta o incluso ejecutar un JavaScript personalizado.

Por ejemplo, el esquema del [resumidor de solicitudes pull de GitHub PR][2] utiliza un botón **Summarize** (Resumir) con un evento que se activa al hacer clic. El evento utiliza la reacción **Trigger Query** (Activar consulta) que ejecuta la consulta `summarizePulls`.

Además de trabajar con eventos manualmente, puedes utilizar Bits AI para configurar controladores de eventos, configurar acciones basadas en eventos y optimizar la lógica de eventos:
   1. Haz clic en el icono **Build with AI** (Construir con IA) (**<i class="icon-bits-ai"></i>**).
   1. Introduce un prompt personalizado para un evento, o prueba el prompt `How can you help me with events?`.

### Funciones de estado

App Builder proporciona funciones para algunos tipos de cambios de estado de la aplicación. Estas funciones están disponibles en reacciones a eventos personalizados para componentes específicos y en hooks posteriores a la consulta.


fetch
: realiza la consulta sobre la que se ejecuta esta función. Esta función está disponible para todos los componentes que ofrecen el tipo de reacción de evento personalizado.<br>
**Ejemplo**: `query0.fetch()` ejecuta la consulta llamada `query0`.

setIsOpen
: establece el estado de un modal a abierto o cerrado basándose en el valor booleano que proporciones.<br>
**Ejemplo**: consulta la sección [Componentes][1] de la página de la documentación para el componente **modal**.

setPageIndex
: establece la propiedad `pageIndex` del componente de tabla en la página que especifiques. Funciona con el tipo de paginación del lado del servidor.<br>
**Ejemplo**: consulta la sección [Componentes][1] de la página de la documentación para el componente **table**.

setSelectedRow
: establece la propiedad `selectedRow` del componente de tabla en la fila que se especifique.<br>
**Ejemplo**: consulta la sección [Componentes][1] de la página de la documentación para el componente **table**.

setTabIndex
: establece la propiedad `selectedTabIndex` del componente de tabla al índice de pestaña que especifiques.<br>
**Ejemplo**: consulta la sección [Componentes][1] de la página de la documentación para el componente **tab**.

setValue
: establece el valor de un elemento al valor que proporciones a la función.<br>
**Ejemplos**: consulta la sección [Componentes][1] de la página de la documentación para los componentes **form**, **number input**, **radio button**, **search**, **select**, **text area** y **text input**.

Para ver qué funciones de estado están disponibles para un componente determinado, consulta [Componentes][1].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tienes preguntas o comentarios? Únete al canal **#app-builder** en [Datadog Community Slack][8].

[1]: /es/service_management/app_builder/components
[2]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=github-pr-summarizer
[8]: https://chat.datadoghq.com/