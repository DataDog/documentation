<!-- response-success: /api/latest/rendering-shapes/create-a-datadog-gcp-principal/ -->

{% tab label="200" %}
OK

{% tabs %}
{% tab label="Model" %}
Your delegate service account response data.

| Parent field | Field                  | Type   | Description                                                                                |
| ------------ | ---------------------- | ------ | ------------------------------------------------------------------------------------------ |
|              | data                   | object | Datadog principal service account info.                                                    |
| data         | attributes             | object | Your delegate account attributes.                                                          |
| attributes   | delegate_account_email | string | Your organization's Datadog principal email address.                                       |
| data         | id                     | string | The ID of the delegate service account.                                                    |
| data         | type                   | enum   | The type of account. Allowed enum values: `gcp_sts_delegate`. Default: `gcp_sts_delegate`. |
{% /tab %}

{% tab label="Example" %}
```json
{
  "data": {
    "attributes": {
      "delegate_account_email": "ddgci-1a19n28hb1a812221893@datadog-gci-sts-us5-prod.iam.gserviceaccount.com"
    },
    "id": "ddgci-1a19n28hb1a812221893@datadog-gci-sts-us5-prod.iam.gserviceaccount.com",
    "type": "gcp_sts_delegate"
  }
}
```
{% /tab %}
{% /tabs %}
{% /tab %}
