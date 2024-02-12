---
description: 신서틱(Synthetic) 테스트에 대해 자세히 알아보려면 즉시 사용 가능한 신서틱(Synthetic) 대시보드를 탐색합니다.
further_reading:
- link: /synthetics/
  tag: 설명서
  text: 신서틱(Synthetic) 모니터링에 대해 알아보기
- link: /continuous_testing/explorer/
  tag: 설명서
  text: 신서틱(Synthetic) 모니터링 및 연속 테스트 탐색기에 대해 알아보기
- link: /continuous_testing/explorer/saved_views
  tag: 설명서
  text: 저장된 보기에 대해 알아보기
kind: 설명서
title: 신서틱(Synthetic) 대시보드
---

## 개요

신서틱(Synthetic) 테스트를 생성하면, Datadog은 [데이터를 수집][1]하고 스택, 브라우저 애플리케이션 또는 전체 테스트의 성능, 비공개 위치, 이벤트에 관한 대시보드를 생성합니다. 

[**대시보드 목록**][2]의 검색 쿼리에서 `Synthetics`로 필터링하거나 [신서틱(Synthetic) 모니터링 및 지속적 테스트 페이지][4]의 [**대시보드**][3] 하단 드롭다운 메뉴를 눌러 신서틱(Synthetic) 대시보드에 액세스합니다.

{{< img src="synthetics/dashboards/dashboards_homepage_blurred.png" alt="신서틱 모니터링 및 지속적 테스트 홈페이지의 신서틱 모니터링 대시보드" style="width:100%;">}}

{{< whatsnext desc="하단의 즉시 사용 가능한 신서틱 대시보드를 살펴보세요:" >}}
  {{< nextlink href="/synthetics/dashboards/api_test" >}}<u>API 테스트 성능: 엔드포인트와 서비스를 모니터링합니다.{{< /nextlink >}}
  {{< nextlink href="/synthetics/dashboards/browser_test" >}}<u>브라우저 테스트 성능</u>: 브라우저 테스트의 웹 성능, 타 공급자의 통찰, 핵심 웹 바이탈을 확인합니다.{{< /nextlink >}}
  {{< nextlink href="/synthetics/dashboards/test_summary" >}}<u>테스트 개요</u>: 지역, 환경, 또는 팀별 신서틱 테스트에 대한 통찰을 살펴봅니다.{{< /nextlink >}}
{{< /whatsnext >}}

## 신서틱(Synthetic) 대시보드 커스터마이징

[대시보드][5]를 복제하고 템플릿 변수를 사용하여 팀, 환경 또는 지역별로 커스터마이징할 수 있습니다. 보기를 커스터마이징하고 복제한 대시보드 의 [저장된 보기][6]를 생성할 수도 있습니다.

### 템플릿 변수 수정

생성한 신서틱(Synthetic) 대시보드에는 기본 템플릿 변수 집합이 자동 포함됩니다. 템플릿 변수 드롭다운 메뉴를 활용하여 대시보드에 표시되는 데이터의 범위를 좁힐 수 있습니다. 예를 들어, `Browser` 템플릿 변수로 특정 브라우저 유형을 필터링할 수 있습니다. 자세한 내용을 확인하려면 [템플릿 변수][7] 문서를 참조하세요. 신서틱(Synthetic) 대시보드를 복제하려면 **설정** 아이콘 옆의 **복제** 버튼을 누릅니다. 

{{< img src="synthetics/dashboards/clone.png" alt="대시보드 복제" style="width:100%;">}}

신서틱(Synthetic) 대시보드에는 조정 가능한 기본 보기가 있습니다. **편집** 아이콘을 눌러 편집 모드에서 템플릿 변수를 커스터마이징합니다.

{{< img src="synthetics/dashboards/synthetics_template_variable_edit.png" alt="신서틱 대시보드의 템플릿 변수 수정" style="width:100%;">}}

### 저장된 페이지 생성

편집이 끝나면 **완료**를 누른 후 왼쪽 드롭다운 메뉴에서 **선택 항목을 보기로 저장**을 선택합니다.

{{< img src="synthetics/dashboards/saved_view.png" alt="신서틱 대시보드에서 저장된 보기 생성하기" style="width:60%;">}}

저장한 보기의 이름을 입력하고 **저장**을 누릅니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/metrics/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: https://app.datadoghq.com/synthetics/tests/
[4]: https://app.datadoghq.com/synthetics/tests
[5]: /ko/dashboards/
[6]: /ko/continuous_testing/explorer/saved_views/
[7]: /ko/dashboards/template_variables/