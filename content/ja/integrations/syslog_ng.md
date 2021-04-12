---
title: Syslog-ng
name: syslog_ng
kind: インテグレーション
description: Syslog-ng を構成して、ホスト、コンテナ、サービスからログを収集
short_description: Syslog-ng を構成して、ホスト、コンテナ、サービスからログを収集
categories:
  - ログの収集
doc_link: /integrations/syslog_ng/
aliases:
  - /ja/logs/log_collection/syslog_ng
has_logo: true
integration_title: syslog_ng
is_public: true
public_title: Datadog-Syslog-ng インテグレーション
dependencies:
  - 'https://github.com/DataDog/documentation/blob/master/content/en/integrations/syslog_ng.md'
supported_os:
  - linux
  - windows
---
## 概要

Syslog-ng を構成して、ホスト、コンテナ、サービスからログを収集

## セットアップ

### ログの収集

{{< tabs >}}
{{% tab "Datadog US site" %}}

1. `/etc/syslog-ng/syslog-ng.conf` 内のシステムログとログファイルが収集されます。ソースが正しく定義されていることを確認してください。

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
    template DatadogFormat { template("YOURAPIKEY <${PRI}>1 ${ISODATE} ${HOST:--} ${PROGRAM:--} ${PID:--} ${MSGID:--} ${SDATA:--} $MSG\n"); };
    destination d_datadog { tcp("intake.logs.datadoghq.com" port(10514) template(DatadogFormat)); };
    ```

3. path セクションで出力を定義します。

    ```conf
    #########################
    # Log Path
    #########################

    ...

    log { source(s_src); source(s_files); destination(d_datadog); };
    ```

4. (オプション) TLS 暗号化:

    - CA 証明書をダウンロードします。

        ```shell
        sudo apt-get install ca-certificates
        ```

    - 出力先の定義を次のように変更します。

        ```conf
        destination d_datadog { tcp("intake.logs.datadoghq.com" port(10516)     tls(peer-verify(required-trusted)) template(DatadogFormat)); };
        ```

    TLS のパラメーターの詳細、および syslog-ng が使用可能かどうかは、[公式ドキュメント][1]を参照してください。

5. syslog-ng を再起動します。


[1]: https://syslog-ng.com/documents/html/syslog-ng-ose-latest-guides/en/syslog-ng-ose-guide-admin/html/tlsoptions.html
{{% /tab %}}
{{% tab "Datadog EU site" %}}

1. `/etc/syslog-ng/syslog-ng.conf` 内のシステムログとログファイルが収集されます。ソースが正しく定義されていることを確認してください。

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

    # For Datadog platform
    template DatadogFormat { template("YOURAPIKEY <${PRI}>1 ${ISODATE} ${HOST:--} ${PROGRAM:--} ${PID:--} ${MSGID:--} ${SDATA:--} $MSG\n"); };
    destination d_datadog { tcp("tcp-intake.logs.datadoghq.eu" port(1883) template(DatadogFormat)); };
    ```

3. path セクションで出力を定義します。

    ```conf
    #########################
    # Log Path
    #########################

    ...

    log { source(s_src); source(s_files); destination(d_datadog); };
    ```

4. (オプション) TLS 暗号化:

    - CA 証明書をダウンロードします。

        ```shell
        sudo apt-get install ca-certificates
        ```

    - 出力先の定義を次のように変更します。

        ```conf
        destination d_datadog { tcp("tcp-intake.logs.datadoghq.eu" port(443)     tls(peer-verify(required-trusted)) template(DatadogFormat)); };
        ```

    TLS のパラメーターの詳細、および syslog-ng が使用可能かどうかは、[公式ドキュメント][1]を参照してください。

5. syslog-ng を再起動します。


[1]: https://syslog-ng.com/documents/html/syslog-ng-ose-latest-guides/en/syslog-ng-ose-guide-admin/html/tlsoptions.html
{{% /tab %}}
{{< /tabs >}}

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][1]までお問合せください。

[1]: /ja/help/