---
title: Troubleshooting the PHP Profiler
code_lang: php
type: multi-code-lang
code_lang_weight: 70
further_reading:
    - link: /tracing/troubleshooting
      tag: Documentation
      text: APM Troubleshooting
---

## プロファイル検索ページにないプロファイル

プロファイラーを構成しても、プロファイル検索ページにプロファイルが表示されない場合は、`phpinfo()` 関数を実行します。プロファイラーは `phpinfo()` をフックして診断を実行します。Web サーバーに問題がある場合は、コマンドラインからではなく、Web サーバーから `phpinfo()` を実行すると、各サーバー API (SAPI) を個別に構成することができます。

以下の内容で[サポートチケットを発行][1]します。

- オペレーティングシステムのタイプとバージョン (例: Linux Ubuntu 20.04)
- `phpfo()` の出力。PHP のバージョン、SAPI のタイプ、Datadog ライブラリのバージョン、そしてプロファイラーの診断が含まれます。

## デフォルトの設定からオーバーヘッドを軽減する

デフォルトのオーバーヘッドが許容できない場合は、以下の INI 設定を変更することで、プロファイラーが収集するサンプルタイプの一部を無効にすることができます。

- `datadog.profiling.allocation_enabled`: アロケーションプロファイリングを制御します
- `datadog.profiling.experimental_cpu_time_enabled`: CPU 時間のサンプルを制御します
- `datadog.profiling.exception_enabled`: 例外プロファイリングを制御します

これらのサンプルタイプを無効にすると、ウォールタイムサンプルだけが収集されます。

その他の INI 設定と対応する環境変数については、[構成ドキュメント][2]を参照してください。

## プロファイラを圧倒する例外

Datadog 例外プロファイラは通常の条件下では、フットプリントとオーバーヘッドが小さくなります。ただし、多くの例外が作成されてスローされると、プロファイラに大きなオーバーヘッドが発生することがあります。これは、コントロールフローに例外を使用した場合などに発生する可能性があります。

例外率が異常に高い場合は、`datadog.profiling.exception_enabled` を `0` に設定して例外プロファイリングをオフにするか、`datadog.profiling.exception_sampling_distance` の INI 設定 (デフォルトは `100`) でサンプリング距離をより高い値に変更することができます。サンプリング距離が長いほど、作成されるサンプルの数が少なくなり、オーバーヘッドが少なくなります。

例外サンプリングの距離については、[構成ドキュメント][2]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /help/
[2]: /tracing/trace_collection/library_config/php/#environment-variable-configuration
