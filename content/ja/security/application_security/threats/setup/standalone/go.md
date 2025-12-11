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
  text: OOTB App & API Protection Rules
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: Troubleshooting App & API Protection
title: Go 向け Application & API Protection の有効化
type: multi-code-lang
---

Docker、Kubernetes、Amazon ECS で動作する Go アプリのアプリケーション セキュリティを監視することができます。

{{% appsec-getstarted-standalone %}}
- あなたのサービスは[サポートされています][2]。

## Enabling Application & API Protection
### 開始する

1. 最新バージョンの Datadog Go ライブラリ (バージョン 1.53.0 以降) を**プログラムの go.mod 依存関係に追加**します。

   ```shell
   $ go get -v -u gopkg.in/DataDog/dd-trace-go.v1 # v1
   # $ go get -v -u github.com/DataDog/dd-trace-go/v2/ddtrace/tracer # v2
   ```

2. Datadog には、一連の Go ライブラリやフレームワークのインスツルメンテーション向けにすぐに使えるサポートを提供するプラグイン可能な一連のパッケージがあります。
   これらのパッケージのリストは、[互換性要件][1]ページにあります。これらのパッケージをアプリケーションにインポートし、各インテグレーションの横に記載されている構成の説明に従ってください。

3. Application & API Protection を有効にして**プログラムを再コンパイル**します。
   ```console
   $ go build -v -tags appsec my-program
   ```

   **注**:
   - `CGO_ENABLED=1` で CGO が有効になっていれば、Go のビルド タグ `appsec` は不要です。
   - Datadog WAF を Linux 上で動作させるには、次の共有ライブラリが必要です: `libc.so.6` および `libpthread.so.0`。
   - ビルド タグ `appsec` を使用し、CGO が無効になっている場合、生成されたバイナリは依然としてこれらのライブラリと動的にリンクされます。
   - Go のビルド タグ `datadog.no_waf` は、上記の要件が障害となる場合に、ビルド時に Application & API Protection を無効にするために使用できます。

4. 環境変数を設定して **Go サービスを再デプロイし、Application & API Protection** を有効にします。
   ```console
   $ env DD_APPSEC_ENABLED=true DD_APM_TRACING_ENABLED=false ./my-program
   ```

   または、アプリケーションが実行される場所に応じて、以下の方法のいずれかを使用します。

   {{< tabs >}}
{{% tab "Docker CLI" %}}

Docker コマンド ラインに以下の環境変数の値を追加します。

```console
$ docker run -e DD_APPSEC_ENABLED=true -e DD_APM_TRACING_ENABLED=false [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

アプリケーション コンテナの Dockerfile に以下の環境変数の値を追加します。

```Dockerfile
ENV DD_APPSEC_ENABLED=true
ENV DD_APM_TRACING_ENABLED=false
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

アプリケーションの APM 用のデプロイメント構成ファイルを更新し、Application & API Protection の環境変数を追加します。

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
            - name: DD_APM_TRACING_ENABLED
              value: "false"
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
  },
  {
    "name": "DD_APM_TRACING_ENABLED",
    "value": "false"
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