---
title: Reuse Browser Test Journeys Across Your Test Suite
kind: guide
further_reading:
    - link: synthetics/browser_tests
      tag: Documentation
      text: Configure a Browser Test
    - link: /synthetics/browser_tests/actions
      tag: Documentation
      text: Create Browser Test Steps
    - link: "https://www.datadoghq.com/blog/test-creation-best-practices/"
      tag: Blog
      text: Best practices for creating end-to-end tests

---

## Overview

1 つのジャーニーをいくつか異なるテストで再利用したい場合があります。たとえば、

* If most of your application's functionalities are located behind a login, you can [reuse your login steps](#create-and-reuse-a-login-subtest) at the beginning of each of your tests.
* If you want to monitor your application's functionalities on several different environments, you can create tests for your prod environment and reuse them as subtests for other environments such as dev or staging.
* テストの実行によりデータベースオブジェクトが作られる場合、テスト環境をクリーンアップするテストを作成し、それをサブテストとして使い、テストの開始時や終了時に体系的にクリーンアップを実行できます。

ブラウザテストのサブテストは、次の場合、テストスイート間でジャーニーの再利用ができます。
* **テストの作成に費やす時間を節約できます。** ログインテストがある場合、テストごとに同じログインステップを記録するのではなく、テストスイートの最初にサブテストとして呼び出します。
* 他の人がテストを見た時に意味のあるブロックを作ることができるので、**理解しやすりテストにできます。**
* フローが変更されても、更新はテストごとではなく 1 度で済むので、**メンテナンス性が向上します**。


## ログインサブテストの作成と再利用

アプリケーションの監視する際、最初にログインする必要がある場合、ベストプラクティスとして、すべてのログインステップを含む単一のテストを作成し、他のテストがそのログインテストをサブテストとして再利用できるようにします。

ログインテストを作成して、残りのテストスイートでサブテストとして再利用するには、

1. アプリケーションにログインするだけのテスト A を作成します。テスト A の**開始 URL** をログイン前の URL に設定します。

  {{< img src="synthetics/guide/reusing-browser-test-journeys/login_subtest_recording.mp4" alt="Recording the Login subtest" video="true" width="100%">}}

2. アプリケーションのログイン後の機能を監視する 2 番目のテスト B を作成します。以下の例では、この 2 番目のテストはダッシュボードの作成を監視します。テスト B の**開始 URL** もまたログイン前の URL に設定します。

  {{< img src="synthetics/guide/reusing-browser-test-journeys/dashboard_test_configuration.png" alt="親テストを構成" >}}

3. テスト B を記録する際、**サブテスト**をクリックし、ログインテスト A を選択します。 

  {{< img src="synthetics/guide/reusing-browser-test-journeys/dashboard_test_subtest.mp4" alt="Including subtest in parent test" video="true" width="100%">}}

  When you set up this subtest step, all the steps of test A are played at the beginning of the parent test B. Also, the variables in the subtest A are imported into the parent test B. By default, the subtest is played in the main tab. This means your subtest steps are played in the same tab as previous and following steps. The subtest starts running using the URL that was set in the parent test (in this example, the pre-login URL), and after all the subtest steps have been executed, the browser test executes the parent's first non-subtest step from the page the subtest was last on. No parent step was created for now.

**注:** [**サブテストの高度なオプション**][1]を使用して、サブテストを実行するタブを選択できます。

4. 親テストのステップの記録を始める前に、記録画面で専用の資格情報を使いアカウントにログインします。これにより、親テストはサブテストのステップを終えた後に、ブラウザテストと同じ状態から開始されます。

  {{< img src="synthetics/guide/reusing-browser-test-journeys/dashboard_test_iframe.mp4" alt="Replaying subtest in parent test" video="true" width="100%">}}

5. After you login, click **Start recording** to start recording the parent test's post-login steps you're interested in. Once you're done, click **Save**.

  {{< img src="synthetics/guide/reusing-browser-test-journeys/dashboard_test_recording.mp4" alt="Recording parent test" video="true" width="100%">}}

 In the example above, the login subtest ensures that after logging into a Datadog test account, users can create a timeboard. That timeboard is then associated with the user.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/browser_tests/advanced_options#subtests
