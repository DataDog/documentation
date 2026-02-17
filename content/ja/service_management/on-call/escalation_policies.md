---
further_reading:
- link: /service_management/on-call/
  tag: ドキュメント
  text: Datadog On-Call
title: エスカレーション ポリシー
---

Datadog On-Call では、エスカレーション ポリシーによって Page への対応が迅速に行われるようになります。Page は、所定の時間内に acknowledge されない場合、あらかじめ定義された手順に従って段階的にエスカレーションされます。

Datadog は、[Team を On-Call にオンボードする][1] と、デフォルトのエスカレーション ポリシーを作成します。

## 新しいエスカレーション ポリシーを作成する
{{< img src="service_management/oncall/escalation_policy_2.png" alt="サンプルのエスカレーション ポリシー。" style="width:100%;" >}}

1. [**On-Call** > **Escalation Policies**][2] に移動します。
1. [**+ New Escalation Policy**][3] を選択します。
1. エスカレーション ポリシーの **Name** を入力します。例: _Payment's Escalation Policy_。
1. このエスカレーション ポリシーを管理する **Teams** を選択します。
1. 各エスカレーション ステップについて、次を設定します:
       1. 誰に通知するかを決めます。個別のユーザー、チーム、または schedule で on-call になっている担当者を指定できます。
       1. 次の通知方法のいずれかを選択します: `Notify All`、`Round Robin`。詳細は [エスカレーション ポリシーの通知タイプ](#escalation-policy-step-notification-types) を参照してください。
       1. 受信者が Page を acknowledge できる猶予時間 (分) を指定します。期限内に acknowledge されない場合、次の段階へエスカレーションされます。
   たとえば次の設定では、Page の発生時に現在 on-call のユーザーへ通知し、John が 5 分以内に acknowledge しなかった場合は Jane Doe へエスカレーションします。
   {{< img src="service_management/oncall/escalation_policy_2_steps_v2.png" alt="schedule された on-call ユーザーへ通知し、5 分以内に acknowledge されない場合に Jane Doe へエスカレーションするよう構成されたエスカレーション ポリシー。" style="width:100%;" >}}
1. 誰も Page を acknowledge しない場合に、ステップを何回繰り返すかを設定します。
1. すべてのルールと繰り返しを実行した後に、Datadog が Page のステータスを自動的に **Resolved** に更新するかどうかを選択します。

## エスカレーション ポリシーの通知タイプ
エスカレーション ポリシーの各ステップでは、標準の `Notify All` を使用するか、`Round Robin` を選択できます。
{{< img src="service_management/oncall/escalation_policy_notification_type.png" alt="Escalation Policy 作成時の通知タイプ セレクター" style="width:100%;" >}} 

### Notify all (デフォルト)
ステップで指定したすべての通知先へ、同時に通知します。

たとえば、あるステップに「個別ユーザー 1 名」「3 名のメンバーがいるチーム」「schedule」の 3 つが含まれる場合、合計 5 名に通知されます (個別ユーザー 1 名 + チーム メンバー 3 名 + schedule の on-call ユーザー 1 名)。

### Round robin
複数の通知先 (ユーザー、schedule、チーム) に対して、ローテーション順に Page を自動的に割り当て、負荷が公平に分散されるようにします。

たとえば 50 人のサポート チームがある場合、10 人ずつの schedule を 5 つに分け、次のようなポリシーを設定すると負荷を均等に分散できます:
- Page A → Support Schedule Group 1
- Page B → Support Schedule Group 2
- Page C → Support Schedule Group 3
- Page D → Support Schedule Group 4
- Page E → Support Schedule Group 5
- Page F → Support Schedule Group 1
- Page G → Support Schedule Group 2

#### エスカレーションの動作
round robin モードでは、Page が期限内に acknowledge されなかったとしても、round robin の次の人には回りません。その代わり、ポリシー内の次のステップへエスカレーションされます。

Page を round robin 内で次の通知先へ回したい場合は、エスカレーション ポリシー内に round robin のステップを 1 つだけ置き、通知先の数以上の回数だけ繰り返すように構成してください。

## エスカレーション ポリシーのステップ通知先
エスカレーション ポリシーの各ステップでは、個別ユーザー、チーム全体、または schedule の on-call 担当者に通知できます。

### Schedule
{{< img src="service_management/oncall/escalation_policy_notify_schedule.png" alt="schedule に通知するサンプルのエスカレーション ポリシー ステップ。" style="width:100%;" >}}

エスカレーション ポリシーは、あらかじめ定義された schedule に従って on-call の担当者へ通知できます。システムが schedule を確認し、インシデント発生時点で実際に on-call になっている個人またはグループへ通知します。schedule を使用すると、次の点で有用です:

- 24 時間 365 日の体制を確保するために、異なるタイム ゾーンの on-call 対応者へアラートを振り分ける。
- 段階的なサポート体制 (シフトごとに緊急度の異なる対応レベルを扱う) を運用する。
- on-call 担当がローテーションするチームで、常に適切な担当者へ動的に通知する (いつでも正しい人が Page される)。

対象の schedule で誰も on-call になっていない場合、そのエスカレーション ステップは自然にスキップされ、遅延や中断なく次の処理へ進みます。UI にはスキップされたエスカレーションが表示されます。

{{< img src="service_management/oncall/escalation_policy_schedule_skipped.png" alt="on-call の担当者がいないためエスカレーションがスキップされたことを示すサンプルのエスカレーション ポリシー。" style="width:100%;" >}}

### ユーザー
{{< img src="service_management/oncall/escalation_policy_notify_user.png" alt="エスカレーション ポリシーでユーザーを指定するサンプル。" style="width:100%;" >}}

エスカレーション ポリシーに特定のユーザーを含めることで、Page 発生時に重要な担当者へ必ず通知できます。ユーザーへ直接 Page する代表的なユース ケースは次のとおりです:

- 専門知識が必要な高重大度インシデントで、シニア エンジニアへ通知する。
- 顧客影響のあるインシデントに備えて、プロダクト マネージャーやディレクターへ通知する。
- 主担当が不在の場合に備えて、バックアップ 対応者へアラートをルーティングする。

### Team
{{< img src="service_management/oncall/escalation_policy_notify_team.png" alt="Team 全体へ通知するサンプルのエスカレーション ポリシー。" style="width:100%;" >}}

Team 全体に Page する代表的なユース ケースは次のとおりです:

- 複数システムに影響するインシデントで、複数のメンバーが解決に関与し得る場合。
- インフラ関連のインシデントで、DevOps チームへエスカレーションする場合。
- 重大な障害に備えて、エンジニアリング チームやセキュリティ チームの関係者全員へ確実に通知する場合。

## 制限事項

- エスカレーション ステップの最大数: 10
- 1 つのエスカレーション ステップあたりの通知先 (個人、チーム、schedule) の最大数: 10
- 次のステップへエスカレーションするまでの最短時間: 1 分

[1]: /ja/service_management/on-call/teams
[2]: https://app.datadoghq.com/on-call/escalation-policies
[3]: https://app.datadoghq.com/on-call/escalation-policies/create