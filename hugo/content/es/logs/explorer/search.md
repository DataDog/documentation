---
aliases:
- /es/logs/search
description: Filtre los registros para limitar, ampliar o cambiar su enfoque en el
  subconjunto de registros de interés actual.
further_reading:
- link: logs/explorer/analytics
  tag: Documentación
  text: Aprenda a agrupar registros
- link: logs/explorer/visualize
  tag: Documentación
  text: Cree visualizaciones a partir de registros
- link: /logs/explorer/export
  tag: Documentación
  text: Exporte visualizaciones desde el Log Explorer
title: Buscar registros
---
## Descripción general {#overview}

El [Log Explorer][1] le permite buscar y ver registros individuales como una lista. Sin embargo, los conocimientos más valiosos a menudo provienen de la agregación de registros a escala. Al utilizar la función de búsqueda, puede filtrar registros y visualizarlos como gráficos de series temporales, listas principales, mapas de árbol, gráficos circulares o tablas para comprender mejor las tendencias, los patrones y los valores atípicos en sus datos de registros.

## Consultas en lenguaje natural {#natural-language-queries}

{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">
Las consultas en lenguaje natural no están disponibles en el <a href="/getting_started/site">sitio de Datadog</a> ({{< region-param key="dd_site_name" >}}).
</div>
{{% /site-region %}}
Utilice Natural Language Queries (NLQ) para describir lo que busca en inglés sencillo. Datadog traduce automáticamente su solicitud a una consulta de registro estructurada, lo que facilita la exploración de registros sin necesidad de escribir una sintaxis compleja. Para acceder a esta función, haga clic en {{< ui >}}Ask{{< /ui >}} en el campo de búsqueda.

{{< img src="/logs/explorer/search/log_explorer_nlq.mp4" alt="Consulta en lenguaje natural en el Log Explorer que muestra cómo buscar registros mediante frases en inglés sencillo." video=true >}}

El sistema traduce la entrada en lenguaje natural a consultas de Datadog y comprende el contexto, como servicios, atributos, etiquetas y rangos de tiempo. También detecta campos relevantes automáticamente y permite a los usuarios crear visualizaciones mediante descripciones sencillas; por ejemplo, "Top 20 servicios por errores" o "Mostrar errores del servicio X en las últimas 24 horas".

Para deshabilitar NLQ, debe tener [`org_management` permisos][2]. Navegue a [{{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Preferences{{< /ui >}}][3] y desactive la función de Natural Language Queries.

## Consulta de búsqueda {#search-query}

Una búsqueda en Log Explorer consiste en un intervalo de tiempo y una consulta de búsqueda, combinando `key:value` y [búsqueda de texto completo][4]. Puede elegir una ventana de tiempo para su búsqueda utilizando el selector de intervalo de tiempo en la parte superior derecha de Log Explorer. Para obtener detalles sobre cómo configurar un intervalo de tiempo personalizado, consulte la [documentación de intervalo de tiempo personalizado][5].

Para filtrar los registros producidos por un servicio de tienda web, con un estado de error, durante los últimos quince minutos, cree una consulta personalizada como `service:payment status:error rejected` y establezca el intervalo de tiempo en `Past 15 minutes`:

{{< img src="logs/explorer/search_filter.png" alt="Cree una consulta de búsqueda en Log Explorer que filtre los registros de error de pagos rechazados para un servicio de tienda web." style="width:100%;" >}}

[Indexed Logs][6] admiten tanto [búsqueda de texto completo][4] como `key:value` consultas de búsqueda.

**Nota**: las consultas `key:value` **no** requieren que [declare una faceta][7] de antemano.

Para obtener una referencia completa de la sintaxis de consulta, consulte la [documentación de Sintaxis de búsqueda][8].

## Funciones de la barra de búsqueda {#search-bar-features}

La barra de búsqueda de Log Explorer incluye varias funciones para ayudarle a escribir consultas de manera más eficiente y precisa.

### Resaltado de sintaxis y validación de errores {#syntax-highlighting-and-error-validation}

El resaltado de sintaxis diferencia claramente los tipos de entrada: claves, valores, texto libre y caracteres de control. Por ejemplo, `service` y `status` son claves, `auth-dotnet` y `error` son valores, `500` y `check-token` son texto libre, y los paréntesis son caracteres de control. Los atributos de estado están codificados por colores según el estado (rojo para `error`, azul para `info`).

{{< img src="logs/explorer/search/log_syntax_highlighting.png" alt="La barra de búsqueda de Log Explorer muestra `service:auth-dotnet status:error 500 (check-token OR create-user)` como la consulta con resaltado de sintaxis diferenciable." style="width:100%;">}}

La validación de errores identifica errores de sintaxis y sugiere correcciones, como valores faltantes en pares `key:value`, consultas de rango incompletas o paréntesis sin cerrar.

{{< img src="logs/explorer/search/log_error_states.png" alt="La barra de búsqueda del Explorador de registros muestra `service:(web-store OR auth-dotnet` como la consulta con el mensaje `Falta el carácter de paréntesis de cierre`" style="width:50%;">}}

### Autocompletado {#autocomplete}

La función de autocompletado de la barra de búsqueda le ayuda a completar consultas utilizando claves y valores existentes en sus registros, búsquedas recientes y Saved Views.

{{< img src="logs/explorer/search/log_search_bar_autocomplete.png" alt="La barra de búsqueda de Log Explorer que muestra service: como consulta y emailer, balancer-checker, ad-server y vpc como opciones de autocompletado." style="width:80%;">}}

El autocompletado sugiere facetas y valores según su entrada, los cuales se muestran en el orden en que aparecen en el [panel de facetas][7]. Después de seleccionar una faceta e ingresar `:`, los valores aparecen en orden descendente según el recuento de registros de los últimos 15 minutos.

{{< img src="logs/explorer/search/log_facet_autocomplete.png" alt="La barra de búsqueda de Log Explorer que muestra `network` como consulta y las facetas @network.bytes_written, @network.client.ip y @network.interface como opciones de autocompletado." style="width:80%;">}}

Sus 100 búsquedas más recientes se conservan y se sugieren a medida que escribe. Las Saved Views que coinciden con su consulta también se sugieren, mostradas en el mismo orden que el panel de Saved Views.

{{< img src="logs/explorer/search/log_recent_searches.png" alt="La barra de búsqueda de registros que muestra `service:web-store status:error` como consulta y búsquedas recientes de diferentes errores del servicio web-store como opciones de autocompletado" style="width:80%;">}}


## Deshabilitar el estilo y el autocompletado para la barra de búsqueda {#disable-styling-and-autocomplete-for-search-bar}

Active el botón a la derecha de la barra de búsqueda para buscar en modo sin formato, donde se eliminan el resaltado de sintaxis, el estilo de las píldoras de búsqueda y el autocompletado:

{{< img src="logs/explorer/search/log_raw_search_mode.png" alt="La barra de búsqueda de registros que muestra `service:auth-dotnet status:error 500 (check-token OR create-user)` como consulta en modo de búsqueda sin formato." style="width:100%;">}}

Puede interactuar con la barra de búsqueda con el mouse, así como mediante comandos de teclado. Por ejemplo, use `CMD-A` para seleccionar texto, `CMD-C` para copiar texto, `CMD-X` para cortar texto y `CMD-V` para pegar texto.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/explorer/
[2]: /es/account_management/rbac/permissions/#access-management
[3]: https://app.datadoghq.com/organization-settings/preferences
[4]: /es/logs/explorer/search_syntax/#full-text-search
[5]: /es/dashboards/guide/custom_time_frames
[6]: /es/logs/indexes
[7]: /es/logs/explorer/facets/
[8]: /es/logs/search-syntax