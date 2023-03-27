---
aliases:
- /ja/logs/log_collection/rsyslog
categories:
- ログの収集
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/rsyslog.md
description: Rsyslog を構成して、ホスト、コンテナ、サービスからログを収集
doc_link: /integrations/rsyslog/
has_logo: true
integration_id: rsyslog
integration_title: rsyslog
is_public: true
kind: インテグレーション
name: rsyslog
public_title: Datadog-Rsyslog インテグレーション
short_description: Rsyslog を構成して、ホスト、コンテナ、サービスからログを収集
supported_os:
- linux
title: Rsyslog
---

## 概要

Rsyslog を構成して、ホスト、コンテナ、サービスからログを収集

## セットアップ

### ログの収集

#### Rsyslog バージョン 8 以上 

{{< tabs >}}

{{% tab "Ubuntu と Debian" %}}
1. 特定のログファイルを監視するために `imfile` モジュールを有効にします。`imfile` モジュールを追加するには、`rsyslog.conf` に以下を追加します。

    ```conf
    module(load="imfile" PollingInterval="10") #needs to be done just once
    ```

2. `/etc/rsyslog.d/datadog.conf` ファイルを作成します。


3. `/etc/rsyslog.d/datadog.conf` に、以下の構成を追加します。監視したいログファイルごとに、別々の `input` 行を記述する必要があります。

    ```conf
    ## For each file to send
    input(type="imfile" ruleset="infiles" Tag="<APP_NAME_OF_FILE1>" File="<PATH_TO_FILE1>")

    ## Set the Datadog Format to send the logs
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - - %msg%\n"
    ```

4. Rsyslog を再起動します。新しいログが Datadog アカウントへ直接転送されます。
   ```shell
   sudo systemctl restart rsyslog
   ```

5. ログをホストのメトリクスおよびタグと関連付けます。

   ログを Datadog アカウント内の同一のホストのメトリクスおよびタグと関連付けるには、 `rsyslog.conf` で Datadog メトリクスのホスト名と一致するように `HOSTNAME` を設定します。
   - `datadog.conf` または `datadog.yaml` でホスト名を指定している場合は、`rsyslog.conf` の `%HOSTNAME%` をホスト名に合わせて置き換えます。
   - `datadog.conf` または `datadog.yaml` でホスト名を指定していない場合は、何も変更する必要はありません。

6. Datadog でログを最大限に活用するために、ログのソースを設定します。
   - [Datadog Agent にログを転送する][1]場合、Agent のコンフィギュレーションファイルでソースを設定することができます。
   - Datadog Agent にログを転送しない場合は、`/etc/rsyslog.d/` に各ソース用の個別のコンフィギュレーションファイルを作成します。

     ソースを設定するには、以下の形式を使用します (ソースが複数ある場合は、ファイルごとに形式の名前を変えてください)。

     ```conf
     $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\"] %msg%\n"
     ```

     `ddtags` 属性を使用してカスタムタグを追加することができます。

     ```conf
     $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\" ddtags=\"env:dev,<KEY:VALUE>\"] %msg%\n"
     ```

7. (任意) Datadog は、非アクティブな状態が一定時間続くと、非アクティブな接続を切断します。Rsyslog の一部のバージョンは、必要に応じて再接続を行うことができません。この問題を軽減するには、タイムマーカーを使用して、接続が切断されないようにします。

   1. Rsyslog のコンフィギュレーションファイルに以下の行を追加します。

      ```conf
      $ModLoad immark
      $MarkMessagePeriod 20
      ```

   2. Rsyslog サービスを再起動します。

      ```shell
      sudo systemctl restart rsyslog
      ```

{{% site-region region="us" %}}
8. (オプション) Rsyslog から Datadog アカウントに送信されるログに TLS Encryption を追加します。
   1. `rsyslog-gnutls` と `ca-certificates` パッケージをインストールします。
      ```shell
      sudo apt-get install rsyslog-gnutls ca-certificates
      ```
   2. 以下の行を `/etc/rsyslog.d/datadog.conf` ファイルの末尾に追加します。
      ```conf
      ## Define the destination for the logs
      $DefaultNetstreamDriverCAFile /etc/ssl/certs/ca-certificates.crt
      ruleset(name="infiles") {
          action(type="omfwd" protocol="tcp" target="intake.logs.datadoghq.com" port="10516" template="DatadogFormat" StreamDriver="gtls" StreamDriverMode="1" StreamDriverAuthMode="x509/name" StreamDriverPermittedPeers="*.logs.datadoghq.com" )
      }
      ```
   3. Rsyslog サービスを再起動します。

      ```shell
      sudo systemctl restart rsyslog
      ```
{{% /site-region %}}
{{% site-region region="eu" %}}

8. (オプション) Rsyslog から Datadog アカウントに送信されるログに TLS Encryption を追加します。
   1. `rsyslog-gnutls` と `ca-certificates` パッケージをインストールします。
      ```shell
      sudo apt-get install rsyslog-gnutls ca-certificates
      ```

   2. 以下の行を `/etc/rsyslog.d/datadog.conf` ファイルの末尾に追加します。
      ```conf
      ## Define the destination for the logs
      $DefaultNetstreamDriverCAFile /etc/ssl/certs/ca-certificates.crt
      ruleset(name="infiles") {
          action(type="omfwd" protocol="tcp" target="tcp-intake.logs.datadoghq.eu" port="443" template="DatadogFormat" StreamDriver="gtls" StreamDriverMode="1" StreamDriverAuthMode="x509/name" StreamDriverPermittedPeers="*.logs.datadoghq.eu" )
      }
       ```
   3. Rsyslog サービスを再起動します。

      ```shell
      sudo systemctl restart rsyslog
      ```
{{% /site-region %}}

[1]: /ja/agent/logs/
{{< /tabs >}}

{{% tab "Amazon Linux、CentOS、Red Hat" %}}
1. 特定のログファイルを監視するために `imfile` モジュールを有効にします。`imfile` モジュールを追加するには、`rsyslog.conf` に以下を追加します。

    ```conf
    module(load="imfile" PollingInterval="10") #needs to be done just once
    ```

2. `/etc/rsyslog.d/datadog.conf` ファイルを作成します。

3. `/etc/rsyslog.d/datadog.conf` に、以下の構成を追加します。監視したいログファイルごとに、別々の `input` 行を記述する必要があります。

    ```conf
    ## For each file to send
    input(type="imfile" ruleset="infiles" Tag="<APP_NAME_OF_FILE1>" File="<PATH_TO_FILE1>")

    ## Set the Datadog Format to send the logs
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - - %msg%\n"
    ```

4. Rsyslog を再起動します。新しいログが Datadog アカウントへ直接転送されます。
   ```shell
   sudo systemctl restart rsyslog
   ```

5. ログをホストのメトリクスおよびタグと関連付けます。

   ログを Datadog アカウント内の同一のホストのメトリクスおよびタグと関連付けるには、 `rsyslog.conf` で Datadog メトリクスのホスト名と一致するように `HOSTNAME` を設定します。
   - `datadog.conf` または `datadog.yaml` でホスト名を指定している場合は、`rsyslog.conf` の `%HOSTNAME%` をホスト名に合わせて置き換えます。
   - `datadog.conf` または `datadog.yaml` でホスト名を指定していない場合は、何も変更する必要はありません。

6. Datadog でログを最大限に活用するために、ログのソースを設定します。
   - [Datadog Agent にログを転送する][1]場合、Agent のコンフィギュレーションファイルでソースを設定することができます。
   - Datadog Agent にログを転送しない場合は、`/etc/rsyslog.d/` に各ソース用の個別のコンフィギュレーションファイルを作成します。

     ソースを設定するには、以下の形式を使用します (ソースが複数ある場合は、ファイルごとに形式の名前を変えてください)。

     ```conf
     $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\"] %msg%\n"
     ```

     `ddtags` 属性を使用してカスタムタグを追加することができます。

     ```conf
     $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\" ddtags=\"env:dev,<KEY:VALUE>\"] %msg%\n"
     ```

7. (任意) Datadog は、非アクティブな状態が一定時間続くと、非アクティブな接続を切断します。Rsyslog の一部のバージョンは、必要に応じて再接続を行うことができません。この問題を軽減するには、タイムマーカーを使用して、接続が切断されないようにします。

   1. Rsyslog のコンフィギュレーションファイルに以下の 2 行を追加します。

      ```conf
      $ModLoad immark
      $MarkMessagePeriod 20
      ```

   2. Rsyslog サービスを再起動します。

      ```shell
      sudo systemctl restart rsyslog
      ```

{{% site-region region="us" %}}
8. (オプション) Rsyslog から Datadog アカウントに送信されるログに TLS Encryption を追加します。
   1. `rsyslog-gnutls` と `ca-certificates` パッケージをインストールします。
      ```shell
      sudo yum install rsyslog-gnutls ca-certificates
      ```
   2. 以下の行を `/etc/rsyslog.d/datadog.conf` ファイルの末尾に追加します。
      ```conf
      ## Define the destination for the logs
      $DefaultNetstreamDriverCAFile /etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem
      ruleset(name="infiles") {
          action(type="omfwd" protocol="tcp" target="intake.logs.datadoghq.com" port="10516" template="DatadogFormat" StreamDriver="gtls" StreamDriverMode="1" StreamDriverAuthMode="x509/name" StreamDriverPermittedPeers="*.logs.datadoghq.com" )
      }
      ```
   3. Rsyslog サービスを再起動します。

      ```shell
      sudo systemctl restart rsyslog
      ```
{{% /site-region %}}

{{% site-region region="eu" %}}

8. (オプション) Rsyslog から Datadog アカウントに送信されるログに TLS Encryption を追加します。
   1. `rsyslog-gnutls` と `ca-certificates` パッケージをインストールします。
      ```shell
      sudo yum install rsyslog-gnutls ca-certificates
      ```

   2. 以下の行を `/etc/rsyslog.d/datadog.conf` ファイルの末尾に追加します。
      ```conf
      ## Define the destination for the logs
      $DefaultNetstreamDriverCAFile /etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem
      ruleset(name="infiles") {
          action(type="omfwd" protocol="tcp" target="tcp-intake.logs.datadoghq.eu" port="443" template="DatadogFormat" StreamDriver="gtls" StreamDriverMode="1" StreamDriverAuthMode="x509/name" StreamDriverPermittedPeers="*.logs.datadoghq.eu" )
      }
       ```
   3. Rsyslog サービスを再起動します。

      ```shell
      sudo systemctl restart rsyslog
      ```
{{% /site-region %}}

[1]: /ja/agent/logs/
{{< /tabs >}}

{{% tab "Fedora" %}}
1. 特定のログファイルを監視するために `imfile` モジュールを有効にします。`imfile` モジュールを追加するには、`rsyslog.conf` に以下を追加します。

    ```conf
    module(load="imfile" PollingInterval="10") #needs to be done just once
    ```

2. `/etc/rsyslog.d/datadog.conf` ファイルを作成します。


3. `/etc/rsyslog.d/datadog.conf` に、以下の構成を追加します。監視したいログファイルごとに、別々の `input` 行を記述する必要があります。

    ```conf
    ## For each file to send
    input(type="imfile" ruleset="infiles" Tag="<APP_NAME_OF_FILE1>" File="<PATH_TO_FILE1>")

    ## Set the Datadog Format to send the logs
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - - %msg%\n"
    ```

4. Rsyslog を再起動します。新しいログが Datadog アカウントへ直接転送されます。
   ```shell
   sudo systemctl restart rsyslog
   ```

5. ログをホストのメトリクスおよびタグと関連付けます。

   ログを Datadog アカウント内の同一のホストのメトリクスおよびタグと関連付けるには、 `rsyslog.conf` で Datadog メトリクスのホスト名と一致するように `HOSTNAME` を設定します。
   - `datadog.conf` または `datadog.yaml` でホスト名を指定している場合は、`rsyslog.conf` の `%HOSTNAME%` をホスト名に合わせて置き換えます。
   - `datadog.conf` または `datadog.yaml` でホスト名を指定していない場合は、何も変更する必要はありません。

6. Datadog でログを最大限に活用するために、ログのソースを設定します。
   - [Datadog Agent にログを転送する][1]場合、Agent のコンフィギュレーションファイルでソースを設定することができます。
   - Datadog Agent にログを転送しない場合は、`/etc/rsyslog.d/` に各ソース用の個別のコンフィギュレーションファイルを作成します。

     ソースを設定するには、以下の形式を使用します (ソースが複数ある場合は、ファイルごとに形式の名前を変えてください)。

     ```conf
     $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\"] %msg%\n"
     ```

     `ddtags` 属性を使用してカスタムタグを追加することができます。

     ```conf
     $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\" ddtags=\"env:dev,<KEY:VALUE>\"] %msg%\n"
     ```

7. (任意) Datadog は、非アクティブな状態が一定時間続くと、非アクティブな接続を切断します。Rsyslog の一部のバージョンは、必要に応じて再接続を行うことができません。この問題を軽減するには、タイムマーカーを使用して、接続が切断されないようにします。

   1. Rsyslog のコンフィギュレーションファイルに以下の 2 行を追加します。

      ```conf
      $ModLoad immark
      $MarkMessagePeriod 20
      ```

   2. Rsyslog サービスを再起動します。

      ```shell
      sudo systemctl restart rsyslog
      ```

{{% site-region region="us" %}}
8. (オプション) Rsyslog から Datadog アカウントに送信されるログに TLS Encryption を追加します。
   1. `rsyslog-gnutls` と `ca-certificates` パッケージをインストールします。
      ```shell
      sudo dnf install rsyslog-gnutls ca-certificates
      ```
   2. 以下の行を `/etc/rsyslog.d/datadog.conf` ファイルの末尾に追加します。
      ```conf
      ## Define the destination for the logs
      $DefaultNetstreamDriverCAFile /etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem
      ruleset(name="infiles") {
          action(type="omfwd" protocol="tcp" target="intake.logs.datadoghq.com" port="10516" template="DatadogFormat" StreamDriver="gtls" StreamDriverMode="1" StreamDriverAuthMode="x509/name" StreamDriverPermittedPeers="*.logs.datadoghq.com" )
      }
      ```
   3. Rsyslog サービスを再起動します。

      ```shell
      sudo systemctl restart rsyslog
      ```
{{% /site-region %}}

{{% site-region region="eu" %}}

8. (オプション) Rsyslog から Datadog アカウントに送信されるログに TLS Encryption を追加します。
   1. `rsyslog-gnutls` と `ca-certificates` パッケージをインストールします。
      ```shell
      sudo dnf install rsyslog-gnutls ca-certificates
      ```

   2. 以下の行を `/etc/rsyslog.d/datadog.conf` ファイルの末尾に追加します。
      ```conf
      ## Define the destination for the logs
      $DefaultNetstreamDriverCAFile /etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem
      ruleset(name="infiles") {
          action(type="omfwd" protocol="tcp" target="tcp-intake.logs.datadoghq.eu" port="443" template="DatadogFormat" StreamDriver="gtls" StreamDriverMode="1" StreamDriverAuthMode="x509/name" StreamDriverPermittedPeers="*.logs.datadoghq.eu" )
      }
       ```
   3. Rsyslog サービスを再起動します。

      ```shell
      sudo systemctl restart rsyslog
      ```
{{% /site-region %}}

[1]: /ja/agent/logs/
{{< /tabs >}}

{{< /tabs >}}
#### Rsyslog バージョン <

{{< tabs >}}

{{% tab "Ubuntu と Debian" %}}
1. 特定のログファイルを監視するために `imfile` モジュールを有効にします。`imfile` モジュールを追加するには、`rsyslog.conf` に以下を追加します。

    ```conf
    $ModLoad imfile
    $InputFilePollInterval 10
    $PrivDropToGroup adm
    $WorkDirectory /var/spool/rsyslog
    ```

2. `/etc/rsyslog.d/datadog.conf` ファイルを作成します。

3. `/etc/rsyslog.d/datadog.conf` に、以下の構成を追加します。監視したいログファイルごとに、別々の `Input` スタンザを記述する必要があります。

    ```conf
    ## Input for FILE1
    $InputFileName /<PATH_TO_FILE1>
    $InputFileTag <APP_NAME_OF_FILE1>
    $InputFileStateFile <UNIQUE_FILE_ID>
    $InputFileSeverity info
    $InputRunFileMonitor

    ## Set the Datadog Format to send the logs
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - - %msg%\n"
    ```

4. Rsyslog を再起動します。新しいログが Datadog アカウントへ直接転送されます。

    ```shell
    sudo systemctl restart rsyslog
    ```

5. ログをホストのメトリクスおよびタグと関連付けます。

   ログを Datadog アカウント内の同一のホストのメトリクスおよびタグと関連付けるには、 `rsyslog.conf` で Datadog メトリクスのホスト名と一致するように `HOSTNAME` を設定します。

   - `datadog.conf` または `datadog.yaml` でホスト名を指定している場合は、`rsyslog.conf` の `%HOSTNAME%` をホスト名に合わせて置き換えます。
   - `datadog.conf` または `datadog.yaml` でホスト名を指定していない場合は、何も変更する必要はありません。

6. Datadog でログを最大限に活用するために、ログのソースを設定します。
   - [Datadog Agent にログを転送する][1]場合、Agent のコンフィギュレーションファイルでソースを設定することができます。
   - Datadog Agent にログを転送しない場合は、`/etc/rsyslog.d/` に各ソース用の個別のコンフィギュレーションファイルを作成します。

   ソースを設定するには、以下の形式を使用します (ソースが複数ある場合は、ファイルごとに形式の名前を変えてください)。

   ```conf
   $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\"] %msg%\n"
   ```

   `ddtags` 属性を使用してカスタムタグを追加することもできます。

   ```conf
   $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\" ddtags=\"env:dev,<KEY:VALUE>\"] %msg%\n"
   ```

7. (任意) Datadog は、非アクティブな状態が一定時間続くと、非アクティブな接続を切断します。Rsyslog の一部のバージョンは、必要に応じて再接続を行うことができません。この問題を軽減するには、タイムマーカーを使用して、接続が切断されないようにします。

   1. Rsyslog のコンフィギュレーションに以下の行を追加します。

      ```conf
      $ModLoad immark
      $MarkMessagePeriod 20
      ```

   2. Rsyslog サービスを再起動します。

      ```shell
      sudo systemctl restart rsyslog
      ```

{{% site-region region="us" %}}
8. (オプション) Rsyslog から Datadog アカウントに送信されるログに TLS Encryption を追加します。

    1. `rsyslog-gnutls` と `ca-certificates` パッケージをインストールします。

        ```shell
        sudo apt-get install rsyslog-gnutls ca-certificates
        ```

    2. 以下の行を `/etc/rsyslog.d/datadog.conf` ファイルの末尾に追加します。

        ```conf
        #Define the destination for the logs
        $DefaultNetstreamDriverCAFile /etc/ssl/certs/ca-certificates.crt
        $ActionSendStreamDriver gtls
        $ActionSendStreamDriverMode 1
        $ActionSendStreamDriverAuthMode x509/name
        $ActionSendStreamDriverPermittedPeer *.logs.datadoghq.com
        *.* @@intake.logs.datadoghq.com:10516;DatadogFormat
        ```
   3. Rsyslog サービスを再起動します。

      ```shell
      sudo systemctl restart rsyslog
      ```
{{% /site-region %}}

{{% site-region region="eu" %}}

8. (オプション) Rsyslog から Datadog アカウントに送信されるログに TLS Encryption を追加します。

    1. `rsyslog-gnutls` と `ca-certificates` パッケージをインストールします。

        ```shell
        sudo apt-get install rsyslog-gnutls ca-certificates
        ```

    2. 以下の行を `/etc/rsyslog.d/datadog.conf` ファイルの末尾に追加します。

        ```conf
        #Define the destination for the logs

        $DefaultNetstreamDriverCAFile /etc/ssl/certs/ca-certificates.crt
        $ActionSendStreamDriver gtls
        $ActionSendStreamDriverMode 1
        $ActionSendStreamDriverAuthMode x509/name
        $ActionSendStreamDriverPermittedPeer *.logs.datadoghq.eu
        *.* @@tcp-intake.logs.datadoghq.eu:443;DatadogFormat
        ```
   3. Rsyslog サービスを再起動します。

      ```shell
      sudo systemctl restart rsyslog
      ```
{{% /site-region %}}

[1]: /ja/agent/logs/
{{< /tabs >}}

{{% tab "Amazon Linux、CentOS、Red Hat" %}}
1. 特定のログファイルを監視するために `imfile` モジュールを有効にします。`imfile` モジュールを追加するには、`rsyslog.conf` に以下を追加します。

    ```conf
    $ModLoad imfile
    $InputFilePollInterval 10
    $PrivDropToGroup adm
    $WorkDirectory /var/spool/rsyslog
    ```

2. `/etc/rsyslog.d/datadog.conf` ファイルを作成します。

3. `/etc/rsyslog.d/datadog.conf` に、以下の構成を追加します。監視したいログファイルごとに、別々の `Input` スタンザを記述する必要があります。

    ```conf
    ## Input for FILE1
    $InputFileName /<PATH_TO_FILE1>
    $InputFileTag <APP_NAME_OF_FILE1>
    $InputFileStateFile <UNIQUE_FILE_ID>
    $InputFileSeverity info
    $InputRunFileMonitor

    ## Set the Datadog Format to send the logs
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - - %msg%\n"
    ```

4. Rsyslog を再起動します。新しいログが Datadog アカウントへ直接転送されます。

    ```shell
    sudo systemctl restart rsyslog
    ```

5. ログをホストのメトリクスおよびタグと関連付けます。

   ログを Datadog アカウント内の同一のホストのメトリクスおよびタグと関連付けるには、 `rsyslog.conf` で Datadog メトリクスのホスト名と一致するように `HOSTNAME` を設定します。

   - `datadog.conf` または `datadog.yaml` でホスト名を指定している場合は、`rsyslog.conf` の `%HOSTNAME%` をホスト名に合わせて置き換えます。
   - `datadog.conf` または `datadog.yaml` でホスト名を指定していない場合は、何も変更する必要はありません。

6. Datadog でログを最大限に活用するために、ログのソースを設定します。
   - [Datadog Agent にログを転送する][1]場合、Agent のコンフィギュレーションファイルでソースを設定することができます。
   - Datadog Agent にログを転送しない場合は、`/etc/rsyslog.d/` に各ソース用の個別のコンフィギュレーションファイルを作成します。

   ソースを設定するには、以下の形式を使用します (ソースが複数ある場合は、ファイルごとに形式の名前を変えてください)。

   ```conf
   $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\"] %msg%\n"
   ```

   `ddtags` 属性を使用してカスタムタグを追加することもできます。

   ```conf
   $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\" ddtags=\"env:dev,<KEY:VALUE>\"] %msg%\n"
   ```

7. (任意) Datadog は、非アクティブな状態が一定時間続くと、非アクティブな接続を切断します。Rsyslog の一部のバージョンは、必要に応じて再接続を行うことができません。この問題を軽減するには、タイムマーカーを使用して、接続が切断されないようにします。

   1. Rsyslog のコンフィギュレーションに以下の 2 行を追加します。

      ```conf
      $ModLoad immark
      $MarkMessagePeriod 20
      ```

   2. Rsyslog サービスを再起動します。

      ```shell
      sudo systemctl restart rsyslog
      ```

{{% site-region region="us" %}}
8. (オプション) Rsyslog から Datadog アカウントに送信されるログに TLS Encryption を追加します。

    1. `rsyslog-gnutls` と `ca-certificates` パッケージをインストールします。

        ```shell
        sudo yum install rsyslog-gnutls ca-certificates
        ```

    2. 以下の行を `/etc/rsyslog.d/datadog.conf` ファイルの末尾に追加します。

        ```conf
        #Define the destination for the logs
        $DefaultNetstreamDriverCAFile /etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem
        $ActionSendStreamDriver gtls
        $ActionSendStreamDriverMode 1
        $ActionSendStreamDriverAuthMode x509/name
        $ActionSendStreamDriverPermittedPeer *.logs.datadoghq.com
        *.* @@intake.logs.datadoghq.com:10516;DatadogFormat
        ```
   3. Rsyslog サービスを再起動します。

      ```shell
      sudo systemctl restart rsyslog
      ```
{{% /site-region %}}

{{% site-region region="eu" %}}
8. (オプション) Rsyslog から Datadog アカウントに送信されるログに TLS Encryption を追加します。

    1. `rsyslog-gnutls` と `ca-certificates` パッケージをインストールします。

        ```shell
        sudo yum install rsyslog-gnutls ca-certificates
        ```

    2. 以下の行を `/etc/rsyslog.d/datadog.conf` ファイルの末尾に追加します。

        ```conf
        #Define the destination for the logs

        $DefaultNetstreamDriverCAFile /etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem
        $ActionSendStreamDriver gtls
        $ActionSendStreamDriverMode 1
        $ActionSendStreamDriverAuthMode x509/name
        $ActionSendStreamDriverPermittedPeer *.logs.datadoghq.eu
        *.* @@tcp-intake.logs.datadoghq.eu:443;DatadogFormat
        ```
   3. Rsyslog サービスを再起動します。

      ```shell
      sudo systemctl restart rsyslog
      ```
{{% /site-region %}}

[1]: /ja/agent/logs/
{{< /tabs >}}

{{% tab "Fedora" %}}
1. 特定のログファイルを監視するために `imfile` モジュールを有効にします。`imfile` モジュールを追加するには、`rsyslog.conf` に以下を追加します。

    ```conf
    $ModLoad imfile
    $InputFilePollInterval 10
    $PrivDropToGroup adm
    $WorkDirectory /var/spool/rsyslog
    ```

2. `/etc/rsyslog.d/datadog.conf` ファイルを作成します。

3. `/etc/rsyslog.d/datadog.conf` に、以下の構成を追加します。監視したいログファイルごとに、別々の `Input` スタンザを記述する必要があります。

    ```conf
    ## Input for FILE1
    $InputFileName /<PATH_TO_FILE1>
    $InputFileTag <APP_NAME_OF_FILE1>
    $InputFileStateFile <UNIQUE_FILE_ID>
    $InputFileSeverity info
    $InputRunFileMonitor

    ## Set the Datadog Format to send the logs
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - - %msg%\n"
    ```

4. Rsyslog を再起動します。新しいログが Datadog アカウントへ直接転送されます。

    ```shell
    sudo systemctl restart rsyslog
    ```

5. ログをホストのメトリクスおよびタグと関連付けます。

   ログを Datadog アカウント内の同一のホストのメトリクスおよびタグと関連付けるには、 `rsyslog.conf` で Datadog メトリクスのホスト名と一致するように `HOSTNAME` を設定します。

   - `datadog.conf` または `datadog.yaml` でホスト名を指定している場合は、`rsyslog.conf` の `%HOSTNAME%` をホスト名に合わせて置き換えます。
   - `datadog.conf` または `datadog.yaml` でホスト名を指定していない場合は、何も変更する必要はありません。

6. Datadog でログを最大限に活用するために、ログのソースを設定します。
   - [Datadog Agent にログを転送する][1]場合、Agent のコンフィギュレーションファイルでソースを設定することができます。
   - Datadog Agent にログを転送しない場合は、`/etc/rsyslog.d/` に各ソース用の個別のコンフィギュレーションファイルを作成します。

   ソースを設定するには、以下の形式を使用します (ソースが複数ある場合は、ファイルごとに形式の名前を変えてください)。

   ```conf
   $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\"] %msg%\n"
   ```

   `ddtags` 属性を使用してカスタムタグを追加することもできます。

   ```conf
   $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\" ddtags=\"env:dev,<KEY:VALUE>\"] %msg%\n"
   ```

7. (任意) Datadog は、非アクティブな状態が一定時間続くと、非アクティブな接続を切断します。Rsyslog の一部のバージョンは、必要に応じて再接続を行うことができません。この問題を軽減するには、タイムマーカーを使用して、接続が切断されないようにします。

   1. Rsyslog のコンフィギュレーションに以下の 2 行を追加します。

      ```conf
      $ModLoad immark
      $MarkMessagePeriod 20
      ```

   2. Rsyslog サービスを再起動します。

      ```shell
      sudo systemctl restart rsyslog
      ```

{{% site-region region="us" %}}
8. (オプション) Rsyslog から Datadog アカウントに送信されるログに TLS Encryption を追加します。

    1. `rsyslog-gnutls` と `ca-certificates` パッケージをインストールします。

        ```shell
        sudo dnf install rsyslog-gnutls ca-certificates
        ```

    2. 以下の行を `/etc/rsyslog.d/datadog.conf` ファイルの末尾に追加します。

        ```conf
        #Define the destination for the logs
        $DefaultNetstreamDriverCAFile /etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem
        $ActionSendStreamDriver gtls
        $ActionSendStreamDriverMode 1
        $ActionSendStreamDriverAuthMode x509/name
        $ActionSendStreamDriverPermittedPeer *.logs.datadoghq.com
        *.* @@intake.logs.datadoghq.com:10516;DatadogFormat
        ```
   3. Rsyslog サービスを再起動します。

      ```shell
      sudo systemctl restart rsyslog
      ```
{{% /site-region %}}

{{% site-region region="eu" %}}

8. (オプション) Rsyslog から Datadog アカウントに送信されるログに TLS Encryption を追加します。

    1. `rsyslog-gnutls` と `ca-certificates` パッケージをインストールします。

        ```shell
        sudo dnf install rsyslog-gnutls ca-certificates
        ```

    2. 以下の行を `/etc/rsyslog.d/datadog.conf` ファイルの末尾に追加します。

        ```conf
        #Define the destination for the logs

        $DefaultNetstreamDriverCAFile /etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem
        $ActionSendStreamDriver gtls
        $ActionSendStreamDriverMode 1
        $ActionSendStreamDriverAuthMode x509/name
        $ActionSendStreamDriverPermittedPeer *.logs.datadoghq.eu
        *.* @@tcp-intake.logs.datadoghq.eu:443;DatadogFormat
        ```
   3. Rsyslog サービスを再起動します。

      ```shell
      sudo systemctl restart rsyslog
      ```
{{% /site-region %}}

[1]: /ja/agent/logs/
{{< /tabs >}}

{{< /tabs >}}

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][1]までお問合せください。


[1]: /ja/help/