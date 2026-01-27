---
title: Python Expressions
description: Capabilities and limits of Python expressions in App Builder
code_lang: python
type: multi-code-lang
code_lang_weight: 20
---

The Python function action allows you to write custom Python scripts for data transformations, parsing, and payload enrichment within your workflows. Python provides additional capabilities beyond JavaScript for certain use cases.

## Python Environment
The Python function action runs in a restricted execution environment with the following characteristics:
• Python version: 3.12.8
• Available libraries: In addition to the Python standard library, the following packages are available:
  – rsa (version 4.9)
  – python-dateutil (version 2.8.2)
• Network access: Restricted

## Script Structure
All Python scripts must define a main function that accepts a ctx parameter of type Context.
Example structure:

```python
from execution_context import Context
def main(*, ctx: Context):
  # Use ctx to access Trigger or Steps data
  workflow_name = ctx["WorkflowName"]
  return f"Running workflow {workflow_name!r}"
```

The ctx object provides access to all workflow context variables, similar to the `$` variable in JavaScript expressions. Use dictionary-style access (for example, `ctx["Steps"]["Step_name"]["variable"]`) to reference values from previous steps.

## Add a Python Function Action

To add a Python function action:
- In a new workflow, click Add step and search for "python". Select the Python action to add it to your workflow.
- In an existing workflow, click + and search for "python". Select the Python action to add it to your workflow.

## Writing Python Scripts with AI
You can use Bits AI to help you write Python scripts directly within the workflow editor.

To write a script with Bits AI:

Add a Python step to your workflow.
Under General, in the Script field, click Write with Bits AI.
In the Describe your transformation script field, enter a description of what you want your script to do, then click the up arrow to submit.
Choose one of the following options:
• Replace script
• Insert in script
• Copy to clipboard
Review the generated script and modify it as needed.

## Examples

### Parse and Transform JSON Data

This example parses a JSON string from a previous step and extracts specific fields.

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

### Work with Dates and Timestamps

This example uses the python-dateutil library to perform date calculations.

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

### Cryptographic Operations
This example uses the rsa library to encrypt a message.

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
