---
dependencies: []
disable_edit: true
title: 함수는 100줄 미만이어야 함
---
## 메타데이터
**ID:** `python-design/function-too-long`

**언어:** 파이썬(Python)

**심각도:** 경고

**범주:** 모범 사례

## 설명
함수는 이해하기 쉽고 유지 관리하기 쉽도록 짧아야 합니다. 100줄이 넘는 함수는 경고를 트리거하므로 더 작은 코드 단위로 리팩터링해야 합니다.

## 비준수 코드 예
```python
def myfunc():  # 함수가 너무 깁니다.




































































































  pass
```

## 준수 코드 예
```python
def myfunc():
  pass
```