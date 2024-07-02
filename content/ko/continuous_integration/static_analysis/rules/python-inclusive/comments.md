---
dependencies: []
disable_edit: true
title: 코멘트에 표현 문제가 있는지 확인하기
---
## 메타데이터
**ID:** `python-inclusive/comments`

**언어:** 파이썬(Python)

**심각도:** 알림

**범주:** 코드 스타일

## 설명
변수 이름을 확인하고 더 나은 이름을 제안합니다.

 대체 제안의 예:

-   `blacklist`를 `denylist`로 대체
-   `whitelist`를 `allowlist`로 대체
-   `master`를 `primary`로 대체
-   `slave`를 `secondary`로 대체

## 규정 비준수 코드 예
```python
# 무단 사용을 방지하기 위한 화이트리스트 이름 지정
def filter_names(names):
    pass

# 그녀는 자신의 코드를 확인해야 합니다.
def new_function_from_helen():
    pass


class Foo:
    # 그는 자신의 코드를 확인해야 합니다.
    def new_function_from_joe():
        pass
```

## 규정 준수 코드 예
```python
# 무단 사용을 방지하는 허용 목록 이름
def filter_names(names):
    pass

# 코멘트에 문제가 발생한 이력이 없는 경우
def foo(bar):
    baz()
```