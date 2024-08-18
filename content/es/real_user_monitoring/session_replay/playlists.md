---
aliases: null
description: Aprende a crear y utilizar listas de reproducción para organizar las
  repeticiones de las sesiones.
further_reading:
- link: /real_user_monitoring/session_replay
  tag: Documentación
  text: Session Replay
- link: https://www.datadoghq.com/blog/datadog-rum-session-replay-playlists/
  tag: Blog
  text: Organizar y analizar las repeticiones de sesiones relacionadas con listas
    de reproducción en Datadog RUM
title: Listas de reproducción de Session Replay
---

## Información general

Las listas de reproducción son recopilaciones de repeticiones de sesiones que se pueden agregar a una estructura similar a una carpeta. Puedes utilizar las listas de reproducción para:

- Organizar los patrones observados en repeticiones de sesiones específicas y etiquetarlos (label) en consecuencia
- Echar un vistazo a las listas de reproducción y comprender a simple vista de qué trata cada agrupación
- Ahorrar tiempo al buscar repeticiones de sesiones específicas

## Para empezar

Puedes crear una lista de reproducción directamente desde la [página de listas de reproducción][1] o desde una repetición de sesión individual.

Para crearla directamente desde la **página de listas de reproducción**:

1. En Datadog, ve a [**Experiencia digital > Session Replay > Listas de reproducción**][1].
2. Haz clic en **Nueva lista de reproducción**.
3. Dale un nombre y una descripción a tu lista de reproducción. A continuación, puedes empezar a explorar las repeticiones de sesiones en RUM para añadirlas a la lista de reproducción.

{{< img src="real_user_monitoring/session_replay/playlists/playlists-1.png" alt="Crear una nueva lista de reproducción" style="width:60%;">}}

Para crearla a partir de una repetición de sesión individual:

1. Abre la repetición que quieres guardar.
2. Haz clic en el botón **Guardar en lista de reproducción** en la parte superior.
3. Añade la grabación a una lista de reproducción existente o crea una nueva, como se muestra en el siguiente vídeo.

   {{< img src="real_user_monitoring/session_replay/playlists/playlist-individual-session-replay.mp4" alt="Crear una nueva lista de reproducción a partir de una grabación individual" video="true" width="90%" >}}

Si detectas algún comportamiento notable después de ver una repetición de sesión, puedes hacer clic en **Guardar en lista de reproducción** para crear una nueva lista de reproducción o añadir esa repetición de sesión concreta a una lista de reproducción existente.

{{< img src="real_user_monitoring/session_replay/playlists/playlists-build-new-playlist.mp4" alt="Crear una nueva lista de reproducción" video="true" width="90%" >}}

## Casos de uso

Tu equipo puede utilizar las listas de reproducción de muchas formas distintas. Aquí tienes algunas ideas para empezar:

- Si detectas un error en una sesión, puedes buscar otras sesiones en las que se produzca el mismo patrón de error y agruparlas.
- A medida que actualizas tu interfaz de usuario, puedes crear listas de reproducción para las sesiones en las que los usuarios puedan haberse perdido en un nuevo flujo (flow)
- Para marcar grupos de sesiones que tienen un comportamiento único, como un clic de rabia en un botón de generación de ingresos, puedes escribir una consulta en RUM y guardar todas las sesiones asociadas en una lista de reproducción 

## Solucionar problemas

### Se produce un error al guardar una reproducción de sesión en una lista de reproducción

Todas las repeticiones de sesión de las listas de reproducción deben ser sesiones completas. Para encontrar las repeticiones de sesión que pueden añadirse a las listas de reproducción, copia y pega la siguiente consulta en el Explorador RUM:

```@session.is_active:false @session.type:user @session.has_replay:true```

Esta consulta te asegura que estás buscando sesiones completadas que tienen una repetición adjunta y que son interacciones de usuarios reales, no sesiones de Synthetic.

### Se produce un error al crear una lista de reproducción
Asegúrate de que dispones de los roles y permisos adecuados para crear una lista de reproducción. El permiso de escritura de listas de reproducción te permite hacer lo siguiente:

- Crear una lista de reproducción
- Editar una lista de reproducción
- Eliminar una lista de reproducción
- Añadir una sesión a una lista de reproducción
- Eliminar una sesión de una lista de reproducción

Además, el permiso de lectura de Session Replay te permite hacer lo siguiente:

- Ver una lista de reproducción
- Ver una sesión en una lista de reproducción

### Conservación de las repeticiones en una lista de reproducción durante más tiempo que el periodo de conservación predeterminado de 30 días de Session Replay

Por defecto, el periodo de conservación de Session Replay es de 30 días. Con la [conservación ampliada][2], tienes la posibilidad de extender el periodo de conservación de las repeticiones de sesiones individuales hasta 15 meses. Al añadir una reproducción de sesión a una lista de reproducción se amplía automáticamente el periodo de conservación de dicha reproducción. Puedes revocar la conservación ampliada de una repetición de sesión individual en cualquier momento.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/replay/playlists
[2]: /es/real_user_monitoring/session_replay/#retention