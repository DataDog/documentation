1. 드롭다운에서 옵션 중 하나를 선택하여 파이프라인에 예상되는 로그 또는 메트릭 볼륨을 제공합니다.
|   옵션   | 설명 |
| ---------- | ----------- |
| 확실하지 않음 | 데이터 볼륨을 예측할 수 없거나 Worker를 테스트하려는 경우 이 옵션을 사용하세요. 이 옵션은 최대 2개의 범용 `t4g.large` 인스턴스로 EC2 Auto Scaling 그룹을 프로비저닝합니다. |
| 1-5 TB/day | 이 옵션은 최대 2개의 컴퓨팅 최적화 인스턴스 `c6g.large`로 EC2 Auto Scaling 그룹을 프로비저닝합니다. |
| 5-10 TB/day | 이 옵션은 최소 2개, 최대 5개의 컴퓨팅 최적화 `c6g.large` 인스턴스로 EC2 Auto Scaling 그룹을 프로비저닝합니다. |
| >10 TB/day | Datadog은 대규모 프로덕션 배포에 이 옵션을 권장합니다. 이 옵션은 최소 2개, 최대 10개의 컴퓨팅 최적화 `c6g.xlarge` 인스턴스로 EC2 Auto Scaling 그룹을 프로비저닝합니다. |

    **참고**: 다른 모든 파라미터는 Worker 배포를 위한 적절한 기본값으로 설정되지만, 스택을 생성하기 전에 AWS Console에서 필요에 따라 사용 사례에 맞게 조정할 수 있습니다.
1. Worker를 설치할 AWS 리전을 선택합니다.
1. **Select API key**를 클릭하여 사용할 Datadog API 키를 선택합니다.
    - **참고**: API 키는 [Remote Configuration에 사용하도록 활성화][7002]되어 있어야 합니다.
1. **Launch CloudFormation Template**를 클릭하여 AWS Console로 이동한 후 스택 구성을 검토하고 시작합니다. CloudFormation 파라미터가 예상대로 설정되었는지 확인하세요.
1. Worker를 설치할 VPC와 subnet을 서브넷을 선택합니다.
1. IAM에 필요한 권한 확인란을 검토하고 선택합니다. **Submit**을 클릭하여 스택을 생성합니다 이 시점에서 CloudFormation이 설치를 처리합니다. Worker 인스턴스가 시작되고 필요한 소프트웨어가 다운로드되며 Worker가 자동으로 시작됩니다.
1. Observability Pipelines 설치 페이지로 돌아가서 **Deploy**를 클릭합니다.

파이프라인 구성을 변경하려면 [기존 Pipelines 업데이트][7001]를 참조하세요.

[7001]: /ko/observability_pipelines/configuration/update_existing_pipelines
[7002]: https://app.datadoghq.com/organization-settings/remote-config/setup