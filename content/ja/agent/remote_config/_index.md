---
title: Remote Configuration
aliases:
- /agent/guide/how_rc_works
- /agent/guide/how_remote_config_works
further_reading:
- link: "/security/application_security/how-appsec-works/#built-in-protection"
  tag: Documentation
  text: How Application Security Monitoring Works
- link: "/dynamic_instrumentation/?tab=configurationyaml#enable-remote-configuration"
  tag: Documentation
  text: Dynamic Instrumentation
- link: /security/threats/setup
  tag: Documentation
  text: Setting Up CSM Threats
- link: "https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/"
  tag: Blog
  text: Using Datadog Audit Trail
- link: "https://www.datadoghq.com/blog/remote-configuration-for-datadog/"
  tag: Blog
  text: Apply real-time updates to Datadog components with Remote Configuration
algolia:
  tags: [remote config, remote configuration]
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Remote Configuration is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## 概要
リモート構成は Datadog の機能で、インフラストラクチャーにデプロイされた Datadog コンポーネント (Agent、トレーシングライブラリ、観測可能性パイプラインワーカーなど) の動作を、一部の製品機能に対してリモートで構成および変更することが可能です。リモート構成を使用すると、オンデマンドで環境内の Datadog コンポーネントに構成を適用し、管理コストを削減し、チーム間の摩擦を減らし、問題解決時間を短縮することができます。

Datadog のセキュリティ製品である Application Security Management と Cloud Security Management Threats (CSM Threats) については、リモート構成対応の Agent と互換性のあるトレーシングライブラリにより、リアルタイムにセキュリティアップデートとレスポンスを提供し、アプリケーションやクラウドインフラストラクチャーのセキュリティ体制を強化することができます。

## 仕組み
When Remote Configuration is enabled on the Datadog Agent, it periodically polls the configured [Datadog site][1], to determine whether there are configuration changes to apply to your Remote Configuration-enabled Agents or tracing libraries.

リモート構成が有効な製品機能に対して、それぞれの Datadog 製品 UI で構成変更を送信すると、その変更が Datadog に保存されます。

リモート構成の仕組みを下図に示します。

{{<img src="agent/remote_config/RC_Diagram_v5.png" alt="Users configure features in the UI, the config is stored in Datadog, the Agent requests config updates." width="90%" style="center">}}

1. Datadog の UI で選択した製品機能を構成します。
2. 製品の機能構成は、Datadog 内に安全に保存されます。
3. 環境内の Agent は、Datadog からの構成アップデートを安全にポーリングし、受信し、自動的に適用します。環境にデプロイされたトレーシングライブラリは、Agent と通信し、Datadog からの構成アップデートをリクエスト、受信します。

## Configuration order precedence
Configurations set by higher-priority sources take precedence in the active configuration displayed in Fleet Automation. 

Sources from highest to lowest priority:

1. リモート構成
   **Note**: Configuration changes applied through Remote Configuration are not shown in your local configuration file (`datadog.yaml`).
2. Environment variables set by tools like Helm
3. Configuration files (`datadog.yaml`) that are managed locally or by configuration management tools like Ansible, Chef, or Puppet

Configurations issued by higher-priority sources override configurations issued by lower-priority sources.

## 対応製品と機能
リモート構成では、以下の製品・機能に対応しています。

### フリートオートメーション
**[Send flares][27] directly from the Datadog site**. Seamlessly troubleshoot the Datadog Agent without directly accessing the host.

### Application Security Management (ASM)

- **1 クリック ASM アクティベーション**: Datadog UI から 1 クリックで ASM を有効化します。
- **アプリ内攻撃パターンアップデート**: 新たに公開された脆弱性や攻撃ベクトルに従って Datadog が最新の Web Application Firewall (WAF) 攻撃パターンをリリースすると、これを自動的に受け取ることができます。
- **保護**: Datadog UI を通じて、攻撃者の IP、認証済みユーザー、ASM セキュリティシグナルとトレースでフラグが立った疑わしいリクエストを一時的または永続的にブロックします。

### Application Performance Monitoring (APM)

- **Configuration at runtime** (Beta): Change a service's trace sampling rate, Log Injection enablement, and HTTP header tags from within the Service Catalog UI, without having to restart the service. Read [Configuration at Runtime][22] for more information.
- **Agent のサンプリングレートをリモートで設定する** (公開ベータ版): Datadog Agent を再起動することなく、Datadog Agent のトレースサンプリング速度を変更し、組織のトレース取り込みをニーズに応じて拡張するためのルールをリモートで設定します。


### Dynamic Instrumentation

- Send critical metrics, traces, and logs from your live applications with no code changes.

### CSM Threats

- **自動デフォルト Agent ルールアップデート**: 新しい Agent の検出や機能強化がリリースされると、Datadog が管理しているデフォルトの Agent ルールを自動的に受信し、更新します。詳しくは、[CSM Threats の設定][3]をご覧ください。
- **カスタム Agent ルールの自動デプロイ**: カスタム Agent ルールを指定したホスト (すべてのホストまたは定義したホストのサブセット) に自動的にデプロイします。

### Observability Pipelines

- **Remotely deploy and update [Observability Pipelines Workers][4] (OPW)**: Build and edit pipelines in the Datadog UI, rolling out your configuration changes to OPW instances running in your environment.

## セキュリティへの配慮

Datadog は、Datadog コンポーネントが受信し適用した構成の機密性、完全性、可用性を保護するために、以下のセーフガードを実装しています。

* インフラストラクチャーにデプロイされた Agent が Datadog に構成をリクエストします。
* Datadog は、Agent からリクエストされない限り構成を送信せず、リクエストした Agent に関連する構成のみを送信します。
* Because the configuration requests are initiated from your Agents to Datadog over HTTPS (port 443), there is no need to open additional ports in your network firewall.
* お客様の Agent と Datadog 間の通信は、HTTPS を使用して暗号化され、お客様の Datadog API キーを使用して認証と認可が行われます。
* [`api_keys_write`][5] 権限を持つユーザーのみが、API キーでリモート構成機能を有効または無効にし、サポートされている製品機能を使用することが認可されます。
* Your configuration changes submitted through the Datadog UI are signed and validated on the Agent and requesting Datadog components, verifying integrity of the configuration.

## リモート構成を有効にする

### 前提条件

- Datadog Agent version `7.41.1`  (`7.42.0` for APM sampling rate, `7.43.0` for APM Remote Instrumentation) or higher installed on your hosts or containers.
- トレーシング ライブラリを使用する Datadog 製品の場合は、トレーシングライブラリもリモート構成に対応したバージョンにアップグレードする必要があります。ASM Protection 機能および ASM 1 クリックアクティベーションについては、 [ASM 互換性の要件][6]を参照してください。ダイナミックインスツルメンテーションについては、[ダイナミックインスツルメンテーションの前提条件][20]を参照してください。

### セットアップ

リモート構成を有効にするには

1. RBAC 権限に [`org_management`][7] が含まれていることを確認し、組織のリモート構成を有効にすることができるようにします。

2. RBAC 権限に [`api_keys_write`][5] が含まれていることを確認し、リモート構成機能で新しい API キーを作成したり、既存の API キーに機能を追加できるようにします。もし、権限を持っていない場合は、組織の Datadog 管理者に連絡して、権限を更新してください。この機能を持つキーを使用して、Agent がリモート構成を使用するための認証と認可を行うことができます。

3. [リモート構成][8]ページで、リモート構成を有効にします。これにより、組織全体の Datadog コンポーネントが Datadog から構成を受信できるようになります。
**Note:** Beginning April 8, 2024, Remote Configuration is on-by-default for:
* New child organizations that are created by existing Datadog customers who already have enabled Remote Configuration at the parent organization level **and** are in the same Datadog site as their parent organization.
* Organizations created by new Datadog customers.

To opt-out of Remote Configuration use, see the [opt-out section][23].

4. Select an existing API key or create a new API key, and enable the Remote Configuration capability on the key. If your new organization fulfills the conditions mentioned in step 3, Remote Configuration is enabled on your API keys be default.

   {{<img src="agent/remote_config/RC_Key_updated.png" alt="API Key properties with Remote Configuration capability Enable button." width="90%" style="center">}}

5. Agent コンフィギュレーションファイルを更新します。
**Note:** This step is required only for Agent versions 7.46.0 or lower. Starting with Agent version 7.47.0, `remote_configuration.enabled` is set to `true` by default in the Agent. To opt-out of Remote Configuration use, see the [opt-out section][23].

{{< tabs >}}
{{% tab "コンフィギュレーション YAML ファイル" %}}
リモート構成の機能を有効にした API キーを指定し、コンフィギュレーション YAML ファイルに以下を追加します。
```yaml
api_key: xxx
remote_configuration:
  enabled: true
```

{{% /tab %}}
{{% tab "環境変数" %}}
Datadog Agent マニフェストに以下を追加し、リモート構成機能が有効になっている API キーを指定します。
```yaml
DD_API_KEY=xxx
DD_REMOTE_CONFIGURATION_ENABLED=true
```

{{% /tab %}}
{{% tab "Helm" %}}
Helm チャートに以下を追加し、リモート構成機能が有効になっている API キーを指定します。
```yaml
datadog:
  apiKey: xxx
remoteConfiguration:
  enabled: true
```

{{% /tab %}}
{{< /tabs >}}


6. Restart your Agent for the changes to take effect.

これらの手順を実行すると、Agent は Datadog に構成をリクエストし、リモート構成を使用する機能が有効になります。
- [CSM Threats デフォルト Agent ルール][9]は、リリースされると自動的に更新されます。
- [APM Agent-level sampling rates][10] are applied.
- [ダイナミックインスツルメンテーション][11]が有効になります。
- [ASM 1 クリック有効化、IP ブロック、攻撃パターン更新][12]が有効になります。

## ベストプラクティス

### Datadog 監査証跡

Use [Datadog Audit Trail][13] to monitor organization access and Remote Configuration enabled events. Audit Trail allows your administrators and security teams to track the creation, deletion, and modification of Datadog API and application keys. After Audit Trail is configured, you can view events related to Remote Configuration enabled features and who has requested these changes. Audit Trail allows you to reconstruct sequences of events, and establish robust Datadog monitoring for Remote Configuration.

### モニター

[モニター][14]を構成して、興味のあるイベントが発生したときに通知を受け取るようにします。

## トラブルシューティング

リモート構成を使用して問題が発生した場合、以下のトラブルシューティングガイドラインを使用してください。さらに支援が必要な場合は、[Datadog サポート][15]に連絡してください。

### Agent を再起動します。

After the Agent configuration is updated in the [`datadog.yaml`][16] file, restart the Agent for this change to take effect.

### Ensure Datadog Remote Configuration endpoints are reachable from your environment

To use Remote Configuration, both the Agent and the Observability Pipelines Worker deployed in your environment communicate to Datadog Remote Configuration [endpoints][17]. For private network connection between your environment and Datadog, you can also connect to Remote Configuration Virtual Private Cloud [endpoints][25]. Ensure that outbound HTTPS has access to Remote Configuration endpoints from your environment. If you also have a proxy in between Datadog and your environment, update your [proxy settings][18] to incorporate Remote Configuration endpoints.

### 組織レベルでリモート構成を有効にする

To enable Remote Configuration at the [Organization][8] level in the Datadog UI, go to the [Remote Configuration Setup][26] page in your **Organization Settings**. This allows your authenticated and authorized Datadog components to remotely receive configurations and security detection rules of supported features from Datadog. Only users who have the [`org_management`][7] RBAC permission can enable Remote Configuration at the Organization level.

### API キーのリモート構成を有効にする

To authenticate and authorize the Agent to receive configurations and security detection rules, and to allow the Observability Pipelines Worker to receive configurations, enable Remote Configuration on the relevant API Key. Only users who have the [`api_keys_write`][5] RBAC permission can enable Remote Configuration on the API Key.

**注:** [`api_keys_write`][5] の RBAC 権限があり、リモート構成の[組織][8]レベルの権限がない場合、新規または既存の API キーに対してリモート構成を有効にすることはできません。既存の API キーでリモート構成を無効にする権限のみがあります。

### Review Remote Configuration status of Agents and Tracing libraries

Gain visibility into the Remote Configuration status of your Agent and Tracing library through the [Remote Configuration UI][8].

The following table describes the meaning of each Agent status:

  | Agent のステータス     | 説明                                      |
  |------------------|--------------------------------------------------|
  | CONNECTED      | 環境にデプロイされた Agent は、Datadog に正常にアクセス、認証、認可することができます。これは、Agent がリモート構成に最適な状態です。                                               |
  | UNAUTHORIZED          | 環境にデプロイされた Agent は Datadog にアクセスすることができますが、リモート構成操作のために Datadog との認証と認可を行うことができません。最も考えられる原因は、Agent が使用している API キーがリモート構成に対応していないことです。この問題を解決するには、Agent が使用する API キーのリモート構成機能を有効にしてください。                                                 |
  | CONNECTION ERROR        |   The Agent deployed in your environment has `remote_config.enabled` set to true in its `datadog.yaml` configuration file, however, the Agent cannot be found in the Remote Configuration service. The most likely cause is that the Agent is unable to reach Remote Configuration [endpoints][17]. To fix the issue, allow outbound HTTPS access to Remote Configuration endpoints from your environment. This status displays when the Agent version is `7.45.0` or higher.
  | DISABLED       |   環境にデプロイされた Agent は、`datadog.yaml` コンフィギュレーションファイルで `remote_config.enabled` が false に設定されています。Agent でリモート構成を有効にしたい場合は、`remote_config.enabled` を true に設定してください。このステータスは、Agent のバージョンが `7.45.0` 以上の場合に表示されます。 |
  | NOT CONNECTED       | Agent がリモート構成サービスで見つからず、`datadog.yaml` コンフィギュレーションファイルで `remote_config.enabled` が true または false に設定されている可能性があります。ローカルの Agent 構成またはプロキシ設定を確認してください。このステータスは、Agent のバージョンが `7.41.1` よりも高く、`7.45.0` よりも低い場合に表示されます。            |
  | UNSUPPORTED AGENT   | Agent のバージョンがリモート構成に対応していません。この問題を解決するには、Agent を最新のバージョンに更新してください。 |

The following table describes the meaning of each Tracing library status:

  | Tracing library Status| 説明                                      |
  |------------------|--------------------------------------------------|
  | CONNECTED      | The Tracing library is successfully connected to the Remote Configuration service through the associated Agent. This is the optimal state you want your Tracing library to be in for Remote Configuration.                                               |
  | UNAUTHORIZED          | The Tracing library is associated with an Agent which doesn't have `Remote Config Read` permission on its API key. To fix the issue, you need to enable Remote Configuration capability on the API Key used by the Agent associated with the Tracing library.|
  | CONNECTION ERROR        |   The Tracing library deployed in your environment is associated with an Agent that has remote_config.enabled set to true in its `datadog.yaml` configuration file, however, the agent cannot be found in the Remote Configuration service. The most likely cause of this is that the associated Agent is unable to reach Remote Configuration [endpoints][17]. To fix the issue, you need to allow outbound HTTPS access to Remote Configuration endpoints from your environment.
  | DISABLED       |   The Tracing library deployed in your environment is associated with an Agent that has `remote_config.enabled` set to false in its `datadog.yaml` configuration file. This could be set deliberately or mistakenly. To enable Remote Configuration on the associated Agent, set `remote_config.enabled` to true.  |
  | NOT CONNECTED       | The Tracing library cannot be found in the Remote Configuration service and is associated with an Agent that could have `remote_config.enabled` set to true or false in its `datadog.yaml` configuration file. Check your local Agent configuration or your proxy settings.|
  | UNSUPPORTED AGENT   | The Tracing library is associated with an Agent which is not Remote Configuration capable. To fix this issue, update the associated Agent software to the latest available version. |
  | NOT DETECTED   | The Tracing library does not support Remote Configuration. To fix this issue, update the Tracing library software to the latest available version. |
  | UNKNOWN   | The Tracing library status is unknown, and it can't be determined if an Agent is associated with the Tracing library. For example, this could be because the Agent is deployed on a fully managed serverless container service like AWS Fargate. |

## Opting out of Remote Configuration

To opt-out of Remote Configuration use, you can disable Remote Configuration at the organization level. Optionally, you can also disable Remote Configuration capability at the API key level and Agent level.

### At the Organization level

Disable Remote Configuration at the organization level on the [Remote Configuration][8] page. This disables Datadog components across your organization to receive configurations from Datadog. You need the [`org_management`][7] permission to disable Remote Configuration at the organization level.

### At the API key level
Disable the API key of your choice on the [API Keys][24] page. You need the [`api_keys_write`][5] permission to disable Remote Configuration on an API key.

### At the Agent level
Agent バージョン 7.47.0 以降は、デフォルトで `remote_configuration.enabled` が Agent 内で `true` に設定されています。この設定により、Agent は Datadog サイトから構成のアップデートをリクエストするようになります。

Datadog から構成を受信するには、以下の手順も必要です。
- 組織レベルでリモート構成を有効にします。
- Datadog UI から API キーのリモート構成機能を有効にします。
- 環境からリモート構成[エンドポイント][17]へのアウトバウンド HTTPS アクセスを許可します。

Agent から Datadog に構成リクエストを送信したくない場合は、Agent で `remote_configuration.enabled` を `false` に設定します。

{{< tabs >}}
{{% tab "コンフィギュレーション YAML ファイル" %}}
[コンフィギュレーション YAML ファイル][101]の `remote_configuration.enabled` を `true` から `false` に変更します。
```yaml
remote_configuration:
  enabled: false
```

[101]: /agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
{{% /tab %}}
{{% tab "環境変数" %}}
Datadog Agent マニフェストに以下を追加します。
```yaml
DD_REMOTE_CONFIGURATION_ENABLED=false
```

{{% /tab %}}
{{% tab "Helm" %}}
Helm チャートに以下を追加します。
```yaml
datadog:
  remoteConfiguration:
    enabled: false
```

{{% /tab %}}
{{< /tabs >}}

## Supported environments

Remote Configuration works in environments where the Datadog Agent is deployed. For a Serverless Container service like AWS Fargate, the underlying hosts do not appear in the Remote Configuration onboarding workflow. Remote Configuration does not support Serverless Container Managed Apps (AWS App Runner, Azure Container Apps, Google Cloud Run) and Functions deployed with Container Packaging (AWS Lambda, Azure Functions, Google Cloud Functions)
.
## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/site/
[3]: /security/threats/setup
[4]: /observability_pipelines/#observability-pipelines-worker
[5]: /account_management/rbac/permissions#api-and-application-keys
[6]: /security/application_security/enabling/compatibility/
[7]: /account_management/rbac/permissions#access-management
[8]: https://app.datadoghq.com/organization-settings/remote-config
[9]: /security/default_rules/#cat-workload-security
[10]: /tracing/trace_pipeline/ingestion_controls/#managing-ingestion-for-all-services-at-the-agent-level
[11]: /dynamic_instrumentation/?tab=configurationyaml#enable-remote-configuration
[12]: /security/application_security/how-appsec-works/#built-in-protection
[13]: /account_management/audit_trail
[14]: /monitors/
[15]: /help/
[16]: /agent/remote_config/?tab=configurationyamlfile#setup
[17]: /agent/configuration/network
[18]: /agent/configuration/proxy/
[19]: /tracing/service_catalog/
[20]: /dynamic_instrumentation/?tab=configurationyaml#prerequisites
[21]: /agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[22]: /tracing/trace_collection/runtime_config/
[23]: /agent/remote_config/?tab=configurationyamlfile#opting-out-of-remote-configuration-at-the-agent-level
[24]: https://app.datadoghq.com/organization-settings/api-keys
[25]: /agent/guide/
[26]: https://app.datadoghq.com/organization-settings/remote-config/setup?page_id=org-enablement-step
[27]: /agent/fleet_automation/#send-a-remote-flare
