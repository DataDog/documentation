---
aliases:
- /es/tracing/trace_explorer/facets
description: Facetas de tramo y panel de facetas
further_reading:
- link: tracing/trace_explorer/
  tag: Documentación
  text: Más información sobre Trace Explorer
title: Etiquetas de tramo, atributos y facetas
---

## Información general

Los metadatos de tramo se componen de **atributos** y **etiquetas**.

* Los **[Atributos de tramo](#span-attributes)** son el contenido del tramo, recopilado con la instrumentación automática o manual en la aplicación

* Las **[Etiquetas de tramo](#span-tags)** son enriquecimientos de contexto relacionados con el tramo, por ejemplo etiquetas de host o contenedor que describen la infraestructura en la que se ejecuta el servicio.

Puedes consultar tramos por cualquier etiqueta y atributo de tramo desde el [Trace Explorer][6].

### Atributos reservados

Los atributos reservados son un subconjunto de los atributos de tramo que están presentes en cada tramo. Estos atributos pueden consultarse sin anteponer el carácter `@`. La lista completa de atributos reservados es: `env`, `service`, `operation_name`, `resource_name`, `status`, `ingestion_reason`, `trace_id`. Consulta [Términos y conceptos de APM][10] para obtener una definición completa de estos términos.

### Atributos de tramo

Los atributos de tramo son el contenido de tu tramo. Se recopilan de forma automática en las bibliotecas de rastreo predefinidas utilizando la instrumentación automática, de forma manual utilizando la instrumentación personalizada, o se reasignan en el backend de Datadog basándose en atributos fuente (ver [atributos de pares][11], reasignados a partir de algunos atributos fuente). Para buscar en un atributo de tramo específico, debes anteponer un carácter `@` al principio de la clave del atributo.

Por ejemplo, para encontrar tramos que representan llamadas a una tabla `users` de una base de datos postgres, utiliza la siguiente consulta: `@peer.db.name:users @peer.db.system:postgres`.

### Etiquetas de tramo

Las span tags son contextos alrededor de tu tramo, enriquecidos en función del host o del contenedor en el que se ejecuta el servicio desde el que se emite el tramo. No es necesario anteponer un carácter `@` para buscar span tags.

## Facetas

Puedes crear **facetas** sobre etiquetas y atributos de tramo para asignar un atributo al tipo correcto (por ejemplo, string o int) y que estos atributos aparezcan en la lista de facetas.

**Nota**: [Crear facetas](#creating-facets) no es **necesario** para [buscar en tramos][7], [generar métricas a partir de tramos][8], o [indexar tramos con filtros de retención][9].

{{< img src="tracing/trace_explorer/facets/facet_panel.png" alt="El panel de facetas del Explorador de trazas" style="width:90%;">}}

### Facetas cualitativas

Utiliza facetas cualitativas cuando tengas que hacer lo siguiente:

- **Obtener información relativa** sobre los valores. Por ejemplo, crea una faceta en una etiqueta de tramo `datacenter` con el fin de delimitar la investigación a una región concreta cuando se detecten solicitudes lentas.
- **Contabilizar valores únicos**. Por ejemplo, crea una faceta sobre `usr.email` para ver cuántos usuarios distintos experimentan errores al cargar un recurso específico.
- **Filtrar** a menudo tus tramos en función de determinados valores. Por ejemplo, crea una faceta en una etiqueta de entorno para solucionar problemas en los entornos de desarrollo, ensayo o producción.<br>

**Nota:** Aunque las facetas no son obligatorias para filtrar las etiquetas, definir facetas para las etiquetas que utilizas con frecuencia durante las investigaciones te ayudará a agilizar de resolución.

### Facetas cuantitativas (medidas)

Usa las medidas cuando necesites:
- **Agregar** valores de distintas trazas. Por ejemplo, crear una medida sobre el número de filas en Cassandra y visualizar los p95 o referenciadores superiores por la suma del tamaño de archivo solicitado.
- Calcular numéricamente los **servicios con latencia más alta**; por ejemplo, para valores del carrito de la compra superiores a 1000 $.
- **Filtrar valores continuos**; por ejemplo, el tamaño en bytes de cada segmento de carga útil en un flujo de vídeo.

#### Tipos de medidas

Las medidas tienen un valor entero (largo) o doble para capacidades equivalentes.

#### Unidades

Las medidas admiten unidades (**tiempo** en segundos o **tamaño** en bytes) para controlar órdenes de magnitud en tiempo de consulta y visualización. La unidad es una propiedad de la propia medida, no del campo.

Por ejemplo, considera una medida de `duration` en nanosegundos. Supongamos que los tramos desde `service:A` tienen `duration:1000`, es decir, `1000 milliseconds`. Supongamos que los tramos desde `service:B` tienen ``duration:500`, es decir, `500 microseconds`. Utiliza `duration:>20ms` para consultar de forma coherente los tramos de etiquetas de ambos servicios a la vez. Consulta [sintaxis de consulta][1] para obtener más información de referencia sobre las consultas.

## Panel de facetas

La barra de búsqueda ofrece el conjunto más completo de interacciones para filtrar y agrupar los datos. Sin embargo, en muchos casos, el panel de facetas es una forma más sencilla de navegar por tus datos. Abre una faceta para ver un resumen de su contenido en el contexto de la consulta actual.

La barra de búsqueda y la URL reflejan automáticamente las opciones seleccionadas del panel de facetas.

- Las **facetas (cualitativas)** incluyen una lista superior de valores únicos, y un recuento de tramos que coinciden con cada uno de ellos.
- Las **medidas (cuantitativas)** incluyen un regulador que indica los valores mínimo y máximo. Utiliza este regulador o indica valores numéricos para seleccionar diferentes límites del contexto de la consulta de búsqueda.

### Ocultar facetas

Tu organización tiene muchas facetas para abordar casos de uso en los distintos equipos que utilizan trazas. Lo más probable es que solo un subconjunto de estas facetas sea útil para ti en un contexto específico para solucionar problemas.

**Oculta las facetas** que no necesites con frecuencia. De este modo, conservarás solo las facetas más oportunas para tus sesiones  de solución de problemas.

{{< img src="tracing/trace_explorer/facets/hide_facets.png" alt="Ocultar faceta" style="width:30%;">}}

Las facetas ocultas seguirán visibles en el buscador de facetas (consulta la sección [Filtrar facetas](#filtering-facets)) por si acaso las necesitas. Vuelve a mostrar las facetas ocultas desde la búsqueda de facetas.

{{< img src="logs/explorer/facet/unhide_facet.png" alt="Volver a mostrar faceta" style="width:30%;">}}

#### Facetas ocultas y compañeros de equipo

Las facetas que ocultes solo se aplicarán a tu propio contexto para solucionar problemas y no afectarán a la vista del resto de tu equipo, a menos que actualices una vista guardada. Las facetas ocultas forman parte del contexto guardado en una vista guardada.

### Agrupar facetas

Las facetas se agrupan por temas significativos en la lista de facetas. Asignar o reasignar un grupo a una faceta solo afecta a la lista de facetas y no repercute en la búsqueda ni en los análisis.

{{< img src="tracing/trace_explorer/facets/group_facets.png" alt="Agrupar facetas" style="width:30%;">}}

### Filtrar facetas

Usa el buscador en el panel de facetas para examinar toda la lista de facetas y llegar más rápidamente a la que necesites. Las facetas de búsqueda utilizan el nombre de visualización de la faceta y el nombre del campo para contextualizar los resultados.

{{< img src="tracing/trace_explorer/facets/filter_facets.png" alt="Buscar faceta" style="width:30%;">}}

## Crear facetas

Crear una faceta en un atributo/etiqueta de tramo no es obligatorio para buscar tramos. Las facetas son útiles si deseas añadir una descripción significativa a un atributo de tramo específico, o si quieres que los valores de los atributos de tramo aparezcan en la lista de facetas, a la izquierda de la lista de tramos.

### Crear facetas desde el panel lateral de trazas

La forma más sencilla de crear una faceta es añadirla desde el panel lateral de trazas, de manera que casi todos los detalles de la faceta (como la ruta del campo y el tipo subyacente) ya aparezcan rellenados. En el [Explorador de trazas][1], navega hasta un tramo de interés que contenga el campo a partir del cual quieres crear la faceta. Abre el panel lateral de trazas para este tramo seleccionándolo de la lista. Haz clic en el campo deseado (en las span tags o de infraestructura) y crea una faceta a partir de ahí:

- Si el campo contiene un valor numérico, puedes crear una faceta o una medida.
- Si el campo contiene un valor de cadena, solo está disponible la creación de facetas.

{{< img src="tracing/trace_explorer/facets/create_facet.png" alt="Añadir faceta a partir de etiquetas" style="width:50%;">}}

### Crear facetas a partir de la lista de facetas

Si encontrar un tramo que contenga el campo deseado no es una opción, crea una faceta directamente desde el panel de facetas haciendo clic en **+ Añadir**.

Define el nombre del campo subyacente (clave) de esta faceta:

- Utiliza el nombre de la clave de etiqueta para las etiquetas de infraestructura.
- Utiliza la ruta de atributos para los atributos de tramo, con el prefijo `@`.

El autocompletado basado en el contenido en tramos de las vistas actuales te ayuda a definir el nombre de campo adecuado. Pero aquí puedes utilizar casi cualquier valor, concretamente si aún no tienes tramos que coincidan con los recibidos por parte de Datadog.

{{< img src="tracing/trace_explorer/facets/create_facet_from_scratch.png" alt="Añadir faceta desde cero" style="width:30%;">}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/tracing/trace_explorer/query_syntax/
[2]: /es/tracing/trace_explorer/group/
[3]: /es/monitors/types/apm/?tab=analytics
[4]: /es/dashboards/widgets/
[5]: /es/notebooks/
[6]: /es/tracing/trace_explorer/
[7]: /es/tracing/trace_explorer/search
[8]: /es/tracing/trace_pipeline/generate_metrics
[9]: /es/tracing/trace_pipeline/trace_retention/#retention-filters
[10]: /es/tracing/glossary
[11]: /es/tracing/services/inferred_services#peer-tags
