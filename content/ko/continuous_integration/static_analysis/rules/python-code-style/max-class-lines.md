---
dependencies: []
disable_edit: true
title: 클래스는 100 줄 미만이어야 함
---
## 메타데이터
**ID:** `python-code-style/max-class-lines`

**언어:** 파이썬(Python)

**심각도:** 경고

**범주:** 코드 스타일

## 설명
클래스는 이해하기 쉽도록 100줄 미만으로 짧게 작성해야 합니다. 클래스 또는 함수가 100줄 이상인 경우 코드를 리팩터링하여 클래스가 100줄 미만이 되도록 해야 합니다.

## 비준수 코드 예
```python
class MyClass:
    def __init__(self):
        pass

































































































    def foo(self):
        pass
```

## 준수 코드 예
```python
class MyClass:
    def __init__(self):
        pass

    def foo(self):
        pass
```