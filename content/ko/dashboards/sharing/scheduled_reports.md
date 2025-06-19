---
aliases:
- /ko/dashboards/reporting/
- /ko/dashboards/scheduled_reports/
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/dashboard-sharing/
  tag: 블로그
  text: 모든 이와 안전하게 Datadog 대시보드 공유하기
- link: https://www.datadoghq.com/blog/template-variable-associated-values/
  tag: 블로그
  text: 관련된 템플릿 변수를 사용해 대시보드 정리하기
title: 예약 보고서
---

## 개요

예약 보고서를 사용하면 Datadog 사용자가 이메일을 사용해 고밀도 PDF로 대시보드를 반복해서 공유할 수 있습니다.

{{< img src="dashboards/scheduled_reports/report_email.png" alt="PDF 첨부 파일을 포함한 보고서 이메일 예시" style="width:90%;" >}}

보고서 PDF는 크기에 따라 이메일 첨부 파일 또는 링크로 제공됩니다.

{{< img src="dashboards/scheduled_reports/report_pdf.png" alt="보고서 PDF 첨부 파일 예시" style="width:90%;" >}}

## 리포트 스케줄링

하나 이상의 [지원되는 위젯]((#unsupported-widget-types)이 있는 [대시보드 또는 타임보드][1]에서 보고서를 작성합니다.

대시보드 상단의 **공유** 버튼을 클릭하고 **보고서 예약**을 선택합니다.

{{< img src="dashboards/scheduled_reports/report_configuration_modal.png" alt="일정 설정, 수신자 추가 및 이메일 커스터마이즈를 위한 섹션을 포함하는 개별 대시보드 보고서에 대한 설정 모달입니다. 모달 하단에는 템플릿 변수를 편집하고 보고서를 삭제하고 미리 보기를 전송하고 취소 및 저장할 수 있는 버튼이 있습니다." style="width:90%;" >}}

### 스케줄 설정

열리는 설정 모들에서 리포트 스케줄을 설정하여 리포트 전송 시점과 빈도를 결정합니다. 결과 리포트에 표시되는 시간 범위를 결정하는 시간 프레임을 설정합니다. 리포트 기간은 대시보드에 표시된 기간과 다를 수 있습니다.

### 수취인 추가

이메일 주소를 입력하여 보고서에 수신자를 추가합니다. Datadog 계정과 연결된 이메일은 자동으로 수신자에 추가됩니다. 이메일 위를 마우스로 가리키고 옆에 표시되는 **X** 를 클릭하여 수신자에서 자신을 제거할 수 있습니다.

**참고: Enterprise 및 Pro 계정은 조직 외부의 수신자에게 보고서를 전송할 수 있습니다.

### 리포트 커스텀

마지막으로 보고서를 커스터마이즈하여 수신자에게 더 많은 컨텍스트 또는 맞춤화된 보기를 제공합니다. 선택적 설명은 보고서 이메일 본문에 포함되어 있습니다.

보고서가 전송되면 **템플릿 변수 편집**을 클릭하여 필터를 수정합니다. 이러한 값은 대시보드 기본 템플릿 변수 값에 영향을 미치지 않습니다.

스케줄을 저장하기 전에 리포트를 보려면 **Send Preview**를 클릭합니다. 리포트 스케줄은 언제든지 일시 정지할 수 있습니다.

## 리포트 관리하기
단일 대시보드는 서로 다른 설정의 다양한 예약 보고서를 포함할 수 있습니다. 이를 통해 동일한 대시보드에 관심 있는 다양한 이해관계자 그룹에 알릴 수 있습니다. 기존 대시보드에 대한 보고서를 보려면 **공유** 버튼을 클릭하고 **보고서 설정**을 선택합니다.

열리는 설정 모들에서 기존 리포트를 일시 정지하거나 새 리포트를 생성할 수 있습니다. 기존 보고서의 상세 정보를 보고 수정하거나 리포트를 삭제하려면 **Edit**를 클릭하세요.

{{< img src="dashboards/scheduled_reports/scheduled_reports_configuration_modal.png" alt="예약된 보고서를 위한 설정 모달입니다. 표시된 두 보고서가 있으며 각각은 제목, 태그, 수신자, 빈도, 보고서를 켜고 끌 수 있는 토글 옵션, 보고서 편집 버튼을 포함합니다. 하단에는 새로운 보고서를 추가할 수 있는 버튼과 완료 버튼이 있습니다." style="width:90%;" >}}

## 권한

사용자가 보고서 일정을 생성하고 편집하려면 **대시보드 보고서 쓰기** [권한][2]이 필요합니다.
이 권한은 **사용자 액세스 관리** 권한을 가진 다른 사용자가 부여할 수 있습니다.

{{< img src="dashboards/scheduled_reports/permissions.png" alt="조직 설정 페이지 내의 개별 사용자 권한에 대한 스크린샷입니다. 대시보드 보고서 쓰기 권한은 대시보드 섹션에서 강조 표시됩니다." style="width:90%;" >}}

**조직 관리** 권한을 가진 사용자는 **조직 설정**의 [공개 공유][3]에 있는 **설정** 탭 에서 조직에 대한 예약 보고서 기능을 사용하거나 사용하지 않도록 설정할 수 있습니다.

{{< img src="dashboards/scheduled_reports/org_preference.png" alt="Datadog 조직 설정 내 공개 공유의 설정 탭에서 보고서 관리 설정과 활성화된 설정" style="width:90%;" >}}

## 지원되지 않는 위젯 유형

다음 위젯 유형은 지원되지 **않으며** 보고서에서 비어 있는 것으로 표시됩니다.
- [Iframe][4]
- [이미지][5]
- [호스트맵][6]
- [워크플로 실행][7]

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/dashboards/#get-started
[2]: /ko/account_management/rbac/permissions/
[3]: /ko/account_management/org_settings/#public-sharing
[4]: /ko/dashboards/widgets/iframe/
[5]: /ko/dashboards/widgets/image/
[6]: /ko/dashboards/widgets/hostmap/
[7]: /ko/dashboards/widgets/run_workflow/
