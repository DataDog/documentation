---
core_product:
- ci-cd
related_terms:
- 성능 회귀
title: 회귀 테스트
---
Datadog CI Test Visibility에서 테스트 실행은 기본 브랜치의 동일한 테스트에 대한 기간이 평균의 5배이고 최대 기간보다 길 때 regression으로 표시됩니다. 또한 regression으로 간주되려면 테스트 실행의 최소 지속 시간이 500ms여야 합니다. 벤치마크 테스트 실행(`@test.type:benchmark`)의 지속 시간이 기본 브랜치에서 동일한 테스트의 평균보다 표준 편차의 5배 이상인 경우 regression으로 표시됩니다.

기본 브랜치의 평균 및 최대 기간은 지난 주의 테스트 실행을 기반으로 계산됩니다. 알고리즘이 테스트 실행을 고려하려면 기본 브랜치에 최소 100개의 테스트 실행이 있어야 합니다. 벤치마크 테스트 실행의 경우 최소 테스트 실행 횟수는 10입니다.
자세한 내용은 <a href="/tests/search/#test-regressions">설명서를 참조하세요</a>.