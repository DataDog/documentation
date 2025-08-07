---
title: FSx 구성 요소
---
## 개요

FSx 구성 요소로 Amazon Web Services 아키텍처의 FSx 파일 시스템을 나타냅니다.

{{< img src="cloudcraft/components-aws/fsx/component-fsx-diagram.png" alt="'FSx' AWS 구성 요소를 나타내는 아이소메트릭 Cloudcraft 다이어그램 스크린샷." responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 구성 요소와 강조 항목에 적용할 사전 정의된 색상을 선택하거나 16진수 값을 입력할 수 있습니다. 구성 요소에서는 2D와 3D 모두에 같은 색상을 사용하거나 각각에 다른 색상을 적용할 수 있습니다.
- **File system**: FSx에 사용되는 파일 시스템입니다.
- **Storage(GiB)**: 파일 시스템용으로 프로비저닝된 스토리지의 양입니다.
- **Storage type**: 파일 시스템의 저장소 유형을 선택합니다. Lustre 파일 시스템에는 사용할 수 없습니다.
- **Throughput(MiB/s)**: 집계된 처리 용량입니다. Lustre 파일 시스템에는 사용할 수 없습니다.
- **Backup size (GiB)**: 데이터 중복 제거용으로 프로비저닝된 스토리지의 양입니다. Lustre 파일 시스템에는 사용할 수 없습니다.
- **Deployment type**: 파일 시스템의 배포 유형(단일 또는 다중 AZ)입니다. Lustre 파일 시스템에는 사용할 수 없습니다.

## API

[Cloudcraft API][1]로 프로그래밍을 통해 액세스하여 아키텍처 다이어그램을 JSON 객체로 렌더링할 수 있습니다.

### 스키마

다음은 FSx 구성 요소의 JSON 예시입니다.

```json
{
  "type": "fsx",
  "id": "df89904a-a53e-4c2d-b63c-757c7ad6b4aa",
  "region": "us-east-1",
  "mapPos": [0,10],
  "fileSystemType": "windows",
  "storageCapacity": 32,
  "storageType": "ssd",
  "throughputCapacity": 8,
  "backupCapacity": 600,
  "multiAZ": false,
  "color": {
    "isometric": "#3f8624",
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

- **type: fsx**: 구성 요소의 유형.
- **id: string**: `uuid` 형식의 구성 요소 고유 식별자입니다.
- **region: string**: FSx 구성 요소가 배포된 AWS 리전. `cn-` 리전을 제외한 모든 글로벌 리전이 지원됩니다.
- **mapPos: [number, number]**: 블루프린트에 있는 구성 요소의 포지션. X와 Y 좌표 쌍을 이용해 표현됩니다.
- **fileSystemType: string**: FSx 구성 요소에 사용되는 파일 시스템입니다. 허용되는 값은 `windows`,  `lustre`입니다.
- **storageCapacity: number**: 파일 시스템용으로 프로비저닝된 데이터의 양(기비바이트 단위)입니다.
- **storageType: string**: 파일 시스템의 스토리지 유형을 선택합니다. 허용되는 값은 `ssd`, `hdd`입니다. `fileSystemType`이  `windows`로 설정된 경우에만 적용됩니다.
- **throughputCapacity: number**: 초당 집계된 처리량(메비바이트 단위)입니다. 자세한 내용은 ['`throughputCapacity`' 허용값](#accepted-values-for-throughputcapacity)을 참조하세요.
- **backupCapacity: number**: 데이터 중복 제거를 위해 프로비저닝된 스토리지 용량(기비바이트 단위)입니다. `fileSystemType`이 `windows`로 설정된 경우에만 적용됩니다.
- **multiAZ: boolean**: `true`인 경우 FSx 파일 시스템이 다중 AWS 가용 영역에 배포됩니다. `fileSystemType`이 `windows`로 설정된 경우에만 적용됩니다.
- **color: object**: 구성 요소에 적용할 색입니다.
  - **isometric: string**: 3D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
- **accentColor: object**: 블록에 있는 구성 요소 로고의 강조색입니다.
  - **isometric: string**: 3D 보기의 구성 요소 강조색. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기의 구성 요소 강조색. 16진수 색이어야 합니다.
- **link: uri**: `blueprint://ID` 형식을 사용하여 구성 요소를 다른 다이어그램에 연결하거나 `https://LINK` 형식을 사용하여 외부 웹사이트에 연결합니다.
- **locked: boolean**: `true`로 설정하면 애플리케이션을 사용해 변경한 항목은 잠금 해제될 때까지 비활성화 상태입니다.

FSx 구성 요소는 [VPC][2], [보안 그룹][3], [서브넷][4]에 추가할 수 있습니다.

## `throughputCapacity` 허용값

`throughputCapacity` 키는 다음 값을 허용합니다.

```
8, 16, 32, 64, 128, 256, 512, 1024, 2048
```

`throughputCapacity` 키는 `fileSystemType`이 `windows`로 설정된 경우에만 적용됩니다.

[1]: https://developers.cloudcraft.co/
[2]: /ko/cloudcraft/components-aws/vpc/
[3]: /ko/cloudcraft/components-aws/security-group/
[4]: /ko/cloudcraft/components-aws/subnet/