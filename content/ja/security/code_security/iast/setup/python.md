---
aliases:
- /ja/security_platform/application_security/getting_started/python
- /ja/security/application_security/getting_started/python
code_lang: python
code_lang_weight: 10
further_reading:
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
  text: Troubleshooting Application Security
title: Python 向け Code Security の有効化
type: multi-code-lang
---

You can detect code-level vulnerabilities and monitor application security in Python applicationss running in Docker, Kubernetes, Amazon ECS, and AWS Fargate.

注: Python におけるコード レベルの脆弱性検出機能はプレビュー版です。

Follow these steps to enable Code Security in your service:

1. [Datadog Agent][6] をバージョン 7.41.1 以上に更新します。
2. Update your Datadog Tracing Library to at least the minimum version needed to turn on Code Security. For details, see [Library Compatibility][3] page.
3. アプリケーションの構成に `DD_IAST_ENABLED=true` 環境変数を追加します。

   コマンドラインから

   ```shell
   DD_IAST_ENABLED=true ddtrace-run python app.py
   ```

   または、アプリケーションが実行される場所に応じて、以下の方法のいずれかを使用します。


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
5. To see Code Security in action, browse your service and find code-level vulnerabilities in the [Vulnerability Explorer][4].

{{< img src="/security/application_security/Code-Level-Vulnerability-Details-New.mp4" alt="Video showing Code Vulnerabilities" video="true" >}}

さらにサポートが必要な場合は、[Datadog サポート][5]にお問い合わせください。


### Third-Party Library Compatibility Note

Code Security は、実行時に Python のコードを変換します。これにより、類似のコード変換を行う他のサード パーティ Python ライブラリと競合が発生する可能性があります。特に以下に挙げるものとの競合が想定されますが、これらに限定されません:

- Numba
- JAX
- TorchScript
- TensorFlow
- Bytecode
- Codetransformer
- PyPy

さらに、Code Security はネイティブ (コンパイル済み) コードをまたぐ汚染範囲 (taint ranges) の伝搬を正しく処理できません。そのため、CPython API を使って C や C++ で書かれたモジュール、または Cython のような中間言語システムに大きく依存するコード ベースの場合、結果が予想よりも不正確になる可能性があります。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-py/releases
[2]: /ja/security/code_security/iast/setup/python
[3]: /ja/security/code_security/iast/setup/
[4]: https://app.datadoghq.com/security/appsec/vm/code
[5]: /ja/help
[6]: /ja/agent/versions/upgrade_between_agent_minor_versions/