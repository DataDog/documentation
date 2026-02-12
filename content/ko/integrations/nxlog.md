---
aliases:
- /ko/logs/log_collection/nxlog
categories:
- 로그 수집
custom_kind: 통합
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/nxlog.md
description: 호스트, 컨테이너, 서비스에서 로그를 수집하도록 NXLog를 설정하세요.
doc_link: /integrations/nxlog/
has_logo: true
integration_id: nxlog
integration_title: NXLog
is_public: true
name: nxlog
public_title: Datadog-NXlog 통합
short_description: 호스트, 컨테이너, 서비스에서 로그를 수집하도록 NXLog를 설정하세요.
supported_os:
- windows
title: NXLog
---

## 개요

호스트, 컨테이너, 서비스에서 로그를 수집하도록 NxLog 설정하기

## 설정

다음은 [TCP](#log-collection-over-tcp) 또는 [HTTP](#log-collection-over-http) 엔드포인트 및 [NxLog TLS 암호화](#nxlog-tls-encryption)를 통한 로그 수집 설정에 대한 간략한 설명입니다.

### TCP를 통한 로그 수집

{{< site-region region="us3,us5,ap1,gov" >}}
  <div class="alert alert-danger">TCP 엔드포인트는 선택한 <a href="/getting_started/site">Datadog 사이트</a> ({{< region-param key="dd_site_name" >}})에서 지원되지 않습니다. 로깅 엔드포인트 목록은 <a href="/logs/log_collection/?tab=tcp#additional-configuration-options">로그 수집 및 통합</a>을 참고하세요.</div>
{{< /site-region >}}


1. NxLog 로그를 Datadog 플랫폼으로 전송하도록 설정하려면 `C:\Program Files\nxlog\conf`의 전체 파일을 다음으로 변경합니다.

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

     `<DATADOG_API_KEY>` 형식으로 반드시 변경하세요.

2. 모니터링려는 각 파일에 대해 NxLog Watchfile 모듈을 활성화하고 아웃풋 섹션 앞에 다음을 추가합니다.

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

3. 해당 파일이 아웃풋 섹션에 플러그인되어 있는지 확인합니다.

    ```conf
    <Route file1>
        Path    FILE_WATCH_1,FILE_WATCH_2,... => out
    </Route>
    ```

4. NxLog를 재시작하고 서비스 관리 도구를 엽니다.

    ```text
    C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Administrative Tools\Services.lnk
    ```

5. (옵션) 추가 파라미터 또는 태그를 설정합니다. NxLog 설정 파일의 각 인풋 섹션에서 로그에 특정 속성을 추가합니다. 예를 들어, Datadog이 로그를 수집한 통합의 출처를 식별하는 데 사용되는 소스를 지정하려면 다음을 사용합니다.

    ```conf
    Exec        $ddsource = 'mysourcevalue';
    Exec        $ddtags = 'env:test,<KEY>:<VALUE>';
    ```

### HTTP를 통한 로그 수집

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
    ##HTTP output module
    <Output out>
        Module      om_http
        URL         {{< region-param key="http_endpoint" >}}
        Port        {{< region-param key="http_port" >}}
        Exec        to_syslog_ietf();
        Exec        $raw_event="<DATADOG_API_KEY> "+$raw_event;
    </Output>
    ############ ROUTES TO CHOOSE #####
    <Route 1>
        Path        syslogs => out
    </Route>
```

### NXLog TLS 암호화

1. [CA 인증서][1]를 다운로드합니다.

2. NxLog 설정에 `om_ssl` 모듈을 추가하여 포트 10516을 통한 보안 전송을 활성화합니다.

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


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객지원][2]에 문의하세요.

[1]: /resources/crt/ca-certificates.crt
[2]: /ko/help/