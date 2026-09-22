---
title: Sensitive Data Redaction
further_reading:
- link: /security/ai_guard/setup/
  tag: Documentation
  text: Set Up AI Guard
- link: /security/ai_guard/setup/sdk/
  tag: Documentation
  text: AI Guard SDK
- link: /security/sensitive_data_scanner/scanning_rules/
  tag: Documentation
  text: Sensitive Data Scanning Rules
---

{{< site-region region="gov" >}}<div class="alert alert-danger">AI Guard isn't available in the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

AI Guard uses Sensitive Data Scanner to identify sensitive data, such as personally identifiable information (PII), credentials, and secrets, in messages evaluated by AI Guard. Matching data can be hashed, replaced with custom text, or partially redacted before it is sent to the model. To replace each match with a label or `****`, use the **Redact** action and enter the value as the replacement text.

<div class="alert alert-warning">Sensitive data redaction is designed for the AI Guard SDK. Automatic instrumentation integrations, such as OpenAI and Anthropic, report Sensitive Data Scanner findings but don't redact the messages your application sends to the model. To redact sensitive data, call the SDK directly and forward the redacted conversation returned by the evaluation. See <a href="/security/ai_guard/setup/sdk/">AI Guard SDK</a>.</div>

## Supported SDK versions

| Language   | Minimum version     |
|------------|---------------------|
| Python     | dd-trace-py 4.14.0  |
| JavaScript | dd-trace-js 6.13.0  |
| Java       | Coming soon         |
| Ruby       | Coming soon         |

## Setup

To enable sensitive data redaction, configure redaction rules for AI Guard, enable sensitive data scanning for your service, and apply the replacements returned by AI Guard.

### 1. Configure redaction rules

Sensitive Data Scanner rules for AI Guard are configured at the organization level. To choose what data AI Guard redacts and how it is replaced:

1. Go to {{< ui >}}Security{{< /ui >}} > {{< ui >}}Sensitive Data Scanner{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}} > [{{< ui >}}AI Guard{{< /ui >}}][1].
1. Create or edit an AI Guard scanning group and enable the rules for the sensitive data you want to detect.

{{< img src="security/ai_guard/ai_guard_sds_configuration.png" alt="The AI Guard tab on the Sensitive Data Scanner configuration page" style="width:100%;" >}}

Under {{< ui >}}Action on Match{{< /ui >}}, select what happens when the rule matches sensitive data:

{{< img src="security/ai_guard/ai_guard_action_on_match_options.png" alt="Sensitive Data Scanner Action on Match options: Hash, Redact, Partially Redact, Mask, and No Action" style="width:100%;" >}}

- **Hash**: Permanently replaces the entire matched value with a hashed token.
- **Redact**: Permanently replaces the entire matched value with replacement text that you specify.
- **Partially Redact**: Permanently obscures only part of the matched value.
- **Mask**: Hides the matched value in Datadog, but preserves the underlying value so users with permission can reveal it.
- **No Action**: Leaves the matched value unchanged.

To replace sensitive data before it is sent to the model with an exact value, select **Redact** and enter replacement text such as `[sensitive_data]` or `****`.

{{< img src="security/ai_guard/ai_guard_redact_replacement_text.png" alt="The Redact action selected with a custom replacement text field" style="width:100%;" >}}

Tags categorize the finding but do not change the matched content.

<div class="alert alert-info">This configuration applies across your organization. The rules are applied only to services for which sensitive data scanning is enabled.</div>

### 2. Enable sensitive data scanning for a service

Enabling the Sensitive Data Scanner rules for AI Guard is not sufficient on its own. After the rules are enabled, you must also enable sensitive data scanning on the AI Guard service you want to protect:

1. Go to {{< ui >}}Security{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Services{{< /ui >}}][2].
1. Edit the default policy or the policy for the service and environment you want to protect.
1. Under {{< ui >}}Sensitive data scanning{{< /ui >}}, select one of the following options, then save the policy:
   - {{< ui >}}Disabled{{< /ui >}}: AI Guard doesn't scan requests for sensitive data.
   - {{< ui >}}Scanning{{< /ui >}}: AI Guard scans requests for sensitive data and reports the findings on the AI Guard span, but returns the messages unchanged.
   - {{< ui >}}Scanning and redacting{{< /ui >}}: AI Guard scans requests for sensitive data and redacts the matches, following the action configured for each rule.

{{< img src="security/ai_guard/ai_guard_sensitive_data_scanning.png" alt="An AI Guard service policy with the Disabled, Scanning, and Scanning and redacting options for sensitive data scanning" style="width:100%;" >}}

The service policy enables or disables the complete Sensitive Data Scanner configuration for that service. Configure which data is detected and redacted on the [AI Guard configuration page in Sensitive Data Scanner][1].

When {{< ui >}}Scanning and redacting{{< /ui >}} is enabled, AI Guard redacts the last message of the evaluated conversation.

<div class="alert alert-info">Because the conversation context is built incrementally, AI Guard doesn't rescan the conversation history. Replacing the messages in your application with their redacted versions is the responsibility of your SDK implementation. See <a href="/security/ai_guard/setup/sdk/">AI Guard SDK</a>.</div>

### 3. Apply redaction replacements with the SDK

When the SDK evaluates messages, the evaluation response includes a fully redacted replacement and its path for each value that a configured rule mutates. The SDK applies these replacements to a copy of the evaluated conversation and returns it with the evaluation result. Forward that conversation to the model, and keep it in your application state, so that sensitive data does not leave your application and is not reintroduced on the next turn.

AI Guard scans only the last message in each evaluation call, and uses the preceding messages as context. This includes a user prompt, assistant response, tool call arguments, or tool call result when it is the last message being evaluated. Earlier messages in the conversation are not rescanned, so the result carries the full conversation you passed in with only the last message redacted. Applying replacements does not modify your application-owned message objects.

The way you read the redacted conversation depends on the SDK language:

- [Python][3]
- [JavaScript][4]
- [Java][5]

To turn off redaction in the tracer while keeping detection and reporting, set `DD_AI_GUARD_REDACTION_ENABLED=false` in your application environment. Evaluation still runs and findings are still reported, but the SDK returns the messages unchanged.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/sensitive-data-scanner/configuration/ai-guard
[2]: https://app.datadoghq.com/security/ai-guard/settings/services
[3]: /security/ai_guard/setup/sdk/?tab=python#python-example-apply-sensitive-data-redaction
[4]: /security/ai_guard/setup/sdk/?tab=javascript#javascript-example-apply-sensitive-data-redaction
[5]: /security/ai_guard/setup/sdk/?tab=java#java-example-apply-sensitive-data-redaction
