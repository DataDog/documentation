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
스캐너 인스턴스는 24시간마다 교체되며 배포 시 고정된 스캐너 버전의 최신 패치 릴리스를 설치합니다. 새 스캐너 버전, 권한 변경 사항 및 인프라 수정 사항을 적용하려면 배포를 업데이트하세요.

## CloudFormation 스택 업데이트 {#update-the-cloudformation-stack}

새로운 기능과 버그 수정 사항이 출시될 때 이를 이용할 수 있도록 CloudFormation 스택을 정기적으로 업데이트하는 것이 좋습니다.

1. AWS 콘솔에 로그인하고 CloudFormation Stacks 페이지로 이동합니다.
1. 상위 {{< ui >}}DatadogIntegration{{< /ui >}} 스택을 확장하여 중첩된 하위 스택을 표시합니다. {{< ui >}}DatadogIntegration-DatadogAgentlessScanning-...{{< /ui >}} 하위 스택을 선택하고 {{< ui >}}Update{{< /ui >}}를 클릭한 다음 {{< ui >}}Update nested stack{{< /ui >}}을 클릭합니다.
1. {{< ui >}}Replace existing template{{< /ui >}}을 클릭합니다.
1. 다음 S3 URL `https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/<VERSION>/datadog_agentless_scanning.yaml`에서 `<VERSION>`을 [aws_quickstart/version.txt][1]에 있는 버전으로 바꿉니다. 해당 URL을 {{< ui >}}Amazon S3 URL{{< /ui >}} 필드에 붙여넣습니다.
1. {{< ui >}}Next{{< /ui >}}를 클릭하여 다음 몇 페이지를 수정하지 않고 넘어간 다음 양식을 제출합니다.

## Terraform 모듈 업데이트 {#update-the-terraform-module}

Agentless Scanner 모듈에 대한 `source` 참조를 최신 릴리스로 업데이트하세요. 최신 버전은 [GitHub 릴리스][2]에서 찾을 수 있습니다.

사용 예시는 [GitHub 리포지토리][3]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/cloudformation-template/blob/master/aws_quickstart/version.txt
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/releases
[3]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples