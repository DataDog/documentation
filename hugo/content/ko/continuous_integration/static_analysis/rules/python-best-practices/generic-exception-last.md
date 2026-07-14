---
dependencies: []
disable_edit: true
title: 제네릭 예외처리를 사용할 경우 마지막에 넣기
---
## 메타데이터
**ID:** `python-best-practices/generic-exception-last`

**언어:** 파이썬(Python)

**심각도:** 알림

**범주**: 모범 사례

## 설명
여러 예외를 찾을 때 제네릭 `Exception`을 맨 마지막으로 찾아야 합니다. `Exception`은 매우 포괄적이므로 특정 예외 앞에 놓으면 모든 예외를 찾으며, 특정 예외 핸들러는 찾지 않습니다.

이러한 이유로 제네릭 `Exception`은 특정 예외 핸들러가 트리거 및 실행될 수 있도록 마지막에 처리되어야 합니다.

#### 자세히 알아보기

- [오류에 대한 파이썬(Python) 튜토리얼](https://docs.python.org/3/tutorial/errors.html)

## 비준수 코드 예
```python
try:
    pass
except Exception:
    pass
except FileNotFound as e:
    pass
```

## 준수 코드 예
```python
try:
    pass
except MyError:
    pass
except Exception as e:
    pass
```

```python
try:
    pass
except MyError:
    pass
except FileNotFound as e:
    pass
```