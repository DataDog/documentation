---
aliases:
- /ja/security_platform/application_security/getting_started/go
- /ja/security/application_security/getting_started/go
- /ja/security/application_security/enabling/tracing_libraries/threat_detection/go/
code_lang: go
code_lang_weight: 20
further_reading:
- link: /security/application_security/add-user-info/
  tag: ドキュメント
  text: トレースへのユーザー情報追加
- link: https://github.com/DataDog/dd-trace-dotnet
  tag: ソースコード
  text: Go Datadog ライブラリソースコード
- link: /security/default_rules/?category=cat-application-security
  tag: ドキュメント
  text: OOTB App and API Protection Rules
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: Troubleshooting App and API Protection
title: Go 向けに AAP を有効化する
type: multi-code-lang
---

Docker、Kubernetes、Amazon ECS で動作する Go アプリのアプリケーションセキュリティを監視することができます。

{{% appsec-getstarted %}}
- あなたのサービスは[サポートされています][2]。

## Enabling threat detection
### 詳細はこちら

1. 最新バージョンの Datadog Go ライブラリ (バージョン 1.53.0 以降) を**プログラムの go.mod 依存関係に追加**します。

   ```shell
   $ go get -v -u gopkg.in/DataDog/dd-trace-go.v1 # v1
   # $ go get -v -u github.com/DataDog/dd-trace-go/v2/ddtrace/tracer # v2
   ```

2. Datadog には、一連の Go ライブラリやフレームワークのインスツルメンテーション向けにすぐに使えるサポートを提供するプラグイン可能な一連のパッケージがあります。
   これらのパッケージのリストは、[互換性要件][1]ページにあります。これらのパッケージをアプリケーションにインポートし、各インテグレーションの横に記載されている構成の説明に従ってください。

3. AAP を有効にして **プログラムを再コンパイル**します。
   ```console
   $ go build -v -tags appsec my-program
   ```

   **注**:
   - `CGO_ENABLED=1` で CGO が有効になっていれば、Go のビルドタグ `appsec` は不要です。
   - Datadog WAF を Linux 上で動作させるには、次の共有ライブラリが必要です: `libc.so.6` および `libpthread.so.0`。
   - ビルドタグ `appsec` を使用し、CGO が無効になっている場合、生成されたバイナリは依然としてこれらのライブラリと動的にリンクされます。
   - 上記の要件が障害になる場合は、Go のビルド タグ `datadog.no_waf` を使ってビルド時に AAP を無効化できます。

4. `DD_APPSEC_ENABLED` 環境変数を `true` に設定して **Go サービスを再デプロイし、AAP を有効化**します。
   ```console
   $ env DD_APPSEC_ENABLED=true ./my-program
   ```

   または、アプリケーションが実行される場所に応じて、以下の方法のいずれかを使用します。

   {{< tabs >}}
{{% tab "Docker CLI" %}}

Docker コマンドラインに以下の環境変数の値を追加します。

```console
$ docker run -e DD_APPSEC_ENABLED=true [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

アプリケーションコンテナの Dockerfile に以下の環境変数の値を追加します。

```Dockerfile
ENV DD_APPSEC_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

APM 用にアプリケーションのデプロイ構成ファイルを更新し、AAP の環境変数を追加します。

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

{{% /tab %}}
{{% tab "Amazon ECS" %}}

以下を環境セクションに追加して、アプリケーションの ECS タスク定義 JSON ファイルを更新します。

```json
"environment": [
  ...,
  {
    "name": "DD_APPSEC_ENABLED",
    "value": "true"
  }
]
```

{{% /tab %}}

{{< /tabs >}}

{{% appsec-getstarted-2 %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/setup/compatibility/go/#web-framework-compatibility
[2]: /ja/security/application_security/setup/compatibility/go/