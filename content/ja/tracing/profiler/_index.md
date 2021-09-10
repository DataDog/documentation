---
title: 継続的なプロファイラー
kind: Documentation
aliases:
  - /ja/tracing/profiling
further_reading:
  - link: /tracing/profiler/enabling
    tag: Documentation
    text: アプリケーションの継続的なプロファイラーを有効にします。
  - link: getting_started/profiler
    tag: Documentation
    text: Continuous Profiler の概要
  - link: tracing/profiler/search_profiles
    tag: Documentation
    text: 使用可能なプロファイルタイプの詳細
  - link: 'https://www.datadoghq.com/blog/introducing-datadog-profiling/'
    tags: ブログ
    text: Datadog に常時接続型の本番環境プロファイリングが登場。
  - link: 'https://www.datadoghq.com/blog/datadog-github-action-vulnerability-analysis/'
    tags: ブログ
    text: 継続的な脆弱性分析のための Datadog GitHub アクション。
---
{{< vimeo 441865141 >}}

</br>

発見した CPU、メモリ、IO のボトルネックをメソッド名、クラス名、行番号で分類して、エンドユーザー側での遅延とインフラストラクチャーにかかるコストを大幅に削減することができます。

### 実環境での影響を最小限に

Continuous Profiler は、JDK Flight Recorder などの技術を活用し、すべてのサービスをまたいで実環境で実行されるよう設計されています。こうすることでホストの CPU とメモリ使用量への影響を最小限に抑えることができます。

## はじめに

お使いのサービスでプロファイリングを行うことで、すべてのスタックトレースを一つの管理画面で可視化することができます。設定方法はとても簡単です。

### アプリケーションをインスツルメントする

{{< partial name="profiling/profiling-languages.html" >}}

**Node**、**PHP**、**.NET** プロファイラーの非公開ベータ版が利用可能になった場合に通知するには、[こちらから新規登録][1]してください。

## プロファイラーの使用ガイド

[プロファイラーの概要][2]ガイドでは、パフォーマンスの問題があるサンプルサービスを例に、Continuous Profiler を使用して問題を理解し修正する方法を確認します。

## Datadog でのプロファイラー確認

アプリケーションからプロファイルを Datadog に送信するための構成が完了した後は、コードのパフォーマンスに関するインサイトを確認してみましょう。

### タグを使用してプロファイルを検索

[タグを使用してプロファイルを検索][3]します。特定のホスト、サービス、バージョン、あるいはいずれかの組み合わせなど、すべてのディメンションのデータを表示させることができます。

{{< img src="tracing/profiling/search_profiles.gif" alt="タグによるプロファイルの検索">}}

### デプロイメントでの機能パフォーマンスを追跡する

メソッドごとの主な CPU 使用率、スレッドごとの主なメモリ割り当て状況、バージョンごとの CPU 使用状況など、主要なプロファイリングメトリクスをサービスから取得してダッシュボードを可視化することができます。

{{< img src="tracing/profiling/profiling-metric-dashboard.gif" alt="ダッシュボードにプロファイリングのメトリクスを追加">}}

### プロファイリングデータにトレースを接続する

[APM 分散型トレーシング][4]と Continuous Profiler の双方が有効化されたアプリケーションプロセスは自動的にリンクされるため、[Code Hotspots タブ][5]でスパン情報からプロファイリングデータを直接開き、パフォーマンスの問題に関連する特定のコード行を見つけることができます。

{{< img src="tracing/profiling/code_hotspots_tab.gif" alt="Code Hotspots タブで APM トレーススパンのプロファイリング情報を確認">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.google.com/forms/d/e/1FAIpQLScb9GKmKfSoY6YNV2Wa5P8IzUn02tA7afCahk7S0XHfakjYQw/viewform
[2]: /ja/getting_started/profiler/
[3]: /ja/tracing/profiling/search_profiles
[4]: /ja/tracing/
[5]: /ja/tracing/profiler/connect_traces_and_profiles/