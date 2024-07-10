---
dependencies: []
disable_edit: true
title: NullBooleanField를 사용하지 마십시오.
---
## 메타데이터
**ID:** `python-django/no-null-boolean`

**언어:** 파이썬(Python)

**심각도:** 알림

**범주:** 모범 사례

## 설명
`NullBooleanField` 유형은 더 이상 사용되지 않습니다. 대신 `BooleanField`를 사용하세요.

## 규정 비준수 코드 예
```python
class Person(models.Model):
    is_adult = models.NullBooleanField()  # BooleanField를 사용하세요.

```

## 규정 준수 코드 예
```python
class Person(models.Model):
    is_adult = models.BooleanField(null=True)
```