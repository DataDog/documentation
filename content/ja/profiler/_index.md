---
aliases:
- /ja/tracing/profiling/
- /ja/tracing/profiler/
further_reading:
- link: /profiler/enabling
  tag: ドキュメント
  text: アプリケーションの継続的なプロファイラー有効化
- link: getting_started/profiler
  tag: ドキュメント
  text: Continuous Profiler の概要
- link: profiler/search_profiles
  tag: ドキュメント
  text: 使用可能なプロファイルタイプの詳細
- link: /developers/guide/data-collection-resolution-retention/
  tag: ドキュメント
  text: データ収集、解決、保持
- link: https://www.datadoghq.com/blog/introducing-datadog-profiling/
  tag: ブログ
  text: Datadog に常時接続型の本番環境プロファイリングが登場
- link: https://www.datadoghq.com/blog/datadog-github-action-vulnerability-analysis/
  tag: ブログ
  text: 継続的な脆弱性分析のための Datadog GitHub アクション
- link: https://www.datadoghq.com/blog/code-optimization-datadog-profile-comparison/
  tag: ブログ
  text: Datadog プロファイル比較を使用してコードを比較および最適化します。
- link: https://www.datadoghq.com/blog/engineering/how-we-optimized-our-akka-application-using-datadogs-continuous-profiler/
  tag: ブログ
  text: Datadog の Continuous Profiler を使用して Akka アプリケーションを最適化した方法
- link: https://www.datadoghq.com/blog/ruby-profiling-datadog-continuous-profiler/
  tag: ブログ
  text: Datadog Continuous Profiler で Ruby のコードパフォーマンスを分析
title: Continuous Profiler
---

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/441865141/rendition/1080p/file.mp4?loc=external&signature=ebc774b892f062e45922dcae82f4ebff0a906c8ec30f34b9d77494b0051748ad" poster="/images/poster/profiler.png" >}}

</br>

発見した CPU、メモリ、IO のボトルネックをメソッド名、クラス名、行番号で分類して、エンドユーザー側での遅延とインフラストラクチャーにかかるコストを大幅に削減することができます。

### 実環境での影響を最小限に

Continuous Profiler は、JDK Flight Recorder などの技術を活用し、すべてのサービスの実環境で実行します。こうすることでホストの CPU とメモリ使用量への影響を最小限に抑えることができます。

## はじめに

お使いのサービスでプロファイリングを行うことで、すべてのスタックトレースを一つの管理画面で可視化することができます。設定方法はとても簡単です。

### アプリケーションをインスツルメントする

{{< partial name="profiling/profiling-languages.html" >}}

## プロファイラーの使用ガイド

[プロファイラーの概要][1]ガイドでは、パフォーマンスの問題があるサンプルサービスを例に、Continuous Profiler を使用して問題を理解し修正する方法を確認します。

## Datadog でのプロファイラー確認

アプリケーションからプロファイルを Datadog に送信するための構成が完了した後は、コードのパフォーマンスに関するインサイトを確認してみましょう。

デフォルトでは、プロファイルは 7 日間、プロファイルデータから生成されたメトリクスは 1 か月間保持されます。

### プロファイルタイプ

対応言語ごとに収集されるプロファイルデータの種類については、[プロファイルのデータタイプ][6]を参照してください。

{{< img src="profiler/profile-types.png" alt="Java アプリケーションで収集されるプロファイルタイプのリスト" style="width:100%;" >}}

### タグを使用してプロファイルを検索

[タグを使用してプロファイルを検索][2]します。特定のホスト、サービス、バージョン、あるいはいずれかの組み合わせなど、すべてのディメンションのデータを表示させることができます。

{{< img src="profiler/search_profiles.mp4" alt="タグによるプロファイルの検索" video=true >}}

### デプロイメントでの機能パフォーマンスを追跡する

メソッドごとの主な CPU 使用率、スレッドごとの主なメモリ割り当て状況、バージョンごとの CPU 使用状況など、主要なプロファイリングメトリクスをサービスから取得してダッシュボードを可視化することができます。

{{< img src="profiler/profiling-metric-dashboard.mp4" alt="ダッシュボードにプロファイリングのメトリクスを追加。" video=true >}}

### プロファイリングデータにトレースを接続する

[APM 分散型トレーシング][3]と Continuous Profiler の双方が有効化されたアプリケーションプロセスは自動的にリンクされるため、[Code Hotspots タブ][4]でスパン情報からプロファイリングデータを直接開き、パフォーマンスの問題に関連する特定のコード行を見つけることができます。

{{< img src="profiler/code_hotspots_tab.mp4" alt="Code Hotspots タブで APM トレーススパンのプロファイリング情報を確認" video=true >}}

### プロファイルの比較により、パフォーマンスにおける変化を発見

異なる時間、環境、またはデプロイメントの似たようなプロファイルの比較は、パフォーマンスの問題に対する原因や解決策の把握に役立ちます。Datadog プロファイラーでは、 [比較が視覚化][5]されるため、時間枠やスコープされたタグによってなぜプロファイルが異なるか、よく理解できます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/profiler/
[2]: /ja/profiler/search_profiles
[3]: /ja/tracing/
[4]: /ja/profiler/connect_traces_and_profiles/
[5]: /ja/profiler/compare_profiles/
[6]: /ja/profiler/profile_types/