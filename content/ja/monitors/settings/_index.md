---
further_reading:
- link: /monitors/
  tag: ドキュメント
  text: モニターの作成
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知
title: モニタータグポリシー
---

## 概要

モニタータグポリシーにより、Datadog モニターのタグとタグ値に対するデータの検証を実行することができます。これにより、アラートが、トリアージと処理のための正しいダウンストリームシステムおよびワークフローに送信されることが保証されます。

<div class="alert alert-warning">セットアップ後、タグポリシーは<strong>すべての</strong> Datadog モニターに適用されます</div>

- 新規に作成するタグは、組織のタグポリシーに準拠していなければなりません。
- 既存のモニターが組織のタグポリシーに違反している場合、引き続きアラートと通知は提供されますが、その他の設定を変更する前に、既存のモニターを更新してタグポリシーに合致させる必要があります。

## モニタータグポリシーの構成

1. **Monitors** > **Settings** ページに移動します。
2. タグポリシーを構成します。タグポリシーを通じて実行されるデータ検証ルールは 3 種類存在します。
    - タグと指定された値が必要
    - タグのみ必要
    - オプションのタグと指定された値
3. 緑色のチェックマークをクリックして、ポリシーを保存します。

{{< img src="/monitors/settings/tag_policies.png" alt="モニターのタグポリシー設定ページ" style="width:100%;" >}}

### タグと指定された値が必要

必須タグを強制する場合、**Required** チェックボックスを選択して、タグのキーと値を両方指定します。この例では、モニターには `cost_center` タグが追加されていなければなりません。値は `cc1`、`cc2`、または `cc3` に設定する必要があります。

{{< img src="monitors/settings/monitor_tag_enforcement_key_and_value.png" alt="必須のタグと値に関するタグポリシーが表示されているモニター設定ページ" >}}

### タグのみ必要

タグを必須にする一方、ユーザーが独自の値を指定することを許可することができます。この例では、モニターには `product_id` タグが追加されていなければなりません。値は、ユーザーが指定するどんな値でも構いません。

{{< img src="monitors/settings/monitor_tag_enforcement_key_only.png" alt="タグのみが必須のタグポリシーが表示されているモニター設定ページ" >}}

### オプションのタグと指定された値

タグをオプションにする一方、そのタグが追加されたモニターでは指定された値を使用することを必須にする場合、**Values** フィールドにタグの値を入力します。この例では、`env` タグはオプションですが、モニターがこのタグを使用する場合、値は `dev`、`staging`、または `prod` に設定する必要があります。

{{< img src="monitors/settings/monitor_tag_enforcement_optional_key_with_values.png" alt="オプションのタグと指定された値に関するタグポリシーが表示されているモニター設定ページ" >}}

## アクセス許可

モニターのタグポリシーを構成するには、`MONITOR_CONFIG_POLICY_WRITE_PERMISSION` の権限を持つロールを割り当てられている必要があります。

詳しくは、[ロールベースアクセスコントロール][1]および[ロール権限][2]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/rbac/
[2]: /ja/account_management/rbac/permissions/