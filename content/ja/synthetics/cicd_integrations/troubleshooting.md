---
description: Synthetics と CI/CD のコンセプトを学び、よくあるエラーのトラブルシューティングを行います。
further_reading:
- link: /synthetics/cicd_integrations/configuration
  tag: ドキュメント
  text: Synthetics と CI/CD の構成について学ぶ
kind: documentation
title: CI/CD インテグレーションのトラブルシューティング
---

## 概要

このページでは、Synthetics と CI/CD に関する問題のトラブルシューティングに役立つ情報を提供します。さらにヘルプが必要な場合は、[Datadog サポート][1]にお問い合わせください。

## 用語

CI バッチ
: 継続的インテグレーションと継続的デリバリー (CI/CD) パイプラインまたは [Synthetic Monitoring API][2] を通してトリガーされる Synthetic テストのグループです。

テスト実行
: Synthetic テストの 1 回の実行。再試行が構成されている場合は、個々のテスト実行としてカウントされます。たとえば、2 回の再試行を伴うテストは、最大 3 回の関連するテスト実行を持つことができます。

バッチタイムアウト
: バッチタイムアウトは、コンフィギュレーションファイルで設定された[ポーリングタイムアウト][3]に基づいて、バッチが妥当な時間内に完了しない場合に発生します。

実行ルール: [実行ルール][4]は、テストの失敗が CI パイプラインに与える影響を、影響の大きいものから小さいものへと定義します (`skipped`、`non_blocking`、`blocking`)。これらのオプションは重み付けされ、デフォルトは最も影響の大きいものになります。UI で `skipped` と設定され、構成ファイルで `blocking` と設定されたテストは、テスト実行時にスキップされます。</br><br> 実行ルールはテストのプロパティ、グローバルコンフィギュレーションファイル、あるいは個々のテストのオーバーライドファイルで設定することができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help/
[2]: /ja/api/latest/synthetics/#trigger-tests-from-cicd-pipelines
[3]: /ja/synthetics/cicd_integrations/configuration/?tab=npm#additional-configuration
[4]: /ja/synthetics/cicd_integrations/configuration/?tab=npm#execution-rule