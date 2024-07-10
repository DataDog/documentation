---
aliases:
- /ja/overview
- /ja/getting_started/faq/
cascade:
  algolia:
    category: はじめに
    rank: 50
disable_sidebar: true
further_reading:
- link: https://learn.datadoghq.com/
  tag: ラーニングセンター
  text: Datadog を始めるためのコースを受講する
- link: https://datadoghq.com/blog/
  tag: ブログ
  text: Datadog の新しい製品や機能、インテグレーションについて学びましょう
title: はじめに
---

## Datadog とは？

Datadog は、任意のスタックでのソフトウェア開発の各フェーズを支援する可観測性プラットフォームです。このプラットフォームは、ビルド、テスト、監視、デバッグ、最適化、セキュリティ確保のための多様な製品から構成されており、これらは単独で使用することも、カスタマイズされたソリューションとして組み合わせることも可能です。

以下の表は、Datadog 製品の例をいくつか列挙したものです。

<table>
    <thead>
        <th>カテゴリー</th>
        <th>製品例</th>
    </thead>
    <tr>
        <td><p><strong>開発</strong></p></td>
        <td>
        <ul>
        <li><a href="/coscreen/">CoScreen</a> を使って遠隔ペアプログラミングセッションを促進します。</li>
        <li><a href="/code_analysis/?tab=codevulnerabilities">Code Analysis</a> を使って、テキストエディタや GitHub 上でコードの脆弱性を明示します。</li></ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>テスト</strong></p></td>
        <td>
            <ul>
                <li><a href="/quality_gates/">Quality Gates</a> を使って、欠陥のあるコードが本番環境にデプロイされるのをブロックします。</li>
                <li><a href="/synthetics/">Synthetic Monitoring</a> を使って、世界中のユーザーをシミュレートし、Web アプリ、API、モバイルアプリケーションをテストします。</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>監視</strong></p></td>
        <td>
            <ul>
                <li>処理、集計、<a href="/monitors/">アラート</a>をきめ細かく制御しながら、<a href="/logs/">ログ</a>、<a href="/metrics/">メトリクス</a>、<a href="/events/">イベント</a>、<a href="/tracing/glossary/#trace">ネットワークトレース</a>を取り込みます。</li>
                <li> Continuous Profiler</a> を使ってホストのパフォーマンスを評価します。</li>
                <li><a href="/tracing/">Application Performance Monitoring</a> を使って、アプリケーションパフォーマンスを評価します。</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>トラブルシューティング</strong></p></td>
        <td>
            <ul>
                <li><a href="/error_tracking/">エラー</a>や<a href="/service_management/incident_management/">インシデント</a>を管理し、問題をまとめ、修正を提案します。</li>
                <li><a href="/real_user_monitoring/">Real User Monitoring</a> を使ってユーザーの離脱を測定し、ユーザーの不満を検出します。</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>セキュリティ</p></td>
        <td>
            <ul>
                <li><a href="/security/">Datadog Security</a> を使って脅威と攻撃を検出します。</li>
            </ul>
        </td>
    </tr>
</table>

さらに、何百もの[インテグレーション][1]により、既に使用しているテクノロジーに Datadog の機能を統合することができます。例えば、[AWS インテグレーション][2]は、90 以上の AWS サービスからログ、イベント、メトリクスを収集します。

## 詳細はこちら

### コースを受講
Datadog ラーニングセンターでは、Datadog プラットフォームを実際に体験することができます。[はじめにコース][3]では、可観測性の実践や Datadog のキーコンセプトなどを学ぶことができます。

Datadog を操作するための最速の入門コースとして、[クイックスタートコース][4]が用意されています。

### 製品エリアをさらに深掘りする
{{< whatsnext desc="Get started with one of the guides below:">}}
{{< nextlink href="/getting_started/application" >}}<u>Datadog</u>: ダッシュボード、インフラストラクチャーリスト、マップなど、Datadog UI の使い方をご紹介します。{{< /nextlink >}}
{{< nextlink href="/getting_started/site" >}}<u>Datadog サイト</u>: 地域とセキュリティ要件に適した Datadog サイトを選択します。{{< /nextlink >}}
{{< nextlink href="/getting_started/devsecops" >}}<u>DevSecOps バンドル</u>: APM DevSecOps およびインフラストラクチャー DevSecOps バンドルで始めましょう。{{< /nextlink >}}
{{< nextlink href="/getting_started/agent" >}}<u>Agent</u>: ホストから Datadog にメトリクスとイベントを送信します。{{< /nextlink >}}
{{< nextlink href="/getting_started/api" >}}<u>API</u>: Datadog HTTP API を使い始めましょう。{{< /nextlink >}}
{{< nextlink href="/getting_started/integrations" >}}<u>インテグレーション</u>: Datadog インテグレーションによるメトリクス、トレース、ログの収集方法をご紹介します。{{< /nextlink >}}
{{< nextlink href="/getting_started/tagging" >}}<u>タグ</u>: メトリクス、ログ、トレースのタグ付けを始めましょう。{{< /nextlink >}}
{{< nextlink href="/getting_started/opentelemetry" >}}<u>OpenTelemetry</u>: OpenTelemetry のメトリクス、トレース、ログを Datadog に送信する方法をご紹介します。{{< /nextlink >}}
{{< nextlink href="/getting_started/learning_center" >}}<u>ラーニングセンター</u>: ラーニングパスをたどったり、セルフガイドのクラスやラボを受講したり、Datadog 認定プログラムを探したりすることができます。{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Platform Services:">}}
{{< nextlink href="/getting_started/dashboards" >}}<u>ダッシュボード</u>: 重要な業務質問に答えるためのダッシュボードを作成、共有、維持します。{{< /nextlink >}}
{{< nextlink href="/getting_started/monitors" >}}<u>モニター</u>: アラートと通知をセットアップして、重要な変更が発生したときにチームに通知します。{{< /nextlink >}}
{{< nextlink href="/getting_started/incident_management" >}}<u>Incident Management</u>: システムの問題を伝え、追跡します。{{< /nextlink >}}
{{< nextlink href="/getting_started/workflow_automation" >}}<u>Workflow Automation</u>: アラートやセキュリティシグナルへの対応として、エンドツーエンドプロセスを自動化します。{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="製品:">}}
{{< nextlink href="/getting_started/containers" >}}<u>コンテナ</u>: Agent オートディスカバリーと Datadog オペレーターの使用方法をご紹介します。{{< /nextlink >}}
{{< nextlink href="/getting_started/serverless" >}}<u>Serverless for AWS Lambda</u>: サーバーレスインフラストラクチャーからメトリクス、ログ、トレースを収集する方法をご紹介します。{{< /nextlink >}}
{{< nextlink href="/getting_started/service_catalog" >}}<u>サービスカタログ</u>: サービスカタログで、サービスの所有権、信頼性、パフォーマンスを大規模に管理します。 {{< /nextlink >}}
{{< nextlink href="/getting_started/tracing" >}}<u>トレーシング</u>: Agent をセットアップして、小さなアプリケーションをトレースします。{{< /nextlink >}}
{{< nextlink href="/getting_started/profiler" >}}<u>Profiler</u>: Continuous Profiler を使用して、コードのパフォーマンス問題を発見し、修正します。{{< /nextlink >}}
{{< nextlink href="/getting_started/database_monitoring" >}}<u>Database Monitoring</u>: データベースの健全性とパフォーマンスを表示し、発生した問題を迅速にトラブルシューティングします。{{< /nextlink >}}
{{< nextlink href="/getting_started/synthetics" >}}<u>Synthetic Monitoring</u>: Synthetic テストを使って、API エンドポイントと主要なビジネスジャーニーのテストと監視を開始します。{{< /nextlink >}}
{{< nextlink href="/getting_started/session_replay" >}}<u>Session Replay</u>: Session Replay を利用して、ユーザーが製品とどのようにやり取りしているかを詳細に観察できます。{{< /nextlink >}}
{{< nextlink href="/getting_started/continuous_testing" >}}<u>Continuous Testing</u>: CI パイプラインや IDE でエンドツーエンドの Synthetic テストを実行します。{{< /nextlink >}}
{{< nextlink href="/getting_started/application_security" >}}<u>Application Security Management</u>: ASM を使ってチームを活性化するためのベストプラクティスをご紹介します。{{< /nextlink >}}
{{< nextlink href="/getting_started/cloud_security_management" >}}<u>Cloud Security Management</u>: CSM を使ってチームを活性化するためのベストプラクティスをご紹介します。{{< /nextlink >}}
{{< nextlink href="/getting_started/cloud_siem" >}}<u>Cloud SIEM</u>: Cloud SIEM を使ってチームを活性化するためのベストプラクティスをご紹介します。{{< /nextlink >}}
{{< nextlink href="/getting_started/ci_visibility" >}}<u>CI Visibility</u>: CI プロバイダーとのインテグレーションをセットアップすることで、CI パイプラインデータを収集します。{{< /nextlink >}}
{{< nextlink href="/getting_started/logs" >}}<u>ログ</u>: 最初のログを送信し、ログ処理を使ってログを充実させましょう。{{< /nextlink >}}
{{< nextlink href="/getting_started/test_visibility" >}}<u>Test Visibility</u>: Datadog でテストサービスをセットアップして、CI テストデータを収集します。{{< /nextlink >}}
{{< nextlink href="/getting_started/intelligent_test_runner" >}}<u>Intelligent Test Runner</u>: コード変更に関連するテストのみを実行することで、テストスイートを最適化し、CI コストを削減します。{{< /nextlink >}}
{{< /whatsnext >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/integrations/
[2]: /ja/integrations/amazon_web_services/
[3]: https://learn.datadoghq.com/collections/getting-started
[4]: https://learn.datadoghq.com/courses/course-quickstart