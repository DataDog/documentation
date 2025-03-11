---
aliases:
- /ko/serverless/datadog_lambda_library/extension
dependencies:
- https://github.com/DataDog/datadog-lambda-extension/blob/main/README.md
title: Datadog 람다 확장
---
[![슬랙](https://chat.datadoghq.com/badge.svg?bg=632CA6)](https://chat.datadoghq.com/)
[![라이센스](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/DataDog/datadog-agent/blob/master/LICENSE)

**참고:** 이 리포지토리에는 Datadog 람다 확장과 관련된 릴리스 정보, 이슈, 지침 및 스크립트가 포함되어 있습니다. 확장은 Datadog 에이전트의 특수 빌드입니다. 소스 코드는 [여기](https://github.com/DataDog/datadog-agent/tree/main/cmd/serverless)에서 확인할 수 있습니다.

Datadog 람다 확장은 AWS 람다 함수가 실행되는 동안 비동기식으로 커스텀 메트릭, 트레이스 및 로그 제출을 지원하는 AWS 람다 확장입니다.

## 설치

[설치 설명서](https://docs.datadoghq.com/serverless/installation)를 참고하시고, Datadog에서 함수의 향상된 메트릭, 트레이스 및 로그를 확인하세요.

## 업그레이드
업그레이드하려면 람다 레이어 설정 또는 도커 파일에서 Datadog 확장 버전을 업데이트하세요 (컨테이너 이미지로 배포된 람다 함수의 경우). 업그레이드하기 전에 최신 [릴리스](https://github.com/DataDog/datadog-lambda-extension/releases) 및 해당 변경 로그를 확인합니다.

## 설정

[설정 설명서](https://docs.datadoghq.com/serverless/configuration)를 참고하여 텔레메트리 태그 지정, 요청/응답 페이로드 캡처, 로그 또는 트레이스에서 민감한 정보 필터링 또는 스크러빙 등을 실행하세요.

## 오버헤드

Datadog 람다 확장은 확장을 초기화해야 하므로 람다 함수의 콜드 스타트에 약간의 오버헤드가 발생합니다 (즉, 초기화 기간이 길어짐). Datadog은 람다 확장 성능을 지속적으로 최적화하고 있으며 항상 최신 릴리스를 사용하는 것을 권장합니다.

Datadog 람다 확장이 데이터를 Datadog API로 다시 플러시해야 하기 때문에 람다 함수의 보고 기간이 증가할 수 있습니다. 확장에서 데이터를 플러시하는 데 소요된 시간이 기간의 일부로 보고되지만 AWS가 함수의 응답을 클라이언트에 반환한 *후* 완료됩니다. 즉, 추가된 기간으로 인해 람다 함수의 속도가 *느려지지는 않습니다*. 자세한 기술 정보는 [AWS 블로그 게시물](https://aws.amazon.com/blogs/compute/performance-and-functionality-improvements-for-aws-lambda-extensions/)을 참조하세요. 함수의 실제 성능을 모니터링하고 Datadog 확장에 의해 추가된 기간을 제외하려면 메트릭`aws.lambda.enhanced.runtime_duration`을 사용하세요.

기본적으로 확장은 각 호출이 끝날 때마다 데이터를 다시 Datadog으로 플러시합니다(예: 콜드 스타트는 항상 플러시를 트리거함). 이렇게 하면 트래픽이 적은 애플리케이션, cron 작업 및 수동 테스트에서 산발적인 호출로 인한 데이터 도착 지연을 방지할 수 있습니다. 확장이 일정하고 빈번한 호출 패턴(분당 1회 이상)을 감지하면 여러 호출의 데이터를 일괄 처리하고 호출 시작 시 주기적으로 플러시합니다. 이는 *함수가 더 바쁠수록 호출당 평균 기간 오버헤드가 낮아짐을 의미합니다*. 즉, 트래픽이 적은 애플리케이션의 경우, 기간 오버헤드는 눈에 띄지만 관련 비용 오버헤드는 일반적으로 무시할 수 있는 수준이며, 트래픽이 많은 애플리케이션의 경우 기간 오버헤드는 거의 눈에 띄지 않을 수 있습니다.

람다 함수가 Datadog 사이트에서 멀리 떨어진 지역에 배포된 경우가 있습니다. 예를 들어, 람다 함수가 US1 Datadog 사이트에 데이터를 보고하는 eu-west-1에 배포된 경우, 네트워크 지연 시간으로 인해 더 높은 기간의 오버헤드를 관찰할 수 있습니다.

## 오프닝 이슈

이 패키지에서 버그를 발견한다면, 당사에 알려 주시기 바랍니다. 새 이슈를 열기 전에 중복되지 않도록 기존 이슈를 검색합니다.

이슈를 열 때 확장 버전과 스택 트레이스가 있는 경우 포함합니다. 또한 적절한 경우 재현 단계를 포함합니다.

기능 요청에 대한 이슈를 열 수도 있습니다.

## 기여하기

이 패키지와 관련된 문제를 발견하고 수정 사항이 있으면 [절차](https://github.com/DataDog/datadog-agent/blob/master/docs/dev/contributing.md)에 따라 풀 리퀘스트를 개설해 주세요.

## 커뮤니티

제품 피드백 및 질문은 [슬랙의 Datadog 커뮤니티](https://chat.datadoghq.com/)의 `#serverless`에 가입하세요.

## 라이센스

명시적으로 명시되지 않은 한 이 저장소의 모든 파일은 Apache License Version 2.0에 따라 라이센스가 부여됩니다.

이 제품에는 Datadog(https://www.datadoghq.com/) 에서 개발한 소프트웨어가 포함되어 있습니다. Copyright 2021 Datadog, Inc.