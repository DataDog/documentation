---
aliases:
- /ko/serverless/deployment_tracking
further_reading:
- link: /serverless/distributed_tracing
  tag: 설명서
  text: 서버리스용 배포 추적
- link: /serverless/serverless_tagging
  tag: 설명서
  text: 서버리스 태깅
title: AWS 람다 서버리스 애플리케이션을 위한 배포 추적
---

배포 추적을 사용하면 새 버전의 코드나 설정 변경 사항이 오류, 성능 저하를 일으키거나 클라우드 환경이 예상 상태를 벗어날 때 상황을 파악할 수 있습니다.

서버리스 애플리케이션에 대한 배포 추적에 액세스하려면 [서버리스 보기][1]에서 함수를 선택하여 사이드 패널을 열고 **배포** 탭 을 클릭합니다. 그러면 호출, 실행 기간 및 오류 개수와 같은 주요 서버리스 메트릭이 자동으로 코드 배포와 함수 관련 설정을 표시하는 오버레이에 표시됩니다.

이전 코드와 설정 변경 사항을 명확히 파악할 수 있도록 보기의 오른쪽 상단에서 글로벌 시간 선택기를 조정합니다.

## 설정

Datadog는 AWS CloudTrail에서 AWS 람다 함수를 위한 코드 및 설정 변경 사항을 수집합니다.

이미 하지 않은 경우 먼저 [Amazon Web Services][2]를 설정합니다. 그런 다음, 다음 권한을 AWS/Datadog 역할에 맞는 정책 설명서에 추가합니다.

```text
cloudtrail:LookupEvents
```

이미 권한을 추가하였지만 AWS 람다 함수 이벤트를 여전히 볼 수 없는 경우 AWS 람다 통합 타일을 사용해 배포 추적을 활성화합니다.

{{< img src="serverless/lambda_integration_settings.png" alt="Lambda Integration Settings" style="width:100%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/functions
[2]: /ko/integrations/amazon_web_services/#setup