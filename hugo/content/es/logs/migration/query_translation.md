---
description: Traduzca consultas SPL de Splunk a la sintaxis de Datadog y convierta
  alertas y tableros de Splunk en seguimientos y tableros de Datadog.
further_reading:
- link: /logs/explorer/search_syntax/
  tag: Documentación
  text: Sintaxis de búsqueda de registros
- link: /ddsql_editor/
  tag: Documentación
  text: DDSQL Editor
- link: /monitors/types/log/
  tag: Documentación
  text: Monitores de registros
- link: /dashboards/
  tag: Documentación
  text: Dashboards
title: Traducción de consultas
---
## Descripción general {#overview}

Query Translation, parte de Migration App, traduce el lenguaje de procesamiento de Splunk (SPL) a la [sintaxis de búsqueda de registros][1] de Datadog y convierte los activos de Splunk en sus equivalentes de Datadog. Proporciona dos herramientas:

| Herramienta | Caso de uso |
|------|-----------|
| [Translate][2] | Traduzca una sola consulta SPL y vea el equivalente de Datadog con una explicación de la traducción. |
| [Import][3] | Importe exportaciones CSV de alertas y tableros de Splunk, y traduzca sus consultas a la sintaxis de búsqueda de registros. Revise los resultados y, a continuación, cree los seguimientos y tableros de Datadog correspondientes. |

Query Translation solo admite Splunk como plataforma de origen. Analiza y convierte las consultas de forma determinista con bibliotecas de traducción, no con un modelo de lenguaje de gran tamaño. Cada consulta se traduce a la [sintaxis de búsqueda de registros][1] siempre que sea posible para su uso con Log Explorer, los monitores de registros y los widgets de tableros. Las consultas analíticamente complejas que la sintaxis de búsqueda de registros no puede expresar recurren a [DDSQL][4].

## Permisos {#permissions}

La importación de activos de Splunk requiere el permiso `logs_read_config`. La publicación de un recurso traducido también requiere el permiso para el activo que se está creando: `monitors_write` para seguimientos y `dashboards_write` para tableros. Consulte [Permisos de roles de Datadog][5].

## Traducir una sola consulta {#translate-a-single-query}

Utilice la página Translate como un entorno de pruebas para SPL. Está diseñada para explorar el comportamiento de la traducción en lugar de migrar un inventario de activos.

1. Vaya a [Logs > Translate][2].
2. Pegue una consulta SPL en el cuadro de consulta o seleccione uno de los ejemplos proporcionados.
3. Haga clic en {{< ui >}}Translate{{< /ui >}}.

La página devuelve:

- **Consulta traducida**: La consulta de Datadog, en sintaxis de búsqueda de registros o DDSQL, que se muestra en la barra de búsqueda sobre el gráfico {{< ui >}}Translation preview{{< /ui >}}.
- {{< ui >}}Translation preview{{< /ui >}}: Los datos que coinciden con la consulta traducida, durante un intervalo de tiempo que usted especifique. Haga clic en {{< ui >}}View in Log Explorer{{< /ui >}} para continuar en [Log Explorer][6].
- {{< ui >}}Translated SPL{{< /ui >}}: Su SPL original, anotado con todo lo que el traductor cambió o no pudo traducir, como índices eliminados o comandos no admitidos.
- {{< ui >}}How did we translate?{{< /ui >}}: Una explicación de qué comando de SPL se asigna a qué parte de la consulta de Datadog.

Para crear un seguimiento de la consulta traducida, haga clic en {{< ui >}}Create Monitor{{< /ui >}}.

## Migrar activos de forma masiva {#migrate-assets-in-bulk}

La página Import migra muchos activos de Splunk a la vez. Usted carga su inventario de Splunk como archivos CSV y la herramienta los agrupa en una importación con nombre. Traduce las consultas de cada activo a la sintaxis de Datadog y crea el seguimiento o Dashboard de Datadog correspondiente. Usted revisa cada resultado y luego lo publica para crear el activo en Datadog. Se admiten los siguientes tipos de recursos:

| Recurso de Splunk | Equivalente de Datadog | Notas |
|-----------------|--------------------|-------|
| Alerta (búsqueda guardada) | [Seguimiento][7] | Se traduce a un monitor de registros cuando es posible. De lo contrario, se traduce a un seguimiento de análisis con una consulta DDSQL. |
| Dashboard | [Dashboard][8] | Se admiten tanto los Dashboards de Studio (JSON) como los de Classic (XML). Cada panel se traduce en un widget independiente. |
| Macro de búsqueda | Ninguna | Antes de la traducción, la herramienta reemplaza cada referencia de macro en sus alertas y tableros con la definición SPL de la macro. Las macros no se publican como activos de Datadog. |

### Exporte sus activos desde Splunk {#export-your-assets-from-splunk}

Exporte cada tipo de recurso desde Splunk como un archivo CSV independiente:

1. Inicie sesión en Splunk y abra la aplicación Search.
2. Ejecute la consulta para el tipo de recurso que desea exportar:

   Alerts:
   ```
   | rest /services/saved/searches splunk_server=local
   | table
     title
     eai:acl.owner
     eai:acl.app
     search
     triggered_alert_count
     alert_condition
     alert_threshold
     alert_comparator
     alert_type
     actions
     action.email.to
     action.email.message.alert
     action.slack.param.channel
     action.slackparam.message
     description
   ```

   Dashboards:
   ```
   | rest /servicesNS/admin/search/data/ui/views
   | spath input=eai:data path=dashboard.definition output=definition
   | spath input=eai:data path=dashboard output=dashboard_xml
   | where isnotnull(definition) OR (isnull(definition) AND isnotnull(dashboard_xml))
   | eval result=if(isnotnull(definition), definition, 'eai:data')
   | eval type=if(isnotnull(definition), "studio", "legacy")
   | eval title=if(type=="studio", json_extract(result, "title"), null())
   | eval description=if(type=="studio", json_extract(result, "description"), null())
   | spath input=result path=dashboard.label output=xml_title
   | spath input=result path=dashboard.description output=xml_description
   | eval title=coalesce(title, xml_title)
   | eval description=coalesce(description, xml_description)
   | fields type,title,description,result
   ```

   Macros:
   ```
   | rest /servicesNS/-/-/admin/macros count=0 splunk_server=local
   | table definition author disabled title args updated eai:appName validation
   ```

3. Confirme que los resultados contengan los activos que desea migrar.
4. Encima de los resultados, haga clic en el botón de exportar, seleccione el formato CSV y descargue el archivo.
5. Repita el proceso para cada tipo de recurso. Exporte la consulta de macros si alguna de sus alertas o tableros utiliza macros de búsqueda.

Las mismas instrucciones, con capturas de pantalla de la interfaz de usuario de Splunk, están disponibles en el asistente de importación en {{< ui >}}How to export your assets from Splunk?{{< /ui >}}.

### Importe sus activos a Datadog {#import-your-assets-into-datadog}

1. Vaya a [Logs > Import][3] y haga clic en {{< ui >}}Get Started{{< /ui >}}.
2. En {{< ui >}}Select source{{< /ui >}}, seleccione {{< ui >}}Splunk Processing Language (SPL){{< /ui >}}.
3. En {{< ui >}}Upload your assets from Splunk{{< /ui >}}, añada sus archivos CSV de alertas y tableros. Suba tantos archivos como necesite, pero deje el archivo de macros fuera de este paso.
4. En {{< ui >}}Macros file{{< /ui >}}, suba el CSV de macros, si tiene uno.
5. En {{< ui >}}Name your import{{< /ui >}}, asigne a la importación un nombre que la identifique más adelante.
6. Haga clic en {{< ui >}}Import{{< /ui >}}.

La traducción comienza tan pronto como se crea la importación y se ejecuta en segundo plano. Puede cerrar la página y volver a ella.

### Revisar y publicar {#review-and-publish}

Abra una importación para ver cada recurso que contiene y el estado de su traducción:

| Estado | Significado |
|--------|---------|
| In Progress | El recurso se está traduciendo. |
| Translated | Un equivalente de Datadog está listo para revisar y publicar. |
| Published | El recurso existe en Datadog. La importación enlaza a él. |
| Skipped | El recurso no se pudo traducir. |

Haga clic en un recurso para ver su SPL original, la consulta traducida y la explicación de la traducción. No se garantiza que una consulta traducida devuelva los mismos resultados que el original de Splunk. Revise cada traducción antes de publicar el seguimiento o el tablero.

Un tablero muestra un estado para cada uno de sus widgets y se publica como un solo tablero. Ábralo para ver qué widgets fueron traducidos y cuáles devolvieron un error.

Los seguimientos y tableros con el estado Skipped no se pueden publicar, y una traducción no se puede editar en Datadog antes de ser publicada. Para corregir un recurso omitido o un widget de tablero que devolvió un error, corríjalo en la fuente e impórtelo de nuevo:

1. Corrija el activo en Splunk y expórtelo de nuevo, o edite el CSV exportado directamente. Editar el CSV suele ser más rápido para una corrección pequeña, como cambiar el nombre de un índice o atributo para que coincida con el de Datadog.
2. (Opcional) Elimine la importación original para reutilizar su nombre. En la página [Import][3], coloque el cursor sobre la importación, haga clic en el icono de la papelera y luego haga clic en {{< ui >}}Delete current migration{{< /ui >}}.
3. Cargue el archivo corregido como una nueva importación.

## Brechas de traducción {#translation-gaps}

La traducción convierte SPL a la sintaxis de búsqueda de registros de Datadog, pero no garantiza resultados idénticos. Estas brechas explican la mayoría de las diferencias:

Los registros tienen una forma diferente en cada plataforma
: Los Pipelines, los procesadores y los agentes de envío de registros difieren entre ambas plataformas. Como resultado, los atributos disponibles en un registro difieren. El traductor conserva los nombres de los atributos tal como están escritos, excepto cuando asigna [atributos estándar][9]. Si un pipeline de Datadog no produce un atributo del que depende la consulta de Splunk, la consulta traducida no devuelve resultados. Para solucionar esto, agregue [procesadores][10] a sus pipelines de Datadog para producir el atributo. Por ejemplo, utilice un parser Grok para extraerlo del mensaje o un remapper para cambiar el nombre de un atributo existente.

Los índices no coinciden
: Los nombres de los índices de Splunk rara vez se asignan uno a uno a los [índices de registro][11] de Datadog. Un filtro de índice que no se puede resolver provoca un error en la consulta. El traductor elimina los términos de índice que no tienen equivalente en Datadog y los marca como una advertencia. Revise la advertencia y, en su lugar, delimite el contexto de la consulta mediante etiquetas o atributos.

No hay suficientes datos de muestra
: Una consulta que se ejecuta en un índice con pocos datos coincidentes devuelve una vista previa vacía. Una vista previa vacía hace que la traducción sea difícil de verificar. Confirme que los registros relevantes estén en Datadog antes de evaluar una traducción.

El comando SPL no es compatible
: Query Translation admite una amplia gama de comandos SPL. Cuando un comando no tiene un equivalente en Datadog, el traductor devuelve la mayor parte posible de la consulta y marca el comando no compatible.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/explorer/search_syntax/
[2]: https://app.datadoghq.com/logs/query-translator/translator
[3]: https://app.datadoghq.com/logs/batch-migration
[4]: /es/ddsql_editor/
[5]: /es/account_management/rbac/permissions/
[6]: /es/logs/explorer/
[7]: /es/monitors/types/log/
[8]: /es/dashboards/
[9]: /es/standard-attributes/
[10]: /es/logs/log_configuration/processors/
[11]: /es/logs/log_configuration/indexes/