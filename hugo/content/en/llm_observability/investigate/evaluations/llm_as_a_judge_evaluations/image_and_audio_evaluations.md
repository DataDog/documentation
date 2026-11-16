---
title: Image and Audio Evaluators
description: Send the images and audio attached to your spans to a custom LLM-as-a-judge evaluator, with supported models, limits, and templates.
further_reading:
- link: "/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations"
  tag: "Documentation"
  text: "Custom LLM-as-a-Judge Evaluators"
- link: "/llm_observability/instrument/multimodal"
  tag: "Documentation"
  text: "Multimodal Support"
- link: "/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations"
  tag: "Documentation"
  text: "LLM-as-a-Judge Evaluator Templates"
---

A custom LLM-as-a-judge evaluator can send the images and audio attached to your spans to the LLM judge, along with the text of the prompt. Use image and audio evaluators to evaluate voice agents and agents that process images. For example, you can check whether a transcription matches the spoken input, whether generated speech is clear, or whether an image contains explicit content.

## Requirements

- Your spans carry images or audio in the `image_parts` or `audio_parts` of their input or output messages. See [Multimodal Support][1] to attach media to spans.
- The evaluator uses a model that accepts the attachment type:

  | Attachment | Provider | Supported models |
  |---|---|---|
  | Images | OpenAI | GPT-4o, GPT-4.1, GPT-4 Turbo, and GPT-5 model families, except audio models |
  | Images | Anthropic | Claude 3, Claude Haiku, Claude Sonnet, and Claude Opus model families |
  | Audio | OpenAI | `gpt-audio`, `gpt-audio-mini`, and `gpt-audio-1.5` |

  Datadog doesn't send attachments to models from other providers, including Azure OpenAI, Amazon Bedrock, and Vertex AI.
- The media uses a supported format:
  - Images: JPEG, PNG, GIF, or WebP
  - Audio: WAV or MP3, for every clip on the evaluated spans, including output audio. A clip in another format, such as `audio/ogg` or `audio/webm`, can play in the trace view, but it causes the evaluation to fail.

An evaluator can include images or audio, but not both, because the supported audio models do not accept images.

## Configure an image or audio evaluator

1. Navigate to the Agent Observability [Evaluators page][2] and select {{< ui >}}Create Evaluator{{< /ui >}}. Start from an [audio or image template](#templates), or start from scratch at {{< ui >}}Span{{< /ui >}}, {{< ui >}}Trace{{< /ui >}}, or [{{< ui >}}Session{{< /ui >}}][8] scope.
1. Select an {{< ui >}}Account{{< /ui >}} and a {{< ui >}}Model{{< /ui >}} that support the attachment type. To connect a new account, see [Connect an LLM provider][3].
1. In the {{< ui >}}Instructions{{< /ui >}} field, describe what the judge must evaluate in the attachments and what it must return.
1. Next to {{< ui >}}Evaluated Variables{{< /ui >}}, select {{< ui >}}Attachments{{< /ui >}}, then select {{< ui >}}Include images{{< /ui >}} or {{< ui >}}Include audio{{< /ui >}}. If the selected model does not support an attachment type, its option is disabled and shows the reason. **Note**: Attachments may increase evaluation cost.
1. In the user prompt, add variables such as `{{span_output}}` when the judge also needs span text—for example, a transcription to compare with the audio. When attachments are included, variables are optional, and a static user prompt such as `Assess the quality of the attached audio.` is valid. Datadog adds the attachments to the user prompt, after its text.
1. Define the output:
   - Audio evaluators require [Keyword Search Output][4]. Select {{< ui >}}Boolean{{< /ui >}} under {{< ui >}}Keyword Search{{< /ui >}}, and instruct the judge to respond with your keywords (for example, `Pass` or `Fail`). The supported audio models do not support structured output.
   - Image evaluators support the same output options as other evaluators for the selected provider. See [Define the evaluation output][5].
1. Select a sample in the right pane. Its {{< ui >}}Images{{< /ui >}} and {{< ui >}}Audios{{< /ui >}} rows show the media on the sample. To include an attachment type from there, click the plus icon ({{< ui >}}\+{{< /ui >}}) on its row.
1. Click {{< ui >}}Test Evaluator{{< /ui >}}, then click {{< ui >}}Run{{< /ui >}}. The result shows how many images or audio clips Datadog sent to the judge.
1. Select {{< ui >}}Save and Publish{{< /ui >}}.

## How attachments are sent

- Datadog collects images and audio from the input and output messages of each evaluated span.
- For trace and session evaluators, Datadog collects media from every span and labels each attachment with its span.
- When images exceed a limit, Datadog keeps input images before output images, and images from earlier spans before images from later spans.
- Datadog evaluates only media that is attached to spans as inline data. It does not fetch images or audio from URLs.

### Limits

| Limit | Images | Audio |
|---|---|---|
| Size of one attachment | 6 MiB, base64-encoded | 6 MiB, decoded |
| Attachments per span | 8 | 8 |
| Attachments per trace or session | 16 | 8 |
| Total base64-encoded size per judge request | 20 MiB | 20 MiB |

When images exceed a limit, have an unsupported format, or cannot be read (for example, when reading them takes too long), Datadog drops them and runs the evaluation on the remaining images and text.

When audio exceeds a limit, has an unsupported format, or cannot be read, the evaluation fails with an error. Datadog does not score partial audio. Every input and output clip counts toward the audio limits, so a session-scope audio evaluation fails when the session has more than eight clips. To evaluate longer conversations, use span or trace scope.

### Skipped evaluations

An evaluation is skipped, and is not counted as pass, fail, or error, in these cases:

- The evaluator uses an audio model, and Datadog sends no audio to the judge. This happens when the span, trace, or session has no audio, or when {{< ui >}}Include audio{{< /ui >}} is not selected. The skip reason is `No audio attached`.
- All prompt variables are empty, and no images are attached. The skip reason is `No evaluation variables or images`.

In the test pane, a skipped sample shows {{< ui >}}Not evaluated{{< /ui >}} with the skip reason.

## Templates

When you create an evaluator, the {{< ui >}}Audio Evaluations{{< /ui >}} and {{< ui >}}Image Evaluations{{< /ui >}} sections list the following [templates][6]. If these sections are not visible, select {{< ui >}}Show all templates{{< /ui >}}.

| Template | Attachment | Default scope | What it evaluates |
|---|---|---|---|
| Transcription Accuracy | Audio | Span | Whether the transcription in the span output matches the input audio. It flags omissions, additions, and changes in meaning, and ignores capitalization and punctuation. |
| Audio Quality | Audio | Span | Whether the speech is clearly audible and intelligible |
| User Interruptions | Audio | Session | Whether the assistant lets the user finish speaking |
| Vocal Affect | Audio | Session | Whether the assistant sounds natural and appropriate to the context |
| Explicit Content | Images | Span | Whether an image contains sexually explicit content |
| Sensitive Imagery | Images | Span | Whether an image contains graphic or disturbing content |

All templates return a Boolean result. Audio templates use Keyword Search Output with the keywords `Pass` and `Fail`. Image templates evaluate only the attached images, without span text.

Before you apply an audio template, check that your spans match what it expects:

- Transcription Accuracy compares the input audio with the transcription in `{{span_output}}`. If your spans store the transcription elsewhere, change the variable in the user prompt. For example, on OpenAI Realtime API spans, the user's transcript is in the input message.
- User Interruptions needs audio in which overlapping speech is audible, such as a recording of the full call. If each clip holds only one speaker's turn, the judge returns `Fail` and explains that the evidence is insufficient.

When you apply a template, Datadog includes its attachment type and keeps your model if the model supports that type. Otherwise, Datadog selects the OpenAI `gpt-audio` model for audio templates, or `gpt-4o-mini` for image templates. If your account is not an OpenAI account, Datadog clears the account. Select an OpenAI account before you save.

## View results

Image and audio evaluation results appear across Agent Observability with your other evaluations. For span evaluators that include audio, the {{< ui >}}Content{{< /ui >}} column of the evaluator's results lets you play the evaluated audio. For trace evaluators, the column plays only the audio on the trace's root span. Session evaluator results have no {{< ui >}}Content{{< /ui >}} column.

## Permissions

Configuring evaluators requires the `Agent Observability Write` [permission][7].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/instrument/multimodal
[2]: https://app.datadoghq.com/llm/evaluations
[3]: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/connect_to_account
[4]: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/#keyword-search-output
[5]: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/#define-the-evaluation-output
[6]: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations
[7]: /account_management/rbac/permissions/#llm-observability
[8]: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/session_level_evaluations
