---
aliases:
- /ja/security_platform/application_security/getting_started/dotnet
- /ja/security/application_security/getting_started/dotnet
- /ja/security/application_security/enabling/tracing_libraries/threat_detection/dotnet/
- /ja/security/application_security/threats/setup/threat_detection/dotnet
- /ja/security/application_security/threats_detection/dotnet
- /ja/security/application_security/setup/aws/fargate/dotnet
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
  text: OOTB App and API Protection ルール
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: App and API Protection のトラブルシューティング
title: .NET で AAP を有効にする
type: multi-code-lang
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection は、Datadog Government サイト US1-FED でプレビュー版として提供されています。
</div>
{{< /site-region >}}

Docker、Kubernetes、Amazon ECS、AWS Fargate で実行されている .NET アプリの App and API Protection を監視することができます。

{{% appsec-getstarted %}}

## 脅威検知の有効化 {#enabling-threat-detection}
### 始める {#get-started}

1. **[Datadog .NETライブラリ][1]**を、ターゲット OS アーキテクチャのバージョン 2.2.0 以上に更新します。

   サービスの言語やフレームワークのバージョンが AAP 機能に対応しているかどうかは、[互換性][2]をご参照ください。

2. **AAP を有効にする**には、`DD_APPSEC_ENABLED` 環境変数を `true` に設定します。たとえば、Windows のセルフホスト環境では、アプリケーションの起動スクリプトの一部として以下の PowerShell スニペットを実行します。
   ```
   $target=[System.EnvironmentVariableTarget]::Process
   [System.Environment]::SetEnvironmentVariable("DD_APPSEC_ENABLED","true",$target)
   ```

   **または**、アプリケーションが実行される場所に応じて、以下のいずれかの方法を使用します。

   {{< tabs >}}
{{% tab "Windows セルフホスト環境" %}}

Windows コンソールで以下を実行します。

```
rem Set environment variables
SET CORECLR_ENABLE_PROFILING=1
SET CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
SET DD_APPSEC_ENABLED=true

rem Start application
dotnet.exe example.dll
```

{{% /tab %}}
{{% tab "IIS" %}}

管理者として以下の PowerShell コマンドを実行し、レジストリ `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Environment` に必要な環境変数を構成して、IIS を再起動します。

```
$target=[System.EnvironmentVariableTarget]::Machine
[System.Environment]::SetEnvironmentVariable("DD_APPSEC_ENABLED","true",$target)
net stop was /y
net start w3svc
```

**または**、IIS サービスのみの場合は、WAS および W3SVC で管理者として Powershell を使用して以下を実行します。

```
$appsecPart = "DD_APPSEC_ENABLED=true"
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

**または**、レジストリキーの編集を避けるために、アプリケーションの `web.config` ファイルでアプリケーション設定を編集します。

```xml
<configuration>
  <appSettings>
        <add key="DD_APPSEC_ENABLED" value="true"/>
  </appSettings>
</configuration>
```

これは、IIS アプリケーションプールレベルの `applicationHost.config` ファイル (通常は `C:\Windows\System32\inetsrv\config\` にあります) で行うこともできます。

```xml
<system.applicationHost>

    <applicationPools>
        <add name="DefaultAppPool">
            <environmentVariables>
                <add name="DD_APPSEC_ENABLED" value="true" />
            </environmentVariables>
            (...)
```

{{% /tab %}}
{{% tab "Linux" %}}

アプリケーションの構成に以下を追加します。

```conf
DD_APPSEC_ENABLED=true
```
{{% /tab %}}
{{% tab "Docker CLI" %}}

APM 用の構成コンテナを更新するには、`docker run` コマンドに以下の引数を追加します。

```shell
docker run [...] -e DD_APPSEC_ENABLED=true [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

コンテナの Dockerfile に以下の環境変数の値を追加します。

```Dockerfile
ENV DD_APPSEC_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

APM 用のデプロイメント構成ファイルを更新し、AAP 環境変数を追加します。

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
```

{{% /tab %}}
{{% tab "Amazon ECS" %}}

以下を環境セクションに追加して、ECS タスク定義 JSON ファイルを更新します。

```json
"environment": [
  ...,
  {
    "name": "DD_APPSEC_ENABLED",
    "value": "true"
  }
]
```

{{% /tab %}}
{{% tab "AWS Fargate" %}}

コンテナの Dockerfile に以下の行を追加します。

```Dockerfile
ENV DD_APPSEC_ENABLED=true
```

{{% /tab %}}

{{< /tabs >}}

アプリケーションを完全に停止してから起動する方法で3. **再起動**します。

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="シグナルエクスプローラーとその詳細、および脆弱性エクスプローラーとその詳細を示すビデオ。" video="true" >}}

## APM トレーシングを使用せずに AAP を使用する{#using-aap-without-apm-tracing}

APM トレーシング機能を使用せずに App and API Protection を使用する場合は、トレーシングを無効にしてデプロイできます。

1. SDK の構成時に、`DD_APPSEC_ENABLED=true` 環境変数に加えて `DD_APM_TRACING_ENABLED=false` 環境変数も使用します。
2. この構成により、Datadog に送信される APM データの量が、App and API Protection 製品で必要とされる最小限の量に削減されます。

詳細については、[スタンドアロンの App and API Protection][standalone_billing_guide] を参照してください。
[standalone_billing_guide]: /security/application_security/guide/standalone_application_security/

{{% aap/aap_and_api_protection_verify_setup %}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/latest
[2]: /ja/security/application_security/setup/compatibility/dotnet/
[3]: /ja/agent/versions/upgrade_between_agent_minor_versions/
[4]: /ja/security/application_security/setup/compatibility/