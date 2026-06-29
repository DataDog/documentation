---
dependencies: []
disable_edit: true
title: __unicode__를 사용하지 마십시오.
---
## 메타데이터
**ID:** `python-django/no-unicode-on-models`

**언어:** 파이썬(Python)

**심각도:** 경고

**범주:** 모범 사례

## 설명
Django 모델에서 `__unicode__`를 사용하지 마세요. `__unicode__` 필드는 Python 2에서 사용됩니다. 대신 `__str__`을 사용하세요. `__str__`는 Python 3에서 사용됩니다.

## 규정 비준수 코드 예
```python
class Person(models.Model):

    def __unicode__(self):  # __unicode__를 정의하지 마시고, __str__을 정의하세요.
       pass
```

## 규정 준수 코드 예
```python
class Person(models.Model):

    def __str__(self):
       "person"
```