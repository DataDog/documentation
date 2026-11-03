---
description: Datadog Browser SDK 개발자 확장 프로그램을 사용하여 기능 플래그를 탐색하고 브라우저에서 로컬로 재정의하세요.
further_reading:
- link: /feature_flags/client/javascript/
  tag: 설명서
  text: JavaScript Feature Flags
- link: /feature_flags/implementation_patterns/local_flag_overrides/
  tag: 설명서
  text: 다중 공급자 패턴을 사용한 로컬 플래그 재정의
- link: /feature_flags/concepts/variants_and_flag_types/
  tag: 설명서
  text: 변형 및 플래그 유형
title: 브라우저 개발자 확장 프로그램
---
## 개요 {#overview}

Chrome용 [Datadog Browser SDK 개발자 확장 프로그램][1]에는 **Feature Flags** 탭이 포함되어 있습니다. 이 탭에는 조직의 기능 플래그가 나열되며 브라우저에서 해당 플래그를 로컬로 재정의할 수 있습니다. Datadog에서 플래그 구성을 변경하지 않고도 다양한 플래그 값에 따라 애플리케이션이 어떻게 동작하는지 확인하는 데 이 탭을 사용하세요.

재정의는 브라우저에만 적용됩니다. 재정의 내용은 Datadog으로 전송되지 않으며 다른 사용자에게는 아무런 영향이 발생하지 않습니다.

{{< img src="feature_flags/devtools_extension/flags-tab-overview.png" alt="Feature Flags 탭. Feature Flag Overrides 제목, US1에 대한 Connected 배지, 필터 행, 변형 버튼이 있는 플래그 목록이 표시됨." style="width:100%;" >}}

이 확장 프로그램에는 Browser SDK 동작을 검사하기 위한 다른 탭도 포함되어 있습니다. 이 페이지에서는 **Feature Flags** 탭을 다룹니다.

## 전제 조건 {#prerequisites}

시작하기 전에 다음이 필요합니다.

- Google Chrome.
- 상용 [Datadog 사이트][2]의 Datadog 조직에서 기능 플래그에 액세스할 수 있는 권한: US1(`datadoghq.com`), US3(`us3.datadoghq.com`), US5(`us5.datadoghq.com`), EU1(`datadoghq.eu`), AP1(`ap1.datadoghq.com`) 또는 AP2(`ap2.datadoghq.com`). Datadog for Government 사이트는 지원되지 않습니다.
- [Datadog Feature Flags SDK for JavaScript][3]를 사용하여 계측된 브라우저 애플리케이션.
- OpenFeature 공급자 스택에 구성된 `DatadogDevtools` 래퍼. [DatadogDevtools 래퍼 추가](#add-the-datadogdevtools-wrapper)를 참조하세요.

## 확장 프로그램 설치 {#install-the-extension}

Chrome Web Store에서 [Datadog Browser SDK 개발자 확장 프로그램][1]을 설치하세요.

## DatadogDevtools 래퍼 추가 {#add-the-datadogdevtools-wrapper}

`DatadogDevtools`는 다른 공급자를 래핑하는 OpenFeature 공급자입니다. 이 래퍼는 확장 프로그램에서 설정한 재정의를 읽고, 일치하는 플래그 키에 대해 해당 재정의를 반환하며, 그 외의 모든 평가는 래핑된 공급자에 위임합니다. 이것을 사용하지 않으면 탭에 **DatadogDevtools not detected** 알림이 표시됩니다. 재정의를 설정할 수 있는 것은 마찬가지이지만, 래퍼가 설정될 때까지는 재정의가 적용되지 않습니다.

`DatadogDevtools`를 `@datadog/openfeature-browser`에서 가져오고, 여기에 공급자를 전달한 다음 OpenFeature API를 통해 래퍼를 등록하세요.

{{< code-block lang="javascript" >}}
import { DatadogProvider, DatadogDevtools } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';

const provider = new DatadogProvider({
  applicationId: '<APPLICATION_ID>',
  clientToken: '<CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  env: '<ENV_NAME>',
});

await OpenFeature.setProviderAndWait(new DatadogDevtools(provider));
{{< /code-block >}}

`site`를 조직에서 사용하는 [Datadog 사이트][2]로 설정하세요. 확장 프로그램의 드롭다운 메뉴에서 선택한 것과 동일한 사이트를 사용하세요. 사이트가 서로 다르면 사용자는 한 조직의 플래그 카탈로그에서 변형을 탐색하고 선택하고, 애플리케이션은 다른 조직의 카탈로그를 기준으로 플래그를 확인하게 됩니다.

이 래퍼는 모든 OpenFeature 공급자를 허용하므로 로컬 개발 빌드에서 `InMemoryProvider` 위에 사용할 수도 있습니다. 애플리케이션에서 여러 도메인에 대한 공급자를 등록하는 경우 각 공급자를 래핑하세요.

<div class="alert alert-warning">로컬 재정의는 Datadog의 플래그 구성을 우회하며, 브라우저 스토리지에 쓰기 작업을 할 수 있는 모든 사용자가 설정할 수 있습니다. 최종 사용자가 프로덕션 애플리케이션의 플래그 동작을 변경할 수 없도록 래퍼를 비프로덕션 빌드로 제한하세요.</div>

### 재정의가 적용되었는지 확인 {#confirm-that-an-override-applied}

`DatadogDevtools`는 공급자가 초기화될 때 한 번만 재정의를 읽습니다. 세부 정보 메서드로 플래그를 평가하면 해당 값의 출처를 확인할 수 있습니다. 재정의된 플래그는 `reason`이 `STATIC`이고 `flagMetadata.overridden`이 `true`로 설정된 상태로 확인됩니다.

{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();
const details = client.getBooleanDetails('<FLAG_KEY>', false);

console.log(details.value, details.reason, details.flagMetadata.overridden);
{{< /code-block >}}

값이 선언된 유형과 일치하지 않는 재정의는 래퍼가 초기화 시 재정의를 읽을 때 무시되고, 해당 래퍼는 브라우저 콘솔에 경고를 로깅합니다. 정수 재정의는 정수여야 합니다.

## Feature Flags 탭 열기 {#open-the-feature-flags-tab}

1. Chrome에서 애플리케이션을 엽니다.
2. Chrome DevTools를 엽니다(Mac에서는 `Cmd+Opt+I`, Windows 또는 Linux에서는 `F12`).
3. **Browser SDK** 패널을 선택합니다. 이 패널이 표시되지 않는 경우 DevTools 탭 표시줄에서 오버플로 메뉴(`»`)를 선택합니다.
4. **Feature Flags** 탭을 선택합니다.
5. 로그인하기 전에 드롭다운에서 Datadog 사이트를 선택합니다. 선택한 사이트에 따라 로그인 및 플래그 목록에 사용되는 Datadog 조직이 결정됩니다. 그런 다음 **Sign in to Datadog**을 클릭합니다..

{{< img src="feature_flags/devtools_extension/flags-tab-connect.png" alt="US1으로 설정된 Datadog 사이트 드롭다운과 Sign in to Datadog 버튼이 표시된 Feature Flags 탭의 로그인 화면." style="width:100%;" >}}

자격 증명은 브라우저 세션에 저장되며 세션이 종료되면 삭제됩니다. 로그아웃하고 세션을 취소하려면 **Disconnect**를 클릭합니다. Datadog에서 **Organization Settings > Authorized Applications**로 이동하여 확장 프로그램의 액세스 권한을 취소할 수도 있습니다.

## 플래그 탐색 및 필터링 {#browse-and-filter-flags}

탭에는 **Feature Flag Overrides** 제목과 현재 연결된 Datadog 사이트를 확인하는 배지가 표시됩니다. 목록 위에는 사용 가능한 플래그의 개수가 표시됩니다. 각 플래그에는 이름, 키, 설명 및 변형 버튼이 표시됩니다.

목록의 범위를 좁히려면 필터 행을 사용하세요.

| 필터 | 설명 |
| --- | --- |
| **기능 플래그 필터링** |  플래그 이름, 키 또는 태그가 일치하는 플래그를 표시합니다. |
| **내 Feature Flags** |  사용자가 생성한 플래그만 표시합니다. |
| **내 팀** |  사용자가 소속된 팀에 대해 태그가 지정된 플래그만 표시합니다. |
| **유형** | 부울, 문자열, 정수, 숫자 또는 JSON 플래그만 표시합니다. |
| **태그** | 선택한 태그가 하나 이상 포함된 플래그만 표시합니다. |

## 플래그 재정의 {#override-a-flag}

목록에서 플래그를 재정의하려면 해당 플래그의 변형 버튼 중 하나를 클릭하세요.

변형으로 정의되지 않은 값을 설정하려면 **Add a custom override**를 펼치세요. 플래그 키를 입력하고 값 유형을 선택한 다음 값을 입력하세요. 이미 재정의가 있는 키를 입력하여 적용하면 기존 값이 대체됩니다. 플래그의 유형과 일치하지 않는 값은 저장하기 전에 확장 프로그램 UI에서 거부됩니다.

재정의된 플래그는 목록 상단의 강조 표시된 **Local overrides** 섹션으로 이동하며, 이 섹션에는 현재 활성화된 재정의의 개수가 표시됩니다. 선택한 변형이 강조 표시되며 각 행에는 해당 재정의 하나만 제거할 수 있는 되돌리기 컨트롤이 있습니다. 재정의를 일괄적으로 제거하려면 탭 하단에서 **Clear all**을 클릭합니다. [모든 재정의 지우기](#clear-all-overrides)를 참조하세요.

재정의 행에 경고가 표시될 수도 있습니다.

| 경고 | 설명 |
| --- | --- |
| 빨간색으로 강조 표시된 행 | 저장된 재정의의 유형이 플래그의 유형과 일치하지 않아 재정의가 적용되지 않습니다. 유형이 일치하지 않는 재정의는 공급자가 초기화될 때 무시되며 브라우저 콘솔에 경고로 로깅됩니다. 탭에서는 페이지를 새로 고침하기 전에 불일치를 표시합니다. |
| 플래그 키 아래에 흐리게 표시된 참고 사항 | 재정의를 설정한 후 플래그가 보관되거나 삭제되어 조직의 플래그 카탈로그에서 더 이상 사용할 수 없습니다. 재정의는 계속 적용됩니다. 이 참고 사항은 정보 제공용입니다. |

{{< img src="feature_flags/devtools_extension/flags-tab-local-overrides.png" alt="목록 상단의 Local overrides 섹션에 활성 재정의 2개가 강조 표시되고, 그 아래에 Clear All 및 Refresh Page 버튼이 있는 Feature Flags 탭." style="width:100%;" >}}

## 애플리케이션에 재정의 적용 {#apply-overrides-to-your-application}

재정의는 설정하는 즉시 저장되지만 `DatadogDevtools`는 공급자가 초기화될 때 한 번만 재정의를 읽습니다. 재정의를 설정하거나 되돌려도 실행 중인 페이지에는 아무런 영향이 없습니다. 탭 하단에서 **Refresh Page**를 클릭하여 페이지를 새로 고치면 새로운 값이 적용됩니다.

## 재정의 관리{#manage-overrides}

재정의는 Datadog 로그인과 별개로 유지됩니다. 로그아웃하거나 DevTools를 닫거나 브라우저를 다시 시작해도 재정의는 그대로 유지됩니다. 페이지에 재정의가 적용되어 있고 로그아웃한 상태인 경우 연결 화면에 해당 페이지에 저장된 재정의의 개수가 표시됩니다. 또한 **Clear all**을 제공하므로 로그인하지 않고도 재정의를 제거할 수 있습니다.

개별 재정의를 되돌리거나 테스트를 완료한 후 **Clear all**을 클릭한 다음 페이지를 새로 고쳐 애플리케이션에서 다시 Datadog의 플래그를 확인하도록 하세요.

### 재정의는 Datadog 사이트별로 적용 범위가 지정됩니다. {#overrides-are-scoped-to-a-datadog-site}

재정의는 Datadog 사이트별로 별도로 저장됩니다. 한 사이트에 연결된 상태에서 설정한 재정의는 다른 사이트에 연결된 상태에서는 적용되지 않습니다.

드롭다운에서 다른 사이트를 선택하면 적용되는 재정의가 변경됩니다. 탭에는 **Reload to apply `<SITE>`'s overrides** 배너가 표시됩니다. 페이지를 새로 고칠 때까지 페이지에서는 처음 로드한 재정의를 계속 사용합니다. 원래 사이트를 다시 선택하면 해당 사이트의 재정의가 복원됩니다. 사이트를 전환해도 재정의가 삭제되지 않습니다.

### 모든 재정의 지우기 {#clear-all-overrides}

**Clear all**은 재정의를 일괄적으로 제거하며 먼저 확인을 요청합니다. 제거되는 대상은 사용자가 로그인했는지 아닌지에 좌우됩니다.

| 상태 | 범위 |
| --- | --- |
| 로그인된 상태 | 연결된 사이트의 재정의만 제거합니다. 다른 사이트의 재정의는 그대로 유지됩니다. |
| 로그아웃된 상태| 연결된 사이트가 없어 작업 범위를 특정할 수 없으므로 모든 사이트의 재정의를 제거합니다. 확인 메시지에도 이 내용이 명시됩니다. |

재정의를 삭제하면 탭에서 페이지를 다시 로드하라는 프롬프트가 표시됩니다. 다시 로드할 때까지 해당 페이지에 지워진 재정의가 계속 적용됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://chromewebstore.google.com/detail/datadog-browser-sdk-devel/boceobohkgenpcpogecpjlnmnfbdigda
[2]: /ko/getting_started/site/
[3]: /ko/feature_flags/client/javascript/