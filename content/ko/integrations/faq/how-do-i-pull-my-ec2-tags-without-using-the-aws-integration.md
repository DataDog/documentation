---
kind: faq
title: AWS 통합을 사용하지 않고 EC2 태그를 어떻게 불러오나요?
---

AWS 통합을 사용하지 않고 Datadog 에이전트를 통해 EC2 인스턴스의 커스텀 AWS 태그를 불러오려면 다음 단계를 따르세요.

{{< tabs >}}
{{% tab "IMDS 에이전트 v6 & v7" %}}

Datadog은 EC2 인스턴스 메타데이터 서비스로 인스턴스 태그를 수집하실 것을 권장합니다.

해당 메커니즘은 Datadog 에이전트 v7.35.0에서 사용할 수 있습니다.

1. 인스턴스 메타데이터에서 태그에 접근할 수 있도록 EC2 인스턴스가 설정되어 있는지 확인합니다. [AWS 문서][1] 항목을 참조하세요.
2. `datadog.yaml` 파일에서 `collect_ec2_tags: true` 및 `collect_ec2_tags_use_imds: true`를 설정합니다.
3. [에이전트를 다시 시작합니다][2].

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html#allow-access-to-tags-in-IMDS
[2]: /ko/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "EC2 API 에이전트 v6 & v7" %}}

EC2 인스턴스 메타데이터 서비스에서 태그를 사용할 수 없다면 Datadog 에이전트는 EC2 API로 태그를 수집합니다.

1. [AWS 문서][1]를 확인하여 EC2 **인스턴스**에 IAM 역할이 할당되었는지 확인합니다. 필요한 경우 이를 생성합니다.
2. IAM 역할에 `ec2:DescribeTags` 권한이 포함된 정책을 추가합니다.
3. `datadog.yaml`에서 `collect_ec2_tags: true`를 설정합니다.
4. [에이전트를 다시 시작합니다][2].

[1]: http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html
[2]: /ko/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "에이전트 v5" %}}

1. [AWS 문서][1]를 확인하여 **인스턴스**에 대한 IAM 역할을 생성합니다.
2. 정책 섹션의 경우 다음 권한을 지정합니다: `"ec2:Describe*"`, `"ec2:Get*"`.
3. `datadog.conf`에서 **collect_ec2_tags: true**를 설정합니다.
4. 옵션: `collect_security_groups`을 활성화하여 보안 그룹 태그를 추가합니다.
5. [에이전트를 다시 시작합니다][2].

[1]: http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html
[2]: /ko/agent/guide/agent-commands/?tab=agentv5#restart-the-agent
{{% /tab %}}
{{% tab "도커" %}}

1. [AWS 문서][1]를 확인하여 에이전트 작업에 IAM 역할이 할당되었는지 확인합니다. 필요한 경우 이를 생성합니다.
2. IAM 역할에 `ec2:DescribeTags` 권한이 포함된 정책을 추가합니다.
3. `DD_COLLECT_EC2_TAGS=true` 환경 변수로 Datadog 에이전트 컨테이너를 시작합니다.

**참고**: 기존 버전과의 호환성을 보장하기 위해, 에이전트는 ECS 작업 역할을 사용할 수 없거나 충분한 권한이 없을 경우 EC2 인스턴스 역할을 사용하려 시도합니다.

[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html
{{% /tab %}}
{{< /tabs >}}

본 옵션은 AWS 콘솔 **태그** 탭의 EC2 호스트에 설정된 커스텀 태그만 불러옵니다.

{{< img src="integrations/faq/ec2_tags.png" alt="ec2_tags" >}}

`availability_zone`, `region`, `instance_type`와 같은 태그는 [AWS 통합][1]을 통해 EC2 호스트를 불러와야만 사용할 수 있습니다.

[1]: /ko/integrations/amazon_web_services/?tab=allpermissions