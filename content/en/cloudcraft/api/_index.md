---
title: API Reference
type: documentation
---

{{< openapi-ref-docs url="cloudcraft.json" >}}

## Client libraries

By default, the Cloudcraft API Docs show examples in cURL. Select one of our official client library languages in each endpoint to see code examples from that library. To install each library:

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
