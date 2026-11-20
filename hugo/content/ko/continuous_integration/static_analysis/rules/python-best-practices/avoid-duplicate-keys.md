---
dependencies: []
disable_edit: true
title: 사전에서 중복 키 피하기
---
## 메타데이터
**ID:** `python-best-practices/avoid-duplicate-keys`

**언어:** 파이썬(Python)

**심각도:**경고

**범주:** 모범 사례

## 설명
딕셔너리의 키는 고유해야 합니다.

## 비준수 코드 예
```python
dict = {
  "key1": "key2",
  "key2": "key3",
  "key3": "key4",
  "key1": "bla"
}

```

## 준수 코드 예
```python
dict = {
  "key1": "key2",
  "key2": "key3",
  "key3": "key4",
}

```