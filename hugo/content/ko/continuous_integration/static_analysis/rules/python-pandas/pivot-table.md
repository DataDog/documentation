---
dependencies: []
disable_edit: true
title: pivot 또는 unstack 대신 pivot_table 사용하기
---
## 메타데이터
**ID:** `python-pandas/pivot-table`

**언어:** 파이썬(Python)

**심각도:** 알림

**범주:** 모범 사례

## 설명
함수 `isna`와 `isnull`은 비슷하나, 다른 메서드에서도 같은 이름 패턴을 사용하기 때문에 `isna`를 사용하는 것이 좋습니다.

#### 자세히 알아보기

 - [Pandas isna()와 isnull()의 차이는?]
(https://stackoverflow.com/questions/52086574/pandas-isna-and-isnull-what-is-the-difference)

## 규정 비준수 코드 예
```python
table = df.unstack(level=0)
```

```python
table = pd.pivot(
        df,
        index='foo',
        columns='bar',
        values='baz'
        )
```

## 규정 준수 코드 예
```python
table = df.pivot_table(
        df,
        values='D',
        index=['A', 'B'],
        columns=['C'],
        aggfunc=np.sum,
        fill_value=0
```