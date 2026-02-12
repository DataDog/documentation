---
aliases: null
description: Configuración de Session Replay en dispositivos móviles
further_reading:
- link: /real_user_monitoring/session_replay
  tag: Documentación
  text: Session Replay
title: Session Replay para móviles
---
## Información general

Session Replay para móviles amplía la visibilidad de sus aplicaciones móviles reproduciendo visualmente cada interacción del usuario, como toques, deslizamientos y desplazamientos. Está disponible para aplicaciones nativas, tanto en Android como en iOS. La reproducción visual de las interacciones del usuario en tus aplicaciones facilita la reproducción de fallos y errores, así como la comprensión del recorrido del usuario para introducir mejoras en la interfaz de usuario.

{{< img src="real_user_monitoring/session_replay/mobile/mobile_replay.mp4" alt="Ejemplo de grabación de Session Replay para móviles" video="true" style="width:60%;">}}

## Cómo funciona el grabador de Session Replay 

La grabadora de Session Replay está integrada en el SDK de aplicación móvil de RUM. A diferencia de los navegadores web, las aplicaciones móviles no utilizan HTML ni CSS. En su lugar, el grabador toma una "instantánea" de la pantalla de tu aplicación dividiéndola en simples rectángulos llamados "wireframes". A continuación, realiza un seguimiento de los cambios actualizando únicamente los wireframes que han cambiado, lo que hace que el proceso sea eficiente y rápido.

### Concepto de wireframe

Un _wireframe_ es como una nota adhesiva digital que marca un área específica de la pantalla de tu aplicación, como un botón, una imagen o un fondo. Cada wireframe es un rectángulo que ayuda al grabador a seguir lo que hay en la pantalla.

**Ejemplos de wireframes:**
- Una etiqueta de texto se convierte en un wireframe de "texto", definido por su posición y tamaño.
- El fondo de la aplicación es un wireframe de "forma": un rectángulo que cubre toda la pantalla.
- Cualquier contenedor con un fondo sólido es también un wireframe de "forma".
- Las imágenes o iconos son wireframes de "imagen", que pueden incluir detalles de estilo como la transparencia.
- Incluso los elementos complejos, como un mapa con muchas partes, pueden combinarse en un único wireframe de "imagen".

### Algoritmo de grabación

El grabador escanea la pantalla de tu aplicación desde el fondo hasta el frente, buscando todas las partes visibles. Crea un wireframe para cada una de ellas. Por ejemplo, una pantalla con 78 elementos diferentes puede simplificarse en solo 25 wireframes:

{{< img src="real_user_monitoring/session_replay/mobile/how-it-works/recording-algorithm-3.png" alt="Un ejemplo de cómo la pantalla de aplicación de Shopist contiene 78 vistas nativas, pero está compuesta de 25 wireframes." style="width:70%;">}}

Los wireframes se graban en el orden en que aparecen en la pantalla (de atrás hacia delante) y se colocan utilizando las posiciones exactas de la pantalla. No hay una complicada estructura de árbol, sino una simple lista plana de rectángulos.

### Algoritmo de renderizado

Cuando ves una repetición, el reproductor de Datadog reconstruye la pantalla dibujando cada wireframe en orden. Utiliza la posición y el tamaño de cada rectángulo para colocar todo en el lugar correcto. El primer wireframe establece el tamaño y la orientación de la pantalla (vertical u horizontal).

Cada nuevo wireframe se dibuja encima de los anteriores, como si se apilaran hojas transparentes. Esto permite al reproductor mostrar correctamente elementos superpuestos o semitransparentes.

Por ejemplo, la captura de pantalla mostrada arriba se reconstruye en 25 pasadas:

| Iteración | 1 | 2 | 3 |
|-----------|---|---|---|
| Ventana | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-1-1.png" alt="Un ejemplo de un wireframe de 'forma'." style="width:100%;">}} | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-2-1.png" alt="Un ejemplo de un wireframe de 'imagen'." style="width:100%;">}} | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-3-1.png" alt="Un ejemplo de un wireframe de 'texto'." style="width:100%;">}} |

El primer wireframe dicta el tamaño de la ventana gráfica, lo que permite al reproductor de Session Replay representar correctamente el tamaño y la orientación de la pantalla del dispositivo (horizontal/vertical).

| Iteración | 4 | 5-11 | 12-13 |
|-----------|---|---|---|
| Ventana | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-4-1.png" alt="Un ejemplo de un wireframe de 'forma', 'imagen' y 'texto'." style="width:100%;">}} | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-5-1.png" alt="Un ejemplo de un wireframe 'forma' e 'imagen'." style="width:100%;">}} | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-6-1.png" alt="Un ejemplo de un wireframe de 'forma' e 'imagen'." style="width:100%;">}} |

Dado que los wireframes se ordenan de atrás hacia delante, el reproductor redibuja las partes existentes del marco, lo cual es deseable porque admite varios patrones de interfaz de usuario (como elementos semitransparentes).

| Iteración | 14-25 | Resultado final |
|-----------|-------|--------------|
| Ventana | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-7-1.png" alt="Un ejemplo de un wireframe de 'forma' e 'imagen'." style="width:60%;">}} | {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/iteration-final-1.png" alt="Un ejemplo de un wireframe de 'forma' e 'imagen'." style="width:60%;">}} |

### Instantáneas completas e incrementales

Una "instantánea completa" es como hacer una foto de toda la pantalla, con todos sus wireframes. Pero para ahorrar tiempo y datos, el grabador suele enviar "instantáneas incrementales", que son actualizaciones que incluyen solo los wireframes que han cambiado.

Cada wireframe tiene un ID único (como una etiqueta con el nombre), de modo que el grabador sabe exactamente cuáles debe actualizar. Por ejemplo:
- Si una imagen se mueve, sólo se envían su nueva posición e ID.
- Si desaparece un wireframe, la actualización indica qué ID se ha eliminado.
- Si sólo cambia el contenido (como un nuevo texto), la actualización incluye el nuevo contenido y el ID del wireframe.

A continuación, se muestran ejemplos de cómo las instantáneas incrementales sólo envían actualizaciones para los wireframes afectados.

| Ejemplo | Descripción |
|---------|-------------|
| {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/incremental-snapshots-change-position.mp4" alt="Una instantánea de una posición de wireframe que cambia, pero el contenido y la apariencia no se altera." video="true" >}} | Si la posición de un wireframe cambia, pero su contenido y apariencia no se alteran, la instantánea incremental sólo necesita incluir las nuevas posiciones de los wireframes afectados y su `UUIDs`. Esto podría corresponder a un escenario de "desplazamiento lento" o a cualquier otro escenario en el que sólo se mueva una parte de la pantalla. |
| {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/incremental-wireframe-disappears.mp4" alt="Un ejemplo de un wireframe que desaparece de la pantalla." video="true" >}} | Si un wireframe desaparece de la pantalla, una instantánea incremental podría incluir sólo información sobre el `UUIDs` eliminado. Alternativamente, la instantánea podría incluir siempre información sobre lo que queda `UUIDs`. |
| {{< img src="real_user_monitoring/session_replay/mobile/how-it-works/incremental-content-only.mp4" alt="Un ejemplo de solo el contenido de un wireframe cambiante." video="true" >}} | Si sólo cambia el contenido de un wireframe, una actualización incremental incluye únicamente el nuevo contenido y la dirección `UUID` del wireframe modificado. |

En resumen, el grabador de Session Replay divide la pantalla de tu aplicación en simples rectángulos llamados wireframes. Solo rastrea y envía actualizaciones para las partes que cambian, lo que hace que las repeticiones sean eficientes y precisas.

## Configuración

Aprende a [instalar y configurar Mobile Session Replay][2].
## Opciones de privacidad

Consulta [Opciones de privacidad][3].

## Cómo afecta Session Replay en móviles al rendimiento de las aplicaciones

Véase [cómo afecta Mobile Session Replay al rendimiento de las aplicaciones][4].

## Solucionar problemas

Aprende a [solucionar problemas de Mobile Session Replay][5].

<div class="alert alert-info">En Session Replay, Datadog admite RUM para aplicaciones móviles nativas de iOS y Android, pero no para televisores inteligentes o wearables.</div>

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/session_replay/browser/#how-it-works
[2]: /es/real_user_monitoring/session_replay/mobile/setup_and_configuration
[3]: /es/real_user_monitoring/session_replay/mobile/privacy_options
[4]: /es/real_user_monitoring/session_replay/mobile/app_performance
[5]: /es/real_user_monitoring/session_replay/mobile/troubleshooting