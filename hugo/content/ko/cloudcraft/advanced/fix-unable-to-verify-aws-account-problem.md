---
title: '"unable to verify AWS account" 문제 해결'
---

Cloudcraft에 AWS 계정을 추가하려고 할 때 "unable to verify AWS account"라는 오류가 발생하면, 조직에서 계정에 서비스 제어 정책을 연결했기 때문일 수 있습니다. 이로 인해 Cloudcraft 서버가 생성된 IAM 역할의 유효성을 검사할 수 없습니다.

이 오류를 해결하려면 다음 방법을 시도해 보세요.

## `us-east-1` 지역 액세스 활성화

정책에서 `us-east-1` 지역 액세스를 일시적으로 활성화하도록 IT 팀에 요청할 수 있습니다. 이 지역은 Cloudcraft가 IAM 역할을 확인하는 데 사용하는 지역입니다. 계정을 추가한 후 지역을 다시 비활성화할 수 있으며, 이 경우 Cloudcraft는 차단되지 않은 지역의 구성 요소만 검사하도록 제한됩니다.

예외 정책을 강화하기 위해 조직 관리자가 최소한의 IAM 정책을 역할을 할당하도록 하는 옵션을 설정할 수 있습니다. 이를 통해 애플리케이션에 추가된 AWS 계정에서 Cloudcraft가 읽기 가능 또는 불가능한 항목을 제한하는 것입니다. 자세한 내용은 [Cloudcraft로 최소 IAM 정책 만들기][1]를 참고하세요.

## API를 사용하여 계정 추가

웹 인터페이스 대신 Cloudcraft API를 사용하여 계정을 추가하고 계정을 확인할 리전을 지정할 수 있습니다. 자세한 내용은 [Cloudcraft API를 통해 AWS 계정 추가][2]를 참고하세요.

[1]: /ko/cloudcraft/advanced/minimal-iam-policy/
[2]: /ko/cloudcraft/advanced/add-aws-account-via-api/