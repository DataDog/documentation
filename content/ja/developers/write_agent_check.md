---
title: カスタム Agent チェック
kind: documentation
aliases:
  - /ja/agent/faq/how-do-i-change-the-frequency-of-an-agent-check/
  - /ja/agent/faq/agent-5-custom-agent-check/
further_reading:
  - link: /developers/integrations/new_check_howto/
    tag: Documentation
    text: 新しいインテグレーションの作成
---
## 概要

ここでは、簡単なカスタム Agent チェックと `min_collection_interval` について説明します。標準的な Agent ベースのインテグレーションと同様に、カスタムチェックも一定の間隔 (デフォルトは 15 秒ごと) で実行するようにスケジューリングされます。

### Agent チェックとインテグレーションのどちらを作成するか

カスタムチェックは、カスタムアプリケーションや独自システムからメトリクスを収集する場合に適しています。ただし、一般に利用可能なアプリケーション、公開サービス、オープンソースプロジェクトなどからメトリクスを収集しようとしている場合は、[完全な Agent インテグレーションを作成][1]することをお勧めします。

Datadog Agent v6.4+ を使用すると、Datadog Agent のバージョンアップとは関係なく、インテグレーションをリリースおよび更新できます。インテグレーションを共有することも容易で、作成したインテグレーションを Datadog コミュニティで幅広く利用してもらうことができます。

インテグレーションの書き方については、[新しいインテグレーションの作成][1]を参照してください。既に共有されているインテグレーションについては、[integrations-extras GitHub リポジトリ][2]を参照してください。

## セットアップ

最初に、[Agent][3] が正常にインストールされていることを確認します。セットアップに問題が発生した場合は、[Datadog のサポートチームにご連絡][4]ください。

**注**: Agent v7+ を実行している場合、Agent チェックは Python 3 と互換性がある必要があります。それ以外の場合は Python 2.7+ との互換性が必要です。

## カスタム Agent チェック

<div class="alert alert-warning">
  構成とチェックファイルは、名前が一致していなければなりません。チェックが <code>mycheck.py</code> という名前なら、構成ファイルは <code>mycheck.yaml</code> という名前にしなければなりません。
</div>

この例のカスタムチェックは、メトリクス `hello.world` の値 `1` を送信します。構成ファイルに実際の情報は含まれませんが、少なくとも 1 つのマッピングからなる `instances` という名前のシーケンスを含む必要があります。このマッピングは空でもかまいません。`conf.d/hello.yaml` は以下のようになります。

```yaml
instances: [{}]
```

チェック自体は `AgentCheck` を継承し、呼び出しごとに `hello.world` のゲージ `1` を送信します。`checks.d/hello.py` は以下のようになります。

{{< code-block lang="python" filename="hello.py" >}}
# 次の try/except ブロックを使うと、カスタムチェックがどの Agent バージョンとも互換性を持つようになります
try:
    # 最初に、古いバージョンの Agent から基本クラスのインポートを試みます...
    from datadog_checks.base import AgentCheck
except ImportError:
    # ...失敗した場合は、Agent バージョン 6 以降で実行します
    from checks import AgentCheck

# 特別な変数 __version__ の内容は Agent のステータスページに表示されます
__version__ = "1.0.0"

class HelloCheck(AgentCheck):
    def check(self, instance):
        self.gauge('hello.world', 1, tags=['TAG_KEY:TAG_VALUE'] + self.instance.get('tags', []))
{{< /code-block >}}

基本クラスから提供されるインターフェイスの詳細については、[API のドキュメント][5]を参照してください。

**注**: カスタムチェックの名前を選択する際は、既存の Datadog Agent インテグレーションの名前との競合を避けるため、名前の前に `custom_` を付けてください。たとえば、カスタム Postfix チェックの場合、チェックファイルの名前は、`postfix.py` と `postfix.yaml` ではなく、`custom_postfix.py` と `custom_postfix.yaml` にします。

### 収集間隔

チェックの収集間隔を変更するには、構成ファイルで `min_collection_interval` を使用します。デフォルト値は `15` です。この場合は、このクラスの `check` メソッドが Agent の他のインテグレーションと同じ間隔で呼び出されます。

**注**: `min_collection_interval` パラメーターは、標準およびカスタムインテグレーションの両方で利用可能です。

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}
Agent 6 では、`min_collection_interval` をインスタンスレベルで追加し、インスタンスごとに個別に設定する必要があります。

```yaml
init_config:

instances:
  - min_collection_interval: 30
```

{{% /tab %}}
{{% tab "Agent v5" %}}
Agent 5 では、`min_collection_interval` を `init_config` セクションに追加して、チェックが実行される頻度をグローバルに定義します。

```yaml
init_config:
  min_collection_interval: 30

instances: [{}]
```

{{% /tab %}}
{{< /tabs >}}

**注**: `min_collection_interval` を `30` に設定しても、メトリクスが 30 秒ごとに収集されるというわけではなく、最短 30 秒ごとに収集されるという意味になります。コレクターはチェックを 30 秒ごとに実行しようとしますが、同じ Agent で有効にされているインテグレーションの数によっては、待機しなけらばならない場合があります。さらに、`check` メソッドが終了までに 30 秒以上かかった場合も、Agent はチェックがまだ実行中であると認識し、次の間隔まで実行をスキップします。

## チェックの検証

チェックが実行されていることを確認するには、次のコマンドを使用します。

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

```shell
sudo -u dd-agent -- datadog-agent check <CHECK_NAME>
```

{{% /tab %}}
{{% tab "Agent v5" %}}

```shell
sudo -u dd-agent -- dd-agent check <CHECK_NAME>
```

{{% /tab %}}
{{< /tabs >}}

確認したら、Agent を再起動してこれを含め、Datadog へのデータのレポートを開始します。

## コマンドラインプログラムを実行するチェックの書き方

コマンドラインプログラムを実行し、その出力をカスタムメトリクスとして取得するカスタムチェックを作成できます。たとえば、`vgs` コマンドを実行して、ボリュームグループに関する情報を報告するチェックが考えられます。便宜上、ラッパー関数が提供されています。これは、別のプロセスを呼び出してその出力や終了コードを収集することを避けるためです。

チェック内でサブプロセスを実行するには、モジュール `datadog_checks.base.utils.subprocess_output` にある [`get_subprocess_output()` 関数][6]を使用します。`get_subprocess_output()` には、コマンドと引数をそれぞれ文字列としてリスト形式で渡します。たとえば、コマンドプロンプトで次のように入力されるコマンドは

```text
$ vgs -o vg_free
```

次のように `get_subprocess_output()` に渡します。

```python
out, err, retcode = get_subprocess_output(["vgs", "-o", "vg_free"], self.log, raise_on_empty_output=True)
```

<div class="alert alert-warning">
    チェックを実行する Python インタープリターは、マルチスレッド Go ランタイムに埋め込まれるため、Python 標準ライブラリにある <code>subprocess</code> または <code>multithreading</code> モジュールの使用は、Agent バージョン 6 以降では<em>サポートされていません</em>。
</div>

コマンドラインプログラムが実行されると、チェックは、ターミナルのコマンドラインで実行された場合と同じ出力を取得します。出力に対して文字列処理を行い、その結果に対して `int()` または `float()` を呼び出して、数値型が返されるようにすることは重要です。

サブプロセスの出力に対して文字列処理を行わず整数や浮動小数点数が返されない場合、チェックはエラーなく動作しているように見えても何もデータを報告しません。

以下に、コマンドラインプログラムの結果を返すチェックの例を示します。

```python
# ...
from datadog_checks.base.utils.subprocess_output import get_subprocess_output

class LSCheck(AgentCheck):
    def check(self, instance):
        files, err, retcode = get_subprocess_output(["ls", "."], self.log, raise_on_empty_output=True)
        file_count = len(files.split('\n')) - 1  #len() はデフォルトで int 値を返します
        self.gauge("file.count", file_count,tags=['TAG_KEY:TAG_VALUE'] + self.instance.get('tags', []))
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/developers/integrations/new_check_howto/
[2]: https://github.com/DataDog/integrations-extras
[3]: http://app.datadoghq.com/account/settings#agent
[4]: /ja/help/
[5]: https://datadoghq.dev/integrations-core/base/api/#datadog_checks.base.checks.base.AgentCheck
[6]: https://datadog-checks-base.readthedocs.io/en/latest/datadog_checks.utils.html#module-datadog_checks.base.utils.subprocess_output