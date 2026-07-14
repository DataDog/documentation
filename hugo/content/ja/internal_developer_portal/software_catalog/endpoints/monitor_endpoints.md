---
aliases:
- /ja/tracing/api_catalog/monitor_apis/
- /ja/api_catalog/monitor_apis/
- /ja/service_catalog/endpoints/monitor_endpoints/
- /ja/software_catalog/endpoints/monitor_endpoints/
further_reading:
- link: /tracing/api_catalog/get_started/
  tag: ドキュメント
  text: Endpoints list の概要
- link: /monitors/
  tag: ドキュメント
  text: モニターでアラートを出す
- link: /synthetics/api_tests/
  tag: ドキュメント
  text: Synthetic API テスト
- link: /security/application_security/
  tag: ドキュメント
  text: App and API Protection の監視
title: エンドポイントの監視
---

## 概要

Endpoints list では、エンドポイントの健全性を監視および維持できます。パフォーマンスの低い API を検出し、主要なパフォーマンスメトリクスのアラートを設定し、アラートとテスト結果を通じて API の信頼性を追跡し、標準化された API テストを確立して、Synthetic Monitoring を使用してテストカバレッジを向上させることができます。

## エンドポイントパフォーマンスの監視

エンドポイントの健全性とパフォーマンスを追跡し、パフォーマンスの問題に対応するためのモニターを作成および管理します。アラートを作成して、応答時間が異常に長い、稀なエラーが発生するなど、パフォーマンスの断続的な低下や外れ値を特定できます。アラートでは、定義したしきい値を超えたメトリクス (エラーレートなど) を追跡することもできます。

既存のモニターは **MONITORS** 列に表示されます:

{{< img src="tracing/software_catalog/monitors.png" alt="Endpoints list におけるモニターステータスメニューと Create Monitor ボタン" style="width:100%;" >}}


エンドポイントにモニターをセットアップするには
1. **MONITORS** 列のセルにカーソルを合わせます。
1. **+ Create Monitor** をクリックします。
1. APM Monitor ページの情報を入力します。
1. **Create** をクリックします。

詳しくは、[モニター][1]をご覧ください。

## API テストカバレッジの管理

Synthetic API テストを使用して、エンドポイントの自動テストをセットアップします。これらのテストは失敗時にアラートを出すので、ユーザーに影響を与える前に問題を診断して修正することができます。

エンドポイントの Synthetic API テストを作成するには

1. **MONITORS** 列のセルにカーソルを合わせます。
1. **+ Create Synthetic API Test** をクリックします。
1. New API Test ページでテストの設定を構成します。
1. **Create Test** をクリックします。

詳しくは、[HTTP テスト][2] をご覧ください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/
[2]: /ja/synthetics/api_tests/http_tests/