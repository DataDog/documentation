---
dependencies: []
disable_edit: true
title: inplace=True를 사용하지 마십시오.
---
## 메타데이터
**ID:** `python-pandas/avoid-inplace`

**언어:** 파이썬(Python)

**심각도:** 경고

**범주:** 모범 사례

## 설명
`inplace=True`는 성능에 명확한 영향을 미치지 않고, 잠재적으로 위험하며, 정상적으로 작동하지 않으므로 사용하지 않는 것이 좋습니다.

#### 자세히 알아보기

 - [pandas inplace=True를 사용하지 말아야 하는 이유](https://towardsdatascience.com/why-you-should-probably-never-use-pandas-inplace-true-9f9f211849e4?gi=ae387a166946)

## 규정 비준수 코드 예
```python
df.drop(['a'], axis=1, inplace=True)
```

## 규정 준수 코드 예
```python
df.drop(['a'], axis=1, inplace=False)
```