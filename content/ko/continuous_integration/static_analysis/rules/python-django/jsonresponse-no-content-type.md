---
dependencies: []
disable_edit: true
title: JsonResponse에 콘텐츠 유형을 지정하지 마십시오.
---
## 메타데이터
**ID:** `python-django/jsonresponse-no-content-type`

**언어:** 파이썬(Python)

**심각도:** 알림

**범주:** 모범 사례

## 설명
`JsonResponse`에서 이미 응답 콘텐츠 유형을 설정하고 있으므로 전송되는 콘텐츠 유형을 재정의하지 마세요.

## 규정 비준수 코드 예
```python
import json

from django.http import HttpResponse

response_data = {}
response_data['result'] = 'error'
response_data['message'] = 'Some error message'
return JsonResponse(response_data, content_type="application/json")  # 콘텐츠 유형은 JsonResponse에 필요하지 않습니다.
```

## 규정 준수 코드 예
```python
import json

from django.http import HttpResponse

response_data = {}
response_data['result'] = 'error'
response_data['message'] = 'Some error message'
return JsonResponse(response_data)  # 콘텐츠 유형은 JsonResponse에 필요하지 않습니다.
```