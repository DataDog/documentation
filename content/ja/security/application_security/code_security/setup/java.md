---
aliases:
- /ja/security_platform/application_security/getting_started/java
- /ja/security/application_security/getting_started/java
code_lang: java
code_lang_weight: 0
further_reading:
- link: /security/application_security/code_security/#code-level-vulnerabilities-list
  tag: ドキュメント
  text: サポートされているコード レベルの脆弱性リスト
- link: https://www.datadoghq.com/blog/iast-datadog-code-security/
  tag: ブログ
  text: Datadog Code Security で本番環境のアプリケーションセキュリティを強化
- link: https://www.datadoghq.com/blog/application-code-vulnerability-detection/
  tag: ブログ
  text: Datadog Code Security でコードの脆弱性を発見
- link: https://www.datadoghq.com/blog/code-security-owasp-benchmark/
  tag: ブログ
  text: Datadog Code Security は IAST アプローチを採用し、OWASP Benchmark で 100% の精度を達成
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: Application Security のトラブルシューティング
title: Java 用 Code Security の有効化
type: multi-code-lang
---

You can detect code-level vulnerabilities and monitor application security in Java applications running in Docker, Kubernetes, Amazon ECS, and AWS Fargate.

サービスで Code Security を有効化するには、次の手順に従ってください:

1. [Datadog Agent][6] をバージョン 7.41.1 以上に更新します。
2. Code Security を有効化するために必要な最低バージョン以上に Datadog Tracing Library を更新します。詳細は [ライブラリ互換性][3] ページを参照してください。
3. アプリケーションの構成に `DD_IAST_ENABLED=true` 環境変数を追加します。

   コマンドラインから

   ```shell
   java -javaagent:/path/to/dd-java-agent.jar -Ddd.iast.enabled=true -Ddd.service=<MY SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
   ```

   または、アプリケーションが実行される場所に応じて、以下の方法のいずれかを使用します。

   **注**: 読み取り専用ファイルシステムはサポートされていません。アプリケーションは書き込み可能な `/tmp` ディレクトリへのアクセス権を持っている必要があります。


   {{< tabs >}}
{{% tab "Docker CLI" %}}

APM 用の構成コンテナを更新するには、`docker run` コマンドに以下の引数を追加します。


```shell
docker run [...] -e DD_IAST_ENABLED=true [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

コンテナの Dockerfile に以下の環境変数の値を追加します。

```Dockerfile
DD_IAST_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

APM 用のデプロイメント構成ファイルを更新し、IAST 環境変数を追加します。

```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_IAST_ENABLED
              value: "true"
```

{{% /tab %}}
{{% tab "Amazon ECS" %}}

以下を環境セクションに追加して、ECS タスク定義 JSON ファイルを更新します。

```json
"environment": [
  ...,
  {
    "name": "DD_IAST_ENABLED",
    "value": "true"
  }
]
```

{{% /tab %}}

   {{< /tabs >}}

4. サービスを再起動します。
5. Code Security の動作を確認するには、サービスをブラウズして [Vulnerability Explorer][4] でコード レベルの脆弱性を確認します。

{{< img src="/security/application_security/Code-Level-Vulnerability-Details-New.mp4" alt="Video showing Code Vulnerabilities" video="true" >}}

さらにサポートが必要な場合は、[Datadog サポート][5]にお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java/releases
[2]: /ja/security/application_security/code_security/setup/compatibility/java/
[3]: /ja/security/application_security/code_security/setup/compatibility/java/
[4]: https://app.datadoghq.com/security/appsec/vm
[5]: /ja/help
[6]: /ja/agent/versions/upgrade_between_agent_minor_versions/