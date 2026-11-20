---
dependencies: []
disable_edit: true
title: JSON データを送信するには、HttpResponse の代わりに JsonResponse を使う
---
## メタデータ
**ID:** `python-django/http-response-with-json-dumps`

**言語:** Python

**重大度:** Notice

**カテゴリー:** ベストプラクティス

## 説明
JSON データを送信する場合は、`HttpResponse` の代わりに `JsonResponse` を使用します。

## 非準拠コードの例
```python
import json

from django.http import HttpResponse

response_data = {}
response_data['result'] = 'error'
response_data['message'] = 'Some error message'
return HttpResponse(json.dumps(response_data))  # JsonResponse を使用して JSON データを送信します

```

## 準拠コードの例
```python
import json

from django.http import HttpResponse

response_data = {}
response_data['result'] = 'error'
response_data['message'] = 'Some error message'
return JsonResponse(response_data)
```