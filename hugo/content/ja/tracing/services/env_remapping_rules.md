---
description: Env リマッピングルールを使用して、トレーサー構成の変更やコードの再デプロイを行うことなく、APM スパンの環境を変更、統合、または分割します。
further_reading:
- link: /tracing/services/service_remapping_rules/
  tag: ドキュメント
  text: サービスリマッピングルール
title: Env リマッピングルール
---
{{< callout url="https://www.datadoghq.com/product-preview/env-remapping/" header="プレビューに参加しましょう。" >}}
Env リマッピングはプレビュー版です。アクセスをリクエストするには、このフォームに記入してください。
{{< /callout >}}

## 概要 {#overview}

Env リマッピングルールを使用すると、Datadog から環境の名前変更、統合、または分割を行うことができます。このルールは、トレーサー構成の変更やコードの再デプロイを行うことなく、APM スパンの `env` 値を更新します。

## 前提条件 {#prerequisites}

Env リマッピングルールの作成、編集、または削除には、**APM Service Remapping Write** 権限 (`apm_service_renaming_write`) が必要です。[Datadog ロールのアクセス許可][1]を参照してください。

## Env リマッピングルールを作成する {#create-an-env-remapping-rule}

1. Datadog で、{{< ui >}}APM{{< /ui >}} > {{< ui >}}Catalog{{< /ui >}} > {{< ui >}}Manage{{< /ui >}} > {{< ui >}}Service Tags Remapping{{< /ui >}} の順に移動します。
1. {{< ui >}}Add Env Rule{{< /ui >}} をクリックします。
1. 検索バーを使用して、リマッピングする環境を 1 つ以上選択します。
1. テキストボックスに一意の環境名を入力します。入力すると、環境名のプレビューが表示されます。

    タグに基づいて環境に名前を付けるには、`{{tagName}}` 構文を使用してください。タグ値が特定のパターンに従っている場合は、正規表現を適用して、名前に必要な部分を抽出します。

    **Note**: When a tag has several values, the preview shows only those with the most spans.

1. オプションとして、後で識別できるようにリマッピングルールにわかりやすい名前を付けます。
1. リマッピングルールを確認して保存します。

ルールを保存した後、有効になるまでに約 1 分かかる場合があります。

## Env リマッピングルールの動作 {#env-remapping-rules-behavior}

Env リマッピングルールは、取り込み時に `env` タグを上書きします。ルールを作成しても、環境名を指定する既存の構成は変更されません。Env リマッピングルールは、他のすべての環境名の構成よりも優先されます。

- **影響を受けるデータ**: Env リマッピングは APM スパンにのみ適用されます。
- **履歴データ**: Env リマッピングルールは、ルールがアクティブな間に取り込まれたスパンにのみ適用されます。過去のデータは遡及的に更新されません。ルールを削除または変更すると、新しいスパンへの適用は停止されますが、以前に取り込まれたデータは更新されません。
- **ルールの処理順序**: Env リマッピングルールは作成された順序で適用されます。Env リマッピングリストの上位にあるルールは、その下にあるルールよりも優先されます。ルールの順序は変更できます。
- **正規表現**: 正規表現を使用して、新しい環境名を定義します。キャプチャグループ内では、貪欲な量指定子を使用することはできません。
- **サービスリマッピングルールとの相互作用**: Env リマッピングルールは[サービスリマッピングルール][2]の後に適用されます。サービスリマッピングルールが `service` タグを変更した場合、Env リマッピングルールを適用する際には、更新されたサービス名が使用されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/rbac/permissions/
[2]: /ja/tracing/services/service_remapping_rules/