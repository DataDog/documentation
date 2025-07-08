---
cascade:
  build:
    list: always
    publishResources: false
    render: always
  disable_toc: true
title: Cloudcraft API リファレンス
type: ドキュメント
---

{{< openapi-ref-docs url="cloudcraft.json" >}}

## SDK

デフォルトでは、Cloudcraft API ドキュメントには cURL の例が表示されます。各エンドポイントには、公式 SDK のいずれかを使用したコード例も含まれています。各 SDK をインストールするには:

{{< programming-lang-wrapper langs="go,python,nodejs" class="api-reference" >}}

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

{{< programming-lang lang="nodejs" >}}
#### インストール
```sh
npm install cloudcraft
```
#### 使用方法
```javascript
import { Cloudcraft } from 'cloudcraft';
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

また、SDK を直接確認することもできます:

{{< partial name="cloudcraft/sdk-languages.html" >}}