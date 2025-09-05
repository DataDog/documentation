---
cascade:
  build:
    list: toujours
    publishResources: false
    render: toujours
  disable_toc: true
title: Référence sur l'API Cloudcraft
type: documentation
---

{{< openapi-ref-docs url="cloudcraft.json" >}}

## SDK

Par défaut, la documentation de l'API Cloudcraft affiche des exemples en cURL. Chaque endpoint inclut également des exemples de code provenant d'un des SDK officiels. Pour installer chaque SDK :

{{< programming-lang-wrapper langs="go,python,nodejs" class="api-reference" >}}

{{< programming-lang lang="go" >}}
#### Installation
```sh
go mod init main && go get github.com/DataDog/cloudcraft-go
```
#### Utilisation
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
#### Utilisation
```python
from cloudcraftco import Cloudcraft
```
{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}
#### Installation
```sh
npm install cloudcraft
```
#### Utilisation
```javascript
import { Cloudcraft } from 'cloudcraft';
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

Ou consultez directement les SDK :

{{< partial name="cloudcraft/sdk-languages.html" >}}