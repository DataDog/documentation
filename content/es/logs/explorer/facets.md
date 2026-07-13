---
algolia:
  tags:
  - log facets
aliases:
- /es/logs/facets
description: Facetas de log y Panel de Facetas
further_reading:
- link: logs/explorer/analytics
  tag: Documentación
  text: Realizar Análisis de Registros
- link: logs/explorer/patterns
  tag: Documentación
  text: Detectar patrones dentro de sus registros
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprender a procesar sus registros
- link: logs/explorer/saved_views
  tag: Documentación
  text: Configurar automáticamente su Explorador de Registros
- link: https://learn.datadoghq.com/courses/log-explorer
  tag: Centro de Aprendizaje
  text: Comenzando con el Explorador de Registros
title: Facetas de log
---
{{< img src="logs/explorer/facet/facets_in_explorer.mp4" alt="Facetas en el Explorador de Facetas de log" video=true style="width:100%;">}}

## Descripción General {#overview}

Las facetas son etiquetas y atributos definidos por el usuario de sus registros indexados. Están destinadas para el análisis de datos cualitativos o cuantitativos. Como tal, puede usarlas en su Explorador de Registros para:

- [Buscar en sus registros][1]
- [Definir patrones de log][2]
- [Realizar análisis de logs][3]

Las facetas también le permiten manipular sus logs en sus [monitores de logs][4], widgets de logs en [tableros][5] y [notebooks][6].

**Nota**: No necesita facetas para soportar [procesamiento de logs][7], [búsqueda en tiempo real][8], [búsqueda en el explorador de logs][9], [generación de métricas][10] a partir de logs, [archivado][11] de reenvíos, o [rehidratación][12]. Tampoco necesita facetas para enrutar logs a través de [Pipelines][13] e [Índices][14] con filtros, o excluir o muestrear logs de índices con [filtros de exclusión][15]. 

En todos estos contextos, las capacidades de autocompletar dependen de las facetas existentes, pero cualquier entrada que coincida con los logs entrantes funcionaría.

### Facetas cualitativas {#qualitative-facets}

#### Dimensiones {#dimensions}

Utiliza facetas cualitativas cuando necesites:

- Para **obtener información relativa** sobre los valores. Por ejemplo, crea una faceta en `http.network.client.geoip.country.iso_code` para ver los principales países más afectados por el número de errores 5XX en tus registros de acceso web de [NGINX][16], enriquecidos con el [Procesador GeoIP][17] de Datadog.
- Para **contar valores únicos**. Por ejemplo, crea una faceta en `user.email` de tus registros de [Kong][18] para saber cuántos usuarios se conectan cada día a tu sitio web.
- Para **filtrar** frecuentemente tus registros contra valores particulares. Por ejemplo, crea una faceta en un `environment` [etiqueta][19] para limitar la solución de problemas a entornos de desarrollo, pruebas o producción.

**Nota**: Aunque no es necesario crear facetas para filtrar por valores de atributos, definirlas en atributos que usas con frecuencia durante las investigaciones puede ayudar a reducir tu tiempo de resolución.

#### Tipos {#types}

Las facetas cualitativas pueden tener un tipo de cadena o numérico (entero). Mientras que asignar el tipo de cadena a una dimensión funciona en todos los casos, usar tipos enteros en una dimensión permite filtrar por rangos además de todas las capacidades mencionadas anteriormente. Por ejemplo, `http.status_code:[200 TO 299]` es una consulta válida para usar en una dimensión de tipo entero. Consulta la [sintaxis de búsqueda][1] como referencia.

### Facetas cuantitativas {#quantitative-facets}
#### Medidas {#measures}

Utiliza medidas cuando necesites:

- Para **agregar valores** de múltiples registros. Por ejemplo, crea una medida sobre el tamaño de los mosaicos servidos por la [caché de Varnish][20] de un servidor de mapas y lleva un registro del **promedio** de rendimiento diario, o los referidores más importantes por **suma** del tamaño de mosaico solicitado.
- Para **filtrar por rango** tus registros. Por ejemplo, crea una medida sobre el tiempo de ejecución de las tareas de [Ansible][21], y observa la lista de servidores que tienen más ejecuciones que tardan más de 10 segundos.
- Para **ordenar registros** en función de ese valor. Por ejemplo, crea una medida sobre la cantidad de pagos realizados con tu microservicio de [Python][22]. Luego puedes buscar todos los registros, comenzando con el que tiene la mayor cantidad.

#### Tipos {#types-1}

Las medidas vienen con un valor de entero (largo) o doble, para capacidades equivalentes.

#### Unidades {#units}

Las medidas soportan unidades en **tiempo** o **tamaño** para un manejo más fácil de órdenes de magnitud en el tiempo de consulta y el tiempo de visualización.

| tipo        | unidad(es)                                                                                                                                                                                                                                                                                                                    |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| BYTES       | bit / byte / kibibyte / mebibyte / gibibyte / tebibyte / pebibyte / exbibyte                                                                                                                                                                                                                                               |
| TIEMPO      | nanosegundo / microsegundo / milisegundo / segundo / minuto / hora / día / semana                                                                                                                                                                                                                                               |

La unidad es una propiedad de la medida misma, no del campo. Por ejemplo, considera una `duration` medida en nanosegundos: tienes registros de `service:A` donde `duration:1000` representa 1000 milisegundos, y otros registros de `service:B` donde `duration:500` representa 500 microsegundos:

1. Escala la duración en nanosegundos para todos los registros que fluyen con el [procesador aritmético][23]. Usa un `*1000000` multiplicador en los registros de `service:A`, y un `*1000` multiplicador en los registros de `service:B`.
2. Usa `duration:>20ms` (ver [sintaxis de búsqueda][1] para referencia) para consultar de manera consistente los registros de ambos servicios a la vez, y ver un resultado agregado de max `1 min`.

## Panel de facetas {#facet-panel}

La barra de búsqueda proporciona el conjunto más completo de interacciones para filtrar y agrupar tus datos. Sin embargo, en la mayoría de los casos, el panel de facetas es probablemente una forma más sencilla de navegar por sus datos. Abra una faceta para ver un resumen de su contenido en el contexto de la consulta actual.

**Las facetas (cualitativas)** vienen con una lista principal de valores únicos y un conteo de registros que coinciden con cada uno de ellos:

{{< img src="logs/explorer/facet/dimension_facet.png" alt="Faceta de Dimensión" style="width:30%;">}}

Delimite la consulta de búsqueda haciendo clic en cualquiera de los valores. Hacer clic en un valor alterna la búsqueda en este valor único y en todos los valores. Hacer clic en las casillas de verificación agrega o quita este valor específico de la lista de todos los valores; también puede buscar en su contenido:

{{< img src="logs/explorer/facet/dimension_facet_wildcard.png" alt="Autocompletar de Facetas" style="width:30%;">}}

**Las Medidas** vienen con un control deslizante que indica valores mínimos y máximos. Utilice el control deslizante o ingrese valores numéricos para delimitar la consulta de búsqueda a diferentes límites.

{{< img src="logs/explorer/facet/measure_facet.png" alt="Faceta de Medidas" style="width:30%;">}}

### Ocultar facetas {#hide-facets}

Su organización tiene una colección completa de facetas para abordar su conjunto integral de casos de uso en todos los diferentes equipos que utilizan registros. Sin embargo, es probable que solo un subconjunto de estas facetas sea valioso para usted en un contexto específico de resolución de problemas. Oculte las facetas que no necesita de manera rutinaria, para mantener solo las facetas más relevantes para sus sesiones de resolución de problemas.
1. En el [Explorador de Registros][30], encuentre la faceta que desea ocultar.
1. Haga clic en el ícono de engranaje junto a la faceta.
1. Seleccione {{< ui >}}Hide Facet{{< /ui >}}.

Las facetas ocultas aún son visibles en la búsqueda de facetas (vea la sección [Filtrar Faceta](#filter-facets)) en caso de que las necesite. Muestra las facetas ocultas desde allí.


Las facetas ocultas también están ocultas en la autocompletación de la barra de búsqueda y en los menús desplegables (como medida, agrupar) en análisis para el Explorador de Registros. Sin embargo, las facetas ocultas siguen siendo válidas para las consultas de búsqueda (en caso de que copies y pegues un enlace del explorador de registros, por ejemplo).

Las facetas ocultas no tienen impacto aparte del explorador de registros (por ejemplo, cola en vivo, monitores o definiciones de widgets en los tableros).

#### Facetas ocultas y compañeros de equipo {#hidden-facets-and-teammates}

Ocultar facetas es específico para tu propio contexto de solución de problemas y no afecta la vista de tus compañeros de equipo, a menos que actualices una [Vista Guardada][24]. Las facetas ocultas son parte del contexto guardado en una vista guardada.

### Agrupar facetas {#group-facets}

Las facetas se agrupan en temas significativos para facilitar la navegación en la lista de facetas. Asignar o reasignar un grupo para una faceta solo afecta la visualización en la lista de facetas y no tiene impacto en las capacidades de búsqueda y análisis.

{{< img src="logs/explorer/facet/group_facets.png" alt="Faceta de Grupo" style="width:30%;">}}

Para agrupar facetas:

1. Haz clic en el engranaje de la faceta.
2. Selecciona {{< ui >}}Edit facet{{< /ui >}}.
3. Haz clic en la sección {{< ui >}}Advanced options{{< /ui >}} para expandirla.
4. En el campo {{< ui >}}Group{{< /ui >}}, ingrese el nombre del grupo en el que desea que esté la faceta.
5. Haga clic en {{< ui >}}Update{{< /ui >}}.

### Filtrar facetas {#filter-facets}

Utilice el cuadro de búsqueda en las facetas para reducir toda la lista de facetas y navegar más rápidamente a la que necesite interactuar. La búsqueda de facetas utiliza tanto el nombre de visualización de la faceta como el nombre del campo de la faceta para limitar los resultados.

{{< img src="logs/explorer/facet/search_facet.png" alt="Buscar Faceta" style="width:30%;">}}

### Facetas aliasadas {#aliased-facets}

Algunas facetas pueden haber sido aliasadas (vea la sección de [faceta aliasada](#alias-facets)). Las facetas aliasadas siguen siendo válidas para segmentar y analizar, pero son consideradas obsoletas por su organización:

{{< img src="logs/explorer/facet/aliased_facet.png" alt="Faceta Aliasada" style="width:30%;">}}

Al solucionar problemas, es más probable que encuentre contenido de otros equipos (junto con contenido de su equipo) en la faceta _estándar_ en lugar de la faceta _aliasada_. Esto hace que la correlación de contenido de diversos orígenes sea más sencilla.

Si ve una faceta aliasada en su lista de facetas, considere usar la faceta _estándar_ en su lugar haciendo clic en el elemento de menú {{< ui >}}switch to alias{{< /ui >}}. Esta acción oculta la faceta aliasada y muestra la faceta estándar. Si hacerlo le obliga a actualizar una vista guardada, considere guardar la vista guardada para que el aliasing se aplique a todos los que usen esta vista guardada.

{{< img src="logs/explorer/facet/switch_facet.png" alt="Cambiar Faceta" style="width:30%;">}}

Puede que desee mantener la versión no estándar _aliasada_ de la faceta si está solucionando problemas con contenido antiguo (antes de que su organización haya configurado el aliasing para esta faceta).

## Gestionar facetas {#manage-facets}

### Facetas listas para usar {#out-of-the-box-facets}

Las facetas más comunes como `Host` y `Service` vienen listas para usar, por lo que puede comenzar a solucionar problemas de inmediato una vez que sus registros fluyan hacia los índices de registro.

Las facetas en [Atributos Reservados][25] y la mayoría de los [Atributos Estándar][26] están disponibles por defecto.

### Faceta de índice {#index-facet}

La faceta de índice es una faceta específica que aparece solo si su organización tiene [múltiples índices][27], y/o si tiene vistas [históricas activas][28]. Use esta faceta si desea limitar su consulta a un subconjunto de sus índices.

{{< img src="logs/explorer/facet/index_facet_.png" alt="Crear Faceta" style="width:30%;">}}

### Crear facetas {#create-facets}

Como buena práctica, siempre considere usar una faceta existente en lugar de crear una nueva (vea la sección de [facetas aliasadas](#alias-facets)). Usar una faceta única para información de naturaleza similar fomenta la colaboración entre equipos.

Para crear una faceta en un arreglo de objetos JSON, primero utilice un [analizador grok][29] para extraer el atributo y luego cree una faceta para ese atributo.

**Nota**: Una vez que se crea una faceta, su contenido se llena **para todos los nuevos registros**. Para un uso óptimo de la solución de Gestión de Registros, Datadog recomienda usar como máximo 1000 facetas.

#### Panel lateral de registros {#log-side-panel}

La forma más fácil de crear una faceta es agregarla desde el panel lateral de registros, donde la mayoría de los detalles de la faceta—como el nombre del campo o el tipo de datos subyacente—ya están prellenados y solo es cuestión de verificarlos. Navegue en el [Explorador de Registros][1] hacia el registro de interés que contenga el campo para crear una faceta. Abra el panel lateral para este registro, haga clic en el campo correspondiente (ya sea en etiquetas o en atributos) y cree una faceta desde allí:

- Si el campo tiene un valor de cadena, solo está disponible la creación de facetas.
- Si el campo tiene un valor numérico, están disponibles tanto la creación de facetas como la de medidas.

{{< img src="logs/explorer/facet/create_facet_from_attribute.png" alt="Crear faceta desde atributo" style="width:30%;">}}

**Nota**: Como mejor práctica, se recomienda no usar más de 1000 facetas.

#### Lista de facetas {#facet-list}

En caso de que no sea posible encontrar un registro coincidente, cree una nueva faceta directamente desde el panel de facetas usando el botón _agregar faceta_.

Defina el nombre del campo subyacente (clave) para esta faceta:

- Utilice el nombre de clave de etiqueta para etiquetas.
- Utilice la ruta del atributo para atributos, con `@` prefijo.

La autocompletación basada en el contenido de los registros de las vistas actuales le ayuda a definir el nombre de campo adecuado. Pero puede usar prácticamente cualquier valor aquí, específicamente en el caso de que aún no tenga registros coincidentes fluyendo en sus índices.

{{< img src="logs/explorer/facet/create_facet_from_scratch.png" alt="Cree una faceta desde cero" style="width:30%;">}}

### Facetas aliasadas {#alias-facets}

Reunir contenido similar bajo una faceta única permite análisis entre equipos y facilita la solución de problemas entre equipos; consulte [Convención de Nombres][26] para referencia.

Utilice el alias como una opción para realinear suavemente a los equipos que dependen de convenciones de nombres inconsistentes. Con el alias, puede hacer que todos usen la faceta estándar que surge para su organización.

#### Alias de faceta a faceta {#aliasing-facet-to-facet}

Esta es la mejor opción si múltiples equipos en su organización ya han creado múltiples facetas para contenido similar.

Al aliasar una faceta _aliasada_ hacia una faceta _estándar_:

- Los usuarios pueden usar tanto facetas aliasadas como estándar para la solución de problemas. Puede preferir la estándar, que facilita la correlación de contenido que fluye de fuentes diversas y posiblemente heterogéneas.
- Se sugiere a los usuarios que usen la faceta estándar en lugar de la faceta aliasada.

Para asignar un alias a una faceta estándar, seleccione el elemento de acción {{< ui >}}Alias to...{{< /ui >}} en el menú de facetas. Elija las facetas de destino de entre todas las [estándar][14] que existen para su organización.

{{< img src="logs/explorer/facet/alias_modal.png" alt="modal de alias" style="width:30%;">}}

#### Asignar alias de atributo a faceta {#aliasing-attribute-to-facet}

Esta es la mejor opción si incorpora registros que fluyen de nuevas fuentes. En lugar de crear una faceta para algún campo en esos registros, y justo después de deprecar esta faceta asignándole un alias a una faceta estándar, asigne el alias del campo directamente a una faceta existente:

{{< img src="logs/explorer/facet/alias_facet_from_attribute.png" alt="Asigne alias de faceta desde atributo" style="width:30%;">}}

## Eliminar una faceta {#delete-a-facet}

<div class="alert alert-warning">Eliminar una faceta que se está utilizando en índices, monitores, tableros, consultas de restricción o por otros equipos puede causar que las configuraciones se rompan.</div>

Para eliminar una faceta, siga estos pasos:

- Haga clic en {{< ui >}}Showing xx of xx{{< /ui >}} en la parte superior del panel de facetas.
- Busque su faceta.
- Haga clic en el ícono de lápiz para su faceta.
- Haga clic en {{< ui >}}Delete{{< /ui >}}.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/search_syntax/
[2]: /es/logs/explorer/patterns/
[3]: /es/logs/explorer/analytics/
[4]: /es/monitors/types/log/
[5]: /es/dashboards/widgets/
[6]: /es/notebooks/
[7]: /es/logs/log_configuration/processors
[8]: /es/logs/live_tail/
[9]: /es/logs/explorer/
[10]: /es/logs/logs_to_metrics/
[11]: /es/logs/archives/
[12]: /es/logs/archives/rehydrating/
[13]: /es/logs/log_configuration/pipelines
[14]: /es/logs/indexes/#indexes-filters
[15]: /es/logs/indexes/#exclusion-filters
[16]: /es/integrations/nginx/
[17]: /es/logs/log_configuration/processors/geoip_parser/
[18]: /es/integrations/kong/
[19]: /es/getting_started/tagging/assigning_tags/
[20]: /es/integrations/varnish/
[21]: /es/integrations/ansible/
[22]: /es/integrations/python/
[23]: /es/logs/log_configuration/processors/arithmetic_processor/
[24]: /es/logs/explorer/saved_views/
[25]: /es/logs/log_configuration/attributes_naming_convention/#reserved-attributes
[26]: /es/logs/log_configuration/attributes_naming_convention
[27]: /es/logs/indexes/#indexes
[28]: /es/logs/log_configuration/rehydrating
[29]: /es/logs/log_configuration/parsing/?tab=matchers#nested-json
[30]: https://app.datadoghq.com/logs