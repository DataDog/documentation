---
categories:
  - cloud
  - google cloud
ddtype: クローラー
dependencies: []
description: プロジェクトのメトリクスを収集してプロジェクトバージョン間で比較
doc_link: 'https://docs.datadoghq.com/integrations/google_app_engine/'
git_integration_title: google_app_engine
has_logo: true
integration_title: Google App Engine
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: google_app_engine
public_title: Datadog-Google App Engine インテグレーション
short_description: プロジェクトのメトリクスを収集してプロジェクトバージョン間で比較 versions.
version: '1.0'
---
## 概要

Google App Engine インテグレーションを Python プロジェクトにインストールして、以下のことができます。

* Google App Engine サービスのメトリクス (メモリキャッシュ、タスクキュー、データストア) を確認できます。
* リクエストに関するメトリクス (表示パーセンタイル、レイテンシー、コスト) を確認できます。
* Google App Engine のメトリクスをバージョンごとにタグ付けし、異なるバージョンのパフォーマンスを比較できます。

Datadog にカスタムメトリクスを送信することもできます。

## セットアップ
### インストール

すべてのメトリクスを収集するには、Google App Engine プロジェクトで課金を有効にする必要があります。

1. ディレクトリをプロジェクトのアプリケーションディレクトリに切り替えます。
2. Datadog Google App Engine モジュールを複製します。

        git clone https://github.com/DataDog/gae_datadog

3. プロジェクトの `app.yaml` ファイルを編集します。

    a. app.yaml ファイルに Datadog ハンドラーを追加します。

        handlers:
          # キャッチオールルートによって上書きされないように
          # リストの先頭に置くことをお勧めします。
          - url: /datadog
            script: gae_datadog.datadog.app


    b. API キーを設定します。これは、ハンドラーセクションではなく、ファイルの最上位レベルに置く必要があります。

        env_variables:
          DATADOG_API_KEY: '<YOUR_DATADOG_API_KEY>'

    c. dogapi モジュールはセキュリティ保護された TLS 接続経由でメトリクスとイベントを送信するため、app.yaml に ssl モジュールを追加します。

        libraries:
          - name: ssl
            version: "latest"

4. ```dogapi``` を requirements.txt ファイルに追加します。

        echo dogapi >> requirements.txt

5. requirements.txt をインストールします。

        pip install -r requirements.txt -t lib/

6. アプリケーションをデプロイします。言語固有のデプロイコマンドについては、[Google App Engine のドキュメント][1]を参照してください。
Python アプリの場合は、次のようになります。

        appcfg.py -A <project id> update app.yaml

7. インテグレーション構成画面の最初のテキストボックスに、アプリケーションの URL を入力します。Google 開発者コンソールでタスクキューを使用している場合は、それらもここで追加できます。

この時点で、環境に関するさまざまなメトリクスが取得されます。また、アプリがどの言語で記述されているかにかかわらず、その言語用のライブラリを使用して、アプリをさらに詳しく計測することもできます。

すべての公式/コミュニティ寄稿の API および DogStatsD クライアントライブラリのリストについては、[ライブラリ ページ][2]を参照してください。

## 収集データ
### メトリクス
{{< get-metrics-from-git "google_app_engine" >}}


### イベント
Google App Engine インテグレーションには、イベントは含まれません。

### サービスのチェック
Google App Engine インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://cloud.google.com/appengine/kb
[2]: https://docs.datadoghq.com/ja/libraries
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/google_app_engine/google_app_engine_metadata.csv
[4]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}