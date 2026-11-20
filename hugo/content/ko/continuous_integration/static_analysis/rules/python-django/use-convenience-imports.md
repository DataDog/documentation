---
dependencies: []
disable_edit: true
title: 가능하면 편리한 가져오기를 사용하세요.
---
## 메타데이터
**ID:** `python-django/use-convenience-imports`

**언어:** 파이썬(Python)

**심각도:** 알림

**범주:** 코드 스타일

## 설명
가능하면 Django에서 편리한 가져오기를 사용하세요.

## 비준수 코드 예
```python
from django.views.generic.base import View  # django.views를 사용하세요.
```

## 준수 코드 예
```python
from django.views import View
```