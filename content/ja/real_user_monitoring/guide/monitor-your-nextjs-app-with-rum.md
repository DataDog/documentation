---
description: RUM で Next.js アプリケーションを監視するためのガイド。
further_reading:
- link: /monitors/create/types/real_user_monitoring/
  tag: ドキュメント
  text: RUM モニターについて
title: RUM で Next.js アプリを監視
---

## 概要

[Next.js][1] は、React.js Web ページや Node.js API を作成するために使用される、[Vercel][8] によって作成された JavaScript フレームワークです。Next.js を RUM とインテグレーションすることで、フロントエンドとバックエンドのアプリケーションのブラウザ関連のメトリクスを監視し、パフォーマンスとユーザー行動を把握することができます。

## セットアップ

以下の手順に従って、Datadog RUM ブラウザモニタリングを設定します。

### アプリケーションの作成

1. **[Digital Experience > Performance Summary][2]** に移動します。
2. **New Application** ボタンをクリックします。
3. JS が選択されていることを確認し、アプリケーションの名前を入力して **Create New RUM Application** をクリックします。アプリケーションの `clientToken` と `applicationId` が自動的に生成されます。

<div class="alert alert-info">`.env.local` を使用する場合、プレフィックス `NEXT_PUBLIC_` の付いた変数のみがクライアントバンドルに含まれます。Next.js のドキュメントの<a href="https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#bundling-environment-variables-for-the-browser" target="_blank">ブラウザの環境変数のバンドル</a>を参照してください。</div>

### アプリケーションをインスツルメントする

1. インスツルメンテーションの種類を選択し、Datadog RUM UI からインスツルメンテーションの種類に応じた適切なファイルにコードスニペットをコピーアンドペーストします。

   {{< tabs >}}
   {{% tab "npm" %}}

   npm を使用する際は、ルートの `layout.tsx` ファイルまたはカスタムの `_app.tsx` ファイル (Datadog は両方をサポートしています) に貼り付ける前に、Datadog RUM UI からコードスニペットにいくつかの小さな変更を加える必要があります。

   - アプリケーションが **より新しい** Next.js [App Router][1] (バージョン 13 以上) に依存している場合、Datadog では、RUM の初期化がクライアント側で行われるように、CDN 版 RUM のインスツルメンテーションを使用することを推奨しています。npm パッケージを使用する場合、RUM がクライアントからテレメトリーを収集できるように、初期化コードは [クライアントコンポーネント][5] で実行する必要があります。これは、[`layout.tsx`][2] ファイル自体をクライアントコンポーネントにしなくても、以下の例に従って RUM の初期化コードで空の `<DatadogInit />` コンポーネントを作成し、その `<DatadogInit />` コンポーネントを `layout.tsx` でレンダリングすることで実現できます。
   - Next.js アプリケーションが**より古い** Next.js [Page Router][3] に依存している場合は、`"use client"` ディレクティブなしで、また `<DatadogInit />` コンポーネントを別途用意しなくても、カスタムの [`_app.tsx`][4] ファイルに初期化スニペットを貼り付けることができます。

   {{< code-block lang="javascript" filename="datadog-init.tsx" disable_copy="false" collapsible="true" >}}
   // このファイルがクライアント上で実行されるようにするため、App Router を使用する場合に必要。
   "use client";

    import { datadogRum } from "@datadog/browser-rum";

    datadogRum.init({
      applicationId: "<YOUR_APPLICATION_ID>",
      clientToken: "<CLIENT_TOKEN>",
      site: "datadoghq.com",
      service: "<SERVICE_NAME>",
      env: "<ENV_NAME>",
      // Datadog のデプロイされたアプリケーションのバージョンを識別するためにバージョン番号を指定します
      // version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 20,
      trackUserInteractions: true,
      trackResources: true,
      trackLongTasks: true,
      defaultPrivacyLevel: "mask-user-input",
      // RUM とバックエンドトレース間の接続のために、トレースヘッダーを伝播する URL を指定します
      allowedTracingUrls: [
        { match: "https://example.com/api/", propagatorTypes: ["tracecontext"] },
      ],
    });

    export default function DatadogInit() {
      // レンダリングなし - このコンポーネントは、上記の初期化コードを
      // クライアント側で実行するためだけに追加されています
      return null;
    }
   {{< /code-block >}}

   {{< code-block lang="javascript" filename="layout.tsx or _app.tsx" disable_copy="false" collapsible="true" >}}
    import DatadogInit from "@/components/datadog-init";

    export default function RootLayout({
      children,
    }: {
      children: React.ReactNode;
    }) {
      return (
        <html lang="en">
          <body>
            <DatadogInit />
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
   {{% tab "CDN 非同期" %}}

CDN 非同期を使用する場合は、root `layout.tsx` ファイルまたはカスタム `_app.tsx` ファイル (Datadog は両方をサポートしています) に貼り付ける前に、Datadog RUM UI からコードスニペットにいくつかの小さな変更を加える必要があります。

   - アプリケーションが**より新しい** Next.js [App Router][1] (バージョン 13 以上) に依存している場合は、スニペットを root [`layout.tsx`][2] ファイルに貼り付けます。
   - Next.js アプリケーションが**より古い** Next.js [Page Router][3] に依存している場合は、スニペットをカスタム [`_app.tsx`][4] ファイルに貼り付けます。
   - [このページ][5]のように、Next.js の外部スクリプトを読み込む必要があります。

   **注**: Next.js スクリプトには import と export の行があり、`Script id` の間には中かっこやバックスティックが含まれています。ここで、`Script` のインスタンスはすべて大文字です。

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
             })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v6/datadog-rum.js','DD_RUM')
             window.DD_RUM.onReady(function() {
               window.DD_RUM.init({
                 clientToken: '<CLIENT_TOKEN>',
                 applicationId: '<YOUR_APPLICATION_ID>',
                 site: 'datadoghq.com',
                 service: 'next-app-router-rum',
                 env: '<ENV_NAME>',
                 // デプロイされたアプリケーションのバージョンを Datadog 内で特定するためのバージョン番号を指定します
                 // version: '1.0.0',
                 sessionSampleRate: 100,
                 sessionReplaySampleRate: 100,
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
   {{% tab "CDN 同期" %}}

CDN 同期を使用する場合は、root `layout.tsx` ファイルまたはカスタム `_app.tsx` ファイル (Datadog は両方をサポートしています) に貼り付ける前に、Datadog RUM UI からコードスニペットにいくつかの小さな変更を加える必要があります。

   - アプリケーションが**より新しい** Next.js [App Router][1] (バージョン 13 以上) に依存している場合は、スニペットを root [`layout.tsx`][2] ファイルに貼り付けます。
   - Next.js アプリケーションが**より古い** Next.js [Page Router][3] に依存している場合は、スニペットをカスタム [`_app.tsx`][4] ファイルに貼り付けます。
   - [このページ][5]のように、Next.js の外部スクリプトを読み込む必要があります。

   **注**: Next.js スクリプトには import と export の行があり、`Script id` の間には中かっこやバックスティックが含まれています。ここで、`Script` のインスタンスはすべて大文字です。

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
             src="https://www.datadoghq-browser-agent.com/us1/v6/datadog-rum.js"
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
                 // デプロイされたアプリケーションのバージョンを Datadog 内で特定するためのバージョン番号を指定します
                 // version: '1.0.0',
                 sessionSampleRate: 100,
                 sessionReplaySampleRate: 100,
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

3. アプリ内の手順に従ってインストールを検証します。
4. 変更をアプリケーションにデプロイします。実行が開始されると、ユーザーブラウザから Datadog によってイベントが収集されます。
5. [収集したデータ][3]は、[ダッシュボード][4]を使用して Next.js アプリケーションで視覚化できます。

## バックエンドのモニタリング

Next.js アプリケーションのバックエンドモニタリングを開始するには

1. [RUM とトレースの接続][6]のブラウザの設定手順に従います。
2. [OpenTelemetry サポート][7]のブラウザの設定手順に従って、APM と接続します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://nextjs.org/
[2]: https://app.datadoghq.com/rum/performance-monitoring?_gl=1*il22i*_gcl_aw*R0NMLjE2OTAzMDM5MzcuQ2owS0NRanc1ZjJsQmhDa0FSSXNBSGVUdmxqb3ZQX1YyMFRsV1o1UlJLVHNUNHNITll2ZEJ0bTZONnlxdVM1X3lzY2NOejE4QzVON1ktOGFBcHpYRUFMd193Y0I.*_gcl_au*MjMxOTI4ODMzLjE2OTAyMjI1NTA.*_ga*MTIwMTk2NTA5Ny4xNjY2NzEzMjY2*_ga_KN80RDFSQK*MTY5MTc5ODE4OS4xMzYuMS4xNjkxNzk4NTQyLjAuMC4w*_fplc*RnA3SEVTb1BoTG9ndDI0OFQ5TERxRWRtMjNwTWVrTWZ3VGNGeWRaYm9HRkpJSXBxVHdVdFNTcURCWW1rZENHUldmU2EyTzhtZ3NXVzRUR0JUTzRnSGdPeGRkVVpWYVA5V0x4JTJGeTFRNWo5djNqYmNwQnJpckdHUU93M08xU3clM0QlM0Q
[3]: /ja/real_user_monitoring/browser/data_collected/
[4]: /ja/real_user_monitoring/platform/dashboards/
[5]: https://nextjs.org/docs/messages/next-script-for-ga#using-analyticsjs-legacy
[6]: /ja/real_user_monitoring/correlate_with_other_telemetry/apm/?tab=browserrum#setup-rum
[7]: /ja/real_user_monitoring/correlate_with_other_telemetry/apm/?tab=browserrum#opentelemetry-support
[8]: https://vercel.com