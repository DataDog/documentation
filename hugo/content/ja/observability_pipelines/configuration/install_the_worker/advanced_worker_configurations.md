---
aliases:
- /ja/observability_pipelines/setup_opw/
- /ja/observability_pipelines/advanced_configurations/
description: ワーカーのブートストラップオプションおよびその他の構成オプションについて学習します。
disable_toc: false
further_reading:
- link: /observability_pipelines/sensitive_data_redaction/
  tag: ドキュメント
  text: Observability Pipelines でデータをマスキングする
- link: /observability_pipelines/configuration/update_existing_pipelines/
  tag: ドキュメント
  text: 既存のパイプラインを更新する
title: 高度なワーカー構成
---
## 概要 {#overview}

このドキュメントでは、Observability Pipelines Workerの[ブートストラップ](#bootstrap-options)、[その他のワーカー構成オプション](#other-worker-configuration-options)、および[ヘルスチェックエンドポイントとlivenessプローブ/ readinessプローブを有効にする](#enable-the-health-check-endpoint-and-the-liveness-and-readiness-probes)方法について説明します。

## ブートストラップオプション{#bootstrap-options}

<div class="alert alert-danger">パイプラインで指定されたすべての構成ファイルパスは、以下にある必要があります。 <code>/DD_OP_DATA_DIR/config</code>.
OPWの実行中にその場所にあるファイルを変更すると、悪影響を及ぼす可能性があります。
</div>

パイプラインをセットアップする前に、インフラストラクチャー内でObservability Pipelines Workerをブートストラップします。これらの環境変数は、パイプラインの環境変数とは別です。関連するディレクトリとファイルの場所:

- デフォルトのデータディレクトリ: `/var/lib/observability-pipelines-worker`
- ブートストラップファイル: `/etc/observability-pipelines-worker/bootstrap.yaml`
- 環境変数ファイル: `/etc/default/observability-pipelines-worker`

**注**: `DD_OP_DATA_DIR`は、単一のObservability Pipelines Workerによってのみ所有できます。複数のワーカーがある場合は、一意のデータディレクトリを使用する必要があります。

ブートストラップオプションを設定するには、以下のいずれかを実行してください。
- 環境変数を使用します。
- `bootstrap.yaml`を作成し、`--bootstrap-config /path/to/bootstrap.yaml`を使用してワーカーインスタンスを開始します。

以下は、ブートストラップオプション、それらに関連するパイプライン環境変数、および両方が設定されている場合にブートストラップ値と環境変数のどちらが優先されるか（優先度）のリストです。

`api`
: **パイプライン環境変数**: `DD_OP_API_ENABLED`
: **優先度**: `DD_OP_API_ENABLED`
: 構成の例:
: &nbsp;&nbsp;&nbsp;&nbsp;`api`:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`enabled`: `true`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`address`: `"127.0.0.1:8686" # optional`
: 注: `address`の設定はオプションです。これは、API がバインドされるネットワークアドレスです。Worker を Docker コンテナで実行している場合は、`0.0.0.0` にバインドします。そうしないと、API はコンテナの外部に公開されません。
: **説明**: Observability Pipelines Worker API を有効にすると、`tap` または `top` コマンドで Worker のプロセスを確認できるようになります。詳細については、[Worker の実行、タップ、またはトップ][8]を参照してください。[パイプラインを設定する][7]際に提供される Helm チャートを使用している場合、API はすでに有効になっています。そうでない場合は、環境変数 `DD_OP_API_ENABLED` が `/etc/observability-pipelines-worker/bootstrap.yaml` で`true` に設定されていることを確認します。これにより、API が `localhost` とポート `8686` でリッスンするように設定されます。これは `tap` の CLI で想定されているものです。
<br><br>[Liveness プローブと Readiness プローブの有効化](#enable-the-health-check-endpoint-and-the-liveness-and-readiness-probes)を参照して、`/health` エンドポイントを公開する方法を確認してください。

`api_key`
: **パイプライン環境変数**: `DD_API_KEY`
: **優先度**: `DD_API_KEY`
: **説明**: この環境変数用に [Datadog API キー][1] を作成します。[Remote Configuration][6] は、その API キーに対して有効になっている必要があります。Remote Configuration のために実装された安全対策に関する情報は、[Security considerations][11]を参照してください。

`data_dir`
: **パイプライン環境変数**: `DD_OP_DATA_DIR`
: **優先度**: `DD_OP_DATA_DIR`
: **説明**: データディレクトリ (オプション、デフォルトは: `/var/lib/observability-pipelines-worker`)。これは、Observability Pipelines Worker がローカル状態に使用するファイルシステムディレクトリです。

`pipeline_id`
: **パイプライン環境変数**: `DD_OP_PIPELINE_ID`
: **優先度**: `DD_OP_PIPELINE_ID`
: **説明**: この環境変数用に [Observability Pipelines パイプラインID][2] を作成します。

`proxy`
: **パイプライン環境変数**: `DD_PROXY_HTTP`, `DD_PROXY_HTTPS`, `DD_PROXY_NO_PROXY`
: Observability Pipelines Workerのプロキシサーバーを設定します。Workerのプロキシ設定は、[Datadog Agent][4]の場合と同じように機能します。
: **優先度**: 設定はWorkerプロセス全体に適用されます。HTTPプロキシとHTTPSの値は、次の順序で解決されます。
<br>&nbsp;&nbsp;&nbsp;1. `DD_PROXY_HTTP(S)`
<br>&nbsp;&nbsp;&nbsp;2. `HTTP(S)_PROXY`
<br>&nbsp;&nbsp;&nbsp;3. `proxy`
:
: プロキシ設定の例:
: &nbsp;&nbsp;&nbsp;&nbsp;`proxy`:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`enabled`: `true`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`https`: `https://foo.bar:3128`
: **説明**: Observability Pipelines Workerは、Squidなどのフォワードプロキシ経由で外部リクエストをルーティングできます。フォワードプロキシは、Observability Pipelines Workerからのクライアントリクエストをインターネットに転送します。特定のドメイン、ポート、またはプロトコルを禁止または許可するためのWebファイアウォールとして使用できます。フォワードプロキシは通常SSLを終端しないため、リクエストの内容にアクセスできません。これらは、クライアントと宛先の間でパケットをやり取りするだけです。[HTTPトンネル][5]は、フォワードプロキシを介した通信を保護するために使用されます。
: **注**:
: <li style="list-style-type: '- '">このオプションは、Observability Pipelines Worker 2.1以降で使用できます。</li>
: <li style="list-style-type: '- '">Observability Pipelines Workerは、HAProxyやNGINXなどのリバースプロキシ経由で外部リクエストをルーティングすることはできません。</li>
: <li style="list-style-type: '- '"> <code>DD_PROXY_HTTP(S)</code> および <code>HTTP(S)_PROXY</code> Worker が環境変数を解決するには、それらの環境変数が環境内で事前にエクスポートされている必要があります。それらを Worker インストールスクリプトの先頭に追加することはできません。</li>

`secret`
: **パイプライン環境変数**: なし
: **優先度**: 該当なし
: **説明**: Worker をシークレットマネージャーに接続します。構成情報については、[シークレット管理][12]をご覧ください。

`site`
: **パイプライン環境変数**: `DD_SITE`
: **優先度**: `DD_SITE`
: **説明**: Datadog サイト (オプション、デフォルト: `datadoghq.com`)。
: 詳しくは、[サイト入門][3]をご覧ください。

`tags: []`
: **パイプライン環境変数**: `DD_OP_TAGS`
: **優先度**: `DD_OP_TAGS`
: **説明**: 内部メトリクスで報告されるタグであり、Remote ConfigurationデプロイメントのObservability Pipelinesインスタンスをフィルタリングするために使用できます。

`threads`
: **パイプライン環境変数**: `DD_OP_THREADS`
: **優先度**: `DD_OP_THREADS`
: **説明**: 処理に使用するスレッド数 (オプション、デフォルト: 利用可能なコア数)。

## その他の Worker 構成オプション {#other-worker-configuration-options}

`VECTOR_HOSTNAME` 環境変数を使用して一意のホスト名を割り当て、Worker を識別しやすくします。

## ヘルスチェックエンドポイントと、liveness プローブおよび readiness プローブを有効にします {#enable-the-health-check-endpoint-and-the-liveness-and-readiness-probes}

ロードバランサーのチェックを `/health` エンドポイントで構成し、Worker が稼働していることを確認します。

Kubernetesの場合、livenessプローブとreadinessプローブは、[helm chart][9]および[values.yaml][10]ファイルですでに有効になっています。

VMベースなどの他のインストール環境では、`DD_OP_API_ENABLED`を`true`に設定し、`DD_OP_API_ADDRESS`を`0.0.0.0:8686`に設定して、`/health`エンドポイントを公開する必要があります。設定例：

```
api:
  enabled: true
  address: "0.0.0.0:8686"
```

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /ja/getting_started/site/
[4]: /ja/agent/configuration/proxy/?tab=linux#environment-variables
[5]: https://en.wikipedia.org/wiki/HTTP_tunnel
[6]: /ja/remote_configuration
[7]: /ja/observability_pipelines/set_up_pipelines/
[8]: /ja/observability_pipelines/install_the_worker/worker_commands/#run-tap-or-top-the-worker
[9]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L33-L40
[10]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L303-L329
[11]: /ja/remote_configuration/#security-considerations
[12]: /ja/observability_pipelines/configuration/secrets_management/