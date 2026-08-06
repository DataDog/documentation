---
description: バック エンド の Error Tracking における疑わしい原因について説明します。
further_reading:
- link: /error_tracking/monitors
  tag: ドキュメント
  text: Error Tracking Monitors の詳細
title: 疑わしい原因
---

## 概要

Datadog は issue を作成するタイミングで、原因推定を示す Suspected cause ラベルを付与します。Suspected cause ラベルは、開発者がエラーの根本原因としてまず想定する仮説を表します。この初期分類により、切り分けが進めやすくなり、再発しやすい問題への理解も深まります。

Suspected cause は次のいずれかのカテゴリになります:

- **Code Exception**: コードの欠陥によってエラーが発生しました。
- **Failed Request**: API エンド ポイントがエラー ステータス コードで応答しました。
- **Illegal Object Access**: コードが null または undefined のオブジェクトにアクセスしました。
- **Invalid Argument**: 関数が無効な引数で呼び出されました。
- **Network**: サーバーからの応答に時間がかかった、またはネットワークが低速でした。

Suspected cause は検索のフィルターとして利用できるため、関連する issue を絞り込みやすくなります。

{{< img src="/error_tracking/suspected-cause.png" alt="Suspected cause で検索を絞り込みます。" >}}

### Suspected cause ラベルの更新

付与された Suspected cause が実態と合わない場合は、手動で編集できます。運用しながらラベル付けの精度を継続的に改善できます。

Suspected cause を更新するには、ラベルをクリックして別の値を選択します。

{{< img src="/error_tracking/suspected-cause-labels.png" alt="Suspected cause ラベルを更新します。" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}