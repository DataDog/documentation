---
dependencies: []
disable_edit: true
title: assertRaises의 경우 구체적인 예외인지 확인하기
---
## 메타데이터
**ID:** `python-best-practices/assertraises-specific-exception`

**언어:** 파이썬(Python)

**심각도:**경고

**범주:** 오류 가능성

## 설명
예외를 점검할 때 구체적인 예외를 점검하세요. `Exception`을 점검하면 프로그램의 올바른 동작 점검을 우회할 수 있습니다.

제네릭 예외를 사용하면 오류가 발생하고 정확성에 대한 잘못된 정보를 줄 수 있습니다. 예외를 점검할 올바른 예외를 사용하세요.

## 비준수 코드 예
```python
self.assertRaises(Exception, foo)  # check a specific Exception, not a generic one
```

## 준수 코드 예
```python
self.assertRaises(ValueError, foo)
```