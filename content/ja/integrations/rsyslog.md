---
title: Rsyslog
name: rsyslog
kind: インテグレーション
description: Rsyslog を構成して、ホスト、コンテナ、サービスからログを収集
short_description: Rsyslog を構成して、ホスト、コンテナ、サービスからログを収集
categories:
  - ログの収集
doc_link: /integrations/rsyslog/
aliases:
  - /ja/logs/log_collection/rsyslog
has_logo: true
integration_title: rsyslog
is_public: true
dependencies:
  - 'https://github.com/DataDog/documentation/blob/master/content/en/integrations/rsyslog.md'
public_title: Datadog-Rsyslog インテグレーション
supported_os:
  - linux
---
## 概要

Rsyslog を構成して、ホスト、コンテナ、サービスからログを収集

## セットアップ

### ログの収集

#### Rsyslog バージョン 8 以上 

{{< tabs >}}
{{% tab "Datadog US site" %}}

1. (任意) Rsyslog のファイル監視モジュールを有効にします。特定のログファイルを観察/監視する場合は、以下を `rsyslog.conf` に追加して、imfile モジュールを有効にする必要があります。

    ```conf
    module(load="imfile" PollingInterval="10") #needs to be done just once
    ```

2. `/etc/rsyslog.d/datadog.conf` ファイルを作成します。
3. 監視するログファイルを設定し、目的のエンドポイントを構成します。以下を `/etc/rsyslog.d/datadog.conf` に追加してください。

    ```conf
    ## For each file to send
    input(type="imfile" ruleset="infiles" Tag="<APP_NAME_OF_FILE1>" File="<PATH_TO_FILE1>")

    ## Set the Datadog Format to send the logs
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - - %msg%\n"

    ## Define the destination for the logs
    ruleset(name="infiles") {
        action(type="omfwd" target="intake.logs.datadoghq.com" protocol="tcp" port="10514" template="DatadogFormat")
    }
    ```

4. (オプション) TLS 暗号化:
   ログを Rsyslog から Datadog アカウントへ直接送信する際に、TLS 暗号化を追加する場合は、以下の手順に従います。

    - rsyslog-gnutls をインストールします。

        ```shell
        sudo apt-get install rsyslog-gnutls ca-certificates
        ```

    - `/etc/rsyslog.d/datadog.conf` を変更して、以下の内容を末尾に追加します。

        ```conf
        ## Define the destination for the logs
        $DefaultNetstreamDriverCAFile /etc/ssl/certs/ca-certificates.crt
        ruleset(name="infiles") {
          action(type="omfwd" protocol="tcp" target="intake.logs.datadoghq.com" port="10516" template="DatadogFormat" StreamDriver="gtls" StreamDriverMode="1" StreamDriverAuthMode="x509/name" StreamDriverPermittedPeers="*.logs.datadoghq.com" )
        }
        ```

5. Rsyslog を再起動すると、新しいログが Datadog アカウントへ直接転送されます。

    ```shell
    sudo service rsyslog restart
    ```

6. それらのログをホストのメトリクスおよびタグと関連付けます。
   ログを Datadog アカウント内の同一のホストのメトリクスおよびタグと関連付けるには、 `rsyslog.conf` で Datadog メトリクスのホスト名と一致するように `HOSTNAME` を設定します。
   `datadog.conf` または `datadog.yaml` 経由のメトリクスについて構成ファイルでホスト名を指定しなかった場合、何も変更する必要はありません。
   メトリクスのカスタムホスト名を指定した場合は、上のログ形式の **%HOSTNAME%** の値を置き換えて、同じカスタム名になるようにしてください。

7. Datadog インテグレーションを使用します。
    Datadog でログを最大限活用するには、ログにソースを設定します。ログを Datadog Agent に転送する場合は、Agent でソースを直接設定できます。

    そうしない場合は、ログソースごとに固有の形式が必要です。つまり、`/etc/rsyslog.d/` にソースごとに固有の構成ファイルが必要です。

    ソースを設定するには、以下の形式を使用します (ソースが複数ある場合は、ファイルごとに形式の名前を変えてください)。

    ```conf
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\"] %msg%\n"
    ```

    `ddtags` 属性を使用してカスタムタグを追加することもできます。

    ```conf
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\" ddtags=\"env:dev,<KEY:VALUE>\"] %msg%\n"
    ```

8. (任意) Datadog は、非アクティブな状態が一定時間続くと、非アクティブな接続を切断します。Rsyslog の一部のバージョンは、必要に応じて適切に再接続を行うことができません。この問題を軽減するには、タイムマーカーを使用して、接続が切断されないようにします。それには、Rsyslog の構成に次の行を追加します。

    ```conf
    module(load="immark" interval="20")
    ```

    必ず再起動してください。

    ```shell
    sudo service rsyslog restart
    ```

{{% /tab %}}
{{% tab "Datadog EU site" %}}

1. (オプション) Rsyslog のファイル監視モジュールを有効にします。特定のログファイルを監視する場合は、以下を `rsyslog.conf` に追加して、`imfile` モジュールを有効にします。

    ```conf
    module(load="imfile" PollingInterval="10") #needs to be done just once
    ```

2. `/etc/rsyslog.d/datadog.conf` ファイルを作成します。
3. 監視するログファイルを設定し、目的のエンドポイントを構成します。以下を `/etc/rsyslog.d/datadog.conf` に追加してください。

    ```conf
    ## For each file to send
    input(type="imfile" ruleset="infiles" Tag="<APP_NAME_OF_FILE1>" File="<PATH_TO_FILE1>" StateFile="<UNIQUE_FILE_ID>")

    ## Set the Datadog Format to send the logs
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - - %msg%\n"

    ## Define the destination for the logs
    ruleset(name="infiles") {
         action(type="omfwd" target="tcp-intake.logs.datadoghq.eu" protocol="tcp" port="1883" template="DatadogFormat")
    }
    ```

4. (オプション) TLS 暗号化:
   ログを Rsyslog から Datadog アカウントへ直接送信する際に、TLS 暗号化を追加する場合は、以下の手順に従います。

    - rsyslog-gnutls をインストールします。

        ```shell
        sudo apt-get install rsyslog-gnutls ca-certificates
        ```

    - `/etc/rsyslog.d/datadog.conf` を変更して、以下の内容を末尾に追加します。

        ```conf
        ## Define the destination for the logs
        $DefaultNetstreamDriverCAFile /etc/ssl/certs/ca-certificates.crt
        ruleset(name="infiles") {
          action(type="omfwd" protocol="tcp" target="tcp-intake.logs.datadoghq.eu" port="443" template="DatadogFormat"           StreamDriver="gtls" StreamDriverMode="1" StreamDriverAuthMode="x509/name" StreamDriverPermittedPeers="*.logs.datadoghq.eu" )
        }
        ```

5. Rsyslog を再起動すると、新しいログが Datadog アカウントへ直接転送されます。

    ```shell
    sudo service rsyslog restart
    ```

6. それらのログをホストのメトリクスおよびタグと関連付けます。
    ログを Datadog アカウント内の同一のホストのメトリクスおよびタグと関連付けるには、 `rsyslog.conf` で Datadog メトリクスのホスト名と一致するように同じ `HOSTNAME` の値を設定します。
   **注**: `datadog.conf` または `datadog.yaml` 経由のメトリクスについて構成ファイルでホスト名を指定しなかった場合、何も変更する必要はありません。メトリクスのカスタムホスト名を指定した場合は、上のログ形式の **%HOSTNAME%** の値を置き換えて、同じカスタム名になるようにしてください。

7. Datadog インテグレーションを使用します。
   Datadog でログを最大限活用するには、ログにソースを設定します。ログを Datadog Agent に転送する場合は、Agent でソースを直接設定できます。

    そうしない場合は、ログソースごとに固有の形式が必要です。つまり、`/etc/rsyslog.d/` にソースごとに固有の構成ファイルが必要です。

    ソースを設定するには、以下の形式を使用します (ソースが複数ある場合は、ファイルごとに形式の名前を変えてください)。

    ```conf
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\"] %msg%\n"
    ```

    `ddtags` 属性を使用してカスタムタグを追加することもできます。

    ```conf
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\" ddtags=\"env:dev,<KEY:VALUE>\"] %msg%\n"
    ```

8. (オプション) Datadog は、非アクティブな状態が一定時間続くと、非アクティブな接続を切断します。
   Rsyslog の一部のバージョンは、必要に応じて適切に再接続を行うことができません。この問題を軽減するには、タイムマーカーを使用して、接続が切断されないようにします。それには、Rsyslog の構成に次の行を追加します。

    ```conf
    module(load="immark" interval="20")
    ```

    必ず再起動してください。

    ```shell
    sudo service rsyslog restart
    ```

{{% /tab %}}
{{< /tabs >}}

#### Rsyslog バージョン <

{{< tabs >}}
{{% tab "Datadog US site" %}}

1. (オプション) Rsyslog のファイル監視モジュールを有効にします。特定のログファイルを監視する場合は、以下を `rsyslog.conf` に追加して、`imfile` モジュールを有効にします。

    ```conf
    $ModLoad imfile
    $InputFilePollInterval 10
    $PrivDropToGroup adm
    $WorkDirectory /var/spool/rsyslog
    ```

2. `/etc/rsyslog.d/datadog.conf` ファイルを作成します。
3. 監視するログファイルを設定し、目的のエンドポイントを構成します。以下を `/etc/rsyslog.d/datadog.conf` に追加してください。

    ```conf
    ## Input for FILE1
    $InputFileName /<PATH_TO_FILE1>
    $InputFileTag <APP_NAME_OF_FILE1>
    $InputFileStateFile <UNIQUE_FILE_ID>
    $InputFileSeverity info
    $InputRunFileMonitor

    ## Set the Datadog Format to send the logs
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - - %msg%\n"

    ## Define the destination for the logs
    *.* @@intake.logs.datadoghq.com:10514;DatadogFormat
    ```

4. (オプション) TLS 暗号化:
   ログを Rsyslog から Datadog アカウントへ直接送信する際に、TLS 暗号化を追加する場合は、以下の手順に従います。

    - rsyslog-gnutls をインストールします。

        ```shell
        sudo apt-get install rsyslog-gnutls ca-certificates
        ```

    - `/etc/rsyslog.d/datadog.conf` を変更して、以下の内容を末尾に追加します。

        ```conf
        #Define the destination for the logs

        $DefaultNetstreamDriverCAFile /etc/ssl/certs/ca-certificates.crt
        $ActionSendStreamDriver gtls
        $ActionSendStreamDriverMode 1
        $ActionSendStreamDriverAuthMode x509/name
        $ActionSendStreamDriverPermittedPeer *.logs.datadoghq.com
        *.* @@intake.logs.datadoghq.com:10516;DatadogFormat
        ```

5. Rsyslog を再起動すると、新しいログが Datadog アカウントへ直接転送されます。

    ```shell
    sudo service rsyslog restart
    ```

6. それらのログをホストのメトリクスおよびタグと関連付けます。
   ログを Datadog アカウント内の同一のホストのメトリクスおよびタグと関連付けるには、 `rsyslog.conf` で Datadog メトリクスのホスト名と一致するように同じ `HOSTNAME` の値を設定します。
   **注**: `datadog.conf` または `datadog.yaml` 経由のメトリクスについて構成ファイルでホスト名を指定しなかった場合、何も変更する必要はありません。メトリクスのカスタムホスト名を指定した場合は、上のログ形式の **%HOSTNAME%** の値を置き換えて、同じカスタム名になるようにしてください。

7. Datadog インテグレーションを使用します。
   Datadog でログを最大限活用するには、ログにソースを設定します。ログを Datadog Agent に転送する場合は、Agent でソースを直接設定できます。

    そうしない場合は、ログソースごとに固有の形式が必要です。つまり、`/etc/rsyslog.d/` にソースごとに固有の構成ファイルが必要です。

    ソースを設定するには、以下の形式を使用します (ソースが複数ある場合は、ファイルごとに形式の名前を変えてください)。

    ```conf
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\"] %msg%\n"
    ```

    `ddtags` 属性を使用してカスタムタグを追加することもできます。

    ```conf
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\" ddtags=\"env:dev,<KEY:VALUE>\"] %msg%\n"
    ```

8. (オプション) Datadog は、非アクティブな状態が一定時間続くと、非アクティブな接続を切断します。
   Rsyslog の一部のバージョンは、必要に応じて適切に再接続を行うことができません。この問題を軽減するには、タイムマーカーを使用して、接続が切断されないようにします。それには、Rsyslog の構成に次の 2 行を追加します。

    ```conf
    $ModLoad immark
    $MarkMessagePeriod 20
    ```

    必ず再起動してください。

    ```shell
    sudo service rsyslog restart
    ```

{{% /tab %}}
{{% tab "Datadog EU site" %}}

1. (オプション) Rsyslog のファイル監視モジュールを有効にします。特定のログファイルを監視する場合は、以下を `rsyslog.conf` に追加して、`imfile` モジュールを有効にします。

    ```conf
    $ModLoad imfile
    $InputFilePollInterval 10
    $PrivDropToGroup adm
    $WorkDirectory /var/spool/rsyslog
    ```

2. `/etc/rsyslog.d/datadog.conf` ファイルを作成します。
3. 監視するログファイルを設定し、目的のエンドポイントを構成します。以下を `/etc/rsyslog.d/datadog.conf` に追加してください。

    ```conf
    ## Input for FILE1
    $InputFileName /<PATH_TO_FILE1>
    $InputFileTag <APP_NAME_OF_FILE1>
    $InputFileStateFile <UNIQUE_FILE_ID>
    $InputFileSeverity info
    $InputRunFileMonitor

    ## Set the Datadog Format to send the logs
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - - %msg%\n"

    ## Define the destination for the logs
    *.* @@tcp-intake.logs.datadoghq.eu:1883;DatadogFormat
    ```

4. (オプション) TLS 暗号化:
   ログを Rsyslog から Datadog アカウントへ直接送信する際に、TLS 暗号化を追加する場合は、以下の手順に従います。

    - rsyslog-gnutls をインストールします。

        ```shell
        sudo apt-get install rsyslog-gnutls ca-certificates
        ```

    - `/etc/rsyslog.d/datadog.conf` を変更して、以下の内容を末尾に追加します。

        ```conf
        #Define the destination for the logs

        $DefaultNetstreamDriverCAFile /etc/ssl/certs/ca-certificates.crt
        $ActionSendStreamDriver gtls
        $ActionSendStreamDriverMode 1
        $ActionSendStreamDriverAuthMode x509/name
        $ActionSendStreamDriverPermittedPeer *.logs.datadoghq.eu
        *.* @@tcp-intake.logs.datadoghq.eu:443;DatadogFormat
        ```

5. Rsyslog を再起動すると、新しいログが Datadog アカウントへ直接転送されます。

    ```shell
    sudo service rsyslog restart
    ```

6. それらのログをホストのメトリクスおよびタグと関連付けます。
   ログを Datadog アカウント内の同一のホストのメトリクスおよびタグと関連付けるには、 `rsyslog.conf` で Datadog メトリクスのホスト名と一致するように同じ `HOSTNAME` の値を設定します。
   **注**: `datadog.conf` または `datadog.yaml` 経由のメトリクスについて構成ファイルでホスト名を指定しなかった場合、何も変更する必要はありません。メトリクスのカスタムホスト名を指定した場合は、上のログ形式の **%HOSTNAME%** の値を置き換えて、同じカスタム名になるようにしてください。

7. Datadog インテグレーションを使用します。
   Datadog でログを最大限活用するには、ログにソースを設定します。ログを Datadog Agent に転送する場合は、Agent でソースを直接設定できます。

    そうしない場合は、ログソースごとに固有の形式が必要です。つまり、`/etc/rsyslog.d/` にソースごとに固有の構成ファイルが必要です。

    ソースを設定するには、以下の形式を使用します (ソースが複数ある場合は、ファイルごとに形式の名前を変えてください)。

    ```conf
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\"] %msg%\n"
    ```

    `ddtags` 属性を使用してカスタムタグを追加することもできます。

    ```conf
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\" ddtags=\"env:dev,<KEY:VALUE>\"] %msg%\n"
    ```

8. (オプション) Datadog は、非アクティブな状態が一定時間続くと、非アクティブな接続を切断します。
   Rsyslog の一部のバージョンは、必要に応じて適切に再接続を行うことができません。この問題を軽減するには、タイムマーカーを使用して、接続が切断されないようにします。それには、Rsyslog の構成に次の 2 行を追加します。

    ```conf
    $ModLoad immark
    $MarkMessagePeriod 20
    ```

    必ず再起動してください。

    ```shell
    sudo service rsyslog restart
    ```

{{% /tab %}}
{{< /tabs >}}

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][1]までお問合せください。

[1]: /ja/help/