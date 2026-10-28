---
aliases:
- /ja/security_platform/application_security/getting_started/go
- /ja/security/application_security/getting_started/go
- /ja/security/application_security/threats/setup/threat_detection/go
- /ja/security/application_security/threats_detection/go
further_reading:
- link: /security/application_security/setup/go/sdk
  tag: ドキュメント
  text: Go 向け App and API Protection SDK
- link: /security/application_security/add-user-info/
  tag: ドキュメント
  text: トレースへのユーザー情報追加
- link: https://github.com/DataDog/dd-trace-go
  tag: ソースコード
  text: トレーサーのソースコード
- link: https://github.com/DataDog/orchestrion
  tag: ソースコード
  text: Orchestrion ソースコード
- link: /security/default_rules/?category=cat-application-security
  tag: ドキュメント
  text: OOTB App and API Protection ルール
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: App and API Protection のトラブルシューティング
title: Go 向け App and API Protection の開始方法
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection は、Datadog Government サイト US1-FED でプレビュー版として提供されています。
</div>
{{< /site-region >}}

## 前提条件 {#prerequisite}

- [Datadog Agent][16] が、アプリケーションのオペレーティングシステムやコンテナ、クラウド、仮想環境にインストールされ構成されている。
- サービスフレームワークとツールが Datadog [Application and API Protection][1] と[互換性がある][2]。
- デプロイ環境が[サポートされている][5]。
- [Go][4] の最新の 2 つのバージョンのいずれかがインストールされている ([公式リリースポリシー][5]に従っている)。

## 始める {#get-started}

1. [Orchestrion][10] をインストールします。
   ```console
   $ go install github.com/DataDog/orchestrion@latest
   ```

2. プロジェクトディレクトリで Orchestrion を Go モジュールとして登録します。
   ```console
   $ orchestrion pin
   ```

3. Datadog には、一連の Go ライブラリやフレームワークのインスツルメンテーション向けにネイティブサポートを提供する、プラグイン可能な一連のパッケージがあります。これらのパッケージの一覧は、[互換性要件][1]にあります。これらのパッケージをアプリケーションにインポートし、各インテグレーションに記載されている構成手順に従ってください。

4. `appsec` ビルドを使用して、Orchestrion と共にプログラムを再コンパイルします。
   ```console
   $ orchestrion go build -tags=appsec my-program
   ```
   Orchestrion の使用方法に関するその他のオプションについては、[Orchestrion の使用方法][7]を参照してください。

注: Linux で [CGO][9] を使用せずにビルドする場合は、[CGO を無効にして Go アプリケーションをビルドする][6]を参照してください。

5. Go サービスを再デプロイし、`DD_APPSEC_ENABLED` 環境変数を `true` に設定して App and API Protection を有効にします。

{{< tabs >}}
{{% tab "環境変数" %}}

```console
$ env DD_APPSEC_ENABLED=true ./my-program
```

{{% /tab %}}
{{% tab "Docker CLI" %}}

Docker コマンドラインに以下の環境変数の値を追加します。

```console
$ docker run -e DD_APPSEC_ENABLED=true [...]
```

適切な Docker イメージを作成する方法の詳細については、<a href="/security/application_security/setup/go/dockerfile">Go 向け App and API Protection の Dockerfile の作成</a>を参照してください。

{{% /tab %}}
{{% tab "Dockerfile" %}}

アプリケーションコンテナの Dockerfile に以下の環境変数の値を追加します。

```Dockerfile
ENV DD_APPSEC_ENABLED=true
```

適切な Docker イメージを作成する方法の詳細については、<a href="/security/application_security/setup/go/dockerfile">Go 向け App and API Protection の Dockerfile の作成</a>を参照してください。

{{% /tab %}}
{{% tab "Kubernetes" %}}

アプリケーションの APM 用のデプロイメント構成ファイルを更新し、次の環境変数を追加します。

```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_APPSEC_ENABLED
              value: "true"
```

適切な Docker イメージを作成する方法の詳細については、<a href="/security/application_security/setup/go/dockerfile">Go 向け App and API Protection の Dockerfile の作成</a>を参照してください。

{{% /tab %}}
{{% tab "Amazon ECS" %}}

以下の環境セクションを使用して、アプリケーションの ECS タスク定義 JSON ファイルを更新します。

```json
"environment": [
  ...,
  {
    "name": "DD_APPSEC_ENABLED",
    "value": "true"
  }
]
```

適切な Docker イメージを作成する方法の詳細については、<a href="/security/application_security/setup/go/dockerfile">Go 向け App and API Protection の Dockerfile の作成</a>を参照してください。

{{% /tab %}}

{{< /tabs >}}

### セットアップを確認する{#verify-your-setup}

App and API Protection が正しく機能していることを確認するには、次の手順を実行します。
   
App and API Protection の脅威検出を実際に確認するには、既知の攻撃パターンをアプリケーションに送信します。たとえば、以下の curl スクリプトを含むファイルを実行して、[Security Scanner Detected][15] ルールをトリガーします。

```bash
for ((i=1;i<=250;i++));
do
  # Target existing service’s routes
  curl https://your-application-url/existing-route -A Arachni/v1.0;
  # Target non existing service’s routes
  curl https://your-application-url/non-existing-route -A Arachni/v1.0;
done
```

アプリケーションを有効にして動作させてから数分後、**Datadog の [Application Trace and Signals Explorer][14] に脅威情報が表示されます**。

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="シグナルエクスプローラーとその詳細、および脆弱性エクスプローラーとその詳細を示すビデオ。" video="true" >}}

### CGO を使用せずにビルドしている場合{#building-without-cgo}

[CGO][9] を使用せずに Go アプリケーションをビルドしている場合でも、次の手順に従って App and API Protection を有効にできます。

1. アプリケーションのコンパイル時に `appsec` ビルドタグを追加します。
   ```console
   $ CGO_ENABLED=0 orchestrion go build -tags appsec my-program
   ```

  <div class="alert alert-danger">CGO を無効にすると、通常は静的にリンクされたバイナリが生成されますが、この場合はそうなりません。</div>

2. システムに `libc.so.6`、`libpthread.so.0`、`libdl.so.2` をインストールします。これらのライブラリは Datadog WAF に必要です。
   このインストールは、パッケージマネージャーでシステムに `glibc` パッケージをインストールすることで行えます。[Go 向け App and API Protection の Dockerfile の作成][3]を参照してください。

3. 上記のように `DD_APPSEC_ENABLED=true` 環境変数を設定して、Go サービスを再デプロイします。

### Bazel を使用してビルドしている場合{#building-with-bazel}

Bazel と [rules_go][12] を使用して Go アプリケーションをビルドしている場合、[Orchestrion][7] は Bazel と互換性がありません。
代わりに、[Datadog Go SDK][11] を使用してアプリケーションを手動でインスツルメントできます。

App and API Protection は、Datadog の WAF への C++ バインディングをサポートするために [purego][13] に依存しているため、Gazelle によって生成された `repositories.bzl` 内で特別な対応が必要になります。`com_github_ebitengine_purego` の `go_repository` ルールの下に、
`gazelle:build_tags cgo` ディレクティブを含む `build_directives` 属性を追加する必要があります。たとえば、次のようになります。

```starlark
    go_repository(
        name = "com_github_ebitengine_purego",
        build_directives = [
            "gazelle:build_tags cgo",
        ]
        build_file_proto_mode = "disable",
        importpath = "github.com/ebitengine/purego",
        sum = "<your-checksum>",
        version = "v0.8.3",
    )
```

## APM トレーシングを使用せずに App and API Protection を使用する{#using-app-and-api-protection-without-apm-tracing}

APM トレーシング機能を使用せずに App and API Protection を使用する場合は、トレーシングを無効にしてデプロイできます。

1. SDK の構成時に、`DD_APPSEC_ENABLED=true` 環境変数に加えて `DD_APM_TRACING_ENABLED=false` 環境変数も使用します。この構成により、Datadog に送信される APM データの量が、App and API Protection 製品で必要とされる最小限の量に削減されます。

詳細については、[スタンドアロンの App and API Protection][8] を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/setup/compatibility/go/?tab=v2#web-framework-compatibility
[2]: /ja/security/application_security/setup/compatibility/go/
[3]: /ja/security/application_security/setup/go/dockerfile
[4]: https://go.dev/
[5]: https://go.dev/doc/devel/release#policy
[6]: /ja/security/application_security/setup/go#building-without-cgo
[7]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/go/?tab=compiletimeinstrumentation#usage
[8]: /ja/security/application_security/guide/standalone_application_security/
[9]: https://go.dev/wiki/cgo
[10]: https://datadoghq.dev/orchestrion
[11]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/go/?tab=manualinstrumentation#add-the-tracer-library-to-your-application
[12]: https://github.com/bazel-contrib/rules_go
[13]: https://github.com/ebitengine/purego
[14]: https://app.datadoghq.com/security/appsec
[15]: /ja/security/default_rules/security-scan-detected/
[16]: https://app.datadoghq.com/account/settings#agent