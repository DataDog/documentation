---
aliases:
- /ja/security/application_security/setup/nginx/kubernetes/
further_reading:
- link: /security/application_security/how-it-works/
  tag: ドキュメント
  text: App and API Protection の仕組み
- link: /security/default_rules/?category=cat-application-security
  tag: ドキュメント
  text: OOTB App and API Protection ルール
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: App and API Protection のトラブルシューティング
title: Kubernetes での NGINX 用 App and API Protection のセットアップ
type: multi-code-lang
---
{{< partial name="app_and_api_protection/callout.html" >}}

# Datadog の Ingress-nginx サポート {#ingress-nginx-support-for-datadog}

[Ingress-nginx][1] は、[Kubernetes ingress controller][2] で、
NGINX をリバースプロキシおよびロードバランサーとして使用します。Kubernetes クラスターでは、セキュリティ上の理由から、外部アクセスはデフォルトで制限されています。
Ingress コントローラーは、ルールを使用して外部トラフィックがサービスにアクセスする方法を制御します。

ingress-nginx コントローラーで [App and API Protection][10] を有効にして、クラスターのエッジでトラフィックを検査および保護できます。Datadog は 2 つのセットアップ方法をサポートしています。

- **自動構成** (推奨): Datadog Cluster Agent が `nginx-datadog` モジュールを ingress-nginx コントローラーの Pod に注入します。
- **手動構成**: Datadog の init コンテナと NGINX の構成スニペットを自分自身で追加します。

## Kubernetes 向け App and API Protection による自動構成 {#automated-configuration-with-app-and-api-protection-for-kubernetes}

<div class="alert alert-info">
  自動構成では、Datadog Cluster Agent が <code>nginx-datadog</code> モジュールを ingress-nginx コントローラーの Pod に注入するため、手動での init コンテナや NGINX スニペットの変更は不要です。これは、ほとんどのユーザーに推奨されるアプローチです。
</div>

### セットアップ {#setup}

このセットアップには以下が必要です。

-  Datadog Cluster Agent `v7.79.0` 以降。
-  Helm メソッドの場合、Datadog Helm チャート `v3.217.0` 以降。
-  Datadog Operator メソッドの場合、Datadog Operator `v1.31.0` 以降。

Datadog Operator または Helm を使用して、自動構成を有効にします。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

`DatadogAgent` リソースの `spec.features.appsec.injector` セクションでインジェクターを構成します。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    appsec:
      injector:
        enabled: true
        # Optional: override the path where the nginx-datadog module is mounted
        # in the controller pod (default: /modules_mount)
        # nginx:
        #   moduleMountPath: /modules_mount
```

構成を適用します。

```bash
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

`values.yaml` に次の内容を追加します。

```yaml
datadog:
  appsec:
    injector:
      enabled: true
      # Optional: override the path where the nginx-datadog module is mounted
      # in the controller pod (default: /modules_mount)
      # nginx:
      #   moduleMountPath: "/modules_mount"
```

Datadog Helm チャート (`v3.217.0` 以降) をインストールまたはアップグレードします。

```bash
helm upgrade -i datadog-agent datadog/datadog -f values.yaml
```

{{% /tab %}}
{{< /tabs >}}

自動構成を有効にした後、Datadog Cluster Agent は次の処理を実行します。

-  ingress-nginx コントローラーの Pod を検出します
-  `nginx-datadog` モジュールをコントローラーに注入します
-  モジュールを読み込み、App and API Protection を適用するようにコントローラーを構成します

この構成を変更することなく、[Remote Configuration][8] を通じて App and API Protection のオン/オフを切り替えることができます。

構成オプションについては、[Kubernetes 向け App and API Protection][9] を参照してください。

### 検証 {#validate}

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="シグナルエクスプローラーとその詳細、および脆弱性エクスプローラーとその詳細を示す動画。" video="true" >}}

## 手動構成 (代替方法) {#manual-configuration-alternative}

ingress-nginx コントローラーは [Kubernetes リソース][3]を通じて管理されます。
基盤となる NGINX 構成のカスタマイズは、通常、想定されているユースケースの範囲を超えて制限されています。しかし、ingress-nginx では、
機能拡張のために追加の NGINX モジュールを追加できます。この機能を `nginx-datadog` で利用するために、Datadog は **init コンテナ** を提供しています。

###  ingress-nginx で `nginx-datadog` を有効にする方法{#how-to-enable-nginx-datadog-in-ingress-nginx}
`nginx-datadog` を ingress-nginx と統合するには、Datadog の [init コンテナ][4]を Pod
仕様に追加し、`nginx-datadog` モジュールを読み込むように NGINX を構成します。

次の Helm 値は、ingress-nginx コントローラーに `nginx-datadog` モジュールを注入する方法を示しています。

```yaml
controller:
  config: 
    main-snippet: "load_module /modules_mount/ngx_http_datadog_module.so;"
  opentelemetry:
    enabled: false
  extraModules:
    - name: nginx-datadog
      image:
        registry: docker.io
        image: datadog/ingress-nginx-injection
        # The tag should match the version of the ingress-nginx controller
        # For example, this will inject the Datadog module for ingress v1.10.0
        # Check <https://hub.docker.com/repository/docker/datadog/ingress-nginx-injection/tags> 
        # for the list of all versions supported.
        tag: "v1.10.0"
        distroless: false
```

`nginx-datadog` を使用して ingress-nginx をセットアップする方法については、[詳細な例][5]を参照してください。

### 仕組み{#how-does-it-work}
init コンテナは、Kubernetes の Pod 内でメインコンテナよりも前に実行される特別なコンテナです。この場合、
Datadog の init コンテナは、`nginx-datadog` モジュールを
メインの ingress-nginx コンテナがアクセスできる共有ボリュームにコピーする役割を担います。

メインの ingress-nginx コントローラーが起動する際、NGINX の構成を `load_module` ディレクティブで更新して
Datadog モジュールを読み込めるようにする必要があります。

<div class="alert alert-danger">
Datadog は、<b>ingress-nginx コントローラーの各バージョン向け</b>に専用の init コンテナを提供しています (開始バージョン: <code>v1.10.0</code>)。これは、<b>各</b> init コンテナが基盤となる NGINX のバージョンと一致している必要があるため非常に重要です。互換性を確認するには、Datadog の init コンテナのバージョンが ingress-nginx のバージョンと一致していることを確認します。
</div>

###  OpenTelemetry との連携 {#interaction-with-opentelemetry}
デフォルトでは、ingress-nginx に OpenTelemetry (oTel) モジュールが含まれており、[ingress-nginx ConfigMap][6] の `enable-opentelemetry: true` 設定を
使用して有効化できます。
ただし、トレースに `nginx-datadog` を使用している場合、oTel モジュールと Datadog モジュールの両方から重複したトレースデータが生成されるのを防ぐため、Datadog では OpenTelemetry の**無効化**
を推奨しています。

OpenTelemetry を無効にするには、`enable-opentelemetry: false` を構成します。

### AppSec の有効化 {#enabling-appsec}

AppSec が提供する WAF を有効にして、セキュリティ上の脅威からアプリケーションを保護できます。そのためには、Helm の値を更新して AppSec の構成を含めます。

```yaml
controller:
  config:
    main-snippet: |
      load_module /modules_mount/ngx_http_datadog_module.so;
      # AppSec thread pool configuration (adjust threads and max_queue as needed)
      thread_pool waf_thread_pool threads=2 max_queue=16;
    http-snippet: |
      # Enable AppSec
      datadog_appsec_enabled on;
      datadog_waf_thread_pool_name waf_thread_pool;
  opentelemetry:
    enabled: false
  extraModules:
    - name: nginx-datadog
      image:
        registry: docker.io
        image: datadog/ingress-nginx-injection
        tag: "v1.10.0"
        distroless: false
```

**主な構成パラメーター:**
- `thread_pool waf_thread_pool`: AppSec 処理専用のスレッドプールを作成します。トラフィックパターンと利用可能なリソースに基づいて、`threads` と `max_queue` を調整します。
- `datadog_appsec_enabled on`: 脅威の検知と保護のために Application Security モジュールを有効にします。これは省略可能です。その場合、Remote Configuration を通じて AppSec を有効化または無効化できます。
- `datadog_waf_thread_pool_name waf_thread_pool`: 一致するリクエストを、構成されたスレッドプールに関連付けます。

その他の構成可能なオプションについては、[構成リファレンス][7]を参照してください。

<div class="alert alert-info">
本番環境では、スレッドプールのパフォーマンスを監視し、トラフィック量とレイテンシーの要件に基づいて番環境では、スレッドプールのパフォーマンスを監視し、 <code>threads</code> および <code>max_queue</code> パラメーターを調整します。
</div>

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/kubernetes/ingress-nginx
[2]: https://kubernetes.io/docs/concepts/services-networking/ingress/
[3]: https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/
[4]: https://hub.docker.com/r/datadog/ingress-nginx-injection
[5]: https://github.com/DataDog/nginx-datadog/tree/master/example/ingress-nginx
[6]: https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/#enable-opentelemetry
[7]: https://github.com/DataDog/nginx-datadog/blob/master/doc/API.md
[8]: /ja/agent/remote_config/?tab=helm#enabling-remote-configuration
[9]: /ja/containers/kubernetes/appsec
[10]: /ja/security/application_security/