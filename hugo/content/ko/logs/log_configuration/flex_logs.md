---
aliases:
- /ko/logs/log_configuration/flex_log/
description: 장기간 보유 중인 로그에 대한 비용 효율적인 라이브 쿼리 기능
further_reading:
- link: https://www.datadoghq.com/blog/flex-logging
  tag: 블로그
  text: Flex Logs를 사용하여 대용량 로그를 효율적으로 저장 및 분석
- link: https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/
  tag: 블로그
  text: DNS 로그를 모니터링하여 네트워크 및 보안 분석
- link: https://www.datadoghq.com/blog/cloud-siem-flex-logs/
  tag: 블로그
  text: 'Cloud SIEM 및 Flex Logs: 클라우드를 위한 향상된 보안 인사이트'
- link: /logs/guide/flex_compute
  tag: 설명서
  text: Flex Compute 사용량 모니터링
- link: /logs/log_configuration/indexes
  tag: 설명서
  text: 로그 인덱스
- link: /logs/log_configuration/archives
  tag: 설명서
  text: 로그 아카이브
- link: /logs/guide/reduce_data_transfer_fees
  tag: 설명서
  text: 데이터 전송 수수료를 줄이면서 로그를 Datadog로 보내는 방법
- link: https://www.datadoghq.com/blog/optimize-high-volume-logs/
  tag: 블로그
  text: 가시성을 저해하지 않으면서 대용량 로그 데이터를 최적화하는 방법
- link: https://www.datadoghq.com/blog/monitor-flex-compute-usage/
  tag: 블로그
  text: Flex Logs 컴퓨팅 사용량 모니터링 및 최적화
- link: https://www.datadoghq.com/blog/flex-logs/
  tag: 블로그
  text: Flex Logs를 사용하여 대용량 로그를 효율적으로 저장 및 분석
- link: https://learn.datadoghq.com/courses/log-indexes
  tag: 학습 센터
  text: 인덱싱된 로그 볼륨 관리 및 모니터링
title: Flex Logs
---
## 개요 {#overview}

조직이 확장됨에 따라 인프라 및 애플리케이션에서 수집되는 로그의 양도 함께 증가합니다. 로그에 대한 사용 사례도 복잡해집니다. 예를 들어, 인프라, 애플리케이션, 보안 도구, 네트워크 등에서 로그를 수집할 수 있습니다. 이러한 모든 사용 사례는 보관 및 쿼리 요구 사항이 각기 다릅니다.

Flex Logs를 사용하면 팀은 시간이 중요한 인시던트, 보안 조사, 규정 준수 감사 등 사용 사례를 충족하는 데 필요한 쿼리 용량을 결정할 수 있습니다. Flex Logs는 스토리지와 컴퓨팅 비용을 분리하여 로그를 비용 효율적으로 장기간 보관할 수 있도록 합니다.

Flex 스토리지의 몇 가지 사용 사례 예시는 다음과 같습니다.

- 장기 감사를 위해 로그를 보관합니다.
- 규정 준수 및 법적 사유로 로그를 보관합니다.
- 보안 조사를 위해 모든 로그가 필요합니다.
- 긴 기간 동안의 높은 카디널리티 데이터에 대한 보고 및 분석을 위해 로그 쿼리가 필요합니다.

## Flex Logs를 사용해야 하는 경우 {#when-to-use-flex-logs}

Datadog Log Management는 다음과 같은 솔루션을 제공합니다.

- 애플리케이션 로그와 같이 자주 쿼리해야 하고 단기간 보관해야 하는 로그를 위한 표준 인덱싱.
- 보안, 트랜잭션 및 네트워크 로그와 같이 장기간 보관해야 하지만 때때로 긴급하게 쿼리해야 하는 로그를 위한 Flex Logs.
- 감사 로그 및 구성 로그와 같이 자주 조회되지 않고 장기 보관이 필요한 로그 아카이빙.

아래 이미지에 표시된 로그 유형 범위를 참고하여 Flex Logs 계층을 사용할 시기를 결정하세요. 대용량이거나, 액세스 빈도가 낮거나, 장기 보관이 필요한 로그 소스의 경우에 적합합니다. 먼저 Standard Indexing에 로그를 보관한 다음 Flex Logs를 사용하여 확장할 수도 있습니다. 이는 더 오래 보관해야 하는 애플리케이션 로그에 완벽한 솔루션입니다. 자세한 내용은 [Flex Logs 계층으로 직접 전송하기 위한 잠재적 소스](#potential-sources-for-sending-directly-to-flex-logs)를 참조하세요.

{{< img src="logs/log_configuration/flex_logging/logs-spectrum.png" alt="로그 인덱싱 및 액세스 빈도 스펙트럼을 나타내는 그래프" style="width:100%;" >}}

**참고**:
- 모니터는 Flex Logs에서 지원되지 않습니다.
- Watchdog은 Flex Logs에서 지원되지 않습니다.
- 대시보드는 Flex Logs에서 지원되지만, 컴퓨팅 크기를 선택할 때 이러한 대시보드 쿼리를 고려해야 합니다.

## 컴퓨팅 크기 {#compute-sizes}

컴퓨팅은 Flex Logs에 대한 쿼리를 실행하기 위한 쿼리 용량입니다. Flex Logs 계층에서 로그를 쿼리할 때 사용됩니다. 수집 시 또는 Standard Indexing 로그만 검색할 때는 사용되지 않습니다. 사용 가능한 컴퓨팅 계층은 다음과 같습니다.

<div class="alert alert-danger">US3, US5, AP1, AP2, US1-FED 및 US2-FED에서 사용할 수 있는 컴퓨팅 크기는 Starter, XS 및 S입니다.</div>

- Starter
- Extra small(XS)
- Extra small plus(XS+)
- Small(S)
- Medium(M)
- Large(L)

각 컴퓨팅 계층은 이전 계층보다 쿼리 성능 및 용량이 약 2배 더 높습니다. 컴퓨팅 크기는 동시 쿼리 수와 쿼리당 스캔할 수 있는 로그 수의 최대 제한에 의해 제한됩니다.

### 필요한 컴퓨팅 크기 결정 {#determine-the-compute-size-that-you-need}

컴퓨팅 계층의 쿼리 성능은 여러 요인에 따라 달라집니다.

- 볼륨: Flex 계층에 저장된 데이터 양.
- 시간 범위: 쿼리의 타임스페이스(예: 15분 범위와 1개월 범위의 로그 비교).
- 복잡성: 실행하는 쿼리 유형(예: 다중 수준 집계 수행 여부, 다중 필터 사용 여부 등).
- 동시성: Flex Logs를 동시에 쿼리하는 사용자 수.

컴퓨팅 계층을 결정할 때 다음 요소를 고려하세요.

- 일일 로그 볼륨 및 Flex 계층에 저장된 로그 수.
- Flex 계층 로그를 정기적으로 쿼리하는 사용자 수.
- 실행하는 쿼리의 빈도 및 유형. 예를 들어, 로그를 쿼리할 때 일반적으로 사용하는 쿼리 시간 범위입니다.

Flex 계층에 저장된 로그 수는 데이터를 효율적으로 쿼리하는 데 필요한 크기에 가장 큰 영향을 미칩니다. Datadog은 로그 볼륨을 기준으로 다음 컴퓨팅 크기를 권장합니다.
| 크기                                      | 볼륨(누적 저장된 이벤트)   |
| ----------------------------------------- | ------------------------ |
| Starter                                   | 100억 미만             |
| Extra Small(XS)                          | 100억~500억          |
| Extra Small Plus(XS+)                    | 500억~1,000억          |
| Small(S)                                 | 1,000억~2,000억         |
| Medium(M)                                | 2,000억~5,000억        |
| Large(L)                                 | 5,000억~1조 |
| [Customer Success Manager][7]에게 문의| 1조 이상                      |

확장형(XS, XS+, S, M, L) 컴퓨팅 계층은 정액 요금으로 청구됩니다. Flex Logs Starter는 번들형 스토리지+컴퓨팅 요금으로 청구됩니다. 자세한 내용은 [요금 페이지][6]를 참조하세요.

## Flex Logs 활성화 및 비활성화 {#enable-and-disable-flex-logs}

조직 수준에서 Flex Logs를 활성화하거나 비활성화할 수 있습니다. [`flex_logs_config_write`][8] 권한이 있어야 합니다.

Flex Logs가 계약에 포함된 경우, 계약에서 사용 가능한 컴퓨팅 옵션이 UI에 표시됩니다.

Flex Logs가 계약에 포함되어 있지 않은 경우, 셀프 서비스 온보딩 옵션을 통해 Flex Logs Starter를 활성화할 수 있습니다.

Flex Logs를 활성화하려면 다음 단계를 따르세요.
1. [Flex Logs Control][5] 페이지로 이동합니다.
1. {{< ui >}}Compute Type{{< /ui >}}을 선택합니다.
    - Datadog은 저장된 로그가 100억 개 미만인 조직에 {{< ui >}}Starter{{< /ui >}} 컴퓨팅 크기를 권장합니다.
    - Datadog은 저장된 로그가 100억 개(또는 월 20억~30억 개) 이상인 조직에 확장형 컴퓨팅 옵션(예: XS, XS+, S, M, L)을 권장합니다.
1. 원하는 컴퓨팅 크기를 선택합니다. 자세한 내용은 [필요한 컴퓨팅 크기 결정](#determine-the-compute-size-that-you-need)을 참조하세요.
1. {{< ui >}}Enable Flex Logs{{< /ui >}}를 클릭합니다.

### 셀프 서비스 Flex Logs에서 오프보딩하기 {#offboard-from-self-serve-flex-logs}

Flex Logs를 비활성화하려면 다음 단계를 따르세요.

1. Flex Logs가 활성화된 각 인덱스에서 Flex 스토리지를 제거합니다.
1. [Flex Logs Control][5] 페이지로 다시 이동합니다.
1. 톱니바퀴 아이콘을 클릭하고 {{< ui >}}Disable Flex Logs{{< /ui >}}를 선택합니다.

## Flex Logs 컴퓨팅 업그레이드 및 다운그레이드 {#upgrade-and-downgrade-flex-logs-compute}

Flex Logs에 대해 확장형 컴퓨팅 옵션 중 하나(예: XS, XS+, S, M 또는 L)를 선택하면 [Flex Logs Control][5] 페이지에서 컴퓨팅 크기를 업그레이드하거나 다운그레이드할 수 있습니다.

**참고**:
- 계약에 포함된 컴퓨팅 옵션만 사용할 수 있습니다. Flex Starter에서 확장형 컴퓨팅 옵션으로 업그레이드해도 변경 사항이 자동으로 적용되지는 않습니다. 새 크기를 활성화하려면 [Flex Logs Controls][5] 페이지로 이동하여 원하는 컴퓨팅 옵션을 선택한 다음 {{< ui >}}Save{{< /ui >}}를 클릭하세요.
- 컴퓨팅 인스턴스는 언제든지 업그레이드할 수 있습니다.
- 컴퓨팅 인스턴스는 15일에 한 번 다운그레이드할 수 있습니다.

## 스토리지 계층 구성 {#configure-storage-tiers}

Flex Logs는 로그 인덱스 구성 내에서 설정됩니다. 해당 인덱스에 적용되는 [인덱스 필터][1]는 Flex Logs에도 적용됩니다. Flex Logs Starter를 사용하면 로그를 3개월, 6개월, 12개월 또는 15개월 동안 저장할 수 있습니다. 확장형 컴퓨팅 옵션을 사용하면 로그를 30~450일 동안 저장할 수 있습니다. 

[Flex Logs Controls][5] 페이지에서 Flex 계층을 구성하세요.

1. [인덱스 구성][2]을 클릭합니다.
2. Flex Logs를 활성화하려는 인덱스를 편집하거나 새 인덱스를 만듭니다.
3. {{< ui >}}Flex Tier{{< /ui >}}를 선택하고 {{< ui >}}Configure Storage Tier and Retention{{< /ui >}} 아래에서 보존 기간을 설정합니다.

{{< img src="logs/log_configuration/flex_logging/flex_configuration.png" alt="인덱스 구성 내 Flex 계층 스토리지에 대한 옵션" style="width:100%;" >}}

**참고**: 두 계층이 모두 선택된 경우, 로그는 구성된 보존 기간이 끝날 때까지 Standard 계층에 저장된 후 Flex 계층에 저장됩니다. 예를 들어, 보존 기간이 3일인 Standard 계층과 보존 기간이 90일인 Flex 계층을 선택하면, 해당 인덱스의 로그는 먼저 3일 동안 Standard 계층에 저장된 후 나머지 87일 동안 Flex 계층에 저장됩니다.

다음 표는 인덱스에 서로 다른 스토리지 계층을 추가하거나 제거할 때의 영향을 설명합니다.

<table>
  <tr align="center">
    <td colspan="2"><strong>기존 인덱스 구성</strong></td>
    <td rowspan="2"><strong>작업</strong></td>
    <td rowspan="2"><strong>결과</strong></td>
  </tr>
<tr align="center">
  <td><strong>Standard 계층</strong></td>
  <td><strong>Flex 계층</strong></td>
</tr>
<tr>
  <td align="center">활성화됨</td>
  <td align="center">비활성화됨</td>
  <td>Flex 계층을 활성화합니다.</td>
  <td>기존 로그와 새 로그 모두에 대한 보존 기간이 연장됩니다.</td>
</tr>
<tr>
  <td align="center">비활성화됨</td>
  <td align="center">활성화됨</td>
  <td>Standard 계층을 활성화합니다.</td>
  <td>Flex 계층의 기존 로그는 변경되지 않습니다. 새 로그는 Standard 및 Flex 계층에 보존됩니다.</td>
</tr>
<tr>
  <td align="center">활성화됨</td>
  <td align="center">비활성화됨</td>
  <td>Flex 계층을 활성화하고 Standard 계층을 제거합니다.</td>
  <td>이제 더 이상 로그를 모니터나 Watchdog Insights에서 쿼리할 수 없습니다.</td>
</tr>
</table>

## Flex Logs 계층 검색 {#search-flex-logs-tier}

{{< img src="logs/log_configuration/flex_logging/flex_toggle_explorer.png" alt="옵션을 전환하여 로그 탐색기 페이지에서 Flex Logs 활성화" style="width:100%;" >}}

로그 탐색기에서 {{< ui >}}Include Flex Logs{{< /ui >}} 옵션을 전환하여 검색 쿼리 결과에 Flex 계층의 로그를 포함하세요. 이 옵션은 시간 선택기 옆에서 찾을 수 있습니다.

검색 창에 쿼리를 입력하거나 패싯 패널에서 관련 패싯을 선택해 [검색][3]할 수 있습니다.

대시보드에 Flex Logs 쿼리를 추가할 수 있지만, 컴퓨팅 크기를 선택할 때 이러한 대시보드 쿼리를 고려해야 합니다.

**참고**: 모니터 쿼리는 Flex Logs에서 지원되지 않습니다.

## 추가 정보 {#additional-information}

### Flex Logs로 직접 전송 가능한 잠재적 소스 {#potential-sources-for-sending-directly-to-flex-logs}

다음 목록은 Standard Indexing에 먼저 저장되지 않고 Flex 계층으로 로그를 직접 전송하기에 적합한 로그 소스의 예입니다. 이는 전체 목록이 아니며, 이 구성에 적합한 로그 유형에 대한 아이디어를 제공하기 위한 것입니다. 다른 로그 소스(예: 애플리케이션 로그)는 실시간 문제 해결, 알림 및 디버깅 사용 사례를 위해 Standard Indexing을 먼저 거친 후에도 Flex 계층으로 전송할 수 있습니다. 이러한 소스에 대한 사용 사례는 다양할 수 있으며, 이는 Standard Indexing을 건너뛰기로 결정할 때 고려해야 할 중요한 사항입니다.

**참고**: 이 예시들은 각 범주에 대한 예시입니다. Flex 계층으로 직접 전송할 수 있는 범주와 서비스, 도구 및 기술이 더 많이 있을 수 있습니다.

| 기술            | 예시                                                                                   |
|-----------------------|--------------------------------------------------------------------------------------------|
| 아티팩트 관리   | JFrog Artifactory, Archiva, Sonatype Nexus                                                 |
| 감사 로그            | Amazon Cloudtrail, Kubernetes 감사 로그, Microsoft 365 감사                              |
| CDN 서비스          | Akamai, Cloudflare, Fastly, CloudFront                                                     |
| CI/CD 서비스        | GitLab, GitHub Actions, Argo CD, Jenkins, CircleCI, TeamCity                                |
| DNS 서비스          | Route53, Cloudflare, Akamai(Edge), NS1                                                    |
| 아이덴티티 서비스     | Cisco ISE, Okta, OneLogin, Workday 사용자 활동 로그                                      |
| 로드밸런서         | AWS ELB, ALB, NLB(GCP 및 Azure 버전), F5, NGINX                                       |
| 네트워크 어플라이언스    | Cisco, Meraki, Juniper, Arbua, HPE, Palo Alto, Barracuda                                   |
| 네트워크 서비스      | WAF, Amazon VPC Flow Logs, AWS ELB, pfSense, Tailscale                                     |
| 서비스 메쉬        | Anthos, Istio, proxyv2, consul, Linkerd, Kong                                              |

### 다수 조직 계정을 위한 Flex Logs {#flex-logs-for-multiple-organization-accounts}

<div class="alert alert-danger">각 조직은 한 번에 하나의 컴퓨팅 크기만 사용할 수 있습니다. 컴퓨팅 크기는 조직 간에 공유할 수 없으며, 동일한 조직 내에서 Starter 컴퓨팅과 확장형 컴퓨팅을 동시에 사용할 수 없습니다.</div>

Flex Logs를 사용하려는 각 조직에 대해 컴퓨팅 크기를 활성화해야 합니다. Datadog은 로그 볼륨이 큰 조직의 경우 Flex Logs 확장형 컴퓨팅 크기(XS, XS+, S, M, L)를 권장합니다. 다중 조직 설정에서는 로그 볼륨이 낮은 조직이 많은 경우가 많으므로, 이러한 조직의 경우 Datadog은 Flex Logs에 Starter 컴퓨팅 크기를 권장합니다.

### 컴퓨팅 제한에 도달한 경우 {#when-the-compute-limit-is-reached}

조직이 동시 쿼리 측면에서 컴퓨팅 제한에 도달하면, 용량을 사용할 수 있을 때까지 쿼리가 계속 재시도되므로 쿼리 속도가 느려질 수 있습니다. 쿼리가 여러 번 재시도되면 실행에 실패할 수 있습니다. 이러한 상황에서는 Flex Logs 컴퓨팅 용량이 제한되어 관리자에게 문의해야 한다는 오류 메시지가 표시됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/log_configuration/indexes/#indexes-filters
[2]: https://app.datadoghq.com/logs/pipelines/indexes
[3]: https://app.datadoghq.com/logs
[4]: https://jfrog.com/help/r/jfrog-platform-administration-documentation/monitoring-and-logging
[5]: https://app.datadoghq.com/logs/pipelines/flex-logs-controls
[6]: https://www.datadoghq.com/pricing/?product=log-management#products
[7]: mailto:success@datadoghq.com
[8]: https://docs.datadoghq.com/ko/account_management/rbac/permissions/#log-management