---
aliases:
- /ko/tracing/serverless_functions/enable_aws_xray/
description: AWS X-Ray로 Lambda 함수 추적
title: AWS X-Ray 추적 활성화
---
## AWS X-Ray 활성화

**선행 조건:** [AWS 통합 설치][1].

1. AWS/Datadog 역할에 대한 정책 문서에 다음 권한이 있는지 확인하세요:

```text
xray:BatchGetTraces,
xray:GetTraceSummaries
```

    전체 트레이스를 반환하는 데 `BatchGetTraces` 권한이 사용됩니다. `GetTraceSummaries` 권한은 최근 트레이스 요약 목록을 가져오는 데 사용됩니다.

2. [Datadog 내에서 X-Ray 통합을 활성화합니다][2].

3. 고객 마스터 키를 사용하여 트레이스를 암호화하는 경우 리소스가 X-Ray에 사용되는 고객 마스터 키인 정책에 `kms:Decrypt` 메서드를 추가하세요.

**참고:** AWS X-Ray 통합을 활성화하면 소비되는 인덱싱된 스팬의 양이 늘어나 청구 금액도 늘어날 수 있습니다.

### 함수에 대해 AWS X-Ray 활성화

AWS X-Ray 통합을 최대한 활용하려면 다음을 수행하세요:

- Serverless Framework 플러그인을 사용하거나 수동으로 Lambda 함수 및 API 게이트웨이에서 활성화합니다. 
- Lambda 함수에 추적 라이브러리를 설치합니다.

#### [권장] Datadog Serverless Framework 플러그인

[Datadog Serverless Framework 플러그인][3]은 Lambda 함수 및 API 게이트웨이 인스턴스에 대해 X-Ray를 자동으로 활성화합니다. 또한 플러그인은 모든 Node.js 및 Python 함수에 [Datadog Lambda Layer][4]를 자동으로 추가합니다.

[Serverless Framework 플러그인을 시작][5]하고 [관련 문서를 참조하세요][3].

마지막으로 [Lambda 함수에 X-Ray 클라이언트 라이브러리를 설치하고 가져옵니다](#installing-the-x-ray-client-libraries).

#### 수동 설정

Serverless Framework를 사용하여 서버리스 애플리케이션을 배포하지 않는 경우 수동 설정을 위해 다음 지침을 따르세요.

1. 계측하려는 AWS 콘솔에서 Lambda 함수로 이동합니다. "Debugging and error handling" 섹션에서 **Enable active tracing** 확인란을 선택합니다. 그러면 해당 함수에 대한 X-Ray가 작동합니다.
2. [API Gateway 콘솔][6]로 이동합니다. API를 선택한 후 단계를 선택합니다.
3. **Logs/Tracing** 탭에서 **Enable X-Ray Tracing**을 선택합니다.
4. 이러한 변경 사항을 적용하려면 왼쪽 탐색 패널에서  **Resources**로 이동하여 **Actions**를 선택하고 **Deploy API**를 클릭합니다.

**참고:** Datadog Lambda Layer 및 클라이언트 라이브러리에는 X-Ray SDK가 종속성으로 포함되어 있으므로 프로젝트에 이를 명시적으로 설치할 필요가 없습니다.

마지막으로 [Lambda 함수에 X-Ray 클라이언트 라이브러리를 설치하고 가져옵니다](#installing-the-x-ray-client-libraries).

#### X-Ray 클라이언트 라이브러리 설치

X-Ray 클라이언트 라이브러리는 API에 대한 HTTP 요청과 DynamoDB, S3, MySQL, PostgreSQL(자체 호스팅, Amazon RDS 및 Amazon Aurora), SQS, SNS에 대한 호출과 관련된 인사이트를 제공합니다.

라이브러리를 설치하고 이를 Lambda 프로젝트로 가져온 다음 계측하려는 서비스를 패치합니다.

{{< programming-lang-wrapper langs="nodejs,python,go,ruby,java,.NET" >}}

{{< programming-lang lang="nodejs" >}}

X-Ray 추적 라이브러리 설치

```bash

npm install aws-xray-sdk

# Yarn 사용자의 경우
yarn add aws-xray-sdk
```

AWS SDK 계측 방법:

```js
var AWSXRay = require('aws-xray-sdk-core');
var AWS = AWSXRay.captureAWS(require('aws-sdk'));
```

모든 다운스트림 HTTP 호출 계측 방법:

```js
var AWSXRay = require('aws-xray-sdk');
AWSXRay.captureHTTPsGlobal(require('http'));
var http = require('http');
```

PostgreSQL 쿼리 계측 방법:

```js
var AWSXRay = require('aws-xray-sdk');
var pg = AWSXRay.capturePostgres(require('pg'));
var client = new pg.Client();
```

MySQL 쿼리 계측 방법:

```js
var AWSXRay = require('aws-xray-sdk');
var mysql = AWSXRay.captureMySQL(require('mysql'));
//...
var connection = mysql.createConnection(config);
```

추가 설정, 하위 세그먼트 생성 및 주석 기록에 대해서는 [X-Ray Node.js 문서][1]를 참조하세요.

[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-nodejs.html
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

X-Ray 추적 라이브러리 설치

```bash
pip install aws-xray-sdk
```

기본적으로 [모든 라이브러리][1]를 패치하려면 Lambda 핸들러가 포함된 파일에 다음을 추가합니다.

```python
from aws_xray_sdk.core import xray_recorder
from aws_xray_sdk.core import patch_all
patch_all()
```

`aiohttp` 추적에는 [특정 계측][2]이 필요합니다.

추가 설정, 하위 세그먼트 생성 및 주석 기록에 대해서는 [X-Ray Python 문서][3]를 참조하세요.


[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-python-patching.html
[2]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-python-httpclients.html
[3]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-python.html
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}
다음 문서를 확인하세요:
- [X-Ray SDK for Go 가이드][1].

[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-go.html
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
다음 문서를 확인하세요:
- [X-Ray SDK for Ruby 가이드][1].

[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-ruby.html
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

다음 문서를 확인하세요:
- [X-Ray SDK for Java 가이드][1].

[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-java.html
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

다음 문서를 확인하세요:
- [X-Ray SDK for .Net 가이드][1].

[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-dotnet.html
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

[1]: /ko/integrations/amazon_web_services/#setup
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_xray
[3]: https://github.com/DataDog/serverless-plugin-datadog
[4]: https://docs.datadoghq.com/ko/integrations/amazon_lambda/?tab=python#installing-and-using-the-datadog-layer
[5]: https://www.datadoghq.com/blog/serverless-framework-plugin
[6]: https://console.aws.amazon.com/apigateway/