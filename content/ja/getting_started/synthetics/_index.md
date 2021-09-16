---
title: Synthetic モニタリングの概要
kind: documentation
further_reading:
  - link: 'https://learn.datadoghq.com/course/view.php?id=39'
    tag: ラーニングセンター
    text: Synthetic テストの紹介
  - link: /synthetics/api_tests
    tag: ドキュメント
    text: API テストについて
  - link: /synthetics/multistep
    tag: ドキュメント
    text: マルチステップ API テストの詳細
  - link: /synthetics/browser_tests
    tag: ドキュメント
    text: ブラウザテストの詳細
  - link: /synthetics/private_locations
    tag: Documentation
    text: プライベートロケーションの詳細
---
## 概要

Synthetic テストでは、**世界中からのシミュレートされたリクエストとアクション**を使用して、システムとアプリケーションがどのように実行されているかを観察できます。Datadog は、バックエンドからフロントエンドまで、さまざまなネットワークレベル (`HTTP`、`TCP`、`SSL`、`DNS`、`ICMP`) で、制御された安定した方法で Web ページと API のパフォーマンスを追跡します。障害のある動作 (リグレッション、機能の破損、応答時間の長さ、予期しないステータスコードなど) が発生した場合に警告します。

アプリケーションを監視する方法は 3 つあります。[API テスト][1]は API エンドポイントのアップタイムを監視し、[マルチステップ API テスト][2]は複数の HTTP リクエストをリンクし、[ブラウザテスト][3]は主要なユーザージャーニーをテストします。管理ロケーションまたは[プライベートロケーション][4]からすべてのテストを実行して、内部向けのアプリケーションを監視します。Synthetic テストは、スケジュールに従って、または [CI/CD パイプライン][5]から直接手動でトリガーできます。

{{< img src="synthetics/synthetics_home.png" alt="Synthetic モニタリングのホームページ" >}}

Datadog を使用して最初の Synthetic テストを設定するには、以下のセクションに従ってください。

## 前提条件

[Datadog アカウント][6]をまだ作成していない場合は作成します。

## 初めてテストを構成する場合

- [API テストを作成][7]して、API エンドポイントのアップタイムの監視を開始します。
- [マルチステップ API テストを作成][8]して、API レベルで主要なワークフローの監視を開始します。
- [ブラウザテストを作成][9]して、アプリケーションで重要なビジネストランザクションのテストを開始します。
- [プライベートロケーションを作成][10]して、すべての Synthetic テストタイプを使用して内部アプリケーションを監視します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/api_tests/
[2]: /ja/synthetics/multistep
[3]: /ja/synthetics/browser_tests/
[4]: /ja/synthetics/private_locations
[5]: /ja/synthetics/ci/
[6]: https://www.datadoghq.com/
[7]: /ja/getting_started/synthetics/api_test/
[8]: /ja/getting_started/synthetics/api_test/#create-a-multistep-api-test
[9]: /ja/getting_started/synthetics/browser_test/
[10]: /ja/getting_started/synthetics/private_location/