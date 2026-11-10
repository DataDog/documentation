---
description: Adjunte audio e imágenes a los tramos de LLM en Agent Observability y
  reprodúzcalos en línea en la vista de traza, ya sea automáticamente o mediante instrumentación
  manual.
further_reading:
- link: /llm_observability/instrument/sdk/
  tag: Documentación
  text: Referencia del Agent Observability SDK
- link: /llm_observability/instrument/auto_instrumentation/
  tag: Documentación
  text: Instrumentación automática para Agent Observability
- link: /llm_observability/instrument/api/
  tag: Documentación
  text: Referencia de la API HTTP de Agent Observability
title: Soporte multimodal
---
## Descripción general {#overview}

Adjunte imágenes y audio a los tramos de LLM para solucionar problemas de agentes de voz y agentes que procesan imágenes. Inspeccione las imágenes que recibió un modelo y reproduzca su audio de entrada y salida directamente en la vista de traza, junto con otros datos del tramo. No necesita reconstruir la interacción a partir de registros o almacenamiento independiente. Para conversaciones de voz, vea la transcripción de cada turno junto con su audio.

{{< img src="llm_observability/instrumentation/image_example.png" alt="Un tramo de LLM en la vista de traza de Agent Observability. El mensaje de entrada del USUARIO muestra el prompt 'What is in this image?' con una foto en línea de un cachorro negro, y el mensaje de salida del ASISTENTE lo describe como un cachorro de Labrador Retriever negro sobre una superficie de madera." style="width:100%;" >}}

El contenido multimedia pertenece a mensajes individuales dentro de un tramo de LLM. [La instrumentación automática](#automatic-instrumentation) captura contenido multimedia de las bibliotecas compatibles. Para otras bibliotecas, utilice [instrumentación manual](#manual-instrumentation) para adjuntar contenido multimedia. Para los tramos de OpenTelemetry, consulte [instrumentación de OpenTelemetry](#opentelemetry-instrumentation).

## Requisitos {#requirements}

Las siguientes versiones del SDK de Datadog admiten adjuntar contenido multimedia a los mensajes. Para la captura automática, consulte los [requisitos específicos de la integración](#automatic-instrumentation).

| Capacidad | SDK de Python (`ddtrace`) | SDK de Node.js (`dd-trace`) |
| ---------- | --------------------- | ----------------------- |
| Audio en mensajes | >= 4.12.0 | v6: >= 6.7.0; v5: >= 5.118.0 |.
| Imágenes en mensajes | >= 4.13.0 | v6: >= 6.10.0; v5: >= 5.121.0 |.

No se aplica ninguna versión mínima del SDK de Datadog a la [API HTTP de Agent Observability][1] o a la [instrumentación de OpenTelemetry][2]. La instrumentación de OpenTelemetry debe emitir las [partes de mensaje de GenAI compatibles](#opentelemetry-instrumentation).

## Instrumentación automática {#automatic-instrumentation}

Las [integraciones de LLM][3] de Datadog completan partes de medios para las siguientes bibliotecas, sin necesidad de cambios de código por su parte.

{{< tabs >}}
{{% tab "Python" %}}

| Integración | Medios capturados | Versión del SDK de Datadog |
| ----------- | -------------- | ------------------- |
| Finalizaciones de chat de OpenAI | Contenido de entrada `input_audio` y audio de salida, incluida la transcripción de audio del modelo | >= 4.12.0 |.
| API de Realtime de OpenAI | Audio de entrada y salida por turno, transcripciones, uso de tokens y llamadas a herramientas | >= 4.13.0 |.
| LiteLLM | Audio de entrada y salida, a través del formato de finalizaciones de chat de OpenAI | >= 4.12.0 |.
| Finalizaciones de chat de OpenAI y API de respuestas | Imágenes codificadas en base64 en línea | >= 4.15.0 |.
| Agentes de OpenAI | Imágenes codificadas en base64 en línea | >= 4.15.0 |.
| Anthropic | Imágenes codificadas en base64 en línea | >= 4.15.0 |.

Cada turno de una conversación de la API de Realtime de OpenAI genera su propio tramo de LLM. El audio sin procesar `pcm16` y G.711 se convierte a WAV para que se reproduzca en el navegador. Para desactivar la instrumentación de la API de Realtime, configure `DD_OPENAI_REALTIME_ENABLED=false`.

El audio en las finalizaciones de chat transmitidas (`stream=True`) no se captura.

{{% /tab %}}
{{% tab "Node.js" %}}

| Integración | Medios capturados | Versión del SDK de Datadog |
| ----------- | -------------- | ------------------- |
| Finalizaciones de chat de OpenAI | Contenido de entrada `input_audio` y audio de salida, incluida la transcripción de audio del modelo | v6: >= 6.7.0; v5: >= 5.118.0 |
| Agentes de OpenAI | Audio de entrada y salida, a través del formato de finalizaciones de chat de OpenAI | v6: >= 6.7.0; v5: >= 5.118.0 |

El audio en las finalizaciones de chat transmitidas no se captura.

{{% /tab %}}
{{< /tabs >}}

Integrations no obtienen imágenes referenciadas por una URL remota o un ID de archivo. Solo capturan las imágenes que la aplicación envía en línea como datos base64. Cuando una integración no puede capturar medios, registra un marcador de texto como `[image]` o `[audio]` en el mensaje.

## Instrumentación de OpenTelemetry {#opentelemetry-instrumentation}

Datadog extrae medios de [tramos de OpenTelemetry][2] que contienen las siguientes [partes de mensajes de GenAI][7]. No se necesita instrumentación adicional si su aplicación ya emite estas partes:

- Una parte `blob` con un `mime_type` y bytes integrados se convierte en una parte de imagen o audio. Cuando la parte omite `modality`, Datadog lo infiere a partir del tipo MIME.
- Una parte `uri` que contiene un URI de datos de imagen en base64, como `data:image/png;base64,...`, se convierte en una parte de imagen.

Solo se renderiza el contenido multimedia transportado en línea como bytes base64. Una URL remota se registra como una referencia de texto y nunca se recupera. Para la reproducción de audio, envíe audio en partes `blob`. Las convenciones especifican `blob` para datos en base64 integrados, así que prefiera `blob` tanto para audio como para imágenes.

Para ver el mapeo completo, consulte [Medios en mensajes][8].

## Instrumentación manual {#manual-instrumentation}

Adjunte medios a una traza de LLM agregando `image_parts` o `audio_parts` a un mensaje en `input_data` o `output_data`.

Cada parte de medio utiliza los siguientes campos:

| Campo | Tipo | Requerido | Descripción |
| ----- | ---- | -------- | ----------- |
| `mime_type` | cadena | Sí | El tipo de medio del archivo adjunto, como `image/png` o `audio/wav`. |
| `content` | cadena | Sí | El medio codificado en base64. |

Datadog almacena los medios por separado durante la ingesta y los carga bajo demanda en la vista de traza. Los medios integrados siguen contando para el límite de tamaño de eventos del tramo. Antes de adjuntar medios, consulte los [formatos admitidos](#supported-formats) y los [límites de tamaño](#limits-and-behavior).

Los ejemplos se centran en la anotación y omiten la configuración del SDK y las llamadas al modelo. Para la configuración del SDK, consulte la [referencia del SDK de Agent Observability][6].

{{< tabs >}}
{{% tab "Python" %}}

**Adjuntar una imagen**

```python
import base64
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="gpt-4o", model_provider="openai")
def describe_image(image_bytes):
    resp = ...  # multimodal (vision) LLM call
    LLMObs.annotate(
        input_data=[
            {
                "role": "user",
                "content": "What is in this image?",
                "image_parts": [
                    {"mime_type": "image/png", "content": base64.b64encode(image_bytes).decode("utf-8")}
                ],
            }
        ],
        output_data=[{"role": "assistant", "content": "The image shows a golden retriever puppy."}],
    )
    return resp
```

**Adjuntar audio y una transcripción**

```python
import base64
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="gpt-realtime", model_provider="openai")
def voice_turn(user_audio_bytes):
    resp = ...  # multimodal (audio) LLM call
    LLMObs.annotate(
        input_data=[
            {
                "role": "user",
                "content": "Hey, how are you?",  # transcript of the input audio
                "audio_parts": [
                    {"mime_type": "audio/wav", "content": base64.b64encode(user_audio_bytes).decode("utf-8")}
                ],
            }
        ],
        output_data=[
            {
                "role": "assistant",
                "content": "Hey! I'm doing great, thanks for asking. How about you?",
                "audio_parts": [
                    {"mime_type": "audio/wav", "content": base64.b64encode(resp.audio_bytes).decode("utf-8")}
                ],
            }
        ],
    )
    return resp
```

Si a una parte de medio le falta `mime_type` o `content`, la anotación falla.

{{% /tab %}}
{{% tab "Node.js" %}}

Node.js utiliza los nombres de campo camelCase `imageParts` y `audioParts`, con `mimeType` en cada parte.

**Adjuntar una imagen**

```javascript
function describeImage (imageBytes) {
  const resp = ... // multimodal (vision) LLM call
  llmobs.annotate({
    inputData: [
      {
        role: 'user',
        content: 'What is in this image?',
        imageParts: [{ mimeType: 'image/png', content: imageBytes.toString('base64') }]
      }
    ],
    outputData: [{ role: 'assistant', content: 'The image shows a golden retriever puppy.' }]
  })
  return resp
}
describeImage = llmobs.wrap({ kind: 'llm', modelName: 'gpt-4o', modelProvider: 'openai' }, describeImage)
```

**Adjuntar audio y una transcripción**

```javascript
function voiceTurn (userAudioBytes) {
  const resp = ... // multimodal (audio) LLM call
  llmobs.annotate({
    inputData: [
      {
        role: 'user',
        content: 'Hey, how are you?', // transcript of the input audio
        audioParts: [{ mimeType: 'audio/wav', content: userAudioBytes.toString('base64') }]
      }
    ],
    outputData: [
      {
        role: 'assistant',
        content: "Hey! I'm doing great, thanks for asking. How about you?",
        audioParts: [{ mimeType: 'audio/wav', content: resp.audioBuffer.toString('base64') }]
      }
    ]
  })
  return resp
}
voiceTurn = llmobs.wrap({ kind: 'llm', modelName: 'gpt-audio', modelProvider: 'openai' }, voiceTurn)
```

Una parte de medio a la que le falte `mimeType` o `content` se descarta. El resto del mensaje sigue registrado.

{{% /tab %}}
{{% tab "API" %}}

Envíe `audio_parts` y `image_parts` en los objetos de mensaje que envíe al [punto de conexión de la API de tramos][1]. Los nombres de los campos coinciden con el SDK de Python.

```json
{
  "role": "user",
  "content": "What is in this image?",
  "image_parts": [
    {
      "mime_type": "image/png",
      "content": "iVBORw0KGgoAAAANSUhEUgAA..."
    }
  ]
}
```

Para ver el esquema completo del mensaje, consulte [Message][2] en la [referencia de la API HTTP de Agent Observability][3].

[1]: /es/llm_observability/instrument/api/#spans-api
[2]: /es/llm_observability/instrument/api/#message
[3]: /es/llm_observability/instrument/api/
{{% /tab %}}
{{< /tabs >}}

## Ver imágenes y reproducir audio {#view-images-and-play-audio}

Abra una traza en [Trace Explorer][4] y seleccione un tramo de LLM. El contenido multimedia adjunto a los mensajes del tramo se muestra dentro del mensaje al que pertenece.

Las imágenes aparecen como miniaturas. Seleccione una miniatura para abrir la imagen en tamaño completo. Se muestran hasta 12 imágenes por mensaje.

El audio aparece como un reproductor, con el texto del mensaje mostrado junto a él. Para una conversación de voz, ese texto es la transcripción del turno. Seleccione el reproductor para cargar y reproducir el audio.

{{< img src="llm_observability/instrumentation/audio_example.png" alt="Un tramo de LLM en la vista de traza de Agent Observability. El mensaje de entrada del USUARIO muestra un reproductor de audio en línea con la transcripción 'Hey, how are you?', y el mensaje de salida del ASISTENTE muestra un control de 'Click to play audio' con la transcripción 'Hey! Me va muy bien, gracias por preguntar. ¿Y usted?" style="width:100%;" >}}

### Formatos admitidos {#supported-formats}

Las imágenes se renderizan cuando el tipo MIME es uno de `image/png`, `image/jpeg`, `image/webp` o `image/gif`, y el tipo MIME declarado coincide con los bytes codificados. Las imágenes SVG no se renderizan. La visualización de traza no realiza solicitudes salientes, por lo que una imagen referenciada por una URL remota se muestra como texto en lugar de ser recuperada.

El audio se reproduce a través del reproductor de audio nativo del navegador. Los contenedores admitidos incluyen `audio/wav`, `audio/mpeg`, `audio/ogg` y `audio/webm`. Los formatos sin procesar como `pcm16`, `g711_ulaw` y `g711_alaw` no se reproducen. Convierta el audio sin procesar a WAV antes de adjuntarlo. La integración de la API de Python OpenAI Realtime realiza esta conversión por usted.

## Límites y comportamiento {#limits-and-behavior}

- **Tamaño del evento de tramo.** Un evento de tramo tiene un límite de 5 MB. Cuando un tramo excede el límite, su entrada y salida se reemplazan con un marcador de posición y se agrega `dropped_io` al atributo `collection_errors` del tramo. El tramo en sí se conserva.
- **Tamaño por parte.** La instrumentación automática en Python limita una sola parte de medios en línea a 4 MiB. Por encima del límite, la integración registra un marcador de texto como `[audio]` o `[image omitted: too large]` y conserva el texto del mensaje y la respuesta del modelo circundantes.
- **Sensitive Data Scanner.** El contenido multimedia no es escaneado por [Sensitive Data Scanner][5]. El texto del mensaje, los argumentos de la herramienta y los resultados de la herramienta se escanean como de costumbre.

## Mejores prácticas {#best-practices}

- **Utilice los campos de medios tipados.** Adjunte archivos multimedia con `image_parts` y `audio_parts` en lugar de incrustar cadenas base64 en el `content` de un mensaje. Solo los campos tipados se muestran en la visualización de la traza.
- **Adjunte la transcripción con el audio.** Establezca el `content` del mensaje en la transcripción del turno para que el tramo sea legible, buscable y utilizable por los evaluadores incluso antes de que se reproduzca el audio.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/llm_observability/instrument/api/
[2]: /es/llm_observability/instrument/otel_instrumentation/
[3]: /es/llm_observability/instrument/auto_instrumentation/
[4]: https://app.datadoghq.com/llm/traces
[5]: /es/security/sensitive_data_scanner/
[6]: /es/llm_observability/instrument/sdk/
[7]: https://github.com/open-telemetry/semantic-conventions-genai/blob/main/model/gen-ai/gen-ai-input-messages.json
[8]: /es/llm_observability/instrument/otel_instrumentation/#media-in-messages