---
aliases:
- /ja/agent/kubernetes/appsec
- /ja/security/application_security/setup/kubernetes/appsec-injector
description: Kubernetes Ingress プロキシおよびゲートウェイで、App and API Protection を自動的に有効化する
further_reading:
- link: /containers/kubernetes/apm/
  tag: ドキュメント
  text: アプリケーショントレースの収集
- link: /containers/kubernetes/log/
  tag: ドキュメント
  text: アプリケーションログの収集
- link: /security/application_security/setup/kubernetes/envoy-gateway
  tag: ドキュメント
  text: Envoy Gateway 向け App and API Protection
- link: /security/application_security/setup/kubernetes/istio
  tag: ドキュメント
  text: Istio 向け App and API Protection
- link: /security/application_security/setup/nginx/ingress-controller
  tag: ドキュメント
  text: ingress-nginx 向け App and API Protection
- link: /security/default_rules/?category=cat-application-security
  tag: ドキュメント
  text: OOTB App and API Protection ルール
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: App and API Protection のトラブルシューティング
site_support_id: containers_kubernetes_appsec
title: Kubernetes 向け App and API Protection
---
このページでは、Kubernetes 向け [App and API Protection][11] をセットアップして、サポートされている Kubernetes Ingress プロキシおよびゲートウェイを自動的に構成し、インフラストラクチャーのエッジで API の検出、脅威検知、インラインブロッキングを実行する方法について説明します。

## 概要 {#overview}

Kubernetes 向け App and API Protection は、Kubernetes クラスター内のサポートされている Ingress プロキシおよびゲートウェイを自動的に構成し、Application Security のモニタリングを有効にします。これにより、手動でのプロキシ設定が不要になり、個々のサービスを変更したり、アプリケーションフリート全体にトレーサーをデプロイしたりすることなく、API 全体を網羅するセキュリティカバレッジが提供されます。

### 自動構成はどのように行われますか。{#what-performs-the-automatic-configuration}

Kubernetes 向け App and API Protection は、Datadog Cluster Agent 内で動作する Kubernetes コントローラーを使用し、以下の処理を行います。
- ****クラスター内のサポートされているプロキシを**自動的に検出する**
- **プロキシを設定**して、外部の Application Security プロセッサー経由でトラフィックをルーティングする
- ****Ingress レイヤーを通過するすべてのトラフィックに対する**脅威検知を有効にする**
- ****Helm による一元的な設定で**運用を簡素化する**

### サポートされているプロキシ {#supported-proxies}

サポートされているプロキシのリストおよびプロキシ固有のセットアップ手順については、「[セットアップページ][10]」を参照してください。

## 制限事項 {#limitations}

### サイドカーモード {#sidecar-mode}
- Datadog Cluster Agent 7.80.2 以降が必要
- 各ゲートウェイ Pod が独自のプロセッサーインスタンスを実行するため Pod ごとのリソース使用量が増加する

### 外部モード {#external-mode}
- Datadog Cluster Agent 7.80.2 以降が必要
- Security プロセッサーは手動でデプロイおよびスケーリングする必要がある
- デプロイされたサービスには、適切なネットワークポリシーが必要になる場合がある
  - サービスポート上のプロキシ Pod から
  - トレース用の Datadog Agent へ

### プロキシの互換性 {#proxy-compatibility}
- プロキシバージョンの互換性については、「[互換性ドキュメント][8]」を参照してください。

## 前提条件 {#prerequisites}

Kubernetes 向け App and API Protection を有効にする前に、以下が準備されていることを確認してください。

- 実行中の Kubernetes クラスター (バージョン 1.20 以降)
- [Datadog Cluster Agent 7.80.2 以降][1]がクラスターにインストールおよび設定されていること
- 1 つ以上の[サポートされているプロキシ][10]がインストールされていること
- Datadog UI から攻撃者をブロックできるように[Remote Configuration][4]が有効になっていること

## 仕組み {#how-it-works}

Kubernetes 向け App and API Protection は、2 つのデプロイモードをサポートしています。

- **サイドカーモード** (デフォルト): Application Security プロセッサーが、各ゲートウェイ Pod に直接埋め込まれたサイドカーコンテナとして実行されます。個別のプロセッサーデプロイは不要であり、プロセッサーはゲートウェイ Pod に合わせて自動的にスケーリングされます。
- **外部モード**: 単一の集中型 Application Security プロセッサーデプロイが、クラスター内のすべてのゲートウェイトラフィックを処理します。クラスター全体で 1 つの共有プロセッサーを管理したい場合は、このモードを使用します。

デフォルトのサイドカーモードを設定するには、「[サイドカーモードの設定](#set-up-sidecar-mode)」を参照してください。代わりに集中型プロセッサーをデプロイするには、「[外部モードの設定](#set-up-external-mode)」を参照してください。

## サイドカーモードの設定 {#set-up-sidecar-mode}

サイドカーモードでは、セキュリティプロセッサーは各ゲートウェイ Pod に埋め込まれるコンテナとして実行されます。Cluster Agent が自動的にインジェクションを処理するため、個別のプロセッサーデプロイメントやサービスは必要ありません。

### サイドカーモードを使用する場合{#when-to-use-sidecar-mode}

- 個別のプロセッサーデプロイメントやサービスの管理を避けたい場合
- 各ゲートウェイ Pod にプロセッサーを配置したい場合

### セットアップ {#setup}

{{< tabs >}}
{{% tab "Helm" %}}

`values.yaml` に次の内容を追加します。インジェクターがプロセッサーのデプロイを自動的に処理するため、`processor.service.*` 値は必要ありません。

```yaml
datadog:
  appsec:
    injector:
      enabled: true
      # mode defaults to "sidecar" when omitted
```

Datadog Helm チャート (バージョン 3.153 以降) をインストールまたはアップグレードします。

```bash
helm upgrade -i datadog-agent datadog/datadog -f values.yaml
```

{{% /tab %}}
{{% tab "Datadog Operator" %}}

このオプションには、Datadog Operator バージョン 1.27.1 以降が必要です。

`DatadogAgent` リソースにアノテーションを追加します。サイドカーモードがデフォルトであるため、インジェクターを有効にするだけで十分です。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  annotations:
    agent.datadoghq.com/appsec.injector.enabled: "true"
```

コンフィギュレーションを適用します。

```bash
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{< /tabs >}}

### サイドカー構成リファレンス{#sidecar-configuration-reference}

すべてのサイドカーパラメーターは、`datadog.appsec.injector.sidecar` の下にネストされた Helm 値として、または `DatadogAgent` アノテーション (Datadog Operator バージョン 1.27.1 以降) として指定可能です。

`sidecar.image`
: **Datadog Operator アノテーション**: `agent.datadoghq.com/appsec.sidecar.image`
: **型**: String
: **既定値**: `ghcr.io/datadog/dd-trace-go/service-extensions-callout`
: **説明**: サイドカーコンテナイメージ

`sidecar.imageTag`
: **Datadog Operator アノテーション**: `agent.datadoghq.com/appsec.sidecar.image_tag`
: **型**: String
: **既定値**: `v2.6.0`
: **説明**: サイドカーコンテナイメージタグ

`sidecar.port`
: **Datadog Operator アノテーション**: `agent.datadoghq.com/appsec.sidecar.port`
: **型**: Integer
: **既定値**: `8080`
: **説明**: サイドカープロセッサーの gRPC リスニングポート

`sidecar.healthPort`
: **Datadog Operator アノテーション**: `agent.datadoghq.com/appsec.sidecar.health_port`
: **型**: Integer
: **既定値**: `8081`
: **説明**: サイドカープロセッサーのヘルスチェック用ポート

`sidecar.bodyParsingSizeLimit`
: **Datadog Operator アノテーション**: `agent.datadoghq.com/appsec.sidecar.body_parsing_size_limit`
: **型**: Integer
: **既定値**: `0`
: **説明**: 処理するリクエストボディの最大サイズ (バイト単位)。`0` はボディ処理を無効にします。ボディパースを完全に無効にするには `-1` を使用します。

`sidecar.resources.requests.cpu`
: **Datadog Operator アノテーション**: `agent.datadoghq.com/appsec.sidecar.resources.requests.cpu`
: **型**: String
: **デフォルト**: `10m`
: **説明**: サイドカーコンテナの CPU リクエスト

`sidecar.resources.requests.memory`
: **Datadog Operator アノテーション**: `agent.datadoghq.com/appsec.sidecar.resources.requests.memory`
: **型**: String
: **デフォルト**: `128Mi`
: **説明**: サイドカーコンテナのメモリリクエスト

`sidecar.resources.limits.cpu`
: **Datadog Operator アノテーション**: `agent.datadoghq.com/appsec.sidecar.resources.limits.cpu`
: **型**: String
: **デフォルト**: `""`
: **説明**: サイドカーコンテナの CPU 制限 (オプション)

`sidecar.resources.limits.memory`
: **Datadog Operator アノテーション**: `agent.datadoghq.com/appsec.sidecar.resources.limits.memory`
: **型**: String
: **デフォルト**: `""`
: **説明**: サイドカーコンテナのメモリ制限 (オプション)

## 外部モードのセットアップ {#set-up-external-mode}

外部モードでは、クラスター内のすべてのゲートウェイのトラフィックを処理する、単一の集中型 Application Security プロセッサーをデプロイします。Cluster Agent は、サポートされているプロキシを自動的に構成し、トラフィックをこのプロセッサーにルーティングします。

### アーキテクチャ {#architecture}

-  **Security プロセッサーのデプロイメント**: 集中型アプリケーションセキュリティプロセッサーを、関連付けられたサービスを持つ Kubernetes Deployment としてデプロイします。
-  **自動プロキシ検出**: コントローラーは、Kubernetes インフォーマーを使用して、クラスター内のサポートされているプロキシリソースを監視します。
-  **自動構成**: プロキシが検出されると、コントローラーはセキュリティプロセッサーサービスにトラフィックをルーティングするために必要なプロキシ構成を作成します。
-  **トラフィック処理**: ゲートウェイは、セキュリティ分析のために、Kubernetes サービスを通じてトラフィックをセキュリティプロセッサーにルーティングします。

### メリット {#benefits}

- **リソース効率**: 単一の共有プロセッサーがすべてのゲートウェイからのトラフィックを処理します
- **一元管理**: 監視、スケーリング、設定を単一のデプロイメントで管理可能
- **Infrastructure-as-Code**: Helm 値による設定管理
- **非侵襲的**: アプリケーションコードの変更は不要
- **スケーラブル**: 追加の構成なしで新しいゲートウェイを追加可能

### ステップ 1: セキュリティプロセッサーをデプロイする {#step-1-deploy-the-security-processor}

ゲートウェイから転送されたトラフィックを分析するセキュリティプロセッサーサービスをデプロイします。プロキシ固有のデプロイメントの詳細については、お使いのプロキシの「[セットアップドキュメント][10]」を参照してください。

デプロイメントの例:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: datadog-aap-extproc-deployment
  namespace: datadog
spec:
  replicas: 2
  selector:
    matchLabels:
      app: datadog-aap-extproc
  template:
    metadata:
      labels:
        app: datadog-aap-extproc
    spec:
      containers:
      - name: datadog-aap-extproc-container
        image: ghcr.io/datadog/dd-trace-go/service-extensions-callout:v2.4.0
        ports:
        - name: grpc
          containerPort: 443
        - name: health
          containerPort: 80
        env:
        # Use the address of the datadog agent service in your cluster
        - name: DD_AGENT_HOST
          value: "datadog-agent.datadog.svc.cluster.local"

        - name: DD_SERVICE_EXTENSION_TLS
          value: "false"
        readinessProbe:
          httpGet:
            path: /
            port: health
          initialDelaySeconds: 5
          periodSeconds: 10
        livenessProbe:
          httpGet:
            path: /
            port: health
          initialDelaySeconds: 15
          periodSeconds: 20
---
apiVersion: v1
kind: Service
metadata:
  name: datadog-aap-extproc-service
  namespace: datadog
spec:
  ports:
  - name: grpc
    port: 443
    targetPort: grpc
  selector:
    app: datadog-aap-extproc
  type: ClusterIP
```

マニフェストを適用します。

```bash
kubectl apply -f datadog-aap-extproc-service.yaml
```

### ステップ 2: 自動構成を有効にする {#step-2-enable-automatic-configuration}

Helm または Datadog Operator を使用して、Datadog Cluster Agent をセキュリティプロセッサーサービスに向けます。

**注:** プロセッサーサービス名 (`datadog-aap-extproc-service`) は、ステップ 1 でデプロイしたサービスと一致している必要があります。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

このオプションには、Datadog Operator バージョン 1.27.1 以降が必要です。

`DatadogAgent` リソースにアノテーションを追加します。サービス名のアノテーションは必須であり、ご使用のセキュリティプロセッサーサービスと一致している必要があります。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  annotations:
    agent.datadoghq.com/appsec.injector.enabled: "true"
    agent.datadoghq.com/appsec.injector.mode: "external"
    agent.datadoghq.com/appsec.injector.processor.service.name: "datadog-aap-extproc-service"  # Required: must match your security processor service name
    agent.datadoghq.com/appsec.injector.processor.service.namespace: "datadog"
```

コンフィギュレーションを適用します。

```bash
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

Helm 値を使用して、Kubernetes 向け App and API Protection を構成します。`values.yaml` に次の内容を追加します。

```yaml
datadog:
  appsec:
    injector:
      enabled: true
      mode: "external"
      processor:
        service:
          name: datadog-aap-extproc-service  # Required: must match your security processor service name
          namespace: datadog                 # Must match the namespace where the service is deployed
```

Datadog Helm チャート (バージョン 3.153 以降) をインストールまたはアップグレードします。

```bash
helm upgrade -i datadog-agent datadog/datadog -f values.yaml
```

{{% /tab %}}
{{< /tabs >}}

### ステップ 3: インストールを検証する {#step-3-verify-the-installation}

Cluster Agent がプロキシを検出したことをチェックします。

```bash
kubectl logs -n datadog deployment/datadog-cluster-agent | grep appsec
```

#### プロキシ構成を検証する {#verify-proxy-configuration}

コントローラーがご利用のプロキシのプロキシ構成リソースを作成したことを確認します。プロキシ固有の検証コマンドについては、お使いのプロキシの「[セットアップドキュメント][10]」を参照してください。

Datadog Cluster Agent は、クラスター内で実行された成功または失敗した各オペレーションに対してイベントを生成します。

#### トラフィックの処理をテストする{#test-traffic-processing}

ゲートウェイ経由でリクエストを送信し、Datadog [App and API Protection][5] UI に表示されることを確認します。

1. Datadog で [Security > Application Security][5] に移動します。
2. ゲートウェイのトラフィックに関連するセキュリティシグナルを探します。
3. 脅威検知が有効であることを確認します。

## 構成リファレンス{#configuration-reference}

### 自動構成オプション{#automatic-configuration-options}

`enabled`
: **Datadog Operator アノテーション**: `agent.datadoghq.com/appsec.injector.enabled`
: **型**: Boolean
: **デフォルト**: `false`
: **説明**: インテグレーションの有効化または無効化

`mode`
: **Datadog Operator アノテーション**: `agent.datadoghq.com/appsec.injector.mode`
: **型**: String
: **デフォルト**: `""`空の場合、デフォルトはサイドカー
: **説明**: インジェクションモード : `"sidecar"` または `"external"`

`autoDetect`
: **Datadog Operator アノテーション**: `agent.datadoghq.com/appsec.injector.autoDetect`
: **型**: Boolean
: **デフォルト**: `true`
: **説明**: サポートされているプロキシを自動的に検出して構成する

`proxies`
: **Datadog Operator アノテーション**: `agent.datadoghq.com/appsec.injector.proxies`
: **型**: JSON 配列
: **デフォルト**: `[]`
: **説明**: 設定するプロキシタイプの手動リスト。有効な値については、「[セットアップページ][10]」を参照してください。

`processor.service.name`
: **Datadog Operator アノテーション**: `agent.datadoghq.com/appsec.injector.processor.service.name`
: **型**: String
: **デフォルト**: なし
: **説明**: **必須。**セキュリティプロセッサー Kubernetes サービスの名前

`processor.service.namespace`
: **Datadog Operator アノテーション**: `agent.datadoghq.com/appsec.injector.processor.service.namespace`
: **型**: String
: **デフォルト**: Cluster Agent が実行されている名前空間がデフォルト
: **説明**: セキュリティプロセッサーサービスがデプロイされている名前空間

`processor.address`
: **Datadog Operator アノテーション**: `agent.datadoghq.com/appsec.injector.processor.address`
: **型**: String
: **デフォルト**: `{service.name}.{service.namespace}.svc`
: **説明**: 完全なサービスアドレスのオーバーライド

`processor.port`
: **Datadog Operator アノテーション**: `agent.datadoghq.com/appsec.injector.processor.port`
: **型**: Integer
: **デフォルト**: `443`
: **説明**: セキュリティプロセッサーサービスのポート

### 外部モードからのアップグレード{#upgrading-from-external-mode}

外部モードを使用していた以前のバージョンからアップグレードする場合、デフォルトモードはサイドカーに変更されています。外部モードの使用を継続するには、Helm 値で `mode: "external"` を明示的に設定します。

```yaml
datadog:
  appsec:
    injector:
      enabled: true
      mode: "external"
      processor:
        service:
          name: datadog-aap-extproc-service
          namespace: datadog
```

### 特定のリソースを除外する{#opting-out-specific-resources}

ラベルを追加することで、特定の Gateway または GatewayClass リソースを自動構成から除外できます。

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: my-gateway
  namespace: my-namespace
  labels:
    appsec.datadoghq.com/enabled: "false"  # Exclude this gateway from automatic configuration
spec:
  # ... gateway configuration
```

`appsec.datadoghq.com/enabled: "false"` ラベルが付いたリソースは無視されます。これは、次のような場合に役立ちます。
- 特定のゲートウェイを手動で構成する
- テストのために App and API Protection を一時的に無効にする
- 特定のゲートウェイをセキュリティ監視から除外する

**注**: デフォルトでは、すべてのリソースが含まれます。ラベルが明示的に `"false"` に設定されているリソースのみが除外されます。

## トラブルシューティング {#troubleshooting}

すべてのエラーは Kubernetes イベントとしてログに記録されます。計測対象とする Gateway または GatewayClass でイベントをチェックしてください。

### 自動構成でプロキシが検出されない{#automatic-configuration-not-detecting-proxies}

**症状**: プロキシ構成リソースが作成されません。

**解決策**:
- `autoDetect`が `true` に設定されているか、またはプロキシが手動で指定されているかをチェックする
- Cluster Agent のログでプロキシ検出メッセージを確認する
- プロキシがインストールされており、期待される Kubernetes リソース (Gateway、GatewayClass) が存在することを確認する
- `proxies` パラメーターを使用してプロキシタイプを手動で指定してみる

### プロキシ構成が作成されていません {#proxy-configuration-not-created}

**症状**: コントローラーは実行されていますが、構成リソースが見つかりません。

**解決策**:
- Cluster Agent のログで RBAC 権限エラーをチェックする
- Cluster Agent のサービスアカウントにプロキシ構成リソースを作成する権限があることを確認する
- プロセッサーサービスが存在し、アクセス可能であることを確認する
- 競合する既存のポリシーやフィルターがないかチェックする

### トラフィックが処理されません {#traffic-not-being-processed}

**症状**: Datadog UI にセキュリティイベントが表示されません。

**解決策**:
- セキュリティプロセッサーのデプロイメントが実行中であることを確認する: `kubectl get pods -n datadog -l app=datadog-aap-extproc`
- リバースプロキシのログで、この設定に関連する警告ログがないか確認する
- プロセッサーのログでコネクションエラーをチェックします: `kubectl logs -n datadog -l app=datadog-aap-extproc`
- プロセッサーサービスが正しく設定され、解決可能であることを確認する
- ゲートウェイ Pod からプロセッサーサービスへの接続をテストする
- Datadog Agent で [Remote Configuration][4] が有効になっていることを確認する

### Security プロセッサーのコネクションの問題{#security-processor-connection-issues}

**症状**: ゲートウェイがセキュリティプロセッサーに到達できません。

**解決策**:
- プロセッサーのサービス名と名前空間が設定と一致していることを確認する
- 名前空間をまたぐトラフィックをブロックしている NetworkPolicy ルールがないかチェックする
- ゲートウェイ Pod からの DNS 解決をテストする: `nslookup datadog-aap-extproc-service.datadog.svc.cluster.local`
- プロセッサーのポート設定がサービス定義と一致していることを確認する

### RBAC 権限エラー {#rbac-permission-errors}

**症状**: Cluster Agent のログに権限拒否エラーが表示されます。

**解決策**:
- Cluster Agent の ClusterRole に以下の権限が含まれていることを確認する:
  - `gateway.networking.k8s.io/gateways`
  - `gateway.networking.k8s.io/gatewayclasses`
- ClusterRoleBinding が正しいサービスアカウントを参照していることをチェックする
- 最新バージョンの Datadog Helm Chart または Operator を使用していることを確認する

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/containers/kubernetes/installation/
[4]: /ja/agent/remote_config/?tab=helm#enabling-remote-configuration
[5]: https://app.datadoghq.com/security/appsec
[8]: /ja/security/application_security/setup/compatibility/
[10]: /ja/security/application_security/setup/kubernetes/
[11]: /ja/security/application_security/