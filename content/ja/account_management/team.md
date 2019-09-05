---
title: チーム
kind: documentation
description: オーガニゼーションのチームメンバーを追加または削除します。チームメンバーのロールを変更します。
further_reading:
  - link: account_management/saml
    tag: Documentation
    text: Datadog アカウントのための SAML の構成
  - link: account_management/multi_organization
    tag: Documentation
    text: 複数のアカウントを持つチームとオーガニゼーションの構成
---
{{< wistia 3rrd63kxzu >}}

## 新しいメンバーの追加

1. チームにメンバーを追加するには、最初に [Team Page][1] にアクセスします。
2. Datadog アカウントに招待するユーザーのメールアドレスを入力します。**Invite** をクリックします。
  {{< img src="account_management/team/guides-multacct-addtoteam.png" alt="Add Member To Team" responsive="true" style="width:50%;">}}

新しいユーザーは、ログイン用のリンクが記載されたメールを受け取ります。

## Datadog ユーザーロール

Datadog には、以下の 3 つのユーザーロールがあります。

* **管理者**は、課金情報にアクセスでき、API キーを無効にできます。ユーザーを管理し、[読み取り専用][2]ダッシュボードを構成できます。標準ユーザーを管理者に昇進させることもできます。

* **標準ユーザー**は、[ダッシュボード][2]、[モニター][3]、[イベント][4]、[ノートブック][5]など、Datadog が提供するすべてのモニタリング機能を表示および変更できます。他のユーザーをオーガニゼーションに招待することもできます。

* **読み取り専用ユーザー**は、管理者によって作成されます。Datadog 内で編集を行うためのアクセス権は持ちません。特定の読み取り専用ビューをクライアントと共有したり、ビジネスユニットのメンバーが外部のユーザーと[ダッシュボード][6]を共有する必要がある場合に便利です。

## 既存のメンバーの無効化

**注** メンバーを無効にするには、チームの管理者である必要があります。削除してはいけないイベントやダッシュボードを所有している場合があるため、ユーザーを完全に削除することはできません。無効にされたチームメンバーは、自動的に 1 月後に管理者のチームページ UI に表示されなくなります。

1. [Team Page][1]に移動します。
2. 無効にするユーザーのアバターにマウスを置きます。メニューから **Disable** を選択します。

    {{< img src="account_management/team/guides-multacct-disable.png" alt="Disable Member" responsive="true" style="width:50%;" >}}

## 既存のメンバーの管理者への昇進

**注** メンバーを昇進させることができるのはチームの管理者だけです。

1. [Team Page][1]に移動します。
2. 昇進させるユーザーのアバターにマウスを置きます。メニューから **Make Administrator** を選択します。

## その他の参照先

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/team
[2]: /ja/graphing/dashboards
[3]: /ja/monitors
[4]: /ja/graphing/event_stream
[5]: /ja/graphing/notebooks
[6]: /ja/graphing/dashboards