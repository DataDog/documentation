---
aliases:
- /ja/security/application_security/enabling/tracing_libraries/sca/
disable_toc: false
further_reading:
- link: /security/application_security/software_composition_analysis
  tag: ドキュメント
  text: Software Composition Analysis (SCA)
- link: https://www.datadoghq.com/blog/sca-prioritize-vulnerabilities/
  tag: ブログ
  text: Datadog SCA を使用した脆弱性修正の優先順位付け
- link: /security/default_rules/?category=cat-application-security
  tag: ドキュメント
  text: すぐに使える Application Security Management ルール
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: Application Security Management のトラブルシューティング
- link: /security/application_security/how-appsec-works/
  tag: ドキュメント
  text: Datadog における Application Security Management の仕組み
- link: https://www.datadoghq.com/blog/secure-serverless-applications-with-datadog-asm/
  tag: ブログ
  text: Datadog ASM でサーバーレスアプリケーションのセキュリティを強化する
title: Software Composition Analysis のセットアップ
---

## 前提条件
Software Composition Analysis をセットアップする前に、以下の前提条件が満たされていることを確認してください。

1. **Datadog Agent のインストール:** Datadog Agent がアプリケーションが稼働するオペレーティングシステム、コンテナ、クラウド、または仮想環境上にインストールおよび適切に設定されていること。
2. **Datadog APM の設定:** Datadog APM がアプリケーションまたはサービスに設定されており、`type:web` の Web トレースが Datadog で受信されていること。
3. **対応トレーシングライブラリ:** アプリケーションまたはサービスで使用している Datadog トレーシングライブラリが、その言語に対して Software Composition Analysis 機能をサポートしていること。詳細は各 ASM 製品に関する [ライブラリの互換性][5]ページを参照してください。

## Software Composition Analysis の有効化方法

### クイックスタートガイド

1. [クイックスタートガイド][2]に移動してください。
   1. **Enable Vulnerability Detection** を展開表示します。
   2. **Open source vulnerabilities** (オープンソース脆弱性) を選択します。
   3. **Start Activation** (有効化開始) を選択します。
   4. ライブラリの脆弱性を特定したいサービスを選択し、**Next** をクリックします。
   5. **Enable for Selected Services** (選択したサービスで有効化) を選択します。

### 設定ページ

別の方法として、[Settings][3] ページからも Software Composition Analysis を有効化できます。

1. [Settings][3] ページへ移動し、**Software Composition Analysis (SCA)** の **Get Started** を選択してください。
2. ソースコードでの静的分析を有効化する場合は、**Select Repositories** を選択してください。
3. **Add Github Account** を選択し、[指示][4]に従って新規 GitHub アプリケーションを作成してください。
4. GitHub アカウントの設定が完了したら、**Select Repositories** を選択して **Software Composition Analysis (SCA)** を有効化してください。
5. 稼働中サービスのランタイム分析を有効化するには、**Select Services** をクリックします。
6. ライブラリの脆弱性を特定したいサービスを選択し、**Next** を選びます。
7. **Enable for Selected Services** を選択します。

### Datadog トレーシングライブラリ

Datadog トレーシングライブラリの設定に環境変数または新たな引数を追加してください。

これらの手順に従うことで、アプリケーションで Software Composition Analysis を正常にセットアップし、アプリケーションやサービスで使用しているオープンソースライブラリに存在する脆弱性を包括的に監視および特定できるようになります。

Datadog Software Composition Analysis (SCA) を使用すると、アプリ内のオープンソースライブラリを監視できます。

SCA はサポート対象言語で `-Ddd.appsec.sca.enabled` フラグまたは `DD_APPSEC_SCA_ENABLED` 環境変数を `true` に設定することで構成されます。対応言語は以下の通りです。

- Java
- .NET
- Go
- Ruby
- PHP
- Node.js
- Python

本トピックでは、Java の例を用いて SCA のセットアップ方法を説明します。

**例: Java での Software Composition Analysis 有効化**

1. **[Datadog Java ライブラリ][1]**を、最低でもバージョン 0.94.0 (Software Composition Analysis 検出機能を使用する場合は少なくともバージョン 1.1.4) 以上に更新してください。

   {{< tabs >}}
   {{% tab "Wget" %}}
   ```shell
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
{{% /tab %}}
{{% tab "cURL" %}}
   ```shell
   curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
{{% /tab %}}
{{% tab "Dockerfile" %}}
   ```dockerfile
   ADD 'https://dtdg.co/latest-java-tracer' dd-java-agent.jar
   ```
{{% /tab %}}
{{< /tabs >}}
   サービスの言語やフレームワークのバージョンが ASM 機能に対応しているかどうかは、[互換性][2]をご参照ください。

1. **SCA を有効化した状態で Java アプリケーションを実行します。**コマンドラインから、
   ```shell
   java -javaagent:/path/to/dd-java-agent.jar -Ddd.appsec.sca.enabled=true -Ddd.service=<MY SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
   ```

   または、アプリケーションが実行される場所に応じて、以下の方法のいずれかを使用します。

   **注:** 現時点では読み取り専用ファイルシステムには対応していません。アプリケーションは書き込み可能な `/tmp` ディレクトリにアクセスできる必要があります。

   {{< tabs >}}
{{% tab "Docker CLI" %}}

APM 用の構成コンテナを更新するには、`docker run` コマンドに以下の引数を追加します。


```shell
docker run [...] -e DD_APPSEC_SCA_ENABLED=true [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

コンテナの Dockerfile に以下の環境変数の値を追加します。

```Dockerfile
ENV DD_APPSEC_SCA_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

APM 用のデプロイメントコンフィギュレーションファイルを更新し、SCA 用の環境変数を追加してください。

```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_APPSEC_SCA_ENABLED
              value: "true"
```

{{% /tab %}}
{{% tab "Amazon ECS" %}}

以下を環境セクションに追加して、ECS タスク定義 JSON ファイルを更新します。

```json
"environment": [
  ...,
  {
    "name": "DD_APPSEC_SCA_ENABLED",
    "value": "true"
  }
]
```

{{% /tab %}}
{{% tab "AWS Fargate" %}}

サービス呼び出し時に、`-Ddd.appsec.sca.enabled` フラグまたは `DD_APPSEC_SCA_ENABLED` 環境変数を `true` に設定してください。

```shell
java -javaagent:dd-java-agent.jar \
     -Ddd.appsec.sca.enabled=true \
     -jar <YOUR_SERVICE>.jar \
     <YOUR_SERVICE_FLAGS>
```

{{% /tab %}}

   {{< /tabs >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/security/application_security/software_composition_analysis/setup/compatibility/java
[2]: https://app.datadoghq.com/security/configuration/asm/onboarding
[3]: https://app.datadoghq.com/security/configuration/asm/setup
[4]: /ja/integrations/github/
[5]: /ja/security/application_security/software_composition_analysis/setup/compatibility/