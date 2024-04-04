---
algolia:
  tags:
  - 온라인 아카이브
description: 장기간 보유 중인 로그에 비용 효율적인 라이브 쿼리 기능
further_reading:
- link: /logs/log_configuration/indexes/#indexes-filters
  tag: 설명서
  text: 인덱스 필터
- link: /logs/log_configuration/indexes/#exclusion-filters
  tag: 설명서
  text: 제외 필터
- link: https://www.datadoghq.com/blog/online-archives-datadog/
  tag: 블로그
  text: Online Archive로 기록 로그 분석 및 조사
kind: 설명서
private: true
title: Online Archives
---

<div class="alert alert-warning">
Online Archives는 사용이 제한되어 있습니다. 액세스를 요청하려면 <a href="/help/">Datadog 지원팀</a>에 문의하세요.
</div>

## 개요

Online Archives는 로그 웨어하우스 솔루션으로, Datadog 로그를 15개월 이상 저장하고, 실시간 쿼리하고, 분석할 수 있습니다.

보안, 규정 준수, 엔지니어링 팀에서는 긴 시간대를 두고 로그를 쿼리하는 경우가 많습니다. 보안 위반 사항은 보통 인시던트가 일어난 몇 주나 몇 달 후에 발견되는 경우가 많고, 규정 준수 검토 및 감사 프로세스에는 1년 전 로그가 필요할 경우가 있습니다. 이와 같은 장기 분석은 보안 팀 외 엔지니어링 팀에도 필요합니다. 엔지니어링 팀에서는 사용자, 호스트 IP 주소 등과 같은 카디널리티가 높은 연간 대비 장기 분석을 하는데, 이 때 메트릭보다 로그가 더 도움이 됩니다.

Online Archives를 이용하면 로그 데이터를 15개월 이상 유지하고 검색할 수 있습니다. 보안, 규정 준수, 엔지니어링 팀에서는 보안 감사와 같이 기록 조사와 분석이 필요한 사용 사례 문제를 해결하거나 장기간에 걸쳐 카디널리티가 매우 높은 추세를 분석하고 메트릭의 시스템 포렌식을 로그 데이터의 애플리케이션 및 사용자 동작과 상호 연결할 수 있습니다.

## Online Archives 사용

Online Archives는 로그 인덱스별로 설정됩니다. 해당 인덱스에 적용하는 [인덱스 필터][1]가 Online Archives에도 적용됩니다.

**참고**: 그러나 인덱스의 [제외 필터][2]와 일일 할당량은 Online Archives에 적용되지 않습니다. 예를 들어 인덱스에서 정상 로그를 제외하면 Online Archives에 있는 모든 로그는 유지하면서 에러 로그만 인덱싱할 수 있습니다.

[Log Index Configuration][3] 페이지에서 Online Archives 구성:

1. [**Logs > Configuration > Indexes**][3]로 이동합니다.
2. Online Archives를 사용하고 싶은 인덱스를 편집합니다.
3. 인덱스 구성의 3 단계에서 Online Archives를 활성화합니다.

{{< img src="logs/log_configuration/online_archives/enabling.png" alt="로그 아카이브 활성화하는 방법" style="width:100%;">}}

## Online Archives에서 검색하는 방법

Log Explorer의 드롭다운 메뉴에서 Online Archives를 선택해 인덱스 대신 Online Archives에서 검색을 시작합니다. 드롭다운 메뉴는 시간 선택 메뉴 옆에 있습니다. 사전 설정 옵션을 선택해 최대 3개월까지 시간을 조정할 수 있습니다. 또는 달력 보기를 선택해 그보다 더 이전 시간을 선택할 수 있습니다. 


{{< img src="logs/log_configuration/online_archives/searching.png" alt="온라인 아카이브에서 검색하는 방법" style="width:100%;">}}

검색 창에 쿼리를 입력하거나 패싯 패널에서 관련 패싯을 선택해 [검색][4]할 수 있습니다.

**참고**: 
- 온라인 아카이브 로그를 대시보드, 노트북, 모니터로 내보낼 수 없습니다.
- Online Archives에서는 Transactions와 Patterns 보기를 사용할 수 없습니다.

## Online Archives에서 분석하는 방법

**Group into Fields**나 **Visualize as Timeseries/Top List/Tabe**을 선택해 Analytics로 전환합니다.

스토리지 종류를 **Online Archives**로 설정하면 인덱스 대신 Online Archives에서 쿼리할 수 있습니다. 언제든지 **indexes**로 다시 바꿀 수 있습니다.

## Online Archives와 인덱스로 로그를 선택적으로 보내기

로그 속성과 태그를 통해 일부 로그를 Online Archives로 보내고 다른 로그를 인덱스로 보내도록 설정할 수 있습니다. 내 로깅 사용 사례와 유지 전략에 따라 로그 스토리지 종류를 믹스 앤 매치해 사용하세요.

스토리지 종류를 구성하려면 Online Archives에 적용되는 인덱스 필터를 사용하고 Online Archives에 적용되지 않는 인덱스 제외 필터를 사용하세요.

다음은 로그 유지 전략과 적용 방법에 관한 예시입니다.

### 인덱스에는 디버그 로그를 샘플링하고 Online Archives에는 다른 로그를 유지하고자 하는 엔지니어링 팀

1. `*` 필터로 모든 로그의 인덱스를 생성합니다. 
2. 이 인덱스의 Online Archives를 활성화합니다.
3. `status:Debug` 인덱스에 제외 퍼센트를 90%로 설정한 제외 필터를 추가합니다. 이 제외 필터는 인덱스에만 적용됩니다.

{{< img src="logs/log_configuration/online_archives/retain.png" alt="인덱스에 제외를 적용하는 방법" style="width:100%;">}}

### 모든 로그를 Online Archives에 유지하고 인덱스에는 아무것도 전송하지 않으려 하는 보안 팀

1. `team:security` 필터로 보안 로그 인덱스를 생성합니다.
2. 이 인덱스의 Online Archives를 활성화합니다.
3. `*` 제외 필터를 인덱스에 적용해 모든 로그가 인덱스에서 제외되고 Online Archives에서는 제외되지 않도록 합니다. 

{{< img src="logs/log_configuration/online_archives/exclusion.png" alt="인덱스에 제외를 적용하는 방법" style="width:100%;">}}

### Online Archives 비활성화
Online Archives 기능을 끄고 싶은 인덱스를 선택하고 Online Archives 토글을 OFF 위치로 전환합니다.

**참고:** 여러 인덱스가 있을 경우 `team:security` 로그가 인덱스 필터와 일치하는 첫 번째 인덱스로 가기 때문에 인덱스 순서가 중요합니다.

[1]: /ko/logs/log_configuration/indexes/#indexes-filters
[2]: /ko/logs/log_configuration/indexes/#exclusion-filters
[3]: https://app.datadoghq.com/logs/pipelines/indexes
[4]: https://app.datadoghq.com/logs