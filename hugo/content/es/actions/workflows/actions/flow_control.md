---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
  - logic
  - logic step
  - flow
aliases:
- /es/workflows/logic_actions
- /es/service_management/workflows/actions_catalog/logic_actions/
- /es/service_management/workflows/actions/flow_control
description: Agregue lógica de control a los flujos de trabajo mediante condiciones
  if, declaraciones switch, bucles, intervalos de espera y acciones de ramificación.
disable_toc: false
further_reading:
- link: /integrations/
  tag: Documentación
  text: Obtenga información sobre integraciones
is_beta: false
title: Lógica de flujo de trabajo
type: workflows
---
Utilice [Logic actions][1] para agregar lógica de control a su flujo de trabajo. Por ejemplo, puede ramificar desde una condición, realizar una acción de forma iterativa, incluir un intervalo de espera y más.

## Condición If {#if-condition}

Puede ramificar la ruta de ejecución de su flujo de trabajo según la evaluación de una o más declaraciones que usted defina. En la captura de pantalla a continuación, una acción {{< ui >}}If condition{{< /ui >}} determina el siguiente paso en el flujo de trabajo según si el código de estado de una acción de solicitud HTTP anterior devuelve `200`.

{{< img src="actions/workflows/actions/flow_control/if-condition.png" alt="El lienzo del flujo de trabajo con una acción de condición if seleccionada y la pestaña de configuración abierta. La sección Statements está resaltada con dos declaraciones que especifican que el estado de una solicitud anterior debe ser 200." >}}

## Declaración Switch {#switch-statement}

Utilice la acción de declaración Switch para manejar múltiples rutas de ramificación en un solo paso. Especifique una expresión switch y compárela con uno o más valores de incidencia. Si ninguna incidencia coincide, se ejecuta una rama predeterminada en su lugar. En el ejemplo siguiente, una declaración Switch enruta el flujo de trabajo según si el código de estado de una solicitud HTTP anterior es `200`, `403`, `404`, `500` u otro valor.

{{< img src="actions/workflows/actions/flow_control/switch-statement.png" alt="El lienzo del flujo de trabajo que muestra una acción de declaración Switch llamada 'Make_request.status' ramificándose en múltiples incidencias para diferentes códigos de estado HTTP. Cada incidencia envía un mensaje de Slack diferente, y la rama predeterminada arroja un error inesperado si ninguna otra incidencia coincide." >}}

## Espera {#sleep}

La acción {{< ui >}}Sleep{{< /ui >}} pausa la ejecución del flujo de trabajo durante una duración especificada. Seleccione una duración predefinida del menú desplegable {{< ui >}}Duration{{< /ui >}} o ingrese una variable personalizada en segundos.

## Bucle For {#for-loop}

La acción {{< ui >}}For loop{{< /ui >}} le permite ejecutar un conjunto de acciones de forma iterativa para cada elemento en una lista de entrada determinada. Los bucles For aceptan una lista de entrada de hasta 2000 elementos. Puede realizar muchas operaciones diferentes dentro de un bucle for, incluyendo la configuración de rutas de error y la actualización de variables.

En el ejemplo siguiente, un bucle for itera sobre una lista de incidentes y envía un mensaje de Slack para cualquier incidente que tenga más de una semana de antigüedad.

{{< img src="actions/workflows/actions/flow_control/iteration2.png" alt="Un flujo de trabajo con un bucle for. El bucle itera sobre una lista de incidentes y envía un mensaje a un canal de Slack si el incidente tiene más de una semana de antigüedad." style="width:100%;" >}}

Para añadir un bucle for a su flujo de trabajo:
1. Haga clic en el icono de más ({{< ui >}}\+{{< /ui >}}) en el lienzo de su flujo de trabajo para abrir el catálogo de acciones.
1. Busque y seleccione el paso {{< ui >}}For loop{{< /ui >}}.
1. Haga clic en el paso de bucle e introduzca una {{< ui >}}Input list{{< /ui >}} sobre la cual iterar el paso. Puede introducir una lista personalizada o utilizar una variable de flujo de trabajo.
1. Dentro del marco del bucle, haga clic en el icono ({{< ui >}}\+{{< /ui >}}) para añadir un paso al bucle.
1. Configure la acción en bucle. Para acceder al valor actual en la lista de entrada, utilice el `{{Current.Value}}` variable. To access the index of the current value, use `{{Current.Index}}`.
1. Añada y configure cualquier paso adicional que necesite incluir en el bucle. Puede utilizar un {{< ui >}}if statement{{< /ui >}} y un {{< ui >}}break{{< /ui >}} para salir del bucle antes de tiempo.
1. {{< ui >}}Save{{< /ui >}} y {{< ui >}}Publish{{< /ui >}} el flujo de trabajo.

Cuando una ejecución se completa, el flujo de trabajo entra en modo {{< ui >}}Debug{{< /ui >}}. Seleccione un paso dentro del bucle para ver una lista de {{< ui >}}All{{< /ui >}}, {{< ui >}}Failed{{< /ui >}} o {{< ui >}}Successful{{< /ui >}} iteraciones para ese paso. Seleccione una iteración para ver la salida o el mensaje de error.

## Bucle while {#while-loop}

La acción {{< ui >}}While loop{{< /ui >}} le permite ejecutar un conjunto de acciones de forma iterativa según un conjunto de condiciones y se recomienda para patrones de automatización donde el número de repeticiones no se conoce de antemano. Los bucles while ejecutan un máximo de 2000 iteraciones. Puede realizar diferentes operaciones con un bucle while, incluyendo paginación, sondeo de progreso y reintentos hasta lograr el éxito.

El siguiente ejemplo utiliza un bucle while para paginar la API List Buckets de AWS S3 para una App.

{{< img src="actions/workflows/actions/flow_control/iteration3.png" alt="Un flujo de trabajo con un bucle while. El flujo de trabajo utiliza un bucle while para paginar la API List Buckets de AWS S3 para una App." style="width:100%;" >}}

Para agregar un bucle while a su flujo de trabajo:
1. Haga clic en el icono de más ({{< ui >}}\+{{< /ui >}}) en el lienzo de su flujo de trabajo para abrir el catálogo de acciones.
1. Busque y seleccione el paso {{< ui >}}While loop{{< /ui >}}.
1. Haga clic en el paso de bucle y defina la condición que el bucle While evaluará antes de cada iteración. El bucle continúa si la condición es verdadera y se detiene cuando se evalúa como falsa.
1. Dentro del marco del bucle, haga clic en el icono de más ({{< ui >}}\+{{< /ui >}}) para agregar un paso al bucle.
1. Configure la acción en bucle. Para acceder al índice del valor actual, utilice `{{Current.Index}}`.
1. Añada y configure cualquier paso adicional que necesite incluir en el bucle. Puede utilizar una acción {{< ui >}}if statement{{< /ui >}} y una {{< ui >}}break{{< /ui >}} para salir de su bucle antes de tiempo.
1. {{< ui >}}Save{{< /ui >}} y {{< ui >}}Publish{{< /ui >}} el flujo de trabajo.

Cuando una ejecución se completa, el flujo de trabajo entra en modo {{< ui >}}Debug{{< /ui >}}. Seleccione un paso dentro del bucle para ver una lista de {{< ui >}}All{{< /ui >}}, {{< ui >}}Failed{{< /ui >}} o {{< ui >}}Successful{{< /ui >}} iteraciones para ese paso. Seleccione una iteración para ver la salida o el mensaje de error. Seleccione el paso Bucle While y un índice específico para ver la condición evaluada en ese índice.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tiene preguntas o comentarios? Únase al canal **#workflows** en el [Datadog Community Slack][2].

[1]: https://app.datadoghq.com/workflow/action-catalog#logic//com.datadoghq.core.if
[2]: https://chat.datadoghq.com/