---
dependencies: []
disable_edit: true
title: 함수가 한 번만 정의되었는지 확인하기
---
## 메타데이터
**ID:** `python-best-practices/function-already-exists`

**언어:** 파이썬(Python)

**심각도:**오류

**범주:** 오류 가능성

## 설명
함수는 한 번만 정의되어야 합니다. 모듈의 각 함수에 고유한 이름을 사용하고 있는지 확인하세요.

## 비준수 코드 예
```python

def my_function():
  pass

def foo():
  pass

def my_function(): # function already defined
  pass

```

## 준수 코드 예
```python

def my_function():
  pass

def foo():
  pass

def my_other_function():
  pass

```