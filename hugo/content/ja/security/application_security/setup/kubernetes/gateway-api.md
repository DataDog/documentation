---
aliases:
- /ja/security/application_security/threats/setup/threat_detection/gateway_api
- /ja/security/application_security/threats_detection/gateway_api
- /ja/security/application_security/setup/gateway-api
further_reading:
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/k8s.io/gateway-api
  tag: ソースコード
  text: Gateway API インテグレーションのソースコード
- link: /security/default_rules/?category=cat-application-security
  tag: ドキュメント
  text: OOTB App and API Protection ルール
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: App and API Protection のトラブルシューティング
title: Kubernetes で AAP for Gateway API を有効にする
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection は、Datadog Government サイト US1-FED でプレビュー版として提供されています。
</div>
{{< /site-region >}}

<div class="alert alert-danger">
  AAP for Gateway API は試験機能です。試してみるには以下の手順に従ってください。
</div>

## 概要 {#overview}

**Datadog AppSec Gateway API Request Mirror** は、Kubernetes Gateway API の **RequestMirror** 機能を活用してトラフィックを Datadog App & API Protection エンドポイントに複製することで、アプリケーションセキュリティを強化します。これにより、プライマリリクエストフローに影響を与えることなく、アプリケーションレベルの潜在的な攻撃のリアルタイム検知と分析や、API エンドポイントの検出などが可能になります。

## 前提条件 {#prerequisites}

- [Gateway API CRD がインストールされた][9] Kubernetes クラスター。
- [Gateway API RequestMirror フィルターと互換性のあるコントローラー][10]。
- [Go][11] 1.23 以降がローカルマシンにインストールされていること。

## 脅威検知の有効化 {#enabling-threat-detection}

### インストール {#installation}

[Kubernetes インストールガイド][12]に従って 1. **Datadog Agent を Kubernetes クラスターにデプロイ**します。

APM をトランスポートとして使用して [AppSec の受信ペイロードをサポート][13]するように 2. **Datadog Agent を構成**します。

3. **AppSec Gateway API Request Mirror** を任意の名前空間 (例: `datadog`) にサービスとともにデプロイします。

   ```bash
   kubectl apply -f https://raw.githubusercontent.com/DataDog/dd-trace-go/refs/heads/main/contrib/k8s.io/gateway-api/cmd/request-mirror/deployment.yml
   ```

4. **デプロイメントを検証します**。

   ```bash
   kubectl get pods -l app=request-mirror
   ```

5. **Gateway リソースにパッチを適用**して、デプロイメントがある名前空間へのアクセスを許可します。

   ```bash
   git clone https://github.com/DataDog/dd-trace-go.git
   cd dd-trace-go
   go run ./contrib/k8s.io/gateway-api/cmd/patch-gateways
   ```

   パッチ適用動作をカスタマイズするためのオプションを確認するには `-help` フラグを使用します。

6. **HTTPRoute リソースにパッチを適用**して、トラフィックをサービスにリダイレクトします。

   ```bash
   go run ./contrib/k8s.io/gateway-api/cmd/patch-httproutes
   ```

   このコマンドは、すべての名前空間のすべての `HTTPRoute` リソースに [RequestMirror][14] フィルターを追加します。構成オプションを確認するには `-help` フラグを使用します。

   **注**: このコマンドを定期的に実行することで、新しく作成された `HTTPRoute` リソースに `RequestMirror` フィルターが自動的に含まれるようになります。結果として得られるパッチを、`HTTPRoute` リソースが変更される CI/CD パイプラインに追加することを検討してください。

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="シグナルエクスプローラーとその詳細、および脆弱性エクスプローラーとその詳細を示すビデオ。" video="true" >}}

## 構成 {#configuration}

### 環境変数 {#environment-variables}

Gateway API Request Mirror のデプロイメントは、以下の環境変数を使用して構成できます。

| 環境変数                 | デフォルト値 | 説明                                                                                                                |
|--------------------------------------|---------------|----------------------------------------------------------------------------------------------------------------------------|
| `DD_REQUEST_MIRROR_LISTEN_ADDR`      | `:8080`       | ミラーリングされたリクエストを受信するためにリクエストミラーサービスがリッスンするアドレスとポート                                   |
| `DD_REQUEST_MIRROR_HEALTHCHECK_ADDR` | `:8081`       | ヘルスチェックエンドポイントが提供されるアドレスとポート                                                                 |

以下の環境変数を使用して、インテグレーションからトレースを受信するように Datadog Agent を構成します。

| 環境変数                   | デフォルト値 | 説明                                                           |
|----------------------------------------|---------------|-----------------------------------------------------------------------|
| `DD_AGENT_HOST`                        | `localhost`   | Datadog Agent が実行されているホスト名                          |
| `DD_TRACE_AGENT_PORT`                  | `8126`        | トレース収集用の Datadog Agent のポート                        |

### デプロイメントの例 {#deployment-example}

デフォルトのデプロイメントによって作成されるサービスは、ミラーリングされたリクエストをポート 8080 でリッスンし、ポート 8081 でヘルスチェックエンドポイントを公開します。

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: request-mirror
  labels:
    app.kubernetes.io/component: request-mirror
    app.kubernetes.io/name: datadog
spec:
  strategy:
    type: RollingUpdate
  selector:
    matchLabels:
      app: request-mirror
  template:
    metadata:
      labels:
        app: request-mirror
    spec:
      containers:
        - name: request-mirror
          image: ghcr.io/datadog/dd-trace-go/request-mirror:latest
          ports:
            - containerPort: 8080
              name: http
          livenessProbe:
            httpGet:
              path: /
              port: 8081
          readinessProbe:
            httpGet:
              path: /
              port: 8081
          env:
            - name: DD_AGENT_HOST
              value: "datadog-agent"  # Adjust to your Agent service name
---
apiVersion: v1
kind: Service
metadata:
  name: request-mirror
spec:
  selector:
    app: request-mirror
  ports:
    - name: http
      port: 8080
      targetPort: 8080
```

## Datadog Go Tracer と Gateway API のインテグレーション {#datadog-go-tracer-and-gateway-api-integration}

<div class="alert alert-info">
  AAP Gateway API インテグレーションは、Datadog Go Tracer 上に構築されています。このトレーサーと同じリリースプロセスに従っており、対応するトレーサーのバージョンが Docker イメージにタグ付けされています。
</div>

Gateway API インテグレーションは [Datadog Go Tracer][6] を使用し、このトレーサーのすべての環境変数を継承します。詳細については、[Go SDK の構成][7]および [AAP ライブラリの構成][8]を参照してください。

## APM トレーシングの有効化 {#enabling-apm-tracing}

デフォルトでは、リクエストミラーのトレースは Datadog の APM 製品を有効にしません。APM トレーシング機能を使用せずにApp and API Protection を使用する場合、これはデフォルトの動作です。

APM トレーシングを有効にするには、リクエストミラーのデプロイメントで環境変数 `DD_APM_TRACING_ENABLED=true` を設定してください。

App and API Protection の使用中に APM トレーシングを明示的に無効にするには、次の手順を実行します。

1. デプロイメントの構成時に、`DD_APPSEC_ENABLED=true` 環境変数に加えて `DD_APM_TRACING_ENABLED=false` 環境変数も使用します。
2. この構成により、Datadog に送信される APM データの量が、App and API Protection 製品で必要とされる最小限の量に削減されます。

詳細については、[スタンドアロンの App and API Protection][15] を参照してください。

## 制限事項 {#limitations}

Gateway API インテグレーションには、以下の制限があります。

- HTTP レスポンスにアクセスできません
- リクエストのブロックを適用できません
- HTTP リクエストボディの分析では JSON のみがサポートされています

より詳細な分析やその他の AAP 機能が必要な場合は、他の AAP インテグレーションを試してみることを検討してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /ja/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[6]: https://github.com/DataDog/dd-trace-go
[7]: /ja/tracing/trace_collection/library_config/go/
[8]: /ja/security/application_security/policies/library_configuration/
[9]: https://gateway-api.sigs.k8s.io/guides/#installing-gateway-api
[10]: https://gateway-api.sigs.k8s.io/implementations
[11]: https://go.dev/doc/install
[12]: /ja/containers/kubernetes/installation/
[13]: /ja/tracing/guide/setting_up_apm_with_kubernetes_service/
[14]: https://gateway-api.sigs.k8s.io/guides/http-request-mirroring/
[15]: /ja/security/application_security/setup/standalone/