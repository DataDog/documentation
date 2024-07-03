---
aliases:
- /ja/security_platform/application_security/getting_started/dotnet
- /ja/security/application_security/getting_started/dotnet
code_lang: dotnet
code_lang_weight: 10
further_reading:
- link: /security/application_security/add-user-info/
  tag: Documentation
  text: Adding user information to traces
- link: https://github.com/DataDog/dd-trace-dotnet
  tag: ソースコード
  text: .NET Datadog library source code
- link: /security/default_rules/?category=cat-application-security
  tag: Documentation
  text: OOTB Application Security Management Rules
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Troubleshooting Application Security Management
kind: documentation
title: Enabling ASM for .NET
type: multi-code-lang
---

You can monitor application security for .NET apps running in Docker, Kubernetes, Amazon ECS, and AWS Fargate.

{{% appsec-getstarted %}}


## コードセキュリティの有効化

If your service runs a [tracing library version that supports code security vulnerability detection][2], enable the capability by setting the `DD_IAST_ENABLED=true` environment variable and restarting your service.

サービスにコードレベルの脆弱性検出機能を活用するには

1. [Update your Datadog Agent][3] to at least version 7.41.1.
2. Update your tracing library to at least the minimum version needed to turn on code security. For details, see [ASM capabilities support][4].
3. Add the `DD_IAST_ENABLED=true` environment variable to your application configuration. For example, on Windows self-hosted, run the following PowerShell snippet as part of your application start-up script:

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

Run the following PowerShell command as administrator to configure the necessary environment variables in the registry `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Environment` and restart IIS.

```sh
$target=[System.EnvironmentVariableTarget]::Machine
[System.Environment]::SetEnvironmentVariable("DD_IAST_ENABLED","true",$target)
net stop was /y
net start w3svc
```
{{% /tab %}}


{{% tab "Linux" %}} 

Add the following to your application configuration:

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

Add the following environment variable value to your container Dockerfile:

```
ENV DD_IAST_ENABLED=true
```
{{% /tab %}}

{{% tab "Kubernetes" %}} 

Update your deployment configuration file for APM and add the ASM environment variable:

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

Update your ECS task definition JSON file, by adding this in the environment section:

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

Add the following line to your container Dockerfile:

```
ENV DD_IAST_ENABLED=true
```
{{% /tab %}}
   {{< /tabs >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/latest
[2]: /ja/security/application_security/enabling/compatibility/dotnet
[3]: /ja/agent/versions/upgrade_between_agent_minor_versions/
[4]: /ja/security/application_security/enabling/compatibility/