---
kind: 설명서
title: 데이터 리매퍼
---

Datadog은 날짜를 수신하면 다음 기본 속성 중 하나의 값을 사용하여 날짜에 타임스탬프를 표시합니다.

* `timestamp`
* `date`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `published_date`

이벤트에 이 목록에 없는 속성의 날짜가 있는 경우 날짜 리매퍼 프로세서를 사용하여 해당 날짜 속성을 공식 이벤트 타임스탬프로 정의하세요.

<div class="alert alert-info">
인식되는 날짜 형식은 다음과 같습니다: <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (밀리초 EPOCH 형식)</a>, <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a>.
</div>

이벤트에 위에 나열된 형식을 준수하는 타임스탬프가 없는 경우 grok 프로세서를 사용하여 타임스탬프에서 새 속성으로 epoch 시간을 추출합니다. 날짜 리매퍼는 새로 정의된 속성을 사용합니다.

Datadog에서 사용자 정의 날짜 및 시간 형식을 파싱하는 방법을 보려면 [날짜 파싱][3]을 참조하세요.

**참고**:

* ISO 8601-1:2019 기준으로 기본 형식은 `T[hh][mm][ss]`이고 확장 형식은 `T[hh]:[mm]:[ss]`입니다. 이전 버전에서는 두 형식 모두에서 T(시간을 나타냄)가 생략되었습니다.
* 지정된 파이프라인에 여러 날짜 리매퍼 프로세서가 적용되는 경우 파이프라인 순서에 따라 마지막 프로세서가 고려됩니다.

날짜 리매퍼 프로세서 예시

{{< img src="logs/log_configuration/processor/date_remapper.png" alt="날짜 속성 정의" style="width:80%;" >}}