---
disable_toc: false
further_reading:
- link: /observability_pipelines/set_up_pipelines/
  tag: ドキュメント
  text: パイプラインをセットアップ
- link: /observability_pipelines/processors/
  tag: ドキュメント
  text: パイプライン用のプロセッサ
- link: /observability_pipelines/destinations/
  tag: ドキュメント
  text: Observability Pipelines の宛先
title: ソース
---

## 概要

Observability Pipelines のソースを使用して、さまざまなログソースからログを受信します。

UI でパイプラインを構築する際にソースを選択してセットアップします。これは、パイプラインセットアッププロセスのステップ 3 です。

1. [Observability Pipelines][1] に移動します。
1. テンプレートを選択します。
1. ソースを選択してセットアップします。
1. 宛先を選択してセットアップします。
1. プロセッサをセットアップします。
1. Observability Pipelines Worker をインストールします。

ソースには、それぞれ異なる前提条件と設定があります。一部のソースでは、ログを Observability Pipelines Worker に送信するように構成する必要もあります。

## 標準メタデータフィールド

すべてのソースは、取り込みイベントに以下の標準メタデータフィールドを追加します。

| フィールド名     | 値の型     | 例                      |
| -------------- | -------------- | ---------------------------- |
| `hostname`     | 文字列         | `"ip-34-2-553.us.test"`      |
| `timestamp`    | 文字列         | `"2024-06-17T22:25:55.439Z"` |
| `source_type`  | 文字列         | `"splunk_tcp"`               |

例えば、これが生のイベントの場合:

```
{
  "foo": "bar"
}
```

標準メタデータフィールドが追加された拡充イベントは次のようになります。

```
{
  "foo": "bar",
  "hostname": "ip-34-2-553.us.test",
  "timestamp": "2024-06-17T22:25:55.439Z",
  "source_type": "splunk_tcp"
}
```

これらの標準メタデータフィールドは、[`tap` コマンド][2]を使用してソースから送信されたイベントを表示すると確認できます。

イベントがソースに取り込まれた後、それらは異なるプロセッサや宛先に送信され、それらのフィールドが更新される場合があります。例えば、イベントが Datadog Logs の宛先に送信された場合、タイムスタンプフィールドは UNIX 形式に変換されます。

**注**: UI の `bytes in per second` (1 秒あたりのバイト数) メトリクスは、取り込まれた生のイベントを対象としており、拡充されたイベントではありません。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/troubleshooting/#use-tap-to-see-your-data