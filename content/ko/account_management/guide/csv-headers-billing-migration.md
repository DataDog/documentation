---
further_reading:
- link: /account_management/plan_and_usage/
  tag: 설명서
  text: 플랜 및 사용량 설정
title: 2023년 9월 18일자 주부터 새로운 플랜 및 사용량 CSV 헤더로 마이그레이션
---
2023년 9월 18일자 주부터 플랜 및 사용량 CSV 파일 하위 세트의 헤더가 새롭게 업데이트됩니다. 이 업데이트를 통해 인앱에 나타나는 사용량 데이터와 CSV 파일에 나타나는 사용량이 일치하게 됩니다. CSV에는 0이 아닌 사용량 레코드만 포함됩니다.

빌링 및 사용량에서 파일을 다운로드 받아서 파일의 CSV 헤더에 의존하는 자동화 시스템을 사용하는 중이라면, 헤더가 업데이트되기 때문에 자동화 방법도 업데이트해야 합니다. 다음은 마이그레이션에서 업데이트가 적용될 섹션 2곳과 새로운 CSV 헤더 예시입니다.

## 개별 조직 요약

1. [헤더 매핑][1]
2. CSV 다운로드 받는 곳:

{{< img src="account_management/individual-orgs-summary-csv.jpg" alt="Orgs Summary에서 CSV 다운로드" >}}

## 사용량 추세

1. [헤더 매핑][2]
2. CSV 다운로드 받는 곳:

{{< img src="account_management/usage-trends-csv.jpeg" alt="Usage Trends에서 CSV 다운로드" >}}


[1]: /ko/account_management/guide/csv_headers/individual-orgs-summary/
[2]: /ko/account_management/guide/csv_headers/usage-trends/