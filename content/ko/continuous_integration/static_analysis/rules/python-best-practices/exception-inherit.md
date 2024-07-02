---
dependencies: []
disable_edit: true
title: exception이 기본 exception 하위에 있는지 확인하기
---
## 메타데이터
**ID:** `python-best-practices/exception-inherit`

**언어:** 파이썬(Python)

**심각도:**경고

**범주:** 모범 사례

## 설명
새 `Exception`은 기본 `Exception`을 상속합니다. 항상 상위로 또 다른 예외를 사용하거나 최소 `Exception` 기본 등급에서 사용하세요.

#### 자세히 알아보기

- [파이썬 설명서: 사용자 정의 예외](https://docs.python.org/3/tutorial/errors.html#user-defined-exceptions)

## 비준수 코드 예
```python
class CustomException:
    """An Invalid exception class."""
```

## 준수 코드 예
```python
class CustomException(Exception):
    """An Invalid exception class."""
```