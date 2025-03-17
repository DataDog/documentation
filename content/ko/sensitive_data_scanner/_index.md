---
aliases:
- /ko/account_management/org_settings/sensitive_data_detection
disable_toc: false
further_reading:
- link: /sensitive_data_scanner/setup/telemetry_data
  tag: 설명서
  text: 원격 측정 데이터에 대한 Sensitive Data Scanner 설정
- link: /sensitive_data_scanner/setup/cloud_storage
  tag: 설명서
  text: 클라우드 스토리지에 대한 Sensitive Data Scanner 설정
- link: coterm
  tag: 설명서
  text: 'CoTerm: 로컬 및 원격 시스템에서 터미널 세션 및 중요한 활동을 모니터링합니다.'
- link: /sensitive_data_scanner/guide/best_practices_for_creating_custom_rules
  tag: 설명서
  text: 커스텀 규칙 생성을 위한 모범 사례
- link: /data_security/
  tag: 설명서
  text: 데이터 관련 위험 감소
- link: https://www.datadoghq.com/blog/scaling-sensitive-data-scanner/
  tag: 블로그
  text: 민감 데이터 스캐너를 사용하여 규모에 따라 민감 데이터 문제를 식별, 분류 및 해결하세요.
- link: https://www.datadoghq.com/blog/sensitive-data-scanner/
  tag: 블로그
  text: Datadog의 Sensitive Data Scanner로 최신 데이터 규정 준수 전략 구축
- link: https://www.datadoghq.com/blog/sensitive-data-management-best-practices/
  tag: 블로그
  text: 민감 데이터 관리 모범 사례
- link: https://www.datadoghq.com/blog/data-security/
  tag: 블로그
  text: Data Security으로 내 클라우드 데이터에 있는 민감 데이터 찾기
- link: https://www.datadoghq.com/blog/hipaa-compliance-sensitive-data-scanner/
  tag: 블로그
  text: Datadog를 사용해 HIPAA 요건의 적용을 받는 기업들이 민감한 데이터를 관리하는 방법
- link: https://www.datadoghq.com/blog/sds-dlp-for-financial-service-companies/
  tag: 블로그
  text: 금융 서비스 회사가 Datadog를 사용하여 민감한 데이터를 검색, 분류 및 관리하는 방법
- link: https://www.datadoghq.com/blog/sds-for-insurance-companies/
  tag: 블로그
  text: 보험 회사가 Datadog을 사용하여 민감한 데이터 리스크를 발견, 분류 및 조치하는 방법
title: 민감 데이터 스캐너
---

## 개요

신용카드 번호, API 키, IP 주소, 개인 식별 정보(PII)와 같은 민감한 데이터가 유출되면 조직은 보안 및 규정 준수 위험에 노출됩니다. 민감한 데이터는 애플리케이션 로그, APM 스팬, RUM 이벤트, 이벤트 관리의 이벤트와 같은 원격 측정 데이터에서 발견될 수 있습니다. 엔지니어링 팀이 워크로드를 클라우드로 옮길 때 의도치 않게 클라우드 스토리지 리소스로 이동될 수도 있습니다. Datadog의 Sensitive Data Scanner를 통해 민감한 데이터를 발견, 분류 및 선택적으로 삭제하여 민감한 데이터 유출을 방지하고 규정 미준수 위험을 줄일 수 있습니다.

**참고**: PCI 준수 Datadog 조직을 설정하는 방법에 대한 자세한 내용을 확인하려면 [PCI DSS 준수][1]를 참조하세요.

## 원격 측정 데이터 스캔

{{< img src="sensitive_data_scanner/telemetry_data_issues.png" alt="5가지의 민감한 문제가 감지되었으며, 그중 2가지는 critical 우선순위이고 1가지는 medium 우선순위이며 2가지는  info입니다." style="width:100%;" >}}

Sensitive Data Scanner는 [클라우드](#in-the-cloud) 또는 [사용자 환경](#in-your-environment)에서 데이터를 스캔할 수 있습니다.

### 클라우드에서 {#in-the-cloud}

클라우드에서 Sensitive Data Scanner를 사용하면 로그와 이벤트를 Datadog 백엔드에 제출하기 때문에 데이터가 삭제되기 전에 환경을 벗어납니다. 로그와 이벤트는 처리 중에 Datadog 백엔드에서 스캔되고 삭제되므로 민감한 데이터는 이벤트가 인덱싱되어 Datadog UI에 표시되기 전에 삭제됩니다.

스캔하여 삭제할 수 있는 데이터는 다음과 같습니다.

- 로그: 로그 메시지 및 속성 값을 포함한 모든 구조화된 로그 콘텐츠 및 구조화되지 않은 로그 콘텐츠
- APM: 범위 속성 값만
- RUM: 이벤트 속성 값만
- 이벤트: 이벤트 속성 값만

Sensitive Data Scanner를 사용하려면 스캔 그룹을 설정하여 스캔할 데이터를 정의한 다음, 데이터 내에서 어떤 민감한 정보를 매치할지 결정하는 스캔 규칙을 설정합니다. 스캔 규칙의 경우 다음을 수행할 수 있습니다.
- Datadog의 [Scanning Rule Library][2]에서 미리 정의된 스캐닝 규칙을 추가합니다. 이러한 규칙은 이메일 주소, 신용 카드 번호, API 키, 권한 부여 토큰, 네트워크 및 장치 정보 등과 같은 일반적인 패턴을 감지합니다.
- [정규식 패턴을 사용하여 나만의 규칙을 만듭니다][3].

세부 사항은 [원격 측정 데이터에 대한  Sensitive Data Scanner 설정][4]을 참조하세요.


### 환경에서 {#in-your-environment}

[Observability Pipelines][5]를 사용하여 환경 내에서 로그를 수집하고 처리한 다음, 다운스트림 통합으로 데이터를 라우팅합니다. Observability Pipelines에서 파이프라인을 설정할 때 [Sensitive Data Scanner 프로세서][6]를 추가하여 로그가 구내를 떠나기 전에 로그의 민감한 데이터를 삭제합니다. 이메일 주소, 신용 카드 번호, API 키, 권한 부여 토큰, IP 주소 등과 같이 규칙 라이브러리에서 미리 정의된 스캐닝 규칙을 추가할 수 있습니다. 정규식 패턴을 사용하여 고유한 규칙을 만들 수도 있습니다.

자세한 내용은 [파이프라인 설정][7]을 참조하세요.

## 클라우드 스토리지 스캔

{{< callout header="Limited Availability" url="https://www.datadoghq.com/private-beta/data-security" >}}
  Amazon S3 버킷 및 RDS 인스턴스에 검사는 서비스 지원이 제한되어 있습니다. 서비스 사용을 신청하려면 <strong>액세스 요청</strong>을 클릭하세요.
{{< /callout >}}

{{< img src="sensitive_data_scanner/cloud_storage_issues.png" alt="3개의 Amazon S3 이슈가 있는 Summary 페이지의 데이터 저장소 섹션" style="width:100%;" >}}

Sensitive Data Scanner를 활성화한 경우 Amazon S3 버킷과 RDS 인스턴스에 있는 민감한 데이터를 카탈로그화하고 분류할 수 있습니다. **참고**: Sensitive Data Scanner는 클라우드 스토리지 리소스에 있는 민감한 데이터를 삭제하지 않습니다.

Sensitive Data Scanner는 클라우드 환경에 [에이전트리스 스캐너][8]를 배포하여 민감한 데이터를 스캔합니다. 이러한 스캔 인스턴스는 [원격 구성][9]을 통해 모든 S3 버킷 및 RDS 인스턴스 목록을 검색하고, 시간이 지남에 따라 모든 데이터 저장소의 텍스트 파일(예: CSV 및 JSON)과 테이블을 스캔하기 위한 지침을 설정합니다.

Sensitive Data Scanner는 [전체 규칙 라이브러리][10]를 활용하여 일치 항목을 찾습니다. 일치 항목이 발견되면 일치 항목의 위치가 스캐닝 인스턴스에 의해 Datadog으로 전송됩니다. **참고**: 데이터 저장소와 해당 파일은 사용자 환경에서만 읽힙니다. 스캔된 민감한 데이터는 Datadog로 다시 전송되지 않습니다.

민감한 데이터 일치 항목을 표시하는 것과 함께, Sensitive Data Scanner는 [Cloud Security Management][11]에서 감지한 민감한 데이터 저장소에 영향을 미치는 모든 보안 이슈를 표면화합니다. 각 이슈를 클릭하면 Cloud Security Management 내에서 분류하고 수정할 수 있습니다.

설정 세부 사항은 [클라우드 스토리지에 대한 Sensitive Data Scanner 설정][12]을 참조하세요.

## 민감한 데이터 이슈 조사하기

{{< img src="sensitive_data_scanner/sds_summary_20250203.png" alt="우선순위별로 구분된 민감한 이슈개요를 보여주는 요약 페이지" style="width:100%;" >}}

[Summary 페이지][13]를 사용하여 스캐닝 규칙에서 식별된 민감한 데이터 이슈의 세부 정보를 확인하세요. 이러한 세부 정보에는 다음이 포함됩니다.

- 일치 항목을 감지한 특정 스캐닝 규칙을 통해 필요에 따라 어떤 규칙을 수정해야 할지 결정할 수 있습니다.
- 이슈가 발생한 스캐닝 그룹을 확인하여 누출 반경을 파악할 수 있습니다.
- 이슈와 관련된 이벤트 수를 통해 이슈의 범위와 심각성을 판단할 수 있습니다.
- 이슈와 관련된 이벤트 그래프를 통해 문제가 시작된 시점과 진행 상황을 정확히 파악하는 데 도움이 됩니다.
- 해당 이슈와 관련하여 관련 사례가 생성되었습니다.

중요 데이터 이슈를 분류하기 위해 Summary 페이지를 사용하는 자세한 방법은 [민감한 데이터 이슈 조사][14]를 참조하세요.

## 민감한 데이터 트렌트 리뷰

{{<img src="sensitive_data_scanner/sdslight.png" alt="Sensitive Data Scanner Overview dashboard" style="width:80%;">}}

Sensitive Data Scanner가 활성화되면 민감한 데이터 문제를 요약한 [기본 제공 대시보드][15]가 계정에 자동으로 설치됩니다. 이 대시보드에 액세스하려면 **Dashboards** > **Dashboards List**로 이동하여 "Sensitive Data Scanner Overview"를 검색합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/data_security/pci_compliance/
[2]: /ko/sensitive_data_scanner/scanning_rules/library_rules/
[3]: /ko/sensitive_data_scanner/scanning_rules/custom_rules/
[4]: /ko/sensitive_data_scanner/setup/telemetry_data/
[5]: /ko/observability_pipelines/
[6]: /ko/observability_pipelines/processors/sensitive_data_scanner
[7]: /ko/observability_pipelines/set_up_pipelines/
[8]: /ko/security/cloud_security_management/setup/agentless_scanning
[9]: /ko/agent/remote_config
[10]: /ko/sensitive_data_scanner/library_rules/
[11]: /ko/security/cloud_security_management
[12]: /ko/sensitive_data_scanner/setup/cloud_storage/
[13]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner
[14]: /ko/sensitive_data_scanner/guide/investigate_sensitive_data_issues/
[15]: https://app.datadoghq.com/dash/integration/sensitive_data_scanner