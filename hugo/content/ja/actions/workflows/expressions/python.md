---
code_lang: python
code_lang_weight: 20
description: App Builder における Python 式の機能と制限
title: Python 式
type: multi-code-lang
---
Python 関数アクションを使用すると、ワークフロー内でデータ変換、パース、およびペイロードエンリッチメントのためのカスタム Python スクリプトを作成できます。

## Python 環境{#python-environment}

Python 関数アクションは、以下の特性を持つ制限された実行環境で実行されます。

{{< workflow-python-action-characteristics >}}

## スクリプト構造{#script-structure}

すべての Python スクリプトで、`Context` 型の `ctx` パラメーターを受け取る `main` 関数を定義する必要があります。たとえば、次のようにします。

```python
from execution_context import Context

def main(*, ctx: Context):
  # Use ctx to access Trigger or Steps data
  workflow_name = ctx["WorkflowName"]
  return f"Running workflow {workflow_name!r}"
```

`ctx` オブジェクトは、JavaScript 式の `$` 変数と同様に、すべてのワークフローコンテキスト変数へのアクセスを提供します。辞書形式のアクセス (例: `ctx["Steps"]["Step_name"]["variable"]`) を使用して、前のステップからの値を参照します。

## Python 関数アクションを追加する{#add-a-python-function-action}

ワークフローキャンバスで、以下の手順に従います。
1. {{< ui >}}\+{{< /ui >}} をクリックしてワークフローのステップを追加します。
1. `Python` を検索します。
1. Python アクションを選択してワークフローに追加します。

## AI を使用して Python スクリプトを作成する{#write-python-scripts-with-ai}

Bits AI を使用して、ワークフローのステップ内で Python スクリプトの作成を支援できます。

Bits AI でスクリプトを作成するには、以下の手順に従います。

1. ワークフローに Python ステップを追加します。
1. {{< ui >}}Inputs{{< /ui >}} セクションで、{{< ui >}}Write Code with AI{{< /ui >}} をクリックします。
1. カスタムプロンプトを入力するか、サンプルプロンプトのいずれかを選択します。
1. 必要に応じて、{{< ui >}}Test script{{< /ui >}} をクリックしてワークフローのステップのプレビューを生成します。
1. スクリプトを保存するには、{{< ui >}}Accept changes{{< /ui >}} をクリックします。スクリプトの編集を続けるには、{{< ui >}}Reject changes{{< /ui >}} をクリックします。
1. {{< ui >}}X{{< /ui >}} をクリックして、AI ダイアログを閉じます。
1. {{< ui >}}Description{{< /ui >}} を入力します。
1. {{< ui >}}Save{{< /ui >}} をクリックします。

## スクリプトの例{#script-examples}

### JSON データのパースと変換{#parse-and-transform-json-data}

この例では、前のステップの JSON 文字列をパースし、特定のフィールドを抽出します。

```python
from execution_context import Context
import json

def main(*, ctx: Context):
    # Get JSON string from previous step
    json_string = ctx["Steps"]["Get_data"]["output"]

    # Parse and transform
    data = json.loads(json_string)
    return {
        "user_ids": [user["id"] for user in data["users"]],
        "total_count": len(data["users"])
    }
```

### 日付とタイムスタンプの操作{#work-with-dates-and-timestamps}

この例では、python-dateutil ライブラリを使用して日付計算を実行します。

```python
from execution_context import Context
from dateutil import parser, relativedelta
from datetime import datetime

def main(*, ctx: Context):
    # Parse a date string
    start_date = parser.parse(ctx["Trigger"]["date_string"])

    # Calculate date 30 days in the future
    future_date = start_date + relativedelta.relativedelta(days=30)

    return {
        "start": start_date.isoformat(),
        "end": future_date.isoformat(),
        "days_difference": 30
    }
```

### 暗号化操作{#cryptographic-operations}

この例では、rsa ライブラリを使用してメッセージを暗号化します。

```python
from execution_context import Context
import rsa
import base64

def main(*, ctx: Context):
    # Get message from workflow context
    message = ctx["Steps"]["Compose_message"]["text"]

    # Generate RSA key pair
    (public_key, private_key) = rsa.newkeys(512)

    # Encrypt message
    encrypted = rsa.encrypt(message.encode(), public_key)

    return {
        "encrypted_message": base64.b64encode(encrypted).decode(),
        "public_key": public_key.save_pkcs1().decode()
    }
```