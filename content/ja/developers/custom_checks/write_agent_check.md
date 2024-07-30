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

このページでは、`min_collection_interval` を使用してサンプルのカスタム Agent チェックを作成し、サンプルのカスタムチェックを拡張するためのユースケースの例を示します。カスタムチェックは、Agent ベースのインテグレーションと同じ固定間隔で実行されます。デフォルトでは 15 秒ごとです。

## 計画と使用

### インフラストラクチャーリスト

カスタム Agent チェックを作成するには、まず [Datadog Agent][1] をインストールします。

**注**: Agent v7+ を実行している場合、Agent チェックは Python 3 と互換性がある必要があります。それ以外の場合は Python 2.7+ との互換性が必要です。

### ブラウザトラブルシューティング

1. システムの `conf.d` ディレクトリに移動します。`conf.d` ディレクトリの場所の詳細については、[Agent コンフィギュレーションファイル][2]を参照してください。
2. `conf.d` ディレクトリに、新しい Agent チェック用の新しいコンフィギュレーションファイルを作成します。ファイルに `custom_checkvalue.yaml` という名前を付けます。
3. ファイルを編集して、以下を含めます。
   {{< code-block lang="yaml" filename="conf.d/custom_checkvalue.yaml" >}}
init_config:
instances:
  [{}]
{{< /code-block >}}
4. `checks.d` ディレクトリにチェックファイルを作成します。ファイルに `custom_checkvalue.py` という名前を付けます。
5. ファイルを編集して、以下を含めます。
   {{< code-block lang="python" filename="checks.d/custom_checkvalue.py" >}}
from checks import AgentCheck
class HelloCheck(AgentCheck):
  def check(self, instance):
    self.gauge('hello.world', 1)
{{< /code-block >}}
6. [Agent を再起動します][3]。1 分以内に、[メトリクスサマリー][4]に `hello.world` という新しいメトリクスが表示されます。

**注**: コンフィギュレーションファイルとチェックファイルの名前は一致している必要があります。チェックの名前が `custom_checkvalue.py` の場合、コンフィギュレーションファイルの名前は `custom_checkvalue.yaml` である必要があります。

### 結果

1 分以内に、[メトリクスサマリー][4]に `hello.world` という新しいメトリクスが表示されます。これは `1` の値を送信します。

**注**: カスタムチェックの名前を選択する際は、既存の Datadog Agent インテグレーションの名前との競合を避けるため、名前の前に `custom_` を付けてください。たとえば、カスタム Postfix チェックの場合、チェックファイルの名前は、`postfix.py` と `postfix.yaml` ではなく、`custom_postfix.py` と `custom_postfix.yaml` にします。

### 収集間隔の更新

チェックの収集間隔を変更するには、`custom_checkvalue.yaml` ファイルで `min_collection_interval` を使用します。デフォルト値は `15` です。Agent v6 の場合、`min_collection_interval` をインスタンスレベルで追加し、インスタンスごとに個別に構成する必要があります。例:

{{< code-block lang="yaml" filename="conf.d/custom_checkvalue.yaml" >}}
init_config:

instances:
  - min_collection_interval: 30
{{< /code-block >}}

**注**: `min_collection_interval` を `30` に設定しても、メトリクスが 30 秒ごとに収集されるというわけではなく、最短 30 秒ごとに収集されるという意味になります。コレクターはチェックを 30 秒ごとに実行しようとしますが、同じ Agent で有効にされているインテグレーションとチェックの数によっては、待機しなけらばならない場合があります。さらに、`check` メソッドが終了までに 30 秒以上かかった場合も、Agent はチェックがまだ実行中であると認識し、次の間隔まで実行をスキップします。

### チェックの検証

チェックが実行されていることを確認するには、次のコマンドを使用します。

{{< code-block lang="shell" >}}
sudo -u dd-agent -- datadog-agent check <CHECK_NAME>
{{< /code-block >}}

チェックが実行されていることを確認したら、[Agent を再起動][3]してチェックを含め、Datadog へのデータのレポートを開始します。

## コマンドラインプログラムを実行するチェックの書き方

コマンドラインプログラムを実行し、その出力をカスタムメトリクスとしてキャプチャするカスタムチェックを作成することができます。たとえば、チェックで `vgs` コマンドを実行して、ボリュームグループに関する情報を報告できます。

チェック内でサブプロセスを実行するには、モジュール `datadog_checks.base.utils.subprocess_output` にある [`get_subprocess_output()` 関数][5]を使用します。`get_subprocess_output()` には、コマンドと引数を文字列としてリスト形式で渡します。

### 例

たとえば、次のようにコマンドプロンプトで入力されるコマンド:

{{< code-block lang="shell" >}}
vgs -o vg_free
{{< /code-block >}}

次のように `get_subprocess_output()` に渡します。

{{< code-block lang="python" >}}
out, err, retcode = get_subprocess_output(["vgs", "-o", "vg_free"], self.log, raise_on_empty_output=True)
{{< /code-block >}}

**注**: チェックを実行する Python インタープリターは、マルチスレッド Go ランタイムに埋め込まれるため、Python 標準ライブラリにある `subprocess` または `multithreading` モジュールの使用は、Agent バージョン 6 以降ではサポートされていません。

### 結果

コマンドラインプログラムを実行すると、チェックはターミナルのコマンドラインで実行されているのと同じ出力をキャプチャします。出力で文字列処理を実行し、結果で `int()` または `float()` を呼び出して、数値型を返します。

サブプロセスの出力に対して文字列処理を行わず整数や浮動小数点数が返されない場合、チェックはエラーなく動作しているように見えても何もデータを報告しません。

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
[2]: /ja/agent/configuration/agent-configuration-files#agent-configuration-directory
[3]: /ja/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[4]: https://app.datadoghq.com/metric/summary
[5]: https://github.com/DataDog/integrations-core/blob/9414403b361e583e8f1ebcdee2f006c384c61045/datadog_checks_base/datadog_checks/base/utils/subprocess_output.py#L22
[6]: /ja/dashboards/