---
title: エンリッチメントテーブルを含むログにカスタムメタデータを追加する
kind: ガイド
beta: true
further_reading:
  - link: /logs/processing/
    tag: Documentation
    text: ログの処理方法について
  - link: /logs/processing/parsing/
    tag: Documentation
    text: パースの詳細
---
<div class="alert alert-warning">
エンリッチメントテーブル機能は現在非公開ベータ版です。詳細については、<a href="https://docs.datadoghq.com/help/">Datadog サポート</a>にお問い合わせください。
</div>

## 概要

情報のテーブルを含む CSV ファイルをアップロードして、顧客の詳細、サービス名と情報、IP アドレスなどの新しいエンティティを Datadog で定義します。これは、エンリッチメントテーブルのプライマリキーと関連するメタデータによって表されます。このデータは、[Lookup Processor][1] での取り込み時にログのタグとして適用できます。

{{< img src="logs/guide/enrichment-tables/overview.png" alt="エンリッチメントテーブル" style="width:100%;">}}

## エンリッチメントテーブルを作成する

CSV ファイルをアップロードし、適切なすべての列に名前を付け、すべてのルックアップが実行されるプライマリキーを定義することにより、エンリッチメントテーブルを作成します。

{{< img src="logs/guide/enrichment-tables/configure-enrichment-table.png" alt="エンリッチメントテーブルを作成する" style="width:100%;">}}

このエンリッチメントテーブルを使用して、[Lookup Processor][1] でログに属性を追加できます。

## エンリッチメントテーブルを変更する

既存のエンリッチメントテーブルを新しいデータで変更するには、右上隅にある **Update Data +** ボタンをクリックします。選択した CSV がテーブルにアップサートされます。つまり、同じプライマリキーを持つ既存のすべての行が更新され、すべての新しい行が追加されます。テーブルが保存されると、アップサートされた行は非同期で処理され、プレビューで更新されます。更新された行が影響を受けるログに表示されるまで、最大 10 分かかる場合があります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/processing/processors/?tab=ui#lookup-processor