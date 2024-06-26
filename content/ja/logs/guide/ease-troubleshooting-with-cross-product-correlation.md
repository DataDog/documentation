---
further_reading:
- link: /getting_started/tagging/unified_service_tagging/
  tag: ドキュメント
  text: 統合サービスタグ付けについて
- link: /tracing/other_telemetry/connect_logs_and_traces
  tag: ドキュメント
  text: ログとトレースの接続
- link: /real_user_monitoring/platform/connect_rum_and_traces/
  tag: ドキュメント
  text: RUM およびセッションリプレイとトレースの接続
- link: /synthetics/apm/
  tag: ドキュメント
  text: Synthetics テストとトレースの接続
kind: ガイド
title: クロスプロダクト相関で容易にトラブルシューティング
---

## 概要

[統合サービスタグ付け][1]は、高度な相関能力を可能にします。調査の出発点が単一のログ、トレース、ビュー、または Synthetic テストという場合もあるでしょう。ログ、トレース、およびビューを他のデータと相関させることで、ビジネスへの影響を推定し、問題の根本原因を迅速に特定するのに役立つコンテキストが提供されます。

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/full-stack-cover.png" alt="フルスタックの相関" style="width:100%;" >}}

このガイドでは、フルスタックデータを相関させる方法を説明します。ユースケースによっては、以下のいくつかのステップは省略することができます。他のステップに依存しているステップは、明示されています。

1. [サーバー側ログとトレースの相関付け](#correlate-server-side-logs-with-traces)
   * [アプリケーションログの相関付け](#correlate-application-logs)
   * [プロキシログの相関付け](#correlate-proxy-logs)
   * [データベースログの相関付け](#correlate-database-logs)
2. [フロントエンドプロダクトの相関付け](#correlate-frontend-products)
   * [ブラウザログと RUM の相関付け](#correlate-browser-logs-with-rum)
3. [ユーザーエクスペリエンスとサーバー動作の相関付け](#correlate-user-experience-with-server-behavior)
   * [RUM ビューとトレースの相関付け](#correlate-rum-views-with-traces)
   * [トレースの相関を活用して Synthetic テストをトラブルシューティング](#leverage-trace-correlation-to-troubleshoot-synthetic-tests)

## サーバー側ログとトレースの関連付け

アプリケーションでユーザーにエラーまたは高レイテンシーが発生した際、問題のあるリクエストからの特定のログを見ることで問題を的確に把握できます。該当リクエストに関するすべてのログを集めて始めから終わりまでの処理を詳しく確認し、問題をすばやく診断できます。

ログをトレースと相関付けることで、`trace_id` を使用して[エンティティレベルの一貫性を維持しながら積極的なサンプリング戦略][2]も実現できます。

[アプリケーションログの相関付け](#correlate-application-logs)により、スタック全体の広い範囲を可視化できますが、特定のユースケースではスタックのより深くに相関付ける必要があります。ユースケースに合わせたセットアップを完了するには、以下のリンクをご利用ください。

* [プロキシログの相関付け](#correlate-proxy-logs)
* [データベースログの相関付け](#correlate-database-logs)

### アプリケーションログの相関付け

#### 理由

アプリケーションログは、ほとんどのコードおよびビジネスロジックの問題に関するコンテキストを提供します。他のサービスの問題（たとえばORM ログデータベースエラーなど）の解決にも役立ちます。

#### 方法

[さまざまな OOTB 相関][3]の 1 つを使用します。カスタムトレーサーを使用している場合や、問題がある場合は、[相関に関するよくあるご質問][4]をご参照ください。

### プロキシログの相関付け

#### 理由

プロキシログは、アプリケーションログより多くのエントリポイントをカバーするため、静的なコンテンツとリダイレクトに関する、より多くの情報を提供します。

#### 方法

アプリケーショントレーサーは、デフォルトでトレーサーを生成します。HTTP リクエストヘッダに `x-datadog-trace-id` を挿入することでこれを変更することが可能です。

#### NGINX

##### OpenTracing のセットアップ

[NGINX トレースインテグレーション][5]を参照。

##### ログのトレース ID の挿入

トレース ID は、`opentracing_context_x_datadog_trace_id` 変数として保存されます。NGINX 構成ファイル (`/etc/nginx/nginx.conf`) の HTTP セクションに以下の構成ブロックを追加して、NGINX のログ形式を更新します。

```conf
http {
  log_format main '$remote_addr - $opentracing_context_x_datadog_trace_id $http_x_forwarded_user [$time_local] "$request" '
          '$status $body_bytes_sent "$http_referer" '
          '"$http_user_agent" "$http_x_forwarded_for" ';

  access_log /var/log/nginx/access.log;
}
```

##### パイプラインでトレース ID をパース

1. NGINX パイプラインのクローンを作成します。

2. 最初の [grok parser][6] をカスタマイズします。
   - **Parsing rules** で、パースルールを以下と置き換えます。
   ```text
   access.common %{_client_ip} %{_ident} %{_trace_id} %{_auth} \[%{_date_access}\] "(?>%{_method} |)%{_url}(?> %{_version}|)" %{_status_code} (?>%{_bytes_written}|-)
   ```
   - **Helper Rules** の **Advanced settings** で、行を追加します。
   ```text
   _trace_id %{notSpace:dd.trace_id:nullIf("-")}
   ```

3. `dd.trace_id` 属性で [トレース ID リマッパー][7]を追加します。

### データベースログの相関付け

#### 理由

データベースログは、同様のクエリ、変数の匿名化、そして高い使用量のため、コンテキスト化が困難なことが多くあります。

たとえば、プロダクションのクエリ遅延は、多くのリソースを使用して長時間かけて調査しなければ再現することが困難です。以下に、トレースを使用してクエリ遅延の分析を相関付ける方法例をご紹介します。

#### 方法

#### PostgreSQL

##### データベースログの強化

PostgreSQL のデフォルトのログについては詳述されていません。強化するには、[こちらのインテグレーションガイド][8]に従ってください。

クエリ遅延のベストプラクティスでは、ステートメント遅延の実行プランを自動的にログに記録することも提案されているため、手動で `EXPLAIN` を実行する必要はありません。`EXPLAIN` を自動的に実行するには、`/etc/postgresql/<VERSION>/main/postgresql.conf` を次のように更新します。

```conf
session_preload_libraries = 'auto_explain'
auto_explain.log_min_duration = '500ms'
```

500ms 以上のクエリは実行プランを記録します。

**注**: `auto_explain.log_analyze = 'true'` にすると、より多くの情報を取得できますが、パフォーマンスに大きな影響が出ます。詳しくは、[公式ドキュメント][9]をご参照ください。

##### trace_id のデータベースログへの挿入

[SQL コメント][10]とともに、データベースログのほとんどに `trace_id` を挿入します。以下は、Flask および SQLAlchemy の例です。

```python
if os.environ.get('DD_LOGS_INJECTION') == 'true':
    from ddtrace import tracer
    from sqlalchemy.engine import Engine
    from sqlalchemy import event

    @event.listens_for(Engine, "before_cursor_execute", retval=True)
    def comment_sql_calls(conn, cursor, statement, parameters, context, executemany):
        trace_ctx = tracer.get_log_correlation_context()
        statement = f"{statement} -- dd.trace_id=<{trace_ctx['trace_id']}>"
        return statement, parameters
```

**注**: これは、クエリステートメントを含むログのみを相関付けます。 `ERROR: duplicate key value violates unique constraint "<TABLE_KEY>"` のようなエラーログは、コンテキスト外にとどまります。ほとんどの場合、エラー情報はアプリケーションログを通じて取得できます。

PostgreSQL パイプラインのクローン作成とカスタマイズ:

1. 新しい [grok parser][6] を追加します。
   ```text
   extract_trace %{data}\s+--\s+dd.trace_id=<%{notSpace:dd.trace_id}>\s+%{data}
   ```

2. `dd.trace_id` 属性で [トレース ID リマッパー][7]を追加します。

以下に、遅延しているトレースからのクエリ遅延の実行プランの例を示します。

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/slow-query-root-cause.png" alt="クエリ遅延ログの相関" style="width:100%;" >}}

## フロントエンドプロダクトの相関付け

### ブラウザログと RUM およびセッションリプレイの相関付け

#### 理由

RUM イベント内の[ブラウザログ][11]から、問題のコンテキストと洞察を得ることができます。以下の例では、ブラウザログは、不正なクエリの根本的な原因が無効なユーザー ID であることを示しています。

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/browser-logs-in-rum.png" alt="RUM アクションのブラウザログ" style="width:100%;" >}}

ブラウザログを RUM と相関付けると、`session_id` や `view.id` などの属性を使用して、[エンティティレベルの一貫性を維持しながら積極的なサンプリング戦略][2]も実現できます。

#### 方法

ブラウザログと RUM イベントは自動的に相関付けられます。詳細については、[RUM とセッションリプレイの請求][12]を参照してください。[RUM ブラウザ SDK とログ SDK の構成を一致させる][13]必要があります。

## ユーザーエクスペリエンスとサーバー動作の相関付け

従来のバックエンドとフロントエンドのモニタリングはサイロ化されており、スタック全体のトラブルシューティングには別々のワークフローが必要になる場合があります。しかし Datadog のフルスタック相関なら、ブラウザの問題であれ、データベースのダウンタイムであれ、根本原因を特定し、ユーザーへの影響を見積もることができます。

このセクションでは、以下の相関を有効にする方法を説明します。

* [RUM ビューとトレースの相関付け](#correlate-rum-views-with-traces)
* [トレースの相関を活用して Synthetic テストをトラブルシューティング](#leverage-trace-correlation-to-troubleshoot-synthetic-tests)

### RUM ビューとトレースの相関付け

#### 理由

APM と RUM およびセッションリプレイのインテグレーションにより、フロントエンドとバックエンドのデータを 1 つの視点で見ることができるようになります。また、以下のことも可能になります。

* フロントエンドを含むスタックのあらゆる場所の問題をすばやく特定
* ユーザーが経験している問題を完璧に把握

#### 方法

[トレースエクスプローラー][14]で RUM ビューに、[RUM エクスプローラー][15]で APM トレースにアクセスできます。詳細については、[RUM とトレースの接続][16]を参照してください。

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/trace-details-rum.png" alt="トレース内の RUM 情報" style="width:100%;" >}}

RUM ビューとサーバーログには直接の相関はありません。ログ内の RUM イベントと RUM イベント内のログを表示するには、**Traces** タブをクリックします。

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/rum-action-server-logs.png" alt="RUM アクショントレースプレビューのログ" style="width:100%;" >}}

### トレースの相関を活用して Synthetic テストをトラブルシューティング

#### 理由

APM と Synthetic Monitoring のインテグレーションにより、テストによって生成されたトレースを使用して、失敗したテスト実行から問題の根本原因を導き出すことができます。

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/synthetic-trace-root-cause.png" alt="Synthetic テストの失敗の根本原因" style="width:100%;" >}}

バックエンド、インフラストラクチャー、トレースからのログ情報、および RUM イベント ([ブラウザテスト][17]のみ) に加えて、テストからネットワーク関連の詳細情報を得ることで、アプリケーションの動作とユーザー体験に関するさらなる詳細にアクセスすることができます。

#### 方法

アプリケーションのエンドポイントで APM を有効にすると、[Synthetic Monitoring & Continuous Testing ページ][18]で APM トレースにアクセスできます。

詳しくは [Synthetic テストとトレースの接続][19]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/unified_service_tagging
[2]: /ja/logs/indexes/#sampling-consistently-with-higher-level-entities
[3]: /ja/tracing/other_telemetry/connect_logs_and_traces
[4]: /ja/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel
[5]: /ja/tracing/trace_collection/proxy_setup/?tab=nginx
[6]: /ja/logs/log_configuration/processors/#grok-parser
[7]: /ja/logs/log_configuration/processors/#trace-remapper
[8]: /ja/integrations/postgres/?tab=host#log-collection
[9]: https://www.postgresql.org/docs/13/auto-explain.html
[10]: https://www.postgresql.org/docs/13/sql-syntax-lexical.html#SQL-SYNTAX-COMMENTS
[11]: /ja/logs/log_collection/javascript/
[12]: /ja/account_management/billing/rum/#how-do-you-view-logs-from-the-browser-collector-in-rum
[13]: /ja/real_user_monitoring/browser/#initialization-parameters
[14]: https://app.datadoghq.com/apm/traces
[15]: https://app.datadoghq.com/rum/explorer
[16]: /ja/real_user_monitoring/platform/connect_rum_and_traces
[17]: /ja/synthetics/browser_tests/
[18]: https://app.datadoghq.com/synthetics/tests
[19]: /ja/synthetics/apm