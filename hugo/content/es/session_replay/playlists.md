---
aliases:
- /es/real_user_monitoring/session_replay/playlists
- /es/product_analytics/session_replay/playlists
description: Aprenda a crear y usar listas de reproducción para organizar Session
  Replays.
further_reading:
- link: /session_replay
  tag: Documentación
  text: Session Replay
- link: https://www.datadoghq.com/blog/datadog-rum-session-replay-playlists/
  tag: Blog
  text: Organice y analice Session Replays relacionadas con listas de reproducción
    en Datadog
title: Listas de reproducción de Session Replay
---
## Descripción general {#overview}

Las Playlists son colecciones de Session Replays que puede agrupar en una estructura similar a una carpeta. Puede usar las listas de reproducción para:

- Organice patrones observados de Session Replays específicas y etiquételos en consecuencia
- Revise listas de reproducción y comprenda de qué trata cada agrupación de un vistazo
- Ahorre tiempo en la búsqueda de Session Replays específicas

## Primeros pasos {#getting-started}

Puede crear una lista de reproducción directamente desde la [página de listas de reproducción][1] o desde un Session Replay individual.

Si detecta algún comportamiento notable después de ver un Session Replay, puede hacer clic en {{< ui >}}Save to Playlist{{< /ui >}} para crear una nueva lista de reproducción o agregar ese Session Replay en particular a una lista de reproducción existente.

Para crearla directamente desde {{< ui >}}Playlist page{{< /ui >}}:

1. En Datadog, vaya a [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Session Replay{{< /ui >}} > {{< ui >}}Playlists{{< /ui >}}][1].
2. Haga clic en {{< ui >}}New Playlist{{< /ui >}}.
3. Asigne un nombre y una descripción a su lista de reproducción. Luego puede comenzar a explorar Session Replays en RUM para agregarlas a la lista de reproducción.

{{< img src="real_user_monitoring/session_replay/playlists/playlists-1.png" alt="Crear una nueva lista de reproducción" style="width:60%;">}}

Para crearla desde un Session Replay individual:

1. Abra el Session Replay que desea guardar.
2. Haga clic en el botón {{< ui >}}Share{{< /ui >}} en la parte superior, luego seleccione {{< ui >}}Save to Playlist{{< /ui >}}.

      {{< img src="real_user_monitoring/session_replay/playlists/share-playlist.png" alt="Crear una nueva lista de reproducción a partir del Session Replay individual" style="width:90%;">}}
3. Agregue el Session Replay a una lista de reproducción existente o cree una nueva.

## Listas de reproducción predeterminadas {#default-playlists}

Tres listas de reproducción predeterminadas le ayudan a revisar Session Replays:

- {{< ui >}}My Watch History{{< /ui >}}: Session Replays que ha visto anteriormente.
- {{< ui >}}All mentions to me{{< /ui >}}: Session Replays donde un compañero de equipo lo @mencionó en un comentario, para que pueda ver qué investigaciones necesitan su aporte.
- {{< ui >}}Commented replays{{< /ui >}}: Cada Session Replay en su organización que tenga al menos un comentario, para que pueda revisar los Session Replays en los que usted o su equipo han comentado.

Las tres listas de reproducción están disponibles en [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Session Replay{{< /ui >}} > {{< ui >}}Playlists{{< /ui >}}][1].

## Casos de uso {#use-cases}

Su equipo puede usar las listas de reproducción de muchas maneras diferentes. Aquí hay algunas ideas para comenzar:

- Después de detectar un error en una sesión, puede encontrar otras sesiones donde existe ese patrón de error y agruparlas
- A medida que actualiza su interfaz de usuario, puede crear listas de reproducción para las sesiones en las que los usuarios pueden haberse perdido en un nuevo flujo
- Para marcar grupos de sesiones que tienen un comportamiento único, como un clic de frustración en un botón que genera ingresos, puede escribir una consulta en RUM y guardar todas las sesiones asociadas en una lista de reproducción 

## Solución de problemas {#troubleshooting}

### Guardar un Session Replay en una lista de reproducción provoca un error {#saving-a-session-replay-to-a-playlist-leads-to-an-error}

Todos los Session Replays en las listas de reproducción deben ser sesiones completadas. Para encontrar Session Replays que sean elegibles para agregarse a listas de reproducción, copie y pegue la siguiente consulta en el RUM explorador:

```@session.is_active:false @session.type:user @session.has_replay:true```

Esta consulta garantiza que esté buscando sesiones completadas que tengan un Session Replay adjunto y que provengan de interacciones de usuarios reales, no de sesiones sintéticas.

### Crear una lista de reproducción provoca un error {#creating-a-playlist-leads-to-an-error}
Asegúrese de tener los roles y permisos adecuados para crear una lista de reproducción. El permiso de escritura de listas de reproducción le permite hacer lo siguiente:

- Crear una lista de reproducción
- Editar una lista de reproducción
- Eliminar una lista de reproducción
- Agregar una sesión a una lista de reproducción
- Eliminar una sesión de una lista de reproducción

Además, el permiso de lectura de Session Replay le permite hacer lo siguiente:

- Visualizar una lista de reproducción
- Visualizar una sesión en una lista de reproducción

### Mantener Session Replays en una lista de reproducción por más tiempo que el período de retención predeterminado de 30 días de Session Replay {#keeping-replays-in-a-playlist-for-longer-than-the-default-30-day-session-replay-retention-period}

De forma predeterminada, la retención de Session Replay es de 30 días. Con [retención extendida][2], usted tiene la capacidad de extender la retención de Session Replays individuales hasta por 15 meses. Agregar un Session Replay a una lista de reproducción extiende automáticamente la retención de ese Session Replay, siempre que usted tenga el `rum_extend_retention` [permiso][3]. Sin este permiso, agregar un Session Replay a una lista de reproducción no extiende su retención. Usted puede revocar la retención extendida de un Session Replay individual en cualquier momento.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/replay/playlists
[2]: /es/session_replay/#retention
[3]: /es/account_management/guide/secure-configuration/#synthetic-monitoring-and-rum