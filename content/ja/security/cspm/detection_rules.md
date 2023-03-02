---
aliases:
- /ja/security_platform/cspm/configuration_rules
- /ja/security/cspm/configuration_rules
further_reading:
- link: /security/cspm/getting_started
  tag: ドキュメント
  text: CSPM の概要
- link: /security/cspm/custom_rules/
  tag: ドキュメント
  text: カスタムルール
- link: /security/cspm/frameworks_and_benchmarks/
  tag: ドキュメント
  text: ファインディングレポート
kind: documentation
title: CSPM 検出ルールの管理
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
Cloud Security Posture Management は、現在このサイトでは利用できません。
</div>
{{< /site-region >}}

Cloud Security Posture Management (CSPM) の[すぐに使える検出ルール][1]は、クラウドリソースの構成を評価し、潜在的な誤構成を特定するので、すぐに修正するための手順を踏むことができます。

この検出ルールは、Datadog Security のすべての検出ルールと同じ[条件ロジック][2]に従っています。CSPM の場合、各ルールは 1 つ以上の[コンプライアンスフレームワークまたは業界ベンチマーク][4]内のコントロールにマッピングされます。

CSPM では、以下のルールタイプを使用して、クラウドインフラストラクチャーの構成を検証します。

- [**クラウド構成**][1]: これらの検出ルールは、クラウド環境内のリソースの構成を分析します。たとえば、[Cloudfront distribution is encrypted][3] ルールは、AWS Cloudfront ディストリビューションの構成が暗号化されているかどうかを評価します。
- [**インフラストラクチャー構成**][5]: これらの検出ルールは、Docker と Kubernetes の CIS コンプライアンスベンチマークで定義されているように、コンテナと Kubernetes クラスターを分析して構成上の問題を見つけます。例えば、[/etc/default/docker file permissions are set to 644 or more restrictively][6] ルールは、ホスト上で実行されている Docker ファイルの権限を評価するものです。

## 各ルールによる環境のスキャン方法をカスタマイズする

クラウド構成クエリの直接のカスタマイズは現時点ではサポートされていませんが、各ルールによって環境がスキャンされる方法をカスタマイズすることは可能です。

[Rules][13] ページでルールを選択し、その詳細ページを開きます。**Exclude benign activity with suppression queries** (抑制クエリによる良性アクティビティの除外) の下で、ルールが環境をスキャンする方法のフィルタリングロジックを設定します。

たとえば、**This rule will not generate a finding if there is a match with any of the following suppression queries** (このルールは、以下の抑制クエリのいずれかと一致する場合、発見を生成しません) 機能を使用して、`env:staging` タグの付いたリソースを除外することができます。また、**Only generate a finding if there is a match with any of the following queries** (以下のクエリのいずれかと一致する場合のみ、発見を生成します) 機能を使用して、特定のルールの範囲を `compliance:pci` のタグの付いたリソースに制限することができます。

ルールをカスタマイズしたら、ページ下部の **Update Rule** をクリックして、変更を適用します。

{{< img src="security/cspm/frameworks_and_benchmarks/never-trigger-a-finding-2.png" alt="ルールの範囲に含めるタグと除外するタグを選択することにより、環境のスキャン方法をカスタマイズする" >}}

## 検出ルールの通知先の設定

通知対象を追加することで、環境に新たな誤構成が検出された際にリアルタイムで通知を送信することができます。利用可能な通知オプションは次のとおりです。

- [Slack][14]
- [Jira][15]
- [PagerDuty][16]
- [ServiceNow][17]
- [Microsoft Teams][18]
- [Webhooks][19]
- メール

[Rules][13] ページでルールを選択すると、その詳細ページが表示されます。**Set severity and notifications** (重大度と通知の設定) セクションで、各ルールのケースについて 0 個以上の通知先を構成します。設定されている重大度は編集できません。検出ルールの通知設定の詳細については、[通知][7]を参照してください。

また、重大度、ルールタイプ、ルールタグ、シグナル属性、シグナルタグなどのパラメーターに基づいて、複数の検出ルールにまたがる[通知ルール][21]を作成することもできます。これにより、個々の検出ルールの通知設定を手動で編集する手間を省くことができます。

**注**: 通知を有効にしたルールで誤構成が検出された場合、失敗した検出が[シグナルエクスプローラー][22]にも表示されます。

{{< img src="security/cspm/frameworks_and_benchmarks/notification-2.png" alt="ルール詳細ページの Set severity and notifications セクション" >}}

## カスタムルールの作成

カスタムルールを作成することで、環境に適用されているルールを拡張し、セキュリティポスチャを評価することができます。また、デフォルトの検出ルールを複製して、そのコピーを編集することもできます (GCP のみ)。詳細については、[カスタムルール][20]を参照してください。

<div class="alert alert-warning">カスタム CSPM ルールの作成と使用はベータ機能であり、Amazon Web Services (AWS)、Microsoft Azure、Google Cloud Platform (GCP) の一部のクラウドリソースで利用可能です。</div>



## ルール非推奨

すべての検出ルールの定期的な監査を行い、忠実なシグナル品質を維持します。非推奨のルールは、改良されたルールに置き換えられます。

ルール非推奨のプロセスは以下の通りです。

1. ルールに非推奨の日付が書かれた警告が表示されています。UI では、警告が以下に表示されます。
    - シグナルサイドパネルの **Rule Details > Playbook** セクション
    - Findings サイドパネル
    - その特定のルールの[ルールエディター][23]
2. ルールが非推奨になると、ルールが削除されるまでに 15 か月の期間があります。これは、シグナルの保持期間が 15 か月であるためです。この間、UI で[ルールの複製][23]を行うと、ルールを再び有効にすることができます。
3. 一度削除されたルールは、複製して再度有効にすることはできません。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/default_rules/#cat-posture-management-cloud
[2]: /ja/security/detection_rules/
[3]: https://docs.datadoghq.com/ja/security_monitoring/default_rules/aws-cloudfront-distributions-encrypted/
[4]: /ja/security/cspm/frameworks_and_benchmarks
[5]: /ja/security/default_rules/#cat-posture-management-infra
[6]: https://docs.datadoghq.com/ja/security_monitoring/default_rules/cis-docker-1.2.0-3.22/
[7]: /ja/security/notifications/
[13]: https://app.datadoghq.com/security/configuration/rules?product=cspm
[14]: /ja/integrations/slack/
[15]: /ja/integrations/jira/
[16]: /ja/integrations/pagerduty
[17]: /ja/integrations/servicenow/
[18]: /ja/integrations/microsoft_teams/
[19]: /ja/integrations/webhooks/
[20]: /ja/security/cspm/custom_rules/
[21]: /ja/security/notifications/rules/
[22]: /ja/security/cspm/signals_explorer/
[23]: /ja/security/detection_rules/#rule-and-generated-signal-options
