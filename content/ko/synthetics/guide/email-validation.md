---
description: 브라우저 테스트 단계로 이메일과 내용 인증합니다.
further_reading:
- link: /synthetics/browser_tests/actions
  tag: 설명서
  text: 브라우저 테스트 절차 알아보기
- link: /synthetics/browser_tests/advanced_options/
  tag: 설명서
  text: 단계 고급 옵션 설정하기
kind: 설명서
title: 브라우저 테스트 중 이메일 인증 사용
---

## 개요

웹 애플리케이션 여정에는 이메일을 트리거하여 사용자 메일 수신함으로 전송하는 과정이 포함되어 있습니다. 예를 들어 계정 생성 후 이메일 주소를 확인하거나 잊어버린 비밀번호를 재설정하기 위해 이메일을 보내거나, 주문 확인 이메일을 전송하거나, 문의 양식을 제출한 뒤 확인 이메일을 전송하는 등의 경우가 있습니다.

웹 사이트에서 좋은 사용자 경험을 제공하려면 애플리케이션의 이메일 메커니즘이 제대로 작동해야 합니다.

## 이메일 변수 생성

이메일 변수 `EMAIL`를 추가하는 방법:

1. **Variables**를 클릭하고 드롭다운 메뉴에서 **Email**을 선택하세요.
2. 레코딩할 때 사용할 변수를 만드려면 **Add Variable**을 클릭하세요.

{{< img src="synthetics/guide/email-validation/adding-variable.mp4" alt="이메일 변수 생성" video="true" width="100%">}}

이메일 변수는 테스트를 실행할 때마다 Datadog에서 유지 관리하는 고유한 수신함을 생성하기 때문에 충돌 없이 브라우저 테스트가 실행됩니다.

## 레코드 단계

이메일 변수를 생성한 다음 인앱 트리거 후 [이메일이 바르게 전송되었는지 확인](#confirm-the-email-was-sent)할 수 있습니다.

**Start Recording**을 클릭하고 이메일 변수로 이메일이 트리거되기까지 필요한 단계를 모두 레코딩하세요. 변수에 있는 손 아이콘을 클릭해 양식이나 필드의 텍스트 입력란에 값을 넣습니다.

{{< img src="synthetics/guide/email-validation/record-steps.mp4" alt="단계 레코딩" video="true" width="100%">}}

양식을 완료하는 단계를 레코딩한 후 **Sign Up** 버튼을 클릭해 이메일 알림을 트리거하세요. 이 레코딩 세션에 맞춘 이메일이 Datadog 이메일 수신함으로 전송됩니다(예: `838-n3q-q2y.6238933596@synthetics.dtdg.co`). 

### 이메일 전송 확인

이메일 전송을 확인하려면 **Assertion**을 클릭하고 **Test that an email was received**를 선택하세요. 이메일이 특정 컨텐츠 가이드라인에 맞도록 하려면 제목과 본문에 추가 인증을 더할 수 있습니다.

{{< img src="synthetics/guide/email-validation/assertion-step.mp4" alt="어설션 추가" video="true" width="100%">}}

이 예시의 경우 이메일 제목이 `Welcome to Shopist!`이고, 본문에 `Your verification code is...`라는 문장이 포함되어 있으며 인증 코드가 `\d{1,6}` regex 패턴과 일치하면 어설션이 성공합니다.

### 이메일 링크 탐색

브라우저 테스트에서 전송된 이메일에 있는 링크를 탐색하도록 하는 방법:

1. **Navigation**을 클릭하고 **Go to email and click link**를 선택합니다. **Next**를 클릭하세요.
2. 테스트하고자 하는 링크가 포함된 이메일이 수신함에 나타납니다. **Next**를 클릭하세요.
3. 브라우저 테스트에서 탐색해야 하는 링크를 선택하세요. 아이프레임이나 팝업 URL이 지정 링크로 업데이트됩니다. **Save Navigation Step**를 클릭하세요.
4. 아이프레임이 연결 페이지 URL로 리디렉션됩니다. 단계 레코딩을 계속 진행하세요.

이 예시에서는 브라우저 테스트가 `Welcome to Shopist` 이메일을 살펴보고 `Verify your email by clicking here` 링크를 클릭한 후 사용자 등록 메커니즘이 정상적으로 작동하는지 확인합니다.

{{< img src="synthetics/guide/email-validation/navigation-step.mp4" alt="탐색 단계 추가" video="true" width="100%">}} 

브라우저 테스트의 마지막 단계에는 `div` 컨텐츠가 적절한 계정을 인증한 것을 확인하는 어설션을 생성하세요(예: 페이지에 `Your account is now verified`를 포함).


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}