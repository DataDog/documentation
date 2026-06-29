---
dependencies: []
disable_edit: true
title: TODO 및 FIXME 코멘트에 소유권이 있도록 하기
---
## 메타데이터
**ID:** `python-best-practices/comment-fixme-todo-ownership`

**언어:** 파이썬(Python)

**심각도:** 알림

**범주:** 모범 사례

## 설명
`TODO` 또는 `FIXME`을 사용하는 경우, 주석을 작성하는 사람을 정합니다. 모범 사례는 주석을 생성한 사람에 대한 알림을 받고 이 이슈에 대한 잠재적 컨텍스트와 정보를 확보하는 것입니다.

## 비준수 코드 예
```python
# TODO fix this function
def my_function():
    pass

# FIXME fix this function
def my_function():
    pass
```

## 준수 코드 예
```python
# TODO(bob) fix this function
def my_function():
    pass

# FIXME(julien) fix this function
def my_other_function():
    pass
```