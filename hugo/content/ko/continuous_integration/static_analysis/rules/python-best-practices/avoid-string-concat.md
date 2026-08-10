---
dependencies: []
disable_edit: true
title: 문자열 연결 피하기
---
## 메타데이터
**ID:** `python-best-practices/avoid-string-concat`

**언어:** 파이썬(Python)

**심각도:**경고

**범주:** 성능

## 설명
여러 문자열의 연속은 효율적이지 않고 코드를 읽고 이해하기 어렵게 만듭니다.

여러 문자열을 연속적으로 나열하는 대신 f-문자열 또는 형식 문자열을 사용합니다.

#### 자세히 알아보기

 - [파이썬(Python) 설명서: `str.format()`](https://docs.python.org/3/library/stdtypes.html#str.format)
 - [파이썬(Python) 설명서 - f-문자열](https://docs.python.org/3/reference/lexical_analysis.html#f-strings)

## 비준수 코드 예
```python
"my" + awesome + "string"
plop = "super" + "awesome" + "text"
```

## 준수 코드 예
```python
"my {0} string".format(awesome)
f"my {awesome} string"
plop = "superawesometext"

function(
    tags = (
    user_tags
    + s.get("tags", [])
    + [
        f"schedule_id:{s['_id']}",
        f"schedule_name:{s['schedule_name']}",
        f"git_ref:{schedule_git_ref}",
    ]
)
)
```