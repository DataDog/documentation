---
dependencies: []
disable_edit: true
title: 함수 인수에 할당하지 않기
---
## 메타데이터
**ID:** `python-best-practices/function-variable-argument-name`

**언어:** 파이썬(Python)

**심각도:**경고

**범주**: 모범 사례

## 설명
함수 파라미터는 읽기 전용으로 수정되어선 안 됩니다. 파라미터의 값을 수정하려면 함수 값을 반환하고 함수의 호출자에서 새로운 값을 처리합니다.

## 비준수 코드 예
```python
def func(arg1, arg2):
    arg1 = foo  # assign to a variable that is an argument
```

```python
def func(arg1, arg2):
    (arg1, arg3, arg2) = foo  # assign to a variable that is an argument
```

## 준수 코드 예
```python
def func(arg1, arg2):
    arg3 = foo
```