---
dependencies: []
disable_edit: true
title: 클래스 이름은 CamelCase이어야 함
---
## 메타데이터
**ID:** `python-code-style/class-name`

**언어:** 파이썬(Python)

**심각도:** 알림

**범주:** 코드 스타일

## 설명
클래스 이름은 `camelCase`나 `snake_case`가 아닌 `CamelCase`여야 합니다.

#### 자세히 알아보기

 - [PEP8 스타일 가이드](https://peps.python.org/pep-0008/#descriptive-naming-styles)

## 비준수 코드 예
```python
class _runtimeMetricsStatus(type):
    pass
```

```python
class myClass(Parent):
    def __init__(self):
        pass


```

## 준수 코드 예
```python
class REQUESTS_MODE(IntEnum):
    AGENTLESS_EVENTS = 0
    EVP_PROXY_EVENTS = 1
```

```python
class _RuntimeMetricsStatus(type):
    pass
```

```python
class Migration(migrations.Migration):

    dependencies = [
        ('tweets', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='tweet',
            name='parent',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='replies', to='tweets.tweet'),
        ),
        migrations.DeleteModel(
            name='Reply',
        ),
    ]
```

```python
class MyClass(Parent):
    def __init__(self):
        pass

class TestRestapiV4Lock(FunctionalTestController):
    pass

class TestS3Storage(TestCase):
    pass


class TestS35Storage(TestCase):
    pass



class TestS35Storage(TestCase):
    pass

```