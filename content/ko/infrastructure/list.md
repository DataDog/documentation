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
title: 호스트 목록
---
## 개요 {#overview}

호스트 목록은 Agent 또는 클라우드 통합을 통해 Datadog에 보고하는 모든 호스트의 실시간 인벤토리를 제공합니다. 기본적으로 최근 15분 이내에 활동이 있었던 호스트를 표시합니다. 호스트 목록을 열려면 Datadog에서 [**Infrastructure > Hosts**][10]로 이동합니다.

이 페이지에서는 호스트 목록의 **새로운** 보기를 설명합니다. **레거시** 보기로 전환하려면 오른쪽 상단의 토글을 사용합니다.

{{< img src="infrastructure/index/infra-list-overview-2.png" alt="왼쪽에 필터 패널이 있고 사용자 지정 가능한 열이 포함된 호스트 목록 화면" style="width:100%;">}}

**참고**: 이 목록은 인프라 호스트 청구 금액을 추정하는 용도로 사용해서는 안 됩니다. 자세한 내용은 [청구][11] 페이지를 참조하세요.

## 필터 및 검색 {#filter-and-search}

왼쪽 필터 패널을 사용하여 호스트 목록을 좁힐 수 있습니다.

- **내 팀**: 활성화하면 내가 속한 팀과 연결된 호스트만 표시합니다.
- **빠른 필터**: 패널 상단의 확인란을 사용하여 클라우드 공급자(AWS, Azure, Google Cloud, Oracle 또는 Alibaba Cloud), 텔레메트리 소스(Datadog Agent 또는 OpenTelemetry), 운영 체제(Windows, Linux 또는 Darwin) 또는 하드웨어(GPU)별로 필터링합니다.
- **메트릭 필터**: 메트릭을 선택하고 값 범위를 지정하여 해당 메트릭 값으로 호스트를 필터링합니다.
- **검색 패싯**: 클라우드 공급자, Env, 리전, 리소스 유형, 인스턴스 유형, OS, OS 버전, Agent 또는 Docker 버전과 같은 모든 호스트 속성이나 태그를 기준으로 필터링합니다.

목록 상단의 검색 상자를 사용하여 [Datadog 검색 구문][16]으로 호스트를 필터링할 수도 있습니다.

## 열 사용자 지정 {#customize-columns}

열을 추가, 제거 또는 재정렬하려면 호스트 목록 위의 **열**을 클릭합니다. 다음 항목을 열로 추가할 수 있습니다.

- **호스트 속성**: 호스트 이름 또는 상태와 같은 호스트의 속성.
- **태그**: 호스트에 적용된 모든 태그.
- **메트릭**: 호스트가 보고하는 모든 메트릭.

열 순서를 변경하려면 새 위치로 끌어다 놓습니다. 크기를 변경하려면 오른쪽 가장자리를 끕니다. 숨기려면 토글을 끕니다.

{{< img src="infrastructure/index/infra-list-columns.png" alt="호스트 속성, 태그 및 메트릭 섹션과 각 열 표시/숨기기 토글이 있는 열 사용자 지정 패널." style="width:100%;">}}

### 결합 열 {#combined-columns}

호스트 목록에는 여러 데이터 포인트를 결합한 세 개의 열이 포함되어 있습니다.

- **구성**: 각 호스트의 클라우드 공급자, 운영 체제 및 Datadog Agent 설치 상태.
- **소프트웨어**: 감지된 경우 호스트의 웹 서버, 데이터베이스, 캐시 및 컨테이너 오케스트레이터(Docker 또는 Kubernetes 등).
- **통합**: 호스트에서 활성화된 Datadog Agent 통합.

## 저장된 뷰 {#saved-views}

필터 및 열 구성을 저장하려면 왼쪽 상단의 **보기** 패널을 열고 **새 뷰로 저장**을 클릭합니다. 이 패널에서 저장된 뷰를 필터링, 정렬, 편집 및 즐겨찾기 지정할 수 있습니다.

{{< img src="infrastructure/index/infra-list-views.png" alt="저장된 뷰 저장, 필터링, 정렬 및 편집 옵션이 포함된 뷰 패널" style="width:40%;">}}

## 호스트 검사 {#inspect-a-host}

호스트를 클릭하면 상세 패널이 열리며, 이는 [Resource Catalog][15]에서 사용하는 것과 동일한 사이드 패널입니다. 패널에는 다음이 포함됩니다.

- [호스트 이름 및 별칭](/agent/faq/how-datadog-agent-determines-the-hostname/#host-aliases)
- [태그][2]
- [Metrics][3]
- [Containers][4]
- [로그][5](활성화된 경우)
- [Agent 구성](#agent-configuration)(활성화된 경우)
- [OpenTelemetry Collector 구성](#opentelemetry-collector-configuration)(활성화된 경우)

{{< img src="infrastructure/index/infra-list-side-panel.png" alt="호스트 요약, 메트릭, 컨테이너, 프로세스 및 기타 호스트 데이터 섹션이 포함된 호스트 상세 사이드 패널." style="width:100%;">}}

### Agent 구성 {#agent-configuration}

호스트의 Agent 구성을 보려면 호스트를 클릭하여 사이드 패널을 연 후 **Agent** 섹션으로 스크롤합니다. 전체 인프라의 Agent 구성을 조회하고 관리하려면 [Fleet Automation][12]을 사용합니다.

{{< img src="infrastructure/index/infra-list-agent-config.png" alt="JSON 형식의 Agent 구성을 보여주는 호스트 사이드 패널의 Agent 섹션." style="width:100%;">}}

### OpenTelemetry Collector 구성 {#opentelemetry-collector-configuration}

OpenTelemetry Collector와 함께 [Datadog Extension][14]을 구성하면 호스트 상세 패널에서 Collector 구성 및 빌드 정보를 직접 확인할 수 있습니다. 이 확장은 Datadog에서 Collector 배포를 관리하고 디버깅하는 기능도 제공합니다.

호스트의 OpenTelemetry Collector 구성을 보려면 호스트를 클릭하여 사이드 패널을 엽니다. **OTel Collector** 섹션으로 스크롤하여 빌드 정보와 전체 Collector 구성을 확인합니다. 호스트 이름 일치 및 파이프라인 구성과 같은 자세한 설정 지침과 요구 사항은 [Datadog Extension 문서][14]를 참조하세요.

{{< img src="infrastructure/index/infra-list-otel-config.png" alt="빌드 정보와 Collector 구성을 표시하는 호스트 사이드 패널의 OTel Collector 섹션" style="width:100%;">}}

## 내보내기 {#export}

**내보내기** > **DDSQL Editor에서 열기**를 클릭한 다음 [DDSQL Editor][18]에서 결과를 다운로드합니다. 대시보드, 노트북 또는 스프레드시트로 내보낼 수도 있습니다. Datadog에 보고 중인 호스트의 JSON 형식 목록을 얻으려면 다음 방법 중 하나를 사용할 수도 있습니다.

- [호스트 개요 보고서][17]
- [호스트 검색 API 엔드포인트][7] [개발자 가이드][8]에서 예시를 참조하세요.

### Agent 버전 감사 {#audit-agent-versions}

호스트에서 실행 중인 Agent 버전을 감사하려면 [get_host_agent_list 스크립트][9]를 사용합니다. 이 스크립트는 [호스트 개요 보고서][17]를 사용하여 실행 중인 Agent와 해당 버전 번호를 출력합니다. `json_to_csv` 스크립트는 JSON 출력을 CSV로 변환하는 기능도 제공합니다.

### Agent가 없는 호스트 목록 {#list-hosts-without-an-agent}

JSON 내보내기를 사용하여 Agent가 설치되지 않은 Amazon EC2(RDS 제외) 인스턴스 목록을 조회할 수도 있습니다. 이러한 인스턴스는 Datadog AWS 통합에서 AWS 계정을 설정하면 호스트 목록에 표시됩니다. 다음 Python 3 스크립트는 해당 인스턴스를 나열합니다.

```python
# 3p
import requests

# stdlib
import json
import pprint
import os

api_key = os.environ['DD_API_KEY']
app_key = os.environ['DD_APP_KEY']

url = "https://app.datadoghq.com/reports/v2/overview?\
window=3h&with_apps=true&with_sources=true&with_aliases=true\
&with_meta=true&with_tags=true&api_key=%s&application_key=%s"

infra = json.loads(requests.get(url %(api_key,app_key)).text)

for host in infra['rows']:
    if (('aws' in host['apps']) and ('rds' not in host['apps']) and ('agent' not in host['apps'])):
        try:
            print(f'HOST: {host["name"]} - TAGS: {host["tags_by_source"]}')
        except:
            pass
```

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /ko/getting_started/tagging/
[3]: /ko/metrics/
[4]: /ko/infrastructure/livecontainers/?tab=helm#overview
[5]: /ko/logs/
[7]: /ko/api/v1/hosts/#get-the-total-number-of-active-hosts
[8]: /ko/extend/guide/query-the-infrastructure-list-via-the-api/
[9]: https://github.com/DataDog/Miscellany/tree/master/get_hostname_agentversion
[10]: https://app.datadoghq.com/infrastructure
[11]: https://docs.datadoghq.com/ko/account_management/billing/
[12]: https://app.datadoghq.com/release-notes/fleet-automation-is-now-generally-available
[14]: /ko/opentelemetry/integrations/datadog_extension/
[15]: /ko/infrastructure/resource_catalog/#investigate-a-host-or-resource
[16]: /ko/getting_started/search/
[17]: https://app.datadoghq.com/reports/v2/overview?metrics=avg%3Aaws.ec2.cpuutilization%2Cavg%3Aazure.vm.percentage_cpu%2Cavg%3Agcp.gce.instance.cpu.utilization%2Cavg%3Asystem.cpu.idle%2Cavg%3Asystem.cpu.iowait%2Cavg%3Asystem.load.norm.15%2Cavg%3Avsphere.cpu.usage%2Cavg%3Avsphere.cpu.usage.avg%2Cavg%3Aalibabacloud.ecs.cpu_utilization.average&with_apps=true&with_sources=true&with_aliases=true&with_meta=true&with_mute_status=true&with_tags=true
[18]: /ko/ddsql_editor/#save-and-share-queries