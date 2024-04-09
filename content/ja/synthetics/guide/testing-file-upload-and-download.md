---
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: ブログ
  text: Datadog Synthetic モニタリングの紹介
- link: synthetics/
  tag: Documentation
  text: Synthetic モニタリングについて
- link: synthetics/browser_tests
  tag: Documentation
  text: ブラウザテストの設定
kind: ガイド
title: テストファイルのアップロードとダウンロード
---

## 概要

Web アプリケーションには多くのロジックを埋め込むことができ、ウェブサイトのテスト用のエンドツーエンドのテストは、多くの場合、基本的なインタラクション (クリックや入力フォームなど) によって作成されますが、重要なビジネストランザクションをアプリケーションで実行できるか確認するため、時にはもう一歩踏み込んで複雑なインタラクションを検証する必要があります。

## ファイルアップロードのテスト

プロファイルの作成をテストするための機能的なワークフローの最終ステップを検証するため、**ファイルをアップロード**できます。テストレコーダーのレベルでファイルをアップロードすると、Datadog Synthetic ブラウザテストではアップロードされたファイルを自動的に識別し、[`Upload file` 関連ステップ][1]が作成されます。それが済むと、テストの実行時にそのファイルを再びアップロードすることができます。

{{< img src="synthetics/guide/testing-a-downloaded-file/upload_file.mp4" alt="ファイルのアップロード" video="true" width="100%">}}

## ファイルダウンロードのテスト

**Downloading files** も、ユーザーが Web アプリケーションで利用する一般的なアクションです。たとえば、E コマースサイトから注文確認書をダウンロードしたり、銀行の口座取引記録を PDF や CSV 形式でエクスポートすることを思い浮かべてください。

Datadog のブラウザテストおよび `Test a downloaded file` アサーションにより、Web アプリケーションからのダウンロード可能なファイルが (例えば FTP サーバーから) 正しく提供されているかを確認することができます。このアサーションにより、ダウンロード可能なファイルをテストし、ファイル名、ファイルサイズ、データが正しいことを確認できます。

このアサーションでブラウザテストをセットアップするには

1. ブラウザテストで、**ファイルのダウンロードを生成するステップを記録**します。以下の例では `.docx` ファイルのダウンロードをトリガーするボタンクリックの記録方法を示しています。ファイルサイズは 50Mb 以下でなければなりません。

    {{< img src="synthetics/guide/testing-a-downloaded-file/recording_step.mp4" alt="ステップの記録" video="true">}}

2. ** `Test a downloaded file` アサーションを追加** し、ファイルが正常にダウンロードされたことを確認します。

    {{< img src="synthetics/guide/testing-a-downloaded-file/basic_assert.mp4" alt="アサーションの追加" video="true">}}

     必要に応じて、md5 文字列を使ったファイル名、ファイルサイズ、統合性など、より高度な検証を行うことができます。

    {{< img src="synthetics/guide/testing-a-downloaded-file/advanced_assert.mp4" alt="高度な検証" video="true">}}

     [ブラウザテストアサーション][2]の一覧から `Test a downloaded file` アサーションの詳細を確認できます。

3. **ファイルがダウンロードされたことを確認**し、生成されたテスト結果からアサーションで設定した要件と一致することを確認します。 

    {{< img src="synthetics/guide/testing-a-downloaded-file/test_results.png" alt="テスト結果" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/browser_tests/actions/#upload-file
[2]: /ja/synthetics/browser_tests/actions/#assertion