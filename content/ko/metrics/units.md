---
aliases:
- /ko/developers/metrics/metrics_units
- /ko/developers/metrics/units/
further_reading:
- link: /dashboards/
  tag: 설명서
  text: 데이터를 시각화하여 인사이트 확보
title: 메트릭 단위
---

## 개요

메트릭 단위는 시계열 그래프, 쿼리 값 위젯 및 상위 목록 등에 표시됩니다.

{{< img src="metrics/units/redis_dash_metrics_units.png" alt="Redis 대시 매트릭 단위" style="width:100%;">}}

시계열 그래프에서 그래프 위 아무데나 커서를 가리켜 해당 단위를 볼 수 있습니다. 단위는 직접 지정되어야 하지만 단위가 지정되지 않으면 자릿수 표기법(예: 천, 백만, 10억 등에 대해 각각 K, M, G)이 사용됩니다. 단위가 지정된 경우 원본 데이터가 자동으로 해당 자릿수를 사용하여 읽기 가능한 표시 단위로 전환됩니다.

예를 들어 3,000,000,000인 데이터 요소가 있는 경우,

* 이 데이터 요소에 대한 단위를 지정하지 않은 경우 "3G"가 표시됩니다.
* 이 데이터 요소를 바이트로 지정한 경우 "3GB"가 표시됩니다.

단위는 타임보드 그래프 하단에도 표시됩니다. 기어 드롭다운에서 **메트릭 정보**를 선택하면 메트릭 설명도 사용할 수 있습니다.

{{< img src="metrics/units/annotated_ops.png" alt="주석 지정 연산자" style="width:100%;">}}

메트릭 단위를 변경하려면 [메트릭 요약][1] 페이지로 이동한 다음 메트릭을 선택하세요. **메타데이터**에서 **편집**을 클릭한 다음 드롭다운 메뉴에서 `bit` 또는 `byte` 등 단위를 선택하세요.

## 단위 목록

다음 단위는 Datadog에 제출된 메트릭과 연결되어 있을 수 있습니다.

| 타입        | 단위                                                                                                                                                                                                                                                                                                                    |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 바이트       | bit / byte / kibibyte / mebibyte / gibibyte / tebibyte / pebibyte / exbibyte                                                                                                                                                                                                                                               |
| 시간        | nanosecond / microsecond / millisecond / second / minute / hour / day / week                                                                                                                                                                                                                                               |
| 백분율  | percent_nano / percent / apdex / fraction                                                                                                                                                                                                                                                                                  |
| 네트워크     | connection / request / packet / segment / response / message / payload / timeout / datagram / route / session / hop                                                                                                                                                                                                             |
| 시스템      | process / thread / host / node / fault / service / instance / cpu                                                                                                                                                                                                                                                          |
| 디스크        | file / inode / sector / block                                                                                                                                                                                                                                                                                              |
| 일반     | buffer / error / read / write / occurrence / event / time / unit / operation / item / task / worker / resource / garbage collection / email / sample / stage / monitor / location / check / attempt / device / update / method / job / container / execution / throttle / invocation / user / success / build / prediction / exception |
| DB          | table / index / lock / transaction / query / row / key / command / offset / record / object / cursor / assertion / scan / document / shard / flush / merge / refresh / fetch / column / commit / wait / ticket / question                                                                                                  |
| 캐시       | hit / miss / eviction / get / set                                                                                                                                                                                                                                                                                          |
| 화폐       | dollar / cent / microdollar / euro                                                                                                                                                                                                                                                                                         |
| 메모리      | page / split                                                                                                                                                                                                                                                                                                               |
| 주파수   | hertz / kilohertz / megahertz / gigahertz                                                                                                                                                                                                                                                                                  |
| 기록     | entry                                                                                                                                                                                                                                                                                                                      |
| 온도 | decidegree celsius / degree celsius / degree fahrenheit                                                                                                                                                                                                                                                                    |
| CPU         | nanocore / microcore / millicore / core / kilocore / megacore / gigacore / teracore / petacore / exacore                                                                                                                                                                                                                   |
| 전력       | nanowatt / microwatt / milliwatt / deciwatt / watt / kilowatt / megawatt / gigawatt / terrawatt                                                                                                                                                                                                                            |
| 전류     | milliampere / ampere                                                                                                                                                                                                                                                                                                       |
| 퍼텐셜   | millivolt / volt                                                                                                                                                                                                                                                                                                           |
| APM         | span                                                                                                                                                                                                                                                                                                                       |
| 신서틱(Synthetic)  | run                                                                                                                                                                                                                                                                                                                        |

## 숫자 형식

### 단위 없는 숫자 형식

단위 없는 메트릭의 경우 Datadog에서는 [SI 접두어][2] `K`, `M`, `G` 및 `T`을(를) 사용합니다. `T` 이후 숫자는 지수로 표기합니다. 지수 표기법은 매우 작은 숫자에도 사용됩니다. 기본적으로 Datadog는 소수점 두 번째 자리에서 반올림합니다. 지수 표기법의 경우 소수점 0자리를 사용합니다.

#### 예시

| 원시 값              | 형식 값 |
|------------------------|-----------|
| 1                      | 1         |
| 2.7182818284           | 2.72      |
| 1337                   | 1.34K     |
| 31536000               | 31.54M    |
| 4294967296             | 4.29G     |
| 18446744073709552000   | 2e19      |
| 0.001                  | 1e-3      |
| 2.3283064365386963e-10 | 2e-10     |
| 잘못됨                | N/A       |

### 단위 처리

단위는 가독성을 위해 그래프에서 자동으로 형식이 지정됩니다.

#### 예시

| 단위       | 과    | 원시 값            | 형식 값    |
|------------|-----------|----------------------|--------------|
| 바이트       | 바이트     | 1                    | 1B          |
| 키비바이트   | 바이트     | 1234235              | 1.18GiB     |
| 키비바이트   | 바이트     | 45457878236741230000 | 40374.71EiB |
| 헤르쯔      | 주파수 | 6345223              | 6.35MHz     |
| 센트       | 화폐     | 1337                 | 13.37$      |
| 나노초 | 시간      | 0                    | 0s           |
| 초     | 시간      | 0.03212              | 32.12ms      |

### 시간 형식

분과 연도 사이의 시간 단위는 더 쉽게 읽을 수 있도록 더 여러 개의 단위로 나뉘어 집니다. 다음 원칙이 적용됩니다.

- 짧은 시간은 십진법 형식으로 표시됩니다.
- 가장 작은 시간 단위는 나노초입니다.
- 긴 시간은 십진법으로 기간(일수) 형식으로 표시됩니다.


#### 예시

| 원시 초 | 형식 값               |
|-------------|-------------------------|
| 0.00123     | 1.23ms                  |
| 0.00012345  | 123.45μs(마이크로초) |
| 1.2345e-9   | 1.23ns                  |
| 95          | 1m 35s                  |
| 3671        | 1h 1m                   |
| 86390       | 1d                      |
| 96400       | 1d 3h                   |
| 52596400    | 608.75 days             |


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/summary
[2]: https://en.wikipedia.org/wiki/Metric_prefix#List_of_SI_prefixes