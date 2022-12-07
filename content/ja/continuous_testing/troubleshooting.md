---
aliases:
- /ja/synthetics/cicd_integrations/troubleshooting
description: Continuous Testing と CI/CD のコンセプトを学び、よくあるエラーのトラブルシューティングを行います。
further_reading:
- link: /synthetics/cicd_integrations/configuration
  tag: ドキュメント
  text: Continuous Testing と CI/CD の構成について学ぶ
kind: documentation
title: Continuous Testing と CI/CD のトラブルシューティング
---

## 概要

このページでは、Continuous Testing と CI/CD に関する問題のトラブルシューティングに役立つ情報を提供します。さらにヘルプが必要な場合は、[Datadog サポート][1]にお問い合わせください。

## 用語

CI バッチ
: 継続的インテグレーションまたは継続的デリバリー (CI/CD) パイプラインまたは [Datadog Synthetic Monitoring API][2] を通してトリガーされる Continuous Testing テストのグループです。

テスト実行
: [API][7] や[ブラウザテスト][8]といった Continuous Testing のテストの 1 回の実行。再試行が構成されている場合は、個々のテスト実行としてカウントされます。たとえば、2 回の再試行を伴うテストは、最大 3 回の関連するテスト実行を持つことができます。

並列テスト
: 別の Continuous Testing のテストと同時に実行される Continuous Testing のこと。いくつのテストを並行して実行するかを設定するには、[Continuous Testing の設定ページ][9]で並列化の設定を行います。

バッチタイムアウト
: バッチタイムアウトは、コンフィギュレーションファイルで設定された[ポーリングタイムアウト][3]に基づいて、バッチが妥当な時間内に完了しない場合に発生します。

実行ルール: [実行ルール][4]は、テストの失敗が CI パイプラインに与える影響を、影響の大きいものから小さいものへと定義します (`skipped`、`non_blocking`、`blocking`)。これらのオプションは重み付けされ、デフォルトは最も影響の大きいものになります。UI で `skipped` と設定され、構成ファイルで `blocking` と設定されたテストは、テスト実行時にスキップされます。</br><br> 実行ルールはテストのプロパティ、グローバルコンフィギュレーションファイル、あるいは個々のテストのオーバーライドファイルで設定することができます。

## エクスプローラー

### CI メタデータが表示されない

CI/CD テスト実行のトリガーに API エンドポイントを使用しているかどうかを確認します。CI Results Explorer に CI メタデータを入力するには、Datadog の[ネイティブインテグレーション][5]、または [NPM パッケージ][6]のいずれかを使用する必要があります。

## CI/CD パイプライン内

### CI パイプラインでテストがタイムアウトする

まず確認すべきは、[グローバルコンフィギュレーションファイル][10]でどの失敗モードフラグを渡しているかということです。複数のテストを含む CI の実行では、一部のテストは [Continuous Testing の設定ページ][9]で定義された並列化設定に基づいてキューに入れられます。組織のニーズに応じて、構成と並列化の両方を調整する必要があるかもしれません。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help/
[2]: /ja/api/latest/synthetics/#trigger-tests-from-cicd-pipelines
[3]: /ja/continuous_testing/cicd_integrations/configuration/?tab=npm#additional-configuration
[4]: /ja/continuous_testing/cicd_integrations/configuration/?tab=npm#execution-rule
[5]: /ja/continuous_testing/cicd_integrations
[6]: /ja/continuous_testing/cicd_integrations#use-the-cli
[7]: /ja/synthetics/api_tests/
[8]: /ja/synthetics/browser_tests/?tab=requestoptions
[9]: /ja/continuous_testing/settings
[10]: /ja/continuous_testing/cicd_integrations/configuration/?tab=npm#global-configuration-file-options