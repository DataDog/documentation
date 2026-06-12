---
title: EBS 컴포넌트
---
## 개요

EBS 컴포넌트로 AWS 아키텍처에서 EBS 볼륨을 표시합니다.

{{< img src="cloudcraft/components-aws/ebs/component-ebs-diagram.png" alt="'EBS' AWS 컴포넌트를 나타내는 아이소메트릭 Cloudcraft 다이어그램 스크린샷." responsive="true" style="width:60%;">}}

## 도구 모음

도구 모음을 사용해 구성 요소를 구성하고 사용자 지정할 수 있습니다. 다음 옵션을 사용할 수 있습니다.

- **Color**: 구성 요소와 강조 항목에 적용할 사전 정의된 색상을 선택하거나 16진수 값을 입력할 수 있습니다. 구성 요소에서는 2D와 3D 모두에 같은 색상을 사용하거나 각각에 다른 색상을 적용할 수 있습니다.
- **Volume type**:  사용된 볼륨 유형입니다.
- ***Storage**: 볼륨의 저장 용량(기비바이트 단위)입니다.
- **IOPS**: 볼륨의 IOPS 제한입니다. SSD 볼륨에만 사용할 수 있습니다.
- **Throughput**: 볼륨의 처리량 제한입니다. `gp3` 볼륨에만 사용할 수 있습니다.
- **I/O requests per second**: 볼륨의 I/O 요청 제한입니다. 이전 세대의 마그네틱 HDD 볼륨에만 사용할 수 있습니다.
- **Snapshot**: 스냅샷의 저장 용량(기비바이트 단위)입니다.


## API

[Cloudcraft API][1]를 사용해 프로그래밍을 통해 액세스하여 JSON 개체의 아키텍처 다이어그램을 렌더링할 수 있습니다.

### 스키마

다음은 EBS 볼륨 컴포넌트의 JSON 예시입니다.

```json
{
  "type": "ebs",
  "id": "100b1d12-49e7-4dfb-8948-0e0abf0e5d33",
  "region": "us-east-1",
  "mapPos": [-1,9],
  "volume": "gp3",
  "storage": "200",
  "iops": "4000",
  "throughput": "500",
  "snapshots": "0",
  "color": {
    "isometric": "#000000",
    "2d": "#000000"
  },
  "accentColor": {
    "isometric": "#ffeb3b",
    "2d": "#ffeb3b"
  },
  "link": "blueprint://ae6349e1-fa15-41c8-8e89-d201f9fa3cc9",
  "locked": true
}
```

- **type: ebs**: 컴포넌트의 유형.
- **id: string**: `uuid` 형식의 구성 요소 고유 식별자
- **region: string**: EBS 볼륨을 배포한 AWS 리전. `cn-` 리전을 제외한 모든 글로벌 리전이 지원됩니다.
- **mapPos: [number, number]**: 청사진에 있는 컴포넌트의 위치. X와 Y 좌표 쌍을 이용해 표현됩니다.
- **volume: string**: 볼륨의 유형. 허용되는 값은 `gp3`, `gp2`, `io2`, `io1`, `st1`, `sc1` 또는 `magnetic`입니다.
- **storage: number**: 볼륨의 저장 용량(기비바이트 단위).
- **iops: number**: 볼륨의 IOPS 제한. `st1` 및 `sc1` 볼륨 유형에는 적용되지 않습니다.
- **throughput: number**: 볼륨의 처리량 제한. `gp3` 볼륨 유형에만 적용됩니다.
- **snapshots: number**: 스냅샷의 저장 용량(기비바이트 단위).
- **color: object**: 구성 요소에 적용할 색
  - **isometric: string**: 3D 보기에서 구성 요소에 적용할 색. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기에서 컴포넌트에 적용할 색. 16진수 색이어야 합니다.
- **accentColor: object**: 블록의 컴포넌트 로고를 나타내는 강조색.
  - **isometric: string**: 3D 보기의 컴포넌트 강조색. 16진수 색이어야 합니다.
  - **2d: string**: 2D 보기의 컴포넌트 강조색. 16진수 색이어야 합니다.
- **link: uri**: `blueprint://ID` 형식으로 컴포넌트를 다른 다이어그램에 연결하거나 `https://LINK` 형식으로 외부 웹사이트에 연결합니다.
- **locked: boolean**: `true`로 설정하면 어플리케이션을 통한 컴포넌트 변경은 잠금 해제 시까지 비활성화됩니다.

[1]: https://developers.cloudcraft.co/