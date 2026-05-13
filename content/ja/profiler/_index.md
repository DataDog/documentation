---
algolia:
  tags:
  - profiler
aliases:
- /ja/tracing/profiling/
- /ja/tracing/profiler/
cascade:
  algolia:
    rank: 70
further_reading:
- link: /profiler/enabling
  tag: よくあるご質問
  text: アプリケーションの継続的なプロファイラー有効化
- link: getting_started/profiler
  tag: よくあるご質問
  text: Continuous Profiler の概要
- link: profiler/profile_visualizations
  tag: よくあるご質問
  text: 使用可能なプロファイルタイプの詳細
- link: /extend/guide/data-collection-resolution/
  tag: よくあるご質問
  text: データ収集と問題解決
- link: https://www.datadoghq.com/blog/source-code-preview/
  tag: ブログ
  text: Continuous Profiler のソースコードプレビューで重要なコードに集中しましょう
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
- link: https://www.datadoghq.com/blog/continuous-profiler-context-attributes/
  tag: ブログ
  text: Cloud SIEM チームが Continuous Profiler を使ってコンテキスト属性を活用し、重要なパフォーマンスインサイトを得る方法
- link: https://www.datadoghq.com/blog/profiling-visualizations/
  tag: ブログ
  text: すべてのレベルのエンジニアがプロファイリングの視覚化を利用できるようにする
- link: https://www.datadoghq.com/blog/continuous-profiling-fourth-pillar/
  tag: ブログ
  text: なぜ継続的プロファイリングが可観測性の第四の柱なのか
- link: https://www.datadoghq.com/blog/kubernetes-operator-performance
  tag: ブログ
  text: Kubernetes オペレーターをモニターして、アプリケーションがスムーズに稼働し続けるようにする
- link: https://www.datadoghq.com/blog/gitlab-source-code-integration
  tag: ブログ
  text: Datadog の GitLab ソースコード統合を使用して、より迅速にトラブルシューティングする
title: 連続プロファイラ
---
{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/441865141/rendition/1080p/file.mp4?loc=external&signature=ebc774b892f062e45922dcae82f4ebff0a906c8ec30f34b9d77494b0051748ad" poster="/images/poster/profiler.png" >}}

<br>

発見された CPU、メモリ、IO のボトルネックをメソッド名、クラス名、行番号で分類して、エンドユーザー側での遅延とインフラストラクチャーにかかるコストを大幅に削減することができます。

### 実環境での影響を最小限に {#low-impact-in-production}

Continuous Profiler は、JDK Flight Recorder などの技術を使用して、すべてのサービスの実環境で実行され、ホストの CPU とメモリ使用量への影響を最小限に抑えます。

## はじめに {#getting-started}

お使いのサービスでプロファイリングを行うことで、すべてのスタックトレースを一つの管理画面で可視化することができます。設定方法はとても簡単です。

### アプリケーションに計測処理を組み込みます {#instrument-your-application}

{{< partial name="profiling/profiling-languages.html" >}}

## プロファイラーの使用ガイド {#guide-to-using-the-profiler}

[プロファイラーの概要][1]ガイドでは、パフォーマンスの問題があるサンプルサービスを例に、Continuous Profiler を使用して問題を理解し修正する方法を確認します。

## Datadog プロファイラーを探索する {#explore-datadog-profiler}

アプリケーションからプロファイルを Datadog に送信するための構成が完了した後は、コードのパフォーマンスに関するインサイトを確認してみましょう。

デフォルトでは、プロファイルは 8 日間保持され、プロファイルデータから生成されたメトリクスは 1 か月間保持されます。

{{< learning-center-callout header="学習センターでコードパフォーマンスの問題を診断してみてください" btn_title="今すぐ登録" btn_url="https://learn.datadoghq.com/courses/continuous-profiler-course">}}
  Datadog 学習センターには、このトピックについて学ぶための実践的なコースが満載です。Datadog Continuous Profiler を使用して、実環境でアプリケーションコードのパフォーマンスを調査し改善するために、無料で登録してください。
{{< /learning-center-callout >}}

### プロファイルタイプ {#profile-types}

対応言語ごとに収集されるプロファイルデータの種類については、[プロファイルのデータタイプ][6]を参照してください。

{{< img src="profiler/profile-types2.png" alt="Java アプリケーションのために収集されたプロファイルタイプのリスト" style="width:100%;" >}}

### タグを使用してプロファイルを検索 {#search-profiles-by-tags}

[タグを使用してプロファイルを検索][2]します。特定のホスト、サービス、バージョン、あるいはいずれかの組み合わせなど、すべてのディメンションのデータを表示させることができます。

{{< img src="profiler/search_profiles4.mp4" alt="タグを使用してプロファイルを検索" video=true >}}

### デプロイメントでの機能パフォーマンスを追跡する {#track-function-performance-over-deployments}

メソッドごとの主な CPU 使用状況、スレッドごとの主なメモリ割り当て状況、バージョンごとの CPU 使用状況など、主要なプロファイリングメトリクスをサービスから取得してダッシュボードを可視化することができます。

{{< img src="profiler/profiling-metric-dashboard.mp4" alt="プロファイリングメトリクスをダッシュボードに追加します。" video=true >}}

### プロファイリングデータにトレースを接続する {#connect-traces-to-profiling-data}

[APM 分散型トレーシング][3]と Continuous Profiler の双方が有効化されたアプリケーションプロセスは自動的にリンクされるため、[Profiles タブ][4]でスパン情報からプロファイリングデータを直接開き、パフォーマンスの問題に関連する特定のコード行を見つけることができます。

{{< img src="profiler/profiles_tab.png" alt="Profiles タブは APM トレーススパンのプロファイリング情報を表示します。" >}}

### プロファイルの比較により、パフォーマンスの変化を発見する {#find-changes-in-performance-by-comparing-profiles}

異なる時期、環境、またはデプロイメントからの類似のプロファイルを比較することで、パフォーマンス問題の可能な原因と解決策を理解するのに役立ちます。Datadog プロファイラーは、スコープによって時間枠やタグに基づいてプロファイルが異なる理由を理解するための [比較ビジュアライゼーション][5] を提供します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/profiler/
[2]: /ja/profiler/search_profiles
[3]: /ja/tracing/
[4]: /ja/profiler/connect_traces_and_profiles/
[5]: /ja/profiler/compare_profiles/
[6]: /ja/profiler/profile_types/