---
description: Stripe プロジェクトを使用して、Stripe CLI から Datadog 組織をプロビジョニングおよび管理します。
further_reading:
- link: https://www.datadoghq.com/blog/datadog-stripe-projects/
  tag: ブログ
  text: Stripe プロジェクトで Datadog をプロビジョニングします。
- link: https://docs.stripe.com/projects
  tag: ドキュメント
  text: Stripe プロジェクト CLI ドキュメント
site_support_id: stripe_projects
title: Stripe プロジェクトで Datadog を使い始めてください。
---
## 概要 {#overview}

[Stripe プロジェクト][1] を使用して、Stripe CLI から Datadog をプロビジョニングおよび管理します。このフローは、Datadog 組織を作成し、その API キー、サイト、および組織名をアプリケーションの `.env` ファイルに追加します。

## 前提条件 {#prerequisites}

- 既存の Datadog アカウントに関連付けられていないメールアドレスを持つ Stripe アカウント

## セットアップ{#setup}

### Stripe CLI と Stripe プロジェクト プラグインをインストールします {#install-the-stripe-cli-and-projects-plugin}

1. [Stripe CLI][2] バージョン 1.43.3 以降をインストールします。

   ```shell
   npm install -g @stripe/cli
   ```

   その他のインストール方法については、「[Stripe CLI のインストール][2]」を参照してください。

1. Stripe プロジェクト プラグインをインストールします。

   ```shell
   stripe plugin install projects
   ```

### Datadog をプロビジョニングします {#provision-datadog}

1. Stripe プロジェクトを初期化します。アプリケーションリポジトリのルートなど、プロジェクトに使用するディレクトリでこのコマンドを実行します。

   ```shell
   stripe projects init
   ```

1. Datadog Observability を追加します。

   ```shell
   stripe projects add datadog/observability
   ```

1. プロジェクトディレクトリ内の `.env` ファイルに、Datadog API キー、サイト、および組織名が含まれていることを確認します。

### プランをアップグレードします {#upgrade-your-plan}

無料トライアル終了後も Datadog へのアクセスを維持するには、従量課金制にアップグレードしてください。Stripe アカウントに支払い方法が保存されている場合は、次のコマンドを 1 回実行するだけです。

```shell
stripe projects upgrade datadog-observability
```

## Datadog へアクセスします {#access-datadog}

1. [Datadog login page へアクセスしてください](https://app.datadoghq.com/account/login)。
1. StripeへのサインインにGoogleアカウントを使用している場合は、**Sign in with Google**を選択してください。それ以外の場合は、**Forgot password?**を選択してください。そして、Stripeアカウントのメールアドレスを入力して、Datadogのパスワードを設定してください。

## Stripe プロジェクトから Datadog を削除します {#remove-datadog-from-stripe-projects}

Datadog を削除すると、API キーが無効になり、Stripe プロジェクトからインテグレーションが解除されます。Datadog 組織とそのデータは削除されず、Datadog UI で引き続き利用可能です。

```shell
stripe projects remove datadog-observability
```

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.stripe.com/projects
[2]: https://docs.stripe.com/cli/install