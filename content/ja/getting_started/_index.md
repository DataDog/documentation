---
title: はじめに
description: Datadogのオブザーバビリティ・プラットフォームの紹介。インストール、構成、主な機能の使用開始に関するガイド付き。
disable_sidebar: true
aliases:
    - /overview
    - /getting_started/faq/
further_reading:
    - link: 'https://learn.datadoghq.com/'
      tag: 'Learning Center'
      text: 'Datadogを使い始めるためのコースを受講する'
    - link: 'https://datadoghq.com/blog/'
      tag: 'Blog'
      text: 'Datadogの新製品と機能、統合などについて学ぶ'
    - link: 'https://app.datadoghq.com/help/quick_start'
      tag: 'App'
      text: 'クイックスタートガイドを確認する'
cascade:
    algolia:
        rank: 50
        category: Getting Started
---

## Datadogとは?

Datadogは、あらゆるスタック上のソフトウェア開発のあらゆるフェーズをサポートするオブザーバビリティプラットフォームです。プラットフォームは、ソフトウェアの構築、テスト、監視、デバッグ、最適化、セキュリティ保護に役立つ多くの製品で構成されています。これらの製品は、個別に使用することも、組み合わせてカスタマイズすることもできます。

以下の表は、Datadog製品のいくつかの例を示しています。

<table>
    <thead>
        <th>カテゴリー</th>
        <th>製品例</th>
    </thead>
    <tr>
        <td><p><strong>開発</strong></p></td>
        <td>
        <ul>
        <li>テキストエディタやGitHubの<a href="/security/code_security/">Code Security</a>でコードの脆弱性をハイライト表示します。</li>
        <li><a href="/coscreen/">CoScreen</a>によるリモートペアプログラミングセッションを容易にします。</li></ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>テスティング</strong></p></td>
        <td>
            <ul>
                <li><a href="/pr_gates/">PR Gatesを</a>使用して、障害のあるコードが本番環境にデプロイされるのをブロックします。</li>
                <li><a href="/synthetics/">Synthetic Monitoringを</a>使用して、世界中のユーザーをシミュレートし、Webアプリ、API、またはモバイルアプリケーションをテストできます。</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>モニタリング</strong></p></td>
        <td>
            <ul>
                <li>処理、集約、アラートをきめ細かく制御し<a href="/logs/">て、ログ</a>、<a href="/metrics/">メトリック</a>、<a href="/events/">イベント</a>、<a href="/tracing/glossary/#trace">ネットワーク・トレース</a>を取り込み<a href="/monitors/">ます。</a></li>
                <li><a href="/profiler/">Continuous Profiler</a>でホストのパフォーマンスを評価します。</li>
                <li><a href="/tracing/">アプリケーションパフォーマンス監視</a>でアプリケーションパフォーマンスを評価します。</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>トラブルシューティング</strong></p></td>
        <td>
            <ul>
                <li><a href="/error_tracking/">エラー</a>や<a href="/incident_response/incident_management/">インシデントを</a>管理し、問題点をまとめ、修正を提案します。</li>
                <li><a href="/real_user_monitoring/">リアルユーザーモニタリング</a>でユーザーの離脱率を測定し、ユーザーのフラストレーションを検出します。</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>セキュリティ</strong></p></td>
        <td>
            <ul>
                <li><a href="/security/">Datadog Security</a>で脅威と攻撃を検出します。</li>
            </ul>
        </td>
    </tr>
</table>

さらに、何百もの[統合][1]により、すでに使用しているテクノロジーにDatadogの機能を重ねることができます。たとえば、[AWSインテグレーション][2]では、90以上のAWSサービスからログ、イベント、メトリックを収集します。

## 詳細はこちら

{ {< learning-center-callout header="イネーブルメントウェビナーセッションに参加" hide_image="true" btn_title="サインアップ" btn_url="https: / /www.datadoghq.com/technical-enablement/session/datadog-overview / " >}
  このファウンデーション・イネーブルメント・セッションでは、次のような重要な質問にお答えします。「Datadogとは何ですか？Datadogにデータを送信する方法や、さまざまな環境、アプリケーション、インフラストラクチャの状態をよりよく把握するためにどのページにアクセスすべきかを学習します。
{{< /learning-center-callout >}}

### コースを受ける
Datadogラーニングセンターでは、Datadogプラットフォームを実際に体験できます。[入門コース][3]では、オブザーバビリティの実践、Datadogの主要な概念などについて説明します。

Datadogのナビゲーションを最も迅速に導入するには、[クイックスタートコース][4]をお試しください。

### 製品領域を深く掘り下げる
{{< whatsnext desc="以下のガイドのいずれかで始める:">}}
{{< nextlink href="/getting_started/application" >}<u>データドッグ</u>:Datadog UIの使い方を知る：ダッシュボード、インフラストラクチャリスト、マップなど。{</nextlink>}}
{{< nextlink href="/getting_started/site" >}<u>Datadogサイト</u>:お客様の地域とセキュリティ要件に適したDatadogサイトを選択してください。{</nextlink>}}
{{< nextlink href="/getting_started/devsecops">}<u>DevSecOpsバンドル</u>:インフラストラクチャDevSecOpsバンドルを始めましょう。{</nextlink>}}
{{< nextlink href="/get_started/agent" >}<u>エージェント</u>:ホストからDatadogにメトリックとイベントを送信します。{</nextlink >}}
{{< nextlink href="/getting_started/api" >}<u>API</u>:Datadog HTTP APIを使いこなそう。{{< /nextlink >}}
{{< nextlink href="/get_started/integrations" >}<u>インテグレーション</u>:Datadog統合によるメトリック、トレース、ログの収集方法をご覧ください。{{/nextlink>}}
{{< nextlink href="/get_started/search" >}<u>検索</u>:Datadog製品全体にわたる検索とフィルタリングの基礎について学習します。{</nextlink>}}
{{< nextlink href="/get_started/tagging" >}<u>タグ</u>:メトリック、ログ、トレースにタグ付けを開始します。{</nextlink >}}
{{< nextlink href="/getting_started/opentelemetry" >}<u>OpenTelemetry</u>:OpenTelemetryのメトリック、トレース、ログをDatadogに送信する方法を説明します。{{< /nextlink >}}
{{< nextlink href="/Getting_started/learning_center" >}<u>ラーニングセンター</u>:ラーニングパスに従い、セルフガイド形式のクラスまたはラボを受講し、Datadog認定プログラムをご覧ください。{</nextlink>}
{{< /whatsnext >}}

{{< whatsnext desc="プラットフォームサービス:">}}
{{< nextlink href="/getting_started/dashboards">}<u>ダッシュボード</u>:重要な業務に関する質問に答えるダッシュボードを作成、共有、保守します。{{</nextlink>}}
{{< nextlink href="/get_started/incident_management">}<u>インシデント管理</u>:システムの問題を連絡し、追跡します。{< /nextlink >}}
{{< nextlink href="/getting_started/monitors" >}<u>モニター</u>:重大な変更が発生したときにチームが把握できるように、アラートと通知を設定します。{{</nextlink>}}
{{< nextlink href="/getting_started/notebooks" >}<u>ノートブック</u>:ライブグラフ、メトリック、ログ、モニタを組み合わせて、問題を切り分け、インタラクティブなガイドを作成します。{{/nextlink>}
{{< nextlink href="/getting_started/workflow_automation">}<u>ワークフロー自動化</u>:アラートやセキュリティ信号に応じて、エンドツーエンドのプロセスを自動化します。{</nextlink>}}
{{< /whatsnext >}}

{{< whatsnext desc="Product:">}
{{< nextlink href="/get_started/containers" >}<u>コンテナ</u>:エージェント自動検出とデータドッグ演算子の使用方法について学習します。{{/nextlink>}}
{{< nextlink href= " / getting_started/serverless" >}<u>AWS Lambdaのサーバーレス</u>:サーバーレスインフラストラクチャからメトリック、ログ、トレースを収集する方法について説明します。{{/nextlink>}}
{{< nextlink href="/getting_started/internal_developer_portal">}<u>社内開発者ポータル</u>:テレメトリ、メタデータ、ワークフローを統合し、配信を高速化します。{{</nextlink>}}
{{< nextlink href="/get_started/tracing" >}<u>トレース</u>:Agentをセットアップして、小さなアプリケーションをトレースします。{</nextlink>}}
{{< nextlink href="/getting_started/profiler" >}<u>Profiler</u>:Continuous Profiler を使用して、コード内のパフォーマンスの問題を検出し、修正します。{{< /nextlink >}}
{{< nextlink href="/getting_started/database_monitoring" >}<u>データベース監視</u>:データベースの稼働状態とパフォーマンスを表示し、問題が発生した場合は迅速にトラブルシューティングを行います。{{</nextlink>}}
{{< nextlink href="/getting_started/synthetics" >}}<u>合成監視</u>:SyntheticテストでAPIエンドポイントと主要なビジネスジャーニーのテストと監視を開始してください。{{< /nextlink >}}
{{< nextlink href="/get_started/continuous_testing">}<u>継続的テスト</u>:CIパイプラインとIDEでエンドツーエンドの模擬テストを実行します。{< /nextlink >}}
{{< nextlink href="/getting_started/session_replay">}<u>セッションリプレイ</u>:ユーザーがセッションリプレイで製品をどのように操作しているかを詳しくご覧ください。{</nextlink>}}
{{< nextlink href="/getting_started/application_security" >}<u>アプリとAPI保護</u>:AAPでチームを稼働させるためのベストプラクティスをご紹介します。{</nextlink>}}
{{< nextlink href="/getting_started/cloud_security_management">}<u>クラウドセキュリティ</u>:クラウド セキュリティでチームを稼働させるためのベスト プラクティスをご覧ください。{</nextlink>}}
{ {< nextlink href= " / getting_started/cloud_siem" >}<u>クラウドSIEM</u>:Cloud SIEMでチームを稼働させるためのベストプラクティスをご紹介します。{</nextlink>}}
{{< nextlink href="/getting_started/logs" >}<u>ログ</u>:最初のログを送信し、ログ処理を使用してログを充実させます。{{</nextlink>}}
{{< nextlink href="/getting_started/ci_visibility">}<u>CIの可視性</u>:CIプロバイダーとの連携を設定して、CIパイプラインデータを収集します。{{</nextlink>}}
{{< nextlink href="/getting_started/feature_flags">}<u>機能フラグ</u>:オブザーバビリティが組み込まれ、機能の提供を管理し、ユーザーエクスペリエンスをカスタマイズできます。{{< /nextlink >}}
{{< nextlink href="/getting_started/test_optimization">}<u>テスト最適化</u>:Datadogにテストサービスを設定してCIテストデータを収集します。{{</nextlink>}}
{{< nextlink href="/get_started/test_impact_analysis">}<u>テスト影響分析</u>:コードの変更に関連するテストのみを実行することで、テストスイートを最適化し、CIコストを削減できます。{{</nextlink>}
{{< nextlink href="/getting_started/code_security" >}<u>コードセキュリティ</u>:開発からランタイムまで、ファーストパーティのコードやオープンソースライブラリをアプリケーションで分析できます。{< /nextlink >}}
{{< /whatsnext >}}

## Preview製品または機能をお試しください

Datadog製品チームは、頻繁に新しい機能を追加しています。これらのいくつかは、一般的に利用可能になる前に試してみて、役に立つかどうかを確認したり、より良いものにするためのフィードバックを提供したりできます。アクティブなプレビューの全リストの確認、詳細情報の取得、参加登録は、[Datadog製品プレビュープログラム][5]をご覧ください。

## さらに読む

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/integrations/
[2]: /integrations/amazon_web_services/
[3]: https://learn.datadoghq.com/collections/getting-started
[4]: https://learn.datadoghq.com/courses/course-quickstart
[5]: https://www.datadoghq.com/product-preview/
