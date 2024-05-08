---
aliases:
- /ko/logs/guide/restrict-access-to-sensitive-data-with-rbac
further_reading:
- link: /logs/guide/logs-rbac/
  tag: 설명서
  text: 로그 관리용으로 역할 기반 접근 제어(RBAC)를 설정합니다.
- link: /agent/logs/advanced_log_collection
  tag: 설명서
  text: 고급 로그 수집으로 로그 필터링 및 삭제
- link: /agent/guide/autodiscovery-management/
  tag: 설명서
  text: 자동탐지 기능으로 로그 수집에서 컨테이너 제외
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: 블로그
  text: Datadog Audit Trail로 팀 전반에 규정 준수, 거버넌스 및 투명성 빌드
kind: 지침
title: 민감한 로그 데이터 제어
---

## 개요

로그에는 민감한 데이터가 포함될 수 있으므로 신중하게 다루어야 합니다. Datadog으로 민감한 데이터를 수집하는 경우 다음 사항을 고려합니다.

- 합법적인 트러블슈팅 및 감사 목적으로 민감한 데이터를 보관하도록 의도적으로 로그를 설정한 경우, **역할 기반 접근 제어** 기능을 사용하여 Datadog 계정에 접근할 권한이 있는 사용자만 해당 데이터에 접근할 수 있도록 적절한 제한을 설정합니다. [역할 기반 로그 접근 제어(RBAC) 사용자 지침][1]을 참조하여 조직에 맞게 설정하는 방법을 자세히 알아보세요.
- 의도하지 않은 민감한 데이터 로그 수집 문제를 해결하여 향후 발생할 수 있는 문제를 선제적으로 해결하세요. 자세한 내용을 알아보려면 본 지침을 참조하세요.

특히 대규모의 협업 플랫폼에서는 모든 데이터를 제어하기 어려울 수 있습니다. 이 지침에서는 Datadog이 수집하는 민감한 데이터를 검색하고 관리하기 위한 다양한 옵션을 알아봅니다.

## Sensitive Data Scanner

[민감한 데이터 스캐너][2]는 스트림 기반 패턴 매칭 서비스입니다. 민감한 데이터를 식별하고 태그를 지정하는 용도로 쓰이며, 선택 사항으로는 민감한 데이터를 편집하거나 해시 처리하기 위해 활용할 수도 있습니다. 해당 기능으로 보안팀과 컴플라이언스팀이 민감한 데이터가 조직 외부로 유출되지 않도록 방지하는 방어선을 구축할 수 있습니다. 민감한 데이터 스캐너는 [조직 설정][3]에서 활용할 수 있습니다.

민감한 데이터가 포함된 로그를 이미 인덱싱했다면 다음 3단계 지침에 따르세요.

1. [전송되는 데이터의 범위 결정](#determine-the-scope-of-the-data-being-sent)
2. [데이터 업스트림 소스 수정](#fix-the-source-of-the-data-upstream)
3. [Datadog으로 이미 전송된 데이터 처리](#handle-data-already-sent-to-and-indexed-in-datadog)

## 전송되는 데이터의 범위 결정

### 민감한 데이터를 정의하는 로그 쿼리는 무엇인가요?

먼저 민감한 데이터를 대략적으로 설명하는 쿼리를 정의합니다. 본 쿼리는 민감한 데이터가 있는 모든 로그를 반환합니다.

`version:x.y.z source:python status:debug` 같은 쿼리가 예측에 부합할 가능성이 있습니다. 고급 연산자(와일드카드, 불리언 연산자 등)를 사용해야 하는 경우 [로그 검색 구문][4] 문서를 참조하세요.

본 지침은 이 예시 쿼리를 **민감한 개요 쿼리**로 간주합니다.

### 민감한 데이터는 Datadog의 어디에 위치하나요?

일단 로그의 민감한 데이터가 Datadog 플랫폼에 전송되면 여러 곳에 위치할 수 있습니다. 그러므로 다음을(민감한 데이터가 위치할 가능성이 가장 높은 곳부터 가장 낮은 곳까지 순차적으로) 각각 점검해 보세요.

* Datadog [인덱스][5]는 인덱스 보존 기간에 따라 만료될 때까지 Datadog에 로그가 저장되는 곳입니다. 다른 위치의 인덱스는 규정 준수 문제가 발생할 가능성이 낮으므로 Datadog 인덱스에 중점을 두어야 합니다. [인덱스 필터][6] 및 [제외 필터][7]를 점검하여 민감한 데이터가 있는 로그가 인덱싱되는지 확인합니다.

* 로그 [아카이브][8]는 Datadog이 저장할 로그를 전송하는 위치입니다. 아카이브 필터를 설정하여 아카이브에 민감한 로그가 포함되어 있는지 확인합니다.

* [로그로 생성한 메트릭][9]은 집계한 메트릭을 저장합니다. 민감한 데이터가 해당 프로세스로 삭제되었을 수도 있습니다. 커스텀 메트릭 필터를 점검하여 민감한 데이터가 포함된 로그가 처리되는지 확인합니다.

* [로그 모니터링][10]은 [로그 샘플][11]이 포함된 경우 알림을 전송합니다. 특히 민감한 데이터가 전송되는 동안 트리거된 모니터링을 점검하세요.

* [라이브 테일][12]으로 조직의 사용자가 로그를 실시간으로 확인할 수 있습니다. 브라우저의 로그 캐시가 50개 이상인 지속성은 없으나, 쿼리 범위가 더 넓을 경우 결과가 샘플링될 수 있습니다.

## 데이터 업스트림 소스 수정

### 민감한 데이터 스캐너를 사용하여 로그 스트리밍에서 민감한 데이터 삭제

기본 제공 또는 커스텀 규칙을 사용하여 로그에 계속 포함되는 [다른 종류의 민감한 데이터를 식별하고 삭제][2]합니다.

### 민감한 로그 인덱싱 중지

민감한 데이터 스캐너를 사용하지 않는 경우, 민감한 데이터가 포함된 새 로그를 인덱싱에서 완전히 제외할지 여부를 결정하세요. Datadog에 이미 인덱싱된 민감한 데이터 포함 로그는 여전히 처리해야 합니다.

* 민감한 데이터가 포함된 로그의 인덱스를 찾습니다.
* 각 인덱스별로 민감한 개요 쿼리에 기반한 제외 필터를 추가합니다.

{{< img src="logs/guide/sensitive/sensitive_exclusion-filters.png" alt="민감한 데이터 제외 필터" style="width:80%;" >}}

### Datadog에 민감한 데이터 전송 중지

Datadog이 고객님의 환경에서 특정 종류의 민감한 데이터를 수집하는 것을 금지하려면 소스 수집 시 스크러빙 규칙을 추가하세요.

로거 자체를 변경할 방법이 있다면, Datadog은 로그 수집을 위해 [Datadog 에이전트][13]를 사용할 시 규정 준수에 민감한 데이터가 플랫폼 외부로 전송되지 않도록 방지하는 솔루션을 제공합니다.

* 민감한 데이터를 Datadog으로 전송하기 전 로그의 [민감한 데이터 스크러빙][14] 작업을 수행합니다.
* 또는 [자동탐지][15]를 사용하여 로그 수집 컨테이너에 세분화된 제어 기능을 추가합니다.

[서버리스 포워더(Forwarder)][16]에도 비슷한 스크러빙 기능이 있습니다.

## Datadog에 이미 전송되어 인덱싱된 데이터 처리

규정 준수 요건에 따라 다음 단계를 수행합니다. 모든 단계를 완료하지 않아도 됩니다.

### Datadog에서 민감한 로그를 쿼리할 수 없도록 설정(기간 만료 시까지)

이 단계를 수행하면 Datadog(탐색기, 대시보드, 라이브테일)에서 민감한 데이터가 포함된 로그를(이미 전송된 로그 및 계속 유입될 수 있는 로그 모두) 쿼리할 수 없게 됩니다.

[데이터 접근 설정 페이지][17]와 민감한 개요 쿼리를 사용하여 조직의 모든 사용자에게 적용되는 [제한][18] 규칙을 정의하세요. 예를 들어, 위에서 언급한 쿼리의 경우 `version:x.y.z source:python status:debug`입니다.

**참고**: 민감한 개요 쿼리에서 **NOT**를 사용하면 사용자가 로그와 매칭되는 항목외에는 볼 수 없도록 제한합니다.

{{< img src="logs/guide/sensitive/sensitive_data_access.png" alt="민감한 데이터 접근" style="width:80%;" >}}

### 아카이브 패치

민감한 데이터를 삭제하기 위해 아카이브를 패치해야 하는 경우 Datadog 문서에서 생성한 [아카이브 형식][19] 항목을 참조하세요.

## 지원팀

특정 규정 준수 관련 질문이 있거나 도움이 필요하신 경우, Datadog [지원 팀][20]으로 문의하세요. 지원 팀에 문의할 시 다음 정보를 준비해 주시면 도움이 됩니다.

* 민감한 개요 쿼리 또는 타이머 범위, 서비스 또는 환경 등 민감한 데이터를 정의할 수 있는 모든 항목.
* [민감한 데이터 스캐너][21] 사용 여부.
* 민감한 데이터가 여전히 Datadog에 전송되는지 여부.
* 민감한 데이터가 인덱싱되었는지(인덱스의 종류) 또는 메트릭으로 전환되었는지 여부.
* 민감한 데이터를 이미 쿼리할 수 없도록 설정했는지 여부.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/guide/logs-rbac/
[2]: /ko/sensitive_data_scanner/
[3]: /ko/account_management/org_settings/
[4]: /ko/logs/search_syntax/
[5]: /ko/logs/indexes
[6]: /ko/logs/indexes#indexes-filters
[7]: /ko/logs/indexes#exclusion-filters
[8]: /ko/logs/archives
[9]: /ko/logs/logs_to_metrics/
[10]: /ko/monitors/types/log/
[11]: /ko/monitors/types/log/#notifications
[12]: /ko/logs/explorer/live_tail/
[13]: /ko/agent/
[14]: /ko/agent/logs/advanced_log_collection/?tab=configurationfile#scrub-sensitive-data-from-your-logs
[15]: /ko/agent/guide/autodiscovery-management/?tab=containerizedagent
[16]: /ko/serverless/forwarder#log-forwarding-optional
[17]: https://app.datadoghq.com/logs/pipelines/data-access
[18]: /ko/account_management/rbac/permissions/?tab=ui#logs_read_data
[19]: /ko/logs/archives/?tab=awss3#format-of-the-archives
[20]: /ko/help/
[21]: https://www.datadoghq.com/blog/sensitive-data-scanner/