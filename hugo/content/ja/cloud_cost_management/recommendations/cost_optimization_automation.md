---
description: Cloud Cost Recommendations に基づいて継続的に実行される自動化をセットアップすると、未使用または無駄なクラウドリソースを定期的にクリーンアップできます。
further_reading:
- link: /cloud_cost_management/
  tag: ドキュメント
  text: Cloud Cost Management
- link: /cloud_cost_management/recommendations/
  tag: ドキュメント
  text: Cloud Cost Recommendations
- link: /service_management/workflows/
  tag: ドキュメント
  text: Workflow Automation
title: コスト最適化の自動化
---
## 概要 {#overview}

コスト最適化の自動化を使用すると、[Cloud Cost Recommendations][1] に基づいて継続的に実行することができ、手動クリーンアップの必要がなくなります。**自動化**を定義し、対象とするアカウント、リージョン、およびリソースを指定すると、Datadog が推奨されたアクションを定期的に実行します。各実行は、Datadog が変更を加える前に Slack または Microsoft Teams で人間の承認を必要とするようにできるため、チームはすべての変更を管理できます。

各自動化は単一の推奨タイプを対象とし、以下を含みます。

- スケジュール (毎週、隔週、30 日ごと、または 90 日ごと)
- スコープ (AWS アカウント、リージョン、タグ、および各実行あたりの最大リソース数)
- 推奨タイプに特有のセーフガード (例えば、削除前のスナップショット)
- Slack または Microsoft Teams を通じてルーティングされるオプションの人間による承認ステップ

自動化によって実行された推奨は自動的に {{< ui >}}Completed{{< /ui >}} になり、[Cloud Cost Recommendations][1]ページで実現された節約に貢献します。

コスト最適化の自動化は、[推奨アクションの実行][2]で説明されている 1 クリックの Workflow Automation アクションとは異なります。1 クリックアクションは、推奨サイドパネルからオンデマンドで単一の変更を実行します。自動化は定期的に実行され、スコープ内のすべての一致するリソースに作用します。

**注意**: コスト最適化の自動化は Datadog ワークフローを使用し、追加のコストが発生します。詳細な価格情報については、[Workflow Automation の価格ページ][3]を参照してください。

## サポートされている推奨タイプ {#supported-recommendation-types}

コスト最適化自動化は、以下の AWS 推奨タイプをサポートしています。

| 推奨タイプ | 組み込みのセーフガード |
|---------------------|---------------------|
| 接続されていない EBS ボリュームを終了する | 各ボリュームが削除される前に EBS スナップショットが作成されます。|
| S3 標準オブジェクトを Amazon S3 Intelligent-Tiering に移行します。| 元に戻すことができます。ライフサイクル設定はいつでも削除できます。|
| 使用されていない RDS インスタンスを終了します。| 各インスタンスを終了する前に、最終 RDS スナップショットが作成されます。|
| 余分なオンデマンドバックアップ (DynamoDB) を削除します。| すべての実行で最新の 2 つのバックアップが保持されます。|
| CloudWatch ログの保持ポリシーを設定します。| 元に戻すことができます。保持期間はいつでも調整または削除できます。|
| 古い EBS スナップショットを削除します。| AMI によって参照されているスナップショットはスキップされます。|

## 前提条件 {#prerequisites}

- [Cloud Cost Recommendation][4] が設定され、積極的に推奨事項を生成している AWS アカウント。
- 自動化を作成または編集するための**Cloud Cost Management - Cloud Cost Management Write** 権限。
- 自動化が実行される各 AWS アカウントへの [Workflow Automation コネクション][5]。Datadog はこのコネクションを使用して、推奨されるアクションに必要な書き込み権限を持つ IAM ロールを引き受けます。Datadog が付与するのは、選択された推奨タイプに必要な権限のみです。
- (オプション) チャンネルに承認メッセージをルーティングしたい場合は、Slack または Microsoft Teams コネクション。

## 自動化をセットアップします。{#set-up-an-automation}

推奨タイプの定期的なスケジュールで自動化をセットアップするには:

1. [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Optimize{{< /ui >}} > {{< ui >}}Automations{{< /ui >}}][6] に移動します。
1. ページの左側で、推奨タイプを選択します。
1. [**Create New Automation**] (新しい自動化を作成) をクリックします。
1. {{< ui >}}AWS Connection{{< /ui >}} ドロップダウンメニューで、[コネクション][7] を選択または作成します。1つの自動化で複数のアカウントに対して実行するには、[コネクショングループ][8]を選択または作成します。
1.  {{< ui >}}Define scope{{< /ui >}} セクションで:
    1. タグを入力して、`env`、`service`、`team` などのタグに一致するリソースに自動化を制限します。
    1. 実行ごとの最大リソース数を入力して、自動化が単一の実行中に処理するリソースの数を制限します。自動化は、節約になる可能性が一番高いリソースを優先します。
1. [{{< ui >}}Set schedule{{< /ui >}}] セクションで、自動化の頻度と実行時間を選択します。
1. (オプション) [{{< ui >}}Require approval before execution{{< /ui >}}] トグルを有効にすると、実行前に人間のレビューを要求するようになります。有効にした場合は、{{< ui >}}Slack{{< /ui >}} または {{< ui >}}Microsoft Teams{{< /ui >}} を選択し、チャネル通知フィールドに入力します。[セーフガード](#safeguards) を参照してください。
1. 自動化の名前を入力します。
1. [{{< ui >}}Save Policy{{< /ui >}}] をクリックします。

### セーフガード{#safeguards}

各推奨タイプには、組み込みのセーフガードがあります。例えば、**接続されていない EBS ボリュームを終了する**の自動化は、各ボリュームを削除する前に EBS スナップショットを作成します。自動化フォームにリストされているセーフガードを確認し、環境に応じてオプションのものを切り替えます。

{{< ui >}}Require approval before execution{{< /ui >}}を[自動化セットアップ](#set-up-an-automation)で有効にした場合、Datadog は各実行でターゲットになるリソースの概要を指定されたチャネルに投稿します。ユーザーがチャネルでリクエストを承認しないと、自動化は実行されません。

## 自動化を管理{#manage-automations}

{{< ui >}}Automations{{< /ui >}} ページには、組織内のすべての自動化が推奨タイプでグループ化されてリストされています。このページから、次のことができます。

- 自動化の一時停止または再開
- 自動化のスコープ、スケジュール、またはセーフガードの編集
- 自動化の名前変更
- 自動化の削除

## 実行履歴{#execution-history}

過去および今後の実行を確認するには、自動化を開き、[{{< ui >}}Activity{{< /ui >}}] タブを選択してください。各実行記録には以下が含まれます。

- 実行時間とステータス (成功、失敗、または承認待ち)
- 操作対象のリソース
- 実行によって実現される推定節約額
- 基盤となる Workflow Automation の実行へのリンク

[{{< ui >}}Activity{{< /ui >}}] ビューの上部にあるフィルターを使用して、ステータス、推奨タイプ、または日付範囲で実行を見つけます。

## バージョン履歴{#version-history}

Datadog は、自動化が作成、編集、有効化、無効化、または削除されるたびに新しいバージョンを記録します。各変更を誰が行い、何が変更されたかを確認するには、自動化を開き、[{{< ui >}}History{{< /ui >}}] タブを選択してください。変更の監査や、前のバージョンへのロールバックには、このビューを使用します。

## 推奨事項ステータス{#recommendation-status}

自動化がリソースに対して正常に実行された場合、対応する推奨は [{{< ui >}}Completed{{< /ui >}}] に移動し、自動化によって完了としてラベル付けされます。その節約は、[Cloud Cost Recommendations][1] ページで実現された節約合計にカウントされます。

推奨事項を [{{< ui >}}Dismissed{{< /ui >}}] に設定すると、その推奨事項は却下の期限が切れるまで自動化の今後の実行でスキップされます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/cloud_cost_management/recommendations/
[2]: /ja/cloud_cost_management/recommendations/#recommendation-action-taking
[3]: https://www.datadoghq.com/pricing/?product=workflow-automation#products
[4]: /ja/cloud_cost_management/recommendations/#prerequisites
[5]: /ja/service_management/workflows/connections/
[6]: https://app.datadoghq.com/cost/optimize/automations
[7]: /ja/actions/connections/
[8]: /ja/service_management/workflows/connections/#connection-groups