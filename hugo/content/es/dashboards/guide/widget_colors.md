---
title: Selección de los colores adecuados para las gráficas
---

En las gráficas de Datadog, el color es el método principal para distinguir las series de datos. Seleccionar el color adecuado para tu gráfica garantiza que tus compañeros de equipo puedan analizar los datos de tus gráficas, extraer conclusiones y solucionar problemas con eficacia.

{{< img src="dashboards/guide/colors/colors_top.png" alt="Bajo el título «Graficar los datos», el usuario selecciona de una lista de paletas de colores." style="width:90%;" >}}

## Tipos de paletas de colores

### Paletas por categorías

Las paletas por categorías se utilizan para datos que se deben diferenciar, pero que no siguen un orden natural; por ejemplo, las zonas de disponibilidad.

{{< img src="dashboards/guide/colors/2_alphabet.png" alt="Una paleta que muestra las letras A, B, C, D, E, F, G, donde cada letra tiene un tono diferente." style="width:40%;" >}}

#### Clásica

La paleta clásica predeterminada utiliza un conjunto de seis colores diferentes optimizados para facilitar la lectura. Los colores asignados a las series se repiten si el número de series es superior a seis. Las series adyacentes suelen tener colores diferentes. Sin embargo, en raras ocasiones, las series adyacentes podrían utilizar el mismo color si las series intermedias no tienen valor para los períodos de tiempo parciales.

La paleta de colores clásica es compatible con la accesibilidad visual.

{{< img src="dashboards/guide/colors/3_classic_palette.png" alt="Información general sobre cómo se ve la paleta clásica para una gráfica circular y una de barras apiladas." style="width:80%;" >}}

#### Coherente/semántica

La paleta coherente permite asignar el mismo color de forma coherente a una serie de datos, lo que facilita la correlación de datos entre las gráficas. La paleta coherente no garantiza que las series de datos adyacentes no utilicen el mismo color, y no es compatible con la accesibilidad.


{{< img src="dashboards/guide/colors/4_consistent_palette.png" alt="Paleta de colores para la paleta coherente/semántica." style="width:70%;" >}}

{{< img src="dashboards/guide/colors/5_consistent_interface.png" alt="Gráficas de barras con una paleta coherente." style="width:90%;" >}}

En el caso de un subconjunto pequeño de etiquetas compatibles, Datadog reconoce de manera automática el significado que hay detrás de cada serie de datos. En este caso, la paleta de colores coherente aparece como una paleta de colores semántica, que utiliza el color para representar el significado. Por ejemplo, el color rojo puede representar un error. Consulta la sección de [Etiquetas semánticas compatibles][2] para obtener una lista de las etiquetas compatibles.

{{< img src="dashboards/guide/colors/6_semantic_interface.png" alt="Gráfica de barras con una paleta semántica." style="width:90%;" >}}

### Paletas divergentes

Utiliza una paleta divergente cuando necesites resaltar la diferencia de valores dentro de un conjunto de datos. Las paletas divergentes se adaptan mejor a los datos que tienen un orden y un punto medio naturales. Por ejemplo: la cantidad de cambio en la utilización de memoria, de -100 % a +100 %, con un punto medio natural en 0 %.

Hay dos opciones de paletas divergentes: fría (verde y azul) o cálida (interpola entre amarillo y naranja).

{{< img src="dashboards/guide/colors/7_divergent_palette.png" alt="Una paleta que muestra -3, -2, -1, 0, 1, 2, 3, con diferentes degradados de color en ambos extremos." style="width:40%;" >}}
{{< img src="dashboards/guide/colors/8_divergent_graphs.png" alt="Gráficas con paletas divergentes." style="width:80%;" >}}

### Paletas secuenciales

Utiliza una paleta secuencial cuando necesites destacar que diferentes series de tu conjunto de datos tienen algo en común. Esta paleta funciona bien para datos que tienen un orden natural, como la utilización de la CPU (de 0 % a 100 %) de un grupo de hosts.

Las opciones de color incluyen morado, naranja, gris, rojo, verde y azul.

Cuando se combinan con las [anulaciones de color](#color-overrides), las paletas secuenciales te ayudan a distinguir los resultados de varias consultas en una misma gráfica.

{{< img src="dashboards/guide/colors/9_sequential_palette.png" alt="Una paleta que muestra 1, 2, 3, 4, 5, 6, 7, donde los colores son un degradado." style="width:r0%;" >}}
{{< img src="dashboards/guide/colors/10_sequential_graphs.png" alt="Gráficas con paletas secuenciales." style="width:80%;" >}}

## Anulación de color

Las anulaciones de color te permiten asignar un único color de tu elección a cada consulta. Esto resulta especialmente útil para distinguir los resultados de varias consultas en una misma gráfica.

{{< img src="dashboards/guide/colors/11_overrides.png" alt="El panel que permite al usuario configurar anulaciones de color." style="width:80%;" >}}

**Nota**: Si tu consulta se agrega mediante una etiqueta (por ejemplo, «sum by» o «avg by»), solo puedes seleccionar una anulación de paleta. Esto evita que diferentes series utilicen el mismo color, preservando la legibilidad.

{{< img src="dashboards/guide/colors/12_palette_and_color_override_comparison.png" alt="Comparación de los paneles desplegables de anulación de color y de paleta." style="width:80%;" >}}

## Configuración de la accesibilidad

Datadog ofrece modos de color accesibles para que las gráficas se adapten a las necesidades visuales, como el daltonismo, la baja agudeza visual y la sensibilidad al contraste. Al seleccionar un modo de color accesible, todas las gráficas con la paleta clásica se representan en un conjunto de colores accesibles que se adaptan a una necesidad visual específica. Puedes configurar un modo de color accesible desde la [página de Preferencias del usuario][1].

{{< img src="dashboards/guide/colors/visual_accessibility.png" alt="Opciones de accesibilidad visual disponibles: predeterminado, protanopia (dificultad para distinguir verdes y rojos), deuteranopia (dificultad para distinguir entre rojos, verdes y amarillos), tritanopia (dificultad para distinguir azules y verdes), alto contraste (mayor separación entre colores para una baja agudeza visual), baja saturación (disminución del contraste para la sensibilidad al contraste visual)." style="width:90%;" >}}

[1]: https://app.datadoghq.com/personal-settings/preferences
[2]: /es/dashboards/guide/compatible_semantic_tags