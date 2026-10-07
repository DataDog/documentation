---
aliases:
- /ko/synthetics/guide/synthetic-test-monitors/
description: Synthetic 테스트 모니터를 생성하고 관리하면 웹 및 API 테스트가 실패하거나 성능이 저하될 때 알림을 받을 수 있습니다.
further_reading:
- link: /monitors/manage/
  tag: 설명서
  text: 모니터 관리 방법 알아보기
- link: /synthetics/notifications/
  tag: 설명서
  text: Synthetic Monitoring 알림에 대해 자세히 알아보기
title: Synthetic 모니터
---
## 개요 {#overview}

Synthetic 테스트를 생성하면 Datadog이 자동으로 관련 모니터를 생성합니다. Synthetic 테스트 모니터에서 경보가 발생할 때 알림을 받도록 설정할 수 있습니다.

## Synthetic 테스트 모니터 생성 {#create-a-synthetic-test-monitor}

<div class="alert alert-info">애플리케이션의 <a href="https://app.datadoghq.com/synthetics/tests">Synthetic Monitoring</a> 섹션 내에서만 <strong>Synthetic 테스트 모니터</strong>를 생성할 수 있습니다. 일반 <a href="https://app.datadoghq.com/monitors">Monitors</a> 페이지는 메트릭, 로그 또는 프로세스를 기반으로 하는 모니터와 같은 다른 유형의 모니터를 생성하는 데 사용됩니다.</div>

Synthetic Monitoring 테스트가 실패할 때 알림을 보내려면 새 Synthetic 테스트 또는 기존 Synthetic 테스트의 {{< ui >}}Monitor{{< /ui >}} 섹션에서 모니터를 생성하세요. 모니터는 생성한 Synthetic 테스트에 연결되며 Synthetic 테스트 구성에서 설정한 경보 조건을 기준으로 동작합니다. 모니터 속성 및 태그 변수를 사용하려면 [메트릭 모니터][1]를 생성하세요.

Synthetic Monitoring의 모니터 메시지는 다음으로 구성됩니다.

- {{< ui >}}Title{{< /ui >}}: 모니터 이름입니다.
- {{< ui >}}Custom message{{< /ui >}}: 모니터를 생성할 때 작성하는 선택적 텍스트입니다.
- {{< ui >}}Auto-appended summary{{< /ui >}}: 실패한 위치, 오류 메시지 및 테스트 링크가 포함됩니다.
- {{< ui >}}Footer{{< /ui >}}: 마지막으로 실패한 테스트 실행의 세부 정보가 포함됩니다. </br><br>

{{< img src="synthetics/guide/synthetics_test_monitors/configure_the_monitor_for_this_test_2.png" alt="Synthetic 테스트에서 모니터 생성하기" style="width:90%;">}}

## Synthetic 모니터 보기 및 관리 {#view-and-manage-synthetic-monitors}

- [{{< ui >}}Manage Monitors{{< /ui >}}][2] 페이지에서 검색할 수 있도록 모니터 이름을 사용자 지정하세요. Synthetic 테스트 모니터를 찾으려면 검색창에서 `type:synthetics`로 필터링하세요. 모니터 [조건부 변수][3]를 사용하여 테스트 상태에 따라 알림 메시지를 구성할 수 있습니다. 

- Synthetic 테스트 모니터는 이메일, Slack, PagerDuty, Microsoft Teams와 같은 알림 채널과 통합됩니다. 자세한 정보는 [알림][4]을 참조하세요.

- Datadog에서는 여러 단계의 알림을 설정하는 경우(예: Synthetic 테스트에서 경보가 오래 지속될수록 더 많은 팀에 알림), Synthetic 모니터에서 [재알림][5]을 사용할 것을 권고합니다.

## 자동으로 추가되는 태그 {#automatically-added-tags}

사용자가 추가하는 사용자 지정 태그 외에도, Datadog은 테스트 구성에 따라 Synthetic 테스트 모니터에 다음 태그를 추가합니다. 이러한 태그를 사용하여 [{{< ui >}}Manage Monitors{{< /ui >}}][2] 페이지 또는 Synthetic Monitoring 테스트 목록에서 검색하고 필터링하세요.

| 태그 키             | 사용 가능한 값                                                                 | 태그가 나타내는 정보                                                                                                    |
|----------------------|-----------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| `check_type`         | `api`, `browser`, `api-ssl`, `api-dns`, `api-tcp`, `api-icmp`, `api-grpc`, `api-udp`, `api-websocket`, `api-multi`, `mobile` | 테스트 유형 및 하위 유형(해당되는 경우)입니다. `http` 하위 유형은 간결하게 표시하기 위해 `api` 테스트에서 생략됩니다.        |
| `check_status`       | `live`, `paused`                                                                   | 테스트가 활성 상태인지 일시 중지 상태인지 여부입니다.                                                                              |
| `probe_dc`           | `aws:us-east-1`, `aws:eu-west-1` 및 기타 관리형 또는 프라이빗 위치          | 테스트가 실행되는 위치입니다. 여러 위치에서 실행되는 테스트에는 할당된 각 위치별로 하나의 `probe_dc` 태그가 지정됩니다.         |
| `ci_execution_rule`  | `blocking`, `non_blocking`                                                         | 테스트의 CI/CD 실행 규칙입니다. 이 태그는 테스트를 CI/CD 파이프라인에서 품질 게이트로 사용할 때 추가됩니다.              |

이러한 태그는 테스트를 수정하면 자동으로 업데이트되므로 테스트의 위치가 변경되거나, 일시 중지되거나, CI/CD 구성이 변경되어도 정확하게 검색할 수 있습니다. `tag` 패싯을 사용하고 전체 `key:value` 쌍을 따옴표로 묶어 태그를 검색합니다. 예를 들면 다음과 같습니다.

- `type:synthetics tag:"check_status:live"`는 모든 활성 상태의 Synthetic 테스트 모니터를 찾습니다.
- `type:synthetics tag:("probe_dc:aws:us-east-1" AND "probe_dc:aws:ap-northeast-1")` 두 위치 모두에서 실행되는 테스트를 찾습니다.
- `type:synthetics tag:"ci_execution_rule:blocking"` 실패 시 CI/CD 파이프라인을 차단하도록 구성된 테스트를 찾습니다.

### 모니터 알림 맞춤 설정 {#tailor-monitor-notifications}

인시던트 관리 전략에 따라 Synthetic 테스트에서 경보가 발생할 때 여러 팀이 참여해야 할 수 있습니다. 첫 번째 경보 이후 발생하는 후속 경보에서만 팀 B에 알림을 보내려면 팀 B에 대한 알림을 `로 묶습니다.{{#is_renotify}}` and `{{/is_renotify}`. [조건부 변수][3]를 사용하여 모니터 속성에 따라 알림 메시지를 보다 세부적으로 구성하세요. 

{{< img src="synthetics/guide/synthetics_test_monitors/renotification_toggle_2.png" alt="경보가 발생한 모니터가 재알림을 보낼 시간 간격을 선택하세요." style="width:90%;">}}

재알림을 활성화하려면 {{< ui >}}Enable renotification{{< /ui >}}을 토글하고 드롭다운 메뉴에서 시간 간격을 선택하세요.

Synthetic Monitoring 알림이 테스트 결과를 평가하고 경보를 발생시키는 방법에 대한 자세한 내용은 [Synthetic 모니터 경보 이해하기][7]를 참조하세요.

## 향상된 알림 {#enhanced-notifications}

Synthetic 모니터를 사용하고 확장하여 Synthetic Monitoring 테스트가 실패할 때 더 자세한 알림을 전송하세요. 다음과 같은 기능을 사용할 수 있습니다.

미리 입력된 모니터 메시지
: 미리 입력된 모니터 메시지는 Synthetic 테스트 경보를 위한 구조화된 시작점을 제공합니다. 각 메시지에는 표준화된 제목, 요약 및 테스트 메타데이터를 포함하는 바닥글이 있어 경보를 한눈에 더 쉽게 파악할 수 있습니다.

템플릿 변수
: 템플릿 변수를 사용하면 테스트별 데이터를 모니터 알림에 동적으로 삽입할 수 있습니다. 이러한 변수는 `synthetics.attributes`에서 가져옵니다.

고급 사용
: 고급 사용에는 더 심층적인 테스트 인사이트를 표시하거나 handlebars 템플릿을 사용하여 복잡한 메시지를 구성하는 방법이 포함됩니다.

조건부 경보
: 조건부 경보를 사용하면 특정 테스트 결과 또는 오류 조건에 따라 모니터 알림의 내용을 변경할 수 있습니다.

자세한 내용은 [Synthetic Monitoring 알림][6]을 참조하세요.

## Bits Investigation 시작하기 {#launch-a-bits-investigation}

Synthetic 브라우저 또는 API 테스트 모니터가 경고 상태가 되면 [Bits Investigation][8]을 실행하여 근본 원인을 파악할 수 있습니다. Bits Investigation은 테스트 결과, 트레이스, 로그, 메트릭을 분석하여 근본 원인을 파악하고, 실패 유형(회귀 또는 구성 오류)을 표시합니다. 또한 Synthetic 모니터에서 {{< ui >}}Auto-Investigate{{< /ui >}}을 토글하여 경보 발생 시 자동으로 조사를 시작할 수도 있습니다.

## 모범 사례 {#best-practices}

- 메시지가 누락되지 않도록 항상 기본 `@notification` (조건 외부)을 포함하세요.
- 복구 시 일관된 전달 경로가 필요한 PagerDuty와 같은 페이징 도구에는 복잡한 로직을 사용하지 마세요.
- 조건부 로직을 사용하여 경보 텍스트를 재정의하거나, 우선순위를 변경하거나, 팀별로 알림을 분할하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/monitors/types/metric/
[2]: /ko/monitors/manage/
[3]: /ko/monitors/notify/variables/?tab=is_alert#conditional-variables
[4]: /ko/monitors/notify/#notification-recipients
[5]: /ko/monitors/notify/#renotify
[6]: /ko/synthetics/notifications
[7]: /ko/synthetics/guide/how-synthetics-monitors-trigger-alerts/
[8]: /ko/bits_ai/bits_investigation/investigate_issues/