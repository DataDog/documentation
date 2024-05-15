---
aliases:
- /ko/mobile_testing/mobile_app_tests
description: 모바일 앱 테스트를 통해 주요 비즈니스 플로우 모니터링을 시작해 보세요.
further_reading:
- link: /mobile_app_testing/settings
  tag: 설명서
  text: 모바일 테스트 설정에 대해 알아보기
- link: /synthetics/browser_tests
  tag: 설명서
  text: 신서틱(Synthetic) 브라우저 테스트 작성 방법
- link: https://www.datadoghq.com/blog/test-maintenance-best-practices/
  tag: 블로그
  text: 엔드 투 엔드 테스트 유지 관리 모범 사례
kind: documentation
title: 모바일 앱 테스트
---

{{< site-region region="us3,us5,gov,eu,ap1" >}}
<div class="alert alert-warning">모바일 애플리케이션 테스트는 이 사이트에서 지원되지 않습니다.</div>
{{< /site-region >}}

{{< site-region region="us" >}}
<div class="alert alert-info">모바일 애플리케이션 테스트는 제한적으로 제공되며 Datadog US1 사이트에 대해서만 지원됩니다.</div>
{{< /site-region >}}

## 개요

모바일 애플리케이션 테스트를 통해 실제 기기를 사용하여 Android 및 iOS 애플리케이션에 대한 주요 비즈니스 플로우를 테스트하고 모니터링할 수 있습니다.

모바일 앱 테스트는 일정에 따라, 온디맨드 또는 [CI/CD 파이프라인][1] 내에서 직접 실행할 수 있습니다.

Datadog에서 모바일 앱 테스트를 생성하려면 [**UX Monitoring** > **New Test**][12]로 이동하여 **Mobile Application Test**를 선택하세요.

{{< img src="mobile_app_testing/new_test.png" alt="신서틱(Synthetic) 모바일 테스트 생성" style="width:50%;">}}

### 불안정

테스트가 실패할 수 있기 때문에 엔드투엔드 테스트에서의 불안정함은 문제가 됩니다. 프론트엔드 팀이 변경 사항을 구현할 때 실제 애플리케이션 문제 대신 테스트의 식별자가 이를 경고할 수 있습니다.

Datadog은 테스트 오류를 방지하기 위해 일련의 로케이터를 활용하여 모바일 앱 테스트에서 요소를 타겟팅하는 알고리즘을 사용합니다. UI를 조금만 변경해도 요소가 수정될 수 있습니다(예: 다른 위치로 이동). 모바일 앱 테스트는 변경의 영향을 받지 않는 참조 지점을 기반으로 요소를 자동으로 다시 찾습니다.

테스트가 성공적으로 실행되면 모바일 앱 테스트는 손상된 로케이터를 업데이트된 값으로 다시 계산(또는 "자체 복구")합니다. 이렇게 하면 테스트가 간단한 UI 업데이트로 인해 중단되지 않고 모바일 애플리케이션의 UI에 자동으로 적용됩니다.

## 설정

모바일 앱 테스트의 설정을 정의합니다.

1. 드롭다운 메뉴에서 모바일 어플리케이션을 선택합니다. 아직 모바일 애플리케이션을 만들지 않았다면 [Synthetic Monitoring & Continuous Testing Settings 페이지][3]의 [Applications List 섹션][2]에서 모바일 어플리케이션을 생성하세요.
2. 테스트가 실행될 때마다 모바일 애플리케이션의 최신 버전을 사용하려면 **버전**을 선택하거나 **Always run the latest version**을 클릭하세요.
3. 테스트에 **이름**을 추가합니다.
4. 테스트와 관련된 **환경 및 추가 태그**를 선택합니다. `<KEY>:<VALUE>` 형식을 사용하여 지정된 `<KEY>`의 `<VALUE>`를 필터링합니다.
4. 테스트를 실행할 **기기**를 선택합니다.
5. 테스트의 재시도 조건을 설정합니다.
6. 기본 시간 간격을 클릭하거나 테스트 빈도 및 테스트 모니터에 대한 **경고 조건**을 맞춤 설정하여 **테스트 빈도**를 설정하세요.
7. 테스트 모니터의 이름을 입력하고 알림을 보낼 서비스 또는 팀원을 선택한 후 메시지 알림을 추가합니다.

{{% synthetics-variables %}}

### 전역 변수 사용

모바일 앱 테스트 세부 정보의 **Starting URL** 및  **Advanced Options**와 테스트 기록에서 [**Settings**에 정의된 전역 변수][4]를 사용하여 로컬 변수를 정의할 수 있습니다. 사용 가능한 변수 목록을 표시하려면 원하는 필드에서 `{{`를 입력하세요.

기록을 시작하기 전에 사용자 여정에 통합할 변수를 정의합니다.

기록 중에 사용 가능한 변수를 삽입할 수 있습니다. 모바일 테스트 기록에서 변수를 사용하는 방법에 대한 자세한 내용은 [모바일 앱 테스트 단계][11]를 참조하세요.

## 테스트 재시도

알림 경고 트리거를 위해 테스트가 얼마 동안 실패해야 하는지를 지정할 수 있습니다.

* 실패 시 `Y` 밀리초 후 `X` 회 재시도하세요.

## 예약 및 알림

기본적으로 모바일 앱 테스트는 온디맨드 테스트로 설정됩니다. 즉, 이러한 테스트는 [CI 파이프라인에서 직접] 실행할 수 있습니다(#run-tests-in-ci).

{{< img src="mobile_app_testing/alerting_rules.png" alt="모바일 테스트에 대한 예약 및 경고 조건" style="width:90%" >}}

알림 조건을 맞춤 설정하여 알림 발송 빈도와 테스트가 알림을 발송하는 상황을 정의할 수 있습니다.

* 어설션이 `X`분 동안 실패하면 경고가 트리거됩니다.

### 테스트 모니터 설정

알림은 경고 조건에 따라 발송됩니다. 이 섹션을 사용하여 팀에 메시지를 보내는 방법과 내용을 정의하세요.

1. 모바일 앱 테스트를 위한 **메시지**를 입력합니다. 이 필드는 표준 [마크다운 형식][5]을 허용하며 다음 [조건 변수][6]를 지원합니다:

    | 조건 변수       | 설명                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | 모니터가 경고를 할 때 표시합니다.                                       |
    | `{{^is_alert}}`            | 모니터가 경고하지 않으면 표시합니다.                                     |
    | `{{#is_recovery}}`         | 모니터가 `alert`에서 복구될 때 표시합니다.                          |
    | `{{^is_recovery}}`         | 모니터가 `alert`에서 복구되지 않으면 표시합니다.                        |
    | `{{#is_renotify}}`         | 모니터가 다시 알릴 때 표시합니다.                                   |
    | `{{^is_renotify}}`         | 모니터가 다시 알림을 보내지 않으면 표시합니다.                                 |
    | `{{#is_priority}}`         | 모니터가 우선순위(P1부터 P5)와 일치할 때 표시합니다.                  |
    | `{{^is_priority}}`         | 모니터가 우선순위(P1부터 P5)와 일치하지 않으면 표시합니다.                |

   알림 메시지에는 이 섹션에 정의된 **메시지** 및 실패한 위치에 대한 정보가 포함됩니다.

2. 알림을 보낼 팀원 및 서비스를 선택합니다.
3. 재알림 빈도를 지정합니다. 테스트 실패 시 재알림을 보내지 않으려면 `Never renotify if the monitor has not been resolved` 옵션을 유지합니다.
4. **Save & Edit Recording**을 클릭하여 테스트 설정을 저장하고 모바일 앱 테스트 단계를 기록합니다.

자세한 내용은 [신서틱(Synthetic) 테스트 모니터 사용][7]을 참조하세요.

## CI에서 테스트 실행

필요에 따라 [테스트 `synthetics.json`파일][13] 및 [글로벌 설정 `synthetics-ci.config`파일][14]에 `mobileApplicationVersionFilePath` 옵션을 정의하여 CI 파이프라인에서 모바일 앱 테스트를 실행할 수 있습니다. 글로벌 설정 파일 옵션은 테스트 설정 파일 옵션보다 우선합니다.

이 예제에서 `aaa-aaa-aaa` 테스트는 `application/path`에 있는 재정의 애플리케이션 버전으로 실행됩니다.

```json
// myTest.synthetics.json
{
  "tests": [
    {
      "id": "aaa-aaa-aaa",
      "config": {
        "mobileApplicationVersionFilePath": "application/path"
      }
    }
  ]
}
```

그런 다음 `$ datadog-ci synthetics run-tests --config synthetics-ci.config`을 실행합니다. 

자세한 내용은 [연속적인 테스트 및 CI/CD][1]를 참조하세요.

## 권한 허용

기본적으로 신서틱(Synthetic) 모바일 앱 테스트는 Datadog Admin 및 Datadog Standard 역할이 있는 사용자만 생성, 편집 및 삭제할 수 있습니다. 신서틱(Synthetic) 모바일 앱 테스트에 대한 생성, 편집 및 삭제 권한을 얻으려면 사용자를 두 가지 [기본 역할][8] 중 하나로 업그레이드하세요.

[커스텀 역할 기능][9]을 사용하는 경우 `synthetics_read` 및 `synthetics_write` 권한을 포함하는 모든 커스텀 역할에 사용자를 추가합니다.

### 액세스 제한 

계정에서 [커스텀 역할][10]을 사용하는 고객은 액세스 제한이 가능합니다.

조직 내 역할에 따라 모바일 앱 테스트 액세스를 제한할 수 있습니다. 모바일 앱 테스트를 만들 때 사용자 외에 어떤 역할이 테스트를 읽고 쓸 수 있는지 선택하세요.

{{< img src="synthetics/settings/restrict_access_1.png" alt="테스트에 대한 권한 설정" style="width:70%;" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/continuous_testing/cicd_integrations/
[2]: https://app.datadoghq.com/synthetics/settings/mobile-applications
[3]: /ko/mobile_app_testing/settings/
[4]: /ko/synthetics/settings/?tab=specifyvalue#global-variables
[5]: https://daringfireball.net/projects/markdown/syntax
[6]: /ko/monitors/notify/variables/?tab=is_alert#conditional-variables
[7]: /ko/synthetics/guide/synthetic-test-monitors/
[8]: /ko/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[9]: /ko/account_management/rbac/?tab=datadogapplication#custom-roles
[10]: /ko/account_management/rbac/?tab=datadogapplication#create-a-custom-role
[11]: /ko/mobile_app_testing/mobile_app_tests/steps/
[12]: https://app.datadoghq.com/synthetics/mobile/create
[13]: /ko/continuous_testing/cicd_integrations/configuration?tab=npm#test-files
[14]: /ko/continuous_testing/cicd_integrations/configuration/?tab=npm#global-configuration-file-options