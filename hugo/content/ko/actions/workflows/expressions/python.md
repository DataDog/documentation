---
code_lang: python
code_lang_weight: 20
description: App Builder의 Python 표현식 기능 및 제한 사항
title: Python 표현식
type: multi-code-lang
---
Python 함수 작업을 통해 워크플로 내에서 데이터 변환, 구문 분석, 페이로드 보강을 위한 사용자 지정 Python 스크립트를 작성할 수 있습니다.

## Python 환경{#python-environment}

Python 함수 작업은 다음 특성을 지닌 제한된 실행 환경에서 실행됩니다.

{{< workflow-python-action-characteristics >}}

## 스크립트 구조{#script-structure}

모든 Python 스크립트는 `main` 유형의 `ctx` 파라미터를 허용하는 `Context` 함수를 정의해야 합니다. 예를 들면 다음과 같습니다.

```python
from execution_context import Context

def main(*, ctx: Context):
  # Use ctx to access Trigger or Steps data
  workflow_name = ctx["WorkflowName"]
  return f"Running workflow {workflow_name!r}"
```

`ctx` 객체는 JavaScript 표현식의 `$` 변수와 유사하게 모든 워크플로 컨텍스트 변수에 대한 액세스 권한을 부여합니다. 사전 스타일 액세스(예: `ctx["Steps"]["Step_name"]["variable"]`)를 사용하여 이전 단계의 값을 참조하세요.

## Python 함수 작업 추가{#add-a-python-function-action}

워크플로 캔버스에서 다음을 실행합니다. 
1. {{< ui >}}\+{{< /ui >}}을 클릭하여 워크플로 단계를 추가합니다. 
1. `Python`을 검색합니다. 
1. Python 작업을 선택하여 워크플로에 추가합니다.

## AI로 Python 스크립트 작성{#write-python-scripts-with-ai}

워크플로 단계 내에서 Python 스크립트 작성 시 Bits AI의 도움을 받을 수 있습니다.

Bits AI로 스크립트 작성하기:

1. 워크플로에 Python 단계를 추가합니다.
1. {{< ui >}}Inputs{{< /ui >}} 섹션에서 {{< ui >}}Write Code with AI{{< /ui >}}를 클릭합니다.
1. 사용자 지정 프롬프트를 입력하거나 샘플 프롬프트 중 하나를 선택합니다. 
1. (선택 사항) {{< ui >}}Test script{{< /ui >}}를 클릭하여 워크플로 단계의 미리 보기를 생성합니다. 
1. 스크립트를 저장하려면 {{< ui >}}Accept changes{{< /ui >}}를 클릭합니다. 스크립트 편집을 계속하려면 {{< ui >}}Reject changes{{< /ui >}}를 클릭합니다.
1. {{< ui >}}X{{< /ui >}}를 클릭하여 AI 대화 상자를 닫습니다. 
1. {{< ui >}}Description{{< /ui >}}를 입력합니다. 
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

## 스크립트 예시 {#script-examples}

### JSON 데이터 파싱 및 변환 {#parse-and-transform-json-data}

이 예시에서는 이전 단계의 JSON 문자열을 구문 분석하고 특정 필드를 추출합니다.

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

### 날짜 및 타임스탬프 작업 {#work-with-dates-and-timestamps}

이 예시에서는 python-dateutil 라이브러리를 사용하여 날짜 계산을 수행합니다.

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

### 암호화 작업 {#cryptographic-operations}

이 예시에서는 rsa 라이브러리를 사용하여 메시지를 암호화합니다.

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