---
aliases:
- /es/logs/facets
description: Facetas de log y panel de facetas
further_reading:
- link: logs/explorer/analytics
  tag: Documentación
  text: Realizar análisis de los logs
- link: logs/explorer/patterns
  tag: Documentación
  text: Detecta patrones dentro de tus logs
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprende a procesar tus logs
- link: logs/explorer/saved_views
  tag: Documentación
  text: Configura tu Log Explorer automáticamente
title: Facetas de log
---

{{< img src="logs/explorer/facet/facets_in_explorer.mp4" alt="Facetas en la faceta de explorador" video=true style="width:100%;">}}

## Información general

Las facetas son etiquetas (tags) y atributos definidos por el usuario a partir de tus logs indexados. Están pensadas para el análisis cualitativo o cuantitativo de datos. Como tales, pueden utilizarse en el Log Explorer para:

- [Buscar en tus logs][1]
- [Definir patrones de logs][2]
- [Realizar análisis de log][3]

Las facetas también te permiten manipular tus logs en tus [monitores de log][4], widgets de log en [dashboards][5] y [notebooks][6].

**Nota**: No necesitas facetas para admitir el [procesamiento de log][7], [buscar en Live Tail][8], [buscar en Log Explorer][30], [generación de métricas][10] de logs, reenvío de [archivos][11], o [recuperación][12]. Tampoco necesitas facetas para enrutar logs a través de [pipelines][13] e [índices][14] con filtros, o excluir o muestrear logs de índices con [filtros de exclusión][15].

En todos estos contextos, las capacidades de autocompletar se basan en facetas existentes, pero cualquier entrada que coincida con los logs entrantes funcionaría.

### Facetas cualitativas

#### Dimensiones

Utiliza facetas cualitativas cuando necesites hacer lo siguiente:

- Para **obtener información relativa** de los valores. Por ejemplo, crea una faceta en `http.network.client.geoip.country.iso_code` para ver los principales países más afectados por el número de errores 5XX en tus logs de acceso web [NGINX][16], mejorados con Datadog [GeoIP Processor][17].
- Para **contar valores únicos**. Por ejemplo, crea una faceta en `user.email` a partir de tus logs de [Kong][18] para saber cuántos usuarios se conectan cada día a tu sitio web.
- Para **filtrar** frecuentemente tus logs contra valores particulares. Por ejemplo, crear una faceta en una [etiqueta][19] de `environment` para limitar la solución de problemas a entornos de desarrollo, preparación o producción.

**Nota**: Aunque no es necesario crear facetas para filtrar valores de atributos, definirlas sobre atributos que utilices a menudo durante las investigaciones puede ayudarte a reducir el tiempo de resolución.

#### Tipos

Las facetas cualitativas pueden ser de tipo cadena o numérico (entero). Mientras que la asignación de un tipo de cadena a una dimensión funciona en todos los casos, el uso de tipos enteros en una dimensión permite el filtrado de rangos además de todas las capacidades mencionadas anteriormente. Por ejemplo, `http.status_code:[200 TO 299]` es una consulta válida para una dimensión de tipo entero. Consulta [sintaxis de búsqueda][1] como referencia.

### Facetas cuantitativas
#### Medidas

Utiliza medidas cuando necesites hacer lo siguiente:

- Para **agregar valores** de múltiples logs. Por ejemplo, crea una medida sobre el tamaño de los cuadros que brinda la [caché de Varnish][20] de un servidor de mapas y realiza un seguimiento del **rendimiento medio** diario, o de los principales remitentes por **suma** del tamaño del cuadro solicitado.
- Para **filtrar por rangos** tus logs. Por ejemplo, crea una medida sobre el tiempo de ejecución de las tareas de [Ansible][21] y ve la lista de los servidores que tienen el mayor número de ejecuciones que tardan más de 10s.
- Para **clasificar logs** contra ese valor. Por ejemplo, crea una medida sobre la cantidad de pagos realizados con tu microservicio de [Python][22]. A continuación, puedes buscar todos los logs, empezando por el de mayor cantidad.

#### Tipos

Las medidas vienen con un valor entero (largo) o doble, para capacidades equivalentes.

#### Unidades

Las medidas admiten unidades en **tiempo** o **tamaño** para facilitar el manejo de los órdenes de magnitud en tiempo de consulta y visualización.

| tipo        | unidad(es)                                                                                                                                                                                                                                                                                                                    |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| BYTES       | bit / byte / kibibyte / mebibyte / gibibyte / tebibyte / pebibyte / exbibyte                                                                                                                                                                                                                                               |
| TIEMPO        | nanosegundo / microsegundo / milisegundo / segundo / minuto / hora / día / semana                                                                                                                                                                                                                                               |

La unidad es una propiedad de la propia medida, no del campo. Por ejemplo, considera una medida `duration` en nanosegundos: tienes logs de `service:A` donde `duration:1000` representa 1000 milisegundos, y otros logs de `service:B` donde `duration:500` representa 500 microsegundos:

1. Escala la duración en nanosegundos para todos los logs que entran con el [procesador aritmético][23]. Utiliza un multiplicador `*1000000` en logs de `service:A`, y un multiplicador `*1000` en logs de `service:B`.
2. Utiliza `duration:>20ms` (consulta [sintaxis de búsqueda][1] como referencia) para consultar logs de forma coherente desde ambos servicios a la vez, y ver un resultado agregado de `1 min` como máximo.

## Panel de facetas

La barra de búsqueda proporciona el conjunto más completo de interacciones para filtrar y agrupar tus datos. Sin embargo, en la mayoría de los casos, es probable que el panel de facetas sea una forma más directa de navegar por los datos. Abre una faceta para ver un resumen de tu contenido en el contexto de la consulta actual.

Las **facetas (cualitativas)** vienen con una lista de principales de valores únicos, y un recuento de logs que coinciden con cada uno de ellos:

{{< img src="logs/explorer/facet/dimension_facet.png" alt="Faceta de dimensión" style="width:30%;">}}

Limita la consulta de búsqueda haciendo clic en cualquiera de los valores. Al hacer clic en un valor se alterna entre buscar este valor único y todos los valores. Al hacer clic en las casillas de verificación, se añade o elimina este valor específico de la lista de todos los valores, también puedes buscar en su contenido:

{{< img src="logs/explorer/facet/dimension_facet_wildcard.png" alt="Autocompletar faceta" style="width:30%;">}}

**Las medidas** vienen con un control deslizante que indica los valores mínimo y máximo. Utiliza el control deslizante, o introduce valores numéricos, para reducir la consulta de búsqueda a diferentes límites.

{{< img src="logs/explorer/facet/measure_facet.png" alt="Faceta de medidas" style="width:30%;">}}

### Ocultar facetas

Tu organización dispone de toda una colección de facetas para abordar su amplio conjunto de casos de uso en todos los diferentes equipos que utilizan logs. Lo más probable, sin embargo, es que solo un subconjunto de estas facetas sea valioso para ti en un contexto específico de solución de problemas. Oculta las facetas que no necesites de forma rutinaria y conserva solo las facetas más relevantes para tus sesiones para solucionar problemas.

{{< img src="logs/explorer/facet/hide_facet.png" alt="Ocultar faceta" style="width:30%;">}}

Las facetas ocultas siguen siendo visibles en la búsqueda de facetas (consulta la sección [Filtrar facetas](#filter-facets)) en caso de que lo necesites. Desoculta las facetas ocultas desde ahí.

{{< img src="logs/explorer/facet/unhide_facet.png" style="width:50%;" alt="Desocultar facetas" style="width:30%;">}}

Las facetas ocultas también se ocultan de la función autocompletar en la barra de búsqueda, y de los desplegables (como medida, agrupar por) en los análisis para el Log Explorer. Sin embargo, las facetas ocultas siguen siendo válidas para las consultas de búsqueda (por ejemplo, si copias y pegas un enlace del Log Explorer).

Las facetas ocultas no tienen ningún impacto aparte del Log Explorer (por ejemplo: Live Tail, monitores o definiciones de widget en dashboards).

#### Facetas ocultas y compañeros de equipo

Ocultar facetas es específico de tu propio contexto de solución de problemas y no afecta a la vista de tus compañeros de equipo, a menos que actualices una [Vista guardada][24]. Las facetas ocultas forman parte del contexto guardado en una vista guardada.

### Facetas de grupo

Las facetas se agrupan en temas significativos para facilitar la navegación en la lista de facetas. La asignación o reasignación de un grupo para una faceta solo afecta a la visualización en la lista de facetas y no tiene ningún impacto en las capacidades de búsqueda y análisis.

{{< img src="logs/explorer/facet/group_facets.png" alt="Agrupar facetas" style="width:30%;">}}

Para agrupar facetas:

1. Haz clic en el engranaje de la faceta.
2. Selecciona **Edit facet** (Editar faceta).
3. Haz clic en la sección **Advanced options** (Opciones avanzadas) para ampliarla.
4. En el campo **Group** (Grupo), introduce el nombre del grupo en el que quieres que esté la faceta.
5. Haz clic en **Update** (Actualizar).

### Filtrar facetas

Utiliza el cuadro de búsqueda en las facetas para reducir toda la lista de facetas y navegar más rápidamente hasta aquella con la que necesitas interactuar. La faceta de búsqueda utiliza tanto el nombre para mostrar de la faceta como el nombre del campo de la faceta para limitar los resultados.

{{< img src="logs/explorer/facet/search_facet.png" alt="Buscar facetas" style="width:30%;">}}

### Facetas con alias

Algunas facetas pueden tener alias (consulta la sección [faceta con alias](#alias-facets)). Las facetas con alias siguen siendo válidas para segregar, pero tu organización las considera obsoletas:

{{< img src="logs/explorer/facet/aliased_facet.png" alt="Facetas con alias" style="width:30%;">}}

En solucionar problemas, es más probable que encuentres contenidos de otros equipos (junto con contenidos de tu equipo) en la faceta _standard_ (estándar) que en la faceta _aliased_ (con alias). Esto facilita la correlación de contenidos de diversos orígenes.

Si ves una faceta con alias en tu lista de facetas, considera usar la faceta _standard_ (estándar) en su lugar, haciendo clic en el elemento del menú **switch to alias** (cambiar a alias). Esta acción oculta la faceta con alias y desoculta la faceta estándar. Si esto te obliga a actualizar una vista guardada, considera guardar la vista guardada para que el alias se aplique a todos los que utilicen esta vista guardada.

{{< img src="logs/explorer/facet/switch_facet.png" alt="Cambiar faceta" style="width:30%;">}}

Es posible que desees conservar la versión _aliased_ (con alias) no estándar de la faceta si estás solucionando problemas contra contenido antiguo (antes de que tu organización haya configurado los alias para esta faceta).

## Gestionar facetas

### Facetas predeterminadas

Las facetas más comunes, como `Host` y `Service`, vienen listas para usar, por lo que puedes empezar a solucionar problemas de inmediato una vez que tus logs fluyan hacia los índices de log.

Las facetas de [Atributos reservados][25] y la mayoría de [Atributos estándar][26] están disponibles por defecto.

### Faceta de índice

La faceta de índice es una faceta específica que solo aparece si tu organización tiene [múltiples índices][27], o si tienes [vistas históricas][28] activas. Utiliza esta faceta si deseas reducir tu consulta a un subconjunto de índices.

{{< img src="logs/explorer/facet/index_facet_.png" alt="Crear facetas" style="width:30%;">}}

### Crear facetas

Como práctica recomendada, considera siempre utilizar una faceta existente en lugar de crear una nueva (consulta la sección [alias-facets](#alias-facets)). Utilizar una faceta única para obtener información de naturaleza similar fomenta la colaboración entre equipos.

Para crear una faceta en una matriz de objetos JSON, primero usa un [analizador grok][29] para extraer el atributo y luego crea una faceta para ese atributo.

**Nota**: Una vez creada una faceta, su contenido se rellena **para todos los nuevos logs**. Para un uso óptimo de la solución Log Management, Datadog recomienda utilizar como máximo 1000 facetas.

#### Panel lateral de log

La forma más sencilla de crear una faceta es añadirla desde el panel lateral de log, donde la mayoría de los detalles de la faceta -como el nombre del campo o el tipo de datos subyacente- están precargados y solo es cuestión de volver a comprobarlos. Navega en el [Log Explorer][1] a cualquier log de interés que contenga el campo para crear una faceta. Abre el panel lateral para este log, haz clic en el campo correspondiente (ya sea en etiquetas o en atributos) y crea una faceta desde allí:

- Si el campo contiene un valor de cadena, solo está disponible la creación de facetas.
- Si el campo tiene un valor numérico, se pueden crear tanto facetas como medidas.

{{< img src="logs/explorer/facet/create_facet_from_attribute.png" alt="Crear una faceta desde un atributo" style="width:30%;">}}

**Nota**: Como práctica recomendada, es recomendado utilizar no más de 1000 facetas.

#### Lista de faceta

En caso de que no sea posible encontrar una faceta que coincida con el log, crea una nueva faceta directamente desde el panel de facetas utilizando el botón _add facet_ (Añadir faceta).

Define el nombre del campo subyacente (clave) de esta faceta:

- Utiliza el nombre de la clave de etiqueta para etiquetas.
- Utiliza la ruta de atributo para los atributos, con el prefijo `@`.

El autocompletado basado en el contenido en logs de las vistas actuales te ayuda a definir el nombre de campo adecuado. Pero puedes utilizar prácticamente cualquier valor aquí, específicamente en el caso de que aún no tengas logs coincidentes que fluyan en tus índices.

{{< img src="logs/explorer/facet/create_facet_from_scratch.png" alt="Crear faceta desde cero" style="width:30%;">}}

### Facetas de alias

La agrupación de contenidos similares en una única faceta permite el análisis entre equipos y facilita el trabajo entre equipos para solucionar problemas; consulta [Convención de nomenclatura][26] como referencia.

Utiliza los alias como opción para realinear sin problemas los equipos que dependen de convenciones de nomenclatura incoherentes. Con los alias, puedes hacer que todos ellos utilicen la faceta estándar que surge de tu organización.

#### Utilizar alias de faceta a faceta

Esta es la mejor opción si varios equipos de tu organización ya han creado múltiples facetas para contenidos similares.

Al colocar un alias en una faceta _aliased_ (con alias) hacia una faceta _standard_ (estándar):

- Los usuarios pueden utilizar facetas aliased (con alias) y facetas standard (estándar) para solucionar problemas. Es posible que prefieran las facetas estándar, que facilitan la correlación de contenidos procedentes de fuentes diversas y posiblemente heterogéneas.
- Se anima a los usuarios a utilizar la faceta estándar en lugar de la faceta con alias.

Para convertir una faceta en una faceta estándar, selecciona la acción `Alias to...` en el menú de facetas. Elige la faceta de destino entre todas las facetas [estándar][14] de tu organización.

{{< img src="logs/explorer/facet/alias_modal.png" alt="modo de alias" style="width:30%;">}}

#### Utilizar alias de atributo a faceta

Esta es la mejor opción si incorporas logs desde nuevas fuentes. En lugar de crear una faceta para algún campo en esos logs, y justo después dejar obsoleta esta faceta al colocar un alias en una faceta estándar, utiliza un alias en el campo directamente a una faceta existente:

{{< img src="logs/explorer/facet/alias_facet_from_attribute.png" alt="Utiliza un alias en una faceta desde un atributo" style="width:30%;">}}

## Borrar una faceta

<div class="alert alert-danger">Borrar una faceta que está siendo utilizada en índices, monitores, dashboards, consultas de restricción, o por otros equipos puede causar que las configuraciones se rompan.</div>

Para eliminar una faceta, sigue estos pasos:

- Haz clic en **Showing xx of xx** (Mostrar xx de xx) en la parte superior del panel de facetas.
- Buscar tu faceta.
- Haz clic en el icono del lápiz de tu faceta.
- Haz clic en **Delete** (Borrar).

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/search_syntax/
[2]: /es/logs/explorer/patterns/
[3]: /es/logs/explorer/analytics/
[4]: /es/monitors/types/log/
[5]: /es/dashboards/widgets/
[6]: /es/notebooks/
[7]: /es/logs/log_configuration/processors
[8]: /es/logs/live_tail/
[9]: /es/logs/log_configuration/attributes_naming_convention/#standard-attributes
[10]: /es/logs/logs_to_metrics/
[11]: /es/logs/archives/
[12]: /es/logs/archives/rehydrating/
[13]: /es/logs/log_configuration/pipelines
[14]: /es/logs/indexes/#indexes-filters
[15]: /es/logs/indexes/#exclusion-filters
[16]: /es/integrations/nginx/
[17]: /es/logs/log_configuration/processors/#geoip-parser
[18]: /es/integrations/kong/
[19]: /es/getting_started/tagging/assigning_tags/
[20]: /es/integrations/varnish/
[21]: /es/integrations/ansible/
[22]: /es/integrations/python/
[23]: /es/logs/log_configuration/processors/#arithmetic-processor
[24]: /es/logs/explorer/saved_views/
[25]: /es/logs/log_configuration/attributes_naming_convention/#reserved-attributes
[26]: /es/logs/log_configuration/attributes_naming_convention
[27]: /es/logs/indexes/#indexes
[28]: /es/logs/log_configuration/rehydrating
[29]: /es/logs/log_configuration/parsing/?tab=matchers#nested-json
[30]: /es/logs/explorer/