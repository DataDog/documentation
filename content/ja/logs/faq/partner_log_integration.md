---
kind: faq
private: true
title: Datadog パートナー向けログインテグレーションガイドライン
---

## 概要

このガイドでは、Datadog パートナーがパートナーログインテグレーションを作成する方法について、次のステップを説明します。

1. [Datadog にログを送信する](#send-logs-to-datadog)
2. [Datadog パートナーアカウントでログインテグレーションアセットを設定する](#set-up-the-log-integration-assets-in-your-datadog-partner-account)
3. [インテグレーションのレビューとデプロイメント](#review-and-deploy-the-integration)

## ログを Datadog に送信する方法

ログ取り込み HTTP エンドポイントを使用して、Datadog にログを送信します。エンドポイントの詳細については、[Send Logs API ドキュメント][1]を参照してください。

以下は、インテグレーションを構築するためのガイドラインです。

1. `source` と `service` タグは小文字で記述する必要があります。

2. `source` タグにインテグレーション名を設定します。

   &nbsp;Datadog では、`source` タグを `<integration_name>` に設定し、`service` タグをテレメトリーを生成するサービスの名前に設定することを推奨しています。例えば、`service` タグは製品ラインによってログを区別するために使用することができます。

   &nbsp;異なるサービスが存在しない場合は、`service` に `source` と同じ値を設定します。`source` と `service` のタグは、インテグレーションパイプラインとダッシュボードを有効にするために使用されるので、ユーザーが編集できないようにする必要があります。タグはペイロードで設定するか、クエリパラメーターで設定することができます。例: `?ddsource=example&service=example`

3. インテグレーションは、すべての Datadog サイトをサポートする必要があります。

   ユーザーは、該当する場合はいつでも異なる Datadog サイトを選択できるようにする必要があります。サイトの違いについては、[Datadog サイトの概要][2]を参照してください。各サイトのエンドポイントは以下の通りです。
    | サイト    | HTTP エンドポイント                           |
    | ------- | --------------------------------------- |
    | US1     | http-intake.logs.datadoghq.com          |
    | US3     | http-intake.logs.us3.datadoghq.com      |
    | US5     | http-intake.logs.us5.datadoghq.com      |
    | US1-FED | http-intake.logs.ddog-gov.datadoghq.com |
    | EU1     | http-intake.logs.datadoghq.eu           |

4. インテグレーションを設定する際に、ユーザーがカスタムタグをアタッチできるようにします。

   &nbsp;Datadog は、手動ユーザータグを JSON 本文の key-value 属性として送信することを推奨しています。ログに手動タグを追加できない場合は、`ddtags=<TAGS>` クエリパラメーターを使用してタグを送信することができます。例については、[Send Logs API ドキュメント][1]を参照してください。

5. JSON 本文には可能な限り配列を入れずにデータを送信します。

   一部のデータをタグとして送信することは可能ですが、Datadog では、データを JSON 本文で送信し、配列を避けることを推奨しています。これにより、Datadog ログプラットフォーム内のデータに対して、ユーザーが実行できる演算子がより柔軟になります。

6. Datadog API キーをログに記録しません。

   Datadog API キーは、ヘッダーで渡すか、HTTP パスの一部として渡すことができます。例については、[Send Logs API ドキュメント][1]を参照してください。Datadog は、セットアップで API キーをログに記録しないメソッドを使用することを推奨しています。

7. Datadog アプリケーションキーを使用しません。

   Datadog アプリケーションキーは、API キーとは異なり、HTTP エンドポイントを使用してログを送信するためには必要ありません。

## Datadog パートナーアカウントでログインテグレーションアセットを設定する

### ログパイプラインの設定 

Datadog に送信されたログは、ログパイプラインで処理され、検索や分析がしやすいように標準化されます。パイプラインを設定するには、

1. [ログパイプライン][3]に移動します。
2. **Add a new pipeline** をクリックします。
3. **Filter** フィールドに、パートナーログのログソースを定義する一意の `source` を入力します。例えば、Okta インテグレーションでは、`source:okta` となります。**注**: インテグレーションを通じて送信されるログは、Datadog に送信される前に正しいソースタグでタグ付けされていることを確認してください。
4. オプションで、タグと説明を追加します。
5. **作成**をクリックします。

パイプラインの中で、データを再構築し、属性を生成するプロセッサーを追加することができます。例:

- [日付リマッパー][4]を使用して、ログの正式なタイムスタンプを定義します。
- 属性[リマッパー][5]を使用して、属性キーを [Datadog 標準属性][6]にリマップします。例えば、クライアント IP を含む属性キーは、Datadog がすぐに使えるダッシュボードでパートナーログを表示できるように、`network.client.ip` にリマップする必要があります。
- [サービスリマッパー][7]を使って、`service` 属性をリマップするか、`source` 属性と同じ値に設定します。
- [grok プロセッサー][8]を使用して、ログ内の値を抽出し、検索や分析に役立てることができます。
- [メッセージリマッパー][9]を使って、ログの公式メッセージを定義し、特定の属性を全文検索できるようにします。

詳細と全ログプロセッサーの一覧は、[プロセッサー][10]を参照してください。

### ログエクスプローラーにファセットを設定する

顧客がログの検索や分析に使用する可能性のあるフィールドは、すべてファセットとして追加する必要があります。ファセットは、ダッシュボードでも使用されます。

ファセットには 2 種類あります。

- ファセットは、相対的な洞察を得たり、一意の値をカウントするために使用されます。
- メジャーは、ある範囲での検索に使用されるファセットの一種です。 例えば、レイテンシー期間のメジャーを追加すると、特定のレイテンシー以上のすべてのログを検索することができます。**注**: メジャーファセットの[単位][11]は、属性が何を表すかに基づいて定義されます。

新しいファセットまたはメジャーを追加するには
1. ファセットまたはメジャーを追加したい属性を含むログをクリックします。
2. ログパネルで、属性の横にある歯車をクリックします。
3. **Create facet/measure for @attribute** を選択します。
4. メジャーの場合、単位を定義するには、**Advanced options** をクリックします。属性が表すものに基づいて、単位を選択します。
4. **Add** をクリックします。

ファセットリストを簡単に移動できるように、類似のファセットをグループ化します。インテグレーションログに固有のフィールドについては、`source` タグと同じ名前のグループを作成します。

1. ログパネルで、新しいグループに入れたい属性の横にある歯車をクリックします。
2. **Edit facet/measure for @attribute** を選択します。属性のファセットがまだ存在しない場合は、**Create facet/measure for @attribute** を選択します。
3. **Advanced options** をクリックします。
4. **Group** フィールドに、新しいグループの名前を入力し、**New group** を選択します。
5. **Update** をクリックします。

詳しくは、[ログファセットドキュメント][12]をご覧ください。

Datadog の標準的な属性で、特定のグループに属するものについては、[デフォルト標準属性リスト][6]を参照してください。

## インテグレーションのレビューとデプロイメント

Datadog は、パートナーのインテグレーションをレビューし、パートナーにフィードバックを提供します。一方、パートナーはレビューし、それに応じて変更を加えます。このレビュープロセスは、メールで行われます。

レビューが完了すると、Datadog は新しいログインテグレーションアセットを作成し、デプロイします。

[1]: /ja/api/latest/logs/?code-lang=go#send-logs
[2]: /ja/getting_started/site/
[3]: https://app.datadoghq.com/logs/pipelines
[4]: /ja/logs/log_configuration/processors/?tab=ui#log-date-remapper
[5]: /ja/logs/log_configuration/processors/?tab=ui#remapper
[6]: /ja/logs/log_configuration/attributes_naming_convention/#default-standard-attribute-list
[7]: /ja/logs/log_configuration/processors/?tab=ui#service-remapper
[8]: /ja/logs/log_configuration/processors/?tab=ui#grok-parser
[9]: /ja/logs/log_configuration/processors/?tab=ui#log-message-remapper
[10]: /ja/logs/log_configuration/processors/
[11]: /ja/logs/explorer/facets/#units
[12]: /ja/logs/explorer/facets/