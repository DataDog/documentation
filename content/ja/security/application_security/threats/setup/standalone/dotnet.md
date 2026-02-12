---
aliases:
- /ja/security_platform/application_security/getting_started/dotnet
- /ja/security/application_security/getting_started/dotnet
- /ja/security/application_security/enabling/tracing_libraries/threat_detection/dotnet/
code_lang: dotnet
code_lang_weight: 10
further_reading:
- link: /security/application_security/add-user-info/
  tag: ドキュメント
  text: トレースへのユーザー情報追加
- link: https://github.com/DataDog/dd-trace-dotnet
  tag: ソースコード
  text: .NET Datadog ライブラリソースコード
- link: /security/default_rules/?category=cat-application-security
  tag: ドキュメント
  text: OOTB App & API Protection Rules
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: Troubleshooting App & API Protection
title: .NET 向け Application & API Protection の有効化
type: multi-code-lang
---

Docker、Kubernetes、Amazon ECS、AWS Fargate で実行されている .NET アプリのアプリケーションセキュリティを監視することができます。

{{% appsec-getstarted-standalone %}}

## Enabling Application & API Protection
### 開始する

1. **[Datadog .NET ライブラリ][1]** を、対象のオペレーティング システム アーキテクチャ向けに少なくともバージョン 2.2.0 (Software Composition Analysis の検出機能を利用する場合は少なくともバージョン 2.16.0) に更新してください。

   Application & API Protection 機能でサービスの言語とフレームワークのバージョンがサポートされているか確認するには、[互換性][2] を参照してください。

2. 環境変数を設定して **Application & API Protection を有効化**します。APM tracing を使わずセキュリティ機能のみを利用する場合は、`DD_APPSEC_ENABLED=true` と `DD_APM_TRACING_ENABLED=false` の両方を設定してください。たとえば Windows のセルフ ホスト環境では、アプリケーションの起動スクリプトの一部として、次の PowerShell スニペットを実行します:
   ```
   $target=[System.EnvironmentVariableTarget]::Process
   [System.Environment]::SetEnvironmentVariable("DD_APPSEC_ENABLED","true",$target)
   [System.Environment]::SetEnvironmentVariable("DD_APM_TRACING_ENABLED","false",$target)
   ```

   **または**アプリケーションの実行場所に応じて、以下の方法のいずれかを選択します。

{{< tabs >}}
{{% tab "Windows self-hosted" %}}

Windows コンソールで:

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

管理者として以下の PowerShell コマンドを実行し、レジストリ `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Environment` に必要な環境変数を構成して、IIS を再起動します。
```
$target=[System.EnvironmentVariableTarget]::Machine
[System.Environment]::SetEnvironmentVariable("DD_APPSEC_ENABLED","true",$target)
[System.Environment]::SetEnvironmentVariable("DD_APM_TRACING_ENABLED","false",$target)
net stop was /y
net start w3svc
```

**または**、IIS サービスのみの場合、Powershell がある WAS と W3SVC で管理者権限で以下を実行します。

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

**または**、レジストリキーの編集を避けるため、アプリケーションの設定を `web.config`ファイルで編集します。
```xml
<configuration>
  <appSettings>
        <add key="DD_APPSEC_ENABLED" value="true"/>
        <add key="DD_APM_TRACING_ENABLED" value="false"/>
  </appSettings>
</configuration>
```

これは、IIS アプリケーションプールレベルで、`applicationHost.config` ファイル (通常、`C:\Windows\System32\inetsrv\config\` にあります) で行うこともできます。
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

アプリケーションの構成に以下を追加します。
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

APM 用のデプロイ設定ファイルを更新し、Application & API Protection の環境変数を追加します:

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

コンテナの Dockerfile に、次の行を追加します:
```Dockerfile
ENV DD_APPSEC_ENABLED=true
ENV DD_APM_TRACING_ENABLED=false
```

{{% /tab %}}

{{< /tabs >}}

3. **アプリケーションを再起動**する際は、いったん完全に停止してから起動し直してください。

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/latest
[2]: /ja/security/application_security/setup/compatibility/dotnet/
[3]: /ja/agent/versions/upgrade_between_agent_minor_versions/
[4]: /ja/security/application_security/setup/compatibility/