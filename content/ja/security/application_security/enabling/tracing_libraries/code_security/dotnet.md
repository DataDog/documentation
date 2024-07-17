---
aliases:
- /ja/security_platform/application_security/getting_started/dotnet
- /ja/security/application_security/getting_started/dotnet
code_lang: dotnet
code_lang_weight: 10
further_reading:
- link: /security/application_security/add-user-info/
  tag: ドキュメント
  text: トレースへのユーザー情報追加
- link: https://github.com/DataDog/dd-trace-dotnet
  tag: Source Code
  text: .NET Datadog ライブラリソースコード
- link: /security/default_rules/?category=cat-application-security
  tag: ドキュメント
  text: すぐに使える Application Security Management ルール
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: Application Security Management のトラブルシューティング
kind: ドキュメント
title: .NET の ASM を有効にする
type: multi-code-lang
---

Docker、Kubernetes、Amazon ECS、AWS Fargate で実行されている .NET アプリのアプリケーションセキュリティを監視することができます。

{{% appsec-getstarted %}}


## Enabling Code Security

If your service runs a [tracing library version that supports code security vulnerability detection][2], enable the capability by setting the `DD_IAST_ENABLED=true` environment variable and restarting your service.

To leverage code-level vulnerability detection capabilities for your service:

1. [Datadog Agent][3] をバージョン 7.41.1 以上に更新します。
2. Update your tracing library to at least the minimum version needed to turn on code security. For details, see [ASM capabilities support][4].
3. `DD_IAST_ENABLED=true` 環境変数をアプリケーション構成に追加します。例えば、Windows でセルフホスティングする場合は、アプリケーションの起動スクリプトの一部として次の PowerShell スニペットを実行します。

   ```sh
   $target=[System.EnvironmentVariableTarget]::Process
   [System.Environment]::SetEnvironmentVariable("DD_IAST_ENABLED","true",$target)
   ```

Or one of the following methods, depending on where your application runs:

 {{< tabs >}}
{{% tab "Windows-Self-Hosted" %}} 

In a Windows console:

```sh
rem Set environment variables
SET DD_IAST_ENABLED=true

rem Start application
dotnet.exe example.dll
```
{{% /tab %}}

{{% tab "IIS" %}} 

管理者として以下の PowerShell コマンドを実行し、レジストリ `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Environment` に必要な環境変数を構成して、IIS を再起動します。

```sh
$target=[System.EnvironmentVariableTarget]::Machine
[System.Environment]::SetEnvironmentVariable("DD_IAST_ENABLED","true",$target)
net stop was /y
net start w3svc
```
{{% /tab %}}


{{% tab "Linux" %}} 

アプリケーションの構成に以下を追加します。

```
DD_IAST_ENABLED=true
```
{{% /tab %}}

{{% tab "Docker CLI" %}} 

APM 用の構成コンテナを更新するには、docker run コマンドに以下の引数を追加します。

```
docker run -d --name app -e DD_IAST_ENABLED=true company/app:latest
```
{{% /tab %}}

{{% tab "Dockerfile" %}} 

コンテナの Dockerfile に以下の環境変数の値を追加します。

```
ENV DD_IAST_ENABLED=true
```
{{% /tab %}}

{{% tab "Kubernetes" %}} 

APM 用のデプロイメント構成ファイルを更新し、ASM 環境変数を追加します。

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

{{% tab "AWS ECS" %}} 

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
{{% /tab %}}

{{% tab "AWS Fargate" %}} 

コンテナの Dockerfile に以下の行を追加します。

```
ENV DD_IAST_ENABLED=true
```
{{% /tab %}}
   {{< /tabs >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/latest
[2]: /ja/security/application_security/enabling/compatibility/dotnet
[3]: /ja/agent/versions/upgrade_between_agent_minor_versions/
[4]: /ja/security/application_security/enabling/compatibility/