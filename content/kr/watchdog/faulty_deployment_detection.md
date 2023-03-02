---
kind: 설명서
title: 자동 결함 배포 감지
---

## 개요

자동 결함 배포 감지 기능은 결함 코드 배포를 몇 분 안에 찾아 평균 감지 시간(MTTD)을 단축합니다. 코드가 프로덕션에 배포될 때마다 Watchdog은 새 코드 버전의 성능을 이전 버전과 비교하여 배포에 나타난 새로운 유형의 오류를 찾아냅니다. Watchdog에서 새로운 배포에 결함이 있다고 판단하면 영향을 받는 서비스에 대한 상세 정보가 APM 서비스 페이지와 영향을 받는 엔드포인트의 리소스 페이지에 나타납니다.

Watchdog이 현재 활성화된 버전에 결함이 있음을 발견하면 아래 스크린샷과 같이 [APM service][1] 페이지 상단에 노란색 배너로 표시됩니다. 서비스의 배포 기록을 제공하는 화면 하단의 배포 표에는 과거에 Watchdog에서 결함이 있다고 확인한 버전도 표시됩니다.

{{< img src="watchdog/faulty_deployment.png" alt="상단에 노란색 배너가 표시되고 하단에 배포 표가 표시된 APM 서비스 페이지" >}}

노란색 배너에서 **View Details**를 클릭하여 결함 배포에 대한 추가 정보가 있는 슬라이드 아웃 패널을 엽니다. 이 보기는 새로 감지된 오류의 유형, 영향을 받는 엔드포인트, HTTP 상태 코드를 포함하여 결함 배포에 대한 상세 정보를 제공합니다. 배포 표에서 아무 버전이나 클릭하여 이 보기에 액세스할 수도 있습니다. 아래 스크린샷은 오류 유형 `db.utils.OperationalError`이(가) ` /inventory` 엔드포인트에 영향을 미치고 결과적으로 HTTP 상태 코드 `(500)`이(가) 발생하는 상세 보기의 예시를 보여줍니다.

{{< img src="watchdog/faulty_deployment_details.png" alt="결함 배포 추적 상세 정보 패널" >}}

결함 배포가 감지될 때마다 Watchdog은 이를 [Event Explorer][2]에 이벤트로 추가합니다. 이러한 이벤트에 대해 자동으로 알림을 받도록 모니터를 설정할 수 있습니다. 이렇게 하려면 [New Monitors][3] 페이지로 이동하여 **Events**를 선택하고 모니터를 정의하는 검색 쿼리에 `tags:deployment_analysis`을(를) 포함합니다.

**Suggested Monitors** 버튼을 클릭한 다음 **Enable**를 클릭하여 모니터를 활성화할 수도 있습니다. Suggested Monitors 버튼은 서비스에 모니터가 아직 구성되지 않은 경우에만 사용할 수 있습니다. 해당 버튼을 사용할 수 없는 경우에는 위의 지침에 따라 [New Monitors][3] 페이지에서 모니터를 생성하세요.

각 배포는 반복적으로 분석됩니다. 동일한 결함 배포에 대한 재경고를 방지하기 위해 Datadog는 모니터의 복구 시간을 60분으로 설정할 것을 권장합니다.

{{< img src="watchdog/faulty_deployment_suggested_monitors.png" alt="Suggested Monitors 버튼이 있는 APM 서비스 페이지" >}}

### 오류가 있는데도 새로운 배포가 결함이 있다고 플래그 지정되지 않은 이유는 무엇인가요?

Watchdog은 새로운 배포가 오류의 원인에 해당하는지 확인하려고 시도합니다. 다음과 같은 이유가 복합적으로 작용하면 그렇지 않다고 판단할 수 있습니다.

- 이러한 유형의 오류는 새로운 것으로 보이지 않습니다. 이전 버전이나 최근 배포 중에 나타납니다.
- 이러한 유형의 오류는 적고 일시적이며, 새 버전이 그대로 유지되더라도 시간이 지나면 사라집니다.
- 분석 기준선을 설정하기 위한 Watchdog의 최근 기록에 이전 배포가 충분히 있지 않았습니다.

[1]: https://app.datadoghq.com/apm/services
[2]: /kr/events/explorer
[3]: https://app.datadoghq.com/monitors/create