---
disable_toc: false
further_reading:
- link: logs/explorer/analytics
  tag: Documentación
  text: Realizar análisis de logs
- link: /logs/explorer/export
  tag: Documentación
  text: Exportar vistas desde el Log Explorer
- link: /logs/explorer/saved_views/
  tag: Documentación
  text: Información sobre las vistas guardadas
title: Búsqueda avanzada
---

## Información general

Cuando necesitas limitar aún más los resultados de una búsqueda de log, utiliza [subconsultas](#filter-logs-with-subqueries) para comparar tus resultados con un grupo secundario de logs, o filtra tus logs utilizando datos de tus [Tablas de referencia](#filter-logs-based-on-reference-tables).

## Filtrar logs con subconsultas

Utiliza subconsultas cuando desees filtrar los resultados de una consulta basándote en los resultados de una consulta secundaria. Consulta [ejemplos de subconsultas](#subquery-examples) para ver dos escenarios de ejemplo.

Para añadir un filtro de subconsulta:

1. Ve a [Log Explorer (Explorador de logs)][1].
1. Introduce una consulta en la barra de búsqueda para filtrar tus logs. Esta es la consulta principal.
1. Haz clic en **+ Add** (+ Añadir).
1. En la sección **Add Query Filter** (Añadir filtro de consulta), selecciona **Logs**.

Esto introduce nuevos elementos en el editor de consultas:

{{< img src="logs/explorer/advanced_search/subquery.png" alt="El editor de subconsulta en la consulta de búsqueda principal" style="width:95%;" >}}

1. En el campo **where** (dónde), utiliza el menú desplegable para seleccionar el atributo con el que deseas establecer la correlación. Los atributos disponibles son los de logs devueltos por la consulta principal.
1. Define tu filtro de subconsulta en el campo **from** (de).
1. En el menú desplegable **Select Column** (Seleccionar columna) que precede al filtro de la subconsulta, selecciona el atributo por el que deseas agrupar y ordenar los resultados de la subconsulta.
1. Selecciona si deseas utilizar el operador **IN** o **NOT IN**:
    - Los resultados del operador **IN** solo incluyen los logs en los que el valor del atributo también se encuentra en los resultados de la subconsulta. Por ejemplo, si solo deseas ver los logs generados por `service:a` y asociados a un usuario que también es uno de los principales usuarios de `service:b`.
    - Los resultados del operador **NOT IN** excluyen los logs en los que se encuentra el valor del atributo en los resultados de la subconsulta. Por ejemplo, si solo deseas ver logs `status:error`, pero también deseas filtrar logs `status:error` en los que los usuarios asociados a esos logs acaben finalmente con un log `status:success`. Consulta [Filtrar logs obsoletos o sustituidos](#filter-outdated-or-superseded-logs) para ver un ejemplo detallado.
1. Opcionalmente, reduce el número de valores de atributos de subconsulta con los que comparar. El valor por defecto y máximo es `1000`. Elige entre **top** (principal) (valores de mayor frecuencia) o **bottom** (inferior) (valores de menor frecuencia).

### Ejemplos de subconsultas

Los siguientes son escenarios en los que necesitas utilizar subconsultas para obtener la información que necesitas de tus logs.

#### Filtrar logs obsoletos o sustituidos

Supongamos que gestionas una plataforma de comercio electrónico. Se genera un log cada vez que uno de tus clientes intenta realizar un pedido. Deseas analizar tus logs para conocer el valor total de las compras potenciales perdidas debido a un problema continuo con tu sitio web.

Sin embargo, te das cuenta de que un pedido puede fallar varias veces antes de completarse con éxito: lo que significa que para ese ID de pedido en particular, hay entradas de log en los resultados de búsqueda, tanto para logs `status:error` como para logs `status:success`. Si extrajeras listas de ID de pedido únicas de las dos consultas, este ID de pedido aparecería en ambas. Con las subconsultas, puedes obtener una lista mutuamente excluyente.

En este ejemplo, solo estás interesado en logs para los pedidos que finalmente no tuvieron éxito. Para excluir los pedidos que finalmente tuvieron éxito utilizando la función de subconsulta:

1. Define una subconsulta para logs `status:success`.
1. Selecciona el operador **NOT IN** para excluir los pedidos del conjunto de resultados de la subconsulta.

{{< img src="logs/explorer/advanced_search/filter_outdated_example.png" alt="El editor de consulta que muestra la configuración para filtrar pedidos que terminan teniendo éxito" style="width:100%;" >}}

#### Correlación entre diferentes fuentes de log

Supón que tienes un servicio llamado `network_directory` que supervisa todos los recursos internos de red y el acceso a esos recursos dentro de tu organización. Los eventos de log generados por este servicio incluyen atributos estándar (como `host`, `service`, `source`) y atributos personalizados como la dirección IP del cliente.

Además, tienes otro servicio `device-manager` que rastrea todos los activos internos (infraestructura, dispositivos de los empleados, etc.).

Estás investigando un ataque en curso y observas que hay un aumento significativo de solicitudes de API en casi todos tus endpoints. En primer lugar, deseas identificar las direcciones IP asociadas a volúmenes de solicitudes anómalos para poder bloquearlas en el cortafuegos. Sin embargo, tus servicios internos son algunos de los mayores consumidores de estos endpoints y necesitas excluirlos de tus resultados de consulta para evitar bloquearlos por error.

En este ejemplo, utiliza `service:network_directory` como consulta principal y, a continuación, define un filtro de subconsulta para tu servicio `device-manager` para filtrar los resultados de los dispositivos reconocidos.

{{< img src="logs/explorer/advanced_search/narrow_dataset_example.png" alt="El editor de consulta que muestra la configuración para filtrar los resultados para los dispositivos reconocidos" style="width:100%;" >}}

## Filtrar logs a partir de tablas de referencia

{{% filter_by_reference_tables %}}

{{< img src="logs/explorer/advanced_search/reference_table_join_filter.png" alt="El Datadog Log Explorer con las opciones de búsqueda de la tabla de referencia resaltadas. Incluye pasos numerados alineados con las instrucciones previas" border="true" popup="true" style="width:100%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/logs
[2]: /es/integrations/guide/reference-tables/?tab=manualupload