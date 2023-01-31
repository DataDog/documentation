---
further_reading:
- link: /continuous_integration/explore_pipelines
  tag: ドキュメント
  text: パイプラインの実行結果とパフォーマンスを確認する
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: トラブルシューティング CI
kind: documentation
title: Codefresh パイプラインでトレースを設定する
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

## Datadog インテグレーションの構成

[Codefresh][1] の Datadog インテグレーションを有効にする手順は以下の通りです。

1. Codefresh の **[Account Settings > Configuration > Integrations][2]** に移動し、Datadog の行の **CONFIGURE** をクリックします。
2. **ADD INTEGRATION** をクリックします。
3. 以下の情報をフォームに入力してください。
   * **Datadog site**: ドロップダウンから {{< region-param key="dd_site" code="true" >}} を選択します。
   * **Token**: [Datadog API キー][3]を追加します。
4. インテグレーションを保存するには、**SAVE** をクリックします。

## Datadog でパイプラインデータを視覚化する

パイプラインが終了した後、[Pipelines][4] ページと [Pipeline Executions][5] ページにデータが入力されます。

**注**: Pipelines ページには、各リポジトリのデフォルトブランチのデータのみが表示されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://codefresh.io/
[2]: https://g.codefresh.io/account-admin/account-conf/integration/datadog
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions