---
further_reading:
- link: /real_user_monitoring/explorer
  tag: ドキュメント
  text: RUM エクスプローラーについて
- link: /real_user_monitoring/frustration_signals/
  tag: ドキュメント
  text: フラストレーションシグナルについて
kind: documentation
title: RUM フラストレーションシグナルダッシュボード
---

## 概要

フラストレーションシグナルダッシュボードでは、ユーザーがアプリケーションで最も摩擦を感じる要素を把握することができます。シグナルの種類によって 3 つのセクションに分かれています。

- **レイジークリック**: 1 秒間のスライディングウィンドウの中で、ユーザーが 3 回以上同じボタンをクリックした場合に測定されます。
- **エラークリック**: それがインタラクティブであると考えて、ユーザーが静的な要素をクリックした場合に測定されます。
- **デッドクリック**: ユーザーが要素をクリックした際に、JavaScript のエラーが発生した場合に測定されます。

{{< img src="real_user_monitoring/dashboards/frustration_signals_ootb_dashboard.png" alt="フラストレーションシグナルダッシュボード" style="width:100%;" >}}

表示される情報の詳細については、[RUM ブラウザデータ収集][1]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/data_collected/