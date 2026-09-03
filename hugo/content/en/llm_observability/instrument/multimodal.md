---
title: Multimodal Support
description: Attach audio and images to LLM spans in Agent Observability and render them inline in the trace view, automatically or through manual instrumentation.
further_reading:
    - link: '/llm_observability/instrument/sdk/'
      tag: 'Documentation'
      text: 'Agent Observability SDK Reference'
    - link: '/llm_observability/instrument/auto_instrumentation/'
      tag: 'Documentation'
      text: 'Automatic Instrumentation for Agent Observability'
    - link: '/llm_observability/instrument/api/'
      tag: 'Documentation'
      text: 'Agent Observability HTTP API Reference'
---

## Overview

You can attach media (images and audio) to LLM spans and render it directly in the trace view, alongside the rest of the span's data. This lets you troubleshoot **voice agents** and **agents that reason over images** with their full context.

Multimodal support enables you to:

- Attach images to LLM span messages and see them rendered inline in the trace view
- Attach audio to LLM span messages and play it back from an inline audio player
- See per-turn transcripts alongside the audio for voice conversations
- Inspect the exact image a model was shown, and hear the exact audio it received and produced, without reconstructing it from logs or a separate storage system

{{< img src="llm_observability/instrumentation/image_example.png" alt="An LLM span in the Agent Observability trace view. The input USER message shows the prompt 'What is in this image?' with an inline photo of a black puppy, and the output ASSISTANT message describes it as a black Labrador Retriever puppy on a wooden surface." style="width:100%;" >}}

Media is attached per message using the typed fields `image_parts` and `audio_parts`. [Automatic instrumentation](#automatic-instrumentation) populates these fields for supported integrations, so media from those libraries appears in traces without any code change. For anything else, [manual instrumentation](#manual-instrumentation) covers how to attach media to a span.

## Requirements

| Capability | Python | Node.js |
| ---------- | ------ | ------- |
| Audio on messages | >= 4.12.0 | >= 6.7.0, or >= 5.118.0 |
| Images on messages | >= 4.13.0 | >= 6.10.0, or >= 5.121.0 |

The [Agent Observability HTTP API][1] and [OpenTelemetry instrumentation][2] have no version requirement.

## Automatic instrumentation

Datadog's [LLM integrations][3] populate media parts for the following libraries, with no code change on your part.

{{< tabs >}}
{{% tab "Python" %}}

| Integration | Media captured | Tracer version |
| ----------- | -------------- | -------------- |
| OpenAI chat completions | Input `input_audio` content and output audio, including the model's audio transcript | >= 4.12.0 |
| OpenAI Realtime API | Per-turn input and output audio, transcripts, token usage, and tool calls | >= 4.13.0 |
| LiteLLM | Input and output audio, through the OpenAI chat completions format | >= 4.12.0 |
| OpenAI chat completions and Responses API | Inline base64-encoded images | >= 4.15.0 |
| OpenAI Agents | Inline base64-encoded images | >= 4.15.0 |
| Anthropic | Inline base64-encoded images | >= 4.15.0 |

Each turn of an OpenAI Realtime API conversation produces its own LLM span. Raw `pcm16` and G.711 audio is converted to WAV so that it plays in the browser. To turn off Realtime API instrumentation, set `DD_OPENAI_REALTIME_ENABLED=false`.

Audio in streamed chat completions (`stream=True`) is not captured.

{{% /tab %}}
{{% tab "Node.js" %}}

| Integration | Media captured | Tracer version |
| ----------- | -------------- | -------------- |
| OpenAI chat completions | Input `input_audio` content and output audio, including the model's audio transcript | >= 6.7.0, or >= 5.118.0 |
| OpenAI Agents | Input and output audio, through the OpenAI chat completions format | >= 6.7.0, or >= 5.118.0 |

Audio in streamed chat completions is not captured.

{{% /tab %}}
{{< /tabs >}}

Images referenced by a remote URL or a file ID are not fetched. Only images the application sends inline as base64 data are captured. Where an integration finds media it cannot capture, it records a text marker such as `[image]` or `[audio]` in the message content so that the media is still accounted for.

## Manual instrumentation

Attach media to an LLM span by adding `image_parts` or `audio_parts` to a message in `input_data` or `output_data`.

Each media part takes the following fields:

| Field | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| `mime_type` | string | Yes | The media type of the attachment, such as `image/png` or `audio/wav`. |
| `content` | string | Yes | The base64-encoded media. |

Datadog moves inline media out of the span payload during ingestion and the trace view fetches it on demand, so a large attachment does not weigh down the span itself.

{{< tabs >}}
{{% tab "Python" %}}

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

A media part that is missing `mime_type` or `content` raises a `TypeError`.

{{% /tab %}}
{{% tab "Node.js" %}}

Node.js uses the camelCase field names `imageParts` and `audioParts`, with `mimeType` on each part.

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

A media part that is missing `mimeType` or `content` is dropped. The rest of the message is still recorded.

{{% /tab %}}
{{% tab "API" %}}

Submit `audio_parts` and `image_parts` on the message objects you send to the [Spans API endpoint][1]. The field names match the Python SDK.

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

For the full message schema, see [Message][2] in the [Agent Observability HTTP API reference][3].

[1]: /llm_observability/instrument/api/#spans-api
[2]: /llm_observability/instrument/api/#message
[3]: /llm_observability/instrument/api/
{{% /tab %}}
{{% tab "OpenTelemetry" %}}

If you use [OpenTelemetry instrumentation][1], no code change is required. Datadog extracts media at ingestion from message parts that follow the [OpenTelemetry GenAI semantic conventions for message parts][2]:

- A `blob` part with a `mime_type` and inline bytes becomes an image or audio part. When the part omits `modality`, Datadog infers it from the MIME type.
- A `uri` part carrying a base64 image data URI, such as `data:image/png;base64,...`, becomes an image part.

Only media carried inline as base64 bytes is rendered. A remote URL is recorded as a text reference and is never fetched. Audio reaches the trace view through `blob` parts only, and the conventions specify `blob` as the part type for inline base64 data, so prefer `blob` for both audio and images.

For the full mapping, see [Media in messages][3].

[1]: /llm_observability/instrument/otel_instrumentation/
[2]: https://github.com/open-telemetry/semantic-conventions-genai/blob/main/model/gen-ai/gen-ai-input-messages.json
[3]: /llm_observability/instrument/otel_instrumentation/#media-in-messages
{{% /tab %}}
{{< /tabs >}}

## View media in the trace view

Open a trace in [Trace Explorer][4] and select an LLM span. Media attached to the span's messages renders inside the message it belongs to.

Images appear as thumbnails. Select a thumbnail to open the image at full size. Up to 12 images render per message.

Audio appears as a player, with the message text shown alongside it. For a voice conversation, that text is the turn transcript. Select the player to load and play the audio.

{{< img src="llm_observability/instrumentation/audio_example.png" alt="An LLM span in the Agent Observability trace view. The input message from the USER shows an inline audio player with the transcript 'Hey, how are you?', and the output ASSISTANT message shows a 'Click to play audio' control with the transcript 'Hey! I'm doing great, thanks for asking. How about you?'." style="width:100%;" >}}

### Supported formats

Images render when the MIME type is one of `image/png`, `image/jpeg`, `image/webp`, or `image/gif`, and the declared MIME type matches the encoded bytes. SVG images do not render. The trace view makes no outbound requests, so an image referenced by a remote URL is shown as text rather than fetched.

Audio plays through the browser's native audio player. Supported containers include `audio/wav`, `audio/mpeg`, `audio/ogg`, and `audio/webm`. Raw formats such as `pcm16`, `g711_ulaw`, and `g711_alaw` do not play. Convert raw audio to WAV before attaching it. The Python OpenAI Realtime API integration does this conversion for you.

## Limits and behavior

- **Span event size.** A span event is capped at 5 MB. When a span exceeds the cap, its input and output are replaced with a placeholder and `dropped_io` is added to the span's `collection_errors` attribute. The span itself is kept.
- **Per-part size.** Automatic instrumentation in Python caps a single inline media part at 4 MiB. Above the cap, the integration records a text marker such as `[audio]` or `[image omitted: too large]` and preserves the surrounding message text and model response.
- **Sensitive Data Scanner.** Media content is not scanned by [Sensitive Data Scanner][5]. Message text, tool arguments, and tool results are scanned as usual.

## Best practices

- **Use the typed media fields.** Attach media with `image_parts` and `audio_parts` rather than embedding base64 strings in a message's `content`. Only typed fields render in the trace view.
- **Attach the transcript with the audio.** Set the message `content` to the turn transcript so that the span is readable, searchable, and usable by evaluations even before the audio is played.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/instrument/api/
[2]: /llm_observability/instrument/otel_instrumentation/
[3]: /llm_observability/instrument/auto_instrumentation/
[4]: https://app.datadoghq.com/llm/traces
[5]: /security/sensitive_data_scanner/
