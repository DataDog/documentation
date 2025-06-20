---
title: 조직 간 연결 API
---

{{< callout url="#" btn_hidden="true">}}
  조직 간 가시성 기능은 베타 서비스 중입니다.
{{< /callout >}} 

[조직 간 가시성][1]을 이용하면 고객이 같은 계정으로 여러 조직 간에 데이터를 공유할 수 있고 한 곳에서 여러 조직의 인사이트를 표시할 수 있습니다.

이 설명서에서는 API를 통해 조직 간 연결을 구성하는 방법을 설명합니다. UI를 통해 연결을 구성하려면 [조직 간 가시성][1]을 참고하세요.

## API 엔드포인트

공용 API `/api/v2/org_connections` 엔드포인트를 통해 연결을 구성합니다. 엔드포인트 인증을 위해 사용하는 애플리케이션 키에 [`org_management`][2] 권한이 있어야 합니다.

## 연결 목록

소스 조직이든 대상 조직이든, 해당 조직이 참여하는 모든 연결의 목록을 만듭니다. 이 연결 목록을 만드려면 _Org Connections Read_ 권한이 필요합니다.

<span style="padding:3px" class="font-semibold text-api-get bg-bg-api-get">GET</span>
https://{datadog_site}/api/v2/org_connections?api_key={datadog_api_key}&application_key={datadog_application_key}

## 연결 생성

해당 조직에서 대상 조직으로 연결을 생성합니다. 소스 조직이 될 조직에서 이 작업을 실행해야 합니다. 연결을 생성하려면 _Org Connections Write_ 권한이 필요합니다.

<span style="padding:3px" class="font-semibold text-api-post bg-bg-api-post">POST</span> https://{datadog_site}/api/v2/org_connections?api_key={datadog_api_key}&application_key={datadog_application_key}

**참고:** 이 호출의 페이로드에 대상 조직 UUID가 필요합니다. "List your managed organizations" [엔드포인트][3]에서 대상 조직의 UUID를 얻을 수 있습니다.

### 헤더

Content-Type: application/json

### 페이로드

{{< code-block lang="json" collapsible="true" >}}
{
    "data": {
        "type": "org_connection",
        "relationships": {
            "sink_org": {
                "data": {
                    "type": "orgs",
                    "id": "{{the destination organization UUID}}"
                }
            }
        }
    }
}
{{< /code-block >}}

### 실패 시나리오

- 연결이 이미 존재함
- 연결이 계정 외부에 있는 대상 조직 ID를 참조함 

## 연결 삭제

연결을 삭제합니다. 소스 조직이나 대상 조직에서 이 작업을 할 수 있습니다. 연결을 참조해 ID로 삭제하세요. [연결 목록](#list-connections) 요청에서 해당 정보를 얻을 수 있습니다. 연결을 삭제하려면 _Org Connections Write_ 권한이 필요합니다.

<span style="padding:3px" class="font-semibold text-api-delete bg-bg-api-delete">DELETE</span> https://{datadog_site}/api/v2/org_connections/{connection_id}?api_key={datadog_api_key}&application_key={datadog_application_key}

### 실패 시나리오

- 조직이 소스 또는 대상으로 연결에 참여하지 않음
- 연결이 존재하지 않음

[1]: /ko/account_management/org_settings/cross_org_visibility
[2]: /ko/account_management/rbac/permissions/#access-management
[3]: /ko/api/latest/organizations/#list-your-managed-organizations