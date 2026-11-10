---
aliases:
- /ja/security/application_security/enabling/single_step/code_security/
- /ja/security/application_security/enabling/tracing_libraries/code_security/
- /ja/security/application_security/code_security/setup/
disable_toc: false
title: Runtime Code Analysis (IAST) をセットアップする
---
## 前提条件 {#prerequisites}
Runtime Code Analysis (IAST) をセットアップする前に、以下の前提条件を満たしていることを確認してください:

1. **Datadog Agent のインストール:** Datadog Agent が、アプリケーションのオペレーティングシステムやコンテナ、クラウド、仮想環境にインストールされ構成されていること。
2. **サポートされている SDK:** アプリケーションまたはサービスで使用されている Datadog SDK が、そのアプリケーションまたはサービスの言語に対する Runtime Code Analysis (IAST) 機能をサポートしていること。詳細については、以下の**互換性要件**のセクションを参照してください。

<div class="alert alert-info">IAST に必要な要件は、Datadog Agent と SDK のみです。APM トレーシングおよび Infrastructure Monitoring は必須ではありません。IAST は両者とは独立して検出結果を報告します。APM または Infrastructure Monitoring を無効にする方法については、<a href="#disable-apm-and-infrastructure-monitoring">APM と Infrastructure Monitoring の無効化</a>を参照してください。
<br>
APM が無効になっている場合でも、IAST をサポートするためにセキュリティトレースやスパンなどのデータを取り込むための APM インテークコストが発生します。</div>

## Datadog SDK の使用 {#using-datadog-sdks}

Runtime Code Analysis (IAST) を有効にする方法については、アプリケーションの言語とインフラタイプを選択して確認してください。


{{% collapse-content title="Java" level="h3" %}}

Docker、Kubernetes、Amazon ECS、AWS Fargate で実行されている Java アプリケーションで、コードレベルの脆弱性を検出し、アプリケーションセキュリティを監視できます。

サービスで Runtime Code Analysis (IAST) を有効にするには、以下の手順に従ってください:

1. [Datadog Agent をバージョン 7.41.1 以降に更新][6]します。
2. Runtime Code Analysis (IAST) を有効にするために必要な最小バージョン以上に Datadog SDK を更新します。詳細については、以下の **互換性要件**を参照してください。
3. `DD_IAST_ENABLED=true` 環境変数をアプリケーションの構成に追加します。

   コマンドラインから:

   ```shell
   java -javaagent:/path/to/dd-java-agent.jar -Ddd.iast.enabled=true -Ddd.service=<MY SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
   ```

   アプリケーションが動作している場所に応じて、以下のオーケストレーションツールのいずれかを使用します。

   **注**: 読み取り専用ファイルシステムはサポートされていません。アプリケーションは、書き込み可能な `/tmp` ディレクトリにアクセスできる必要があります。


#### Docker CLI {#docker-cli}

APM 用の構成コンテナを更新するには、`docker run` コマンドに以下の引数を追加します。


```shell
docker run [...] -e DD_IAST_ENABLED=true [...]
```

#### Dockerfile {#dockerfile}

コンテナの Dockerfile に以下の環境変数の値を追加します。

```Dockerfile
DD_IAST_ENABLED=true
```

#### Kubernetes {#kubernetes}

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

#### Amazon ECS {#amazon-ecs}

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

#### APM トレーシングが無効な場合 {#apm-tracing-disabled}

IAST を有効にしたまま APM トレーシングを無効にするには、APM トレーシングの変数を false に設定する必要があります。

{{< tabs >}}
{{% tab "システムプロパティの使用" %}}

システムプロパティを使用して、Datadog Agent と IAST を有効にした状態で Java アプリケーションを起動します。

```bash
java -javaagent:/path/to/dd-java-agent.jar -Ddd.iast.enabled=true -Ddd.apm.tracing.enabled=false -Ddd.service=<MY_SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
```
{{% /tab %}}

{{% tab "環境変数の使用" %}}

必要な環境変数を設定します。

```Dockerfile
DD_IAST_ENABLED=true
DD_APM_TRACING_ENABLED=false
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
```
{{% /tab %}}
{{< /tabs >}}


[1]: https://github.com/DataDog/dd-trace-java/releases
[2]: /ja/security/code_security/iast/setup/
[3]: /ja/security/code_security/iast/setup/
[4]: https://app.datadoghq.com/security/appsec/vm
[5]: /ja/help
[6]: /ja/agent/versions/upgrade_between_agent_minor_versions/


{{% /collapse-content %}}

{{% collapse-content title=".NET" level="h3" %}}

Docker、Kubernetes、Amazon ECS、AWS Fargate で実行されている .NET アプリケーションで、コードレベルの脆弱性を検出し、アプリケーションセキュリティを監視できます。

サービスで Runtime Code Analysis (IAST) を有効にするには、以下の手順に従ってください:

1. [Datadog Agent をバージョン 7.41.1 以降に更新][3]します。
2. Runtime Code Analysis (IAST) を有効にするために必要な最小バージョン以上に Datadog SDK を更新します。詳細については、以下の **互換性要件**を参照してください。
3. `DD_IAST_ENABLED=true` 環境変数をアプリケーションの構成に追加します。たとえば、Windows のセルフホスト環境では、アプリケーションの起動スクリプトの一部として以下の PowerShell スニペットを実行します。

   ```sh
   $target=[System.EnvironmentVariableTarget]::Process
   [System.Environment]::SetEnvironmentVariable("DD_IAST_ENABLED","true",$target)
   ```

または、アプリケーションが実行される場所に応じて、以下の方法のいずれかを使用します。

#### Windows セルフホスト環境 {#windows-self-hosted}

Windows コンソールで以下を実行します。

```sh
rem Set environment variables
SET DD_IAST_ENABLED=true

rem Start application
dotnet.exe example.dll
```

#### IIS {#iis}

管理者として以下の PowerShell コマンドを実行し、レジストリ `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Environment` に必要な環境変数を構成して、IIS を再起動します。

```sh
$target=[System.EnvironmentVariableTarget]::Machine
[System.Environment]::SetEnvironmentVariable("DD_IAST_ENABLED","true",$target)
net stop was /y
net start w3svc
```

#### Linux {#linux}

アプリケーションの構成に以下を追加します。

```
DD_IAST_ENABLED=true
```

#### Docker CLI {#docker-cli-1}

docker run コマンドに以下の引数を追加して、APM 用のコンテナ構成を更新します。

```
docker run -d --name app -e DD_IAST_ENABLED=true company/app:latest
```

#### Dockerfile {#dockerfile-1}

コンテナの Dockerfile に以下の環境変数の値を追加します。

```
ENV DD_IAST_ENABLED=true
```

#### Kubernetes {#kubernetes-1}

APM のデプロイメント構成ファイルを更新し、Runtime Code Analysis (IAST) の環境変数を追加します。

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

#### AWS ECS {#aws-ecs}

以下を環境セクションに追加して、ECS タスク定義 JSON ファイルを更新します。

```yaml
"environment": [
  ...,
  {
    "name": "DD_IAST_ENABLED",
    "value": "true"
  }
]
```

#### AWS Fargate {#aws-fargate}

コンテナの Dockerfile に以下の行を追加します。

```
ENV DD_IAST_ENABLED=true
```

#### APM トレーシングが無効な場合 {#apm-tracing-disabled-1}

IAST を有効にしたまま APM トレーシングを無効にするには、APM トレーシングの変数を false に設定する必要があります。

```Dockerfile
DD_IAST_ENABLED=true
DD_APM_TRACING_ENABLED=false
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
```


Runtime Code Analysis (IAST) の動作を確認するには、サービスをブラウズして [Vulnerability Explorer][4] でコードレベルの脆弱性を探してください。

{{< img src="/security/application_security/Code-Level-Vulnerability-Details-New.mp4" alt="コードの脆弱性を紹介する動画" video="true" >}}

さらにサポートが必要な場合は、[Datadog サポート][5]にお問い合わせください。

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/latest
[2]: /ja/security/code_security/iast/setup/
[3]: /ja/agent/versions/upgrade_between_agent_minor_versions/
[4]: /ja/security/code_security/iast/setup/
[5]: /ja/help

{{% /collapse-content %}}

{{% collapse-content title="Node.js" level="h3" %}}

Docker、Kubernetes、Amazon ECS、AWS Fargate で実行されている Node.js アプリケーションで、コードレベルの脆弱性を検出し、アプリケーションセキュリティを監視できます。

サービスで Runtime Code Analysis (IAST) を有効にするには、以下の手順に従ってください:

1. [Datadog Agent をバージョン 7.41.1 以降に更新][4]します。
2. Runtime Code Analysis (IAST) を有効にするために必要な最小バージョン以上に Datadog SDK を更新します。詳細については、以下の **互換性要件**を参照してください。
3. `DD_IAST_ENABLED=true` 環境変数をアプリケーションの構成に追加します。

   Node.js の `--require` オプションを使用してコマンドラインで Datadog SDK を初期化する場合:

   ```shell
   node --require dd-trace/init app.js
   ```
   環境変数を使用して Runtime Code Analysis (IAST) を有効にします。
   ```shell
   DD_IAST_ENABLED=true node app.js
   ```
   サービスの実行環境によって、この手順は異なります。

#### Docker CLI {#docker-cli-2}

APM 用の構成コンテナを更新するには、`docker run` コマンドに以下の引数を追加します。

```shell
docker run [...] -e DD_IAST_ENABLED=true [...]
```

#### Dockerfile {#dockerfile-2}

コンテナの Dockerfile に以下の環境変数の値を追加します。

```Dockerfile
ENV DD_IAST_ENABLED=true
```

#### Kubernetes {#kubernetes-2}

APM 用の構成 yaml ファイルコンテナを更新し、AppSec の環境変数を追加します。

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

#### Amazon ECS {#amazon-ecs-1}

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

#### APM トレーシングが無効な場合 {#apm-tracing-disabled-2}

IAST を有効にしたまま APM トレーシングを無効にするには、APM トレーシングの変数を false に設定する必要があります。

```Dockerfile
DD_IAST_ENABLED=true
DD_APM_TRACING_ENABLED=false
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
```

[1]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md
[2]: /ja/security/code_security/iast/setup/nodejs/
[3]: /ja/security/code_security/iast/setup/
[4]: /ja/agent/versions/upgrade_between_agent_minor_versions/
[5]: https://app.datadoghq.com/security/appsec/vm/code
[6]: /ja/help

{{% /collapse-content %}}

{{% collapse-content title="Python" level="h3" %}}

Docker、Kubernetes、Amazon ECS、AWS Fargate で実行されている Python アプリケーションで、コードレベルの脆弱性を検出し、アプリケーションセキュリティを監視できます。

サービスで Runtime Code Analysis (IAST) を有効にするには、以下の手順に従ってください:

1. [Datadog Agent をバージョン 7.41.1 以降に更新][6]します。
2. Runtime Code Analysis (IAST) を有効にするために必要な最小バージョン以上に Datadog SDK を更新します。詳細については、以下の **互換性要件**を参照してください。
3. `DD_IAST_ENABLED=true` 環境変数をアプリケーションの構成に追加します。

   コマンドラインから:

   ```shell
   DD_IAST_ENABLED=true ddtrace-run python app.py
   ```

   または、アプリケーションが実行される場所に応じて、以下の方法のいずれかを使用します。


#### Docker CLI {#docker-cli-3}

APM 用の構成コンテナを更新するには、`docker run` コマンドに以下の引数を追加します。


```shell
docker run [...] -e DD_IAST_ENABLED=true [...]
```

#### Dockerfile {#dockerfile-3}

コンテナの Dockerfile に以下の環境変数の値を追加します。

```Dockerfile
DD_IAST_ENABLED=true
```

#### Kubernetes {#kubernetes-3}

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

#### Amazon ECS {#amazon-ecs-2}

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

#### APM トレーシングが無効な場合 {#apm-tracing-disabled-3}

IAST を有効にしたまま APM トレーシングを無効にするには、APM トレーシングの変数を false に設定する必要があります。

```Dockerfile
DD_IAST_ENABLED=true
DD_APM_TRACING_ENABLED=false
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
```

#### サードパーティ製ライブラリの互換性に関する注 {#third-party-library-compatibility-note}

Runtime Code Analysis (IAST) は、実行時に Python コードを変換します。これにより、同様のコード変換を行う他のサードパーティ製 Python ライブラリ (特に以下を含みますが、これらに限定されません) と競合する可能性があります。

- Numba
- JAX
- TorchScript
- TensorFlow
- Bytecode
- Codetransformer
- PyPy

さらに、Runtime Code Analysis (IAST) は、ネイティブ (コンパイル済み) コード全体で汚染範囲を正しく伝播しません。そのため、コードベースが C または C++ で記述されたモジュール、
CPython API を使用するモジュール、または Cython のような中間言語システムに大きく依存している場合、結果の精度が期待よりも低くなる可能性があります。


[1]: https://github.com/DataDog/dd-trace-py/releases
[2]: /ja/security/code_security/iast/setup/python
[3]: /ja/security/code_security/iast/setup/
[4]: https://app.datadoghq.com/security/appsec/vm/code
[5]: /ja/help
[6]: /ja/agent/versions/upgrade_between_agent_minor_versions/

{{% /collapse-content %}}

### セットアップの完了 {#finishing-setup}

1. サービスを再起動します。
2. Runtime Code Analysis (IAST) の動作を確認するには、サービスを閲覧し、[Runtime Code (IAST) Vulnerability Explorer][4] で IAST 脆弱性を探します。

さらにサポートが必要な場合は、[Datadog サポート][5]にお問い合わせください。

[1]: /ja/security/code_security/iast/setup/
[4]: https://app.datadoghq.com/security/code-security/iast
[5]: /ja/help

## APM および Infrastructure Monitoring の無効化 {#disable-apm-and-infrastructure-monitoring}

APM トレースやインフラストラクチャーメトリクスなしで IAST を実行するには、以下の環境変数を使用してそれらを無効にします。

### APM トレーシングを無効にする {#disable-apm-tracing}

IAST を有効にしたままトレーサーで APM トレーシングを無効にするには、`DD_APM_TRACING_ENABLED=false` を設定します。

{{< code-block lang="bash" >}}
DD_IAST_ENABLED=true
DD_APM_TRACING_ENABLED=false
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

### Infrastructure Monitoring を無効にする {#disable-infrastructure-monitoring}

Datadog Agent でインフラストラクチャーメトリクスの収集を無効にするには、Agent 設定で `DD_INFRASTRUCTURE_MODE=none` を設定します。

{{< code-block lang="bash" >}}
DD_INFRASTRUCTURE_MODE=none
{{< /code-block >}}

## 互換性要件 {#compatibility-requirements}

各言語の SDK における Code Security 機能のサポート状況は以下のとおりです。

| Code Security 機能                      | Java    | .NET     | Node.js    | Python      | Go             | Ruby          | PHP           |
|-----------------------------------------------|---------|----------|------------|-------------|----------------|---------------|---------------|
| Runtime Software Composition Analysis (SCA)   | 1.1.4   | 2.16.0   | 4.0.0      | 1.5.0       | 1.49.0         | 1.11.0        | 0.90.0        |
| Runtime Code Analysis (IAST)                  | 1.15.0  | 2.42.0   | 4.18.0     | 3.18.0      | サポート対象外  | サポート対象外 | サポート対象外 |

**注**: **Static Software Composition Analysis (SCA)** および **Static Code Analysis (SAST)** 機能は、Datadog SDK を必要としません。そのため、以下に記載されている要件は、これら 2 つの Code Security 機能には適用されません。

フレームワークの互換性と機能サポートの詳細については、アプリケーションの言語を選択してください。

{{% collapse-content title="Java" level="h3" %}}

### Code Security 機能 {#code-security-capabilities}

指定されたトレーサーのバージョンにおいて、Java ライブラリでサポートされている Code Security 機能は以下のとおりです。

| Code Security 機能                    | Java トレーサーの最小バージョン |
| ------------------------------------------- | ----------------------------|
| Runtime Software Composition Analysis (SCA) | 1.1.4                       |
| Runtime Code Analysis (IAST)                | 1.15.0                      |

Java でサポートされているすべての Code Security 機能を利用するための最小トレーサーバージョンは 1.15.0 です。

#### サポートされているデプロイメントタイプ {#supported-deployment-types}
| タイプ              | Runtime Software Composition Analysis (SCA) | Runtime Code Analysis (IAST)        |
|------------------ | ------------------------------------------- | ----------------------------------- |
| Docker            | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| Kubernetes        | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| Amazon ECS        | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| AWS Fargate       | <i class="icon-check-bold"></i>             | プレビュー (1.15.0)                    |
| AWS Lambda        |                                             |                                     |
| Azure App Service | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |

**注**: Azure App Service は、**Web アプリケーションのみ**サポートされています。Code Security は Azure Functions をサポートしていません。

### 言語とフレームワークの互換性 {#language-and-framework-compatibility}

#### サポートされている Java バージョン {#supported-java-versions}
Java トレーサーは、次の Oracle JDK および OpenJDK の JVM ランタイムの自動インスツルメンテーションをサポートします。

| JVM バージョン | オペレーティングシステム                                                                     | サポートレベル                       | トレーサーバージョン |
| -------------| ------------------------------------------------------------------------------------- | ----------------------------------- | -------------- |
| 8 ～ 21      | Windows (x86-64)<br>Linux (glibc、musl) (arm64、x86-64)<br>MacOS (arm64、x86-64)      | サポート対象                           | 最新版         |


Datadog は、Java の早期アクセスバージョンを公式にサポートしていません。

バージョン 22 以降はプレビューとしてサポートされています。

#### Web フレームワークの互換性 {#web-framework-compatibility}
##### Code Security 機能に関する注意事項 {#code-security-capability-notes}
- **Runtime Software Composition Analysis (SCA)** はすべてのフレームワークでサポートされています
- お使いのフレームワークが **Runtime Code Analysis (IAST)** でサポートされていない場合でも、Weak Cipher、Weak Hashing、Weak Randomness、Insecure Cookie、HttpOnly フラグのない Cookie、および SameSite フラグのない Cookie の脆弱性は引き続き検出されます。

| フレームワーク                   | バージョン         | Runtime Code Analysis (IAST)      |
| --------------------------- | ---------------- | --------------------------------- |
| Grizzly                     | 2.0+             | <i class="icon-check-bold"></i>   |
| Glassfish                   |                  | <i class="icon-check-bold"></i>   |
| Java Servlet                | 2.3+、3.0+       | <i class="icon-check-bold"></i>   |
| Jetty                       | 7.0-9.x、10.x    | <i class="icon-check-bold"></i>   |
| Spring Boot                 | 1.5              | <i class="icon-check-bold"></i>   |
| Spring Web (MVC)            | 4.0+             | <i class="icon-check-bold"></i>   |
| Spring WebFlux              | 5.0+             | <i class="icon-check-bold"></i>   |
| Tomcat                      | 5.5+             | <i class="icon-check-bold"></i>   |
| Vert.x                      | 3.4-3.9.x        | <i class="icon-check-bold"></i>   |

**注:** 多くのアプリケーションサーバーは Servlet 互換で、そのインスツルメンテーションによって自動的にカバーされます (Websphere、Weblogic、JBoss)。また、Spring Boot (バージョン 3) のようなフレームワークは、通常、Tomcat、Jetty、Netty など、サポートされた組み込みアプリケーションサーバーを使用するため、本質的に機能します。

<div class="alert alert-info">お使いのフレームワークがリストにない場合は、お知らせください。<a href="https://forms.gle/gHrxGQMEnAobukfn7">こちらの短いフォームに記入し、詳細を送信してください</a>。</div>

#### ネットワーキングフレームワークの互換性 {#networking-framework-compatibility}

`dd-java-agent` には、次のネットワーキングフレームワークの自動トレースのサポートが含まれます。

##### Code Security 機能に関する注意事項 {#code-security-capability-notes-1}
- **Runtime Software Composition Analysis (SCA)** はすべてのフレームワークでサポートされています
- お使いのフレームワークが **Runtime Code Analysis (IAST)** でサポートされていない場合でも、Weak Cipher、Weak Hashing、Insecure Cookie、HttpOnly フラグのない Cookie、SameSite フラグのない Cookie、HSTS Header Missing、および X-Content-Type-Options Header Missing の脆弱性は引き続き検出されます。

| フレームワーク                              | バージョン    | Runtime Code Analysis (IAST)                   |
| -------------------------------------- | ----------- | ---------------------------------------------- |
| Apache HTTP Client                     | 4.0+        |                                                |
| gRPC                                   | 1.5+        |                                                |
| HttpURLConnection                      | すべて         |                                                |
| Jax RS Clients                         | 2.0+        |  <i class="icon-check-bold"></i>               |
| Jersey Server                          | 1.9-2.29    |  <i class="icon-check-bold"></i>               |
| Netty HTTP Server                      |  3.8+       |                                                |
| RESTEasy                               |  3.0.x      |                                                |
| Spring SessionAwareMessageListener     | 3.1+        |                                                |

<div class="alert alert-info">お使いのフレームワークがリストにない場合は、お知らせください。<a href="https://forms.gle/gHrxGQMEnAobukfn7">こちらの短いフォームに記入し、詳細を送信してください</a>。</div>

#### データストアの互換性 {#data-store-compatibility}

`dd-java-agent` には、次のデータベースフレームワーク/ドライバーの自動トレースのサポートが含まれます。

**データストアのトレーシングでは以下の確認が可能です。**

- リクエストから応答までの所要時間
- クエリ情報 (サニタイズされたクエリ文字列など)
- エラーとスタックトレースの取得

##### Code Security 機能に関する注意事項 {#code-security-capability-notes-2}
- **Runtime Software Composition Analysis (SCA)** はすべてのフレームワークでサポートされています
- お使いのフレームワークが以下に記載されていない場合、**Runtime Code Analysis (IAST)** は SQL インジェクションの脆弱性を検出しませんが、[こちら][3]に記載されているその他の種類の脆弱性は引き続き検出されます。

| データベース                | バージョン | Runtime Code Analysis (IAST)     |
| ----------------------- | -------- | -------------------------------- |
| Aerospike               | 4.0+     |                                  |
| Couchbase               | 2.0+     |                                  |
| JDBC                    | N/A      | <i class="icon-check-bold"></i>  |
| MongoDB                 | 3.0-4.0+ |                                  |

<div class="alert alert-info">お使いのフレームワークがリストにない場合は、お知らせください。<a href="https://forms.gle/gHrxGQMEnAobukfn7">こちらの短いフォームに記入し、詳細を送信してください</a>。</div>


[1]: /ja/tracing/trace_collection/compatibility/java/
[2]: /ja/remote_configuration
[3]: /ja/security/code_security/software_composition_analysis/

{{% /collapse-content %}}

{{% collapse-content title=".NET" level="h3" %}}

### Code Security 機能のサポート {#code-security-capabilities-support}

指定されたトレーサーバージョンにおいて、.NET ライブラリでサポートされている Code Security 機能は以下のとおりです。

| Code Security 機能                    | .NET トレーサーの最小バージョン |
| ------------------------------------------- | --------------------------- |
| Runtime Software Composition Analysis (SCA) | 2.16.0                      |
| Runtime Code Analysis (IAST)                | 2.42.0                      |

.NET でサポートされるすべてのコードセキュリティ機能を利用するための最小トレーサーバージョンは 2.42.0 です。

#### サポートされるデプロイメントタイプ {#supported-deployment-types-1}
| タイプ              | Runtime Software Composition Analysis (SCA) | Runtime Code Analysis (IAST)        |
|------------------ | ------------------------------------------- | ----------------------------------- |
| Docker            | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| Kubernetes        | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| Amazon ECS        | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| AWS Fargate       | <i class="icon-check-bold"></i>             | プレビュー (2.42.0)                    |
| AWS Lambda        |                                             |                                     |
| Azure App Service | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |

**注**: Azure App Service は、**Web アプリケーションのみ**サポートされています。Azure Functions では、Code Security 機能はサポートされていません。

### 言語とフレームワークの互換性 {#language-and-framework-compatibility-1}

#### サポートされている .NET バージョン {#supported-net-versions}

このセクションに記載されているすべてのバージョンは、一般提供 (GA) されています。

Runtime Code Analysis (IAST) は、以下の .NET および .NET Core ランタイムをサポートしています。

| .NET バージョン  | Microsoft のサポート終了日 | パッケージバージョン    |
| ------------- | --------------------- | ------------------ |
| .NET 10       | _2028 年 11 月 14 日 _   | 最新版 (>= 3.31.0) |
| .NET 9        | _2026 年 11 月 10 日 _   | 最新版 (>= 3.6.0)  |
| .NET 8        | _2026 年 11 月 10 日 _   | 最新版 (>= 2.42.0) |
| .NET 7        | 2024 年 5 月 14 日          | 最新版 (>= 2.42.0) |
| .NET 6        | 2024 年 11 月 12 日     | 最新版 (>= 2.42.0) |
| .NET 5        | 2022 年 5 月 10 日          | 最新版 (>= 2.42.0) |
| .NET Core 3.1 | 2022 年 12 月 13 日     | 最新版 (>= 2.42.0) |

Runtime Code Analysis (IAST) は、以下の .NET Framework バージョンをサポートしています。

| .NET Framework バージョン  | Microsoft サポート終了日 | パッケージバージョン     |
| ----------------------- | --------------------- | ------------------- |
| 4.8                     |                       | 最新版             |
| 4.7.2                   |                       | 最新版              |
| 4.7                     |                       | 最新版              |
| 4.6.2                   |                       | 最新版              |
| 4.6.1                  | 2022 年 4 月 26 日        | 最新版          |

これらは、以下のアーキテクチャでサポートされています。
- Linux (GNU) x86-64、ARM64
- Alpine Linux (musl) x86-64、ARM64
- Windows (msvc) x86、x86-64

.NET トレーサーがサポートするランタイムおよびオペレーティングシステムについては、[.NET および .NET Core の互換性要件][45]および [.NET Framework の互換性要件][46]を参照してください。

#### Web フレームワークの互換性 {#web-framework-compatibility-1}
##### Code Security 機能に関する注意事項 {#code-security-capability-notes-3}

- **Runtime Software Composition Analysis (SCA)** はすべてのフレームワークでサポートされています。
- ご使用のフレームワークが以下のリストにない場合でも、**Runtime Code Analysis (IAST)** は Insecure Cookie の脆弱性を引き続き検出します。

| フレームワーク               | Runtime Code Analysis (IAST)     |
| ----------------------- | -------------------------------- |
| ASP.NET Core (minimal APIs を含む) | <i class="icon-check-bold"></i>  |
| ASP.NET MVC             | <i class="icon-check-bold"></i>  |
| ASP.NET Web API 2       | <i class="icon-check-bold"></i>  |

<div class="alert alert-info">お使いのフレームワークがリストにない場合は、お知らせください。<a href="https://forms.gle/gHrxGQMEnAobukfn7">こちらの短いフォームに記入し、詳細を送信してください</a>。</div>

### ネットワーキングフレームワークの互換性 {#networking-framework-compatibility-1}
##### Code Security 機能に関する注意事項 {#code-security-capability-notes-4}

- **Runtime Software Composition Analysis (SCA)** はすべてのフレームワークでサポートされています

| フレームワーク | Runtime Code Analysis (IAST)                |
|---------- |-------------------------------------------- |
| http      | <i class="icon-check-bold"></i>             |
| https     | <i class="icon-check-bold"></i>             |

<div class="alert alert-info">お使いのフレームワークがリストにない場合は、お知らせください。<a href="https://forms.gle/gHrxGQMEnAobukfn7">こちらの短いフォームに記入し、詳細を送信してください</a>。</div>

#### データストアの互換性 {#data-store-compatibility-1}

**データストアのトレーシングでは以下の確認が可能です。**

- クエリ情報 (サニタイジングされたクエリ文字列など)
- エラーとスタックトレースの取得

##### Code Security 機能に関する注意事項 {#code-security-capability-notes-5}

- **Runtime Software Composition Analysis (SCA)** はすべてのフレームワークでサポートされています。

| フレームワーク        | Runtime Code Analysis (IAST)    |
|------------------|---------------------------------|
| OracleDB         | <i class="icon-check-bold"></i> |
| ADO.NET          | <i class="icon-check-bold"></i> |
| SQL Server       | <i class="icon-check-bold"></i> |
| MySQL            | <i class="icon-check-bold"></i> |
| SQLite           | <i class="icon-check-bold"></i> |

[1]: /ja/tracing/trace_collection/compatibility/dotnet-core/
[2]: /ja/tracing/trace_collection/compatibility/dotnet-framework/
[3]: /ja/remote_configuration#enabling-remote-configuration
[45]: /ja/tracing/trace_collection/compatibility/dotnet-core/
[46]: /ja/tracing/trace_collection/compatibility/dotnet-framework/


{{% /collapse-content %}}

{{% collapse-content title="Node.js" level="h3" %}}

### Code Security 機能 {#code-security-capabilities-1}

指定されたトレーサーバージョンにおいて、Node.js ライブラリでサポートされている Code Security 機能は以下のとおりです。

| Code Security 機能                      | Node.js トレーサーの最小バージョン                     |
|---------------------------------------------- | -------------------------------------------------- |
| Runtime Software Composition Analysis (SCA)   | 4.0.0                                              |
| Runtime Code Analysis (IAST)                  | Node.js 16+ の場合は 4.18.0、Node.js 18+ の場合は 5.0.0   |

Node.js でサポートされるすべてのコードセキュリティ機能を利用するための最小トレーサーバージョンは、Node.js 16+ の場合は 4.30.0、Node.js 18+ の場合は 5.0.0 です。

#### サポートされるデプロイメントタイプ {#supported-deployment-types-2}
| タイプ         | Runtime Software Composition Analysis (SCA)   | Runtime Code Analysis (IAST)                               |
|------------- | --------------------------------------------- | ---------------------------------------------------------- |
| Docker       | <i class="icon-check-bold"></i>               | <i class="icon-check-bold"></i>                            |
| Kubernetes   | <i class="icon-check-bold"></i>               | <i class="icon-check-bold"></i>                            |
| Amazon ECS   | <i class="icon-check-bold"></i>               | <i class="icon-check-bold"></i>                            |
| AWS Fargate  | <i class="icon-check-bold"></i>               | プレビュー (Node.js 16+ の場合は 4.18.0、Node.js 18+ の場合は 5.0.0) |
| AWS Lambda   | <i class="icon-check-bold"></i>               | サポートされていません                                              |

### 言語とフレームワークの互換性 {#language-and-framework-compatibility-2}

#### Node.js のバージョンサポート {#nodejs-version-support}

Node.js プロジェクトが LTS メジャーリリースラインのサポートを終了 (EOL) すると、`dd-trace` の次のメジャーバージョンでもそのサポートが終了します。
`dd-trace` ライブラリの最後のメジャーサポートリリースラインは、その EOL バージョンの Node.js をメンテナンスモードで少なくともあと 1 年間サポートします。

一部の問題は `dd-trace` では解決できず、Node.js 側で解決する必要があります。これが発生し、該当する Node.js リリースが EOL である場合、EOL ではない別のリリースに移行せずに問題を解決することはできません。
Datadog は、非 LTS の Node.js メジャーリリースライン (奇数番号のバージョン) に対する特定のサポートを提供するための `dd-trace` の新しいリリースを作成しません。

最良のサポートを受けるには、常に最新の LTS リリースの Node.js と、`dd-trace` の最新メジャーバージョンを実行してください。どの Node.js リリースラインを使用する場合でも、そのリリースラインにおける最新バージョンの Node.js を使用して、最新のセキュリティ修正が適用されていることを確認してください。

Node.js のリリースについては、[Node.js の公式ドキュメント][4]を参照してください。

#### オペレーティングシステム対応 {#operating-system-support}

以下のオペレーティングシステムは、`dd-trace` によって公式にサポートされています。リストに記載されていないオペレーティングシステムでも動作する可能性はありますが、アプリケーションセキュリティ機能、プロファイリング、ランタイムメトリクスなどの一部の機能を利用できない場合があります。一般的に、メジャーバージョンの初期リリース時にアクティブにメンテナンスされているオペレーティングシステムはサポートされます。

| オペレーティングシステム | アーキテクチャ | 最小バージョン                         |
|------------------|---------------|------------------------------------------|
| Linux (glibc)    | arm64、x64    | CentOS 7、Debian 9、RHEL 7、Ubuntu 14.04 |
| Linux (musl)     | arm64、x64    | Alpine 3.13                              |
| macOS            | arm64、x64    | Catalina (10.15)                         |
| Windows          | x64           | Windows 8.1、Windows Server 2012         |

#### Web フレームワークの互換性 {#web-framework-compatibility-2}
##### Code Security 機能に関する注意事項 {#code-security-capability-notes-6}
- **Runtime Software Composition Analysis (SCA)** はすべてのフレームワークでサポートされています
- お使いのフレームワークが以下のリストにない場合でも、**Runtime Code Analysis (IAST)** では Weak Cipher、Weak Hashing、Weak Randomness、Insecure Cookie、HttpOnly フラグのない Cookie、SameSite フラグのない Cookie、HSTS Header Missing、および X-Content-Type-Options Header Missing の脆弱性が引き続き検出されます。

| フレームワーク | バージョン | Runtime Code Analysis (IAST)     |
|-----------|----------|----------------------------------|
| express   | >=4      | <i class="icon-check-bold"></i>  |
| fastify   | >=2      | <i class="icon-check-bold"></i>  |
| nextjs    | >=11.1   |                                  |

<div class="alert alert-info">サポートされていない機能や、お使いの Node.js フレームワークのサポートの追加をご希望の場合は、お知らせください。<a href="https://forms.gle/gHrxGQMEnAobukfn7">こちらの短いフォームに記入し、詳細を送信してください</a>。</div>

### ネットワーキングフレームワークの互換性 {#networking-framework-compatibility-2}
##### Code Security 機能に関する注意事項 {#code-security-capability-notes-7}

- **Runtime Software Composition Analysis (SCA)** はすべてのフレームワークでサポートされています

| フレームワーク | Runtime Code Analysis (IAST)                |
|---------- |-------------------------------------------- |
| http      | <i class="icon-check-bold"></i>             |
| https     | <i class="icon-check-bold"></i>             |

<div class="alert alert-info">お使いのフレームワークがリストにない場合は、お知らせください。<a href="https://forms.gle/gHrxGQMEnAobukfn7">こちらの短いフォームに記入し、詳細を送信してください</a>。</div>

### データストアの互換性 {#data-store-compatibility-2}

Datastore トレーシングにより得られる情報:

- クエリ情報 (サニタイズされたクエリ文字列など)
- エラーとスタックトレースの取得

##### Code Security 機能に関する注意事項 {#code-security-capability-notes-8}

- **Runtime Software Composition Analysis (SCA)** はすべてのフレームワークでサポートされています。


| フレームワーク                | バージョン  | Runtime Code Analysis (IAST)           |
|--------------------------|-----------|--------------------------------------- |
| [@apollo/server][43]     | `>=4`     |                                        |
| [apollo-server-core][44] | `>=3`     |                                        |
| [cassandra-driver][28]   | `>=3`     |                                        |
| [couchbase][29]          | `^2.4.2`  |                                        |
| [elasticsearch][30]      | `>=10`    |                                        |
| [ioredis][31]            | `>=2`     |                                        |
| [knex][32]               | `>=0.8`   |                                        |
| [mariadb][5]             | `>=3`     |                                        |
| [memcached][33]          | `>=2.2`   |                                        |
| [mongodb-core][34]       | `>=2`     | <i class="icon-check-bold"></i>        |
| [mysql][35]              | `>=2`     | <i class="icon-check-bold"></i>        |
| [mysql2][36]             | `>=1`     | <i class="icon-check-bold"></i>        |
| [oracledb][37]           | `>=5`     |                                        |
| [pg][38]                 | `>=4`     | <i class="icon-check-bold"></i>        |
| [redis][39]              | `>=0.12`  |                                        |
| [sharedb][40]            | `>=1`     |                                        |
| [tedious][41]            | `>=1`     |                                        |
| [sequelize][42]          | `>=4`     | <i class="icon-check-bold"></i>        |

[1]: /ja/tracing/trace_collection/compatibility/nodejs/
[2]: /ja/remote_configuration#enabling-remote-configuration
[4]: https://github.com/nodejs/release#release-schedule
[5]: https://github.com/mariadb-corporation/mariadb-connector-nodejs
[28]: https://github.com/datastax/nodejs-driver
[29]: https://github.com/couchbase/couchnode
[30]: https://github.com/elastic/elasticsearch-js
[31]: https://github.com/luin/ioredis
[32]: https://knexjs.org
[33]: https://github.com/3rd-Eden/memcached
[34]: https://www.mongodb.com/docs/drivers/node/current/
[35]: https://github.com/mysqljs/mysql
[36]: https://github.com/sidorares/node-mysql2
[37]: https://oracle.github.io/node-oracledb/
[38]: https://node-postgres.com
[39]: https://github.com/NodeRedis/node_redis
[40]: https://share.github.io/sharedb/
[41]: http://tediousjs.github.io/tedious
[42]: https://github.com/sequelize/sequelize
[43]: https://github.com/apollographql/apollo-server
[44]: https://www.npmjs.com/package/apollo-server-core


{{% /collapse-content %}}

{{% collapse-content title="Python" level="h3" %}}

### Code Security 機能のサポート {#code-security-capabilities-support-1}

指定されたトレーサーバージョンにおいて、Python ライブラリでサポートされている Code Security 機能は以下のとおりです。

| Code Security 機能                    | Python トレーサーの最小バージョン |
| ------------------------------------------- |-------------------------------|
| Runtime Software Composition Analysis (SCA) | 1.5.0                         |
| Runtime Code Analysis (IAST)                | 3.18.0                        |

#### サポートされるデプロイメントタイプ {#supported-deployment-types-3}
| タイプ        | Runtime Code Analysis (IAST)      |
|------------ |---------------------------------- |
| Docker      | <i class="icon-check-bold"></i>   |
| Kubernetes  | <i class="icon-check-bold"></i>   |
| Amazon ECS  | <i class="icon-check-bold"></i>   |
| AWS Fargate | プレビュー (2.9.3)                   |
| AWS Lambda  |                                   |


### 言語とフレームワークの互換性 {#language-and-framework-compatibility-3}

#### サポートされている Python バージョン {#supported-python-versions}

Python Application Security Client ライブラリは、ライブラリおよび Python ランタイムのさまざまなバージョンのサポートレベルを規定する[バージョニングポリシー][3]に準拠しています。

2 つのリリースブランチに対応しています。

{{< partial name="trace_collection/python/supported_versions.html" >}}

また、このライブラリは以下のランタイムをサポートしています。

| OS      | CPU                   | Runtime   | Runtime バージョン | サポートされている ddtrace バージョン   |
|---------|-----------------------|-----------|-----------------|------------------------------|
| Linux   | x86-64、AArch64       | CPython   | 3.9+            | >=4、<5                      |
| macOS   | Intel、Apple Silicon  | CPython   | 3.9+            | >=4、<5                      |
| Linux   | x86-64、i686、AArch64 | CPython   | 3.8+            | >=3、<4                      |
| macOS   | Intel、Apple Silicon  | CPython   | 3.8+            | >=3、<4                      |

#### Web フレームワークの互換性 {#web-framework-compatibility-3}
##### Code Security 機能に関する注意事項 {#code-security-capability-notes-9}

- **Runtime Software Composition Analysis (SCA)** はすべてのフレームワークでサポートされています

#### サポートされるフレームワーク {#supported-frameworks}

| フレームワーク   | バージョン | Runtime Code Analysis (IAST)    |
|-------------|----------|---------------------------------|
| Django      | 2.2      | <i class="icon-check-bold"></i> |
| FastAPI     | 0.86     | <i class="icon-check-bold"></i> |
| Flask       | 1.1      | <i class="icon-check-bold"></i> |

<div class="alert alert-info">お使いのフレームワークがリストにない場合は、お知らせください。<a href="https://forms.gle/gHrxGQMEnAobukfn7">こちらの短いフォームに記入し、詳細を送信してください</a>。</div>

#### データストアの互換性 {#data-store-compatibility-3}

Datastore トレーシングにより得られる情報:

- クエリ情報 (サニタイジングされたクエリ文字列など)
- エラーとスタックトレースの取得

##### Code Security 機能に関する注意事項 {#code-security-capability-notes-10}

- **Runtime Software Composition Analysis (SCA)** はすべてのフレームワークでサポートされています。

この Python ライブラリは[データベース API 仕様][4]をサポートしており、すべての汎用 SQL データベースに対応しています。これには、SQLite、MySQL、Postgres、MariaDB などのデータベースが含まれます。

[1]: /ja/tracing/trace_collection/compatibility/python/
[2]: /ja/remote_configuration#enabling-remote-configuration
[3]: https://ddtrace.readthedocs.io/en/stable/versioning.html
[4]: https://peps.python.org/pep-0249/


{{% /collapse-content %}}