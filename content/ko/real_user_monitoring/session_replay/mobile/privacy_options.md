---
aliases: null
description: 모바일 세션 재생을 위한 개인정보 보호 옵션을 설정합니다.
further_reading:
- link: /real_user_monitoring/session_replay/mobile
  tag: 설명서
  text: 모바일 세션 재생
- link: /real_user_monitoring/session_replay/mobile/app_performance
  tag: 설명서
  text: 모바일 세션 재생이 앱 성능에 미치는 영향
- link: /real_user_monitoring/session_replay/mobile/setup_and_configuration
  tag: 설명서
  text: 모바일 세션 재생 설정 및 구성
- link: /real_user_monitoring/session_replay/mobile/troubleshooting
  tag: 설명서
  text: 모바일 세션 재생 트러블슈팅
- link: /real_user_monitoring/session_replay
  tag: 설명서
  text: 세션 재생
kind: 설명서
title: 모바일 세션 재생 개인정보 보호 옵션
---

## 개요

세션 재생은 모든 규모의 조직에서 민감한 데이터나 개인 데이터를 노출하지 않도록 개인정보 보호 제어 기능을 제공합니다. 데이터는 Datadog이 관리하는 클라우드 인스턴스에 저장되며 미사용시 암호화됩니다.

세션 재생의 기본 개인정보 보호 옵션은 최종 사용자의 개인 정보를 보호하고 민감한 조직 정보가 수집되지 않도록 합니다.

모바일 세션 재생을 활성화하면 민감한 요소가 RUM Mobile SDK를 통해 기록되지 않도록 자동으로 마스킹할 수 있습니다. 데이터가 마스킹되면 해당 데이터는 Datadog의 SDK에 의해 원래 형태로 수집되지 않으므로 백엔드로 전송되지 않습니다.

## 마스킹 모드 설정하기

아래 마스킹 모드를 사용하면 애플리케이션별로 기본 설정을 재정의할 수 있습니다.

### 모든 텍스트 요소를 마스킹

기본적으로 모든 데이터에 대해 `mask` 설정이 활성화되어 있으며, 이 설정을 활성화하면 아래와 같이 화면의 모든 텍스트 내용이 마스킹됩니다.

{{< img src="real_user_monitoring/session_replay/mobile/masking-mode-mask-all-2.png" alt="`mask`가 활성화된 경우 애플리케이션 화면은 다음과 유사할 수 있습니다." style="width:50%;">}}

{{< tabs >}}
{{% tab "Android" %}}

   {{< code-block lang="javascript" filename="build.gradle" disable_copy="false" collapsible="true" >}}

   // 모든 텍스트 요소 마스킹
   val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
       .setPrivacy(SessionReplayPrivacy.MASK)
       .build()
   SessionReplay.enable(sessionReplayConfig)
   {{< /code-block >}}

{{% /tab %}}
{{% tab "iOS" %}}

   {{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}

    // 모든 텍스트 요소 마스킹
    SessionReplay.enable(
        with: SessionReplay.Configuration(
            replaySampleRate: sampleRate,
            defaultPrivacyLevel: .mask
        )
    )

   {{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### 입력 요소만 마스킹

`mask user input` 설정을 활성화하면 모든 입력 필드가 익명 텍스트로 바뀝니다.

{{< img src="real_user_monitoring/session_replay/mobile/masking-mode-user-input-2.png" alt="사용자 입력 필드가 마스킹된 경우 애플리케이션 화면이 다음과 유사할 수 있습니다." style="width:50%;">}}

{{< tabs >}}
{{% tab "Android" %}}

   {{< code-block lang="javascript" filename="build.gradle" disable_copy="false" collapsible="true" >}}

   // 입력 요소만 마스킹
   val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
       .setPrivacy(SessionReplayPrivacy.MASK_USER_INPUT)
       .build()
   SessionReplay.enable(sessionReplayConfig)
   {{< /code-block >}}

{{% /tab %}}
{{% tab "iOS" %}}

   {{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}

   // 입력 요소만 마스킹
    SessionReplay.enable(
        with: SessionReplay.Configuration(
            replaySampleRate: sampleRate,
            defaultPrivacyLevel: .maskUserInput
        )
    )

   {{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### 허용 (마스킹 없음)

`allow` 설정을 활성화하면 모든 텍스트가 표시됩니다.

{{< img src="real_user_monitoring/session_replay/mobile/masking-mode-allow-all-2.png" alt="`allow`이 활성화된 경우 애플리케이션 화면은 다음과 유사할 수 있습니다." style="width:50%;">}}

**참고**: 이 옵션을 사용해도 비밀번호, 이메일, 전화 번호 및 주소와 같은 민감한 텍스트 필드는 여전히 마스킹됩니다. 자세한 내용은 [텍스트 마스킹 정의](#text-masking-definitions)를 참조하세요.

{{< tabs >}}
{{% tab "Android" %}}

   {{< code-block lang="javascript" filename="build.gradle" disable_copy="false" collapsible="true" >}}

   // 마스킹 없음; 모든 텍스트가 표시됨
   val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
      .setPrivacy(SessionReplayPrivacy.ALLOW)
      .build()
   SessionReplay.enable(sessionReplayConfig)
   {{< /code-block >}}

{{% /tab %}}
{{% tab "iOS" %}}

   {{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}
   // 마스킹 없음; 모든 텍스트가 표시됨
    SessionReplay.enable(
        with: SessionReplay.Configuration(
            replaySampleRate: sampleRate,
            defaultPrivacyLevel: .allow
        )
    )

   {{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## 마스킹되는 데이터의 종류와 방법

이 섹션에서는 데이터 유형에 따라 Datadog 레코더가 마스킹을 처리하는 방법과 해당 데이터를 정의하는 방법에 대해 설명합니다.
### 텍스트 마스킹 전략

개인정보 보호 설정, 텍스트 유형 및 데이터 민감도를 어떻게 설정하는지에 따라 Datadog의 마스킹 규칙은 다양한 유형의 텍스트 필드에 다른 전략을 적용합니다.

| 텍스트 마스킹 전략 | 설명 | 예시 |
|-----------------------|-------------|---------|
| 마스크 없음 | 텍스트가 세션 재생에 표시됨 | `"Hello world"` → `"Hello world"` |
| 공간 유지 마스크 | 눈에 보이는 각 문자가 소문자 "x"로 바뀜 | `"Hello world"` → `"xxxxx xxxxx"` |
| 고정 길이 마스크 | 전체 텍스트 필드가 세 개의 별표(***)로 구성된 정수로 바뀜 | `"Hello world"` → `"***"`

위의 텍스트 전략을 염두에 두고 설정에서 `mask`의 기본 개인정보 보호 규칙을 재정의하기 위해 몇 가지 옵션을 선택할 수 있습니다.

다음 차트는 Datadog이 설정에서 설정한 규칙을 사용하여 아래 텍스트 유형에 다양한 텍스트 마스킹 전략을 적용하는 방법을 보여줍니다.

| 유형 | 모두 허용 | 모두 마스킹 | 사용자 입력 마스킹 |
|------|-------------|------------|-------------------|
| [민감한 텍스트](#sensitive-text) | 고정 길이 마스크 | 고정 길이 마스크 | 고정 길이 마스크 |
| [입력 및 옵션 텍스트](#input-and-option-text) | 마스크 없음 | 고정 길이 마스크 | 고정 길이 마스크 |
| [정적 텍스트](#static-text) | 마스크 없음 | 공간 유지 마스크 | 마스크 없음 |
| [힌트 텍스트](#hint-text) | 마스크 없음 | 고정 길이 마스크 | 마스크 없음 |

### 텍스트 마스킹 정의

아래에서 Datadog의 레코더가 각 텍스트 유형을 어떻게 처리하는지 설명합니다.

#### 민감한 텍스트
민감한 텍스트에는 플랫폼별 방식으로 표시된 비밀번호, 이메일, 전화번호가 포함됩니다. 그리고 각 플랫폼에서 사용할 수 있는 기타 형태의 민감한 텍스트가 포함됩니다.

여기에는 비밀번호, 이메일 및 전화번호가 포함됩니다:

- 텍스트 필드 (iOS)
- 텍스트 보기 (iOS)
- 편집 텍스트 (Android)
- 주소 정보 (iOS + Android)
- 신용 카드 번호 (iOS) 
- 일회용 코드 (iOS)

#### 입력 및 옵션 텍스트

입력 및 옵션 텍스트는 사용자가 키보드나 기타 텍스트 입력 장치로 입력한 텍스트 또는 선택 요소의 사용자 지정(일반적이지 않은) 값입니다.

여기에는 아래 사항이 포함됩니다.

- 사용자가 입력한 텍스트:
  - 텍스트 필드 (iOS)
  - 텍스트 보기 (iOS)
  - 편집 텍스트 (Android)
- 사용자가 선택한 옵션:
  - 값 선택기 (iOS + Android)
  - 세그먼트 (iOS)
  - 드롭다운 목록 (Android)
- 중요한 제외 사항:
  - 텍스트 필드, 텍스트 보기 및 편집 텍스트의 플레이스홀더(힌트) 텍스트(사용자가 입력하지 않음)
  - 텍스트 보기(iOS)에서 편집할 수 없는 텍스트.
  - 날짜 선택기의 월, 일 및 연도 레이블(일반 값)

#### 정적 텍스트
정적 텍스트는 사용자가 직접 입력하지 않은 텍스트이며 다음을 포함합니다.

모든 텍스트:

- 체크박스 및 라디오 버튼 제목 (Android)
- 편집할 수 없는 텍스트 보기(iOS)의 텍스트
- 날짜 및 시간 선택기의 월, 일 및 연도 레이블
- 슬라이더의 현재 값과 같이 입력 요소와의 제스처 상호 작용에 따라 업데이트된 값
- 레이블, 탭 바, 탐색 바(iOS), 탭(Android)과 같은 "사용자 입력 요소"로 간주되지 않는 기타 컨트롤

#### 힌트 텍스트
힌트 텍스트는 편집 가능한 텍스트 요소 또는 옵션 선택기에 있는 정적 텍스트로, 값이 지정되지 않은 경우 표시됩니다. 여기에는 다음이 포함됩니다:

- 텍스트 필드(iOS), 텍스트 보기(iOS)의 플레이스홀더
- 편집 텍스트의 힌트 (Android)
- 드롭다운 목록의 프롬프트 (Android)

### 외형 마스킹

다음 차트는 설정에서 설정한 규칙을 사용하여 다양한 외형 마스킹 전략을 아래 텍스트 유형에 적용하는 방법을 보여줍니다.

| 유형 | 모두 허용 | 모두 마스킹 | 사용자 입력 마스킹 |
|------|-------------|------------|-------------------|
| [공개 속성](#revealing-attributes) |  | {{< X >}} | {{< X >}} |
| [기타 속성](#other-attributes) |  |  |  |

#### 공개 속성
공개 속성이란, 입력 요소의 값을 드러내거나 제안하여, 유저의 입력 내용이나 선택 내용을 추측하는데 사용할 수 있는 속성입니다.

여기에는 다음이 포함됩니다:

**형태**
- 세그먼트(iOS)에서 선택한 옵션의 배경
- 날짜 선택기에서 선택한 날짜를 둘러싼 원 (iOS)
- 체크박스 선택 표시 (Android)
- 슬라이더의 썸 (iOS and Android)

**텍스트 속성**
- Date Picker (iOS)에서 선택한 날짜를 렌더링하는 레이블 색상
- 값 선택기에서 첫번째 및 마지막 옵션 위치 (iOS and Android)

### 터치 상호작용

다음 차트는 설정에서 설정한 규칙을 사용하여 다양한 터치 상호 작용 전략을 아래 텍스트 유형에 적용하는 방법을 보여 줍니다. 화면 키보드에서 발생하는 상호 작용은 마스킹되지만 다른 요소와의 상호 작용은 마스킹되지 않습니다.

| 유형 | 모두 허용 | 모두 마스킹 | 사용자 입력 마스킹 |
|------|-------------|------------|-------------------|
| [기타 속성](#other-attributes) |  |  |  |
| [화면 키보드](#on-screen-keyboard) | {{< X >}} | {{< X >}} | {{< X >}} |

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}