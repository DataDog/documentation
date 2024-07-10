---
dependencies: []
disable_edit: true
title: 함수 이름과 파라미터에는 snake_case를 사용해야 함
---
## 메타데이터
**ID:** `python-code-style/function-naming`

**언어:** 파이썬(Python)

**심각도:** 알림

**범주:** 코드 스타일

## 설명
함수에 반드시 `snake_case`를 사용하세요.

이 규칙은 테스트 파일 (접두사가 `test_` 또는 접미사가`_test.py`)에서 유효하지 않습니다. 왜냐하면 testing은 `tearDown`, `setUp` 등의 카멜 케이스 방식을 필요로 하기 때문입니다.

#### 자세히 알아보기

 - [Python 설명서 테스팅: `setUp()`](https://docs.python.org/3/library/unittest.html#unittest.TestCase.setUp)

## 비준수 코드 예
```python
def my_function(myParameter, otherParameter):
  pass
```

```python
def myFunction(arg1, arg2):
  pass

def myOtherFunction():
  pass
```

## 준수 코드 예
```python
# 많은 테스트 프레임워크에서 사용되는 이름입니다. 경고하지 마십시오.
def tearDown(self):
    """각 테스트 케이스가 끝나면 더미 트레이서를 재설정하고 제거합니다."""
    super(TracerTestCase, self).tearDown()
```

```python
class TestModel(unittest.TestCase):
    def setUp(self):  # 파일 model_test.py에서 사용되며 setUp 및 tearDown 규칙을 건너 뜁니다.
        pass

    def tearDown(self):  # 파일 model_test.py에서 사용되며 setUp 및 tearDown 규칙을 건너 뜁니다.
        pass

    def test_violation_category(self):
        self.assertEqual(ViolationCategory.BEST_PRACTICE.value, 1)
        self.assertEqual(ViolationCategory.DESIGN.value, 2)
        v1 = Violation("bla", 1, "description", 2, ViolationCategory.BEST_PRACTICE, 10, "notool")
        self.assertEqual(v1.get_category_string(), "Best Practices")
        v1 = Violation("bla", 1, "description", 2, 1, 10, "notool")
        self.assertEqual(v1.get_category_string(), "Unknown")
```