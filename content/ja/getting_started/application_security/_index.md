---
further_reading:
- link: /security/application_security/terms
  tag: Documentation
  text: Application Security の用語と概念
- link: /security/application_security/how-appsec-works
  tag: Documentation
  text: Application Security Management の仕組み
- link: /security/application_security/getting_started
  tag: Documentation
  text: ASM のセットアップ
- link: https://securitylabs.datadoghq.com/
  tag: Security Labs
  text: Datadog のセキュリティリサーチ、レポート、ヒント、ビデオ
kind: documentation
title: Application Security Management を始める
---

## 概要

Datadog Application Security Management (ASM) は、コードレベルの脆弱性を悪用することを目的としたアプリケーションレベルの攻撃や、システムを狙う悪質な行為に対する観測可能性を提供します。ASM は、Web アプリケーションや API 上の脅威への迅速な対応と脆弱性の修正を支援します。

このガイドでは、ASM の導入と運用のためのベストプラクティスを説明します。

## フェーズ 1: 公開されているサービスで ASM を有効化する

Datadog ASM を使い始めてからの 3 日間:

1. **最も露出度の高いサービスを特定します。**[Service Catalog Security ビュー][1]を開き、`Suspicious Requests` の列でデータをソートします。

   {{< img src="getting_started/appsec/gs-appsec-most-exposed.png" alt="Suspicious requests 列でソートされた Service Catalog Security ビュー。たとえば、Web ストアサービスでは、検出された数千の不審なリクエストが表示されます。" style="width:100%;" >}}

   このデータは、APM トレースから (Datadog ライブラリを通じて) 収集されます。これにより、最も疑わしいトラフィックにさらされているサービスを可視化することができます。

2. **最も露出度の高いサービスの ASM を有効にします。**ASM Status 列の `Enable ASM` をクリックして、手順を確認するか、サービスの所有者と共有します。

   ASM は APM と同じライブラリに依存しているため、すでにトレーシングライブラリを送信しているサービスで ASM を有効にするには、たった 1 つの環境変数を構成するだけでよいのです。詳しくは、[ASM セットアップドキュメント][2]を参照してください。

3. **最初の疑わしいリクエストを探索します。**[Security --&gt; Application Security][7]** にアクセスし、ASM にリストされた疑わしいリクエストを確認します。

   - クライアント IP がうまく解決されない場合 (内部 IP やプロキシ IP を表示している場合など)、[クライアント IP ヘッダーを構成します][3]。

   - **[Traces][8]** ページを開き、疑わしいリクエストのトレースの 1 つをクリックします。攻撃フロー図は、攻撃によってヒットしたすべてのサービスを理解するのに役立ちます。このリクエストが疑わしいと判断された理由については、セキュリティセクションにスクロールダウンしてください。詳細は、[Application Security Management の仕組み][4]を参照してください。

   すべての疑わしいリクエストを個別に調べる必要はありません。ASM はあなたの注意が必要なときに_シグナル_を生成します。これはフェーズ 2 で学ぶことができます。

4. これで、ASM がサービス上の疑わしいリクエストをリアルタイムで検出するように設定されましたので、**数日間製品を稼動させてみてください**。

<div class="alert alert-info">サービスが最近のバージョンのトレーシングライブラリを使用している場合、ASM はサービスが依存関係にあるアップストリームライブラリの<a href="/security/application_security/risk_management">セキュリティ脆弱性を直ちに検出</a>し、APM はその情報をセキュリティビューでプレビューします。オプションとして、<strong>ASM の統合<a href="https://app.datadoghq.com/security/appsec/vm">脆弱性ビュー</a></strong> (ベータ版) を使用して、脆弱性のトリアージと優先順位付けにどのように役立つかを確認することもできます。</div>

**注**: ASM を使用すると、**ユーザーのアクティビティを追跡**し、疑わしいリクエストを行う認証済みユーザーを特定することもできます。[認証済みユーザー追跡を設定][5]することは、ASM を使用する上で必須ではありませんが、認証済み攻撃や攻撃者を可視化するのに役立ちます。

## フェーズ 2: 最初のセキュリティシグナルと脆弱性を確認する

数日間使用した後、通常、最初のセキュリティシグナルを受け取ることができます。最初のセキュリティシグナルを受信していない場合、ターミナルから次のスクリプトを実行することで、攻撃をシミュレートし、シグナルをトリガーすることができます。

{{< code-block lang="sh" >}}
for ((i=1;i<=200;i++)); do
# 既存サービスのルートをターゲットにする
curl https://your-application-url/<EXISTING ROUTE> -A
'dd-test-scanner-log';
# 既存サービス外のルートをターゲットにする
curl https://your-application-url/<NON-EXISTING ROUTE> -A
'dd-test-scanner-log';
done{{< /code-block >}}

数日間にわたって

1. **[Security --> Application Security --> Signals][6] で、セキュリティシグナルを確認します。**セキュリティシグナルは、注意が必要なときに ASM によって生成されます。シグナルの重大度は、どの程度迅速に対応する必要があるかについての洞察を提供します。

   `INFO` と `LOW` シグナルは週に 1 回、`MEDIUM` と `HIGH` シグナルは 1 日に 1 回、`CRITICAL` シグナルはすぐに見直すことを目標にしましょう。

2. **シグナルをクリックすると、その詳細が表示されます。**シグナルの詳細には、何が起こったか、攻撃者は誰か、次に何をすべきかが示されます。Traces タブでは、シグナルを生成したトレースを調査することができます。

3. **調査後のシグナルをアーカイブします。** シグナルが誤検出の場合、[パスリストエントリー][9]を設定し、ノイズとなるシグナルパターンを排除します。

4. **[ウィークリーダイジェストにサブスクライブする][10]**と、検出されたセキュリティアクティビティに関する最新情報を毎週受け取ることができます。

5. **[通知ルール][12]を設定**し、攻撃が注意を必要とする場合、メール、Slack、またはその他のコミュニケーションインテグレーションを介してリアルタイムでアラートすることができます。Datadog は、`Medium` 以上の重大度シグナルに対して[通知ルールの設定][11]を推奨しています。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?env=prod&hostGroup=%2A&lens=Security
[2]: /ja/security/application_security/getting_started/
[3]: /ja/security/application_security/threats/setup_and_configure/#configuring-a-client-ip-header
[4]: /ja/security/application_security/how-appsec-works/
[5]: /ja/security/application_security/threats/add-user-info/
[6]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Application%20Security%22&column=time&order=desc&product=appsec&view=signal&viz=stream&start=1674824351640&end=1675429151640&paused=false
[7]: https://app.datadoghq.com/security/appsec
[8]: https://app.datadoghq.com/security/appsec/traces
[9]: /ja/security/application_security/threats/setup_and_configure/#exclude-specific-parameters-from-triggering-detections
[10]: https://app.datadoghq.com/security/appsec/reports-configuration
[11]: https://app.datadoghq.com/security/configuration/notification-rules
[12]: /ja/security/notifications/rules/