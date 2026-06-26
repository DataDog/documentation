---
further_reading:
- link: /security/cloud_security_management/setup/agentless_scanning/enable
  tag: 설명서
  text: Agentless Scanning 활성화
- link: /security/cloud_security_management/agentless_scanning
  tag: 설명서
  text: Cloud Security Agentless Scanning
title: Agentless Scanning 업데이트
---

## CloudFormation 스택 업데이트

Datadog은 새로운 기능과 버그 수정 사항이 출시될 때 이를 활용할 수 있도록 CloudFormation 스택을 정기적으로 업데이트할 것을 권장합니다.

1. AWS 콘솔에 로그인하고 CloudFormation Stacks 페이지로 이동합니다.
1. 상위 **DatadogIntegration** 스택을 확장하여 중첩된 서브 스택을 표시합니다. **DatadogIntegration-DatadogAgentlessScanning-...** 서브 스택을 선택하고 **Update**를 클릭한 뒤 **Update nested stack**을 클릭합니다.
1. **Replace existing template**을 클릭합니다.
1. S3 URL`https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/<VERSION>/datadog_agentless_scanning.yaml`에서 `<VERSION>`을  [aws_quickstart/version.txt][1]에 있는 버전으로 교체합니다. 해당 URL을 **Amazon S3 URL** 필드에 붙여넣습니다.
1. 다음 페이지를 수정하지 않고 넘어가려면 **Next**를 클릭한 다음 양식을 제출합니다.

## Terraform 모듈 업데이트

Agentless Scanner 모듈에 `source` 레퍼런스를 최신 릴리스로 업데이트합니다. 최신 버전을 [GitHub Releases][2]에서 확인할 수 있습니다.

사용 예를 보려면 [GitHub 레포지토리][3]를 참고하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/cloudformation-template/blob/master/aws_quickstart/version.txt
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/releases
[3]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples