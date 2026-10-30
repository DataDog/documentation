---
description: Joignez de l'audio et des images aux spans LLM dans Agent Observability
  et affichez-les en ligne dans la vue des traces, automatiquement ou par instrumentation
  manuelle.
further_reading:
- link: /llm_observability/instrument/sdk/
  tag: Documentation
  text: Référence du SDK Agent Observability.
- link: /llm_observability/instrument/auto_instrumentation/
  tag: Documentation
  text: Instrumentation automatique d'Agent Observability
- link: /llm_observability/instrument/api/
  tag: Documentation
  text: Référence de l'API HTTP Agent Observability
title: Prise en charge multimodale
---
## Présentation {#overview}

Joignez des images et de l'audio aux spans LLM pour dépanner les agents vocaux et les agents qui traitent des images. Inspectez les images reçues par un modèle et écoutez son audio d'entrée et de sortie directement dans la vue des traces, aux côtés d'autres données de span. Vous n'avez pas besoin de reconstruire l'interaction à partir des logs ou d'un stockage séparé. Pour les conversations vocales, affichez la transcription de chaque tour aux côtés de son audio.

{{< img src="llm_observability/instrumentation/image_example.png" alt="Un span LLM dans la vue de trace Agent Observability. Le message d'entrée de l'UTILISATEUR affiche l'invite « What is in this image? ». avec une photo intégrée d'un chiot noir, et le message de sortie de l'ASSISTANT le décrit comme un chiot Labrador Retriever noir sur une surface en bois." style="width:100%;" >}}

Les médias appartiennent à des messages individuels au sein d'un span LLM. [L'instrumentation automatique](#automatic-instrumentation) capture les médias à partir des bibliothèques prises en charge. Pour les autres bibliothèques, utilisez [l'instrumentation manuelle](#manual-instrumentation) pour joindre des médias. Pour les spans OpenTelemetry, consultez [l'instrumentation OpenTelemetry](#opentelemetry-instrumentation).

## Prérequis {#requirements}

Les versions suivantes du SDK Datadog prennent en charge l'ajout de médias aux messages. Pour la capture automatique, consultez les [exigences spécifiques à l'intégration](#automatic-instrumentation).

| Fonctionnalité | SDK Python (`ddtrace`) | SDK Node.js (`dd-trace`) |
| ---------- | --------------------- | ----------------------- |
| Audio sur les messages | >= 4.12.0 | v6 : >= 6.7.0 ; v5 : >= 5.118.0 |
| Images sur les messages | >= 4.13.0 | v6 : >= 6.10.0 ; v5 : >= 5.121.0 |

Aucune version minimale du SDK Datadog ne s'applique à l'[API HTTP Agent Observability][1] ou à [l'instrumentation OpenTelemetry][2]. L'instrumentation OpenTelemetry doit émettre les [parties de message GenAI prises en charge](#opentelemetry-instrumentation).

## Instrumentation automatique {#automatic-instrumentation}

Les [intégrations LLM][3] de Datadog remplissent les parties média pour les bibliothèques suivantes, sans aucun changement de code de votre part.

{{< tabs >}}
{{% tab "Python" %}}

| Intégration | Média capturé | Version du SDK Datadog |
| ----------- | -------------- | ------------------- |
| Complétions de chat OpenAI | Contenu d'entrée `input_audio` et audio de sortie, y compris la transcription audio du modèle | >= 4.12.0 |
| OpenAI Realtime API | Audio d'entrée et de sortie par tour, transcriptions, utilisation de jetons et appels d'outils | >= 4.13.0 |
| LiteLLM | Audio d'entrée et de sortie, via le format de complétions de chat OpenAI | >= 4.12.0 |
| Complétions de chat OpenAI et API Responses | Images encodées en base64 en ligne | >= 4.15.0 |
| Agents OpenAI | Images encodées en base64 en ligne | >= 4.15.0 |
| Anthropic | Images encodées en base64 en ligne | >= 4.15.0 |

Chaque tour d'une conversation de l'API Realtime d'OpenAI produit son propre span LLM. L'audio `pcm16` et G.711 brut est converti en WAV afin qu'il soit lu dans le navigateur. Pour désactiver l'instrumentation de l'API Realtime, définissez `DD_OPENAI_REALTIME_ENABLED=false`.

L'audio dans les complétions de chat diffusées (`stream=True`) n'est pas capturé.

{{% /tab %}}
{{% tab "Node.js" %}}

| Intégration | Média capturé | Version du SDK Datadog |
| ----------- | -------------- | ------------------- |
| Complétions de chat OpenAI | Contenu d'entrée `input_audio` et audio de sortie, y compris la transcription audio du modèle | v6 : >= 6.7.0 ; v5 : >= 5.118.0 |
| Agents OpenAI | Audio d'entrée et de sortie, via le format de complétions de chat OpenAI | v6 : >= 6.7.0 ; v5 : >= 5.118.0 |

L'audio dans les complétions de chat diffusées n'est pas capturé.

{{% /tab %}}
{{< /tabs >}}

Les intégrations ne récupèrent pas les images référencées par une URL distante ou un ID de fichier. Elles capturent uniquement les images que l'application envoie en ligne sous forme de données base64. Lorsqu'une intégration ne peut pas capturer de média, elle enregistre un marqueur textuel tel que `[image]` ou `[audio]` dans le message.

## Instrumentation OpenTelemetry {#opentelemetry-instrumentation}

Datadog extrait le média des [spans OpenTelemetry][2] qui contiennent les [parties de message GenAI][7] suivantes. Aucune instrumentation supplémentaire n'est nécessaire si votre application émet déjà ces parties :

- Une partie `blob` avec un `mime_type` et des octets en ligne devient une partie image ou audio. Lorsque la partie omet `modality`, Datadog l'infère à partir du type MIME.
- Une partie `uri` transportant un URI de données d'image en base64, tel que `data:image/png;base64,...`, devient une partie image.

Seuls les médias transportés en ligne sous forme d'octets base64 sont rendus. Une URL distante est enregistrée en tant que référence textuelle et n'est jamais récupérée. Pour la lecture audio, envoyez l'audio dans des parties `blob`. Les conventions spécifient `blob` pour les données base64 en ligne, privilégiez donc `blob` pour l'audio et les images.

Pour le mappage complet, consultez [Media in messages][8].

## Instrumentation manuelle {#manual-instrumentation}

Joignez des médias à un span LLM en ajoutant `image_parts` ou `audio_parts` à un message dans `input_data` ou `output_data`.

Chaque partie média comprend les champs suivants :

| Champ | Type | Requis | Description |
| ----- | ---- | -------- | ----------- |
| `mime_type` | chaîne | Oui | Le type de média de la pièce jointe, tel que `image/png` ou `audio/wav`. |
| `content` | chaîne | Oui | Le média encodé en base64. |

Datadog stocke les médias séparément lors de l'ingestion et les charge à la demande dans la vue des traces. Les médias intégrés comptent toujours dans la limite de taille des événements de span. Avant de joindre un média, vérifiez les [formats pris en charge](#supported-formats) et les [limites de taille](#limits-and-behavior).

Les exemples se concentrent sur l'annotation et omettent la configuration du SDK et les appels de modèle. Pour la configuration du SDK, consultez la [référence du SDK Agent Observability][6].

{{< tabs >}}
{{% tab "Python" %}}

**Joignez une image**

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

**Joignez l'audio et une transcription**

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

Si une partie média manque de `mime_type` ou `content`, l'annotation échoue.

{{% /tab %}}
{{% tab "Node.js" %}}

Node.js utilise les noms de champ camelCase `imageParts` et `audioParts`, avec `mimeType` sur chaque partie.

**Joignez une image**

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

**Joignez l'audio et une transcription**

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

Une partie média à laquelle il manque `mimeType` ou `content` est supprimée. Le reste du message est toujours enregistré.

{{% /tab %}}
{{% tab "API" %}}

Soumettez `audio_parts` et `image_parts` sur les objets de message que vous envoyez au [endpoints de l'API Spans][1]. Les noms de champ correspondent au SDK Python.

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

Pour le schéma complet du message, consultez [Message][2] dans la [référence de l'API HTTP Agent Observability][3].

[1]: /fr/llm_observability/instrument/api/#spans-api
[2]: /fr/llm_observability/instrument/api/#message
[3]: /fr/llm_observability/instrument/api/
{{% /tab %}}
{{< /tabs >}}

## Affichez les images et lisez l'audio {#view-images-and-play-audio}

Ouvrez une trace dans [Trace Explorer][4] et sélectionnez un span LLM. Le média joint aux messages du span s'affiche dans le message auquel il appartient.

Les images apparaissent sous forme de vignettes. Sélectionnez une vignette pour ouvrir l'image en taille réelle. Jusqu'à 12 images s'affichent par message.

L'audio apparaît sous forme de lecteur, avec le texte du message affiché à côté. Pour une conversation vocale, ce texte est la transcription du tour de parole. Sélectionnez le lecteur pour charger et lire l'audio.

{{< img src="llm_observability/instrumentation/audio_example.png" alt="Un span LLM dans la vue de trace Agent Observability. Le message d'entrée de l'UTILISATEUR affiche un lecteur audio intégré avec la transcription « Hey, how are you? », et le message de sortie de l'ASSISTANT affiche une commande « Click to play audio » avec la transcription « Hey! ». Je vais très bien, merci de demander. « How about you? »." style="width:100%;" >}}

### Formats pris en charge {#supported-formats}

Les images s'affichent lorsque le type MIME est `image/png`, `image/jpeg`, `image/webp` ou `image/gif`, et que le type MIME déclaré correspond aux octets encodés. Les images SVG ne s'affichent pas. La vue de trace n'effectue aucune requête sortante, donc une image référencée par une URL distante est affichée sous forme de texte plutôt que récupérée.

L'audio est lu via le lecteur audio natif du navigateur. Les conteneurs pris en charge incluent `audio/wav`, `audio/mpeg`, `audio/ogg` et `audio/webm`. Les formats bruts tels que `pcm16`, `g711_ulaw` et `g711_alaw` ne sont pas lus. Convertissez l'audio brut en WAV avant de le joindre. L'intégration de l'API Python OpenAI Realtime effectue cette conversion pour vous.

## Limites et comportement {#limits-and-behavior}

- **Taille de l'événement de span.** Un événement de span est limité à 5 Mo. Lorsqu'un span dépasse la limite, son entrée et sa sortie sont remplacées par un espace réservé et `dropped_io` est ajouté à l'attribut `collection_errors` du span. Le span lui-même est conservé.
- **Taille par partie.** L'instrumentation automatique en Python limite une partie média intégrée unique à 4 Mio. Au-delà de la limite, l'intégration enregistre un marqueur textuel tel que `[audio]` ou `[image omitted: too large]` et préserve le texte du message environnant ainsi que la réponse du modèle.
- **Sensitive Data Scanner.** Le contenu multimédia n'est pas analysé par [Sensitive Data Scanner][5]. Le texte du message, les arguments de l'outil et les résultats de l'outil sont analysés comme d'habitude.

## Bonnes pratiques {#best-practices}

- **Utilisez les champs multimédias typés.** Joignez des médias avec `image_parts` et `audio_parts` plutôt que d'incorporer des chaînes base64 dans le `content` d'un message. Seuls les champs typés s'affichent dans la vue de trace.
- **Joignez la transcription avec l'audio.** Définissez le `content` du message sur la transcription du tour afin que le span soit lisible, consultable et utilisable par les évaluateurs avant même que l'audio ne soit lu.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/llm_observability/instrument/api/
[2]: /fr/llm_observability/instrument/otel_instrumentation/
[3]: /fr/llm_observability/instrument/auto_instrumentation/
[4]: https://app.datadoghq.com/llm/traces
[5]: /fr/security/sensitive_data_scanner/
[6]: /fr/llm_observability/instrument/sdk/
[7]: https://github.com/open-telemetry/semantic-conventions-genai/blob/main/model/gen-ai/gen-ai-input-messages.json
[8]: /fr/llm_observability/instrument/otel_instrumentation/#media-in-messages