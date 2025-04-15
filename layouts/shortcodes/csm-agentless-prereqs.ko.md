
## 사전 필수 요건

AWS 환경에서 에이전트리스 스캔을 배포하려면 [클라우드 보안 관리][3]를 사용하도록 설정하는 것 외에도 원격 설정 을 사용하도록 설정해야 합니다.

### 원격 사용 설정

[원격 설정][1](**2024년 4월 8일 기준 [기본값][2]으로 활성화됨**)이 있어야 Datadog에서 스캔할 클라우드 리소스 등의 정보를 에이전트리스 스캐너에 전송할 수 있습니다. 조직에서 원격 설정을 사용하도록 설정하지 않은 경우 [Datadog에서 조직 설정][4]으로 이동하여 원격 설정 설명서의 [1-4단계][2]를 따르세요.

**참고**: 스캐너가 배포된 CSM 사용 AWS 계정에는 원격-설정 사용 API 키가 필요합니다.

### 권한

**참고**: 다음은 에이전트리스 스캔에 필요한 권한이며, 설치 프로세스의 일부로 자동으로 적용됩니다.

####  IAM 권한(호스트 및 컨테이너 권한)

에이전트리스 스캔 인스턴스에서 호스트 및 컨테이너를 스캔하려면 다음 IAM 권한이 필요합니다.

```
ec2:DescribeVolumes
ec2:CreateTags
ec2:CreateSnapshot
ec2:DeleteSnapshot
ec2:DescribeSnapshots
ec2:DescribeSnapshotAttribute
ebs:ListSnapshotBlocks
ebs:ListChangedBlocks
ebs:GetSnapshotBlock
```

#### 람다 권한

에이전트리스 스캔 인스턴스에서 람다를 스캔하려면 다음 IAM 권한이 필요합니다.

```
lambda:GetFunction
```


[1]: /agent/remote_config/?tab=configurationyamlfile
[2]: /agent/remote_config/?tab=configurationyamlfile#setup
[3]: /security/cloud_security_management/setup
[4]: https://app.datadoghq.com/organization-settings/remote-config