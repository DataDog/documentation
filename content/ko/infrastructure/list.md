---
aliases:
- /ko/hostnames
- /ko/graphing/infrastructure/list/
further_reading:
- link: /infrastructure/hostmap/
  tag: 설명서
  text: 호스트 맵
- link: /infrastructure/livecontainers/
  tag: 설명서
  text: 컨테이너 맵
- link: /infrastructure/process/
  tag: 설명서
  text: 실시간 프로세스 모니터링
title: 인프라스트럭처 목록
---

## 개요

인프라스트럭처 목록을 통해 Datadog이 모니터링하는 모든 호스트와 지난 2시간(기본값)부터 최대 1주일까지의 활동을 확인할 수 있습니다. 호스트를 검색하거나 태그로 그룹화해 보세요.

## 호스트

인프라스트럭처 목록에는 호스트에 대한 정보가 다음과 같이 표시됩니다.

호스트 이름
: 사용하고 싶은 호스트 이름 [별칭](#aliases) (옵션 메뉴에서 클라우드 이름이나 인스턴스 ID 확인 가능)

클라우드 이름
: 호스트 이름 [별칭](#aliases).

인스턴스 ID
: 호스트 이름 [별칭](#aliases).

상태
: 예상 메트릭을 수신하면 `ACTIVE`, 수신하지 않으면 `INACTIVE`를 표시합니다.

CPU
: CPU 사용 비율 (유휴 상태 제외)

IOWait
: IO 대기에 사용되는 CPU 비율 (일부 플랫폼 제외)

Load 15
: 지난 15분 동안의 시스템 부하

앱
: 호스트 메트릭을 보고하는 Datadog 통합

운영 시스템
: 추적되는 운영 시스템

클라우드 플랫폼
: 호스트가 실행되는 클라우드 플랫폼 (예: AWS, Google Cloud, Azure)

Datadog 에이전트
: 호스트에서 데이터를 수집하는 에이전트 버전

### 호스트네임

Datadog 에이전트는 여러 종류의 소스에서 잠재 호스트 이름을 수집합니다. 자세한 내용은 [Datadog은 어떻게 에이전트 호스트 이름을 결정하나요?][1]를 참조하세요.

**참조**: 호스트 이름은 Datadog 계정에서 고유한 이름이어야 합니다. 고유한 이름이 아닐 경우 호스트 그래프에 불일치가 나타날 수 있습니다.

### 검사

호스트를 클릭하여 다음 상세 내용을 확인합니다:
- [별칭](#aliases)
- [태그][2]
- [메트릭][3]
- [컨테이너][4]
- [로그][5] (활성화된 경우)
- [에이전트 설정](#agent-configuration) (활성화된 경우)

{{< img src="infrastructure/index/infra-list1.png" alt="인프라스트럭처 목록 호스트 상세 내용" style="width:100%;">}}

#### 별칭

단일 호스트에 대해 고유하게 식별할 수 있는 이름이 여러 개 있는 경우 Datadog은 호스트 이름에 대한 별칭을 생성합니다. 에이전트가 수집한 이름은 선택한 정식 이름의 별칭으로 추가됩니다. 예를 들어 EC2에서 실행 중인 단일 호스트에는 인스턴스 ID (`i-abcd1234`), 호스트 IP 주소 (`ip-192-0-0-1`)를 기반으로 EC2가 제공한 일반 호스트 이름, 내부 DNS 서버나 config-managed 호스트 파일 (`myhost.mydomain`)이 제공한 의미 있는 호스트 이름이 있을 수 있습니다.

{{< img src="infrastructure/index/infra-list-alias1.png" alt="호스트 별칭" style="width:100%;">}}

#### 에이전트 설정

{{< callout url="#" btn_hidden="true" >}}
에이전트 설정 보기는 공개 베타 버전이며, 에이전트 버전 >= 7.39/6.39에서 사용 가능합니다.
{{< /callout >}}

에이전트는 호스트 세부 정보 패널의 `Agent Configuration` 섹션에 표시되도록 자체 설정을 Datadog으로 전송할 수 있습니다.

에이전트 설정에는 민감한 정보가 제외되며, 사용자가 설정 파일이나 환경 변수를 이용해 구현한 설정만 포함합니다. 설정 변경 사항은 10분마다 업데이트됩니다. 

이 기능은 기본적으로 비활성화되어 있습니다. 활성화하려면 [에이전트 설정 파일][6]에 다음 설정을 추가하세요.

```yaml
inventories_configuration_enabled: true
```

또는 `DD_INVENTORIES_CONFIGURATION_ENABLED=true` 환경 변수를 사용해 이 기능을 활성화할 수 있습니다.

{{< img src="infrastructure/index/infra-list-config3.png" alt="에이전트 설정 보기" style="width:100%;">}}

### 내보내기

Datadog에 보고하는 호스트를 JSON 형식 목록으로 보려면 다음을 이용하세요:

* 인프라스트럭처 목록 상단에 있는 **JSON API 퍼머링크**
* [검색 호스트 API 엔드포인트][7] - 예시를 보려면 [개발자 가이드][8]를 참조하세요.

#### 에이전트 버전

에이전트 버전 감사를 통해 최신 버전을 사용하고 있는지 확인할 필요가 있습니다. 이를 위해서는 JSON 퍼머링크를 활용해 현재 실행 중인 에이전트의 버전 번호를 출력하는 [get_host_agent_list script][9]를 사용하세요. `json_to_csv` 스크립트를 사용해 JSON 출력을 CSV 파일로 전환할 수도 있습니다.

#### 에이전트가 없을 경우

JSON을 내보내는 또 다른 방법은 에이전트가 설치되어 있지 않은 상태에서 AWS EC2 인스턴스 목록을 가져오는 것입니다. 이 인스턴스는 Datadog AWS 통합 타일에 있는 AWS 계정을 설정하면 인프라스트럭처 목록에 나타납니다. [예시 스크립트][10]를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/faq/how-datadog-agent-determines-the-hostname/
[2]: /ko/getting_started/tagging/
[3]: /ko/metrics/
[4]: /ko/infrastructure/livecontainers/?tab=helm#overview
[5]: /ko/logs/
[6]: /ko/agent/guide/agent-configuration-files/
[7]: /ko/api/v1/hosts/#get-the-total-number-of-active-hosts
[8]: /ko/developers/guide/query-the-infrastructure-list-via-the-api/
[9]: https://github.com/DataDog/Miscellany/tree/master/get_hostname_agentversion
[10]: https://gist.github.com/Martiflex/2803a28ec562fc9a15d404a539f85d38