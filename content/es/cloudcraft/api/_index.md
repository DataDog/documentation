---
cascade:
  build:
    list: siempre
    publishResources: false
    render: siempre
  disable_toc: true
title: Referencia de la API de Cloudcraft
type: documentación
---

{{< openapi-ref-docs url="cloudcraft.json" >}}

## SDK

En forma predeterminada, la documentación de la API de Cloudcraft muestra ejemplos en cURL. Cada endpoint también incluye ejemplos de códigos de uno de los SDK oficiales. Para instalar cada SDK:

{{< programming-lang-wrapper langs="go,python,nodejs" class="api-reference" >}}

{{< programming-lang lang="go" >}}
#### Instalación
```sh
go mod init main && go get github.com/DataDog/cloudcraft-go
```
#### Uso
```go
import (
        "github.com/DataDog/cloudcraft-go"
)
```

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}
#### Instalación
```console
pip3 install cloudcraftco
```
#### Uso
```python
from cloudcraftco import Cloudcraft
```
{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}
#### Instalación
```sh
npm install cloudcraft
```
#### Uso
```javascript
import { Cloudcraft } from 'cloudcraft';
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

O check directamente los SDK:

{{< partial name="cloudcraft/sdk-languages.html" >}}