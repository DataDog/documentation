---
dependencies: []
disable_edit: true
title: ix보다는 iloc 또는 loc 선호
---
## 메타데이터
**ID:** `python-pandas/loc-not-ix`

**언어:** 파이썬(Python)

**심각도:** 없음

**범주:** 모범 사례

## 설명
함수 `notna`와 `notnull`은 비슷하나, 다른 메서드에서도 같은 이름 패턴을 사용하기 때문에 `notna`를 사용하는 것이 좋습니다.

## 규정 비준수 코드 예
```python
index = df.iat[:, 1:3]
```

```python
index = df.at[:, ['B', 'A']]
```

```python
s = df.ix[[0, 2], 'A']
```

## 규정 준수 코드 예
```python
new_df = df.iloc[]
```