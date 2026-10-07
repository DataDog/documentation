---
dependencies: []
disable_edit: true
title: isnull 대신 isna 사용하기
---
## 메타데이터
**ID:** `python-pandas/isna-instead-of-isnull`

**언어:** 파이썬(Python)

**심각도:** 알림

**범주:** 모범 사례

## 설명
함수 `isna`와 `isnull`은 비슷합니다. 그러나 다른 방법도 동일한 명명 패턴을 사용하므로 `isna`를 사용하는 것이 가장 좋습니다.

#### 자세히 알아보기

 - [Pandas isna()와 isnull()의 차이는?]
(https://stackoverflow.com/questions/52086574/pandas-isna-and-isnull-what-is-the-difference)

## 규정 비준수 코드 예
```python
nulls = pd.isnull(val)  # isna 사용 선호
```

## 규정 준수 코드 예
```python
nas = pd.isna(val)
```