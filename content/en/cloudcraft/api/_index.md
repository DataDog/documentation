---
title: Cloudcraft API Reference
type: documentation
cascade:
        disable_toc: true
---

{{< openapi-ref-docs url="cloudcraft.json" >}}

## Client SDKs

By default, the Cloudcraft API docs show examples in cURL. Each endpoint also includes code examples from one of the official client library languages. To install each library:

{{< programming-lang-wrapper langs="go,python" class="api-reference" >}}

{{< programming-lang lang="go" >}}
#### Installation
```sh
go mod init main && go get github.com/DataDog/cloudcraft-go
```
#### Usage
```go
import (
        "github.com/DataDog/cloudcraft-go"
)
```

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}
#### Installation
```console
pip3 install cloudcraftco
```
#### Usage
```python
from cloudcraftco import Cloudcraft
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}
