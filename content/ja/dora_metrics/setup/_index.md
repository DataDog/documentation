---
aliases:
- /ja/continuous_integration/dora_metrics/setup/
title: DORA メトリクスのセットアップ
---

{{< callout url="https://forms.gle/Eqq6uXfGjYxmqpjDA" header="false" >}}
DORA メトリクスの非公開ベータ版は終了しました。キャンセル待ちリストに参加するには、以下のフォームにご記入ください。
{{< /callout >}}

## 概要

DevOps Research and Assessment (DORA) メトリクスは、ソフトウェア開発の速度と安定性を示すために使用される [4 つの主要なメトリクス][1]です。

Deployment Frequency
: 組織が本番環境へのリリースを成功させる頻度。

Lead Time for Changes
: コミットが本番稼動するまでの時間。

Change Failure Rate
: デプロイメントによって本番環境で障害が発生した割合。

Time to Restore Service
: 本番稼動中の障害から組織が回復するのにかかる時間。

DORA メトリクスを定義し追跡することで、チームや組織のソフトウェアデリバリのスピードと品質の改善点を特定することができます。

{{< whatsnext desc="Datadog で DORA メトリクスをセットアップします。" >}}
    {{< nextlink href="continuous_integration/dora_metrics/setup/deployments" >}}デプロイメントイベントの送信{{< /nextlink >}}
    {{< nextlink href="continuous_integration/dora_metrics/setup/incidents" >}}インシデントイベントの送信{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://cloud.google.com/blog/products/devops-sre/using-the-four-keys-to-measure-your-devops-performance