---
dependencies: []
disable_edit: true
title: 딕셔너리를 사용 중일 때는 수정하지 않기
---
## 메타데이터
**ID:** `python-best-practices/collection-while-iterating`

**언어:** 파이썬(Python)

**심각도:**오류

**범주:** 오류 가능성

## 설명
딕셔너리에서 반복하는 동안 딕셔너리를 업데이트하지 마세요. 딕셔너리를 업데이트하려면 기존 값에서 새 딕셔너리를 생성하세요.

## 비준수 코드 예
```python
i = 0
for element in my_list:
    my_list["stuff"] = i  # modifying a dictionary while iterating
    i += 1
```

## 준수 코드 예
```python
i = 0
new_list = {}
for element in my_list:
    new_list["stuff"] = i  # putting value to a new dictionary
    i += 1
```