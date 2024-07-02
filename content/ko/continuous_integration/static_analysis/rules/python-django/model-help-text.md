---
dependencies: []
disable_edit: true
title: help_text를 사용해 모델 열 문서화하기
---
## 메타데이터
**ID:** `python-django/model-help-text`

**언어:** 파이썬(Python)

**심각도:** 알림

**범주:** 모범 사례

## 설명
데이터베이스에서 사용되는 필드를 문서화하기 위해 `help_text`를 사용하세요.

#### 자세히 알아보기

 - [Django 설명서: `help_text`](https://docs.djangoproject.com/en/4.2/ref/models/fields/#help-text)

## 규정 비준수 코드 예
```python
class MyModel(models.Model):
  my_field = models.DateField()
  last_name = models.CharField(max_length=40)  # help_text를 추가하여 이 필드의 기능을 설명합니다.
```

## 규정 준수 코드 예
```python
class MyModel(models.Model):
  my_field = models.DateField(help_text = "Use format YYYY/MM/DD")
```