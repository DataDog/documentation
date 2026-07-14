---
title: EFS 구성 요소
---
## 개요

EFS 블록 구성 요소를 사용하여 Amazon Web Services 아키텍처의 탄력적 파일 시스템을 나타냅니다.

{{< img src="cloudcraft/components-aws/efs/component-efs-diagram.png" alt="'EFS' AWS 구성 요소를 나타내는 아이소메트릭 Cloudcraft 다이어그램 스크린샷." responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 구성 요소와 강조 항목에 적용할 사전 정의된 색상을 선택하거나 16진수 값을 입력할 수 있습니다. 구성 요소에서는 2D와 3D 모두에 같은 색상을 사용하거나 각각에 다른 색상을 적용할 수 있습니다.
- **Storage**: 파일 시스템 워크로드에 사용되는 스토리지 등급입니다.
- **Storage (GiB)**: 월별 저장되는 데이터의 양입니다.
- **Access Requests(GiB)**: 월별 요청된 데이터의 양입니다. Infrequent Access 스토리지 등급에서만 사용할 수 있습니다.
- **Throughput mode**: 파일 시스템 처리량 모드를 선택합니다.
- **Throughput(MiB/s)**: 제공되는 추가 처리량입니다. 프로비저닝된 처리량 모드에서만 사용할 수 있습니다.

## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 아키텍처 다이어그램을 JSON 객체로 렌더링할 수 있습니다.

### 스키마

다음은 SES 구성 요소의 JSON 예시입니다.

```json
{
  "type": "efs",
  "id": "c7031016-107f-4bc7-a18a-b86321a135b7",
  "region": "us-east-1",
  "availabilityZone": "us-east-1a",
  "mapPos": [1,2],
  "usageGb": 10,
  "readWriteGb": 0,
  "infrequentAccess": false,
  "throughputMode": "bursting",
  "throughput": 0,
  "color": {
    "isometric": "#e05243",
    "2d": "#3f8624"
  },
  "accentColor": {
    "isometric": "#ffffff",
    "2d": "#ffffff"
  },
  "link": "blueprint://33a8bf46-7326-4999-ba0a-789bcd94f0a2",
  "locked": true
}
```

- **type: efs**: 구성 요소의 유형입니다.
- **id: string**: `uuid` 형식의 구성 요소 고유 식별자입니다.
- **region: string**: EFS 구성 요소가 배포된 AWS 리전. `cn-` 리전을 제외한 모든 글로벌 리전이 지원됩니다.
- **availabilityZone: string**: 탄력적 파일 시스템이 배포된 AWS 가용 영역입니다. 단일 영역 스토리지에만 적용됩니다.
- **mapPos: [number, number]**: 블루프린트에 있는 구성 요소의 포지션. X와 Y 좌표 쌍을 이용해 표현됩니다.
- **usageGb: number**: 월별 EFS에 저장되는 데이터의 양(기비바이트 단위)입니다.
- **readWriteGb: number**: 월별 요청되는 데이터의 양입니다. `infrequentAccess`가 `true`로 설정된 경우에만 적용됩니다.
- **infrequentAccess: boolean**: `true`인 경우 탄력적 파일 시스템에서 Infrequent Access 스토리지 등급를 사용합니다. 기본값은 `false`입니다.
- **throughputMode: string**: 탄력적 파일 시스템의 처리량 모드를 선택합니다. 허용값은 `bursting` 또는 `provisioned`입니다.
- **throughput: number**: 파일 시스템에 프로비저닝된 크기 기반 월별 초당 추가 처리량(메비바이트 단위)입니다. `throughputMode`가 `provisioned`로 설정된 경우에만 적용됩니다.
- **color: object**: 구성 요소에 적용할 색입니다.
  - **isometric: string**: 3D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
- **accentColor: object**: 블록에 있는 구성 요소 로고의 강조색입니다.
  - **isometric: string**: 3D 보기의 구성 요소 강조색. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기의 구성 요소 강조색. 16진수 색이어야 합니다.
- **link: uri**: `blueprint://ID` 형식을 사용해 구성 요소를 다른 다이어그램으로 연결하거나 `https://LINK` 형식을 사용해 외부 웹사이트로 연결합니다.
- **locked: boolean**: `true`로 설정하면 어플리케이션을 통한 구성 요소 변경은 잠금 해제 시까지 비활성화됩니다.

EFS 구성 요소는 [VPC][2], [보안 그룹][3], [서브넷][4]에 추가할 수 있습니다.

[1]: https://developers.cloudcraft.co/
[2]: /ko/cloudcraft/components-aws/vpc/
[3]: /ko/cloudcraft/components-aws/security-group/
[4]: /ko/cloudcraft/components-aws/subnet/