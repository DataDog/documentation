---
title: Python 3 カスタムチェックの移行
kind: ガイド
further_reading:
- link: /agent/versions/upgrade_to_agent_v7/
  tag: ドキュメント
  text: Agent v7 へアップグレード
- link: /agent/guide/agent-v6-python-3/
  tag: ドキュメント
  text: Datadog Agent v6 で Python 3 を使用する
---

<div class="alert alert-info">
Python 3 カスタムチェックの実行をデフォルトでサポートするのは、Agent v7 以降のみです。Python 3 カスタムチェックをネイティブで実行するには、<a href="/agent/versions/upgrade_to_agent_v7">最新バージョンの Agent にアップグレード</a>してください。Agent をアップグレードせずにカスタムチェックの移行をテストする場合は、Agent v6.14 以降の <a href="/agent/guide/agent-v6-python-3">Python 3 ランタイムを有効化</a>します。
</div>

## 概要

本ガイドには、Python 2 から Python 3 への移行チェックに関する情報とベストプラクティスが記載されています、Datadog の[カスタムチェックの互換性][1] ツールを使用して、ご利用のカスタムチェックについて、Python 3 との互換性や移行の必要性をご確認ください。

複数の Agent バージョンでコードを実行できる柔軟性を提供するため、本ガイドでは下位互換性の保持に重点を置いています。

## エディターおよびツール

### Pylint

Pylint には [カスタムチェックと Python 3 の互換性を検証][2]できる機能が含まれています。

#### インストール

[pip][3] から Python 2 にインストールして開始します。

```bash
$ python2 -m pip install pylint
```

Python 2 インタープリターへのパスが異なる場合は、上記のコマンドで `python2` を置換してください。

#### 使用方法

`pylint` コマンドを実行して、カスタムチェックまたはインテグレーションが Python 3 で実行されるか検証します。`CHECK` を Python モジュールまたはパッケージフォルダーへの有効なパスと置換します。

```bash
$ python2 -m pylint -sn --py3k CHECK
```

たとえば、以下のとおりです。

```bash
$ python2 -m pylint -sn --py3k ~/dev/my-check.py
************* Module my-check
E:  4, 4: print statement used (print-statement)
W:  7,22: Calling a dict.iter*() method (dict-iter-method)
W:  9, 8: division w/o __future__ statement (old-division)
```

非互換性が解消されると、同じコマンドで何も返されなくなります。

```bash
$ python2 -m pylint -sn --py3k ~/dev/my-check.py
$
```

`pylint` は Python 3 インタープリターのコード実行を妨げる問題を検知するものの、論理的な妥当性は確認できません。コードを変更したら、必ずチェックを実行し、アウトプットを検証してください。

### 2to3

[2to3][4] により、Python 2 コードを Python 3 コードに変換します。`foo.py`という名称のカスタムチェックを使用している場合は 2to3  を実行します。

```bash
$ 2to3 foo.py
```

2to3 を実行すると、元のソースファイルとの差分が表示されます。2to3 の詳細については、公式 [2to3 ドキュメント][4]を参照してください。

### エディター

最新の IDE およびエディターでは、自動的に高度な lint が実行されます。lint が実行可能な Python 3 を参照していることを確認してください。これにより、Python 2 専用のレガシーファイルを開くと、lint のエラーや警告が [PyCharm][5] の横側に色付きのチェックとして表示されるか、[Visual Studio Code][6] の底部にクリックできるボックスとして表示されます。

## Python の移行

### パッケージのインポート

Python3 で Datadog パッケージのネームスペースを標準化するには、すべてのリソースがベースサブパッケージ下に存在している必要があります。例えば、

```python
from datadog_checks.checks import AgentCheck
```

は次のようになります。

```python
from datadog_checks.base.checks import AgentCheck
```

### Six

[Six][7] は、Python 2 と Python3 の双方で機能する Python コードを開発者が使用できるように考えられた、双方に互換性のあるライブラリです。Six を使用して Python 2 のレガシーコードを Python 3 と互換性のあるコードに変換させた例をいくつか以下に示します。

### 辞書型メソッド

Python 3 では、`dict.iterkeys()`、`dict.iteritems()`、`dict.itervalues()` の各メソッドを使用できません。

| Python 2                                                         | Python 2 および 3                                                                                         |
|------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| `for key in mydict.iterkeys():` <br/> &nbsp;&nbsp;`  ...`        | `for key in mydict:`<br/> &nbsp;&nbsp;`  ...`                                                          |
| `for key, value in mydict.iteritems():`<br/> &nbsp;&nbsp;`  ...` | `from six import iteritems` <br/><br/> `for key, value in iteritems(mydict):`<br/> &nbsp;&nbsp;`  ...` |
| `for value in mydict.itervalues():`<br/> &nbsp;&nbsp;`  ...`     | `from six import itervalues` <br/><br/> `for value in itervalues(mydict):`<br/> &nbsp;&nbsp;`  ...`    |

また、Python 3では、`dict.keys()`、`dict.items()`、`dict.values()` の各メソッドはイテレータを返します。そのため、イテレーションの間に辞書を修正する必要がある場合は、先にコピーを作成します。辞書のキー、項目、値をリストとして取得するには、

| Python 2                        | Python 2 および 3                       |
|---------------------------------|--------------------------------------|
| `mykeylist = mydict.keys()`     | `mykeylist = list(mydict)`           |
| `myitemlist = mydict.items()`   | `myitemlist = list(mydict.items())`  |
| `myvaluelist = mydict.values()` | `myvaluelist = list(mydict.values()` |

`dict.has_key()` メソッドは Python 2 で廃止予定となっており、Python 3 では削除されています。代わりに `in` 演算子を使用してください

| Python 2                             | Python 2 および 3  |
|--------------------------------------|-----------------|
| `mydict.has_key('foo') //非推奨` | `foo in mydict` |

### 標準ライブラリの変更

Python 3 には、再編成された標準ライブラリ機能があります。ここでは、数々のモジュールや関数が名称変更または移動されています。Python の両バージョンで、`six.moves` で移動されたモジュールをインポートできます。

| Python 2            | Python 3             | Python 2 および 3                      |
|---------------------|----------------------|-------------------------------------|
| `import HTMLParser` | `import html.parser` | `from six.moves import html_parser` |

名称が変更されたモジュールのリストについては、[Six ドキュメント][7]を確認してください。`urllib`、`urllib2`、`urlparse` の各モジュールは大幅に再編成されています。

### Unicode

Python 2 は Unicode テキストとバイナリコード化されたデータを同様に扱い、バイトと文字列間の自動変換を試みます。すべての文字が ASCII であれば問題なく動作しますが、非 ASCII 文字にぶつかると不測の挙動につながります。

| type    | リテラル | Python 2 | Python 3 |
|---------|---------|----------|----------|
| バイト   | b'...'  | バイナリ   | バイナリ   |
| str     | '...'   | バイナリ   | テキスト     |
| unicode | u'...'  | テキスト     | テキスト     |

テキストデータは Unicode コードポイントです。ストレージとトランスミッションは `.encode(encoding)` を使用してエンコードする必要があります。バイナリデータは、バイトシーケンスとして表現されるエンコードされたコードポイントです。テキストに戻すには `.decode(encoding)`  を使用してデコードする必要があります。ファイルからテキストを読み取る際は、`io` パッケージの `open` 関数が便利です。データの読み取りはすでに Unicode にデコードされています。

```python
from io import open

f = open('textfile.txt', encoding='utf-8')
contents = f.read()  # コンテンツは ‘utf-8’ を使用してユニコードにデコードされます。これは、バイトではありません！
```

詳細については Ned Batchelder の[実用的な Unicode][8] を参照してください。

### 印刷

Python 3 では、印刷は明確に関数として扱われています。印刷を関数にするには、Python のバージョンに関わらず、古い印刷ステートメントを使用して `from __future__ import print_function` をファイルの先頭に記述し、括弧を追加して関数コールを実行します。

| Python 2      | Python 2 および 3                                                    |
|---------------|-------------------------------------------------------------------|
| `print "foo"` | `from __future__ import print_function` <br/><br/> `print("foo")` |

### 整数の除算

Python 2 では `/` 演算子が整数の切り捨て除算を実行します。

#### Python 2

```python
>> 5/2
2
```

Python 3 では、 `/` 演算子が浮動小数点除算を実行します。`//` 演算子は切り捨て除算を実行します。

#### Python 3

```python
>> 5/2
2.5
>> 5//2
2
```

Python 3 の同じ挙動を再現するには、バージョンに関わらず、`from __future__ import division` を除算を使用するファイルの先頭に記述し、`//` を使用して切り捨て除算の結果を導きます。

### 丸め

Python 2 では、標準ライブラリの丸めメソッドに Round Half Up 法、Python 3 では Round To Even 法を使用します。

#### Python 2

```python
>> round(2.5)
3
>> round(3.5)
4
```

#### Python 3

```python
>> round(2.5)
2
>> round(3.5)
4
```

Datadog では `datadog_checks_base` でユーティリティ関数の  `round_value` を提供して、Python 2 と Python 3 の両方で Python 2 の挙動を再現できるようにしています。

### 例外

Python 3 では except と raise に異なる構文を使用します。

| Python 2                                                                                     | Python 2 および 3                                                                                 |
|----------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| `try:` <br/> &nbsp;&nbsp; `...` <br/> `except Exception, variable:` <br/> &nbsp;&nbsp; `...` | `try:` <br/> &nbsp;&nbsp; `...` <br/> `except Exception as variable:` <br/> &nbsp;&nbsp; `...` |
| `raise Exception, args`                                                                      | `raise Exception(args)`                                                                        |

### 相対インポート

Python 3 では、ドット (`.`) 構文を使用して、相対インポートを明示する必要があります。

パッケージが以下のような構造だとします。

```text
mypackage/
    __init__.py
    math.py
    foo.py
```

また、`math.py` に `gcd` と呼ばれる関数 (標準ライブラリ `math` モジュールの `gcd` 関数とは微妙に異なる機能を含む) が含まれ、標準ライブラリではなく、ローカルパッケージの `gcd` 関数を使用するとします。

Python 2 では、パッケージ内であれば、このパッケージのモジュールがグローバルパッケージより優先されます。`from math import gcd` を使用して、`gcd` を`mypackage/math.py` からインポートします。

Python 3 では、`.` 以外で始まるインポート形式は絶対インポートとして解釈されます。`from math import gcd` を使用して標準ライブラリから `gcd` をインポートします。

| Python 2               | Python 2 および 3          |
|------------------------|-------------------------|
| `from math import gcd` | `from .math import gcd` |

または、さらに読みやすくするには

| Python 2               | Python 2 および 3                   |
|------------------------|----------------------------------|
| `from math import gcd` | `from mypackage.math import gcd` |

### イテレータ

Python 2 でリストを返していたいくつかの関数は、現在 Python 3 ではイテレータを返します。`map`、`filter`、`zip` などがこれに該当します。

Python 2 の挙動を保持する最も簡単な解決策は、`list` へのコールでこれらの関数を括る方法です。

| Python 2                         | Python 2 および 3                         |
|----------------------------------|----------------------------------------|
| `map(myfunction, myiterable)`    | `list(map(myfunction, myiterable))`    |
| `filter(myfunction, myiterable)` | `list(filter(myfunction, myiterable))` |
| `zip(myiterable1, myiterable2)`  | `list(zip(myiterable1, myiterable2))`  |

Python 3 では `xrange` 関数は削除されています。代わりに、`range` 関数が反復可能な `range` オブジェクトを返します。`from six.moves import range` で `range` をインポートします。

`next` メソッドを呼び出す代わりに、組み込み型 `next` 関数を使用します。例えば、`iterator.next()` を `next(iterator)` に書き換えます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/compatibility_check
[2]: https://portingguide.readthedocs.io/en/latest/tools.html#automated-checker-pylint-py3k
[3]: https://pip.pypa.io/en/stable/installing
[4]: https://docs.python.org/3.1/library/2to3.html
[5]: https://www.jetbrains.com/help/pycharm/install-and-set-up-pycharm.html
[6]: https://code.visualstudio.com/docs/setup/setup-overview
[7]: https://six.readthedocs.io
[8]: https://nedbatchelder.com/text/unipain.html
