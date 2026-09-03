---
dependencies: []
disable_edit: true
title: クラス名はキャメルケースでなければならない
---
## メタデータ
**ID:** `python-code-style/class-name`

**言語:** Python

**重大度:** Notice

**カテゴリー:** Code Style

## 説明
クラス名は `CamelCase` であるべきで、`camelCase` や `snake_case` ではありません。

#### 詳細はこちら

 - [PEP8 スタイルガイド](https://peps.python.org/pep-0008/#descriptive-naming-styles)

## 非準拠コードの例
```python
class _runtimeMetricsStatus(type):
    pass
```

```python
class myClass(Parent):
    def __init__(self):
        pass


```

## 準拠コードの例
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