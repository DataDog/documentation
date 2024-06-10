---
title: Domain Allowlist API
kind: documentation
private: true
is_beta: true
further_reading:
- link: "https://app.datadoghq.com/organization-settings/domain-allowlist"
  tag: "In the app"
  text: "Domain Allowlist"
- link: "/account_management/org_settings/domain_allowlist"
  tag: "Documentation"
  text: "Domain Allowlist UI"
---

{{< callout url="https://google.com" >}}
  Domain Allowlist is available in <strong>private beta</strong> for customers with Enterprise plans. If you're interested in this feature, request access.
{{< /callout >}} 

[Domain Allowlist][1] enables you to restrict the email domains to which notifications can be sent. 

This document describes how to access and configure Domain Allowlist through the API. To use the UI instead, see [Domain Allowlist][1].

## Get Domain Allowlist

Return the Domain Allowlist and its enabled or disabled state.

<span style="padding:3px" class="font-semibold text-api-get bg-bg-api-get">GET</span>
https://{datadog_site}/api/v2/domain_allowlist?api_key={datadog_api_key}&application_key={datadog_application_key}

### Request

#### Example

```bash
curl -X GET "https://api.datadoghq.com/api/v2/domain_allowlist" \
-H "Accept: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

### Response

{{< tabs >}}
{{% tab "200" %}}

OK

#### Model

| Field | Type | Description |
| :----- | :---- | :----------- |
| data | object | Domain Allowlist email data |
| data.type | enum | Domain Allowlist type. Allowed enum values: `domain_allowlist`. Default: `domain_allowlist`.|
| data.attributes | object | Attributes of Domain Allowlist |
| data.attributes.enabled | Boolean | If `true`, Domain Allowlist is enabled |
| data.attributes.domains | [string] | List of domains in Domain Allowlist |

{{% /tab %}}
{{% tab "403" %}}

Forbidden

#### Model

| Field | Type | Description |
| ----- | ---- | ----------- |
| errors \[_required_\] | [string] | List of errors |

{{% /tab %}}
{{% tab "404" %}}

Not Found

#### Model

| Field | Type | Description |
| ----- | ---- | ----------- |
| errors \[_required_\] | [string] | List of errors |

{{% /tab %}}
{{% tab "429" %}}

Too many requests

#### Model

| Field | Type | Description |
| ----- | ---- | ----------- |
| errors \[_required_\] | [string] | List of errors |

{{% /tab %}}
{{< /tabs >}}

#### Example

```js
{
  "data": {
    "type": "domain_allowlist",
    "attributes": {
      "enabled": true,
      "domains": [
        "@aol.com",
        "@yahoo.com",
        "@gmail.com"
      ]
    }
  }
}
```

## Modify Domain Allowlist

Enable/disable Domain Allowlist and rewrite the entire allowlist with a given list of email domains.

<span style="padding:3px" class="font-semibold text-api-get bg-bg-api-get">PATCH</span>
https://{datadog_site}/api/v2/domain_allowlist?api_key={datadog_api_key}&application_key={datadog_application_key}

### Request

#### Example

```bash
curl -X PATCH "https://api.datadog.com/api/v2/domain_allowlist" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d @- << EOF

{
  "data": {
    "type": "domain_allowlist",
    "attributes": {
      "enabled": true,
      "domains": [
        "@datadoghq.com",
        "@yahoo.com",
        "@gmail.com"
      ]
    }
  }
}

EOF
```

### Response

{{< tabs >}}
{{% tab "200" %}}

OK

#### Model

| Field | Type | Description |
| :----- | :---- | :----------- |
| data | object | Domain Allowlist email data |
| data.type | enum | Domain Allowlist type. Allowed enum values: `domain_allowlist`. Default: `domain_allowlist`.|
| data.attributes | object | Attributes of Domain Allowlist |
| data.attributes.enabled | Boolean | If `true`, Domain Allowlist is enabled |
| data.attributes.domains | [string] | List of domains in Domain Allowlist |

{{% /tab %}}
{{% tab "403" %}}

Forbidden

#### Model

| Field | Type | Description |
| ----- | ---- | ----------- |
| errors \[_required_\] | [string] | List of errors |

{{% /tab %}}
{{% tab "404" %}}

Not Found

#### Model

| Field | Type | Description |
| ----- | ---- | ----------- |
| errors \[_required_\] | [string] | List of errors |

{{% /tab %}}
{{% tab "429" %}}

Too many requests

#### Model

| Field | Type | Description |
| ----- | ---- | ----------- |
| errors \[_required_\] | [string] | List of errors |

{{% /tab %}}
{{< /tabs >}}

#### Example

```js
{
  "data": {
    "type": "domain_allowlist",
    "attributes": {
      "enabled": true,
      "domains": [
        "@datadoghq.com",
        "@yahoo.com",
        "@gmail.com"
      ]
    }
  }
}
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/org_settings/domain_allowlist