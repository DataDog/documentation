---
dependencies: []
disable_edit: true
title: if 조건에 코드 블록이 2개인지 확인하기
---
## 메타데이터
**ID:** `python-best-practices/condition-similar-block`

**언어:** 파이썬(Python)

**심각도:**경고

**범주:** 모범 사례

## 설명
`if` 조건 브랜치의 코드가 고유해야 합니다. 중복된 브랜치가 있는 경우 조건을 병합합니다.

## 비준수 코드 예
```python
if foo:
  printf("bar")
elif baz:
  printf("bar2")
elif bap:
  # same code than the if condition
  printf("bar")
else:
  # same code than the if condition
  printf("bar")
```

## 준수 코드 예
```python
if foo:
  printf("bar")
elif baz:
  printf("bar2")
elif bap:
  printf("bar3")
else:
  printf("bar4")
```