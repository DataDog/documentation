---
aliases:
- /ja/security/application_security/waf-integration/
- /ja/security/application_security/threats/waf-integration
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/aws-waf-datadog/
  tag: ブログ
  text: Datadog を使用した AWS WAF のアクティビティの監視
title: WAF Integrations
---
Web アプリケーションと API を保護するには、アプリ内監視と境界防御を組み合わせた多層的なアプローチが必要です。このような補完的な戦略により、AWS WAF (Web Application Firewall) を最前線の防御として使用し、その後に WAF をすり抜けた攻撃をブロックするためのエクスプロイト防止を配置した、*多層防御*の App and API Protection アプローチが実現します。

エクスプロイト防止とアプリ内 WAF の違いの詳細については、「[エクスプロイト防止とアプリ内 WAF の比較][5]」を参照してください。

### アプリ内監視: 分散型トレーシングによる詳細な可視性 {#in-app-monitoring-deep-visibility-with-distributed-tracing}

アプリケーションレベルでは、Datadog AAP は分散型トレーシングを利用してマイクロサービスをリアルタイムで監視します。AAP アプローチは、リクエストがさまざまなサービスを通過する際の動作について、大量のコンテキストを含む詳細なインサイトを提供します。これらのインサイトは、次のような高度な脅威を検出します。

- SQLi (SQL インジェクション) および LFI (ローカルファイルインクルージョン) の試行。
- ビジネスルールのバイパスやエッジケースの悪用など、アプリケーションロジックの悪用。
- 公開されたエンドポイントの悪用。

### 境界防御: AWS WAF によるエッジでの脅威のブロック {#perimeter-defense-blocking-threats-at-the-edge-with-aws-waf}

AWS WAF (Web Application Firewall) は境界において、最前線の防御として機能し、トラフィックがアプリケーションに到達する前にフィルタリングします。これらのソリューションは、以下をブロックするために不可欠です。

- 大規模なボットネット攻撃や DDoS (分散型サービス拒否) 攻撃。
- クレデンシャルスタッフィングやスクレイピングを試みる悪意のあるボット。

### コンテキストに応じた適応型保護の重要性 {#the-importance-of-contextual-adaptive-protection}

脅威の性質に応じて、アプリ内または境界のいずれかの適切なレイヤーで保護制御を適用する必要があります。たとえば、以下のとおりです。

- 境界保護のユースケース: ネットワークエッジで効率的に軽減できる、悪意のある IP やボリューム型攻撃のブロック。
- アプリ内保護のユースケース: 脆弱性の悪用、ビジネスロジックの悪用、API 使用時の軽微な異常の検出とブロック。

この多層的なアプローチにより、正当なトラフィックを保護するために必要な精度を犠牲にすることなく、脅威を可能な限り早期に無力化できます。


## AWS WAF と AAP のインテグレーション {#aws-waf-integration-with-aap}

詳細な設定手順については、「[AWS WAF で App and API Protection を有効にする][6]」を参照してください。

この [インテグレーション][1] では、次の 2 つの主なユースケースがサポートされます。

1. Datadog AAP で AWS WAF のアクションを可視化します。たとえば、以下のとおりです。
   1. AWS WAF によって許可されたリクエストの合計数とブロックされたリクエストの合計数などのメトリクス。
   2. ドリルダウンして個々の AWS WAF ログを表示します ([AWS WAF ログを Datadog に取り込む][2] 必要があります)。
   3. AWS WAF によるリクエストの検査方法: 適用されたルールと下された決定 (許可、ブロック、またはカウント)。

   <div class="alert alert-info">AAP は AWS WAF ログを AAP トレースに変換し、アプリケーションアクティビティ (トレース) と AWS WAF アクティビティ (AAP トレースに変換されたログ) を AAP Trace Explorer で表示できるようにします。</div>

   <!-- {{< img src="security/application_security/threats/aws-waf-int-asm.png" alt="Datadog UI における AWS WAF インテグレーションの詳細" style="width:100%;" >}} -->

2. AWS WAF を利用して攻撃者をブロックします。
   1. AWS WAF IP セットを Datadog AAP に接続します。既存のセットを使用することも、新しく作成することもできます。Datadog は、ブロックされた IP アドレスをこの IP セットに追加します。AAP の [シグナル][3] または [トレース][4] エクスプローラーから攻撃者をブロックできます。

   <!-- {{< img src="/security/application_security/threats/aws-waf-blocked-ips.png" alt="AAP 拒否リストによってブロックされた IP" style="width:100%;" >}} -->

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec/protection?use-case=amazon_waf
[2]: /ja/integrations/amazon_waf/#log-collection
[3]: https://app.datadoghq.com/security/appsec/signals?query=@workflow.rule.type:%22Application%20Security%22
[4]: https://app.datadoghq.com/security/appsec/traces
[5]: /ja/security/application_security/#exploit-prevention-vs-in-app-waf
[6]: /ja/security/application_security/setup/aws/waf/