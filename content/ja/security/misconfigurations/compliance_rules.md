---
aliases:
- /ja/security_platform/cspm/configuration_rules
- /ja/security/cspm/configuration_rules
- /ja/security/cspm/detection_rules
- /ja/security/cspm/compliance_rules
further_reading:
- link: /security/misconfigurations/setup
  tag: ドキュメント
  text: CSM Misconfigurations の概要
- link: /security/misconfigurations/custom_rules/
  tag: ドキュメント
  text: カスタムルール
- link: /security/misconfigurations/frameworks_and_benchmarks/
  tag: ドキュメント
  text: Misconfigurations レポート
kind: documentation
title: CSM Misconfigurations コンプライアンスルールの管理
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では Cloud Security Management Misconfigurations はサポートされていません。</div>
{{< /site-region >}}

Cloud Security Management Misconfigurations (CSM Misconfigurations) の[すぐに使えるコンプライアンスルール][1]は、クラウドリソースの構成を評価し、潜在的な誤構成を特定するので、すぐに是正のための措置を講じることができます。

コンプライアンスルールは、Datadog Security のすべてのコンプライアンスルールと同じ[条件ロジック][2]に従っています。CSM Misconfigurations の場合、各ルールは 1 つ以上の[コンプライアンスフレームワークまたは業界ベンチマーク][4]内のコントロールにマッピングされます。

CSM Misconfigurations は以下のルールタイプを使用して、お客様のクラウドインフラストラクチャーの構成を検証しています。

- [**クラウド構成**][1]: これらのコンプライアンスルールは、クラウド環境内のリソースの構成を分析します。例えば、[Cloudfront distribution is encrypted][3] ルールは、Amazon CloudFront ディストリビューションの構成が暗号化されているかどうかを評価します。
- [**インフラストラクチャー構成**][5]: これらのコンプライアンスルールはコンテナと Kubernetes クラスターを分析し、Docker および Kubernetes の CIS コンプライアンス指標定義に従って構成の問題を発見します。例えば、[/etc/default/docker file permissions are set to 644 or more restrictively][6] (/etc/default/docker ファイルの権限は 644 またはそれ以上に制限的に設定されています) ルールは、ホストで実行中の Docker ファイルのアクセス許可を評価します。

## デフォルトのコンプライアンスルールについて

デフォルトのコンプライアンスルールをクラウドプロバイダーごとにフィルタリングする方法

1. **Security** > **Cloud Security Management** > **Compliance** > **Compliance Rules** に移動します。
2. **Tag** ファセットから次のいずれかの値を選択します。
    - **AWS**: cloud_provider:aws
    - **Azure**: cloud_provider:azure
    - **Google Cloud**: cloud_provider:gcp
    - **Docker**: framework:cis-docker
    - **Kubernetes**: framework:cis-kubernetes

## 各ルールにより環境をスキャンする方法をカスタマイズします

クラウド構成クエリを直接カスタマイズすることは現時点ではサポートされていませんが、各ルールによって環境がスキャンされる方法をカスタマイズすることは可能です。

[Rules][13] ページでルールを選択すると、その詳細ページが表示されます。**Exclude benign activity with suppression queries** (抑制クエリで良性のアクティビティを除外する) で、ルールが環境をスキャンする方法に関するフィルターロジックを設定します。

例えば、**This rule will not generate a misconfiguration if there is a match with any of the following suppression queries** (このルールは、以下の抑制クエリのいずれかと一致する場合、誤構成を生成しません) 関数を使用して `env:staging` のタグが付けられたリソースを除外することができます。また、**Only generate a misconfiguration if there is a match with any of the following queries** (以下のクエリのいずれかと一致する場合のみ、誤構成を生成します) 関数を使用して、特定のルールのスコープを `compliance:pci` のタグが付いたリソースに制限することができます。

ルールをカスタマイズしたら、ページ下部の **Update Rule** をクリックして変更を適用します。

{{< img src="security/cspm/frameworks_and_benchmarks/never-trigger-misconfiguration.png" alt="ルールの範囲に含めるタグと除外するタグを選択することで、環境のスキャン方法をカスタマイズします" >}}

## コンプライアンスルールの通知先を設定する

通知対象を追加することで、環境に新たな誤構成が検出されたときに、リアルタイムで通知を送信することができます。利用可能な通知オプションは次のとおりです。

- [Slack][14]
- [Jira][15]
- [PagerDuty][16]
- [ServiceNow][17]
- [Microsoft Teams][18]
- [Webhooks][19]
- メール

[Rules][13] ページでルールを選択すると、その詳細ページが表示されます。**Set severity and notifications** (重大度と通知の設定) セクションで、各ルールケースに対して 0 個以上の通知先を構成します。あらかじめ設定されている重大度を編集することはできません。コンプライアンスルールの通知の構成については、[通知][7]を参照してください。

または、重大度、ルールタイプ、ルールタグ、シグナル属性、シグナルタグなどのパラメーターに基づいて、複数のコンプライアンスルールにわたる[通知ルール][21]を作成します。これにより、個々のコンプライアンスルールの通知プリファレンスを手動で編集する必要がなくなります。

**注**: 通知が有効なルールで誤構成が検出された場合、失敗した誤構成が[シグナルエクスプローラー][22]にも表示されます。

{{< img src="security/cspm/frameworks_and_benchmarks/notification-2.png" alt="ルール詳細ページの Set severity and notifications セクション" >}}

## カスタムルールの作成

カスタムルールを作成して、環境に適用されているルールを拡張し、セキュリティ態勢を評価することができます。また、デフォルトの検出ルールを複製して、そのコピーを編集することもできます (Google Cloud のみ)。詳しくは、[カスタムルール][20]を参照してください。

## ルール非推奨

すべてのコンプライアンスルールの定期的な監査を行い、忠実なシグナル品質を維持します。非推奨のルールは、改良されたルールに置き換えられます。

ルール非推奨のプロセスは以下の通りです。

1. ルールに非推奨の日付が書かれた警告が表示されています。UI では、警告が以下に表示されます。
    - シグナルサイドパネルの **Rule Details > Playbook** セクション
    - Misconfigurations サイドパネル
    - その特定のルールの[ルールエディター][23]
2. ルールが非推奨になると、ルールが削除されるまでに 15 か月の期間があります。これは、シグナルの保持期間が 15 か月であるためです。この間、UI で[ルールの複製][23]を行うと、ルールを再び有効にすることができます。
3. 一度削除されたルールは、複製して再度有効にすることはできません。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/default_rules/#cat-csm-misconfigurations-cloud
[2]: /ja/security/detection_rules/
[3]: https://docs.datadoghq.com/ja/security_monitoring/default_rules/aws-cloudfront-distributions-encrypted/
[4]: /ja/security/misconfigurations/frameworks_and_benchmarks
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
[20]: /ja/security/misconfigurations/custom_rules/
[21]: /ja/security/notifications/rules/
[22]: /ja/security/misconfigurations/signals_explorer/
[23]: /ja/security/detection_rules/#clone-a-rule