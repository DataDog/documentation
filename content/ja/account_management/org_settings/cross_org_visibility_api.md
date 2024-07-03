---
is_beta: true
private: true
title: Cross-Organization Connections API
---

{{< callout url="#" header="false" btn_hidden="true">}}
  Cross-organization visibility is in <strong>private beta</strong> for customers with Enterprise plans. If you're interested in the feature, reach out to your Technical Account Manager or Customer Success Manager.
{{< /callout >}} 

[Cross-organization visibility][1] allows customers to share data between different organizations in the same account, and show insights from multiple organizations in one place.

This document describes how to configure cross-organization connections through the API. To configure connections through the UI, see [cross-organization visibility][1].

## API endpoint

Configure connections through the public API `/api/v2/org_connections` endpoint. The application key you use to authenticate to the endpoint must have the [`org_management`][2] permission.

## List connections

List all the connections this organization participates in, either as a source organization or as a destination organization.

<span style="padding:3px" class="font-semibold text-api-get bg-bg-api-get">GET</span>
https://{datadog_site}/api/v2/org_connections?api_key={datadog_api_key}&application_key={datadog_application_key}

## 接続の作成

Creates a connection from this organization to the destination organization. You must perform this operation in the to-be-source organization.

<span style="padding:3px" class="font-semibold text-api-post bg-bg-api-post">POST</span> https://{datadog_site}/api/v2/org_connections?api_key={datadog_api_key}&application_key={datadog_application_key}

**Note:** The payload of this call requires the destination organization UUID. Get the destination organization's UUID from the "List your managed organizations" [endpoint][3].

### ヘッダー

Content-Type: application/json

### ペイロード

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

### 失敗のシナリオ

- 接続がすでに存在する
- The connection refers to a destination organization ID outside of the account

## 接続の削除

Deletes a connection. Perform this operation either from the source organization or the destination organization. Reference the connection to delete with its ID, which you can get from the [List connections](#list-connections) request.

<span style="padding:3px" class="font-semibold text-api-delete bg-bg-api-delete">DELETE</span> https://{datadog_site}/api/v2/org_connections/{connection_id}?api_key={datadog_api_key}&application_key={datadog_application_key}

### 失敗のシナリオ

- The organization does not participate as a source or a destination to the connection
- The connection does not exist

[1]: /ja/account_management/org_settings/cross_org_visibility
[2]: /ja/account_management/rbac/permissions/#access-management
[3]: /ja/api/latest/organizations/#list-your-managed-organizations