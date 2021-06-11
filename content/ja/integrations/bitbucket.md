---
categories:
  - Source Control
  - Collaboration
  - issue tracking
ddtype: crawler
dependencies: []
description: サービス全体のパフォーマンスに影響するコミットやプルリクエストを確認。
doc_link: 'https://docs.datadoghq.com/integrations/bitbucket/'
draft: false
further_reading:
  - link: 'https://www.datadoghq.com/blog/understand-code-changes-impact-system-performance-bitbucket-datadog/'
    tag: ブログ
    text: 'Bitbucket + Datadog: コード変更のインフラストラクチャーへの影響の確認方法'
git_integration_title: bitbucket
has_logo: true
integration_id: bitbucket
integration_title: Bitbucket
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: bitbucket
public_title: Datadog-Bitbucket インテグレーション
short_description: サービス全体のパフォーマンスに影響するコミットやプルリクエストを確認。
version: '1.0'
---
{{< img src="integrations/bitbucket/integrations-bitbucket.gif" alt="integrations bitbucket" popup="true">}}

## 概要

Bitbucket Cloud または Bitbucket Server からコミットイベントとプルリクエストイベントを直接取得すると、以下のことができます。

- コードの変更をリアルタイムに追跡できます。
- すべてのダッシュボードにコード変更マーカーを追加できます。
- コードの変更についてチームで議論できます。

インテグレーションのセットアップが完了すると、選択した項目 (コミット、プルリクエスト、またはその両方) が Datadog イベントストリームに表示されます。

**例**:

- コミットがいつ行われたか
- プルリクエストがいつ作成されたか
- プルリクエストでコメントがいつ作成/削除されたか

## セットアップ

### インストール

[Bitbucket のドキュメント][1]を参照して、Datadog で追跡する Bitbucket の挙動に対応する Webhook をセットアップします。Webhook の URL は、以下のように設定してください。

```text
https://app.datadoghq.com/intake/webhook/bitbucket?api_key=<YOUR_DATADOG_API_KEY>
```

### コンフィギュレーション

インテグレーションタイルから [Bitbucket インテグレーション][2]を構成します。

1. 監視する各リポジトリの完全名を入力します。たとえば、リポジトリの URL が `https://bitbucket.org/groupname/reponame` の場合は、**Repository** テキストボックスに `groupname/reponame` と入力します。
2. Datadog に送信するイベントの種類を選択します。

    - Bitbucket Cloud: すべてのトリガーのリスト (Commits、Pull Requests、または Issues) から選択します。
    - Bitbucket Server: Commits または Pull Requests を選択します。

3. **Update Configuration** をクリックします。

### 検証

インテグレーションタイル内の各エントリは、入力時に検証されます。

## 使用例

左上の検索バーに `sources:bitbucket` と入力することで、Bitbucket のイベントをダッシュボードグラフに重ねて表示できます。このページの上部にあるサンプル GIF を参照してください。

## 収集データ

### メトリクス

Bitbucket インテグレーションには、メトリクスは含まれません。

### イベント

Bitbucket Cloud と Bitbucket Server の両方からのコミットとプルリクエストを含む Bitbucket イベントは、Datadog アプリケーションに転送されます。

### サービスのチェック

Bitbucket インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://confluence.atlassian.com/bitbucket/manage-webhooks-735643732.html
[2]: https://app.datadoghq.com/account/settings#integrations/bitbucket
[3]: https://docs.datadoghq.com/ja/help/