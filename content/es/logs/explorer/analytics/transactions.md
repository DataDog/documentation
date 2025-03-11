---
description: Agrupa los logs consultados en transacciones.
further_reading:
- link: logs/explorer/
  tag: Documentación
  text: Más información sobre Log Explorer
- link: logs/explorer/analytics
  tag: Documentación
  text: Aprender a analizar tus logs
title: Agrupación de logs en transacciones
---

## Información general

Las transacciones agregan logs indexados según instancias de una secuencia de eventos, como una sesión de usuario o una solicitud procesada a través de múltiples microservicios.

La agregación de transacciones difiere de la agregación de grupos naturales, en el sentido de que los agregados resultantes no solo incluyen logs que coinciden con la consulta, sino también todos los logs pertenecientes a las transacciones relacionadas.

Puedes utilizar la siguiente información sobre transacciones para personalizar tu consulta de búsqueda:

Duración
: diferencia entre las marcas temporales del último y el primer log de la transacción. _Esta medida se añade automáticamente_.

Gravedad máxima
: encontrada en logs en la transacción. _Esta medida se añade automáticamente_.

Buscar elementos clave
: para cualquier `facet` con valores de cadena, calcula información específica de log utilizando las operaciones `count unique`, `latest`, `earliest` y `most frequent`.

Obtener estadísticas
: para cualquier `measure`, calcula información estadística utilizando las operaciones `min`, `max`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95` y `pc99`.

Establecer condiciones de inicio y fin
: personaliza los límites de la transacción especificando el inicio y el final de la transacción mediante consultas distintas.

Por ejemplo, un sitio web de comercio electrónico agrupa logs a través de varias acciones del usuario, como búsqueda de catálogo, añadir al carrito y proceder al pago, para crear una vista **Transacciones** utilizando un atributo común como `requestId` o `orderId`.

{{< img src="logs/explorer/aggregations_transactions.jpg" alt="El Log Explorer que muestra logs agrupados por transacciones" style="width:100%;" >}}

Las transacciones admiten la visualización [Lista de agregados][1]. Al hacer clic en una transacción en la lista, se abre el panel lateral de transacciones desde el que puedes:

- Accede a todos los logs dentro de esa transacción
- Busca logs específicos dentro de esa transacción

{{< img src="logs/explorer/transactions_side_panel.png" alt="El panel de log de transacción que muestra logs dentro de la transacción seleccionada" style="width:80%;" >}}

Cuando se utiliza una condición de inicio o fin para definir una transacción, haz clic en un grupo de transacciones en la lista para abrir el panel lateral del grupo de transacciones, desde el que puedes:

- Acceder a las transacciones dentro de ese grupo de transacciones en secuencia
- Acceder a todos los logs dentro de cada transacción
- Ver las estadísticas de cada transacción y las estadísticas resumidas de todo el grupo de transacciones

{{< img src="logs/explorer/transaction_group_side_panel.png" alt="El panel de grupo de transacción que muestra transacciones dentro del grupo seleccionado en secuencia" style="width:80%;" >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/explorer/visualize/#list-aggregates-of-logs