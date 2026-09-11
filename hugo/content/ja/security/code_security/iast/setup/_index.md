---
aliases:
- /ja/security/application_security/enabling/single_step/code_security/
- /ja/security/application_security/enabling/tracing_libraries/code_security/
- /ja/security/application_security/code_security/setup/
disable_toc: false
title: ランタイムコード解析 (IAST) をセットアップする
---

## 前提条件
ランタイムコード解析 (IAST) をセットアップする前に、以下の前提条件を満たしていることを確認してください:

1. **Datadog Agent のインストール:** Datadog Agent がアプリケーションが稼働するオペレーティングシステム、コンテナ、クラウド、または仮想環境上にインストールおよび適切に設定されていること。
2. **Datadog APM の設定:** Datadog APM がアプリケーションまたはサービスに設定されており、`type:web` の Web トレースが Datadog で受信されていること。
3. **対応トレーシングライブラリ:** お使いのアプリケーションまたはサービスで使用している Datadog トレーシングライブラリが、そのアプリケーションまたはサービスの言語向けにランタイムコード解析 (IAST) 機能をサポートしている必要があります。詳細は、下記の**互換性要件**セクションを参照してください。

## Datadog トレーシングライブラリの使用

ランタイムコード解析 (IAST) を有効にする方法については、アプリケーションの言語とインフラタイプを選択して確認してください。


{{% collapse-content title="Java" level="h4" %}}

Java アプリケーションを Docker、Kubernetes、Amazon ECS、AWS Fargate 上で実行する際に、コードレベルの脆弱性を検出し、アプリケーションセキュリティをモニタリングできます。

サービスでランタイムコード解析 (IAST) を有効にするには、以下の手順に従ってください:

1. [Datadog Agent][6] をバージョン 7.41.1 以上に更新します。
2. Datadog トレーシングライブラリを、ランタイムコード解析 (IAST) をオンにするために必要な最低バージョン以上にアップデートします。詳細は、下記の**互換性要件**を参照してください。
3. アプリケーションの構成に `DD_IAST_ENABLED=true` 環境変数を追加します。

   コマンドラインから

   ```shell
   java -javaagent:/path/to/dd-java-agent.jar -Ddd.iast.enabled=true -Ddd.service=<MY SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
   ```

   アプリケーションが動作している場所に応じて、以下のオーケストレーションツールのいずれかを使用します。

   **注**: 読み取り専用ファイルシステムはサポートされていません。アプリケーションは書き込み可能な `/tmp` ディレクトリへのアクセス権を持っている必要があります。


#### Docker CLI

APM 用の構成コンテナを更新するには、`docker run` コマンドに以下の引数を追加します。


```shell
docker run [...] -e DD_IAST_ENABLED=true [...]
```

#### Dockerfile

コンテナの Dockerfile に以下の環境変数の値を追加します。

```Dockerfile
DD_IAST_ENABLED=true
```

#### Kubernetes

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

#### Amazon ECS

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

[1]: https://github.com/DataDog/dd-trace-java/releases
[2]: /ja/security/code_security/iast/setup/
[3]: /ja/security/code_security/iast/setup/
[4]: https://app.datadoghq.com/security/appsec/vm
[5]: /ja/help
[6]: /ja/agent/versions/upgrade_between_agent_minor_versions/


{{% /collapse-content %}} 

{{% collapse-content title=".NET" level="h4" %}}

.NET アプリケーションを Docker、Kubernetes、Amazon ECS、AWS Fargate 上で実行する際に、コードレベルの脆弱性を検出し、アプリケーションセキュリティをモニタリングできます。

サービスでランタイムコード解析 (IAST) を有効にするには、以下の手順に従ってください:

1. [Datadog Agent][3] をバージョン 7.41.1 以上に更新します。
2. Datadog トレーシングライブラリを、ランタイムコード解析 (IAST) をオンにするために必要な最低バージョン以上にアップデートします。詳細は、下記の**互換性要件**を参照してください。
3. アプリケーションの構成に `DD_IAST_ENABLED=true` 環境変数を追加します。たとえば、Windows のセルフホスト環境では、アプリケーションのスタートアップスクリプトの一部として、次の PowerShell スニペットを実行します:

   ```sh
   $target=[System.EnvironmentVariableTarget]::Process
   [System.Environment]::SetEnvironmentVariable("DD_IAST_ENABLED","true",$target)
   ```

または、アプリケーションが動作している場所に応じて、次の方法のいずれかを使用します:

#### Windows セルフホスト

Windows コンソールで:

```sh
rem Set environment variables
SET DD_IAST_ENABLED=true

rem Start application
dotnet.exe example.dll
```

#### IIS

管理者として以下の PowerShell コマンドを実行し、レジストリ `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Environment` に必要な環境変数を設定して IIS を再起動することもできます。

```sh
$target=[System.EnvironmentVariableTarget]::Machine
[System.Environment]::SetEnvironmentVariable("DD_IAST_ENABLED","true",$target)
net stop was /y
net start w3svc
```

#### Linux

アプリケーションの構成に以下を追加します。

```
DD_IAST_ENABLED=true
```

#### Docker CLI

docker run コマンドに引数を追加して、APM 用のコンテナ設定を更新します。

```
docker run -d --name app -e DD_IAST_ENABLED=true company/app:latest
```

#### Dockerfile

コンテナの Dockerfile に以下の環境変数の値を追加します。

```
ENV DD_IAST_ENABLED=true
```

#### Kubernetes

APM のデプロイ構成ファイルを更新し、ランタイムコード解析 (IAST) の環境変数を追加します。

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

#### AWS ECS

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

#### AWS Fargate

コンテナの Dockerfile に以下の行を追加します。

```
ENV DD_IAST_ENABLED=true
```

ランタイムコード解析 (IAST) の動作を確認するには、サービスをブラウズして [Vulnerability Explorer][4] でコードレベルの脆弱性を探してください。

{{< img src="/security/application_security/Code-Level-Vulnerability-Details-New.mp4" alt="Code Vulnerabilities を示す動画" video="true" >}}

さらにサポートが必要な場合は、[Datadog サポート][5]にお問い合わせください。

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/latest
[2]: /ja/security/code_security/iast/setup/
[3]: /ja/agent/versions/upgrade_between_agent_minor_versions/
[4]: /ja/security/code_security/iast/setup/
[5]: /ja/help

{{% /collapse-content %}} 

{{% collapse-content title="Node.js" level="h4" %}}

Node.js アプリケーションを Docker、Kubernetes、Amazon ECS、AWS Fargate 上で実行する際に、コードレベルの脆弱性を検出し、アプリケーションセキュリティをモニタリングできます。

サービスでランタイムコード解析 (IAST) を有効にするには、以下の手順に従ってください:

1. [Datadog Agent][4] をバージョン 7.41.1 以上に更新します。
2. Datadog トレーシングライブラリを、ランタイムコード解析 (IAST) をオンにするために必要な最低バージョン以上にアップデートします。詳細は、下記の**互換性要件**を参照してください。
3. アプリケーションの構成に `DD_IAST_ENABLED=true` 環境変数を追加します。

   `--require` オプションを使って Node.js に APM ライブラリをコマンドラインから初期化する場合:

   ```shell
   node --require dd-trace/init app.js
   ```
   環境変数を使用してランタイムコード解析 (IAST) を有効にします。
   ```shell
   DD_IAST_ENABLED=true node app.js
   ```
   具体的な方法は、サービスが動作している場所によって異なります:

#### Docker CLI

APM 用の構成コンテナを更新するには、`docker run` コマンドに以下の引数を追加します。

```shell
docker run [...] -e DD_IAST_ENABLED=true [...]
```

#### Dockerfile

コンテナの Dockerfile に以下の環境変数の値を追加します。

```Dockerfile
ENV DD_IAST_ENABLED=true
```

#### Kubernetes

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

#### Amazon ECS

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

[1]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md
[2]: /ja/security/code_security/iast/setup/nodejs/
[3]: /ja/security/code_security/iast/setup/
[4]: /ja/agent/versions/upgrade_between_agent_minor_versions/
[5]: https://app.datadoghq.com/security/appsec/vm/code
[6]: /ja/help

{{% /collapse-content %}} 

{{% collapse-content title="Python" level="h4" %}}

Python アプリケーションを Docker、Kubernetes、Amazon ECS、AWS Fargate 上で実行する際に、コードレベルの脆弱性を検出し、アプリケーションセキュリティをモニタリングできます。

注: Python でのランタイムコード解析 (IAST) はプレビュー版です。

サービスでランタイムコード解析 (IAST) を有効にするには、以下の手順に従ってください:

1. [Datadog Agent][6] をバージョン 7.41.1 以上に更新します。
2. Datadog トレーシングライブラリを、ランタイムコード解析 (IAST) をオンにするために必要な最低バージョン以上にアップデートします。詳細は、下記の**互換性要件**を参照してください。
3. アプリケーションの構成に `DD_IAST_ENABLED=true` 環境変数を追加します。

   コマンドラインから

   ```shell
   DD_IAST_ENABLED=true ddtrace-run python app.py
   ```

   または、アプリケーションが実行される場所に応じて、以下の方法のいずれかを使用します。


#### Docker CLI

APM 用の構成コンテナを更新するには、`docker run` コマンドに以下の引数を追加します。


```shell
docker run [...] -e DD_IAST_ENABLED=true [...]
```

#### Dockerfile

コンテナの Dockerfile に以下の環境変数の値を追加します。

```Dockerfile
DD_IAST_ENABLED=true
```

#### Kubernetes

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

#### Amazon ECS

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

#### サードパーティライブラリとの互換性に関する注意事項

ランタイムコード解析 (IAST) は、実行時に Python のコードを変換します。これにより、以下を含む類似のコード変換を行うサードパーティ Python ライブラリと競合が発生する可能性がありますが、これらに限定されません:

- Numba
- JAX
- TorchScript
- TensorFlow
- Bytecode
- Codetransformer
- PyPy

さらに、ランタイムコード解析 (IAST) はネイティブ（コンパイル済み）コードにおいて、汚染範囲 (taint ranges) を正しく伝搬しません。そのため、C や C++ で書かれたモジュールや CPython API、Cython のような中間言語システムに大きく依存するコードベースの場合、結果が予想よりも不正確になる可能性があります。


[1]: https://github.com/DataDog/dd-trace-py/releases
[2]: /ja/security/code_security/iast/setup/python
[3]: /ja/security/code_security/iast/setup/
[4]: https://app.datadoghq.com/security/appsec/vm/code
[5]: /ja/help
[6]: /ja/agent/versions/upgrade_between_agent_minor_versions/

{{% /collapse-content %}} 

### セットアップの完了

1. サービスを再起動します。
2. ランタイムコード解析 (IAST) の動作を確認するには、サービスをブラウズして [Vulnerability Explorer][4] でコードレベルの脆弱性を探してください。

{{< img src="/security/application_security/Code-Level-Vulnerability-Details-New.mp4" alt="脆弱性を示す動画" video="true" >}}

さらにサポートが必要な場合は、[Datadog サポート][5]にお問い合わせください。

[1]: /ja/security/code_security/iast/setup/
[4]: https://app.datadoghq.com/security/appsec/vm
[5]: /ja/help

## 互換性要件

各言語のトレーシングライブラリにおけるサポート状況に基づき、以下のコードセキュリティ機能を利用できます:

| コードセキュリティ機能                      | Java    | .NET     | Node.js    | Python      | Go             | Ruby          | PHP           |
|-----------------------------------------------|---------|----------|------------|-------------|----------------|---------------|---------------|
| Runtime Software Composition Analysis (SCA)   | 1.1.4   | 2.16.0   | 4.0.0      | 1.5.0       | 1.49.0         | 1.11.0        | 0.90.0        |
| Runtime Code Analysis (IAST)                  | 1.15.0  | 2.42.0   | 4.18.0     | プレビュー     | 非対応  | 非対応 | 非対応 |

**注**: **静的ソフトウェア構成分析 (SCA)** および**静的コード解析 (SAST)** は Datadog のトレーシングライブラリを必要としません。そのため、以下に示す要件はこれら 2 つのコードセキュリティ機能には適用されません。

フレームワークの互換性と機能サポートの詳細については、アプリケーションの言語を選択してください。

{{% collapse-content title="Java" level="h4" %}}

### コードセキュリティ機能

指定されたトレーサーバージョンに対して、Java ライブラリでサポートされるコードセキュリティ機能は以下のとおりです:

| コードセキュリティ機能                    | Java トレーサーの最小バージョン |
| ------------------------------------------- | ----------------------------|
| Runtime Software Composition Analysis (SCA) | 1.1.4                       |
| Runtime Code Analysis (IAST)                | 1.15.0                      |

Java でサポートされるすべてのコードセキュリティ機能を利用するための最小トレーサーバージョンは 1.15.0 です。

#### サポートされるデプロイメントタイプ
| タイプ              | Runtime Software Composition Analysis (SCA) | Runtime Code Analysis (IAST)        |
|------------------ | ------------------------------------------- | ----------------------------------- |
| Docker            | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| Kubernetes        | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| Amazon ECS        | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| AWS Fargate       | <i class="icon-check-bold"></i>             | プレビュー (1.15.0)                    |
| AWS Lambda        |                                             |                                     |
| Azure App Service | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |

**注**: Azure App Service は **Web アプリケーションのみ**サポートされます。Azure Functions は Code Security のサポート対象外です。

### 言語とフレームワークの互換性

#### サポートされている Java バージョン
Java トレーサーは、次の Oracle JDK および OpenJDK の JVM ランタイムの自動インスツルメンテーションをサポートします。

| JVM バージョン | オペレーティングシステム                                                                     | サポートレベル                       | トレーサーバージョン |
| -------------| ------------------------------------------------------------------------------------- | ----------------------------------- | -------------- |
| 8〜17      | Windows (x86-64)<br>Linux (glibc、musl) (arm64、x86-64)<br>MacOS (arm64、x86-64)      | サポート                           | 最新         |


Datadog は、Java の早期アクセスバージョンを公式にサポートしていません。

#### Web フレームワークの互換性
##### コードセキュリティ機能に関する注意事項
- **Runtime Software Composition Analysis (SCA)** はすべてのフレームワークでサポートされます。
- **Runtime Code Analysis (IAST)** がフレームワークをサポートしていない場合でも、弱い暗号 (Weak Cipher)、弱いハッシュ (Weak Hashing)、弱い乱数生成 (Weak Randomness)、不適切な Cookie 設定 (Insecure Cookie)、HttpOnly が付与されていない Cookie、SameSite 属性が付与されていない Cookie などの脆弱性は引き続き検出されます。

| フレームワーク                   | バージョン         | Runtime Code Analysis (IAST)      |
| --------------------------- | ---------------- | --------------------------------- |
| Grizzly                     | 2.0+             | <i class="icon-check-bold"></i>   |
| Glassfish                   |                  | <i class="icon-check-bold"></i>   |
| Java Servlet                | 2.3+、3.0+       | <i class="icon-check-bold"></i>   |
| Jetty                       | 7.0-9.x, 10.x    | <i class="icon-check-bold"></i>   |
| Spring Boot                 | 1.5              | <i class="icon-check-bold"></i>   |
| Spring Web (MVC)            | 4.0+             | <i class="icon-check-bold"></i>   |
| Spring WebFlux              | 5.0+             | <i class="icon-check-bold"></i>   |
| Tomcat                      | 5.5+             | <i class="icon-check-bold"></i>   |
| Vert.x                      | 3.4-3.9.x        | <i class="icon-check-bold"></i>   |

**注:** 多くのアプリケーションサーバーは Servlet 互換でそのインスツルメンテーションによって自動的にカバーされます (Websphere、Weblogic、JBoss)。また、Spring Boot (バージョン 3) のようなフレームワークは、通常、Tomcat、Jetty、Netty など、サポートされた組み込みアプリケーションサーバーを使うため、本質的に機能します。

<div class="alert alert-info">ご希望のフレームワークが掲載されていない場合は、お知らせください！<a href="https://forms.gle/gHrxGQMEnAobukfn7">この短いフォーム</a>に必要事項を記入して、詳細を送信してください。</div>

#### ネットワーキングフレームワークの互換性

`dd-java-agent` には、次のネットワーキングフレームワークの自動トレースのサポートが含まれます。

##### コードセキュリティ機能に関する注意事項
- **Runtime Software Composition Analysis (SCA)** はすべてのフレームワークでサポートされます。
- **Runtime Code Analysis (IAST)** がフレームワークをサポートしていない場合でも、弱い暗号 (Weak Cipher)、弱いハッシュ (Weak Hashing)、不適切な Cookie 設定 (Insecure Cookie)、Cookie に HttpOnly が付与されていない、Cookie に SameSite 属性が付与されていない、HSTS ヘッダーが設定されていない、X-Content-Type-Options ヘッダーが設定されていないなどの脆弱性は引き続き検出されます。

| フレームワーク                              | バージョン    | Runtime Code Analysis (IAST)                   |
| -------------------------------------- | ----------- | ---------------------------------------------- |
| Apache HTTP クライアント                     | 4.0+        |                                                |
| gRPC                                   | 1.5+        |                                                |
| HttpURLConnection                      | すべて         |                                                |
| Jax RS クライアント                         | 2.0+        |  <i class="icon-check-bold"></i>               |
| Jersey サーバー                          | 1.9-2.29    |  <i class="icon-check-bold"></i>               |
| Netty HTTP サーバー                      |  3.8+       |                                                |
| RESTEasy                               |  3.0.x      |                                                |
| Spring SessionAwareMessageListener     | 3.1+        |                                                |

<div class="alert alert-info">ご希望のフレームワークが掲載されていない場合は、お知らせください！<a href="https://forms.gle/gHrxGQMEnAobukfn7">この短いフォーム</a>に必要事項を記入して、詳細を送信してください。</div>

#### データストアの互換性

`dd-java-agent` には、次のデータベースフレームワーク/ドライバーの自動トレースのサポートが含まれます。

**データストアのトレーシングでは以下の確認が可能です**

- リクエストの応答タイミング
- クエリ情報 (サニタイジングされたクエリ文字列など)
- エラーとスタックトレースの取得

##### コードセキュリティ機能に関する注意事項
- **Runtime Software Composition Analysis (SCA)** はすべてのフレームワークでサポートされます。
- 下記にサポートされていないフレームワークを使用している場合、**Runtime Code Analysis (IAST)** では SQL インジェクションの検出が行われませんが、それ以外の脆弱性については[こちら][3]にリストされている種類が引き続き検出されます。

| データベース                | バージョン | Runtime Code Analysis (IAST)     |
| ----------------------- | -------- | -------------------------------- |
| Aerospike               | 4.0+     |                                  |
| Couchbase               | 2.0+     |                                  |
| JDBC                    | N/A      | <i class="icon-check-bold"></i>  |
| MongoDB                 | 3.0-4.0+ |                                  |

<div class="alert alert-info">ご利用のフレームワークがリストにない場合は、<a href="https://forms.gle/gHrxGQMEnAobukfn7">この短いフォーム</a>にご記入ください。</div> 


[1]: /ja/tracing/trace_collection/compatibility/java/
[2]: /ja/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[3]: /ja/security/code_security/software_composition_analysis/

{{% /collapse-content %}} 

{{% collapse-content title=".NET" level="h4" %}}

### コードセキュリティ機能サポート

指定されたトレーサーバージョンに対して、.NET ライブラリでサポートされるコードセキュリティ機能は以下のとおりです:

| コードセキュリティ機能                    | .NET トレーサーの最小バージョン |
| ------------------------------------------- | --------------------------- |
| Runtime Software Composition Analysis (SCA) | 2.16.0                      |
| Runtime Code Analysis (IAST)                | 2.42.0                      |

.NET でサポートされるすべてのコードセキュリティ機能を利用するための最小トレーサーバージョンは 2.42.0 です。

#### サポートされるデプロイメントタイプ
| タイプ              | Runtime Software Composition Analysis (SCA) | Runtime Code Analysis (IAST)        |
|------------------ | ------------------------------------------- | ----------------------------------- |
| Docker            | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| Kubernetes        | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| Amazon ECS        | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| AWS Fargate       | <i class="icon-check-bold"></i>             | プレビュー (2.42.0)                    |
| AWS Lambda        |                                             |                                     |
| Azure App Service | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |

**注**: Azure App Service は **Web アプリケーションのみ**サポートされます。Azure Functions は Code Security 機能のサポート対象外です。

### 言語とフレームワークの互換性

#### サポートされている .NET バージョン

| .NET Framework バージョン  | マイクロソフトサポート終了 | サポートレベル       | パッケージバージョン     |
| ----------------------- | --------------------- | ------------------- | ------------------- |
| 4.8                     |                       | GA                  | 最新              |
| 4.7.2                   |                       | GA                  | 最新              |
| 4.7                     |                       | GA                  | 最新              |
| 4.6.2                   |                       | GA                  | 最新              |
| 4.6.1                   | 04/26/2022            | GA                  | 最新              |


これらは、以下のアーキテクチャでサポートされています。
- Linux (GNU) x86-64、ARM64
- Alpine Linux (musl) x86-64、ARM64
- macOS (Darwin) x86-64、ARM64
- Windows (msvc) x86、x86-64

#### Web フレームワークの互換性
##### コードセキュリティ機能に関する注意事項

- **Runtime Software Composition Analysis (SCA)** はすべてのフレームワークでサポートされます。
- リストにないフレームワークの場合、**Runtime Code Analysis (IAST)** では Insecure Cookie (不適切な Cookie 設定) の検出が継続されます。

| フレームワーク               | Runtime Code Analysis (IAST)     |
| ----------------------- | -------------------------------- |
| ASP.NET MVC             | <i class="icon-check-bold"></i>  |
| ASP.NET Web API 2       | <i class="icon-check-bold"></i>  |

<div class="alert alert-info">ご希望のフレームワークが掲載されていない場合は、お知らせください！<a href="https://forms.gle/gHrxGQMEnAobukfn7">この短いフォーム</a>に必要事項を記入して、詳細を送信してください。</div>

### ネットワーキングフレームワークの互換性
##### コードセキュリティ機能に関する注意事項

- **Runtime Software Composition Analysis (SCA)** はすべてのフレームワークでサポートされます。

| フレームワーク | Runtime Code Analysis (IAST)                |
|---------- |-------------------------------------------- |
| http      | <i class="icon-check-bold"></i>             |
| https     | <i class="icon-check-bold"></i>             |

<div class="alert alert-info">ご希望のフレームワークが掲載されていない場合は、お知らせください！<a href="https://forms.gle/gHrxGQMEnAobukfn7">この短いフォーム</a>に必要事項を記入して、詳細を送信してください。</div>

#### データストアの互換性

**データストアのトレーシングでは以下の確認が可能です**

- クエリ情報 (サニタイジングされたクエリ文字列など)
- エラーとスタックトレースの取得

##### コードセキュリティ機能に関する注意事項

- **Runtime Software Composition Analysis (SCA)** はすべてのフレームワークでサポートされます。

| フレームワーク        | Runtime Code Analysis (IAST)    |
|------------------|---------------------------------|
| OracleDB         | <i class="icon-check-bold"></i> |
| ADO.NET          | <i class="icon-check-bold"></i> |
| SQL Server       | <i class="icon-check-bold"></i> |
| MySQL            | <i class="icon-check-bold"></i> |
| SQLite           | <i class="icon-check-bold"></i> |

[1]: /ja/tracing/trace_collection/compatibility/dotnet-core/
[2]: /ja/tracing/trace_collection/compatibility/dotnet-framework/
[3]: /ja/agent/remote_config/#enabling-remote-configuration


{{% /collapse-content %}}

{{% collapse-content title="Node.js" level="h4" %}}

### コードセキュリティ機能

指定されたトレーサーバージョンに対して、Node.js ライブラリでサポートされるコードセキュリティ機能は以下のとおりです:

| コードセキュリティ機能                      | Node.js トレーサーの最小バージョン                     |
|---------------------------------------------- | -------------------------------------------------- |
| Runtime Software Composition Analysis (SCA)   | 4.0.0                                              |
| Runtime Code Analysis (IAST)                  | 4.18.0 (Node.js 16+) または 5.0.0 (Node.js 18+)   |

Node.js でサポートされるすべてのコードセキュリティ機能を利用するための最小トレーサーバージョンは、Node.js 16+ の場合は 4.30.0、Node.js 18+ の場合は 5.0.0 です。

#### サポートされるデプロイメントタイプ
| タイプ         | Runtime Software Composition Analysis (SCA)   | Runtime Code Analysis (IAST)                               |
|------------- | --------------------------------------------- | ---------------------------------------------------------- |
| Docker       | <i class="icon-check-bold"></i>               | <i class="icon-check-bold"></i>                            |
| Kubernetes   | <i class="icon-check-bold"></i>               | <i class="icon-check-bold"></i>                            |
| Amazon ECS   | <i class="icon-check-bold"></i>               | <i class="icon-check-bold"></i>                            |
| AWS Fargate  | <i class="icon-check-bold"></i>               | プレビュー (Node.js 16+ では 4.18.0、Node.js 18+ では 5.0.0) |
| AWS Lambda   | <i class="icon-check-bold"></i>               | 非対応                                              |

### 言語とフレームワークの互換性

#### Node.js のバージョンサポート

Node.js プロジェクトが LTS のメジャーリリースラインのサポートを終了すると (EOL になると)、次のメジャーバージョンの `dd-trace` でそのサポートが停止されます。
`dd-trace` ライブラリの最後のメジャーサポートリリースラインは、メンテナンスモードベースで、少なくともあと 1 年間はその EOL バージョンの Node.js をサポートします。

いくつかの問題は `dd-trace` で解決できず、代わりに Node.js で解決しなければなりません。このような場合、問題のある Node.js のリリースが EOL であれば、EOL ではない別のリリースに移行しなければ問題を解決することは不可能です。
Datadog は、LTS でない Node.js のメジャーリリースライン (奇数バージョン) に対する特定のサポートを提供するために、`dd-trace` の新しいリリースを作成することはありません。

最高のサポートレベルを得るためには、常に最新の LTS リリースの Node.js と、最新のメジャーバージョンの `dd-trace` を実行します。Node.js のどのリリースラインを使用する場合でも、最新のセキュリティ修正を確実に行うために、そのリリースラインの最新バージョンの Node.js を使用します。

Node.js のリリースについては、[Node.js の公式ドキュメント][4]を参照してください。

#### オペレーティングシステム対応

`dd-trace` が公式にサポートしているオペレーティングシステムは下記のとおりです。リスト外の OS も動作する可能性はありますが、アプリケーションセキュリティ機能、プロファイリング、ランタイムメトリクスなど一部機能が利用できない場合があります。一般的に、主要バージョンの初回リリース時点でアクティブにメンテナンスされている OS がサポート対象となります。

| オペレーティングシステム | アーキテクチャ | 最小バージョン                         |
|------------------|---------------|------------------------------------------|
| Linux (glibc)    | arm64、x64    | CentOS 7、Debian 9、RHEL 7、Ubuntu 14.04 |
| Linux (musl)     | arm64、x64    | Alpine 3.13                              |
| macOS            | arm64、x64    | Catalina (10.15)                         |
| Windows          | x64           | Windows 8.1、Windows Server 2012         |

#### Web フレームワークの互換性
##### コードセキュリティ機能に関する注意事項
- **Runtime Software Composition Analysis (SCA)** はすべてのフレームワークでサポートされます。
- リストにないフレームワークの場合、**Runtime Code Analysis (IAST)** では弱い暗号 (Weak Cipher)、弱いハッシュ (Weak Hashing)、弱い乱数 (Weak Randomness)、不適切な Cookie 設定 (Insecure Cookie)、Cookie に HttpOnly がない、Cookie に SameSite 属性がない、HSTS ヘッダーがない、X-Content-Type-Options ヘッダーがないといった脆弱性の検出が継続されます。

| フレームワーク | バージョン | Runtime Code Analysis (IAST)     |
|-----------|----------|----------------------------------|
| express   | 4 以降      | <i class="icon-check-bold"></i>  |
| nextjs    | 11.1 以降   |                                  |

<div class="alert alert-info">サポートされていない機能または Node.js フレームワークのサポート追加を希望される場合は、お知らせください！<a href="https://forms.gle/gHrxGQMEnAobukfn7">この短いフォーム</a>に必要事項を記入して、詳細を送信してください。</div>

### ネットワーキングフレームワークの互換性
##### コードセキュリティ機能に関する注意事項

- **Runtime Software Composition Analysis (SCA)** はすべてのフレームワークでサポートされます。

| フレームワーク | Runtime Code Analysis (IAST)                |
|---------- |-------------------------------------------- |
| http      | <i class="icon-check-bold"></i>             |
| https     | <i class="icon-check-bold"></i>             |

<div class="alert alert-info">ご希望のフレームワークが掲載されていない場合は、お知らせください！<a href="https://forms.gle/gHrxGQMEnAobukfn7">この短いフォーム</a>に必要事項を記入して、詳細を送信してください。</div>

### データストアの互換性

Datastore トレーシングにより得られる情報:

- クエリ情報 (サニタイジングされたクエリ文字列など)
- エラーとスタックトレースの取得

##### コードセキュリティ機能に関する注意事項

- **Runtime Software Composition Analysis (SCA)** はすべてのフレームワークでサポートされます。


| フレームワーク                | バージョン  | Runtime Code Analysis (IAST)           |
|--------------------------|-----------|--------------------------------------- |
| [@apollo/server][43]     | `4 以降`     |                                        |
| [apollo-server-core][44] | `3 以降`     |                                        |
| [cassandra-driver][28]   | `3 以降`     |                                        |
| [couchbase][29]          | `2.4.2 以降`  |                                        |
| [elasticsearch][30]      | `10 以降`    |                                        |
| [ioredis][31]            | `2 以降`     |                                        |
| [knex][32]               | `0.8 以降`   |                                        |
| [mariadb][5]             | `3 以降`     |                                        |
| [memcached][33]          | `2.2 以降`   |                                        |
| [mongodb-core][34]       | `2 以降`     | <i class="icon-check-bold"></i>        |
| [mysql][35]              | `2 以降`     | <i class="icon-check-bold"></i>        |
| [mysql2][36]             | `1 以降`     | <i class="icon-check-bold"></i>        |
| [oracledb][37]           | `>=5`     |                                        |
| [pg][38]                 | `4 以降`     | <i class="icon-check-bold"></i>        |
| [redis][39]              | `0.12 以降`  |                                        |
| [sharedb][40]            | `1 以降`     |                                        |
| [tedious][41]            | `1 以降`     |                                        |
| [sequelize][42]          | `4 以降`     | <i class="icon-check-bold"></i>        |

[1]: /ja/tracing/trace_collection/compatibility/nodejs/
[2]: /ja/agent/remote_config/#enabling-remote-configuration
[4]: https://github.com/nodejs/release#release-schedule
[5]: https://github.com/mariadb-corporation/mariadb-connector-nodejs
[28]: https://github.com/datastax/nodejs-driver
[29]: https://github.com/couchbase/couchnode
[30]: https://github.com/elastic/elasticsearch-js
[31]: https://github.com/luin/ioredis
[32]: https://knexjs.org
[33]: https://github.com/3rd-Eden/memcached
[34]: http://mongodb.github.io/node-mongodb-native/core
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

{{% collapse-content title="Python" level="h4" %}}

### コードセキュリティ機能サポート

指定されたトレーサーバージョンに対して、Python ライブラリでサポートされるコードセキュリティ機能は以下のとおりです:

| コードセキュリティ機能                    | Python トレーサーの最小バージョン |
| ------------------------------------------- | ----------------------------- |
| Runtime Software Composition Analysis (SCA) | 1.5.0                         |
| Runtime Code Analysis (IAST)                | プレビュー (2.9.3)               |

#### サポートされるデプロイメントタイプ
| タイプ        | Runtime Code Analysis (IAST)      |
|------------ |---------------------------------- |
| Docker      | <i class="icon-check-bold"></i>   |
| Kubernetes  | <i class="icon-check-bold"></i>   |
| Amazon ECS  | <i class="icon-check-bold"></i>   |
| AWS Fargate | プレビュー (2.9.3)                   |
| AWS Lambda  |                                   |


### 言語とフレームワークの互換性

#### サポート対象の Python バージョン

Python Application Security Client ライブラリは、Python ランタイムやライブラリの異なるバージョンに対するサポートレベルを示す[バージョンポリシー][3]に従います。

2 つのリリースブランチに対応しています。

| リリース    | サポートレベル         |
|------------|---------------------- |
| `<1`       | メンテナンス           |
| `>=1.0,<2` | 一般提供  |

また、このライブラリは以下のランタイムをサポートしています。

| OS      | CPU                   | ランタイム | ランタイムバージョン | ddtrace のバージョンに対応 |
|---------|-----------------------|---------|-----------------|--------------------------|
| Linux   | x86-64、i686、AArch64 | CPython | 2.7、3.5-3.11   | `<2`                     |
| MacOS   | Intel、Apple Silicon  | CPython | 2.7、3.5-3.11   | `<2`                     |
| Windows | 64bit、32bit          | CPython | 2.7、3.5-3.11   | `<2`                     |


#### Web フレームワークの互換性
##### コードセキュリティ機能に関する注意事項

- **Runtime Software Composition Analysis (SCA)** はすべてのフレームワークでサポートされます。

#### サポートされているフレームワーク

| フレームワーク                | バージョン    | Runtime Code Analysis (IAST)                |
| ------------------------ | ----------- | ------------------------------------------- |
| Django                   | 1.8         |  <i class="icon-check-bold"></i>            |
| Flask                    | 0.10        |  <i class="icon-check-bold"></i>            |

Flask では、クエリ文字列のサポートはありません。

<div class="alert alert-info">ご希望のフレームワークが掲載されていない場合は、お知らせください！<a href="https://forms.gle/gHrxGQMEnAobukfn7">この短いフォーム</a>に必要事項を記入して、詳細を送信してください。</div>

#### データストアの互換性

Datastore トレーシングにより得られる情報:

- クエリ情報 (サニタイジングされたクエリ文字列など)
- エラーとスタックトレースの取得

##### コードセキュリティ機能に関する注意事項

- **Runtime Software Composition Analysis (SCA)** はすべてのフレームワークでサポートされます。

Python ライブラリは[データベース API 仕様][4]をサポートしており、すべての汎用 SQL データベースをサポートしています。これには SQLite、Mysql、Postgres、MariaDB などのデータベースが含まれます。

[1]: /ja/tracing/trace_collection/compatibility/python/
[2]: /ja/agent/remote_config/#enabling-remote-configuration
[3]: https://ddtrace.readthedocs.io/en/stable/versioning.html
[4]: https://peps.python.org/pep-0249/


{{% /collapse-content %}}