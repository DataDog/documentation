---
aliases:
- /ja/continuous_integration/setup_pipelines/codefresh
further_reading:
- link: /continuous_integration/pipelines
  tag: ドキュメント
  text: パイプラインの実行結果とパフォーマンスを確認する
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: トラブルシューティング CI
title: Codefresh パイプラインでトレースを設定する
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

## 互換性

- **Partial pipelines**: 部分リトライとダウンストリームパイプラインの実行を表示します

- **Manual steps**: 手動でトリガーされたパイプラインを表示します

- **Parameters**: パイプラインのトリガー時にカスタムパラメーター (例えば、[Codefresh 変数][6]) を設定します

- **Pipeline failure reasons**: エラーメッセージからパイプラインの障害理由を特定します

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
[6]: https://codefresh.io/docs/docs/codefresh-yaml/variables/#user-provided-variables