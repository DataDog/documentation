---
further_reading:
- link: /logs/explorer/
  tag: 설명서
  text: 로그 탐색 방법 알아보기
kind: 설명서
title: Azure 로그를 Datadog 리소스로 전송
---

{{< site-region region="us3" >}}

## 개요

이 가이드를 사용해 [Azure의 Datadog 리소스]를 통해 Azure 구독에서 Datadog로 바로 로그를 관리할 수 있습니다. Azure 로그 세 가지 종류를 수집하고 관리할 수 있습니다. 아래 섹션에서 자세한 내용을 살펴보세요.

   - [활동 로그](#activity-logs)
   - [Azure 리소스 로그](#azure-resource-logs)
   - [Azure Active Directory(Azure AD) 로그](#azure-active-directory-azure-ad-logs)

**참고**: Datadog US 3 사이트에 있는 Datadog 조직에서만 Azure의 Datadog 리소스를 사용할 수 있습니다. 다른 [Datadog 사이트][5]를 이용하는 경우 [Azure 로그를 Datadog로 전송][6] 가이드에 안내된 구성 옵션을 참고하세요.

## 활동 로그

[컨트롤 플레인][1에서 리소스 작업에 관한 인사이트를 얻을 수 있습니다. 서비스 상태 이벤트 업데이트도 포함되어 있습니다. 활동 로그로 쓰기 작업(`PUT`, `POST`, `DELETE`)의 대상, 사용자, 시기를 결정할 수 있습니다.

활동 로그를 Datadog으로 전송하려면 **구독 활동 로그 전송하기**를 선택하세요. 이 옵션을 선택해야 활동 로그가 Datadog로 전송됩니다.

## Azure 리소스 로그

[데이터 플레인][1]을 통해 Azure 리소스 로그에서 운영 인사이트를 얻을 수 있습니다. 예를 들어 데이터 플레인을 사용해 키 볼트에서 비밀을 가져오거나 데이터베이스에 요청을 보낼 수 있습니다. 리소스 로그의 내용은 Azure 서비스 및 리소스 유형에 따라 달라집니다.

Azure 리소스 로그를 Datadog으로 전송하려면  **Send Azure resource logs for all defined resources**를 선택하세요. [Azure 모니터링 리소스 로그 카테고리][2]에서 Azure 리소스 로그 유형의 전체 목록을 볼 수 있습니다. 이 옵션을 선택하면 연결된 구독에서 생성한 신규 리소스 전체를 포함해 모든 리소스 로그를 Datadog으로 전송합니다.

옵션으로 Azure 리소스 태그를 사용하여 Datadog으로 로그를 전송하는 Azure 리소스 세트를 필터링할 수 있습니다.

### 로그 전송 태그 규칙

- `include` 태그로 Datadog에 로그를 전송하는 Azure 리소스입니다.
- `include` 태그로 Datadog에 로그를 전송하지 않는 Azure 리소스입니다.
- 포함 규칙과 제외 규칙이 충돌하는 경우 제외 규칙이 우선 적용됩니다.

예를 들어, 아래 스크린샷은 Datadog로 메트릭을 전송하는 가상 머신, 가상 머신 스케일 세트, `Datadog = True`로 태그된 앱 서비스 플랜만을 보여줍니다.

{{< img src="integrations/azure/azure-us3-create-dd-resource3.png" alt="Azure US3에서 Datadog 리소스 로그 생성" responsive="true" style="width:90%;">}}

## Azure Active Directory(Azure AD) 로그

Azure AD 로그에는 로그인 활동과 특정 테넌트용으로 Azure AD에 적용한 변경 사항의 감사 트레일 내역이 포함되어 있습니다. 이 로그를 Datdog로 보내려면 먼저 Datadog 리소스 생성 절차를 완료해야 합니다. Azure에 Datadog 리소스가 생기면 [Azure Portal 내 Datadog][3] 가이드에 안내된 설정 단계를 따르세요.

[1]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/control-plane-and-data-plane
[2]: https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/resource-logs-categories
[3]: https://docs.datadoghq.com/ko/integrations/guide/azure-portal/#azure-active-directory-logs
[4]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Datadog%2Fmonitors
[5]: /ko/getting_started/site/
[6]: /ko/logs/guide/azure-logging-guide
[7]: https://learn.microsoft.com/en-us/azure/partner-solutions/datadog/
{{< /site-region >}}

{{< site-region region="us,eu,us5,gov,ap1" >}}

<div class="alert alert-info">Datadog US3 사이트를 이용하는 조직에서만 Azure의 Datadog 리소스를 사용할 수 있습니다. 다른 Datadog 사이트를 이용하는 경우 <a href="https://docs.datadoghq.com/logs/guide/azure-logging-guide/" target="_blank">Azure 로그를 Datadog로 전송</a>가이드에 안내된 구성 옵션을 참고하세요. Datadog US 3 사이트를 이용하는 경우에는 이 페이지 우측에 있는 <a href="?site=us3" target="_blank">사이트 선택기</a>를 변경하세요.</div>

{{< /site-region >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}