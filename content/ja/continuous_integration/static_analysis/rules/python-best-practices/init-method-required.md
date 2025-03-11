---
dependencies: []
disable_edit: true
title: クラスに __init__ メソッドがあることを確認する
---
## メタデータ
**ID:** `python-best-practices/init-method-required`

**言語:** Python

**重大度:** エラー

**カテゴリー:** ベストプラクティス

## 説明
クラスが `__init__` メソッドを持っていることを確認します。このチェックは、クラスがデータクラス (@dataclass でアノテーションされている) の場合はバイパスされます。

## 非準拠コードの例
```python
class Foo:  # __init__ を定義する必要があります
    def foo(bar):
        pass
    def bar(baz):
        pass
```

## 準拠コードの例
```python
class Foo(Bar):

  def foo():
      pass
```

```python
class UserLoginTest(TestCase):
    def setUp(self):
        self.username = 'testuser'
        self.password = 'testpassword'
        self.user = User.objects.create_user(username=self.username, password=self.password)

    def test_correct_credentials(self):
        user = authenticate(username=self.username, password=self.password)
        self.assertIsNotNone(user)
        self.assertEqual(user, self.user)

    def test_incorrect_credentials(self):
        user = authenticate(username=self.username, password='wrongpassword')
        self.assertIsNone(user)
```

```python
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
    ]
```

```python
@dataclass
class Foo:  # dataclass に __init__ は必要ありません
    value = 51
```

```python
class Foo:
    def __init__(self):
        pass
```