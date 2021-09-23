---
title: 継続的なプロファイリング
kind: ドキュメント
further_reading:
  - link: tracing/profiling/getting_started
    tag: Documentation
    text: アプリケーションの継続的なプロファイリングを有効にします。
  - link: tracing/profiling/runtime_metrics
    tag: Documentation
    text: ランタイムメトリクスの表示。
  - link: tracing/profiling/search_profiles
    tag: Documentation
    text: 使用可能なプロファイルタイプの詳細
  - link: 'https://www.datadoghq.com/blog/introducing-datadog-profiling/'
    tags: ブログ
    text: Datadog に常時接続型の本番環境プロファイリングが登場。
---
{{< alert type="info" >}}
Datadog Profiling はベータ版です。問題が発生したりフィードバックを共有したりする場合は、<a href="/help/">Datadog のサポートチーム</a>にお問い合わせください。
{{< /alert >}}

{{< img src="tracing/profiling/profiling_flamegraph.gif" alt="プロファイリングのフレームグラフ">}}

発見した CPU、メモリ、IO のボトルネックをメソッド名、クラス名、行番号で分類して、エンドユーザー側での遅延とインフラストラクチャーにかかるコストを大幅に削減することができます。

### 実環境での影響を最小限に

継続プロファイリングは、[JDK Flight Recorder][1] などの技術を活用し、すべてのサービスをまたいで実環境で実行されるよう設計されています。こうすることでホストの CPU とメモリ使用量への影響を最小限に抑えることができます。

## はじめに

お使いのサービスでプロファイリングを行うことで、すべてのスタックトレースを一つの管理画面で可視化することができます。設定方法はとても簡単です。

### 1. アプリケーションをインスツルメントする

アプリケーションにプロファイリングライブラリを追加して、Datadog Agent へのプロファイル送信を開始します。

{{< partial name="profiling/profiling-languages.html" >}}

## Datadog でのプロファイリング確認

これで、アプリケーションからプロファイルを Datadog に送信するための構成が完了しました。コードのパフォーマンスに関するインサイトを確認してみましょう。

### タグを使用してプロファイルを検索

[タグを使用してプロファイルを検索][2]します。特定のホスト、サービス、バージョン、あるいはいずれかの組み合わせなど、すべてのディメンションのデータを表示させることができます。

{{< img src="tracing/profiling/search_profiles.gif" alt="タグによるプロファイルの検索">}}

### デプロイメントでの機能パフォーマンスを追跡する

メソッドごとの主な CPU 使用率、スレッドごとの主なメモリ割り当て状況、バージョンごとの CPU 使用状況など、主要なプロファイリングメトリクスをサービスから取得してダッシュボードを可視化することができます。

{{< img src="tracing/profiling/profiling-metric-dashboard.gif" alt="ダッシュボードにプロファイリングのメトリクスを追加">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.oracle.com/javacomponents/jmc-5-4/jfr-runtime-guide/about.htm#JFRUH170
[2]: /ja/tracing/profiling/search_profiles