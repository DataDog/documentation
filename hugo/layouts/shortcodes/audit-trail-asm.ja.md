| 名前                         | 監査イベントの説明                                                                  | 監査エクスプローラーのクエリ                                               |
|------------------------------|---------------------------------------------------------------------------------------------|-----------------------------------------------------------------------|
| [1 クリックアクティベーション][1001]   | ユーザーがサービス上で ASM をアクティブまたは非アクティブにした。                                          | `@evt.name:"Application Security" @asset.type:compatible_services`    |
| [保護][1002]             | ユーザーが ASM 保護を有効または無効にした。                                              | `@evt.name:"Application Security" @asset.type:blocking_configuration` |
| [拒否リスト][1003]               | ユーザーが IP アドレスまたはユーザー ID のブロック、ブロック解除、ブロック期間の延長を行った。 | `@evt.name:"Application Security" @asset.type:ip_user_denylist`       |
| [許可リスト][1004]               | ユーザーがパスリストにエントリーを追加、修正、または削除した。                                | `@evt.name:"Application Security" @asset.type:passlist_entry`         |
| [アプリ内 WAF ポリシー][1005]      | ユーザーがアプリ内 WAF ポリシーを作成、修正、または削除した。                                  | `@evt.name:"Application Security" @asset.type:policy_entry`           |
| [アプリ内 WAF カスタムルール][1006] | ユーザーがアプリ内 WAF カスタムルールを検証、作成、修正、または削除した。                  | `@evt.name:"Application Security" @asset.type:waf_custom_rule`        |

[1001]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Application%20Security%22%20%40asset.type%3Aip_user_denylist
[1002]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Application%20Security%22%20%40asset.type%3Ablocking_configuration
[1003]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A"Application%20Security"%20%40asset.type%3Acompatible_services
[1004]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A"Application%20Security"%20%40asset.type%3Apasslist_entry
[1005]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A"Application%20Security"%20%40asset.type%3Apolicy_entry
[1006]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A"Application%20Security"%20%40asset.type%3Awaf_custom_rule