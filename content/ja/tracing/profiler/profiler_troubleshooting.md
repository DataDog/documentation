---
title: プロファイラのトラブルシューティング
kind: ドキュメント
further_reading:
  - link: /tracing/troubleshooting
    tag: Documentation
    text: APM トラブルシューティング
---
## プロファイル検索ページにないプロファイル

プロファイラを設定してもプロファイル検索ページにプロファイルが表示されない場合は、[デバッグモード][1]をオンにし、デバッグファイルと次の情報で[サポートチケットを開いてください][2]。

- オペレーティングシステムのタイプとバージョン (例: Linux Ubuntu 14.04.3)
- ランタイムのタイプ、バージョン、ベンダー (例: Java OpenJDK 11 AdoptOpenJDK)

## Java 8 のサポート

次の OpenJDK 8 ベンダーは、最新バージョンに JDK Flight Recorder が含まれているため、Continuous Profiling がサポートされています。

| ベンダー                      | Flight Recorder を含む JDK バージョン                      |
| --------------------------- | -------------------------------------------------------------- |
| Azul                        | u212 (u262 推奨)                                     |
| AdoptOpenJDK                | u262                                                           |
| RedHat                      | u262                                                           |
| Amazon (Corretto)           | u262                                                           |
| Bell-Soft (Liberica)        | u262                                                           |
| アップストリームビルド             | u272                                                           |

ベンダーがリストにない場合は、[サポートチケットを開いてください][2]。サポートを計画しているかどうか、またはすでにベータサポートを提供しているかどうかをお知らせします。

## プロファイルからの機密情報の削除

システムプロパティにユーザー名やパスワードなどの機密情報が含まれている場合は、`jdk.InitialSystemProperty` を無効にして `jfp` オーバーライドテンプレートファイルを作成し、システムプロパティイベントをオフにします。

{{< code-block lang="text" filename="example-template.jfp" >}}
jdk.InitialSystemProperty#enabled=false
{{< /code-block >}}

## プロファイラを圧倒する例外

Datadog 例外プロファイラは通常、フットプリントとオーバーヘッドが非常に小さくなります。ただし、多くの例外が作成されてスローされると、プロファイラに大きなオーバーヘッドが発生する可能性があります。これは、たとえば、コントロールフローに例外を使用する場合に発生する可能性があります。例外率が異常に高い場合は、例外の原因を修正する機会が得られるまで、例外プロファイリングを一時的にオフにします。

例外プロファイリングを無効にするには、`-Ddd.integration.throwables.enabled=false` JVM 設定でトレーサーを開始します。

より一般的な例外率に戻った後は、この設定をオンに戻すことを忘れないでください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/troubleshooting/#tracer-debug-logs
[2]: /ja/help/