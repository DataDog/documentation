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
title: PHP App and API Protection のトラブルシューティング
---
## 概要{#overview}

本書では、Datadog App and API Protection に関する一般的な問題や予期しない動作についての診断情報を提供します。引き続き問題が解決しない場合は、[Datadog サポート][1]へお問い合わせください。

## AAP のレート制限 {#aap-rate-limits}

AAP トレースは、1 秒あたり 100 トレースにレート制限されます。制限を超えて送信されたトレースはレポートされません。制限を変更する必要がある場合は、[Datadog サポート][1]までお問い合わせください。

## AAP によるセキュリティトレースが検出されない {#no-security-traces-detected-by-aap}

脅威情報が AAP の [Trace and Signals Explorer][2] に表示されるには、一連のステップが正常に実行される必要があります。この問題を調査する際には、各ステップを確認することが重要です。

### AAP が有効になっていることを確認する {#confirm-aap-is-enabled}

メトリクス `datadog.apm.appsec_host` を使用して、AAP が実行されているかどうかを確認できます。

1. Datadog の **Metrics > Summary** に移動します。
2. メトリクス `datadog.apm.appsec_host` を検索します。メトリクスが存在しない場合は、AAP を実行しているサービスはありません。メトリクスが存在する場合、サービスはメトリクスタグ `host` および `service` とともに報告されます。
3. メトリクスを選択し、**Tags** セクションで `service` を検索して、どのサービスが AAP を実行しているかを確認します。

`datadog.apm.appsec_host` が表示されない場合は、[アプリ内の説明][3]を確認して、初期設定の手順がすべて完了していることを確認してください。

AAP データは APM トレースと一緒に送信されます。[APM のトラブルシューティング][4]を参照して、[APM 設定の確認][5]を行い、[接続エラー][6]が発生していないか確認します。

### アプリケーションへのテスト攻撃の送信 {#send-a-test-attack-to-your-application}

 AAP の設定をテストするには、次の curl スクリプトを含むファイルを実行して、[Security Scanner Detected][7] ルールをトリガーします。

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

アプリケーションを有効にして、正常に実行すると、数分後に[トレースとシグナルエクスプローラー][2]に脅威情報が表示されます。

{{< img src="/security/security_monitoring/explorer/signal_panel_v2.png" alt="脅威に関連するタグ、メトリクス、推奨される次のステップ、攻撃者の IP アドレスを表示する Security シグナルの詳細ページ。" style="width:100%;" >}}

### 必要なトレーサーインテグレーションが無効になっていないか確認する {#check-if-required-tracer-integrations-are-deactivated}

AAP は特定のトレーサーインテグレーションに依存しています。無効になっている場合、AAP は機能しません。無効になっているインテグレーションがあるかどうかを確認するには、[スタートアップログ][8]で `disabled_integrations` を探します。

必要なインテグレーションは言語によって異なります。

PHP については、必須のインテグレーションはありません。

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

以下は、PHP に対するトラブルシューティングの追加手順です。

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

### トレーサーのバージョンが更新されていることを確認する {#confirm-tracer-versions-are-updated}

App and API Protection のセットアップドキュメントを参照して、正しいトレーサーバージョンを使用していることを確認してください。ライブラリ情報を含むテレメトリデータの送信を開始するには、これらの最小バージョンが必要です。

### テレメトリーデータの通信を確保する{#ensure-the-communication-of-telemetry-data}

`DD_INSTRUMENTATION_TELEMETRY_ENABLED` 環境変数 (Node.js の場合は `DD_TRACE_TELEMETRY_ENABLED`) が `true` に設定されているか、使用言語に対応するシステムプロパティが有効になっていることを確認してください。たとえば、Java の場合は以下のようになります: `-Ddd.instrumentation.telemetry.enabled=true`

## AAP の無効化{#disabling-aap}

AAP を無効にするには、次のいずれかの方法を使用します。

### DD_APPSEC_ENABLED {#dd-appsec-enabled}

サービスに対して `DD_APPSEC_ENABLED=true` 環境変数が設定されている場合は、アプリケーション構成から `DD_APPSEC_ENABLED=true` 環境変数を削除し、サービスを再起動します。

サービスが PHP サービスの場合は、環境変数を明示的に `DD_APPSEC_ENABLED=false` に設定し、該当する場合は `php.ini` 構成ファイルから `datadog.appsec.enabled = On` フラグをコメントアウトします。その後、サービスを再起動します。

### Remote Configuration {#remote-configuration}

[Remote Configuration][16] を使用して AAP が有効化された場合は、次の手順を実行します。
  1. [{{< ui >}}Services{{< /ui >}}][15] に移動します。
  2. {{< ui >}}App & API Protection in Monitoring Mode{{< /ui >}} を選択します。
  3. {{< ui >}}App & API Protection{{< /ui >}} ファセットで、{{< ui >}}Monitoring Only{{< /ui >}}、{{< ui >}}No data{{< /ui >}}、{{< ui >}}Ready to block{{< /ui >}} を有効にします。
  4. サービスをクリックします。
  5. [{{< ui >}}Capabilities{{< /ui >}}] > [{{< ui >}}App & API Protection{{< /ui >}}] > [{{< ui >}}Threat Detection{{< /ui >}}] で、[{{< ui >}}Deactivate{{< /ui >}}] をクリックします。

<div class="alert alert-info"><a href="https://app.datadoghq.com/organization-settings/remote-config">Remote Configuration</a> を使用して AAP を有効にした場合は、[<strong>Deactivate</strong>] ボタンを使用できます。ローカル構成を使用して AAP を有効にした場合、[<strong>Deactivate</strong>] ボタンは使用できません。</div>

### {#bulk-disable} の一括無効化

サービスで AAP を一括無効化するには、次の手順を実行します。
  1. [{{< ui >}}Services{{< /ui >}}][15] に移動します。
  2. {{< ui >}}App & API Protection{{< /ui >}} ファセットで、[{{< ui >}}Monitoring Only{{< /ui >}}]、[{{< ui >}}No data{{< /ui >}}]、および [{{< ui >}}Ready to block{{< /ui >}}] を有効にします。
  3. 脅威検出を無効にしたいサービスのチェックボックスを選択します。
  4. [{{< ui >}}Bulk Actions{{< /ui >}}] で、[{{< ui >}}Deactivate threat detection on (number of) services{{< /ui >}}] を選択します。



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