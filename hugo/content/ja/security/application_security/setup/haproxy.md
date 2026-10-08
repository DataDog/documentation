---
code_lang: haproxy
code_lang_weight: 40
further_reading:
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/haproxy/stream-processing-offload/cmd/spoa
  tag: ソースコード
  text: HAProxy インテグレーションのソースコード
- link: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fhaproxy-spoa
  tag: コンテナイメージ
  text: HAProxy SPOA Docker イメージ
- link: /security/default_rules/?category=cat-application-security
  tag: ドキュメント
  text: OOTB App and API Protection ルール
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: App and API Protection のトラブルシューティング
title: HAProxy 向け App and API Protection の有効化
---
{{< callout url="https://www.datadoghq.com/product-preview/haproxy-integration/">}}
HAProxy 向け App and API Protection はプレビュー版です。サインアップするには、[<strong>Request Access</strong>] をクリックし、フォームに入力してください。
{{< /callout >}}

HAProxy インスタンスで App and API Protection を有効にできます。Datadog の HAProxy インテグレーションは、HAProxy の Stream Processing Offload Engine (SPOE) を活用して、インフラストラクチャーのエッジでトラフィックを検査し、脅威検出して保護します。

## 前提条件{#prerequisites}

- [Datadog Agent][1] がインストールされ、お使いの環境 (ホスト、コンテナ、またはオーケストレーター) に合わせて構成されていること。
- 攻撃者をブロックするために、Datadog UI で[Remote Configuration を使用して Agent を構成している][2]こと。

## 脅威検知の有効化{#enabling-threat-detection}

### 使い始める{#get-started}

App and API Protection HAProxy インテグレーションは、HAProxy の [Stream Processing Offload Engine][3] (SPOE) を使用して、Datadog Stream Processing Offload Agent (SPOA) を呼び出します。SPOA はリクエストとレスポンスを分析します。

HAProxy で App and API Protection を有効にするには、次の手順を実行します。
1. Datadog HAProxy SPOA コンテナをデプロイします。
2. HAProxy 構成ファイルを更新して、SPOA とインテグレーションします。

### SPOA コンテナ{#spoa-container}

[Datadog GitHub Container Registry][4] で利用可能な Datadog HAProxy SPOA イメージをデプロイします。SPOA は HAProxy からの SPOE 接続をリッスンし、セキュリティイベントを Datadog Agent に送信します。

SPOA コンテナに関する利用可能な構成オプションについては、「[構成](#configuration)」を参照してください。

### HAProxy 構成ファイル {#haproxy-configuration-files}

必要なすべての HAProxy 構成ファイルは、[リポジトリフォルダ][8]で入手できます。構成の更新や変更に関する情報については、「[構成の変更履歴][9]」を参照してください。

セットアップには以下のファイルが必要です。

- `spoe.cfg`: SPOE エンジンのメイン構成ファイル。
- `global-config.cfg`: `global` セクションに含める設定行。
- `frontend-config.cfg`: 保護対象とする各 `frontend` の先頭に追加する設定行。
- `backend.cfg`: SPOE エンジンが使用する SPOA バックエンドを定義するファイル。
- `datadog_aap_blocking_response.lua`: ブロック応答用の Lua スクリプト。

各ファイルのセットアップに関するガイダンスを以下に示します。

#### spoe.cfg {#spoecfg}

`spoe.cfg` ファイルは、SPOE エージェントとその構成を宣言する役割を担います。このファイルはディスク上、たとえば `/usr/local/etc/haproxy/spoe.cfg` などに保存する必要があります。このファイルの場所は `global` セクション内で設定される `DD_SPOA_SPOA_CONF_FILE` 環境変数を介して指定されます。

このファイルには独自の変更を加えないことが重要です。

#### global-config.cfg {#global-configcfg}

`global-config.cfg` ファイルは、必要な Lua スクリプトを読み込み、インテグレーションに必要な変数を設定します。このファイルの内容は、`global` 構成ファイルの `haproxy.cfg` セクションに組み込む必要があります。

環境に合わせて値を調整できます。各設定の詳細については、ファイル内のコメントを確認してください。

#### frontend-config.cfg {#frontend-configcfg}

`frontend-config.cfg` ファイルは、SPOE フィルターをフロントエンドにアタッチします。このセクションは、保護対象とする各 `frontend` セクションの先頭に、他のフィルターやルーターよりも前に配置する必要があります。

このセクションにより、以下の処理が確実に行われます。
- リクエストイベントとレスポンスイベントの SPOA への送信
- 該当する場合の Datadog トレースヘッダーの挿入
- ブロック処理のための Lua ヘルパーの条件付き呼び出し

構成のこの部分には、独自の変更を加えないことが重要です。

#### backend.cfg {#backendcfg}

`backend.cfg` ファイルは、SPOE エンジンおよびヘルスチェックで使用される `spoa-backend` を定義します。この設定は、`haproxy.cfg` ファイルの末尾付近に追加する必要があります。

`server spoa1 <host>:<port>` の行を修正して、デプロイされた SPOA コンテナのインスタンスを参照するようにしてください。

<div class="alert alert-info">
  <strong>注:</strong> 高可用性と冗長性を確保するために、サーバー行を追加することで複数の SPOA エージェントサーバーを設定できます <code>server</code> (例:<code>server spoa1 ...</code>、<code>server spoa2 ...</code>、など)。HAProxy は、これらの SPOA エージェント間で自動的に負荷分散とフェイルオーバーを行い、1 つのエージェントが利用できなくなった場合でも継続的な保護を保証します。
</div>

#### datadog_aap_blocking_response.lua {#datadog-aap-blocking-responselua}

`datadog_aap_blocking_response.lua` スクリプトは、SPOA が HAProxy にリクエストのブロックを指示した際に、カスタムブロック応答を送信する役割を担います。このスクリプトは `/etc/haproxy/lua/datadog_aap_blocking_response.lua` のような場所に保存し、`global` セクションの `lua-load` ディレクティブでこのパスを参照する必要があります。

このファイルには独自の変更を加えないことが重要です。

<div class="alert alert-info">
  <strong>注:</strong> この Lua スクリプトは、HAProxy によって処理されるすべてのリクエストで呼び出されるわけではありません。これは、App and API Protection によってリクエストがブロックされた場合にのみ呼び出されます。この設計により、すべてのリクエストに対して Lua コードを実行するオーバーヘッドを回避し、最適なパフォーマンスを確保します。
</div>

### 検証 {#validation}

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="シグナルエクスプローラーとその詳細、および脆弱性エクスプローラーとその詳細を示す動画。" video="true" >}}

## 構成{#configuration}

Datadog HAProxy SPOA コンテナは、以下の設定をサポートしています。

| 環境変数                | デフォルト値 | 説明                                                                                                   |
| ----------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------- |
| `DD_HAPROXY_SPOA_HOST`              | `0.0.0.0`     | SPOA と HTTP ヘルスサーバーがリッスンするホスト。                                                        |
| `DD_HAPROXY_SPOA_PORT`              | `3000`        | HAProxy との通信を受け入れる SPOA が使用するポート。                                               |
| `DD_HAPROXY_SPOA_HEALTHCHECK_PORT`  | `3080`        | ヘルスチェック用の HTTP サーバーが使用するポート。                                                             |
| `DD_APPSEC_BODY_PARSING_SIZE_LIMIT` | `0`           | 処理するボディの最大サイズ (バイト単位)。`0` の場合、ボディは処理されません。推奨: `10000000` (10 MB)|
| `DD_SERVICE`                        | `spoa`        | Datadog UI に表示されるサービス名。                                                                        |

以下の環境変数を使用して、SPOA が Datadog Agent にトレースを送信するように構成します。

| 環境変数  | デフォルト値 | 説明                      |
| --------------------- | ------------- | -------------------------------- |
| `DD_AGENT_HOST`       | `localhost`   | 実行中の Datadog Agent のホスト。|
| `DD_TRACE_AGENT_PORT` | `8126`        | 実行中の Datadog Agent のポート。|

### Datadog Go Tracer と HAProxy のインテグレーション{#datadog-go-tracer-and-haproxy-integration}

HAProxy インテグレーションは [Datadog Go Tracer][5] 上に構築されており、この Tracer のすべての環境変数を継承します。「[Go SDK の構成][6]」および「[App and API Protection ライブラリの構成][7]」を参照してください。

<div class="alert alert-info">
  <strong>注:</strong> Datadog SPOA は Datadog Go Tracer 上に構築されているため、通常は Tracer と同じリリースプロセスに従います。また、その Docker イメージには対応する Tracer のバージョンがタグ付けされます (例:<code>v2.4.0</code>)。場合によっては、Tracer の公式リリースの合間に早期リリースバージョンが公開されることがあり、これらのイメージには次のようなサフィックスがタグ付けされます ( <code>-docker.1</code>)。
</div> <br><br>

## 構成を最新の状態に保つ {#keeping-your-configuration-up-to-date}

HAProxy の SPOE インテグレーションにはランタイムコンポーネント (SPOA コンテナイメージ) と HAProxy 構成の両方が含まれるため、アップグレードの際にはその両方で変更が必要になる場合があります。

更新状況の確認や追跡に役立つ、HAProxy 構成の参照用ファイルおよび関連する変更履歴が用意されています。
- [HAProxy 構成の参照用ディレクトリ][8] (SPOE エンジン、グローバル設定、フロントエンド/バックエンドスニペット、Lua)
- [構成変更ログ][9]

### 推奨されるアップグレード手順 {#recommended-upgrade-practices}

- SPOA イメージを特定のバージョンに固定し、構成変更ログを確認した上で計画的にアップグレードしてください。
- Datadog の設定を一元管理し、簡単に更新できるようにしてください。
- リファレンス設定と変更履歴を追跡し、アップグレード時には自身の設定とそれらを比較してください。

## 制限事項 {#limitations}

HAProxy インテグレーションには、以下の制限事項があります。

- 非同期 (オブザーバビリティ) モードは現在サポートされていません。

HAProxy インテグレーションの互換性に関する詳細については、「[HAProxy インテグレーションの互換性ページ][10]」を参照してください。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /ja/remote_configuration/
[3]: https://www.haproxy.com/blog/extending-haproxy-with-the-stream-processing-offload-engine
[4]: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fhaproxy-spoa
[5]: https://github.com/DataDog/dd-trace-go
[6]: /ja/tracing/trace_collection/library_config/go/
[7]: /ja/security/application_security/policies/library_configuration/
[8]: https://github.com/DataDog/dd-trace-go/tree/main/contrib/haproxy/stream-processing-offload/cmd/spoa/haproxyconf/
[9]: https://github.com/DataDog/dd-trace-go/blob/main/contrib/haproxy/stream-processing-offload/cmd/spoa/haproxyconf/CHANGELOG.md
[10]: /ja/security/application_security/setup/compatibility/haproxy