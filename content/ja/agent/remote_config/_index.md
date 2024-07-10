---
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
- link: /security/cloud_workload_security/setup/?tab=kubernetes#overview
  tag: Documentation
  text: クラウドワークロードセキュリティのセットアップ
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: ブログ
  text: Datadog 監査証跡の使用
- link: https://www.datadoghq.com/blog/remote-configuration-for-datadog/
  tag: ブログ
  text: リモート構成で Datadog コンポーネントにリアルタイムの更新を適用
title: リモート構成
---

{{% site-region region="gov" %}}

<div class="alert alert-warning">US1-FED Datadog サイトでは、リモート構成は利用できません。</div>

{{% /site-region %}}

## 概要
リモート構成は Datadog の機能で、インフラストラクチャーにデプロイされた Datadog コンポーネント (Agent、トレーシングライブラリ、観測可能性パイプラインワーカーなど) の動作を、一部の製品機能に対してリモートで設定することが可能です。リモート構成を使用すると、オンデマンドで環境内の Datadog コンポーネントに構成を適用し、管理コストを削減し、チーム間の摩擦を減らし、問題解決時間を短縮することができます。

Datadog のセキュリティ製品である Application Security Management と Cloud Workload Security については、リモート構成対応の Agent と互換性のあるトレーシングライブラリにより、リアルタイムにセキュリティアップデートとレスポンスを提供し、アプリケーションやクラウドインフラストラクチャーのセキュリティ体制を強化することができます。

## UDS の仕組み
Datadog Agent でリモート構成を有効にすると、設定されている [Datadog サイト][1]を定期的にポーリングし、リモート構成が有効な Agent やトレーシングライブラリに適用すべき構成変更があるかどうかを判断します。

リモート構成が有効な製品機能に対して、それぞれの Datadog 製品 UI で構成変更を送信すると、その変更が Datadog に保存されます。

リモート構成の仕組みを下図に示します。

{{<img src="agent/guide/RC_Diagram_v4.png" alt="Users configure features in the UI, the config is stored in Datadog, the Agent requests config updates." width="90%" style="center">}}

1. Datadog の UI で選択した製品機能を構成します。
2. 製品の機能構成は、Datadog 内に安全に保存されます。
3. お客様の環境にある Agent は、Datadog からの構成アップデートを安全にポーリングし、受信し、自動的に適用します。

**注**: リモート構成で適用された構成の変更は、Agent のコンフィギュレーションファイルには表示されません。

## 製品および機能の特徴
リモート構成では、以下の製品・機能に対応しています。

### Application Security Management (ASM)

- **1 クリック ASM アクティベーション**: Datadog UI から 1 クリックで ASM を有効化します。
- **アプリ内攻撃パターンアップデート**: 新たに公開された脆弱性や攻撃ベクトルに従って Datadog が最新の Web Application Firewall (WAF) 攻撃パターンをリリースすると、これを自動的に受け取ることができます。
- **保護**: Datadog UI を通じて、攻撃者の IP、認証済みユーザー、ASM セキュリティシグナルとトレースでフラグが立った疑わしいリクエストを一時的または永続的にブロックします。

### アプリケーションパフォーマンスモニタリング (APM)
<div class="alert alert-info">これは非公開ベータ版の機能です。</div>

- **Remotely instrument your Kubernetes services with APM**: Datadog Library Injection による Datadog APM で Kubernetes のサービスをリモートでインスツルメンテーションし、デプロイをすべて Datadog UI 内で管理します。Java、Node、Python のアプリケーションで利用可能です。詳しくは、[リモートインスツルメンテーションの設定][2]を参照してください。
- **Agent のサンプリングレートをリモートで設定する**: Datadog Agent を再起動することなく、Datadog Agent のトレースサンプリング速度を変更し、組織のトレース取り込みをニーズに応じて拡張するためのルールをリモートで設定します。

### ダイナミックインスツルメンテーション
<div class="alert alert-info">これはベータ版の機能です。</div>

- 重要なメトリクス、トレース、ログを、コードを変更することなく、ライブアプリケーションから送信できます。

### クラウドワークロードセキュリティ (CWS)

<div class="alert alert-info">デフォルト Agent ルールのリモート構成はベータ版です。</div>

<div class="alert alert-info">カスタムルールのリモート構成は非公開ベータ版です。この<a href="https://docs.google.com/forms/d/e/1FAIpQLSe5Emr7y_Jg3ShcC44HlYtalxKgHUocFAz8dq87xSkjfeALTg/viewform">フォーム</a>にご記入の上、アクセスをリクエストしてください。</div>

- **自動デフォルト Agent ルールアップデート**: 新しい Agent の検出や機能強化がリリースされると、Datadog が管理しているデフォルトの Agent ルールを自動的に受信し、更新します。詳しくは、[Cloud Workload Security の設定][3]をご覧ください。
- **カスタム Agent ルールの自動デプロイ**: カスタム Agent ルールを指定したホスト (すべてのホストまたは定義したホストのサブセット) に自動的にデプロイします。

### 観測可能性パイプライン
<div class="alert alert-info">これは非公開ベータ版の機能です。</div>

- **[観測可能性パイプラインワーカー][4] (OPW) をリモートでデプロイし、更新する**: Datadog UI でパイプラインを構築・編集し、環境内で稼働している OPW インスタンスに構成変更をロールアウトします。

## セキュリティへの配慮

Datadog は、Datadog コンポーネントが受信し適用した構成の機密性、完全性、可用性を保護するために、以下のセーフガードを実装しています。

* インフラストラクチャーにデプロイされた Agent が Datadog に構成をリクエストします。
* Datadog は、Agent からリクエストされない限り構成を送信せず、リクエストした Agent に関連する構成のみを送信します。
* 構成リクエストは、お客様の Agent から HTTPS (ポート 443) 経由で Datadog に送信されるため、ネットワークファイアウォールで追加のポートを開く必要はありません。
* お客様の Agent と Datadog 間の通信は、HTTPS を使用して暗号化され、お客様の Datadog API キーを使用して認証と認可が行われます。
* [`api_keys_write`][5] 権限を持つユーザーのみが、API キーでリモート構成機能を有効または無効にし、サポートされている製品機能を使用することが認可されます。
* Datadog UI を通じて送信されたお客様の構成変更は、Agent とリクエストする Datadog コンポーネント上で署名および検証され、構成のインテグレーションが確認されます。

## リモート構成を有効にする

### 前提条件


- Datadog Agent バージョン `7.41.1` (APM サンプリングレートは `7.42.0`、APM Remote Instrumentation は `7.43.0`) 以上がホストまたはコンテナにインストールされていること。
- トレーシングライブラリを使用する機能については、以下の Datadog トレーシングライブラリの最小バージョンは、こちらを含みます。

  | 製品機能                        | Go            | Java          | .Net          | NodeJS
  |----------------------------------------|---------------|---------------|---------------|---------------|
  | ダイナミックインスツルメンテーション |               | 1.5.0         | 2.22.0        |               |

  ASM Protection 機能および ASM 1 クリックアクティベーションについては、[互換性要件][6]を参照してください。

### セットアップ

リモート構成を有効にするには

1. RBAC 権限に [`org_management`][7] が含まれていることを確認し、組織のリモート構成を有効にすることができるようにします。

2. RBAC 権限に [`api_keys_write`][5] が含まれていることを確認し、リモート構成機能で新しい API キーを作成したり、既存の API キーに機能を追加できるようにします。もし、権限を持っていない場合は、組織の Datadog 管理者に連絡して、権限を更新してください。この機能を持つキーを使用して、Agent がリモート構成を使用するための認証と認可を行うことができます。

3. [リモート構成][8]ページで、リモート構成を有効にします。これにより、組織全体の Datadog コンポーネントが Datadog から構成を受信できるようになります。

4. 既存の API キーを選択するか、新しい API キーを作成し、そのキーでリモート構成機能を有効にします。

   {{<img src="agent/guide/RC_Key_updated.png" alt="API Key properties with Remote Config capability Enable button." width="90%" style="center">}}

5. Agent コンフィギュレーションファイルを更新します。

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
- [CWS デフォルト Agent ルール][9]は、リリースされると自動的に更新されます。
- [Datadog リモートインスツルメンテーション][2]が有効になります。
- [APM Agent レベルのサンプリングレート][10]が適用されます。
- [ダイナミックインスツルメンテーション][11]が有効になります。
- [ASM 1 クリック有効化、IP ブロック、攻撃パターン更新][12]が有効になります。

## ベストプラクティス

### Datadog Audit Trail（監査証跡）

[Datadog 監査証跡][13]を使用して、組織のアクセスやリモート構成が有効なイベントを監視します。監査証跡により、管理者やセキュリティチームは、Datadog API およびアプリケーションキーの作成、削除、および変更を追跡することができます。監査証跡が構成されると、リモート構成が有効な機能に関連するイベントや、誰がこれらの変更をリクエストしたかを表示できます。監査証跡により、イベントのシーケンスを再構築し、リモート構成の堅牢な Datadog モニタリングを確立することができます。

### アラート設定

[モニター][14]を構成して、興味のあるイベントが発生したときに通知を受け取るようにします。

## トラブルシューティング

リモート構成を使用して問題が発生した場合、以下のトラブルシューティングガイドラインを使用してください。さらに支援が必要な場合は、[Datadog サポート][15]に連絡してください。

### Agent を再起動します。

Agent の構成が [`datadog.yaml`][16] ファイルで更新された後、この変更を有効にするために Agent を再起動します。

### Datadog リモート構成のエンドポイントが環境から到達可能であることを確認する

リモート構成を使用するには、環境にデプロイされた Agent と観測可能性パイプラインワーカーの両方が Datadog リモート構成[エンドポイント][17]に通信します。アウトバウンド HTTPS が環境からこれらのエンドポイントにアクセスできることを確認します。Datadog と環境の間にプロキシがある場合は、[プロキシ設定][18]を更新してリモート構成のエンドポイントを組み込んでください。

### 組織レベルでリモート構成を有効にする

Datadog UI の[組織][8]レベルでリモート構成を有効にするには、**Organization Settings > Security > Remote Configuration** メニューに従います。これにより、認可された Datadog コンポーネントが、サポートされている機能の構成やセキュリティ検出ルールを Datadog からリモートで受信できるようになります。組織レベルでリモート構成を有効にできるのは、[`org_management`][7] の RBAC 権限を持つユーザーのみです。

### API キーのリモート構成を有効にする

Agent が構成とセキュリティ検出ルールを受け取るための認証と認可、および観測可能性パイプラインワーカーが構成を受け取るための許可を行うには、関連する API キーのリモート構成を有効にします。API キーのリモート構成を有効にできるのは、[`api_keys_write`][5] の RBAC 権限を持つユーザーのみです。

**注:** [`api_keys_write`][5] の RBAC 権限があり、リモート構成の[組織][8]レベルの権限がない場合、新規または既存の API キーに対してリモート構成を有効にすることはできません。既存の API キーでリモート構成を無効にする権限のみがあります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/site/
[2]: /ja/tracing/trace_collection/library_injection_remote/
[3]: /ja/security/cloud_workload_security/setup
[4]: /ja/observability_pipelines/#observability-pipelines-worker
[5]: /ja/account_management/rbac/permissions#api-and-application-keys
[6]: /ja/security/application_security/enabling/compatibility/
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
[17]: /ja/agent/guide/network
[18]: /ja/agent/proxy/