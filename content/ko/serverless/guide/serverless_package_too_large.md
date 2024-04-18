---
further_reading:
- link: /serverless/installation/nodejs
  tag: 설명서
  text: Node.js 애플리케이션 계측
kind: 설명서
title: 서버리스 패키지가 너무 큰 오류 문제 해결
---

이 가이드는 "Code uncompressed size is greater than max allowed size of 272629760." 오류를 해결하는 데 도움이 됩니다. 이 오류는 Datadog 서버리스 플러그인을 사용하여 Node.js 서버리스 애플리케이션을 계측할 때 일반적으로 발생합니다. 다른 언어나 배포 방법에서도 동일한 오류가 발생하는 경우 문제 해결 전략이 적용될 수 있습니다.

이 오류는 함수의 _압축되지 않은_ 코드 크기가 250MB 제한을 초과함을 나타냅니다. [함수 패키지][1](함수 코드 및 종속성을 포함하는 `.zip`아티팩트)와 함수에 설정된 [Lambda 레이어][2] 모두 이 제한에 포함됩니다. 두 가지 모두를 조사하여 원인을 찾아보세요.

## 레이어

일반적으로 Datadog은 계측를 위해 두 개의 Lambda 레이어를 추가합니다:

- 함수 코드를 계측하는 언어별 라이브러리, 그리고
- 관찰 가능한 데이터를 집계, 버퍼링 및 Datadog 백엔드로 전달하는 확장 프로그램입니다.

AWS CLI 명령 [`aws lambda get-layer-version`][3]을 사용하여 Datadog Lambda 레이어의 내용 및 크기를 검사합니다. 예를 들어, 다음 명령을 실행하면 _Datadog-{{< latest-lambda-layer-version layer="node-example-version" >}} version {{< latest-lambda-layer-version layer="node" >}} 및 _Datadog-Extension version {{< latest-lambda-layer-version layer="extension" >}}용 Lambd 레이어를 다운로드하고 압축되지 않은 크기 (합계 약 30MB)를 검사할 수 있는 링크가 제공됩니다. 압축되지 않은 크기는 레이어 및 버전에 따라 다릅니다. 다음 예제의 레이어 이름과 버전 번호를 애플리케이션에서 사용하는 레이어 이름과 버전 번호로 대체합니다:

{{< site-region region="us,us3,us5,eu,gov" >}}
```
aws lambda get-layer-version \
  --layer-name arn:aws:lambda:us-east-1:464622532012:layer:Datadog-{{< latest-lambda-layer-version layer="node-example-version" >}} \
  --version-number {{< latest-lambda-layer-version layer="node" >}}

aws lambda get-layer-version \
  --layer-name arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Extension \
  --version-number {{< latest-lambda-layer-version layer="extension" >}}
```
{{< /site-region >}}

{{< site-region region="ap1" >}}
```
aws lambda get-layer-version \
  --layer-name arn:aws:lambda:us-east-1:417141415827:layer:Datadog-{{< latest-lambda-layer-version layer="node-example-version" >}} \
  --version-number {{< latest-lambda-layer-version layer="node" >}}

aws lambda get-layer-version \
  --layer-name arn:aws:lambda:us-east-1:417141415827:layer:Datadog-Extension \
  --version-number {{< latest-lambda-layer-version layer="extension" >}}
```
{{< /site-region >}}


Datadog Lambda 레이어 외에도 함수에 추가되었거나 (추가될) 다른 Lambda 레이어도 검사합니다. [서버리스 프레임워크][4]를 사용하는 경우, `deploy` 또는 `package` 명령을 실행한 후 숨겨진 `.serverless`폴더에서 CloudFormation 템플릿을 찾을 수 있으며, `Layers` 섹션에서 Lambda 레이어 목록을 찾을 수 있습니다.

## 패키지

함수 배포 패키지에는 필요 없는 큰 파일이나 코드가 포함될 수 있습니다. 서버리스 프레임워크를 사용하는 경우 `deploy` 또는 `package` 명령을 실행한 후 숨겨진 `.serverless` 폴더에서 배포 패키지(`.zip` 파일)을 찾을 수 있습니다.

배포 패키지와 레이의 크기 합계가 제한을 초과하지 않는 경우 확인을 위해 AWS 지원팀에 문의하세요. 전체 크기가 제한을 초과하는 경우 배포 패키지를 검사하고 런타임에 필요하지 않은 대용량 파일은 [package][5] 옵션을 사용하여 제외하세요.

## 의존

Datadog Lambda 레이어는 계측 라이브러리를 패키지화하여 Lambda 실행 환경에서 사용할 수 있기 때문에`datadog-lambda-js` 및 `dd-trace`를 `package.json`에서 종속성으로 지정할 필요가 _없습니다_. 로컬 빌드 또는 테스트에 Datadog 라이브러리가 필요한 경우 배포 패키지에서 제외되도록 `devDependencies`로 지정합니다. 마찬가지로 `serverless-plugin-datadog`는 개발에만 필요하며 `devDependencies` 아래에 지정해야 합니다.

또한, 배포 패키지에 포함된 다른 종속성 (`node_modules`폴더)을 검사하고 `dependencies`에서 필요한 종속성만 보관합니다.

## 번들러

[웹팩][6] 또는 [에스빌드(esbuild)][7]와 같은 번들러를 사용하면 사용되는 코드만 포함시켜 배포 패키지 크기를 줄일 수 있습니다. 필요한 웹팩 설정은 [Node.js Lambda 추적 및 번들러 호환성][8]을 참조하세요.

## Datadog-ci

사용 사례에 따라 패키지 크기와 관련된 문제를 해결하기 위해 `datadog-ci lambda instrument` 명령을 사용하는 것이 더 쉬울 수 있습니다. `datadog-ci lambda instrument` 명령은 서버리스-플러그인-Datadog과 동일한 계측을 설정합니다. 자세한 내용은 [datadog-ci repo][9]를 참조하세요.

## 지원 요청

Datadog 지원팀의 지원이 필요한 경우 티켓에 다음 정보를 포함하세요:

1. 함수에 설정된 Lambda 레이어 (이름 및 버전 또는 ARN).
2. AWS에 업로드할 함수의 배포 패키지 (또는 압축되지 않은 패키지의 내용과 크기를 보여주는 스크린샷).
3. **수정된 하드코딩 기밀**이 포함된 프로젝트 설정 파일: `serverless.yaml`, `package.json`,`package-lock.json`, `yarn.lock`, `tsconfig.json`, `webpack.config.json`.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-package.html#gettingstarted-package-zip
[2]: https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-package.html#gettingstarted-package-layers
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/get-layer-version.html
[4]: https://www.serverless.com/
[5]: https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml/#package
[6]: https://webpack.js.org
[7]: https://esbuild.github.io/
[8]: /ko/serverless/guide/serverless_tracing_and_bundlers/
[9]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/lambda#readme