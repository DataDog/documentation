---
description: RUM을 사용한 Next.js 애플리케이션 모니터링 가이드.
further_reading:
- link: /monitors/create/types/real_user_monitoring/
  tag: 설명서
  text: RUM 모니터에 대해 알아보기
kind: guide
title: RUM을 사용하여 Next.js 앱 모니터링
---

## 개요

[Next.js][1]는 [Vercel][8]에서 만든 JavaScript 프레임워크로, React.js 웹 페이지와 Node.js API를 만드는 데 사용됩니다. Next.js를 RUM과 통합하여 프런트엔드 및 백엔드 애플리케이션에서 성능 및 사용자 행동에 대한 인사이트를 제공하는 브라우저 관련 메트릭을 모니터링할 수 있습니다.

## 설정

Datadog RUM 브라우저 모니터링을 설정하려면 다음 단계를 수행합니다.

### 애플리케이션 만들기

1. [**UX Monitoring > Real User Monitoring**][2]으로 이동합니다.
2. **New Application** 버튼을 클릭합니다.
3. JS가 선택되어 있는지 확인한 다음, 애플리케이션의 이름을 입력하고 **Create New RUM Application**을 클릭합니다. `clientToken` 및 `applicationId`는 애플리케이션에 대해 자동으로 생성됩니다.

<div class="alert alert-info">`.env.local`를 사용할 때는 클라이언트 번들에 `NEXT_PUBLIC_` 접두사가 붙은 변수만 포함됩니다. Next.js 문서의 <a href="https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#bundling-environment-variables-for-the-browser" target="_blank">브라우저를 위한 환경 변수 번들링</a>을 참조하세요.</div>

### 애플리케이션 계측

1. 계측 유형을 선택한 다음 Datadog RUM UI에서 코드 스니펫을 복사하여 계측 유형에 따라 알맞은 파일에 붙여넣습니다.

   {{< tabs >}}
   {{% tab "NPM" %}}

   NPM을 사용하는 경우 루트 `layout.tsx`나 커스텀 `_app.tsx` 파일에 붙여넣기 전에 Datadog RUM UI에서 코드 스니펫을 약간 변경해야 합니다(Datadog은 둘 다 지원):

   - 애플리케이션이 **새로운** Next.js [App Router] [1] (버전 13+)에 의존하는 경우, 스니펫을 루트 [`layout.tsx`][2] 파일에 붙여넣습니다. `use client` 지시어는 서버 측 렌더링을 방지하므로 CDN 버전을 사용하는 것을 권장합니다.
   - Next.js 애플리케이션이 **이전** Next.js [Page Router][3]에 의존하는 경우 스니펫을 커스텀 [`_app.tsx`][4] 파일에 붙여넣습니다.

  **참고**: 텔레메트리 데이터를 수집하려면 RUM SDK를 클라이언트에서 실행해야 하므로 NPM 패키지를 통해 초기화되는 파일은 [클라이언트 컴포넌트][5]여야 합니다.

   {{< code-block lang="javascript" filename="layout.tsx or _app.tsx" disable_copy="false" collapsible="true" >}}

    "use client";

    import Link from "next/link";
    import { datadogRum } from "@datadog/browser-rum";
    import { useEffect } from "react";

    datadogRum.init({
      applicationId: "<YOUR_APPLICATION_ID>",
      clientToken: "<CLIENT_TOKEN>",
      site: "datadoghq.com",
      service: "next-app-router-rum-npm",
      env: "<ENV_NAME>",
      // Datadog에서 배포된 애플리케이션 버전을 식별할 버전 번호 지정
      // version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackUserInteractions: true,
      trackResources: true,
      trackLongTasks: true,
    });

    export default function RootLayout({
      children,
    }: {
      children: React.ReactNode;
    }) {
      useEffect(() => {}, []);
      return (
        <html lang="en">
          <body>
            {children}
          </body>
        </html>
      );
    }

   {{< /code-block >}}

   [1]: https://nextjs.org/docs/app
   [2]: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
   [3]: https://nextjs.org/docs/pages
   [4]: https://nextjs.org/docs/pages/building-your-application/routing/custom-app#usage
   [5]: https://nextjs.org/docs/app/building-your-application/rendering/client-components#using-client-components-in-nextjs

   {{% /tab %}}
   {{% tab "CDN async" %}}

   CDN 비동기를 사용할 때는 루트 `layout.tsx`나 커스텀 `_app.tsx` 파일에 붙여넣기 전에 Datadog RUM UI에서 코드 스니펫을 약간 변경해야 합니다(Datadog은 둘 다 지원):

   - 애플리케이션이 **새로운** Next.js [App Router][1](버전 13+)에 의존하는 경우 스니펫을 루트 [`layout.tsx`][2] 파일에 붙여넣습니다.
   - Next.js 애플리케이션이 **이전** Next.js [Page Router][3]에 의존하는 경우 스니펫을 커스텀 [`_app.tsx`][4] 파일에 붙여넣습니다.
   - Next.js 외부 스크립트는 [이 페이지][5]와 같이 로드해야 합니다.

   **참고**: Next.js 스크립트에는 가져오기 및 내보내기 행이 포함되어 있으며, `Script id` 사이에 중괄호와 백틱이 포함되어 있습니다. 여기서 `Script`의 모든 인스턴스는 대문자입니다.

   {{< code-block lang="javascript" filename="layout.tsx or _app.tsx" disable_copy="false" collapsible="true" >}}

   import Script from "next/script";

   export default function RootLayout({
     children,
   }: {
     children: React.ReactNode;
   }) {
     return (
       <html lang="en">
         <Script id="datadog-rum">
           {`
             (function(h,o,u,n,d) {
               h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
               d=o.createElement(u);d.async=1;d.src=n
               n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
             })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v5/datadog-rum.js','DD_RUM')
             window.DD_RUM.onReady(function() {
               window.DD_RUM.init({
                 clientToken: '<CLIENT_TOKEN>',
                 applicationId: '<YOUR_APPLICATION_ID>',
                 site: 'datadoghq.com',
                 service: 'next-app-router-rum',
                 env: '<ENV_NAME>',
                 // Datadog에서 배포된 애플리케이션의 버전을 식별할 수 있는 버전 번호를 지정하세요.
                 sessionSampleRate: 100,
                 sessionReplaySampleRate: 100,
                 trackUserInteractions: true,
                 trackResources: true,
                 trackLongTasks: true,
               });
             })
           `}
         </Script>
         <body>{children}</body>
       </html>
     );
   }

   {{< /code-block >}}

   [1]: https://nextjs.org/docs/app
   [2]: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
   [3]: https://nextjs.org/docs/pages
   [4]: https://nextjs.org/docs/pages/building-your-application/routing/custom-app#usage
   [5]: https://nextjs.org/docs/messages/next-script-for-ga#using-analyticsjs-legacy

   {{% /tab %}}
   {{% tab "CDN 동기화" %}}

   CDN 동기화를 사용할 때는 루트 `layout.tsx`나 커스텀 `_app.tsx` 파일에 붙여넣기 전에 Datadog RUM UI에서 코드 스니펫을 약간 변경해야 합니다(Datadog는 둘 다 지원):

   - 애플리케이션이 **새로운** Next.js [App Router][1](버전 13+)에 의존하는 경우 스니펫을 루트 [`layout.tsx`][2] 파일에 붙여넣습니다.
   - Next.js 애플리케이션이 **이전** Next.js [Page Router][3]에 의존하는 경우 스니펫을 커스텀 [`_app.tsx`][4] 파일에 붙여넣습니다.
   - Next.js 외부 스크립트는 [이 페이지][5]와 같이 로드해야 합니다.

   **참고**: Next.js 스크립트에는 가져오기 및 내보내기 행이 포함되며, `Script id` 사이에 중괄호와 백틱이 포함되어 있습니다. 여기서 `Script`의 모든 인스턴스는 대문자입니다.

   {{< code-block lang="javascript" filename="layout.tsx or _app.tsx" disable_copy="false" collapsible="true" >}}

   import Script from "next/script";

   export default function RootLayout({
     children,
   }: {
     children: React.ReactNode;
   }) {
     return (
       <html lang="en">
         <body>
           <Script
             id="dd-rum-sync"
             src="https://www.datadoghq-browser-agent.com/us1/v5/datadog-rum.js"
             type="text/javascript"
             strategy="beforeInteractive"
           />
           <Script id="datadog-rum">
             {`
               window.DD_RUM && window.DD_RUM.init({
                 clientToken: '<CLIENT_TOKEN>',
                 applicationId: '<YOUR_APPLICATION_ID>',
                 site: 'datadoghq.com',
                 service: 'rum-cdn-async',
                 env: '<ENV_NAME>',
                 // 데이터독에서 배포된 애플리케이션의 버전을 식별할 수 있는 버전 번호를 지정하세요.
                 // 버전: '1.0.0',
                 sessionSampleRate: 100,
                 sessionReplaySampleRate: 100,
                 trackUserInteractions: true,
                 trackResources: true,
                 trackLongTasks: true,
               });
             `}
           </Script>
           {children}
         </body>
       </html>
     );
   }

   {{< /code-block >}}

   [1]: https://nextjs.org/docs/app
   [2]: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
   [3]: https://nextjs.org/docs/pages
   [4]: https://nextjs.org/docs/pages/building-your-application/routing/custom-app#usage
   [5]: https://nextjs.org/docs/messages/next-script-for-ga#using-analyticsjs-legacy

   {{% /tab %}}
   {{< /tabs >}}

2. 인앱 단계에 따라 설치를 확인합니다.
3. 애플리케이션에 변경사항을 배포합니다. 배포가 실시간으로 완료되면 Datadog은 사용자 브라우저에서 이벤트를 수집합니다.
4. Next.js 애플리케이션에서 [대시보드][4]를 사용하여 [수집된 데이터][3]를 시각화할 수 있습니다.

## 백엔드 모니터링

Next.js 애플리케이션의 백엔드 모니터링을 시작하려면:

1. [RUM과 트레이스의 연결][6]에 대한 브라우저 설정 단계를 따릅니다.
2. [OpenTelemetry 지원][7]의 브라우저 설정 단계에 따라 애플리케이션 성능 모니터링(APM)에 연결합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://nextjs.org/
[2]: https://app.datadoghq.com/rum/performance-monitoring?_gl=1*il22i*_gcl_aw*R0NMLjE2OTAzMDM5MzcuQ2owS0NRanc1ZjJsQmhDa0FSSXNBSGVUdmxqb3ZQX1YyMFRsV1o1UlJLVHNUNHNITll2ZEJ0bTZONnlxdVM1X3lzY2NOejE4QzVON1ktOGFBcHpYRUFMd193Y0I.*_gcl_au*MjMxOTI4ODMzLjE2OTAyMjI1NTA.*_ga*MTIwMTk2NTA5Ny4xNjY2NzEzMjY2*_ga_KN80RDFSQK*MTY5MTc5ODE4OS4xMzYuMS4xNjkxNzk4NTQyLjAuMC4w*_fplc*RnA3SEVTb1BoTG9ndDI0OFQ5TERxRWRtMjNwTWVrTWZ3VGNGeWRaYm9HRkpJSXBxVHdVdFNTcURCWW1rZENHUldmU2EyTzhtZ3NXVzRUR0JUTzRnSGdPeGRkVVpWYVA5V0x4JTJGeTFRNWo5djNqYmNwQnJpckdHUU93M08xU3clM0QlM0Q
[3]: /ko/real_user_monitoring/browser/data_collected/
[4]: /ko/real_user_monitoring/dashboards/
[5]: https://nextjs.org/docs/messages/next-script-for-ga#using-analyticsjs-legacy
[6]: /ko/real_user_monitoring/connect_rum_and_traces/?tab=browserrum#setup-rum
[7]: /ko/real_user_monitoring/connect_rum_and_traces/?tab=browserrum#opentelemetry-support
[8]: https://vercel.com