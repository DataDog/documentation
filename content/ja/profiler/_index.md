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
  text: データ収集と解決
- link: https://www.datadoghq.com/blog/source-code-preview/
  tag: ブログ
  text: Continuous Profiler のソースコードプレビュー機能を使用して、重要なコードに集中する
- link: https://www.datadoghq.com/blog/introducing-datadog-profiling/
  tag: ブログ
  text: Datadog に常時接続型の本番環境プロファイリングが登場
- link: https://www.datadoghq.com/blog/datadog-github-action-vulnerability-analysis/
  tag: ブログ
  text: 継続的な脆弱性分析のための Datadog GitHub アクション
- link: https://www.datadoghq.com/blog/code-optimization-datadog-profile-comparison/
  tag: ブログ
  text: Datadog プロファイル比較を使用してコードを比較および最適化する
- link: https://www.datadoghq.com/blog/engineering/how-we-optimized-our-akka-application-using-datadogs-continuous-profiler/
  tag: ブログ
  text: Datadog の Continuous Profiler を使用して Akka アプリケーションを最適化した方法
- link: https://www.datadoghq.com/blog/ruby-profiling-datadog-continuous-profiler/
  tag: ブログ
  text: Datadog Continuous Profiler で Ruby のコードパフォーマンスを分析
- link: https://www.datadoghq.com/blog/continuous-profiler-context-attributes/
  tag: ブログ
  text: Cloud SIEM チームが Continuous Profiler でコンテキスト属性を活用して重要なパフォーマンス情報を得た方法
- link: https://www.datadoghq.com/blog/profiling-visualizations/
  tag: ブログ
  text: すべてのレベルのエンジニアがプロファイリングの可視化を利用できるようにする
- link: https://www.datadoghq.com/blog/continuous-profiling-fourth-pillar/
  tag: ブログ
  text: 継続的プロファイリングが可観測性の第 4 の柱である理由
- link: https://www.datadoghq.com/blog/kubernetes-operator-performance
  tag: ブログ
  text: Kubernetes オペレーターをモニターしてアプリケーションがスムーズに動作するようにする
- link: https://www.datadoghq.com/blog/gitlab-source-code-integration
  tag: ブログ
  text: Datadog で GitLab ソースコード統合を使用して迅速にトラブルシューティングを実行する
title: Continuous Profiler
---
{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/441865141/rendition/1080p/file.mp4?loc=external&signature=ebc774b892f062e45922dcae82f4ebff0a906c8ec30f34b9d77494b0051748ad" poster="/images/poster/profiler.png" >}}

<br>

発見された CPU、メモリ、IO のボトルネックをメソッド名、クラス名、行番号で分類して、エンドユーザー側での遅延とインフラストラクチャーにかかるコストを大幅に削減することができます。

### 本番環境での影響を最小限に {#low-impact-in-production}

Continuous Profiler は、JDK Flight Recorder などの技術を活用し、すべてのサービスの実環境で動作します。こうすることでホストの CPU とメモリ使用量への影響を最小限に抑えることができます。

## はじめに {#getting-started}

お使いのサービスでプロファイリングを行うことで、すべてのスタックトレースを一つの管理画面で可視化することができます。設定方法はとても簡単です。

### アプリケーションをインスツルメントする {#instrument-your-application}

{{< partial name="profiling/profiling-languages.html" >}}

## プロファイラーの使用ガイド {#guide-to-using-the-profiler}

[プロファイラーの概要][1]ガイドでは、パフォーマンスの問題があるサンプルサービスを例に、Continuous Profiler を使用して問題を理解し修正する方法を確認します。

## Datadog でのプロファイラー確認 {#explore-datadog-profiler}

アプリケーションからプロファイルを Datadog に送信するための構成が完了した後は、コードのパフォーマンスに関するインサイトを確認してみましょう。

デフォルトでは、プロファイルは 8 日間、プロファイルデータから生成されたメトリクスは 1 か月間保持されます。

{{< learning-center-callout header="学習センターでコードパフォーマンスの問題を診断してみる" btn_title="今すぐ登録" btn_url="https://learn.datadoghq.com/courses/continuous-profiler-course">}}
  Datadog 学習センターには、このトピックについて学ぶための実践演習コースが多数用意されています。登録は無料です。Datadog Continuous Profiler を使用して、本番環境でアプリケーションコードのパフォーマンスを調査し、改善する方法を体験してください。
{{< /learning-center-callout >}}

### プロファイルタイプ {#profile-types}

対応言語ごとに収集されるプロファイルデータの種類については、[プロファイルタイプ][6] を参照してください。

{{< img src="profiler/profile-types2.png" alt="Java アプリケーション用に収集されたプロファイルタイプのリスト" style="width:100%;" >}}

### タグを使用してプロファイルを検索 {#search-profiles-by-tags}

[タグを使用してプロファイルを検索][2] します。特定のホスト、サービス、バージョン、あるいはいずれかの組み合わせなど、すべてのディメンションのデータを表示させることができます。

{{< img src="profiler/search_profiles4.mp4" alt="タグを使用してプロファイルを検索" video=true >}}

### デプロイメントでの機能パフォーマンスを追跡する {#track-function-performance-over-deployments}

メソッドごとの主な CPU 使用状況、スレッドごとの主なメモリ割り当て状況、バージョンごとの CPU 使用状況など、主要なプロファイリングメトリクスをサービスから取得してダッシュボードを可視化することができます。

{{< img src="profiler/profiling-metric-dashboard.mp4" alt="ダッシュボードにプロファイリングメトリクスを追加します。" video=true >}}

### プロファイリングデータにトレースを関連付ける {#connect-traces-to-profiling-data}

[APM 分散型トレーシング][3] と Continuous Profiler の両方が有効化されたアプリケーションプロセスは自動的にリンクされるため、[プロファイルタブ][4] でスパン情報からプロファイリングデータを直接開き、パフォーマンスの問題に関連する特定のコード行を見つけることができます。

{{< img src="profiler/profiles_tab.png" alt="[Profiles] (プロファイル) タブに APM トレーススパンのプロファイル情報が表示されています。" >}}

### プロファイルを比較して、パフォーマンスの変化を特定 {#find-changes-in-performance-by-comparing-profiles}

異なる時間、環境、またはデプロイメントの類似のプロファイルを比較すると、パフォーマンスの問題に対する原因や解決策の把握に役立ちます。Datadog プロファイラーでは [比較の視覚化][5] が提供されるため、時間枠やスコープに使用したタグによってプロファイルが異なる理由を理解できます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/profiler/
[2]: /ja/profiler/search_profiles
[3]: /ja/tracing/
[4]: /ja/profiler/connect_traces_and_profiles/
[5]: /ja/profiler/compare_profiles/
[6]: /ja/profiler/profile_types/