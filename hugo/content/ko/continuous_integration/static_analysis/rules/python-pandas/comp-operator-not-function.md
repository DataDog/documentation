---
dependencies: []
disable_edit: true
title: 함수가 아닌 연산자를 사용하여 값 비교하기
---
## 메타데이터
**ID:** `python-pandas/comp-operator-not-function`

**언어:** 파이썬(Python)

**심각도:** 없음

**범주:** 모범 사례

## 설명
코드를 더 명확하게 하려면 함수 (`.ld`)대신 비교 연산자(`<`, `>` 등)를 사용해야 합니다.

## 규정 비준수 코드 예
```python
foo.le(bar)
```

## 규정 준수 코드 예
```python
foo < bar
```