---
description: Datadog API インテグレーションを開発し、公開する方法をご紹介します。
further_reading:
- link: /api/latest/using-the-api/
  tag: Documentation
  text: Datadog API の使用方法
- link: /developers/authorization/
  tag: Documentation
  text: OAuth を使った API インテグレーションについて
- link: /developers/
  tag: Documentation
  text: Datadog プラットフォームで開発する方法について
title: API インテグレーションの作成
type: documentation
---
## 概要

このページでは、Datadog API インテグレーションを作成する方法をテクノロジーパートナーに説明します。

## API インテグレーション

[Datadog API エンドポイント][1]を使用して、バックエンドからデータを送信し、ユーザーの Datadog アカウントからデータを引き出すことで、顧客の体験を豊かにします。テクノロジーパートナーは、自社の環境内でコードを書き、ホスティングします。

API インテグレーションは、SaaS ベースで、ユーザーを認証する既存のプラットフォームを持っているテクノロジーパートナーに最適です。

API インテグレーションは、以下の種類のデータを Datadog に送信できます。

- [メトリクス][2]
- [ログ][3]
- [イベント][4]
- [サービスチェック][5]
- [トレース][6]
- [インシデント][7]

Agent ベースのインテグレーションには、[モニター][25]、[ダッシュボード][26]、[ログパイプライン][27]などのすぐに使えるアセットを含めることができます。ユーザーがインテグレーションタイルの **Install** をクリックすると、セットアップ手順に従うよう促され、すぐに使えるすべてのダッシュボードがアカウントに表示されます。ログパイプラインなどの他のアセットは、インテグレーションを適切にインストールおよび構成した後に、ユーザーに表示されます。

**Integrations** または **Marketplace ページ**に製品を表示するには、タイルを作成する必要があります (下の写真)。このタイルには、製品のセットアップ方法に関する説明や、インテグレーションが何をするのか、どのように使用するのかについての一般的な情報が記載されます。

{{< img src="developers/integrations/integration_tile.png" alt="Integrations ページに表示される製品の例を表すタイル" style="width:25%" >}}

## 開発プロセス

### OAuth

Datadog では、ユーザーから直接 API キーやアプリケーションキーをリクエストする代わりに、[OAuth クライアント][14]を使用して API ベースのインテグレーションの認可とアクセスを処理することが求められています。OAuth の実装は、すべての [Datadog サイト][12]をサポートする必要があります。

詳しくは、[OAuth for Integration][15]、[認可エンドポイント][16]をご参照ください。

手始めに、[Vantage][17] などの `integrations-extras` リポジトリで OAuth を使用する例を調べてみるとよいでしょう。

### インテグレーションの構築

API ベースのインテグレーションを構築するプロセスは、次のようになります。

1. [Datadog パートナーネットワーク][29]に合格すると、Datadog テクノロジーパートナーチームと面談し、提供する製品やユースケースについて話し合います。
2. 開発用の Datadog サンドボックスアカウントをリクエストします。
3. インテグレーション開発を開始します。これには、インテグレーションコードの作成とホスティング、[OAuth プロトコル][28]の実装が含まれます。
4. インテグレーションと OAuth クライアントを、Datadog サンドボックスアカウントでテストします。
5. 開発作業がテストされ完了したら、**Integrations** または **Marketplace** ページにインテグレーションを表示するために、[タイルの作成][24]のステップに従ってください。
6. プルリクエストが送信され、承認されると、Datadog テクノロジーパートナーチームは、インテグレーションを最終確認するためのデモをスケジュールします。
7. Datadog のサンドボックスアカウントでタイルとインテグレーションをテストしてから公開するか、すべての顧客向けにインテグレーションをすぐに公開するかのオプションがあります。 

[タイルを作成する][24]ことで、API インテグレーションの構築を開始します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/api/latest/using-the-api/
[2]: https://docs.datadoghq.com/ja/api/latest/metrics/
[3]: https://docs.datadoghq.com/ja/logs/faq/partner_log_integration/
[4]: https://docs.datadoghq.com/ja/api/latest/events/
[5]: https://docs.datadoghq.com/ja/api/latest/service-checks/
[6]: https://docs.datadoghq.com/ja/tracing/guide/send_traces_to_agent_by_api/
[7]: https://docs.datadoghq.com/ja/api/latest/incidents/
[8]: https://docs.datadoghq.com/ja/api/latest/security-monitoring/
[9]: https://docs.datadoghq.com/ja/developers/#creating-your-own-solution
[10]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[11]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#application-keys
[12]: https://docs.datadoghq.com/ja/getting_started/site
[13]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[14]: https://docs.datadoghq.com/ja/developers/authorization/
[15]: https://docs.datadoghq.com/ja/developers/integrations/oauth_for_integrations/
[16]: https://docs.datadoghq.com/ja/developers/authorization/oauth2_endpoints/
[17]: https://github.com/DataDog/integrations-extras/tree/master/vantage
[18]: https://www.python.org/downloads/
[19]: https://pypi.org/project/datadog-checks-dev/
[20]: https://docs.datadoghq.com/ja/developers/integrations/check_references/#manifest-file
[21]: https://github.com/DataDog/integrations-extras/
[22]: https://app.datadoghq.com/integrations
[23]: https://docs.datadoghq.com/ja/developers/integrations/python
[24]: https://docs.datadoghq.com/ja/developers/integrations/create_a_tile
[25]: https://docs.datadoghq.com/ja/monitors/
[26]: https://docs.datadoghq.com/ja/dashboards/
[27]: https://docs.datadoghq.com/ja/logs/log_configuration/pipelines/
[28]: /ja/developers/authorization/oauth2_in_datadog/
[29]: https://partners.datadoghq.com/