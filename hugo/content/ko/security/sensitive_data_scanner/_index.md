---
aliases:
- /ko/account_management/org_settings/sensitive_data_detection
- /ko/sensitive_data_scanner/
disable_toc: false
further_reading:
- link: /security/sensitive_data_scanner/setup/telemetry_data
  tag: 설명서
  text: 원격 측정 데이터를 위한 Sensitive Data Scanner 설정
- link: /security/sensitive_data_scanner/setup/cloud_storage
  tag: 설명서
  text: 클라우드 스토리지를 위한 Sensitive Data Scanner 설정
- link: coterm
  tag: 설명서
  text: 'CoTerm: 로컬 및 원격 시스템에서 터미널 세션 및 중요한 활동을 모니터링합니다.'
- link: /data_security/
  tag: 설명서
  text: 데이터 관련 위험 감소
- link: https://www.datadoghq.com/blog/scaling-sensitive-data-scanner/
  tag: 블로그
  text: 민감 데이터 스캐너를 사용하여 규모에 따라 민감한 데이터 문제를 식별, 분류 및 해결하세요.
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
- link: https://www.datadoghq.com/blog/llm-aws-strands
  tag: 블로그
  text: Datadog LLM Observability를 통해 Strands Agents 워크플로에 대한 가시성을 확보합니다.
- link: https://www.datadoghq.com/blog/observability-pipelines-mssp
  tag: 블로그
  text: Datadog Observability Pipelines를 사용하여 MSSP의 로그 수집 및 집계를 간소화합니다.
- link: https://www.datadoghq.com/blog/datadog-cloud-security-compliance
  tag: 블로그
  text: Datadog Cloud Security를 통해 글로벌 프레임워크 전반에 걸쳐 규정 준수를 확장하세요.
title: Sensitive Data Scanner
---
## 개요 {#overview}

신용 카드 번호, API 키, IP 주소 및 개인 식별 정보(PII)와 같은 민감한 데이터는 종종 의도치 않게 유출되어 조직이 보안 및 규정 준수 위험에 노출될 수 있습니다. 민감한 데이터는 다음에서 찾을 수 있습니다.
 
- APM 스팬
- 코드 리포지토리
- Event Management의 이벤트
- LLM Observability 트레이스
- RUM 이벤트
- 애플리케이션 로그와 같은 텔레메트리 데이터

엔지니어링 팀이 작업 부하를 클라우드로 이동할 때 민감한 데이터가 클라우드 스토리지 리소스로 의도치 않게 이동할 수 있습니다. Datadog의 Sensitive Data Scanner는 민감한 데이터 유출을 방지하고 비준수 위험을 제한하는 데 도움을 줄 수 있으며, 민감한 데이터를 발견하고 분류하며 필요 시에 수정할 수 있습니다.

**참고**: Datadog의 도구 및 정책은 PCI v4.0을 준수합니다. 자세한 내용은 [PCI DSS 준수][1]를 참조하세요.

## 텔레메트리 데이터 스캔 {#scan-telemetry-data}

{{< img src="sensitive_data_scanner/telemetry_data_issues.png" alt="다섯 가지의 서로 다른 민감한 발견이 감지되었으며, 그 중 두 가지는 중요도가 높고, 하나는 중간 우선 순위이며, 두 가지는 정보입니다." style="width:100%;" >}}

Sensitive Data Scanner는 [클라우드](#in-the-cloud)에서 또는 [내 환경](#in-your-environment)에서 데이터를 스캔할 수 있습니다.

### 클라우드에서 {#in-the-cloud}

클라우드에서 Sensitive Data Scanner를 사용하면 로그와 이벤트를 Datadog 백엔드에 제출하므로 데이터가 비식별화되기 전에 환경을 떠납니다. 로그와 이벤트는 처리 중에 Datadog 백엔드에서 스캔되고 비식별화되므로 민감한 데이터는 이벤트가 인덱싱되고 Datadog UI에 표시되기 전에 비식별화됩니다.

스캔하여 삭제할 수 있는 데이터는 다음과 같습니다.

- **로그**: 로그 메시지 및 특성 값을 포함한 모든 구조화된 로그 콘텐츠 및 구조화되지 않은 로그 콘텐츠
- **APM**: 스팬 특성 값만
- **RUM**: 이벤트 특성 값만
- **이벤트**: 이벤트 특성 값만

필요 시, 각 제품에 대해 샘플링 비율을 10%에서 99% 사이로 설정할 수 있습니다. 이는 민감한 정보를 스캔하는 데이터 양을 줄여 처음 시작할 때 비용을 관리하는 데 도움이 됩니다.

각 [스캔 규칙][17]에 대해, 일치하는 민감한 데이터에 다음 중 하나의 액션을 적용할 수 있습니다.

- **비식별화**: 선택한 단일 토큰으로 일치하는 전체 데이터를 교체합니다. 예를 들어 `[sensitive_data]`.
- **부분 비식별화**: 모든 일치하는 값의 특정 부분을 교체합니다.
- **해시**: 일치하는 전체 데이터를 비가역적인 고유 식별자로 교체합니다.
- **마스킹**(로그에만 사용 가능): 모든 일치하는 값을 마스킹합니다. `Data Scanner Unmask`권한이 있는 사용자는 이 데이터를 Datadog에서 마스킹 해제하고 조회할 수 있습니다. 자세한 내용은 [마스킹 액션][16]을 참조하세요.

**참고**: 샘플링된 데이터를 스캔할 때, 스캔하는 데이터를 마스킹하는 액션을 선택할 수 없습니다.

Sensitive Data Scanner를 사용하려면 스캔 그룹을 설정하여 스캔할 데이터를 정의한 후, 스캔 규칙을 설정하여 데이터 내에서 일치시킬 민감한 정보를 결정합니다. 스캔 규칙에 대해 다음 작업을 할 수 있습니다.
- Datadog의 [스캔 규칙 라이브러리][2]에서 미리 정의된 스캔 규칙을 추가합니다. 이 규칙은 이메일 주소, 신용 카드 번호, API 키, 인증 토큰, 네트워크 및 기기 정보 등과 같은 일반적인 패턴을 감지합니다.
- [정규식 패턴을 사용하여 나만의 규칙을 만드세요][3].

세부 사항은 [텔레메트리 데이터에 대한 Sensitive Data Scanner 설정][4]을 참조하세요.

### 내 환경 {#in-your-environment}

[Observability Pipelines][5]를 사용하여 환경 내에서 로그를 수집하고 처리한 다음, 데이터를 다운스트림 통합으로 라우팅합니다. Observability Pipelines에서 파이프라인을 설정할 때, 로그가 환경을 떠나기 전에 민감한 데이터를 비식별화하도록 [Sensitive Data Scanner 프로세서][6]를 추가하세요. 이메일 주소, 신용 카드 번호, API 키, 인증 토큰, IP 주소 등과 같은 미리 정의된 스캔 규칙을 규칙 라이브러리에서 추가할 수 있습니다. 정규식 패턴을 사용하여 나만의 규칙을 만들 수도 있습니다.

자세한 내용은 [파이프라인 설정][7]을 참조하세요.

## LLM Observability 데이터를 스캔 {#scan-llm-observability-data}

Sensitive Data Scanner는 [Datadog LLM Observability][20] 트레이스를 스캔할 수 있으며, 여기에는 LLM 애플리케이션의 입력 및 출력이 포함됩니다. 프롬프트, 완성 및 LLM 워크플로 메타데이터에서 PII, API 키 또는 독점 정보를 노출하는 것을 방지하는 데 도움이 됩니다.

LLM Observability 스캔은 텔레메트리 데이터 스캔과 다른 관리형 구성 모델을 사용하며, LLM Observability 스캔에는 다음이 포함됩니다.

- **하나의 관리형 스캔 그룹**: [LLM Observability 설정 페이지][18]에 처음 접근할 때 귀하의 조직을 위해 기본 스캔 그룹이 자동으로 생성됩니다. 추가 스캔 그룹을 생성하거나 관리형 그룹을 삭제할 수 없습니다.
- **사용자 정의 가능한 규칙**: 기존 규칙을 수정하거나 필요 없는 규칙을 비활성화하거나 추가 민감한 데이터 패턴을 감지하기 위해 사용자 정의 스캔 규칙을 추가할 수 있습니다.

각 스캔 규칙에 대해, 일치하는 민감한 데이터에 다음 중 하나의 작업을 적용할 수 있습니다.

- **비식별화**: 선택한 단일 토큰으로 일치하는 전체 데이터를 교체합니다. 예를 들어 `[sensitive_data]`.
- **부분 비식별화**: 모든 일치하는 값의 특정 부분을 교체합니다.
- **해시**: 일치하는 전체 데이터를 비가역적인 고유 식별자로 교체합니다.

LLM Observability 데이터 스캔을 구성하려면 Sensitive Data Scanner 설정에서 [LLM Observability 설정 페이지][18]로 이동하세요. LLM Observability에 대한 자세한 정보는 [LLM Observability 설명서][20]를 참조하세요.

## 클라우드 스토리지 스캔 {#scan-cloud-storage}

{{< callout url="https://www.datadoghq.com/product-preview/data-security" >}}
  Amazon S3 버킷 및 RDS 인스턴스에 대한 스캔 지원은 미리 보기 상태입니다. 등록하려면 <strong>Request Access</strong>를 클릭하세요.
{{< /callout >}}

{{< img src="sensitive_data_scanner/cloud_storage_issues.png" alt="세 가지 Amazon S3 발견이 있는 Findings 페이지의 데이터 저장소 섹션" style="width:100%;" >}}

Sensitive Data Scanner를 활성화하면 Amazon S3 버킷에서 민감한 데이터를 분류하고 구분할 수 있습니다. **참고**: Sensitive Data Scanner는 클라우드 스토리지 리소스에서 민감한 데이터를 비식별화하지 않습니다.

Sensitive Data Scanner는 클라우드 환경에 [에이전트 없는 스캐너][8]를 배포하여 민감한 데이터를 스캔합니다. 이 스캐닝 인스턴스는 [Remote Configuration][9]을 통해 모든 S3 버킷의 목록을 검색하고, 시간이 지남에 따라 CSV 및 JSON과 같은 텍스트 파일을 스캔하도록 설정된 지침을 가지고 있습니다.

Sensitive Data Scanner는 [전체 규칙 라이브러리][10]를 활용하여 일치 항목을 찾습니다. 일치 항목이 발견되면, 일치 항목의 위치가 스캐닝 인스턴스에 의해 Datadog으로 전송됩니다. **참고**: 데이터 저장소와 그 파일은 귀하의 환경에서만 읽히며, 스캔된 민감한 데이터는 Datadog으로 다시 전송되지 않습니다.

민감한 데이터 일치를 표시하는 기능 외에도, Sensitive Data Scanner는 민감한 데이터 저장소에 영향을 미치는 [Cloud Security][11]에서 감지된 보안 문제를 표시합니다. 문제를 클릭하면 Cloud Security 내에서 추가 분류 및 수정 작업을 계속할 수 있습니다.

설정 세부 사항은 [클라우드 스토리지에 대한 Sensitive Data Scanner 설정][12]을 참조하세요.

## 코드 리포지토리 스캔 {#scan-code-repositories}

Datadog [Secret Scanning][21]은 코드 리포지토리를 스캔하여 소스 코드에서 노출된 암호를 감지합니다. Secret Scanning은 Sensitive Data Scanner에 의해 구동되며, SDS 라이브러리의 [암호 및 자격 증명 카테고리][19]의 모든 규칙을 사용하여 일치 항목을 찾습니다.

텔레메트리 데이터 스캐닝과 달리, Secret Scanning은 귀하의 CI/CD 파이프라인 또는 Datadog 내에서 호스팅 스캐닝(지원되는 GitHub, Azure DevOps 및 GitLab) 방식으로 실행됩니다. 코드에서 암호가 감지되면, 해당 발견 사항은 Code Security 인터페이스에 표시됩니다.

설정 세부정보는 [Secret Scanning 설명서][21]를 참조하세요.

## 민감한 데이터 발견 사항 조사 {#investigate-sensitive-data-findings}

{{< img src="sensitive_data_scanner/findings_20251014.png" alt="우선순위별로 분류된 민감한 데이터 발견의 개요를 보여주는 Findings page" style="width:100%;" >}}

[Findings page][13]를 사용하여 스캐닝 규칙에 의해 식별된 민감한 데이터 발견의 세부정보를 확인하세요. 이 세부정보에는 다음이 포함됩니다.

- 매칭되는 항목을 감지한 특정 스캐닝 규칙을 통해, 필요에 따라 수정할 규칙을 결정할 수 있습니다.
- 해당 발견이 발생한 스캐닝 그룹을 통해, 누출의 범위를 판단할 수 있습니다.
- 발견과 관련된 이벤트 수를 통해 그 범위와 심각성을 판단할 수 있습니다.
- 발견과 관련된 이벤트 그래프를 통해 발견이 시작된 시점과 진행 상황을 정확히 파악하는 데 도움이 됩니다.
- 발견과 관련하여 생성된 케이스입니다.

민감한 데이터에 대한 분류 작업에 관한 자세한 내용은 [민감한 데이터 발견 사항 조사][14]를 참조하세요.

## 민감한 데이터 트렌드 검토 {#review-sensitive-data-trends}

{{<img src="sensitive_data_scanner/sdslight.png" alt="Sensitive Data Scanner Overview 대시보드" style="width:80%;">}}

Sensitive Data Scanner가 활성화되면, 민감한 데이터 발견을 요약한 [기본 제공 대시보드][15]가 계정에 자동으로 설치됩니다. 이 대시보드에 액세스하려면 **Dashboards** > **Dashboards List**로 이동하여 'Sensitive Data Scanner Overview'를 검색하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/data_security/pci_compliance/
[2]: /ko/security/sensitive_data_scanner/scanning_rules/library_rules/
[3]: /ko/security/sensitive_data_scanner/scanning_rules/custom_rules/
[4]: /ko/security/sensitive_data_scanner/setup/telemetry_data/
[5]: /ko/observability_pipelines/
[6]: /ko/observability_pipelines/processors/sensitive_data_scanner
[7]: /ko/observability_pipelines/configuration/set_up_pipelines/
[8]: /ko/security/cloud_security_management/setup/agentless_scanning
[9]: /ko/remote_configuration
[10]: /ko/security/sensitive_data_scanner/scanning_rules/library_rules/
[11]: /ko/security/cloud_security_management
[12]: /ko/security/sensitive_data_scanner/setup/cloud_storage/
[13]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner
[14]: /ko/security/sensitive_data_scanner/guide/investigate_sensitive_data_findings/
[15]: https://app.datadoghq.com/dash/integration/sensitive_data_scanner
[16]: /ko/security/sensitive_data_scanner/setup/telemetry_data/?tab=logs#mask-action
[17]: /ko/security/sensitive_data_scanner/scanning_rules/
[18]: https://app.datadoghq.com/sensitive-data-scanner/configuration/llm-spans
[19]: /ko/security/sensitive_data_scanner/scanning_rules/library_rules/?category=Secrets+and+credentials#overview
[20]: /ko/llm_observability/
[21]: /ko/security/code_security/secret_scanning/