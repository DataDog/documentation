---
cascade:
  disable_toc: true
title: Cloudcraft API Reference
type: documentation
---

{{< openapi-ref-docs url="cloudcraft.json" >}}

## Client libraries

By default, the Cloudcraft API docs show examples in cURL. Each endpoint also includes code examples from one of the official client library languages. To install each library:

{{< programming-lang-wrapper langs="go,python" class="api-reference" >}}

{{< programming-lang lang="go" >}}
#### インストール
```sh
go mod init main && go get github.com/DataDog/cloudcraft-go
```
#### 使用方法
```go
import (
        "github.com/DataDog/cloudcraft-go"
)
```

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}
#### インストール
```console
pip3 install cloudcraftco
```
#### 使用方法
```python
from cloudcraftco import Cloudcraft
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}