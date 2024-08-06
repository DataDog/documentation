---
aliases:
- /ja/logs/log_collection/syslog_ng
categories:
- ログの収集
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/syslog_ng.md
description: Syslog-ng を構成して、ホスト、コンテナ、サービスからログを収集
doc_link: /integrations/syslog_ng/
has_logo: true
integration_id: syslog_ng
integration_title: syslog_ng
is_public: true
custom_kind: integration
name: syslog_ng
public_title: Datadog-Syslog-ng インテグレーション
short_description: Syslog-ng を構成して、ホスト、コンテナ、サービスからログを収集
supported_os:
- linux
- windows
title: Syslog-ng
---

## 概要

Syslog-ng を構成して、ホスト、コンテナ、サービスからログを収集

{{< site-region region="us3,ap1" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では <code>syslog-ng</code> のログ収集は利用できません。</div>
{{< /site-region >}}

## セットアップ

### ログの収集

1. `/etc/syslog-ng/syslog-ng.conf` 内のシステムログとログファイルを収集し、ソースが正しく定義されていることを確認してください。

    ```conf
    source s_src {
    system();
    internal();

    };
    ```

    ファイルを監視する場合は、次のソースを追加します。

    ```conf
    #########################
    # Sources
    #########################

    ...

    source s_files {
    file("path/to/your/file1.log",flags(no-parse),follow_freq(1),program_override("<program_name_file1>"));
    file("path/to/your/file2.log",flags(no-parse),follow_freq(1),program_override("<program_name_file2>"));

    };
    ```

2. 正しいログ形式を設定します。

    ```conf
    #########################
    # Destination
    #########################

    ...

    # For Datadog platform:
    destination d_datadog {
      http(
          url("https://http-intake.logs.{{< region-param key="dd_site" code="true" >}}/api/v2/logs?ddsource=<SOURCE>&ddtags=<TAG_1:VALUE_1,TAG_2:VALUE_2>")
          method("POST")
          headers("Content-Type: application/json", "Accept: application/json", "DD-API-KEY: <DATADOG_API_KEY>")
          body("<${PRI}>1 ${ISODATE} ${HOST:--} ${PROGRAM:--} ${PID:--} ${MSGID:--} ${SDATA:--} $MSG\n")
      );
    };
    ```

3. path セクションで出力を定義します。

    ```conf
    #########################
    # Log Path
    #########################

    ...

    log { source(s_src); source(s_files); destination(d_datadog); };
    ```

4. syslog-ng を再起動します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][2]までお問合せください。

[1]: https://syslog-ng.com/documents/html/syslog-ng-ose-latest-guides/en/syslog-ng-ose-guide-admin/html/tlsoptions.html
[2]: /ja/help/