---
title: Evaluation Tester
description: Simulate how a feature flag evaluates for a given targeting key and attributes without affecting production data.
further_reading:
- link: "/feature_flags/concepts/targeting_rules"
  tag: "Documentation"
  text: "Targeting Rules and Filters"
- link: "/feature_flags/concepts/saved_filters"
  tag: "Documentation"
  text: "Saved Filters"
- link: "/feature_flags/concepts/environments"
  tag: "Documentation"
  text: "Environments"
---

## Overview

The **Evaluation Tester** lets you simulate how a feature flag would evaluate for a given targeting key and set of attributes, without calling your application's SDK. Use it to answer questions like "Which variant would this user see?" or "Why didn't this targeting rule match?" before you roll out a change.

Evaluations run through the Evaluation Tester are a dry run: they do not emit exposure events, do not count toward evaluation metrics or graphs, and do not affect experiment statistics.

## Open the Evaluation Tester

1. Navigate to **Feature Flags** and select your flag.
2. Select the **Targeting Rules** tab and choose the environment you want to test against.
3. Click **Test Rule Evaluation** to open the Evaluation Tester side panel.

{{< img src="feature_flags/concepts/evaluation-tester-canvas.png" alt="Test Rule Evaluation button on the targeting rules canvas for a flag." style="width:100%;" >}}

## Provide a targeting context

The Evaluation Tester evaluates your flag's targeting rules against a **targeting context**: a targeting key and, optionally, a set of attributes.

- **Targeting key** (required): The identifier used for deterministic bucketing (for example, a user ID). Changing the targeting key can change which variant is assigned when a rule uses percentage-based traffic splitting.
- **Attributes** (optional): Values used to evaluate the filters on your targeting rules, such as `country`, `email`, or `tier`.

You can provide attributes in two modes:

- **Form**: Datadog generates an input field for each attribute referenced by the targeting rules in the selected environment. Each field shows which rules use that attribute. If no targeting rules in the environment reference any attributes, the form only shows the targeting key.
- **JSON**: Enter a raw JSON object of attributes. Use JSON mode when you need to test non-string attribute values, such as numbers, Booleans, arrays, or nested objects.

The evaluation result updates automatically as you edit the targeting key or attributes.

{{< img src="feature_flags/concepts/evaluation-tester-panel.png" alt="Evaluation Tester side panel with a targeting key, an attribute, and a result." style="width:60%;" >}}

## Understand the result

The **Result** section shows the variant that would be assigned for the provided targeting context, along with the name of the targeting rule that matched.

Expand **How did I get this result?** to see a rule-by-rule breakdown of the evaluation:

- Rules are listed in the order they are evaluated.
- Each rule shows whether it **matched**, was **passed through** (the subject didn't match the rule's filter, so evaluation continued to the next rule), or was **skipped** (unreachable given the result of a prior rule).
- For rules with a filter, the breakdown explains which condition matched or didn't match (for example, `country matched US` or `browser did not match is one of Chrome, Safari`).

{{< img src="feature_flags/concepts/evaluation-tester-breakdown.png" alt="Expanded evaluation breakdown showing which rule matched and why." style="width:60%;" >}}

The matched rule is also highlighted on the targeting rules canvas, so you can see the evaluation path visually.

## Testing a disabled flag

If the flag is disabled in the selected environment, the Evaluation Tester shows what a subject would receive if the flag were enabled, rather than returning the coded default. A warning banner reminds you that your application receives the coded default value while the flag remains disabled. Client SDKs always resolve to the coded default for disabled flags; only server SDKs evaluate targeting rules for disabled flags.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
