---
title: List all AWS integrations
description: Get a list of AWS Account Integration Configs.
breadcrumbs: Docs > API > List all AWS integrations
---

> For the complete documentation index, see [llms.txt](https://docs.datadoghq.com/llms.txt).

# List all AWS integrations

## v2 (latest)

Get a list of AWS Account Integration Configs.

| Datadog site      | API endpoint                                                          |
| ----------------- | --------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/integration/aws/accounts     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/integration/aws/accounts |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/integration/aws/accounts |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/integration/aws/accounts      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/integration/aws/accounts |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/integration/aws/accounts |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/integration/aws/accounts      |

This endpoint requires the `aws_configuration_read` permission.

### Arguments

#### Query Strings

| Parent field | Field          | Type   | Description                                                                                                  |
| ------------ | -------------- | ------ | ------------------------------------------------------------------------------------------------------------ |
|              | aws_account_id | string | Optional query parameter to filter accounts by AWS Account ID.
  If not provided, all accounts are returned. |

### Response

{% tabs %}
{% tab label="200" %}
AWS Accounts List object

{% tabs %}
{% tab label="Model" %}
AWS Accounts response body.

| Parent field      | Field                                        | Type      | Description                                                                                                                                                                                                                                                                       |
| ----------------- | -------------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                   | data [*required*]                            | [object]  | List of AWS Account Integration Configs.                                                                                                                                                                                                                                          |
| data              | attributes                                   | object    | AWS Account response attributes.                                                                                                                                                                                                                                                  |
| attributes        | account_tags                                 | [string]  | Tags to apply to all hosts and metrics reporting for this account. Defaults to `[]`.                                                                                                                                                                                              |
| attributes        | auth_config                                  | <oneOf>   | AWS Authentication config.                                                                                                                                                                                                                                                        |
| auth_config       | Object 1                                     | object    | AWS Authentication config to integrate your account using an access key pair.                                                                                                                                                                                                     |
| Object 1          | access_key_id [*required*]                   | string    | AWS Access Key ID.                                                                                                                                                                                                                                                                |
| Object 1          | secret_access_key                            | string    | AWS Secret Access Key.                                                                                                                                                                                                                                                            |
| auth_config       | Object 2                                     | object    | AWS Authentication config to integrate your account using an IAM role.                                                                                                                                                                                                            |
| Object 2          | external_id                                  | string    | AWS IAM External ID for associated role.                                                                                                                                                                                                                                          |
| Object 2          | role_name [*required*]                       | string    | AWS IAM Role name.                                                                                                                                                                                                                                                                |
| attributes        | aws_account_id [*required*]                  | string    | AWS Account ID.                                                                                                                                                                                                                                                                   |
| attributes        | aws_partition                                | enum      | AWS partition your AWS account is scoped to. Defaults to `aws`.
  See [Partitions](https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/partitions.html)
  in the AWS documentation for more information. Allowed values: `aws`, `aws-cn`, `aws-us-gov`. |
| attributes        | aws_regions                                  | <oneOf>   | AWS Regions to collect data from. Defaults to `include_all`.                                                                                                                                                                                                                      |
| aws_regions       | Object 1                                     | object    | Include all regions. Defaults to `true`.                                                                                                                                                                                                                                          |
| Object 1          | include_all [*required*]                     | boolean   | Include all regions.                                                                                                                                                                                                                                                              |
| aws_regions       | Object 2                                     | object    | Include only these regions.                                                                                                                                                                                                                                                       |
| Object 2          | include_only [*required*]                    | [string]  | Include only these regions.                                                                                                                                                                                                                                                       |
| attributes        | created_at                                   | date-time | Timestamp of when the account integration was created. Read-only.                                                                                                                                                                                                                 |
| attributes        | logs_config                                  | object    | AWS Logs Collection config.                                                                                                                                                                                                                                                       |
| logs_config       | lambda_forwarder                             | object    | Log Autosubscription configuration for Datadog Forwarder Lambda functions.
  Automatically set up triggers for existing and new logs for some services,
  ensuring no logs from new resources are missed and saving time spent on manual configuration.                           |
| lambda_forwarder  | lambdas                                      | [string]  | List of Datadog Lambda Log Forwarder ARNs in your AWS account. Defaults to `[]`.                                                                                                                                                                                                  |
| lambda_forwarder  | log_source_config                            | object    | Log source configuration.                                                                                                                                                                                                                                                         |
| log_source_config | tag_filters                                  | [object]  | List of AWS log source tag filters. Defaults to `[]`.                                                                                                                                                                                                                             |
| tag_filters       | source                                       | string    | The AWS log source to which the tag filters defined in `tags` are applied.                                                                                                                                                                                                        |
| tag_filters       | tags                                         | [string]  | The AWS resource tags to filter on for the log source specified by `source`.                                                                                                                                                                                                      |
| lambda_forwarder  | sources                                      | [string]  | List of service IDs set to enable automatic log collection.
  Discover the list of available services with the
  [Get list of AWS log ready
  services](https://docs.datadoghq.com/api/latest/aws-logs-integration/#get-list-of-aws-log-ready-services)
  endpoint.               |
| attributes        | metrics_config                               | object    | AWS Metrics Collection config.                                                                                                                                                                                                                                                    |
| metrics_config    | automute_enabled                             | boolean   | Enable EC2 automute for AWS metrics. Defaults to `true`.                                                                                                                                                                                                                          |
| metrics_config    | collect_cloudwatch_alarms                    | boolean   | Enable CloudWatch alarms collection. Defaults to `false`.                                                                                                                                                                                                                         |
| metrics_config    | collect_custom_metrics                       | boolean   | Enable custom metrics collection. Defaults to `false`.                                                                                                                                                                                                                            |
| metrics_config    | enabled                                      | boolean   | Enable AWS metrics collection. Defaults to `true`.                                                                                                                                                                                                                                |
| metrics_config    | namespace_filters                            | <oneOf>   | AWS Metrics namespace filters. Defaults to `exclude_only`.                                                                                                                                                                                                                        |
| namespace_filters | Object 1                                     | object    | Exclude only these namespaces from metrics collection.
  Defaults to `["AWS/SQS", "AWS/ElasticMapReduce", "AWS/Usage"]`.
  `AWS/SQS`, `AWS/ElasticMapReduce`, and `AWS/Usage` are excluded by default
  to reduce your AWS CloudWatch costs from `GetMetricData` API calls.       |
| Object 1          | exclude_only [*required*]                    | [string]  | Exclude only these namespaces from metrics collection.
  Defaults to `["AWS/SQS", "AWS/ElasticMapReduce", "AWS/Usage"]`.
  `AWS/SQS`, `AWS/ElasticMapReduce`, and `AWS/Usage` are excluded by default
  to reduce your AWS CloudWatch costs from `GetMetricData` API calls.       |
| namespace_filters | Object 2                                     | object    | Include only these namespaces.                                                                                                                                                                                                                                                    |
| Object 2          | include_only [*required*]                    | [string]  | Include only these namespaces.                                                                                                                                                                                                                                                    |
| metrics_config    | tag_filters                                  | [object]  | AWS Metrics collection tag filters list. Defaults to `[]`.                                                                                                                                                                                                                        |
| tag_filters       | namespace                                    | string    | The AWS service for which the tag filters defined in `tags` will be applied.                                                                                                                                                                                                      |
| tag_filters       | tags                                         | [string]  | The AWS resource tags to filter on for the service specified by `namespace`.                                                                                                                                                                                                      |
| attributes        | modified_at                                  | date-time | Timestamp of when the account integration was updated. Read-only.                                                                                                                                                                                                                 |
| attributes        | resources_config                             | object    | AWS Resources Collection config.                                                                                                                                                                                                                                                  |
| resources_config  | cloud_security_posture_management_collection | boolean   | Enable Cloud Security Management to scan AWS resources for vulnerabilities, misconfigurations,
  identity risks, and compliance violations. Defaults to `false`.
  Requires `extended_collection` to be set to `true`.                                                            |
| resources_config  | extended_collection                          | boolean   | Whether Datadog collects additional attributes and configuration information about the resources
  in your AWS account. Defaults to `true`. Required for `cloud_security_posture_management_collection`.                                                                          |
| attributes        | traces_config                                | object    | AWS Traces Collection config.                                                                                                                                                                                                                                                     |
| traces_config     | xray_services                                | <oneOf>   | AWS X-Ray services to collect traces from. Defaults to `include_only`.                                                                                                                                                                                                            |
| xray_services     | Object 1                                     | object    | Include all services.                                                                                                                                                                                                                                                             |
| Object 1          | include_all [*required*]                     | boolean   | Include all services.                                                                                                                                                                                                                                                             |
| xray_services     | Object 2                                     | object    | Include only these services. Defaults to `[]`.                                                                                                                                                                                                                                    |
| Object 2          | include_only [*required*]                    | [string]  | Include only these services.                                                                                                                                                                                                                                                      |
| data              | id [*required*]                              | string    | Unique Datadog ID of the AWS Account Integration Config.
  To get the config ID for an account, use the
  [List all AWS integrations](https://docs.datadoghq.com/api/latest/aws-integration/#list-all-aws-integrations)
  endpoint and query by AWS Account ID.                   |
| data              | type [*required*]                            | enum      | AWS Account resource type. Allowed values: `account`. Default: `account`.                                                                                                                                                                                                         |
{% /tab %}

{% tab label="Example" %}
```json
{
  "data": [
    {
      "attributes": {
        "account_tags": [
          "env:prod"
        ],
        "auth_config": {
          "access_key_id": "AKIAIOSFODNN7EXAMPLE",
          "secret_access_key": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
        },
        "aws_account_id": "123456789012",
        "aws_partition": "aws",
        "aws_regions": {
          "include_all": true
        },
        "logs_config": {
          "lambda_forwarder": {
            "lambdas": [
              "arn:aws:lambda:us-east-1:123456789012:function:DatadogLambdaLogForwarder"
            ],
            "log_source_config": {
              "tag_filters": [
                {
                  "source": "s3",
                  "tags": [
                    "env:prod"
                  ]
                }
              ]
            },
            "sources": [
              "s3"
            ]
          }
        },
        "metrics_config": {
          "automute_enabled": true,
          "collect_cloudwatch_alarms": false,
          "collect_custom_metrics": false,
          "enabled": true,
          "namespace_filters": {
            "exclude_only": [
              "AWS/SQS",
              "AWS/ElasticMapReduce",
              "AWS/Usage"
            ]
          },
          "tag_filters": [
            {
              "namespace": "AWS/EC2",
              "tags": [
                "datadog:true"
              ]
            }
          ]
        },
        "resources_config": {
          "cloud_security_posture_management_collection": false,
          "extended_collection": true
        },
        "traces_config": {
          "xray_services": {
            "include_all": false
          }
        }
      },
      "id": "00000000-abcd-0001-0000-000000000000",
      "type": "account"
    }
  ]
}
```
{% /tab %}
{% /tabs %}
{% /tab %}

{% tab label="403" %}
Forbidden

{% tabs %}
{% tab label="Model" %}
API error response.

| Parent field | Field               | Type     | Description       |
| ------------ | ------------------- | -------- | ----------------- |
|              | errors [*required*] | [string] | A list of errors. |
{% /tab %}

{% tab label="Example" %}
```json
{
  "errors": [
    "Bad Request"
  ]
}
```
{% /tab %}
{% /tabs %}
{% /tab %}

{% tab label="429" %}
Too many requests

{% tabs %}
{% tab label="Model" %}
API error response.

| Parent field | Field               | Type     | Description       |
| ------------ | ------------------- | -------- | ----------------- |
|              | errors [*required*] | [string] | A list of errors. |
{% /tab %}

{% tab label="Example" %}
```json
{
  "errors": [
    "Bad Request"
  ]
}
```
{% /tab %}
{% /tabs %}
{% /tab %}
{% /tabs %}

### Code Example

{% tabs %}
{% tab label="Curl" %}
```bash
# Set your Datadog site and credentials
export DD_SITE="datadoghq.com"
export DD_API_KEY="<DD_API_KEY>"
export DD_APP_KEY="<DD_APP_KEY>"

curl -X GET "https://api.datadoghq.com/api/v2/integration/aws/accounts?aws_account_id=123456789012" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-H "Accept: application/json"
```
{% /tab %}

{% tab label="Go" %}
```go
// NOTE: Frozen test fixture from tests/fixtures/api/examples/, not live SDK output.
// List all AWS integrations returns "AWS Accounts List object" response

package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"

	"github.com/DataDog/datadog-api-client-go/v2/api/datadog"
	"github.com/DataDog/datadog-api-client-go/v2/api/datadogV2"
)

func main() {
	ctx := datadog.NewDefaultContext(context.Background())
	configuration := datadog.NewConfiguration()
	apiClient := datadog.NewAPIClient(configuration)
	api := datadogV2.NewAWSIntegrationApi(apiClient)
	resp, r, err := api.ListAWSAccounts(ctx, *datadogV2.NewListAWSAccountsOptionalParameters())

	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `AWSIntegrationApi.ListAWSAccounts`: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}

	responseContent, _ := json.MarshalIndent(resp, "", "  ")
	fmt.Fprintf(os.Stdout, "Response from `AWSIntegrationApi.ListAWSAccounts`:\n%s\n", responseContent)
}
```

**Instructions**

First [install the library and its dependencies](/api/latest/?code-lang=go) and then save the example to `main.go` and run following commands:

```bash
DD_SITE="datadoghq.com" DD_API_KEY="<API-KEY>" DD_APP_KEY="<APP-KEY>" go run "main.go"
```
{% /tab %}

{% tab label="Java" %}
```java
// NOTE: Frozen test fixture from tests/fixtures/api/examples/, not live SDK output.
// List all AWS integrations returns "AWS Accounts List object" response

import com.datadog.api.client.ApiClient;
import com.datadog.api.client.ApiException;
import com.datadog.api.client.v2.api.AwsIntegrationApi;
import com.datadog.api.client.v2.model.AWSAccountsResponse;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = ApiClient.getDefaultApiClient();
    AwsIntegrationApi apiInstance = new AwsIntegrationApi(defaultClient);

    try {
      AWSAccountsResponse result = apiInstance.listAWSAccounts();
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling AwsIntegrationApi#listAWSAccounts");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

**Instructions**

First [install the library and its dependencies](/api/latest/?code-lang=java) and then save the example to `Example.java` and run following commands:

```bash
DD_SITE="datadoghq.com" DD_API_KEY="<API-KEY>" DD_APP_KEY="<APP-KEY>" java "Example.java"
```
{% /tab %}

{% tab label="Python" %}
```python
# NOTE: Frozen test fixture from tests/fixtures/api/examples/, not live SDK output.
"""
List all AWS integrations returns "AWS Accounts List object" response
"""

from datadog_api_client import ApiClient, Configuration
from datadog_api_client.v2.api.aws_integration_api import AWSIntegrationApi

configuration = Configuration()
with ApiClient(configuration) as api_client:
    api_instance = AWSIntegrationApi(api_client)
    response = api_instance.list_aws_accounts()

    print(response)
```

**Instructions**

First [install the library and its dependencies](/api/latest/?code-lang=python) and then save the example to `example.py` and run following commands:

```bash
DD_SITE="datadoghq.com" DD_API_KEY="<API-KEY>" DD_APP_KEY="<APP-KEY>" python3 "example.py"
```
{% /tab %}

{% tab label="Ruby" %}
```ruby
# NOTE: Frozen test fixture from tests/fixtures/api/examples/, not live SDK output.
# List all AWS integrations returns "AWS Accounts List object" response

require "datadog_api_client"
api_instance = DatadogAPIClient::V2::AWSIntegrationAPI.new
p api_instance.list_aws_accounts()
```

**Instructions**

First [install the library and its dependencies](/api/latest/?code-lang=ruby) and then save the example to `example.rb` and run following commands:

```bash
DD_SITE="datadoghq.com" DD_API_KEY="<API-KEY>" DD_APP_KEY="<APP-KEY>" rb "example.rb"
```
{% /tab %}

{% tab label="Rust" %}
```rust
// NOTE: Frozen test fixture from tests/fixtures/api/examples/, not live SDK output.
// List all AWS integrations returns "AWS Accounts List object" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_aws_integration::AWSIntegrationAPI;
use datadog_api_client::datadogV2::api_aws_integration::ListAWSAccountsOptionalParams;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = AWSIntegrationAPI::with_config(configuration);
    let resp = api
        .list_aws_accounts(ListAWSAccountsOptionalParams::default())
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
```

**Instructions**

First [install the library and its dependencies](/api/latest/?code-lang=rust) and then save the example to `src/main.rs` and run following commands:

```bash
DD_SITE="datadoghq.com" DD_API_KEY="<API-KEY>" DD_APP_KEY="<APP-KEY>" cargo run
```
{% /tab %}

{% tab label="TypeScript" %}
```typescript
// NOTE: Frozen test fixture from tests/fixtures/api/examples/, not live SDK output.
/**
 * List all AWS integrations returns "AWS Accounts List object" response
 */

import { client, v2 } from "@datadog/datadog-api-client";

const configuration = client.createConfiguration();
const apiInstance = new v2.AWSIntegrationApi(configuration);

apiInstance
  .listAWSAccounts()
  .then((data: v2.AWSAccountsResponse) => {
    console.log(
      "API called successfully. Returned data: " + JSON.stringify(data)
    );
  })
  .catch((error: any) => console.error(error));
```

**Instructions**

First [install the library and its dependencies](/api/latest/?code-lang=typescript) and then save the example to `example.ts` and run following commands:

```bash
DD_SITE="datadoghq.com" DD_API_KEY="<API-KEY>" DD_APP_KEY="<APP-KEY>" tsc "example.ts"
```
{% /tab %}
{% /tabs %}

## v1

{% alert level="warning" %}
This endpoint is deprecated.
{% /alert %}

**This endpoint is deprecated - use the V2 endpoints instead.** List all Datadog-AWS integrations available in your Datadog organization.

| Datadog site      | API endpoint                                                 |
| ----------------- | ------------------------------------------------------------ |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/integration/aws     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/integration/aws |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/integration/aws |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/integration/aws      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/integration/aws |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/integration/aws |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/integration/aws      |

This endpoint requires the `aws_configuration_read` permission.

### Arguments

#### Query Strings

| Parent field | Field         | Type   | Description                                                 |
| ------------ | ------------- | ------ | ----------------------------------------------------------- |
|              | account_id    | string | Only return AWS accounts that matches this `account_id`.    |
|              | role_name     | string | Only return AWS accounts that matches this role_name.       |
|              | access_key_id | string | Only return AWS accounts that matches this `access_key_id`. |

### Response

{% tabs %}
{% tab label="200" %}
OK

{% tabs %}
{% tab label="Model" %}
List of enabled AWS accounts.

| Parent field | Field                                | Type     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------ | ------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|              | accounts                             | [object] | List of enabled AWS accounts.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| accounts     | access_key_id                        | string   | Your AWS access key ID. Only required if your AWS account is a GovCloud or China account.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| accounts     | account_id                           | string   | Your AWS Account ID without dashes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| accounts     | account_specific_namespace_rules     | object   | An object (in the form `{"namespace1":true/false, "namespace2":true/false}`) containing user-supplied overrides
  for AWS namespace metric collection. **Important**: This field only contains namespaces explicitly configured through API calls,
  not the comprehensive enabled or disabled status of all namespaces. If a namespace is absent from this field, it uses Datadog's
  internal defaults (all namespaces enabled by default, except `AWS/SQS`, `AWS/ElasticMapReduce`, and `AWS/Usage`).
  For a complete view of all namespace statuses, use the V2 AWS Integration API instead. |
| accounts     | cspm_resource_collection_enabled     | boolean  | Whether Datadog collects cloud security posture management resources from your AWS account. This includes additional resources not covered under the general `resource_collection`. Default: `false`.                                                                                                                                                                                                                                                                                                                                                                                             |
| accounts     | excluded_regions                     | [string] | An array of [AWS regions](https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints)
  to exclude from metrics collection.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| accounts     | extended_resource_collection_enabled | boolean  | Whether Datadog collects additional attributes and configuration information about the resources in your AWS account. Required for `cspm_resource_collection`. Default: `false`.                                                                                                                                                                                                                                                                                                                                                                                                                  |
| accounts     | filter_tags                          | [string] | The array of EC2 tags (in the form `key:value`) defines a filter that Datadog uses when collecting metrics from EC2.
  Wildcards, such as `?` (for single characters) and `*` (for multiple characters) can also be used.
  Only hosts that match one of the defined tags
  will be imported into Datadog. The rest will be ignored.
  Host matching a given tag can also be excluded by adding `!` before the tag.
  For example, `env:production,instance-type:c1.*,!region:us-east-1`                                                                                                          |
| accounts     | host_tags                            | [string] | Array of tags (in the form `key:value`) to add to all hosts
  and metrics reporting through this integration.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| accounts     | metrics_collection_enabled           | boolean  | Whether Datadog collects metrics for this AWS account. Default: `true`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| accounts     | resource_collection_enabled          | boolean  | Deprecated in favor of 'extended_resource_collection_enabled'. Whether Datadog collects a standard set of resources from your AWS account. **Deprecated.** Default: `false`.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| accounts     | role_name                            | string   | Your Datadog role delegation name.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| accounts     | secret_access_key                    | string   | Your AWS secret access key. Only required if your AWS account is a GovCloud or China account.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
{% /tab %}

{% tab label="Example" %}
```json
{
  "accounts": [
    {
      "account_id": "123456789012",
      "account_specific_namespace_rules": {
        "auto_scaling": false,
        "opswork": false
      },
      "cspm_resource_collection_enabled": true,
      "excluded_regions": [
        "us-east-1",
        "us-west-2"
      ],
      "extended_resource_collection_enabled": true,
      "filter_tags": [
        "$KEY:$VALUE"
      ],
      "host_tags": [
        "$KEY:$VALUE"
      ],
      "metrics_collection_enabled": false,
      "resource_collection_enabled": true,
      "role_name": "DatadogAWSIntegrationRole"
    }
  ]
}
```
{% /tab %}
{% /tabs %}
{% /tab %}

{% tab label="400" %}
Bad Request

{% tabs %}
{% tab label="Model" %}
Error response object.

| Parent field | Field               | Type     | Description                          |
| ------------ | ------------------- | -------- | ------------------------------------ |
|              | errors [*required*] | [string] | Array of errors returned by the API. |
{% /tab %}

{% tab label="Example" %}
```json
{
  "errors": [
    "Bad Request"
  ]
}
```
{% /tab %}
{% /tabs %}
{% /tab %}

{% tab label="403" %}
Authentication Error

{% tabs %}
{% tab label="Model" %}
Error response object.

| Parent field | Field               | Type     | Description                          |
| ------------ | ------------------- | -------- | ------------------------------------ |
|              | errors [*required*] | [string] | Array of errors returned by the API. |
{% /tab %}

{% tab label="Example" %}
```json
{
  "errors": [
    "Bad Request"
  ]
}
```
{% /tab %}
{% /tabs %}
{% /tab %}

{% tab label="429" %}
Too many requests

{% tabs %}
{% tab label="Model" %}
Error response object.

| Parent field | Field               | Type     | Description                          |
| ------------ | ------------------- | -------- | ------------------------------------ |
|              | errors [*required*] | [string] | Array of errors returned by the API. |
{% /tab %}

{% tab label="Example" %}
```json
{
  "errors": [
    "Bad Request"
  ]
}
```
{% /tab %}
{% /tabs %}
{% /tab %}
{% /tabs %}

### Code Example

{% tabs %}
{% tab label="Curl" %}
```bash
# Set your Datadog site and credentials
export DD_SITE="datadoghq.com"
export DD_API_KEY="<DD_API_KEY>"
export DD_APP_KEY="<DD_APP_KEY>"

curl -X GET "https://api.datadoghq.com/api/v1/integration/aws" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-H "Accept: application/json"
```
{% /tab %}

{% tab label="Go" %}
```go
// NOTE: Frozen test fixture from tests/fixtures/api/examples/, not live SDK output.
// List all AWS integrations returns "OK" response

package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"

	"github.com/DataDog/datadog-api-client-go/v2/api/datadog"
	"github.com/DataDog/datadog-api-client-go/v2/api/datadogV1"
)

func main() {
	ctx := datadog.NewDefaultContext(context.Background())
	configuration := datadog.NewConfiguration()
	apiClient := datadog.NewAPIClient(configuration)
	api := datadogV1.NewAWSIntegrationApi(apiClient)
	resp, r, err := api.ListAWSAccounts(ctx, *datadogV1.NewListAWSAccountsOptionalParameters())

	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `AWSIntegrationApi.ListAWSAccounts`: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}

	responseContent, _ := json.MarshalIndent(resp, "", "  ")
	fmt.Fprintf(os.Stdout, "Response from `AWSIntegrationApi.ListAWSAccounts`:\n%s\n", responseContent)
}
```

**Instructions**

First [install the library and its dependencies](/api/latest/?code-lang=go) and then save the example to `main.go` and run following commands:

```bash
DD_SITE="datadoghq.com" DD_API_KEY="<API-KEY>" DD_APP_KEY="<APP-KEY>" go run "main.go"
```
{% /tab %}

{% tab label="Java" %}
```java
// NOTE: Frozen test fixture from tests/fixtures/api/examples/, not live SDK output.
// List all AWS integrations returns "OK" response

import com.datadog.api.client.ApiClient;
import com.datadog.api.client.ApiException;
import com.datadog.api.client.v1.api.AwsIntegrationApi;
import com.datadog.api.client.v1.model.AWSAccountListResponse;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = ApiClient.getDefaultApiClient();
    AwsIntegrationApi apiInstance = new AwsIntegrationApi(defaultClient);

    try {
      AWSAccountListResponse result = apiInstance.listAWSAccounts();
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling AwsIntegrationApi#listAWSAccounts");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

**Instructions**

First [install the library and its dependencies](/api/latest/?code-lang=java) and then save the example to `Example.java` and run following commands:

```bash
DD_SITE="datadoghq.com" DD_API_KEY="<API-KEY>" DD_APP_KEY="<APP-KEY>" java "Example.java"
```
{% /tab %}

{% tab label="Python" %}
```python
# NOTE: Frozen test fixture from tests/fixtures/api/examples/, not live SDK output.
"""
List all AWS integrations returns "OK" response
"""

from datadog_api_client import ApiClient, Configuration
from datadog_api_client.v1.api.aws_integration_api import AWSIntegrationApi

configuration = Configuration()
with ApiClient(configuration) as api_client:
    api_instance = AWSIntegrationApi(api_client)
    response = api_instance.list_aws_accounts()

    print(response)
```

**Instructions**

First [install the library and its dependencies](/api/latest/?code-lang=python) and then save the example to `example.py` and run following commands:

```bash
DD_SITE="datadoghq.com" DD_API_KEY="<API-KEY>" DD_APP_KEY="<APP-KEY>" python3 "example.py"
```
{% /tab %}

{% tab label="Ruby" %}
```ruby
# NOTE: Frozen test fixture from tests/fixtures/api/examples/, not live SDK output.
# List all AWS integrations returns "OK" response

require "datadog_api_client"
api_instance = DatadogAPIClient::V1::AWSIntegrationAPI.new
p api_instance.list_aws_accounts()
```

**Instructions**

First [install the library and its dependencies](/api/latest/?code-lang=ruby) and then save the example to `example.rb` and run following commands:

```bash
DD_SITE="datadoghq.com" DD_API_KEY="<API-KEY>" DD_APP_KEY="<APP-KEY>" rb "example.rb"
```
{% /tab %}

{% tab label="Rust" %}
```rust
// NOTE: Frozen test fixture from tests/fixtures/api/examples/, not live SDK output.
// List all AWS integrations returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_aws_integration::AWSIntegrationAPI;
use datadog_api_client::datadogV1::api_aws_integration::ListAWSAccountsOptionalParams;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = AWSIntegrationAPI::with_config(configuration);
    let resp = api
        .list_aws_accounts(ListAWSAccountsOptionalParams::default())
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
```

**Instructions**

First [install the library and its dependencies](/api/latest/?code-lang=rust) and then save the example to `src/main.rs` and run following commands:

```bash
DD_SITE="datadoghq.com" DD_API_KEY="<API-KEY>" DD_APP_KEY="<APP-KEY>" cargo run
```
{% /tab %}

{% tab label="TypeScript" %}
```typescript
// NOTE: Frozen test fixture from tests/fixtures/api/examples/, not live SDK output.
/**
 * List all AWS integrations returns "OK" response
 */

import { client, v1 } from "@datadog/datadog-api-client";

const configuration = client.createConfiguration();
const apiInstance = new v1.AWSIntegrationApi(configuration);

apiInstance
  .listAWSAccounts()
  .then((data: v1.AWSAccountListResponse) => {
    console.log(
      "API called successfully. Returned data: " + JSON.stringify(data)
    );
  })
  .catch((error: any) => console.error(error));
```

**Instructions**

First [install the library and its dependencies](/api/latest/?code-lang=typescript) and then save the example to `example.ts` and run following commands:

```bash
DD_SITE="datadoghq.com" DD_API_KEY="<API-KEY>" DD_APP_KEY="<APP-KEY>" tsc "example.ts"
```
{% /tab %}
{% /tabs %}
