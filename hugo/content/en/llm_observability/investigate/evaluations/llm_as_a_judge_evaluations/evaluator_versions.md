---
title: Evaluator Versions
description: Track every change to a custom evaluator as a numbered version, compare versions, restore an earlier one, and filter evaluation results by version.
further_reading:
- link: "/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations"
  tag: "Documentation"
  text: "Custom LLM-as-a-Judge Evaluators"
- link: "/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/prompt_templating"
  tag: "Documentation"
  text: "Prompt Templating"
---

Datadog keeps a numbered version of every change you save to a custom evaluator. Each evaluation result records the version that produced it, so you can:

- See what changed between two versions of an evaluator
- Compare how two versions performed on your data
- Restore an earlier version if a change made results worse
- Filter evaluation results to a single version

Versions apply to custom evaluators. [Managed evaluators][1] do not have versions.

## How versions are created

Saving an evaluator creates a version. Only one version, the published version, runs on your data at a time.

- {{< ui >}}Save and Publish{{< /ui >}}: Saves your changes as a new version and publishes it. The new version starts running, and the previously published version stops.
- {{< ui >}}Save as Draft{{< /ui >}}: Saves your changes as a new version without publishing it. The published version keeps running, and the draft produces no results. An evaluator has at most one draft. Saving the draft again updates it instead of creating another version.
- {{< ui >}}Publish{{< /ui >}}: When you view a draft, the {{< ui >}}Save and Publish{{< /ui >}} button reads {{< ui >}}Publish{{< /ui >}}. Selecting it makes the draft the published version.
- {{< ui >}}Enable{{< /ui >}} and {{< ui >}}Disable{{< /ui >}}: In the evaluator's options menu, {{< ui >}}Enable{{< /ui >}} and {{< ui >}}Disable{{< /ui >}} start or stop the evaluator without creating a version.

The editor shows whether the version you are viewing is {{< ui >}}Published{{< /ui >}} or {{< ui >}}Draft{{< /ui >}}.

## View version history

1. In Datadog, navigate to the Agent Observability [Evaluators page][2] and open a custom evaluator.
1. In the evaluator's options menu, select {{< ui >}}Version History{{< /ui >}}.

The panel lists every version of the evaluator, newest first, with the date it was saved and what changed. Select a version to view its configuration.

To load a version into the editor, select {{< ui >}}Open in Editor{{< /ui >}}. Older versions open read-only. To edit an older version, restore it first.

## Compare two versions

1. In {{< ui >}}Version History{{< /ui >}}, select {{< ui >}}Compare{{< /ui >}}.
1. Select the two versions you want to compare.

The comparison shows the differences between the two configurations, such as changes to the prompt, model, or evaluation scope. It also shows how each version performed, including evaluation volume, pass rate, cost, and token usage. To switch which version appears on each side, select {{< ui >}}Swap versions{{< /ui >}}.

## Restore a version

1. In {{< ui >}}Version History{{< /ui >}}, find the version you want to go back to.
1. Select {{< ui >}}Restore this version{{< /ui >}}.

Datadog publishes the restored configuration as a new version. Earlier versions are never changed, so the history still shows every version you saved.

If the evaluator has a draft, Datadog asks you to confirm. Restoring a version replaces the draft.

## Filter results by version

On the evaluator's {{< ui >}}Results{{< /ui >}} and {{< ui >}}Health{{< /ui >}} tabs, use the {{< ui >}}Version{{< /ui >}} selector to show results from one version. By default, the tabs show {{< ui >}}All versions{{< /ui >}}. The published version is labeled {{< ui >}}(published){{< /ui >}}.

The selector appears after an evaluator has at least two published versions. Drafts are not listed, because they produce no results. Charts mark the point where each version's first result appears, so you can see when a change took effect.

To query or visualize results from one version elsewhere in Agent Observability, use the syntax `@evaluation.<evaluation_name>.eval_version`.

For example:
```
@evaluation.helpfulness-check.eval_version:3
```

Results produced before an evaluator had versions do not include a version.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/investigate/evaluations/managed_evaluations
[2]: https://app.datadoghq.com/llm/evaluations
