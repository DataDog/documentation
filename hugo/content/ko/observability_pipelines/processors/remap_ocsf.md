---
description: OCSF로 다시 매핑 프로세서를 사용하여 로그를 OCSF(Open Cybersecurity Schema Framework)
  이벤트에 매핑하는 방법을 알아보세요.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: OCSF로 다시 매핑 프로세서
---
{{< product-availability >}}

## 개요 {#overview}

이 프로세서를 사용하여 로그를 OCSF(Open Cybersecurity Schema Framework) 이벤트에 다시 매핑하세요. OCSF 스키마 이벤트 클래스는 특정 로그 소스 및 유형에 대해 설정됩니다. 하나의 프로세서에 여러 매핑을 추가할 수 있습니다. **참고**: Datadog은 다른 모든 프로세서가 로그를 처리한 후에 다시 매핑이 수행되도록 OCSF 프로세서를 파이프라인의 마지막 프로세서로 설정할 것을 권장합니다.

## 설정 {#setup}

이 프로세서를 설정하려면 다음 단계를 따르세요.

{{< ui >}}Manage mappings{{< /ui >}}를 클릭합니다. 그러면 모달이 열립니다.

- 이미 매핑을 추가했다면 목록에서 매핑을 클릭하여 편집하거나 삭제합니다. 검색 창을 사용하여 이름으로 매핑을 찾을 수 있습니다. 다른 매핑을 추가하려면 {{< ui >}}Add Mapping{{< /ui >}}을 클릭합니다. {{< ui >}}Library Mapping{{< /ui >}} 또는 {{< ui >}}Custom Mapping{{< /ui >}}을 선택하고 {{< ui >}}Continue{{< /ui >}}를 클릭합니다.
- 아직 매핑을 추가하지 않았다면 {{< ui >}}Library Mapping{{< /ui >}} 또는 {{< ui >}}Custom Mapping{{< /ui >}}을 선택합니다. {{< ui >}}Continue{{< /ui >}}를 클릭합니다.

{{% collapse-content title="라이브러리 매핑" level="h3" expanded=false id="library_mapping" %}}

### 매핑 추가 {#add-a-mapping}

1. 드롭다운 메뉴에서 로그 유형을 선택합니다.
1. 필터 쿼리를 정의합니다. 지정된 필터 쿼리와 일치하는 로그만 다시 매핑됩니다. 모든 로그는 필터 쿼리와 일치하는지 여부에 관계없이 파이프라인의 다음 단계로 전송됩니다. 자세한 내용은 [검색 구문][1]을 참조하세요.
1. 샘플 소스 로그와 결과 OCSF 출력을 검토합니다.
1. {{< ui >}}Save Mapping{{< /ui >}}을 클릭합니다.

### 라이브러리 매핑 {#library-mappings}

사용 가능한 라이브러리 매핑은 다음과 같습니다.

| 로그 소스             | 로그 유형                                      | OCSF 카테고리                 | 지원되는 OCSF 버전|
|------------------------|-----------------------------------------------|-------------------------------| -----------------------|
| AWS CloudTrail         | 유형: 관리<br>EventName: ChangePassword | 계정 변경(3001)         | 1.3.0<br>1.1.0         |
| AWS GuardDuty          | 모든 탐지 유형                             | 탐지 결과(2004)      | 1.3.0                  |
| AWS WAF                | WebACL                                        | HTTP 활동(4002)          | 1.3.0                  |
| GitHub                 | 사용자 생성                                   | 계정 변경(3001)         | 1.1.0                  |
| Google Cloud Audit     | CreateBucket                                  | 계정 변경(3001)         | 1.3.0<br>1.1.0         |
| Google Cloud Audit     | CreateSink                                    | 계정 변경(3001)         | 1.3.0<br>1.1.0         |
| Google Cloud Audit     | SetIamPolicy                                  | 계정 변경(3001)         | 1.3.0<br>1.1.0         |
| Google Cloud Audit     | UpdateSync                                    | 계정 변경(3001)         | 1.3.0<br>1.1.0         |
| Google Workspace Admin | addPrivilege                                  | 사용자 계정 관리(3005)| 1.1.0                  |
| Infoblox               | Audit API                                     | API 활동(6003)           | 1.3.0                  |
| Infoblox               | 감사 인증                          | 인증(3002)         | 1.3.0                  |
| Infoblox               | DHCP                                          | DHCP 활동(4004)          | 1.3.0                  |
| Infoblox               | DNS 쿼리                                     | DNS 활동(4003)           | 1.3.0                  |
| Infoblox               | 포트                                          | 기본 이벤트(0)                | 1.3.0                  |
| Microsoft 365 Defender | 인시던트                                      | 인시던트 결과(2005)        | 1.3.0<br>1.1.0 |
| Okta                   | 사용자 세션 시작                            | 인증(3002)         | 1.1.0                  |
| Palo Alto Networks     | 위협                                        | 네트워크 활동(4001)       | 1.3.0                  |
| Palo Alto Networks     | 트래픽                                       | 네트워크 활동(4001)       | 1.1.0                  |
| Zscaler ZPA            | 사용자 활동                                 | 네트워크 활동(4001)       | 1.3.0                  |
| Zscaler ZPA            | 사용자 상태                                   | 인증(3002)         | 1.3.0                  |

{{% /collapse-content %}}

{{% collapse-content title="사용자 지정 매핑" level="h3" expanded=false id="custom_mapping" %}}

사용자 지정 매핑을 설정할 때 모달을 닫거나 종료하려고 하면 매핑을 내보내라는 메시지가 표시됩니다. Datadog은 지금까지 설정한 내용을 저장하기 위해 매핑을 내보낼 것을 권장합니다. 내보낸 매핑은 JSON 파일로 저장됩니다.

사용자 지정 매핑을 설정하려면 다음 단계를 따르세요.

1. 필요시 매핑 이름을 추가합니다. 기본 이름은 `Custom Authentication`입니다.
1. {{< ui >}}filter query{{< /ui >}}를 정의합니다. 자세한 내용은 [로그 검색 구문][1]을 참조하세요.
   - 필터와 일치하는 로그만 다시 매핑됩니다.
   - 모든 로그는 필터 쿼리와 일치하는지 여부에 관계없이 파이프라인의 다음 단계로 전송됩니다.
1. 드롭다운 메뉴에서 OCSF 이벤트 카테고리를 선택합니다.
1. 드롭다운 메뉴에서 OCSF 이벤트 클래스를 선택합니다.
1. 필드를 추가할 때 참조할 수 있도록 로그 샘플을 입력합니다.
1. {{< ui >}}Continue{{< /ui >}}를 클릭합니다.
1. 추가하려는 OCSF 프로필을 선택합니다. 자세한 내용은 [OCSF 스키마 브라우저][1]를 참조하세요.
1. 모든 필수 필드가 표시됩니다. 해당 항목에 필요한 {{< ui >}}Source Logs Fields{{< /ui >}} 및 {{< ui >}}Fallback Values{{< /ui >}}를 입력합니다. 필드를 수동으로 더 추가하려면 {{< ui >}}+ Field{{< /ui >}}를 클릭합니다. 휴지통 아이콘을 클릭하여 필드를 삭제합니다. **참고**: 필수 필드는 삭제할 수 없습니다.
    - 로그에 소스 로그 필드가 없는 경우 OCSF 필드에 폴백 값이 사용됩니다.
    - {{< ui >}}Source Log Fields{{< /ui >}}에 대해 여러 필드를 추가할 수 있습니다. 예를 들어, Okta의 `user.system.start` 로그에는 `eventType` 또는 `legacyEventType` 필드가 있습니다. 두 필드 모두 동일한 OCSF 필드에 매핑할 수 있습니다.
    - JSON 형식의 자체 OCSF 매핑이 있거나 사용하려는 이전 매핑을 저장한 경우 {{< ui >}}Import Configuration File{{< /ui >}}을 클릭하세요.
1. {{< ui >}}Continue{{< /ui >}}를 클릭합니다.
1. 일부 로그 소스 값은 OCSF 값에 매핑해야 합니다. 예를 들어, OCSF의 `severity_id` 필드에 매핑된 소스 로그의 심각도 필드 값은 OCSF `severity_id`의 값에 매핑해야 합니다. OCSF 값 목록은 [인증][2]의 `severity_id`를 참조하세요. 심각도 값 매핑 예시:
    | 로그 소스 값 | OCSF 값      |
    | ---------------- | --------------- |
    | `INFO`           | `Informational` |
    | `WARN`           | `Medium`        |
    | `ERROR`          | `High`          |
1. OCSF 값에 매핑해야 하는 모든 값이 나열됩니다. 추가 값을 매핑하려면 {{< ui >}}+ Add Row{{< /ui >}}를 클릭하세요.
1. {{< ui >}}Save Mapping{{< /ui >}}을 클릭합니다.

[1]: https://schema.ocsf.io/
[2]: https://schema.ocsf.io/1.4.0/classes/authentication?extensions=

{{% /collapse-content %}}

## 상태 메트릭 {#health-metrics}

모든 프로세서에서 내보내는 [구성 요소 메트릭][3] 및 [프로세서 버퍼 메트릭][4]은 [파이프라인 사용량 메트릭][5] 설명서를 참조하세요. OCSF Mapper 프로세서 메트릭별로 필터링하거나 그룹화하려면 `component_type:ocsf_mapper` 태그를 사용하세요.

[1]: /ko/observability_pipelines/search_syntax/logs/
[3]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[4]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[5]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/