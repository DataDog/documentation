---
app_id: windows-service
app_uuid: 1d895e93-d6f1-49f9-82bc-a03df7ff215c
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 112
    source_type_name: Windows Service
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/windows_service/README.md
display_on_public_website: true
draft: false
git_integration_title: windows_service
integration_id: windows-service
integration_title: Windows Services
integration_version: 4.8.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: windows_service
public_title: Windows Services
short_description: Windows Service の状態を監視。
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Category::OS とシステム
  configuration: README.md#Setup
  description: Windows Service の状態を監視。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Windows Services
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Windows Service の状態を監視し、サービスチェックを Datadog に送信します。

## 計画と使用

### インフラストラクチャーリスト

Windows Service チェックは [Datadog Agent][1] パッケージに含まれています。Windows ホストに追加でインストールする必要はありません。

### ブラウザトラブルシューティング

構成は、[Agent の構成ディレクトリ][2]のルートにある `conf.d/` フォルダ内の `windows_service.d/conf.yaml` ファイルに格納されています。利用可能なすべての構成オプションについては、[windows_service.d/conf.yaml のサンプル][3]を参照してください。コンフィギュレーションファイルの編集が終わったら、[Agent を再起動][4]して新しい構成を読み込んでください。

チェックは、システム上のすべてのサービスを監視するか、または名前によっていくつかのサービスを選択的に監視することができます。Agent バージョン 7.41 以降では、スタートアップタイプに基づいて監視するサービスを選択することができます。

この構成例では、`Dnscache` と `wmiApSrv` サービスのみを監視します。
```yaml
instances:
  - services:
    - dnscache
    - wmiapsrv
```

この例では、`ALL` キーワードを使用して、ホスト上のすべてのサービスを監視します。`ALL` キーワードを使用すると、インスタンス内の他のパターンは無視されます。
```yaml
instances:
  - services:
    - ALL
```

チェックでは、サービス名のマッチングに大文字と小文字を区別しない [Python 正規表現][5]を使用します。サービス名に特殊文字が含まれている場合、特殊文字を `\` でエスケープする必要があります。例えば、`MSSQL$CRMAWS` は `MSSQL\$CRMAWS` に、`Web Server (prod)` は `Web Server \(prod\)` になります。サービス名パターンは、そのパターンで始まるすべてのサービス名にマッチします。完全に一致させるには、正規表現 `^service$` を使用します。

サービス名は、表示名フィールド**ではなく**、サービス名フィールドに表示されるように記述してください。例えば、表示名 `Datadog Agent` **ではなく**、サービス名 `datadogagent` を構成します。

<p align="center">
<img alt="Datadog Agent service properties" src="https://raw.githubusercontent.com/DataDog/integrations-core/master/windows_service/images/service-properties.png"/>
</p>

Agent バージョン 7.41 から、チェックはスタートアップタイプに基づいて監視するサービスを選択できるようになりました。
例えば、`automatic` または `automatic_delayed_start` のスタートアップタイプを持つサービスのみを監視するには
```yaml
instances:
  - services:
    - startup_type: automatic
    - startup_type: automatic_delayed_start
```

`startup_type` に指定できる値は以下の通りです。
- `disabled`
- `manual`
- `automatic`
- `automatic_delayed_start`

Agent バージョン 7.50 以降、チェックは[サービストリガーが割り当てられているか][6]に基づき、監視対象のサービスを選択できます。
以下に、可能な構成を示す例をいくつか示します。
```yaml
# トリガーを持たないすべてのサービスにマッチします
services:
  - trigger_start: false

# 自動起動タイプを持つすべてのサービスにマッチし、トリガーを持つサービスを除外します
services:
  - startup_type: automatic
    trigger_start: false

# 起動タイプが自動でトリガーがある場合のみ、EventLog サービスにマッチします
services:
  - name: EventLog
    startup_type: automatic
    trigger_start: true
```

#### Lambda のトレースされた起動の 1 時間単位使用量の取得

このチェックは `windows_service:<SERVICE>` タグ内の各サービスチェックに対して、Windows サービス名を自動的にタグ付けします。タグ内の `<SERVICE>` 名は小文字を使用し、特殊文字はアンダースコアに置き換えられます。詳しくは、[タグの概要][7]を参照してください。

**注:** また、このチェックでは、`service:<SERVICE>` タグ内の各サービスチェックに、Windows サービス名を自動的にタグ付けします。**この動作は非推奨です**。Agent の将来のバージョンでは、チェックがこのタグを自動的に割り当てることはありません。このタグを自動的に割り当てないようにし、関連する非推奨の警告を無効にするには、`disable_legacy_service_tag` オプションを設定します。サービスに `service` タグを割り当てる方法については、[タグの割り当て][8]を参照してください。

Agent バージョン 7.40 以降、チェックはサービスのスタートアップタイプを示すために、各サービスチェックに `windows_service_startup_type:<STARTUP_TYPE>` タグを追加できます。各サービスチェックにこのタグを含めるには、`windows_service_startup_type_tag` オプションを設定します。

### 検証

[Agent の status サブコマンドを実行][9]し、**Checks** セクションで `windows_service` を探します。

## リアルユーザーモニタリング

### データセキュリティ

Windows Service チェックには、メトリクスは含まれません。

### ヘルプ

Windows Service チェックには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "windows_service" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

### サービス権限
サービスが存在し、構成と一致しているにもかかわらず、Datadog Agent がそのサービスのサービスチェックを報告しない場合、Datadog Agent の権限が不十分である可能性があります。例えば、デフォルトでは、Datadog Agent は NTDS Active Directory Domain Services サービスへのアクセス権を持っていません。これを確認するには、**昇格した (管理者として実行する)** PowerShell シェルからチェックを実行します。

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" check windows_service
```
出力にそのサービスが表示されている場合、問題は権限にあります。Datadog Agent に権限を与えるには、[Datadog Agent User][13] に[サービスの `Read` アクセスを許可][12]してください。Windows Update を経ても権限が持続するように、[グループポリシーで `Read` アクセスを許可する][14]ことをお勧めします。

## その他の参考資料

- [Windows Server 2012 の監視][15]
- [Windows Server 2012 メトリクスの収集方法][16]
- [Datadog を使用した Windows Server 2012 の監視][17]

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/windows_service/datadog_checks/windows_service/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.python.org/3/howto/regex.html#regex-howto
[6]: https://learn.microsoft.com/en-us/windows/win32/services/service-trigger-events
[7]: https://docs.datadoghq.com/ja/getting_started/tagging/
[8]: https://docs.datadoghq.com/ja/getting_started/tagging/assigning_tags/
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/windows_service/assets/service_checks.json
[11]: https://docs.datadoghq.com/ja/help/
[12]: https://learn.microsoft.com/en-us/troubleshoot/windows-server/windows-security/grant-users-rights-manage-services
[13]: https://docs.datadoghq.com/ja/agent/guide/windows-agent-ddagent-user/
[14]: https://learn.microsoft.com/en-US/troubleshoot/windows-server/group-policy/configure-group-policies-set-security
[15]: https://www.datadoghq.com/blog/monitoring-windows-server-2012
[16]: https://www.datadoghq.com/blog/collect-windows-server-2012-metrics
[17]: https://www.datadoghq.com/blog/windows-server-monitoring