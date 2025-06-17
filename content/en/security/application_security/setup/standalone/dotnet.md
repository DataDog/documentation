---
title: Enabling Application & API Protection for .NET
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 10
aliases:
  - /security_platform/application_security/getting_started/dotnet
  - /security/application_security/getting_started/dotnet
  - /security/application_security/enabling/tracing_libraries/threat_detection/dotnet/
  - /security/application_security/threats/setup/standalone/dotnet
further_reading:
    - link: "/security/application_security/add-user-info/"
      tag: "Documentation"
      text: "Adding user information to traces"
    - link: 'https://github.com/DataDog/dd-trace-dotnet'
      tag: "Source Code"
      text: '.NET Datadog library source code'
    - link: "/security/default_rules/?category=cat-application-security"
      tag: "Documentation"
      text: "OOTB App & API Protection Rules"
    - link: "/security/application_security/troubleshooting"
      tag: "Documentation"
      text: "Troubleshooting App & API Protection"
---

You can monitor App and API Protection for .NET apps running in Docker, Kubernetes, Amazon ECS, and AWS Fargate.

{{% appsec-getstarted-standalone %}}

## Enabling Application & API Protection
### Get started

1. **Update your [Datadog .NET library][1]** to at least version 2.2.0 for your target operating system architecture.

   To check that your service's language and framework versions are supported for Application & API Protection capabilities, see [Compatibility][2].

2. **Enable Application & API Protection** by setting the environment variables. For security-only use without APM tracing, set both `DD_APPSEC_ENABLED=true` and `DD_APM_TRACING_ENABLED=false`. For example, on Windows self-hosted, run the following PowerShell snippet as part of your application start up script:
   ```
   $target=[System.EnvironmentVariableTarget]::Process
   [System.Environment]::SetEnvironmentVariable("DD_APPSEC_ENABLED","true",$target)
   [System.Environment]::SetEnvironmentVariable("DD_APM_TRACING_ENABLED","false",$target)
   ```

   **Or** one of the following methods, depending on where your application runs:

   {{< tabs >}}
{{% tab "Windows self-hosted" %}}

In a Windows console:

```
rem Set environment variables
SET CORECLR_ENABLE_PROFILING=1
SET CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
SET DD_APPSEC_ENABLED=true
SET DD_APM_TRACING_ENABLED=false

rem Start application
dotnet.exe example.dll
```

{{% /tab %}}
{{% tab "IIS" %}}

Run the following PowerShell command as administrator to configure the necessary environment variables in the registry `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Environment` and restart IIS.
```
$target=[System.EnvironmentVariableTarget]::Machine
[System.Environment]::SetEnvironmentVariable("DD_APPSEC_ENABLED","true",$target)
[System.Environment]::SetEnvironmentVariable("DD_APM_TRACING_ENABLED","false",$target)
net stop was /y
net start w3svc
```

**Or**, for IIS services exclusively, on WAS and W3SVC with Powershell as an administrator, run:

```
$appsecPart = "DD_APPSEC_ENABLED=true DD_APM_TRACING_ENABLED=false"
[string[]] $defaultvariable = @("CORECLR_ENABLE_PROFILING=1", "CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}", $appsecPart)

function Add-AppSec {

    param (
        $path
    )
    $v = (Get-ItemProperty -Path $path).Environment
    If ($v -eq $null) {
        Set-ItemProperty -Path $path -Name "Environment" -Value $defaultvariable
    }
    ElseIf (-not ($v -match $appsecPart)) {
        $v += " " + $appsecPart;
        Set-ItemProperty -Path $path -Name "Environment" -Value $v
    }
}
Add-AppSec -path "HKLM:SYSTEM\CurrentControlSet\Services\WAS\"
Add-AppSec -path "HKLM:SYSTEM\CurrentControlSet\Services\W3SVC\"

net stop was /y
net start w3svc
```

**Or**, to avoid editing registry keys, edit the application settings in the `web.config` file of your application:
```xml
<configuration>
  <appSettings>
        <add key="DD_APPSEC_ENABLED" value="true"/>
        <add key="DD_APM_TRACING_ENABLED" value="false"/>
  </appSettings>
</configuration>
```

This can also be done at the IIS application pools level in the `applicationHost.config` file, usually in `C:\Windows\System32\inetsrv\config\`:
```xml
<system.applicationHost>

    <applicationPools>
        <add name="DefaultAppPool">
            <environmentVariables>
                <add name="DD_APPSEC_ENABLED" value="true" />
                <add name="DD_APM_TRACING_ENABLED" value="false" />
            </environmentVariables>
            (...)
```

{{% /tab %}}
{{% tab "Linux" %}}

Add the following to your application configuration:
```conf
DD_APPSEC_ENABLED=true
DD_APM_TRACING_ENABLED=false
```
{{% /tab %}}
{{% tab "Docker CLI" %}}

Update your configuration container for APM by adding the following arguments in your `docker run` command:

```shell
docker run [...] -e DD_APPSEC_ENABLED=true -e DD_APM_TRACING_ENABLED=false [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

Add the following environment variable values to your container Dockerfile:

```Dockerfile
ENV DD_APPSEC_ENABLED=true
ENV DD_APM_TRACING_ENABLED=false
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Update your deployment configuration file for APM and add the Application & API Protection environment variables:

```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_APPSEC_ENABLED
              value: "true"
            - name: DD_APM_TRACING_ENABLED
              value: "false"
```

{{% /tab %}}
{{% tab "Amazon ECS" %}}

Update your ECS task definition JSON file, by adding these in the environment section:

```json
"environment": [
  ...,
  {
    "name": "DD_APPSEC_ENABLED",
    "value": "true"
  },
  {
    "name": "DD_APM_TRACING_ENABLED",
    "value": "false"
  }
]
```

{{% /tab %}}
{{% tab "AWS Fargate" %}}

Add the following lines to your container Dockerfile:
```Dockerfile
ENV DD_APPSEC_ENABLED=true
ENV DD_APM_TRACING_ENABLED=false
```

{{% /tab %}}

{{< /tabs >}}

3. **Restart the application** using a full stop and start.

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/latest
[2]: /security/application_security/setup/compatibility/dotnet/
[3]: /agent/versions/upgrade_between_agent_minor_versions/
[4]: /security/application_security/setup/compatibility/
