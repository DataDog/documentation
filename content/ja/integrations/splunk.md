---
app_id: splunk
app_uuid: a3e6047c-501a-4a70-a465-19c0f117d1ac
assets:
  integration:
    auto_install: false
    events:
      creates_events: true
    source_type_name: Splunk
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- notification
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: splunk
integration_id: splunk
integration_title: Splunk
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: splunk
public_title: Splunk
short_description: Splunk からイベントをキャプチャして、主要メトリクスのグラフ上に重ねて表示。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::ログの収集
  - Category::通知
  configuration: README.md#Setup
  description: Splunk からイベントをキャプチャして、主要メトリクスのグラフ上に重ねて表示。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Splunk
---

## 概要

Splunk のログモニターを接続して、以下のことができます。

- レポートの通知を受けることができます。
- レポートを他のメトリクスに関連付けることができます。
- これらのイベントについてチームでコラボレーションできます。

## セットアップ

### APM に Datadog Agent を構成する

Datadog で Splunk からのレポートを受け取るには、Splunk サーバーに `datadog`  Python ライブラリをインストールする必要があります。

```bash
pip install datadog
```

インストールが完了したら、[API キーとアプリケーションキーを取得][1]し、以下の `dog-splunk.sh` スクリプトを $SPLUNK_HOME/bin/scripts に追加します。

```bash

export API_KEY=YOURAPIKEYHERE
export APP_KEY=YOURAPPKEYHERE

dog --api-key $API_KEY --application-key $APP_KEY event post \
"Found $SPLUNK_ARG_1 events in splunk" \
"Matching $SPLUNK_ARG_2 based on $SPLUNK_ARG_5," \
" from report $SPLUNK_ARG_4. More details at $SPLUNK_ARG_6." \
 --aggregation_key $SPLUNK_ARG_3 --type splunk
```

スクリプトが実行可能で、その所有者が `splunk` ユーザーおよびグループであることを確認してください。

スクリプトが完成したら、新しいレポートを作成するか、既存のレポートに移動します。**Edit Schedule** をクリックし、**Schedule the Report** のチェックボックスをオンにします。**Run a Script** オプションまで移動し、Filename テキストボックスに「`dog-splunk.sh` 」と入力します。**Save** をクリックすると、イベントストリームで結果が表示されることを確認できます。

## トラブルシューティング

`splunkd.log` で `runshellscript` を実行するたびにエラーコードが表示される場合は、最後のコマンドの末尾に `> dog_splunk_trace.txt 2>&1` を追加します。これにより、`$SPLUNK_HOME/etc/apps/search/bin/dog_splunk_trace.txt` ファイルが作成されます。このファイルから問題の詳細を確認できます。

トレースファイルで、`dog: error: unrecognized arguments: OR failed OR severe` に続いて `dog`  コマンドの使用方法のヘルプのような文字列が含まれている場合は、最後の行の `\$SPLUNK_ARG_3` を単一引用符で囲みます。

トレースファイルに `pkg_resources.DistributionNotFound` などの文字列で終わるトレースバックが含まれている場合は、`dog-splunk.sh` スクリプトの先頭に 3 つの `unset` を追加します。

```bash
#!/bin/bash
unset PYTHONHOME
unset PYTHONPATH
unset LD_LIBRARY_PATH
export API_KEY=YOURAPIKEYHERE
export APP_KEY=YOURAPPKEYHERE

dog --api-key $API_KEY --application-key $APP_KEY event post \
"Found $SPLUNK_ARG_1 events in splunk" \
"Matching $SPLUNK_ARG_2 based on $SPLUNK_ARG_5," \
" from report $SPLUNK_ARG_4. More details at $SPLUNK_ARG_6." \
 --aggregation_key $SPLUNK_ARG_3 --type splunk
```

## その他の参考資料

### ナレッジベース

スクリプトファイルでは、Splunk で有効な変数が使用されます。メッセージをカスタマイズする場合は、以下の変数テーブルを参照してください。

|                |                                                                             |
| :------------- | :-------------------------------------------------------------------------- |
| \$SPLUNK_ARG_0 | スクリプト名                                                                 |
| \$SPLUNK_ARG_1 | 返されるイベントの数                                                   |
| \$SPLUNK_ARG_2 | 検索条件                                                                |
| \$SPLUNK_ARG_3 |  完全修飾クエリ文字列                                                |
| \$SPLUNK_ARG_4 | 保存した検索の名前                                                        |
| \$SPLUNK_ARG_5 | トリガー理由 (「The number of events was greater than 1 (イベント数が 2 以上だった)」など)     |
| \$SPLUNK_ARG_6 | 保存した検索を表示するブラウザ URL                                        |
| \$SPLUNK_ARG_7 | _option removed in version 3.6_                                             |
| \$SPLUNK_ARG_8 | この検索の結果が保存されるファイル (未加工の結果を格納) |

イベントのテキストを変更できます。たとえば、Datadog の @mention を使用して、これらのレポートをユーザーに通知できます。

---

_このドキュメントは、2015 年 10 月 28 日に [AWS 上の Splunk Enterprise AMI][2] を使用して検証されています。_

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://aws.amazon.com/marketplace/pp/B00PUXWXNE/ref=sp_mpg_product_title?ie=UTF8&sr=0-3