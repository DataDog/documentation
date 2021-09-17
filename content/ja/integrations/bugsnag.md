---
categories:
  - exceptions
  - notification
ddtype: crawler
dependencies: []
description: 複数のアプリケーションのエラー率の変化を一元的に追跡。
doc_link: 'https://docs.datadoghq.com/integrations/bugsnag/'
draft: false
git_integration_title: bugsnag
has_logo: true
integration_id: bugsnag
integration_title: Bugsnag
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: bugsnag
public_title: Datadog-Bugsnag インテグレーション
short_description: 複数のアプリケーションのエラー率の変化を一元的に追跡。
version: '1.0'
---
## 概要

Bugsnag は、Web およびモバイルアプリケーション用の自動クラッシュ検出プラットフォームをソフトウェアチームに提供します。Bugsnag は、発生したエラーを自動的にキャプチャしてアラートを生成します。Datadog を Bugsnag と統合すると、エラー通知が Datadog のイベントストリームに送信されます。

このインテグレーションを使用すると、以下のことができます。

- Datadog イベントストリームでエラーのサマリーを取得できます。
- プロジェクトのエラー率が急上昇したときに通知を受けることができます。
- 重大度やリリース段階で通知を絞り込むことができます。

## セットアップ

### インストール

インストールは必要ありません。

### コンフィギュレーション

Bugsnag を Datadog と統合するには、以下の手順に従います。

1. [Bugsnag][1] で、Datadog に通知を送信するように設定するプロジェクトの **Settings** に移動します。
2. **Team Notifications** を選択し、次に **Datadog** を選択します。
3. エラー通知トリガーを選択して、Datadog に表示する通知をカスタマイズします。
   {{< img src="integrations/bugsnag/bugsnag_1.png" alt="bugsnag_通知設定" popup="true">}}

4. 特定のリリース段階や重大度のエラーを表示するには、通知トリガーにカスタムフィルターを適用します。
   {{< img src="integrations/bugsnag/bugsnag_2.png" alt="bugsnag_フィルター設定" popup="true">}}

5. Datadog API キーを入力します。
6. **Test Notification** を選択して、構成をテストします。Bugsnag からのテストエラーが Datadog アプリケーションに表示されるはずです。
7. 設定を保存します。
8. 別の通知条件セットに基づいてエラーイベントを表示するには、同じプロジェクトからのストリームを追加します。

## 収集データ

### メトリクス

Bugsnag インテグレーションには、メトリクスは含まれません。

### イベント

Bugsnag インテグレーションは、設定された Bugsnag のエラーとアラートを Datadog のイベントストリームにプッシュします。

### サービスのチェック

Bugsnag インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][2]までお問合せください。

[1]: https://bugsnag.com
[2]: https://docs.datadoghq.com/ja/help/