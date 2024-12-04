---
dependencies: []
disable_edit: true
title: 항상 Charfield에 최대 길이를 지정하십시오.
---
## 메타데이터
**ID:** `python-django/model-charfield-max-length`

**언어:** 파이썬(Python)

**심각도:** 경고

**범주:** 모범 사례

## 설명
`Charfield`에서 `max_length` 속성을 정의해 필드 최대 크기를 지정하세요.

## 규정 비준수 코드 예
```python
class Person(models.Model):
    first_name = models.CharField()  # 최대 길이를 정의하세요.
    last_name = models.CharField()  # 최대 길이를 정의하세요.
```

## 규정 준수 코드 예
```python
class Person(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=40)
```