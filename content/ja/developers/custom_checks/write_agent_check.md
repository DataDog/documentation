---
title: カスタム Agent チェックの作成
aliases:
    - /agent/faq/how-do-i-change-the-frequency-of-an-agent-check/
    - /agent/faq/agent-5-custom-agent-check/
    - /developers/write_agent_check/
further_reading:
- link: "/developers/"
  tag: "ドキュメント"
  text: "Datadog での開発"
---

## 概要

このページでは、基本的な "Hello world!" カスタム Agent チェックの作成プロセスを説明します。また、チェックのための最小収集間隔を変更する方法も示されています。

## セットアップ

### インストール

カスタム Agent チェックを作成する前に、[Datadog Agent][1] をインストールしてください。

<div class="alert alert-warning">最新バージョンの Agent を使用するには、カスタム Agent チェックがPython 3 に対応している必要があります。</div>

### コンフィギュレーション

1. システムの `conf.d` ディレクトリに移動します。`conf.d` ディレクトリの位置については、[Agent configuration files][2] を参照してください。
2. `conf.d` ディレクトリに、新しい Agent チェック用のコンフィギュレーションファイルを作成します。  ファイルに `custom_checkvalue.yaml` という名前を付けます。
3. このファイルを編集して、以下を含めます。
   {{< code-block lang="yaml" filename="conf.d/custom_checkvalue.yaml" >}}
init_config:
instances:
  [{}]
{{< /code-block >}}
4. `checks.d` ディレクトリにチェックファイルを作成します。ファイルに `custom_checkvalue.py` という名前を付けます。
   
   <div class="alert alert-info">
     <strong>チェックに名前を付ける:</strong>
     <ul>
       <li>既存の Datadog Agent インテグレーションの名前との競合を避けるために、チェックの前に <code>custom_</code> を付けることをお勧めします。たとえばカスタム Postfix チェックがある場合には、チェックファイル名を <code>postfix.py</code> や<code>postfix.yaml</code> ではく、<code>custom_postfix.py</code> や <code>custom_postfix.yaml</code> とします。</li>
       <li>コンフィギュレーションファイルとチェックファイルの名前が一致している必要があります。<code>custom_checkvalue.py</code> という名前のチェックの場合、コンフィギュレーションファイルに <code>custom_checkvalue.yaml</code>という名前を付ける<i>必要があります</i>。</li>
     </ul>
   </div>
5. このファイルを編集して、以下を含めます。
   {{< code-block lang="python" filename="checks.d/custom_checkvalue.py" >}}
from checks import AgentCheck
class HelloCheck(AgentCheck):
  def check(self, instance):
    self.gauge('hello.world', 1)
{{< /code-block >}}
6. [Agent を再起動][3]し、新しいメトリクス `hello.world` が [Metric Summary][4] に表示されるまで待ちます。

カスタムチェックが機能しない場合は、ファイルの権限を確認してください。チェックファイルは、Agent ユーザーが読み取って実行できる必要があります。詳しいトラブルシューティングの手順については、[Troubleshoot an Agent Check][7]を参照してください。

### 収集間隔の更新

チェックの収集間隔を変更するには、`custom_checkvalue.yaml` ファイルで `min_collection_interval` 設定を使用し、秒単位で設定値を指定します。デフォルト値は 15 秒です。インスタンスレベルで `min_collection_interval` を追加する必要があります。カスタムチェックが複数のインスタンスを監視するように設定されている場合は、インスタンスごとに間隔を個別に構成する必要があります。

`min_collection_interval` を `30` に設定しても、メトリクスが 30 秒ごとに収集されることは保証されません。Agent コレクターは 30 秒ごとにチェックを実行しようとしますが、同じ Agent で有効になっているインテグレーションやチェックの数によっては、チェックが他のインテグレーションやチェックの後にキューに入れられる可能性があります。`check`  メソッドが完了するまでに 30 秒以上かかる場合、Agent はチェックがまだ実行中であることを認識し、次の間隔までその実行をスキップします。

#### 収集間隔の設定

1 つのインスタンスの場合、収集間隔を 30 秒に設定するには以下のコンフィギュレーションを使用します。

{{< code-block lang="yaml" filename="conf.d/custom_checkvalue.yaml" >}}
init_config:

instances:
  - min_collection_interval: 30
{{< /code-block >}}

以下の例は、2 つの異なるサーバーで `my_service` という名前のサービスを監視する仮想のカスタムチェックで間隔を変更する方法を示しています。

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

チェックが実行されていることを検証するには、次のコマンドを使用します。

{{< code-block lang="shell" >}}
sudo -u dd-agent -- datadog-agent check <CHECK_NAME>
{{< /code-block >}}

チェックが動作していることを検証した後、[Agent を再起動][3]してチェックを含め、データの報告を開始してください。

## コマンドラインプログラムを実行するチェックの作成

コマンドラインプログラムを実行し、その出力をカスタムメトリクスとしてキャプチャするカスタムチェックを作成することができます。たとえば、ボリュームグループに関する情報を報告する `vgs` コマンドをチェックで実行できます。

Python インタープリターはマルチスレッドの Go ランタイムに組み込まれているため、Python 標準ライブラリの `subprocess` または `multithreading` モジュールの使用はサポートされていません。チェック内でサブプロセスを実行するには、モジュール `datadog_checks.base.utils.subprocess_output` の [`get_subprocess_output()` 関数][5]を使用します。コマンドとその引数は、それらが文字列として記述されているリストの形式で `get_subprocess_output()` に渡されます。

たとえば、次のようにコマンドプロンプトで入力されるコマンドは:

{{< code-block lang="shell" >}}
vgs -o vg_free
{{< /code-block >}}

次のように `get_subprocess_output()` に渡される必要があります。

{{< code-block lang="python" >}}
out, err, retcode = get_subprocess_output(["vgs", "-o", "vg_free"], self.log, raise_on_empty_output=True)
{{< /code-block >}}

コマンドラインプログラムを実行すると、チェックはターミナルのコマンドラインで実行した場合と同じ出力をキャプチャします。出力で文字列処理を行い、その結果に対して `int()` または `float()` を呼び出して数値型を返すようにします。

サブプロセスの出力に対して文字列処理を行わない場合、または文字列処理で整数や浮動小数点数が返されない場合、チェックはエラーなく実行されているように見えますが、メトリクスやイベントを報告しません。また、Agent ユーザーがコマンドで参照されるファイルやディレクトリに対して正しい権限を持っていない場合、または `get_subprocess_output()` の引数として渡されたコマンドを実行するための正しい権限を持っていない場合も、チェックはメトリクスまたはイベントを返しません。

以下に、コマンドラインプログラムの結果を返すチェックの例を示します。

{{< code-block lang="python" >}}
# ...
from datadog_checks.base.utils.subprocess_output import get_subprocess_output

class LSCheck(AgentCheck):
    def check(self, instance):
        files, err, retcode = get_subprocess_output(["ls", "."], self.log, raise_on_empty_output=True)
        file_count = len(files.split('\n')) - 1  #len() returns an int by default
        self.gauge("file.count", file_count,tags=['TAG_KEY:TAG_VALUE'] + self.instance.get('tags', []))
{{< /code-block >}}

## ロードバランサーからのデータ送信

カスタム Agent チェックを作成する一般的なユースケースは、ロードバランサーから Datadog メトリクスを送信することです。開始する前に、ssコンフィギュレーションssの手順に従ってください。

ロードバランサーからデータを送信するためのファイルを展開するには、次の手順に従います。

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

1. [Agent を再起動します][3]。1 分以内に、ロードバランサーからメトリクスを送信する `coreapp.update.value` という新しいメトリクスが [Metric Summary][4] に表示されます。
1. このメトリクスの[ダッシュボードを作成][6]します。

## Agent のバージョン管理

次の try/except ブロックを使うと、カスタムチェックがどの Agent バージョンとも互換性を持つようになります。

{{< code-block lang="python" >}}
try:
    # first, try to import the base class from new versions of the Agent
    from datadog_checks.base import AgentCheck
except ImportError:
    # if the above failed, the check is running in Agent version < 6.6.0
    from checks import AgentCheck

# content of the special variable __version__ will be shown in the Agent status page
__version__ = "1.0.0"

class HelloCheck(AgentCheck):
    def check(self, instance):
        self.gauge('hello.world', 1, tags=['TAG_KEY:TAG_VALUE'] + self.instance.get('tags', []))
{{< /code-block >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/account/settings/agent/latest
[2]: /agent/configuration/agent-configuration-files/#check-configuration-files
[3]: /agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[4]: https://app.datadoghq.com/metric/summary
[5]: https://github.com/DataDog/integrations-core/blob/9414403b361e583e8f1ebcdee2f006c384c61045/datadog_checks_base/datadog_checks/base/utils/subprocess_output.py#L22
[6]: /dashboards/
[7]: /agent/troubleshooting/agent_check_status/
