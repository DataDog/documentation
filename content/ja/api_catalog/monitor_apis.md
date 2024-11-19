---
aliases:
- /ja/tracing/api_catalog/monitor_apis/
further_reading:
- link: /tracing/api_catalog/get_started/
  tag: ドキュメント
  text: API カタログのセットアップ
- link: /monitors/
  tag: ドキュメント
  text: モニターによるアラート
- link: /synthetics/api_tests/
  tag: ドキュメント
  text: Synthetic API テスト
- link: /security/application_security/
  tag: ドキュメント
  text: アプリケーション セキュリティ モニタリング
is_beta: true
title: API のモニタリング
---

## 概要

[エンドポイントを登録][1]し、[チーム所有権を割り当て][2]た後、それらの管理と改善を開始できます。API カタログを使用して、以下のような活動を始めましょう。

 - パフォーマンスが低下している API の検出と調査。
 - レイテンシーやエラーレートなどの主要なパフォーマンスメトリクスに基づくアラートの作成。
 - トリガーされたアラート、テスト結果、セキュリティシグナルの観点から API の信頼性を追跡。
 - Synthetic Monitoring を使用して API テストを標準化し、テストカバレッジを向上。

 <div class="alert alert-info">エンドポイントを登録すると、Datadog はより優れたモニタリング機能のために新しいエンドポイントメトリクスの収集を開始します。登録されたエンドポイントのトラフィックによっては、メトリクスが表示されるまで時間がかかる場合があります。</div>

## 期待されるパフォーマンスから逸脱するエンドポイントへのアラート

エンドポイントが予期せぬ動作をした場合 (例えば、時折のパフォーマンス低下)、外れ値データを報告した場合 (極端に遅いパフォーマンスやまれなエラーなど)、または望ましいしきい値を超えるメトリクスを達成した場合 (高いエラーレート) にアラートを受け取るよう、モニターをセットアップすることができます。

最新のモニターステータスは **Explorer** に表示され、モニターがなぜアラートを発しているのか、そしてそれに対処する方法についての詳細情報を確認できます。また、モニターをクリックして表示することで、調査を開始すべきかどうかを判断することもできます。

{{< img src="tracing/api_catalog/api-catalog-monitor.png" alt="API Catalog Explorer におけるモニターステータスメニューと Create Monitor ボタン" style="width:40%;" >}}

**MONITORS** 列の **+ Monitor** をクリックすることで、API カタログから直接 **Latency** または **Error rate** に対するモニターを作成することもできます。モニターアラートのセットアップと管理に関する追加情報については、[アラート][5]を参照してください。

## API テストカバレッジの追跡と改善

Synthetic API テストを使用して、エンドポイントの自動スケジュールテストをセットアップし、テストが失敗した場合にアラートを受け取ることで、問題の診断と修正を行うことができます。

Explorer ページの **API TESTS** 列には、どのエンドポイントにテストが設定されており、どれが失敗しているかが表示されます。テストが失敗している場合は、そのテストステータスを調べて詳細を確認します。

{{< img src="tracing/api_catalog/api-catalog-tests.png" alt="API Catalog Explorer における API テストステータスメニューと Create Test ボタン" style="width:40%;" >}}

**API TESTS** 列の **+ API Test** をクリックして、このエンドポイントに対する別の Synthetic API テストを作成します。テストのセットアップに関する詳細については、[Synthetic HTTP API テスト][3]のドキュメントを参照してください。

## セキュリティギャップの発見と解消

Datadog の [Application Security Management (ASM)][4] によって提供される Explorer の **SECURITY SIGNALS** 列では、ASM がエンドポイントに関連するサービスへの脅威を検出したかどうかが表示されます。この列でテーブルをソートして、最も影響を受けているエンドポイントを確認します。**View in ASM** をクリックして、コードや上流の依存関係における脅威と脆弱性を調査し、対処します。

{{< img src="tracing/api_catalog/api-catalog-security-signals.png" alt="API Catalog Explorer におけるセキュリティシグナルステータスメニューと View in ASM ボタン" style="width:60%;" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api_catalog/add_entries/#register-automatically-detected-endpoints
[2]: /ja/api_catalog/owners_and_tags/#establishing-owners
[3]: /ja/synthetics/api_tests/http_tests/
[4]: /ja/security/application_security/threats/
[5]: /ja/monitors/