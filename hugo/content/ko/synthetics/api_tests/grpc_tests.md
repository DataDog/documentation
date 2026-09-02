---
algolia:
  category: 설명서
  rank: 70
  subcategory: 신서틱(Synthetic) API 테스트
  tags:
  - grpc
  - grpc 테스트
  - grpc 테스트
description: gRPC 요청을 시뮬레이션하여 공개 및 내부 API 엔드포인트를 모니터링합니다.
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: 블로그
  text: Datadog 신서틱(Synthetic) 모니터링 소개
- link: https://www.datadoghq.com/blog/grpc-health-check-datadog-synthetic-monitoring/
  tag: 블로그
  text: Datadog으로 gRPC API 모니터링하기
- link: https://learn.datadoghq.com/courses/intro-to-synthetic-tests
  tag: 학습 센터
  text: 신서틱(Synthetic) 테스트 소개
- link: /synthetics/multistep
  tag: 설명서
  text: 다단계 API 테스트로 gRPC 요청 체인 설정
- link: /synthetics/private_locations
  tag: 설명서
  text: 내부 엔드포인트에서 gRPC 테스트 실행
- link: /synthetics/guide/synthetic-test-monitors
  tag: 설명서
  text: 신서틱 테스트 모니터에 대해 알아보기
title: GRPC 테스트
---
## 개요

gRPC 테스트로 gRPC 서비스 및 서버를 사전 모니터링할 수 있습니다. 다음 두 가지 유형 중에서 선택할 수 있습니다.

동작 점검
:애플리케이션의 API 엔드포인트에 gRPC 요청을 전송하여 전체 응답 시간, 헤더 또는 본문 콘텐츠 등의 응답과 정의한 조건을 확인합니다.

서비스 상태 점검 
: gRPC 서비스 상태 점검은 gRPC 서비스 상태 보고의 기준이 됩니다. 본 점검으로 gRPC 서버와 서비스가 응답하고 실행 중이며 원격 프로시저 호출(RPC)을 처리할 수 있는지 확인합니다.<br><br>gRPC 서비스 상태 점검을 구현하면 Datadog에 `.proto` 파일을 제공하지 않아도 gRPC 서비스 상태 점검 테스트를 실행할 수 있습니다. 자세한 내용을 확인하려면 gRPC 커뮤니티가 공유한 [서비스 상태 점검 `.proto` 파일 예시][1]을 참조하세요.

gRPC 테스트는 네트워크 외부에서 또는 내부에서 실행할지 선호도에 따라 [관리 위치](#select-locations)와 [비공개 위치][2]에서 모두 실행할 수 있습니다. gRPC 테스트는 일정에 맞추어서, 온디맨드 또는 [CI/CD 파이프라인][3] 내에서 직접 실행할 수 있습니다.

## 설정 

다음 옵션 중 하나를 사용하여 테스트를 생성할 수 있습니다.

   - **템플릿에서 테스트 생성하기**:

       1. 사전에 채워진 템플릿 중 하나에 마우스를 올리고 **템플릿 보기**를 클릭합니다. 테스트 세부 정보, 요청 세부 정보, 어설션, 알림 조건 및 모니터링 설정이 포함된, 사전에 채워진 설정 정보가 표시되는 사이드 패널이 열립니다.
       2. **+테스트 생성하기**를 클릭하면 사전 입력된 설정 옵션을 검토하고 편집할 수 있는 **요청 정의** 페이지가 열립니다. 표시되는 필드는 테스트 초기 생성 시사용할 수 있는 필드와 동일합니다.
       3. **세부 정보 저장**을 클릭하여 API 테스트를 제출합니다.<br /><br>
          {{< img src="getting_started/synthetics/synthetics_templates_api_video.mp4" alt="템플릿을 사용한 Synthetics API 테스트 랜딩 페이지 영상" video="true" >}}

   - **테스트 처음부터 빌드하기**:

       1. 테스트를 처음부터 빌드하려면 **+처음부터 시작** 템플릿을 클릭한 다음 `gRPC` 요청 유형을 선택합니다.
       2. 테스트를 실행할 **호스트** 및 **포트**를 지정합니다. 기본 gRPC 포트는 `50051`입니다.
       3. 단항 호출(unary call)을 실행하려면 **동작 점검**을 선택하고, 서비스 상태 점검을 실행하려면 **서비스 상태 점검**을 선택합니다.<br /><br>

      {{< tabs >}}
      {{% tab "Behavior Check" %}}

동작 점검의 경우 **서버 리플렉션** 또는 [**프로토 파일 업로드**][101]를 지정하여 gRPC 서버를 정의합니다. 원하는 방식을 선택하고 요청 메시지를 포함합니다. Datadog은 스트리밍 방식을 지원하지 않습니다.<br /><br>

{{< img src="synthetics/api_tests/grpc_behavior_check_test_2.png" alt="gRPC 요청 정의" style="width:90%;" >}}

[101]: https://grpc.io/docs/what-is-grpc/introduction/#working-with-protocol-buffers

      {{% /tab %}}
      {{% tab "Health Check" %}}

서비스 상태 점검의 경우 서비스의 이름을 입력합니다. gRPC 서버에서 서비스 상태 점검을 전송하려면 해당 필드를 비워둡니다.<br /><br>

{{< img src="synthetics/api_tests/grpc_health_check_test_2.png" alt="gRPC 요청 정의" style="width:90%;" >}}

      {{% /tab %}}
      {{< /tabs >}}

   4. 테스트에 **고급 옵션**(선택 사항)을 추가합니다.

      {{< tabs >}}
      {{% tab "Request Options" %}}

- **타임아웃**: 테스트 시간 초과로 간주하기까지의 시간을 초단위로 지정합니다.
- **서버 인증서 오류 무시**: SSL 인증서의 유효성을 검사할 때 오류가 발생하더라도 연결을 통해 gRPC 테스트를 계속하려면 체크 표시합니다.
- **gRPC 메타데이터**: gRPC 요청에 메타데이터를 추가 및 정의하여 서비스 간에 메타데이터를 전달합니다.

      {{% /tab %}}
      {{% tab "Authentication" %}}

- **클라이언트 인증서**: 클라이언트 인증서(`.crt`) 및 연결된 비공개 키(`.key`)를 `PEM` 형식으로 업로드하여 mTLS를 통해 인증합니다.

<br/>

`openssl` 라이브러리를 사용하여 인증서를 변환할 수 있습니다. 예를 들어, `PKCS12` 인증서를 `PEM` 형식의 비공개 키 및 인증서로 변환합니다.

```bash
   openssl pkcs12 -in <CERT>.p12 -out <CERT_KEY>.key -nodes -nocerts
   openssl pkcs12 -in <CERT>.p12 -out <CERT>.cert -nokeys
```

      {{% /tab %}}
      {{< /tabs >}}

   5. gRPC 테스트의 **이름**을 지정합니다.

   6. gRPC 테스트에 환경 **태그** 및 기타 태그를 추가합니다. 이러한 태그를 사용하여 [신서틱 모니터링 & 지속적인 테스트 페이지][4]에서 신서틱 테스트를 필터링할 수 있습니다.

   7. **호출**을 클릭하여 요청 설정을 테스트합니다. 화면 오른쪽에 응답 미리보기가 표시됩니다.

   8. **테스트 생성하기**를 클릭하여 API 테스트를 제출합니다.

### Snippets

{{% synthetics-api-tests-snippets %}}

### 어설션 정의

어서션은 예상되는 테스트 결과를 정의합니다. **전송**을 클릭하면 수신한 응답에 기반한 `response time`의 어서션이 추가됩니다. 테스트를 모니터링하려면 최소 한 개 이상의 어서션을 정의해야합니다.

{{< tabs >}}
{{% tab "Behavior Check" %}}

| 유형 | 연산자 | 값 유형 |
|---|---|---|
| 응답 시간 | `is less than` | _정수 (ms)_ |
| gRPC 응답 | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`, <br> [`jsonpath`][1], [`xpath`][2] | _문자열_ <br> _[정규식][3]_ |
| gRPC 메타데이터 | `is`, `is not`, `contains`, `does not contain`, `matches regex`, `does not match regex`, `does not exist` | _정수(ms)_ <br> _[정규식][3]_ |

**신규 어서션**을 클릭하거나 응답 미리보기를 클릭하여 API 테스트당 최대 20개의 어서션을 생성할 수 있습니다.

{{< img src="synthetics/api_tests/assertions_grpc_behavior_check_blur.png" alt="성공 또는 실패로 gRPC 테스트 어서션 정의" style="width:90%;" >}}

[1]: https://restfulapi.net/json-jsonpath/
[2]: https://www.w3schools.com/xml/xpath_syntax.asp
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

{{% /tab %}}
{{% tab "Health Check" %}}

| 유형 | 연산자 | 값 유형 |
|---|---|---|
| 응답 시간 | `is less than` | _정수 (ms)_ |
| 서비스 점검 상태 | `is`, `is not` | _정수 (ms)_ |
| gRPC 메타데이터 | `is`, `is not`, `contains`, `does not contain`, `matches regex`, `does not match regex`, `does not exist` | _정수 (ms)_ |

**신규 어서션**을 클릭하거나 응답 미리보기를 클릭하여 API 테스트당 최대 20개의 어서션을 생성할 수 있습니다.

{{< img src="synthetics/api_tests/assertions_grpc_health_check.png" alt="성공 또는 실패로 gRPC 테스트 어서션 정의" style="width:90%;" >}}

{{% /tab %}}
{{< /tabs >}}

테스트에 응답 본문 어설션이 포함되어 있지 않으면 본문 페이로드가 삭제되고 Synthetics Worker가 설정한 제한 시간 내에서 요청 관련 응답 시간을 반환합니다.

테스트에 응답 본문에 대한 어서션이 포함되어 있고 제한 시간에 도달하면, `Assertions on the body/response cannot be run beyond this limit` 오류가 나타납니다.

### 위치 선택

gRPC 테스트를 실행할 **위치**를 선택합니다. gRPC 테스트는 네트워크 외부 또는 내부에서 테스트를 실행하는 선호도에 따라 관리되는 위치 및 [프라이빗 위치][2]에서 모두 실행할 수 있습니다.

{{% managed-locations %}}

### 테스트 빈도 지정

다음과 같이 gRPC 테스트를 수행합니다.

* **일정에 따라** 사용자가 가장 중요한 서비스에 항상 액세스할 수 있도록 보장합니다. Datadog이 gRPC 테스트를 실행할 빈도를 선택하세요.
* [**CI/CD 파이프라인 내에서**][3] 결함이 있는 코드가 고객 경험에 영향을 미칠지에 대한 염려 없이 제공을 시작할 수 있습니다.
* **온디맨드**로 실행하면 팀에 가장 적합한 시간에 테스트를 실행할 수 있습니다.

{{% synthetics-alerting-monitoring %}}

{{% synthetics-variables %}}

### 변수 사용

[**설정** 페이지에 정의된 전역 변수][9]를 gRPC 테스트의 URL, 고급 옵션 및 어서션에 사용할 수 있습니다.

변수 목록을 표시하려면 원하는 필드에 `{{`를 입력하세요.

## 테스트 실패

하나 이상의 어서션을 충족하지 않거나 요청이 초기에 실패한 경우 테스트는 `FAILED`로 간주됩니다. 경우에 따라서는 엔드포인트 어서션 테스트 없이 해당 테스트가 실패할 수 있습니다.

다음과 같은 이유로 실패할 수 있습니다.

`gRPC specific errors`
: gRPC은 [공식 gRPC 문서][10]에서 찾아볼 수 있는 특정 상태 코드 목록을 갖추고 있습니다.

`CONNRESET`
: 원격 서버에 의해 연결이 갑자기 종료되었습니다. 가능한 원인으로는 웹 서버가 응답 도중 오류 또는 충돌이 발생하였거나 웹 서버의 연결이 끊어졌기 때문일 수 있습니다.

`DNS`
: 테스트 URL에 대한 DNS 엔트리를 찾을 수 없습니다. 가능한 원인으로는 테스트 URL이 잘못 설정되었거나 DNS 엔티티 설정이 잘못되었기 때문일 수 있습니다.

`INVALID_REQUEST` 
: 테스트 설정이 유효하지 않습니다(예: URL 오타).

`SSL`
: SSL 연결을 실행할 수 없습니다. [자세한 내용을 확인하려면 전용 오류 페이지를 참조하세요][11].

`TIMEOUT`
: 요청을 적절한 시간 내에 완료할 수 없습니다. 두 가지 유형의 `TIMEOUT`이 발생할 수 있습니다:
  - `TIMEOUT: The request couldn't be completed in a reasonable time.`는 요청 시간이 테스트에 정의된 시간 제한에 도달했음을 나타냅니다(기본값은 60초로 설정).
  각 요청에 대해 완료된 요청 단계만 네트워크 워터폴에 표시됩니다. 예를 들어, `Total response time`만 표시된다면 DNS 확인 도중에 시간 초과가 발생한 것입니다.
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.`은 테스트 시간(요청 및 어서션)이 최대 실행 시간 60.5초에 도달했음을 나타냅니다.

## 권한

기본적으로 [Datadog 관리자 및 Datadog 표준 역할][12]로 설정된 사용자만 신서틱(Synthetic) gRPC 테스트를 생성, 편집, 삭제할 수 있습니다. 신서틱(Synthetic) gRPC 테스트 생성, 편집, 삭제, 접근 권한을 얻으려면 사용자를 이 두 가지 [기본 역할][12] 중 하나로 업그레이드하세요.

[커스텀 역할 기능][13]을 사용하는 경우 `synthetics_read` 및 `synthetics_write` 권한을 포함하는 모든 커스텀 역할에 사용자를 추가합니다.

## 액세스 제한 

{{% synthetics_grace_permissions %}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/grpc/grpc/blob/master/doc/health-checking.md
[2]: /ko/synthetics/private_locations
[3]: /ko/synthetics/cicd_testing
[4]: /ko/synthetics/search/#search
[5]: /ko/monitors/notify/#configure-notifications-and-automations
[6]: https://www.markdownguide.org/basic-syntax/
[7]: /ko/monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[8]: /ko/synthetics/guide/synthetic-test-monitors
[9]: /ko/synthetics/settings/#global-variables
[10]: https://grpc.github.io/grpc/core/md_doc_statuscodes.html
[11]: /ko/synthetics/api_tests/errors/#ssl-errors
[12]: /ko/account_management/rbac/
[13]: /ko/account_management/rbac#custom-roles