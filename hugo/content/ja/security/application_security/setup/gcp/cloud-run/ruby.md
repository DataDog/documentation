---
further_reading:
- link: /security/application_security/how-it-works/
  tag: ドキュメント
  text: App and API Protection の仕組み
- link: /security/default_rules/?category=cat-application-security
  tag: ドキュメント
  text: OOTB App and API Protection ルール
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: App and API Protection のトラブルシューティング
- link: /security/application_security/threats/
  tag: ドキュメント
  text: App and API Protection
- link: https://www.datadoghq.com/blog/datadog-security-google-cloud/
  tag: ブログ
  text: Datadog Security による Google Cloud のコンプライアンスと脅威対策機能の拡張
title: Ruby での Google Cloud Run 関数に対する App and API Protection の有効化
---
<div class="alert alert-info">Google Cloud Run の AAP サポートはプレビュー版です。</a></div>

## 仕組み {#how-it-works}

`serverless-init` アプリケーションは、プロセスをラップし、サブプロセスとして実行します。メトリクス用の DogStatsD リスナーと、トレース用の Trace Agent リスナーを開始します。アプリケーションの stdout/stderr ストリームをラップすることでログを収集します。ブートストラップ後、`serverless-init` はコマンドをサブプロセスとして起動します。

完全なインスツルメンテーションを取得するには、Docker コンテナ内で最初に実行されるコマンドとして `datadog-init` を呼び出していることを確認してください。これは、エントリポイントとして設定するか、CMD の最初の引数として設定することで実行できます。

## 互換性 {#compatibility}

<div class="alert alert-info">App and API Protection serverless の Google Cloud Run サポートはプレビュー版です。</div>

**注**: Remote Configuration による脅威保護はサポートされていません。[Workflows][5] を使用して、[WAF][6] で IP をブロックします。

## 始める {#get-started}

アプリケーションをデプロイする前に、Ruby トレーサーを[手動でインストール][1]します。[サンプルアプリケーション][2]を参照してください。

Dockerfile に以下の指示と引数を追加します。

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENV DD_TRACE_PROPAGATION_STYLE=datadog
ENTRYPOINT ["/app/datadog-init"]
CMD ["rails", "server", "-b", "0.0.0.0"]
```

### 説明 {#explanation}

1. Datadog `serverless-init` を Docker イメージにコピーします。
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. (オプション) Datadog タグを追加します
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-ruby
   ENV DD_ENV=datadog-demo
   ENV DD_APPSEC_ENABLED=1
   ENV DD_VERSION=1
   ```

3. この環境変数は、Cloud Run でトレース伝播を適切に機能させるために必要です。すべての Datadog のインスツルメンテーションが適用されたダウンストリームサービスに対して、この変数を設定してください。
   ```dockerfile
   ENV DD_TRACE_PROPAGATION_STYLE=datadog
   ```

4. Datadog `serverless-init` プロセスでアプリケーションをラップするようにエントリポイントを変更します。
   **注**: Dockerfile 内にすでにエントリーポイントが定義されている場合は、[代替構成](#alt-ruby)を参照してください。
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. バイナリアプリケーションをエントリーポイントでラップして実行します。この行を必要に応じて調整してください。
   ```dockerfile
   CMD ["rails", "server", "-b", "0.0.0.0"]
   ```
### 代替構成 {#alt-ruby}
Dockerfile 内にすでにエントリポイントが定義されている場合は、代わりに CMD 引数を変更することができます。

{{< highlight dockerfile "hl_lines=7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENV DD_TRACE_PROPAGATION_STYLE=datadog
CMD ["/app/datadog-init", "rails", "server", "-b", "0.0.0.0"]
{{< /highlight >}}

エントリーポイントにも Datadog のインスツルメンテーションを適用する必要がある場合は、代わりにエントリーポイントと CMD 引数を入れ替えてください。詳細については、[`serverless-init`の仕組み](#how-serverless-init-works)を参照してください。

{{< highlight dockerfile "hl_lines=7-8" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENV DD_TRACE_PROPAGATION_STYLE=datadog
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "rails", "server", "-b", "0.0.0.0"]
{{< /highlight >}}

実行するコマンドが `datadog-init` の引数として渡される限り、完全なインスツルメンテーションが適用されます。

[1]: /ja/tracing/trace_collection/dd_libraries/ruby/?tab=containers#instrument-your-application
[2]: https://github.com/DataDog/crpb/tree/main/ruby-on-rails

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?query=type%3Afunction%20&env=prod&groupBy=&hostGroup=%2A&lens=Security&sort=-attackExposure&view=list
[2]: /ja/serverless/distributed_tracing/
[3]: https://app.datadoghq.com/security/appsec
[4]: /ja/security/application_security/serverless/compatibility
[5]: /ja/actions/workflows/
[6]: /ja/security/application_security/waf-integration/
[apm-lambda-tracing-setup]: https://docs.datadoghq.com/serverless/aws_lambda/distributed_tracing/