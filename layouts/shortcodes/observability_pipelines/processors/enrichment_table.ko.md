이 프로세서를 이용해 참조표에서 가져온 정보(로컬 파일 또는 데이터베이스)로 로그를 보강하세요.

보강 표 프로세서를 설정하는 방법:
1. **필터 쿼리**를 정의합니다. 지정된 [필터 쿼리](#filter-query-syntax)와 일치하는 로그만 처리됩니다. 모든 로그는 필터 쿼리와 일치하는지 여부에 관계없이 파이프라인의 다음 단계로 전송됩니다.
2. 로그의 소스 속성을 입력합니다. 소스 속성의 값이 참조표에서 찾고자 하는 내용입니다.
3. 대상 속성을 입력합니다. 대상 속성의 값은 참조표에서 찾은 정보를 JSON 객체로 저장합니다.
4. 사용하고자 하는 참조표 유형을 **파일** 또는 **GeoIP** 중에서 선택합니다.
   - **파일** 유형의 경우:
        1. 파일 경로를 입력합니다.<br>**참고**: 모든 파일 경로는 구성 데이터 디렉터리 기준 상대 경로이며, 기본값은 `/var/lib/observability-pipelines-worker/config/`입니다. 자세한 정보는 [고급 작업자 구성][10172]을 참조하세요. 파일은 `observability-pipelines-worker group` 및 `observability-pipelines-worker` 사용자가 소유해야 하며, 최소한 해당 그룹 또는 사용자에게 읽기 권한이 있어야 합니다.
        1. 열 이름을 입력합니다. 보강 표의 열 이름은 소스 속성 값을 매칭하는 데 사용됩니다. [보강 파일 예시](#enrichment-file-example)를 참조하세요.
   - **GeoIP** 유형의 경우, GeoIP 경로를 입력합니다.

##### 보강 파일 예시

이 예시에서는 소스 속성으로 `merchant_id`, 대상 속성으로 `merchant_info`를 사용했습니다.

아래는 보강 프로세서가 사용하는 참조표의 예시입니다.

| merch_id | merchant_name   | city      | state    |
| -------- | --------------- | --------- | -------- |
| 803      | Andy's Ottomans | Boise     | Idaho    |
| 536      | Cindy's Couches | Boulder   | Colorado |
| 235      | Debra's Benches | Las Vegas | Nevada   |

`merch_id`가 프로세스가 소스 속성의 값을 찾는 데 사용하는 열 이름으로 설정되었습니다. **참고**: 소스 속성의 값이 열 이름과 일치해야 하는 것은 아닙니다.

보강 프로세서가 `"merchant_id":"536"`을 포함한 로그를 수신하는 경우:

- 프로세서는 참조표의 `merch_id` 열에서 값 `536`을 찾습니다.
- 값을 찾으면 참조표에서 가져온 행 전체의 정보를 `merchant_info` 속성에 JSON 객체로 추가합니다.

```
merchant_info {
    "merchant_name":"Cindy's Couches",
    "city":"Boulder",
    "state":"Colorado"
}
```

[10172]: /ko/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
<!-- 10172 link is used in multiple shortcodes, so if it is changed, make sure to update those shortcodes using find and replace -->