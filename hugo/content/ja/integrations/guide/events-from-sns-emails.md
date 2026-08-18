---
description: Amazon SNS からのメールを使って Datadog にイベントを送信する手順
further_reading:
- link: https://docs.datadoghq.com/integrations/amazon_web_services/
  tag: ドキュメント
  text: AWS インテグレーション
- link: https://docs.datadoghq.com/integrations/amazon_sns/#overview
  tag: ドキュメント
  text: SNS インテグレーション
- link: https://www.datadoghq.com/blog/monitor-aws-fully-managed-services-datadog-serverless-monitoring/
  tag: ブログ
  text: Amazon API Gateway、SQS、Kinesis などの、Datadog サーバーレスモニタリング
title: Amazon SNS のメールから Datadog のイベントを作成する
---

## 概要

Amazon SNS トピックから送信されるメールで Datadog イベントを作成することができます。このガイドを使用して、SNS トピックに Datadog アカウントをサブスクライブし、サブスクリプションを確認します。

## セットアップ

1. [メールによるイベント][1]ガイドのセットアップ手順に従って、Datadog から専用のメールアドレスを作成します。生成されたメールアドレスをクリップボードにコピーします。
2. サブスクライブしたい SNS トピックから、**Create subscription** をクリックし、プロトコルとして `Email` を選択します。`Endpoint` フィールドに手順 1 で入力したメールアドレスを貼り付け、その他の設定を任意で行い、**Create subscription** をクリックします。
3. Datadog [イベントエクスプローラー][2]で、`AWS Notification - Subscription Confirmation` という件名のイベントを検索します。確認用に提供された URL をコピーします。

{{< img src="integrations/guide/events_from_sns_emails/events_from_sns_emails.png" alt="Datadog イベントエクスプローラーで、AWS Notification - Subscription Confirmation という件名のイベントの詳細ビューと、Confirm Subscription というテキストの横にハイライトされた URL が表示されている様子" >}}

4. ブラウザで新しいタブを開き、アドレスバーに URL を貼り付けます。ブラウザで URL を開くと、サブスクリプションが確定します。

### 検証

AWS コンソールで SNS トピックに戻り、サブスクリプションのステータスが `Confirmed` であることを確認します。トピックに公開された新しいメッセージは、Datadog でイベントを作成します。

## Datadog でイベントを使用する

[イベントモニター][3]で SNS のトピックからのメールに基づくアラートを構成します。[イベントエクスプローラー][4]でイベントを検索・フィルターしたり、[ダッシュボード][5]でイベントをさらに分析・表示したりすることができます。

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/events/guides/email/
[2]: https://app.datadoghq.com/event/explorer
[3]: /ja/monitors/types/event/
[4]: /ja/events/explorer/
[5]: /ja/dashboards/