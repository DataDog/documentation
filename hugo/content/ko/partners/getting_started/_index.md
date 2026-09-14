---
cascade:
  algolia:
    subcategory: Getting Started
description: 영업 및 서비스 파트너용 Datadog 시작하기
title: 시작하기
---
Datadog은 클라이언트의 하이브리드 클라우드 인프라와 애플리케이션에 관한 인사이트를 제공합니다. 직관적인 UI와 강력한 API를 갖추고 있어 온보딩과 프로비저닝이 가능하고 클라이언트의 다양한 환경을 관리할 수 있습니다. 동시에 각 계정의 데이터 보안을 구축할 수 있습니다.

이 섹션에서는 모범 사례를 다루며 다음을 통해 클라이언트 환경 모니터링을 시작하는 데 도움을 드립니다. 다음 주제를 다룹니다.

- [토대 다지기][1]: 시작하는 방법과 처음에 고려해야 할 주요 결정 사항에 관한 정보를 제공합니다.
- [데이터 수집][2]: Datadog에 데이터를 공급하는 방법과 환경이 충족해야 할 전제 조건에 대해 설명합니다.
- [가치 전달][3]: Datadog로 데이터가 유입된 후 권장되는 단계를 안내합니다.
- [요금 및 사용량 보고][4]: 단일 및 다수 계정 설정에서 Datadog 플랫폼 사용량을 집계하고 개별 클라이언트를 모니터링하는 방법을 다룹니다.
- [멀티 테넌트 사용량 측정 및 요금 청구][12]: 최종 고객의 사용량, 비용 및 요금 청구를 중앙에서 관리하는 데 사용되는 관리자 조직을 다룹니다.

## 파트너 영업 지원 가이드 {#partner-sales-enablement-guide}

[파트너 영업 지원 가이드][5]를 참고해 Datadog 영업 엔지니어링 프로세스를 반영한 교육 로드맵을 확인하세요.
## Datadog 관련 최신 정보 확인 {#staying-up-to-date-with-datadog}

Datadog과 관련한 최신 정보를 얻고 새로운 기능에 대해 알아볼 수 있는 다양한 방법이 있습니다.
- Datadog 사이트에서 [릴리스 노트를 확인][6]합니다.
- Datadog 파트너 네트워크 회원은 [Datadog 파트너 네트워크 포털][7]에 독점적으로 액세스하여 다음 정보를 찾을 수 있습니다.
  - 리소스 및 교육 자료
  - 분기별 DPN 라이브 브리핑 웨비나: 자산 라이브러리에서 녹화된 세션을 보거나 받은 편지함에서 초대장을 확인하세요.
- Datadog의 [Datadog on...][8] 시리즈를 통해 클라우드에서 확장 가능한 분산 시스템을 구축하는 방법과 관련한 다양한 교육 자료를 활용할 수 있습니다.

### 상태 정보 {#status-information}

Datadog은 다음 리소스를 제공하여 최신 서비스 상태 정보를 확보할 수 있도록 지원합니다.
- 미국 지역: [https://status.datadoghq.com][9]
- EU 지역: [https://status.datadoghq.eu][10]

이 페이지를 구독하여 상태 변경에 관한 알림을 받아보세요.

Datadog을 사용해 활성화한 타사 통합 상태를 확인하려면 다음을 참고하세요.[https://datadogintegrations.statuspage.io][11].

### 기타 리소스 {#other-resources}

Datadog에서 최신 정보를 얻을 수 있는 기타 리소스를 살펴보세요.

{{< whatsnext desc="GitHub 리포지토리" >}}
    {{< nextlink href="https://github.com/DataDog/datadog-agent/" >}}Datadog Agent: Datadog Agent 버전 7 및 버전 6의 소스 코드. {{< /nextlink >}}
    {{< nextlink href="https://github.com/DataDog/integrations-core/" >}}Integrations core: Datadog이 공식적으로 개발하고 지원하는 Agent Integrations.{{< /nextlink >}}
    {{< nextlink href="https://github.com/DataDog/integrations-extras/" >}}Integrations extras: 커뮤니티에서 유지 관리하는 Datadog Integrations.{{< /nextlink >}}
    {{< nextlink href="https://github.com/DataDog/Miscellany" >}}Miscellany: Datadog의 잡다한 스크립트 및 도구.{{< /nextlink >}}
    {{< nextlink href="https://github.com/DataDog/dpn" >}}DPN: 파트너용 샘플 애플리케이션.{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Datadog 블로그 및 소셜 미디어" >}}
    {{< nextlink href="https://www.datadoghq.com/blog/" >}}Datadog 블로그{{< /nextlink >}}
    {{< nextlink href="https://www.linkedin.com/company/datadog/" >}}LinkedIn{{< /nextlink >}}
    {{< nextlink href="https://x.com/datadoghq" >}}X{{< /nextlink >}}
    {{< nextlink href="https://www.facebook.com/datadoghq/" >}}Facebook{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="YouTube" >}}
    {{< nextlink href="https://www.youtube.com/user/DatadogHQ" >}}공식 YouTube 채널{{< /nextlink >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaM9Sq_fi-yXuzhmE7nOlqLE" >}}팁 및 요령 재생 목록{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Dash 컨퍼런스 재생 목록" >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaPzYWUp9NA8IfbC47zxM57M" >}}Dash 2026{{< /nextlink >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaO91zHnerkZ5EZJ-qcqK4ib" >}}Dash 2025{{< /nextlink >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaNd5cmcY3ey4QoeyDk6aMKz" >}}Dash 2024{{< /nextlink >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaPhn1p7Sz6nc_6-9YInd__u" >}}Dash 2023{{< /nextlink >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaOlLse2WlvFXYRJ8iirG2QO" >}}Dash 2022{{< /nextlink >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaO-_rgnDSBn221gWacNCkDr" >}}Dash 2021{{< /nextlink >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaMlgvtlJRyXGgt4i-9Oiyi1" >}}Dash 2020{{< /nextlink >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaPkMoleskq9YcWMWvYfBCRB" >}}Dash 2019{{< /nextlink >}}

{{< /whatsnext >}}

[1]: /ko/partners/laying-the-groundwork/
[2]: /ko/partners/data-intake/
[3]: /ko/partners/delivering-value/
[4]: /ko/partners/billing-and-usage-reporting/
[5]: /ko/partners/sales-enablement/
[6]: https://app.datadoghq.com/release-notes
[7]: https://partners.datadoghq.com/
[8]: https://datadogon.datadoghq.com/
[9]: https://status.datadoghq.com
[10]: https://status.datadoghq.eu
[12]: /ko/partners/multi_tenant_billing/
[11]: https://datadogintegrations.statuspage.io