---
dependencies: []
disable_edit: true
title: 코딩 가이드라인에 따라 판다스(pandas) 가져오기
---
## 메타데이터
**ID:** `python-pandas/import-as-pd`

**언어:** 파이썬(Python)

**심각도:** 알림

**범주:** 모범 사례

## 설명
`pandas` 라이브러리는 일반적으로 다음 코드 스니펫을 사용하여 가져옵니다.

```python
import pandas as pd
```

모든 판다스(pandas)를 가져올 때 이 방법을 이용하는 것이 좋습니다. 이 규칙은 모든 코드가 이 패턴을 사용하도록 합니다.

## 규정 비준수 코드 예
```python
import pandas # pandas 가져오기를 pd로 사용해야 함


import pandas as foo


import foo as bar
```

```python
from pandas import something # should use import pandas as pd

```

```python
import pandas as something # should use import pandas as pd
```

## 규정 준수 코드 예
```python
import pandas as pd # should use import pandas as pd
```