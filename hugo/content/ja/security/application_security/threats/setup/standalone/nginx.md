---
aliases:
- /ja/security_platform/application_security/getting_started/nginx
- /ja/security/application_security/getting_started/nginx
- /ja/security/application_security/enabling/tracing_libraries/threat_detection/nginx/
code_lang: nginx
code_lang_weight: 50
further_reading:
- link: https://github.com/DataDog/nginx-datadog/
  tag: ソース コード
  text: nginx integration's source code
- link: /security/default_rules/?category=cat-application-security
  tag: ドキュメント
  text: すぐに使えるアプリケーション & API 保護ルール
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: App & API Protection のトラブルシューティング
title: Nginx でアプリケーション & API 保護を有効にする
type: multi-code-lang
---

Datadog の nginx トレーシング モジュールは、脅威の検知とブロックを実験的にサポートしています。

## Application & API Protection の有効化
### はじめに

1. nginx のビルドが
   `--with-threads` フラグ付きでコンパイルされていることを確認してください。多くのディストリビューションでは、このフラグは既定で有効になっています。
   nginx のインストールがスレッド対応でビルドされているか確認するには、コマンド `nginx
   -V` を実行し、出力の `configure arguments` 行を確認します。出力に
   `--with-threads` が見当たらない場合は、このフラグを有効にして nginx を再ビルドする必要があります。
   ソースから nginx をビルドする方法の詳細は、
   [nginx ドキュメント][3] を参照してください。

2. 少なくともバージョン 1.2.0 以上に **nginx トレーシング ライブラリ モジュールを更新** してください。
   [GitHub リリース ページ][2] を開き、
   "ngx_http_datadog_module-appsec-&lt;amd64/arm64&gt;-&lt;nginx
   version&gt;.so.tgz" という命名パターンのアーティファクトを選択します。このアーティファクト名には "appsec" が含まれます。

3. **nginx 設定で Application & API Protection を有効化** してください。
   次の対応が必要です:
   * [`thread_pool`][4] ディレクティブで、1 つ以上のスレッド プールを定義する
   * [`datadog_appsec_enabled`][5] で、Application & API Protection を明示的に有効化する
   * [`datadog_waf_thread_pool_name`][6] ディレクティブで、
     リクエストを定義したスレッド プールに割り当てる

   例:

   ```nginx
   load_module /path/to/ngx_http_datadog_module.so;
   thread_pool waf_thread_pool threads=4 max_queue=128;
   http {
     datadog_appsec_enabled on;
     datadog_waf_thread_pool_name waf_thread_pool;
   }
   ```

   詳細は [リファレンス ドキュメント][3] を参照してください。

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Signals Explorer と詳細、Vulnerabilities Explorer と詳細を示す動画。" video="true" >}}

## 制限

バージョン 1.3.0 時点では、利用できる機能に次の重要な制約があります:

* リクエスト本文は、コンテンツタイプに関係なく検査されません。

* ステータス コード、ヘッダー、ボディなど、レスポンスの特性に基づいて
  リクエストをブロックすることはできません。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/nginx-datadog/blob/master/doc/API.md
[2]: https://github.com/DataDog/nginx-datadog/releases
[3]: https://nginx.org/en/docs/configure.html
[4]: https://nginx.org/en/docs/ngx_core_module.html#thread_pool
[5]: https://github.com/DataDog/nginx-datadog/blob/master/doc/API.md#datadog_appsec_enabled-appsec-builds
[6]: https://github.com/DataDog/nginx-datadog/blob/master/doc/API.md#datadog_waf_thread_pool_name-appsec-builds