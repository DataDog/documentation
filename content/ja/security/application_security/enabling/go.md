---
aliases:
- /ja/security_platform/application_security/getting_started/go
- /ja/security/application_security/getting_started/go
code_lang: go
code_lang_weight: 20
further_reading:
- link: /security/application_security/add-user-info/
  tag: Documentation
  text: トレースへのユーザー情報追加
- link: https://github.com/DataDog/dd-trace-dotnet
  tag: GitHub
  text: Go Datadog ライブラリソースコード
- link: /security/default_rules/#cat-application-security
  tag: Documentation
  text: すぐに使える Application Security Management ルール
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Application Security Management のトラブルシューティング
kind: documentation
title: Go の ASM を有効にする
type: multi-code-lang
---

Docker、Kubernetes、AWS ECS で動作する Go アプリのアプリケーションセキュリティを監視することができます。

{{% appsec-getstarted %}}
- [supportedサポートされている APM トレーシングインテグレーション][1]のうちのいずれか 1 つ。
- ビルド環境で、C 言語ライブラリのヘッダーとコンパイルターゲット用の C 言語ツールチェーンとともに、[CGO][2] が有効になっていること。詳細な手順については、[CGO を有効にする][3]を参照してください。

## 詳細はこちら

1. Datadog Go ライブラリの最新バージョン (バージョン 1.36.0 以降) で**プログラムの依存関係を更新します**。

   ```console
   $ go get -v -u gopkg.in/DataDog/dd-trace-go.v1
   ```
   ライブラリが対応している言語やフレームワークのバージョンについては、[互換性][4]をご覧ください。

2. **プログラムを再コンパイル**して、ASM と CGO を有効にします。
   ```console
   $ env CGO_ENABLED=1 go build -v -tags appsec my-program
   ```

3. 環境変数 `DD_APPSEC_ENABLED` を `true` に設定して **Go サービスを再デプロイし、ASM を有効にします**。
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

{{< /tabs >}}
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
{{% tab "AWS ECS" %}}

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

{{< img src="/security/application_security/application-security-signal.png" alt="Security Signal 詳細ページでは、タグ、メトリクス、次のステップの提案、脅威と関連する攻撃者の IP アドレスが表示されます。" style="width:100%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/setup_and_configure/?code-lang=go#supported-frameworks
[2]: https://github.com/golang/go/wiki/cgo
[3]: /ja/security/application_security/setup_and_configure/?code-lang=go#enabling-cgo
[4]: /ja/security/application_security/setup_and_configure/?code-lang=go#compatibility