---
aliases:
- /ja/continuous_integration/setup_pipelines/circleci
further_reading:
- link: /continuous_integration/pipelines
  tag: ドキュメント
  text: パイプラインの実行結果とパフォーマンスを確認する
- link: /continuous_integration/pipelines/custom_commands/
  tag: ドキュメント
  text: 個々のコマンドをトレースしてパイプラインの可視性を拡張する
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: トラブルシューティング CI
- link: /continuous_integration/pipelines/custom_tags_and_metrics/
  tag: ドキュメント
  text: カスタムタグとメトリクスを追加してパイプラインの可視性を拡張する
title: CircleCI ワークフローにトレースを設定する
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

## 互換性

- **部分的パイプライン**: 部分的なパイプラインとダウンストリームパイプラインの実行を表示します

- **カスタムスパン**: カスタムスパンを構成します

- **カスタム事前定義タグ**: 生成されたすべてのパイプラインとジョブスパンに[カスタムタグ][6]を設定します

- **ランタイムのカスタムタグおよびメトリクス**: ランタイムに[カスタムタグ][7]とメトリクスを構成します

## Datadog インテグレーションの構成

Datadog の [CircleCI][1] インテグレーションは、[Webhooks][2] を使用することでデータを Datadog に送信します。

1. 各プロジェクトについて、CircleCI の **Project Settings > Webhooks** で、新しい Webhook を追加します。
   * **Webhook URL**: <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook/?dd-api-key=<API_KEY></code> ここで、`<API_KEY>` は [Datadog API キー][3]です。
   * **Name**: `Datadog CI Visibility` など、任意の識別子名を指定します。
   * **Events**: `Workflow Completed` と `Job Completed` を選択します。
   * **Certificate verifications**: このチェックを有効にします。

2. **Add Webhook** をクリックして、新しい Webhook を保存します。

### カスタムタグの設定
インテグレーションによって生成されたすべてのパイプラインとジョブのスパンにカスタムタグを設定するには、**Webhook URL** に URL エンコードされたクエリパラメーター `tags` を追加し、`key:value` ペアをカンマで区切って指定します。key:value のペアにカンマが含まれる場合は、引用符で囲んでください。例えば、`key1:value1, "key2: value with , comma",key3:value3` を追加するには、以下の文字列を **Webhook URL** に追記する必要があります。

`?tags=key1%3Avalue1%2C%22key2%3A+value+with+%2C+comma%22%2Ckey3%3Avalue3`

#### Datadog Teams と統合する
パイプラインに関連付けられたチームの表示とフィルタリングを行うには、カスタムタグとして `team:<your-team>` を追加します。カスタムタグ名は、[Datadog Teams][8] のチームハンドルと正確に一致している必要があります。

## Datadog でパイプラインデータを視覚化する

ワークフローが終了した後、[Pipelines][4] ページと [Pipeline Executions][5] ページにデータが表示されます。

**注**: Pipelines ページには、各リポジトリのデフォルトブランチのデータのみが表示されます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://circleci.com/
[2]: https://circleci.com/docs/2.0/webhooks
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: /ja/continuous_integration/pipelines/circleci/#set-custom-tags
[7]: /ja/continuous_integration/pipelines/custom_tags_and_metrics/?tab=linux
[8]: /ja/account_management/teams/