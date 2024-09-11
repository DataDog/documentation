---
categories:
- 로그 수집
custom_kind: 통합
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/fluentbit.md
description: Fluent Bit을 구성해 여러 소스에서 로그 데이터를 수집, 파싱, 전달하기.
doc_link: /integrations/fluentbit/
further_reading:
- link: https://www.datadoghq.com/blog/fluentbit-integration-announcement/
  tag: 블로그
  text: Datadog와 Fluent Bit으로 로그를 중앙 집중화
has_logo: true
integration_id: fluentbit
integration_title: Fluent Bit
is_public: true
name: fluentbit
public_title: Datadog-Fluent Bit 통합
short_description: 여러 소스에서 데이터를 수집, 파싱, 전달하기.
title: Fluent Bit
---

## 개요

Fluent Bit을 구성해 여러 소스에서 로그 데이터를 수집, 파싱, 전달해 Datadog에서 모니터링할 수 있습니다. Fluent Bit은 메모리 공간 크기가 작기 때문에(~450KB) 리소스가 제한된 환경에서 로그를 수집할 때 사용할 수 있습니다(예: 컨테이너화된 서비스와 임베디드 Linux 시스템). [Datadog의 Fluent Bit 출력 플러그인][1]은 Fluent Bit v1.3.0+를 지원합니다.

## 설정

호스트에서 Fluent Bit을 구성하려면 다음 지침을 참고하세요. Amazon ECS의 경우에는 [ECS Fluent Bit 및 FireLens][2]를 참고하세요.

### 로그 수집

시작하려면 [Datadog 계정][3]과 [Datadog API 키][4]가 필요하고 [Datadog 로그 관리를 활성화][5]해야 합니다.

1. 구성 파일의 추천 방법을 사용해 Fluent Bit을 [설치][6] 및 [구성][7]하세요.
2. [Fluent Bit 구성 파일][8]을 업데이트해 Datadog를 출력 플러그인으로 추가하세요. 구성 파라미터와 관련한 자세한 내용을 보려면 [구성 파라미터 테이블](#configuration-parameters)을 참고하세요. `[OUTPUT]` 구성 섹션 예시를 보려면 [구성 파일 예시](#configuration-file-example)를 참고하세요.
3. Fluent Bit에서 로그를 전송하기 시작하면 [Datadog Logs Explorer 페이지][9]에서 로그를 확인할 수 있습니다.

#### 구성 파라미터

| 키            | 설명                                                                                                                                                                                                                                                                                                                 | 기본                                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------------------------                                                                                                                                                                                                    | --------------------------------------------------------------------------- |
| 호스트           | _필수_ - 로그를 전송하는 Datadog 서버                                                                                                                                                                                                                                                            | {{< region-param key="http_endpoint" code="true" >}}                        |
| TLS            | _필수_ - 엔드 투 엔드 보안 통신 보안 프로토콜. `on`으로 설정해야 함.                                                                                                                                                                                                                        | `off`                                                                       |
| apikey         | _필수_ - 내 [Datadog API 키][4]                                                                                                                                                                                                                                                                                     |                                                                             |
| 압축       | _추천_ - 페이로드를 GZIP 형식으로 압축. Datadog에서는 `gzip`로 설정하기를 추천하며, 이 형식을 지원함.                                                                                                                                                                                                              |                                                                             |
| dd_service     | _추천_ - 서비스를 생성하는 로그의 사람이 읽을 수 있는 이름 - 내 애플리케이션 또는 데이터베이스 이름                                                                                                                                                                                                    |                                                                             |
| dd_source      | _추천_ - 내 서비스 기본 기술의 사람이 읽을 수 있는 이름(예: `postgres` 또는 `nginx`)                                                                                                                                                                                                    |                                                                             |
| dd_message_key | _추천_ - 로그 메시지를 저장할 때 사용할 속성 설정                                                                                                                                                                                                                                                         |                                                                             |
| dd_tags        | _선택 사항_ - Datadog에서 로그에 할당하고자 하는 [태그][10]                                                                                                                                                                                                                                                     |                                                                             |
| dd_hostname    | _선택 사항_ - 로그를 전송하고 연결되어야 할 호스트. 설정하지 않으면 Datadog에서 [표준 호스트 속성][12]의 하나로 설정함
| 공급자       | _선택 사항_ - 사용할 공급자. Fargate Tasks에서 Datadog로 로그를 전송하려면 `ecs`로 설정                                                                                                                                                                                                            |                                                                             |

#### 구성 파일 예시

```text
[OUTPUT]
    Name              datadog
    Match             *
    Host              http-intake.logs.datadoghq.com
    TLS               on
    compress          gzip
    apikey            <DATADOG_API_KEY>
    dd_service        <APPLICATION_SERVICE>
    dd_source         <SOURCE>
    dd_message_key    log
    dd_tags           env:dev,<TAG_KEY>:<TAG_VALUE>
```

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][11]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.fluentbit.io/manual/output/datadog
[2]: /ko/integrations/ecs_fargate/?tab=webui#fluent-bit-and-firelens
[3]: https://app.datadoghq.com/signup
[4]: /ko/account_management/api-app-keys/
[5]: https://app.datadoghq.com/logs/activation
[6]: https://docs.fluentbit.io/manual/installation/sources/build-and-install
[7]: https://docs.fluentbit.io/manual/administration/configuring-fluent-bit
[8]: https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/classic-mode/configuration-file
[9]: https://app.datadoghq.com/logs
[10]: /ko/getting_started/tagging/
[11]: /ko/help/
[12]: /ko/logs/log_configuration/pipelines/?tab=host#preprocessing