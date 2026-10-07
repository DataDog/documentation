---
further_reading:
- link: /integrations/azure/
  tag: 설명서
  text: Datadog-Azure 통합
title: Azure 모니터링용 Microsoft Graph API 권한
---

Azure 앱 등록 상세 정보를 가져오려면 [Datadog-Azure 통합][1]에 [Microsoft Graph API][2] 액세스가 있어야 합니다. 이 쿼리는 테넌트 수준에서 이뤄집니다.

**참고**: Datadog의 Azure 통합 타일에 동일한 테넌트에 사용되는 앱 등록(클라이언트 ID)이 여럿 있을 경우 앱 등록 하나에만 권한이 있으면 됩니다.

## 설정

1. Azure 포털에서 **App registrations** 페이지로 이동합니다. 수정하고 싶은 앱 등록을 클릭하세요.
2. 좌측 사이드바의 _Manage_ 섹션 아래에서 **API permissions**을 클릭하세요.
3. **+ Add a permission**을 클릭하세요.
4. 패널이 열리면 **Microsoft Graph**를 선택하세요
5. 다음 페이지에서 **Application permissions**를 선택하세요. 그리고 _Select permissions_ 아래에서 다음 권한을 검색 및 활성화하세요.
   - `Application.Read.All`
   - `Directory.Read.All`
   - `Group.Read.All`
   - `Policy.Read.All`
   - `User.Read.All`

   왼쪽 체크 박스를 클릭하고 하단 **Add permissions** 버튼을 클릭해 각 권한을 추가하세요.
   {{< img src="integrations/guide/azure-graph-api-permissions/permission-select-1.png" alt="Microsoft Graph API 권한을 추가하는 패널. 'Application permissions'이 선택됨. Under the 'Select permissions' 섹션 아래 사용자가 'Application.Read.All'을 입력함. 그 아래 섹션의 'Application (1)' 아래 선택한 체크 박스 옆에 Application.Read.All 권한이 나타남.">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/azure
[2]: https://learn.microsoft.com/en-us/graph/permissions-reference