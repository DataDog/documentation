---
aliases:
- /ja/security_platform/application_security/getting_started/dotnet
- /ja/security/application_security/getting_started/dotnet
code_lang: dotnet
code_lang_weight: 10
further_reading:
- link: /security/code_security/iast/#code-level-vulnerabilities-list
  tag: ドキュメント
  text: Supported code-level vulnerabilities list
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
title: Enabling Code Security for .NET
type: multi-code-lang
---

You can detect code-level vulnerabilities and monitor application security in .NET applications running in Docker, Kubernetes, Amazon ECS, and AWS Fargate.

Follow these steps to enable Code Security in your service:

1. [Datadog Agent][3] をバージョン 7.41.1 以上に更新します。
2. Update your Datadog Tracing Library to at least the minimum version needed to turn on Code Security. For details, see [Library Compatibility][4] page.
3. Add the `DD_IAST_ENABLED=true` environment variable to your application configuration. For example, on Windows self-hosted, run the following PowerShell snippet as part of your application start-up script:

   ```sh
   $target=[System.EnvironmentVariableTarget]::Process
   [System.Environment]::SetEnvironmentVariable("DD_IAST_ENABLED","true",$target)
   ```

または、アプリケーションが動作している場所に応じて、次の方法のいずれかを使用します:

 {{< tabs >}}
{{% tab "Windows-Self-Hosted" %}} 

Windows コンソールで:

```sh
rem Set environment variables
SET DD_IAST_ENABLED=true

rem Start application
dotnet.exe example.dll
```
{{% /tab %}}

{{% tab "IIS" %}} 

Run the following PowerShell command as administrator to configure the necessary environment variables in the registry `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Environment` and restart IIS.

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

Update your configuration container for APM by adding the following argument in your docker run command:

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

Update your deployment configuration file for APM and add the AAP environment variable:

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

To see Code Security in action, browse your service and find code-level vulnerabilities in the [Vulnerability Explorer][4].

{{< img src="/security/application_security/Code-Level-Vulnerability-Details-New.mp4" alt="Video showing Code Vulnerabilities" video="true" >}}

さらにサポートが必要な場合は、[Datadog サポート][5]にお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/latest
[2]: /ja/security/code_security/iast/setup/
[3]: /ja/agent/versions/upgrade_between_agent_minor_versions/
[4]: /ja/security/code_security/iast/setup/