---
algolia:
  tags:
  - リモート構成
  - リモート構成
aliases:
- /ja/agent/guide/how_rc_works
- /ja/agent/guide/how_remote_config_works
further_reading:
- link: /security/application_security/how-appsec-works/#built-in-protection
  tag: Documentation
  text: アプリケーションセキュリティ モニタリングの仕組み
- link: /dynamic_instrumentation/?tab=configurationyaml#enable-remote-configuration
  tag: Documentation
  text: ダイナミックインスツルメンテーション
- link: /security/threats/setup
  tag: Documentation
  text: CSM Threats の設定
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: ブログ
  text: Datadog 監査証跡の使用
- link: https://www.datadoghq.com/blog/remote-configuration-for-datadog/
  tag: ブログ
  text: リモート構成で Datadog コンポーネントにリアルタイムの更新を適用
title: リモート構成
---

## 概要
リモート構成は Datadog の機能で、インフラストラクチャーにデプロイされた Datadog コンポーネント (Agent、トレーシングライブラリ、観測可能性パイプラインワーカーなど) の動作を、一部の製品機能に対してリモートで構成および変更することが可能です。リモート構成を使用すると、オンデマンドで環境内の Datadog コンポーネントに構成を適用し、管理コストを削減し、チーム間の摩擦を減らし、問題解決時間を短縮することができます。

Datadog のセキュリティ製品である Application Security Management と Cloud Security Management Threats (CSM Threats) については、リモート構成対応の Agent と互換性のあるトレーシングライブラリにより、リアルタイムにセキュリティアップデートとレスポンスを提供し、アプリケーションやクラウドインフラストラクチャーのセキュリティ体制を強化することができます。

## 仕組み
Datadog Agent で Remote Configuration が有効になると、設定されている [Datadog サイト][1]を定期的にポーリングし、Remote Configuration が有効な Agent やトレーシングライブラリに適用すべき構成変更があるかどうかを判断します。

リモート構成が有効な製品機能に対して、それぞれの Datadog 製品 UI で構成変更を送信すると、その変更が Datadog に保存されます。

リモート構成の仕組みを下図に示します。

{{<img src="agent/remote_config/RC_Diagram_v5.png" alt="Users configure features in the UI, the config is stored in Datadog, the Agent requests config updates." width="90%" style="center">}}

1. Datadog の UI で選択した製品機能を構成します。
2. 製品の機能構成は、Datadog 内に安全に保存されます。
3. 環境内の Agent は、Datadog からの構成アップデートを安全にポーリングし、受信し、自動的に適用します。環境にデプロイされたトレーシングライブラリは、Agent と通信し、Datadog からの構成アップデートをリクエスト、受信します。

## 構成順序の優先順位
Fleet Automation に表示されるアクティブな構成では、優先順位の高いソースによって設定された構成が優先されます。

優先順位の高いソースから低いソースへの順序:

1. リモート構成
   **注**: リモート構成で適用された構成の変更は、ローカルコンフィギュレーションファイル (`datadog.yaml`) には表示されません。
2. Helm などのツールで設定された環境変数
3. ローカルまたは Ansible、Chef、Puppet などの構成管理ツールで管理されているコンフィギュレーションファイル (`datadog.yaml`)

優先順位の高いソースから発行された構成は、優先順位の低いソースから発行された構成をオーバーライドします。

## 対応製品と機能
リモート構成では、以下の製品・機能に対応しています。

### フリートオートメーション
**Datadog サイトから直接[フレアを送信][27]**します。ホストに直接アクセスすることなく、Datadog Agent をシームレスにトラブルシューティングします。

### Application Security Management (ASM)

- **1 クリック ASM アクティベーション**: Datadog UI から 1 クリックで ASM を有効化します。
- **アプリ内攻撃パターンアップデート**: 新たに公開された脆弱性や攻撃ベクトルに従って Datadog が最新の Web Application Firewall (WAF) 攻撃パターンをリリースすると、これを自動的に受け取ることができます。
- **保護**: Datadog UI を通じて、攻撃者の IP、認証済みユーザー、ASM セキュリティシグナルとトレースでフラグが立った疑わしいリクエストを一時的または永続的にブロックします。

### Application Performance Monitoring (APM)

- **ランタイムの構成** (ベータ版): サービスを再起動することなく、[サービスカタログ][19]の UI 内からサービスのトレースサンプリングレート、ログ挿入の有効化、HTTP ヘッダータグを変更します。詳細については、[ランタイムの構成][22]を参照してください。
- **Agent のサンプリングレートをリモートで設定する** (公開ベータ版): Datadog Agent を再起動することなく、Datadog Agent のトレースサンプリング速度を変更し、組織のトレース取り込みをニーズに応じて拡張するためのルールをリモートで設定します。


### Dynamic Instrumentation

- コードを変更することなく、ライブアプリケーションからクリティカルなメトリクス、トレース、ログを送信します。

### CSM Threats

- **自動デフォルト Agent ルールアップデート**: 新しい Agent の検出や機能強化がリリースされると、Datadog が管理しているデフォルトの Agent ルールを自動的に受信し、更新します。詳しくは、[CSM Threats の設定][3]をご覧ください。
- **カスタム Agent ルールの自動デプロイ**: カスタム Agent ルールを指定したホスト (すべてのホストまたは定義したホストのサブセット) に自動的にデプロイします。

### Observability Pipelines

- **[Observability Pipelines Worker][4] (OPW) をリモートでデプロイし、更新する**: Datadog UI でパイプラインを構築・編集し、環境内で稼働している OPW インスタンスに構成変更をロールアウトします。

## セキュリティへの配慮

Datadog は、Datadog コンポーネントが受信し適用した構成の機密性、完全性、可用性を保護するために、以下のセーフガードを実装しています。

* インフラストラクチャーにデプロイされた Agent が Datadog に構成をリクエストします。
* Datadog は、Agent からリクエストされない限り構成を送信せず、リクエストした Agent に関連する構成のみを送信します。
* 構成リクエストは Agent から Datadog へ HTTPS (ポート 443) 経由で行われるため、ネットワークファイアウォールで追加のポートを開く必要はありません。
* お客様の Agent と Datadog 間の通信は、HTTPS を使用して暗号化され、お客様の Datadog API キーを使用して認証と認可が行われます。
* [`api_keys_write`][5] 権限を持つユーザーのみが、API キーでリモート構成機能を有効または無効にし、サポートされている製品機能を使用することが認可されます。
* Datadog UI を通じて送信されたお客様の構成変更は、Agent とリクエスト元の Datadog コンポーネント上で署名および検証され、構成のインテグレーションが確認されます。

## リモート構成を有効にする

### 前提条件

- Datadog Agent バージョン `7.41.1` (APM サンプリングレートは `7.42.0`、APM Remote Instrumentation は `7.43.0`) 以上がホストまたはコンテナにインストールされていること。
- トレーシング ライブラリを使用する Datadog 製品の場合は、トレーシングライブラリもリモート構成に対応したバージョンにアップグレードする必要があります。ASM Protection 機能および ASM 1 クリックアクティベーションについては、 [ASM 互換性の要件][6]を参照してください。ダイナミックインスツルメンテーションについては、[ダイナミックインスツルメンテーションの前提条件][20]を参照してください。

### セットアップ

リモート構成を有効にするには

1. RBAC 権限に [`org_management`][7] が含まれていることを確認し、組織のリモート構成を有効にすることができるようにします。

2. RBAC 権限に [`api_keys_write`][5] が含まれていることを確認し、リモート構成機能で新しい API キーを作成したり、既存の API キーに機能を追加できるようにします。もし、権限を持っていない場合は、組織の Datadog 管理者に連絡して、権限を更新してください。この機能を持つキーを使用して、Agent がリモート構成を使用するための認証と認可を行うことができます。

3. [リモート構成][8]ページで、リモート構成を有効にします。これにより、組織全体の Datadog コンポーネントが Datadog から構成を受信できるようになります。
**注:** 2024 年 4 月 8 日以降、Remote Configuration は以下の場合にデフォルトでオンになります。
* すでに親組織レベルで Remote Configuration を有効にしている既存の Datadog のお客様が作成した新しい子組織で、**かつ**親組織と同じ Datadog サイト内にある組織。
* Datadog の新しいお客様によって作成された組織。

Remote Configuration の使用を停止するには、[停止セクション][23]を参照してください。

4. 既存の API キーを選択するか、新しい API キーを作成し、そのキーで Remote Configuration 機能を有効にします。新しい組織がステップ 3 の条件を満たしている場合、Remote Configuration はデフォルトで API キー上で有効になります。

   {{<img src="agent/remote_config/RC_Key_updated.png" alt="API Key properties with Remote Configuration capability Enable button." width="90%" style="center">}}

5. Agent コンフィギュレーションファイルを更新します。
**注:** この手順は、Agent バージョン 7.46.0 以下でのみ必要です。Agent バージョン 7.47.0 以降では、`remote_configuration.enabled` は Agent 内でデフォルトで `true` に設定されています。Remote Configuration の使用を停止するには、[停止セクション][23]を参照してください。

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


6. 変更を有効にするために、Agent を再起動します。

これらの手順を実行すると、Agent は Datadog に構成をリクエストし、リモート構成を使用する機能が有効になります。
- [CSM Threats デフォルト Agent ルール][9]は、リリースされると自動的に更新されます。
- [APM Agent レベルのサンプリングレート][10]が適用されます。
- [ダイナミックインスツルメンテーション][11]が有効になります。
- [ASM 1 クリック有効化、IP ブロック、攻撃パターン更新][12]が有効になります。

## ベストプラクティス

### Datadog 監査証跡

[Datadog Audit Trail][14] を使用して、組織のアクセスや Remote Configuration が有効なイベントを監視します。Audit Trail により、管理者やセキュリティチームは、Datadog API およびアプリケーションキーの作成、削除、および変更を追跡することができます。Audit Trail が構成されると、Remote Configuration が有効な機能に関連するイベントや、誰がこれらの変更をリクエストしたかを表示できます。Audit Trail により、イベントのシーケンスを再構築し、Remote Configuration の堅牢な Datadog モニタリングを確立することができます。

### モニター

[モニター][14]を構成して、興味のあるイベントが発生したときに通知を受け取るようにします。

## トラブルシューティング

リモート構成を使用して問題が発生した場合、以下のトラブルシューティングガイドラインを使用してください。さらに支援が必要な場合は、[Datadog サポート][15]に連絡してください。

### Agent を再起動します。

Agent の構成が [`datadog.yaml`][16] ファイルで更新された後、この変更を有効にするために Agent を再起動します。

### Datadog Remote Configuration のエンドポイントが環境から到達可能であることを確認する

リモート構成を使用するには、環境にデプロイされた Agent と観測可能性パイプラインワーカーの両方が Datadog Remote Configuration [エンドポイント][17]に通信します。環境と Datadog 間のプライベートネットワーク接続のために、Remote Configuration Virtual Private Cloud [エンドポイント][25]に接続することもできます。アウトバウンド HTTPS が環境から Remote Configuration エンドポイントにアクセスできることを確認します。Datadog と環境の間にプロキシがある場合は、[プロキシ設定][18]を更新して Remote Configuration のエンドポイントを組み込んでください。

### 組織レベルでリモート構成を有効にする

Datadog UI の[組織][8]レベルでリモート構成を有効にするには、**Organization Settings** の [Remote Configuration Setup][26] ページに移動します。これにより、認可された Datadog コンポーネントが、サポートされている機能の構成やセキュリティ検出ルールを Datadog からリモートで受信できるようになります。組織レベルで Remote Configuration を有効にできるのは、[`org_management`][7] の RBAC 権限を持つユーザーのみです。

### API キーのリモート構成を有効にする

Agent が構成とセキュリティ検出ルールを受け取るための認証と認可、および Observability Pipelines Worker が構成を受け取るための許可を行うには、関連する API キーの Remote Configuration を有効にします。API キーの Remote Configuration を有効にできるのは、[`api_keys_write`][5] の RBAC 権限を持つユーザーのみです。

**注:** [`api_keys_write`][5] の RBAC 権限があり、リモート構成の[組織][8]レベルの権限がない場合、新規または既存の API キーに対してリモート構成を有効にすることはできません。既存の API キーでリモート構成を無効にする権限のみがあります。

### Agent とトレーシングライブラリの Remote Configuration ステータスの確認

[Remote Configuration UI][8] から、Agent とトレーシングライブラリの Remote Configuration ステータスを確認できます。

以下の表は、Agent の各ステータスの意味を示しています。

  | Agent のステータス     | 説明                                      |
  |------------------|--------------------------------------------------|
  | CONNECTED      | 環境にデプロイされた Agent は、Datadog に正常にアクセス、認証、認可することができます。これは、Agent がリモート構成に最適な状態です。                                               |
  | UNAUTHORIZED          | 環境にデプロイされた Agent は Datadog にアクセスすることができますが、リモート構成操作のために Datadog との認証と認可を行うことができません。最も考えられる原因は、Agent が使用している API キーがリモート構成に対応していないことです。この問題を解決するには、Agent が使用する API キーのリモート構成機能を有効にしてください。                                                 |
  | CONNECTION ERROR        |   環境にデプロイされた Agent は、`datadog.yaml` コンフィギュレーションファイルで `remote_config.enabled` が true に設定されていますが、Remote Configuration サービスで Agent が見つかりません。最も考えられる原因は、Agent が Remote Configuration の[エンドポイント][17]に到達できないことです。この問題を解決するには、環境から Remote Configuration エンドポイントへの送信 HTTPS アクセスを許可します。このステータスは、Agent のバージョンが `7.45.0` 以上の場合に表示されます。
  | DISABLED       |   環境にデプロイされた Agent は、`datadog.yaml` コンフィギュレーションファイルで `remote_config.enabled` が false に設定されています。Agent でリモート構成を有効にしたい場合は、`remote_config.enabled` を true に設定してください。このステータスは、Agent のバージョンが `7.45.0` 以上の場合に表示されます。 |
  | NOT CONNECTED       | Agent がリモート構成サービスで見つからず、`datadog.yaml` コンフィギュレーションファイルで `remote_config.enabled` が true または false に設定されている可能性があります。ローカルの Agent 構成またはプロキシ設定を確認してください。このステータスは、Agent のバージョンが `7.41.1` よりも高く、`7.45.0` よりも低い場合に表示されます。            |
  | UNSUPPORTED AGENT   | Agent のバージョンがリモート構成に対応していません。この問題を解決するには、Agent を最新のバージョンに更新してください。 |

以下の表は、トレーシングライブラリの各ステータスの意味を示しています。

  | トレーシングライブラリのステータス| 説明                                      |
  |------------------|--------------------------------------------------|
  | CONNECTED      | トレーシングライブラリは、関連付けられた Agent を介して Remote Configuration サービスに正常に接続されています。これは、トレーシングライブラリが Remote Configuration に最適な状態です。                                               |
  | UNAUTHORIZED          | トレーシングライブラリは API キーに `Remote Config Read` 権限がない Agent に関連付けられています。この問題を解決するには、トレーシングライブラリに関連付けられている Agent が使用している API キーで Remote Configuration 機能を有効にする必要があります。|
  | CONNECTION ERROR        |   環境にデプロイされたトレーシングライブラリは、`datadog.yaml` コンフィギュレーションファイルで remote_config.enabled が true に設定された Agent と関連付けられていますが、Remote Configuration サービスで Agent が見つかりません。これの最も考えられる原因は、関連付けられた Agent が Remote Configuration の[エンドポイント][17]に到達できないことです。この問題を解決するには、環境から Remote Configuration エンドポイントへの送信 HTTPS アクセスを許可する必要があります。
  | DISABLED       |   環境にデプロイされたトレーシングライブラリは、`datadog.yaml` コンフィギュレーションファイルで `remote_config.enabled` が false に設定された Agent に関連付けられています。これは故意に設定されたか、間違って設定された可能性があります。関連付けられた Agent で Remote Configuration を有効にするには、`remote_config.enabled` を true に設定してください。  |
  | NOT CONNECTED       | Remote Configuration サービスでトレーシングライブラリが見つからず、`datadog.yaml` コンフィギュレーションファイルで `remote_config.enabled` が true または false に設定されている Agent に関連付けられます。ローカルの Agent の構成かプロキシ設定を確認してください。|
  | UNSUPPORTED AGENT   | トレーシングライブラリが、Remote Configuration ができない Agent に関連付けられています。この問題を解決するには、関連付けられた Agent のソフトウェアを最新のバージョンに更新してください。 |
  | NOT DETECTED   | トレーシングライブラリが Remote Configuration をサポートしていません。この問題を解決するには、トレーシングライブラリのソフトウェアを最新のバージョンに更新してください。 |
  | UNKNOWN   | トレーシングライブラリのステータスが不明で、Agent がトレーシングライブラリに関連付けられているかどうか判断できません。例えば、Agent が AWS Fargate のようなフルマネージドサーバーレスコンテナサービス上にデプロイされていることが考えられます。 |

## Remote Configuration の停止

Remote Configuration の使用を停止するには、組織レベルで Remote Configuration を無効にします。オプションで、API キーレベルと Agent レベルで Remote Configuration を無効にすることもできます。

### 組織レベル

[Remote Configuration][8] ページで組織レベルで Remote Configuration を無効にします。これにより、組織全体の Datadog コンポーネントが Datadog から構成を受信できなくなります。組織レベルで Remote Configuration を無効にするには、[`org_management`][7] 権限が必要です。

### API キーレベル
[API Keys][24] ページで選択した API キーを無効にします。API キーの Remote Configuration を無効にするには、[`api_keys_write`][5] 権限が必要です。

### Agent レベル
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

[101]: /ja/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
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

## サポートされる環境

Remote Configuration は、Datadog Agent がデプロイされている環境で動作します。Remote Configuration は、AWS Fargate などのサーバーレスコンテナクラウドサービスをサポートしています。Remote Configuration は、サーバーレスコンテナ管理アプリ (AWS App Runner、Azure Container Apps、Google Cloud Run) や、コンテナパッケージングでデプロイされた関数 (AWS Lambda、Azure Functions、Google Cloud Functions) には対応していません。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/site/
[3]: /ja/security/threats/setup
[4]: /ja/observability_pipelines/#observability-pipelines-worker
[5]: /ja/account_management/rbac/permissions#api-and-application-keys
[6]: /ja/security/application_security/
[7]: /ja/account_management/rbac/permissions#access-management
[8]: https://app.datadoghq.com/organization-settings/remote-config
[9]: /ja/security/default_rules/#cat-workload-security
[10]: /ja/tracing/trace_pipeline/ingestion_controls/#managing-ingestion-for-all-services-at-the-agent-level
[11]: /ja/dynamic_instrumentation/?tab=configurationyaml#enable-remote-configuration
[12]: /ja/security/application_security/how-appsec-works/#built-in-protection
[13]: /ja/account_management/audit_trail
[14]: /ja/monitors/
[15]: /ja/help/
[16]: /ja/agent/remote_config/?tab=configurationyamlfile#setup
[17]: /ja/agent/configuration/network
[18]: /ja/agent/configuration/proxy/
[19]: /ja/tracing/service_catalog/
[20]: /ja/dynamic_instrumentation/?tab=configurationyaml#prerequisites
[21]: /ja/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[22]: /ja/tracing/trace_collection/runtime_config/
[23]: /ja/agent/remote_config/?tab=configurationyamlfile#opting-out-of-remote-configuration-at-the-agent-level
[24]: https://app.datadoghq.com/organization-settings/api-keys
[25]: /ja/agent/guide/
[26]: https://app.datadoghq.com/organization-settings/remote-config/setup?page_id=org-enablement-step
[27]: /ja/agent/fleet_automation/#send-a-remote-flare