---
dependencies: []
disable_edit: true
title: 같은 이름의 인수 없도록 하기
---
## 메타데이터
**ID:** `python-best-practices/argument-same-name`

**언어:** 파이썬(Python)

**심각도:**오류

**범주:** 오류 가능성

## 설명
함수 파라미터는 동일한 이름일 수 없습니다. 각 함수 파라미터에 고유한 이름을 사용해야 합니다.

## 비준수 코드 예
```python
def foo(bar, bar: int):  # use another name for the second argument
    pass
```

## 준수 코드 예
```python
def foo(bar, baz):
    pass
```