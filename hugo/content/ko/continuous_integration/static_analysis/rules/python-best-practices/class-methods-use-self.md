---
dependencies: []
disable_edit: true
title: 클래스 메서드에서 self 사용하지 않기
---
## 메타데이터
**ID:** `python-best-practices/class-methods-use-self`

**언어:** 파이썬(Python)

**심각도:**오류

**범주:** 모범 사례

## 설명
클래스 메서드(클래스 메서드도 고정 메서드도 아닌)에서 첫 번째 인수는 관례적으로  `self`여야 합니다.

#### 자세히 알아보기

 - [파이썬(Python) 설명서의 메서드 개체](https://docs.python.org/3.8/tutorial/classes.html#method-objects)
 - [PEP8 스타일가이드](https://peps.python.org/pep-0008/#function-and-method-arguments)

## 비준수 코드 예
```python
class Foo:
    def bar(bar):  # use def bar(self) instead
        pass
```

## 준수 코드 예
```python
class Foo:
    @staticmethod
    def static_method(bar):
        pass

    @classmethod
    def class_method(bar):
        pass
```