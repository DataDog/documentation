---
aliases:
- /es/observability_pipelines/live_capture/
description: Aprenda a usar Live Capture para ver los datos que recibe una fuente
  y los datos que envía un procesador a través de una canalización de Observability
  Pipelines.
disable_toc: false
further_reading:
- link: /observability_pipelines/configuration/set_up_pipelines/
  tag: Documentación
  text: Configure Pipelines
- link: https://www.datadoghq.com/blog/observability-pipelines-google-secops/
  tag: Blog
  text: Normalice los registros de seguridad a Google SecOps UDM con Observability
    Pipelines
- link: https://www.datadoghq.com/blog/mitre-attack-enrichment-packs-observability-pipelines/
  tag: Blog
  text: Enriquezca automáticamente los registros de seguridad con el contexto de MITRE
    ATT&CK antes de que lleguen a su SIEM
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- icon: metrics
  name: Métricas
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Live Capture
---
{{< product-availability >}}

## Descripción general {#overview}

Use Live Capture para ver los datos que una fuente envía a través de la canalización y también los datos que un procesador recibe y envía.
Específicamente, se muestra la siguiente información:
- La marca de tiempo de cuándo se recibieron los datos
- Los datos que se enviaron y si fueron:
    - Modificado
    - Sin modificar
    - Descartado
    - Reducido

Un ejemplo de Live Capture que muestra el campo `message` del registro antes y después de haber sido procesado por el procesador Parse JSON.

{{< img src="observability_pipelines/live_capture_parse_json.png" alt="La columna de entrada muestra los valores del campo de mensaje original y la columna de salida muestra los valores analizados como JSON" style="width:100%;" >}}

## Permisos {#permissions}

Solo los usuarios con el permiso `Observability Pipelines Live Capture Write` pueden configurar capturas. Los usuarios con el permiso `Observability Pipelines Live Capture Read` solo pueden visualizar los eventos que ya han sido capturados. Consulte [Observability Pipelines Permissions][1] para obtener una lista de permisos para los activos de Observability Pipelines.

Los administradores tienen permisos de lectura y escritura de forma predeterminada. Los usuarios estándar solo tienen permiso de lectura de forma predeterminada. Consulte [Access Control][2] para obtener más información sobre los roles predeterminados de Datadog y cómo crear roles personalizados.

### Agregar dominios a la lista de permitidos del firewall {#add-domains-to-firewall-allowlist}

Si desea utilizar Live Capture y está utilizando un firewall, debe agregar estos dominios a la lista de permitidos:

- `api.{{< region-param key="dd_site" >}}`
- `obpipeline-intake.{{< region-param key="dd_site" >}}`
- `config.{{< region-param key="dd_site" >}}`

## Capturar eventos {#capture-events}

1. Navegue a [Observability Pipelines][3].
1. Seleccione su canalización.
1. Haga clic en el engranaje de la fuente o procesador para el que desea capturar eventos.
1. Seleccione {{< ui >}}Capture and view events{{< /ui >}} en el panel lateral.
1. Haga clic en {{< ui >}}Capture{{< /ui >}}.
1. **Configuraciones opcionales**:
  {{< img src="observability_pipelines/live_capture_optional_config.png" alt="El modal de configuración opcional de Live Capture que muestra la consulta de filtro, la duración de la captura y las opciones de selección de Worker" style="width:60%;" >}}
  **Nota**: Las configuraciones opcionales solo están disponibles si todos los Workers activos son de la versión 2.13 o posterior.
    1. Ingrese una consulta para especificar qué eventos desea capturar. Para obtener más información, consulte [Sintaxis de búsqueda para registros][4] o [Sintaxis de búsqueda para métricas][5].
    1. Ingrese una duración de captura (en segundos o minutos) para indicar cuánto tiempo desea que se capturen los eventos.
        - Duración mínima (predeterminada si no se especifica ninguna duración): 30 segundos
        - Duración máxima: 300 segundos (5 minutos)
    1. Seleccione los Workers de los cuales desea capturar eventos. Si no se selecciona ningún Worker, se elige uno al azar.
1. Haga clic en {{< ui >}}Capture{{< /ui >}} para comenzar a capturar eventos.<br>**Nota**: Los eventos capturados pueden tardar hasta 60 segundos en aparecer en la interfaz de usuario. Los datos capturados son visibles para todos los usuarios con permisos para visualizar y se almacenan en la plataforma Datadog durante 72 horas.
1. Una vez completada la captura:
    1. Haga clic en un evento capturado específico para ver los datos que se recibieron y enviaron. También puede buscar eventos específicos en la barra de búsqueda. Utilice el menú desplegable junto a la barra de búsqueda para mostrar eventos según su estado (`MODIFIED`, `UNMODIFIED`, `DROPPED` y `REDUCED`).
    1. En la sección {{< ui >}}Workers - Capture Execution Details{{< /ui >}}, haga clic en {{< ui >}}View Logs{{< /ui >}} para ver los registros del trabajador para la captura.
1. Para ver otras capturas del mismo componente, haga clic en {{< ui >}}Captures{{< /ui >}} en la parte superior izquierda del panel lateral. **Nota**: Visualizar otras capturas solo se aplica si todos los Workers activos son de la versión 2.13 o posterior.
   - Puede filtrar las capturas por ID de evento de captura, consulta de filtro, versión de canalización o estado (`in_progress` o `completed`).
   - Para la columna {{< ui >}}Total Events{{< /ui >}}, el máximo de eventos capturados por trabajador es 200 al incluir tanto la entrada como la salida de un evento.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/rbac/permissions/#observability-pipelines
[2]: /es/account_management/rbac/
[3]: https://app.datadoghq.com/observability-pipelines
[4]: /es/observability_pipelines/search_syntax/logs
[5]: /es/observability_pipelines/search_syntax/metrics