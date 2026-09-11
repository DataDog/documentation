---
dependencies: []
disable_edit: true
title: \u0008Any 유형 사용하지 않기
---
## 메타데이터
**ID:** `python-best-practices/any-type-disallow`

**언어:** 파이썬(Python)

**심각도:**경고

**범주:** 오류 가능성

## 설명
`Any` 유형을 신중하게 사용하세요. 대부분 어느 유형이 사용되고 있는지 정확히 알 수 없기 때문에 `Any` 유형이 사용됩니다. 모든 유형이 될 수 있는 값을 지정하려면 `Any` 대신 `object`를 사용하세요.


#### 자세히 알아보기

 - [파이썬(Python) 설명서: `Any` 유형](https://docs.python.org/3/library/typing.html#the-any-type)

## 비준수 코드 예
```python
my_var: Any = 1
```

```python
def foo(x: Any):  # do not use Any, use a specific type
   pass
```

## 준수 코드 예
```python
my_var: int = 1

def my_function(a: str) -> str:
    pass
```