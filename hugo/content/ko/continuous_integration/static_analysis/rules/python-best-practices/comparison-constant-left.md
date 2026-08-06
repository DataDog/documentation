---
dependencies: []
disable_edit: true
title: 비교에서 변수를 왼쪽에 넣기
---
## 메타데이터
**ID:** `python-best-practices/comparison-constant-left`

**언어:** 파이썬(Python)

**심각도:** 알림

**범주:** 모범 사례

## 설명
변수와 값을 비교하는 비교에서 비교 표현식의 왼쪽에 변수를 놓습니다

## 비준수 코드 예
```python
if 1 <= i:  # use i >= 1
  pass
```

```python
if 1.0 <= i:  # use i >= 1.0
  pass
```

## 준수 코드 예
```python
if i >= 1:
  pass

if 0 < nextSx <= len(subject):
    px = nextPx
    sx = nextSx
```