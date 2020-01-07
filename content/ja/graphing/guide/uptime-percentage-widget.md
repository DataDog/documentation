---
title: カスタムアップタイム率ウィジェット
kind: ガイド
author: Boyan Syarov
further_reading:
  - link: /monitors/monitor_uptime_widget/
    tag: Documentation
    text: モニターアップタイムウィジェット
  - link: /synthetics/
    tag: Documentation
    text: Synthetics
---
社内外の顧客とのサービスレベル合意を維持するために、アップタイム率を測定しなければならないことがよくあります。Datadog の [HTTP チェック][1]と[クエリ値ウィジェット][2]を使用して測定する方法を、以下で説明します。

## セットアップ

最初に、[Datadog Agent][3] がインストールされていることを確認してください。[HTTP チェック][1]は Agent に含まれています。

Datadog の HTTP チェックは、内部または外部の Web ページまたはエンドポイントに接続します。HTTP チェックは、Agent 側インテグレーションのリストに入っています。つまり、このチェックはユーザーの環境内のホストにインストールされている Agent によって実施されます。このため、公開していないエンドポイントを調べることが可能です (レイヤー 7 のロードバランサーと同様)。

### コンフィグレーション

HTTP チェックは、YAML ファイルを使用して構成します。[Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `http_check.d/conf.yaml` ファイルを更新します。次に、[Agent を再起動][5]します。使用可能なすべての構成オプションの詳細については、[サンプル http_check.d/conf.yaml][6] を参照してください。

**例**:

```yaml
init_config:

instances:
  - name: Amazon
    url: https://www.amazon.com/
    ca_certs: /opt/datadog-agent/embedded/ssl/certs/cacert.pem
    timeout: 3
    tags:
     - customer:Amazon
     - category:ecommerce
```

上の構成は、Amazon の公開 Web ページに関するメトリクスを収集するように Agent に指示します。収集されるメトリクスの 1 つに `network.http.can_connect` がありますが、これは、1 (有効な応答) または 0 (無効な応答) のいずれかを返します。

この例では、オプションのパラメーターとして 3 秒のタイムアウト (応答が 3 秒以内に届かなかった場合は 0 を返す) と、顧客名とカテゴリのタグを使用しています。

### 検証

[メトリクスエクスプローラー][7]を使用して、このメトリクスが Datadog に報告されていることを確認します。次の例では、`amazon.com` が、設定されている 3 秒のタイムアウト内に 200s または 300s の HTTP 応答を返しています。

{{< img src="graphing/guide/upw_metrics_explorer.png" alt="Metrics Explorer" >}}

## グラフ

次に、[クエリ値ウィジェット][2]内に、この URL の `network.http.can_connect` を表示します。以下に例を示します。

{{< img src="graphing/guide/upw_qvw01.png" alt="Query Value Widget" >}}

アップタイム率を表示するには、クエリ値ウィジェットの設定を次のように変更します。

1. **Advanced...** をクリックします。
2. **Formula** テキストボックスに `a * 100` を追加します。これにより、メトリクスは比率ではなくパーセント値になります。
3. ✔**a** をクリックして、元の値を非表示にします。
4. Autoscale オプションの選択を解除します。これで、浮動小数点数が常に小数点以下 2 桁でウィジェットに表示されます。
5. **Use Custom units** を選択します。表示されるテキストボックスに `%` を追加します。

{{< img src="graphing/guide/upw_qvw02.png" alt="Query Value Widget" >}}

### 条件付き書式

オプションで、**Conditional Format** セクションを使用して条件付き書式を追加できます。下の例では、99.99% 未満の値が赤で表示されます。

{{< img src="graphing/guide/upw_qvw03.png" alt="Query Value Widget" >}}

### JSON 例

次に、上のクエリ値ウィジェットの例の JSON を示します。

```json
{
  "viz": "query_value",
  "requests": [
    {
      "q": "avg:network.http.can_connect{url:https://www.amazon.com/}*100",
      "type": null,
      "style": {
        "palette": "dog_classic",
        "type": "solid",
        "width": "normal"
      },
      "aggregator": "avg",
      "conditional_formats": [
        {
          "comparator": "<",
          "value": "99.99",
          "palette": "white_on_red"
        }
      ]
    }
  ],
  "custom_unit": "%",
  "autoscale": false
}
```

## さまざまな使用例

上の例を拡張して、次のようなさまざまな場面で利用できます。

* 地理的に分散している複数の Agent から 1 つのエンドポイントについてのレポートを作成できます。
* 特定の URL に関するレポートではなく、タグを使用して URL のカテゴリに関するレポートを作成できます。最初の例では、`amazon.com` に `category:ecommerce` のタグを付けています。ecommerce のタグが付いた URL が複数ある場合は、そのタグに該当するすべてのエンドポイントがチェックされます。
* 次の例に示すように、タグを組み合わせることでさらに機能は強力になります。
    `avg:network.http.can_connect{bu:processing,env:prod,customer:acme}*100`
* 目的の SLO が満たされていないときにアラートをトリガーするようにモニターを設定する場合にも、同じロジックを適用できます。この機能のすべてを Datadog の[メトリクスモニター][8]から使用できます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/http_check
[2]: /ja/graphing/widgets/query_value
[3]: https://app.datadoghq.com/account/settings#agent
[4]: /ja/agent/guide/agent-configuration-files
[5]: /ja/agent/guide/agent-commands/#restart-the-agent
[6]: https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example
[7]: https://app.datadoghq.com/metric/explorer
[8]: /ja/monitors/monitor_types/metric