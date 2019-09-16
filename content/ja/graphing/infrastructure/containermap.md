---
title: コンテナマップの概要
kind: documentation
aliases:
  - /ja/infrastructure/hostmap/
  - /ja/guides/hostmap
further_reading:
  - link: graphing/infrastructure/livecontainers
    tag: グラフ
    text: 環境内のすべてのコンテナのリアルタイム表示
  - link: graphing/infrastructure/process
    tag: グラフ
    text: システムのあらゆるレベルの事象の把握
---
## 概要

[ホストマップ][1]と同様に、[コンテナマップ][2]は、コンテナの健全性に関する全体像を提供します。Datadog は、ECS、Docker、Kubernetes などと統合されています。グループ化とフィルターをカスタマイズして使用し、1 つの画面にすべてのコンテナをまとめて表示できます。さらに、メトリクスを一目で理解できるように色や図形を設定できます。

外れ値の検出、使用パターンの識別、リソースの問題の回避、コンテナの最適な管理方法の決定などを 1 箇所で行うことができます。コンテナの数が 10 個でも 100 個でも 1 万個でも関係ありません。[オートディスカバリー][3]が、新しいコンテナとそのアカウントを自動的に検出します。

{{< img src="graphing/infrastructure/containermap/containermap.png" alt="container map part 1" responsive="true" style="width:80%;">}}

## インストール
[Agent][4] をデプロイしたら、それ以上の設定は不要です。[Docker Agent][5] ではなく標準インストールで Docker コンテナ情報を収集するには、`dd-agentuser` が `docker.sock` へのアクセス許可を持つ必要があります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/graphing/infrastructure/hostmap
[2]: https://app.datadoghq.com/infrastructure/map?node_type=container
[3]: /ja/agent/autodiscovery
[4]: /ja/agent
[5]: /ja/agent/docker