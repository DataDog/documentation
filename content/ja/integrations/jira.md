---
categories:
- collaboration
- issue tracking
- notification
ddtype: crawler
dependencies: []
description: このインテグレーションにより、Datadog でトリガーされたアラートからチケットを作成し、新しい情報が発生すると既存のチケットを更新することができます。さらに、Jira
  チケットの作成を Datadog 内のイベントとして表示し、すべてのメトリクスと重ね合わせることができます。
doc_link: https://docs.datadoghq.com/integrations/jira/
draft: false
git_integration_title: jira
has_logo: true
integration_id: ''
integration_title: Jira
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: jira
public_title: Datadog-Jira インテグレーション
short_description: Datadog でアラートを自動生成し、その後 Jira チケットを更新。
version: '1.0'
---

## 概要

Jira は、ソフトウェアチーム向けの課題およびプロジェクト追跡システムです。Datadog Jira インテグレーションにより、Datadog でトリガーされたアラートから課題を作成し、Jira で作成された課題を Datadog のイベントとして表示することができます。

## セットアップ

### Jira でアプリケーションリンクを作成する

1. Jira に移動します。
2. 右端の歯車アイコンをクリックし、** Products** を選択します。
3. 左メニューの **Integrations** の下にある **Application links** をクリックします。
4. URL `https://app.datadoghq.com/` を入力し、**Create new link** をクリックします。
5. "No response was received from the URL you entered” (入力した URL から応答がありません) という警告を無視して、**Continue** をクリックします。
6. 下記のようにフォームに入力し、**Continue** をクリックします。

    | フィールド                 | 入力                          |
    |-----------------------|--------------------------------|
    | Application Name      | `{Enter a name (e.g. Datadog)}`|
    | Application Type      | 一般的なアプリケーション            |
    | Service Provider Name | `{leave blank}`                |
    | Consumer key          | `{leave blank}`                |
    | Shared secret         | `{leave blank}`                |
    | Request Token URL     | `{leave blank}`                |
    | Access token URL      | `{leave blank}`                |
    | Authorize URL         | `{leave blank}`                |
    | Create incoming link  | ボックスをチェック                  |

7. 次のフォームに以下のように入力し、**Continue** をクリックします。[Datadog Jira インテグレーションタイル][1]で公開鍵を見つけるには、**Add Account** をクリックします。

    | フィールド         | 入力                                                      |
    |---------------|------------------------------------------------------------|
    | Consumer Key  | `{キー名を入力 (例: datadog)}`                        |
    | Consumer Name | Datadog                                                    |
    | Public Key    | `{Datadog Jira インテグレーションタイルから公開鍵を入力}`|

### Datadog を Jira インスタンスに接続する

1. [Datadog Jira インテグレーションタイル][1]に移動し、**Add Account** をクリックします。
2. Jira インスタンスの URL と、以前に作成したアプリケーションリンクのコンシューマーキーを入力します。
3. **Connect** をクリックし、Jira 認証ページの指示に従います。

### IP フィルタリング

Jira インスタンスが IP アドレスによってトラフィックをフィルタリングする場合、インテグレーションが機能するためには、Datadog に属する **Webhooks** IP プレフィックスからの接続を許可する必要があります。お住まいの地域の **Webhooks** IP プレフィックスのリストについては、[Datadog IP 範囲][2]を参照してください。


## 課題テンプレートを構成する


課題テンプレートは、Datadog のアラートイベントから Jira で課題がどのように作成されるかを定義します。

課題テンプレートを作成するには

1. **New Issue Template** をクリックします。
2. 課題テンプレートの名前を入力します。この名前の前に `jira-` を付けると、モニターで通知を送るためのハンドルになります (`jira-my-issue-template-name` のように)。
3. Jira アカウントを選択します。
4. プロジェクトと課題の種類 (**Story**、*Epic**、*Task**、*Bug**など) を選択します。
5. 構成可能なフィールドのリストが表示されます。必要な項目に値を入力し、** Save** をクリックします。

### 課題のフィールドを構成する

課題テンプレートフィールドは、Jira で課題を作成する際に含まれるデータを定義します。たとえば、特定の優先度やデフォルトの担当者で課題を作成するようにテンプレートを構成することができます。

`${EVENT_TITLE}` などのテンプレート変数を使用すると、アラートイベントのデータを使用して、課題フィールドに値を入力することができます。使用可能な変数の一覧は、[Datadog Webhooks インテグレーション][3]を参照してください。

## 使用方法

#### Datadog アラートから自動的に課題を作成する

Datadog のアラートイベントから Jira 課題を作成するには、**Notify your team** または **Say what's happening** セクションでモニターを作成する際に `@jira-my-issue-template` などの 1 つまたは複数の課題テンプレートの通知ハンドルを入力する必要があります。

課題は、モニターがトリガーされたときに作成されます。モニターが解決されるまで、モニターによって新しい課題が作成されることはありません。

## 収集データ

### メトリクス

Jira インテグレーションには、メトリクスは含まれません。

### イベント

作成されたすべての Jira の課題は、Datadog 内にイベントとして表示されます。

### サービスのチェック

Jira インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#integrations/jira
[2]: https://docs.datadoghq.com/ja/api/latest/ip-ranges/
[3]: https://docs.datadoghq.com/ja/integrations/webhooks/
[4]: https://docs.datadoghq.com/ja/help/