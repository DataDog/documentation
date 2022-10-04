---
further_reading:
- link: /continuous_integration/explore_pipelines
  tag: ドキュメント
  text: パイプラインの実行結果とパフォーマンスを確認する
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: トラブルシューティング CI
- link: /continuous_integration/setup_pipelines/custom_tags_and_metrics/
  tag: ドキュメント
  text: カスタムタグとメトリクスを追加してパイプラインの可視性を拡張する
kind: documentation
title: Buildkite パイプラインでトレースを設定する
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

## Datadog インテグレーションの構成

[Buildkite][1] の Datadog インテグレーションを有効にする手順は以下の通りです。

1. Buildkite の **Settings > Notification Services** に移動し、add a **Datadog Pipeline Visibility** integration をクリックします。
2. 以下の情報をフォームに入力してください。
   * **Description**: Datadog CI Visibility インテグレーションのように、将来的にインテグレーションを識別するのに役立つ説明です。
   * **API key**: [Datadog API キー][2]です。
   * **Datadog site**: {{< region-param key="dd_site" code="true" >}}
   * **Pipelines**: トレースするすべてのパイプラインまたはパイプラインのサブセットを選択します。
   * **Branch filtering**: すべてのブランチをトレースする場合は空のままにします。または、トレースしたいブランチのサブセットを選択します。
3. **Add Datadog Pipeline Visibility Notification** をクリックして、インテグレーションを保存します。

### カスタムタグの設定

カスタムタグは `buildkite-agent meta-data set` コマンドを使用して Buildkite トレースに追加することができます。
`dd_tags.` で始まるキーを持つメタデータタグはすべて、ジョブとパイプラインのスパンに追加されます。これらのタグを使用して、パイプラインを検索および整理するための文字列ファセットを作成することができます。

以下の YAML は、チーム名と Go バージョンのタグが設定されたシンプルなパイプラインを表しています。

```yaml
steps:
  - command: buildkite-agent meta-data set "dd_tags.team" "backend"
  - command: go version | buildkite-agent meta-data set "dd_tags.go.version"
    label: Go version
  - commands: go test ./...
    label: Run tests
```

Datadog では、ルートスパンだけでなく、関連するジョブスパンにも以下のタグが表示されます。

- `team: backend`
- `go.version: go version go1.17 darwin/amd64` (出力はランナーに依存します)

その結果、パイプラインは次のようになります。

{{< img src="ci/buildkite-custom-tags.png" alt="カスタムタグによる Buildkite パイプラインのトレース" style="width:100%;">}}

キーが `dd-metrics.` で始まり、数値を含むメタデータは、数値メジャーの作成に利用できるメトリクスタグとして設定されます。このようなタグを作成するには、`buildkite-agent meta-data set` コマンドを使用します。これは、例えばパイプラインのバイナリーサイズを計測するのに使うことができます。

```yaml
steps:
  - commands:
    - go build -o dst/binary .
    - ls -l dst/binary | awk '{print \$5}' | tr -d '\n' | buildkite-agent meta-data set "dd_metrics.binary_size"
    label: Go build
```

出来上がったパイプラインは、パイプラインスパンに以下のようなタグが表示されます。

- `binary_size: 502` (出力はファイルサイズに依存します)

この例では、`binary_size` の値を使って、バイナリーサイズの経時変化をプロットすることができます。

## Datadog でパイプラインデータを視覚化する

パイプラインが終了した後、[Pipelines][3] ページと [Pipeline Executions][4] ページにデータが入力されます。

**注**: Pipelines ページには、各リポジトリのデフォルトブランチのデータのみが表示されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://buildkite.com
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/ci/pipelines
[4]: https://app.datadoghq.com/ci/pipeline-executions