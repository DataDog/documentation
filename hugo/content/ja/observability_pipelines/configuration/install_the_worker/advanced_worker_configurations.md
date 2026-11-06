---
aliases:
- /ja/observability_pipelines/setup_opw/
- /ja/observability_pipelines/advanced_configurations/
description: Worker のブートストラップオプションおよびその他の構成オプションについて説明します。
disable_toc: false
further_reading:
- link: /observability_pipelines/sensitive_data_redaction/
  tag: ドキュメント
  text: Observability Pipelines でデータをマスキングする
- link: /observability_pipelines/configuration/update_existing_pipelines/
  tag: ドキュメント
  text: 既存のパイプラインを更新する
title: 高度な Worker 構成
---
## 概要 {#overview}

このドキュメントでは、Observability Pipelines Worker の[ブートストラップ](#bootstrap-options)、[その他の Worker 構成オプション](#other-worker-configuration-options)、および[ヘルスチェックエンドポイントと liveness プローブおよび readiness プローブを有効にする方法](#enable-the-health-check-endpoint-and-the-liveness-and-readiness-probes)について説明します。

## ブートストラップオプション{#bootstrap-options}

<div class="alert alert-danger">パイプラインで指定されたすべての構成ファイルパスは、 <code>/DD_OP_DATA_DIR/config</code>の配下に配置する必要があります。
OPW の実行中にその場所にあるファイルを変更すると、問題が発生する可能性があります。
</div>

パイプラインをセットアップする前に、インフラストラクチャー内で Observability Pipelines Worker をブートストラップします。これらの環境変数は、パイプラインの環境変数とは別のものです。関連するディレクトリとファイルの場所は次のとおりです

- デフォルトのデータディレクトリ: `/var/lib/observability-pipelines-worker`
- ブートストラップファイル: `/etc/observability-pipelines-worker/bootstrap.yaml`
- 環境変数ファイル: `/etc/default/observability-pipelines-worker`

**注**: `DD_OP_DATA_DIR` は、1 つの Observability Pipelines Worker のみが所有できます。複数の Worker がある場合は、それぞれに一意のデータディレクトリを使用する必要があります。

ブートストラップオプションを設定するには、次のいずれかを実行します。
- 環境変数を使用します。
- `bootstrap.yaml` を作成し、`--bootstrap-config /path/to/bootstrap.yaml` を使用して Worker インスタンスを開始します。

以下は、ブートストラップオプション、それらに関連するパイプライン環境変数、および両方が設定されている場合にどちらの値が優先されるか (優先度) を示すリストです。

`api`
: **パイプライン環境変数**: `DD_OP_API_ENABLED`
: **優先度**: `DD_OP_API_ENABLED`
: 構成の例:
: &nbsp;&nbsp;&nbsp;&nbsp;`api`:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`enabled`: `true`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`address`: `"127.0.0.1:8686" # optional`
: 注: `address` の設定はオプションです。これは、API がバインドされるネットワークアドレスです。Worker を Docker コンテナで実行している場合は、`0.0.0.0` にバインドしてください。そうしないと、API はコンテナの外部に公開されません。
: **説明**: Observability Pipelines Worker API を有効にすると、`tap` または `top` コマンドで Worker のプロセスを確認できます。詳細については、「[Worker の run、tap、または top][8]」を参照してください。[パイプラインを設定する][7] 際に提供される Helm チャートを使用している場合、API はすでに有効になっています。使用していない場合は、環境変数 `DD_OP_API_ENABLED` が `/etc/observability-pipelines-worker/bootstrap.yaml` で`true` に設定されていることを確認してください。これにより、API が `localhost` とポート `8686` でリッスンするように設定されます。これは `tap` の CLI で想定されている設定です。
`/health` エンドポイントを公開する方法については、「<br><br>[liveness プローブおよび readiness プローブを有効にする](#enable-the-health-check-endpoint-and-the-liveness-and-readiness-probes)」を参照してください。

`api_key`
: **パイプライン環境変数**: `DD_API_KEY`
: **優先度**: `DD_API_KEY`
: **説明**: この環境変数用に [Datadog API キー][1] を作成します。[Remote Configuration][6] を API キーで有効にする必要があります。Remote Configuration のために実装されているセキュリティ対策については、「[セキュリティに関する考慮事項][11]」を参照してください。

`data_dir`
: **パイプライン環境変数**: `DD_OP_DATA_DIR`
: **優先度**: `DD_OP_DATA_DIR`
: **説明**: データディレクトリ (オプション、デフォルトは : `/var/lib/observability-pipelines-worker`)。これは、Observability Pipelines Worker がローカル状態に使用するファイルシステムディレクトリです。

`pipeline_id`
: **パイプライン環境変数**: `DD_OP_PIPELINE_ID`
: **優先度**: `DD_OP_PIPELINE_ID`
: **説明**: この環境変数用に [Observability Pipelines パイプライン ID][2] を作成します。

`proxy`
: **パイプライン環境変数**: `DD_PROXY_HTTP`、`DD_PROXY_HTTPS`、`DD_PROXY_NO_PROXY`
: Observability Pipelines Worker のプロキシサーバーを設定します。Worker のプロキシ設定は、[Datadog Agent][4] の場合と同じように機能します。
: **優先度**: 設定は Worker プロセス全体に適用されます。HTTP プロキシと HTTPS の値は、次の順序で解決されます。
<br>&nbsp;&nbsp;&nbsp;1. `DD_PROXY_HTTP(S)`
<br>&nbsp;&nbsp;&nbsp;2. `HTTP(S)_PROXY`
<br>&nbsp;&nbsp;&nbsp;3. `proxy`
:
: プロキシ設定の例:
: &nbsp;&nbsp;&nbsp;&nbsp;`proxy`:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`enabled`: `true`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`https`: `https://foo.bar:3128`
: **説明**: Observability Pipelines Worker は、Squid などのフォワードプロキシ経由で外部リクエストをルーティングできます。フォワードプロキシは、Observability Pipelines Worker からのクライアントリクエストをインターネットに転送します。特定のドメイン、ポート、またはプロトコルを禁止または許可するための Web ファイアウォールとして使用できます。通常、フォワードプロキシは SSL を終端しないため、リクエストの内容にアクセスできません。クライアントと宛先の間でパケットをやり取りするだけです。フォワードプロキシを介した通信を保護するために、[HTTP トンネル][5] が使用されます。
: **注**:
: <li style="list-style-type: '- '">このオプションは、Observability Pipelines Worker 2.1 以降で使用できます。</li>
: <li style="list-style-type: '- '">Observability Pipelines Worker は、HAProxy や NGINX などのリバースプロキシ経由で外部リクエストをルーティングすることはできません。</li>
: <li style="list-style-type: '- '">Worker が <code>DD_PROXY_HTTP(S)</code> および <code>HTTP(S)_PROXY</code> 環境変数を解決するには、それらの環境変数が環境に事前にエクスポートされている必要があります。それらを Worker インストールスクリプトの先頭に付加して追加することはできません。</li>

`secret`
: **パイプライン環境変数**: なし
: **優先度**: なし
: **説明**: Worker をシークレットマネージャーに接続します。構成情報については、「[シークレット管理][12]」を参照してください。

`site`
: **パイプライン環境変数**: `DD_SITE`
: **優先度**: `DD_SITE`
: **説明**: Datadog サイト (オプション、デフォルト: `datadoghq.com`)。
: 詳しくは、[サイトの概要][3] を参照してください。

`tags: []`
: **パイプライン環境変数**: `DD_OP_TAGS`
: **優先度**: `DD_OP_TAGS`
: **説明**: 内部メトリクスとともに報告されるタグ。Remote Configuration のデプロイメント用の Observability Pipelines インスタンスをフィルタリングするために使用できます。

`threads`
: **パイプライン環境変数**: `DD_OP_THREADS`
: **優先度**: `DD_OP_THREADS`
: **説明**: 処理に使用するスレッドの数 (オプション、デフォルト: 利用可能なコア数)。

## その他の Worker 構成オプション {#other-worker-configuration-options}

`VECTOR_HOSTNAME` 環境変数を使用して、一意のホスト名を割り当て、Worker を識別できるようにします。

## ヘルスチェックエンドポイントと、liveness プローブおよび readiness プローブを有効にする {#enable-the-health-check-endpoint-and-the-liveness-and-readiness-probes}

`/health` エンドポイントを使用してロードバランサーのヘルスチェックを構成し、Worker が稼働していることを確認します。Worker の前にロードバランサーを設定する際のその他の推奨事項については、「[ロードバランサーの構成][13]」を参照してください。

Kubernetes の場合、liveness プローブと readiness プローブは、[Helm チャート][9] および [values.yaml][10] ファイルでデフォルトで有効になっています。これらのプローブは、`/health` エンドポイントの代わりに Worker API ポート上の TCP ソケットをチェックします。

VM ベースなど他のインストール環境では、`DD_OP_API_ENABLED` エンドポイントを公開するために、`true` を `DD_OP_API_ADDRESS` に設定し、`0.0.0.0:8686` を`/health` に設定する必要があります。構成の例:

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
[13]: /ja/observability_pipelines/scaling_and_performance/best_practices_for_scaling_observability_pipelines/#load-balancer-configurations