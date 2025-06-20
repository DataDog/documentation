---
aliases:
- /ko/mobile_testing
- /ko/mobile_app_testing
cascade:
  algolia:
    tags:
    - mobile_testing
description: 지능형 자체 유지 관리 모바일 테스트를 생성하여 모바일 애플리케이션의 가장 중요한 부분이 실제 기기에서 실행되는지 확인합니다.
further_reading:
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: 블로그
  text: 엔드 투 엔드 테스트 생성 모범 사례
- link: /synthetics/mobile_app_testing/mobile_app_tests
  tag: 설명서
  text: 신서틱(Synthetic) 모바일 앱 테스트 생성 방법
- link: /synthetics/mobile_app_testing/settings
  tag: 설명서
  text: iOS 또는 Android 모바일 애플리케이션을 업로드하는 방법
- link: /continuous_testing/
  tag: 설명서
  text: Continuous Testing & CI/CD에 대해 알아보기
title: Mobile Application Testing 및 모니터링
---

## 개요

Mobile Application Testing을 사용하면 실제 장치를 사용하여 Android 및 iOS 애플리케이션의 주요 비즈니스 흐름을 테스트하고 모니터링할 수 있습니다. 
Datadog은 실제 기기에서 이러한 테스트를 실행하여 주요 애플리케이션 워크플로의 사실적인 단계별 표현, 각 단계의 스크린샷, 자세한 합격 또는 실패 결과를 제공하므로 팀에서 무엇이 잘못되었는지 빠르게 시각화할 수 있습니다.
모바일 앱 테스트는 일정에 따라, 요청 시 또는 [CI/CD 파이프라인][1] 내에서 직접 실행할 수 있습니다.

[**Digital Experience** > **New Test**][12]로 이동하여 **Mobile Application Test**를 선택하면 Datadog에서 모바일 앱 테스트를 생성할 수 있습니다.

{{< img src="mobile_app_testing/new_test_2.png" alt="신서틱(Synthetic) 모바일 생성" style="width:50%;">}}

### 취약성

취약성은 엔드투엔드 테스트의 문제점입니다. 테스트 실패는 실제 애플리케이션 문제가 아니라 식별자에 영향을 미치는 유효한 프런트엔드 코드 변경으로 인해 발생하는 경우가 있습니다.

취약한 테스트를 방지하기 위해 Datadog은 로케이터 세트를 활용하여 모바일 앱 테스트의 요소를 타겟팅하는 알고리즘을 사용합니다. UI의 작은 변화로 인해 요소가 수정될 수 있습니다(예: 요소를 다른 위치로 이동). 모바일 앱 테스트는 변경 사항의 영향을 받지 않는 참조 지점을 기반으로 요소를 자동으로 다시 찾습니다.

테스트가 성공적으로 실행되면 모바일 앱 테스트는 손상된 로케이터를 업데이트된 값으로 다시 계산(또는 "자체 복구")합니다. 이렇게 하면 테스트가 간단한 UI 업데이트로 인해 중단되지 않고 테스트가 모바일 애플리케이션의 UI에 자동으로 적응됩니다.

## 설정

모바일 앱 테스트의 구성을 정의합니다.

1. 드롭다운 메뉴에서 모바일 애플리케이션을 선택합니다. 아직 모바일 애플리케이션을 만들지 않았다면 [Synthetic Monitoring & Continuous Testing Settings 페이지][3]의 [Applications List 섹션][2]에서 모바일 애플리케이션을 생성하세요.
2. 테스트가 실행될 때마다 최신 버전의 모바일 애플리케이션을 사용하려면 **버전**을 선택하거나 **Always run the latest version**을 클릭합니다.
3. 테스트에 **이름**을 추가합니다.
4. 테스트와 관련된 **환경 및 추가 태그**를 선택합니다. 특정 `<KEY>`에 대해 `<VALUE>`를 필터링하려면 `<KEY>:<VALUE>` 형식을 사용합니다.
4. 테스트하려는 **기기**를 선택합니다.
5. 테스트의 재시도 조건을 설정합니다.
6. 기본 시간 간격을 클릭하거나 테스트 모니터에 대한 테스트 빈도 및 **경고 조건**을 사용자 정의하여 **테스트 빈도**를 설정합니다.
7. 테스트 모니터의 이름을 입력하고 알림을 보낼 서비스 또는 팀원을 선택한 후 메시지 알림을 추가합니다.

{{% synthetics-variables %}}

### 전역 변수 사용

모바일 앱 테스트 세부정보의 **Starting URL** 및 **Advanced Options**뿐만 아니라 테스트 기록에서도 [**Settings**에 정의된 전역 변수][4]를 사용하여 로컬 변수를 정의할 수 있습니다. 사용 가능한 변수 목록을 표시하려면 원하는 필드에 `{{`를 입력하세요.

기록을 시작하기 전에 사용자 여정에 통합할 변수를 정의합니다.

기록하는 동안 사용 가능한 변수를 삽입할 수 있습니다. 모바일 테스트 기록에서 변수를 사용하는 방법에 대한 자세한 내용은 [모바일 앱 테스트 단계][11]를 참조하세요.

## 테스트 재시도

알림 경고를 트리거하기 전에 테스트가 실패해야 하는 시간을 지정할 수 있습니다.

* 실패할 경우 `Y`밀리초 후 `X`회 재시도합니다.

## 예약 및 경고

기본적으로 모바일 앱 테스트는 온디맨드 테스트로 설정됩니다. 즉, 이러한 테스트는 [CI 파이프라인에서 직접] 실행할 수 있습니다(#run-tests-in-ci).

{{< img src="mobile_app_testing/alerting_rules.png" alt="모바일 테스트를 위한 예약 및 경고 조건" style="width:90%" >}}

경고 조건을 사용자 정의하여 경고를 보낼 빈도와 테스트에서 알림 경고를 보내려는 상황을 정의할 수 있습니다.

* `X`분 동안 어설션이 실패하면 경고가 트리거됩니다.

### 테스트 모니터링 설정

설정된 경고 조건에 따라 알림이 전송됩니다. 이 섹션을 사용하여 팀에 메시지를 보내는 방법과 내용을 정의하세요.

1. 모바일 앱 테스트를 위한 **메시지**를 입력합니다. 이 필드는 표준 [마크다운 형식][5]을 허용하고 다음 [조건 변수][6]를 지원합니다.

    | 조건 변수       | 설명                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | 모니터가 경고할 때 표시됩니다.                                    |
    | `{{^is_alert}}`            | 모니터가 경고하지 않으면 표시됩니다.                           |
    | `{{#is_recovery}}`         | 모니터가 `alert`로부터 복구된 시점을 표시합니다.                         |
    | `{{^is_recovery}}`         | 모니터가 `alert`에서 복구되지 않으면 표시됩니다.    |
    | `{{#is_renotify}}`         | 모니터가 다시 알림을 보낼 때 표시됩니다.                                   |
    | `{{^is_renotify}}`         | 모니터가 다시 알림을 보내지 않을 때 표시됩니다.                                 |
    | `{{#is_priority}}`         | 모니터가 우선순위(P1~P5)와 일치하는 경우에 표시합니다.                  |
    | `{{^is_priority}}`         | 모니터가 우선순위(P1~P5)와 일치하지 않는 경우 표시됩니다.           |

   알림 메시지에는 이 섹션에 정의된 **메시지**와 실패한 위치에 대한 정보가 포함됩니다.

2. 알림을 보낼 팀원과 서비스를 선택하세요.
3. 재알림 빈도를 지정합니다. 실패한 테스트에 대한 재알림을 방지하려면 `Never renotify if the monitor has not been resolved` 옵션을 그대로 둡니다.
4. 테스트 구성을 저장하고 모바일 앱 테스트 단계를 기록하려면 **Save & Edit Recording**을 클릭하세요.

자세한 내용은 [신서틱(Synthetic) 테스트 모니터링 사용][7]을 참조하세요.

## CI에서 테스트 실행

필요에 따라 [테스트 `synthetics.json` 파일][13] 및 [전역 구성 `synthetics-ci.config` 파일][14]에서 `mobileApplicationVersionFilePath` 옵션을 정의하여 CI 파이프라인에서 모바일 앱 테스트를 실행할 수 있습니다. 전역 구성 파일 옵션은 테스트 구성 파일 옵션보다 우선합니다.

이 예에서 `aaa-aaa-aaa` 테스트는 `application/path`에 있는 재정의 애플리케이션 버전을 사용하여 실행합니다.

```json
// myTest.synthetics.json
{
  "tests": [
    {
      "id": "aaa-aaa-aaa",
      "testOverrides": {
        "mobileApplicationVersionFilePath": "application/path"
      }
    }
  ]
}
```

그런 다음 `$ datadog-ci synthetics run-tests --config synthetics-ci.config`를 실행합니다.

[Continuous Testing 및 CI/CD][1]에서 자세한 정보를 확인하세요.

## 권한

기본적으로 신서틱(Synthetic) 모바일 앱 테스트는 Datadog Admin 및 Datadog Standard 역할이 있는 사용자만 생성, 편집 및 삭제할 수 있습니다. 신서틱(Synthetic) 모바일 앱 테스트에 대한 생성, 편집 및 삭제 권한을 얻으려면 사용자를 두 가지 [기본 역할][8] 중 하나로 업그레이드하세요.

[커스텀 역할 기능][9]을 사용하는 경우 `synthetics_read` 및 `synthetics_write` 권한이 포함된 사용자 정의 역할에 사용자를 추가하세요.

### 액세스 제한 

계정에서 [사용자 정의 역할][10]을 사용하는 고객은 액세스 제한을 사용할 수 있습니다.

조직의 역할에 따라 모바일 앱 테스트에 대한 액세스를 제한할 수 있습니다. 모바일 앱 테스트를 생성할 때 사용자 외에 어떤 역할이 테스트를 읽고 쓸 수 있는지 선택하세요.

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