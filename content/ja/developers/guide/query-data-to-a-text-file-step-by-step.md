---
aliases:
- /ja/developers/faq/query-data-to-a-text-file-step-by-step
title: Query data to a text file, step by step
---

この記事では、Datadog API を最大限に活用するための環境のセットアップ方法と、[Datadog のパブリック API][1] からローカルファイルにイベント、メトリクス、モニターをプルまたはプッシュする方法について説明します。

前提条件: Python および `pip` がローカルホストにインストールされている必要があります。Windows の場合は、[Windows の Python 2 インストール][2]を参照してください。

1. ターミナルを開きます。
2. macOS では `pwd`、Windows では `dir` を使用してディレクトリを確認します。
3. `mkdir <NAME_OF_THE_FOLDER>` で新しいフォルダーを作成します。
4. `cd <NAME_OF_THE_FOLDER>` でそのフォルダーに移動します。
5. 手順 3 で作成したフォルダーにスクリプト [api_query_data.py][3] をダウンロードし、以下のように編集します。

    a. `<YOUR_DD_API_KEY>` と `<YOUR_DD_APP_KEY>` を [Datadog API キーとアプリケーションキー][4]に置き換えます。

    b. `system.cpu.idle` を、取得するメトリクスに置き換えます。メトリクスのリストは [Datadog メトリクスサマリー][5]に表示されます。

    c. オプションで、`*` をホストに置き換えて、データを絞り込みます。ホストのリストは [Datadog インフラストラクチャーリスト][6]に表示されます。

    d. オプションで、データを収集する期間を変更します。現在の設定は 3600 秒 (1 時間) です。**注**: この期間をあまり長くし過ぎると、[Datadog API 制限][7]に達してしまう可能性があります。

    e. ファイルを保存し、場所を確認します。

これらの設定が完了したら、以下の手順に従います。

1. ベストプラクティスとして、Python パッケージをインストールする仮想環境を作成することをお勧めします。仮想環境マネージャーとしては [virtualenv][8] があります。
2. `virtualenv venv` を実行して、先ほど作成したディレクトリに新しい仮想環境を作成します。
3. `source venv/bin/activate` (Mac/Linux) または `> \path\to\env\Scripts\activate` (Windows) を実行して、環境を有効化します。
4. `pip install datadog` を実行して [Datadog API パッケージ][9]をインストールします。これで、Python ファイルが Datadog API とやり取りできるようになります。
5. ターミナルで、スクリプト `python api_query_data.py` を実行します。

正常に終了するとターミナルにデータが表示され、`out.txt` という名前のファイルがフォルダーに作成されます。

その他の例については、[Datadog API ドキュメント][1]を参照してください。

[1]: /ja/api/
[2]: http://docs.python-guide.org/en/latest/starting/install/win
[3]: /resources/python/api_query_data.py
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://app.datadoghq.com/metric/summary
[6]: https://app.datadoghq.com/infrastructure
[7]: /ja/api/latest/rate-limits/
[8]: https://virtualenv.pypa.io/en/stable
[9]: https://pypi.org/project/datadog