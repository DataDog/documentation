---
aliases:
- /ko/logs/log_collection/rsyslog
categories:
- 로그 수집
custom_kind: integration
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/rsyslog.md
description: Rsyslog를 설정하여 호스트, 컨테이너 및 서비스에서 로그를 수집하세요.
doc_link: /integrations/rsyslog/
further_reading:
- link: https://www.datadoghq.com/architecture/using-rsyslog-to-send-logs-to-datadog/
  tag: 아키텍처 센터
  text: Rsyslog를 사용해 Datadog에 로그 전송하기
has_logo: true
integration_id: rsyslog
integration_title: rsyslog
is_public: true
name: rsyslog
public_title: Datadog-Rsyslog 통합
short_description: Rsyslog를 설정하여 호스트, 컨테이너 및 서비스에서 로그를 수집하세요.
supported_os:
- 리눅스
title: Rsyslog
---

## 개요

Rsyslog를 설정하여 호스트, 컨테이너 및 서비스에서 로그를 수집하세요.

## 설정

### 로그 수집

#### Rsyslog 버전 8 이상
<div class="alert alert-info"><a href="https://www.rsyslog.com/doc/configuration/modules/imfile.html#mode">8.1.5 버전부터 </a> Rsyslog에서는 <code>inotify</code> 모드를 권장합니다. 이전에는 <code>imfile</code>이 폴링 모드를 사용했으며 해당 모드는 <code>inotify</code> 모드보다 더 리소스 집약적이므로 더 느릴 수 있었습니다. </div>

{{< tabs >}}

{{% tab "Ubuntu and Debian" %}}

1. 특정 로그 파일을 모니터링하려면 `imfile` 모듈을 활성화합니다. `imfile` 모듈을 추가하려면  `rsyslog.conf`에 다음을 추가합니다.

    ```conf
    module(load="imfile" PollingInterval="10") #needs to be done just once
    ```

2. `/etc/rsyslog.d/datadog.conf` 파일을 생성합니다.

{{< site-region region="us,eu" >}}

3. `/etc/rsyslog.d/datadog.conf`에서 다음 설정을 추가하고  `<site_url>`을 **{{< region-param key="dd_site" >}}**로 대체합니다. `<API_KEY>`는 Datadog API 키로 대체합니다. 모니터링하려는 각 로그 파일에 대해 별도의 `input` 라인을 포함해야 합니다.

   ```conf
   ## For each file to send
   input(type="imfile" ruleset="infiles" Tag="<APP_NAME_OF_FILE1>" File="<PATH_TO_FILE1>")

   ## Set the Datadog Format to send the logs
   $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - - %msg%\n"

   ruleset(name="infiles") {
   action(type="omfwd" protocol="tcp" target="intake.logs.<site_url>" port="10514" template="DatadogFormat")
   }
   ```

{{< /site-region >}}

{{< site-region region="us3,us5,ap1,gov" >}}

3. `/etc/rsyslog.d/datadog.conf`에서 다음 설정을 추가합니다. `<site_url>`을 **{{< region-param key="dd_site" >}}**로, `<API_KEY>` 를 Datadog API 키로 대체합니다. 모니터링하려는 각 로그 파일에 대해 별도의 `input` 라인을 포함해야 합니다.

   ```conf
   ## For each file to send
   input(type="imfile" ruleset="infiles" Tag="<TAGS>" File="<PATH_TO_FILE1>")

   ## Set the Datadog Format to send the logs
   template(name="test_template" type="list") { constant(value="{") property(name="msg" outname="message" format="jsonfr") constant(value="}")}

   # include the omhttp module
   module(load="omhttp")

   ruleset(name="infiles") {
      action(type="omhttp" server="http-intake.logs.<site_url>" serverport="443" restpath="api/v2/logs" template="test_template" httpheaders=["DD-API-KEY: <API_KEY>", "Content-Type: application/json"])
   }
   ```
{{< /site-region >}}

4. Rsyslog를 다시 시작합니다. 새로운 로그가 Datadog 계정으로 바로 포워딩됩니다.
   ```shell
   sudo systemctl restart rsyslog
   ```

5. 로그를 호스트 메트릭과 태그에 연결합니다.

   로그가 Datadog 계정의 동일한 호스트에 있는 메트릭과 태그와 연결되도록 해야 합니다. `rsyslog.conf`에서 `HOSTNAME`을 설정하여 호스트명을 Datadog 메트릭과 일치시킵니다.
   - `datadog.conf` 또는 `datadog.yaml`에서 호스트명을 지정한 경우 `rsyslog.conf`의 `%HOSTNAME%` 값을 교체하여 호스트명와 일치시킵니다.
   - `datadog.conf` 또는 `datadog.yaml`에서 호스트명을 지정하지 않은 경우 아무 것도 변경하지 않아도 됩니다.

6. Datadog에서 로그를 최대한 활용하려면 로그에 대한 소스를 설정합니다.
   - [Datadog 에이전트][1]에 로그를 포워딩하는 경우 에이전트 설정 파일에서 소스를 설정할 수 있습니다.
   - Datadog 에이전트에 로그를 포워딩하지 않는 경우 `/etc/rsyslog.d/`에서 각 소스에 대한 별도의 설정 파일을 생성할 수 있습니다.

     소스를 설정하려면 다음 형식을 사용합니다(여러 소스가 있는 경우 각 파일 형식의 이름 변경).

     ```conf
     $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\"] %msg%\n"
     ```

     `ddtags` 속성을 사용해 커스텀 태그를 추가할 수도 있습니다.

     ```conf
     $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\" ddtags=\"env:dev,<KEY:VALUE>\"] %msg%\n"
     ```

7. (선택 사항) Datadog에서는 일정 기간의 비활성 상태 이후 비활성 연결을 차단합니다 Rsyslog 일부 버전은 필요 시 재연결을 할 수 없습니다. 이러한 문제를 방지하려면 시간 표시기를 사용하여 연결이 중단되지 않도록 하세요.

   1. Rsyslog 설정 파일에 다음 라인을 추가합니다.

      ```conf
      $ModLoad immark
      $MarkMessagePeriod 20
      ```

   2. Rsyslog 서비스를 다시 시작합니다.

      ```shell
      sudo systemctl restart rsyslog
      ```

{{% site-region region="us" %}}
8. (선택 사항) TLS 암호화를 Rsyslog에서 Datadog 계정으로 전송된 로그에 추가합니다.
   1. `rsyslog-gnutls` 및 `ca-certificates` 패키지를 설치합니다.
      ```shell
      sudo apt-get install rsyslog-gnutls ca-certificates
      ```
   2. `/etc/rsyslog.d/datadog.conf` 파일 아래에 다음 라인을 추가합니다.
      ```conf
      ## Define the destination for the logs
      $DefaultNetstreamDriverCAFile /etc/ssl/certs/ca-certificates.crt
      ruleset(name="infiles") {
          action(type="omfwd" protocol="tcp" target="intake.logs.datadoghq.com" port="10516" template="DatadogFormat" StreamDriver="gtls" StreamDriverMode="1" StreamDriverAuthMode="x509/name" StreamDriverPermittedPeers="*.logs.datadoghq.com" )
      }
      ```
   3. Rsyslog 서비스를 다시 시작합니다.

      ```shell
      sudo systemctl restart rsyslog
      ```
{{% /site-region %}}
{{% site-region region="eu" %}}

8. (선택 사항) Rsyslog에서 Datadog 계정으로 전송된 로그에 TLS 암호화를 추가합니다.
   1. `rsyslog-gnutls` 및 `ca-certificates` 패키지를 설치합니다.
      ```shell
      sudo apt-get install rsyslog-gnutls ca-certificates
      ```

   2. `/etc/rsyslog.d/datadog.conf` 파일 아래에 다음 줄을 추가합니다.
      ```conf
      ## Define the destination for the logs
      $DefaultNetstreamDriverCAFile /etc/ssl/certs/ca-certificates.crt
      ruleset(name="infiles") {
          action(type="omfwd" protocol="tcp" target="tcp-intake.logs.datadoghq.eu" port="443" template="DatadogFormat" StreamDriver="gtls" StreamDriverMode="1" StreamDriverAuthMode="x509/name" StreamDriverPermittedPeers="*.logs.datadoghq.eu" )
      }
       ```
   3. Rsyslog 서비스를 다시 시작합니다.

      ```shell
      sudo systemctl restart rsyslog
      ```
{{% /site-region %}}

[1]: /ko/agent/logs/
{{% /tab %}}

{{% tab "Amazon Linux, CentOS, and Red Hat" %}}
1. `imfile` 모듈을 활성화하여 특정 로그 파일을 모니터링합니다. `imfile` 모듈을 추가하려면 다음을  `rsyslog.conf`에 추가합니다.

    ```conf
    module(load="imfile" PollingInterval="10") #needs to be done just once
    ```

2. `/etc/rsyslog.d/datadog.conf` 파일을 생성합니다.

{{< site-region region="us,eu" >}}

3. `/etc/rsyslog.d/datadog.conf`에서 다음 설정을 추가합니다. `<site_url>`을 **{{< region-param key="dd_site" >}}**로, `<API_KEY>`를 Datadog API 키로 대체합니다. 모니터링하려는 각 로그 파일에 대해 별도의 `input` 라인을 포함해야 합니다.

   ```conf
   ## For each file to send
   input(type="imfile" ruleset="infiles" Tag="<APP_NAME_OF_FILE1>" File="<PATH_TO_FILE1>")

   ## Set the Datadog Format to send the logs
   $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - - %msg%\n"

   ruleset(name="infiles") {
   action(type="omfwd" protocol="tcp" target="intake.logs.<site_url>" port="10514" template="DatadogFormat")
   }
   ```

{{< /site-region >}}

{{< site-region region="us3,us5,ap1,gov" >}}

3. `/etc/rsyslog.d/datadog.conf`에서 다음 설정을 추가합니다. `<site_url>`을 **{{< region-param key="dd_site" >}}**로, `<API_KEY>`를 Datadog API 키로 대체합니다. 모니터링하려는 각 로그 파일에 대해 별도의 `input` 라인을 포함해야 합니다.

   ```conf
   ## For each file to send
   input(type="imfile" ruleset="infiles" Tag="<TAGS>" File="<PATH_TO_FILE1>")

   ## Set the Datadog Format to send the logs
   template(name="test_template" type="list") { constant(value="{") property(name="msg" outname="message" format="jsonfr") constant(value="}")}

   # include the omhttp module
   module(load="omhttp")

   ruleset(name="infiles") {
      action(type="omhttp" server="http-intake.logs.<site_url>" serverport="443" restpath="api/v2/logs" template="test_template" httpheaders=["DD-API-KEY: <API_KEY>", "Content-Type: application/json"])
   }
   ```
{{< /site-region >}}

4. Rsyslog를 다시 시작합니다. 새로운 로그가 Datadog 계정으로 바로 포워딩됩니다.
   ```shell
   sudo systemctl restart rsyslog
   ```

5. 로그를 호스트 메트릭과 태그에 연결합니다.

   로그가 Datadog 계정의 동일한 호스트에 있는 메트릭과 태그와 연결되도록 해야 합니다. `rsyslog.conf`에서 `HOSTNAME`을 설정하여 호스트명을 Datadog 메트릭과 일치시킵니다.
   - `datadog.conf` 또는 `datadog.yaml`에서 호스트명을 지정한 경우 `rsyslog.conf`의 `%HOSTNAME%` 값을 교체하여 호스트명와 일치시킵니다.
   - `datadog.conf` 또는 `datadog.yaml`에서 호스트명을 지정하지 않은 경우 아무 것도 변경하지 않아도 됩니다.

6. Datadog에서 로그를 최대한 활용하려면 로그에 대한 소스를 설정합니다.
   - [Datadog 에이전트][1]에 로그를 포워딩하는 경우 에이전트 설정 파일에서 소스를 설정할 수 있습니다.
   - Datadog 에이전트에 로그를 포워딩하지 않는 경우 `/etc/rsyslog.d/`에서 각 소스에 대한 별도의 설정 파일을 생성할 수 있습니다.

     소스를 설정하려면 다음 형식을 사용합니다(여러 소스가 있는 경우 각 파일 형식의 이름 변경).

     ```conf
     $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\"] %msg%\n"
     ```

     `ddtags` 속성을 사용해 커스텀 태그를 추가할 수도 있습니다.

     ```conf
     $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\" ddtags=\"env:dev,<KEY:VALUE>\"] %msg%\n"
     ```

7. (선택 사항) Datadog에서는 일정 기간의 비활성 상태 이후 비활성 연결을 차단합니다 Rsyslog 일부 버전은 필요 시 재연결을 할 수 없습니다. 이러한 문제를 방지하려면 시간 표시기를 사용하여 연결이 중단되지 않도록 하세요.

   1. Rsyslog 설정 파일에 다음 두 라인을 추가합니다.

      ```conf
      $ModLoad immark
      $MarkMessagePeriod 20
      ```

   2. Rsyslog 서비스를 다시 시작합니다.

      ```shell
      sudo systemctl restart rsyslog
      ```

{{% site-region region="us" %}}
8. (선택 사항) Rsyslog에서 Datadog 계정으로 전송된 로그에 TLS 암호화를 추가합니다.
   1. `rsyslog-gnutls` 및 `ca-certificates` 패키지를 설치합니다.
      ```shell
      sudo yum install rsyslog-gnutls ca-certificates
      ```
   2. `/etc/rsyslog.d/datadog.conf` 파일 아래에 다음 줄을 추가합니다.
      ```conf
      ## Define the destination for the logs
      $DefaultNetstreamDriverCAFile /etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem
      ruleset(name="infiles") {
          action(type="omfwd" protocol="tcp" target="intake.logs.datadoghq.com" port="10516" template="DatadogFormat" StreamDriver="gtls" StreamDriverMode="1" StreamDriverAuthMode="x509/name" StreamDriverPermittedPeers="*.logs.datadoghq.com" )
      }
      ```
   3. Rsyslog 서비스를 다시 시작합니다.

      ```shell
      sudo systemctl restart rsyslog
      ```
{{% /site-region %}}

{{% site-region region="eu" %}}

8. (선택 사항) Rsyslog에서 Datadog 계정으로 전송된 로그에 TLS 암호화를 추가합니다.
   1. `rsyslog-gnutls` 및 `ca-certificates` 패키지를 설치합니다.
      ```shell
      sudo yum install rsyslog-gnutls ca-certificates
      ```

   2. `/etc/rsyslog.d/datadog.conf` 파일 아래에 다음 줄을 추가합니다.
      ```conf
      ## Define the destination for the logs
      $DefaultNetstreamDriverCAFile /etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem
      ruleset(name="infiles") {
          action(type="omfwd" protocol="tcp" target="tcp-intake.logs.datadoghq.eu" port="443" template="DatadogFormat" StreamDriver="gtls" StreamDriverMode="1" StreamDriverAuthMode="x509/name" StreamDriverPermittedPeers="*.logs.datadoghq.eu" )
      }
       ```
   3. Rsyslog 서비스를 다시 시작합니다.

      ```shell
      sudo systemctl restart rsyslog
      ```
{{% /site-region %}}

[1]: /ko/agent/logs/
{{% /tab %}}

{{% tab "Fedora" %}}
1. `imfile` 모듈을 활성화하여 특정 로그 파일을 모니터링합니다. `imfile` 모듈을 추가하려면 다음을  `rsyslog.conf`에 추가합니다.

    ```conf
    module(load="imfile" PollingInterval="10") #needs to be done just once
    ```

2. `/etc/rsyslog.d/datadog.conf` 파일을 생성합니다.


{{< site-region region="us,eu" >}}

3. `/etc/rsyslog.d/datadog.conf`에서 다음 설정을 추가합니다. `<site_url>`을 **{{< region-param key="dd_site" >}}**로, `<API_KEY>`를 Datadog API 키로 대체합니다. 모니터링하려는 각 로그 파일에 대해 별도의 `input` 라인을 포함해야 합니다.

   ```conf
   ## For each file to send
   input(type="imfile" ruleset="infiles" Tag="<APP_NAME_OF_FILE1>" File="<PATH_TO_FILE1>")

   ## Set the Datadog Format to send the logs
   $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - - %msg%\n"

   ruleset(name="infiles") {
   action(type="omfwd" protocol="tcp" target="intake.logs.<site_url>" port="10514" template="DatadogFormat")
   }
   ```

{{< /site-region >}}

{{< site-region region="us3,us5,ap1,gov" >}}

3. `/etc/rsyslog.d/datadog.conf`에서 다음 설정을 추가합니다. `<site_url>`을 **{{< region-param key="dd_site" >}}**로, `<API_KEY>`를 Datadog API 키로 대체합니다. 모니터링하려는 각 로그 파일에 대해 별도의 `input` 라인을 포함해야 합니다.

   ```conf
   ## For each file to send
   input(type="imfile" ruleset="infiles" Tag="<TAGS>" File="<PATH_TO_FILE1>")

   ## Set the Datadog Format to send the logs
   template(name="test_template" type="list") { constant(value="{") property(name="msg" outname="message" format="jsonfr") constant(value="}")}

   # include the omhttp module
   module(load="omhttp")

   ruleset(name="infiles") {
      action(type="omhttp" server="http-intake.logs.<site_url>" serverport="443" restpath="api/v2/logs" template="test_template" httpheaders=["DD-API-KEY: <API_KEY>", "Content-Type: application/json"])
   }
   ```
{{< /site-region >}}

4. Rsyslog를 다시 시작합니다. 새로운 로그가 Datadog 계정으로 바로 포워딩됩니다.
   ```shell
   sudo systemctl restart rsyslog
   ```

5. 로그를 호스트 메트릭과 태그에 연결합니다.

   로그가 Datadog 계정의 동일한 호스트에 있는 메트릭과 태그와 연결되도록 해야 합니다. `rsyslog.conf`에서 `HOSTNAME`을 설정하여 호스트명을 Datadog 메트릭과 일치시킵니다.
   - `datadog.conf` 또는 `datadog.yaml`에서 호스트명을 지정한 경우 `rsyslog.conf`의 `%HOSTNAME%` 값을 교체하여 호스트명와 일치시킵니다.
   - `datadog.conf` 또는 `datadog.yaml`에서 호스트명을 지정하지 않은 경우 아무 것도 변경하지 않아도 됩니다.

6. Datadog에서 로그를 최대한 활용하려면 로그에 대한 소스를 설정합니다.
   - [Datadog 에이전트][1]에 로그를 포워딩하는 경우 에이전트 설정 파일에서 소스를 설정할 수 있습니다.
   - Datadog 에이전트에 로그를 포워딩하지 않는 경우 `/etc/rsyslog.d/`에서 각 소스에 대한 별도의 설정 파일을 생성할 수 있습니다.

     소스를 설정하려면 다음 형식을 사용합니다(여러 소스가 있는 경우 각 파일 형식의 이름 변경).

     ```conf
     $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\"] %msg%\n"
     ```

     `ddtags` 속성을 사용해 커스텀 태그를 추가할 수도 있습니다.

     ```conf
     $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\" ddtags=\"env:dev,<KEY:VALUE>\"] %msg%\n"
     ```

7. (선택 사항) Datadog에서는 일정 기간의 비활성 상태 이후 비활성 연결을 차단합니다 Rsyslog 일부 버전은 필요 시 재연결을 할 수 없습니다. 이러한 문제를 방지하려면 시간 표시기를 사용하여 연결이 중단되지 않도록 하세요.

   1. Rsyslog 설정 파일에 다음 두 라인을 추가합니다.

      ```conf
      $ModLoad immark
      $MarkMessagePeriod 20
      ```

   2. Rsyslog 서비스를 다시 시작합니다.

      ```shell
      sudo systemctl restart rsyslog
      ```

{{% site-region region="us" %}}
8. (선택 사항) Rsyslog에서 Datadog 계정으로 전송된 로그에 TLS 암호화를 추가합니다.
   1. `rsyslog-gnutls` 및 `ca-certificates` 패키지를 설치합니다.
      ```shell
      sudo dnf install rsyslog-gnutls ca-certificates
      ```
   2. `/etc/rsyslog.d/datadog.conf` 파일 아래에 다음 줄을 추가합니다.
      ```conf
      ## Define the destination for the logs
      $DefaultNetstreamDriverCAFile /etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem
      ruleset(name="infiles") {
          action(type="omfwd" protocol="tcp" target="intake.logs.datadoghq.com" port="10516" template="DatadogFormat" StreamDriver="gtls" StreamDriverMode="1" StreamDriverAuthMode="x509/name" StreamDriverPermittedPeers="*.logs.datadoghq.com" )
      }
      ```
   3. Rsyslog 서비스를 다시 시작합니다.

      ```shell
      sudo systemctl restart rsyslog
      ```
{{% /site-region %}}

{{% site-region region="eu" %}}

8. (선택 사항) Rsyslog에서 Datadog 계정으로 전송된 로그에 TLS 암호화를 추가합니다.
   1. `rsyslog-gnutls` 및 `ca-certificates` 패키지를 설치합니다.
      ```shell
      sudo dnf install rsyslog-gnutls ca-certificates
      ```

   2. `/etc/rsyslog.d/datadog.conf` 파일 아래에 다음 줄을 추가합니다.
      ```conf
      ## Define the destination for the logs
      $DefaultNetstreamDriverCAFile /etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem
      ruleset(name="infiles") {
          action(type="omfwd" protocol="tcp" target="tcp-intake.logs.datadoghq.eu" port="443" template="DatadogFormat" StreamDriver="gtls" StreamDriverMode="1" StreamDriverAuthMode="x509/name" StreamDriverPermittedPeers="*.logs.datadoghq.eu" )
      }
       ```
   3. Rsyslog 서비스를 다시 시작합니다.

      ```shell
      sudo systemctl restart rsyslog
      ```
{{% /site-region %}}

[1]: /ko/agent/logs/
{{% /tab %}}

{{< /tabs >}}

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객지원][1]에 연락하세요.

[1]: /ko/help/