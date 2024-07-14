---
kind: 설명서
title: 승인되지 않은 서버리스 레이어 오류 트러블슈팅
---
이 가이드는 배포 오류 `not authorized to perform: lambda:GetLayerVersion on resource` 를 해결하는 데 도움이 됩니다. 이 오류는 일반적으로 Datadog 람다 라이브러리 레이어 또는 Datadog 확장 레이어에서 나타납니다.

## 지역성
람다 함수는 함수와 동일한 위치에 있는 [람다 레이어][1]만 포함할 수 있습니다. 일반적으로 이 오류는 사용자가 다른 지역에 배포된 다른 애플리케이션의 계측 설정을 복사할 때 발생합니다.

람다 레이어 영역과 람다 기능/함수 버전이 일치하는지 확인합니다. 그런 다음 버전 번호가 올바른지 확인합니다.

유효한 AWS 자격 증명으로 `aws lambda get-layer-version`을 실행하여 람다 레이어 버전이 존재하는지 확인할 수 있습니다.

예를 들어 Datadog 확장 계층과 Datadog Node.js 라이브러리 계층을 확인하려면 실행합니다:
```
AWS lambda get-layer-version \
  --layer-name arn:AWS:lambda:us-east-1:464622532012:layer:Datadog-{{< latest-lambda-layer-version layer="node-example-version" >}} \
  --version-number {{< latest-lambda-layer-version layer="node" >}}

AWS lambda get-layer-version \
  --layer-name arn:AWS:lambda:us-east-1:464622532012:layer:Datadog-Extension \
  --version-number {{< latest-lambda-layer-version layer="extension" >}}
```

## 권한
`DENY` 때때로 사용자가 실수로 함수에 대해 명시적으로 `lambda:GetLayerVersion` 권한을 부여하는 경우가 있습니다. 일부 [리소스 기반][2] 정책 구성은 명시적 `DENY`을 유발할 수 있습니다. 또한 IAM [권한 경계][3]로 인해 `lambda:GetLayerVersion` 에 대한 명시적 `DENY`이 발생할 수도 있습니다.

이를 테스트하려면 Lambda 기능/함수 에서 사용하는 것과 동일한 IAM 정책 에 연결된 IAM 사용자를 사용하여 위에 나열된 대로 `get-layer-version` 명령을 테스트합니다. 명령이 오류 없이 성공해야 합니다.

## Datadog 지원팀에 문의

Datadog 지원팀의 지원이 필요한 경우 티켓에 다음 정보를 포함하세요:

1. 함수에 설정된 Lambda 레이어 (이름 및 버전 또는 ARN).
2. 프로젝트 설정 파일, **편집된 하드코딩된 비밀**: `serverless.yaml`, `package.json`, `package-lock.json`, `yarn.lock`, `tsconfig.json` 및 `webpack.config.json`
3. 프로젝트 IAM 정책 및 역할 정보입니다.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-package.html#gettingstarted-package-layers
[2]: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html
[3]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html