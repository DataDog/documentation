---
aliases:
- /ko/network_performance_monitoring/devices/guide/build-ndm-profile
further_reading:
- link: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/
  tag: 설명서
  text: 프로필 형식 참조
- link: https://datadoghq.dev/integrations-core/tutorials/snmp/sim-format/
  tag: 설명서
  text: 시뮬레이션 데이터 형식 참조
title: NDM 프로필 만들기
---

Datadog 네트워크 장치 모니터링은 프로필을 사용하여 네트워크 장치에서 메트릭을 수집합니다. 이는 좁게는 MIB에 의해 정의되거나 특정 장치 제조업체 및 모델에서 메트릭을 수집하기 위해 정의됩니다. 이 튜토리얼에서는 HP iLO4 장치에서 OID 메트릭을 수집하는 기본 NDM 프로필을 구축하는 단계를 보여 줍니다.

NDM 프로필은 SNMP 개념을 사용합니다. SNMP에 대한 기본적인 내용은 [용어][1]를 참조하세요.

<div class="alert alert-warning">
이 가이드는 고급 사용자를 위한 것입니다. 대부분의 장치는 <a href="/network_monitoring/devices/profiles#metric-definition-by-profile">Datadog 프로필</a>을 사용하여 설정할 수 있습니다.
</div>

## 리서치

NDM 프로필을 구축하기 위한 첫 번째 단계는 장치를 조사하고 수집할 메트릭을 결정하는 것입니다.

### 장치 정보

제조업체의 웹 사이트를 참조하거나 웹에서 다음 정보를 검색하세요:

- 장치 이름, 제조업체 및 [시스템 개체 식별자][1]입니다.

- 장치 및 사용 사례를 확인합니다. 메트릭은 라우터, 스위치, 브리지 등에 따라 다릅니다. 예를 들어 [HP iLO 위키피디아 페이지][2]에 따르면 iLO4 장치는 시스템 관리자가 내장된 서버의 원격 관리를 위해 사용합니다.

- 사용 가능한 장치 버전 및 대상 버전입니다. 예를 들어 HP iLO 장치는 여러 버전으로 존재합니다. 본 튜토리얼은 특히 HP iLO4를 대상으로 합니다.

- 지원되는 MIB (ASN1, 텍스트 형식), OID 및 관련 MIB 파일입니다. 예를 들어, HP는 iLO 장치 [웹사이트][3]를 위한 MIB 패키지를 제공합니다. **참고**: 메트릭을 수집하기 위해 프로필에 MIB가 필요하지 않습니다.

**참고**: 장치 사용 사례에 대한 자세한 내용은 [네트워크 하드웨어][4]를 참조하세요.

### 메트릭 선택

다음으로 수집할 메트릭을 결정합니다. 장치는 종종 수십 개의 MIB에 걸쳐 수천 개의 메트릭과 OID를 노출합니다.

이 프로세스에서 도움이 되는 몇 가지 지침입니다:

- 메트릭 수를 10에서 40 사이로 유지합니다.
- 기본 프로필을 탐색하여 장치에 적용할 수 있는 프로필을 확인합니다.
- 다음과 같이 메트릭을 찾는 제조업체별 MIB 파일을 탐색합니다:
    - 일반 상태: 상태 게이지
    - 네트워크 트래픽: 바이트 입력/출력, 오류 입력/출력
    - CPU 및 메모리 사용량
    - 온도: 온도 센서, 열 상태
    - 전원 공급 장치: 켜기/끄기 또는 전체 지점

## 구현

### 프로필 추가하기

먼저 `sysobjectid` 및 메트릭을 사용하여 `.yaml` 파일을 생성하고 프로필을 추가합니다. 예를 들어:

```yaml
sysobjectid: 1.3.6.1.4.1.232.9.4.10

metrics:
  - MIB: CPQHLTH-MIB
    symbol:
      OID: 1.3.6.1.4.1.232.6.2.8.1.0
      name: cpqHeSysUtilLifeTime
```

**참고**: `sysobjectid`는 장치의 하위 트리와 일치하는 와일드카드 패턴일 수 있습니다. 예:`1.3.6.1.131.12.4.*`.

## 프로필 테스트

둘째, 프로필을 사용할 장치의 IP 주소를 타겟팅하여 프로필을 테스트합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/network_monitoring/devices/troubleshooting#terminology
[2]: https://en.wikipedia.org/wiki/HP_Integrated_Lights-Out
[3]: https://support.hpe.com/hpsc/swd/public/detail?swItemId=MTX_53293d026fb147958b223069b6
[4]: https://en.wikipedia.org/wiki/Networking_hardware