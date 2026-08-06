---
algolia:
  tags:
  - llmobs
  - agentes ia
  - llm
description: Conecta sesiones RUM con LLM Observability para realizar un seguimiento
  de las interacciones de los usuarios con los agentes de IA y comprender el recorrido
  completo del usuario.
further_reading:
- link: /llm_observability/sdk
  tag: Documentación
  text: Referencia del SDK de LLM Observability
title: Correlacionar LLM Observability con RUM
---

## Información general
Correlaciona sesiones RUM y LLM Observability para obtener más visibilidad sobre cómo interactúa tu aplicación web con los agentes de IA. Esta correlación te ayuda a comprender el recorrido completo del usuario conectando las interacciones del usuario frontend con el procesamiento de IA backend.

El enlace entre RUM y LLM Observability se crea reenviando el ID de la sesión RUM al SDK de LLM Observability.

## Requisitos previos

Antes de empezar, asegúrate de que tienes:
- El [SDK del navegador RUM][1] instalado y configurado en tu aplicación web
- El [SDK de LLM Observability][2] instalado en tu servicio backend
- Datadog cuenta con [RUM][3] y [LLM Observability][4] activados
- El endpoint del agente de IA al que tu aplicación web puede llamar

## Configuración
### Paso 1: Configurar el SDK de tu navegador RUM

Asegúrate de que el SDK de tu navegador RUM está correctamente inicializado en tu aplicación web. Para obtener instrucciones de configuración detalladas, consulta la [guía de configuración del navegador RUM][1].

Necesitas enviar tu ID de sesión RUM en cada llamada desde tu aplicación web a un agente de IA. Consulta los ejemplos siguientes.

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
  /* RUM Browser SDK configuration */
});
```

### Paso 2: Modificar las llamadas a tu IA frontend

Actualiza tu aplicación web para incluir el ID de sesión RUM en cada llamada a tu agente de IA. Para obtener más información sobre la gestión de sesiones RUM, consulta la [documentación del navegador RUM][3].

```javascript
 /**
 * Example call to an AI Agent.
 *
 * We send the `session_id` in the body of the request. If the call to the AI agent
 * needs to be a GET request, the `session_id` can be sent as a query param.
 */
 const response = await fetch("/ai-agent-endpoint", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ message, session_id: datadogRum.getInternalContext().session_id }),
});
```

### Paso 3: Actualizar tu manejador backend

Modifica tu código del lado del servidor para extraer el ID de sesión y trasladarlo al SDK de LLM Observability. Para una configuración detallada de LLM Observability, consulta la [guía de configuración de LLM Observability][4].

```python
# Read the session_id from the incoming request
class MessagesHandler:
    def __init__(self, handler):
        try:
            post_data = handler.rfile.read(content_length)

            # Parse the JSON message
            message_data = json.loads(post_data.decode('utf-8'))
            message = message_data.get('message', '')

            # Read the session_id
            current_session_id = message_data.get('session_id', None)

            # Call AI Agent and pass the session_id
            await agent_loop(
                messages=messages,
                model="claude-3-7-sonnet-20250219",
                provider="anthropic",
                api_key=os.getenv("ANTHROPIC_API_KEY"),
                max_tokens=4096,
                session_id=current_session_id,
                # Other kwargs your agent might need
            )
        except Exception as e:
            handler.send_error(500, str(e))
```

Utiliza el SDK de LLM Observability para instrumentar tu agente y tus herramientas e indica al SDK de LLM Observability cuál debe ser el `session_id`.

### Paso 4: Instrumentar tu agente de IA

Utiliza el SDK de LLM Observability para instrumentar tu agente y asociarlo a la sesión RUM. Para una referencia detallada, consulta la [documentación del SDK de LLM Observability][4].
```python
async def agent_loop(
    session_id,
    # Other kwargs
):
    LLMObs.annotate(
        span=None,
        tags={"session_id": session_id},
    )
    # Rest of your agent code
```

## Navegación entre RUM y LLM Observability
Una vez finalizada la configuración, podrás navegar entre los datos correlacionados:

- **De RUM a LLM**: En una sesión RUM, haz clic en el botón "LLM Traces" (Trazas de LLM) en la cabecera del panel lateral para ver las interacciones de IA asociadas.
- **De LLM a RUM**: En una traza de LLM, haz clic en el enlace "RUM Session" (Sesión RUM) para ver la repetición de la sesión de usuario correspondiente.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/browser/setup/
[2]: /es/llm_observability/setup/
[3]: /es/real_user_monitoring/browser/
[4]: /es/llm_observability/