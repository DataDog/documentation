---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-pandas/import-as-pd
  language: Python
  severity: Notice
title: Import pandas according to coding guidelines
---
## Metadata
**ID:** `python-pandas/import-as-pd`

**Language:** Python

**Severity:** Notice

**Category:** Best Practices

## Description
The `pandas` library is generally imported using the following code snippet.

```python
import pandas as pd
```

It is good practice to ensure that all pandas import are done this way. This rule ensures that all code uses this pattern.

## Non-Compliant Code Examples
```python
import pandas # should use import pandas as pd


import pandas as foo


import foo as bar
```

```python
from pandas import something # should use import pandas as pd

```

```python
import pandas as something # should use import pandas as pd
```

## Compliant Code Examples
```python
import pandas as pd # should use import pandas as pd
```
