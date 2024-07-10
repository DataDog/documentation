---
aliases:
- /ja/logs/log_collection/nxlog
categories:
- ログの収集
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/nxlog.md
description: NXLog を構成して、ホスト、コンテナ、サービスからログを収集
doc_link: /integrations/nxlog/
has_logo: true
integration_id: nxlog
integration_title: nxlog
is_public: true
custom_kind: integration
name: nxlog
public_title: Datadog-NXlog インテグレーション
short_description: NXLog を構成して、ホスト、コンテナ、サービスからログを収集
supported_os:
- windows
title: NXLog
---

## 概要

NXLog を構成して、ホスト、コンテナ、サービスからログを収集

## セットアップ

### ログの収集

{{< tabs >}}
{{% tab "Datadog US site" %}}

1. Configure NXLog を構成してログを Datadog プラットフォームに送信し、`C:\Program Files\nxlog\conf` のファイル全体を以下の内容に書き換えます。

    ```conf
    ## Set the ROOT to the folder your nxlog was installed into,
    ## otherwise it won't start.
    #To change for your own system if necessary
    define ROOT C:\Program Files\nxlog
    #define ROOT_STRING C:\Program Files\nxlog
    #define ROOT C:\Program Files (x86)\nxlog
    Moduledir %ROOT%\modules
    CacheDir %ROOT%\data
    Pidfile %ROOT%\data\nxlog.pid
    SpoolDir %ROOT%\data
    LogFile %ROOT%\data\nxlog.log
    ##Extension to format the message in JSON format
    <Extension json>
        Module xm_json
    </Extension>
    ##Extension to format the message in syslog format
    <Extension syslog>
    Module xm_syslog
    </Extension>
    ########## INPUTS ###########
    ##Input for windows event logs
    <Input syslogs>
        Module      im_msvistalog
    ##For windows 2003 and earlier use the following:
    #    Module      im_mseventlog
    </Input>
    ############ OUTPUTS ##############
    ##TCP output module
    <Output out>
        Module      om_tcp
        Host        intake.logs.datadoghq.com
        Port        10514
        Exec        to_syslog_ietf();
        Exec        $raw_event="<DATADOG_API_KEY> "+$raw_event;
    </Output>
    ############ ROUTES TO CHOOSE #####
    <Route 1>
        Path        syslogs => out
    </Route>
    ```

     上の `<DATADOG_API_KEY>` を忘れずに置き換えてください。

2. 監視するファイルごとに NXLog 監視モジュールを有効にし、出力セクションの前に以下を追加します。

    ```conf
    ##Module to watch a file
    <Input FILE_WATCH_1>
      Module im_file
      File "PATH\\TO\\YOUR\\FILE1"
      Exec   $SourceName = '<MY_APPLICATION_NAME>';
      SavePos TRUE

      ##include the message and add meta data
      Exec $Message = $raw_event;
    </Input>
    ```

3. それらのファイルを出力セクションに接続します。

    ```conf
    <Route file1>
        Path    FILE_WATCH_1,FILE_WATCH_2,... => out
    </Route>
    ```

4. NXLog を再起動します。サービス管理ツールを開きます。

    ```text
    C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Administrative Tools\Services.lnk
    ```

5. （任意）追加のパラメーターまたはタグを設定します。NXLog 構成ファイルの各入力セクションで、ログに任意の属性を追加します。たとえば、ログの送信元のインテグレーションを識別するために Datadog で使用されるソースを指定するには、以下のようにします。

    ```conf
    Exec        $ddsource = 'mysourcevalue';
    Exec        $ddtags = 'env:test,<KEY>:<VALUE>';
    ```

### NXLog の TLS 暗号化

1. [CA 証明書][1]をダウンロードします。

2. NXLog 構成に `om_ssl` モジュールを追加して、ポート 10516 上での安全な転送を有効にします。

    ```conf
    <Output out>
      Module  om_ssl
      Host    intake.logs.datadoghq.com
      Port    10516
      Exec    to_syslog_ietf();
      Exec    $raw_event="my_api_key " + $raw_event;
      CAFile  <CERT_DIR>/ca-certificates.crt
      AllowUntrusted FALSE
    </Output>
    ```


[1]: /resources/crt/ca-certificates.crt
{{% /tab %}}
{{% tab "Datadog EU site" %}}

1. Configure NXLog を構成してログを Datadog プラットフォームに送信し、`C:\Program Files\nxlog\conf` のファイル全体を以下の内容に書き換えます。

    ```conf
    ## Set the ROOT to the folder your nxlog was installed into,
    ## otherwise it won't start.
    #To change for your own system if necessary
    define ROOT C:\Program Files\nxlog
    #define ROOT_STRING C:\Program Files\nxlog
    #define ROOT C:\Program Files (x86)\nxlog
    Moduledir %ROOT%\modules
    CacheDir %ROOT%\data
    Pidfile %ROOT%\data\nxlog.pid
    SpoolDir %ROOT%\data
    LogFile %ROOT%\data\nxlog.log
    ##Extension to format the message in JSON format
    <Extension json>
        Module xm_json
    </Extension>
    ##Extension to format the message in syslog format
    <Extension syslog>
    Module xm_syslog
    </Extension>
    ########## INPUTS ###########
    ##Input for windows event logs
    <Input syslogs>
        Module      im_msvistalog
    ##For windows 2003 and earlier use the following:
    #    Module      im_mseventlog
    </Input>
    ############ OUTPUTS ##############
    ##TCP output module
    <Output out>
        Module      om_tcp
        Host        tcp-intake.logs.datadoghq.eu
        Port        1883
        Exec        to_syslog_ietf();
        Exec        $raw_event="<DATADOG_API_KEY> "+$raw_event;
    </Output>
    ############ ROUTES TO CHOOSE #####
    <Route 1>
        Path        syslogs => out
    </Route>
    ```

     上の `<DATADOG_API_KEY>` を忘れずに置き換えてください。

2. 監視するファイルごとに NXLog 監視モジュールを有効にし、出力セクションの前に以下を追加します。

    ```conf
    ##Module to watch a file
    <Input FILE_WATCH_1>
      Module im_file
      File "PATH\\TO\\YOUR\\FILE1"
      Exec   $SourceName = '<MY_APPLICATION_NAME>';
      SavePos TRUE

      ##include the message and add meta data
      Exec $Message = $raw_event;
    </Input>
    ```

3. それらのファイルを出力セクションに接続します。

    ```conf
    <Route file1>
        Path    FILE_WATCH_1,FILE_WATCH_2,... => out
    </Route>
    ```

4. NXLog を再起動します。サービス管理ツールを開きます。

    ```text
    C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Administrative Tools\Services.lnk
    ```

5. （任意）追加のパラメーターまたはタグを設定します。NXLog 構成ファイルの各入力セクションで、ログに任意の属性を追加します。たとえば、ログの送信元のインテグレーションを識別するために Datadog で使用されるソースを指定するには、以下のようにします。

    ```conf
    Exec        $ddsource = 'mysourcevalue';
    Exec        $ddtags = 'env:test,<KEY>:<VALUE>';
    ```

### NXLog の TLS 暗号化

1. [CA 証明書][1]をダウンロードします。

2. NXLog 構成に `om_ssl` モジュールを追加して、ポート 443 上での安全な転送を有効にします。

    ```conf
    <Output out>
      Module  om_ssl
      Host    intake.logs.datadoghq.com
      Port    443
      Exec    to_syslog_ietf();
      Exec    $raw_event="my_api_key " + $raw_event;
      CAFile  <CERT_DIR>/ca-certificates.crt
      AllowUntrusted FALSE
    </Output>
    ```


[1]: /resources/crt/ca-certificates.crt
{{% /tab %}}
{{< /tabs >}}

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][1]までお問合せください。

[1]: /ja/help/