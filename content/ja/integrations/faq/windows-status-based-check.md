---

title: Windows ステータスベースのチェック
---
このガイドでは、Windows でステータスベースのチェックを作成するためのワークフローを概説します。

1. Agent Manager を使用して Agent を構成します。Agent Manager で "Windows Service" の構成を編集します。

2. Agent Manager を使用して [Agent を再起動][1]します (またはサービスを再起動します)。

3. Agent Manager の情報ページを確認し、インテグレーションチェックに合格していることを確認します。以下のようなセクションが表示されるはずです。

    ```
    Checks
    ======

    [...]

    windows_service
    ---------------
        - instance #0 [OK]
        - Collected 0 metrics 0 events & 1 service check
    ```

4. [Datadog アプリケーションの専用ページ][2]で "Install" をクリックし、インテグレーションをインストールします。

5. [これらの手順][3]に従って、インテグレーションモニターを作成します。

これで、Windows サービスインテグレーションに基づいたモニターが完成しました。


[1]: /ja/agent/guide/agent-commands/#start-stop-restart-the-agent
[2]: https://app.datadoghq.com/account/settings#integrations/windows_service
[3]: /ja/monitors/types/integration/
