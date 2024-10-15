---
algolia:
  tags:
  - flujo de trabajo
  - rastreo
  - automatización de flujos de trabajo
  - lógica
  - paso lógico
  - flujo
aliases:
- /es/workflows/logic_actions
- /es/service_management/workflows/actions_catalog/logic_actions/
disable_toc: false
further_reading:
- link: /integrations/
  tag: Documentación
  text: Más información sobre integraciones
is_beta: false
title: Lógica del flujo de trabajo
type: rastreo
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La automatización de flujos de trabajo no es compatible con el <a href="/getting_started/site">sitio de Datadog </a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Utiliza [acciones lógicas][2] para añadir una lógica de control a tu flujo de trabajo. Por ejemplo, puedes realizar una ramificación a partir de una condición, realizar una acción de forma iterativa, incluir un intervalo de inactividad, etc.

## Ramificar el flujo de trabajo a partir de una condición

Puedes ramificar la ruta de ejecución de tu flujo de trabajo basándote en la evaluación de una o más sentencias que definas. En la siguiente captura de pantalla, una acción **Branch workflow from condition** (Ramificar flujo de trabajo a partir de una condición) determina el siguiente paso en el flujo de trabajo, en función de si el código de estado de una acción de solicitud HTTP anterior devuelve `200` o no.

{{< img src="service_management/workflows/branch-workflow-configuration3.png" alt="Lienzo del flujo de trabajo que muestra una ramificación del flujo de trabajo a partir de la acción de la condición seleccionada y la pestaña de configuración abierta. En la sección Statements (Sentencias) se ven dos sentencias resaltadas para indicar que el estado de la solicitud anterior debe ser 200." >}}

## Inactividad

La acción **Sleep** (Inactividad) detiene la ejecución del flujo de trabajo durante un tiempo especificado. Selecciona una duración predefinida en el menú desplegable **Duration** (Duración) o introduce una variable personalizada en segundos.

## Iteración

La acción **For each** (Para cada) permite ejecutar una acción específica de forma iterativa para cada elemento de una lista de entrada determinada. Esto te permite automatizar tareas repetitivas aplicando la misma acción a varios elementos de una lista.

{{< img src="service_management/workflows/iteration.png" alt="Ejemplo de paso iterativo" style="width:100%;" >}}

La acción se compone del paso For each (Para cada) y de un paso interno que quieres realizar de forma iterativa. La salida de un paso For each es una matriz de salidas del paso interno.

Por ejemplo, utilizando For each (Para cada) junto con una acción de CloudFlare, puedes iterar y bloquear una lista de direcciones IP. En este escenario, añades la lista de direcciones IP como **Input list** (Lista de entrada) en el paso For each. A continuación, añades una acción CloudFlare como paso interno y la configuras para bloquear el valor actual en el bucle de iteración. Cuando el flujo de trabajo se ejecuta, el paso CloudFlare se repite para cada valor en la lista, accediendo al valor actual de IP y bloqueándolo.

Para configurar una iteración **For each** (Para cada):
1. Haz clic en el icono más (**+**) del lienzo del flujo de trabajo para abrir el [catálogo de acciones][1].
1. Busca y selecciona el paso **For each** (Para cada).
1. Para seleccionar una acción interna para repetirla, arrastra un paso existente desde tu lienzo al paso **For each** (Para cada) o haz clic en el icono más (**+**), dentro del paso **For each**, y haz una selección en el catálogo de acciones.
1. Haz clic en el paso **For each** (Para cada) e introduce una **Input list** (Lista de entrada) para que el paso la pueda iterar.
1. Activa **Continue on error** (Continuar en caso de error), si quieres que la acción continúe con la lista de valores restantes cuando se produce un error.
1. Configura la acción interna. Para acceder al valor actual de la lista de entrada, utiliza la variable `{{Current.Value}}`. Para acceder al índice del valor actual, utiliza `{{Current.Index}}`.
1. **Save** (Guarda) y **Run** (Ejecuta) la acción.

Cuando se completa una ejecución, el flujo de trabajo entra en modo **Debug** (Depuración). Selecciona el paso For each (Para cada) para ver:
* La salida de cada iteración.
* El número de iteraciones completadas y fallidas.

Puedes eliminar el paso interno de las siguientes maneras:
- Haciendo clic en el paso interno y seleccionando **Delete** (Eliminar).
- Haciendo clic en el paso For each (Para cada) y seleccionando **Clear** (Borrar).
## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/service_management/workflows/build/#build-a-workflow-with-the-workflow-builder
[2]: https://app.datadoghq.com/workflow/action-catalog#logic//com.datadoghq.core.if