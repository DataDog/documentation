---
disable_sidebar: true
further_reading:
- link: /security/application_security/
  tag: ドキュメント
  text: Protect against Threats with Datadog App and API Protection
- link: /security/application_security/add-user-info/
  tag: ドキュメント
  text: ユーザーアクティビティの追跡
- link: /security/default_rules/?category=cat-application-security
  tag: ドキュメント
  text: すぐに使える App and API Protection（AAP）ルール
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: App and API Protection のトラブルシューティング
- link: /security/application_security/how-it-works/
  tag: ドキュメント
  text: How App and API Protection Works in Datadog
title: AWS Fargate での App and API Protection のセットアップ
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection は、Datadog Government サイト US1-FED でプレビュー版として提供されています。
</div>
{{< /site-region >}}

タスクのプログラミング言語を選択して、AWS Fargate タスクで App and API Protection (AAP) をセットアップする方法を学びます。

<div class="alert alert-info">
  <p class="fs-bold m-0">環境が見当たりませんか？</p>
  <span>不足している環境については、<a href="https://forms.gle/nMGq2Hhe7Z4sCKdy6">こちら</a>からリクエストを送信してください。</span>
</div>

{{< appsec-integrations >}}
  {{< appsec-integration name="Python" avatar="python" link="/security/application_security/setup/python/aws-fargate" >}}
  {{< appsec-integration name="Node.js" avatar="node" link="/security/application_security/setup/nodejs/aws-fargate" >}}
  {{< appsec-integration name="Java" avatar="java" link="/security/application_security/setup/java/aws-fargate" >}}
  {{< appsec-integration name="Go" avatar="go" link="/security/application_security/setup/go/aws-fargate" >}}
  {{< appsec-integration name="Ruby" avatar="ruby" link="/security/application_security/setup/ruby/aws-fargate" >}}
  {{< appsec-integration name=".NET" avatar="dotnet" link="/security/application_security/setup/dotnet/aws-fargate" >}}
  {{< appsec-integration name="PHP" avatar="php" link="/security/application_security/setup/php/aws-fargate" >}}
{{< /appsec-integrations >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}