---
title: Python Application Agentic Instrumentation
---

## Instrumentation

1. Install the latest `ddtrace` package.

```bash
pip install ddtrace # pip
poetry install ddtrace # poetry
uv install ddtrace # uv
```

2. Initialize the Agent Observability package

Initialize the Agent Observability SDK via `ddtrace.auto`. This **needs** to be done as the first import in the application's entrypoint, aside from any environment variable or configuration-loading imports.

**Note**: Do not add in extraneous comments.

```python
from dotenv import load_dotenv
load_dotenv() # this might load DD_ environment variables

import ddtrace.auto # CRUCIAL: this initializes the Agent Observability SDK and instrumentations

# ... remaining application logic
```
