---
title: 커스텀 시간 프레임
---

## 개요

<div class="alert alert-info">쿼리는 UTC 시간 프레임에서 실행되나 쿼리 시간 프레임은 사용자의 <strong>브라우저 시간 프레임</strong>에 따라 선택됩니다. 대시보드 구성 작업에서 기본 시간 프레임이나 UTC 시간 프레임 간 토글할 수 있습니다. 자세한 정보는 <a href="/dashboards/configure/#configuration-actions">대시보드 구성 설명서</a>를 참고하세요.</div>

Datadog의 보기의 대다수는 특정 시간 프레임으로 범위를 지정할 수 있습니다. 시간 관리 기능에는 일반적인 시간 프레임 목록과 빠른 선택을 위한 달력 선택기가 포함됩니다.

월, 일, 년, 시 또는 분 단위로 증분하려면 다음과 같이 시간 프레임 일부를 강조 표시하고 `[↑]` 및 `[↓]` 키를 사용하세요.

{{< img src="dashboards/guide/custom_time_frames/increment_with_arrow_keys.mp4" alt="화살표로 시간 증분하기" video="true" width="500" >}}

## 지원되는 구문

### 고정 날짜

{{< img src="dashboards/guide/custom_time_frames/custom_fixed_time_frame.mp4" alt="커스텀 고정 시간 프레임 입력" video="true" width="500" >}}

| 형식                       | 예시                                         |
|------------------------------|--------------------------------------------------|
| `{MMM/MMMM} D`               | Jan 1<br>January 1                               |
| `M/D`                        | 1&#8203;/&#8203;1                                |
| `M-D`                        | 1-1                                              |
| `M/D/{YY/YYYY}`              | 1/1/19<br>1/1/2019                               |
| `M-D-{YY/YYYY}`              | 1-1-19<br>1-1-2019                               |
| `{MMM/MMMM} D, h:mm a`       | Jan 1, 1:00 pm<br>January 1, 1:00 pm             |
| `{MMM/MMMM} D, YYYY, h:mm a` | Jan 1, 2019, 1:00 pm<br>January 1, 2019, 1:00 pm |
| `h:mm a`                     | 1:00 pm                                          |
| Unix 초 타임스탬프       | 1577883600                                       |
| Unix 밀리초 타임스탬프  | 1577883600000                                    |

모든 고정 날짜를 범위의 일부로 입력할 수 있습니다. 다음 예시를 참고하세요.
  * `1577883600 - 1578009540`
  * `Jan 1 - Jan 2`
  * `6:00 am - 1:00 pm`

### 상대 날짜

상대 날짜는 시간이 지나도 업데이트되지 **않습니다**. 입력할 때 계산됩니다.

{{< img src="dashboards/guide/custom_time_frames/custom_relative_time_frame.mp4" alt="커스텀 상대 시간 프레임 입력" video="true" width="500" >}}

| 형식                                             | 설명                                                         |
|----------------------------------------------------|---------------------------------------------------------------------|
| `N{unit}`<br> 아래 허용되는 단위 목록 참고 | 지난 N 단위를 표시(예: **3 mo**(지난 3개월))합니다.|
| `today`                                            | 현재까지를 기준으로 현재 달력 날짜를 표시합니다.                     |
| `yesterday`                                        | 이전 달력 날짜를 전부 표시합니다.                             |
| `this month`                                       | 현재까지를 기준으로 현재 달력 월을 표시합니다.                   |
| `last month`                                       | 지난 달력 월을 전부 표시합니다.                           |
| `this year`                                        | 현재까지를 기준으로 현재 달력 연을 표시합니다.                    |
| `last year`                                        | 이전 연을 전부 표시합니다.                            |

다음 스트링은 상대 날짜의 모든 `{unit}`에 허용됩니다.
  * 분: `m`, `min`, `mins`, `minute`, `minutes`
  * 시간: `h`, `hr`, `hrs`, `hour`, `hours`
  * 일: `d`, `day`, `days`
  * 주: `w`, `week`, `weeks`
  * 월: `mo`, `mos`, `mon`, `mons`, `month`, `months`

### 달력 정렬 날짜

오늘 날짜를 반영하여 달력 정렬 날짜를 업데이트합니다.

| 형식         | 설명                                      |
|----------------|--------------------------------------------------|
| `week to date` | 이 주 월요일 12AM부터 현재까지를 표시합니다. |
| `month to date`| 이 달 1일부터 현재까지를 표시합니다.      |

## URL

대시보드 URL에서 시간 쿼리를 조정할 수 있습니다.

다음 대시보드 URL을 참고하세요.

```
https://app.datadoghq.com/dash/host/<DASHBOARD_ID>?from_ts=<QUERY_START>&to_ts=<QUERY_END>&live=true
```

* `from_ts` 파라미터는 쿼리 시작 시간의 Unix 밀리초 타임스탬프입니다(예: `1683518770980`).
* `to_ts` 파라미터는 쿼리 종료 시간의 Unix 밀리초 타임스탬프입니다(예: `1683605233205`).
* `live=true`는 쿼리를 저장하거나 공유할 때 상대 시간 사양이 보유됨을 나타닙니다. `live=false`로 설정할 수 있습니다.