---
aliases:
- /ko/synthetics/faq/uptime-check-internal-website/
cascade:
  algolia:
    category: Guide
    rank: 20
    subcategory: Synthetic Monitoring Guides
disable_toc: true
private: true
title: Synthetic Monitoring 가이드
---
{{< whatsnext desc="일반 가이드:" >}}
    {{< nextlink href="synthetics/guide/identify_synthetics_bots/" >}}Synthetic 봇 식별{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/clone-test" >}}Synthetic 테스트 복제{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/otp-email-synthetics-test" >}}Synthetic Browser Tests를 사용하여 이메일 본문에서 일회용 암호 추출{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/version_history" >}}Synthetic Monitoring 버전 기록{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/kerberos-authentication/" >}}Synthetic Monitoring을 위한 Kerberos 인증{{< /nextlink >}}
     {{< nextlink href="synthetics/guide/step-duration/" >}}Browser Tests에서 단계 소요 시간이 결정되는 방식{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/export-tests-to-terraform" >}}Synthetic 테스트를 Terraform으로 내보내기{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="경보:" >}}
    {{< nextlink href="monitors/types/synthetic_monitoring/" >}}Synthetic 테스트 모니터링 사용{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/synthetic-test-retries-monitor-status/" >}}Synthetic 테스트 재시도가 모니터링 상태를 결정하는 방식 이해{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/uptime-percentage-widget" >}}SLO를 사용하여 웹사이트 가동 시간 모니터링{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/how-synthetics-monitors-trigger-alerts" >}}Synthetic 모니터링이 경보를 트리거하는 방식 이해{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="API:" >}}
    {{< nextlink href="synthetics/guide/create-api-test-with-the-api" >}}API를 사용하여 API 테스트 생성{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/manage-browser-tests-through-the-api/" >}}프로그래밍 방식으로 브라우저 테스트 관리{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="모범 사례:" >}}
    {{< nextlink href="synthetics/guide/synthetic-tests-caching" >}}Synthetic 테스트의 캐시 문제 방지{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/monitor-https-redirection" >}}HTTP 요청이 HTTPS로 리디렉션되는지 모니터링{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/reusing-browser-test-journeys/" >}}테스트 모음 전체에서 브라우저 테스트 여정 재사용{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/conditional-logic-subtests/" >}}Synthetic 테스트에 조건부 로직 구현{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/custom-javascript-assertion/" >}}브라우저 테스트에서 사용자 지정 JavaScript 어설션 사용{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/email-validation/" >}}브라우저 테스트에서 이메일 유효성 검사 사용{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/testing-file-upload-and-download/" >}}테스트 파일 업로드 및 다운로드{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/popup/" >}}브라우저 테스트에서 팝업 처리{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/recording-custom-user-agent/" >}}사용자 지정 User-Agent로 단계 기록{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/manually-adding-chrome-extension/" >}}브라우저 테스트용 Chrome 확장 프로그램 수동 추가{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/browser-tests-using-shadow-dom/" >}}Shadow DOM을 사용하는 애플리케이션에서 테스트 실행{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/http-tests-with-hmac/" >}}해시 기반 메시지 인증 코드(HMAC) 인증을 사용하여 HTTP 테스트 생성{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/canvas-content-javascript/" >}}JavaScript로 캔버스 콘텐츠 어설션{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Datadog Integrations:" >}}
    {{< nextlink href="logs/guide/ease-troubleshooting-with-cross-product-correlation" >}}교차 제품 연결을 통한 트러블슈팅{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/explore-rum-through-synthetics/" >}}Synthetic Monitoring에서 RUM 기능 미리 보기 살펴보기{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/rum-to-synthetics" >}}Session Replay에서 Synthetic 테스트 생성{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="메트릭:" >}}
    {{< nextlink href="synthetics/guide/monitor-usage/" >}}예상 사용량 메트릭 사용{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/using-synthetic-metrics/" >}}모니터링에서 Synthetic 메트릭 사용{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/api_test_timing_variations/" >}}API 테스트 소요 시간 이해 및 시간 변동 문제 해결{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="데이터 보안:" >}}
    {{< nextlink href="synthetics/guide/authentication-protocols/" >}}API 및 다단계 API 테스트에서 인증 사용{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/browser-tests-totp/" >}}브라우저 테스트에서 다단계 인증(MFA)을 위한 시간 기반 일회용 암호(TOTP) 사용{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/browser-tests-passkeys/" >}}브라우저 테스트에서 패스키(FIDO2) 사용{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/mobile-test-auth-tokens/" >}}모바일 애플리케이션 테스트에서 인증 토큰 주입 및 자동 새로고침{{< /nextlink >}}
{{< /whatsnext >}}