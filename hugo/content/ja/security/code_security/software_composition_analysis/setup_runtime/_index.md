---
aliases:
- /ja/security/application_security/enabling/tracing_libraries/sca/
disable_toc: false
title: 実行中のサービスで SCA をセットアップする
---
## 前提条件 {#prerequisites}
SCA は、Datadog のアプリケーションテレメトリに基づいて、サービスで実行されているオープンソースライブラリに影響を与える脆弱性を検出できます。

ランタイム検出をセットアップする前に、以下の前提条件が満たされていることを確認してください。

1. **Datadog Agent のインストール:** Datadog Agent が、アプリケーションのオペレーティングシステムやコンテナ、クラウド、仮想環境にインストールされ構成されていること。
2. **Datadog にトレースを送信済み**: Datadog SDK がアプリケーションまたはサービス用に構成されており、Web トレース (`type:web`) を Datadog に送信していること。
3. **サポートされている SDK:** アプリケーションまたはサービスで使用されている Datadog SDK が、そのアプリケーションまたはサービスの言語に対する Software Composition Analysis 機能をサポートしていること。詳細については、[ライブラリの互換性][2] ページを参照してください。

<div class="alert alert-info">ランタイム SCA は APM サブスクリプションを必要としません。一部の APM インテークはランタイム SCA をサポートするために引き続き存在し (例: セキュリティトレース)、請求書に表示される可能性があります。</div>

## Software Composition Analysis の有効化方法 {#software-composition-analysis-enablement-types}

### アプリ内サービスの有効化 {#in-app-service-enablement}

ランタイム Software Composition Analysis (SCA) は、[{{< ui >}}Security{{< /ui >}} > {{< ui >}}Code Security{{< /ui >}}][3] からアプリ内で有効化できます。

1. [セキュリティ設定][3]ページに移動します。
2. {{< ui >}}Activate runtime detection of library vulnerabilities{{< /ui >}} で、{{< ui >}}Manage Services{{< /ui >}} をクリックします。
3. ライブラリの脆弱性を特定したいサービスをチェックし、{{< ui >}}Bulk Actions{{< /ui >}} を選択します。
4. {{< ui >}}Activate Runtime Software Composition Analysis (SCA){{< /ui >}} をクリックします。

### Datadog SDK 設定 {#datadog-sdk-configuration}

Datadog SDK 構成に環境変数または新しい引数を追加します。

これらの手順に従うことで、アプリケーションで Software Composition Analysis を正常にセットアップし、アプリケーションやサービスで使用しているオープンソースライブラリに存在する脆弱性を包括的に監視および特定できるようになります。

Datadog Software Composition Analysis (SCA) を使用すると、アプリ内のオープンソースライブラリを監視できます。

SCA は、サポート対象言語で `-Ddd.appsec.sca.enabled` フラグまたは `DD_APPSEC_SCA_ENABLED` 環境変数を `true` に設定することで構成されます。

- Java
- .NET
- Go
- Ruby
- PHP
- Node.js
- Python

本トピックでは、Java の例を用いて SCA のセットアップ方法を説明します。

**例: Java での Software Composition Analysis の有効化**

1. **[Datadog Java ライブラリ][1]を更新する**: バージョン 0.94.0 以上 (Software Composition Analysis 検出機能についてはバージョン 1.1.4 以上):

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
   サービスの言語やフレームワークのバージョンがサポートされているかどうかは、[互換性][2]を参照してください。

1. **SCA を有効にして Java アプリケーションを実行します。**コマンドラインから:
   ```shell
   java -javaagent:/path/to/dd-java-agent.jar -Ddd.appsec.sca.enabled=true -Ddd.service=<MY SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
   ```

   または、アプリケーションが実行される場所に応じて、以下の方法のいずれかを使用します。

   **注:** 現時点では読み取り専用ファイルシステムはサポートされていません。アプリケーションは、書き込み可能な `/tmp` ディレクトリにアクセスできる必要があります。

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

APM 用のデプロイメントコンフィギュレーションファイルを更新し、SCA 用の環境変数を追加します。

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

サービス呼び出しで `-Ddd.appsec.sca.enabled` フラグまたは `DD_APPSEC_SCA_ENABLED` 環境変数を `true` に設定します。

```shell
java -javaagent:dd-java-agent.jar \
     -Ddd.appsec.sca.enabled=true \
     -jar <YOUR_SERVICE>.jar \
     <YOUR_SERVICE_FLAGS>
```

{{% /tab %}}

   {{< /tabs >}}

## データ保持 {#data-retention}

Datadog は、当社の [Data Retention Periods](https://docs.datadoghq.com/ja/data_security/data_retention_periods/) に従って検出結果を保存します。Datadog はお客様のソースコードを保存または保持しません。

[1]: /ja/security/code_security/software_composition_analysis/setup_runtime/compatibility/java
[2]: /ja/security/code_security/software_composition_analysis/setup_runtime/compatibility/
[3]: https://app.datadoghq.com/security/configuration/code-security/setup