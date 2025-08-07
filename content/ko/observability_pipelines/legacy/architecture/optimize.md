---
aliases:
- /ko/observability_pipelines/architecture/optimize/
title: (레거시) 인스턴스 최적화
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Observability Pipelines는 US1-FED Datadog 사이트에서 사용할 수 없습니다.</div>
{{< /site-region >}}

<div class="alert alert-info">
본 지침은 대규모 프로덕션 수준 배포용입니다.
</div>

## 인트턴스 규모 조정

최소 8개의 vCPU와 16GiB 메모리를 갖춘 컴퓨팅 최적화 인스턴스입니다. 이 정도가 Observability Pipelines Workers Aggregator를 수평 확장하는 데 가장 적합한 유닛입니다. Observability Pipelines Worker는 수직 확장이 가능하며, 더 큰 인스턴스를 선택할 경우 자동으로 추가 리소스를 이용할 수 있습니다. 데이터 볼륨에 최소 2개의 Observability Pipelines Worker 인스턴스를 허용하는 크기를 선택하여 가용성을 향상합니다.

| 클라우드 공급자| 추천                                        |
| ------------- | ----------------------------------------------------- |
| AWS           | c6i.2xlarge (추천) 또는 c6g.2xlarge              |
| Azure         | f8                                                    |
| Google 클라우드  | c2(vCPU 8개, 16 GiB 메모리)                           |
| 프라이빗       | vCPU 8개, 16GiB 메모리, 로컬 디스크 불필요 |

## CPU 크기 조정

Observability Pipelines Worker 워크로드는 CPU 제약을 받으며, 최신 CPU에서 가장 잘 작동합니다.

| 클라우드 공급자| 추천                                                        |
| ------------- | --------------------------------------------------------------------- |
| AWS           | Intel Xeon 최신 세대, vCPUs 8개(추천), 최소 vCPU 4개 |
| Azure         | Intel Xeon 최신 세대, vCPUs 8개(추천), 최소 vCPU 4개 |
| Google 클라우드  | Intel Xeon 최신 세대, vCPUs 8개(추천), 최소 vCPU 4개 |
| 프라이빗       | Intel Xeon 최신 세대, vCPUs 8개(추천), 최소 vCPU 4개 |

## CPU 아키텍처

Most Observability Pipelines Worker 워크로드는 최신 CPU 아키텍처에서 실행됩니다. X86_64 아키텍처는 Observability Pipelines Worker가 최적의 성능을 발휘할 수 있도록 도와줍니다.

## 메모리 크기 조정

Observability Pipelines Worker의 어파인 유형 시스템 때문에 Observability Pipelines Worker 워크로드의 메모리는 제약을 거의 받지 않습니다. 따라서 Datadog에서는 vCPU당 최소 2 GiB 이상의 메모리를 사용할 것을 권장합니다. 인 메모리 버퍼링과 배치 처리 때문에 싱크 수가 증가할수록 메모리 사용도 증가합니다. 싱크가 많을 경우 메모리 증량이나 디스크 버퍼로 전환할 것을 고려해야 합니다.

## 디스크 크기 조정

내구성을 높이기 위해 Observability Pipelines Worker의 디스크 버퍼를 사용하는 경우(권장), vCPU당 최소 36GiB의 디스크 공간을 프로비저닝합니다. vCPU 8개 권장 사항에 따라, 288GiB의 디스크 공간을 프로비저닝하세요(10MiB * 60초 * 60분 * vCPU 8개).

| 클라우드 공급자| 권장 사항*                                               |
| ------------- | --------------------------------------------------------------|
| AWS           | EBS gp3, vCPU당 36GiB, 추가 IOPS 또는 처리량 없음    |
| Azure         | 울트라 디스크 또는 표준 SSD, vCPU당 36GiB                   |
| Google 클라우드  | 밸런스드 또는 SSD 영구 디스크, vCPU당 36GiB             |
| 프라이빗       | 네트워크 기반 블록 스토리지(동등 성능), vCPU당 36GiB       |

*권장 크기는 Observability Pipelines Worker의 1시간당 10MiB/s/vCPU 처리량으로 산출한 것입니다. 예를 들어, vCPU 8개 머신은 288GiB의 디스크 공간(10MiB * 60초 * 60분 * vCPU 8개)이 필요합니다.

### 디스크 유형

내구성과 복구에 최적화된 디스크 유형을 선택합니다. 예를 들어, 표준 블록 스토리지는 인스턴스에서 분리되어 있으며 여러 디스크에서 데이터를 복제하여 내구성이 높기 때문에 가장 적합합니다. 고성능 로컬 드라이브는 처리량이 Observability Pipelines Worker의 요구 사항을 초과하고 블록 스토리지에 비해 내구성이 떨어지기 때문에 권장하지 않습니다.

또한 Amazon의 EFS와 같은 네트워크 파일 시스템을 사용할 수 있으나, 처리량을 충분히 프로비저닝한 경우에만 가능하며 버스트 처리량 모드만으로는 충분하지 않습니다. Datadog은 수요 급증에 대비하여 예상 최대 처리량의 최소 두 배 이상 공간을 설정할 것을 권장합니다. 위의 권장 디스크의 경우 처리량이 충분하므로 걱정할 필요가 없습니다.

해당 아키텍처에서 디스크가 사용되는 이유와 관련한 자세한 내용을 확인하려면 [데이터 손실 방지][1]를 참조하세요.

### 운영 체제 및 GCC

가능하면 glibc(GNU) ≥ 2.14(2011년 출시)를 갖춘 Linux 기반 운영 체제를 선택합니다. Observability Pipelines Worker는 다른 플랫폼에서도 실행되지만, 이 조합이 Datadog의 벤치마크에서 가장 성능이 뛰어납니다.

[1]: /ko/observability_pipelines/legacy/architecture/preventing_data_loss