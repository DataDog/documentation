---
title: タイムボード API ガイド
kind: ガイド
aliases:
  - /ja/graphing/faq/timeboard-api-doc
  - /ja/graphing/guide/timeboard-api-doc
---
<div class="alert alert-danger">
このエンドポイントは旧バージョンです。代わりに、<a href="https://docs.datadoghq.com/api/v1/dashboards/">新しいダッシュボードエンドポイント</a>を使用してください。
</div>

`Timeboard` エンドポイントを使用すると、タイムボードをプログラムで作成、更新、削除、およびクエリできます。[タイムボードの詳細については、こちらを参照してください][1]。

## タイムボードの作成

### シグニチャ

`POST https://api.datadoghq.com/api/v1/dash`

### 引数

* **`title`** [必須]:
    ダッシュボードの名前。
* **`description`** [必須]:
    ダッシュボードの内容の説明。
* **`graphs`** [オプション、デフォルト = **None**]:
    グラフ定義のリスト。グラフの定義は、次の形式に従います。
    * **`title`** [必須]:
        グラフの名前。
    * **`definition`** [オプション、デフォルト = **None**]:
        * `events` [オプション、デフォルト = **None**]:
          イベントオーバーレイのクエリ。
        * `requests` [オプション、デフォルト = **None**]:
          メトリクスクエリ、線の種類、スタイル、条件付き書式、および集計関数。
        * `viz` [オプション、デフォルト = **timeseries**]:
          可視化タイプ。

* **`template_variables`** [オプション、デフォルト = **None**]:
    ダッシュボードのテンプレートを使用するためのテンプレート変数のリスト。テンプレート変数の定義は、次の形式に従います。
    * **`name`** [必須]:
        変数の名前。
    * **`prefix`** [オプション、デフォルト = **None**]:
        変数に関連付けられるタグプレフィックス。このプレフィックスを持つタグだけが変数ドロップダウンに表示されます。
    * **`default`** [オプション、デフォルト = **None**]:
        ダッシュボード読み込み時のテンプレート変数のデフォルト値。

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

title = "マイタイムボード"
description = "有益なタイムボード。"
graphs = [{
    "definition": {
        "events": [],
        "requests": [
            {"q": "avg:system.mem.free{*}"}
        ],
        "viz": "timeseries"
    },
    "title": "平均メモリ空き容量"
}]

template_variables = [{
    "name": "host1",
    "prefix": "host",
    "default": "host:my-host"
}]

read_only = True
api.Timeboard.create(title=title,
                     description=description,
                     graphs=graphs,
                     template_variables=template_variables,
                     read_only=read_only)

```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'rubygems'
require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

# タイムボードを作成する。
title = 'はじめてのメトリクス'
description = 'しかもとても素晴らしい。'
graphs = [{
    "definition" => {
        "events" => [],
        "requests" => [{
            "q" => "avg:system.mem.free{*}"
        }],
        "viz" => "timeseries"
    },
    "title" => "平均メモリ空き容量"
}]
template_variables = [{
    "name" => "host1",
    "prefix" => "host",
    "default" => "host:my-host"
}]

dog.create_dashboard(title, description, graphs, template_variables)
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<DATADOG_API_KEY>
app_key=<DATADOG_APPLICATION_KEY>

curl  -X POST -H "Content-type: application/json" \
-d '{
      "graphs" : [{
          "title": "平均メモリ空き容量",
          "definition": {
              "events": [],
              "requests": [
                  {"q": "avg:system.mem.free{*}"}
              ],
              "viz": "timeseries"
          }
      }],
      "title" : "平均メモリ空き容量 シェル",
      "description" : "メモリ情報を含むダッシュボード",
      "template_variables": [{
          "name": "host1",
          "prefix": "host",
          "default": "host:my-host"
      }],
      "read_only": "True"
}' \
"https://api.datadoghq.com/api/v1/dash?api_key=${api_key}&application_key=${app_key}"
```

{{% /tab %}}
{{< /tabs >}}

## タイムボードの更新

### シグニチャ

`PUT https://api.datadoghq.com/api/v1/dash/<TIMEBOARD_ID>`

### 引数

* **`title`** [必須]:
    ダッシュボードの名前。
* **`description`** [必須]:
    ダッシュボードの内容の説明。
* **`graphs`** [必須]:
    グラフ定義のリスト。グラフの定義は、次の形式に従います。
    * **`title`** [必須]:
        グラフの名前。
    * **`definition`** [必須]:
    グラフの定義。グラフの詳細は、[グラフガイド][1]を参照してください。例:
    `{"requests": [{"q": "system.cpu.idle{*} by {host}"}`

* **`template_variables`** [オプション、デフォルト = **None**]:
    ダッシュボードのテンプレートを使用するためのテンプレート変数のリスト。テンプレート変数の定義は、次の形式に従います。
    * **`name`** [必須]:
     変数の名前。

    * **`prefix`** [オプション、デフォルト = **None**]:
    変数に関連付けられるタグプレフィックス。このプレフィックスを持つタグだけが変数ドロップダウンに表示されます。

    * **`default`** [オプション、デフォルト = **None**]:
    ダッシュボード読み込み時のテンプレート変数のデフォルト値。

### 例

{{< tabs >}}
{{% tab "Python" %}}

```python
from datadog import initialize, api

options = {'api_key': '<DATADOG_API_KEY>',
           'app_key': '<DATADOG_APPLICATION_KEY>'}

initialize(**options)

title = 'マイタイムボード'
description = '新しく進化したタイムボード！'
graphs = [{'definition': {'events': [],
                          'requests': [{
                            'q': 'avg:system.mem.free{*} by {host}'}],
                          'viz': 'timeseries'},
          'title': 'ホストごとの平均メモリ空き容量'}]
template_variables = [{'name': 'host1', 'prefix': 'host',
                       'default': 'host:my-host'}]
read_only = True

api.Timeboard.update(
    4952,
    title=title,
    description=description,
    graphs=graphs,
    template_variables=template_variables,
    read_only=read_only,
)
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'rubygems'
require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

dash_id = '2551'
title = '新しく進化したダッシュボード'
description = '新しい機能を全て搭載。'
graphs = [{
    "definition" => {
        "events" => [],
        "requests" => [{
            "q" => "avg:system.mem.free{*}"
        }],
        "viz" => "timeseries"
    },
    "title" => "平均メモリ空き容量"
}]
template_variables = [{
    "name" => "host1",
    "prefix" => "host",
    "default" => "host:my-host"
}]

dog.update_dashboard(dash_id, title, description, graphs, template_variables)
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<DATADOG_API_KEY>
app_key=<DATADOG_APPLICATION_KEY>
dash_id=2532

# 取得するダッシュボードを作成します。(http://stedolan.github.io/jq/download/) を使用してダッシュボード ID を取得します。
dash_id=$(curl  -X POST -H "Content-type: application/json" \
-d '{
      "graphs" : [{
          "title": "平均メモリ空き容量",
          "definition": {
              "events": [],
              "requests": [
                  {"q": "avg:system.mem.free{*}"}
              ],
              "viz": "timeseries"
          }
      }],
      "title" : "平均メモリ空き容量 シェル",
      "description" : "メモリ情報を含むダッシュボード",
      "template_variables": [{
          "name": "host1",
          "prefix": "host",
          "default": "host:my-host"
      }]
  }' \
"https://api.datadoghq.com/api/v1/dash?api_key=${api_key}&application_key=${app_key}" | jq '.dash.id')

curl  -X PUT -H "Content-type: application/json" \
-d '{
      "graphs" : [{
          "title": "メモリ空き容量の合計",
          "definition": {
              "events": [],
              "requests": [
                  {"q": "sum:system.mem.free{*}"}
              ],
              "viz": "timeseries"
          }
      }],
      "title" : "メモリ空き容量の合計 シェル",
      "description" : "メモリ情報を含む更新済みダッシュボード",
      "template_variables": [{
          "name": "host1",
          "prefix": "host",
          "default": "host:my-host"
      }]
}' \
"https://api.datadoghq.com/api/v1/dash/${dash_id}?api_key=${api_key}&application_key=${app_key}"
```

{{% /tab %}}
{{< /tabs >}}

## タイムボードの削除

既存の[タイムボード][1]を削除します。
このエンドポイントは、JSON 引数を受け取りません。

### シグニチャ

`DELETE https://api.datadoghq.com/api/v1/dash/<TIMEBOARD_ID>`

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

title = "マイタイムボード"
description = "有益なタイムボード。"
graphs = [{
    "definition": {
        "events": [],
        "requests": [
            {"q": "avg:system.mem.free{*}"}
        ],
        "viz": "timeseries"
    },
    "title": "平均メモリ空き容量"
}]

template_variables = [{
    "name": "host1",
    "prefix": "host",
    "default": "host:my-host"
}]

newboard = api.Timeboard.create(title=title,
                                description=description,
                                graphs=graphs,
                                template_variables=template_variables)

api.Timeboard.delete(newboard['dash']['id'])
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'rubygems'
require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

dash_id = '2534'
dog.delete_dashboard(dash_id)
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<DATADOG_API_KEY>
app_key=<DATADOG_APPLICATION_KEY>
dash_id=2471

# 削除するダッシュボードを作成します。(http://stedolan.github.io/jq/download/) を使用してダッシュボード ID を取得します。
dash_id=$(curl  -X POST -H "Content-type: application/json" \
-d '{
      "graphs" : [{
          "title": "平均メモリ空き容量",
          "definition": {
              "events": [],
              "requests": [
                  {"q": "avg:system.mem.free{*}"}
              ],
              "viz": "timeseries"
          }
      }],
      "title" : "平均メモリ空き容量 シェル",
      "description" : "メモリ情報を含むダッシュボード",
      "template_variables": [{
          "name": "host1",
          "prefix": "host",
          "default": "host:my-host"
      }]
  }' \
"https://api.datadoghq.com/api/v1/dash?api_key=${api_key}&application_key=${app_key}" | jq '.dash.id')

curl -X DELETE "https://api.datadoghq.com/api/v1/dash/${dash_id}?api_key=${api_key}&application_key=${app_key}"
```

{{% /tab %}}
{{< /tabs >}}

## タイムボードの取得

既存のダッシュボードの定義を取得します。

### シグニチャ

`GET https://api.datadoghq.com/api/v1/dash/<TIMEBOARD_ID>`

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

api.Timeboard.get(4953)
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'rubygems'
require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

dash_id = '2542'
dog.get_dashboard(dash_id)
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<DATADOG_API_KEY>
app_key=<DATADOG_APPLICATION_KEY>
dash_id=2473

# 取得するダッシュボードを作成します。(http://stedolan.github.io/jq/download/) を使用してダッシュボード ID を取得します。
dash_id=$(curl  -X POST -H "Content-type: application/json" \
-d '{
      "graphs" : [{
          "title": "平均メモリ空き容量",
          "definition": {
              "events": [],
              "requests": [
                  {"q": "avg:system.mem.free{*}"}
              ],
              "viz": "timeseries"
          }
      }],
      "title" : "平均メモリ空き容量 シェル",
      "description" : "メモリ情報を含むダッシュボード",
      "template_variables": [{
          "name": "host1",
          "prefix": "host",
          "default": "host:my-host"
      }]
  }' \
"https://api.datadoghq.com/api/v1/dash?api_key=${api_key}&application_key=${app_key}" | jq '.dash.id')

curl "https://api.datadoghq.com/api/v1/dash/${dash_id}?api_key=${api_key}&application_key=${app_key}"
```

{{% /tab %}}
{{< /tabs >}}

## すべてのタイムボードの取得

[タイムボード][1]の定義をすべて取得します。

### シグニチャ

`GET https://api.datadoghq.com/api/v1/dash`

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

print api.Timeboard.get_all()
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'rubygems'
require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

dog.get_dashboards
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<DATADOG_API_KEY>
app_key=<DATADOG_APPLICATION_KEY>

curl "https://api.datadoghq.com/api/v1/dash?api_key=${api_key}&application_key=${app_key}"
```

{{% /tab %}}
{{< /tabs >}}

[1]: /ja/dashboards/timeboard/