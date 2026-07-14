---
aliases:
- /ja/agent/faq/how-do-i-change-the-frequency-of-an-agent-check/
- /ja/agent/faq/agent-5-custom-agent-check/
- /ja/developers/write_agent_check/
further_reading:
- link: /developers/
  tag: ドキュメント
  text: Datadog での開発
title: カスタム Agent チェックの書き方
---

## 概要

このページでは、基本的な「Hello world!」カスタム Agent チェックを構築する手順を説明します。また、チェックの最小収集間隔を変更する方法も示します。

## セットアップ

### インストール

カスタム Agent チェックを作成する前に、[Datadog Agent][1] をインストールしてください。

<div class="alert alert-danger">最新バージョンの Agent と互換性を保つには、カスタム Agent チェックは Python 3 互換である必要があります。</div>

### 構成

1. システムの `conf.d` ディレクトリに移動します。`conf.d` ディレクトリの場所の詳細については、[Agent コンフィギュレーションファイル][2]を参照してください。
2. `conf.d` ディレクトリに、新しい Agent チェック用の新しいコンフィギュレーションファイルを作成します。ファイルに `custom_checkvalue.yaml` という名前を付けます。
3. ファイルを編集して、以下を含めます。
   {{< code-block lang="yaml" filename="conf.d/custom_checkvalue.yaml" >}}
init_config:
instances:
  [{}]
{{< /code-block >}}
4. `checks.d` ディレクトリにチェックファイルを作成します。ファイルに `custom_checkvalue.py` という名前を付けます。

   <div class="alert alert-info">
     <strong>Naming your checks:</strong>
     <ul>
       <li>It's a good idea to prefix your check with <code>custom_</code> to avoid conflicts with the name of a pre-existing Datadog Agent integration. For example, if you have a custom Postfix check, name your check files <code>custom_postfix.py</code> and <code>custom_postfix.yaml</code> instead of <code>postfix.py</code> and <code>postfix.yaml</code>.</li>
       <li>The names of the configuration and check files must match. If your check is called <code>custom_checkvalue.py</code>, your configuration file <i>must</i> be named <code>custom_checkvalue.yaml</code>.</li>
     </ul>
   </div>
5. ファイルを編集して、以下を含めます。
   {{< code-block lang="python" filename="checks.d/custom_checkvalue.py" >}}
from checks import AgentCheck
class HelloCheck(AgentCheck):
  def check(self, instance):
    self.gauge('hello.world', 1)
{{< /code-block >}}
6. [Agent を再起動][3]し、新たに `hello.world` という名前のメトリクスが [Metric Summary][4] に表示されるまで待ちます。

カスタムチェックの動作に問題がある場合は、ファイルの権限を確認してください。チェックファイルは Agent ユーザーが読み取り、実行できる必要があります。その他のトラブルシューティング手順については、[Agent チェックのトラブルシューティング][7]を参照してください。

### 収集間隔の更新

新しいチェックの収集間隔を変更するには、`custom_checkvalue.yaml` ファイル内で `min_collection_interval` 設定を使用し、秒単位で指定します。デフォルト値は 15 秒です。`min_collection_interval` はインスタンスレベルで追加する必要があります。カスタムチェックが複数のインスタンスを監視するように設定されている場合、インスタンスごとに間隔を個別に構成する必要があります。

`min_collection_interval` を `30` に設定しても、必ずしもメトリクスが 30 秒ごとに収集されることは保証されません。Agent のコレクタは 30 秒ごとにチェックを実行しようとしますが、同一の Agent 上で有効なインテグレーションおよびチェックの数によっては、チェックが他のインテグレーションやチェックの後ろでキューに入る可能性があります。もし `check` メソッドが完了するのに 30 秒以上かかる場合、Agent はまだチェックが実行中であることを検知し、次の間隔までその実行をスキップします。

#### 収集間隔を設定

単一のインスタンスの場合、収集間隔を 30 秒に設定するには以下の構成を使用します。

{{< code-block lang="yaml" filename="conf.d/custom_checkvalue.yaml" >}}
init_config:

instances:
  - min_collection_interval: 30
{{< /code-block >}}

以下の例は、`my_service` という名前のサービスを 2 つの異なるサーバーで監視する想定のカスタムチェックで、間隔を変更する方法を示しています。

{{< code-block lang="yaml" >}}
init_config:

instances:
  - host: "http://localhost/"
    service: my_service
    min_collection_interval: 30

  - host: "http://my_server/"
    service: my_service
    min_collection_interval: 30
{{< /code-block >}}

### チェックの検証

チェックが実行されていることを確認するには、次のコマンドを使用します。

{{< code-block lang="shell" >}}
sudo -u dd-agent -- datadog-agent check <CHECK_NAME>
{{< /code-block >}}

チェックが動作していることを確認した後、[Agent を再起動][3]してチェックを含め、データの報告を開始してください。

## コマンドラインプログラムを実行するチェックの書き方

コマンドラインプログラムを実行し、その出力をカスタムメトリクスとしてキャプチャするカスタムチェックを作成することができます。たとえば、チェックで `vgs` コマンドを実行して、ボリュームグループに関する情報を報告できます。

Python インタプリタはマルチスレッドの Go ランタイムに埋め込まれているため、Python 標準ライブラリの `subprocess` や `multithreading` モジュールの使用はサポートされていません。サブプロセス内でコマンドを実行する場合は、`datadog_checks.base.utils.subprocess_output` モジュールの [`get_subprocess_output()` 関数][5]を使用してください。コマンドおよびその引数は、コマンドや引数を文字列としてリスト内に渡します。

たとえば、次のようにコマンドプロンプトで入力されるコマンド:

{{< code-block lang="shell" >}}
vgs -o vg_free
{{< /code-block >}}

次のように `get_subprocess_output()` に渡します。

{{< code-block lang="python" >}}
out, err, retcode = get_subprocess_output(["vgs", "-o", "vg_free"], self.log, raise_on_empty_output=True)
{{< /code-block >}}

コマンドラインプログラムを実行すると、チェックはターミナルのコマンドラインで実行されているのと同じ出力をキャプチャします。出力で文字列処理を実行し、結果で `int()` または `float()` を呼び出して、数値型を返します。

もしサブプロセスの出力に対して文字列処理を行わなかったり、整数または浮動小数点数に変換しなかった場合、チェックはエラーを出さずに実行されますが、メトリクスやイベントを報告しません。また、Agent ユーザーがコマンドが参照するファイルやディレクトリへの正しい権限を持っていない場合、または `get_subprocess_output()` に渡すコマンドを実行するための適切な権限を持っていない場合も、メトリクスやイベントは報告されません。

以下に、コマンドラインプログラムの結果を返すチェックの例を示します。

{{< code-block lang="python" >}}
# ...
from datadog_checks.base.utils.subprocess_output import get_subprocess_output

class LSCheck(AgentCheck):
    def check(self, instance):
        files, err, retcode = get_subprocess_output(["ls", "."], self.log, raise_on_empty_output=True)
        file_count = len(files.split('\n')) - 1  #len() はデフォルトで int 値を返します
        self.gauge("file.count", file_count,tags=['TAG_KEY:TAG_VALUE'] + self.instance.get('tags', []))
{{< /code-block >}}

## ロードバランサーからのデータ送信

カスタム Agent チェックを書く一般的なユースケースは、ロードバランサーから Datadog メトリクスを送信することです。始める前に、[構成](#configuration)のステップに従います。

ロードバランサーからデータを送信するためのファイルを展開するには

1. `custom_checkvalue.py` のコードを次のように置き換えます (`lburl` の値をロードバランサーのアドレスに置き換えます)。
   {{< code-block lang="python" filename="checks.d/custom_checkvalue.py" >}}
import urllib2
import simplejson
from checks import AgentCheck

class CheckValue(AgentCheck):
  def check(self, instance):
    lburl = instance['ipaddress']
    response = urllib2.urlopen("http://" + lburl + "/rest")
    data = simplejson.load(response)

    self.gauge('coreapp.update.value', data["value"])
{{< /code-block >}}

1. `custom_checkvalue.yaml` ファイルを更新します (`ipaddress` をロードバランサーの IP アドレスに置き換えます)。
   {{< code-block lang="yaml" filename="conf.d/custom_checkvalue.yaml" >}}
init_config:

instances:
  - ipaddress: 1.2.3.4
{{< /code-block >}}

1. [Agent を再起動します][3]。1 分以内に、ロードバランサーからメトリクスを送信する `coreapp.update.value` という新しいメトリクスが[メトリクスサマリー][4]に表示されます。
1. このメトリクスの[ダッシュボードを作成][6]します。

## Agent のバージョン管理

次の try/except ブロックを使うと、カスタムチェックがどの Agent バージョンとも互換性を持つようになります。

{{< code-block lang="python" >}}
try:
    # 最初に、古いバージョンの Agent から基本クラスのインポートを試みます
    from datadog_checks.base import AgentCheck
except ImportError:
    # 失敗した場合は、Agent バージョン 6 以降で実行します
    from checks import AgentCheck

# 特別な変数 __version__ の内容は Agent のステータスページに表示されます
__version__ = "1.0.0"

class HelloCheck(AgentCheck):
    def check(self, instance):
        self.gauge('hello.world', 1, tags=['TAG_KEY:TAG_VALUE'] + self.instance.get('tags', []))
{{< /code-block >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/account/settings/agent/latest
[2]: /ja/agent/configuration/agent-configuration-files/#check-configuration-files
[3]: /ja/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[4]: https://app.datadoghq.com/metric/summary
[5]: https://github.com/DataDog/integrations-core/blob/9414403b361e583e8f1ebcdee2f006c384c61045/datadog_checks_base/datadog_checks/base/utils/subprocess_output.py#L22
[6]: /ja/dashboards/
[7]: /ja/agent/troubleshooting/agent_check_status/