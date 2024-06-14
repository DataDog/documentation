---
aliases:
- /ja/security_platform/application_security/troubleshooting
further_reading:
- link: /security/application_security/
  tag: ドキュメント
  text: Datadog Application Security Management による脅威の監視
- link: /security/application_security/enabling/
  tag: ドキュメント
  text: Application Security Management を有効にして脅威の検出を開始する
- link: /security/application_security/enabling/compatibility/
  tag: ドキュメント
  text: プログラミング言語とフレームワークの互換性
- link: /security/application_security/how-appsec-works/
  tag: ドキュメント
  text: Datadog における Application Security Management の仕組み
title: Application Security Management のトラブルシューティング
---


## 概要

Datadog Application Security Management (ASM) で予期せぬ動作が発生した場合、以下に挙げるような一般的な問題を調査することができます。問題が解決しない場合は、[Datadog サポート][1]にお問い合わせください。

## ASM レート制限

ASM のトレースは、1 秒間に 100 個のトレースにレート制限されています。制限後に送信されたトレースは報告されません。制限を変更する必要がある場合は、[Datadog サポート][1]に連絡してください。

## ASM で不審なリクエストが検出されない

ASM の[トレースとシグナルエクスプローラー][2]に脅威情報が表示されるには、一連の手順を正常に実行することが必要です。この問題を調査する際には、各ステップを確認することが重要です。特定の言語に関する追加のトラブルシューティング手順は、末尾の言語タブに記載されています。

### ASM が有効であることを確認する

メトリクス `datadog.apm.appsec_host` を使って、ASM が動作しているかどうかを確認することができます。

1. Datadog の **Metrics > Summary** に移動します。
2. メトリクス `datadog.apm.appsec_host` を検索します。このメトリクスが存在しない場合、ASM を実行しているサービスは存在しません。メトリクスが存在する場合、サービスはメトリクスタグ `host` と `service` で報告されます。
3. メトリクスを選択し、** Tags** セクションで、`service` を検索すると、どのサービスが ASM を実行しているかを確認できます。

`datadog.apm.appsec_host` が表示されない場合は、[アプリ内の説明][3]を確認し、初期設定の手順がすべて完了したことを確認してください。

ASM のデータは、APM トレースと一緒に送信されます。[APM のトラブルシューティング][4]を参照して、[APM の設定を確認][5]し、[接続エラー][6]を調べてください。

### アプリケーションにテストアタックを送信する

ASM の設定をテストするには、次の curl スクリプトを含むファイルを実行して、[Security Scanner Detected][7] ルールをトリガーします。

{{< programming-lang-wrapper langs="java,.NET,go,ruby,PHP,Node.js,python" >}}
{{< programming-lang lang="java" >}}

```bash
for ((i=1;i<=250;i++));
do
# 既存サービスのルートが対象
curl https://your-application-url/existing-route -A dd-test-scanner-log;
# 既存サービス以外のルートが対象
curl https://your-application-url/non-existing-route -A dd-test-scanner-log;
done
```

**注:** `dd-test-scanner-log` の値は、最新のリリースでサポートされています。

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

```bash
for ((i=1;i<=250;i++));
do
# 既存サービスのルートが対象
curl https://your-application-url/existing-route -A dd-test-scanner-log;
# 既存サービス以外のルートが対象
curl https://your-application-url/non-existing-route -A dd-test-scanner-log;
done
```

**注:** `dd-test-scanner-log` の値は、最新のリリースでサポートされています。

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

 ```bash
 for ((i=1;i<=250;i++));
do
# 既存サービスのルートが対象
curl https://your-application-url/existing-route -A Arachni/v1.0;
# 既存サービス以外のルートが対象
curl https://your-application-url/non-existing-route -A Arachni/v1.0;
done
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

 ```bash
 for ((i=1;i<=250;i++));
do
# 既存サービスのルートが対象
curl https://your-application-url/existing-route -A Arachni/v1.0;
# 既存サービス以外のルートが対象
curl https://your-application-url/non-existing-route -A Arachni/v1.0;
done
```

{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

```bash
for ((i=1;i<=250;i++));
do
# 既存サービスのルートが対象
curl https://your-application-url/existing-route -A dd-test-scanner-log;
# 既存サービス以外のルートが対象
curl https://your-application-url/non-existing-route -A dd-test-scanner-log;
done
```

**注:** `dd-test-scanner-log` の値は、最新のリリースでサポートされています。

{{< /programming-lang >}}
{{< programming-lang lang="Node.js" >}}

```bash
for ((i=1;i<=250;i++));
do
# 既存サービスのルートが対象
curl https://your-application-url/existing-route -A dd-test-scanner-log;
# 既存サービス以外のルートが対象
curl https://your-application-url/non-existing-route -A dd-test-scanner-log;
done
```
**注:** `dd-test-scanner-log` の値は、最新のリリースでサポートされています。

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

```bash
for ((i=1;i<=250;i++));
do
# 既存サービスのルートが対象
curl https://your-application-url/existing-route -A dd-test-scanner-log;
# 既存サービス以外のルートが対象
curl https://your-application-url/non-existing-route -A dd-test-scanner-log;
done
```

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

アプリケーションを有効にして実行し、成功すると、数分後に[トレースとシグナルエクスプローラー][2]に脅威情報が表示されます。

{{< img src="/security/application_security/application-security-signal.png" alt="Security Signal 詳細ページでは、タグ、メトリクス、次のステップの提案、脅威と関連する攻撃者の IP アドレスが表示されます。" style="width:100%;" >}}

### 必要なトレーサーのインテグレーションが無効になっていないか確認する

ASM は、特定のトレーサーのインテグレーションに依存しています。それらが無効になっている場合、ASM は動作しません。無効化されたインテグレーションがあるかどうかを確認するには、[スタートアップログ][8] にある `disabled_integrations` を見てください。

必要なインテグレーションは言語によって異なります。

{{< programming-lang-wrapper langs="java,.NET,go,ruby,PHP,Node.js,python" >}}
{{< programming-lang lang="java" >}}

[Java][1] の場合、以下のいずれかの技術を使用している場合は、それぞれのインテグレーションが必要です。

- grizzly
- grizzly-filterchain
- jersey
- jetty
- ratpack
- ratpack-request-body (ratpack も必要)
- resteasy
- servlet
- servlet-2
- servlet-3
- servlet-request-body (servlet も必要)
- spring-web
- tomcat

[1]: /ja/security/application_security/enabling/compatibility/java
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

[.NET][1] の場合、ASP.NET とのインテグレーションが必要です。

**注:** ASP.NET Core が無効になっている場合でも、ASM はこのフレームワークで動作するはずです。

[1]: /ja/security/application_security/enabling/compatibility/dotnet
{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

[PHP][1] については、必須のインテグレーションはありません。
<p></p>

[1]: /ja/security/application_security/enabling/compatibility/php
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

以下の [Go][1] フレームワークは、すぐに使える APM インテグレーションを使用してインスツルメンテーションを行う必要があります。

- [gRPC][2]
- [net/http][3]
- [Gorilla Mux][4]
- [Echo][5]
- [Chi][6]

お使いのフレームワークがサポートされていない場合は、Go リポジトリで[新しい課題を作成][7]してください。

[1]: /ja/security/application_security/enabling/compatibility/go
[2]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc#example-package-Server
[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http#example-package
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux#example-package
[5]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo.v4#example-package
[6]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi.v5#example-package
[7]: https://github.com/DataDog/dd-trace-go/issues/new?title=Missing%20appsec%20framework%20support
{{< /programming-lang >}}
{{< programming-lang lang="Node.js" >}}

[Node.js][1] の場合、HTTP インテグレーションが必要です。
<p></p>

[1]: /ja/security/application_security/enabling/compatibility/nodejs
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

[Ruby][1] の場合、[Rack][2] とのインテグレーションが必要です。また、Ruby トレーサーのバージョン `1.0.0` 以降が必要です。[0.x から 1.x への移行][3]の情報を参照してください。

**注:** Rack は手動で追加するか、[Rails][4] または [Sinatra][5] とのインテグレーションで自動的に追加することができます。手動で追加した場合、Rack スタックにおいて、トレーサーミドルウェアはセキュリティミドルウェアの前に表示される必要があります。

[1]: /ja/security/application_security/enabling/compatibility/ruby
[2]: /ja/tracing/trace_collection/dd_libraries/ruby/#rack
[3]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/UpgradeGuide.md#from-0x-to-10
[4]: /ja/tracing/trace_collection/dd_libraries/ruby/#rails
[5]: /ja/tracing/trace_collection/dd_libraries/ruby/#sinatra
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

[Python][1] の場合、WSGI インテグレーションと、Django や Flask のような使用中のフレームワークのインテグレーションが必要です。
<p></p>

[1]: /ja/security/application_security/enabling/compatibility/python
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Datadog Agent の構成を確認する

この手順のトラブルシューティングを行うには、次のようにします。

- このアドレス `http://<agent-machine-name>:<agent-port>/info`、通常は `http://localhost:8126/info` で実行中の Agent の詳細を確認します。
- [トレーサーログ][7]にスパンに関連する Agent 送信エラーがないことを確認します。
- Agent が別のマシンにインストールされている場合、`DD_AGENT_HOST` と、オプションで `DD_TRACE_AGENT_PORT` が設定されているか、アプリケーショントレースライブラリの `DD_TRACE_AGENT_URL` が設定されているかを確認してください。

### スパンが Datadog に正常に送信されたかどうかを確認する

ASM のデータは、[スパン][9]を介して送信されます。スパンが Datadog に正常に送信されていることを確認するために、トレーサーログにこのようなログが含まれていることを確認します。

```
2021-11-29 21:19:58 CET | TRACE | INFO | (pkg/trace/info/stats.go:111 in LogStats) | [lang:.NET lang_version:5.0.10 interpreter:.NET tracer_version:1.30.1.0 endpoint_version:v0.4] -> traces received: 2, traces filtered: 0, traces amount: 1230 bytes, events extracted: 0, events sampled: 0
```

スパンが送信されていない場合、トレーサーログにはこのようなログが含まれます。

```
2021-11-29 21:18:48 CET | TRACE | INFO | (pkg/trace/info/stats.go:104 in LogStats) | No data received
```

## 言語別トラブルシューティング

以下は、特定の言語に対するトラブルシューティングの追加手順です。

{{< programming-lang-wrapper langs="java,.NET,go,ruby,PHP,Node.js,python" >}}
{{< programming-lang lang="java" >}}
Java ライブラリはロギングに [SLF4J][1] を使用します。トレーサーがファイルにログを記録するように、以下のランタイムフラグを追加してください。

```java
 -Ddatadog.slf4j.simpleLogger.defaultLogLevel=info
 -Ddatadog.slf4j.simpleLogger.logFile=dd.log
```

サービス開始後、トレーサーは指定されたファイルにログを記録します。Datadog では、`DEBUG` ログは冗長であるため、ログレベルには `INFO` を使用することを推奨しています。

[1]: https://www.slf4j.org/
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

.NET ライブラリはファイルにログを記録し、`stdout`/`stderr` にログを記録することはできません。デフォルトのログレベルは `INFO` です。`DEBUG` ログを有効にするには、`DD_TRACE_DEBUG=true` と設定してください。

ログファイルは、以下のディレクトリにあります。

| プラットフォーム   | ログディレクトリ    |
|------------|----------------|
| Docker       | コンテナのディレクトリ `/var/log/datadog/dotnet/`。推奨されるオプションは、[ボリューム][1]を使用してホストマシンにログフォルダをマウントすることです。 |
| Linux      | /var/log/datadog/dotnet/                                   |
| Windows    | C:\ProgramData\Datadog .NET Tracer\logs                    |

[1]: https://docs.docker.com/storage/volumes/
{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

PHP の場合、Datadog ASM の拡張機能のトラブルシューティングを開始するには、ASM の拡張機能の `.ini` ファイルでデバッグログを有効にしてください。

拡張機能の `ini` ファイルは通常 `/etc/php/<version>/xxx/conf.d/98-ddtrace.ini` にありますが、インストール先によって場所が異なる可能性があります。もしあれば、`phpinfo()` の出力の最初を見て、`.ini` ファイルがスキャンされるディレクトリを特定してください。`.ini` ファイルで、以下の構成オプションを以下のように設定します。

```php
datadog.appsec.log_level='debug'
datadog.appsec.helper_extra_args='--log_level=debug'
datadog.appsec.helper_log_file='/tmp/helper.log'
```

この拡張機能は、デフォルトの `php_error` ログファイルにログを出力します。このファイルにログがない場合は、`.ini` ファイルに以下を追加してください。

```php
datadog.appsec.log_file='tmp/extension.log'
```

### インストールで PHP が見つからない
インストールスクリプトが正しい PHP のバージョンを見つけられない場合、 `--php-bin` を PHP のバイナリの場所に設定することができます。例:

```
$ php datadog-setup.php --php-bin /usr/bin/php7.4 --enable-appsec
```
### ヘルパーへの接続に失敗
ASM の拡張機能がヘルパープロセスと通信できない場合、次のような警告が発生します。

```
PHP Warning:  Unknown: [ddappsec] Connection to helper failed and we are not going to attempt to launch it: dd_error
```

警告の後には、以下のエラーメッセージのいずれかが表示される可能性があります。

```
PHP Warning:  Unknown: [ddappsec] Could not open lock file /tmp/ddappsec.lock: Permission denied in Unknown on line 0
```
```
PHP Warning:  Unknown: [ddappsec] Call to bind() failed: Permission denied
```
```
PHP Warning:  Unknown: [ddappsec] Failed to unlink /tmp/ddappsec.sock: Operation not permitted
```

これは、拡張機能が使用するロックファイルやソケットファイルの権限が無効であるか、PHP プロセスを実行するユーザーが `tmp` ディレクトリへの書き込み権限を持っていないことを示します。

ロックファイルやソケットファイルの権限が無効な場合は、それらを削除して Apache/FPM を再起動するか、`user:group` を `www-data` などの Apache/FPM が使用するものと一致するように調整します。

tmp ディレクトリへの書き込み権限がない場合、拡張機能の `.ini` ファイルで以下の設定を変更することで、ロックファイルとソケットファイルの場所を変更することができます。

```
datadog.appsec.helper_runtime_path = /<directory with compatible permissions>/
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

#### 実行中のアプリケーションで ASM が有効になっていることを確認する

[トレーサースタートアップログ][1]には、トレーサーの構成と ASM が有効かどうかが表示されます。`appsec` が `true` ならば、ASM が有効で、動作しています。

たとえば、次のスタートアップログでは、ASM が無効になっていることがわかります。

```
2022/02/17 14:49:00 Datadog Tracer v1.36.0 INFO: DATADOG TRACER CONFIGURATION {"date":"2022-02-17T14:49:00+01:00","os_name":"Linux (Unknown Distribution)","os_version":"5.13.0","version":"v1.36.0","lang":"Go","lang_version":"go1.17.1","env":"prod","service":"grpcserver","agent_url":"http://localhost:8126/v0.4/traces","debug":false,"analytics_enabled":false,"sample_rate":"NaN","sampling_rules":null,"sampling_rules_error":"","service_mappings":null,"tags":{"runtime-id":"69d99219-b68f-4718-9419-fa173a79351e"},"runtime_metrics_enabled":false,"health_metrics_enabled":false,"profiler_code_hotspots_enabled":false,"profiler_endpoints_enabled":false,"dd_version":"","architecture":"amd64","global_service":"","lambda_mode":"false","appsec":false,"agent_features":{"DropP0s":false,"Stats":false,"StatsdPort":0}}
```

#### デバッグログを有効にする

環境変数 `DD_TRACE_DEBUG=1` でデバッグログを有効化します。ASM ライブラリは、標準エラー出力にログを記録します。

**注:** ASM は、有効になっているときのみログを出力します。ASM を有効にするには、環境変数 `DD_APPSEC_ENABLED=1` を使用します。


[1]: /ja/tracing/troubleshooting/tracer_startup_logs/
{{< /programming-lang >}}
{{< programming-lang lang="Node.js" >}}

Node.js ライブラリを 1.x から 2.x にアップグレードした場合、この[移行ガイド][1]を使用して、破壊的な変更を評価することができます。

Node.js アプリケーションの[トレースとシグナルエクスプローラー][2]に ASM の脅威情報が表示されない場合は、以下の手順でトラブルシューティングを実施してください。

1. [スタートアップログ][3]で `appsec_enabled` が `true` であることを確認し、最新バージョンの ASM が動作していることを確認します

    a. リクエスト送信後にスタートアップログが表示されない場合は、環境変数 `DD_TRACE_STARTUP_LOGS=true` を追加して、スタートアップログを有効にしてください。`appsec_enabled` が `true` であるか、スタートアップログを確認します。

   b. `appsec_enabled` が `false` の場合、ASM が正しく有効化されていません。[インストール方法][4]を参照してください。

    c. スタートアップログに `appsec_enabled` がない場合、ASM の最新版をインストールする必要があります。[インストール方法][4]を参照してください。

2. トレーサーは動作していますか？APM ダッシュボードで関連するトレースを見ることができますか？

   ASM はトレーサーに依存しているので、もしトレースが表示されない場合は、トレーサーが機能していない可能性があります。[APM トラブルシューティング][5]を参照してください。

3. アプリケーションのディレクトリで、`npm explore @datadog/native-appsec -- npm run install` というコマンドを実行し、アプリを再起動します。

    a. `@datadog/native-appsec` が見つからない場合は、インストールが正しく行われていない可能性があります。[インストール方法][4]を参照してください。

    b. アプリケーションの起動時に `@datadog/native-appsec` が見つかった場合は、ランタイム起動スクリプトにコマンドを追加してください。

    c. それでもトレーサーが動作しない場合は、サポートされていないランタイムを実行している可能性があります。

4. ログを有効にするには、以下の環境変数を追加してください。

    ```
    DD_TRACE_DEBUG=1
    DD_TRACE_LOG_LEVEL=info
    ```

[1]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md
[2]: https://app.datadoghq.com/security/appsec/
[3]: /ja/tracing/troubleshooting/tracer_startup_logs/
[4]: /ja/security/application_security/enabling/nodejs/?tab=dockercli
[5]: /ja/tracing/troubleshooting/
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Python アプリケーションの[トレースとシグナルエクスプローラー][1]に ASM の脅威情報が表示されない場合は、ASM が実行されているか、トレーサーが動作しているかを確認してください。

1. アプリケーションのログレベルを `DEBUG` に設定し、ASM が動作していることを確認します。

   ```python
   import logging
   logging.basicConfig(level=logging.DEBUG)
   ```

   次に、アプリケーションに対して任意の HTTP コールを実行します。以下のようなログが表示されるはずです。

   ```
   DEBUG:ddtrace.appsec.processor:[DDAS-001-00] Executing AppSec In-App WAF with parameters:
   ```

   このログがない場合は、ASM が起動していないことになります。

2. トレーサーは動作していますか？APM ダッシュボードで関連するトレースを見ることができますか？

   ASM はトレーサーに依存しています。もしトレースが表示されない場合は、トレーサーが機能していない可能性があります。[APM トラブルシューティング][2]を参照してください。


[1]: https://app.datadoghq.com/security/appsec/
[2]: /ja/tracing/troubleshooting/
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Ruby の場合、数分経っても[トレースとシグナルエクスプローラー][1]に ASM の脅威情報が表示されない場合は、[デバッグログ][2]のトレーサ診断を有効にしてください。例えば、以下のようになります。

```ruby
Datadog.configure do |c|
  c.diagnostics.debug = true  # 一般的なログレベルをデバッグに上げる
  c.appsec.waf_debug = true   # また、WAF 固有のログの冗長性を最高レベルにする
end
```

デバッグログは冗長ですが、有用です。Datadog サポート][1]でチケットを開く場合は、ログをリクエストと一緒に転送してください。

#### ASM は正しく有効になっていますか？

以下などのログが表示される場合は、ASM が正しく有効化されています。

```
D, [2021-12-14T11:03:32.167125 #73127] DEBUG -- ddtrace: [ddtrace] (libddwaf/lib/datadog/appsec/waf.rb:296:in `block in logger=') {:level=>:ddwaf_log_info, :func=> "ddwaf_set_log_cb", :file=>"PowerWAFInterface.cpp", :message=>"Sending log messages to binding, min level trace"}
D, [2021-12-14T11:03:32.200491 #73127] DEBUG -- ddtrace: [ddtrace] (libddwaf/lib/datadog/appsec/waf.rb:296:in `block in logger=') {:level=>:ddwaf_log_debug, :func= >"parse", :file=>"parser_v2.cpp", :message=>"Loaded 124 rules out of 124 available in the ruleset"}
```

これらのログが表示されない場合は、以下を確認してください。

- アプリケーションプロセスに対して正しい ASM 環境変数が設定されているか。
- 最新バージョンの gem がインストールされている。
- トレーサーは正しく構成され、APM トレースを APM ダッシュボードに送信している。

#### ASM は、HTTP リクエストごとに呼び出されますか？

HTTP リクエストごとに ASM が呼び出されることを確認するには、[テストアタック](#send-a-test-attack-to-your-application)を起動し、以下のログを確認します。

```
D, [2022-01-19T21:25:50.579745 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/reactive/operation.rb:14:in `initialize') operation: rack.request initialize
D, [2022-01-19T21:25:50.580300 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/contrib/rack/gateway/watcher.rb:25:in `block (2 levels) in watch') root span: 964736568335365930
D, [2022-01-19T21:25:50.580371 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/contrib/rack/gateway/watcher.rb:26:in `block (2 levels) in watch') active span: 964736568335365930
D, [2022-01-19T21:25:50.581061 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/contrib/rack/reactive/request.rb:34:in `block in subscribe') reacted to ["request.headers", "request.uri.raw", "request.query", "request.cookies", "request.body.raw"]: [{"version"=>"HTTP/1.1", "host"=>"127.0.0.1:9292", "accept"=>"*/*", "user-agent"=>"Nessus SOAP"}, "http://127.0.0.1:9292/", [], {}, ""]
```

これらのログが表示されない場合は、以下をお試しください。

- 別の上流セキュリティシステムが、テストヘッダー値に基づいてリクエストをフィルタリングしていないことを確認します。これは、リクエストがアプリケーションに到達するのを阻止します。
- 別のユーザー Agent 値を curl コマンドで使用して、別の[テストアタック](#send-a-test-attack-to-your-application)を送信し、脅威情報が正常に送信されるかどうか確認します。
- アプリケーションのログから、実行したリクエストがアプリケーションに到達し、他の上流システムから応答がなかったことを確認します。

Rack とのインテグレーションを手動で構成した場合、既知の問題により ASM が機能しないことがあります。例:

```ruby
Datadog.configure do |c|
  c.tracing.instrument :rails
  ...
  c.tracing.instrument :rack, web_service_name: "something", request_queuing: true
```

`c.tracing.instrument :rack` が存在する場合、それを削除してチェックが通るかどうか確認します。

#### ASM は、HTTP リクエストのセキュリティ脅威を検出していますか？

ASM がセキュリティ上の脅威を検出していることを確認するには、[テストアタック](#send-a-test-attack-to-your-application)を起動し、以下のログを確認します。

```
D, [2021-12-14T22:39:53.268820 #106051] DEBUG -- ddtrace: [ddtrace] (ddtrace/lib/datadog/appsec/contrib/rack/reactive/request.rb:63:in `block in subscribe') WAF: #<struct Datadog::AppSec::WAF::Result action=:monitor, data=[{"rule"=>{"id"=>"ua0-600-10x", "name"=>"Nessus", "tags"=>{"type"=>"security_scanner", "category"=>"attack_attempt"}}, "rule_matches"=>[{"operator"=>"match_regex", "operator_value"=>"(?i)^Nessus(/|([ :]+SOAP))", "parameters"=>[{"address"=>"server.request.headers.no_cookies", "key_path"=>["user-agent"], "value"=>"Nessus SOAP", "highlight"=>["Nessus SOAP"]}]}]}], perf_data=nil, perf_total_runtime=20519>
```
これらのログが表示されない場合は、別の上流セキュリティシステムがリクエストをフィルタリングしたり、テストヘッダーの値に基づいてリクエストを変更していないことを確認してください。

#### トレーサーは、セキュリティデータを含むトレースを送信していますか？
ASM のデータは、APM のトレースと一緒に送信されます。ASM が正しく検出され、セキュリティデータがトレースに挿入されることを確認するには、[テストアタック](#send-a-test-attack-to-your-application)を起動し、以下のトレーサーログを確認します。

```
Tags: [
   runtime-id => 0c3dfc67-9cf3-457c-a980-0229b203d048,
   _dd.runtime_family => ruby,
   appsec.event => true,
   _dd.appsec.json => {"triggers":[{"rule":{"id":"ua0-600-10x","name":"Nessus","tags":{"type":"security_scanner","category":"attack_attempt"}},"rule_matches":[{"operator":"match_regex","operator_value":"(?i)^Nessus(/|([ :]+SOAP))","parameters":[{"address":"server.request.headers.no_cookies","key_path":["user-agent"],"value":"Nessus SOAP","highlight":["Nessus SOAP"]}]}]}]},
   http.request.headers.host => 127.0.0.1:9292,
   http.request.headers.accept => */*,
   http.request.headers.user-agent => Nessus SOAP,
   http.response.headers.content-type => text/plain,
   http.host => 127.0.0.1,
   http.useragent => Nessus SOAP,
   network.client.ip => 127.0.0.1,
   _dd.origin => appsec,
   http.method => GET,
   http.url => /,
   http.base_url => http://127.0.0.1:9292,
   http.status_code => 200,
   http.response.headers.content_type => text/plain]
Metrics: [
   _dd.agent_psr => 1.0,
   system.pid => 155644.0,
   _dd.appsec.enabled => 1.0,
   _dd.measured => 1.0,
   _sampling_priority_v1 => 2.0]]
```

Agent がトレースを転送するまで 1 分ほど待ち、APM ダッシュボードにトレースが表示されることを確認します。トレース内のセキュリティ情報は、Datadog で処理されるまでにさらに時間がかかり、ASM の[トレースとシグナルエクスプローラー][1]に疑わしいリクエストとして表示される場合があります。

[1]: https://app.datadoghq.com/security/appsec/
[2]: /ja/tracing/troubleshooting/#tracer-debug-logs
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}


## Application Vulnerability Management で脆弱性が検出されない

脆弱性情報が Service Catalog Security View または Application Vulnerability Management Explorer に表示されるには、一連のステップを正常に実行する必要があります。この問題を調査する際には、各ステップを確認することが重要です。

### ASM が有効であることを確認する

メトリクス `datadog.apm.appsec_host` を使って、ASM が動作しているかどうかを確認することができます。

1. Datadog の **Metrics > Summary** に移動します。
2. メトリクス `datadog.apm.appsec_host` を検索します。このメトリクスが存在しない場合、ASM を実行しているサービスは存在しません。メトリクスが存在する場合、サービスはメトリクスタグ `host` と `service` で報告されます。
3. メトリクスを選択し、** Tags** セクションで、`service` を検索すると、どのサービスが ASM を実行しているかを確認できます。

`datadog.apm.appsec_host` が表示されない場合は、[アプリ内の説明][3]を確認し、初期設定の手順がすべて完了したことを確認してください。

ASM のデータは、APM トレースと一緒に送信されます。[APM のトラブルシューティング][4]を参照して、[APM の設定を確認][5]し、[接続エラー][6]を調べてください。

### トレーサーのバージョンが更新されていることを確認する

トレーサーの正しいバージョンを使用していることを確認するために、Application Security [設定ドキュメント][11]を参照してください。ライブラリ情報を含むテレメトリーデータの送信を開始するには、これらの最小バージョンが必要です。

### テレメトリーデータの通信を確保する

環境変数 `DD_INSTRUMENTATION_TELEMETRY_ENABLED` (NodeJS の場合は `DD_TRACE_TELEMETRY_ENABLED`) が `true` に設定されているか、または使用する言語の対応システムプロパティが有効になっていることを確認します。例えば、Java の場合: `-Ddd.instrumentation.telemetry.enabled=true`

## さらにサポートが必要ですか？

ASM で問題が解決しない場合は、以下の情報を添えて [Datadog サポート][1]にご連絡ください。

- [テストアタック](#send-a-test-attack-to-your-application)が正常に送信されたことの確認
- トレーサーの[スタートアップ][8]または[デバッグ][10]ログ

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help/
[2]: https://app.datadoghq.com/security/appsec/
[3]: https://app.datadoghq.com/security/appsec?instructions=all
[4]: /ja/tracing/troubleshooting/
[5]: /ja/tracing/troubleshooting/#confirm-apm-setup-and-agent-status
[6]: /ja/tracing/troubleshooting/connection_errors/
[7]: /ja/security/default_rules/security-scan-detected/
[8]: /ja/tracing/troubleshooting/tracer_startup_logs/
[9]: /ja/tracing/glossary/#spans
[10]: /ja/tracing/troubleshooting/#tracer-debug-logs
[11]: /ja/security/application_security/enabling/