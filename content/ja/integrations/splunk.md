---
categories:
- monitoring
- notification
ddtype: クローラー
dependencies: []
description: Splunk からイベントをキャプチャして、キーメトリクスグラフ上に重ねて表示
doc_link: https://docs.datadoghq.com/integrations/splunk/
git_integration_title: splunk
has_logo: true
integration_title: Splunk
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: splunk
public_title: Datadog-Splunk インテグレーション
short_description: Splunk からイベントをキャプチャして、キーメトリクスグラフ上に重ねて表示
version: '1.0'
---

## 概要

Splunk のログモニターを接続して、以下のことができます。

* レポートの通知を受けることができます。
* レポートを他のメトリクスに関連付けることができます。
* これらのイベントについてチームでコラボレーションできます。

## セットアップ
### インストール

Splunk からのレポートを Datadog で受け取るには、以下のコマンドを実行して、Splunk サーバーに ```datadog``` Python ライブラリをインストールする必要があります。

```bash
pip install datadog
```

インストールが終了したら、[API キーとアプリケーションキーを取得][1]し、以下の ```dog-splunk.sh``` スクリプトを $SPLUNK_HOME/bin/scripts に追加します。

```bash

export API_KEY=YOURAPIKEYHERE
export APP_KEY=YOURAPPKEYHERE

dog --api-key $API_KEY --application-key $APP_KEY event post \
"Found $SPLUNK_ARG_1 events in splunk" \
"Matching $SPLUNK_ARG_2 based on $SPLUNK_ARG_5," \
" from report $SPLUNK_ARG_4. More details at $SPLUNK_ARG_6." \
 --aggregation_key $SPLUNK_ARG_3 --type splunk
```

スクリプトが実行可能で、```splunk``` ユーザーおよびグループによって所有されていることを確認してください。

スクリプトを配置したら、新しいレポートを作成するか、既存のレポートに移動します。**Edit Schedule** をクリックし、**Schedule the Report** の横のチェックボックスをオンにします。**Run a Script** オプションまで移動し、Filename テキストボックスに「```dog-splunk.sh```」と入力します。**Save** をクリックすると、イベントストリームで結果の表示が開始されます。


## トラブルシューティング

splunkd.log で runshellscript の各実行にエラーコードが表示されている場合は、最後のコマンドの末尾に ```> dog_splunk_trace.txt 2>&1``` を追加します。これで、```$SPLUNK_HOME/etc/apps/search/bin/dog_splunk_trace.txt``` ファイルが作成されます。このファイルで、問題の詳細を確認できます。

トレースファイルに、```dog: error: unrecognized arguments: OR failed OR severe``` に続けて ```dog``` コマンドの使用方法ヘルプのような文字列がある場合は、おそらく最後の行の $SPLUNK_ARG_3 を単一引用符で囲む必要があります。

トレースファイルに ```pkg_resources.DistributionNotFound``` などの文字列で終わるトレースバックが含まれている場合は、以下に示すように、dog-splunk.sh スクリプトの最初に 3 つの unset を追加します。

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

|               |                                                                               |
| :------------ |:------------------------------------------------------------------------------|
| $SPLUNK_ARG_0 | スクリプト名                                                                   |
| $SPLUNK_ARG_1 | 返されるイベントの数                                                     |
| $SPLUNK_ARG_2 | 検索条件                                                                  |
| $SPLUNK_ARG_3 |  完全修飾クエリ文字列                                                  |
| $SPLUNK_ARG_4 | 保存した検索の名前                                                          |
| $SPLUNK_ARG_5 | トリガー理由 (「The number of events was greater than 1 (イベント数が 2 以上だった)」など)       |
| $SPLUNK_ARG_6 | 保存した検索を表示するブラウザ URL                                          |
| $SPLUNK_ARG_7 | バージョン 3.6 で削除されたオプション                                               |
| $SPLUNK_ARG_8 | この検索の結果が保存されるファイル (未加工の結果を格納)   |


イベントのテキストを変更できます。たとえば、Datadog の @mention を使用して、これらのレポートをユーザーに通知できます。


------

このドキュメントは、2015 年 10 月 28 日に、[AWS 上の Splunk Enterprise AMI][2] を使用して検証されました。


[1]: https://app.datadoghq.com/account/settings#api
[2]: https://aws.amazon.com/marketplace/pp/B00PUXWXNE/ref=sp_mpg_product_title?ie=UTF8&sr=0-3


{{< get-dependencies >}}
