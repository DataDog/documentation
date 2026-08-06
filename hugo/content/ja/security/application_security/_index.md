---
algolia:
  tags:
  - asm
  - App and API Protection
aliases:
- /ja/security_platform/application_security
- /ja/security/application_security/enabling/single_step
- /ja/security/application_security/enabling/compatibility
- /ja/security/application_security/enabling
- /ja/security/application_security/getting_started
- /ja/security/application_security/threats
- /ja/security/application_security/setup/standalone
description: 分散型トレースにより提供された実行コンテキストを利用して、実稼働システムをターゲットとした脅威を監視します。
further_reading:
- link: https://www.datadoghq.com/blog/secure-api-with-datadog
  tag: ブログ
  text: 発見から防御まで：Datadog App & API Protection による API の保護
- link: /security/application_security/how-it-works/
  tag: ドキュメント
  text: App and API Protection の仕組み
- link: https://www.datadoghq.com/product/security-platform/application-security-monitoring/
  tag: 製品ページ
  text: Datadog App and API Protection
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: ブログ
  text: APM セキュリティビューでリスク、脆弱性、攻撃を可視化する
- link: https://www.datadoghq.com/blog/aws-waf-datadog/
  tag: ブログ
  text: Datadog を使用した AWS WAF のアクティビティの監視
- link: https://www.datadoghq.com/blog/security-inbox-prioritization/
  tag: ブログ
  text: Datadog Security Inbox によるセキュリティリスクの優先順位付け方法
- link: https://www.datadoghq.com/blog/understanding-your-waf/
  tag: ブログ
  text: 'WAF を理解する: Web アプリケーションセキュリティにある一般的なギャップに対処する方法'
- link: https://www.datadoghq.com/blog/mitigate-account-takeovers/
  tag: ブログ
  text: Datadog App and API Protection でアカウント乗っ取りを軽減
- link: https://learn.datadoghq.com/courses/app-protection-block-attacks
  tag: ラーニングセンター
  text: App & API Protection でアプリケーション攻撃をブロックする
title: App and API Protection
---
{{% site-region region="us,us3,us5,eu,ap1,ap2,uk1" %}}

<div class="alert alert-info">
AI Guard はプレビュー版です。AI アプリおよびエージェント向けに、リアルタイムなセキュリティガードレールを提供します。AI Guard は、プロンプトインジェクション、ジェイルブレイク、ツールの悪用、機密データの流出攻撃から、AI アプリとエージェントをリアルタイムで保護するのに役立ちます。アクセスをリクエストするには、この<a href="https://www.datadoghq.com/product-preview/ai-security/">フォーム</a>に記入してください。
</div>

{{% /site-region %}}

{{< img src="/security/application_security/app-sec-landing-page.png" alt="攻撃フローおよびフレームグラフが表示される Datadog のセキュリティシグナルパネル" width="75%">}}

**App & API Protection (AAP)** は、統合された可視性とセキュリティをアプリケーションと API に提供し、最新のワークロード全体で脅威を検出、調査、防止するのに役立ちます。

公開 API、内部サービス、ユーザー向けアプリケーションのいずれを防御する場合でも、AAP はリアルタイムの OOTB 脅威検出、ポスチャ評価、アプリ内保護をチームに提供します。

<div class="alert alert-info">以前は Application Security Monitoring (ASM) と呼ばれていた AAP は、ランタイムの脅威検出を超えて、API の検出、ポスチャ管理、保護機能を含むようになりました。</div>

## 主な機能 {#key-capabilities}

### API の検出とポスチャ管理 {#api-discovery-and-posture-management}

* サービスによって公開されているすべての API を自動的に検出します。 
* 保護されていない、文書化されていない、または過度に権限が付与されたエンドポイントを特定します。 
* 特定のエンドポイント、設定ミス、観測された動作に関連付けられた、詳細でコンテキストに沿った調査結果を取得します。 
* セキュリティのベストプラクティスやコンプライアンスフレームワーク (OWASP API Top 10 など) に基づいたポスチャルールに対して、API 構成を評価します。
* [エンドポイントスキャン][17] を使用して、エンドポイントの到達可能性と認証をアクティブに検証します。

### ランタイムの脅威の検出と保護 {#runtime-threat-detection-and-protection}

* インジェクション攻撃、アカウント乗っ取りの試み、アプリケーションの悪用などの脅威をリアルタイムで検出します。 
* 複数のシグナルによる攻撃パターンを関連付け、実用的なインサイトに変換します。 
* IP、ユーザーエージェント、ヘッダーなどの属性を使用して、アプリ内 WAF ルールで悪意のあるトラフィックをブロックします。

## ユースケース {#use-cases}

* 本番環境の API において顧客データを保護する  
* クレデンシャルスタッフィング攻撃と ATO 攻撃を検知し、ブロックする  
* 複数のチームや環境全体で API ポスチャのコンプライアンスを維持する  
* 関連付けられたトレース、ログ、セキュリティデータを使用してインシデントを調査する

## Datadog での AAP の実装 {#aap-implementation-in-datadog}

App and API Protection がどのように構成され、トレースデータをどのように使用してセキュリティ問題を特定するのかに興味がある方は、[App and API Protection の仕組み][3] をご覧ください。

## 環境を構成する {#configure-your-environment}

提供されている [すぐに使えるルール][4] により、AAP は手動構成なしで脅威を検知します。物理ホストまたは仮想ホストで Datadog [APM][1] がすでに構成されている場合、[セットアップ][16] に必要なのは環境変数を 1 つ設定することだけです。

AAP を使用して脅威を検知および保護するための環境構成を開始するには、各製品の有効化に関するドキュメントに従ってください。AAP の構成が完了したら、[セキュリティシグナルエクスプローラー][6] でセキュリティシグナルの調査と対応を開始できます。

## セキュリティシグナルの調査と対応 {#investigate-and-remediate-security-signals}

[セキュリティシグナルエクスプローラー][6] でセキュリティシグナルをクリックすると、何が発生したか、および攻撃を緩和するための推奨手順を確認できます。同じパネルで、関連付けられた攻撃フローとリクエスト情報を含むトレースを表示し、詳細なコンテキストを取得します。

## エクスプロイト防止とアプリ内 WAF の比較 {#exploit-prevention-vs-in-app-waf}

このセクションでは、エクスプロイト防止の概要と、アプリ内 Web アプリケーションファイアウォール (WAF) ルールとの違いについて説明します。

Datadog AAP には、アプリケーションをエクスプロイトから保護するための [エクスプロイト防止][14] 機能と [アプリ内 WAF][15] 機能が含まれています。エクスプロイト防止は、アプリ内 WAF の拡張機能です。エクスプロイト防止は、アプリ内 WAF を第一の防御線として活用し、WAF で防げなかった攻撃をブロックします。

エクスプロイト防止は、ランタイムアプリケーションセルフプロテクション (RASP) テクノロジーを活用して、アプリケーションのリクエストが脆弱なコードパスと対話しているかどうかを判断し、以下の特定の脆弱性タイプから保護します。

- SQL インジェクション (SQLi)
- サーバーサイドリクエストフォージェリー (SSRF)
- ローカルファイルインクルージョン (LFI)
- コマンドインジェクション

ライブラリの互換性については、[エクスプロイト防止][13] を参照してください。

リクエスト内の悪意のあるパターンを検出することに加え、エクスプロイト防止はアプリケーションによって実行されたアクション (実行された SQL クエリ、アクセスされたファイルなど) を追跡する点でアプリ内 WAF とは異なります。エクスプロイト防止は、ユーザー入力が SQL クエリを変更したか、またはファイルを不当に制限したかを判断し、それをブロックすることができます。

例えば、SQL インジェクション攻撃において、攻撃者の目的は SQL クエリを制御し、その意味を変更することです。エクスプロイト防止は実行前に SQL クエリを解析し、クエリ内にユーザーパラメーターが存在するかどうかをチェックします。存在する場合、エクスプロイト防止は SQL パーサーがそのパラメーターを複数の SQL トークンとして解釈したかどうか (SQL クエリの意味を変更したかどうか) をチェックします。その場合、エクスプロイト防止はクエリをインジェクションとしてフラグを付けます。

## AAP を無効化 {#disable-aap}

AAP またはその機能を無効化する方法については、以下を参照してください。

- [AAP の無効化][10]

## 次のステップ {#next-steps}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/
[2]: /ja/agent/
[3]: /ja/security/application_security/how-it-works/
[4]: /ja/security/default_rules/?category=cat-application-security
[6]: https://app.datadoghq.com/security
[7]: https://dashcon.io/appsec
[8]: /ja/security/code_security/software_composition_analysis/
[9]: /ja/security/code_security/
[10]: /ja/security/application_security/troubleshooting/#disabling-aap
[11]: /ja/security/application_security/troubleshooting/#disabling-software-composition-analysis
[12]: /ja/security/application_security/troubleshooting/#disabling-code-security
[13]: /ja/security/application_security/exploit-prevention/#library-compatibility
[14]: /ja/security/application_security/exploit-prevention/
[15]: /ja/security/application_security/waf-integration/
[16]: /ja/security/application_security/setup/
[17]: /ja/security/application_security/api_posture/endpoint_scanning/