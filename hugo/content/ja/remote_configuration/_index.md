---
algolia:
  tags:
  - remote config
  - remote configuration
aliases:
- /ja/agent/guide/how_rc_works
- /ja/agent/guide/how_remote_config_works
- /ja/agent/remote_config
description: インフラストラクチャーにデプロイされた Datadog コンポーネント (Agent、SDK、Observability Pipelines
  Worker など) の動作をリモートで構成および変更します。
further_reading:
- link: /security/application_security/how-appsec-works/#built-in-protection
  tag: ドキュメント
  text: アプリケーションセキュリティモニタリングの仕組み
- link: /dynamic_instrumentation/?tab=configurationyaml#enable-remote-configuration
  tag: ドキュメント
  text: Dynamic Instrumentation
- link: /security/workload_protection/
  tag: ドキュメント
  text: Workload Protection のセットアップ
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: ブログ
  text: Datadog 監査証跡の使用
- link: https://www.datadoghq.com/blog/remote-configuration-for-datadog/
  tag: ブログ
  text: リモート構成で Datadog コンポーネントにリアルタイムの更新を適用
title: Remote Configuration
---
## 概要 {#overview}

Remote Configuration は Datadog の機能で、インフラストラクチャーにデプロイされた Datadog コンポーネント (Agent、SDK、Observability Pipelines Worker など) における一部の製品機能の動作をリモートで構成および変更することが可能です。Remote Configuration を使用すると、オンデマンドで環境内の Datadog コンポーネントに構成を適用し、管理コストを削減し、チーム間の摩擦を減らし、問題解決時間を短縮することができます。

Datadog のセキュリティ製品である App and API Protection と Workload Protection については、Remote Configuration 対応の Agent と互換性のある SDK により、リアルタイムにセキュリティアップデートとレスポンスを提供し、アプリケーションやクラウドインフラストラクチャーのセキュリティ体制を強化することができます。

## 仕組み {#how-it-works}

Remote Configuration が有効な場合、Datadog Agent などの Datadog コンポーネントは、設定されている [Datadog サイト][1]を安全にポーリングし、適用する準備ができた構成変更がないか調べます。その後、保留中の変更が自動的に Datadog コンポーネントに適用されます。たとえば、Remote Configuration が有効な製品機能に対して、Datadog UI で構成変更を送信すると、その変更が Datadog に保存されます。

リモート構成の仕組みを下図に示します。

{{<img src="agent/remote_config/RC_Diagram_v5.png" alt="ユーザーが UI で機能を構成すると、構成が Datadog に保存され、Agent が構成の更新をリクエストします。" width="90%" style="center">}}

1. Datadog の UI で選択した製品機能を構成します。
2. 製品の機能構成は、Datadog 内に安全に保存されます。
3. Remote Configuration が有効な環境内の Datadog コンポーネントは、Datadog からの構成アップデートを安全にポーリングし、受信し、自動的に適用します。環境にデプロイされたトレーシングライブラリは、Datadog を直接ポーリングする代わりに、Agent と通信し、Datadog からの構成アップデートをリクエスト、受信します。

## サポートされる環境 {#supported-environments}

Remote Configuration は、サポート対象の Datadog コンポーネントがデプロイされている環境で機能します。サポートされている Datadog コンポーネントには、次のものがあります。
- Agent
- トレーサー (間接的に)
- Observability Pipelines Worker
- AWS Fargate などのプライベートアクションランナーおよびサーバーレスコンテナクラウドサービス。

Remote Configuration は、AWS App Runner、Azure Container Apps、Google Cloud Run、などのサーバーレスコンテナ管理アプリや、AWS Lambda、Azure Functions、Google Cloud Functions などのコンテナパッケージでデプロイされた関数には対応していません。

## サポートされている製品と機能 {#supported-products-and-features}

リモート構成では、次の製品・機能に対応しています。

Fleet Automation
: - Datadog サイトから[直接フレアを送信][27]します。ホストに直接アクセスすることなく、Datadog Agent をシームレスにトラブルシューティングします。
: - [Agentをアップグレード][29]します。

App and API Protection (AAP)
: - [1クリック AAP アクティベーション][33]: Datadog UI から 1クリックで AAP を有効にします。
: - [アプリ内攻撃パターンアップデート][34]: 新たに公開された脆弱性や攻撃ベクトルに従って Datadog が最新の Web Application Firewall (WAF) 攻撃パターンをリリースすると、これを自動的に受け取ることができます。
: - [保護][34]: Datadog UI を通じて、攻撃者の IP、認証済みユーザー、AAP セキュリティシグナルとトレースでフラグが立った疑わしいリクエストを一時的または永続的にブロックします。

Application Performance Monitoring (APM)
: - ランタイムの構成: サービスを再起動することなく、Catalog UI 内からサービスのトレースサンプリングレート、ログ挿入の有効化、HTTP ヘッダータグを変更します。詳細については、[ランタイムの構成][22]を参照してください。
: - [Agent のサンプリングレートをリモートで設定する][35]: Datadog Agent を再起動することなく、Datadog Agent のトレースサンプリング速度を変更し、組織のトレース取り込みをニーズに応じて拡張するためのルールをリモートで設定します。

[Dynamic Instrumentation][36]
: - コードを変更することなく、ライブアプリケーションからクリティカルなメトリクス、トレース、ログを送信します。

Workload Protection
: - 自動デフォルト Agent ルールアップデート: 新しい Agent の検出や機能強化がリリースされると、Datadog が管理しているデフォルトの Agent ルールを自動的に受信し、更新します。詳細については、[Workload Protection のセットアップ][3]を参照してください。
: - カスタム Agent ルールの自動デプロイ: カスタム Agent ルールを指定したホスト (すべてのホストまたは定義したホストのサブセット) に自動的にデプロイします。

Observability Pipelines
: - [Observability Pipelines Worker][4] (OPW) をリモートでデプロイし、更新する: Datadog UI でパイプラインを構築・編集し、環境内で稼働している OPW インスタンスに構成変更をロールアウトします。

[Autoscaling][47]
: - コンテナ化された環境用のオートスケーリングクラスターとワークロードスケーリングの構成をリモートで管理します。詳細については、[Autoscaling][47]を参照してください。

プライベートアクションランナー
: - パブリックインターネットにサービスを公開することなく、プライベートネットワーク上でホストされているサービスとやり取りする Datadog のワークフローやアプリを実行します。詳細については、[Private Actions][30]を参照してください。

Feature Flag
: - 評価コンテキストに基づく同期的なバリアント割り当てのために、サーバー側の SDK にフラグ構成 (ターゲティングルールと割り当てルール) を配信します。詳細については、[Feature Flag][48]を参照してください。

## セキュリティへの配慮 {#security-considerations}

Datadog は、Datadog コンポーネントが受信し適用した構成の機密性、完全性、可用性を保護するために、次のセーフガードを実装しています。

- インフラストラクチャーにデプロイされた Remote Configuration が有効な Datadog コンポーネントが Datadog に構成をリクエストします。
  <div class="alert alert-info">プライベートアクションランナーなどの一部のコンポーネントは、常に Remote Configuration が有効です。Agent などの他のコンポーネントは、ディスク上の構成オプションを使用して有効または無効にできます。</div>
- Datadog は、Datadog コンポーネントからリクエストされない限り、構成変更を送信しません。構成変更を送信する場合、Datadog はリクエストされたコンポーネントに関連する変更のみを送信します。
- 構成リクエストは、インフラストラクチャーから Datadog に HTTPS (ポート 443) 経由で行われます。これは、Agent が可観測性データの送信にデフォルトで使用するポートと同じです。
- お客様の Datadog コンポーネントと Datadog の間の通信は、HTTPS を使用して暗号化され、お客様の Datadog API キーを使用して認証と認可が行われます。ただし、プライベートアクションランナーの場合は JWT トークンが代わりに使用されます。
- [`api_keys_write`][5] 権限を持つユーザーのみが、API キーでリモート構成機能を有効または無効にし、サポートされている製品機能を使用することが認可されます。
- Datadog UI を通じて送信されたお客様の構成変更は、リクエスト元の Datadog コンポーネントによって署名および検証され、構成のインテグレーションが確認されます。

### ロールベースのアクセス {#role-based-access}

Remote Configuration を有効にすると、次の製品に影響します。製品ごとに、ユーザーに付与する必要があるロールベースのアクセス制御のセットが定義されています。アクセス管理に関する一般的な情報については、[アクセス制御][37]を参照してください。

 | Remote Configuration が有効な製品   | ロールベースのアクセス制御                                                                                                                                                                                                                                                                     |
 |----------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
 | Fleet Automation                       | `FLEET_POLICIES_WRITE`<br>`AGENT_UPGRADE_WRITE`<br>`FLEET_FLARE`<br><br>詳細については、[Fleet Automation][38]を参照してください。                                                                                                                                                                     |
 | App and API Protection                 | `APPSEC_ACTIVATION_READ`<br>`APPSEC_ACTIVATION_WRITE`<br>`APPSEC_PROTECT_READ`<br>`APPSEC_PROTECT_WRITE`<br><br>詳細については、[アクセス制御][39]を参照してください。                                                                                                                               |
 | APM                                    | `APM_SERVICE_INGEST_READ`<br>`APM_SERVICE_INGEST_WRITE`<br>`APM_REMOTE_CONFIGURATION_READ`<br>`APM_REMOTE_CONFIGURATION_WRITE`<br><br>詳細については、[アダプティブサンプリング][40]を参照してください。                                                                                                      |
 | Dynamic Instrumentation                | `DEBUGGER_READ`<br>`DEBUGGER_WRITE`<br>`DEBUGGER_WRITE_PRE_PROD`<br>`APM_REMOTE_CONFIGURATION_READ`<br>`APM_REMOTE_CONFIGURATION_WRITE`<br><br>詳細については、[APM][41]を参照してください。                                                                                                           |
 | Workload Protection                    | `SECURITY_MONITORING_CWS_AGENT_RULES_WRITE`<br>`SECURITY_MONITORING_CWS_AGENT_RULES_READ`<br>`SECURITY_MONITORING_CWS_AGENT_RULES_ACTIONS`<br><br>詳細については、[セキュリティ][42]を参照してください。                                                                                                   |
 | CSM サイドスキャン                      | `ORG_MANAGEMENT`<br>`MANAGE_INTEGRATIONS`<br><br>詳細については、[Agentless Scanning の有効化][43]を参照してください。                                                                                                                                                                                  |
 | Observability Pipelines                | `OBSERVABILITY_PIPELINES_READ`<br>`OBSERVABILITY_PIPELINES_WRITE`<br>`OBSERVABILITY_PIPELINES_DELETE`<br>`OBSERVABILITY_PIPELINES_DEPLOY`<br>`OBSERVABILITY_PIPELINES_CAPTURE_WRITE`<br>`OBSERVABILITY_PIPELINES_CAPTURE_READ`<br><br>詳細については、[Observability Pipelines][44]を参照してください。|
 | プライベートアクションランナー                  | `ON_PREM_RUNNER_WRITE`<br>`ON_PREM_RUNNER_READ`<br>`ON_PREM_RUNNER_USE`<br><br>詳細については、[App Builder と Workflow Automation][45]を参照してください。                                                                                                                                             |
 | Network Device Monitoring (NDM)        | `NDM_DEVICE_PROFILES_VIEW`<br>`NDM_DEVICE_PROFILES_EDIT`                                                                                                                                                                                                                                       |
 | Container Autoscaling                  | `ORCHESTRATION_AUTOSCALING_MANAGE`<br>`ORCHESTRATION_WORKLOAD_SCALING_WRITE`<br>`ORCHESTRATION_WORKLOAD_SCALING_READ`                                                                                                                                                                          |
 | Serverless Lambda Auto-instrumentation | `SERVERLESS_AWS_INSTRUMENTATION_READ`<br>`SERVERLESS_AWS_INSTRUMENTATION_WRITE`<br><br>詳細については、[Serverless][46]を参照してください。                                                                                                                                                            |
 | Feature Flag                          | `FEATURE_FLAG_CONFIG_READ`<br>`FEATURE_FLAG_CONFIG_WRITE`<br>`FEATURE_FLAG_ENVIRONMENT_CONFIG_READ`<br>`FEATURE_FLAG_ENVIRONMENT_CONFIG_WRITE`<br><br>詳細については、[Feature Flag][48]を参照してください。                                                                                          |

## Remote Configuration を有効にする {#enable-remote-configuration}

ほとんどの場合、Remote Configuration は組織に対してデフォルトで有効になっています。[Remote Configuration][8] 設定ページから、組織で Remote Configuration が有効になっているかどうかを確認できます。有効にする必要がある場合は、次のようにします。
1. RBAC 権限に [`org_management`][7] が含まれていることを確認し、組織のリモート構成を有効にできるようにします。
1. 組織の設定ページで、[Remote Configuration][8] を有効にします。これにより、組織全体の Datadog コンポーネントが Datadog から構成を受信できるようになります。
1. 下記の[製品固有の構成](#product-specific-configuration)ガイダンスに従って、Remote Configuration のセットアップを完了します。

### 製品固有の構成 {#product-specific-configuration}

構成する製品に固有の指示については、下記のドキュメントを参照してください。

| 製品                 | セットアップ手順                                                                                             |
|-------------------------|----------------------------------------------------------------------------------------------------------------|
| Fleet Automation        | [Fleet Automation のセットアップ][31]                                                                                   |
| APM                     | [ランタイムでの構成](/tracing/guide/remote_config/)                                                      |
| Dynamic Instrumentation | [Dynamic Instrumentation スタートアップガイド](/dynamic_instrumentation/#getting-started)                      |
| Workload Protection     | [Workload Protection][3]                                                                                       |
| Observability Pipelines | Observability Pipelines に使用している API キーで [Remote Configuration が有効化][32]されていることを確認してください。|
| Sensitive Data Scanner  | [クラウドストレージ](/security/sensitive_data_scanner/setup/cloud_storage/?tab=newawsaccount)                       |
| Private Action Runner   | [Private Actions の概要](/actions/private_actions/)                                                          |
| Feature Flag           | [サーバー側の Feature Flag](/feature_flags/server/)                                                            |

## ベストプラクティス {#best-practices}

### Datadog Audit Trail {#datadog-audit-trail}

[Datadog Audit Trail][13] を使用して、組織のアクセスや Remote Configuration が有効なイベントを監視します。Audit Trail により、管理者やセキュリティチームは、Datadog API およびアプリケーションキーの作成、削除、および変更を追跡することができます。Audit Trail が構成されると、Remote Configuration が有効な機能に関連するイベントや、誰がこれらの変更をリクエストしたかを表示できます。Audit Trail により、イベントのシーケンスを再構築し、Remote Configuration の堅牢な Datadog モニタリングを確立することができます。

### モニター {#monitors}

[モニター][14]を構成して、興味のあるイベントが発生したときに通知を受け取るようにします。

## Remote Configuration の停止 {#opting-out-of-remote-configuration}

Datadog では、Remote Configuration をグローバルに無効にするのではなく、特定の Datadog 製品ごとに停止することを推奨しています。詳細については、[該当する製品のドキュメント](#product-specific-configuration)を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/site/
[3]: /ja/security/workload_protection/
[4]: /ja/observability_pipelines/#observability-pipelines-worker
[5]: /ja/account_management/rbac/permissions#api-and-application-keys
[6]: /ja/security/application_security/threats/setup/compatibility/
[7]: /ja/account_management/rbac/permissions#access-management
[8]: https://app.datadoghq.com/organization-settings/remote-config
[9]: /ja/security/default_rules/#cat-workload-security
[10]: /ja/tracing/trace_pipeline/ingestion_controls/#managing-ingestion-for-all-services-at-the-agent-level
[11]: /ja/dynamic_instrumentation/?tab=configurationyaml#enable-remote-configuration
[12]: /ja/security/application_security/how-appsec-works/#built-in-protection
[13]: /ja/account_management/audit_trail
[14]: /ja/monitors/
[15]: /ja/help/
[16]: /ja/remote_configuration
[17]: /ja/agent/configuration/network
[18]: /ja/agent/configuration/proxy/
[19]: /ja/internal_developer_portal/catalog/
[20]: /ja/dynamic_instrumentation/?tab=configurationyaml#prerequisites
[21]: /ja/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[22]: /ja/tracing/trace_collection/runtime_config/
[23]: /ja/remote_configuration#opting-out-of-remote-configuration
[24]: https://app.datadoghq.com/organization-settings/api-keys
[25]: /ja/agent/guide/
[26]: https://app.datadoghq.com/organization-settings/remote-config/setup?page_id=org-enablement-step
[27]: /ja/agent/fleet_automation/fleet_view/#send-a-remote-flare
[28]: /ja/security/sensitive_data_scanner/?tab=usingtheagent
[29]: /ja/agent/fleet_automation/upgrade_agents/
[30]: /ja/actions/private_actions/use_private_actions/
[31]: /ja/agent/guide/setup_remote_config
[32]: https://app.datadoghq.com/organization-settings/remote-config/setup?page_id=api-key-enablement-step&standalone=1
[33]: /ja/security/application_security/setup/
[34]: /ja/security/application_security/
[35]: /ja/tracing/trace_pipeline/adaptive_sampling/
[36]: /ja/tracing/dynamic_instrumentation/#explore-dynamic-instrumentation
[37]: /ja/account_management/rbac
[38]: /ja/agent/fleet_automation/#control-access-to-fleet-automation
[39]: /ja/security/access_control/#permissions
[40]: /ja/tracing/trace_pipeline/adaptive_sampling/#permissions
[41]: /ja/account_management/rbac/permissions/#apm
[42]: /ja/account_management/rbac/permissions/#cloud-security-platform
[43]: /ja/security/cloud_security_management/setup/#enable-agentless-scanning
[44]: /ja/account_management/rbac/permissions/#observability-pipelines
[45]: /ja/account_management/rbac/permissions/#app-builder--workflow-automation
[46]: /ja/account_management/rbac/permissions/#serverless
[47]: /ja/containers/autoscaling
[48]: /ja/feature_flags/