---
description: Agent Observability で LLM スパンに音声や画像を添付し、(自動または手動インスツルメンテーションにより) トレースビューでインラインでレンダリングできます。
further_reading:
- link: /llm_observability/instrument/sdk/
  tag: ドキュメント
  text: Agent Observability SDK リファレンス
- link: /llm_observability/instrument/auto_instrumentation/
  tag: ドキュメント
  text: Agent Observability のための自動インスツルメンテーション
- link: /llm_observability/instrument/api/
  tag: ドキュメント
  text: Agent Observability HTTP API リファレンス
title: マルチモーダルサポート
---
## 概要{#overview}

LLM スパンに画像や音声を添付して、音声エージェントや画像処理を行うエージェントのトラブルシューティングを行います。モデルが受信した画像を検査し、入力音声と出力音声をトレースビューで他のスパンデータと並べて直接再生できます。ログや別のストレージからインタラクションを再構築する必要はありません。音声会話の場合、各ターンのトランスクリプトを音声と並べて表示できます。

{{< img src="llm_observability/instrumentation/image_example.png" alt="Agent Observability のトレースビューにある LLM スパン。USER からの入力メッセージには、「What is in this image?」というプロンプトが表示されます。黒い子犬のインライン写真が表示され、ASSISTANT からの出力メッセージでは、木製の表面にいる黒いラブラドール・レトリバーの子犬として説明されています。" style="width:100%;" >}}

メディアは、LLM スパン内の個々のメッセージに属しています。[自動インスツルメンテーション](#automatic-instrumentation)により、サポートされているライブラリからメディアがキャプチャされます。その他のライブラリについては、[手動インスツルメンテーション](#manual-instrumentation)を使用してメディアを添付します。OpenTelemetry スパンについては、[OpenTelemetry インスツルメンテーション](#opentelemetry-instrumentation)を参照してください。

## 要件{#requirements}

メッセージへのメディアの添付がサポートされている Datadog SDK バージョンを以下に示します。自動キャプチャについては、[インテグレーション固有の要件](#automatic-instrumentation)を参照してください。

| 機能 | Python SDK (`ddtrace`) | Node.js SDK (`dd-trace`) |
| ---------- | --------------------- | ----------------------- |
| メッセージ上の音声 | >= 4.12.0 | v6: >= 6.7.0; v5: >= 5.118.0 |
| メッセージ上の画像 | >= 4.13.0 | v6: >= 6.10.0; v5: >= 5.121.0 |

[Agent Observability HTTP API][1] または [OpenTelemetry インスツルメンテーション][2]には、Datadog SDK の最小バージョン要件はありません。OpenTelemetry インスツルメンテーションは、[サポートされている GenAI メッセージパーツ](#opentelemetry-instrumentation)を出力する必要があります。

## 自動インスツルメンテーション {#automatic-instrumentation}

Datadog の [LLM インテグレーション][3]は以下のライブラリのメディアパーツを自動的に埋め込みます。コードの変更は必要ありません。

{{< tabs >}}
{{% tab "Python" %}}

| インテグレーション | キャプチャされたメディア | Datadog SDK バージョン |
| ----------- | -------------- | ------------------- |
| OpenAI チャット補完 | 入力 `input_audio` コンテンツおよび出力音声 (モデルの音声トランスクリプトを含む)| >= 4.12.0 |
| OpenAI Realtime API | ターンごとの入力および出力音声、トランスクリプト、トークン使用量、およびツール呼び出し | >= 4.13.0 |
| LiteLLM | OpenAI チャット補完形式の入力および出力音声 | >= 4.12.0 |
| OpenAI チャット補完および Responses API | インライン base64 エンコード画像 | >= 4.15.0 |
| OpenAI エージェント | インライン base64 エンコード画像 | >= 4.15.0 |
| Anthropic | インライン base64 エンコード画像 | >= 4.15.0 |

OpenAI Realtime API 会話の各ターンは、独自の LLM スパンを生成します。Raw `pcm16` および G.711 音声は、ブラウザで再生できるように WAV に変換されます。Realtime API インスツルメンテーションを無効にするには、`DD_OPENAI_REALTIME_ENABLED=false` を設定します。

ストリーミングされたチャット補完 (`stream=True`) 内の音声はキャプチャされません。

{{% /tab %}}
{{% tab "Node.js" %}}

| インテグレーション | キャプチャされたメディア | Datadog SDK バージョン |
| ----------- | -------------- | ------------------- |
| OpenAI チャット補完 | 入力 `input_audio` コンテンツおよび出力音声 (モデルの音声トランスクリプトを含む)| v6: >= 6.7.0; v5: >= 5.118.0 |
| OpenAI エージェント | OpenAI チャット補完形式の入力および出力音声 | v6: >= 6.7.0; v5: >= 5.118.0 |

ストリーミングされたチャット補完内の音声はキャプチャされません。

{{% /tab %}}
{{< /tabs >}}

インテグレーションは、リモート URL やファイル ID によって参照される画像を取得しません。アプリケーションが base64 データとしてインラインで送信する画像のみをキャプチャします。インテグレーションは、メディアをキャプチャできない場合にはメッセージ内に `[image]` や `[audio]` といったテキストマーカーを記録します。

## OpenTelemetry インスツルメンテーション {#opentelemetry-instrumentation}

Datadog は、以下の [GenAI メッセージパーツ][7]を含む [OpenTelemetry スパン][2]からメディアを抽出します。アプリケーションがすでにこれらのパーツを出力している場合、追加のインスツルメンテーションは不要です。

- `mime_type` とインラインバイトを含む `blob` パーツは、画像パーツまたは音声パーツになります。`modality` がない場合、Datadog は MIME タイプから推測します。
- `data:image/png;base64,...` などの base64 画像データ URI を含む `uri` パーツは画像パーツになります。

base64 バイトとしてインラインで保持されているメディアのみがレンダリングされます。リモート URL はテキスト参照として記録され、取得されることはありません。音声再生の場合は、`blob` パーツで音声を送信します。規約ではインライン base64 データに対し `blob` が指定されているため、音声と画像の両方に `blob` を使用することをお勧めします。

完全なマッピングについては、[メッセージ内のメディア][8]を参照してください。

## 手動インスツルメンテーション {#manual-instrumentation}

LLM スパンにメディアを添付するには、メッセージの `input_data` または`output_data` に `image_parts` または `audio_parts` を追加します。

各メディアパーツには以下のフィールドが含まれています。

| フィールド | 型 | 必須 | 説明 |
| ----- | ---- | -------- | ----------- |
| `mime_type` | 文字列 | はい | 添付ファイルのメディアタイプ (`image/png` や `audio/wav` など)。|
| `content` | 文字列 | はい | base64 エンコードメディア。|

Datadog は、取り込み時にメディアを個別に保存し、トレースビューで必要に応じて読み込みます。インラインメディアも、スパンイベントのサイズ制限に含まれます。メディアを添付する前に、[対応している形式](#supported-formats)と[サイズ制限](#limits-and-behavior)を確認してください。

この例ではアノテーションに焦点を当てており、SDK のセットアップとモデルの呼び出しは省略しています。SDK のセットアップについては、[Agent Observability SDK リファレンス][6]を参照してください。

{{< tabs >}}
{{% tab "Python" %}}

**画像を添付する**

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

**音声とトランスクリプトを添付する**

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

メディアパーツに `mime_type` または `content` が指定されていない場合、アノテーションは失敗します。

{{% /tab %}}
{{% tab "Node.js" %}}

Node.js では、camelCase のフィールド名 `imageParts` と `audioParts` を使用し、各パーツに `mimeType` を指定します。

**画像を添付する**

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

**音声とトランスクリプトを添付する**

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

`mimeType` または`content` が指定されていないメディアパーツは破棄されます。メッセージの残りの部分は引き続き記録されます。

{{% /tab %}}
{{% tab "API" %}}

[Spans API エンドポイント][1]に送信するメッセージオブジェクトで `audio_parts` と `image_parts` を指定します。フィールド名は Python SDK と一致しています。

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

メッセージスキーマの詳細については、[Agent Observability HTTP API リファレンス][3]の[メッセージ][2]を参照してください。

[1]: /ja/llm_observability/instrument/api/#spans-api
[2]: /ja/llm_observability/instrument/api/#message
[3]: /ja/llm_observability/instrument/api/
{{% /tab %}}
{{< /tabs >}}

## 画像の表示と音声の再生{#view-images-and-play-audio}

[Trace Explorer][4] でトレースを開いて、LLM スパンを選択します。スパンのメッセージに添付されたメディアは、それぞれが属するメッセージ内でレンダリングされます。

画像はサムネイルとして表示されます。サムネイルを選択して、画像をフルサイズで開きます。1 メッセージあたりのレンダリングされる画像の最大数は 12 枚です。

音声はプレーヤーとして表示され、その横にメッセージテキストが表示されます。音声会話の場合、そのテキストはターンのトランスクリプトになります。プレーヤーを選択して、音声を読み込んで再生します。

{{< img src="llm_observability/instrumentation/audio_example.png" alt="Agent Observability のトレースビューにある LLM スパン。USER からの入力メッセージには、トランスクリプト「Hey, how are you?」付きのインラインオーディオプレーヤーが表示され、ASSISTANT からの出力メッセージには、「Click to play audio」というコントロールとトランスクリプト「Hey!」が表示されます。とても元気です。聞いてくれてありがとうございます。あなたはどうですか?" style="width:100%;" >}}

### 対応している形式 {#supported-formats}

画像は、MIME タイプが `image/png`、`image/jpeg`、`image/webp`、`image/gif` のいずれかであり、宣言された MIME タイプがエンコードバイトと一致する場合にレンダリングされます。SVG 画像はレンダリングされません。トレースビューは外部へのリクエストを行わないため、リモート URL によって参照される画像は取得されず、テキストとして表示されます。

音声はブラウザのネイティブオーディオプレーヤーで再生されます。対応しているコンテナには、`audio/wav`、`audio/mpeg`、`audio/ogg`、`audio/webm` などがあります。RAW フォーマット (`pcm16`、`g711_ulaw`、`g711_alaw` など) は再生されません。RAW 音声を添付する前に、WAV に変換してください。Python OpenAI Realtime API インテグレーションでは、この変換が自動的に行われます。

## 制限と動作{#limits-and-behavior}

- **スパンイベントのサイズ。**スパンイベントは 5 MB に制限されています。スパンがこの上限を超えると、その入力と出力はプレースホルダーに置き換えられ、スパンの `collection_errors` 属性に `dropped_io` が追加されます。スパン自体は保持されます。
- **パートあたりのサイズ。**Python の自動インスツルメンテーションでは、単一のインラインメディアパートが 4 MiB に制限されます。この上限を超えた場合、インテグレーションは `[audio]` や `[image omitted: too large]` のようなテキストマーカーを記録し、周囲のメッセージテキストとモデルの応答を保持します。
- **Sensitive Data Scanner。**[Sensitive Data Scanner][5] ではメディアコンテンツはスキャンされません。メッセージテキスト、ツール引数、およびツール結果は通常どおりスキャンされます。

## ベストプラクティス {#best-practices}

- **型指定されたメディアフィールドを使用してください。**メッセージの `content` に base64 文字列を埋め込むのではなく、`image_parts` と `audio_parts` を使用してメディアを添付してください。型指定されたフィールドのみがトレースビューでレンダリングされます。
- **音声とともにトランスクリプトを添付してください。**メッセージの `content` をターントランスクリプトに設定してください。これにより、音声が再生される前であってもスパンが評価器により読み取り可能、検索可能、使用可能になります。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/llm_observability/instrument/api/
[2]: /ja/llm_observability/instrument/otel_instrumentation/
[3]: /ja/llm_observability/instrument/auto_instrumentation/
[4]: https://app.datadoghq.com/llm/traces
[5]: /ja/security/sensitive_data_scanner/
[6]: /ja/llm_observability/instrument/sdk/
[7]: https://github.com/open-telemetry/semantic-conventions-genai/blob/main/model/gen-ai/gen-ai-input-messages.json
[8]: /ja/llm_observability/instrument/otel_instrumentation/#media-in-messages