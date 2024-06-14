---
further_reading:
- link: /api/latest/synthetics/
  tag: API
  text: Synthetics API
- link: /synthetics/
  tag: ドキュメント
  text: Synthetic モニタリングについて
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
  tag: Terraform
  text: Terraform による Synthetic API テストの作成と管理
kind: ガイド
title: API で API テストを作成する
---

## 概要

このガイドには、API テストの作成に使用できるコンフィギュレーションファイルの例や [Terraform][2] リソースへのリンク、グローバル変数などの関連する Synthetics リソースが含まれています。

   - API を使用している場合は、[JSON の構成例](#json-configuration)を参照してください。
   - Python クライアントを使用している場合は、[Python クライアントの例](#python-client)を参照してください。
   - Terraform を使用している場合は、[Terraform の例](#terraform)を参照してください。

詳しくは、API ドキュメントの [API テストの作成][1]をご覧ください。

## JSON コンフィギュレーション

### HTTP テスト

{{< code-block lang="json" disable_copy="false" collapsible="true" >}}
{
    "status": "live",
    "tags": [
        "env:production"
    ],
    "locations": [
        "azure:eastus",
        "aws:eu-west-3"
    ],
    "message": "<NOTIFICATION MESSAGE>",
    "name": "<TEST NAME>",
    "type": "api",
    "subtype": "http",
    "config": {
        "request": {
            "url": "https://example.com",
            "method": "GET"
        },
        "assertions": [
            {
                "operator": "lessThan",
                "type": "responseTime",
                "target": 1000
            },
            {
                "operator": "is",
                "type": "statusCode",
                "target": 200
            },
            {
                "operator": "is",
                "property": "content-type",
                "type": "header",
                "target": "text/html; charset=UTF-8"
            }
        ]
    },
    "options": {
        "monitor_options": {
            "notify_audit": false,
            "locked": false,
            "include_tags": true,
            "new_host_delay": 300,
            "notify_no_data": false,
            "renotify_interval": 0
        },
        "tick_every": 60,
        "min_failure_duration": 0,
        "min_location_failed": 1
    }
}
{{< /code-block >}}

### SSL テスト

{{< code-block lang="json" disable_copy="false" collapsible="true" >}}
{
    "status": "live",
    "tags": [
        "env:production"
    ],
    "locations": [
        "azure:eastus",
        "aws:eu-west-3"
    ],
    "message": "<NOTIFICATION MESSAGE>",
    "name": "<TEST NAME>",
    "type": "api",
    "subtype": "ssl",
    "config": {
        "request": {
            "host": "example.com",
            "port": 443
        },
        "assertions": [
            {
                "operator": "isInMoreThan",
                "type": "certificate",
                "target": 10
            },
            {
                "operator": "moreThanOrEqual",
                "type": "tlsVersion",
                "target": "1.3"
            },
            {
                "operator": "lessThan",
                "type": "responseTime",
                "target": 1000
            }
        ]
    },
    "options": {
        "monitor_options": {
            "notify_audit": false,
            "locked": false,
            "include_tags": true,
            "new_host_delay": 300,
            "notify_no_data": false,
            "renotify_interval": 0
        },
        "tick_every": 60,
        "min_failure_duration": 0,
        "min_location_failed": 1
    }
}
{{< /code-block >}}

### DNS テスト

{{< code-block lang="json" disable_copy="false" collapsible="true" >}}
{
    "status": "live",
    "tags": [
        "env:production"
    ],
    "locations": [
        "azure:eastus",
        "aws:eu-west-3"
    ],
    "message": "<NOTIFICATION MESSAGE>",
    "name": "<TEST NAME>",
    "type": "api",
    "subtype": "dns",
    "config": {
        "request": {
            "host": "example.com"
        },
        "assertions": [
            {
                "operator": "lessThan",
                "type": "responseTime",
                "target": 1000
            },
            {
                "operator": "is",
                "property": "A",
                "type": "recordSome",
                "target": "93.184.216.34"
            },
            {
                "operator": "is",
                "property": "NS",
                "type": "recordSome",
                "target": "a.iana-servers.net"
            }
        ]
    },
    "options": {
        "monitor_options": {
            "notify_audit": false,
            "locked": false,
            "include_tags": true,
            "new_host_delay": 300,
            "notify_no_data": false,
            "renotify_interval": 0
        },
        "tick_every": 60,
        "min_failure_duration": 0,
        "min_location_failed": 1
    }
}
{{< /code-block >}}

### WebSocket テスト

{{< code-block lang="json" disable_copy="false" collapsible="true" >}}
{
    "status": "live",
    "tags": [
        "env:prod"
    ],
    "locations": [
        "aws:eu-west-3"
    ],
    "message": "<NOTIFICATION MESSAGE>",
    "name": "<TEST NAME>",
    "type": "api",
    "subtype": "websocket",
    "config": {
        "request": {
            "url": "ws://example.com:8081",
            "message": "websocket message"
        },
        "assertions": [
            {
                "operator": "lessThan",
                "type": "responseTime",
                "target": 1000
            },
            {
                "operator": "is",
                "type": "receivedMessage",
                "target": "connected!"
            }
        ]
    },
    "options": {
        "monitor_options": {
            "notify_audit": false,
            "locked": false,
            "include_tags": true,
            "new_host_delay": 300,
            "notify_no_data": false,
            "renotify_interval": 0
        },
        "tick_every": 60,
        "min_failure_duration": 0,
        "min_location_failed": 1
    }
}
{{< /code-block >}}

### TCP テスト

{{< code-block lang="json" disable_copy="false" collapsible="true" >}}
{
    "status": "live",
    "tags": [
        "env:production"
    ],
    "locations": [
        "azure:eastus",
        "aws:eu-west-3"
    ],
    "message": "<NOTIFICATION MESSAGE>",
    "name": "<TEST NAME>",
    "type": "api",
    "subtype": "tcp",
    "config": {
        "request": {
            "host": "example.com",
            "port": 443
        },
        "assertions": [
            {
                "operator": "lessThan",
                "type": "responseTime",
                "target": 1000
            }
        ]
    },
    "options": {
        "monitor_options": {
            "notify_audit": false,
            "locked": false,
            "include_tags": true,
            "new_host_delay": 300,
            "notify_no_data": false,
            "renotify_interval": 0
        },
        "tick_every": 60,
        "min_failure_duration": 0,
        "min_location_failed": 1
    }
}
{{< /code-block >}}

### UDP テスト

{{< code-block lang="json" disable_copy="false" collapsible="true" >}}
{
    "status": "live",
    "tags": [
        "env:prod"
    ],
    "locations": [
        "aws:eu-west-3"
    ],
    "message": "<NOTIFICATION MESSAGE>",
    "name": "<TEST NAME>",
    "type": "api",
    "subtype": "udp",
    "config": {
        "request": {
            "host": "example.com",
            "message": "UDP message",
            "port": 31337
        },
        "assertions": [
            {
                "operator": "lessThan",
                "type": "responseTime",
                "target": 1000
            },
            {
                "operator": "is",
                "type": "receivedMessage",
                "target": "UDP message response"
            }
        ]
    },
    "options": {
        "monitor_options": {
            "notify_audit": false,
            "locked": false,
            "include_tags": true,
            "new_host_delay": 300,
            "notify_no_data": false,
            "renotify_interval": 0
        },
        "tick_every": 60,
        "min_failure_duration": 0,
        "min_location_failed": 1
    }
}
{{< /code-block >}}

### ICMP テスト

{{< code-block lang="json" disable_copy="false" collapsible="true" >}}
{
    "status": "live",
    "tags": [
        "env:production"
    ],
    "locations": [
        "aws:us-west-2",
        "aws:eu-west-3"
    ],
    "message": "<NOTIFICATION MESSAGE>",
    "name": "<TEST NAME>",
    "type": "api",
    "subtype": "icmp",
    "config": {
        "request": {
            "numberOfPackets": 4,
            "host": "example.com"
        },
        "assertions": [
            {
                "operator": "lessThan",
                "property": "avg",
                "type": "latency",
                "target": 1000
            },
            {
                "operator": "is",
                "type": "packetLossPercentage",
                "target": 0
            },
            {
                "operator": "moreThanOrEqual",
                "type": "packetsReceived",
                "target": 1
            }
        ]
    },
    "options": {
        "monitor_options": {
            "notify_audit": false,
            "locked": false,
            "include_tags": true,
            "new_host_delay": 300,
            "notify_no_data": false,
            "renotify_interval": 0
        },
        "tick_every": 60,
        "min_failure_duration": 0,
        "min_location_failed": 1
    }
}
{{< /code-block >}}

## Python クライアント

### HTTP テスト

{{< code-block lang="python" disable_copy="false" collapsible="true" >}}
import os
from dateutil.parser import parse as dateutil_parser
from datadog_api_client.v1 import ApiClient, ApiException, Configuration
from datadog_api_client.v1.api import synthetics_api
from datadog_api_client.v1.models import *
from pprint import pprint

// サポートされているすべてのコンフィギュレーションパラメータの一覧は configure.py を参照してください
configuration = Configuration(
    host = "https://api.datadoghq.com",
    api_key= {"apiKeyAuth": "<YOUR_API_KEY>","appKeyAuth": "<YOUR_APPLICATION_KEY>"}
)

// ApiClient 構成に api_client が設定された API クライアントのインスタンスを持つコンテキストを入力します:
    // API クラスのインスタンスを作成します
    api_instance = synthetics_api.SyntheticsApi(api_client)
    body = SyntheticsAPITest(
        config=SyntheticsAPITestConfig(
            assertions=[
                SyntheticsAssertion(
                    operator="lessThan",
                    type="responseTime",
                    target=1000
                ),
            ],
            request=SyntheticsTestRequest(
                body="body_example",
                headers=SyntheticsTestHeaders(
                    **{"User-Agent": "value"}),
                method=HTTPMethod("GET"),
                no_saving_response_body=True,
                query={},
                timeout=60.0,
                url="https://httpbin.org/get",
            ),
        ),
        locations=[
            "aws:eu-west-2",
        ],
        message="message_example",
        name="name_example",
        options=SyntheticsTestOptions(
            follow_redirects=True,
            min_failure_duration=1,
            min_location_failed=1,
            #monitor_name="monitor_name_example",
            monitor_options=SyntheticsTestOptionsMonitorOptions(
                renotify_interval=0,
            ),
            monitor_priority=1,
            tick_every=30
        ),
        status=SyntheticsTestPauseStatus("live"),
        subtype=SyntheticsTestDetailsSubType("http"),
        tags=[
            "python-client",
        ],
        type=SyntheticsAPITestType("api"),
    )  # SyntheticsAPITest | 作成するテストの詳細。

    // デフォルトが設定されていない必須の値のみを渡す例
    try:
        // API テストを作成します
        api_response = api_instance.create_synthetics_api_test(body)
        pprint(api_response)
    except ApiException as e:
        print("Exception when calling SyntheticsApi->create_synthetics_api_test: %s\n" % e)
{{< /code-block >}}

## ダッシュボード  

### API テスト

[Synthetic テストリソース][7]を使用して、`type` を `api` に設定することで、Terraform で API テストを作成・管理することができます。

### プライベートロケーション

カスタムロケーションや保護されたロケーションから Synthetic テストを実行する必要がある場合は、[プライベートロケーションリソース][3]を使用して、テストを実行するプライベートロケーションを作成および管理できます。[プライベートロケーション][4]のページで詳細をご覧ください。

### グローバル変数とローカル変数

[Synthetics グローバル変数リソース][5]を使用して、Synthetics グローバル変数を作成・管理します。これはテスト間で安全に共有できる変数です。また、[config_variable][9] でネストされたスキーマを使用して、テスト固有の[組み込みのローカル変数][8]を作成することもできます。

### 同時実行上限

[Synthetics の同時実行上限リソース][6]を使用すると、並列で実行される Synthetic テストの数を制限することができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/latest/synthetics/#create-an-api-test
[2]: https://www.terraform.io/
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_private_location
[4]: /ja/synthetics/private_locations
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_global_variable
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_concurrency_cap
[7]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
[8]: https://docs.datadoghq.com/ja/synthetics/api_tests/http_tests/?tab=requestoptions#create-local-variables
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test#nested-schema-for-config_variable