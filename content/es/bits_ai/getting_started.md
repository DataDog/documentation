---
further_reading:
- link: bits_ai/
  tag: Documentación
  text: Descripción general de Bits AI
- link: bits_ai/query_examples
  tag: Documentación
  text: Ejemplos de consultas en lenguaje natural
- link: bits_ai/managing_incidents/
  tag: Documentación
  text: Gestión de incidencias
title: Empezando
---

## Consulta en Datadog

### En el panel de chat

Para abrir el panel de chat en la aplicación, haz clic en **Bits AI** en la esquina inferior izquierda del menú de navegación, o utiliza `Cmd + /` para mostrar u ocultar el panel de chat.

Algunas respuestas de Bits AI incluyen un botón de **sugerencias**. Al hacer clic en él, se muestran consultas adicionales que se aplican al contexto de la conversación.

{{< img src="bits_ai/getting_started/chat_panel_star_service.png" alt="Panel de chat de Bits AI con una pregunta de ejemplo de 'Cómo iniciar un servicio' y respuesta de Bits AI" style="width:90%;">}}

### En una barra de búsqueda

Algunas barras de búsqueda de Datadog admiten consultas en lenguaje natural.

{{< img src="bits_ai/getting_started/ai-enabled-search-bar.png" alt="Barra de búsqueda con consultas en lenguaje natural habilitadas" style="width:90%;">}}

Cuando está disponible, se puede acceder a esta función escribiendo un espacio en la barra de búsqueda y, a continuación, eligiendo una de las consultas sugeridas o escribiendo una nueva consulta.

{{< img src="bits_ai/getting_started/search-bar-with-ai-suggestions.png" alt="Barra de búsqueda que muestra consultas en lenguaje natural sugeridas" style="width:90%;">}}

### En la aplicación móvil

{{< img src="bits_ai/getting_started/bitsai_mobile_app.PNG" alt="Vista del dashboard Inicio de la aplicación móvil con Bits AI" style="width:40%;" >}}

Haz clic en Bits AI en la aplicación móvil para acceder a las mismas funciones de consulta disponibles en el navegador.

## Consultas en Slack

1. [Conecta tu cuenta de Datadog a tu espacio de trabajo de Slack][1].
1. En Slack, utiliza el comando `/dd connect` para mostrar una lista de cuentas a las que conectarte.
1. Elige el nombre de tu cuenta de Datadog en el menú desplegable.
1. Autoriza los permisos adicionales que necesite Bits AI.

Una vez finalizada la configuración, puedes enviar consultas a `@Datadog` en lenguaje natural: `@Datadog Are there any issues with example-service's dependencies?`

{{< img src="bits_ai/getting_started/example-slack-query.png" alt="Salida de un ejemplo de consulta de dependencia de servicio en Slack" style="width:60%;">}}

## Leer más

{{< nombre parcial="whats-next/whats-next.html" >}}

[1]: /es/integrations/slack/?tab=applicationforslack