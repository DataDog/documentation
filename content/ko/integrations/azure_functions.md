---
app_id: azure_functions
categories:
- azure
- 클라우드
- 프로비저닝
custom_kind: 통합
description: 주요  Azure Functions 메트릭을 추적하세요.
title: Microsoft Azure Functions
---
## 개요

Azure Functions는 복잡한 오케스트레이션 문제도 해결할 수 있는 이벤트 기반 서버리스 컴퓨팅 플랫폼입니다. 추가 설정 없이 로컬에서 빌드 및 디버깅하고, 클라우드에서 대규모로 배포 및 운영하며, 트리거 및 바인딩을 사용하여 서비스를 통합할 수 있습니다.

 Azure Functions에서 메트릭을 가져오면 다음을 수행할 수 있습니다.

- 함수 성능과 사용률 시각화
-  Azure Functions 성능과 나머지 앱 간의 상관 관계 파악.

## 설정

### 설치

If you haven't already, set up the [Microsoft Azure integration](https://docs.datadoghq.com/integrations/azure/) first. There are no other installation steps.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **azure.functions.average_memory_working_set** <br>(gauge) | Average memory working set<br>_Shown as byte_ |
| **azure.functions.average_response_time** <br>(gauge) | The average time taken for the app to serve requests, in seconds.<br>_Shown as second_ |
| **azure.functions.bytes_received** <br>(gauge) | Data In<br>_Shown as byte_ |
| **azure.functions.bytes_sent** <br>(gauge) | Data Out<br>_Shown as byte_ |
| **azure.functions.connections** <br>(gauge) | Connections<br>_Shown as connection_ |
| **azure.functions.current_assemblies** <br>(gauge) | Current Assemblies|
| **azure.functions.function_execution_count** <br>(count) | Function Execution Count|
| **azure.functions.function_execution_units** <br>(count) | Function Execution Units|
| **azure.functions.function_execution_units.max** <br>(count) | Maximum Function Execution Units (Max Aggregated)|
| **azure.functions.gen_0_garbage_collections** <br>(gauge) | Gen 0 Garbage Collections|
| **azure.functions.gen_1_garbage_collections** <br>(gauge) | Gen 1 Garbage Collections|
| **azure.functions.gen_2_garbage_collections** <br>(gauge) | Gen 2 Garbage Collections|
| **azure.functions.handle_count** <br>(count) | Handle Count|
| **azure.functions.http101** <br>(count) | The count of requests resulting in an HTTP status code 101.|
| **azure.functions.http2xx** <br>(count) | The count of requests resulting in an HTTP status code = 200 but \< 300.|
| **azure.functions.http3xx** <br>(count) | The count of requests resulting in an HTTP status code = 300 but \< 400.|
| **azure.functions.http401** <br>(count) | The count of requests resulting in HTTP 401 status code.|
| **azure.functions.http403** <br>(count) | The count of requests resulting in HTTP 403 status code.|
| **azure.functions.http404** <br>(count) | The count of requests resulting in HTTP 404 status code.|
| **azure.functions.http406** <br>(count) | The count of requests resulting in HTTP 406 status code.|
| **azure.functions.http4xx** <br>(count) | The count of requests resulting in an HTTP status code = 400 but \< 500.|
| **azure.functions.http5xx** <br>(count) | Http Server Errors|
| **azure.functions.io_other_bytes_per_second** <br>(rate) | IO Other Bytes Per Second<br>_Shown as byte_ |
| **azure.functions.io_other_operations_per_second** <br>(rate) | IO Other Operations Per Second|
| **azure.functions.io_read_bytes_per_second** <br>(rate) | IO Read Bytes Per Second<br>_Shown as byte_ |
| **azure.functions.io_read_operations_per_second** <br>(rate) | IO Read Operations Per Second|
| **azure.functions.io_write_bytes_per_second** <br>(rate) | IO Write Bytes Per Second<br>_Shown as byte_ |
| **azure.functions.io_write_operations_per_second** <br>(rate) | IO Write Operations Per Second|
| **azure.functions.memory_working_set** <br>(gauge) | Memory working set<br>_Shown as byte_ |
| **azure.functions.private_bytes** <br>(gauge) | Private Bytes<br>_Shown as byte_ |
| **azure.functions.requests_in_application_queue** <br>(count) | Requests In Application Queue<br>_Shown as request_ |
| **azure.functions.thread_count** <br>(count) | Thread Count|
| **azure.functions.total_app_domains** <br>(gauge) | Total App Domains|
| **azure.functions.total_app_domains_unloaded** <br>(gauge) | Total App Domains Unloaded|
| **azure.functions.file_system_usage** <br>(gauge) | Percentage of filesystem quota consumed by the app.<br>_Shown as byte_ |
| **azure.functions.health_check_status** <br>(gauge) | Health check status.|
| **azure.functions.response_time** <br>(gauge) | The time taken for the app to serve requests, in seconds.<br>_Shown as second_ |
| **azure.functions.requests** <br>(count) | The total number of requests regardless of their resulting HTTP status code.|
| **azure.functions.count** <br>(gauge) | The count of azure functions resources|

### 이벤트

Azure Functions 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검

Azure Functions 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.