---
dependencies: []
disable_edit: true
title: JSON 데이터를 전송할 때 HttpResponse 대신 JsonResponse 사용하기
---
## 메타데이터
**ID:** `python-django/http-response-with-json-dumps`

**언어:** 파이썬(Python)

**심각도:** 알림

**범주:** 모범 사례

## 설명
JSON 데이터를 전송할 때 `HttpResponse` 대신 `JsonResponse`를 사용하세요.

## 규정 비준수 코드 예
```python
import json

from django.http import HttpResponse

response_data = {}
response_data['result'] = 'error'
response_data['message'] = 'Some error message'
return HttpResponse(json.dumps(response_data))  # JSON 데이터 전송을 위해 JsonResponse 사용

```

## 규정 준수 코드 예
```python
import json

from django.http import HttpResponse

response_data = {}
response_data['result'] = 'error'
response_data['message'] = 'Some error message'
return JsonResponse(response_data)
```