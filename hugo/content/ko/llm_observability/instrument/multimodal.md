---
description: Agent Observability의 LLM 스팬에 오디오와 이미지를 첨부하고, 자동 또는 수동 계측을 통해 트레이스 뷰에서
  인라인으로 렌더링하세요.
further_reading:
- link: /llm_observability/instrument/sdk/
  tag: 문서
  text: Agent Observability SDK 참조
- link: /llm_observability/instrument/auto_instrumentation/
  tag: 문서
  text: Agent Observability를 위한 자동 계측
- link: /llm_observability/instrument/api/
  tag: 문서
  text: Agent Observability HTTP API 참조
title: 멀티모달 지원
---
## 개요 {#overview}

LLM 스팬에 이미지와 오디오를 첨부하여 음성 에이전트 및 이미지 처리 에이전트의 문제를 해결하세요. 모델이 수신한 이미지를 검사하고, 트레이스 뷰에서 다른 스팬 데이터와 함께 입력 및 출력 오디오를 직접 재생할 수 있습니다. 로그나 별도의 스토리지에서 상호 작용을 재구성할 필요가 없습니다. 음성 대화의 경우 각 턴의 대본을 오디오와 함께 볼 수 있습니다.

{{< img src="llm_observability/instrumentation/image_example.png" alt="Agent Observability 트레이스 뷰의 LLM 스팬입니다. USER 입력 메시지는 'What is in this image?'라는 프롬프트와 함께 검은 강아지 사진이 인라인으로 포함되어 있으며, ASSISTANT 출력 메시지는 이를 나무 표면 위의 검은 래브라도 리트리버 강아지로 설명합니다." style="width:100%;" >}}

미디어는 LLM 스팬 내의 개별 메시지에 속합니다. [자동 계측](#automatic-instrumentation)은 지원되는 라이브러리에서 미디어를 캡처합니다. 다른 라이브러리의 경우 [수동 계측](#manual-instrumentation)을 사용하여 미디어를 첨부합니다. OpenTelemetry 스팬의 경우 [OpenTelemetry 계측](#opentelemetry-instrumentation)을 참조하세요.

## 요구 사항 {#requirements}

다음 Datadog SDK 버전은 메시지에 미디어 첨부를 지원합니다. 자동 캡처에 대해서는 [통합별 요구 사항](#automatic-instrumentation)을 참조하세요.

| 기능 | Python SDK(`ddtrace`) | Node.js SDK(`dd-trace`) |
| ---------- | --------------------- | ----------------------- |
| 메시지의 오디오 | >= 4.12.0 | v6: >= 6.7.0; v5: >= 5.118.0 |
| 메시지의 이미지 | >= 4.13.0 | v6: >= 6.10.0; v5: >= 5.121.0 |

[Agent Observability HTTP API][1] 또는 [OpenTelemetry 계측][2]에는 최소 Datadog SDK 버전 제한이 적용되지 않습니다. OpenTelemetry 계측은 [지원되는 GenAI 메시지 파트](#opentelemetry-instrumentation)를 내보내야 합니다.

## 자동 계측 {#automatic-instrumentation}

Datadog의 [LLM 통합][3]은 별도의 코드 변경 없이 다음 라이브러리에 대한 미디어 파트를 채웁니다.

{{< tabs >}}
{{% tab "Python" %}}

| 통합 | 캡처된 미디어 | Datadog SDK 버전 |
| ----------- | -------------- | ------------------- |
| OpenAI 채팅 완료 | 입력 `input_audio` 콘텐츠 및 출력 오디오(모델의 오디오 대본 포함) | >= 4.12.0 |
| OpenAI Realtime API | 턴별 입력 및 출력 오디오, 대본, 토큰 사용량 및 도구 호출 | >= 4.13.0 |
| LiteLLM | OpenAI 채팅 완료 형식을 통한 입력 및 출력 오디오 | >= 4.12.0 |
| OpenAI 채팅 완료 및 응답 API | 인라인 base64 인코딩 이미지 | >= 4.15.0 |
| OpenAI 에이전트 | 인라인 base64 인코딩 이미지 | >= 4.15.0 |
| Anthropic | 인라인 base64 인코딩 이미지 | >= 4.15.0 |

OpenAI Realtime API 대화의 각 턴은 자체 LLM 스팬을 생성합니다. 원시 `pcm16` 및 G.711 오디오는 브라우저에서 재생되도록 WAV로 변환됩니다. Realtime API 계측을 끄려면 `DD_OPENAI_REALTIME_ENABLED=false`를 설정하세요.

스트리밍된 채팅 완료(`stream=True`)의 오디오는 캡처되지 않습니다.

{{% /tab %}}
{{% tab "Node.js" %}}

| 통합 | 캡처된 미디어 | Datadog SDK 버전 |
| ----------- | -------------- | ------------------- |
| OpenAI 채팅 완료 | 입력 `input_audio` 콘텐츠 및 출력 오디오(모델의 오디오 대본 포함) | v6: >= 6.7.0; v5: >= 5.118.0 |
| OpenAI 에이전트 | OpenAI 채팅 완료 형식을 통한 입력 및 출력 오디오 | v6: >= 6.7.0; v5: >= 5.118.0 |

스트리밍된 채팅 완료의 오디오는 캡처되지 않습니다.

{{% /tab %}}
{{< /tabs >}}

통합은 원격 URL이나 파일 ID로 참조되는 이미지를 가져오지 않습니다. 애플리케이션이 base64 데이터로 인라인 전송하는 이미지만 캡처합니다. 통합이 미디어를 캡처할 수 없는 경우 메시지에 `[image]` 또는 `[audio]`와 같은 텍스트 마커를 기록합니다.

## OpenTelemetry 계측 {#opentelemetry-instrumentation}

Datadog은 다음 [GenAI 메시지 파트][7]를 포함하는 [OpenTelemetry 스팬][2]에서 미디어를 추출합니다. 애플리케이션이 이미 이러한 파트를 내보내는 경우 추가 계측이 필요하지 않습니다.

- `mime_type`와 인라인 바이트가 포함된 `blob` 파트는 이미지 또는 오디오 파트가 됩니다. `modality`가 생략되면 Datadog은 MIME 유형에서 이를 추론합니다.
- base64 이미지 데이터 URI를 포함하는 `uri` 파트(예: `data:image/png;base64,...`)는 이미지 파트가 됩니다.

base64 바이트로 인라인 처리된 미디어만 렌더링됩니다. 원격 URL은 텍스트 참조로 기록되며 실제로 가져오지는 않습니다. 오디오 재생을 위해서는 오디오를 `blob` 파트로 전송하세요. 규칙은 인라인 base64 데이터에 대해 `blob`을 지정하므로 오디오와 이미지 모두에 `blob`을 사용하는 것이 좋습니다.

전체 매핑은 [메시지의 미디어][8]를 참조하세요.

## 수동 계측 {#manual-instrumentation}

`input_data` 또는 `output_data`의 메시지에 `image_parts` 또는 `audio_parts`을 추가하여 LLM 스팬에 미디어를 첨부하세요.

각 미디어 파트는 다음 필드를 포함합니다.

| 필드 | 유형 | 필수 | 설명 |
| ----- | ---- | -------- | ----------- |
| `mime_type` | string | 예 | 첨부 파일의 미디어 유형(예: `image/png` 또는 `audio/wav`). |
| `content` | string | 예 | base64 인코딩 미디어. |

Datadog은 수집 중에 미디어를 별도로 저장하고 트레이스 뷰에서 필요할 때 로드합니다. 인라인 미디어도 스팬 이벤트 크기 제한에 포함됩니다. 미디어를 첨부하기 전에 [지원되는 형식](#supported-formats) 및 [크기 제한](#limits-and-behavior)을 확인하세요.

이 예시들은 주석에 중점을 두며 SDK 설정 및 모델 호출은 생략합니다. SDK 설정은 [Agent Observability SDK 참조][6]를 참조하세요.

{{< tabs >}}
{{% tab "Python" %}}

**이미지 첨부**

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

**오디오 및 대본 첨부**

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

미디어 파트에 `mime_type` 또는 `content`가 누락되면 주석 처리에 실패합니다.

{{% /tab %}}
{{% tab "Node.js" %}}

Node.js는 camelCase 필드 이름인 `imageParts` 및 `audioParts`를 사용하며, 각 파트에 `mimeType`이 포함됩니다.

**이미지 첨부**

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

**오디오 및 대본 첨부**

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

`mimeType` 또는 `content`가 누락된 미디어 파트는 삭제됩니다. 메시지의 나머지 부분은 여전히 기록됩니다.

{{% /tab %}}
{{% tab "API" %}}

[스팬 API 엔드포인트][1]로 보내는 메시지 객체에 `audio_parts` 및 `image_parts`를 제출하세요. 필드 이름은 Python SDK와 일치합니다.

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

전체 메시지 스키마는 [Agent Observability HTTP API 참조][3]의 [Message][2]를 참조하세요.

[1]: /ko/llm_observability/instrument/api/#spans-api
[2]: /ko/llm_observability/instrument/api/#message
[3]: /ko/llm_observability/instrument/api/
{{% /tab %}}
{{< /tabs >}}

## 이미지 보기 및 오디오 재생 {#view-images-and-play-audio}

[Trace Explorer][4]에서 트레이스를 열고 LLM 스팬을 선택하세요. 스팬의 메시지에 첨부된 미디어는 해당 메시지 내부에 렌더링됩니다.

이미지는 썸네일로 표시됩니다. 썸네일을 선택하면 전체 크기 이미지가 열립니다. 메시지당 최대 12개의 이미지가 렌더링됩니다.

오디오는 플레이어로 표시되며 메시지 텍스트가 그 옆에 표시됩니다. 음성 대화의 경우 해당 텍스트는 턴 대본입니다. 플레이어를 선택하여 오디오를 로드하고 재생하세요.

{{< img src="llm_observability/instrumentation/audio_example.png" alt="Agent Observability 트레이스 뷰의 LLM 스팬입니다. USER의 입력 메시지는 'Hey, how are you?'라는 전사본이 포함된 인라인 오디오 플레이어를 보여주고, ASSISTANT의 출력 메시지는 'Click to play audio' 제어 기능과 'Hey! I'm doing great, thanks for asking. How about you?'라는 전사본을 표시합니다." style="width:100%;" >}}

### 지원되는 형식 {#supported-formats}

MIME 유형이 `image/png`, `image/jpeg`, `image/webp` 또는 `image/gif` 중 하나이고 선언된 MIME 유형이 인코딩된 바이트와 일치할 때 이미지가 렌더링됩니다. SVG 이미지는 렌더링되지 않습니다. 트레이스 뷰는 아웃바운드 요청을 수행하지 않으므로 원격 URL로 참조된 이미지는 가져오는 대신 텍스트로 표시됩니다.

오디오는 브라우저의 기본 오디오 플레이어를 통해 재생됩니다. 지원되는 컨테이너에는 `audio/wav`, `audio/mpeg`, `audio/ogg` 및 `audio/webm`이 포함됩니다. `pcm16`, `g711_ulaw` 및 `g711_alaw`와 같은 원시 형식은 재생되지 않습니다. 원시 오디오를 첨부하기 전에 WAV로 변환하세요. Python OpenAI Realtime API 통합은 이 변환을 자동으로 수행합니다.

## 제한 및 동작 {#limits-and-behavior}

- **스팬 이벤트 크기.** 스팬 이벤트는 5MB로 제한됩니다. 스팬이 제한을 초과하면 입력 및 출력이 자리 표시자로 대체되고 `dropped_io`가 스팬의 `collection_errors` 속성에 추가됩니다. 스팬 자체는 유지됩니다.
- **파트별 크기.** Python의 자동 계측은 단일 인라인 미디어 파트를 4MiB로 제한합니다. 제한을 초과하면 통합 기능이 `[audio]` 또는 `[image omitted: too large]`와 같은 텍스트 마커를 기록하고 주변 메시지 텍스트와 모델 응답을 보존합니다.
- **Sensitive Data Scanner.** 미디어 콘텐츠는 [Sensitive Data Scanner][5]에 의해 스캔되지 않습니다. 메시지 텍스트, 도구 인수 및 도구 결과는 평소와 같이 스캔됩니다.

## 모범 사례 {#best-practices}

- **형식화된 미디어 필드를 사용하세요.** 메시지의 `image_parts`에 base64 문자열을 포함하는 대신 `audio_parts` 및 `content`을 사용하여 미디어를 첨부하세요. 형식화된 필드만 트레이스 뷰에 표시됩니다.
- **오디오와 함께 대본을 첨부하세요.** 오디오가 재생되기 전에도 스팬을 읽고, 검색하고, 평가자가 사용할 수 있도록 메시지 `content`를 턴 대본으로 설정하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/llm_observability/instrument/api/
[2]: /ko/llm_observability/instrument/otel_instrumentation/
[3]: /ko/llm_observability/instrument/auto_instrumentation/
[4]: https://app.datadoghq.com/llm/traces
[5]: /ko/security/sensitive_data_scanner/
[6]: /ko/llm_observability/instrument/sdk/
[7]: https://github.com/open-telemetry/semantic-conventions-genai/blob/main/model/gen-ai/gen-ai-input-messages.json
[8]: /ko/llm_observability/instrument/otel_instrumentation/#media-in-messages