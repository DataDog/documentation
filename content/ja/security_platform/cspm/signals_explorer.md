---
title: シグナルエクスプローラー
kind: documentation
further_reading:
  - link: security_platform/default_rules
    tag: ドキュメント
    text: デフォルトのクラウドコンフィギュレーションルールについて
  - link: security_platform/cspm/frameworks_and_benchmarks
    tag: ドキュメント
    text: サポートされているフレームワークおよび業界のベンチマークの詳細
---
{{< site-region region="us3,gov,eu" >}}
<div class="alert alert-warning">
このサイトでは、クラウドセキュリティポスチャ管理は利用できません。
</div>
{{< /site-region >}}

## 概要

[診断結果][1]ページでクラウドの構成ミスを直接確認して修正するだけでなく、失敗した診断結果の通知を設定し、[Security Monitoring][2] と [Cloud Workload Security][3] によって生成されるリアルタイムの脅威と同じ場所で構成ミスを関連付けて優先順位を付けるようにシグナルを構成できます。

## セキュリティポスチャシグナルで無駄なアラートを削減

シグナルは、Datadog が生成して [Signals Explorer][4] に表示するセキュリティアラートです。セキュリティポスチャシグナルは、Datadog がクラウドまたはインフラストラクチャーコンフィギュレーションルールの診断結果 `evaluation:fail` を生成したときにトリガーされます。

「高」または「クリティカル」の重大度レベルを持つルールの選択は、デフォルトでシグナルを生成するために有効になっています。重大度の低いルールの場合は、*Trigger a security signal* トグルを選択してシグナルの生成を開始します。このトグルを使用して、ルールが任意の時点でシグナルを生成しないようにすることもできます。

{{< img src="security_platform/cspm/signals_explorer/Notifications.png" style="width:100%;">}}

論理グループの診断結果を利用し、無駄なアラートを削減するために、リソースが新しいクラウドアカウントのルールに失敗するたび、またはリソースがサービスで誤って構成されるたびなど、個々のリソースごとにシグナルがどのようにトリガーされるかを完全かつ柔軟に変更できます。Datadog ファセットからトリガーすることもできます。シグナル生成用に選択したグループ化ロジックに関係なく、シグナルを開くと、このルールに失敗した診断結果の最新のリストが常に表示されます。

{{< img src="security_platform/cspm/signals_explorer/Signals.png" style="width:100%;">}}

詳細については、セキュリティポスチャシグナルをクリックしてサイドパネルを開きます。

{{< img src="security_platform/cspm/signals_explorer/Sidepanel.png" style="width:100%;">}}

診断結果サイドパネルの上部には、構成ミスが発生している場所 (個々のリソース、サービス、またはクラウドアカウント全体) に関する重要な情報が表示されます。

{{< img src="security_platform/cspm/signals_explorer/Top.png" style="width:100%;">}}

以下は、構成ミスの説明と問題を修正する方法の説明を含む、ルールのメッセージです。

{{< img src="security_platform/cspm/signals_explorer/Message.png" style="width:100%;">}}

サイドパネルの下部にある次のタブには、このシグナルをトリガーしているすべての診断結果が表示されます。このリストには常にインフラストラクチャーの現在の状態が表示されます。つまり、シグナルが最初にトリガーされてから 10 個の誤って構成されたセキュリティグループのうち 3 個を修正した場合、Datadog は違反していない診断結果を表示するのではなく、7 個の失敗したセキュリティグループを表示します。

{{< img src="security_platform/cspm/signals_explorer/Findings.png" style="width:100%;">}}

**注**: リソース ID 以外のグループ化を使用している場合、シグナルは、診断結果がグループ化基準を初めて満たしたときにトリガーされ、この同じグループ内の新しいリソース (たとえば、同じサービスまたはアカウント) がこのルールに失敗するたびに再トリガーされることはありません。これは、新しいクラウドリソースがルールに失敗するたびにシグナルが再トリガーされないようにするために、意図的に行われます。クラウドリソースがルールに失敗するたびにアラートを受信する場合は、ルールの *group by* を `@resource_type` に変更します。

関連する問題のタブには、同じロジックグループ (同じリソース、サービス、またはクラウドアカウント) とリソースタイプ (セキュリティグループなど) でシグナルをトリガーした他のルールが表示されます。

{{< img src="security_platform/cspm/signals_explorer/Related.png" style="width:100%;">}}

サイドパネルの上部で、ルールを構成したり、メール、Slack、Microsoft Teams、PagerDuty、ServiceNow、Jira、Webhook などで同僚に通知を送信したりできます。

{{< img src="security_platform/cspm/signals_explorer/Final.png" style="width:100%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/security_platform/cspm/findings/
[2]: https://docs.datadoghq.com/ja/security_platform/security_monitoring/
[3]: https://docs.datadoghq.com/ja/security_platform/cloud_workload_security/
[4]: https://docs.datadoghq.com/ja/security_platform/explorer