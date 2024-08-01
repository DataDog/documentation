---
dependencies: []
disable_edit: true
title: 함수는 200줄 미만이어야 함
---
## 메타데이터
**ID:** `python-code-style/max-function-lines`

**언어:** 파이썬(Python)

**심각도:** 오류

**범주:** 코드 스타일

## 설명
함수가 너무 길지 않도록 합니다. 함수는 100줄 미만이어야 합니다. 그렇지 않으면 너무 길어서 이해하기 어렵습니다.

## 비준수 코드 예
```python
def myfunction():
    foo()
    bar()





























































































































































































































    pass
```

## 준수 코드 예
```python
def myfunction(args):
    foo()
    bar()
    pass
```