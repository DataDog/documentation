---
algolia:
  tags:
  - api
cascade:
  algolia:
    category: API
    rank: 10
    subcategory: API 참조
further_reading:
- link: /api/latest/using-the-api/
  tag: 설명서
  text: API 사용
- link: /api/latest/scopes/
  tag: 설명서
  text: 인증 범위
- link: /api/latest/rate-limits/
  tag: 설명서
  text: 속도 제한
title: API 참조
type: 설명서
---

{{< h2 >}}API 참조{{< /h2 >}}

Datadog API는 HTTP REST API입니다. API는 리소스 중심의 URL을 사용하여 API를 호출하고, 상태 코드를 사용하여 요청의 성공 또는 실패를 표시하며 모든 요청에서 JSON을 반환하고 표준 HTTP 응답 코드를 사용합니다. Datadog API를 사용하여 프로그래밍 방식으로 Datadog 플랫폼에 접근할 수 있습니다.

### 시작하기

`DD-API-KEY` 헤더를 사용하여 [API 키][1]로 API를 인증합니다. 일부 엔드포인트의 경우 `DD-APPLICATION-KEY` 헤더를 사용하는 [애플리케이션 키][2]가 필요합니다.

API[![Postman에서 실행][3]] 시도해 보기(https://god.gw.postman.com/run-collection/20651290-809b13c1-4ada-46c1-af65-ab276c434068?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D20651290-809b13c1-4ada-46c1-af65-ab276c434068%26entityType%3Dcollection%26workspaceId%3Dbf049f54-c695-4e91-b879-0cad1854bafa)

**참고**: Postman을 통해 Datadog API를 인증하려면 Datadog API와 애플리케이션 키 값을 Datadog API 수집의 **수집 변수**에 추가해야 합니다.

[API 사용하기][4]는 엔드포인트에 대한 가이드입니다.

**참고**: 
   - API 및 애플리케이션 키 값을 Datadog API 수집의 **변수** 탭에 추가하세요.
   - cURL 코드 예제에서는 BASH 및 GNU coreutils를 사용한다고 가정합니다. macOS에서는 [Homebrew 패키지 관리자][5]를 사용하여 coreutils를 설치할 수 있습니다: `brew install coreutils`

### 클라이언트 라이브러리

기본적으로 Datadog API 설명서는 cURL로 예제를 보여줍니다. 각 엔드포인트에서 공식 [클라이언트 라이브러리][6] 언어 중 하나를 선택하면 해당 라이브러리의 코드 예제를 볼 수 있습니다. 각 라이브러리를 설치하려면:

{{< programming-lang-wrapper langs="java,python-legacy,python,ruby-legacy,ruby,go,typescript" class="api-reference" >}}

{{< programming-lang lang="java" >}}
#### 설치
Maven - 프로젝트의 POM에 이 종속성을 추가합니다:
```xml
<dependency>
  <groupId>com.datadoghq</groupId>
  <artifactId>datadog-api-client</artifactId>
  <version>{{< sdk-version "datadog-api-client-java" >}}</version>
  <scope>compile</scope>
</dependency>
```

Gradle - 프로젝트의 빌드 파일에 이 종속성을 추가합니다:
```gradle
compile "com.datadoghq:datadog-api-client:{{< sdk-version "datadog-api-client-java" >}}"
```

#### 사용법

```java
import com.datadog.api.client.ApiClient;
import com.datadog.api.client.ApiException;
import com.datadog.api.client.Configuration;
import com.datadog.api.<VERSION>.client.api.*;
import com.datadog.api.<VERSION>.client.model.*;
```
**참고**: 사용할 엔드포인트에 따라 `<VERSION>`을 v1 또는 v2로 대체합니다.

#### 예시

예시 실행을 위한 Maven `pom.xml`:
```xml
<project>
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.example</groupId>
  <artifactId>example</artifactId>
  <version>1</version>
  <dependencies>
    <dependency>
      <groupId>com.datadoghq</groupId>
      <artifactId>datadog-api-client</artifactId>
      <version>{{< sdk-version "datadog-api-client-java" >}}</version>
      <scope>compile</scope>
    </dependency>
  </dependencies>
</project>
```
`CLASSPATH` 변수에 모든 종속성이 포함되어 있는지 확인합니다.

```sh
export CLASSPATH=$(mvn -q exec:exec -Dexec.executable=echo -Dexec.args="%classpath")
```

예시 실행을 위한 Gradle `build.gradle`:
```gradle
plugins {
    id 'java'
    id 'application'
}

repositories {
    jcenter()
}

dependencies {
    implementation 'com.datadoghq:datadog-api-client:{{< sdk-version "datadog-api-client-java" >}}'
}

application {
    mainClassName = 'Example.java'
}
```
`gradle run` 명령을 실행하여 예시를 실행합니다.

{{< /programming-lang >}}

{{< programming-lang lang="python-legacy" >}}
#### 설치
```sh
pip install datadog
```
#### 사용법
```python
import datadog
```
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}
#### 설치
```console
pip3 install datadog-api-client
```
#### 사용법
```python
import datadog_api_client
```
{{< /programming-lang >}}

{{< programming-lang lang="ruby-legacy" >}}
#### 설치
```sh
gem install dogapi
```
#### 사용법
```ruby
require 'dogapi'
```
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
#### 설치
```sh
gem install datadog_api_client -v {{< sdk-version "datadog-api-client-ruby" >}}
```
#### 사용법
```ruby
require 'datadog_api_client'
```
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}
#### 설치
```sh
go mod init main && go get github.com/DataDog/datadog-api-client-go/v2/api/datadog
```
#### 사용법
```go
import (
        "github.com/DataDog/datadog-api-client-go/v2/api/datadog"
        "github.com/DataDog/datadog-api-client-go/v2/api/datadog<VERSION>"
)
```
**참고**: 사용할 엔드포인트에 따라 `<VERSION>`을 `V1` 또는 `V2`로 대체합니다.
{{< /programming-lang >}}

{{< programming-lang lang="typescript" >}}
#### 설치
패키지는 [@datadog/datadog-api-client][1] 아래에 있으며 NPM 또는 Yarn을 통해 설치할 수 있습니다:

```js
# NPM
npm install @datadog/datadog-api-client

# Yarn
yarn add @datadog/datadog-api-client
```

#### 사용법
```js
import { <VERSION> } from 'datadog-api-client';
```
**참고**: 사용할 엔드포인트에 따라 `<VERSION>`을 v1 또는 v2로 대체합니다.

[1]: https://www.npmjs.com/package/@datadog/datadog-api-client
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

또는 라이브러리를 직접 확인하세요:

{{< partial name="api/sdk-languages.html" >}}
</br>
애플리케이션을 시작하려고 하시나요? Datadog의 [시작하기 문서][7]를 확인하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/account_management/api-app-keys/#api-keys
[2]: https://docs.datadoghq.com/ko/account_management/api-app-keys/#application-keys
[3]: https://run.pstmn.io/button.svg
[4]: /ko/api/v1/using-the-api/
[5]: https://brew.sh
[6]: https://docs.datadoghq.com/ko/developers/community/libraries/
[7]: /ko/getting_started/application/