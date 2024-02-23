---
further_reading:
- link: /logs/faq/log-parsing-best-practice/
  tag: よくあるご質問
  text: ログのパース - ベストプラクティス
- link: /logs/log_configuration/processors
  tag: Documentation
  text: ログの処理方法
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: パースの詳細
kind: faq
title: ログのパースに関する問題を調査する方法
---

Integration Pipelines は、特定のテクノロジーのデフォルトのログフォーマットをサポートします。そのため、ログ形式をカスタマイズしたり、動作しないカスタムパーサーを書いたりした場合、ログが適切にパースされないことがあります。
ここでは、問題の根本的な原因を見つけ、パーサーを修正する方法についていくつかのガイドラインを示します。

パーサーのトラブルシューティングを行う前に、Datadog ログの[プロセッサー][1]と[パース][2]のドキュメント、および[パースベストプラクティスの記事][3]を読んでください。

1. **ログのパイプラインを特定します**:
    パイプラインフィルターにより、ログが通過した処理パイプラインを確認することができます。インテグレーションパイプラインはソースをフィルターとして使用するため、ログのソースが正しく設定されているかどうかを確認してください。

    {{< img src="logs/faq/integrationpipeline.png" alt="integrationpipeline" >}}

   インテグレーションパイプラインについては、それらを複製し、その複製上でトラブルシューティングを行います。

2. **明らかな差異がある場合は、その差異を見つけます**:
    ほとんどの場合、パーサーには例文やログのサンプルが用意されているはずです。ログとサンプルを比較して、要素の欠落、順序の違い、余分な要素など、単純な違いを見つけてください。
   また、タイムスタンプの形式も原因であることが多いので、確認します。

   これを apache のログで説明することができます。インテグレーションパーサーでは、次のような例があります。
    ```
    127.0.0.1 - frank [13/Jul/2016:10:55:36 +0000] "GET /apache_pb.gif HTTP/1.0" 200 2326
    ```

   次のログを例にします。
    ```
    [13/Jul/2016:10:55:36 +0000] 127.0.0.1 - frank "GET /apache_pb.gif HTTP/1.0" 200 2326
    ```

   タイムスタンプが同じ場所にありません。したがって、その違いを反映させるためにパースルールを変更する必要があります。

3. **原因の属性を見つけます**:
   フォーマットに明らかな違いはありませんか？パースルールの実際のトラブルシューティングを開始します。ここでは、実際のケースを説明するために、ELB ログの短縮された形式を示します。

    パースルールは以下の通りです。
    ```
    elb.http %{date("yyyy-MM-dd'T'HH:mm:ss.SSSSSSZ"):date_access} %{notSpace:elb.name} "(?>%{word:http.method} |- )%{notSpace:http.url:nullIf("-")}(?> HTTP\/%{regex("\\d+\\.\\d+"):http.version}| - )" "%{notSpace:http.useragent:nullIf("-")}" %{notSpace:elb.ssl.cipher} %{notSpace:elb.ssl.protocol}
    ```

   以下のログが含まれています。
    ```
    2015-05-13T23:39:43.945958Z my-loadbalancer "GET http://www.example.com:80/ HTTP/1.1" "Mozilla/5.0 (Windows NT 5.1; rv:52.0) Gecko/20100101 Firefox/52.0" - -
    ```

   提供されたサンプルを見る限り、明らかな違いはなく、パーサーはサンプルに対して正常に動作しています。
    {{< img src="logs/faq/sampleparsing.png" alt="sampleparsing" >}}

   しかし、ログを見ながらテストすると、うまくいきません。次のステップは、原因が見つかるまで、末尾から 1 つずつ属性を削除し始めることです。そのためには、ルールの末尾に `.*` を付けてから、属性を削除します。

   下のイメージは、ユーザー Agent までのすべてを削除した後に、ルールが機能し始める様子を示しています。
    {{< img src="logs/faq/Troubleshootparsing.png" alt="Troubleshootparsing" >}}

   つまり、ユーザー Agent の属性に問題があることがわかります。

4. **問題を修正します**:
   原因となる属性を特定したら、さらに詳しく見てみましょう。

    ログに記載されているユーザー Agent は、以下の通りです。

    * Mozilla/5.0 (Windows NT 5.1; rv:52.0) Gecko/20100101 Firefox/52.0.

    そして、パースルールは以下を使用しています。

    * `%{notSpace:http.useragent:nullIf("-")}`

    最初に確認するのはマッチャーです (注意点として、マッチャーは、整数、notSpace、正規表現など、ルールがどのような要素を期待するかを記述しています)。ここでは、`notSpace` を期待しています。しかし、ユーザー Agent にはスペースや特定の文字も含まれています。したがって、`notSpace` はここでは機能しないでしょう。

    使用するマッチャーは regex("[^\\\"]*") です。

    他の状況では、ルールが「整数」を期待するのに対し、値が double であるため、マッチャーを「数値」に変更する必要があるかもしれません。

5. **サポートを求めます**:
   Datadog は、いつでもお客様をサポートします！パースエラーの原因を見つけられなかった場合は、[サポートチームに連絡してください][4]。

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_configuration/processors
[2]: /ja/logs/log_configuration/parsing
[3]: /ja/logs/faq/log-parsing-best-practice/
[4]: /ja/help/