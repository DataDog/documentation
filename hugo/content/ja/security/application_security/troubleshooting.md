---
aliases:
- /ja/security_platform/application_security/troubleshooting
further_reading:
- link: /security/application_security/
  tag: ドキュメント
  text: Datadog App and API Protection での脅威の監視
- link: /security/application_security/how-it-works/
  tag: ドキュメント
  text: How App and API Protection Works in Datadog
title: App and API Protection のトラブルシューティング
---
## 概要 {#overview}

Datadog App and API Protection (AAP) で予期しない動作が発生した場合は、次のような一般的な問題を調査できます。引き続き問題が解決しない場合は、[Datadog サポート][1]へお問い合わせください。

## AAP のレート制限 {#aap-rate-limits}

AAP トレースは、1 秒あたり 100 トレースにレート制限されます。制限を超えて送信されたトレースはレポートされません。制限を変更する必要がある場合は、[Datadog サポート][1]までお問い合わせください。

## AAP によるセキュリティトレースが検出されない {#no-security-traces-detected-by-aap}

脅威情報が AAP の [Trace and Signals Explorer][2] に表示されるには、一連のステップが正常に実行される必要があります。この問題を調査する際には、各ステップを確認することが重要です。特定の言語に関する追加のトラブルシューティング手順は、末尾の言語タブに記載されています。

### AAP が有効になっていることを確認する {#confirm-aap-is-enabled}

メトリクス `datadog.apm.appsec_host` を使用して、AAP が実行されているかどうかを確認できます。

1. Datadog の **Metrics > Summary** に移動します。
2. メトリクス `datadog.apm.appsec_host` を検索します。メトリクスが存在しない場合は、AAP を実行しているサービスはありません。メトリクスが存在する場合、サービスはメトリクスタグ `host` および `service` とともに報告されます。
3. メトリクスを選択し、**Tags** セクションで `service` を検索して、どのサービスが AAP を実行しているかを確認します。

`datadog.apm.appsec_host` が表示されない場合は、[アプリ内の説明][3]を確認して、初期設定の手順がすべて完了していることを確認してください。

AAP データは APM トレースと一緒に送信されます。[APM のトラブルシューティング][4]を参照して、[APM 設定の確認][5]を行い、[接続エラー][6]が発生していないか確認します。

### アプリケーションへのテスト攻撃の送信 {#send-a-test-attack-to-your-application}

 AAP の設定をテストするには、次の curl スクリプトを含むファイルを実行して、[Security Scanner Detected][7] ルールをトリガーします。

{{< programming-lang-wrapper langs="java,.NET,go,ruby,PHP,Node.js,python" >}}
{{< programming-lang lang="java" >}}

```bash
for ((i=1;i<=250;i++));
do
# Target existing service's routes
curl https://your-application-url/existing-route -A dd-test-scanner-log;
# Target non existing service's routes
curl https://your-application-url/non-existing-route -A dd-test-scanner-log;
done
```

**注:**`dd-test-scanner-log` 値は最新のリリースでサポートされています。

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

```bash
for ((i=1;i<=250;i++));
do
# Target existing service's routes
curl https://your-application-url/existing-route -A dd-test-scanner-log;
# Target non existing service's routes
curl https://your-application-url/non-existing-route -A dd-test-scanner-log;
done
```

**注:**`dd-test-scanner-log` 値は最新のリリースでサポートされています。

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

 ```bash
 for ((i=1;i<=250;i++));
do
# Target existing service's routes 
curl https://your-application-url/existing-route -A Arachni/v1.0;
# Target non existing service's routes 
curl https://your-application-url/non-existing-route -A Arachni/v1.0;
done

```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

 ```bash
 for ((i=1;i<=250;i++));
do
# Target existing service's routes
curl https://your-application-url/existing-route -A Arachni/v1.0;
# Target non existing service's routes
curl https://your-application-url/non-existing-route -A Arachni/v1.0;
done
```

{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

```bash
for ((i=1;i<=250;i++));
do
# Target existing service's routes
curl https://your-application-url/existing-route -A dd-test-scanner-log;
# Target non existing service's routes
curl https://your-application-url/non-existing-route -A dd-test-scanner-log;
done
```

**注:**`dd-test-scanner-log` 値は最新のリリースでサポートされています。

{{< /programming-lang >}}
{{< programming-lang lang="Node.js" >}}

```bash
for ((i=1;i<=250;i++));
do
# Target existing service's routes
curl https://your-application-url/existing-route -A dd-test-scanner-log;
# Target non existing service's routes
curl https://your-application-url/non-existing-route -A dd-test-scanner-log;
done
```
**注:**`dd-test-scanner-log` 値は最新のリリースでサポートされています。

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

```bash
for ((i=1;i<=250;i++));
do
# Target existing service's routes
curl https://your-application-url/existing-route -A dd-test-scanner-log;
# Target non existing service's routes
curl https://your-application-url/non-existing-route -A dd-test-scanner-log;
done
```

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

アプリケーションを有効にして実行し、成功すると、数分後に[トレースとシグナルエクスプローラー][2]に脅威情報が表示されます。

{{< img src="/security/security_monitoring/explorer/signal_panel_v2.png" alt="脅威に関連するタグ、メトリクス、推奨される次のステップ、攻撃者の IP アドレスを表示する Security シグナルの詳細ページ。" style="width:100%;" >}}

### 必要なトレーサーインテグレーションが無効になっていないか確認する {#check-if-required-tracer-integrations-are-deactivated}

AAP は特定のトレーサーインテグレーションに依存しています。無効になっている場合、AAP は機能しません。無効になっているインテグレーションがあるかどうかを確認するには、[スタートアップログ][8]で `disabled_integrations` を探します。

必要なインテグレーションは言語によって異なります。

{{< programming-lang-wrapper langs="java,.NET,go,ruby,PHP,Node.js,python" >}}
{{< programming-lang lang="java" >}}

Java の場合、以下のいずれかの技術を使用している場合は、それぞれのインテグレーションが必要です。

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


{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

.NET の場合、ASP.NET とのインテグレーションが必要です。

**注:** ASP.NET Core が無効になっている場合でも、AAP はこのフレームワークで動作します。


{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

PHP については、必須のインテグレーションはありません。
<p></p>


{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

以下の Go フレームワークは、すぐに使える APM インテグレーションを使用してインスツルメントする必要があります。

{{% tracing-go-v2 %}}

- [gRPC][8] ([v1][2])
- [net/http][9] ([v1][3])
- [Gorilla Mux][10] ([v1][4])
- [Echo][11] ([v1][5])
- [Chi][12] ([v1][6])

Go Tracer のバージョン (v1.x または v2.x) に適切なドキュメントを参照します。お使いのフレームワークがサポートされていない場合は、Go リポジトリで [新しい問題を作成][7] してください。

[2]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc#example-package-Server
[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http#example-package
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux#example-package
[5]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo.v4#example-package
[6]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi.v5#example-package
[7]: https://github.com/DataDog/dd-trace-go/issues/new?title=Missing%20appsec%20framework%20support
[8]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/google.golang.org/grpc/v2
[9]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/net/http/v2
[10]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/gorilla/mux/v2
[11]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/labstack/echo.v4/v2
[12]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/go-chi/chi.v5/v2
[13]: /ja/tracing/trace_collection/custom_instrumentation/go/migration

{{< /programming-lang >}}
{{< programming-lang lang="Node.js" >}}

Node.js の場合、HTTP とのインテグレーションが必要です。
<p></p>


{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Ruby の場合、[Rack][2] インテグレーションが必要です。Ruby トレーサーバージョン `1.0.0` 以上も必要です。[0.x から 1.x への移行][3]に関する情報を参照してください。

**注:** Rack は手動で追加することも、[Rails][4] または [Sinatra][5] インテグレーションを使用して自動的に追加することもできます。手動で追加する場合、トレーサーミドルウェアは Rack スタック内のセキュリティミドルウェアより前に配置する必要があります。

[2]: /ja/tracing/trace_collection/dd_libraries/ruby/#rack
[3]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/UpgradeGuide.md#from-0x-to-10
[4]: /ja/tracing/trace_collection/dd_libraries/ruby/#rails
[5]: /ja/tracing/trace_collection/dd_libraries/ruby/#sinatra
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

Python の場合、WSGI インテグレーションに加えて、
Django や Flask などのフレームワーク用インテグレーションが必要です。
<p></p>

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Datadog Agent の構成を確認する {#check-datadog-agent-configuration}

 この手順のトラブルシューティングを行うには、次のようにします。

- 通常は `http://localhost:8126/info` である次のアドレス `http://<agent-machine-name>:<agent-port>/info` で、実行中の Agent の詳細を確認します。
- [トレーサーログ][10]にスパンに関連する Agent 送信エラーがないことを確認します。
-  Agent が別のマシンにインストールされている場合は、`DD_AGENT_HOST` および (オプションで) `DD_TRACE_AGENT_PORT` が設定されていること、あるいはアプリケーション SDK に対して `DD_TRACE_AGENT_URL` が設定されていることを確認します。

### スパンが Datadog に正常に送信されたかどうかを確認する{#check-if-spans-are-successfully-transmitted-to-datadog}

AAP のデータは[スパン][9]を介して送信されます。スパンが Datadog に正常に送信されていることを確認するには、トレーサーログに次のようなログが含まれていることを確認します。

```
2021-11-29 21:19:58 CET | TRACE | INFO | (pkg/trace/info/stats.go:111 in LogStats) | [lang:.NET lang_version:5.0.10 interpreter:.NET tracer_version:1.30.1.0 endpoint_version:v0.4] -> traces received: 2, traces filtered: 0, traces amount: 1230 bytes, events extracted: 0, events sampled: 0
```

スパンが送信されていない場合、トレーサーログにはこのようなログが含まれます。

```
2021-11-29 21:18:48 CET | TRACE | INFO | (pkg/trace/info/stats.go:104 in LogStats) | No data received
```

## 言語別トラブルシューティング {#troubleshooting-by-language}

以下は、特定の言語に対するトラブルシューティングの追加手順です。

{{< programming-lang-wrapper langs="java,.NET,go,ruby,PHP,Node.js,python" >}}
{{< programming-lang lang="java" >}}
Java ライブラリは、ログ記録に [SLF4J][1] を使用します。SDK がファイルにログを記録するように、次のランタイムフラグを追加します。

```java
 -Ddatadog.slf4j.simpleLogger.defaultLogLevel=info
 -Ddatadog.slf4j.simpleLogger.logFile=dd.log
```

サービスが開始された後、SDK は指定されたファイルにログを記録します。`DEBUG` ログは詳細すぎるため、Datadog ではログレベルに `INFO` を使用することを推奨します。

[1]: https://www.slf4j.org/
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

.NET ライブラリはファイルにログを記録しますが、`stdout`/`stderr` に記録することはできません。デフォルトのログレベルは `INFO` です。`DEBUG` ログを有効にするには、`DD_TRACE_DEBUG=true` を設定します。

ログファイルは、以下のディレクトリにあります。

| プラットフォーム 	 | ログディレクトリ 	|
|------------|----------------|
| Docker 	   | コンテナのディレクトリ `/var/log/datadog/dotnet/`。推奨されるオプションは、[volumes][1] を使用してホストマシン上のログフォルダーをマウントすることです。|
| Linux	     | /var/log/datadog/dotnet/	                                  |
| Windows 	 | C:\ProgramData\Datadog .NET Tracer\logs                    |

[1]: https://docs.docker.com/storage/volumes/
{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

PHP の場合、Datadog AAP 拡張機能のトラブルシューティングを開始するには、AAP 拡張機能の `.ini` ファイルでデバッグログを有効にします。

拡張機能の `ini` ファイルは通常 `/etc/php/<version>/xxx/conf.d/98-ddtrace.ini` にありますが、インストール環境によって場所が異なる場合があります。`phpinfo()` 出力の冒頭を確認し、`.ini` ファイルがスキャンされるディレクトリ (存在する場合) を特定します。`.ini` ファイルで、次の構成オプションを次のように設定します。

```php
datadog.appsec.log_level='debug'
datadog.appsec.helper_extra_args='--log_level=debug'
datadog.appsec.helper_log_file='/tmp/helper.log'
```

拡張機能はデフォルトの `php_error` ログファイルにログを出力します。ファイルにログがない場合は、`.ini` ファイルに次を追加します。

```php
datadog.appsec.log_file='tmp/extension.log'
```

### インストールで PHP が見つからない {#installation-fails-to-find-php}
インストールスクリプトが正しい PHP のバージョンを見つけられない場合、`--php-bin` オプションを使用して PHP のバイナリの場所を設定することができます。例:

```
$ php datadog-setup.php --php-bin /usr/bin/php7.4 --enable-appsec
```
### ヘルパーへの接続に失敗{#connection-to-helper-failed}
AAP 拡張機能がヘルパープロセスと通信できない場合、次の警告が発生します。

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

これは、拡張機能が使用するロックファイルまたはソケットファイルの権限が無効であるか、PHP プロセスを実行しているユーザーが `tmp` ディレクトリへの書き込み権限を持っていないことを示します。

ロックファイルまたはソケットファイルの権限が無効な場合は、それらを削除して Apache/FPM を再起動するか、`user:group` を Apache/FPM が使用するもの (例: `www-data`) に一致するように調整します。

tmp ディレクトリへの書き込み権限がない場合は、拡張機能の `.ini` ファイルで次の設定を変更して、ロックファイルとソケットファイルの場所を変更します。

```
datadog.appsec.helper_runtime_path = /<directory with compatible permissions>/
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

#### 実行中のアプリケーションで AAP が有効になっていることを確認する {#confirm-aap-is-enabled-in-the-running-application}

[トレーサーのスタートアップログ][1]には、SDK の構成と、AAP が有効かどうかが示されます。`appsec` が `true` の場合、AAP は有効になり実行中です。

たとえば、次のスタートアップログは AAP が無効になっていることを示しています。

```
2022/02/17 14:49:00 Datadog Tracer v1.36.0 INFO: DATADOG TRACER CONFIGURATION {"date":"2022-02-17T14:49:00+01:00","os_name":"Linux (Unknown Distribution)","os_version":"5.13.0","version":"v1.36.0","lang":"Go","lang_version":"go1.17.1","env":"prod","service":"grpcserver","agent_url":"http://localhost:8126/v0.4/traces","debug":false,"analytics_enabled":false,"sample_rate":"NaN","sampling_rules":null,"sampling_rules_error":"","service_mappings":null,"tags":{"runtime-id":"69d99219-b68f-4718-9419-fa173a79351e"},"runtime_metrics_enabled":false,"health_metrics_enabled":false,"profiler_code_hotspots_enabled":false,"profiler_endpoints_enabled":false,"dd_version":"","architecture":"amd64","global_service":"","lambda_mode":"false","appsec":false,"agent_features":{"DropP0s":false,"Stats":false,"StatsdPort":0}}
```

#### デバッグログを有効にする {#enable-debug-logs}

環境変数 `DD_TRACE_DEBUG=1` でデバッグログを有効にします。AAP ライブラリは、標準エラー出力にログを記録します。

**注:** AAP は、有効になっている場合にのみログを出力します。環境変数 `DD_APPSEC_ENABLED=1` を使用して AAP を有効にします。

[1]: /ja/tracing/troubleshooting/tracer_startup_logs/
{{< /programming-lang >}}
{{< programming-lang lang="Node.js" >}}

Node.js ライブラリを 1.x から 2.x にアップグレードした場合、この[移行ガイド][1]を使用して、破壊的な変更を評価することができます。

Node.js アプリケーションの [Trace and Signals Explorer][2] に AAP の脅威情報が表示されない場合は、次の手順に従ってトラブルシューティングを行います。

1. [スタートアップログ][3]で `appsec_enabled` が `true` であることを確認し、最新バージョンの AAP が実行されていることを確認します。
   1. リクエストの送信後にスタートアップログが表示されない場合は、環境変数 `DD_TRACE_STARTUP_LOGS=true` を追加してスタートアップログを有効にします。起動ログで `appsec_enabled` が `true` であることを確認します。
   1.  `appsec_enabled` が `false` の場合、AAP は正しく有効化されていません。[インストール手順][4]を参照してください。
   1. 起動ログに `appsec_enabled` が存在しない場合は、最新の AAP バージョンをインストールする必要があります。[インストール手順][4]を参照してください。
2. APM ダッシュボードで関連するトレースを確認し、SDK が機能していることを確認します。<br />
    AAP は SDK に依存しているため、トレースが表示されない場合は SDK が機能していない可能性があります。[APM トラブルシューティング][5]を参照してください。
3. アプリケーションディレクトリでコマンド `npm explore @datadog/native-appsec -- npm run install` を実行し、アプリを再起動します。
   1. `@datadog/native-appsec` が見つからない場合は、インストールが正しく行われていません。
   1. アプリケーションの起動時に `@datadog/native-appsec` が見つかった場合は、そのコマンドをランタイム起動スクリプトに追加します。
   1. それでも SDK が機能しない場合は、サポートされていないランタイムを実行している可能性があります。
4. ログを有効にするには、次の環境変数を追加します。
    ```
    DD_TRACE_DEBUG=1
    DD_TRACE_LOG_LEVEL=info
    ```

[1]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md
[2]: https://app.datadoghq.com/security/appsec/
[3]: /ja/tracing/troubleshooting/tracer_startup_logs/
[4]: /ja/security/application_security/setup/nodejs/
[5]: /ja/tracing/troubleshooting/
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Python アプリケーションの [Trace and Signals Explorer][1] に AAP の脅威情報が表示されない場合は、AAP が実行されており、トレーサーが正しく機能していることを確認します。

1.  アプリケーションのログレベルを `DEBUG` に設定して、AAP が実行されていることを確認します。

   ```python
   import logging
   logging.basicConfig(level=logging.DEBUG)
   ```
  
   次に、アプリケーションに対して任意の HTTP 呼び出しを実行します。次のログが表示されるはずです。
  
   ```
   DEBUG:ddtrace.appsec.processor:[DDAS-001-00] Executing AppSec In-App WAF with parameters:
   ```
  
   このログが存在しない場合、AAP は実行されていません。

2. SDK は機能していますか?APM ダッシュボードに関連するトレースが表示されますか?

   AAP は SDK に依存します。トレースが表示されない場合、SDK が機能していない可能性があります。[APM トラブルシューティング][2]を参照してください。


[1]: https://app.datadoghq.com/security/appsec/
[2]: /ja/tracing/troubleshooting/
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Ruby の場合、数分経過しても [Trace and Signals Explorer][1] に AAP の脅威情報が表示されない場合は、[デバッグログ][2]のトレーサー診断を有効にします。例:

```ruby
Datadog.configure do |c|
  c.diagnostics.debug = true  # increase general log level to debug
  c.appsec.waf_debug = true   # also enable WAF-specific log verbosity to highest level
end
```

デバッグログは詳細に出力されますが、役立ちます。[Datadog サポート][1]にチケットを起票する場合は、リクエストにそのログを添付して送信します。

#### AAP は正しく有効になっていますか?{#is-aap-correctly-enabled}

次のようなログが表示されている場合、AAP は正しく有効化されています。

```
D, [2021-12-14T11:03:32.167125 #73127] DEBUG -- ddtrace: [ddtrace] (libddwaf/lib/datadog/appsec/waf.rb:296:in `block in logger=') {:level=>:ddwaf_log_info, :func=> "ddwaf_set_log_cb", :file=>"PowerWAFInterface.cpp", :message=>"Sending log messages to binding, min level trace"}
D, [2021-12-14T11:03:32.200491 #73127] DEBUG -- ddtrace: [ddtrace] (libddwaf/lib/datadog/appsec/waf.rb:296:in `block in logger=') {:level=>:ddwaf_log_debug, :func= >"parse", :file=>"parser_v2.cpp", :message=>"Loaded 124 rules out of 124 available in the ruleset"}
```

これらのログが表示されない場合は、以下を確認してください。

- アプリケーションプロセスに正しい AAP 環境変数が設定されているかどうか。
- 最新バージョンの gem がインストールされているかどうか。
- SDK が正しく構成されており、APM トレースを APM ダッシュボードに送信しているかどうか。

#### AAP は、HTTP リクエストごとに呼び出されるか?{#is-aap-called-for-each-http-request}

AAP が HTTP リクエストごとに呼び出されていることを確認するには、[テスト攻撃](#send-a-test-attack-to-your-application)をトリガーし、次のログを確認します。

```
D, [2022-01-19T21:25:50.579745 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/reactive/operation.rb:14:in `initialize') operation: rack.request initialize
D, [2022-01-19T21:25:50.580300 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/contrib/rack/gateway/watcher.rb:25:in `block (2 levels) in watch') root span: 964736568335365930
D, [2022-01-19T21:25:50.580371 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/contrib/rack/gateway/watcher.rb:26:in `block (2 levels) in watch') active span: 964736568335365930
D, [2022-01-19T21:25:50.581061 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/contrib/rack/reactive/request.rb:34:in `block in subscribe') reacted to ["request.headers", "request.uri.raw", "request.query", "request.cookies", "request.body.raw"]: [{"version"=>"HTTP/1.1", "host"=>"127.0.0.1:9292", "accept"=>"*/*", "user-agent"=>"Nessus SOAP"}, "http://127.0.0.1:9292/", [], {}, ""]
```

これらのログが表示されない場合は、以下をお試しください。

- 別の上流セキュリティシステムが、テストヘッダー値に基づいてリクエストをフィルタリングしていないことを確認します。これは、リクエストがアプリケーションに到達するのを阻止します。
- curl コマンドで別の User-Agent 値を使用して別の[テスト攻撃](#send-a-test-attack-to-your-application)を送信し、脅威情報が正常に送信されるかどうかを確認します。
- アプリケーションのログから、実行したリクエストがアプリケーションに到達し、他の上流システムから応答がなかったことを確認します。

Rack インテグレーションを手動で構成した場合、既知の問題により AAP が機能しないことがあります。例:

```ruby
Datadog.configure do |c|
  c.tracing.instrument :rails
  ...
  c.tracing.instrument :rack, web_service_name: "something", request_queuing: true
```

`c.tracing.instrument :rack` が存在する場合は、それを削除してチェックが合格するかどうかを確認します。

#### AAP は HTTP リクエストのセキュリティ脅威を検出するか?{#is-aap-detecting-http-request-security-threats}

AAP がセキュリティ脅威を検出していることを確認するには、[テスト攻撃](#send-a-test-attack-to-your-application)をトリガーし、次のログを確認します。

```
D, [2021-12-14T22:39:53.268820 #106051] DEBUG -- ddtrace: [ddtrace] (ddtrace/lib/datadog/appsec/contrib/rack/reactive/request.rb:63:in `block in subscribe') WAF: #<struct Datadog::AppSec::WAF::Result action=:monitor, data=[{"rule"=>{"id"=>"ua0-600-10x", "name"=>"Nessus", "tags"=>{"type"=>"security_scanner", "category"=>"attack_attempt"}}, "rule_matches"=>[{"operator"=>"match_regex", "operator_value"=>"(?i)^Nessus(/|([ :]+SOAP))", "parameters"=>[{"address"=>"server.request.headers.no_cookies", "key_path"=>["user-agent"], "value"=>"Nessus SOAP", "highlight"=>["Nessus SOAP"]}]}]}], perf_data=nil, perf_total_runtime=20519>
```
これらのログが表示されない場合は、別の上流セキュリティシステムがリクエストをフィルタリングしたり、テストヘッダーの値に基づいてリクエストを変更していないことを確認してください。

#### SDK はセキュリティデータを含むトレースを送信するか?{#is-the-sdk-sending-traces-with-security-data}
AAP データは APM トレースと一緒に送信されます。AAP がセキュリティデータを正しく検出し、トレースに挿入していることを確認するには、[テスト攻撃](#send-a-test-attack-to-your-application)をトリガーし、次のトレーサーログを確認します。

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

エージェントがトレースを転送するまで 1 分ほど待ち、APM ダッシュボードにトレースが表示されることを確認します。トレース内のセキュリティ情報が Datadog で処理され、AAP の [Trace and Signals Explorer][1] にセキュリティトレースとして表示されるまで、少し時間がかかる場合があります。

[1]: https://app.datadoghq.com/security/appsec/
[2]: /ja/tracing/troubleshooting/#tracer-debug-logs
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### トレーサーのバージョンが更新されていることを確認する {#confirm-tracer-versions-are-updated}

App and API Protection 製品のセットアップドキュメントを参照して、適切なバージョンの SDK を使用していることを確認します。ライブラリ情報を含むテレメトリデータの送信を開始するには、これらの最小バージョンが必要です。

### テレメトリーデータの通信を確保する{#ensure-the-communication-of-telemetry-data}

`DD_INSTRUMENTATION_TELEMETRY_ENABLED` 環境変数 (Node.js の場合は `DD_TRACE_TELEMETRY_ENABLED`) が `true` に設定されているか、使用言語に対応するシステムプロパティが有効になっていることを確認してください。たとえば、Java の場合は以下のようになります: `-Ddd.instrumentation.telemetry.enabled=true`

## AAP の無効化{#disabling-aap}

AAP を無効にするには、次のいずれかの方法を使用します。

`DD_APPSEC_ENABLED=true` 環境変数を使用して AAP を有効にした場合は、以下の DD_APPSEC_ENABLED セクションを使用します。
[Remote Configuration][16] を使用して AAP を有効にした場合は、以下の Remote Configuration の方法を使用します。

### DD_APPSEC_ENABLED {#dd-appsec-enabled}

サービスに対して `DD_APPSEC_ENABLED=true` 環境変数が設定されている場合は、アプリケーション構成から `DD_APPSEC_ENABLED=true` 環境変数を削除し、サービスを再起動します。

サービスが PHP サービスの場合は、環境変数を明示的に `DD_APPSEC_ENABLED=false` に設定し、該当する場合は `php.ini` 構成ファイルから `datadog.appsec.enabled = On` フラグをコメントアウトします。その後、サービスを再起動します。

### Remote Configuration {#remote-configuration}

[Remote Configuration][16] を使用して AAP が有効化された場合は、次の手順を実行します。
  1. [{{< ui >}}Services{{< /ui >}}][15] に移動します。
  2. {{< ui >}}App & API Protection in Monitoring Mode{{< /ui >}} を選択します。
  3. {{< ui >}}App & API Protection{{< /ui >}} ファセットで、{{< ui >}}Monitoring Only{{< /ui >}}、{{< ui >}}No data{{< /ui >}}、{{< ui >}}Ready to block{{< /ui >}} を有効にします。
  4. サービスをクリックします。
  5. サービス詳細の {{< ui >}}App & API Protection{{< /ui >}} で、{{< ui >}}Deactivate{{< /ui >}} をクリックします。

<div class="alert alert-info"><a href="https://app.datadoghq.com/organization-settings/remote-config"> Remote Configuration</a> を使用して AAP を有効にした場合は、<strong> Deactivate</strong> ボタンを使用できます。ローカル構成を使用して AAP を有効にした場合、<strong>Deactivate</strong> ボタンは使用できません。</div>

### {#bulk-disable} の一括無効化

サービスで AAP を一括無効化するには、次の手順を実行します。
  1. [{{< ui >}}Services{{< /ui >}}][15] に移動します。
  3. {{< ui >}}App & API Protection{{< /ui >}} ファセットで、{{< ui >}}Monitoring Only{{< /ui >}}、{{< ui >}}No data{{< /ui >}}、{{< ui >}}Ready to block{{< /ui >}} を有効にします。
  3. 脅威検出を無効にするサービスのチェックボックスを選択します。
  4. {{< ui >}}Bulk Actions{{< /ui >}} で、{{< ui >}}Deactivate Threat detection on (number of) services{{< /ui >}} を選択します。

  
## さらにサポートが必要ですか。{#need-more-help}

AAP で問題が解決しない場合は、以下の情報を添えて [Datadog サポート][1]にご連絡ください。

- [テスト攻撃](#send-a-test-attack-to-your-application)が正常に送信されたことの確認
- トレーサーの[スタートアップ][8]または[デバッグ][10]ログ

## 参考資料 {#further-reading}

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
[12]: https://app.datadoghq.com/security/appsec/vm
[13]: /ja/security/code_security/iast/
[14]: /ja/security/code_security/software_composition_analysis
[15]: https://app.datadoghq.com/security/configuration/asm/services-config
[16]: https://app.datadoghq.com/organization-settings/remote-config
[17]: https://ddtrace.readthedocs.io/en/stable/integrations.html#flask