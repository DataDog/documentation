---
cascade:
  algolia:
    category: 지침
    rank: 20
    subcategory: RUM 및 세션 재생 가이드
disable_toc: true
private: true
title: 실제 사용자 모니터링 및 세션 재생 가이드
---

{{< whatsnext desc="일반 RUM:" >}}
    {{< nextlink href="real_user_monitoring/guide/understanding-the-rum-event-hierarchy" >}}RUM 이벤트 계층 구조 이해하기{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/compute-apdex-with-rum-data" >}}RUM 데이터로 Apdex 및 맞춤형 성능 지표 계산{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/alerting-with-rum" >}}RUM 데이터로 알림 생성{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/alerting-with-conversion-rates" >}}전환율에 대한 알림 생성{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/monitor-your-rum-usage" >}}RUM 사용량 모니터링{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/track-rum-usage-with-attribution-tags" >}}사용량 속성 태그로 RUM 사용량 추적{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/rum-for-product-analytics" >}}제품 분석을 위해 RUM 및 세션 재생 사용{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/remotely-configure-rum-using-launchdarkly" >}}LaunchDarkly를 사용하여 원격으로 RUM 설정{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/getting-started-rum-deployment-tracking" >}}RUM 배포 추적 시작하기{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/getting-started-feature-flags" >}}기능 플래그 추적 시작하기{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/monitor-kiosk-sessions-using-rum" >}}RUM을 사용하여 키오스크 세션 모니터링{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/best-practices-for-rum-sampling" >}}RUM 샘플링 모범 사례{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/monitor-utm-campaigns-in-rum" >}}RUM에서 UTM 캠페인 모니터링{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="브라우저 RUM:" >}}
    {{< nextlink href="real_user_monitoring/guide/send-custom-user-actions" >}}커스텀 사용자 작업 보내기{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/identify-bots-in-the-ui" >}}RUM 탐색기에서 봇 식별{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/upload-javascript-source-maps" >}}자바스크립트(JavaScript) 소스맵 업로드{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/sampling-browser-plans" >}}브라우저 RUM 및 브라우저 RUM 및 세션 재생에 대한 샘플링 구성을 사용하여 세션 볼륨 제어{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/enrich-and-control-rum-data" >}}브라우저 RUM 데이터 강화 및 제어{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/browser-sdk-upgrade" >}}RUM 브라우저 SDK 업그레이드{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/proxy-rum-data" >}}브라우저 RUM 데이터 프록시 {{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/devtools-tips" >}}브라우저 개발자 도구 사용 시 팁{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/define-services-and-track-ui-components-in-your-browser-application/" >}}브라우저 애플리케이션에서 서비스 정의 및 UI 구성 요소 추적 {{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/enable-rum-shopify-store/" >}}Shopify 스토어에서 RUM 활성화{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/enable-rum-squarespace-store/" >}}Squarespace 스토어에서 RUM 활성화{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/enable-rum-woocommerce-store/" >}}WordPress + WooCommerce 스토어에서 RUM 활성화{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/monitor-your-nextjs-app-with-rum/" >}}RUM으로 Next.js 애플리케이션 모니터링{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/monitor-electron-applications-using-browser-sdk/" >}}브라우저 SDK를 사용하여 Electron 애플리케이션 모니터링{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="모바일 RUM:" >}}
{{< nextlink href="real_user_monitoring/guide/mobile-sdk-deprecation-policy" >}}RUM 모바일 SDK 지원 중단 정책{{< /nextlink >}}
{{< nextlink href="real_user_monitoring/guide/mobile-sdk-upgrade" >}}RUM 모바일 SDK 업그레이드{{< /nextlink >}}
{{< nextlink href="real_user_monitoring/guide/mobile-sdk-multi-instance" >}}모바일 SDK의 여러 인스턴스 사용{{< /nextlink >}}
{{< nextlink href="real_user_monitoring/guide/proxy-mobile-rum-data" >}}모바일 RUM 데이터 프록시{{< /nextlink >}}
{{< nextlink href="real_user_monitoring/guide/initialize-your-native-sdk-before-react-native-starts" >}}React Native가 시작되기 전에 네이티브 SDK 초기화{{< /nextlink >}}
{{< nextlink href="real_user_monitoring/guide/monitor-hybrid-react-native-applications" >}}하이브리드 React Native 애플리케이션 모니터링{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="세션 재생:" >}}
    {{< nextlink href="/real_user_monitoring/guide/session-replay-service-worker" >}}세션 재생을 위한 타사 서비스 작업자 허용{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/session-replay-for-solutions" >}}지원 워크플로에서 세션 재생을 사용{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/shadow-dom" >}}Shadow DOM 구성요소로 세션 재생 강화{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/connect-session-replay-to-your-third-party-tools" >}}세션 재생을 타사 도구에 연결{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/using-session-replay-as-a-key-tool-in-post-mortems" >}}세션 재생을 사후 분석의 핵심 도구로 사용{{< /nextlink >}}
    {{< nextlink href="/synthetics/guide/rum-to-synthetics" >}}세션 재생에서 Synthetic Browser Tests 생성{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/investigate-zendesk-tickets-with-session-replay" >}}세션 재생으로 Zendesk 티켓 조사{{< /nextlink >}}
{{< /whatsnext >}}