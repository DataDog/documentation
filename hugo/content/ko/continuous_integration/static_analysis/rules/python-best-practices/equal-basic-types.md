---
dependencies: []
disable_edit: true
title: equal을 사용할 때 기본 유형이 일치하는지 확인하기
---
## 메타데이터
**ID:** `python-best-practices/equal-basic-types`

**언어:** 파이썬(Python)

**심각도:**경고

**범주:** 오류 가능성

## 설명
기본 유형(문자열, 정수, 부동 소수점) 비교 시 항상 동일한 유형 값을 사용해야 합니다.

## 비준수 코드 예
```python
1 == "1"  # Comparing an integer and a string
1.0 == "foo"  # Comparing a float and a string
```

## 준수 코드 예
```python
1 == 1
"abc" == "def"
a == 1
a == b
```