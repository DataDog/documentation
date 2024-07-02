---
title: API Testing Errors
description: Detailed description of API test errors
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: Blog
  text: Introducing Datadog Synthetic Monitoring
- link: /synthetics/
  tag: Documentation
  text: Manage your checks
- link: /synthetics/browser_tests/
  tag: Documentation
  text: Configure a Browser Test
---
## HTTP エラー

`Error performing HTTP/2 request` というメッセージは、リモートサーバーの HTTP サポートに一貫性がない場合に表示されることがあります。例えば、HTTP 2 をサポートしているサーバーのエンドポイントに到達するテストを実行したとします。次の実行で、HTTP 1.1 しかサポートしていないサーバーの同じエンドポイントに遭遇すると、テストは HTTP 2 接続の確立に失敗し、エラーを返します。このシナリオでは、HTTP/1.1 に切り替えることでエラーを防ぐことができます。

## SSL エラー

SSL エラーは、API テストの実行時に発生する可能性のあるエラーです。SSL テストでのアサーションエラーとは異なり、どの種類の API テストでも起こる可能性があります。

{{< img src="synthetics/api_tests/ssl-self-signed-error.png" alt="SSL の自己署名エラー" style="width:60%;" >}}

| Error                                | 説明                                                                                                                                                              |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `CERT_CHAIN_TOO_LONG`                | 証明書チェーンの長さが、指定された最大深度よりも長くなっています。                                                                                                 |
| `CERT_HAS_EXPIRED`                   | 証明書の期限が切れています。                                                                                                                                              |
| `CERT_NOT_YET_VALID`                 | 証明書が未来の日付まで有効ではありません。                                                                                                                        |
| `CERT_REJECTED`                      | ルート CA が、指定された目的を拒否するようにマーク付けされています。                                                                                                                   |
| `CERT_REVOKED`                       | 証明書が発行者によって無効化されました。                                                                                                                               |
| `CERT_UNTRUSTED`                     | ルート CA が、意図された目的で信頼できるようにマーク付けされていません。                                                                                                           |
| `CERT_SIGNATURE_FAILURE`             | 証明書のシグニチャが有効ではありません。                                                                                                                           |
| `CRL_HAS_EXPIRED`                    | 証明書失効リスト (CRL) の期限が切れています。                                                                                                                       |
| `CRL_NOT_YET_VALID`                  | 証明書失効リスト (CRL) が、未来の日付まで有効ではありません。                                                                                                  |
| `CRL_SIGNATURE_FAILURE`              | 証明書の CRL 署名が有効ではありません。                                                                                                                       |
| `DEPTH_ZERO_SELF_SIGNED_CERT`        | パスした証明書は自己署名されており、信頼できる証明書のリストに同じ証明書が見つかりません。                                                      |
| `ERROR_IN_CERT_NOT_AFTER_FIELD`      | 証明書の notAfter フィールドにフォーマットエラーがあります。                                                                                                        |
| `ERROR_IN_CERT_NOT_BEFORE_FIELD`     | 証明書の notBefore フィールドにフォーマットエラーがあります。                                                                                                       |
| `ERROR_IN_CRL_LAST_UPDATE_FIELD`     | CRL の lastUpdate フィールドに無効な時刻が含まれています。                                                                                                                       |
| `ERROR_IN_CRL_NEXT_UPDATE_FIELD`     | CRL の nextUpdate フィールドに無効な時刻が含まれています。                                                                                                                       |
| `INVALID_CA`                         | CA 証明書が有効ではありません。CA が正しくないか、エクステンションが意図した目的と一致しません。                                                     |
| `INVALID_PURPOSE`                    | 提供された証明書は、意図した目的に使用できません。                                                                                               |
| `OUT_OF_MEM`                         | メモリの割り当て中にエラーが発生しました。                                                                                                                               |
| `PATH_LENGTH_EXCEEDED`               | basicConstraints の pathlength パラメータを超過しています。                                                                                                                  |
| `SELF_SIGNED_CERT_IN_CHAIN`          | 自己署名証明書が証明書チェーンに存在します。証明書チェーンを、信頼されない証明書を使用して作成することはできますが、ルート CA がローカルに見つかりません。 |
| `UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY` | 証明書の公開鍵を読み取ることができません。                                                                                                                        |
| `UNABLE_TO_DECRYPT_CERT_SIGNATURE`   | 証明書の署名を復号化できません。                                                                                                                      |
| `UNABLE_TO_DECRYPT_CRL_SIGNATURE`    | CRL 署名を復号化できません。(実際の署名の値を判断できません。)                                                                                |
| `UNABLE_TO_GET_CRL`                  | 証明書の失効リスト (CRL) が見つかりません。                                                                                                                      |
| `UNABLE_TO_GET_ISSUER_CERT`          | 署名の階層に含まれる認証局 (CA) のいずれかで必要な証明書が見つかりません。また、その CA はローカルアプリケーションによって信頼されていません。               |
| `UNABLE_TO_GET_ISSUER_CERT_LOCALLY`  | ローカルで見つかった証明書の発行者証明書が見つかりません。多くの場合これは、信頼された証明書のリストが完全ではないことを意味します。                            |
| `UNABLE_TO_VERIFY_LEAF_SIGNATURE`    | 証明書チェーンに 1 つの (自己署名ではない) 証明書しか含まれておらず、発行者を信頼できないため、署名を確認できません。                         |
