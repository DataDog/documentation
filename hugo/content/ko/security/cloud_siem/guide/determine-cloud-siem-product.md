---
description: Cloud SIEM은 독립형, Flex Logs가 적용된 애드온, 레거시 제품으로 제공됩니다. 이 가이드를 따라가면서 조직에서
  사용 중인 제품을 확인하고 각 제품에서 제공하는 기능을 비교해 볼 수 있습니다.
title: 현재 조직에서 사용 중인 Cloud SIEM 제품 확인
---
## 개요 {#overview}
Cloud SIEM은 다음과 같은 제품으로 제공됩니다.
- 독립형
  - 12개월(365일, 사용량 측정 단위: GB)
  - 15개월(450일, 이벤트 몇 백 만개로 사용량 측정)
  <div class="alert alert-info">12개월 보존 정책 도입 전 독립형을 채택한 조직은 보존 기간이 15개월입니다. 둘 다 동일한 기능을 제공하므로 이 문서에서는 모두 독립형으로 지칭합니다.</div>
- Flex Logs 적용 애드온
- 레거시

독립형 12개월은 신규 Cloud SIEM 조직을 위한 기본 제품입니다. 독립형:
- 사용량은 분석된 이벤트 수백만 개가 아니라 분석된 로그의 기가바이트(GB) 단위로 측정됩니다.
- Cloud SIEM 인덱스에 인덱싱된 로그의 수집은 별도로 청구되지 않고 분석된 로그 비용에 포함됩니다.
- 데이터는 15개월이 아닌 365일(12개월) 동안 보관됩니다.

조직에서 사용 중인 Cloud SIEM 제품을 확인하는 방법은 다음 두 가지가 있습니다.
- [플랜 및 사용량 페이지 확인](#plan-usage)
- [Cloud SIEM settings 페이지 확인](#settings)

각 제품에 포함된 내용을 비교하려면 [Cloud SIEM 제품별 기능](#features)을 참조하세요.

## 플랜 및 사용량 페이지{#plan-usage} 확인

<div class="alert alert-info">다음과 같은 경우 이 옵션을 사용하지 못할 수 있습니다.
  <ul>
    <li>이 페이지에 대한 액세스 권한이 없는 경우</li>
    <li>조직이 다중 조직(multi-org)으로 구성된 경우. 플랜 및 사용량 페이지는 모든 하위 조직의 데이터를 합산하여 보여주므로 여러 Cloud SIEM 제품 타일이 보일 수 있음</li>
  </ul>
  어느 경우든 <a href="#settings">Cloud SIEM settings 페이지 확인</a> 섹션의 지침에 따라 조직에서 사용 중인 제품을 확인하세요.
</div>

1. Datadog에서 {{< ui >}}Plan & Usage{{< /ui >}} > [**Usage & Cost**][1] 페이지로 이동합니다.
1. **Usage Summary** 섹션으로 스크롤하여 {{< ui >}}Security{{< /ui >}} 탭을 클릭합니다.
1. 조직에서 사용 중인 Cloud SIEM 제품을 나타내는 타일을 찾습니다.
   <table>
     <thead>
       <tr>
         <th style="width:60%">타일</th>
         <th style="width:40%">제품</th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td><strong>보안 분석 및 인덱싱된 로그</strong><br />
           {{< img src="security/cloud_siem/guide/tile_security_analyzed_indexed_logs.png" alt="사용량과 해당 사용량이 온디맨드 방식인지 나타내는 표시 외에도 'Security Analyzed and Indexed Logs'라고 레이블이 지정된 타일" width="50%">}}
         </td>
         <td>Standalone</td>
       </tr>
       <tr>
         <td><strong>Cloud SIEM - Analyzed Logs (Add-On)</strong><br />
           {{< img src="security/cloud_siem/guide/tile_analyzed_logs_add_on.png" alt="사용량과 해당 사용량이 온디맨드 방식인지 나타내는 표시 외에도 'Cloud SIEM - Analyzed Logs(Add-On)'라고 레이블이 지정된 타일" width="50%">}}
         </td>
         <td>Add-on with Flex Logs</td>
       </tr>
       <tr>
         <td><strong>SIEM - Analyzed Logs</strong><br />
           {{< img src="security/cloud_siem/guide/tile_analyzed_logs.png" alt="사용량과 해당 사용량이 온디맨드 방식인지 나타내는 표시 외에도 'SIEM - Analyzed Logs'라고 레이블이 지정된 타일" width="50%">}}
         </td>
         <td>Legacy</td>
       </tr>
     </tbody>
   </table>

## Cloud SIEM settings 페이지{#settings} 확인

Datadog에서 [Cloud SIEM settings][2] 페이지로 이동합니다. 이 페이지에는 조직에서 사용 중인 Cloud SIEM 제품을 나타내는 {{< ui >}}Core Configuration{{< /ui >}} 또는 {{< ui >}}Settings{{< /ui >}} 섹션이 표시됩니다.
<table>
  <thead>
    <tr>
      <th style="width:80%">설정 섹션</th>
      <th style="width:20%">제품</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>핵심 구성</strong> 섹션(<strong>인덱스 구성 포함</strong>)<br />
        {{< img src="security/cloud_siem/guide/config_core_index.png" alt="핵심 구성 제목을 포함한 구성 설정(인덱스 구성 섹션 포함)" width="80%">}}
      </td>
      <td>Standalone</td>
    </tr>
    <tr>
      <td><strong>Core Configuration</strong> section with <strong>Security Filters Configuration</strong><br />
        {{< img src="security/cloud_siem/guide/config_core_security_filters.png" alt="핵심 구성 제목을 포함하는 구성 설정으로, 여기에는 보안 필터 구성 섹션이 포함되어 있습니다." width="80%">}}
      </td>
      <td>Add-on with Flex Logs</td>
    </tr>
    <tr>
      <td><strong>Sources</strong> table<br />
        {{< img src="security/cloud_siem/guide/config_sources.png" alt="구성 설정(소스 테이블 포함)" width="80%">}}
      </td>
      <td>Legacy</td>
    </tr>
  </tbody>
</table>

## Cloud SIEM 제품별 기능{#features}

다음 표에는 각 제품에서 사용할 수 있는 Cloud SIEM 기능이 나열되어 있습니다.

| 기능 | 독립형 | Flex Logs가 적용된 애드온 | 레거시 |
|---------|:----------:|:---------------------:|:------:|
| [콘텐츠 팩][4] | {{< X >}} | {{< X >}} | {{< X >}} |
| [기본 감지 규칙 편집][5] | {{< X >}} | {{< X >}} | {{< X >}} |
| [MITRE ATT&CK 맵][6] | {{< X >}} | {{< X >}} | {{< X >}} |
| [보안 필터][7] | | {{< X >}} | {{< X >}} |
| [로그 인덱스 필터][8] | {{< X >}} | | |
| [MITRE ATT&CK 맵 간단히 보기][6] | {{< X >}} | {{< X >}} | |
| [예약된 규칙][9] | {{< X >}} | {{< X >}} | |
| [시퀀스 감지][10] | {{< X >}} | {{< X >}} | |
| [과거 작업][11] | {{< X >}} | {{< X >}} | |
| [위험 인사이트][12] | {{< X >}} | {{< X >}} | |
| [동적 심각도][13] | {{< X >}} | {{< X >}} | |
| [OCSF(Open Cybersecurity Schema Framework)][14] | {{< X >}} | {{< X >}} | |
| [위협 인텔리전스][15] | {{< X >}} | {{< X >}} | |

제품을 식별하는 데 도움이 필요하거나 제품에 포함되지 않은 기능을 사용하려면 Datadog 계정 팀 또는 [Datadog 지원 팀][3]에 문의하세요.

[1]: https://app.datadoghq.com/billing/usage
[2]: https://app.datadoghq.com/security/configuration/siem/setup
[3]: /ko/help/
[4]: /ko/security/cloud_siem/ingest_and_enrich/content_packs/
[5]: /ko/security/detection_rules/
[6]: /ko/security/cloud_siem/detect_and_monitor/mitre_attack_map/
[7]: /ko/security/cloud_siem/guide/customize-which-logs-cloud-siem-analyzes/#how-security-filters-work
[8]: /ko/security/cloud_siem/guide/customize-which-logs-cloud-siem-analyzes/#cloud-siem-standalone-filter-the-cloud-siem-index
[9]: /ko/security/cloud_siem/detect_and_monitor/custom_detection_rules/
[10]: /ko/security/cloud_siem/detect_and_monitor/custom_detection_rules/sequence/
[11]: /ko/security/cloud_siem/detect_and_monitor/historical_jobs/
[12]: /ko/security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
[13]: /ko/security/cloud_siem/detect_and_monitor/dynamic_severity/
[14]: /ko/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/
[15]: /ko/security/cloud_siem/ingest_and_enrich/threat_intelligence/