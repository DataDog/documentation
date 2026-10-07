
## 前提条件

<div class="alert alert-info"><strong>1 クリック有効化</strong><br>
サービスが<a href="/agent/guide/how_rc_works/#enabling-remote-configuration">リモート構成を有効にした Agent とそれをサポートするトレーシングライブラリのバージョン</a>で実行されている場合、ASM Status 列の <strong>Not Enabled</strong> インジケーターにカーソルを合わせ、<strong>Enable ASM</strong> をクリックします。<code>DD_APPSEC_ENABLED=true</code> または <code>--enable-appsec</code> のフラグを使ってサービスを再起動する必要はありません。</div>

- [Datadog Agent][101] が、アプリケーションのオペレーティングシステムやコンテナ、クラウド、仮想環境にインストールされ構成されている。
- [Datadog APM][103] が、アプリケーションまたはサービスに構成され、Datadog によってトレースが受信されている。
- [リモート構成を有効にした Agent とそれをサポートするトレーシングライブラリのバージョン][104]でサービスを実行している場合は、Agent やトレーシングライブラリの追加構成なしに、Datadog UI から攻撃者をブロックすることができます。

[101]: https://app.datadoghq.com/account/settings#agent
[102]: https://app.datadoghq.com/services?lens=Security
[103]: /tracing/trace_collection/dd_libraries/
[104]: /agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration