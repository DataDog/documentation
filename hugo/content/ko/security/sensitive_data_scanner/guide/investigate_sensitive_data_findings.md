---
aliases:
- /ko/sensitive_data_scanner/investigate_sensitive_data_issues/
- /ko/sensitive_data_scanner/guide/investigate_sensitive_data_issues/
- /ko/security/sensitive_data_scanner/guide/investigate_sensitive_data_issues/
description: Findings 페이지에서 Sensitive Data Scanner 발견 결과를 분류하고 조사하세요. 여기에는 Blast Radius
  분석, 영향을 받는 서비스, Case Management 및 Incident Management 통합이 포함됩니다.
further_reading:
- link: sensitive_data_scanner/setup/telemetry_data/
  tag: 설명서
  text: 텔레메트리 데이터를 위한 Sensitive Data Scanner 설정하기
- link: sensitive_data_scanner/setup/cloud_storage/
  tag: 설명서
  text: 클라우드 스토리지를 위한 Sensitive Data Scanner 설정하기
- link: https://www.datadoghq.com/blog/scaling-sensitive-data-scanner/
  tag: 블로그
  text: Sensitive Data Scanner를 사용하여 대규모로 민감 데이터 문제를 식별, 분류 및 해결하기
title: 민감 데이터 발견 결과 조사
---
## 개요 {#overview}

Datadog의 Sensitive Data Scanner는 민감 데이터를 식별, 분류하고 필요시 비식별화하여 민감 데이터 유출을 방지하고 비준수 위험을 줄이는 데 도움을 줄 수 있습니다. 민감 데이터가 발견되면 다음과 같은 질문이 생길 수 있습니다.

- 어떤 민감 데이터가 노출되었나요?
- 민감 데이터 노출의 우선순위는 무엇인가요?
- 확산 및 볼륨 측면에서 발견 결과가 얼마나 심각한가요?
- 민감 데이터의 출처는 어디인가요?

Sensitive Data Scanner의 [Findings][1] 페이지에서는 민감 데이터 발견 결과를 분류하고 우선순위를 지정하므로 이를 조사, 협업, 문서화하고 해당 질문에 대한 답을 찾을 수 있습니다.

{{< img src="sensitive_data_scanner/sds_findings_explorer.png" alt="US Passport Scanner 규칙이 확장되어 중요 발견 결과, 일치 항목 수 및 주간 추세 차트를 보여주는 규칙별 Sensitive Data Scanner Findings 탐색기" style="width:100%;" >}}

## 민감 데이터 발견 결과 분류 {#triage-sensitive-data-findings}

[Findings][1] 페이지로 이동하여 선택한 기간 내의 모든 민감 데이터 발견 결과를 확인하고 조사를 시작하세요.

{{< tabs >}}
{{% tab "로그" %}}

Logs Findings 탐색기는 로그 발견 결과를 조사하는 데 사용되는 업데이트된 탐색기입니다. 로그 발견 결과가 하나 이상 있는 경우 이 탐색기가 기본적으로 열립니다. APM, RUM 및 이벤트 발견 결과는 이 탐색기에서 사용할 수 없습니다. 해당 발견 결과를 조회하려면 페이지 상단 배너에서 {{< ui >}}Go back{{< /ui >}}을 클릭하세요.

로그 발견 결과를 조사하려면 다음 단계를 따르세요.

1. {{< ui >}}Group by{{< /ui >}}를 사용하여 발견 결과를 {{< ui >}}Rule{{< /ui >}}, {{< ui >}}Logs Pattern{{< /ui >}} 또는 {{< ui >}}Service{{< /ui >}}별로 구성합니다. 민감 데이터가 현재 노출되고 있는 발견 결과를 표시하려면 {{< ui >}}Match State{{< /ui >}} 패싯에서 {{< ui >}}Leaking{{< /ui >}}으로 필터링하세요.
2. 발견 결과를 클릭하여 세부 정보 패널을 엽니다.
3. 패널 상단에서 {{< ui >}}First Detected{{< /ui >}} 및 {{< ui >}}Last Detected{{< /ui >}}를 확인하여 노출이 활성화된 기간을 파악합니다.
4. 요약 섹션에서 {{< ui >}}Match State{{< /ui >}}, {{< ui >}}Service{{< /ui >}}, {{< ui >}}Environment{{< /ui >}} 및 {{< ui >}}Total matches{{< /ui >}}를 검토하여 노출 범위를 파악합니다.
5. {{< ui >}}Logs Pattern{{< /ui >}}을 검토하여 민감 데이터가 탐지된 로그 라인의 형식을 파악합니다.
6. {{< ui >}}Example Logs{{< /ui >}} 섹션에서 영향을 받는 로그의 대표적인 예시를 최대 5개까지 검토합니다. 예시 로그가 만료되면 다음 일치하는 이벤트로 대체됩니다. {{< ui >}}Show log{{< /ui >}}를 클릭하여 예시를 확장하고 로그 메시지, 필드 및 속성을 인라인으로 검사하세요. 기본적으로 예시 로그는 7일 동안 저장되며 Data Scanner Read 권한이 있는 모든 사용자가 액세스할 수 있습니다. 이러한 대표 로그를 다른 기간 동안 저장하려면 [지원팀][1]에 문의하세요.
7. {{< ui >}}Matches Trend{{< /ui >}}를 검토하여 지난 1주일 동안 일치 항목 볼륨이 어떻게 변화했는지 확인합니다. {{< ui >}}Related Access and Configuration Events{{< /ui >}}를 사용하여 최근 액세스 이벤트나 스캔 그룹 또는 스캔 규칙의 변경 사항이 일치 항목 볼륨의 변화와 일치하는지 확인합니다.

또한 다음을 수행할 수 있습니다.
- {{< ui >}}Apply Targeted Obfuscation{{< /ui >}}을 사용하여 이 발견 결과에 대한 새 로그에서 향후 민감 데이터 일치 항목을 난독화하거나 난독화 적용 범위를 전체 서비스로 확장하세요. 비식별화가 이미 활성화된 경우, 이 섹션에서 일치하는 로그가 어떻게 난독화되는지 확인하세요.
- {{< ui >}}Tune Detection Logic{{< /ui >}}을 사용하여 스캔 규칙의 키워드를 편집하거나 오탐 또는 위험이 허용된 데이터를 억제하세요.
- {{< ui >}}Generate Code Fix{{< /ui >}}를 사용하여 유출을 유발하는 로그 패턴을 식별하고 수정 사항을 제안하는 [Bits Code][2] 세션을 시작하세요. 수정 사항을 검토하고 세션에서 직접 풀 리퀘스트를 생성하세요. 소스 리포지토리는 이미 Bits Code에 온보딩되어 있어야 합니다.

[1]: /ko/help
[2]: /ko/bits_ai/bits_code/

{{% /tab %}}
{{% tab "APM, RUM 및 이벤트" %}}

{{< ui >}}Sensitive Data Rule Findings{{< /ui >}} 탭에서 우선순위 상태, 케이스 상태 및 도메인별로 민감 데이터 발견 결과를 필터링할 수 있습니다.

결과를 조사하려면 다음 단계를 따르세요.

1. 목록에서 해당 발견 결과를 클릭합니다.
2. 발견 결과 패널에서 {{< ui >}}View Recent Changes{{< /ui >}}를 클릭하여 [Audit Trail][3]로 이동한 후 민감 데이터 발견 결과의 원인이 된 최근 구성 변경 사항이 있는지 확인합니다.
3. 다음 옵션을 사용하여 쿼리와 일치하는 다양한 유형의 데이터를 탐색합니다.
   1. Log Explorer에서 쿼리와 관련된 모든 로그를 조회하려면 {{< ui >}}View All Logs{{< /ui >}}를 클릭하세요.
   1. Trace Explorer에서 쿼리와 일치하는 모든 트레이스를 조회하려면 {{< ui >}}View All APM Spans{{< /ui >}}를 클릭하세요.
   1. 쿼리와 일치하는 모든 RUM 이벤트를 조회하려면 {{< ui >}}View All RUM Events{{< /ui >}}를 클릭하세요.
   1. 쿼리와 일치하는 모든 이벤트를 조회하려면 {{< ui >}}View All Events{{< /ui >}}를 클릭하세요.
  {{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/findings_panel_20251015.png" alt="심각한 Visa 카드 스캐너 발견 결과가 표시된 발견 결과 패널" style="width:50%;">}}
4. {{< ui >}}Blast Radius{{< /ui >}} 섹션에서 다음을 수행합니다.
   1. 이 민감 데이터 발견 결과로 인해 영향을 받은 상위 10개 서비스, 호스트, 환경을 조회합니다.
   1. 서비스를 클릭하여 {{< ui >}}Catalog{{< /ui >}}에서 해당 서비스에 대한 자세한 정보를 확인합니다.
   1. 호스트를 클릭하여 Infrastructure List 페이지에서 해당 호스트에 대한 자세한 정보를 확인합니다.
  {{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/blast_radius_02_01_2024.png" alt="영향을 받은 상위 10개 서비스가 표시된 발견 결과 패널" style="width:50%;">}}

   민감 데이터 발견 결과를 탐지하는 데 사용된 스캔 규칙을 수정하려면 패널 상단의 {{< ui >}}Modify Rule{{< /ui >}}을 클릭하세요.

또한 다음을 수행할 수 있습니다.
- [Case Management][1]를 사용하여 발견 결과를 추적, 분류 및 조사하려면 패널 상단의 {{< ui >}}Create Case{{< /ui >}}를 클릭하세요. 관련 케이스는 Findings 페이지에 표시됩니다.
- [Incident Management][2]를 사용하여 인시던트를 생성하고, 발견 결과를 기존 인시던트에 추가하거나 새 인시던트를 선언할 수 있습니다. {{< ui >}}Declare Incident{{< /ui >}} 드롭다운 메뉴를 클릭하여 발견 결과를 기존 인시던트에 추가하세요. {{< ui >}}Declare Incident{{< /ui >}}을 클릭하여 새 인시던트를 선언하세요.
- [Audit Trail][3]을 사용하여 Datadog 내에서 이 민감 데이터에 액세스했을 수 있는 사용자를 확인하려면 {{< ui >}}Users who accessed these events{{< /ui >}} 섹션에서 {{< ui >}}View in Audit Trail{{< /ui >}}을 클릭하세요.

{{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/case_mgmt_02_01_2024.png" alt="보안 발견 결과, 담당자, 케이스 생성자 및 이벤트 타임라인에 대한 정보가 표시되는 케이스 페이지" style="width:60%;">}}

[1]: /ko/incident_response/work_management/
[2]: /ko/incident_response/incident_management/
[3]: /ko/account_management/audit_trail

{{% /tab %}}
{{% tab "Cloud Storage" %}}

{{< ui >}}Datastores with Sensitive Data{{< /ui >}} 탭을 클릭하여 Cloud Storage에 대한 모든 민감 데이터 발견 결과를 확인합니다.

데이터스토어를 조사하려면 다음 단계를 따르세요.

1. 데이터스토어를 클릭합니다.
1. 민감 데이터가 발견된 파일을 조회한 후 파일을 클릭하여 AWS에서 검사할 수 있습니다.
  Datadog은 다음을 수행할 것을 권장합니다.
    - 몇 개의 파일을 검토하여 분류 정확도를 파악하세요.
    - 사이드 패널에 나열된 팀 또는 서비스 소유자에게 문의하여 민감 데이터가 해당 버킷에 포함되어야 하는 데이터인지 확인하세요.
      - 버킷에 포함되어서는 안 되는 경우 파일을 삭제하거나 적절한 버킷으로 이동하세요.
      - 버킷에 있어야 하는 경우 다음 단계를 완료하여 보안 상태를 개선하세요.
        1. 사이드 패널에서 {{< ui >}}Security{{< /ui >}} 탭을 클릭하고 {{< ui >}}Misconfigurations{{< /ui >}} 섹션을 검토합니다.
        1. 잘못된 구성을 클릭하여 Cloud Security에서 세부 정보를 확인합니다.
        1. {{< ui >}}Next Steps{{< /ui >}} 섹션에서 다음을 수행합니다.
            1. {{< ui >}}Triage{{< /ui >}} 아래에서 드롭다운을 클릭하여 신호의 분류 상태를 변경합니다. 기본 상태는 `OPEN`입니다.
            1. {{< ui >}}Assign Signal{{< /ui >}}을 클릭하여 본인 또는 다른 Datadog 사용자에게 신호를 할당합니다.
            1. {{< ui >}}See remediation{{< /ui >}}을 클릭하여 해당 발견 결과를 해결하는 방법에 대한 자세한 정보를 확인합니다.
            1. {{< ui >}}More Actions{{< /ui >}} 아래에서 Jira 이슈를 추가하거나, 워크플로를 실행하거나, 댓글을 추가할 수 있습니다.
        워크플로를 실행하려면 {{< ui >}}Run Workflow{{< /ui >}}를 선택한 다음, 워크플로 브라우저에서 실행할 워크플로를 검색하여 선택하세요. 자세한 내용은 [Workflow Automation을 사용하여 보안 워크플로 자동화][1]를 참조하세요.
          1. 각 탭을 클릭하여 심각도 분포, 관련 로그 및 해당 발견 결과의 타임라인을 확인합니다.

        {{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/datastore_side_panel.png" alt="\"S3 버킷에 Block Public Access가 활성화되어야 함\" 잘못된 구성이 표시된 데이터스토어 발견 결과 사이드 패널" style="width:90%;">}}

[1]: /ko/security/cloud_security_management/review_remediate/workflows/

{{% /tab %}}
{{< /tabs >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/sensitive-data-scanner/telemetry