---
title: Quality Evaluations
description: Learn how to configure managed evaluations for your LLM applications.
further_reading:
- link: "/llm_observability/terms/"
  tag: "Documentation"
  text: "Learn about LLM Observability core concepts"
- link: "/llm_observability/instrumentation"
  tag: "Documentation"
  text: "Learn how to instrument your LLM application"
aliases:
    - /llm_observability/evaluations/quality_evaluations
---

Quality evaluations help ensure your LLM-powered applications generate accurate, relevant, and safe responses. Managed evaluations automatically score model outputs on key quality dimensions and attach results to traces, helping you detect issues, monitor trends, and improve response quality over time.

#### Language Mismatch

This check identifies instances where the LLM generates responses in a different language or dialect than the one used by the user, which can lead to confusion or miscommunication. This check ensures that the LLM's responses are clear, relevant, and appropriate for the user's linguistic preferences and needs.

Language mismatch is only supported for natural language prompts. Input and output pairs that mainly consist of structured data such as JSON, code snippets, or special characters are not flagged as a language mismatch.

{{% collapse-content title="Supported languages" level="h5" %}}
Afrikaans, Albanian, Arabic, Armenian, Azerbaijani, Belarusian, Bengali, Norwegian Bokmal, Bosnian, Bulgarian, Chinese, Croatian, Czech, Danish, Dutch, English, Estonian, Finnish, French, Georgian, German, Greek, Gujarati, Hebrew, Hindi, Hungarian, Icelandic, Indonesian, Irish, Italian, Japanese, Kazakh, Korean, Latvian, Lithuanian, Macedonian, Malay, Marathi, Mongolian, Norwegian Nynorsk, Persian, Polish, Portuguese, Punjabi, Romanian, Russian, Serbian, Slovak, Slovene, Spanish, Swahili, Swedish, Tamil, Telugu, Thai, Turkish, Ukrainian, Urdu, Vietnamese, Yoruba, Zulu
{{% /collapse-content %}}

{{< img src="llm_observability/evaluations/language_mismatch_4.png" alt="A Language Mismatch evaluation detected by an open source model in LLM Observability" style="width:100%;" >}}

| Evaluation Stage | Evaluation Method | Evaluation Definition |
|---|---|---|
| Evaluated on Input and Output | Evaluated using Open Source Model | Language Mismatch flags whether each prompt-response pair demonstrates that the LLM application answered the user's question in the same language that the user used.  |

