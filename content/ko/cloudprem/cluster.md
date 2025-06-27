---
description: CloudPrem의 클러스터 크기 조정, 확장, 모니터링 및 유지 관리에 대해 알아보기
further_reading:
- link: /cloudprem/
  tag: 설명서
  text: CloudPrem 개요
- link: /cloudprem/installation/
  tag: 설명서
  text: CloudPrem 설치 및 Agent를 사용하여 로그 전송
- link: /cloudprem/ingress/
  tag: 설명서
  text: CloudPrem Ingress 구성하기
- link: /cloudprem/aws_config
  tag: 설명서
  text: AWS 구성하기
- link: /cloudprem/processing/
  tag: 설명서
  text: CloudPrem Log Processing 구성하기
- link: /cloudprem/architecture/
  tag: 설명서
  text: CloudPrem Architecture란?
- link: /cloudprem/troubleshooting/
  tag: 설명서
  text: 트러블슈팅
private: true
title: 클러스터 크기 조정 및 운영
---

<div class="alert alert-warning">CloudPrem는 Preview 버전입니다.</div>

## 개요

이 문서에서는 CloudPrem 클러스터 구성 요소, 특히 인덱서와 검색자의 크기를 조정하는 방법에 대해 다룹니다.

<div class="alert alert-info">
아래 내용은 시작 단계를 위한 권장 사항입니다. 클러스터의 성능과 리소스 사용률을 지속적으로 모니터링하고 필요에 따라 크기를 조정하세요.
</div>

## 인덱서

- **성능:** 초당 5MB의 로그를 인덱싱하려면, CloudPrem에는 대략 vCPU 1개와 RAM 2GB가 필요합니다.
- **권장 포드 크기:** 다음 중 하나를 사용하여 인덱서 포드를 배포하는 것이 좋습니다.
  - vCPU 2개 및 RAM 4GB
  - vCPU 4개 및 RAM 8GB
  - vCPU 8개 및 RAM 16GB
- **저장소:** 인덱서는 인덱스 파일을 구성하는 동안 임시 데이터를 저장하기 위해 영구 저장소(SSD가 가장 적합하지만 로컬 HDD 또는 원격 EBS 볼륨도 사용 가능)가 필요합니다.
  - 최소: 포드당 100GB
  - 권장 사항(포드 > vCPU 4개): 포드당 200GB
- **계산 예시:** 하루에 1TB를 인덱싱하려면(~11.6MB/초):
  - 필요한 vCPU: `(11.6 MB/s / 5 MB/s/vCPU) ≈ 2.3 vCPUs`
  - 정리하면, vCPU 3개와 RAM 6GB으로 구성된 인덱서 포드 하나로 시작하기 위해 100GB EBS 볼륨이 필요할 수 있습니다. (성능 모니터링 결과 및 예비 시스템 필요 여부에 따라 이 구성을 조정하세요.)

## 검색자

- **성능:** 검색 성능은 작업 부하(쿼리 복잡성, 동시성, 스캔된 데이터)에 따라 크게 달라집니다.
- **경험칙:** 인덱서에 할당된 vCPU 수보다 두 배 정도를 초기 자원으로 잡는 것이 좋습니다.
- **메모리:** 검색자 vCPU당 RAM 4GB를 권장합니다. 동시에 많은 집계 요청이 예상되면 더 많은 메모리(RAM)를 할당하세요.

## 기타 서비스

다음은 일반적인 경량 구성 요소입니다.

- **Control Plane:** vCPU 1개, RAM 2GB
- **Metastore:** vCPU 1개, RAM 2GB
- **Janitor:** vCPU 1개, RAM 2GB

## Postgres Metastore 백엔드

- **인스턴스 사이즈:** 대부분의 경우 vCPU 1개와 RAM 4GB가 있는 PostgreSQL 인스턴스면 충분합니다.
- **AWS RDS 권장 사항:** AWS RDS를 사용하는 경우 `t4g.medium` 인스턴스 유형이 시작하기에 좋습니다.
- **고가용성:** 고가용성을 위해 대기 복제본 1개를 포함한 Multi-AZ 배포를 활성화하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}