---
aliases:
- /ja/security_platform/application_security/getting_started/go
- /ja/security/application_security/getting_started/go
- /ja/security/application_security/enabling/go
code_lang: go
code_lang_weight: 20
further_reading:
- link: /security/application_security/add-user-info/
  tag: ドキュメント
  text: トレースへのユーザー情報追加
- link: https://github.com/DataDog/dd-trace-dotnet
  tag: Source Code
  text: Go Datadog ライブラリソースコード
- link: /security/default_rules/?category=cat-application-security
  tag: ドキュメント
  text: すぐに使える Application Security Management ルール
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: Application Security Management のトラブルシューティング
kind: ドキュメント
title: Go の ASM を有効にする
type: multi-code-lang
---

Docker、Kubernetes、Amazon ECS で動作する Go アプリのアプリケーションセキュリティを監視することができます。

{{% appsec-getstarted %}}
- あなたのサービスは[サポートされています][2]。

## 脅威検出を有効にする
### はじめに

1. 最新バージョンの Datadog Go ライブラリ (バージョン 1.53.0 以降) を**プログラムの go.mod 依存関係に追加**します。

   ```console
   $ go get -v -u gopkg.in/DataDog/dd-trace-go.v1
   ```

2. Datadog には、一連の Go ライブラリやフレームワークのインスツルメンテーション向けにすぐに使えるサポートを提供するプラグイン可能な一連のパッケージがあります。
   これらのパッケージのリストは、[互換性要件][1]ページにあります。これらのパッケージをアプリケーションにインポートし、各インテグレーションの横に記載されている構成の説明に従ってください。

3. ASM を有効にして**プログラムを再コンパイル**します。
   ```console
   $ go build -v -tags appsec my-program
   ```

   **注**:
   - The Go build tag `appsec` is not necessary if CGO is enabled with `CGO_ENABLED=1`.
   - Datadog WAF needs the following shared libraries on Linux: `libc.so.6` and `libpthread.so.0`.
   - When using the build tag `appsec` and CGO is disabled, the produced binary is still linked dynamically to these libraries.
   - The Go build tag `datadog.no_waf` can be used to disable ASM at build time in any situation where the requirements above are a hinderance.

4. 環境変数 `DD_APPSEC_ENABLED` を `true` に設定することで **Go サービスを再デプロイし、ASM を有効にします**。
   ```console
   $ env DD_APPSEC_ENABLED=true ./my-program
   ```

   または、アプリケーションの実行場所に応じて、以下の方法のいずれかを使用します。

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

アプリケーションの APM 用のデプロイメント構成ファイルを更新し、ASM 環境変数を追加します。

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

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="シグナルエクスプローラーとその詳細、脆弱性エクスプローラーとその詳細をビデオでご紹介しています。" video="true" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/enabling/compatibility/go/#web-framework-compatibility
[2]: /ja/security/application_security/enabling/compatibility/go