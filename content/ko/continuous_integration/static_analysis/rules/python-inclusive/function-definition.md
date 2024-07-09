---
dependencies: []
disable_edit: true
title: 함수 이름에 표현 문제가 있는지 확인하기
---
## 메타데이터
**ID:** `python-inclusive/function-definition`

**언어:** 파이썬(Python)

**심각도:** 알림

**범주:** 코드 스타일

## 설명
코드베이스에서 일부 단어가 사용되지 않는지 확인하고 적절한 경우 교체를 제안합니다.

 대체 제안의 예:
 - `blacklist`를 `denylist`로 대체
 - `whitelist`를 `allowlist`로 대체
 - `master`를 `primary`로 대체
 - `slave`를 `secondary`로 대체

## 규정 비준수 코드 예
```python
# 문자열 끝에 위치한 블랙리스트
def foo_blacklist():
    pass
```

```python
# 대소문자가 혼합되어 있어도 블랙리스트라는 이름을 사용하지 마세요.
def BlaCKliSt_NaMeS():
    pass

def wHiTeLisT_NaMeS():
    pass
```

```python
# 함수 이름 시작 부분의 블랙리스트
def blacklist_names():
    pass
```

```python
# 함수 이름 및 파라미터에서의 잘못된 식별자
def blacklist_names(master, slave):
    pass
```

## 규정 준수 코드 예
```python
def foo_denylist():
    pass
```