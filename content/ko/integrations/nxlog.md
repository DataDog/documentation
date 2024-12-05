---
aliases:
- /ko/logs/log_collection/nxlog
categories:
- log collection
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/nxlog.md
description: 호스트, 컨테이너, 서비스에서 로그를 수집하도록 NXLog를 설정하세요.
doc_link: /integrations/nxlog/
has_logo: true
integration_id: nxlog
integration_title: nxlog
is_public: true
custom_kind: integration
name: nxlog
public_title: Datadog-NXlog 통합
short_description: 호스트, 컨테이너, 서비스에서 로그를 수집하도록 NXLog를 설정하세요.
supported_os:
- windows
title: NXLog
---

## 개요

호스트, 컨테이너, 서비스에서 로그를 수집하도록 NXLog를 설정하세요.

## 설정

### 로그 수집

{{< tabs >}}
{{% tab "Datadog US 사이트" %}}

1. 로그를 Datadog 플랫폼으로 보내도록 NXLog를 설정하고 `C:\Program Files\nxlog\conf`에서 전체 파일을 다음으로 변경하세요.

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

   형식에서 `<DATADOG_API_KEY>`를 반드시 교체하세요. 

2. 모니터링하려는 각 파일에 대해 NXLog watchfile 모듈을 활성화하고 출력 섹션 앞에 다음을 추가합니다.

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

3. 해당 파일이 출력 섹션에 연결되어 있는지 확인하세요.

    ```conf
    <Route file1>
        Path    FILE_WATCH_1,FILE_WATCH_2,... => out
    </Route>
    ```

4. NXLog를 다시 시작하고 서비스 관리 도구를 엽니다.

    ```text
    C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Administrative Tools\Services.lnk
    ```

5. (선택 사항) 추가 파라미터 또는 태그를 설정합니다. NXLog 설정 파일의 각 입력 섹션에 있는 로그에 특정 속성을 추가하세요. 예를 들어 로그가 파생된 통합을 식별하기 위해 Datadog에서 사용되는 소스를 지정하려면 다음을 사용합니다.

    ```conf
    Exec        $ddsource = 'mysourcevalue';
    Exec        $ddtags = 'env:test,<KEY>:<VALUE>';
    ```

### NXLog TLS 암호화

1. [CA 인증서][1] 다운로드

2. 포트 10516을 통한 보안 전송을 활성화하려면 NXLog 설정에 `om_ssl` 모듈을 추가하세요.

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
{{% tab "Datadog EU 사이트" %}}

1. 로그를 Datadog 플랫폼으로 보내도록 NXLog를 설정하고 `C:\Program Files\nxlog\conf`에서 전체 파일을 다음으로 변경하세요.

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

   형식에서 `<DATADOG_API_KEY>`를 반드시 교체하세요. 

2. 모니터링하려는 각 파일에 대해 NXLog watchfile 모듈을 활성화하고 출력 섹션 앞에 다음을 추가합니다.

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

3. 해당 파일이 출력 섹션에 연결되어 있는지 확인하세요.

    ```conf
    <Route file1>
        Path    FILE_WATCH_1,FILE_WATCH_2,... => out
    </Route>
    ```

4. NXLog를 다시 시작하고 서비스 관리 도구를 엽니다.

    ```text
    C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Administrative Tools\Services.lnk
    ```

5. (선택 사항) 추가 파라미터 또는 태그를 설정합니다. NXLog 설정 파일의 각 입력 섹션에 있는 로그에 특정 속성을 추가하세요. 예를 들어 로그가 파생된 통합을 식별하기 위해 Datadog에서 사용되는 소스를 지정하려면 다음을 사용합니다.

    ```conf
    Exec        $ddsource = 'mysourcevalue';
    Exec        $ddtags = 'env:test,<KEY>:<VALUE>';
    ```

### NXLog TLS 암호화

1. [CA 인증서][1] 다운로드

2. 포트 443을 통한 보안 전송을 활성화하려면 NXLog 설정에 `om_ssl` 모듈을 추가하세요.

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

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][1]에 문의하세요.

[1]: /ko/help/