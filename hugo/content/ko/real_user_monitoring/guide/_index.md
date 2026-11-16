---
cascade:
  algolia:
    category: Guide
    rank: 20
    subcategory: RUM & Session Replay Guides
description: 웹 및 모바일 애플리케이션에서 RUM 및 Session Replay를 구현하고 최적화하는 방법과 모범 사례를 다루는 종합 가이드
disable_toc: true
private: true
title: Real User Monitoring 및 Session Replay 가이드
---
{{< whatsnext desc="일반 RUM:" >}}
    {{< nextlink href="real_user_monitoring/guide/understanding-the-rum-event-hierarchy" >}}RUM 이벤트 계층 구조 이해{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/compute-apdex-with-rum-data" >}}RUM 데이터로 Apdex 및 사용자 지정 성능 지표 계산{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/alerting-with-rum" >}}RUM 데이터로 경보 생성{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/create-charts-with-rum-custom-metrics" >}}RUM 사용자 지정 메트릭으로 차트 생성{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/monitor-your-rum-usage" >}}RUM 사용량 모니터링{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/track-rum-usage-with-attribution-tags" >}}사용량 속성 태그로 RUM 사용량 추적{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/getting-started-rum-deployment-tracking" >}}RUM 배포 추적 시작{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/monitor-kiosk-sessions-using-rum" >}}RUM을 사용하여 키오스크 세션 모니터링{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/best-practices-for-rum-sampling" >}}RUM 샘플링 모범 사례{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/debug-symbols" >}}RUM 디버그 심볼로 난독화된 스택 트레이스 조사{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/retention_filter_best_practices" >}}보존 필터 모범 사례{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/best-practices-tracing-native-ios-android-apps" >}}네이티브 iOS 및 Android 앱 트레이싱 모범 사례{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="운영 모니터링:" >}}
    {{< nextlink href="real_user_monitoring/guide/best-practices-for-operations-setup" >}}RUM 작업 설정 모범 사례{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/best-practices-for-creating-slos-on-operations" >}}RUM 운영을 위한 SLO 생성 모범 사례{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="브라우저 RUM:" >}}
    {{< nextlink href="real_user_monitoring/guide/send-custom-user-actions" >}}사용자 지정 사용자 액션 전송{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/identify-bots-in-the-ui" >}}RUM 탐색기에서 봇 식별{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/upload-javascript-source-maps" >}}JavaScript 소스 맵 업로드{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/upload-webassembly-symbols" >}}WebAssembly 심볼 업로드{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/sampling-browser-plans" >}}Browser RUM 및 Browser RUM & Session Replay의 샘플링 구성을 사용하여 세션 볼륨 제어{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/enrich-and-control-rum-data" >}}브라우저 RUM 데이터 보강 및 제어{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/browser-sdk-upgrade" >}}RUM Browser SDK 업그레이드{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/proxy-rum-data" >}}브라우저 RUM 데이터 프록시 {{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/devtools-tips" >}}브라우저 개발자 도구 사용 시 팁{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/define-services-and-track-ui-components-in-your-browser-application/" >}}브라우저 애플리케이션에서 서비스 정의 및 UI 구성 요소 추적 {{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/enable-rum-shopify-store/" >}}Shopify 스토어에서 RUM 활성화{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/enable-rum-squarespace-store/" >}}Squarespace 스토어에서 RUM 활성화{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/enable-rum-woocommerce-store/" >}}WordPress + WooCommerce 스토어에서 RUM 활성화{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/monitor-your-nextjs-app-with-rum/" >}}RUM으로 Next.js 애플리케이션 모니터링{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/monitor-electron-applications-using-browser-sdk/" >}}브라우저 SDK를 사용하여 Electron 애플리케이션 모니터링{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/monitor-capacitor-applications-using-browser-sdk/" >}}브라우저 SDK를 사용하여 Capacitor 애플리케이션 모니터링{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="모바일 RUM:" >}}
    {{< nextlink href="real_user_monitoring/guide/mobile-sdk-deprecation-policy" >}}RUM 모바일 SDK 지원 중단 정책{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/mobile-sdk-upgrade" >}}RUM 모바일 SDK 업그레이드{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/mobile-sdk-multi-instance" >}}모바일 SDK의 여러 인스턴스 사용{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/proxy-mobile-rum-data" >}}모바일 RUM 데이터 프록시{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/initialize-your-native-sdk-before-react-native-starts" >}}React Native 시작 전에 네이티브 SDK 초기화{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/monitor-hybrid-react-native-applications" >}}하이브리드 React Native 애플리케이션 모니터링{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Session Replay:" >}}
    {{< nextlink href="/real_user_monitoring/guide/session-replay-service-worker" >}}Session Replay에 대해 타사 서비스 워커 허용{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/session-replay-for-solutions" >}}지원 워크플로에서 Session Replay 사용{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/shadow-dom" >}}Shadow DOM 구성 요소로 Session Replay 보강{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/connect-session-replay-to-your-third-party-tools" >}}Session Replay를 타사 도구에 연결{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/using-session-replay-as-a-key-tool-in-post-mortems" >}}사후 분석의 핵심 도구로 Session Replay 활용{{< /nextlink >}}
    {{< nextlink href="/synthetics/guide/rum-to-synthetics" >}}Session Replay에서 Synthetic 테스트 생성{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/investigate-zendesk-tickets-with-session-replay" >}}Session Replay로 Zendesk 티켓 조사{{< /nextlink >}}
{{< /whatsnext >}}