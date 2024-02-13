---
aliases:
- /ko/tracing/faq/my-trace-agent-log-renders-empty-service-error/
further_reading:
- link: /tracing/troubleshooting/connection_errors
  tag: 설명서
  text: 연결 오류
- link: /tracing/troubleshooting/tracer_startup_logs/
  tag: 설명서
  text: Datadog 트레이서 스타트업 로그
- link: /tracing/troubleshooting/tracer_debug_logs/
  tag: 설명서
  text: Datadog 트레이서 디버그 로그
- link: /tracing/troubleshooting/agent_apm_metrics/
  tag: 설명서
  text: Datadog 에이전트로 전송한 애플리케이션 성능 모니터링(APM) 메트릭
kind: 설명서
title: 애플리케이션 성능 모니터링(APM) 트러블슈팅
---

Datadog 애플리케이션 성능 모니터링(APM)에서 예기치 않은 동작이 발생하는 경우, 일반적으로 나타나는 오류 몇 가지를 알아봅니다. 본 지침이 문제를 신속하게 해결하는 데 도움을 드릴 수 있습니다. 계속 문제가 발생하면 [Datadog 지원팀][1]에 문의하여 추가 지원을 받으시기 바랍니다. 각 릴리스에는 개선 사항과 수정 사항이 포함되어 있으므로 정기적으로 최신 버전의 Datadog 트레이싱 라이브러리를 업데이트하세요.

## 트러블슈팅 파이프라인

애플리케이션 성능 모니터링(APM) 데이터를 Datadog에 전송하는 것과 관련된 요소는 다음과 같습니다.

{{< img src="tracing/troubleshooting/troubleshooting_pipeline_info_1.png" alt="APM 트러블슈팅 파이프라인">}}

트레이스(JSON 데이터 유형) 및 [트레이싱 애플리케이션 메트릭][2]은 애플리케이션에서 생성되어 백엔드로 이전되기 전에 Datadog 에이전트에 전송됩니다. 파이프라인의 각 섹션에서 다양한 트러블슈팅 정보를 수집할 수 있습니다. 트레이서 디버그 로그는 애플리케이션의 로그에 기록되며, 이는 Datadog 에이전트 플레어와는 별도의 요소라는 점이 중요합니다. 해당 항목에 대한 자세한 내용은 하단의 [트러블슈팅 Datadog 지원팀이 요청한 데이터](#troubleshooting-data-requested-by-datadog-support)에서 확인하세요.

## 애플리케이션 성능 모니터링 설치 및 에이전트 상태 확인

시작 시 Datadog 트레이싱 라이브러리는 JSON 오브젝트에 적용된 설정과 발생한 모든 오류를 반영하는 로그를 내보냅니다. 해당 로그에는 에이전트가 가능한 언어로 접근할 수 있는지 여부가 포함됩니다. 일부 언어에서는 환경변수 `DD_TRACE_STARTUP_LOGS=true`로 활성화하는 시작 로그가 필요합니다. 시작 로그에 대한 자세한 내용을 확인하려면 트러블슈팅 [전용 페이지][3]를 참조하세요.

## 연결 오류

일반적인 문제의 원인은 계측 애플리케이션이 Datadog 에이전트와 통신 불가한 경우입니다. 이러한 문제를 식별 및 해결하는 방법을 확인하려면 [연결 오류][4]를 참조하세요.

## 트레이서 디버그 로그

Datadog 트레이서의 자세한 세부 사항을 캡처하려면 트레이서에서 `DD_TRACE_DEBUG` 환경변수를 사용하여 디버그 모드를 활성화합니다. 자체 점검을 목적으로 활성화하거나, Datadog 지원 팀이 분류 목적으로 활성화를 권장할 수 있습니다. 그러나 디버그 모드는 로깅 오버헤드를 유발하므로 계속 활성화한 상태로 두지 마십시오.

해당 로그는 계측 오류 또는 통합 특정 오류를 나타낼 수 있습니다. 디버그 로그를 활성화 및 캡처하는 방법에 대한 자세한 내용을 확인하려면 [디버그 모드 트러블슈팅 페이지][5]를 참조하세요.

## 데이터 볼륨 지침

계측한 애플리케이션은 현재 시간으로부터 최대 18시간 전, 최대 2시간 이후의 타임스탬프가 포함된 스팬(span)을 제출합니다.

표시된 글자수를 초과한 경우 Datadog은 다음 문자열을 잘라냅니다.

| 이름         | 문자 |
|--------------|------------|
| [서비스][6]    |  100       |
| 작업    |  100       |
| 유형         |  100       |
| [리소스][7]   |  5000      |
| [태그 키][8]    |  200       |
| [태그 값][8]  |  5000      |

아울러, 스팬(span)의 [스팬(span) 태그][8] 수는 1024를 초과할 수 없습니다.

Datadog에서는 설정된 40분 간격으로 아래와 같은 조합을 허용합니다. 데이터를 더 많이 수용하려면 [지원 팀][1]에 문의하여 사용 사례를 논의하세요.

- 고유한 환경 및 서비스 조합 1000개
- 환경당 고유 [부차적 기본 태그][16]값 30개
- 환경 및 서비스당 고유 작업 이름 100개
- 환경, 서비스, 작업 이름당 고유 리소스 1000개
- 환경 및 서비스당 고유 버전 30개

## 애플리케이션 성능 모니터링(APM) 속도 제한

Datadog 에이전트 로그에서 속도 제한 또는 초당 최대 이벤트에 대한 오류 메시지가 표시되면 아래의 [지침][9]에 따라 해당 제한값을 변경할 수 있습니다. 질문이 있는 경우 해당 제한값을 변경하기 전 Datadog [지원 팀][1]에 문의하세요.

## 애플리케이션 성능 모니터링(APM) 리소스 사용량

트레이스 수집 CPU 사용량 감지 및 적절한 에이전트 리소스 제한 계산값에 대한 내용을 확인하려면 [에이전트 리소스 사용량][10]을 참조하세요.

## 스팬(span) 수정, 폐기 또는 난독화

민감한 데이터를 스크러빙하거나, 서비스 점검 관련 트레이스를 삭제하거나, Datadog 에이전트 또는 일부 언어에서는 트레이싱 클라이언트로 설정될 수 있는 기타 불필요한 트래픽을 삭제하는 데 사용가능한 설정 옵션 몇 가지가 있습니다. 사용 가능한 옵션에 대한 자세한 내용을 확인하려면 [보안 및 에이전트 커스터마이징][11]을 참조하세요. 해당 문서에는 대표적인 예시가 기술되어 있으나, 고객님의 환경에 해당 옵션을 적용하는 데 도움이 필요하면 [Datadog 지원 팀][1]에 문의하세요.

## 서비스 명명 규칙 오류

서비스 개수가 [데이터 볼륨 가이드라인](#data-volume-guidelines)에 명시한 수치를 초과한다면 서비스 명명 규칙 모범 사례를 따릅니다.

### 서비스 이름에서 환경 태그 값 제외

기본적으로 환경(`env`)은 [Datadog 애플리케이션 성능 모니터링(APM)][17]의 기본 태그입니다.

{{< img src="/tracing/troubleshooting/troubleshooting-service-naming-convention-issues-3.png" alt="환경은 기본값으로 설정되는 기본 태그입니다." style="width:100%;" >}}

서비스는 대개 `prod`, `staging`, `dev` 등의 다중 환경에 배포됩니다. 요청 개수, 레이턴시, 오류율 같은 성능 메트릭은 여러 환경에 따라 달라집니다. 서비스 카탈로그의 환경 드롭다운 메뉴를 활용하여 **성능** 탭의 데이터를 특정한 환경 범위로 좁힐 수 있습니다.

{{< img src="/tracing/troubleshooting/troubleshooting-service-naming-convention-issues-2.png" alt="서비스 카탈로그의 `env` 드롭다운 메뉴에서 특정 환경 선택" style="width:100%;" >}}

서비스 개수의 과부하로 문제가 발생하는 패턴 중 하나는 서비스 이름에 환경 값을 포함하는 경우입니다. 예를 들어, `prod-web-store` 와 `dev-web-store`라는 별도의 개별 환경 두 개에서 운영되면 고유 서비스는 하나가 아니라 두 개일 수 있습니다.

Datadog 서비스의 이름을 변경하여 계측을 수정할 것을 권장합니다.

트레이스 메트릭은 샘플링되지 않으므로 계측한 애플리케이션에는 데이터의 하위 섹션 대신 전체 데이터가 표시됩니다. 아울러, [볼륨 지침](#data-volume-guidelines)도 적용됩니다.

### 메트릭 파티션을 삽입하거나 서비스 이름으로 변수를 그룹화하는 대신 부차적 기본 태그를 사용합니다.

부차적 기본 태그는 트레이스 메트릭을 그룹화 및 집계하는 데 활용할 수 있는 추가 태그입니다. 드롭다운 메뉴에서 성능 데이터를 지정한 클러스터 이름 또는 데이터 센터 값으로 범위 지정할 수 있습니다.

{{< img src="/tracing/troubleshooting/troubleshooting-service-naming-convention-issues-1.png" alt="드롭다운 메뉴에서 특정 클러스터 또는 데이터 센터 값 선택" style="width:100%;" >}}

부차적 기본 태그를 적용하는 대신 서비스 이름에 메트릭 파티션을 포함하거나 변수를 그룹화하면 계정의 고유 서비스 개수가 불필요하게 증가하여 레이턴시 또는 데이터 손실이 발생할 수 있습니다.

 예를 들어, `web-store` 서비스 대신 `web-store-us-1` , `web-store-eu-1`, `web-store-eu-2` 서비스의 인스턴스 이름을 다르게 지정하여 해당 파티션의 성능 메트릭을 모두 함께 확인하겠다고 결정할 수도 있습니다. Datadog은 **지역 값**(`us-1`, `eu-1`, `eu-2`)을 부차적 기본 태그로 설정할 것을 권장합니다.

## Datadog 지원 팀에서 요청한 트러블슈팅 데이터

[지원 티켓][1]을 생성하면 당사의 지원 팀이 아래와 같은 정보 유형 중 일부를 조합하여 요청할 수 있습니다.

1. **문제를 어떻게 확인하셨나요? 지원 팀에 트레이스 링크(선호) 또는 스크린샷을 보내주시고 예상되는 문제를 알려주세요.**

    지원 팀은 이를 통해 Datadog 테스트 환경에서 해당 오류를 확인하고 문제를 재연해 볼 수 있습니다.

2. **[트레이서 스타트업 로그](#confirm-apm-setup-and-agent-status)**

    스타트업 로그는 트레이서 설정이 잘못되었거나 트레이서가 Datadog 에이전트와 통신할 수 없는 문제를 식별할 수 있는 좋은 수단입니다. 지원 팀은 트레이서에 표시되는 설정을 애플리케이션 또는 컨테이너 설정과 비교하여 해당 설정이 제대로 적용되지 않는 부분을 식별할 수 있습니다.

3. **[트레이서 디버그 로그](#tracer-debug-logs)**

    트레이서 디버그 로그는 스타트업 로그보다 한 단계 더 깊이 들어가서 통합이 애플리케이션을 통하여 트래픽이 전송될 때까지는 필연적으로 확인할 수 없는 방식으로 제대로 계측되고 있는지 점검을 도와드립니다. 디버그 로그는 트레이서가 생성한 스팬(span)의 내용을 확인하는 데 매우 유용하며, 에이전트로 스팬(span) 전송 시 연결 문제가 있는 경우 오류를 식별해낼 수 있습니다. 트레이서 디버그 로그는 대개 트레이서의 미묘한 동작을 확인하는 데 가장 유용하면서도 신뢰할 수 있는 도구입니다.

4. **[Datadog 에이전트 플레어][12](로그의스냅샷 및 설정)는 [디버그 또는 트레이스 모드][13]에서 해당 로그의 어떤 정보를 찾고 있는지에 따라 Datadog 에이전트로 전송되는 시간 범위의 샘플 로그를 캡처합니다.**

    Datadog 에이전트 플레어를 사용하면 트레이스가 거부되거나 잘못된 경우와 같이 Datadog 에이전트 내에서 어떤 일이 일어나는지 확인할 수 있습니다. 본 문서는 트레이스가 Datadog 에이전트에 도달하지 못하는 문제에 관한 지침은 아니지만, 문제의 원인이나 메트릭 불일치를 식별하는 것을 도와드립니다.

    로그 레벨을 `debug` 또는 `trace` 모드로 수정할 시 로그 볼륨이 크게 증가하여 시스템 리소스(장기적으로는 저장 공간)가 소모된다는 점을 고려하시기 바랍니다. Datadog은 이를 트러블슈팅 목적으로만 일시적으로 사용하고 차후에는 `info` 레벨로 복원할 것을 권장합니다.

    **참고**: Datadog 에이전트 v7.19+ 및 [최신 버전][9] Datadog Helm Chart 를 사용하거나, Datadog 에이전트 및 트레이스 에이전트가 별도의 컨테이너에 존재하는 DaemonSet을 사용하는 경우, 트레이스 에이전트에서 플레어를 전송하려면 `datadog.yaml`에서 `log_level: DEBUG` 또는 `log_level: TRACE`로 다음 명령을 실행해야 합니다.

    {{< code-block lang="shell" filename="trace-agent.sh" >}}
kubectl exec -it <agent-pod-name> -c trace-agent -- agent flare <case-id> --local
    {{< /code-block >}}

5. ** 환경 설명**

    애플리케이션이 배포되는 방식을 알려주시면 지원 팀이 트레이서 에이전트 통신 문제나 잘못된 설정으로 발생할 수 있는 문제를 파악하는 데 도움이 됩니다. 해결하기 어려운 문제의 경우, 지원 팀은 쿠버네티스(Kubernetes) 매니페스트 또는 ECS 작업 정의를 참조할 것을 요청할 수도 있습니다.

6. **[커스텀 계측][14], 스팬(span) 태그 추가, 트레이서 설정과 같은 트레이싱 라이브러리를 사용하여 작성한 커스텀 코드입니다.**

    커스텀 계측은 강력한 도구가 될 수 있지만, Datadog 트레이스 시각화에 의도하지 않은 문제를 일으킬 수 있으므로, 지원 팀은 문제의 원인을 소거할 목적으로 이에 관해 문의할 수 있습니다.

    아울러, Datadog은 자동 계측 및 설정 정보를 요청하여 트레이서 스타트업 및 디버그 로그에 표시된 내용과 일치하는지 확인할 수 있습니다.

7. **버전:**
   * **계측한 애플리케이션 빌드에 사용되는 프로그래밍 언어, 프레임워크 및 종속성**
   * **Datadog 트레이서**
   * **Datadog 에이전트**

    사용 중인 버전을 알려주시면 [호환성 요구 사항][15] 섹션에서 통합 지원 여부를 확인하거나, 알려진 문제를 점검하거나, 문제 해결이 가능할 경우 트레이서 또는 언어 버전 업그레이드를 권장할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/help/
[2]: /ko/tracing/metrics/metrics_namespace/
[3]: /ko/tracing/troubleshooting/tracer_startup_logs/
[4]: /ko/tracing/troubleshooting/connection_errors/
[5]: /ko/tracing/troubleshooting/tracer_debug_logs/
[6]: /ko/tracing/glossary/#services
[7]: /ko/tracing/glossary/#resources
[8]: /ko/tracing/glossary/#span-tags
[9]: /ko/tracing/troubleshooting/agent_rate_limits
[10]: /ko/tracing/troubleshooting/agent_apm_resource_usage/
[11]: /ko/tracing/custom_instrumentation/agent_customization
[12]: /ko/agent/troubleshooting/send_a_flare/?tab=agentv6v7
[13]: /ko/agent/troubleshooting/debug_mode/?tab=agentv6v7
[14]: /ko/tracing/custom_instrumentation/
[15]: /ko/tracing/compatibility_requirements/
[16]: /ko/tracing/guide/setting_primary_tags_to_scope/?tab=helm#add-a-second-primary-tag-in-datadog
[17]: /ko/tracing/guide/setting_primary_tags_to_scope/