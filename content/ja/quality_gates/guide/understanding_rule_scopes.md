---
title: Understanding How Rule Scopes Work in Quality Gates
kind: ガイド
description: Learn how to configure rule scopes for Quality Gate rules.
further_reading:
  - link: /quality_gates/setup
    tag: ドキュメント
    text: Learn how to set up Quality Gates
---

## 概要

Quality Gates allows you to gate your workflows based on signals in Datadog. When creating a rule, you can define a rule scope, which states when the rule should be evaluated. 

To filter rules that are evaluated for a specific CI pipeline, you can add a custom scope when creating a rule. This process requires you to use the `--scope` option with the [`datadog-ci gate evaluate` command][1] in your build configuration.

例: 

```shell
datadog-ci gate evaluate --scope team:backend --scope team:frontend
```

## Define a rule scope

When the `datadog-ci gate evaluate` command is invoked, the rules having a scope matching the command context are evaluated, and you can filter on rules that tag the `backend` or `frontend` teams.

{{< img src="ci/rule_scope_always_evaluate.png" alt="Rule scope for rules always evaluated" style="width:80%;">}}

For each scope (for example, `branch`), you can select included or excluded values.

- When included values are selected, the rule is evaluated if one or more included values are part of the command context.
- When excluded values are selected, the rule is not evaluated if any of the excluded values are part of the command context.

To create a rule that is evaluated in all branches except `main` of the `example-repository` repository, you can create a rule with the following scope.

1. Click `Select when to evaluate`. 
1. Enter `example-repository` in the **Repository** field and click **Include**. 
1. Click **Add Filter** and select **Branch**. 
1. Enter `main` in the **Branch** field and click **Exclude**.

{{< img src="ci/scope_not_main_example_repository.png" alt="example-repository のルールスコープであり、main ブランチのルールスコープではない" style="width:90%;">}}

ルールにスコープが含まれていない場合、そのスコープのすべての値に対して評価されます。
例えば、ルールが `repository` スコープを含んでいない場合、すべてのリポジトリに対して評価されます。

## Add a custom scope

ブランチとリポジトリに加えて、カスタムスコープを定義して、特定の CI パイプラインに対して評価されるルールをフィルターすることができます。

{{< img src="quality_gates/setup/custom_scope.png" alt="Adding a custom scope to a rule scope in Quality Gates" style="width:80%;">}}

ルール作成時にカスタムスコープを追加するには

1. **+ Add Filter** をクリックし、**Custom Scope** を選択します。
2. スコープ名を `team` のように定義します。
3. スコープに含まれる値や除外される値を定義します。

Unlike the `branch` and `repository` scopes, custom scopes must be passed to the [`datadog-ci gate evaluate` command][1] using the `--scope` option.

For example, you can create a rule that is evaluated for the `example-repository` repository, but only when the team is `backend`.

1. Click `Select when to evaluate`. 
1. Enter `example-repository` in the **Repository** field and click **Include**. 
1. Click **Add Filter** and select **Custom scope**. 
1. Enter a tag name and click **Add Custom Scope**.

   {{< img src="quality_gates/setup/add_tag.png" alt="Rule scope for example-repository and team backend" style="width:50%;">}}

1. Enter `backend` in the **team** field and click **Include**.

{{< img src="ci/rule_scope_example_repository_team_backend.png" alt="Rule scope for example-repository and team backend" style="width:80%;">}}

The rule is evaluated when the following command is invoked in a CI pipeline of the `example-repository` repository:
- `datadog-ci gate evaluate --scope team:backend`

The rule is **not** evaluated when the following commands are invoked instead:
- `datadog-ci gate evaluate`, which does not specify any team.
- `datadog-ci gate evaluate --scope team:api --scope team:frontend`, which specifies teams other than `backend`.

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/@datadog/datadog-ci