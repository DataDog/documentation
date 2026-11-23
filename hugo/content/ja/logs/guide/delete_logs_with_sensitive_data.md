---
disable_toc: false
further_reading:
- link: logs/guide/manage-sensitive-logs-data-access/
  tag: ドキュメント
  text: 機密ログデータへのアクセスの管理
- link: /security/sensitive_data_scanner/
  tag: ドキュメント
  text: Sensitive Data Scanner
- link: /account_management/delete_data/
  tag: ドキュメント
  text: データを削除する
title: 機密データを含むログを削除する
---
## 概要{#overview}

機密データを含むログを削除することで、そのデータが漏洩するリスクを軽減できます。このガイドでは、以下の方法について説明します。

- 機密データを含むログが保存期間内であるために削除が必要かどうかを確認する方法。
- 機密データを含むログをクエリ不可にする方法。
- Sensitive Data Scanner で機密データを秘匿化する方法。
- ログデータの削除を使用してログを削除する方法。

## ログの保存期間を確認する方法。{#check-your-log-retention-period}

Datadog は、組織で定められた最長保存期間を超えたログを自動的に削除します。

ログの保存期間を確認または変更するには:

1. [Log Indexes][1] (ログインデックス) ページに移動します。
1. [{{< ui >}}Retention{{< /ui >}}] (保存期間) 列で各インデックスのログの保存期間を確認します。
1. ログをより早く期限切れにしたい場合は、インデックスの右側にある [{{< ui >}}Edit{{< /ui >}}] (編集) アイコンをクリックします。
1. [**Set Index Retention]**(インデックス保存期間の設定) ドロップダウンメニューを更新して、新しい保存期間にします。

## 機密データを含むログをクエリ不可にする{#make-logs-with-sensitive-data-un-queryable}

保存期間内のログに機密データが含まれている場合、そのログが期限切れになるまでクエリ不可にできます。クエリ不可のログは、Log Explorer、ダッシュボード、および Live Tail には表示されません。Datadog で機密データを含むログをクエリ不可にするには、こちらの[手順][2]に従ってください。

## インデックス全体を削除する{#delete-an-entire-index}

インデックス全体を削除するには:

1. [Log Indexes][1] (ログインデックス) ページに移動します。
1. 削除するインデックスの右側にある [{{< ui >}}Delete{{< /ui >}}] (削除) アイコンをクリックします。
1. [{{< ui >}}Confirm{{< /ui >}}] (確定) をクリックしてインデックスを削除します。

## Sensitive Data Scanner で機密データを秘匿化する{#redact-sensitive-data-with-sensitive-data-scanner}

Datadog に機密データを保存するリスクを制限するには、[Sensitive Data Scanner][5] を使用します。Sensitive Data Scanner は、機密データを識別、タグ付けし、必要に応じて秘匿化またはハッシュ化するために使用できる、ストリームベースのパターンマッチングサービスです。セキュリティチームおよびコンプライアンスチームは、Sensitive Data Scanner を実装することで、機密データの漏洩を防ぎ、コンプライアンス違反のリスクを制限できます。

## 組織からログを削除する {#delete-logs-from-your-organization}

機密データを含むインデックス化されたログを完全に削除するには、[Logs Data Deletion][3] (ログデータの削除) を使用します。Logs Data Deletion (ログデータの削除) を使用すると、Datadog サポートに連絡することなく、期間を指定してログをクエリし、組織から削除できます。

ログを削除する前に、以下を確認してください。

- 機密データを含むログの Datadog への送信を停止していること。
- Logs Data Deletion (ログデータの削除) が[組織で有効になっている][6]こと。有効にできるのは Organization Admin (組織管理者) のみです。
- [{{< ui >}}Logs Delete Data{{< /ui >}}] (ログデータの削除) 権限を持つロールがあること。

<div class="alert alert-danger">削除は 10 日後に完全に元に戻すことができなくなります。各削除リクエストを確定する前に、確認してください。</div>

**注**: Logs Data Deletion (ログデータの削除) は、削除されたログから派生したデータ (生成されたメトリクスなど) を削除しません。

削除の取り消しや削除の監査の方法を含むすべての手順については、[データを削除する][3]を参照してください。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines/indexes
[2]: /ja/logs/guide/manage-sensitive-logs-data-access/#make-sensitive-logs-un-queryable-in-datadog-until-they-age-out
[3]: /ja/account_management/delete_data/
[5]: https://www.datadoghq.com/product/sensitive-data-scanner/
[6]: /ja/account_management/delete_data/#enable-deletion-feature