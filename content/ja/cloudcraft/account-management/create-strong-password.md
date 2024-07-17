---
title: 強力なパスワードを作成してデータを保護する
---

強力でユニークなパスワードを作成し、維持することは、インターネット上のどこにいてもデータを安全に保つための基本です。

ユニークで強固なパスワードは次のことに役立ちます。

- データの保護
- クラウドアーキテクチャの保護
- 他者によるアカウントへのアクセス防止

パスワードは 32 文字以上で、文字、数字、記号を自由に組み合わせて作成してください。 Cloudcraft はパスワードの強度を検出し、少なくとも 10^8 回の推測に耐える複雑さを要求します。パスワードが流出リストに掲載されていないことも確認が必要です。

Cloudcraft は 1 時間あたり 10 回の推測で、自動スロットリングとアカウントの一時的なロックアウトも実行します。

## Best practices

1. [1Password][1] や [Bitwarden][2] などのパスワードマネージャーを使用しましょう。これらを使えば、各 Web サイトごとに固有の長くて複雑なパスワードを簡単に作成・管理できます。
2. [Have I Been Pwned][3] などのセキュリティ侵害通知サービスに加入し、利用しているサービスがセキュリティ侵害にあった場合に通知を受け取るようにしましょう。
3. [二要素認証 (2FA) を使用してください][4]。Cloudcraft を含むほとんどの機密情報を扱うサービスが 2FA 保護を提供しています。

Web ブラウザ Firefox の会社である Mozilla は、[このテーマに関する素晴らしい記事][5]を提供しています。

[1]: https://1password.com/
[2]: https://bitwarden.com/
[3]: https://haveibeenpwned.com/
[4]: https://help.cloudcraft.co/article/28-set-up-two-factor-authentication
[5]: https://blog.mozilla.org/en/privacy-security/privacy-security-tips/how-to-create-strong-passwords/