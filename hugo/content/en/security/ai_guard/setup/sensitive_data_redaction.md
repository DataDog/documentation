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

To enable sensitive data redaction, configure redaction rules for AI Guard, enable sensitive data scanning for your service, and apply the replacements returned by AI Guard.

## 1. Configure redaction rules

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

## 2. Enable sensitive data scanning for a service

1. Go to {{< ui >}}Security{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Services{{< /ui >}}][2].
1. Edit the default policy or the policy for the service and environment you want to protect.
1. Enable {{< ui >}}Sensitive data scanning{{< /ui >}}, then save the policy.

{{< img src="security/ai_guard/ai_guard_sensitive_data_scanning.png" alt="An AI Guard service policy with sensitive data scanning enabled" style="width:100%;" >}}

The service policy enables or disables the complete Sensitive Data Scanner configuration for that service. Configure which data is detected and redacted on the [AI Guard configuration page in Sensitive Data Scanner][1].

## 3. Apply redaction replacements with the SDK

When the SDK evaluates messages, the evaluation response includes a fully redacted replacement and its path for each value that a configured rule mutates. Apply these replacements to the messages sent to the model so that sensitive data does not leave your application.

For this first version, AI Guard scans only the last message in each evaluation call. This includes a user prompt, assistant response, tool call arguments, or tool call result when it is the last message being evaluated. Earlier messages in the conversation are not rescanned. Applying replacements does not modify your application-owned message objects.

The way you apply redaction replacements depends on the SDK language. See [AI Guard SDK][3] for language-specific instructions.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/sensitive-data-scanner/configuration/ai-guard
[2]: https://app.datadoghq.com/security/ai-guard/settings/services
[3]: /security/ai_guard/setup/sdk/
