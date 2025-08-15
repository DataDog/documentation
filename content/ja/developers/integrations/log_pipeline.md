---
aliases:
- /ja/logs/faq/partner_log_integration
- /ja/developers/integrations/log_integration/
description: Datadog ログ インテグレーション パイプラインの作成方法を学ぶ。
further_reading:
- link: /integrations/#cat-log-collection
  tag: ドキュメント
  text: 既存の Datadog ログ インテグレーションを確認する
- link: /logs/explorer/facets/
  tag: ドキュメント
  text: ログ ファセットについて学ぶ
- link: /logs/explorer/
  tag: ドキュメント
  text: Log Explorer について学ぶ
- link: /logs/log_configuration/pipelines/
  tag: ドキュメント
  text: ログ パイプラインについて学ぶ
title: ログ パイプラインの作成
---
## 概要

このページでは、テクノロジー パートナーがログ パイプラインを作成する手順を説明します。インテグレーションがログを Datadog に送信する場合、ログ パイプラインが必要です。


インテグレーションを開発して Datadog にログを送信する際は、ユーザーに最良の体験を提供するために次のガイドラインに従ってください。

## ベスト プラクティス

ログ パイプラインを作成する前に、以下のガイドラインとベスト プラクティスを検討してください:

インテグレーションはサポートされている Datadog ログ エンドポイントを使用すること
: インテグレーションは、Datadog が公開しているログ取り込み用の [サポートされているエンドポイント][23] のいずれかを使用する必要があります。代わりに [Logs Ingestion HTTP エンドポイント][1] を使用して Datadog にログを送信することもできます。

インテグレーションはすべての Datadog サイトをサポートすること
: ユーザーは必要に応じて異なる Datadog サイトを選択できなければなりません。サイト間の違いについては [Datadog サイトの開始方法][2] を参照してください。 </br></br> Datadog サイトのエンドポイントは `http-intake.logs`.{{< region-param key="dd_site" code="true" >}} です。

インテグレーション設定時にユーザーがカスタム タグを付与できるようにする
: タグは、インテグレーションのログ ペイロードの JSON 本文内でキーと値の属性として設定できます。Datadog は、インテグレーションに対してユーザーがカスタム タグを設定できるようにすることを推奨します。インテグレーションが [API 経由でログを送信][1] する場合は、`ddtags=<TAGS>` クエリ パラメーターを使用してタグを設定することもできます。

インテグレーションのログの `source` タグはインテグレーション名に設定する
: Datadog は、アプリケーションの場合 `source:okta` のように、`source` タグを `<integration_name>` に設定することを推奨します。`source` は Datadog のエンドポイントへログを送信する前に設定する必要があり、Datadog UI で再マッピングすることはできません。 </br></br> `source` タグは小文字で、ユーザーが編集できないようにする必要があります。これはインテグレーション パイプラインとダッシュボードを有効にするために使用されます。

可能な限り、JSON 本文に配列を含むログの送信を避ける
: ログに配列データを送信することは可能ですが、[ファセット化][24] できないため、Datadog は配列の使用を推奨していません。

Datadog API キーをログに記録しない
: Datadog API キーは、ヘッダーまたは API リクエストの HTTP パスの一部として渡すことができます。例については [Send Logs API ドキュメント][1] を参照してください。セットアップで API キーをログに記録することは避けてください。

Datadog アプリケーション キーを使用しない
: Datadog アプリケーション キーは HTTP エンドポイントを使用してログを送信する際には不要です。

## ログ インテグレーション アセットの作成

Datadog パートナー アカウント内で、ログ インテグレーション アセットを直接作成および設計できます。

ログ インテグレーションは、[パイプライン][13] と関連する [ファセット][12] の 2 種類のアセットで構成されます。さまざまなテクノロジーやアプリケーションからログを集中管理すると、多くのユニークな属性が生成される可能性があります。すぐに利用できるダッシュボードを使用するには、テクノロジー パートナー インテグレーションはインテグレーション作成時に Datadog の [標準ネーミング規則][17] に従う必要があります。

Datadog インテグレーションの設計を確定し、Datadog のログ エンドポイントにログを正常に送信したら、ログ パイプラインとファセットを定義してインテグレーションのログを強化および構造化します。

Datadog テクノロジー パートナーになる方法や、インテグレーション開発用サンドボックスへのアクセス方法については、[インテグレーションの構築][18] を参照してください。

<div class="alert alert-warning">Datadog のインテグレーション チームによるレビューを受けるには、ログ インテグレーションにアセットが含まれ、パイプライン プロセッサまたはファセットが設定されている必要があります。</div>

### パイプラインの概要

Datadog に送信されたログは、パイプライン プロセッサを使用して [ログ パイプライン][13] で処理されます。これらのプロセッサにより、ユーザーは属性情報を解析・リマップ・抽出でき、ログを強化してプラットフォーム全体で標準化することができます。

#### パイプラインの作成

パイプライン プロセッサで特定のログを処理するログ パイプラインを作成します。


1. [**Pipelines**][3] ページで **+ New Pipeline** をクリックします。
2. **Filter** フィールドに、テクノロジー パートナーのログ ソースを定義する一意の `source` タグを入力します。例: Okta インテグレーションの場合 `source:okta`。
**注**: インテグレーション経由で送信されるログに、Datadog へ送信する前に正しい source タグが付いていることを確認してください。
3. 必要に応じて、タグと説明を追加します。
4. **Create** をクリックします。

パイプラインを設定したら、プロセッサを追加してログをさらに強化・構造化します。
#### パイプライン プロセッサの追加

パイプライン プロセッサを定義する前に、[Datadog の Standard Attributes][6] を確認してください。

パイプライン内でプロセッサを使用してデータを強化・再構築し、ログ属性を生成します。すべてのログ プロセッサの一覧については、[プロセッサ][10] ドキュメントを参照してください。

##### 要件

アプリケーションのログ属性を Datadog の Standard Attributes にマップする
: 可能な限り [Attribute Remapper][5] を使用して属性キーを [Datadog Standard Attributes][6] にマップします。たとえば、ネットワーク サービス クライアント IP を示す属性は `network.client.ip` にリマップする必要があります。

ログの `service` タグをテレメトリを生成するサービス名にマップする
: [Service Remapper][7] を使用して `service` 属性をリマップします。`source` と [service][26] が同じ値の場合、`service` タグを `source` タグにリマップします。`service` タグは小文字である必要があります。

ログの内部タイムスタンプを Datadog の公式タイムスタンプにマップする
: [Date Remapper][4] を使用してログの公式タイムスタンプを定義します。ログのタイムスタンプが [標準の date 属性][28] にマップされない場合、Datadog は取り込み時刻をタイムスタンプとして設定します。

ログのカスタム status 属性を公式 Datadog `status` 属性にマップする
: [Status Remapper][25] を使用してログの `status` をリマップするか、HTTP ステータス コードのように範囲にマップされる場合は [Category Processor][19] を使用します。

ログのカスタム message 属性を公式 Datadog `message` 属性にマップする
: アプリケーション ログが標準の message 属性にマップされていない場合は、[メッセージ リマッパー][9] を使用してログの公式メッセージを定義します。これにより、ユーザーはフリー テキスト検索を利用できます。

ログ内のカスタム属性にネームスペースを設定する
: [Datadog Standard Attribute][6] にマップされない一般的なログ属性で [ファセット][14] にマップされるものは、ネームスペースを設定する必要があります。例: `file` → `integration_name.file`。
[Attribute Remapper][5] を使用して属性キーを新しいネームスペース付き属性に設定します。

1. 作成したパイプラインを展開し、**Add Processor** をクリックしてプロセッサを追加し始めます。
2. インテグレーションのログが JSON 形式でない場合は、[Grok Processor][8] を追加して属性情報を抽出します。Grok プロセッサは属性を解析し、リマップや追加処理の前にログを強化します。
3. 属性を抽出した後、[Attribute Remapper][5] を使用して可能な限り [Datadog の Standard Attributes][6] にリマップします。
4. [Date Remapper][4] を使用して、インテグレーションのログのタイムスタンプを公式 Datadog タイムスタンプに設定します。
5. 高度な処理やデータ変換には、追加の [プロセッサ][10] を活用してください。
例: `Arithmetic Processor` で属性に基づく計算を行ったり、`String Builder Processor` で複数の文字列属性を連結できます。

**ヒント**
* `preserveSource:false` を使用してログ属性をリマップする際に元の属性を削除すると、混乱を避けて重複を排除できます。
* 最適な grok 解析性能を維持するため、`%{data:}` や `%{regex(".*"):}` などのワイルドカード マッチャーは避け、解析ステートメントをできる限り具体的にしてください。
* プロセッサの記述と Standard Attributes の活用方法については、無料コース [Logs Processing をより深く学ぶ][20] をご覧ください。

### ファセットの概要

ファセットとは、検索結果をフィルターし絞り込むために使用できる特定の定性的または定量的な属性です。ファセットは検索結果をフィルターするために必ずしも必要ではありませんが、ユーザーが検索を細かく絞り込む際に利用可能なディメンションを理解する上で重要な役割を果たします。

パイプラインを公開すると、Standard Attribute 用のファセットは Datadog により自動的に追加されます。対象の属性を [Datadog の Standard Attribute][6] にリマップすべきかどうかを確認してください。

すべての属性がファセットとして使用されるわけではありません。インテグレーションにおけるファセットの必要性は次の 2 点に集約されます:
* **ファセットはログをフィルターするためのシンプルなインターフェイスを提供**します。これは Log Management のオート コンプリート機能で活用され、ユーザーがログ内のキー情報を検索・集約できるようにします。
* **ファセットにより可読性の低い属性にわかりやすいラベルを付け替える**ことが可能になります。例: `@deviceCPUper` → `Device CPU Utilization Percentage`。

[Log Explorer][16] で [ファセット][12] を作成できます。

#### ファセットの作成

ファセットを正しく定義することは、分析、モニター、および Datadog の Log Management 製品全体の集計機能でインデックス化されたログの使いやすさを高めるために重要です。

ファセットは、Log Management 全体のオート コンプリート機能を充実させることでアプリケーション ログの検索性を向上させます。

<div class="alert alert-info">定量的なファセットは "メジャー" と呼ばれ、リレーショナル オペレーターを使用して数値範囲でログをフィルターできます。
たとえば、レイテンシー属性のメジャーを使用すると、特定の期間を超えるすべてのログを検索できます。</div>

##### 要件

カスタム ファセットにマップされる属性はまずネームスペース化する必要がある
: [Datadog の Standard Attribute][6] にマップされていない汎用カスタム属性をカスタム [ファセット][14] で使用する場合は、ネームスペース化が必要です。[Attribute Remapper][5] を使用して属性にインテグレーション名のネームスペースを付与できます。
例: `attribute_name` を `integration_name.attribute_name` にリマップします。

カスタム ファセットは既存の Datadog ファセットを重複しないこと
: 既存の Datadog 標準ファセットとの混同を避けるため、[Datadog Standard Attributes][6] にすでにマップされているファセットと重複するカスタム ファセットは作成しないでください。

カスタム ファセットは `source` 名の下にグループ化すること
: カスタム ファセットを作成する際は、グループを割り当てます。`Group` 値に `source` (インテグレーション名と同じ) を設定してください。

カスタム ファセットはマップされた属性と同じデータ型を持つこと
: ファセットのデータ型 (String、Boolean、Double、Integer) は、マップされた属性と同じ型にしてください。型が一致しないと、ファセットが正しく機能せず、正しく表示されません。

**ファセットまたはメジャーを追加**

1. ファセットまたはメジャーを追加したい属性を含むログをクリックします。
2. **ログ パネル**で該当属性の横にある **Cog icon** をクリックします。
3. **Create facet/measure for @attribute** を選択します。
4. メジャーの単位を定義する場合は **Advanced options** をクリックし、属性を表す単位を選択します。
**注**: メジャーの [単位][11] は属性が表す内容に基づいて定義してください。
5. ファセット **Group** を指定して Facet List を整理します。グループが存在しない場合は **New group** を選択し、source タグと一致する名前を入力して説明を追加します。
6. **Add** をクリックしてファセットを作成します。

#### ファセットの設定と編集

1. **ログ パネル**で、設定またはグループ化したい属性の横にある **Cog icon** をクリックします。
2. 既存のファセットがある場合は **Edit facet/measure for @attribute**、ない場合は **Create facet/measure for @attribute** を選択します。
3. 完了したら **Add** または **Update** をクリックします。

**ヒント**
* メジャーには可能な限り単位を設定してください。メジャーには [単位][27] を割り当てることができます。利用可能な単位ファミリーは `TIME` と `BYTES` で、`millisecond` や `gibibyte` などがあります。
* ファセットには説明を設定できます。明確な説明を追加すると、ユーザーがファセットを効果的に利用しやすくなります。
* `preserveSource:true` オプションを使用して属性をリマップし元の属性を保持する場合、ファセットはどちらか一方の属性にのみ定義してください。
* パイプライン の `.yaml` 構成ファイルでファセットを手動設定する場合、ファセットには `source` が割り当てられる点に注意してください。これは属性を取得した場所を示し、属性の場合は `log`、タグの場合は `tag` になります。

## インテグレーションのレビューとデプロイ

Datadog は、本ページに記載されたガイドラインと要件に基づいてログ インテグレーションをレビューし、GitHub を通じてテクノロジー パートナーにフィードバックを提供します。テクノロジー パートナーはそれを確認し、必要に応じて修正を行います。

レビュー プロセスを開始するには、[Logs Configuration ページ][3] の **Export** アイコンを使用して、ログ パイプラインと関連するカスタム ファセットをエクスポートします。

{{< img src="developers/integrations/export_pipeline.png" alt="Datadog でログ パイプラインをエクスポートするには Export Pipeline アイコンをクリックします" width="50%">}}

インテグレーションが Datadog に送信すると想定される **すべて** の属性を含む生ログ サンプルを同梱してください。生ログとは、Datadog に送信 **される前** にソース アプリケーションから直接生成された生のメッセージです。

ログ パイプラインをエクスポートすると、2 つの YAML ファイルが生成されます:

* カスタム ファセット、Attribute Remapper、Grok Parser を含むログ パイプライン。エクスポート ファイル名: `pipeline-name.yaml`
* 提供した生ログ サンプルと空の `result` セクションを含むファイル。エクスポート ファイル名: `pipeline-name_test.yaml`

**注**: ブラウザーによっては、ファイル ダウンロードを許可するよう設定を調整する必要があります。

これらのファイルをダウンロードしたら、GitHub の [インテグレーションの Pull Request][22] に移動し、**Assets** > **Logs** ディレクトリに追加します。Logs フォルダーがまだ無い場合は作成できます。

Pull Request では検証が自動で実行され、提供された生ログと照合してパイプラインを検証します。この結果を `pipeline-name_test.yaml` ファイルの `result` セクションとして設定できます。
検証が再実行され、問題が検出されなければログ検証は成功します。

よくある 3 つの検証エラー
1. 両方の YAML ファイル内の `id` フィールド: `id` がインテグレーションの `manifest.json` 内の `app_id` と一致していることを確認し、パイプラインをインテグレーションに関連付けます。
2. `result` を提供していない: 提供した生ログをパイプラインに適用した結果が正しければ、その出力を取り、例示用生ログを含む YAML ファイルの `result` フィールドに追加してください。
3. `service` をパラメーターとして送信している: ログ ペイロード内ではなくパラメーターで `service` を送信する場合、ログ サンプルの下に `service` フィールドを yaml ファイル内で指定する必要があります。

検証に合格すると、Datadog が新しいログ インテグレーション アセットを作成してデプロイします。質問がある場合は Pull Request のコメントとして追加してください。Datadog チームは 2～3 営業日以内に回答します。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/api/latest/logs/#send-logs
[2]: https://docs.datadoghq.com/ja/getting_started/site/
[3]: https://app.datadoghq.com/logs/pipelines
[4]: https://docs.datadoghq.com/ja/logs/log_configuration/processors/?tab=ui#log-date-remapper
[5]: https://docs.datadoghq.com/ja/logs/log_configuration/processors/?tab=ui#remapper
[6]: https://docs.datadoghq.com/ja/standard-attributes?product=log+management
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
[17]: https://docs.datadoghq.com/ja/logs/log_configuration/attributes_naming_convention/#standard-attributes
[18]: https://docs.datadoghq.com/ja/developers/integrations/?tab=integrations
[19]: https://docs.datadoghq.com/ja/logs/log_configuration/processors/?tab=ui#category-processor
[20]: https://learn.datadoghq.com/courses/going-deeper-with-logs-processing
[21]: https://partners.datadoghq.com/
[22]: https://docs.datadoghq.com/ja/developers/integrations/create_a_tile/?tab=buildatileontheintegrationspage#open-a-pull-request
[23]: https://docs.datadoghq.com/ja/logs/log_collection/?tab=http#additional-configuration-options
[24]: https://docs.datadoghq.com/ja/logs/explorer/search_syntax/#arrays
[25]: https://docs.datadoghq.com/ja/logs/log_configuration/processors/?tab=ui#log-status-remapper
[26]: https://docs.datadoghq.com/ja/getting_started/tagging/#overview
[27]: https://docs.datadoghq.com/ja/logs/explorer/facets/#units
[28]: https://docs.datadoghq.com/ja/logs/log_configuration/pipelines/?tab=date#date-attribute