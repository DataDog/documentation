---
aliases:
- /es/tracing/profiling/intro_to_profiling
- /es/tracing/profiler/intro_to_profiling
further_reading:
- link: /profiler/
  tag: Documentación
  text: Continuous Profiler
- link: /profiler/enabling/
  tag: Documentación
  text: Habilitar el generador de perfiles
- link: https://learn.datadoghq.com/courses/intro-to-apm
  tag: Centro de aprendizaje
  text: Introducción a Application Performance Monitoring
- link: https://www.datadoghq.com/blog/engineering/how-we-optimized-our-akka-application-using-datadogs-continuous-profiler/
  tag: Blog
  text: Cómo optimizamos nuestra aplicación Akka con el Continuous Profiler de Datadog
kind: documentación
title: Empezando con el Continuous Profiler
---

La generación de perfiles puede hacer que tus servicios sean más rápidos, baratos y fiables. Sin embargo, si es la primera vez que utilizas un generador de perfiles, puede que te resulte confuso.

En esta guía, te explicamos en qué consiste la generación de perfiles, te ofrecemos el ejemplo de un servicio con un problema de rendimiento, y utilizamos el Continuous Profiler de Datadog para entender y solucionar el problema.

## Información general

Los generadores de perfiles recopilan datos sobre el programa mientras este se ejecuta para reflejar la cantidad de "trabajo" que realiza cada función. Por ejemplo, si la monitorización de la infraestructura demuestra que los servidores de tu aplicación están usando el 80 % de su CPU, es posible que no sepas a qué se debe. Por este motivo, la generación de perfiles te ofrece un desglose del trabajo. Ejemplo:

| Función      | Uso de la CPU |
|---------------|-----------|
| `doSomeWork`  | 48 %       |
| `renderGraph` | 19 %       |
| Otro         | 13 %       |

Esta información es importante cuando se trabaja para solucionar problemas de rendimiento, dado que hay muchos programas que pasan demasiado tiempo en unos pocos lugares, lo que no siempre es evidente. Averiguar qué partes de un programa deben optimizarse constituye una gran pérdida de tiempo para los ingenieros, que a cambio obtienen resultados poco satisfactorios. No obstante, si utilizas un generador de perfiles, puedes identificar exactamente qué partes del código hay que optimizar.

Si has usado una herramienta de APM, puede que la generación de perfiles te parezca un rastreador "más detallado" que ofrece una imagen pormenorizada del código sin necesidad de recurrir a la instrumentación.

El Continuous Profiler de Datadog puede rastrear varios tipos de "trabajo", como el uso de la CPU, la cantidad y los tipos de objetos que se asignan en la memoria, el tiempo de espera para adquirir bloqueos, la cantidad de E/S de la red o archivo, etc. Los tipos de perfiles disponibles dependen del lenguaje cuyo perfil se esté generando.

## Configuración

### Requisitos previos

Antes de empezar, asegúrate de que cumples los siguientes requisitos previos:

1. [Docker Compose][1]
2. Una cuenta de Datadog y una [clave de API][2]. Si necesitas una cuenta de Datadog, [regístrate para disfrutar de una prueba gratuita][3].

### Instalación

El repositorio [dd-continuous-profiler-example][4] te ofrece el ejemplo de un servicio con un problema de rendimiento para que puedas experimentar. Se incluye una API para realizar búsquedas en una "base de datos" de 5000 películas.

Instala y ejecuta el servicio del ejemplo:

```shell
git clone https://github.com/DataDog/dd-continuous-profiler-example.git
cd dd-continuous-profiler-example
echo "DD_API_KEY=YOUR_API_KEY" > docker.env
docker-compose up -d
```

### Validación

Una vez que se hayan creado los contenedores y estén en ejecución, podrás explorar el contenedor "toolbox":

```
docker exec -it dd-continuous-profiler-example-toolbox-1 bash
```

Usa la API con:
```
curl -s http://movies-api-java:8080/movies?q=wars | jq
```

También existe una versión Python del servicio del ejemplo denominada `movies-api-py`. Si optas por utilizarla, ajusta los comandos del tutorial como corresponda.

### Genera datos

Usa la herramienta ApacheBench, [ab][5], para generar tráfico. Ejecútala con 10 clientes HTTP simultáneos y envía las solicitudes cada 20 segundos. En el contenedor "toolbox", ejecuta:

```shell
ab -c 10 -t 20 http://movies-api-java:8080/movies?q=the
```

Resultado del ejemplo:

```text
...
Latencias declaradas por ab:
Porcentaje de solicitudes atendidas en un margen de tiempo determinado (ms)
  50 %    464
  66 %    503
  75 %    533
  80 %    553
  90 %    614
  95 %    683
  98 %    767
  99 %    795
 100 %    867 (solicitud más larga)
```

## Investigación

### Lee el perfil

Usa [Profile Search][6] (Búsqueda de perfiles) para encontrar el perfil que estuvo activo durante el intervalo de tiempo en el que generaste el tráfico. Es posible que tarde alrededor de un minuto en cargarse. El perfil que tiene el test de carga presenta un uso superior de la CPU:

{{< img src="profiler/intro_to_profiling/list.png" alt="Lista de perfiles" style="width:80%;">}}

Cuando lo abras, la visualización del perfil será parecida a esta:

{{< img src="profiler/intro_to_profiling/flame_graph.png" alt="Gráfica de llamas">}}

Esto es una gráfica de llamas. De todo lo que muestra, lo más importante es la cantidad de CPU que usa cada método (dado que estamos ante un perfil de CPU) y cómo se invocaron estos métodos. Por ejemplo, en la segunda fila empezando por arriba, verás que `Thread.run()` invocó a `QueuedThreadPool$2.run()` (entre otras cosas), que a su vez invocó a `QueuedThreadPool.runjob(Runnable)`, que invocó a `ReservedTheadExecutor$ReservedThread.run()`, y así sucesivamente.

Al ampliar una zona de la parte inferior de la gráfica de llamas, aparece un cuadro de información que indica que la CPU dedicó aproximadamente 309 ms (el 0,90 %) de su tiempo a la función `parse()`:

{{< img src="profiler/intro_to_profiling/flame_graph_parse.png" alt="Cuadro parse() de la gráfica de llamas">}}

`String.length()` se encuentra justo debajo de la función `parse()`, lo que significa que la invoca `parse()`. Pasa el cursor por encima de `String.length()` y verás que la CPU le dedicó alrededor de 112 ms de su tiempo:

{{< img src="profiler/intro_to_profiling/flame_graph_length.png" alt="Cuadro String.length() de la gráfica de llamas">}}

Eso quiere decir que se le dedicaron 197 milisegundos a `parse()`: 309 ms - 112 ms. La representación visual es la parte del campo `parse()` que no tiene nada debajo.

Cabe destacar que la gráfica de llamas _no_ representa la progresión del tiempo. Si nos fijamos en esta parte del perfil, `Gson$1.write()` no se ejecutó antes que `TypeAdapters$16.write()`, pero puede que tampoco lo haya hecho después.

{{< img src="profiler/intro_to_profiling/flame_graph_write.png" alt="Sección de la gráfica de llamas con cuadros write() unos al lado de otros">}}

 Puede que se hayan ejecutado de forma simultánea, o que el programa haya invocado varias veces uno de estos parámetros, luego el otro, y así sucesivamente. La gráfica de llamas fusiona en un único campo todas las veces que un programa ejecutó la misma serie de funciones para que puedas ver de un solo vistazo qué partes del código usaron más la CPU; de lo contrario, verías un montón de campos diminutos, uno por cada vez que se haya invocado una función.

Aleja la imagen y fíjate en que alrededor del 87 % del uso de la CPU se produjo en el método `replyJSON()`. Más abajo, la gráfica muestra `replyJSON()`, y los métodos que invoca se terminan bifurcando en cuadro rutas de código principales ("stack traces") que ejecutan funciones relacionadas con el orden y el parseo de fechas:

{{< img src="profiler/intro_to_profiling/flame_graph_replyjson_arrows.png" alt="Gráfica de llamas con flechas que señalan las stack traces que están debajo de replyJSON()">}}

Además, puedes observar que una parte del perfil de la CPU se representa de este modo:

{{< img src="profiler/intro_to_profiling/flame_graph_gc.png" alt="Vista de la recopilación de elementos no usados en la gráfica de llamas" style="width:80%;">}}

### Tipos de perfiles

La CPU dedicó casi un 6 % del tiempo a la recopilación de elementos no usados, lo que indica que podría estar produciendo una gran cantidad de basura. Por tanto, conviene revisar el tipo de perfil correspondiente a la **Memoria asignada**:

{{< img src="profiler/intro_to_profiling/types.png" alt="Selector de tipos de perfiles" style="width:60%;">}}

En un perfil de tipo "Memoria asignada", el tamaño de los campos indica la cantidad de memoria asignada por cada función, así como el stack de llamada que provocó que la función efectuase dicha asignación. Como puedes observar a continuación, en este perfil de un minuto, el método `replyJSON()` y los demás métodos invocados asignaron 17,47 GiB, la mayoría relacionados con el mismo código de parseo de fechas que hemos visto en el perfil de la CPU de arriba:

{{< img src="profiler/intro_to_profiling/alloc_flame_graph_replyjson_arrows.png" alt="Gráfica de llamas del perfil de asignación con flechas que señalan las stack traces que están debajo de replyJSON()">}}

## Solución

### Corrige el código

Revisa el código y fíjate en lo que ocurre. En la gráfica de llamas de la CPU, verás que las rutas de código costosas pasan por una función lambda en la línea 66 que, a su vez, invoca a `LocalDate.parse()`:

{{< img src="profiler/intro_to_profiling/flame_graph_sort_lambda.png" alt="Gráfica de llamas al pasar el ratón por encima de sort lambda">}}

Esto se corresponde con esta parte del código de [`dd-continuous-profiler-example`][7], donde se invoca a `LocalDate.parse()`:

```java
private static Stream<Movie> sortByDescReleaseDate(Stream<Movie> movies) {
  return movies.sorted(Comparator.comparing((Movie m) -> {
    // Problem: Parsing a datetime for each item to be sorted.
    // Example Solution:
    //   Since date is in isoformat (yyyy-mm-dd) already, that one sorts nicely with normal string sorting
    //   `return m.releaseDate`
    try {
      return LocalDate.parse(m.releaseDate);
    } catch (Exception e) {
      return LocalDate.MIN;
    }
  }).reversed());
}
```

Esta es la lógica de ordenación que se aplica en la API, donde los resultados se reflejan en orden descendente según la fecha de lanzamiento. Para ello, la API usa la fecha de lanzamiento en formato `LocalDate` a modo de clave de ordenación. Para ahorrar tiempo, podrías almacenar el parámetro `LocalDate` en caché para que solo se parsee la fecha de lanzamiento de las películas en vez de todas las solicitudes. No obstante, existe una solución mejor: parsear las fechas con el formato de la ISO 8601 (aaaa-mm-dd) para que se puedan ordenar como segmentos y no como parseos.

Reemplaza las secciones `try` y `catch` por `return m.releaseDate;` de esta forma:

```java
private static Stream<Movie> sortByDescReleaseDate(Stream<Movie> movies) {
  return movies.sorted(Comparator.comparing((Movie m) -> {
    return m.releaseDate;
  }).reversed());
}
```

Después, vuelve a crear y reinicia el servicio:
```
docker-compose build movies-api-java
docker-compose up -d
```

### Repite el test

Para comprobar la exactitud de los resultados, vuelve a generar tráfico:

```shell
docker exec -it dd-continuous-profiler-example-toolbox-1 bash
ab -c 10 -t 20 http://movies-api-java:8080/movies?q=the
```

Resultado del ejemplo:

```
Latencias declaradas por ab:
Porcentaje de solicitudes atendidas en un margen de tiempo determinado (ms)
  50 %     82
  66 %    103
  75 %    115
  80 %    124
  90 %    145
  95 %    171
  98 %    202
  99 %    218
 100 %    315 (solicitud más larga)
```

p99 pasó de 795 ms a 218 ms y, por lo general, esta velocidad es entre cuatro y seis veces más rápida que antes.

Localiza el [perfil](#read-the-profile) que contiene el nuevo test de carga y fíjate en el perfil de la CPU. Las partes `replyJSON` de la gráfica de llamas presentan un porcentaje de uso de la CPU mucho más pequeño que el test de carga anterior:

{{< img src="profiler/intro_to_profiling/flame_graph_optimized_replyjson.png" alt="Gráfica de llamas con stack traces replyJSON() optimizadas">}}

### Haz una limpieza

Cuando termines de explorar, ejecuta el siguiente comando para eliminar lo que sobre:

```shell
docker-compose down
```

## Recomendaciones

### Ahorra dinero

Esta mejora del uso de la CPU puede traducirse en una reducción de costes. Si el servicio del ejemplo fuese real, la pequeña mejora que hemos llevado a cabo podría permitirte reducir a la mitad el número de servidores necesarios, lo que supondría un ahorro de miles de euros al año. No está nada mal para algo que solo te ha llevado 10 minutos, ¿verdad?

### Mejora tu servicio

Esta guía solo ha tratado la generación de perfiles de forma superficial, pero debería servirte para entrar en materia. **[Habilita el Profiler en tus servicios][8]**.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.docker.com/compose/install/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/signup
[4]: https://github.com/DataDog/dd-continuous-profiler-example
[5]: https://httpd.apache.org/docs/2.4/programs/ab.html
[6]: https://app.datadoghq.com/profiling?query=env%3Aexample%20service%3Amovies-api-java
[7]: https://github.com/DataDog/dd-continuous-profiler-example/blob/25819b58c46227ce9a3722fa971702fd5589984f/java/src/main/java/movies/Server.java#L66
[8]: /es/profiler/enabling/