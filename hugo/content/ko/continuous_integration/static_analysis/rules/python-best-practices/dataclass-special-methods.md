---
dependencies: []
disable_edit: true
title: 데이터 클래스에 특별 메서드 사용하지 않기
---
## 메타데이터
**ID:** `python-best-practices/dataclass-special-methods`

**언어:** 파이썬(Python)

**심각도:** 알림

**범주:** 모범 사례

## 설명
데이터 등급(@dataclass 주석이 있음)은 `__init__`, `__gt__` 등 특별한 메서드를 사용하지 않습니다.

## 비준수 코드 예
```python
@dataclass
class _Leaf(Generic[T]):
    parent: _Leaf
    value: T

    def __init__(self, value: Optional[T] = None):
        self.value = value
        self.parent = self

    def update(self, value: T):
        self.value = value
        return self

    def __lt__(self, other: _Leaf):
        return repr(self) < repr(other)

    def __gt__(self, other: _Leaf):
        return repr(self) > repr(other)

    # __eq__ should not be used
    def __eq__(self, other: _Leaf):
        return repr(self) == repr(other)

    def __repr__(self):
        return self.value
```

## 준수 코드 예
```python
@dataclass
class _Leaf(Generic[T]):
    parent: _Leaf
    value: T

    def update(self, value: T):
        self.value = value
        return self

    def __repr__(self):
        return self.value
```