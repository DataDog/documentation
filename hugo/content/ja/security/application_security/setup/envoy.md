---
aliases:
- /ja/security/application_security/threats/setup/threat_detection/envoy
- /ja/security/application_security/threats_detection/envoy
- /ja/security/application_security/setup/threat_detection/envoy
- /ja/security/application_security/setup/standalone/envoy
code_lang: envoy
code_lang_weight: 50
further_reading:
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/envoyproxy/go-control-plane/cmd/serviceextensions
  tag: ソースコード
  text: Envoy インテグレーションのソースコード
- link: /security/default_rules/?category=cat-application-security
  tag: ドキュメント
  text: OOTB App and API Protection ルール
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: App and API Protection のトラブルシューティング
title: Envoy で App and API Protection を有効にする
---
Envoy プロキシで App and API Protection を有効にできます。Datadog Envoy インテグレーションは、脅威の検出とブロックをサポートしています。

## 前提条件{#prerequisites}

- [Datadog Agent][1] が、アプリケーションのオペレーティングシステムやコンテナ、クラウド、または仮想環境にインストールされ、構成されています。
- [Remote Configuration を使用して Agent を構成し][2]、Datadog UI で攻撃者をブロックしてください。

## 脅威検知の有効化 {#enabling-threat-detection}
### 始める {#get-started}

App and API Protection Envoy インテグレーションは、Envoy 外部処理フィルターを使用します。

1. Datadog External Processor Docker イメージを使用して新しいコンテナをデプロイします。このイメージは [Datadog GitHub Registry][5] で入手できます。

   このサービスは、Envoy がリクエストとレスポンスを App and API Protection で分析させるために通信を行う gRPC サーバーです。

   Datadog External Processor は、いくつかの設定を公開しています。
   | 環境変数                      | デフォルト値       | 説明                                                                                                                              |
   |-------------------------------------------|---------------------|------------------------------------------------------------------------------------------------------------------------------------------|
   | `DD_SERVICE_EXTENSION_HOST`               | `0.0.0.0`           | gRPC サーバーのリスニングアドレス。                                                                                                          |
   | `DD_SERVICE_EXTENSION_PORT`               | `443`               | gRPC サーバーのポート。                                                                                                                       |
   | `DD_SERVICE_EXTENSION_HEALTHCHECK_PORT`   | `80`                | ヘルスチェック用の HTTP サーバーポート。                                                                                                     |
   | `DD_APPSEC_BODY_PARSING_SIZE_LIMIT`       | `0`                 | 処理されるボディの最大サイズ（バイト単位）。`0` に設定されている場合、ボディは処理されません。推奨値は `10000000` (10MB) です。(ボディ処理を完全に有効にするには、External Processing フィルター設定で `allow_mode_override` オプションも設定する必要があります) |
   | `DD_SERVICE_EXTENSION_OBSERVABILITY_MODE` | `false`             | 非同期分析を有効にします。これにより、ブロッキング機能も無効になります。（オブザーバビリティモードを完全に有効にするには、このオプションを外部処理フィルターの構成でも設定する必要があります）|
   | `DD_SERVICE`                              | `serviceextensions` | Datadog UI に表示されるサービス名。                                                                                                   |

   以下の環境変数を使用して、外部プロセッサからトレースを受信するように Datadog Agent を構成してください。

   | 環境変数                   | デフォルト値 | 説明                                                                      |
   |----------------------------------------|---------------|----------------------------------------------------------------------------------|
   | `DD_AGENT_HOST`                        | `localhost`   | Datadog Agent のホスト名または IP。                                           |
   | `DD_TRACE_AGENT_PORT`                  | `8126`        | トレース収集用の Datadog Agent のポート。                                 |

2. Envoy 構成を更新して [外部処理フィルター][3] を `http_filters` リストに追加し、対応する gRPC クラスターを `clusters` セクションで定義してください。たとえば、以下のとおりです。

#### HTTP フィルターセクション

   ```yaml
   http_filters:
     # This filter should be the first filter in the filter chain
     - name: envoy.filters.http.ext_proc
       typed_config:
         "@type": type.googleapis.com/envoy.extensions.filters.http.ext_proc.v3.ExternalProcessor
         grpc_service:
           envoy_grpc:
             cluster_name: datadog_aap_ext_proc_cluster

           ## Mandatory: Correctly show the service as an Envoy proxy in the UI.
           initial_metadata:
             - key: x-datadog-envoy-integration
               value: '1'

           ## A timeout configuration for the grpc connection exist but is not useful in our case.
           ## This timeout is for all the request lifetime. A timeout on the route is preferred.
           #timeout: 0s

         ## Optional: Enable fail open mode. Default is false.
         ## Normally, if the external processor fails or times out, the filter fails and Envoy
         ## returns a 5xx error to the downstream client. Setting this to true allows requests
         ## to continue without error if a failure occurs.
         failure_mode_allow: true # It won't cause 5xx error if an error occurs.

         ## Mandatory: Only enable the request and response header modes.
         ## If you want to enable body processing, please see the section below.
         processing_mode:
           request_header_mode: SEND
           response_header_mode: SEND

         ## Optional for headers analysis only but **mandatory** for body processing.
         ## The external processor can dynamically override the processing mode as needed instructing
         ## Envoy to forward request and response bodies to the external processor. Body processing is
         ## enabled when DD_APPSEC_BODY_PARSING_SIZE_LIMIT is set on the external processor container.
         allow_mode_override: true

         ## Optional: Set a timeout by processing message. Default is 200ms.
         ## There is a maxium of 2 messages per requests with headers only and 4 messages maximum
         ## with body processing enabled.
         ## Note: This timeout also includes the data communication between Envoy and the external processor.
         ## Optional: When the body processing is enabled, the timeout should be adjusted to accommodate
         ## the additional possible processing time. Larger payloads will require a longer timeout. 
         #message_timeout: 200ms

         ## Optional: Enable asynchronous mode analysis. Default is false.
         ## This mode will disable all blocking capabilities. The external processor should also be
         ## configured with the DD_SERVICE_EXTENSION_OBSERVABILITY_MODE environment variable.
         ## Beware, there is no flow control implemented in Envoy
         ## (cf https://www.envoyproxy.io/docs/envoy/latest/api-v3/extensions/filters/http/ext_proc/v3/ext_proc.proto#envoy-v3-api-field-extensions-filters-http-ext-proc-v3-externalprocessor-observability-mode)
         #observability_mode: true
         ## Optional: When in asynchronous mode, the message_timeout is not used. This deferred
         ## timeout starts when the http request is finished, to let the External Processor
         ## process all processing messages. Default is 5s.
         #deferred_close_timeout: 5s

     # ... other filters
   ```

#### クラスターセクション

   ```yaml
   clusters:
       # ... other clusters
       - name: datadog_aap_ext_proc_cluster
         type: STRICT_DNS
         lb_policy: ROUND_ROBIN
         http2_protocol_options: {}
         transport_socket:
           name: envoy.transport_sockets.tls
           typed_config:
             "@type": type.googleapis.com/envoy.extensions.transport_sockets.tls.v3.UpstreamTlsContext
             sni: "localhost"
         load_assignment:
           cluster_name: datadog_aap_ext_proc_cluster
           endpoints:
             - lb_endpoints:
                 - endpoint:
                     address:
                       socket_address:
                         address: 12.0.0.1 # Replace with the host address of the Datadog External Processor docker image (configured in the next step)
                         port_value: 443
   ```

   **注**: 提供されている構成例を注意深く読み、ご自身のインフラストラクチャーと環境に合わせて調整してください。利用可能なその他の構成オプションについては、[Envoy 外部プロセッサのドキュメント][4]を参照してください。

3. 検証。

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="シグナルエクスプローラーとその詳細、および脆弱性エクスプローラーとその詳細を示すビデオ。" video="true" >}}

## Datadog Go Tracer と Envoy のインテグレーション {#datadog-go-tracer-and-envoy-integration}

外部プロセッサは [Datadog Go Tracer][6] 上に構築されており、トレーサーのすべての環境変数を継承します。[Go SDK の構成][7]および[アプリと API 保護ライブラリの構成][8]を参照してください。

<div class="alert alert-info">
  <strong>注:</strong> Datadog 外部プロセッサは Datadog Go Tracer 上に構築されているため、通常はトレーサーと同じリリースプロセスに従い、その Docker イメージには対応するトレーサーのバージョンがタグ付けされます（例:<code>v2.2.2</code>).場合によっては、公式のトレーサーリリースの間に早期リリースバージョンが公開されることがあり、これらのイメージには次のようなサフィックスがタグ付けされます。 <code>-docker.1</code>.
</div>

## 制限事項 {#limitations}

Envoy インテグレーションには、以下の制限があります。

* Datadog External Processor イメージバージョン `v2.2.2` 以降を使用する場合、リクエストボディおよびレスポンスボディの検査がサポートされます。

Envoy インテグレーションの互換性に関する詳細については、[Envoy インテグレーション互換性ページ][9]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /ja/tracing/guide/remote_config
[3]: https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_filters/ext_proc_filter
[4]: https://www.envoyproxy.io/docs/envoy/latest/api-v3/extensions/filters/http/ext_proc/v3/ext_proc.proto
[5]: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fservice-extensions-callout
[6]: https://github.com/DataDog/dd-trace-go
[7]: /ja/tracing/trace_collection/library_config/go/
[8]: /ja/security/application_security/policies/library_configuration/
[9]: /ja/security/application_security/setup/compatibility/envoy