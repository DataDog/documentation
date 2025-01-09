---
aliases:
- /es/logs/search
description: Filtra logs para reducir, ampliar o cambiar tu enfoque en el subconjunto
  de logs de interés actual.
further_reading:
- link: logs/explorer/analytics
  tag: Documentación
  text: Aprende a agrupar logs
- link: logs/explorador/visualizar
  tag: Documentación
  text: Crear visualizaciones a partir de logs
- link: /logs/explorer/export
  tag: Documentación
  text: Exportar vistas desde el Log Explorer
title: Buscar logs
---

## Información general

Aunque la información de logs individualmente puede ser útil visualizada como una lista, a veces se puede acceder a información valiosa a través de la agregación. Para acceder a esta información, busca logs en el [Log Explorer][5] y visualízalos como series temporales, listas principales, mapas de árbol, gráficos circulares o tablas.

La búsqueda de Log Explorer consta de un rango temporal y una consulta de búsqueda, combinando la búsqueda de `key:value` y texto completo.

## Consulta de búsqueda

Por ejemplo, para filtrar en logs producidos por un servicio de tienda web, con un estado de error, durante los últimos quince minutos, crea una consulta personalizada como `service:payment status:error rejected` y establece el intervalo de tiempo en `Past 15 minutes`:

{{< img src="logs/explorer/search_filter.png" alt="Crear una consulta de búsqueda en el Log Explorer que filtre los logs de error de pagos rechazados de un servicio de tienda web" style="width:100%;" >}}

Los [logs indexados][1] admiten tanto consultas de texto completo como búsquedas de `key:value`.

**Nota**: Las consultas a `key:value` **no** requieren que se [declare una faceta][2] de antemano.

## Autocompletar

Utiliza la función de autocompletar de la barra de búsqueda para completar tu consulta:
- Claves y valores existentes en tus logs
- Tus búsquedas recientes (no se muestran las búsquedas recientes de otros usuarios)
- Vistas guardadas

{{< img src="logs/explorer/search/log_search_bar_autocomplete.png" alt="La barra de búsqueda de logs muestra el servicio: como consulta y el remitente, el balance, el servidor de avisos y la VPC como opciones a autocompletar" style="width:80%;">}}

### Facetas y valores de autocompletar

La barra de búsqueda sugiere automáticamente facetas en función de lo que escribas. Estas facetas se muestran en el mismo orden en el que aparecen en el [panel de facetas][5]. Si una faceta tiene un nombre definido, se muestra a la derecha del desplegable. Las facetas que no están configuradas para mostrarse en el panel de facetas no se autosugieren para una búsqueda.

{{< img src="logs/explorer/search/log_facet_autocomplete.png" alt="La barra de búsqueda de logs que muestra `network` como la consulta y las facetas @network.bytes_written, @network.client.ip y @network.interface como opciones a autocompletar" style="width:80%;">}}

Después de seleccionar una faceta e introducir el carácter `:`, la barra de búsqueda autosugiere valores. Estos valores se muestran en orden descendente según el número de logs que contienen ese par `facet:value` en los últimos 15 minutos. El número estimado de logs que contienen ese valor se muestra a la derecha del menú desplegable. Por ejemplo, el servicio `balance-checker` se sitúa en primer lugar en la lista de valores autosugeridos para la faceta `service`, indicada por `2.66M`, que representa el recuento de logs más elevado:

{{< img src="logs/explorer/search/log_value_autocomplete.png" alt="La barra de búsqueda de logs que muestra `service:` como la consulta, y los valores balance, servidor de avisos, detector de fraude y ejecutor de intercambios como opciones a autocompletar" style="width:80%;">}}

### Autocompletar búsquedas recientes

Se conservan tus 100 búsquedas más recientes en el Log Explorer. Las búsquedas recientes de otros usuarios no se conservan ni se muestran. La barra de búsqueda autosugiere las cuatro búsquedas más recientes que coinciden con lo introducido en la barra de búsqueda, mostrando en primer lugar la búsqueda más reciente. La barra de búsqueda también muestra cuánto tiempo hace que se ejecutó cada búsqueda reciente. Por ejemplo, si introduces `service:web-store status:error` en la barra de búsqueda, las cuatro búsquedas más recientes que contienen estos términos se muestran por orden de antigüedad, cada una especificando un error diferente:

{{< img src="logs/explorer/search/log_recent_searches.png" alt="La barra de búsqueda de logs que muestra `service:web-store status:error` como la consulta y búsquedas recientes de diferentes errores de servicio de tienda web como opciones a autocompletar" style="width:80%;">}}

### Autocompletar vistas guardadas

Puedes crear Vistas guardadas en el Log Explorer para guardar consultas y contexto adicional para el futuro y para un acceso centralizado. La barra de búsqueda te sugiere automáticamente las Vistas guardadas que coinciden con tu entrada en la barra de búsqueda. Las Vistas guardadas se muestran en el mismo orden en el que están situadas en el panel de Vistas guardadas, mostrándose en primer lugar las vistas guardadas destacadas. El nombre de la Vista guardada, la consulta guardada y la imagen de perfil del usuario que la actualizó por última vez se muestran en el menú desplegable. Si la consulta de una Vista guardada es demasiado larga para mostrarse en el menú desplegable, se muestra la consulta completa en un cuadro de herramientas al pasar el ratón por encima. El correo electrónico del usuario que actualizó por última vez una vista guardada también se muestra en un cuadro de herramientas al pasar el ratón por encima de su foto de perfil.

{{< img src="logs/explorer/search/log_autocomplete_saved_views.png" alt="La barra de búsqueda de logs que muestra `service:web-store status:error` como la consulta y Vistas guardadas de errores de servicio de diferentes tiendas web como opciones a autocompletar" style="width:80%;">}}

## Sintaxis de búsqueda

El resaltado de la sintaxis diferencia claramente los tipos de entrada, como claves (por ejemplo, un atributo como `@merchant_name`), valores (por ejemplo, el nombre de un determinado comerciante), texto libre (por ejemplo, palabras clave en un mensaje de log como `responded 500`) y caracteres de control (por ejemplo, paréntesis y dos puntos). Los atributos de estado también se resaltan con colores que representan el estado, como rojo para `error` y azul para `info`.

{{< img src="logs/explorer/search/log_syntax_highlighting.png" alt="La barra de búsqueda de logs que muestra `service:auth-dotnet status:error 500 (check-token OR create-user)` como la consulta con una sistaxis distinguible resaltada" style="width:100%;">}}

Los estados de error claros te informan qué parte de la consulta contiene errores de sintaxis y cómo corregirlos. Por ejemplo:
- Si introduces la consulta `service:` sin ningún valor, aparecerá el mensaje "Missing value in key:value pair" (Falta valor en el par clave:valor) al pasar el ratón por encima de la consulta.
- Si introduces paréntesis para una consulta de rango, pero no rellenas los valores superior e inferior, aparecerá el mensaje "Expected term but end of input found" (Término encontrado, pero se ha llegado al final de la entrada).
- Si introduces varios valores para un campo de log, pero omites el carácter de paréntesis de cierre, como `service:(web-store OR auth-dotnet`, aparece el mensaje `Missing closing parenthesis character`.

{{< img src="logs/explorer/search/log_error_states.png" alt="La barra de búsqueda de logs que muestra `service:(web-store OR auth-dotnet` como la consulta con el mensaje `Missing closing parenthesis character`" style="width:50%;">}}

Para empezar a buscar logs y personalizar el marco temporal en el Log Explorer, lee la [documentación sobre Sintaxis de búsqueda][3] y la [documentación sobre Marcos temporales personalizados][4].

## Desactivar estilo y autocompletar para la barra de búsqueda

Alterna el botón situado a la derecha de la barra de búsqueda para buscar en modo sin procesar, en el que se eliminan el resaltado de sintaxis, el estilo de píldoras de búsqueda y la función de autocompletar:

{{< img src="logs/explorer/search/log_raw_search_mode.png" alt="La barra de búsqueda de logs que muestra `service:auth-dotnet status:error 500 (check-token OR create-user)` como la consulta en el modo de búsqueda sin formato" style="width:100%;">}}

Puedes interactuar con la barra de búsqueda con el ratón, así como utilizando comandos del teclado. Por ejemplo, utiliza `CMD-A` para seleccionar texto, `CMD-C` para copiar texto, `CMD-X` para cortar texto y `CMD-V` para pegar texto.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/indexes
[2]: /es/logs/explorer/facets/
[3]: /es/logs/search-syntax
[4]: /es/dashboards/guide/custom_time_frames
[5]: /es/logs/explorer/