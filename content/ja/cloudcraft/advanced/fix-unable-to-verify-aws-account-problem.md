---
title: Fix "unable to verify AWS account" problem
---

Cloudcraft に AWS アカウントを追加しようとしたときに "unable to verify AWS account" (AWS アカウントを検証できません) エラーが表示される場合、組織がアカウントにサービス制御ポリシーを適用している可能性があります。これにより、Cloudcraft のサーバーが作成された IAM ロールを検証できません。

このエラーを解決するには、以下のオプションがあります。

## `us-east-1` リージョンへのアクセスを有効にする

IT チームにポリシーの `us-east-1` リージョンへのアクセスを一時的に有効にするよう依頼します。これは Cloudcraft が IAM ロールの検証に使用するリージョンです。アカウントを追加した後、再度リージョンを無効にすると、Cloudcraft はブロックされていないリージョン内のコンポーネントのみをスキャンするように制限されます。

ポリシーに例外を設けるための強力な理由を提供するために、組織の管理者に最小限の IAM ポリシーをロールに適用するオプションを提供し、Cloudcraft がアプリケーションに追加された AWS アカウントから読み取れるものと読み取れないものに制限をかけることができます。詳細については、[Cloudcraft で使用する最小限の IAM ポリシーを作成する][1]を参照してください。

## API を使用してアカウントを追加する

Web インターフェイスを使用する代わりに、Cloudcraft の API を使用してアカウントを追加し、アカウントをチェックするリージョンを指定することができます。詳細については、[Cloudcraft API による AWS アカウントの追加][2]を参照してください。

[1]: /ja/cloudcraft/advanced/minimal-iam-policy/
[2]: /ja/cloudcraft/advanced/add-aws-account-via-api/