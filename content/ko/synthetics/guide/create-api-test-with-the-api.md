---
further_reading:
- link: /api/latest/synthetics/
  tag: API
  text: Synthetics API
- link: /synthetics/
  tag: 설명서
  text: 신서틱(Synthetic) 모니터링에 대해 알아보기
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
  tag: 외부 사이트
  text: Terraform으로 신서틱(Synthetic) API 테스트 생성 및 관리
title: API를 사용하여 API 테스트 생성
---

## 개요

본 지침에는 API 테스트를 생성하는 데 사용할 수 있는 설정 파일 예제와  [Terraform][2] 리소스 링크, 글로벌 변수 등의 관련 신서틱 리소스가 포함되어 있습니다.

   - API를 사용하는 경우 [JSON 설정 예제](#json-configuration)를 참조하세요. 
   - 파이썬(Python) 클라이언트를 사용하는 경우 [파이썬(Python) 클라이언트 예제](#python-client)를 참조하세요.
   - Terraform을 사용하는 경우 [Terraform 예제](#terraform)를 참조하세요.

자세한 내용을 확인하려면 API 문서의 [API 테스트 생성][1] 항목을 참조하세요.

## JSON 설정

### HTTP 테스트

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

### SSL 테스트

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

### DNS 테스트

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

### WebSocket 테스트

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

### TCP 테스트

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

### UDP 테스트

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

### ICMP 테스트

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

## 파이썬(Python) 클라이언트

### HTTP 테스트

{{< code-block lang="python" disable_copy="false" collapsible="true" >}}
import os
from dateutil.parser import parse as dateutil_parser
from datadog_api_client.v1 import ApiClient, ApiException, Configuration
from datadog_api_client.v1.api import synthetics_api
from datadog_api_client.v1.models import *
from pprint import pprint

// 지원하는 설정 파라미터의 모든 목록을 확인하려면 configuration.py를 참조하세요.
configuration = Configuration(
    host = "https://api.datadoghq.com",
    api_key= {"apiKeyAuth": "<YOUR_API_KEY>","appKeyAuth": "<YOUR_APPLICATION_KEY>"}
)

// API 클라이언트 인스턴스가 있는 컨텍스트에서 ApiClient 설정을 api_client로 설정합니다:
    // API 클래스 인스턴스를 생성합니다.
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
    )  # SyntheticsAPITest | 생성할 테스트 세부 정보.

    // 기본값이 설정되지 않은 필수값만 전달하는 예시
    try:
        // API 테스트 생성
        api_response = api_instance.create_synthetics_api_test(body)
        pprint(api_response)
    except ApiException as e:
        print("Exception when calling SyntheticsApi->create_synthetics_api_test: %s\n" % e)
{{< /code-block >}}

## Terraform

### API 테스트

`type`을 `api`로 설정한 [신서틱(Synthetic) 테스트 리소스][7]를 활용하여 Terraform을 통해 API 테스트를 생성 및 관리할 수 있습니다. 

### 프라이빗 위치

사용자 지정 위치 또는 보안 위치에서 신서틱(Synthetic) 테스트를 실행해야 하는 경우, [비공개 위치 리소스][3]를 사용하여 비공개 위치를 생성 및 관리하여 테스트를 실행할 수 있습니다. 자세한 내용을 확인하려면  [비공개 위치][4] 페이지를 참조하세요.

### 글로벌 및 로컬 변수

[신서틱 글로벌 변수 리소스][5]를 활용하여 테스트 간에 안전하게 공유할 수 있는 변수인 신서틱 글로벌 변수를 생성 및 관리할 수 있습니다. 신서틱(Synthetic) 테스트 리소스에서 [config_variable][9] 중첩 스키마를 `type = "text"`로 정의하여 테스트별 [내장 로컬 변수][8]를 생성할 수도 있습니다.

### 동시 실행 제한

[신서틱 동시 실행 제한 리소스][6]로 병렬 실행되는 신서틱(Synthetic) 테스트의 수를 제한할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/api/latest/synthetics/#create-an-api-test
[2]: https://www.terraform.io/
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_private_location
[4]: /ko/synthetics/private_locations
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_global_variable
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_concurrency_cap
[7]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
[8]: https://docs.datadoghq.com/ko/synthetics/api_tests/http_tests/?tab=requestoptions#create-local-variables
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test#nested-schema-for-config_variable