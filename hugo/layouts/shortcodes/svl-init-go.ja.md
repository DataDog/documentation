アプリケーションをデプロイする前に、Go トレーサーを[手動でインストール][1]してください。以下の指示と引数を Dockerfile に追加してください。

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
CMD ["/path/to/your-go-binary"]
```

#### 説明

1. Datadog `serverless-init` を Docker イメージにコピーします。
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

4. Datadog `serverless-init` プロセスでアプリケーションをラップするようにエントリポイントを変更します。
   **注**: Dockerfile 内にすでにエントリーポイントが定義されている場合は、[代替構成](#alt-go)を参照してください。
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

3. (オプション) Datadog タグを追加します。
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-go
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. エントリポイントにラップされたバイナリアプリケーションを実行します。この行は必要に応じて変更してください。
   ```dockerfile
   CMD ["/path/to/your-go-binary"]
   ```

#### 代替構成 {#alt-go}
Dockerfile 内にすでにエントリーポイントが定義されている場合は、代わりに CMD 引数を変更することができます。

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
CMD ["/app/datadog-init", "/path/to/your-go-binary"]
```

エントリーポイントもインスツルメンテーションする必要がある場合は、代わりにエントリーポイントと CMD 引数を入れ替えることができます。詳しくは、[`serverless-init` の動作](#how-serverless-init-works)を参照してください。

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "/path/to/your-go-binary"]
```

実行するコマンドが `datadog-init` の引数として渡される限り、完全なインスツルメンテーションを受け取ります。

**注**: Go コードを自動的にインスツルメントするツールである [Orchestrion][2] を使うこともできます。Orchestrion は非公開ベータ版です。詳細については、Orchestrion リポジトリで GitHub イシューを開くか、[サポートに連絡][3]してください。

[1]: /tracing/trace_collection/library_config/go/
[2]: https://github.com/DataDog/orchestrion
[3]: /help