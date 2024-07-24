---
aliases:
- /ja/continuous_integration/setup_pipelines/custom_commands
further_reading:
- link: /continuous_integration/pipelines/custom_commands/
  tag: ドキュメント
  text: トラブルシューティング CI
title: パイプライントレースへのカスタムコマンドの追加
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では CI Visibility は利用できません。</div>
{{< /site-region >}}

カスタムコマンドは、CI パイプラインの個々のコマンドをトレースする方法を提供し、ジョブが持つかもしれないセットアップやティアダウンアクション (例えば、Docker イメージのダウンロードや Kubernetes ベースのインフラで利用できるノードの待機) を考慮せずにコマンドにかかる時間を測定することを可能にします。これらのスパンは、パイプラインのトレースの一部として表示されます。

{{< img src="ci/ci-custom-spans.png" alt="カスタムコマンドを使用した単一パイプラインの詳細" style="width:100%;">}}

## 互換性

カスタムコマンドは、以下の CI プロバイダーで動作します。

- Jenkins と Datadog プラグイン >= v3.2.0
- CircleCI

## Datadog CI CLI のインストール

`npm` を使用して [`datadog-ci`][1] (>=v0.17.0) CLI をグローバルにインストールします。

{{< code-block lang="shell" >}}
npm install -g @datadog/datadog-ci
{{< /code-block >}}

## コマンドのトレース

コマンドをトレースするには、以下を実行します。

{{< code-block lang="shell" >}}
datadog-ci trace [--name <name>] -- <command>
{{< /code-block >}}

環境変数 `DATADOG_API_KEY` に有効な [Datadog API キー][2]を指定します。例:

{{< site-region region="us,us3,eu,ap1" >}}
<pre>
<code>
DATADOG_API_KEY=&lt;key&gt; DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci trace \
--name "Greet" \
-- \
echo "Hello World"
</code>
</pre>
{{< /site-region >}}
{{< site-region region="us5,gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では CI Visibility は利用できません。</div>
{{< /site-region >}}

## コンフィギュレーション設定

これらのオプションは `datadog-ci trace` コマンドで利用可能です。

`--name`
: カスタムコマンドの表示名。<br/>
**デフォルト**: `<command>` と同じ値<br/>
**例**: `Wait for DB to be reachable`

`--tags`
: カスタムコマンドにアタッチされる `key:value` 形式のキーと値のペア (`--tags` パラメーターは複数回指定できます)。`DD_TAGS` を使用してタグを指定する場合は、カンマを使用してタグを区切ります (例: `team:backend,priority:high`)。<br/>
**環境変数**: `DD_TAGS`<br/>
**デフォルト**: (none)<br/>
**例**: `team:backend`<br/>
**注**: `--tags` と `DD_TAGS` 環境変数を使用して指定されたタグがマージされます。`--tags` と `DD_TAGS` の両方に同じキーが表示される場合、環境変数 `DD_TAGS` の値が優先されます。

`--no-fail`
: サポートされていない CI プロバイダーで実行しても、datadog-ci が失敗しないようにします。この場合、コマンドは実行されますが、Datadog には何も報告されません。<br/>
**デフォルト**: `false`

位置引数
: 起動され、トレースされるコマンド。

次の環境変数がサポートされています。

`DATADOG_API_KEY` (必須)
: リクエストの認証に使用される [Datadog API キー][2]。<br/>
**デフォルト**: (なし)

{{< site-region region="us3,us5,eu,ap1" >}}
さらに、選択したサイトを使用するように Datadog サイトを構成します ({{< region-param key="dd_site_name" >}}):

`DATADOG_SITE`
: 結果をアップロードする Datadog サイト。<br/>
**デフォルト**: `datadoghq.com`<br/>
**選択したサイト**: {{< region-param key="dd_site" code="true" >}}
{{< /site-region >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/@datadog/datadog-ci
[2]: https://app.datadoghq.com/organization-settings/api-keys