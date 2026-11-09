---
aliases:
- /ko/security/application_security/threats/setup/compatibility/gcp-service-extensions
code_lang: gcp-service-extensions
code_lang_weight: 40
title: App and API Protection GCP 서비스 확장 호환성 요구 사항
type: multi-code-lang
---
다음 표에는 지정된 Datadog 서비스 확장 콜아웃 이미지 버전에 따른 GCP 서비스 확장의 App and API Protection 기능이 명시되어 있습니다.

| App and API Protection 기능        | 최소 App and API Protection 서비스 확장 콜아웃 이미지 버전  |
|------------------------------------------|--------------------------------------------------------------------------|
| 위협 탐지                         | 1.71.0                                                                   |
| 위협 보호                        | 1.71.0                                                                   |
| 차단된 요청에 대한 응답 사용자 지정   | 1.71.0                                                                   |
| API Security                             | v2.2.2                                                                   |
| 독립형 App and API Protection        | v2.2.2                                                                   |
| 자동 사용자 활동 이벤트 추적   | 지원되지 않음                                                            |

App and API Protection GCP 서비스 확장 통합의 [제한 사항][1]을 참조하세요.

### 본문 처리 지원 {#body-processing-support}

Datadog 서비스 확장 콜아웃은 다음 페이로드 유형에 대한 요청 및 응답 본문 처리 기능을 지원합니다.

| 페이로드 유형 | 최소 App and API Protection 서비스 확장 콜아웃 이미지 버전  |
|--------------|--------------------------------------------------------------------------|
| JSON         | v2.2.2                                                                   |

## App and API Protection GCP 서비스 확장 지원 {#app-and-api-protection-gcp-service-extensions-support}

<div class="alert alert-info">App and API Protection GCP 서비스 확장은 미리 보기로 제공되고 있습니다.</div>

<div class="alert alert-info">지원되지 않는 기능 중에서
추가로 원하는 기능이 있다면 저희에게 알려주세요! <a
href="https://forms.gle/gHrxGQMEnAobukfn7">이 짧은 양식에
세부 정보를 작성한 후 보내주세요</a>.</div>

[1]: /ko/security/application_security/setup/gcp/service-extensions