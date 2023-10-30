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

Docker、Kubernetes、Amazon ECS で動作する Go アプリのアプリケーションセキュリティを監視することができます。

{{% appsec-getstarted %}}
- あなたのサービスは[サポートされています][2]。

## 脅威検知を有効にする
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

{{< img src="/security/application_security/application-security-signal.png" alt="Security Signal 詳細ページでは、タグ、メトリクス、次のステップの提案、脅威と関連する攻撃者の IP アドレスが表示されます。" style="width:100%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/enabling/compatibility/go/#web-framework-compatibility
[2]: /ja/security/application_security/enabling/compatibility/go