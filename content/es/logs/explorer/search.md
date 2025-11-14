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

El [Log Explorer][5] te permite buscar y ver logs individualmente como una lista. Sin embargo, las perspectivas más valiosas a menudo provienen de la agregación de logs a escala. Utilizando la función de búsqueda, puedes filtrar los logs y visualizarlos como gráficos de series temporales, listas principales, mapas de árbol, gráficos circulares o tablas para comprender mejor las tendencias, los patrones y los valores atípicos de tus datos de log.

## Consultas en lenguaje natural

{{% site-region region="gov" %}}
<div class="alert alert-danger">
Las consultas en lenguaje natural no están disponibles en el <a href="/getting_started/site">sitio Datadog</a> ({{< region-param key="dd_site_name" >}}).
</div>
{{% /site-region %}}

<div class="alert alert-info">Las consultas en lenguaje natural (NLQ) para logs se <strong>crean con Llama</strong>.</div>

Utiliza las consultas en lenguaje natural (NLQ) para describir lo que buscas en inglés sencillo. Datadog traduce automáticamente tu solicitud en una consulta estructurada de logs, lo que facilita la exploración de logs sin necesidad de escribir una sintaxis compleja. Para acceder a esta función, haz clic en **Ask** (Preguntar) en el campo de búsqueda.

{{< img src="/logs/explorer/search/log_explorer_nlq.mp4" alt="Consulta en lenguaje natural en el Log Explorer que muestra cómo buscar logs usando frases en inglés sencillo" video=true >}}

El sistema traduce las entradas en lenguaje natural en consultas a Datadog y entiende contextos como servicios, atributos, etiquetas y rangos temporales. También detecta automáticamente los campos relevantes y permite a los usuarios crear visualizaciones con descripciones sencillas, por ejemplo, "Los 20 principales servicios por errores" o "Mostrar errores del servicio X en las últimas 24 horas".

Para desactivar NLQ, debes tener [permisos `org_management`][8]. Ve a [Organization Settings > Preferences][7] (Configuración de la organización > Preferencias) y desactiva la función de consultas en lenguaje natural.

## Consulta de búsqueda

Una búsqueda en el Log Explorer consiste en un intervalo de tiempo y una consulta de búsqueda, mezclando `key:value` y una [búsqueda de texto completo][6].

Para filtrar en logs producidos por un servicio de tienda web, con un estado de error, durante los últimos quince minutos, crea una consulta personalizada como `service:payment status:error rejected` y establece el intervalo de tiempo en `Past 15 minutes`:

{{< img src="logs/explorer/search_filter.png" alt="Crear una consulta de búsqueda en el Log Explorer que filtre los logs de error de pagos rechazados de un servicio de tienda web" style="width:100%;" >}}

Los [logs indexados][1] admiten tanto [consultas de texto completo][6] como búsquedas de `key:value`.

**Nota**: Las consultas a `key:value` **no** requieren que se [declare una faceta][2] de antemano.

## Autocompletar

Utiliza la función de autocompletar de la barra de búsqueda para completar tu consulta:
- Claves y valores existentes en tus logs
- Tus búsquedas recientes (no se muestran las búsquedas recientes de otros usuarios)
- Vistas guardadas

{{< img src="logs/explorer/search/log_search_bar_autocomplete.png" alt="La barra de búsqueda de logs muestra service como consulta y el remitente, el balance, el servidor de avisos y la VPC como opciones a autocompletar" style="width:80%;">}}

### Facetas y valores de autocompletar

La barra de búsqueda sugiere automáticamente facetas en función de lo que introduzcas en la barra de búsqueda. Estas facetas se muestran en el mismo orden en que aparecen en el [panel de facetas][5]. Si una faceta tiene un nombre definido, se muestra a la derecha del menú desplegable.

{{< img src="logs/explorer/search/log_facet_autocomplete.png" alt="La barra de búsqueda de logs que muestra `network` como consulta y las facetas @network.bytes_written, @network.client.ip y @network.interface como opciones para autocompletar" style="width:80%;">}}

Después de seleccionar una faceta e introducir el carácter `:`, la barra de búsqueda sugiere valores. Estos se muestran en orden descendente según el número de logs que contienen ese par `facet:value` en los últimos 15 minutos. El número estimado de logs que contienen ese valor se muestra a la derecha del desplegable. Por ejemplo, el servicio `balance-checker` se sitúa en primer lugar en la lista de valores autosugeridos para la faceta `service`, indicada por `2.66M`, que representa el recuento de logs más elevado:

{{< img src="logs/explorer/search/log_value_autocomplete.png" alt="La barra de búsqueda de logs que muestra `service:` como consulta y los valores balance, servidor de avisos, detector de fraude y ejecutor de intercambios como opciones para autocompletar" style="width:80%;">}}

### Autocompletar búsquedas recientes

Se conservan tus 100 búsquedas más recientes en el Log Explorer. Las búsquedas recientes de otros usuarios no se conservan ni se muestran. La barra de búsqueda autosugiere las cuatro búsquedas más recientes que coinciden con lo introducido en la barra de búsqueda, mostrando en primer lugar la búsqueda más reciente. La barra de búsqueda también muestra cuánto tiempo hace que se ejecutó cada búsqueda reciente. Por ejemplo, si introduces `service:web-store status:error`, las cuatro búsquedas más recientes que contienen estos términos se muestran por orden de antigüedad, cada una especificando un error diferente:

{{< img src="logs/explorer/search/log_recent_searches.png" alt="La barra de búsqueda de logs que muestra `service:web-store status:error` como consulta y búsquedas recientes de diferentes errores de servicio de tienda web como opciones para autocompletar" style="width:80%;">}}

### Autocompletar vistas guardadas

Puedes crear vistas guardadas en el Log Explorer para guardar consultas y contexto adicional para el futuro y para un acceso centralizado. La barra de búsqueda te sugiere automáticamente las vistas guardadas que coinciden con tu entrada en la barra de búsqueda. Las vistas guardadas se muestran en el mismo orden en el que están situadas en el panel de vistas guardadas, mostrándose en primer lugar las destacadas. El nombre de la vista guardada, la consulta guardada y la imagen de perfil del usuario que la actualizó por última vez aparecen en el desplegable. Si la consulta de una vista guardada es demasiado larga para mostrarse en el desplegable, aparecerá la consulta completa en la información emergente al pasar el cursor por encima. El correo electrónico del usuario que actualizó por última vez una vista guardada también se muestra en la información emergente al pasar el cursor por encima de su foto de perfil.

{{< img src="logs/explorer/search/log_autocomplete_saved_views.png" alt="La barra de búsqueda de logs que muestra `service:web-store status:error` como consulta y vistas guardadas de errores de servicio de diferentes tiendas web como opciones para autocompletar" style="width:80%;">}}

## Sintaxis de búsqueda

El resaltado de la sintaxis diferencia claramente los tipos de entrada, como claves (por ejemplo, un atributo como `@merchant_name`), valores (por ejemplo, el nombre de un determinado comerciante), texto libre (por ejemplo, palabras clave en un mensaje de log como `responded 500`) y caracteres de control (por ejemplo, paréntesis y dos puntos). Los atributos de estado también se resaltan con colores que representan el estado, como rojo para `error` y azul para `info`.

{{< img src="logs/explorer/search/log_syntax_highlighting.png" alt="La barra de búsqueda de logs que muestra `service:auth-dotnet status:error 500 (check-token OR create-user)` como consulta con una sistaxis distinguible resaltada" style="width:100%;">}}

Los estados de error claros te informan qué parte de la consulta contiene errores de sintaxis y cómo corregirlos. Por ejemplo:
- Si introduces la consulta `service:` sin ningún valor, aparecerá el mensaje "Missing value in key:value pair" (Falta valor en el par clave:valor) al pasar el cursor por encima de la consulta.
- Si introduces paréntesis para una consulta de rango, pero no rellenas los valores superior e inferior, aparecerá el mensaje "Expected term but end of input found" (Término encontrado, pero se ha llegado al final de la entrada).
- Si introduces varios valores para un campo de log, pero omites el carácter de paréntesis de cierre, como `service:(web-store OR auth-dotnet`, aparecerá el mensaje `Missing closing parenthesis character`.

{{< img src="logs/explorer/search/log_error_states.png" alt="La barra de búsqueda de logs que muestra `service:(web-store OR auth-dotnet` como consulta con el mensaje `Missing closing parenthesis character`" style="width:50%;">}}

Para empezar a buscar logs y personalizar el marco temporal en el Log Explorer, lee la [documentación sobre Sintaxis de búsqueda][3] y la [documentación sobre Marcos temporales personalizados][4].

## Desactivar estilo y autocompletar para la barra de búsqueda

Alterna el botón situado a la derecha de la barra de búsqueda para buscar en modo sin procesar, en el que se eliminan el resaltado de sintaxis, el estilo de píldoras de búsqueda y la función de autocompletar:

{{< img src="logs/explorer/search/log_raw_search_mode.png" alt="La barra de búsqueda de logs que muestra `service:auth-dotnet status:error 500 (check-token OR create-user)` como consulta en el modo de búsqueda sin formato" style="width:100%;">}}

Puedes interactuar con la barra de búsqueda con el ratón, así como utilizando comandos del teclado. Por ejemplo, utiliza `CMD-A` para seleccionar texto, `CMD-C` para copiar texto, `CMD-X` para cortar texto y `CMD-V` para pegar texto.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/indexes
[2]: /es/logs/explorer/facets/
[3]: /es/logs/search-syntax
[4]: /es/dashboards/guide/custom_time_frames
[5]: /es/logs/explorer/
[6]: /es/logs/explorer/search_syntax/#full-text-search
[7]: https://app.datadoghq.com/organization-settings/preferences
[8]: /es/account_management/rbac/permissions/#access-management