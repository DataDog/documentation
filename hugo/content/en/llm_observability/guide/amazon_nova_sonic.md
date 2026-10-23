---
title: Monitor Nova 2 Sonic applications with Node.js
description: Trace Amazon Nova 2 Sonic audio conversations, transcripts, token usage, and speech timing.
---

The Node.js `dd-trace` SDK captures Amazon Nova 2 Sonic conversations through the `aws-sdk` integration. Each response produces a workflow with an LLM span, transcripts, token usage, and audio when available.

## Requirements

- Enable Agent Observability using the [Node.js quickstart][1].
- Use `@aws-sdk/client-bedrock-runtime` version 3.785.0 or later.
- Initialize `dd-trace` before loading the AWS SDK.
- Call `InvokeModelWithBidirectionalStreamCommand` with the model ID `amazon.nova-2-sonic-v1:0`, or a foundation-model ARN such as `arn:aws:bedrock:us-east-1::foundation-model/amazon.nova-2-sonic-v1:0`.

The integration records the canonical model ID without changing the identifier sent to AWS. Inference-profile identifiers, cross-region prefixes, other model versions (including Nova 2.5 Sonic), and malformed ARNs are unsupported. The integration does not make additional AWS API calls to resolve model identifiers.

## Explore a conversation

Each response creates a `nova sonic audio turn` workflow containing a `nova sonic response` LLM span. When timing is available, the workflow also contains `user speech` and `agent speech` spans.

Turns inherit an enclosing application workflow and share a conversation session ID. The LLM span captures:

- User and assistant transcripts.
- Tool calls and results.
- Input and output token usage.
- Inline WAV audio within the SDK's size limits.

Invalid or oversized audio falls back to transcripts without dropping independently valid speech timing. For media rendering and size limits, see [Multimodal Support][2].

## Interpret token usage

The optional `input_text_tokens`, `output_text_tokens`, `input_audio_tokens`, and `output_audio_tokens` metrics describe the text and audio portions of each turn. These counts are subsets of the inclusive `input_tokens` and `output_tokens` totals. Do not add them to those totals.

Reported zeros are preserved. Missing, invalid, or conflicting counts remain absent rather than being estimated. A text breakdown that conflicts with valid audio usage is omitted. Cache counts are recorded only when reported; this integration does not infer them.

## Interpret speech timing

Input speech offsets select the captured input audio clip. Time to first audio measures the interval between local receipt of `userSpeechEnd` and the first output audio.

Output speech timing estimates PCM playback, including queueing, silence during underruns, and interruption cuts. It does not measure when sound is heard at a device. The SDK observes input as the AWS SDK consumes it, which can precede transmission.

## Limitations and configuration

Original Nova Sonic and restarting a different prompt on the same connection are unsupported. On a prompt restart, the integration flushes the first prompt and stops capturing that connection.

To disable Nova audio and turn capture, configure the integration before loading the AWS SDK:

```javascript
const tracer = require('dd-trace').init()
tracer.use('aws-sdk', { llmobs: false })
```

Standard Bedrock APM tracing for other operations is unaffected.

[1]: /llm_observability/quickstart/?tab=nodejs
[2]: /llm_observability/instrument/multimodal/
