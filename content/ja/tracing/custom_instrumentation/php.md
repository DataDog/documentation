---
title: PHP カスタムインスツルメンテーション
kind: ドキュメント
aliases:
  - /ja/tracing/manual_instrumentation/php
  - /ja/tracing/opentracing/php
description: PHP アプリケーションを手動でインスツルメントしてカスタムトレースを Datadog に送信します。
further_reading:
  - link: tracing/guide/instrument_custom_method
    tag: ガイド
    text: カスタムメソッドをインスツルメントして、ビジネスロジックを詳細に可視化する
  - link: tracing/connect_logs_and_traces
    tag: Documentation
    text: ログとトレースの接続
  - link: tracing/visualization/
    tag: Documentation
    text: サービス、リソース、トレースの詳細
---
{{< alert type="info" >}}
自動インスツルメンテーションとセットアップの手順をまだ読んでいない場合は、<a href="https://docs.datadoghq.com/tracing/setup/php/">PHP セットアップ手順</a>からご覧ください。
{{< /alert >}}

Datadog が公式にはサポートしていない Web フレームワークでも、手動インスツルメンテーションが必要ない場合もあります。詳細は、[自動インスツルメンテーション][1]をご覧ください。

## スパンの作成

アプリケーションの特定のカスタムメソッドを[トレース][2]するコードを手動でインスツルメントしたり、スパンにタグを追加したりするには、`DDTrace\trace_function()` または `DDTrace\trace_method()` を使用します。

{{< alert type="info" >}}0.47.0 より前のバージョンの ddtrace を使用している場合は、<code>DDTrace\trace_function()</code> の代わりに <code>dd_trace_function()</code> を、<code>DDTrace\trace_method()</code> の代わりに <code>DDTrace\trace_function()</code> を使用するか、または最新のトレーサーバージョンにアップグレードします。{{< /alert >}}

### カスタム関数またはメソッドのトレース

`DDTrace\trace_function()` および `DDTrace\trace_method()` 関数は、特定の関数とメソッドの呼び出しをインスツルメント (トレース) します。これらの関数は、次のタスクを自動的に処理します。

- コードを実行する前に [スパン][3]を開く
- スパンでインスツルメントされた呼び出しからのエラーを設定する
- インスツルメントされた呼び出しが行われたときにスパンを閉じる

追加の[タグ][4]が、クロージャーからスパンに設定されます (トレースクロージャーと呼ばれます)。

たとえば、次のスニペットは `CustomDriver::doWork()` メソッドをトレースし、カスタムタグを追加します。例外はスパンで自動的に追跡されます。

```php
<?php
// ddtrace < v0.47.0 の場合は、dd_trace_method() を使用します
\DDTrace\trace_method(
    'CustomDriver',
    'doWork',
    function (\DDTrace\SpanData $span, array $args, $retval, $exception) {
        // このクロージャーは、インスツルメントされた呼び出しの後に実行されます
        // スパンは、インスツルメントされた呼び出しの前に自動的に作成されました

        // SpanData::$name は、設定されていない場合、デフォルトで 'ClassName.methodName' になります (>= v0.47.0)
        $span->name = 'CustomDriver.doWork';
        // SpanData::$resource は、設定されていない場合、デフォルトで SpanData::$name になります (>= v0.47.0)
        $span->resource = 'CustomDriver.doWork';
        $span->service = 'php';

        $span->meta = [
            // インスツルメントされた呼び出しから例外がスローされた場合、戻り値は null です
            'doWork.size' => $exception ? 0 : count($retval),
            // $this を介してオブジェクトメンバーにアクセスします
            'doWork.thing' => $this->workToDo,
        ];

        // スパンは自動的に閉じます
    }
);

// 関数の場合
// ddtrace < v0.47.0 の場合は、dd_trace_function() を使用します
\DDTrace\trace_function(
    'doCustomDriverWork',
    function (\DDTrace\SpanData $span, array $args, $retval, $exception) {
        // DDTrace\trace_method トレースクロージャーと同じ
    }
);
?>
```

{{< tabs >}}
{{% tab "関数呼び出しのトレース" %}}

関数呼び出しは `DDTrace\trace_function()` でインスツルメントされ、インスツルメントされた呼び出しが行われた後にトレースクロージャーが実行されます。

```php
<?php

use DDTrace\SpanData;

function addNums($a, $b) {
    $sum = $a + $b;
    printf("%d + %d = %d\n", $a, $b, $sum);
    return $sum;
}

\DDTrace\trace_function(
    'addNums',
    function(SpanData $span, $args, $retval) {
        echo "Traced" . PHP_EOL;
    }
);

var_dump(addNums(2, 8));
// 2 + 8 = 10
// Traced
// int(10)
```

{{% /tab %}}
{{% tab "メソッド呼び出しのトレース" %}}

メソッドは、`DDTrace\trace_function()` と同じ機能を提供する `DDTrace\trace_method()` でインスツルメントされます。主な違いの 1 つは、トレースクロージャーがインスツルメント済みクラスにバインドされ、`$this` を介してインスツルメント済みクラスのインスタンスを公開することです。

```php
<?php

use DDTrace\SpanData;

class Calc {
    public $foo = 'bar';
    public function addNums($a, $b) {
        $sum = $a + $b;
        printf("%d + %d = %d\n", $a, $b, $sum);
        return $sum;
    }
}

\DDTrace\trace_method(
    'Calc', 'addNums',
    function(SpanData $span, $args, $retval) {
        echo '$this->foo: ' . $this->foo . PHP_EOL;
    }
);

$calc = new Calc();
var_dump($calc->addNums(2, 8));
// 2 + 8 = 10
// $this->foo: bar
// int(10)
```
{{% /tab %}}
{{< /tabs >}}

## アクティブなスパンへのアクセス

内蔵のインスツルメンテーションおよびカスタムインスツルメンテーションは、有意義なオペレーションに関連するスパンを作成します。アクティブなスパンにアクセスして、これらの有意義なデータを含めるよう設定できます。

{{< tabs >}}
{{% tab "現在のスパン" %}}

```php
<?php
$span = \DDTrace\GlobalTracer::get()->getActiveSpan();
if ($span) {
    $span->setTag('customer.id', get_customer_id());
}
?>
```

{{% /tab %}}
{{% tab "ルートスパン" %}}

トレースのルートスパンには、グローバルトレーサーから `Tracer::getRootScope()` を介して後から直接アクセスできます。これはルートスパンに追加されるべきメタデータが初期のスクリプト実行時に存在しない場合などに便利です。

```php
<?php
$scope = \DDTrace\GlobalTracer::get()->getRootScope();
if ($scope) {
    $scope->getSpan()->setTag(\DDTrace\Tag::HTTP_STATUS_CODE, 200);
}
?>
```

{{% /tab %}}
{{< /tabs >}}

## タグの追加

{{< tabs >}}
{{% tab "ローカル" %}}

`DDTrace\SpanData::$meta` 配列を介してタグをスパンに追加します。

```php
<?php

\DDTrace\trace_function(
    'myRandFunc',
    function(\DDTrace\SpanData $span, array $args, $retval) {
        // ...
        $span->meta = [
            'rand.range' => $args[0] . ' - ' . $args[1],
            'rand.value' => $retval,
        ];
    }
);
```

{{% /tab %}}
{{% tab "グローバル" %}}

作成されるすべてのスパンにタグを自動的に適用するように、`DD_TAGS` 環境変数 (バージョン 0.47.0+) を設定します。これは以前は `DD_TRACE_GLOBAL_TAGS` でした。古いバージョンの構成の詳細については、[環境変数のコンフィギュレーション][1]を参照してください。

```
DD_TAGS=key1:value1,<TAG_KEY>:<TAG_VALUE>
```

[1]: /ja/tracing/setup/php/#environment-variable-configuration
{{% /tab %}}
{{% tab "エラー" %}}

スローされた例外は、アクティブなスパンに自動的にアタッチされます。

```php
<?php

function doRiskyThing() {
    throw new Exception('Oops!');
}

\DDTrace\trace_function(
    'doRiskyThing',
    function() {
        // スパンにはエラーのフラグが付けられ、
        // スタックトレースと例外メッセージがタグとしてアタッチされます
    }
);
```

`error.msg` タグを設定して、手動でスパンにエラーのフラグを付けます。

```php
<?php

function doRiskyThing() {
    return SOME_ERROR_CODE;
}

\DDTrace\trace_function(
    'doRiskyThing',
    function(\DDTrace\SpanData $span, $args, $retval) {
        if ($retval === SOME_ERROR_CODE) {
            $span->meta = [
                'error.msg' => 'Foo error',
                // オプション:
                'error.type' => 'CustomError',
                'error.stack' => my_get_backtrace(),
            ];
        }
    }
);
```

{{% /tab %}}
{{< /tabs >}}

## リソースフィルター

トレースはそれぞれのリソース名に基づいて除外可能で、これによりヘルスチェックなどの外形監視トラフィックが Datadog にレポートされるトレースから削除されます。この設定およびその他のセキュリティ/微調整に関するコンフィギュレーションについては[セキュリティ][5]ページを参照してください。

## OpenTracing

PHP トレーサーは、Composer と共にインストールされる [**opentracing/opentracing** ライブラリ][6]を介して OpenTracing をサポートします。

```bash
composer require opentracing/opentracing:1.0.0-beta5
```

[自動インスツルメンテーション][1]が有効になっている場合、OpenTracing 互換のトレーサーがグローバルトレーサーとして利用可能になります。

```php
<?php
$otTracer = new \DDTrace\OpenTracer\Tracer(\DDTrace\GlobalTracer::get());
\OpenTracing\GlobalTracer::set($otTracer);
$span = $otTracer->startActiveSpan('web.request')->getSpan();
$span->setTag('span.type', 'web');
$span->setTag('http.method', $_SERVER['REQUEST_METHOD']);
// ...既定の方法で OpenTracing を使用します
?>
```

{{< alert type="info" >}}ddtrace のバージョン 0.46.0 以前では、OpenTracing に互換性のあるトレーサーが <code>OpenTracing\GlobalTracer::get()</code> から自動で返されます。グローバルトレーサーの手動設定は不要です。{{< /alert >}}

## API リファレンス

### トレースクロージャーのパラメーター

`DDTrace\trace_method()` と `DDTrace\trace_function()` に提供されるトレースクロージャーには 4 つのパラメーターがあります。

```php
function(
    DDTrace\SpanData $span,
    array $args,
    mixed $retval,
    Exception|null $exception
);
```

1. **$span**: スパンプロパティに書き込む `DDTrace\SpanData` のインスタンス
2. **$args**: インスツルメントされた呼び出しからの引数の`配列`
3. **$retval**: インスツルメントされた呼び出しの戻り値
4. **$exception**: インスツルメントされた呼び出しでスローされた例外のインスタンス、または例外がスローされなかった場合は `null`

#### パラメーター 1: `DDTrace\SpanData $span`

`DDTrace\SpanData` インスタンスには [Agent が期待するのと同じスパン情報][7]が含まれています。いくつかの例外は、`trace_id`、`span_id`、`parent_id`、`start`、`duration` で、C レベルで設定され、`DDTrace\SpanData` を介してユーザーランドに公開されません。インスツルメントされた呼び出しからの例外は自動的にスパンにアタッチされ、`error` フィールドは自動的に管理されます。

| プロパティ | タイプ | 説明 |
| --- | --- | --- |
| `SpanData::$name` | `string` | スパン名 _(ddtrace v0.47.0 時点ではオプション。設定されていない場合、デフォルトは 'ClassName.methodName' です)_ |
| `SpanData::$resource` | `string` | トレースしているリソース _(ddtrace v0.47.0 時点ではオプション。設定されていない場合、デフォルトは `SpanData::$name` です)_ |
| `SpanData::$service` | `string` | トレースしているサービス |
| `SpanData::$type` | `string` | **web**、**db**、**cache**、または **custom** に設定できるリクエストのタイプ _(オプション)_ |
| `SpanData::$meta` | `string[]` | キー-値スパンメタデータの配列。キーと値は文字列である必要があります _(オプション)_ |
| `SpanData::$metrics` | `float[]` | キー-値スパンメトリクスの配列。キーは文字列、値は浮動小数点数である必要があります _(オプション)_ |

```php
<?php

use DDTrace\SpanData;

function myRandFunc($min, $max) {
    return mt_rand($min, $max);
}

\DDTrace\trace_function(
    'myRandFunc',
    function(SpanData $span, $args, $retval) {
        // SpanData::$name は、設定されていない場合、デフォルトで 'functionName' になります (>= v0.47.0)
        $span->name = 'myRandFunc';
        // SpanData::$resource は、設定されていない場合、デフォルトで SpanData::$name になります (>= v0.47.0)
        $span->resource = 'myRandFunc';
        $span->service = 'php';
        // 以下はオプションです
        $span->type = 'web';
        $span->meta = [
            'rand.range' => $args[0] . ' - ' . $args[1],
            'rand.value' => $retval,
        ];
        $span->metrics = [
            '_sampling_priority_v1' => 0.9,
        ];
    }
);
```

#### パラメーター 2: `array $args`

トレースクロージャーの 2 番目のパラメーターは、インスツルメントされた呼び出しからの引数の配列です。[`func_get_args()`][8] と同様に機能します。

デフォルトでは、トレースクロージャーはインスツルメントされた呼び出しの_後_に実行されます。つまり、リファレンスによって渡される引数は、トレースクロージャーに到達したときに別の値になる可能性があります。

```php
<?php

use DDTrace\SpanData;

function argsByRef(&$a) {
    return ++$a;
}

\DDTrace\trace_function(
    'argsByRef',
    function(SpanData $span, $args) {
        var_dump($args);
    }
);

$foo = 10;
var_dump(argsByRef($foo));
// array(1) {
//   [0]=>
//   int(11)
// }
// int(11)
```

PHP 7 では、トレースクロージャーは、インスツルメントされた呼び出しに渡される同じ引数にアクセスできます。インスツルメントされた呼び出しが、値で渡される引数を含む引数をミューテーションする場合、`posthook` トレースクロージャーはミューテーションされた引数を受け取ります。

これは、次の例に示すように、PHP 7 で予想される引数の動作です。

```php
<?php

function foo($a) {
    var_dump(func_get_args());
    $a = 'Dogs';
    var_dump(func_get_args());
}

foo('Cats');

/*
array(1) {
  [0]=>
  string(4) "Cats"
}
array(1) {
  [0]=>
  string(4) "Dogs"
}
*/
```

次の例は、`posthook` トレースクロージャーに対するこの効果を示しています。

```php
<?php

function foo($a) {
    $a = 'Dogs';
}

\DDTrace\trace_function('foo', function ($span, array $args) {
    var_dump($args[0]);
});

foo('Cats');

// string(4) "Dogs"
```

ミューテーションの前に引数にアクセスする必要がある場合、インスツルメントされた呼び出しの前に引数にアクセスするためにトレースクロージャーを [`prehook` としてマークすることができます](#running-the-tracing-closure-before-the-instrumented-call)。

#### パラメーター 3: `mixed $retval`

トレースクロージャーの 3 番目のパラメーターは、インスツルメントされた呼び出しの戻り値です。`void` 戻り値型を宣言する関数またはメソッド、または値を返さないものは、`null` の値を持ちます。

```php
<?php

use DDTrace\SpanData;

function message(): void {
    echo "Hello!\n";
}

\DDTrace\trace_function(
    'message',
    function(SpanData $span, $args, $retval) {
        echo "Traced\n";
        var_dump($retval);
    }
);

var_dump(message());
// Hello!
// Traced
// NULL
// NULL
```

#### パラメーター 4: `Exception|null $exception`

トレースクロージャーの最後のパラメーターは、インスツルメントされた呼び出しでスローされた例外のインスタンス、または例外がスローされなかった場合は `null` です。

```php
<?php

use DDTrace\SpanData;

function mightThrowException() {
  throw new Exception('Oops!');
  return 'Hello';
}

\DDTrace\trace_function(
  'mightThrowException',
  function(SpanData $span, $args, $retval, $ex) {
    if ($ex) {
      echo 'Exception from instrumented call: ';
      echo $ex->getMessage() . PHP_EOL;
    }
  }
);

mightThrowException();

/*
Exception from instrumented call: Oops!
NULL
PHP Fatal error:  Uncaught Exception: Oops! ...
*/
```

例外は自動的にスパンにアタッチされるため、手動で `SpanData::$meta['error.*']` メタデータを設定する必要はありません。ただし、例外インスタンスにアクセスできるため、戻り値にアクセスする前に、スローされた例外を確認できます。

```php
<?php

use DDTrace\SpanData;

\DDTrace\trace_function(
    'mightThrowException',
    function(SpanData $span, $args, $retval, $ex) {
        if (null === $ex) {
            // $retval で何かを実行します
        }
    }
);
```

## 高度なコンフィギュレーション

### 内部関数とメソッドのトレース

インスツルメンテーション用のすべての内部関数とメソッドを無視するために、**0.46.0** 以降、最適化が追加されました。内部関数とメソッドは、`DD_TRACE_TRACED_INTERNAL_FUNCTIONS` 環境変数を設定することで引き続きインスツルメントできます。これは、インスツルメントされる関数またはメソッドの CSV を取得します (例: `DD_TRACE_TRACED_INTERNAL_FUNCTIONS=array_sum,mt_rand,DateTime::add`)。関数またはメソッドがリストに追加されると、それぞれ `DDTrace\trace_function()` と `DDTrace\trace_method()` を使用してインスツルメントできます。

### インスツルメントされた呼び出しの前にトレースクロージャーを実行する

デフォルトでは、トレースクロージャーは `posthook` クロージャーとして扱われ、インスツルメントされた呼び出しの_後_に実行されます。場合によっては、インスツルメントされた呼び出しの_前_にトレースクロージャーを実行する必要があります。その場合、トレースクロージャーは、結合するコンフィギュレーション配列を使用して `prehook` としてマークされます。

```php
\DDTrace\trace_function('foo', [
    'prehook' => function (\DDTrace\SpanData $span, array $args) {
        // このトレースクロージャーは、インスツルメントされた呼び出しの前に実行されます
    }
]);
```

### サンドボックス化されたエラーのデバッグ

トレースクロージャーは「サンドボックス化」されており、例外がスローされ、内部で発生したエラーはインスツルメントされた呼び出しに影響を与えません。

```php
<?php

function my_func() {
  echo 'Hello!' . PHP_EOL;
}

\DDTrace\trace_function(
  'my_func',
  function() {
    throw new \Exception('Oops!');
  }
);

my_func();
echo 'Done.' . PHP_EOL;

/*
Hello!
Done.
*/
```

デバッグするには、環境変数 `DD_TRACE_DEBUG=1` を設定して、トレースクロージャーで発生した可能性のある例外またはエラーを公開します。

```php
/*
Hello!
Exception thrown in tracing closure for my_func: Oops!
Done.
*/
```

### Zend Framework 1 手動インスツルメンテーション

デフォルトで、Zend Framework 1 は自動的にインスツルメントされるため、ZF1 プロジェクトを変更する必要はありません。ただし、自動インスツルメンテーションが無効になっている場合は、トレーサーを手動で有効にします。

まず、[リリースページから最新のソースコードをダウンロードします][9]。ZIP ファイルを解凍し、アプリケーションの`/library` フォルダに `src/DDTrace` フォルダをコピーします。次に、`application/configs/application.ini` ファイルに以下を追加します。

```ini
autoloaderNamespaces[] = "DDTrace_"
pluginPaths.DDTrace = APPLICATION_PATH "/../library/DDTrace/Integrations/ZendFramework/V1"
resources.ddtrace = true
```

### PHP コード最適化

 PHP 7 より前のフレームワークでは、Laravel の `php artisan optimize` コマンドなど、PHP クラスをコンパイルする方法がありました。

これは[推奨されませんが][10]、PHP 7.x を使用している場合、バージョン 7 より前のアプリでは、このキャッシュメカニズムを使うことができます。この場合、Datadog は Composer ファイルに `datadog/dd-trace` を追加する方法ではなく、[OpenTracing](#opentracing) API の使用を推奨します。

## レガシー API アップグレードガイド

Datadog では、レガシーの `dd_trace()` APIを使用して実装されたカスタムインスツルメンテーションを更新することをお勧めします。

レガシー API と「サンドボックス」API の間には、理解すべき重要なパラダイムの違いがあります。レガシー API は、`dd_trace_forward_call()` を使用して、トレースクロージャー内からインスツルメントされた呼び出しを転送します。

{{< img src="tracing/manual_instrumentation/php_legacy_api.png" alt="レガシー API" style="width:100%;">}}

サンドボックス API は、インスツルメントされた呼び出しの後にトレースクロージャーを実行するため、`dd_trace_forward_call()` とともに元の呼び出しを転送する必要はありません。

{{< img src="tracing/manual_instrumentation/php_sandbox_api.png" alt="サンドボックス API" style="width:100%;">}}

レガシー API とは異なり、サンドボックス API は次のタスクを自動的に処理します。

1. スパンの作成
2. 元の呼び出しの転送
3. スパンへの例外のアタッチ

### アップグレード例

サンドボックス API は、呼び出しをインスツルメントするために必要なボイラープレートの量を減らします。以下は、完全なレガシー API の例と同等のサンドボックス API を並べて比較したものです。

```php
# Legacy API
dd_trace('CustomDriver', 'doWork', function (...$args) {
    // 新しいスパンを開始します
    $scope = \DDTrace\GlobalTracer::get()->startActiveSpan('CustomDriver.doWork');
    $span = $scope->getSpan();

    // $this を介してオブジェクトメンバーにアクセスします
    $span->setTag(\DDTrace\Tag::RESOURCE_NAME, $this->workToDo);

    try {
        // 元のメソッドを実行します。注: dd_trace_forward_call() - パラメーターを自動的に処理します
        $result = dd_trace_forward_call();
        // 戻り値に基づいてタグを設定します
        $span->setTag('doWork.size', count($result));
        return $result;
    } catch (Exception $e) {
        // スローされた例外があったことをトレーサーに通知します
        $span->setError($e);
        // 例外をふきだします
        throw $e;
    } finally {
        // スパンを閉じます
        $span->finish();
    }
});

# Sandbox API
\DDTrace\trace_method(
    'CustomDriver',
    'doWork',
    function (\DDTrace\SpanData $span, array $args, $retval, $exception) {
        // このクロージャーは、インスツルメントされた呼び出しの後に実行されます
        // スパンは、インスツルメントされた呼び出しの前に自動的に作成されました

        // SpanData::$name は、設定されていない場合、デフォルトで 'ClassName.methodName' になります (>= v0.47.0)
        $span->name = 'CustomDriver.doWork';
        // SpanData::$resource は、設定されていない場合、デフォルトで SpanData::$name になります (>= v0.47.0)
        $span->resource = 'CustomDriver.doWork';
        $span->service = 'php';

        $span->meta = [
            // インスツルメントされた呼び出しから例外がスローされた場合、戻り値は null です
            'doWork.size' => $exception ? 0 : count($retval),
            // $this を介してオブジェクトメンバーにアクセスします
            'doWork.thing' => $this->workToDo,
        ];

        // dd_trace_forward_call() で明示的に呼び出しを転送する必要はありません
        // 明示的に例外をキャッチ/アタッチする必要はありません
        // スパンは自動的に閉じます
    }
);
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/setup/php/#automatic-instrumentation
[2]: /ja/tracing/visualization/#trace
[3]: /ja/tracing/visualization/#spans
[4]: /ja/tracing/visualization/#span-tags
[5]: /ja/tracing/security
[6]: https://github.com/opentracing/opentracing-php
[7]: /ja/api/v1/tracing/#send-traces
[8]: https://www.php.net/func_get_args
[9]: https://github.com/DataDog/dd-trace-php/releases/latest
[10]: https://laravel-news.com/laravel-5-6-removes-artisan-optimize