---
further_reading:
- link: https://www.datadoghq.com/blog/analyze-user-experience-frustration-signals-with-rum/
  tag: blog
  text: Detección de los puntos críticos para el usuario utilizando las señales de
    frustración de Datadog
- link: https://docs.datadoghq.com/notebooks/
  tag: documentation
  text: Notebooks
title: Uso de Session Replay como herramienta clave en post mortems
---

## Información general

Session Replay salva la distancia entre el análisis de usuario y la reproducción visual de errores. Esta guía muestra un ejemplo de cómo los desarrolladores pueden aprovechar Session Replay como ayuda visual para documentar post mortems.

## Uso de RUM para identificar la extensión de un problema de usuario

En este ejemplo, hemos visto que muchos usuarios se quejaban de que se producía un problema cuando hacían clic en el botón **Pago**. Luego de investigar [el dashboard de señales de frustración RUM][1], en el Explorador RUM confirmamos que se habían producido casi 3.000 casos de este tipo de error en tan solo una semana:

{{< img src="real_user_monitoring/guide/using-session-replay-in-post-mortems/identify-widespread-user-issue-1.png" alt="Uso de RUM para identificar cuántas instancias de un tipo de error se han producido en una semana" style="width:100%;">}}

## Visualización del problema del usuario en un vídeo de Session Replay
Después de hacer clic en una sesión de la consulta anterior, podemos visualizar un vídeo de Session Replay para ver cómo se produce este error en directo y podemos observar lo que han hecho los usuarios antes y después:

{{< img src="real_user_monitoring/guide/using-session-replay-in-post-mortems/watch-user-issue.png" alt="Observar la experiencia del usuario durante el error en un vídeo de Session Replay" style="width:100%;">}}

## Compartir en un notebook
Para garantizar que otros miembros del equipo que investigan este problema puedan ver este contexto, podemos compartir este vídeo de Session Replay concreto en un notebook a través del botón de compartir:

{{< img src="real_user_monitoring/guide/using-session-replay-in-post-mortems/share-to-notebook.png" alt="Compartir el vídeo de Session Replay guardándolo en un notebook de post mortems" style="width:60%;">}}

Al enviar el vídeo de Session Replay a un notebook, podemos añadir comentarios, analizar otros datos telemétricos de este incidente y documentar nuestro post mortem.

**Nota**: Hay una plantilla de notebooks de post mortems disponible [aquí][2].

## Documentar el post mortem
Después de compartir la repetición en un notebook, podemos empezar a documentar la investigación.

{{< img src="real_user_monitoring/guide/using-session-replay-in-post-mortems/document-the-post-mortem.png" alt="En los notebooks, añadir contexto sobre el comportamiento en la repetición, incluir los gráficos apropiados o etiquetar a las partes interesadas en un comentario" style="width:100%;">}}

Para representar mejor el problema, podemos añadir contexto sobre el comportamiento en la repetición e incluir los gráficos apropiados, como el número total de usuarios afectados.

Además, al añadir un comentario en los notebooks podemos etiquetar a las partes interesadas para que le echen un vistazo. En este caso, hemos etiquetado al jefe de producto responsable de esta función para confirmar que se ha añadido una corrección al backlog.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/analyze-user-experience-frustration-signals-with-rum/
[2]: https://app.datadoghq.com/notebook/template/7/postmortem-ir-xxxx-outage-name