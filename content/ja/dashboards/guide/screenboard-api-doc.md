---
title: スクリーンボード API ガイド
kind: ガイド
aliases:
  - /ja/graphing/faq/screenboard-api-doc
  - /ja/graphing/guide/screenboard-api-doc
---
<div class="alert alert-danger">
このエンドポイントは旧バージョンです。代わりに、 <a href="https://docs.datadoghq.com/api/v1/dashboards/">新しいダッシュボードエンドポイント</a>を使用してください。
</div>

`Screenboard` エンドポイントを使用すると、スクリーンボードをプログラムで作成、更新、削除、およびクエリできます。[スクリーンボードの詳細は、こちらを参照してください][1]。

## スクリーンボードの作成

### シグニチャ

`POST https://api.datadoghq.com/api/v1/screen`

### 引数

* **`board_title`** [必須]:
    ダッシュボードの名前。
* **`description`** [オプション、デフォルト = **None**]:
    ダッシュボードの内容の説明。
* **`widgets`** [必須]:
    ウィジェット定義のリスト。ウィジェット定義を取得するには、ウィジェット構成 UI で JSON タブを使用します。
* **`template_variables`** [オプション、デフォルト = **None**]:
    ダッシュボードのテンプレートを使用するためのテンプレート変数のリスト。
* **`read_only`** [オプション、デフォルト = **False**]:
    スクリーンボードの読み取り専用ステータス。

### 例

{{< tabs >}}
{{% tab "Python" %}}

```python
from datadog import initialize, api

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

initialize(**options)

board_title = "My Screenboard"
description = "An informative screenboard."
width = 1024
widgets = [{
    "type": "image",
    "height": 20,
    "width": 32,
    "y": 7,
    "x": 32,
    "url": "https://path/to/image.jpg"
}]
template_variables = [{
    "name": "host1",
    "prefix": "host",
    "default": "host:my-host"
}]

api.Screenboard.create(board_title=board_title,
                       description=description,
                       widgets=widgets,
                       template_variables=template_variables,
                       width=width)

```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'rubygems'
require 'dogapi'

api_key='<DATADOG_API_KEY>'
app_key='<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

board = {
    "width" => 1024,
    "height" => 768,
    "board_title" => "dogapi test",
    "widgets" => [
        {
          "type" => "image",
          "height" => 20,
          "width" => 32,
          "y" => 7,
          "x" => 32,
          "url" => "https://path/to/image.jpg"
        }
    ]
}

result = dog.create_screenboard(board)
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<DATADOG_API_KEY>
app_key=<DATADOG_APPLICATION_KEY>

curl -X POST -H "Content-type: application/json" \
-d '{
        "width": 1024,
        "height": 768,
        "board_title": "dogapi test",
        "widgets": [
            {
              "type": "image",
              "height": 20,
              "width": 32,
              "y": 7,
              "x": 32,
              "url": "https://path/to/image.jpg"
            }
        ]
}' \
"https://api.datadoghq.com/api/v1/screen?api_key=${DD_CLIENT_API_KEY}&application_key=${DD_CLIENT_APP_KEY}"
```

{{% /tab %}}
{{< /tabs >}}

## スクリーンボードの更新

### シグニチャ

`PUT https://api.datadoghq.com/api/v1/screen/<SCREEENBOARD_ID>`

### 引数

* **`board_title`** [必須]:
    ダッシュボードの名前。
* **`description`** [オプション、デフォルト = **None**]:
    ダッシュボードの内容の説明。
* **`widgets`** [必須]:
    ウィジェット定義のリスト。ウィジェット定義を取得するには、ウィジェット構成 UI で JSON タブを使用します。
* **`template_variables`** [オプション、デフォルト = **None**]:
    ダッシュボードのテンプレートを使用するためのテンプレート変数のリスト。
* **`width`** [オプション、デフォルト = **None**]:
    スクリーンボードの幅 (ピクセル単位)。
* **`height`** [オプション、デフォルト = **None**]:
    スクリーンボードの高さ (ピクセル単位)。
* **`read_only`** [オプション、デフォルト = **False**]:
    スクリーンボードの読み取り専用ステータス。

### 例

{{< tabs >}}
{{% tab "Python" %}}

```python
from datadog import initialize, api

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

initialize(**options)
board_id = 2551
board_title = "My Screenboard"
description = "An informative screenboard."
width = 1024
widgets = [{
    "type": "image",
    "height": 20,
    "width": 32,
    "y": 7,
    "x": 32,
    "url": "https://path/to/image.jpg"
}]
template_variables = [{
    "name": "host1",
    "prefix": "host",
    "default": "host:my-host"
}]

api.Screenboard.update(board_id,
                       board_title=board_title,
                       description=description,
                       widgets=widgets,
                       template_variables=template_variables,
                       width=width)

```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'rubygems'
require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

board_id = 7953
board = {
    "width" => 1024,
    "height" => 768,
    "board_title" => "dogapi test",
    "widgets" => [{
        "type" => "image",
        "height" => 20,
        "width" => 32,
        "y" => 7,
        "x" => 32,
        "url" => "https://path/to/image.jpg"
    }]
}

result = dog.update_screenboard(board_id, board)
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<DATADOG_API_KEY>
app_key=<DATADOG_APPLICATION_KEY>

curl -X PUT -H "Content-type: application/json" \
-d '{
        "width": 1024,
        "height": 768,
        "board_title": "dogapi test",
        "widgets": [
            {
              "type": "image",
              "height": 20,
              "width": 32,
              "y": 7,
              "x": 32,
              "url": "https://path/to/image.jpg"
            }
        ]
}' \
"https://api.datadoghq.com/api/v1/screen/${board_id}?api_key=${DD_CLIENT_API_KEY}&application_key=${DD_CLIENT_APP_KEY}"

```

{{% /tab %}}
{{< /tabs >}}

## スクリーンボードの削除

既存の[スクリーンボード][1]を削除します。
*このエンドポイントは、JSON 引数を受け取りません。*

### シグニチャ

`DELETE https://api.datadoghq.com/api/v1/screen/<SCREEENBOARD_ID>`

### 引数

このエンドポイントは、JSON 引数を受け取りません。

### 例

{{< tabs >}}
{{% tab "Python" %}}

```python
from datadog import initialize, api

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

initialize(**options)

api.Screenboard.delete(811)

```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'rubygems'
require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

board_id = '2534'
result = dog.delete_screenboard(board_id)
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<DATADOG_API_KEY>
app_key=<DATADOG_APPLICATION_KEY>
board_id=2471

# 削除するスクリーンボードを作成
board_id=$(curl -X POST -H "Content-type: application/json" \
-d '{
        "width": 1024,
        "height": 768,
        "board_title": "dogapi tests",
        "widgets": [
            {
              "type": "image",
              "height": 20,
              "width": 32,
              "y": 7,
              "x": 32,
              "url": "https://path/to/image.jpg"
            }
        ]
  }' \
"https://api.datadoghq.com/api/v1/screen?api_key=${DD_CLIENT_API_KEY}&application_key=${DD_CLIENT_APP_KEY}" | jq '.id')

curl -X DELETE \
"https://api.datadoghq.com/api/v1/screen/${board_id}?api_key=${DD_CLIENT_API_KEY}&application_key=${DD_CLIENT_APP_KEY}"
```

{{% /tab %}}
{{< /tabs >}}

## スクリーンボードの取得

既存のスクリーンボードの定義を取得します。

### シグニチャ

`GET https://api.datadoghq.com/api/v1/screen/<SCREEENBOARD_ID>`

### 引数

このエンドポイントは、JSON 引数を受け取りません。

### 例

{{< tabs >}}
{{% tab "Python" %}}

```python
from datadog import initialize, api

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

initialize(**options)

api.Screenboard.get(811)
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'rubygems'
require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

board_id = '6334'
result = dog.get_screenboard(board_id)
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<DATADOG_API_KEY>
app_key=<DATADOG_APPLICATION_KEY>
board_id=6334

# 取得するスクリーンボードを作成
board_id=$(curl -X POST -H "Content-type: application/json" \
-d '{
        "width": 1024,
        "height": 768,
        "board_title": "dogapi tests",
        "widgets": [
            {
              "type": "image",
              "height": 20,
              "width": 32,
              "y": 7,
              "x": 32,
              "url": "https://path/to/image.jpg"
            }
        ]
  }' \
"https://api.datadoghq.com/api/v1/screen?api_key=${DD_CLIENT_API_KEY}&application_key=${DD_CLIENT_APP_KEY}" | jq '.id')

curl -X GET \
"https://api.datadoghq.com/api/v1/screen/${board_id}?api_key=${DD_CLIENT_API_KEY}&application_key=${DD_CLIENT_APP_KEY}"
```

{{% /tab %}}
{{< /tabs >}}

## すべてのスクリーンボードの取得

[スクリーンボード][1]の定義をすべて取得します。

### シグニチャ

`GET https://api.datadoghq.com/api/v1/screen`

### 引数

このエンドポイントは、JSON 引数を受け取りません。

### 例

{{< tabs >}}
{{% tab "Python" %}}

```python
from datadog import initialize, api

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

initialize(**options)

api.Screenboard.get_all()

```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'rubygems'
require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

result = dog.get_all_screenboards()
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<DATADOG_API_KEY>
app_key=<DATADOG_APPLICATION_KEY>

curl -X GET "https://api.datadoghq.com/api/v1/screen?api_key=${DD_CLIENT_API_KEY}&application_key=${DD_CLIENT_APP_KEY}"
```

{{% /tab %}}
{{< /tabs >}}

[1]: /ja/dashboards/screenboard/