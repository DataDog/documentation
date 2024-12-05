---
description: ジャーニーは、ユーザーが製品、サービス 、またはブランドを発見する際にたどる経路を理解するのに役立ちます。
further_reading:
- link: /product_analytics/
  tag: ドキュメント
  text: 製品分析
title: ジャーニー
---

{{< callout url="http://datadoghq.com/private-beta/product-analytics" header="false" >}}
製品分析の機能はすべて、ご利用に制限があります。アクセスをリクエストするには、フォームにご記入ください。
{{< /callout >}}

## 概要

ジャーニーは、エンドツーエンドでユーザージャーニーを追跡し、各ユーザーがアプリケーションをどのように操作しているかを発見するのに役立ちます。データを抽出することで、自分たちの思い込みではなく、ユーザーの実際の使用方法に合わせてアプリを設計することができます。

## ファネル分析

{{< img src="/product_analytics/journeys/pa-funnel.png" alt="ファネル分析でエンドツーエンドのコンバージョンを理解。">}}

[ファネル分析][1]では、1 つの鍵となるワークフローのコンバージョンをエンドツーエンドで理解することができます。サイドパネルでは詳細を掘り下げ、コンバージョン率がなぜそうなったかを理解することができます。例えば、ユーザー離脱の原因となるパフォーマンスの問題があったのかや、最近のリリースで発生したエラーが出てしまっているのかなど、コンバージョンに成功したユーザーや離脱したユーザーのセッションリプレイを見て、何が起こったかを正確に確認します。

## サンキー図

{{< img src="/product_analytics/journeys/pa-sankey.png" alt="サンキー図を使用して、アプリケーションのすべてのユーザージャーニーを視覚化し、クリティカルパスを分析">}}

[サンキー図][2]を利用すれば、アプリケーション全体のすべてのユーザージャーニーを視覚化して、フローへの最も重要な貢献を特定することができます。

## コンバージョン

{{< img src="/product_analytics/journeys/pa-conversions.png" alt="コンバージョン率の値を時系列でグラフ表示">}}

コンバージョン率の値をグラフで表示することで、[コンバージョン率][3]を時系列で確認することができます。

## 参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/product_analytics/journeys/funnel_analysis
[2]: /ja/product_analytics/journeys/sankey
[3]: https://app.datadoghq.com/product-analytics/user-journey/conversion?