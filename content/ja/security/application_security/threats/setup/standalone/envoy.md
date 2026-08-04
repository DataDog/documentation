---
code_lang: envoy
code_lang_weight: 50
further_reading:
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/envoyproxy/go-control-plane/cmd/serviceextensions
  tag: ソースコード
  text: Envoy インテグレーションのソース コード
- link: /security/default_rules/?category=cat-application-security
  tag: ドキュメント
  text: OOTB App & API Protection Rules
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: Troubleshooting App & API Protection
title: Envoy 向け Application & API Protection の有効化
type: multi-code-lang
---

{{< callout url="#" btn_hidden="true" header="Envoy 向け Application & API Protection はプレビュー中です" >}}
Envoy 向け Application & API Protection のプレビューを試すには、以下のセットアップ手順に従ってください。
{{< /callout >}}

Envoy プロキシでアプリケーション セキュリティを有効にできます。Datadog Envoy インテグレーションは、脅威の検出とブロックをサポートしています。

## 前提条件

- [Datadog Agent][1] が、アプリケーションのオペレーティング システム、コンテナ、クラウド、または仮想環境にインストールおよび構成されている。
- Datadog UI を使用して、攻撃者をブロックできるように [Remote Configuration で Agent を構成します][2]。

## Enabling Application & API Protection
### 開始する

Application & API Protection Envoy インテグレーションは、Envoy の外部処理フィルターを使用します。

1. [外部処理フィルター][3]を使用するように **Envoy を構成**します。
例:

   ```yaml
   http_filters:
     # ... other filters
     - name: envoy.filters.http.ext_proc
       typed_config:
         "@type": type.googleapis.com/envoy.extensions.filters.http.ext_proc.v3.ExternalProcessor
         config:
           grpc_service:
             envoy_grpc:
               cluster_name: datadog_ext_proc_cluster
               timeout: 1s

   clusters:
       # ... other clusters
       - name: datadog_ext_proc_cluster
         type: STRICT_DNS
         lb_policy: ROUND_ROBIN
         http2_protocol_options: {}
         transport_socket:
           name: envoy.transport_sockets.tls
           typed_config:
             "@type": type.googleapis.com/envoy.extensions.transport_sockets.tls.v3.UpstreamTlsContext
         load_assignment:
           cluster_name: datadog_ext_proc_cluster
           endpoints:
             - lb_endpoints:
                 - endpoint:
                     address:
                       socket_address:
                         address: Your Datadog image host from step 2
                         port_value: 443
   ```

    **注**: 上記の例の `Your Datadog image host from step 2` は、Datadog Envoy Docker イメージが実行されているホストに置き換える必要があります。このホストは次の手順で構成します。

    利用可能なその他の構成オプションは、[Envoy 外部プロセッサーのドキュメント][4]に記載されています。

2. **Datadog Envoy Docker イメージを使って新しいコンテナを起動します。**このイメージは、[Datadog GitHub レジストリ][5]で入手できます。

   Docker イメージは、特に Envoy インテグレーション向けに一部の設定を公開しています。
   | 環境変数                   | デフォルト値   | 説明                                                       |
   |----------------------------------------|-----------------|-------------------------------------------------------------------|
   | `DD_SERVICE_EXTENSION_HOST`            | `0.0.0.0`       | gRPC サーバーのリスニング アドレス。                                    |
   | `DD_SERVICE_EXTENSION_PORT`            | `443`           | gRPC サーバーのポート。                                                 |
   | `DD_SERVICE_EXTENSION_HEALTHCHECK_PORT`| `80`            | 健全性チェックに使用する HTTP サーバーのポート。                               |

   以下の環境変数を使用して、インテグレーションからトレースを受信するように Datadog Agent を構成します。
   | 環境変数                   | デフォルト値 | 説明                                                           |
   |----------------------------------------|---------------|-----------------------------------------------------------------------|
   | `DD_AGENT_HOST`                        | `localhost`   | Datadog Agent が実行されているホスト名。                         |
   | `DD_TRACE_AGENT_PORT`                  | `8126`        | トレース収集用の Datadog Agent のポート。                       |

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}

## Datadog Go Tracer と Envoy インテグレーション

  <div class="alert alert-warning">
    <strong>注:</strong> Application & API Protection Envoy インテグレーションは、Datadog Go Tracer を基盤に構築されています。トレーサーと同じリリース プロセスに従い、その Docker イメージには対応するトレーサーのバージョンがタグ付けされています。
  </div>

  Envoy インテグレーションは [Datadog Go Tracer][6] を使用し、トレーサーからすべての環境変数を継承します。詳細については、[Go トレーシング ライブラリの構成][7] と [Application & API Protection ライブラリの構成][8] を参照してください。

## 制限

Envoy バージョン `1.71.0` で利用可能な機能には、以下の重要な制限があります。

* リクエスト本文は、コンテンツ タイプに関係なく検査されません。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[3]: https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_filters/ext_proc_filter
[4]: https://www.envoyproxy.io/docs/envoy/latest/api-v3/extensions/filters/http/ext_proc/v3/ext_proc.proto#extensions-filters-http-ext-proc-v3-externalprocessor
[5]: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fservice-extensions-callout
[6]: https://github.com/DataDog/dd-trace-go
[7]: https://docs.datadoghq.com/ja/tracing/trace_collection/library_config/go/
[8]: https://docs.datadoghq.com/ja/security/application_security/threats/library_configuration/