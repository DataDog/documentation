---
title: Enabling Code Security for .NET
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 10
aliases:
  - /security_platform/application_security/getting_started/dotnet
  - /security/application_security/getting_started/dotnet
further_reading:
  - link: "/security/code_security/iast/#code-level-vulnerabilities-list"
    tag: "Documentation"
    text: "Supported code-level vulnerabilities list"
  - link: "https://www.datadoghq.com/blog/iast-datadog-code-security/"
    tag: "Blog"
    text: "Enhance application security in production with Datadog Code Security"
  - link: "https://www.datadoghq.com/blog/application-code-vulnerability-detection/"
    tag: "Blog"
    text: "Find vulnerabilities in your code with Datadog Code Security"
  - link: "https://www.datadoghq.com/blog/code-security-owasp-benchmark/"
    tag: "Blog"
    text: "Datadog Code Security achieves 100 percent accuracy in OWASP Benchmark by using an IAST approach"
  - link: "/security/application_security/troubleshooting"
    tag: "Documentation"
    text: "Troubleshooting Application Security"
---

You can detect code-level vulnerabilities and monitor application security in .NET applications running in Docker, Kubernetes, Amazon ECS, and AWS Fargate.

Follow these steps to enable Code Security in your service:

1. [Update your Datadog Agent][3] to at least version 7.41.1.
2. Update your Datadog Tracing Library to at least the minimum version needed to turn on Code Security. For details, see [Library Compatibility][4] page.
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

To see Code Security in action, browse your service and find code-level vulnerabilities in the [Vulnerability Explorer][4].

{{< img src="/security/application_security/Code-Level-Vulnerability-Details-New.mp4" alt="Video showing Code Vulnerabilities" video="true" >}}

If you need additional assistance, contact [Datadog support][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/latest
[2]: /security/code_security/iast/setup/
[3]: /agent/versions/upgrade_between_agent_minor_versions/
[4]: /security/code_security/iast/setup/
