---
algolia:
  tags:
  - workflow (UI) / proceso (generic)
  - workflows (UI) / procesos (generic)
  - automatización del workflow (UI) / proceso (generic)
  - lógica
  - step (UI) / paso (generic) lógico
  - flujo
aliases:
- /es/workflows/logic_actions
- /es/service_management/workflows/actions_catalog/logic_actions/
- /es/service_management/workflows/actions/flow_control
description: Añade una lógica de control a los workflows (UI) / procesos (generic)
  mediante condiciones if, sentencias switch, bucles, intervalos de inactividad y
  acciones de ramificación.
disable_toc: false
further_reading:
- link: /integrations/
  tag: Documentación
  text: Más información sobre integraciones
is_beta: false
title: Lógica del workflow (UI) / proceso (generic)
type: workflows (UI) / procesos (generic)
---

Utiliza [Acciones lógicas][1] para añadir una lógica de control a tu workflow (UI) / proceso (generic). Por ejemplo, puedes ramificar a partir de una condición, realizar una acción de forma iterativa, incluir un intervalo de inactividad, etc.

## Condición if

Puedes ramificar la ruta de ejecución de tu workflow (UI) / proceso (generic) en función de la evaluación de una o más sentencias que definas. En la siguiente captura de pantalla, una acción de **If condition** (condición if) determina el siguiente step (UI) / paso (generic) en el workflow (UI) / proceso (generic) según si el código de estado de una acción de solicitud HTTP anterior devuelve `200`.

{{< img src="service_management/workflows/if-condition.png" alt="El lienzo del workflow (UI) / proceso (generic) con una acción de condición if seleccionada y la pestaña de configuración abierta. La sección Sentencias está resaltada con dos sentencias en las que se especifica que el estado de una solicitud anterior debe ser 200." >}}

## Sentencia switch

Utiliza la acción de sentencia Switch para manejar múltiples rutas de ramificación en un solo step (UI) / paso (generic). Especifica una expresión de conmutación y compárala con uno o varios valores de case (incidencia). Si no coincide ningún case (incidencia), se ejecuta una rama predeterminada en su lugar. En el siguiente ejemplo, una sentencia Switch enruta el workflow (UI) / proceso (generic) según si el código de estado de una solicitud HTTP anterior es `200`, `403`, `404`, `500` u otro valor.

{{< img src="service_management/workflows/switch-statement.png" alt="El lienzo del workflow (UI) / proceso (generic) que muestra una acción de sentencia Switch denominada ramificación 'Make_request.status' en varias cases (incidencias) para diferentes códigos de estado HTTP. Cada case (incidencia) envía un mensaje Slack diferente y la rama predeterminada arroja un error inesperado si ninguna otra case (incidencia) coincide." >}}

## Inactividad

La acción **Sleep** (Inactividad) detiene la ejecución del workflow (UI) / proceso (generic) durante un tiempo especificado. Selecciona una duración predefinida en el menú desplegable **Duration** (Duración) o introduce una variable personalizada en segundos.

## Bucle For

La acción de **For loop** (bucle For) permite ejecutar un conjunto de acciones de forma iterativa para cada elemento de una lista de entrada dada. Los bucles for aceptan una lista de entrada de hasta 2000 elementos. Puedes realizar muchas operaciones diferentes en un bucle for, incluida la configuración de rutas de error y la actualización de variables.

En el ejemplo siguiente, un bucle for itera una lista de incidents (incidentes) y envía un mensaje Slack para cualquier incident (incidente) que tenga más de una semana de antigüedad.

{{< img src="service_management/workflows/iteration2.png" alt="Un workflow (UI) / proceso (generic) con un bucle for. El bucle itera una lista de incidents (incidentes) y envía un mensaje a un canal slack si el incident (incidente) tiene más de una semana de antigüedad." style="width:100%;" >}}

Para añadir un bucle for a tu workflow (UI) / proceso (generic):
1. Haz clic en el icono más (**+**) del lienzo del workflow (UI) / proceso (generic) para abrir el catálogo de acciones.
1. Busca y selecciona el step (UI) / paso (generic) **For loop** (bucle for).
1. Haz clic en el step (UI) / paso (generic) de bucle e introduce una **Input list** (Lista de entradas) para que el step (UI) / paso (generic) la itere. Puedes introducir una lista personalizada o utilizar un workflow (UI) / proceso (generic) variable.
1. En el marco del bucle, haz clic en el icono (**+**) para añadir un step (UI) / paso (generic) al bucle.
1. Configura la acción del bucle. Para acceder al valor actual de la lista de entrada, utiliza la variable `{{Current.Value}}`. Para acceder al índice del valor actual, utiliza `{{Current.Index}}`.
1. Añade y configura cualquier step (UI) / paso (generic) adicional que necesites para el bucle. Puedes utilizar una **if statement** (sentencia if) y una **break** (pausa) para salir del bucle antes de tiempo.
1. **Guarda** y **Publica** el workflow (UI) / proceso (generic).

Cuando finaliza una ejecución, el workflow (UI) / proceso (generic) entra en el modo **Debug** (Depurar). Selecciona un step (UI) / paso (generic) en el bucle para ver una lista de **All** (Todas), **Failed** (Fallidas) o iteraciones **Succesful** (Con éxito) para ese step (UI) / paso (generic). Selecciona una iteración para ver el resultado o el mensaje de error.

## Bucle while

La acción de **While loop** (Bucle While) te permite ejecutar un conjunto de acciones de forma iterativa en función de un conjunto de condiciones y se recomienda para patrones de automatización en los que el número de repeticiones no se conoce de antemano. Los bucles while ejecutan un máximo de 2000 iteraciones. Puedes realizar diferentes operaciones con un bucle while, incluidas paginación, sondeo de progreso y reintento hasta el éxito.

El siguiente ejemplo utiliza un bucle while para paginar la API AWS S3 List Buckets para una aplicación.

{{< img src="service_management/workflows/iteration3.png" alt="Un workflow (UI) / proceso (generic) con un bucle while. El workflow (UI) / proceso (generic) utiliza un bucle while para paginar la API de AWS S3 List Buckets para una aplicación." style="width:100%;" >}}

Para añadir un bucle while a tu workflow (UI) / proceso (generic):
1. Haz clic en el icono más (**+**) del lienzo del workflow (UI) / proceso (generic) para abrir el catálogo de acciones.
1. Busca y selecciona el step (UI) / paso (generic) **While loop** (Bucle While).
1. Haz clic en el step (UI) / paso (generic) de bucle y define la condición que el bucle While evaluará antes de cada iteración. El bucle continúa si la condición es true y se detiene cuando se evalúa como false.
1. En el marco del bucle, haz clic en el icono más (**+**) para añadir un step (UI) / paso (generic) al bucle.
1. Configura la acción de bucle. Para acceder al índice del valor actual, utiliza `{{Current.Index}}`.
1. Añade y configura cualquier step (UI) / paso (generic) adicional que necesites para el bucle. Puedes utilizar una **if statement** (sentencia if) y una acción **break** (pausa) para salir del bucle antes de tiempo.
1. **Guarda** y **Publica** el workflow (UI) / proceso (generic).

Cuando finaliza una ejecución, el workflow (UI) / proceso (generic) entra en el modo **Debug** (Depurar). Selecciona un step (UI) / paso (generic) en el bucle para ver una lista de **All** (Todas), **Failed** (Fallidas) o iteraciones **Successful** (con éxito) para ese step (UI) / paso (generic). Selecciona una iteración para ver el resultado o el mensaje de error. Selecciona el step (UI) / paso (generic) del bucle While y un índice específico para ver la condición evaluada en el índice.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tienes preguntas o comentarios? Únete al canal **#workflows** en [Datadog Community Slack][2].

[1]: https://app.datadoghq.com/workflow/action-catalog#logic//com.datadoghq.core.if
[2]: https://chat.datadoghq.com/