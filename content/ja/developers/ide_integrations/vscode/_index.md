---
description: Visual Studio Code で直接ローカル環境の Synthetic テストを実行する方法について説明します。
further_reading:
- link: /getting_started/synthetics/
  tag: Documentation
  text: Synthetic モニタリングの概要
- link: /continuous_testing/testing_tunnel/
  tag: Documentation
  text: Continuous Testing Tunnel について
is_beta: true
kind: documentation
title: Visual Studio Code の Datadog 拡張機能
---

{{< callout url="#" btn_hidden="true">}}
  Visual Studio Code の Datadog 拡張機能は公開ベータ版です。すでに Synthetic テストを設定している Datadog ユーザーを対象としています。拡張機能は、HTTP テストとブラウザテストの実行をサポートしています。拡張機能が予期せず停止した場合は、拡張機能の更新を確認するか、チームに連絡してください。
{{< /callout >}}

## 概要

Visual Studio Code の Datadog 拡張機能は、IDE 内で直接[ローカル環境での Synthetic HTTP テストとブラウザテストを実行する][1]ことができ、これによりコードの信頼性を高めることができます。この拡張機能により、コードの変更に起因する潜在的な問題が、コードが本番環境にデプロイされてエンドユーザーに影響を与える前に特定され、対処されることを保証します。

{{< img src="developers/ide_integrations/vscode/vscode-extension-demo.png" alt="Visual Studio Code での Datadog 拡張機能" style="width:100%;" >}}

Datadog 拡張機能を利用することで、以下のことが可能になります。

- ローカル環境で Synthetic テストを実行する。
- 元のテスト定義を変更することなく、カスタムパラメーターを設定する。
- Visual Studio Code や Datadog でテスト結果をローカルで確認し、追加情報にアクセスする。
- 関連するテストを同時に実行し、重要なものだけをテストする。
- よく使う Synthetic テストは、**Favorites** に追加することでリストを作成する。

## 要件

- **Datadog アカウント**: この拡張機能を使用するには、Datadog のアカウントが必要です。Datadog が初めての方は、[Datadog Web サイト][2]で Datadog の観測可能性ツールの詳細と無料トライアルにサインアップしてください。
- **Synthetic テスト**: この拡張機能を使うと、Synthetic テストを実行することができます。Synthetic テストをまだ設定していない場合は、[Datadog でテストを作成][3]します。ローカル環境でのテスト実行については、[API テストの概要][4]、[ブラウザテストの概要][5]、および [Continuous Testing Tunnel のドキュメント][1]を参照してください。

## セットアップ

Visual Studio Marketplace から [Datadog 拡張機能][6]をインストールします。

## Synthetic テストをローカルで実行する

1. Datadog 拡張機能をインストール後、Datadog にログインします。
2. 実行する Synthetic テストを選択します。**Search** アイコンをクリックすると、特定のテストを検索することができます。
3. ローカル環境でテストを実行するには、Synthetic テストの構成を更新して、開始 URL の変換を有効にし、**Settings** ページで `localhost` URL を指定します。
4. テストを実行します。

{{< img src="developers/ide_integrations/vscode/test_configuration_modified_starturl.png" alt="Synthetic テストの開始 URL をローカルホストの URL に指定できる Test Configuration パネルと Settings ページ" style="width:100%;" >}}

## アクセス許可

デフォルトでは、[Datadog 管理者および Datadog 標準ロール][7]を持つユーザーのみが、Synthetic HTTP およびブラウザテストを作成、編集、削除できます。Synthetic HTTP およびブラウザテストの作成、編集、削除アクセスを取得するには、ユーザーをこれら 2 つの[デフォルトのロール][7]のいずれかにアップグレードします。

[カスタムロール機能][8]を使用している場合は、`synthetics_read` および `synthetics_write` 権限を含むカスタムロールにユーザーを追加します。

## フィードバック

ご意見・ご感想は、[team-ide-integration@datadoghq.com][9] にメールをお送りください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_testing/testing_tunnel/
[2]: https://www.datadoghq.com/
[3]: https://app.datadoghq.com/synthetics/create
[4]: /ja/getting_started/synthetics/api_test
[5]: /ja/getting_started/synthetics/browser_test
[6]: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode
[7]: /ja/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[8]: /ja/account_management/rbac/?tab=datadogapplication#custom-roles
[9]: mailto:team-ide-integration@datadoghq.com