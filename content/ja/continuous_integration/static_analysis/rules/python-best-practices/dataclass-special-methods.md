---
dependencies: []
disable_edit: true
title: データクラスで特別なメソッドを使用しない
---
## メタデータ
**ID:** `python-best-practices/dataclass-special-methods`

**言語:** Python

**重大度:** Notice

**カテゴリー:** ベストプラクティス

## 説明
データクラス (@dataclass でアノテーションされたクラス) は `__init__` や `__gt__` などの特別なメソッドを使用しません。

## 非準拠コードの例
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

    # __eq__ は使用しないでください
    def __eq__(self, other: _Leaf):
        return repr(self) == repr(other)

    def __repr__(self):
        return self.value
```

## 準拠コードの例
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