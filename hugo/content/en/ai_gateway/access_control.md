---
title: Control Model Access in AI Gateway
description: Use default and access policies to control which models and routing rules callers can use.
further_reading:
  - link: "/ai_gateway/"
    tag: "Documentation"
    text: "AI Gateway"
---

{{< callout url="https://www.datadoghq.com/product-preview/ai-gateway/" btn_hidden="false" header="Join the Preview!" >}}
AI Gateway is in Preview. Request access or contact your Customer Success Manager.
{{< /callout >}}

Before you begin, review the [AI Gateway prerequisites](/ai_gateway/getting_started/#prerequisites).

Access policies control who can call each model and routing rule. A policy lists providers, models, routing rules, or a combination of them, and the users, [Datadog teams][13], and service accounts who can use them.

Selecting a provider includes all its models, including models added later. Selecting individual models or routing rules includes only those resources. A policy with no selections grants no access.

A caller can use models included in the default policy. For other models, they need **Runner** or **Editor** access on a policy that includes them. The same model from another provider is a separate entry. Add each provider and model pair you want to govern, such as the OpenAI pair and the Amazon Bedrock pair.

AI Gateway denies access if no policy grants it.

## Default policy

The {{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}Org defaults{{< /ui >}} tab sets the default policy. It grants everyone in your organization access to the selected resources.

Adding a resource to another access policy does not remove access granted by the default policy.

## Access policies

1. Go to [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}Access policies{{< /ui >}}][8] and create a policy.
2. Select the providers, models, and routing rules to include. A policy can contain only models, only routing rules, or both. Models alone grant direct access as `<PROVIDER_SLUG>/<MODEL_ID>`. Add a routing rule to grant access to its `router/<RULE_SLUG>` alias and that rule's direct targets.
3. Choose the users, teams, and service accounts, and their access level:
   - **No access**: Cannot call the policy's models or routing rules.
   - **Runner**: Can call the policy's models and routing rules.
   - **Editor**: Can call the policy's models and routing rules and manage who else has access.
4. Optional: Configure {{< ui >}}Allow fast mode{{< /ui >}} and the maximum reasoning level. A provider may use a different name for fast mode.

Access to a routing rule follows that rule's targets, so a change to the targets changes what its runners can reach. A routing rule that routes to another routing rule needs its own access. A request to `<PROVIDER_SLUG>/<MODEL_ID>` and a request to `router/<RULE_SLUG>` can be allowed or denied separately. Test both with the user or service account that sends them.

## Recommended setup

For tighter control over who can call models:

- Include only resources approved for everyone in the default policy.
- Create an access policy for each set of approved models.
- Grant **Runner** only to the users, teams, and service accounts that need it.
- Review policy membership and routing rule targets regularly.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[8]: https://app.datadoghq.com/llm/gateway/access
[13]: /account_management/teams/manage/
