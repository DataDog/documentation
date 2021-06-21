---
title: クロスプロダクト相関で容易にトラブルシューティング
kind: ガイド
---
## 概要

[統合サービスタグ付け][1]を使用すると、高レベルの相関機能を利用できます。しかし、調査の開始が単独のログ、トレース、ビューまたは Synthetic テストであることがあります。ログ、トレース、ビューを他のデータと相関付けることで、ビジネスへの影響を予測し問題の根本原因を数クリックで見つけ出すためのコンテキストを確保できます。

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/full-stack-cover.png" alt="フルスタックの可視性" style="width:80%;" >}}

このガイドでは、フルスタックデータの相関付けの手順についてご説明します。

1. [サーバー側ログとトレースの相関付け](#correlate-server-side-logs-with-traces)
   * [アプリケーションログの相関付け](#correlate-application-logs)
   * [プロキシログの相関付け](#correlate-proxy-logs)
   * [データベースログの相関付け](#correlate-database-logs)
2. [フロントエンドプロダクトの相関付け](#correlate-frontend-products)
   * [ブラウザログと RUM の相関付け](#correlate-browser-logs-with-rum)
3. [ユーザーエクスペリエンスとサーバー動作の相関付け](#correlate-user-experience-with-server-behavior)
   * [RUM ビューとトレースの相関付け](#correlate-rum-views-with-traces)
   * [トレースの相関を活用して Synthetic テストをトラブルシューティング](#leverage-trace-correlation-to-troubleshoot-synthetic-tests)

**注**: ユースケースによっては、以下の手順の一部をスキップしてください。他の要因に左右される手順は、明確に言及されています。

## サーバー側ログとトレースの関連付け

アプリケーションでユーザーにエラーまたは高レイテンシーが発生した際、問題のあるリクエストからのログを詳しく確認することで問題を的確に把握できます。該当リクエストに関するすべてのログを集めて始めから終わりまでの処理を詳しく確認し、問題をすばやく診断できます。

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

{{< tabs >}}
{{% tab "NGINX" %}}

##### OpenTracing のセットアップ

[NGINX トレースインテグレーション][1]を参照。

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

2. 最初の [grok parser][2] をカスタマイズします。
   - **Parsing rules** で、パースルールを以下と置き換えます。
   ```text
   access.common %{_client_ip} %{_ident} %{_trace_id} %{_auth} \[%{_date_access}\] "(?>%{_method} |)%{_url}(?> %{_version}|)" %{_status_code} (?>%{_bytes_written}|-)
   ```
   - **Helper Rules** の **Advanced settings** で、行を追加します。
   ```text
   _trace_id %{notSpace:dd.trace_id:nullIf("-")}
   ```

3. `dd.trace_id` 属性で [トレース ID リマッパー][3]を追加します。

[1]:/ja/tracing/setup_overview/proxy_setup/?tab=nginx
[2]:/ja/logs/processing/processors/?tab=ui#grok-parser
[3]:/ja/logs/processing/processors/?tab=ui#trace-remapper
{{% /tab %}}
{{< /tabs >}}

### データベースログの相関付け

#### 理由

データベースログは、同様のクエリ、変数の匿名化、そして高い使用量のため、コンテキスト化が困難なことが多くあります。

たとえば、プロダクションのクエリ遅延は、多くのリソースを使用して長時間かけて調査しなければ再現することが困難です。以下に、トレースを使用してクエリ遅延の分析を相関付ける方法例をご紹介します。

#### 方法

{{< tabs >}}
{{% tab "PostgreSQL" %}}

##### データベースログの強化

PostgreSQL のデフォルトのログについては詳述されていません。強化するには、[こちらのインテグレーションガイド][1]に従ってください。

またクエリの遅延ガイドラインは、クエリの遅延に関する詳細なプランの説明も必要とします。実行プランの結果については、以下を使用して`/etc/postgresql/<VERSION>/main/postgresql.conf` を更新します。

```conf
session_preload_libraries = 'auto_explain'
auto_explain.log_min_duration = '500ms'
```

500ms 以上のクエリは実行プランを記録します。

**注**: `auto_explain.log_analyze = 'true'` にすると、より多くの情報を取得できますが、パフォーマンスに大きな影響が出ます。詳しくは、[公式ドキュメント][2]をご参照ください。

##### trace_id のデータベースログへの挿入

[SQL コメント][3]とともに、データベースログのほとんどに `trace_id` を挿入します。以下は、Flask および SQLAlchemy の例です。

```python
if os.environ.get('DD_LOGS_INJECTION') == 'true':
    from ddtrace.helpers import get_correlation_ids
    from sqlalchemy.engine import Engine
    from sqlalchemy import event

    @event.listens_for(Engine, "before_cursor_execute", retval=True)
    def comment_sql_calls(conn, cursor, statement, parameters, context, executemany):
        trace_id, span_id = get_correlation_ids()
        statement = f"{statement} -- dd.trace_id=<{trace_id or 0}>"
        return statement, parameters
```

**注**: これは、クエリステートメントを含むログのみを相関付けます。 `ERROR: duplicate key value violates unique constraint "<TABLE_KEY>"` のようなエラーログは、コンテキスト外にとどまります。ほとんどの場合、エラー情報はアプリケーションログを通じて取得できます。

PostgreSQL パイプラインのクローン作成とカスタマイズ:

1. 新しい [grok parser][4] を追加します。
   ```text
   extract_trace %{data}\s+--\s+dd.trace_id=<%{notSpace:dd.trace_id}>\s+%{data}
   ```

2. `dd.trace_id` 属性で [トレース ID リマッパー][5]を追加します。

以下に、遅延しているトレースからのクエリ遅延の実行プランの例を示します。

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/slow-query-root-cause.png" alt="クエリの遅延ログ相関" style="width:80%;" >}}

[1]: /ja/integrations/postgres/?tab=host#log-collection
[2]: https://www.postgresql.org/docs/13/auto-explain.html
[3]: https://www.postgresql.org/docs/13/sql-syntax-lexical.html#SQL-SYNTAX-COMMENTS
[4]: /ja/logs/processing/processors/?tab=ui#grok-parser
[5]: /ja/logs/processing/processors/?tab=ui#trace-remapper
{{% /tab %}}
{{< /tabs >}}

## フロントエンドプロダクトの相関付け

### ブラウザログと RUM の相関付け

#### 理由

RUM 内の[ブラウザログ][5]により、コンテキストと問題の詳細情報が得られます。下記の例では、ブラウザログは正しくないクエリの根本原因が無効なユーザー ID であることを示しています。

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/browser-logs-in-rum.png" alt="RUM アクションのブラウザログ" style="width:80%;" >}}

ブラウザログを RUM と相関付けると、`session_id` や `view.id` などの属性を使用して、[エンティティレベルの一貫性を維持しながら積極的なサンプリング戦略][2]も実現できます。

#### 方法

[RUM 請求に関するよくあるご質問][6]で説明されているとおり、ブラウザログと RUM イベントは自動的に相関付けられます。[RUM とログ SDK に一致するコンフィギュレーション][7]が必要です。

## ユーザーエクスペリエンスとサーバー動作の相関付け

従来のバックエンドおよびフロントエンドのモニタリングはサイロ化され、スタック全体のトラブルシューティングに別々のワークフローを要求します。Datadog のフルスタック相関なら、根本原因を特定（ブラウザの問題なのかデータベースのダウンタイムに起因するのか）し、ユーザーへの影響を予測できます。

このセクションでは、このようなタイプの相関付けを有効にする手順についてご説明します。

* [RUM ビューとトレースの相関付け](#correlate-rum-views-with-traces)
* [トレースの相関を活用して Synthetic テストをトラブルシューティング](#leverage-the-trace-correlation-to-troubleshoot-synthetic-tests)

### RUM ビューとトレースの相関付け

#### 理由

APM と RUM を共に使用することで、フロントエンドおよびバックエンドの完全データを 1 つのレンズで見ることができます。

RUM 相関で以下を実行:

* フロントエンドを含むスタックのあらゆる場所の問題をすばやく特定
* ユーザーが経験している問題を完璧に把握

#### 方法

[RUM とトレースの接続][8]ドキュメントを参照してください。RUM ビューの情報は[トレースビュー][9]、トレースの情報は[セッションビュー][10]でご利用いただけます。

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/trace-details-rum.png" alt="トレースの RUM 情報" style="width:80%;" >}}

**注**: RUM ビューとサーバーログに直接相関はありません。トレースのプレビューで、RUM イベントをログから、ログを RUM イベントから確認できます。

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/rum-action-server-logs.png" alt="RUM アクショントレースプレビューのログ" style="width:80%;" >}}

### トレースの相関を活用して Synthetic テストをトラブルシューティング

#### 理由

Synthetic モニタリングとの APM インテグレーションを使用すると、失敗したテストから生成されたトレースを見ることで、テストランが失敗した問題の根本原因を探ることができます。

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/synthetic-trace-root-cause.png" alt="Synthetic テストの失敗の根本原因" style="width:80%;" >}}

ネットワーク関連の仕様（テストから）に加えてバックエンド、インフラストラクチャー、ログの情報（トレースから）、そして RUM イベント（[ブラウザテスト][11]のみ）を得ることで、ユーザーが目にしたのと同じようにアプリケーションが挙動する詳細な様子を確認することができます。

#### 方法

この機能については、[Synthetic 設定で APM インテグレーションを有効にする][12]ドキュメントを参照してください。

[1]: /ja/getting_started/tagging/unified_service_tagging
[2]: /ja/logs/indexes/#sampling-consistently-with-higher-level-entities
[3]: /ja/tracing/connect_logs_and_traces
[4]: /ja/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel
[5]: /ja/logs/log_collection/javascript/
[6]: /ja/account_management/billing/rum/#can-i-view-logs-from-the-browser-collector-in-rum
[7]: /ja/real_user_monitoring/browser/#initialization-parameters
[8]: /ja/real_user_monitoring/connect_rum_and_traces
[9]: https://app.datadoghq.com/apm/traces
[10]: https://app.datadoghq.com/rum/explorer
[11]: /ja/synthetics/browser_tests/
[12]: /ja/synthetics/apm