---
description: 신서틱(Synthetic) API 및 다단계 API 테스트가 애플리케이션에 로그인할 수 있는 방법을 알아봅니다.
further_reading:
- link: /data_security/synthetics
  tag: 설명서
  text: 신서틱 데이터 보안에 관해 알아보기
- link: /synthetics/api_tests
  tag: 설명서
  text: API 테스트 생성
- link: /synthetics/multistep
  tag: 설명서
  text: 멀티스텝 API 테스트 만들기
title: API 및 다단계 API 테스트에서 인증 사용
---

## 개요

[API 테스트][1]로 애플리케이션의 API 엔드포인트에 요청을 전송하여 전체 응답 시간, 예상 상태 코드, 헤더, 또는 바디 콘텐츠와 같은 응답 및 정의된 조건을 확인할 수 있습니다. [다단계 API 테스트][2]로 요청을 체이닝하여 주요 서비스의 복잡한 여정을 사전 모니터링하고, 관리형 또는 비공개 위치에서 언제든지 사용할 수 있도록 할 수 있습니다.

본 지침에서는 신서틱 API 및 다단계 API 테스트에 사용할 수 있는 다양한 인증 프로토콜에 관해 설명합니다. 브라우저 테스트에서 인증에 관한 자세한 내용은 [인증이 필요한 애플리케이션에서 테스트 실행하기][3]를 참조하세요.

## 인증 메서드

엔드포인트에 인증이 필요한 경우, [API 생성][4] 또는 [다단계 API 테스트][5] 생성 시 자격 증명을 추가할 수 있습니다. API 및 다단계 API 테스트는 기본 액세스 인증, Digest 액세스 인증, OAuth2.0, NTLM, AWS Sigv4, 클라이언트 인증서 등의 인증 프로토콜을 지원합니다.

**Define the request** 섹션에서 **Advanced Options** > **Authentication**을 클릭하고 다음 인증 메서드를 선택합니다.

{{< tabs >}}
{{% tab "Basic Access" %}}

**HTTP Basic Auth**을 클릭하고 사용자 아이디와 비밀번호를 입력합니다. 기본 액세스 인증은 [HTTP 테스트][1], [다단계 API 테스트][2], [WebSocket 테스트][3]에서 지원됩니다.

[1]: /ko/synthetics/api_tests/http_tests/
[2]: /ko/synthetics/multistep/
[3]: /ko/synthetics/api_tests/websocket_tests/
{{% /tab %}}
{{% tab "Digest Access" %}}

**Digest Auth**를 클릭하고 사용자 아이디와 비밀번호를 입력합니다. 디지털 액세스 인증은 [HTTP 테스트][1]와 [다단계 API 테스트][2]에서 지원됩니다.

[1]: /ko/synthetics/api_tests/http_tests/
[2]: /ko/synthetics/multistep/
{{% /tab %}}
{{% tab "OAuth 2.0" %}}

**OAuth 2.0**을 클릭하고 인증 유형(**Client Credentials** 또는 **Resource Password**)을 선택한 다음 액세스 토큰 URL, 클라이언트 ID, 클라이언트 시크릿을 입력합니다. 토큰 API 인증 메서드(**Send as Basic Auth header** 또는 **Send client credentials in body**)를 선택하고 옵션으로 대상, 리소스, 범위를 입력합니다. OAuth 2.0 인증은 [HTTP 테스트][1]와 [다단계 API 테스트][2]에서 지원됩니다.

[1]: /ko/synthetics/api_tests/http_tests/
[2]: /ko/synthetics/multistep/
{{% /tab %}}
{{% tab "NTLM" %}}

**NTLM**을 클릭하고 사용자 아이디와 비밀번호, 옵션으로 도메인과 워크스테이션을 입력합니다. NTLM 인증은 [HTTP 테스트][1]와 [다단계 API 테스트][2]에서 지원됩니다.

[1]: /ko/synthetics/api_tests/http_tests/
[2]: /ko/synthetics/multistep/
{{% /tab %}}
{{% tab "AWS Signature" %}}

**AWS Signature**를 클릭하고 액세스 키 ID와 시크릿 액세스 키, 옵션으로 리전, 서비스 이름, 세션 토큰을 입력합니다. AWS 인증은 [HTTP 테스트][1]와 [다단계 API 테스트][2]에서 지원됩니다.

[1]: /ko/synthetics/api_tests/http_tests/
[2]: /ko/synthetics/multistep/
{{% /tab %}}
{{% tab "Client Certificate" %}}

**Upload File**를 클릭하여 비공개 키 파일과 인증서 파일을 업로드합니다. 클라이언트 
인증서 인증은 [HTTP 테스트][1], [다단계 API 테스트][2], [SSL 테스트][3], [gRPC 테스트][4]에서 지원됩니다.

[1]: /ko/synthetics/api_tests/http_tests/
[2]: /ko/synthetics/multistep/
[3]: /ko/synthetics/api_tests/ssl_tests/
[4]: /ko/synthetics/api_tests/grpc_tests/
{{% /tab %}}
{{< /tabs >}}

## 계정 보안

테스트 결과와 설정에서 사용자 자격 증명을 숨기려면 [API 생성][4] 또는 [다단계 API 테스트][5] 생성 시의 전역 및 로컬 변수를 사용할 수 있습니다.

### 전역 변수

다음에 따라 자격 증명을 전역 변수로 저장합니다.

- 여러 테스트에서 쉽게 재사용할 수 있습니다.
- **Hide and obfuscate variable value**를 선택하여 테스트 결과 및 설정에서 해당 값을 숨깁니다.
- [커스텀 역할][6]로 조직의 사용자 하위 집합에 대한 액세스를 제한합니다.

### 로컬 변수

자격 증명을 로컬 변수로 저장하면 자격 증명의 범위가 고유한 테스트로 한정됩니다. 테스트 결과 및 설정에서 해당 값을 숨기려면 **Hide and obfuscate variable value**를 선택하세요.

계정 보안과 관련한 자세한 정보는 [신서틱 모니터 데이터 보안][7]을 참고하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/api_tests/http_tests/
[2]: /ko/synthetics/multistep/
[3]: /ko/synthetics/guide/app-that-requires-login/
[4]: https://app.datadoghq.com/synthetics/create?subtype=http
[5]: https://app.datadoghq.com/synthetics/multi-step/create
[6]: /ko/account_management/rbac/?tab=datadogapplication#create-a-custom-role
[7]: /ko/data_security/synthetics
[8]: /ko/synthetics/api_tests/grpc_tests