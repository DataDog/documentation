---
description: Quality Gate ルール用のルールスコープをどのように設定するか学びましょう。
further_reading:
- link: /quality_gates/setup
  tag: ドキュメント
  text: Quality Gates のセットアップ方法
title: Quality Gates におけるルールスコープの仕組みを理解する
---

## 概要

Quality Gates を使用すると、Datadog のシグナルに基づいてワークフローをゲートできます。ルールを作成する際にルールスコープを定義し、どのタイミングでルールを評価するかを設定できます。

特定の CI パイプラインに対して評価されるルールを絞り込むには、ルールを作成するときにカスタムスコープを追加します。この手順では、ビルド設定で [`datadog-ci gate evaluate` コマンド][1]に `--scope` オプションを使用する必要があります。

例: 

```shell
datadog-ci gate evaluate --scope team:backend --scope team:frontend
```

## ルールスコープの定義

`datadog-ci gate evaluate` コマンドが呼び出されると、コマンドコンテキストに一致するスコープを持つルールが評価されます。これにより、`backend` や `frontend` といったチームをタグ付けしたルールだけをフィルタリングできます。

{{< img src="ci/rule_scope_always_evaluate.png" alt="常に評価されるルールのスコープ" style="width:80%;">}}

各スコープ (例: `branch`) には、含める (Include) 値と除外する (Exclude) 値を設定できます。

- 含める (Include) 値 を設定した場合、コマンドコンテキストに含める値のいずれかが含まれていれば、そのルールは評価されます。
- 除外する (Exclude) 値 を設定した場合、コマンドコンテキストに除外する値がいずれか含まれていると、そのルールは評価されません。

例えば、`example-repository` というリポジトリのうち、`main` ブランチを除くすべてのブランチで評価されるルールを作成したい場合、以下のようにスコープを設定します。

1. `Select when to evaluate` をクリックします。
1. **Repository** フィールドに `example-repository` と入力し、**Include** をクリックします。
1. **Add Filter** をクリックし、**Branch** を選択します。
1. **Branch** フィールドに `main` と入力し、**Exclude** をクリックします。

{{< img src="ci/scope_not_main_example_repository.png" alt="example-repository のルールスコープであり、main ブランチのルールスコープではない" style="width:90%;">}}

ルールにスコープが含まれていない場合、そのスコープのすべての値に対して評価されます。
例えば、ルールが `repository` スコープを含んでいない場合、すべてのリポジトリに対して評価されます。

## カスタムスコープの追加

ブランチとリポジトリに加えて、カスタムスコープを定義して、特定の CI パイプラインに対して評価されるルールをフィルターすることができます。

{{< img src="quality_gates/setup/custom_scope.png" alt="Quality Gates でルールスコープにカスタムスコープを追加する" style="width:80%;">}}

ルール作成時にカスタムスコープを追加するには

1. **+ Add Filter** をクリックし、**Custom Scope** を選択します。
2. スコープ名を `team` のように定義します。
3. スコープに含まれる値や除外される値を定義します。

`branch` や `repository` スコープとは異なり、カスタムスコープは [`datadog-ci gate evaluate` コマンド][1]に `--scope` オプションを使用して指定しなければなりません。

例えば、`example-repository` リポジトリにおいて、チームが `backend` の場合にのみ評価されるルールを作成できます。

1. `Select when to evaluate` をクリックします。
1. **Repository** フィールドに `example-repository` と入力し、**Include** をクリックします。
1. **Add Filter** をクリックし、**Custom scope** を選択します。
1. タグ名を入力し、**Add Custom Scope** をクリックします。

   {{< img src="quality_gates/setup/add_tag.png" alt="example-repository と team backend のルールスコープ" style="width:50%;">}}

1. **team** フィールドに `backend` と入力し、**Include** をクリックします。

{{< img src="ci/rule_scope_example_repository_team_backend.png" alt="example-repository と team backend のルールスコープ" style="width:80%;">}}

このルールは `example-repository` リポジトリの CI パイプラインで以下のコマンドが呼び出された場合に評価されます。
- `datadog-ci gate evaluate --scope team:backend`

一方、以下のコマンドではこのルールは**評価されません**。
- `datadog-ci gate evaluate` (team が指定されていないため)
- `datadog-ci gate evaluate --scope team:api --scope team:frontend` (`backend` 以外のチームが指定されているため)

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/@datadog/datadog-ci