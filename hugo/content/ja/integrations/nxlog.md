---
aliases:
- /ja/logs/log_collection/nxlog
categories:
- ログの収集
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/nxlog.md
description: NXLog を構成して、ホスト、コンテナ、サービスからログを収集
doc_link: /integrations/nxlog/
has_logo: true
integration_id: nxlog
integration_title: NXLog
is_public: true
name: nxlog
public_title: Datadog-NXlog インテグレーション
short_description: NXLog を構成して、ホスト、コンテナ、サービスからログを収集
supported_os:
- windows
title: NXLog
---

## 概要

NXLog を構成して、ホスト、コンテナ、サービスからログを収集します。

## セットアップ

以下では、[TCP](#log-collection-over-tcp) または [HTTP](#log-collection-over-http) のエンド ポイント経由でのログ収集、および [NXLog TLS 暗号化](#nxlog-tls-encryption) のセットアップを説明します。

### TCP 経由のログ収集 

{{< site-region region="us3,us5,ap1,gov" >}}
  <div class="alert alert-danger">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では TCP エンド ポイントはサポートされていません。ログ エンド ポイントの一覧は、<a href="/logs/log_collection/?tab=tcp#additional-configuration-options">ログ収集とインテグレーション</a> を参照してください。</div>
{{< /site-region >}}


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
        Host        {{< region-param key="web_integrations_endpoint" >}}
        Port        {{< region-param key="tcp_endpoint_port" >}}
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

### HTTP 経由のログ収集

```conf
    ## nxlog をインストールしたフォルダーを ROOT に設定します。
    ## そうしないと起動しません。
    # 必要に応じて自身のシステム用に変更してください
    define ROOT C:\Program Files\nxlog
    #define ROOT_STRING C:\Program Files\nxlog
    #define ROOT C:\Program Files (x86)\nxlog
    Moduledir %ROOT%\modules
    CacheDir %ROOT%\data
    Pidfile %ROOT%\data\nxlog.pid
    SpoolDir %ROOT%\data
    LogFile %ROOT%\data\nxlog.log
    ## メッセージを JSON 形式に整形する拡張
    <Extension json>
        Module xm_json
    </Extension>
    ## メッセージを syslog 形式に整形する拡張
    <Extension syslog>
    Module xm_syslog
    </Extension>
    ########## 入力 (INPUTS) ###########
    ## Windows イベント ログ用の Input
    <Input syslogs>
        Module      im_msvistalog
    ## Windows 2003 以前の場合は次を使用します:
    #    Module      im_mseventlog
    </Input>
    ############ 出力 (OUTPUTS) ##############
    ## HTTP 出力モジュール
    <Output out>
        Module      om_http
        URL         {{< region-param key="http_endpoint" >}}
        Port        {{< region-param key="http_port" >}}
        Exec        to_syslog_ietf();
        Exec        $raw_event="<DATADOG_API_KEY> "+$raw_event;
    </Output>
    ############ 選択するルート (ROUTES) #####
    <Route 1>
        Path        syslogs => out
    </Route>
```

### NXLog の TLS 暗号化

1. [CA 証明書][1] をダウンロードします。

2. NXLog 構成に `om_ssl` モジュールを追加して、ポート 10516 上での安全な転送を有効にします。

    ```conf
    <Output out>
      Module  om_ssl
      Host    {{< region-param key="web_integrations_endpoint" >}}
      Port    {{< region-param key="tcp_endpoint_port" >}}
      Exec    to_syslog_ietf();
      Exec    $raw_event="my_api_key " + $raw_event;
      CAFile  <CERT_DIR>/ca-certificates.crt
      AllowUntrusted FALSE
    </Output>
    ```

[1]: /resources/crt/ca-certificates.crt


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][2]までお問合せください。

[1]: /resources/crt/ca-certificates.crt
[2]: /ja/help/