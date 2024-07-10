---
categories:
- ログの収集
- security
dependencies: []
description: Google Workspace Alert Center からログを収集します。
doc_link: https://docs.datadoghq.com/integrations/google_workspace_alert_center/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/google-workspace-monitoring
  tag: ブログ
  text: Datadog を使用して Google Workspace を監視する
git_integration_title: google_workspace_alert_center
has_logo: true
integration_id: ''
integration_title: Google Workspace Alert Center
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: google_workspace_alert_center
public_title: Google Workspace Alert Center
short_description: Google Workspace Alert Center からログを収集します。
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Alert Center は、Google Workspace 全体にわたる重要なセキュリティ関連の通知、アラート、アクションの包括的なビューを提供します。Google Workspace Alert Center を Datadog と統合すると、次のことが可能になります。

- [Datadog のログ製品][1]を使用してアラートログを表示およびパースする。
- Google Workspace ドメインの[イベント][3]に[モニター][2]を設定する。
- Datadogの[セキュリティプラットフォーム][4]を活用して、Google Workspace ドメインに対する脅威を監視および検知する。

## 計画と使用

### インフラストラクチャーリスト

Datadog Google Workspace Alert Center インテグレーションは、サービスアカウントを使用して Google と Datadog の間の API 接続を作成します。以下では、サービスアカウントを作成し、Datadog にサービスアカウント認証情報を提供して、自動的に API 呼び出しを開始するための手順を説明します。

1. [サービスアカウントの作成と承認の手順][5]に従ってください。
   これらの手順を完了するためには、スーパー管理者アクセスが必要です。そのプロセスの一環として、プライベートキー JSON ファイルを保存するロケーションに注意してください。説明したように、サービスアカウントにドメイン全体の権限を委譲し、その過程で `https://www.googleapis.com/auth/apps.alerts` スコープを付与します。
 1. GCP コンソールの `Service account details` ページから、`Advanced settings` セクションの一番下にある `Create Google Workspace Marketplace-Compatible OAuth Client` ボタンをクリックします。
2. [Datadog Google Workspace Alert Center インテグレーションタイル][6]に移動します。
3. **Configuration** タブで、_Upload Private Key File_ を選択してこのプロジェクトを Datadogと統合します。
   最初のステップで保存した秘密鍵 JSON ファイルを選択します。
4. 件名のメールを入力します。これは、アラートセンターにアクセスできるユーザーまたはロボットアカウントのメールアドレスです。
   サービスアカウント自体に関連付けられているメールアドレスは使用しないでください。
   インテグレーションは、API 呼び出しを行うときにこのユーザーになりすます。

複数のプロジェクトを監視する場合は、上記のプロセスを繰り返して、複数のサービスアカウントを使用できます。

### ブラウザトラブルシューティング

プロジェクトごとにカスタムタグを指定することもできます。これらのタグは、Datadog 内のそのプロジェクトのすべてのログイベントに追加されます。

### 結果

ソース `google.workspace.alert.center` の下に[ログ][1]が入るまで、少なくとも 5 分待ちます。ご使用の環境で Alert Center のアラートが頻繁に生成されない場合は、さらに長く待機する必要があります。

## リアルユーザーモニタリング

### データセキュリティ

この Google Workspace Alert Center には、メトリクスデータは含まれません。

### ヘルプ

ログイベントの一覧については、[Google Workspace Alert Center のドキュメント][7]を参照してください。

### ヘルプ

Google Workspace Alert Center インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/
[2]: /ja/monitors/monitor_types/
[3]: /ja/events/
[4]: /ja/security_platform/
[5]: https://developers.google.com/identity/protocols/oauth2/service-account
[6]: http://app.datadoghq.com/integrations/google-workspace-alert-center
[7]: https://support.google.com/a/answer/9104586?hl=en&ref_topic=9105077
[8]: https://docs.datadoghq.com/ja/help/