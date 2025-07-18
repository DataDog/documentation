---
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: GitHub
  text: dd-sdk-android Source code
- link: /real_user_monitoring
  tag: 설명서
  text: 실제 사용자 모니터링 탐색
kind: 설명서
title: 트러블슈팅
---

## Datadog RUM이 초기화되었는지 확인
유틸리티 메서드 `isInitialized`를 사용하여 SDK가 제대로 초기화되었는지 확인합니다:

```kotlin
if (Datadog.isInitialized()) {
// 여기에 코드를 입력하세요.
}
```

## 디버깅
애플리케이션을 작성할 때 `setVerbosity` 메서드를 호출하여 개발 로그를 활성화할 수 있습니다. 그러면 라이브러리의 모든 내부 메시지 중 우선순위가 제공된 수준 이상이면 Android의 Logcat에 기록됩니다:

```kotlin
Datadog.setVerbosity(Log.INFO)
```

## 추적 동의 설정 (GDPR 준수)

GDPR 규정을 준수하기 위해 SDK는 초기화 시 추적 동의 값이 필요합니다. 추적 동의는 다음 값 중 하나일 수 있습니다:

- `TrackingConsent.PENDING`: (기본값) SDK가 데이터 수집 및 일괄 처리를 시작하지만 해당 데이터를
 수집 엔드포인트에 전송하지 않습니다. SDK는 새로운 추적 동의 값을 기다렸다가 일괄 처리된 데이터를 어떻게 처리할지 결정합니다.
- `TrackingConsent.GRANTED`: SDK가 데이터 수집을 시작하고 데이터 수집 엔드포인트로 전송합니다.
- `TrackingConsent.NOT_GRANTED`: SDK에서 데이터를 수집하지 않습니다. 로그, 트레이스를 수동으로 보낼 수 없습니다
 RUM 이벤트.

SDK를 초기화한 후 추적 동의를 업데이트하려면 `Datadog.setTrackingConsent(<NEW CONSENT>)`를 호출합니다. SDK는 새 동의에 따라 동작을 변경합니다. 예를 들어, 현재 추적 동의가 `TrackingConsent.PENDING`이고 다음으로 업데이트하는 경우:

- `TrackingConsent.GRANTED`: SDK는 현재 일괄 처리된 모든 데이터와 향후 데이터를 데이터 수집 엔드포인트로 직접 전송합니다.
- `TrackingConsent.NOT_GRANTED`: SDK는 모든 일괄 처리된 데이터를 삭제하고 이후 데이터를 수집하지 않습니다.

## 디바이스가 오프라인일 때 데이터 전송

RUM은 사용자 디바이스가 오프라인 상태일 때 데이터 가용성을 보장합니다. 네트워크 연결이 원활하지 않은 지역이나 디바이스 배터리가 너무 부족한 경우 모든 RUM 이벤트는 먼저 로컬 디바이스에 일괄적으로 저장됩니다.

각 배치는 인테이크 사양을 따릅니다. 네트워크가 사용 가능한 즉시 전송되며, 배터리가 충분히 충전되어 있어 Datadog SDK가 최종 사용자 경험에 영향을 미치지 않습니다. 애플리케이션이 포그라운드에 있는 동안 네트워크를 사용할 수 없거나 데이터 업로드가 실패하는 경우, 배치는 성공적으로 전송될 때까지 유지됩니다.

즉, 사용자가 오프라인 상태에서 애플리케이션을 열어도 데이터가 손실되지 않습니다. SDK가 너무 많은 디스크 공간을 사용하지 않도록 디스크의 데이터가 너무 오래되면 자동으로 삭제됩니다.

## 2.0.0으로 마이그레이션

SDK v1을 사용한 경우 `2.0.0` 버전에 몇 가지 변경 사항이 추가되었습니다. 자세한 내용은 [마이그레이션 가이드][1]를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android/blob/develop/MIGRATION.MD