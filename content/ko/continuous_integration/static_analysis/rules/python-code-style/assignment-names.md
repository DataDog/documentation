---
dependencies: []
disable_edit: true
title: 변수 이름은 snake_case이어야 함
---
## 메타데이터
**ID:** `python-code-style/assignment-names`

**언어:** 파이썬(Python)

**심각도:** 오류

**범주:** 코드 스타일

## 설명
변수 이름에 `camelCase`가 아닌 `snake_case`를 사용해야 합니다.

#### 자세히 알아보기

- [PEP8 - 명명 스타일](https://peps.python.org/pep-0008/#descriptive-naming-styles)

## 비준수 코드 예
```python
fooBar = foobar()
```

```python
firstVariable, secondVariable = functioncall()
```

## 준수 코드 예
```python
hello = 1
```

```python
fooBAr = foobar()
```