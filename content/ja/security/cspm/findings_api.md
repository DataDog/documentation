---
disable_edit: true
is_beta: true
kind: documentation
private: true
title: CSPM Findings API
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
クラウドセキュリティポスチャ管理は、現在このサイトでは利用できません。
</div>
{{< /site-region >}}

{{< callout url="#" btn_hidden="true" >}}
  CSPM Findings API は現在、非公開ベータ版です。アクセスのリクエストやフィードバックの提供は、<a href="/help/">サポート</a>までお問い合わせください。
{{< /callout >}} 


CSPM の所見の一覧を取得したり、特定の所見の詳細を取得したりすることができます。

## レート制限

1 キーあたり毎分 100 リクエスト。

## 所見一覧の取得

`GET https://app.datadoghq.com/api/unstable/posture_management/findings`

### 概要

CSPM の所見一覧を取得します。

### 引数

#### クエリパラメーター

| フィールド                       | タイプ             | 説明                                                                                                                                 |
|---------------------------------|------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| `filter[evaluation]`            | 文字列           | `pass`に設定すると、合格の所見のみを返します。失敗した所見を返すには `fail` を設定します。                                                        |
| `filter[evaluation_changed_at]` | 整数          | 指定した日付 (unix ms) または日付範囲 (比較演算子を使用) で、合格から失敗に変化した所見、またはその逆を返します。 |
| `filter[muted]`                 | boolean          | ミュートされている所見を返すには、`true` に設定します。ミュートされていない所見を返すには、`false` に設定します。                                                 |
| `filter[discovery_timestamp]`   | 文字列           | 指定された日付 (unix ms) または日付範囲 (比較演算子を使用) に見つかった所見を返します。                                   |
| `filter[resource_type]`         | 文字列           | 指定されたリソースタイプの所見のみを返します。                                                                          |
| `filter[rule_id]`               | 文字列           | 指定されたルール ID の所見を返します。                                                                                                 |
| `filter[rule_name]`             | 文字列           | 指定されたルールの所見を返します。                                                                                                     |
| `filter[status]`                | 文字列           | 指定されたステータスを持つ所見のみを返します。許可された列挙値: `critical`、`high`、`medium`、`low`、`info`                            |
| `filter[tags]`                  | 文字列の配列 | カーソルが指し示す所見の次のページを返します (繰り返し可能)。                                                                     |
| `limit`                         | 整数          | 返される所見の件数を制限します。デフォルト値は `100` です。最大値は `1000` です。                                                 |
| `page[cursor]`                  | 文字列           | カーソルが指し示す所見の次のページを返します。                                                                                  |
| `snapshot_timestamp`            | 整数          | 指定されたスナップショット時間 (unix ms) の所見を返します。                                                                                     |

### ページ区切り

エンドポイントは、デフォルトで 1 ページあたり 100 件のアイテムを返します。この制限は、limit クエリパラメータを渡すことによって、最大 1000 まで増やすことができます。例: `?limit=500`

この API では、カーソルベースのページ分割を使用します。次のページに移動するには、`meta.page.cursor` を取得し、クエリパラメータとして渡します: `?cursor=eyJh...`

### フィルタリング

URL にクエリパラメーターを付加することで、フィルターを適用することができます。

- 単一のフィルターを使用する: `?filter[attribute_key]=attribute_value`
- フィルターを連鎖させる: `?filter[attribute_key]=attribute_value&filter[attribute_key]=attribute_value...`
- タグでフィルターをかける: `?filter[tags]=tag_key:tag_value`

`integer` 型のクエリパラメーターは、比較演算子 (`>`、`>=`、`<`、`<=`) をサポートしています。これは、`evaluation_changed_at` や `resource_discovery_timestamp` でフィルターをかける場合に特に有効です。例: `?filter[evaluation_changed_at]=>20123123121`

また、文字列に対して否定演算子を使用することができます。例えば、`filter[resource_type]=-aws*` とすると、aws 以外のリソースをフィルターにかけます。

演算子は等号の後に付ける必要があります。例えば、`>=` 演算子でフィルターをかけるには、等号の後に演算子を付けます: `filter[evaluation_changed_at]=>=1678809373257`

### リクエスト

##### リクエスト例

```bash
curl --location -g --request GET 'https://app.datadoghq.com/api/unstable/posture_management/findings?filter[evaluation_changed_at]>=1667403346000&filter[evaluation]=fail&filter[status]=critical&filter[tag]=cloud_provider:aws' \
--header 'DD-API-KEY: INSERT_KEY' \
--header 'DD-APPLICATION-KEY: INSERT_KEY'
```

### 応答

レスポンスには、検索オブジェクトの配列、ページ分割メタデータ、クエリに一致するアイテムのカウントが含まれます。

各所見オブジェクトの内容は以下の通りです。

- 所見の詳細を取得するために使用できる所見 ID。
- ステータス、評価、高レベルのリソースの詳細、ミュート状態、ルールの詳細などのコア属性。
- `evaluation_changed_at` と `resource_discovery_date` のタイムスタンプ。
- 関連タグの配列。

#### レスポンス例 200 OK

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
## 所見の詳細を取得する

`GET https://app.datadoghq.com/api/unstable/posture_management/findings/{finding_id}`

### 概要

所見の詳細な情報を取得します。

### 引数

#### パスパラメーター

| フィールド         | タイプ   | 説明            |
|--------------|--------|------------------------|
| `finding_id` | 文字列 | 所見の ID。 |

### 応答

レスポンスには、以下の内容を含む所見オブジェクトが含まれます。

- ステータス、評価、高レベルのリソースの詳細、ミュート状態、ルールの詳細などのコア属性。
- `evaluation_changed_at` と `resource_discovery_date` のタイムスタンプ。
- 関連タグの配列。
- ルールメッセージの詳細 (説明と改善ガイドライン)。
- 完全なリソース構成。

#### レスポンス例 200 OK

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