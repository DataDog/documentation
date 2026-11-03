---
description: Real User Monitoringにおいて、チームが所有する表示するに関連するイベントデータをフィルタリングするための、表示するベースのオーナーシップの使用方法に関するガイドです。
further_reading:
- link: /monitors/create/types/real_user_monitoring/
  tag: ドキュメント
  text: RUM について学ぶ
- link: https://www.datadoghq.com/blog/simplify-micro-frontend-observability-with-datadog-rum/
  tag: ブログ
  text: Datadog RUMでマイクロフロントエンドのオブザーバビリティを簡素化する
title: ビューの所有権
---
## 概要 {#overview}

表示するのオーナーシップにより、チームが所有するアプリケーションの各部分におけるRUMメトリクスとイベントのみを表示できます。表示するのオーナーシップを設定すると、それらの表示するに関連付けられたすべてのRUMイベントとメトリクスに、チーム名が**タグ付け**されます。[チームフィルター][2]を使用して、選択したチームに合わせて表示するのスコープを設定します。これは{{< ui >}}Summary{{< /ui >}}、{{< ui >}}Optimization{{< /ui >}}、および{{< ui >}}Session Explorer{{< /ui >}}ページに表示されます。

{{< img src="/real_user_monitoring/ownership_of_views/ownership-sessions-explorer-1.png" alt="Sessionsエクスプローラーの表示するでは、チーム所有権で割り当てられたチームに基づいてユーザーセッションをフィルタリングでき、チームに関連するリプレイを簡単に見つけられます。" >}}

チームを選択すると、メトリクスとイベントデータが、それらのチームが所有する表示するにフィルタリングされます。複数のチームに所属している場合は、それらを任意に組み合わせて選択できます。チームによるフィルタリングを停止するには、選択を解除してください。表示するのオーナーシップを持つチームは、すべてのイベントサイドパネルの右上隅にも表示されます。

## オーナーシップルール{#ownership-rules}

表示するのオーナーシップを設定するためのルールには、2つのタイプがあります。

1. **完全一致ルール**：表示するの名前と1対1で対応します。 
2. **プレフィックスルール**：名前にプレフィックスが含まれるすべての表示するをキャプチャします。

{{< img src="/real_user_monitoring/ownership_of_views/ownership-rule-type.png" alt="表示するのオーナーシップを定義するための2種類のルールを表示するサイドパネル。" >}}

すべてのルールには、少なくとも1つの**チーム**と1つの**スコープ**を定義する必要があります。サポートされているスコープタイプは2つです。
- すべてのサービスにわたる**現在のRUMアプリケーション**用
- すべてのアプリケーションにわたる**特定のサービス**用

## セットアップ {#setup}

<div class="alert alert-info">この機能を使用するには、組織でチームが有効化され、設定されている必要があります。</div>

アプリケーションの表示するに関するチーム所有権を設定するには：

1. Datadogで、[{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Manage Applications{{< /ui >}}][1]ページに移動し、アプリケーションを選択します。
2. 左側のナビゲーションメニューで、{{< ui >}}Ownership{{< /ui >}}を選択します。
3. 各表示するについて、{{< ui >}}Missing Ownership{{< /ui >}}をクリックし、その表示するのルールを作成します。
4. {{< ui >}}All Rules{{< /ui >}}タブをクリックして、作成されたすべてのルールとそれに関連付けられた表示するを確認します。

表示するをチームに関連付けると、Datadogは新しいイベントデータをそのチームに自動的に割り当てます。

<div class="alert alert-danger">チームと表示するのマッピングを変更した場合、過去のメトリクスやイベントには新しいチームが遡及的にタグ付けされません。</div>

{{< img src="/real_user_monitoring/ownership_of_views/ownership-application-management-2.png" alt="アプリケーションの異なるページを特定のチームに割り当てることができる、チーム所有権ページの表示する。" >}}

<div class="alert alert-info"><a href="https://docs.datadoghq.com/api/latest/rum-teams-ownership/">Datadog API</a>を使用して表示するの所有権を設定することもできます。</div>

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/list
[2]: /ja/account_management/teams/#team-filter