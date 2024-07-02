---
dependencies: []
disable_edit: true
title: 변수 이름에 표현 문제가 있는지 확인하기
---
## 메타데이터
**ID:** `python-inclusive/variable-name`

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
# 금지된 이름을 입력하면 허용 목록이 제안됩니다.
whitelist = "foo"
names_whitelist = "bla";

names_blacklist = "bla";

addr_master_ip = "5.4.3.8";
addr_slave_ip = "1.2.3.4";
```

## 규정 준수 코드 예
```python
# 이름에 문제가 없습니다.
snow_white = "happy"
```