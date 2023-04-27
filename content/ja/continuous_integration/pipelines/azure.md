---
aliases:
- /ja/continuous_integration/setup_pipelines/azure
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentation
  text: パイプラインの実行結果とパフォーマンスを確認する
- link: /continuous_integration/pipelines/custom_commands/
  tag: Documentation
  text: 個々のコマンドをトレースしてパイプラインの可視性を拡張する
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: トラブルシューティング CI
- link: /continuous_integration/pipelines/custom_tags_and_metrics/
  tag: Documentation
  text: カスタムタグとメトリクスを追加してパイプラインの可視性を拡張する
kind: documentation
title: Azure パイプラインでトレースを設定する
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

## 互換性

- **カスタム事前定義タグ**: 生成されたすべてのパイプラインとジョブスパンに[カスタムタグ][6]を設定します。

## Datadog インテグレーションの構成

Datadog の [Azure パイプライン][1]インテグレーションは、[サービスフック][2]を使用することでデータを Datadog に送信します。

1. 各プロジェクトについて、Azure DevOps の **Project settings > Service hooks** にアクセスし、`Create subscription` (緑色のプラスアイコン) を選択します。

2. 以下の各 Webhook タイプについて、同じ URL で新しいサブスクリプションを作成します。
    - **Run state changed**
    - **Run stage state changed**
    - **Run job state changed**

3. `Next` をクリックして次のステップに進み、次のように設定します。
    - **URL**: <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook/</code>
    - **HTTP Headers**: `DD-API-KEY:<API_KEY>`、`<API_KEY>` は [Datadog API キー][3]です。
    - **Resource Version**: 最新のフィールドまでスクロールして、`[Latest]` を選択します。

### カスタムタグの設定
インテグレーションによって生成されたすべてのパイプラインとジョブのスパンにカスタムタグを設定するには、**Service hook URL** に URL エンコードされたクエリパラメーター `tags` を追加し、`key:value` ペアをカンマで区切って指定します。key:value のペアにカンマが含まれる場合は、引用符で囲んでください。例えば、`key1:value1,"key2: value with , comma",key3:value3` を追加するには、**Service hook URL** に以下の文字列を追加します。

`?tags=key1%3Avalue1%2C%22key2%3A+value+with+%2C+comma%22%2Ckey3%3Avalue3`

## Datadog でパイプラインデータを視覚化する

ワークフローが終了した後、[Pipelines][4] ページと [Pipeline Executions][5] ページにデータが入力されます。

**注**: Pipelines ページには、各リポジトリのデフォルトブランチのデータのみが表示されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://azure.microsoft.com/en-us/products/devops/pipelines
[2]: https://learn.microsoft.com/en-us/azure/devops/service-hooks/services/webhooks?view=azure-devops
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: https://docs.datadoghq.com/ja/continuous_integration/pipelines/azure/#set-custom-tags