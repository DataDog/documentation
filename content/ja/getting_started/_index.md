---
title: はじめに
description: Datadog の可観測性プラットフォームの概要と、インストール、構成、主要機能の使用方法を紹介します。
disable_sidebar: true
aliases:
    - /overview
    - /getting_started/faq/
further_reading:
    - link: 'https://learn.datadoghq.com/'
      tag: 'Learning Center'
      text: 'Datadog を始めるためのコースを受講する'
    - link: 'https://datadoghq.com/blog/'
      tag: 'Blog'
      text: 'Datadog の新しい製品や機能、インテグレーションについて学びましょう'
    - link: 'https://app.datadoghq.com/help/quick_start'
      tag: 'App'
      text: 'クイックスタートガイドを見る'
cascade:
    algolia:
        rank: 50
        category: Getting Started
---

## Datadog とは

Datadog は、テクノロジースタックの種類を問わず、ソフトウェア開発のあらゆるフェーズをサポートする可観測性プラットフォームです。このプラットフォームは、ソフトウェアの構築、テスト、監視、デバッグ、最適化、セキュリティ保護に役立つ多くの製品で構成されています。これらの製品は個別に使用することも、組み合わせてカスタマイズされたソリューションとして使用することもできます。

以下の表に、Datadog 製品の例をいくつか示します。

<table>
    <thead>
        <th>カテゴリー</th>
        <th>製品例</th>
    </thead>
    <tr>
        <td><p><strong>開発</strong></p></td>
        <td>
        <ul>
        <li><a href="/security/code_security/">Code Security</a> を使用して、テキストエディターまたは GitHub でコードの脆弱性を強調表示します。</li>
        <li><a href="/coscreen/">CoScreen</a> を使用して、リモートペアプログラミングセッションを円滑に実施します。</li></ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>テスト</strong></p></td>
        <td>
            <ul>
                <li><a href="/pr_gates/">PR Gates</a> を使用して、問題のあるコードが本番環境にデプロイされるのをブロックします。</li>
                <li><a href="/synthetics/">Synthetic Monitoring</a> を使用して、世界中のユーザーをシミュレートし、Web アプリ、API、モバイルアプリケーションをテストします。</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>モニター</strong></p></td>
        <td>
            <ul>
                <li>処理、集約、<a href="/monitors/">アラート</a>を細かく制御しながら、<a href="/logs/">ログ</a>、<a href="/metrics/">メトリクス</a>、<a href="/events/">イベント</a>、<a href="/tracing/glossary/#trace">ネットワークトレースを</a> 取り込みます。</li>
                <li><a href="/profiler/">Continuous Profiler</a> を使用して、ホストのパフォーマンスを評価します。</li>
                <li><a href="/tracing/">Application Performance Monitoring</a> を使用して、アプリケーションのパフォーマンスを評価します。</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>トラブルシューティング</strong></p></td>
        <td>
            <ul>
                <li><a href="/error_tracking/">エラー</a>と<a href="/incident_response/incident_management/">インシデント</a>を管理し、問題を要約して解決策を提案します。</li>
                <li><a href="/real_user_monitoring/">Real User Monitoring</a> を使用して、ユーザーの離脱を測定し、ユーザーの不満を検出します。</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>セキュリティ</strong></p></td>
        <td>
            <ul>
                <li><a href="/security/">Datadog Security</a> を使用して脅威と攻撃を検出します。</li>
            </ul>
        </td>
    </tr>
</table>

さらに、数百種類の[インテグレーション][1]により、すでに使用しているテクノロジーに Datadog の機能を追加できます。たとえば、[AWS インテグレーション][2]では、90 を超える AWS サービスからログ、イベント、メトリクスが収集されます。

## 詳細はこちら

{{< learning-center-callout header="イネーブルメントウェビナーセッションに参加" hide\_image="true" btn\_title="登録" btn\_url="https://www.datadoghq.com/technical-enablement/session/datadog-overview/">}}
  この基本的なイネーブルセッションでは、「Datadog とは何か、何ができるのか」という疑問に答えます。Datadog にデータを送信する方法と、さまざまな環境、アプリケーション、インフラストラクチャーの状態を把握するために確認すべきページについて学習します。
{{< /learning-center-callout >}}

### コースを受講する
Datadog ラーニングセンターでは、Datadog プラットフォームを実際に体験できます。[Getting Started コース][3] では、可観測性のベストプラクティスや Datadog の主なコンセプトなどについて解説します。

Datadog を操作するための最速の入門コースとして、[クイックスタートコース][4]が用意されています。

### 製品分野をさらに詳しく見る
{{< whatsnext desc="以下のガイドのいずれかから始めてください。">}}
{{< nextlink href="/getting\_started/application" >}}<u>Datadog</u>:Datadog の UI、たとえば、ダッシュボード、インフラストラクチャーリスト、マップなどの使い方を学習します。{{< /nextlink >}}
{{< nextlink href="/getting\_started/site" >}}<u>Datadog サイト</u>:地域とセキュリティ要件に適した Datadog サイトを選択します。{{< /nextlink >}}
{{< nextlink href="/getting\_started/devsecops" >}}<u>DevSecOps バンドル</u>:Infrastructure DevSecOps バンドルの使用を開始します。{{< /nextlink >}}
{{< nextlink href="/getting\_started/agent" >}}<u>エージェント</u>:ホストから Datadog にメトリクスとイベントを送信します。{{< /nextlink >}}
{{< nextlink href="/getting\_started/api" >}}<u>API</u>:Datadog HTTP API の使用を開始します。{{< /nextlink >}}
{{< nextlink href="/getting\_started/integrations" >}}<u>インテグレーション</u>:Datadog インテグレーションを使用して、メトリクス、トレース、ログを収集する方法を学びます。{{< /nextlink >}}
{{< nextlink href="/getting\_started/search" >}}<u>検索</u>:Datadog 製品全体の検索とフィルタリングの基礎を学びます。{{< /nextlink >}}
{{< nextlink href="/getting\_started/tagging" >}}<u>タグ</u>:メトリクス、ログ、トレースのタグ付けを開始します。{{< /nextlink >}}
{{< nextlink href="/getting\_started/opentelemetry" >}}<u>OpenTelemetry</u>:OpenTelemetry のメトリクス、トレース、ログを Datadog に送信する方法を学びます。{{< /nextlink >}}
{{< nextlink href="/getting\_started/learning\_center" >}}<u>ラーニングセンター</u>:学習パスに従って、セルフガイドのクラスまたはラボを受講します。Datadog 認定プログラムについて調べることもできます。{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="プラットフォームサービス:">}}
{{< nextlink href="/getting\_started/dashboards" >}}<u>ダッシュボード</u>:業務上の重要な疑問を解決できるダッシュボードを作成、共有、維持します。{{< /nextlink >}}
{{< nextlink href="/getting\_started/incident\_management" >}}<u>Incident Management</u>:システム内の問題を伝達および追跡します。{{< /nextlink >}}
{{< nextlink href="/getting\_started/monitors" >}}<u>モニター</u>:重要な変更の発生をチームに知らせるために、アラートと通知を設定します。{{< /nextlink >}}
{{< nextlink href="/getting\_started/notebooks" >}}<u>ノートブック</u>:ライブグラフ、メトリクス、ログ、モニターを組み合わせて問題を切り分け、インタラクティブガイドを作成します。{{< /nextlink >}}
{{< nextlink href="/getting\_started/workflow\_automation" >}}<u>Workflow Automation</u>:アラートやセキュリティシグナルに応じて、エンドツーエンドのプロセスを自動化します。{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="製品:">}}
{{< nextlink href="/getting\_started/containers" >}}<u>コンテナ</u>:Agent Autodiscovery と Datadog Operator の使用方法を学習します。{{< /nextlink >}}
{{< nextlink href="/getting\_started/serverless" >}}<u>Serverless for AWS Lambda</u>:サーバーレスインフラストラクチャーからメトリクス、ログ、トレースを収集する方法を学びます。{{< /nextlink >}}
{{< nextlink href="/getting\_started/internal\_developer\_portal" >}}<u>Internal Developer Portal </u>:テレメトリ、メタデータ、ワークフローを統合してデリバリーを加速します。 {{< /nextlink >}}
{{< nextlink href="/getting\_started/tracing" >}}<u>トレーシング</u>:小規模なアプリケーションをトレースするために Agent を設定します。{{< /nextlink >}}
{{< nextlink href="/getting\_started/profiler" >}}<u>Profiler</u>:Continuous Profiler を使用してコード内のパフォーマンスの問題を発見し、修正します。{{< /nextlink >}}
{{< nextlink href="/getting\_started/database\_monitoring" >}}<u>Database Monitoring</u>:データベースの健全性とパフォーマンスを表示し、発生した問題を迅速にトラブルシューティングします。{{< /nextlink >}}
{{< nextlink href="/getting\_started/synthetics" >}}<u>Synthetic Monitoring</u>:Synthetic テストを使用して、API エンドポイントと主要なビジネスジャーニーのテストと監視を開始します。{{< /nextlink >}}
{{< nextlink href="/getting\_started/continuous\_testing" >}}<u>Continuous Testing</u>:CI パイプラインと IDE でエンドツーエンドの Synthetic テストを実行します。{{< /nextlink >}}
{{< nextlink href="/getting\_started/session\_replay" >}}<u>Session Replay</u>:Session Replay を使用して、ユーザーが製品をどのように操作しているかを詳しく確認できます。{{< /nextlink >}}
{{< nextlink href="/getting\_started/application\_security" >}}<u>App and API Protection</u>:AAP を導入して運用を開始するためのベストプラクティスを紹介します。{{< /nextlink >}}
{{< nextlink href="/getting\_started/cloud\_security\_management" >}}<u>Cloud Security</u>:Cloud Security の導入と運用のためのベストプラクティスを説明します。{{< /nextlink >}}
{{< nextlink href="/getting\_started/cloud\_siem" >}}<u>Cloud SIEM</u>:Cloud SIEM を導入して運用を開始するためのベストプラクティスを紹介します。{{< /nextlink >}}
{{< nextlink href="/getting\_started/logs" >}}<u>ログ</u>:最初のログを送信し、ログ処理を使用してログを充実させます。{{< /nextlink >}}
{{< nextlink href="/getting\_started/ci\_visibility" >}}<u>CI Visibility</u>:CI プロバイダーとのインテグレーションを設定して、CI パイプラインデータを収集します。{{< /nextlink >}}
{{< nextlink href="/getting\_started/feature\_flags" >}}<u>機能フラグ</u>:組み込みの可観測性を使用して、機能の提供を管理し、ユーザーエクスペリエンスをパーソナライズします。{{< /nextlink >}}
{{< nextlink href="/getting\_started/test\_optimization" >}}<u>Test Optimization</u>:Datadog でテストサービスを設定して CI テストデータを収集します。{{< /nextlink >}}
{{< nextlink href="/getting\_started/test\_impact\_analysis" >}}<u>Test Impact Analysis</u>:コードの変更に関連するテストのみを実行することで、テストスイートを最適化し、CI コストを削減します。{{< /nextlink >}}
{{< nextlink href="/getting\_started/code\_security" >}}<u>Code Security</u>:開発から実行まで、アプリケーション内のファーストパーティコードとオープンソースライブラリを分析します。{{< /nextlink >}}
{{< /whatsnext >}}

## プレビュー中の製品または機能を試す

Datadog の製品チームは、お客様の役に立つ可能性のある新機能を頻繁に追加しています。これらの機能は、一般に提供される前に試用して役立つかどうかを確認したうえで、改善のためのフィードバックを提供することができます。現在実施中のプレビューの完全なリストを確認し、詳細情報を入手して参加登録するには、[Datadog 製品プレビュープログラム][5]にアクセスしてください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/integrations/
[2]: /integrations/amazon_web_services/
[3]: https://learn.datadoghq.com/collections/getting-started
[4]: https://learn.datadoghq.com/courses/course-quickstart
[5]: https://www.datadoghq.com/product-preview/
