---
title: CSPM Findings API
kind: documentation
is_beta: true
private: true
disable_edit: true
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
Cloud Security Posture Management is not currently available in this site.
</div>
{{< /site-region >}}

{{< callout url="#" btn_hidden="true" >}}
  The CSPM Findings API is currently in public beta. To request access or provide feedback, contact <a href="/help/">Support</a>.
{{< /callout >}} 


Retrieve a list of CSPM findings or get the full details for a specific finding.

## Rate Limits

100 requests per minute per key. 

## Get a list of findings

`GET https://app.datadoghq.com/api/v2/posture_management/findings`

### Overview

Get a list of CSPM findings.

### Arguments

#### Query parameters

| Field                       | Type             | Description                                                                                                                                 |
|---------------------------------|------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| `filter[evaluation]`            | string           | Set to `pass` to return only pass findings. Set to `fail` to return failed findings.                                                        |
| `filter[evaluation_changed_at]` | integer          | Return findings that have changed from pass to fail or vice versa on a specified date (unix ms) or date range (using comparison operators). |
| `filter[muted]`                 | boolean          | Set to `true` to return findings that are muted. Set to `false` to return unmuted findings.                                                 |
| `filter[discovery_timestamp]`   | string           | Return findings that were found on a specified date (unix ms) or date range (using comparison operators).                                   |
| `filter[resource_type]`         | string           | Return only findings for the specified resource types.                                                                          |
| `filter[rule_id]`               | string           | Return findings for the specified rule ID.                                                                                                 |
| `filter[rule_name]`             | string           | Return findings for the specified rule.                                                                                                     |
| `filter[status]`                | string           | Return only findings with the specified status. Allowed enum values: `critical`, `high`, `medium`, `low`, `info`                            |
| `filter[tags]`                  | array of strings | Return the next page of findings pointed to by the cursor (repeatable).                                                                     |
| `limit`                         | integer          | Limit the number of findings returned. The default value is `100`. Maximum value is `1000`.                                                 |
| `page[cursor]`                  | string           | Return the next page of findings pointed to by the cursor.                                                                                  |
| `snapshot_timestamp`            | integer          | Return findings for a given snapshot of time (unix ms).                                                                                     |

### Pagination

The endpoint returns 100 items per page by default. This limit can be increased to a maximum of 1000, by passing a limit query parameter. For example: `?limit=500`.

The API uses cursor-based pagination. To go to the next page, fetch `meta.page.cursor` and pass it as a query parameter: `?cursor=eyJh...`.

### Filtering

Filters can be applied by appending query parameters to the URL.

- Using a single filter: `?filter[attribute_key]=attribute_value`
- Chaining filters: `?filter[attribute_key]=attribute_value&filter[attribute_key]=attribute_value...`
- Filtering on tags: `?filter[tags]=tag_key:tag_value`

Query parameters of type `integer` support comparison operators (`>`, `>=`, `<`, `<=`). This is particularly useful when filtering by `evaluation_changed_at` or `resource_discovery_timestamp`. For example: `?filter[evaluation_changed_at]=>20123123121`.

You can also use the negation operator on strings. For example, use `filter[resource_type]=-aws*` to filter for any non-aws resources.

The operator must come after the equal sign. For example, to filter with the `>=` operator, add the operator after the equal sign: `filter[evaluation_changed_at]=>=1678809373257`.

### Request

##### Sample request

```bash
curl --location -g --request GET 'https://app.datadoghq.com/api/v2/posture_management/findings?filter[evaluation_changed_at]>=1667403346000&filter[evaluation]=fail&filter[status]=critical&filter[tag]=cloud_provider:aws' \
--header 'DD-API-KEY: INSERT_KEY' \
--header 'DD-APPLICATION-KEY: INSERT_KEY'
```

### Response

The response includes an array of finding objects, pagination metadata, and a count of items that match the query. 

Each finding object contains the following:

- The finding ID that can be used to retrieve the full finding details.
- Core attributes, including status, evaluation, high-level resource details, muted state, and rule details.
- `evaluation_changed_at` and `resource_discovery_date` time stamps.
- An array of associated tags.

#### Sample response 200 OK

```json
{
    "data": {
        "id": "70646476-3143-433a-8953-426a4f464a",
        "type": "posture_management_list_findings_resp",
        "attributes": {
            "findings": [
                {
                    "id": "AQAAAYZzBl-4bu4ufQAAA12WVp6QmwtNEFBQ04ydFhER3QxNC13QUE",
                    "status": "critical",
                    "evaluation": "fail",
                    "resource_discovery_date": 1670453400000,
                    "resource_type": "aws_s3_bucket",
                    "resource": "public.xxxx.company.com",
                    "rule": {
                        "name": "S3 bucket contents are not publicly exposed via bucket policy",
                        "id": "zno-neo-6jq"
                    },
                    "evaluation_changed_at": 1670453400000,
                    "muted": false,
                    "tags": [
                        "requirement:AWS",
                        "scored:true",
                        "aws_account:112787438617",
                        "control:164.312-a-1",
                        "requirement:Least-Privileged-Access",
                        "cloud_provider:aws",
                        "terraform.managed:true",
                        "control:1.3",
                        "requirement:Data-Protection",
                        "team:cake",
                        "control:7.2.2",
                        "requirement:Security-of-Processing",
                        "control:A.18.1.3",
                        "framework:soc-2",
                        "scope:s3",
                        "control:A.9.2.3",
                        "control:32.1a",
                        "requirement:Logical-and-Physical-Access-Control",
                        "control:CC6.3",
                        "control:CC6.1"
                    ]
                }...
            ]
        }
    },
    "meta": {
        "page": {
            "total_filtered_count": 2204,
            "cursor": "eyJhZnRlciI6IkFRQUFBWVp6Vnxxxxrd0FBQU221ldWcDZWbk15VVVGQlExSmxTa0pNV1RoRGNHRjNRVUUiLCJ2YWx1ZXMiOlsiY3JpdGljYWwiXX0="
        },
        "snapshot_timestamp": 1676974639331
    }
}
```
## Get a finding's details

`GET https://app.datadoghq.com/api/v2/posture_management/findings/{finding_id}`

### Overview

Get the full details for a finding.

### Arguments

#### Path parameters

| Field         | Type   | Description            |
|--------------|--------|------------------------|
| `finding_id` | string | The ID of the finding. |

### Response

The response includes a finding object that contains the following:

- Core attributes, including status, evaluation, high-level resource details, muted state, and rule details.
- `evaluation_changed_at` and `resource_discovery_date` time stamps.
- An array of associated tags.
- Rule message details (description and remediation guidelines).
- The full resource configuration.

#### Sample response 200 OK

```json
{
    "data": {
        "id": "70646476-3143-485a-a152-6a453228326b",
        "type": "posture_management_fetch_finding_resp",
        "attributes": {
            "finding": {
                "message": "%%%\n## Description\n\nUpdate your bucket policy as the contents of your Amazon S3 bucket are publicly accessible. \n\n## Rationale\n\nUnintentionally exposed Amazon S3 buckets have led to numerous data breaches and leaks. When misconfigured, an S3 bucket policy can permit anyone to download the contents of an Amazon S3 bucket.\n\n**Note**: If the bucket is configured to host a static website, this rule does not trigger because bucket contents are expected to be public to serve the site.\n\n## Remediation\n\nEnsure that there is a valid business justification as to why the bucket and all of its contents have been made public. If there is no valid reason, follow these steps to prevent public access.\n\n### From the console\n\nFollow the [Controlling access to a bucket with user policies][1] docs to edit your existing policy and set the policy permissions to private.\n\n### From the command line\n\n1. Run the [`delete-bucket-policy`][2] command to fully remove any public access to the bucket.\n   ```\n   aws s3api delete-bucket-policy \\\n     --bucket insert-bucket-name-here\n   ```\n2. If you need a bucket policy, create a new non-public bucket policy using the [AWS Policy Generator][3].\n3. Apply the bucket policy from Step 2 with the [`put-bucket-policy`][4] command.\n   ```\n   aws s3api put-bucket-policy\n     --bucket insert-bucket-name-here\n     --policy file://insert-bucket-policy-file-name-here.json\n   ```\n\n[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/walkthrough1.html\n[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/delete-bucket-policy.html\n[3]: http://awspolicygen.s3.amazonaws.com/policygen.html\n[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/put-bucket-policy.html\n%%%",
                "id": "AQAAAYZzBl-224ufQAAAABBWVp6QmwtNEFBQ04ydFhER3QxNC13QUE",
                "status": "critical",
                "evaluation": "fail",
                "resource_discovery_date": 1670453400000,
                "resource_type": "aws_s3_bucket",
                "resource": "public.xxxx.company.com",
                "rule": {
                    "name": "S3 bucket contents are not publicly exposed via bucket policy",
                    "id": "zno-neo-6jq"
                },
                "evaluation_changed_at": 1670453400000,
                "muted": false,
                "tags": [
                        "requirement:AWS",
                        "scored:true",
                        "aws_account:112787438617",
                        "control:164.312-a-1",
                        "requirement:Least-Privileged-Access",
                        "cloud_provider:aws",
                        "terraform.managed:true",
                        "control:1.3",
                        "requirement:Data-Protection",
                        "team:cake",
                        "control:7.2.2",
                        "requirement:Security-of-Processing",
                        "control:A.18.1.3",
                        "framework:soc-2",
                        "scope:s3",
                        "control:A.9.2.3",
                        "control:32.1a",
                        "requirement:Logical-and-Physical-Access-Control",
                        "control:CC6.3",
                        "control:CC6.1"
                    ],
                "resource_configuration": {
                    "account_id": "111111111111",
                    "bucket_arn": "arn:aws:s3:::public.xxx.company.com",
                    "bucket_policy_statement": [...
                    ],
                    "creation_date": 1513177519000,
                    "grants": [
                        {
                            "grantee": {...
                            },
                            "permission": "FULL_CONTROL"
                        },
                        {
                            "grantee": {
                                "type": "Group",
                                "uri": "http://acs.amazonaws.com/groups/global/AllUsers"
                            },
                            "permission": "READ"
                        }
                    ],...
                }
            }
        }
    }
}
```