---
aliases:
- /ja/tracing/proxies/nginx
- /ja/tracing/nginx/
- /ja/tracing/setup/nginx/
- /ja/tracing/proxies
- /ja/tracing/setup_overview/nginx/
- /ja/tracing/setup_overview/proxy_setup/
code_lang: nginx
code_lang_weight: 50
further_reading:
- link: https://www.nginx.com/
  tag: 外部サイト
  text: NGINX ウェブサイト
- link: https://kubernetes.github.io/ingress-nginx/user-guide/third-party-addons/opentelemetry/
  tag: 外部サイト
  text: Ingress-NGINX コントローラー用 OpenTelemetry
title: NGINX のインスツルメンテーション
type: multi-code-lang
---
Datadog APM は、以下の構成で NGINX をサポートしています。
- Datadog モジュールによって提供されるトレースで、プロキシとして動作する NGINX。
- Kubernetes の Ingress コントローラーとしての NGINX。
- [OpenResty](#openresty-with-datadog-module) (NGINX 上に構築され、OpenResty 専用ビルドの Datadog モジュールからトレースが提供される)

## NGINX と Datadog モジュールの組み合わせ{#nginx-with-datadog-module}
Datadog は分散型トレーシングのために NGINX モジュールを提供しています。

### モジュールのインストール{#module-installation}
Datadog NGINX モジュールをインストールするには、以下の手順に従ってください。
1. [最新の nginx-datadog GitHub リリース][1]から適切なバージョンをダウンロードします。
2. 特定の NGINX バージョンと CPU アーキテクチャに対応する tarball を選択します。

各リリースには、NGINX バージョンと CPU アーキテクチャの組み合わせごとに 2 つの tarball が含まれています。
メインの tarball には、Datadog NGINX モジュールである `ngx_http_datadog_module.so` という単一のファイルが含まれています。もう 1 つはデバッグシンボルであり、これはオプションです。

簡便のため、以下のスクリプトは最新リリースのモジュールのみをダウンロードします。

```bash
get_latest_release() {
  curl --silent "https://api.github.com/repos/$1/releases/latest" | jq --raw-output .tag_name
}

get_architecture() {
  case "$(uname -m)" in
    aarch64|arm64)
      echo "arm64"
      ;;
    x86_64|amd64)
      echo "amd64"
      ;;
    *)
      echo ""
      ;;
  esac
}

ARCH=$(get_architecture)

if [ -z "$ARCH" ]; then
    echo 1>&2 "ERROR: Architecture $(uname -m) is not supported."
    exit 1
fi

NGINX_VERSION="1.29.0"
RELEASE_TAG=$(get_latest_release DataDog/nginx-datadog)
TARBALL="ngx_http_datadog_module-${ARCH}-${NGINX_VERSION}.so.tgz"

curl -Lo ${TARBALL} "https://github.com/DataDog/nginx-datadog/releases/download/${RELEASE_TAG}/${TARBALL}"
```

ダウンロードした tarball から `ngx_http_datadog_module.so` ファイルを `tar` を使用して抽出し、通常 `/usr/lib/nginx/modules` にある NGINX モジュールディレクトリに配置します。

### NGINX 構成と Datadog モジュールの組み合わせ{#nginx-configuration-with-datadog-module}
NGINX 構成の一番上のセクションで、Datadog モジュールをロードします。

```nginx
load_module modules/ngx_http_datadog_module.so;
```

デフォルトの構成ではローカルの Datadog Agent に接続し、
すべての NGINX ロケーションのトレースを生成します。Datadog モジュールの [API ドキュメント][4]に記載されている専用の
`datadog_*` ディレクティブを使用してカスタム構成を指定します。

たとえば、次の NGINX 構成ではサービス名を
`usage-internal-nginx` に、サンプリングレートを 10% に設定します。

```nginx
load_module modules/ngx_http_datadog_module.so;

http {
  datadog_service_name usage-internal-nginx;
  datadog_sample_rate 0.1;

  # servers, locations...
}
```

## Ingress-NGINX Controller for Kubernetes {#ingress-nginx-controller-for-kubernetes}

Datadog は、Kubernetes における Ingress-NGINX コントローラーの監視をサポートしています。
コントローラーのバージョンと要件に基づいて、以下のインスツルメンテーション方法から選択します。

- [Datadog の機能を使用する v1.10.0+](#controller-v1100-using-datadogs-features)。
- [OpenTelemetry を使用する v1.10.0+](#controller-v1100-using-opentelemetry)。
- [v1.9.0 以前 ](#controller-v190-and-older)。

### Datadog の機能を使用するコントローラー v1.10.0+ {#controller-v1100-using-datadogs-features}

このインスツルメンテーション方法は [nginx-datadog][6] を使用し、Kubernetes の [init-container][7] メカニズムを活用して、
Ingress-NGINX Controller インスタンス内にモジュールをインストールします。

Datadog モジュールを使用して Ingress-NGINX **v1.10.0+** をインスツルメントするには、以下の手順に従います。

{{< tabs >}}
{{% tab "Kubernetes" %}}

**1. Ingress-NGINX バージョンの確認**<br>
Ingress-NGINX Controller のバージョンを確認し、対応する Datadog init-container が利用可能であることを確認します。
起動時の問題を回避するため、init-container のバージョン ([datadog/ingress-nginx-injection][1]) はコントローラーのバージョンと完全に一致している必要があります。
たとえば、Ingress-NGINX v1.11.3 を実行している場合は、[datadog/ingress-nginx-injection:v1.11.3][2] が必要です。

<div class="alert alert-info"> <code>v1.11.3</code> のようなバージョンタグはローリングタグです。タグが同じままでも、基盤となる Datadog NGINX モジュールが更新される可能性があります。正確なバージョンを固定するには、イメージをダイジェストで参照します (たとえば、<code>datadog/ingress-nginx-injection@sha256:...</code>)。</div>

**2. コントローラーの Pod 仕様の変更**<br>
コントローラーの Pod 仕様を更新して init-container を含め、Datadog Agent ホスト環境変数を構成します。


{{< highlight yaml "hl_lines=4-10 13-16 19-22 25-26" >}}
    spec:
      template:
        spec:
          initContainers:
            - name: init-datadog
              image: datadog/ingress-nginx-injection:<MY_INGRESS_NGINX_VERSION>
              command: ['/datadog/init_module.sh', '/opt/datadog-modules']
              volumeMounts:
                - name: nginx-module
                  mountPath: /opt/datadog-modules
          containers:
            - name: controller
              image: registry.k8s.io/ingress-nginx/controller:<MY_INGRESS_NGINX_VERSION>
              volumeMounts:
                - name: nginx-module
                  mountPath: /opt/datadog-modules
              env:
                - ...
                - name: DD_AGENT_HOST
                  valueFrom:
                    fieldRef:
                      fieldPath: status.hostIP
          volumes:
            - ...
            - name: nginx-module
              emptyDir: {}
{{< /highlight >}}

**注**: Datadog Agent にアクセスする別の方法については、[Kubernetes インストールガイド][1]を参照してください。

**3. Ingress-NGINX の構成** <br>
Datadog モジュールを読み込むために `ConfigMap` を作成または変更します。

{{< highlight yaml "hl_lines=5 7-8" >}}
    kind: ConfigMap
    apiVersion: v1
    ...
    data:
      enable-opentelemetry: "false"
      error-log-level: notice
      main-snippet: |
        load_module /opt/datadog-modules/ngx_http_datadog_module.so;
{{< /highlight >}}

**4. ConfigMap の適用** <br>
更新された `ConfigMap` を適用し、Datadog モジュールが正しく読み込まれるようにします。

この構成により、Datadog モジュールが読み込まれ、受信リクエストをトレースする準備が整います。

[1]: https://hub.docker.com/r/datadog/ingress-nginx-injection
[2]: https://hub.docker.com/layers/datadog/ingress-nginx-injection/v1.11.3/images/sha256-19ea2874d8a4ebbe4de0bf08faeb84c755cd71f1e8740ce2d145c5cf954a33a1
{{% /tab %}}

{{% tab "Helm" %}}
**1. Ingress-NGINX バージョンの確認**<br>
Ingress-NGINX Controller のバージョンを確認し、対応する Datadog init-container が利用可能であることを確認します。
起動時の問題を回避するため、init-container のバージョン ([datadog/ingress-nginx-injection][1]) はコントローラーのバージョンと完全に一致している必要があります。
たとえば、Ingress-NGINX v1.11.3 を実行している場合は、[datadog/ingress-nginx-injection:v1.11.3][2] が必要です。

<div class="alert alert-info"> <code>v1.11.3</code> のようなバージョンタグはローリングタグです。タグが同じままでも、基盤となる Datadog NGINX モジュールが更新される可能性があります。正確なバージョンを固定するには、イメージをダイジェストで参照します (たとえば、<code>datadog/ingress-nginx-injection@sha256:...</code>)。</div>

**2. Helm チャートの値をオーバーライド**<br>
Ingress-NGINX Helm チャートをカスタマイズして必要な Datadog モジュールを読み込むには、次の構成の YAML ファイルを作成するか、既存のファイルを変更します。

{{< code-block lang="yaml" filename="values.yaml" >}}
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
  extraEnvs:
    - name: DD_AGENT_HOST
      valueFrom:
        fieldRef:
          fieldPath: status.hostIP
{{< /code-block >}}

**3. デプロイ**<br>
`-f` フラグを使用して Helm リリースをインストールまたはアップグレードし、前のステップで作成したカスタム値を適用します。

```shell
helm install my-release ingress-nginx/ingress-nginx -f values.yaml
```

[1]: https://hub.docker.com/r/datadog/ingress-nginx-injection
[2]: https://hub.docker.com/layers/datadog/ingress-nginx-injection/v1.11.3/images/sha256-19ea2874d8a4ebbe4de0bf08faeb84c755cd71f1e8740ce2d145c5cf954a33a1

{{% /tab %}}
{{< /tabs >}}

### OpenTelemetry を使用するコントローラー v1.10.0+ {#controller-v1100-using-opentelemetry}

{{< tabs >}}
{{% tab "Kubernetes" %}}

**1. Datadog Agent の準備** <br>
Datadog Agent で [gRPC OTLP Ingestion を有効にし][1]、OpenTelemetry Collector として機能させます。

**2. Ingress コントローラーの構成** <br>
まず、Ingress コントローラーの Pod 仕様に `HOST_IP` 環境変数が設定されていることを確認します。設定されていない場合は、Pod 仕様内の `env` ブロックに次のエントリを追加します。

```yaml
- name: HOST_IP
  valueFrom:
    fieldRef:
      fieldPath: status.hostIP
- name: OTEL_EXPORTER_OTLP_ENDPOINT
  value: "http://$(HOST_IP):4317"
```

次に、コントローラーの OpenTelemetry インスツルメンテーションを有効にします。次の詳細を含む ConfigMap を作成または編集します。

{{< highlight yaml "hl_lines=7-11" >}}
apiVersion: v1
kind: ConfigMap
metadata:
  name: ingress-nginx-controller
  namespace: ingress-nginx
data:
  enable-opentelemetry: "true"
  otel-sampler: AlwaysOn
  # Defaults
  # otel-service-name: "nginx"
  # otel-sampler-ratio: 0.01
{{< /highlight >}}

[1]: /ja/opentelemetry/otlp_ingest_in_the_agent/

{{% /tab %}}

{{% tab "Helm" %}}
**1. Datadog Agent の準備** <br>
Datadog Agent で [gRPC OTLP Ingestion を有効にし][1]、OpenTelemetry Collector として機能させます。

**2. Helm チャートの値をオーバーライド**<br>
Ingress-NGINX Helm チャートをカスタマイズして必要な Datadog モジュールを読み込むには、次の構成の YAML ファイルを作成するか、既存のファイルを変更します。

{{< code-block lang="yaml" filename="values.yaml" >}}
controller:
  opentelemetry:
    enabled: true
  config:
    otel-service-name: "nginx"
    otel-sampler: AlwaysOn
    otel-sampler-ratio: 0.01
  extraEnvs:
    - name: HOST_IP
      valueFrom:
        fieldRef:
          fieldPath: status.hostIP
    - name: OTEL_EXPORTER_OTLP_ENDPOINT
      value: "http://$(HOST_IP):4317"
{{< /code-block >}}

**3. デプロイ**
`-f` フラグを使用して Helm リリースをインストールまたはアップグレードし、前のステップで作成したカスタム値を適用します。

```shell
helm install my-release ingress-nginx/ingress-nginx -f values.yaml
```

[1]: /ja/opentelemetry/otlp_ingest_in_the_agent/
{{% /tab %}}
{{< /tabs >}}

### コントローラー v1.9.0 以前 {#controller-v190-and-older}
Datadog トレーシングを有効にするには、ConfigMap を作成または編集して、`enable-opentracing: "true"` とトレースの送信先となる `datadog-collector-host` を設定します。
ConfigMap の名前は Ingress-NGINX Controller コンテナのコマンドライン引数で明示的に指定されており、デフォルトは `--configmap=<POD_NAMESPACE>/nginx-configuration` です。
`ingress-nginx` が Helm チャート経由でインストールされた場合、ConfigMap の名前は `<RELEASE_NAME>-nginx-ingress-controller` のパターンに従います。

Ingress コントローラーは、`nginx.conf` ファイルと `/etc/nginx/opentracing.json` ファイルの両方を管理します。トレーシングは、すべての `location` ブロックに対して有効になります。

{{< highlight yaml "hl_lines=6-7 9-15" >}}
kind: ConfigMap
apiVersion: v1
metadata:
  name: nginx-configuration
  namespace: ingress-nginx
  labels:
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
data:
  enable-opentracing: "true"
  datadog-collector-host: $HOST_IP
  # Defaults
  # datadog-service-name: "nginx"
  # datadog-collector-port: "8126"
  # datadog-operation-name-override: "nginx.handle"
  # datadog-sample-rate: "1.0"
{{< /highlight >}}

さらに、コントローラーの Pod 仕様に `HOST_IP` 環境変数が設定されていることを確認します。環境変数 `POD_NAME` および `POD_NAMESPACE` を含む `env:` ブロックに、このエントリを追加します。

```yaml
- name: HOST_IP
  valueFrom:
    fieldRef:
      fieldPath: status.hostIP
```

アノテーションを使用して Ingress ごとに異なるサービス名を設定するには

```yaml
  nginx.ingress.kubernetes.io/configuration-snippet: |
      opentracing_tag "service.name" "custom-service-name";
```
上記の設定は、デフォルトの `nginx-ingress-controller.ingress-nginx` サービス名を上書きします。

## Datadog モジュールを使用した OpenResty {#openresty-with-datadog-module}

OpenResty は NGINX 上に構築されており、各 `nginx-datadog` リリースには、モジュールの個別の OpenResty ビルドが含まれています。

OpenResty 用の Datadog NGINX モジュールをインストールするには、以下の手順を実行します。
1. [最新の `nginx-datadog` GitHub リリース][1]から適切な `openresty-` プレフィックス付きのバージョンをダウンロードします。
2. お使いの OpenResty バージョンおよび CPU アーキテクチャに一致する tarball を選択します。OpenResty がベースとしている NGINX コアのバージョンではなく、`openresty -v` に記載されている 4 部構成の OpenResty バージョン (例: `1.31.1.1`) を使用してください。
3. tarball から `ngx_http_datadog_module.so` を抽出し、`/usr/local/openresty/nginx/modules` に配置します。ディレクトリが存在しない場合は作成します。
4. `/usr/local/openresty/nginx/conf/nginx.conf` の先頭で、モジュールを読み込みます。

    ```nginx
    load_module modules/ngx_http_datadog_module.so;
    ```

モジュールの [API ドキュメント][4]に記載されている `datadog_*` ディレクティブと `DD_*` 環境変数は、NGINX と同様に OpenResty でも同じように機能します。

## トレースとログの関連付け {#correlating-traces-to-logs}

APM トレーシングを有効にした後、トレースを対応する NGINX ログに関連付けることができます。この相関関係により、各トレースとスパンがそのリクエスト中に生成された特定のログイベントにリンクされるため、それらの間を行き来して問題をトラブルシューティングできます。

### 前提条件{#prerequisites}

開始する前に、以下の要件を満たしていることを確認します。
- 本ガイドの前述のステップに従って、NGINX の APM トレーシングを有効にしていること。
- NGINX の Datadog ログ収集を構成していること。

### ステップ 1: NGINX ログへのトレース ID とスパン ID の挿入 {#step-1-inject-trace-and-span-ids-into-nginx-logs}

`log_format` ディレクティブを変更して、トレース ID とスパン ID を含めます。使用する変数はインスツルメンテーション方法によって異なります。セットアップに一致する手順については、以下の適切なタブを選択します。

{{< tabs >}}
{{% tab "Datadog NGINX モジュール" %}}

[Datadog NGINX モジュール][100]をインストールした場合は、`$datadog_trace_id` および `$datadog_span_id` 変数を使用します。この値は、トレースされていないリクエストに対しては `-` になります。

NGINX 構成ファイルを更新します (たとえば、`/etc/nginx/nginx.conf`):

```nginx
http {
  log_format main_datadog '$remote_addr - $remote_user [$time_local] "$request" '
                         '$status $body_bytes_sent "$http_referer" '
                         '"$http_user_agent" "$http_x_forwarded_for" '
                         'dd.trace_id="$datadog_trace_id"' 'dd.span_id="$datadog_span_id"';

  access_log /var/log/nginx/access.log main_datadog;
}
```
[100]: https://github.com/DataDog/nginx-datadog/releases/latest

{{% /tab %}}
{{% tab "OpenTelemetry" %}}

[NGINX OpenTelemetry モジュール][100]を使用している場合は、`$otel_trace_id` および `$otel_span_id` 変数を使用します。この値は、トレースされていないリクエストに対しては空の文字列になります。

NGINX 構成ファイルを更新します (たとえば、`/etc/nginx/nginx.conf`):

```nginx
http {
  log_format main_opentelemetry '$remote_addr - $remote_user [$time_local] "$request" '
                               '$status $body_bytes_sent "$http_referer" '
                               '"$http_user_agent" "$http_x_forwarded_for" '
                               'dd.trace_id="$otel_trace_id"' 'dd.span_id="$otel_span_id"' ;

  access_log /var/log/nginx/access.log main_opentelemetry;
}
```
[100]: https://nginx.org/en/docs/ngx_otel_module.html
{{% /tab %}}
{{< /tabs >}}

変更を保存した後、NGINX 構成をリロードします。例:

```sh
sudo nginx -s reload
```

### ステップ 2: トレース ID とスパン ID をパースするためのログパイプラインの構成 {#step-2-configure-the-log-pipeline-to-parse-the-trace-and-span-ids}

デフォルトでは、ログは `dd.trace_id` と `dd.span_id` を 16 進数形式で記録します。

```
10.244.0.1 - - [12/Sep/2025:22:41:03 +0000] "GET /health HTTP/1.1" 200 87 0.002 "-" "kube-probe/1.32" "-" dd.trace_id="68c4a17f000000009aed12af2ccb1ead" dd.span_id="9aed12af2ccb1ead"
```

Datadog でログとトレースの相関関係を有効にするには、これらの ID を 16 進数から 10 進数に変換するようにログ処理パイプラインを構成します。使用するインスツルメンテーションの方法に関係なく、同じステップに従います。

1. Datadog で、[{{< ui >}}Log Configuration{{< /ui >}}][9] ページに移動します。
2. 稼働中の NGINX パイプラインにカーソルを合わせ、{{< ui >}}Clone{{< /ui >}} アイコンをクリックして編集可能なバージョンを作成します。
3. 複製されたパイプラインをクリックします。
4. {{< ui >}}Add Processor{{< /ui >}} をクリックします。
5. プロセッサーのタイプとして [Grok Parser][11] を選択します。
6. ログイベントからトレース ID 属性を抽出するために、次のパースルールを定義します。このルールは、Datadog モジュールと OpenTelemetry 出力の両方で機能します。
   ```text
   extract_correlation_ids %{data} dd.trace_id="%{notSpace:dd.trace_id:nullIf("-")}" dd.span_id="%{notSpace:dd.span_id:nullIf("-")}"
   ```
7. {{< ui >}}Create{{< /ui >}} をクリックします。
8. {{< ui >}}Add Processor{{< /ui >}} をもう一度クリックします。
9. プロセッサーのタイプとして [Trace ID Remapper][10] を選択します。このプロセッサーは、解析された ID を対応する APM トレースに関連付けます。
10. {{< ui >}}Set trace id attribute(s){{< /ui >}} フィールドに `dd.trace_id` を入力します。
11. {{< ui >}}Create{{< /ui >}} をクリックします。
12. {{< ui >}}Add Processor{{< /ui >}} をもう一度クリックします。
13. プロセッサーのタイプとして [Span ID Remapper][12] を選択します。このプロセッサーは、解析された ID を対応する APM スパンに関連付けます。
14. {{< ui >}}Set span id attribute(s){{< /ui >}} フィールドに `dd.span_id` を入力します。
15. {{< ui >}}Create{{< /ui >}} をクリックします。
16. 新しいパイプラインを保存して有効にします。

パイプラインが有効になると、新しい NGINX ログが対応するトレースとスパンに自動的に関連付けられます。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/nginx-datadog/releases/latest
[2]: https://hub.docker.com/layers/library/nginx/1.23.2-alpine/images/sha256-0f2ab24c6aba5d96fcf6e7a736333f26dca1acf5fa8def4c276f6efc7d56251f?context=explore
[3]: https://hub.docker.com/layers/library/amazonlinux/2.0.20230119.1/images/sha256-db0bf55c548efbbb167c60ced2eb0ca60769de293667d18b92c0c089b8038279?context=explore
[4]: https://github.com/DataDog/nginx-datadog/blob/master/doc/API.md
[6]: https://github.com/DataDog/nginx-datadog/
[7]: https://kubernetes.io/docs/concepts/workloads/pods/init-containers/
[8]: /ja/logs/guide/ease-troubleshooting-with-cross-product-correlation
[9]: https://app.datadoghq.com/logs/pipelines
[10]: /ja/logs/log_configuration/processors/trace_remapper/
[11]: /ja/logs/log_configuration/processors/grok_parser/
[12]: /ja/logs/log_configuration/processors/span_remapper/