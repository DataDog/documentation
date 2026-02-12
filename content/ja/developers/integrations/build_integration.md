---
aliases:
- /ja/developers/marketplace/offering
description: インテグレーションタイルの開発・公開方法について説明します。
further_reading:
- link: https://www.datadoghq.com/blog/datadog-marketplace/
  tag: ブログ
  text: Datadog Marketplace で監視範囲を拡大する
- link: /developers/integrations/marketplace_offering
  tag: ドキュメント
  text: Datadog Marketplace で製品を作成する
title: Build an Integration with Datadog
type: documentation
---
## 概要

このページは、Technology Partner に対して、Datadog へインテグレーションまたは Marketplace オファリングを作成して提出するための具体的な手順を案内します。

## はじめに

### リスティングを作成する
1. **Integrations > Developer Platform > Publishing** に移動し、**New Listing** をクリックします。
1. オファリングの種類を選択します。
1. オファリングの名前を追加します。
1. **Create** をクリックします。

### Overview を記入する
1. Overview セクションで、ベンダー名、ベンダー URL、短い説明などの関連詳細を入力し、適切なタグを適用します。
1. ロゴのワードマーク 版を SVG 形式でアップロードします。
1. インテグレーションの識別子として使用される一意の integration ID を設定します。

### インテグレーション コードを設計して作成する

[Agent ベースのインテグレーション][5] または [API ベースのインテグレーション][6] を作成するための手順に従います。

**Agent ベースのインテグレーション** を作成する場合は、記載の手順に従ってください。

Agent ベースのインテグレーションは、開発者が作成したチェックを通じてデータを送信するために Datadog Agent を使用します。

チェックは、メトリクス、イベント、サービス チェックを顧客の Datadog アカウントに送信できます。Agent 自体もログを送信できますが、それはチェックの外側で設定します。コードは GitHub でホストされます。

これらのインテグレーションの実装コードは Datadog によってホストされます。Agent インテグレーションは、ローカル エリア ネットワーク (LAN) または仮想 プライベート クラウド (VPC) 内にあるシステムやアプリケーションからデータを収集するのに最適です。Agent インテグレーションを作成するには、ソリューションを Python wheel (.whl) として公開およびデプロイする必要があります。

Agent Check の設定方法については [Agent Check ドキュメント][5] を参照し、残りの手順を進めるためにこのページに戻ってください。

**API ベースのインテグレーション** を作成する場合は、OAuth の使用が必須です。記載の手順に従ってください。

OAuth は、クライアント アプリケーションに安全な委任アクセスを提供するためにインテグレーションが使用できる標準です。OAuth は HTTPS 上で動作し、認証情報ではなくアクセス トークンを用いてデバイス、API、サーバー、アプリケーションを認可します。

[OAuth クライアント ドキュメント][7] を参照して OAuth Integration を設定し、残りの手順を進めるためにこのページに戻ってください。

プラットフォームが OAuth と互換性がない場合は、例外承認について Datadog Ecosystems チームに連絡してください。

### セットアップおよびアンインストール手順を提供する

1. **Setup instructions** は、インストール プロセスをユーザーが進められるように案内します。必要な構成、認証ステップ、初期セットアップ作業を番号付きリストで記載してください。
1. **Uninstallation instructions** は、インテグレーションを正しくアンインストールする方法を案内します。

### インテグレーションがやり取りするデータを定義する

Datadog のデータ型に関する情報は、ユーザーがインテグレーションの動作を理解するのに役立ちます。Datadog からデータを取得する場合は、Queried data セクションで対象のデータ型を指定してください。Datadog にデータを送信する場合は、Submitted data セクションで対象のデータ型を指定してください。項目によっては、より詳しい情報が必要な場合があります。

インテグレーションがメトリクスを送信する場合:
1. metric check を設定します。これは、インテグレーションが稼働していることをユーザーに知らせるために、各実行で送信されるメトリクスです。
1. `metadata.csv` ファイルに記入して、メトリクスの一覧をアップロードします。

インテグレーションがログを送信する場合は、ログ パイプラインが必須です。
1. 手順に従って [ログ パイプラインを作成][8] します。
1. 直前の手順でエクスポートした 2 つのファイルをアップロードします。

### インテグレーション 固有のコンテンツを作成する

Datadog Integrations は、インストール直後に使用できる標準コンテンツをサポートします。ダッシュボード、モニター テンプレート、SIEM 検知ルールなどのコンテンツを含め、ユーザーがインテグレーションから価値を得られるようにしてください。

1. インテグレーションに同梱するダッシュボードを少なくとも 1 つ作成して添付します。
    - ダッシュボードはすべてのインテグレーションで必須です。新しいダッシュボードを作成する際は、Datadog の [ベスト プラクティス][9] に従ってください。
1. その他のコンテンツも作成して添付します。
    - 新しいモニター テンプレートを作成するには、Datadog の [ベスト プラクティス][10] に従ってください。
    - SIEM 検知ルールを作成するには、Datadog の [ベスト プラクティス][11] に従ってください。

### サポート情報を追加する

サポート チームへの連絡先詳細を記載します。

### リリース ノートを追加する

初回リリースでは、そのままで問題ありません。将来の更新では、機能追加、変更、修正、削除を新しいバージョンごとに記載してください。

### レビューして送信する

1. インテグレーションをプレビューし、表示が正しいことを確認します。
1. 完了したら、レビューのために提出します。
1. Datadog チームがレビューし、フィードバックを返します。

## 関連情報

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://partners.datadoghq.com
[2]: /ja/integrations
[3]: /ja/marketplace
[4]: /ja/developers/integrations/marketplace_offering/
[5]: /ja/developers/integrations/agent_integration/
[6]: /ja/developers/integrations/api_integration/
[7]: /ja/developers/integrations/api_integration/#oauth
[8]: /ja/developers/integrations/log_pipeline/
[9]: /ja/developers/integrations/create-an-integration-dashboard/
[10]: /ja/developers/integrations/create-an-integration-monitor-template/
[11]: /ja/developers/integrations/create-a-cloud-siem-detection-rule/