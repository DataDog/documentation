---
dependencies: []
disable_edit: true
title: JsonResponse に content-type を指定しない
---
## メタデータ
**ID:** `python-django/jsonresponse-no-content-type`

**言語:** Python

**重大度:** Notice

**カテゴリー:** ベストプラクティス

## 説明
`JsonResponse` は既にレスポンスのコンテントタイプを設定しています。送信されるコンテントタイプを再定義しないでください。

## 非準拠コードの例
```python
import json

from django.http import HttpResponse

response_data = {}
response_data['result'] = 'error'
response_data['message'] = 'Some error message'
return JsonResponse(response_data, content_type="application/json")  # JsonResponse では content-type は必要ありません
```

## 準拠コードの例
```python
import json

from django.http import HttpResponse

response_data = {}
response_data['result'] = 'error'
response_data['message'] = 'Some error message'
return JsonResponse(response_data)  # JsonResponse では content-type は必要ありません
```