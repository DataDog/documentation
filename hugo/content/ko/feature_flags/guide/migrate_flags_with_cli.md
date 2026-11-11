---
description: Datadog Flag Migration CLI를 사용하여 다른 공급자의 기능 플래그를 Datadog Feature Flags로
  마이그레이션하는 방법을 알아보세요.
further_reading:
- link: /feature_flags/
  tag: 설명서
  text: Feature Flags 개요
- link: /feature_flags/guide/migrate_from_launchdarkly
  tag: 가이드
  text: LaunchDarkly에서 Feature Flags 마이그레이션하기
title: Flag Migration CLI로 Feature Flags 마이그레이션하기
---
## 개요 {#overview}

[Datadog Flag Migration CLI][1]는 다른 공급자의 기능 플래그를 [Datadog Feature Flags][2]로 마이그레이션하는 데 도움이 되는 명령줄 도구입니다. CLI는 소스 공급자로부터 플래그 정의를 읽고 Datadog에서 이를 다시 생성하며, 가능한 경우에는 타겟팅 규칙, 변형 및 롤아웃 구성을 유지합니다.

<div class="alert alert-info">Eppo에서 플래그를 마이그레이션하면 Eppo 호환 버킷팅이 유지됩니다. 기존 대상은 플래그 평가를 Datadog으로 전환한 후에도 동일한 변형을 계속 수신합니다.</div>

## 전제 조건 {#prerequisites}

CLI를 실행하기 전에 Datadog 조직이 설정되어 있는지 확인하세요.

- **사용자 및 Teams**: Datadog 조직에는 플래그를 관리하는 데 필요한 사용자와 Teams가 프로비저닝되어 있어야 합니다. CLI는 사용자나 Teams를 대신 생성하지 않습니다.
- **Feature Flag 환경**: 마이그레이션할 [Feature Flag 환경][3]을 먼저 생성한 후에 CLI를 실행해야 합니다. CLI는 환경을 대신 생성하지 않습니다.

마이그레이션 작동 방식 및 지원되는 공급자에 대한 자세한 내용은 [GitHub 리포지토리][1]를 참조하세요.

## CLI 실행 {#run-the-cli}

`npx`를 사용하여 마이그레이션을 실행하세요.

```bash
npx @datadog/dd-flag-migration migrate
```

전체 구성 옵션, 지원되는 소스 공급자, 인증 설정 및 문제 해결에 대한 자세한 내용은 [`dd-flag-migration` GitHub의 README][1]를 참조하시기 바랍니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-flag-migration
[2]: /ko/feature_flags/
[3]: /ko/feature_flags/concepts/environments/