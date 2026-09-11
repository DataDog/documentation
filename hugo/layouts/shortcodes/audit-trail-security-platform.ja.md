| 名前                       | 監査イベントの説明                                                                                              | 監査エクスプローラーのクエリ                                                            |
|----------------------------|-------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------|
| [CWS Agent ルール][1001]       | ユーザーがクラウドセキュリティプラットフォーム内の CWS Agent ルールにアクセス (フェッチ) した。                                              | `@evt.name:"Cloud Security Platform" @asset.type:cws_agent_rule @action:accessed`  |
| [通知プロファイル][1002] | ユーザーがクラウドセキュリティプラットフォームで通知プロファイルを作成、更新、または削除した。                              | `@evt.name:"Cloud Security Platform" @asset.type:notification_profile`             |
| [セキュリティルール][1003]        | ユーザーがセキュリティルールを検証、更新、削除、または作成し、そのルールの以前の値と新しい値。            | `@evt.name:"Cloud Security Platform" @asset.type:security_rule`                    |
| [セキュリティシグナル][1004]      | ユーザーがシグナルの状態を変更したり、シグナルの割り当てを行い、そのシグナルの前の値と新しい値。 | `@evt.name:"Cloud Security Platform" @asset.type:security_signal @action:modified` |
| [レポートサブスクリプション][1005]  | K9 を購読または購読解除したユーザーのメールレポート。 | `@evt.name:"Cloud Security Platform" @asset.type:report_subscription` |

[1001]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%E2%80%9CCloud%20Security%20Platform%E2%80%9D%20%40asset.type%3Acws_agent_rule%20%40action%3Aaccessed
[1002]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Cloud%20Security%20Platform%22%20%40asset.type%3Anotification_profile
[1003]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Cloud%20Security%20Platform%22%20%40asset.type%3Asecurity_rule
[1004]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Cloud%20Security%20Platform%22%20%40asset.type%3Asecurity_signal%20%40action%3Amodified
[1005]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Cloud%20Security%20Platform%22%20%40asset.type%3Areport_subscription%20