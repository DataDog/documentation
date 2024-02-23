---
aliases:
- /ja/security_platform/application_security/getting_started/dotnet
- /ja/security/application_security/getting_started/dotnet
code_lang: dotnet
code_lang_weight: 10
further_reading:
- link: /security/application_security/add-user-info/
  tag: Documentation
  text: トレースへのユーザー情報追加
- link: https://github.com/DataDog/dd-trace-dotnet
  tag: GitHub
  text: .NET Datadog ライブラリソースコード
- link: /security/default_rules/#cat-application-security
  tag: Documentation
  text: すぐに使える Application Security Management ルール
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Application Security Management のトラブルシューティング
kind: documentation
title: .NET の ASM を有効にする
type: multi-code-lang
---

Docker、Kubernetes、Amazon ECS、AWS Fargate で実行されている .NET アプリのアプリケーションセキュリティを監視することができます。

{{% appsec-getstarted %}}

{{% appsec-getstarted-with-rc %}}

## 脅威検出を有効にする
### はじめに

1. **ターゲットオペレーティングシステムアーキテクチャ用に [Datadog .NET ライブラリ][1]をバージョン 2.2.0 以上 (Application Vulnerability Management の脆弱性検出機能についてはバージョン 2.16.0 以上) に更新してください**。

   サービスの言語やフレームワークのバージョンが ASM 機能に対応しているかどうかは、[互換性][2]をご参照ください。

2. 環境変数 `DD_APPSEC_ENABLED` を `true` に設定することで、**ASM を有効にします**。例えば、Windows のセルフホストでは、アプリケーションの起動スクリプトの一部として、次の PowerShell スニペットを実行します。
   ```
   $target=[System.EnvironmentVariableTarget]::Process
   [System.Environment]::SetEnvironmentVariable("DD_APPSEC_ENABLED","true",$target)
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

**または**、IIS サービスのみの場合、Powershell がある WAS と W3SVC で管理者権限で以下を実行します。

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

**または**、レジストリキーの編集を避けるため、アプリケーションの設定を `web.config` ファイルで編集します。
```xml
<configuration>
  <appSettings>
        <add key="DD_APPSEC_ENABLED" value="true"/>
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

APM 用のデプロイメント構成ファイルを更新し、ASM 環境変数を追加します。

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

3. 完全に停止してから起動することで、**アプリケーションを再起動**します。

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln.mp4" alt="シグナルエクスプローラーとその詳細、脆弱性エクスプローラーとその詳細をビデオでご紹介しています。" video="true" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/latest
[2]: /ja/security/application_security/enabling/compatibility/dotnet