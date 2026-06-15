---
dependencies: []
disable_edit: true
title: __exit__ 과 __enter__ 가 모두 정의되었는지 확인하기
---
## 메타데이터
**ID:** `python-best-practices/ctx-manager-enter-exit-defined`

**언어:** 파이썬(Python)

**심각도:**오류

**범주:** 모범 사례

## 설명
메서드 `__enter__` 및 `__exit__`을 함께 선언해야 합니다. 한 메서드가 누락되면 양 메서드 모두가 정의되도록 해야 합니다.

#### 자세히 알아보기

 - [contextlib 설명서](https://docs.python.org/3/library/contextlib.html)

## 비준수 코드 예
```python
class Ctx:
    def __exit__(self, *exc):  # the method __enter__ should be defined.
        pass
```

```python
class Ctx:
    def __enter__(self):  # the method __exit__ should also be defined.
        pass
```

## 준수 코드 예
```python
class Ctx:
    def __enter__(self):
        pass
    def __exit__(self, *exc):
        pass
```