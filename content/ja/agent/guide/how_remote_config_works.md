---
aliases:
- /ja/agent/guide/how_rc_works
further_reading:
- link: /security/application_security/how-appsec-works/#built-in-protection
  tag: ドキュメント
  text: アプリケーションセキュリティ モニタリングの仕組み
- link: https://www.datadoghq.com/blog/dash-2022-new-feature-roundup/#application-security-management-protection
  tag: ブログ
  text: アプリケーションセキュリティ保護
- link: /dynamic_instrumentation/?tab=configurationyaml#enable-remote-configuration
  tag: ドキュメント
  text: ダイナミックインスツルメンテーション
- link: /security/cloud_workload_security/setup/?tab=kubernetes#overview
  tag: ドキュメント
  text: クラウドワークロードセキュリティの概要
is_beta: true
kind: ガイド
private: true
title: リモート構成の仕組み
---
{{< site-region region="gov" >}}

US1-FED Datadog サイトでは、リモート構成は利用できません。

{{< /site-region >}}

{{< site-region region="us,us3,us5,eu" >}}

<div class="alert alert-info">リモート構成はベータ版です。</a></div>

## 概要
リモート構成は Datadog の機能で、インフラストラクチャーにデプロイされた Datadog リソース (Agent、トレーシングライブラリ、観測可能性パイプラインワーカーなど) の動作を、一部の製品機能に対してリモートで設定することが可能です。リモート構成を使用すると、オンデマンドで環境内の Datadog リソースに構成を適用し、管理コストを削減し、チーム間の摩擦を減らし、問題解決時間を短縮することができます。

Datadog のセキュリティ製品である Application Security Management と Cloud Workload Security については、リモート構成対応の Agent と互換性のあるトレーシングライブラリにより、リアルタイムにセキュリティアップデートとレスポンスを提供し、アプリケーションやクラウドインフラストラクチャーのセキュリティ体制を強化することができます。

## UDS の仕組み
Datadog Agent でリモート構成を有効にすると、設定されている [Datadog サイト][1]を定期的にポーリングし、リモート構成が有効な Agent やトレーシングライブラリに適用すべき構成変更があるかどうかを判断します。

リモート構成が有効な製品機能に対して、それぞれの Datadog 製品 UI で構成変更を送信すると、その変更が Datadog に保存されます。

リモート構成の仕組みを下図に示します。

{{<img src="agent/guide/RC_Diagram_v3.png" alt="Users configure features in the UI, the config is stored in Datadog, the Agent requests config updates." width="90%" style="center">}}

1. Datadog の UI で選択した製品機能を構成します。
2. 製品の機能構成は、Datadog 内に安全に保存されます。
3. お客様の環境にある Agent は、Datadog からの構成アップデートを安全にポーリングし、受信し、自動的に適用します。

**注**: リモート構成で適用された構成の変更は、Agent のコンフィギュレーションファイルには表示されません。

## 製品および機能の特徴
リモート構成では、以下の製品・機能に対応しています。

### Application Security Management (ASM)
<div class="alert alert-info">これはベータ版の機能です。</div>

- **1 クリック ASM アクティベーション**: Datadog UI から 1 クリックで ASM を有効化します。
- **アプリ内攻撃パターンアップデート**: 新たに公開された脆弱性や攻撃ベクトルに従って Datadog が最新の Web Application Firewall (WAF) 攻撃パターンをリリースすると、これを自動的に受け取ることができます。
- **保護**: Datadog UI を通じて、攻撃者の IP、認証済みユーザー、ASM セキュリティシグナルとトレースでフラグが立った疑わしいリクエストを一時的または永続的にブロックします。

### アプリケーションパフォーマンスモニタリング (APM)
<div class="alert alert-info">これは非公開ベータ版の機能です。</div>

- **Remotely instrument your Kubernetes services with APM**: Datadog Library Injection による Datadog APM で Kubernetes のサービスをリモートでインスツルメンテーションし、デプロイをすべて Datadog UI 内で管理します。Java、Node、Python のアプリケーションで利用可能です。
- **Agent のサンプリングレートをリモートで設定する**: Datadog Agent を再起動することなく、Datadog Agent のトレースサンプリング速度を変更し、組織のトレース取り込みをニーズに応じて拡張するためのルールをリモートで設定します。

### ダイナミックインスツルメンテーション
<div class="alert alert-info">これは非公開ベータ版の機能です。</div>

- 重要なメトリクス、トレース、ログを、コードを変更することなく、ライブアプリケーションから送信できます。

### クラウドワークロードセキュリティ (CWS)
<div class="alert alert-info">これは非公開ベータ版の機能です。</div>

- **自動デフォルト Agent ルールアップデート**: 新しい Agent の検出や機能強化がリリースされると、Datadog が管理しているデフォルトの Agent ルールを自動的に受信し、更新します。

### Observability Pipelines（観測データの制御）
<div class="alert alert-info">これは非公開ベータ版の機能です。</div>

- **[観測可能性パイプラインワーカー][10] (OPW) をリモートでデプロイし、更新する**: Datadog UI でパイプラインを構築・編集し、環境内で稼働している OPW インスタンスに構成変更をロールアウトします。

## セキュリティへの配慮

Datadog は、受信した構成の機密性、完全性、可用性を保護するために、以下のセーフガードを実装しており、Agent やトレーシングライブラリに適用されます。

* インフラストラクチャーにデプロイされた Agent が Datadog に構成をリクエストします。
* Datadog は、Agent からリクエストされない限り構成を送信せず、リクエストした Agent に関連する構成のみを送信します。
* 構成リクエストは、お客様の Agent から HTTPS (ポート 443) 経由で Datadog に送信されるため、ネットワークファイアウォールで追加のポートを開く必要はありません。
* お客様の Agent と Datadog 間の通信は、HTTPS を使用して暗号化され、お客様の Datadog API キーを使用して認証と認可が行われます。
* 正しい RBAC 権限を持つユーザーのみが、API キーでリモート構成機能を有効にし、サポートされている製品機能を使用することが認可されます。
* Datadog UI を通じて送信されたお客様の構成変更は、Agent とトレーシングライブラリ上で署名および検証され、構成のインテグレーションが確認されます。

## リモート構成を有効にする

### 前提条件


- Datadog Agent バージョン `7.41.1` (APM サンプリングレートは `7.42.0`) 以上がホストまたはコンテナにインストールされていること。
- トレーシングライブラリを使用する機能については、以下の Datadog トレーシングライブラリの最小バージョン:


| 製品の特徴                        | Go            | Java          | .Net          | NodeJS          
|----------------------------------------|---------------|---------------|---------------|---------------|
| ダイナミックインスツルメンテーション |               | 1.5.0         | 2.22.0        |               |
| ASM Protect                | 1.45.1        | 1.4.0         | 2.16.0        | 3.11.0        |
| ASM 1 クリックアクティベーション        |               | 1.4.0         | 2.17.0        | 3.9.0         |

### セットアップ
リモート構成を有効にするには

1. RBAC 権限に [`org_management`][9] が含まれていることを確認し、組織のリモート構成を有効にすることができるようにします。

2. RBAC 権限に [`api_keys_write`][3] が含まれていることを確認し、リモート構成機能で新しい API キーを作成したり、既存の API キーに機能を追加できるようにします。もし、権限を持っていない場合は、組織の Datadog 管理者に連絡して、権限を更新してください。この機能を持つキーを使用して、Agent がリモート構成を使用するための認証と認可を行うことができます。

3. [リモート構成][4]ページで、リモート構成を有効にします。これにより、組織全体の Datadog リソースが Datadog から構成を受信できるようになります。

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

6. 変更を有効にするために、Agent を再起動します。 

{{% /tab %}}
{{% tab "環境変数" %}}
Datadog Agent マニフェストに以下を追加し、リモート構成機能が有効になっている API キーを指定します。
```yaml
DD_API_KEY=xxx
DD_REMOTE_CONFIGURATION_ENABLED=true
```
{{% /tab %}}
{{< /tabs >}}

これらの手順を実行すると、Agent は Datadog に構成をリクエストし、リモート構成を使用する機能が有効になります。
- [CWS デフォルト Agent ルール][5]は、リリースされると自動的に更新されます。
- [APM Agent レベルのサンプリングレート][6]が適用されます。
- [ダイナミックインスツルメンテーション][7]が有効になります。
- [ASM 1 クリック有効化、IP ブロック、攻撃パターン更新][8]が有効になります。


[1]: /ja/getting_started/site/
[2]: /ja/help/
[3]: /ja/account_management/rbac/permissions#api-and-application-keys
[4]: https://app.datadoghq.com/organization-settings/remote-config
[5]: /ja/security/default_rules/#cat-workload-security
[6]: /ja/tracing/trace_pipeline/ingestion_controls/#managing-ingestion-for-all-services-at-the-agent-level
[7]: /ja/dynamic_instrumentation/?tab=configurationyaml#enable-remote-configuration
[8]: /ja/security/application_security/how-appsec-works/#built-in-protection
[9]: /ja/account_management/rbac/permissions#access-management
[10]: /ja/observability_pipelines/#observability-pipelines-worker


{{< /site-region >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}