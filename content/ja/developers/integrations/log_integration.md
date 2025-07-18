---
aliases:
- /ja/logs/faq/partner_log_integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/docs/dev/log_integration.md
further_reading:
- link: /integrations/#cat-log-collection
  tag: Documentation
  text: 既存の Datadog Log インテグレーションを見る
- link: /logs/explorer/facets/
  tag: Documentation
  text: ログファセットについて
- link: /logs/explorer/
  tag: Documentation
  text: ログエクスプローラーについて
- link: /logs/log_configuration/pipelines/
  tag: Documentation
  text: ログパイプラインについて
kind: documentation
title: ログインテグレーションの作成
---
## 概要

このページでは、Datadog Log インテグレーションを作成する方法をテクノロジーパートナーに説明します。

## ログインテグレーション

[ログ取り込み HTTP エンドポイント][1]を使用して、Datadog にログを送信します。

## 開発プロセス

### ガイドライン

ログインテグレーションを作成する際には、以下のベストプラクティスを考慮してください。

`source` タグにインテグレーション名を設定します。
: Datadog は、`source` タグに `<integration_name>` を設定し、`service` タグにテレメトリーを生成するサービス名を設定することを推奨しています。例えば、`service` タグは、製品ラインごとにログを区別するために使用することができます。 </br></br>異なるサービスが存在しない場合は、`service` に `source` と同じ値を設定します。タグはインテグレーションパイプラインとダッシュボードを有効にするために使用されるため、`source` と `service` タグはユーザが編集できないようにする必要があります。タグはペイロードまたはクエリパラメーターで設定することができます (例: `?ddsource=example&service=example`)。</br></br>`source` と `service` のタグは小文字である必要があります。

インテグレーションは、すべての Datadog サイトをサポートする必要があります。
: ユーザーが異なる Datadog サイトを選択できるようにする必要があります。サイトの違いについては、[Datadog サイトの概要][2]を参照してください。</br></br>Datadog サイトのエンドポイントは `http-intake.logs`.{{< region-param key="dd_site" code="true" >}} です。

インテグレーションを設定する際に、ユーザーがカスタムタグをアタッチできるようにします。
: Datadog は、手動ユーザータグを JSON 本文の key-value 属性として送信することを推奨しています。ログに手動タグを追加できない場合は、`ddtags=<TAGS>` クエリパラメーターを使用してタグを送信することができます。例については、[Send Logs API ドキュメント][1]を参照してください。

可能な限り、JSON 本文には配列を入れずにデータを送信します。
: 一部のデータをタグとして送信することは可能ですが、Datadog は JSON 本文にデータを送信し、配列を避けることを推奨しています。これにより、Datadog ログ管理でデータに対して実行できる操作の柔軟性が高まります。

Datadog API キーをログに記録しません。
: Datadog API キーは、ヘッダーで渡すか、HTTP パスの一部として渡すことができます。例については、[Send Logs API ドキュメント][1]を参照してください。Datadog は、セットアップで API キーをログに記録しないメソッドを使用することを推奨しています。

Datadog アプリケーションキーを使用しません。
: Datadog アプリケーションキーは、API キーとは異なり、HTTP エンドポイントを使用してログを送信するためには必要ありません。

## Datadog パートナーアカウントでログインテグレーションアセットを設定する

### ログパイプラインの構成

Datadog に送信されたログは、[ログパイプライン][13]で処理され、検索や分析がしやすいように標準化されます。

パイプラインを設定するには、

1. [**Logs** > **Pipelines**][3] に移動します。
2. **+ New Pipeline** をクリックします。
3. **Filter** フィールドに、テクノロジーパートナーのログのログソースを定義する一意の `source` タグを入力します。例えば、Okta インテグレーションでは、`source:okta` となります。**注**: インテグレーションを通じて送信されるログは、Datadog に送信される前に正しいソースタグでタグ付けされていることを確認してください。
4. オプションで、タグと説明を追加します。
5. **作成**をクリックします。

パイプライン内にプロセッサーを追加することで、データを再構築し、属性を生成することができます。例:

- [日付リマッパー][4]を使用して、ログの正式なタイムスタンプを定義します。
- 属性[リマッパー][5]を使用して、属性キーを標準の [Datadog 属性][6]にリマップします。例えば、クライアント IP を含む属性キーは、Datadog がすぐに使えるダッシュボードでテクノロジーパートナーログを表示できるように、`network.client.ip` にリマップする必要があります。
- [サービスリマッパー][7]を使って、`service` 属性をリマップするか、`source` 属性と同じ値に設定します。
- [grok プロセッサー][8]を使用して、ログ内の値を抽出し、検索や分析に役立てることができます。
- [メッセージリマッパー][9]を使って、ログの公式メッセージを定義し、特定の属性を全文で検索できるようにします。

全ログプロセッサーの一覧は、[プロセッサー][10]を参照してください。

### ログエクスプローラーにファセットを設定する

すぐに使えるダッシュボードウィジェットに表示される[ファセット][12]は、[ログエクスプローラー][16]でオプションで作成することができます。

- [ファセット][14]は、相対的な洞察を得たり、一意の値をカウントするために使用されます。
- [メジャー][15]は、ある範囲での検索に使用されるファセットの一種です。例えば、レイテンシー期間のメジャーを追加すると、特定のレイテンシー以上のすべてのログを検索することができます。**注**: メジャーファセットの[単位][11]は、属性が何を表すかに基づいて定義されます。

ファセットまたはメジャーを追加するには

1. ファセットまたはメジャーを追加したい属性を含むログをクリックします。
2. ログパネルで、属性の横にある歯車アイコンをクリックします。
3. **Create facet/measure for @attribute** を選択します。
4. メジャーの場合、単位を定義するには、**Advanced options** をクリックします。属性が表すものに基づいて、単位を選択します。
4. **Add** をクリックします。

ファセットリストを簡単に移動できるように、類似のファセットをグループ化します。インテグレーションログに固有のフィールドについては、`source` タグと同じ名前のグループを作成します。

1. ログパネルで、新しいグループに入れたい属性の横にある歯車アイコンをクリックします。
2. **Edit facet/measure for @attribute** を選択します。属性のファセットがまだ存在しない場合は、**Create facet/measure for @attribute** を選択します。
3. **Advanced options** をクリックします。
4. **Group** フィールドに、新しいグループの名前を入力し、**New group** を選択します。
5. **Update** をクリックします。

標準の Datadog 属性は、それぞれの特定のグループの下にある[デフォルトの標準属性リスト][6]を参照してください。

## インテグレーションのレビューとデプロイメント

Datadog は、ログインテグレーションをレビューし、テクノロジーパートナーにフィードバックを提供します。一方、テクノロジーパートナーはレビューし、それに応じて変更を加えます。このレビュープロセスは、メールで行われます。

レビューが完了すると、Datadog は新しいログインテグレーションアセットを作成し、デプロイします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/api/latest/logs/#send-logs
[2]: https://docs.datadoghq.com/ja/getting_started/site/
[3]: https://app.datadoghq.com/logs/pipelines
[4]: https://docs.datadoghq.com/ja/logs/log_configuration/processors/?tab=ui#log-date-remapper
[5]: https://docs.datadoghq.com/ja/logs/log_configuration/processors/?tab=ui#remapper
[6]: https://docs.datadoghq.com/ja/logs/log_configuration/attributes_naming_convention/#default-standard-attribute-list
[7]: https://docs.datadoghq.com/ja/logs/log_configuration/processors/?tab=ui#service-remapper
[8]: https://docs.datadoghq.com/ja/logs/log_configuration/processors/?tab=ui#grok-parser
[9]: https://docs.datadoghq.com/ja/logs/log_configuration/processors/?tab=ui#log-message-remapper
[10]: https://docs.datadoghq.com/ja/logs/log_configuration/processors/
[11]: https://docs.datadoghq.com/ja/logs/explorer/facets/#units
[12]: https://docs.datadoghq.com/ja/logs/explorer/facets/
[13]: https://docs.datadoghq.com/ja/logs/log_configuration/pipelines/
[14]: https://docs.datadoghq.com/ja/glossary/#facet
[15]: https://docs.datadoghq.com/ja/glossary/#measure
[16]: https://docs.datadoghq.com/ja/logs/explorer/