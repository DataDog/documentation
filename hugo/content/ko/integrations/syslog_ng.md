---
aliases:
- /ko/logs/log_collection/syslog_ng
categories:
- 로그 수집
custom_kind: 통합
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/syslog_ng.md
description: 호스트, 컨테이너, 서비스에서 로그를 수집하도록 Syslog-ng 구성하기
doc_link: /integrations/syslog_ng/
has_logo: true
integration_id: syslog_ng
integration_title: syslog_ng
is_public: true
name: syslog_ng
public_title: Datadog-Syslog-ng 통합
short_description: 호스트, 컨테이너, 서비스에서 로그를 수집하도록 Syslog-ng 구성하기
supported_os:
- linux
- 윈도우즈(Windows)
title: Syslog-ng
---

## 개요

호스트, 컨테이너, 서비스에서 로그를 수집하도록 Syslog-ng 구성하기

## 설정

### 로그 수집

1. `/etc/syslog-ng/syslog-ng.conf`에서 시스템 로그와 로그 파일을 수집하고 소스가 정확하게 정의되어 있는지 확인합니다.

    ```conf
    source s_src {
    system();
    internal();

    };
    ```

   파일을 모니터링하고 싶을 경우 다음 소스를 추가합니다.

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

2. 올바른 로그 형식을 설정합니다.

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

3. 경로 섹션에 경로를 정의합니다.

    ```conf
    #########################
    # Log Path
    #########################

    ...

    log { source(s_src); source(s_files); destination(d_datadog); };
    ```

4. Syslog-ng을 재시작합니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객지원][2]에 문의하세요.

[1]: https://syslog-ng.com/documents/html/syslog-ng-ose-latest-guides/en/syslog-ng-ose-guide-admin/html/tlsoptions.html
[2]: /ko/help/