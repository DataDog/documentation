---
title: Federated Authentication to Role Mapping API
kind: documentation
beta: true
aliases:
  - /ja/account_management/authen_mapping/
further_reading:
  - link: account_management/rbac/log_management/
    tag: ドキュメント
    text: ログ管理のための RBAC
---
<div class="alert alert-warning">
Federated Authentication to Role Mapping API は、現在クローズドベータ版です。機能やパフォーマンスに最適ではない部分があるため、Datadog はこの機能を予告なく随時変更する権利を留保します。この機能を有効にするには、カスタマーサクセスマネージャーまたは<a href="/help">Datadog サポート</a>に依頼してください。
</div>

フェデレーション認証メカニズムを使用する場合、この API を利用することにより、Datadog 内で ID プロバイダーから送信される属性を使用してユーザーグループをロールに自動的にマッピングできます。

**注**: SAML ユーザーであり、既存のベータ版フェデレーションマッピングメカニズム (`roles_v2_saml`) を使用している方には、この API に移行することを強くお勧めします。

## リクエスト

以下のすべての API エンドポイントで、2 つの異なるホストエンドポイントを持つことができます。

* Datadog US サイトを使用する場合は、`https://api.datadoghq.com/api/`
* Datadog EU サイトを使用する場合は、`https://api.datadoghq.eu/api/`

### 新しい認証マッピングを作成する

AuthN Mapping を JSON の本文から新しく作成します。新規作成された AuthN Mapping を返します。

| メソッド | エンドポイントのパス        | ペイロードの要件 |
|--------|----------------------|------------------|
| `POST` | `/v2/authn_mappings` | JSON             |

##### 引数

* **`role_uuid`** [*必須*, *デフォルト*=なし]:
  マッピング先のロールの `UUID` です。Roles API を使用して Datadog のロールを作成し、管理 (グローバルなアクセス許可の付与、含めるユーザーの決定など) することができます。作成するロールには UUID が割り当てられます。マッピングするロールの `role_uuid` を探す方法について詳しくは、[Role API ドキュメント][1]を参照してください。
* **`attribute_key`** [*必須*, *デフォルト*=なし]:
 `attribute_key` は、ID プロバイダーから送信される属性を表すキー/値ペアのキーの部分です。それぞれのユースケースに合わせてこの 2 つを定義できます。たとえば、`attribute_key` は `member-of` に、`attribute_value` は `Development` に定義できます。
* **`attribute_value`** [*必須*, *デフォルト*=なし]:
 `attribute_value` は、ID プロバイダーから送信される属性を表すキー/値ペアの値の部分です。それぞれのユースケースに合わせてこの 2 つを定義できます。たとえば、`attribute_key` は `member-of` に、`attribute_value` は `Development` に定義できます。

{{< tabs >}}
{{% tab "Example" %}}

```sh
curl -X POST \
         "https://api.datadoghq.com/api/v2/authn_mappings" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <DATADOG_APIキー>" \
         -H "DD-APPLICATION-KEY: <DATADOG_アプリケーションキー>" \
         -d '{
             "data": {
                 "type": "authn_mappings",
                 "attributes": {
                      "role_uuid": "123e4567-e89b-12d3-a456-426655445555",
                      "attribute_key": "member-of",
                      "attribute_value": "Development"
                }
             }
         }'
```

`<DATADOG_APIキー>` と `<DATADOG_アプリケーションキー>` のプレースホルダ―を、ご自身の[オーガニゼーションの API キーとアプリケーションキー][1]に置き換えてください。

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Response" %}}

{{< code-block lang="json" filename="response.json" disable_copy="true" >}}
{
  "data": {
    "attributes": {
      "created_at": "2019-11-04 17:41:29.015504",
      "role_uuid": "00000000-0000-0000-0000-000000000000",
      "saml_assertion_attribute_id": 0
    },
    "type": "authn_mappings",
    "id": "123e4567-e89b-12d3-a456-426655440000",
    "relationships": {
      "saml_assertion_attributes": {
        "data": {
          "id": 0,
          "type": "saml_assertion_attributes"
        }
      },
      "roles": {
        "data": {
          "id": "123e4567-e89b-12d3-a456-426655440000",
          "type": "roles"
        }
      }
    }
  },
  "included": [
    {
      "data": {
        "id": "123e4567-e89b-12d3-a456-426655440000",
        "type": "roles",
        "attributes": {
          "created_at": "2019-11-04 17:41:29.015504",
          "modified_at": "2019-11-06 17:41:29.015504",
          "name": "Developer Role"
        },
        "relationships": {
          "data": [
            {
              "id": "123e4567-e89b-12d3-a456-426655441000",
              "type": "permissions"
            }
          ]
        }
      }
    },
    {
      "data": {
        "id": 6,
        "type": "saml_assertion_attributes",
        "attributes": {
          "id": 6,
          "attribute_key": "member-of",
          "attribute_value": "Development"
        }
      }
    }
  ]
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### AuthN Mapping をすべて取得する

AuthN Mapping のリストを返します

| メソッド | エンドポイントのパス        | ペイロードの要件          |
|--------|----------------------|---------------------------|
| `GET`  | `/v2/authn_mappings` | オプションのクエリパラメーター |

##### 引数

* **`sort`** [*オプション*, *デフォルト*=**+**]:
  属性を指定した方向で並べ替えます。デフォルトでは昇順に、`-` を指定すると降順に並べ替えます。
* **`page[number]`** [*任意*, *デフォルト*=**0**, *最小値*=**0**]:
  結果を返すページの数です。
* **`page[size]`** [*任意*, *デフォルト*=**10**]:
  各ページに表示する結果の数です。
* **`filter`** [*任意*, デフォルトなし]:
  タグの文字列 (`Billing Users` など) でフィルタリングします。

{{< tabs >}}
{{% tab "Example" %}}

```sh
curl -X GET "https://api.datadoghq.com/api/v2/authn_mappings" \
     -H "DD-API-KEY: <DATADOG_APIキー>" \
     -H "DD-APPLICATION-KEY: <DATADOG_アプリケーションキー>"
```

`<DATADOG_APIキー>` と `<DATADOG_アプリケーションキー>` のプレースホルダ―を、ご自身の[オーガニゼーションの API キーとアプリケーションキー][1]に置き換えます。

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Response" %}}

```json
{
  "data": [
    {
      "type": "authn_mapping",
      "id": "123e4567-e89b-12d3-a456-426655440000",
      "relationships": {
        "saml_assertion_attributes": {
          "data": {"id": 0, "type": "saml_assertion_attributes"}
        },
        "roles": {
          "data": {
            "id": "123e4567-e89b-12d3-a456-426655440000",
            "type": "roles"
          }
        }
      },
      "attributes": {
        "created_at": "2019-11-04 17:41:29.015504",
        "role_uuid": "123e4567-e89b-12d3-a456-426655445555",
        "saml_assertion_attribute_id": 0
      }
    }
  ],
  "included": [
    {
      "data": {
        "id": "123e4567-e89b-12d3-a456-426655440000",
        "type": "roles",
        "attributes": {
          "created_at": "2019-11-04 17:41:29.015504",
          "modified_at": "2019-11-06 17:41:29.015504",
          "name": "Developer Role"
        },
        "relationships": {
          "data": [
            {
              "id": "123e4567-e89b-12d3-a456-426655440000",
              "type": "permissions"
            }
          ]
        }
      }
    },
    {
      "data": {
        "id": 6,
        "type": "saml_assertion_attributes",
        "attributes": {
          "id": 6,
          "attribute_key": "member-of",
          "attribute_value": "Developer"
        }
      }
    }
  ],
  "meta": {"page": {"total": 0, "page_number": 0, "page_size": 0}}
}
```

{{% /tab %}}
{{< /tabs >}}

### AuthN Mapping を指定して取得する

UUID で指定した AuthN Mapping を返します。

| メソッド | エンドポイントのパス            | ペイロードの要件 |
|--------|--------------------------|------------------|
| `GET`  | `/authn_mappings/{UUID}` | URL パラメーター    |

##### 引数

* **`{UUID}`** [*必須*, デフォルトなし]:
  `{UUID}` を、参照したい AuthN Mapping の UUID に置き換えます。

{{< tabs >}}
{{% tab "Example" %}}

```sh
curl -X GET "https://api.datadoghq.com/api/v2/authn_mappings/{UUID}" \
     -H "DD-API-KEY: <DATADOG_APIキー>" \
     -H "DD-APPLICATION-KEY: <DATADOG_アプリケーションキー>"
```

`<DATADOG_APIキー>` と `<DATADOG_アプリケーションキー>` のプレースホルダ―を、ご自身の[オーガニゼーションの API キーとアプリケーションキー][1]に置き換えます。

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Response" %}}

```json
{
  "data": {
    "attributes": {
      "created_at": "2019-11-04 17:41:29.015504",
      "uuid": "123e4567-e89b-12d3-a456-426655440000",
      "role_uuid": "123e4567-e89b-12d3-a456-426655445555",
      "saml_assertion_attribute_id": 0
    },
    "type": "authn_mappings",
    "id": "123e4567-e89b-12d3-a456-426655440000",
    "relationships": {
      "saml_assertion_attributes": {
        "data": {"id": 0, "type": "saml_assertion_attributes"}
      },
      "roles": {
        "data": {"id": "123e4567-e89b-12d3-a456-426655440000", "type": "roles"}
      }
    }
  },
  "included": [
    {
      "data": {
        "id": "123e4567-e89b-12d3-a456-426655440000",
        "type": "roles",
        "attributes": {
          "created_at": "2019-11-04 17:41:29.015504",
          "modified_at": "2019-11-06 17:41:29.015504",
          "uuid": "123e4567-e89b-12d3-a456-426655440000",
          "name": "Developer Role"
        },
        "relationships": {
          "data": [
            {
              "id": "123e4567-e89b-12d3-a456-426655440000",
              "type": "permissions"
            }
          ]
        }
      }
    },
    {
      "data": {
        "id": 6,
        "type": "saml_assertion_attributes",
        "attributes": {
          "id": 6,
          "attribute_key": "member-of",
          "attribute_value": "Developer"
        }
      }
    }
  ]
}
```

{{% /tab %}}
{{< /tabs >}}

### マッピングを更新する

AuthN Mapping の `role`、`saml_assertion_attribute_id`、あるいはその両方を JSON の本文から更新します。更新された AuthN Mapping を返します。

| メソッド  | エンドポイントのパス               | ペイロードの要件    |
|---------|-----------------------------|---------------------|
| `PATCH` | `/v2/authn_mappings/{UUID}` | URL パラメーター、JSON |

##### 引数

* **`{UUID}`** [*必須*, デフォルトなし]:
  `{UUID}` を、更新したい AuthN Mapping の UUID に置き換えます。
* **`id`** [*必須*, *デフォルト*=なし]:
  更新される AuthN Mapping の UUID です。このプロパティはリクエスト内で `{UUID}` パスのパラメーターと一致させる必要があります。
* **`role_uuid`** [*required*, *default*=none]:
  Roles API を使用して Datadog のロールを作成し、管理 (グローバルなアクセス許可の付与、含めるユーザーの決定など) することができます。作成するロールには UUID が割り当てられます。更新するロールの `role_uuid` を探す方法について詳しくは、[Role API ドキュメント][1]を参照してください。
* **`attribute_key`** [*必須*, *デフォルト*=なし]:
 `attribute_key` は、ID プロバイダーから送信される属性を表すキー/値ペアのキーの部分です。各ユーザーのユースケースに合わせてこの 2 つを定義できます。たとえば、`attribute_key` は `member-of` に、`attribute_value` は `Development` に定義できます。
* **`attribute_value`** [*必須*, *デフォルト*=なし]:
 `attribute_value` は、ID プロバイダーから送信される属性を表すキー/値ペアの値の部分です。それぞれのユースケースに合わせてこの 2 つを定義できます。たとえば、`attribute_key` は `member-of` に、`attribute_value` は `Development` に定義できます。

{{< tabs >}}
{{% tab "Example" %}}

```sh
curl -X PATCH \
         "https://api.datadoghq.com/api/v2/authn_mappings/{UUID}" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <DATADOG_APIキー>" \
         -H "DD-APPLICATION-KEY: <DATADOG_アプリケーションキー>" \
         -d '{
             "data": {
                 "type": "authn_mappings",
                 "id": "{UUID}",
                 "attributes": {
                      "role_uuid": "123e4567-e89b-12d3-a456-426655445555",
                      "attribute_key": "member-of",
                      "attribute_value": "Developer"
                }
             }
         }'
```

`<DATADOG_APIキー>` と `<DATADOG_アプリケーションキー>` のプレースホルダ―を、ご自身の[オーガニゼーションの API キーとアプリケーションキー][1]に置き換えます。

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Response" %}}

```json
{
  "data": {
    "attributes": {
      "created_at": "2019-11-04 17:41:29.015504",
      "role_uuid": "123e4567-e89b-12d3-a456-426655445555",
      "saml_assertion_attribute_id": 0
    },
    "type": "authn_mappings",
    "id": "123e4567-e89b-12d3-a456-426655440000",
    "relationships": {
      "saml_assertion_attributes": {
        "data": {"id": 0, "type": "saml_assertion_attributes"}
      },
      "roles": {
        "data": {"id": "123e4567-e89b-12d3-a456-426655440000", "type": "roles"}
      }
    }
  },
  "included": [
    {
      "data": {
        "id": "123e4567-e89b-12d3-a456-426655440000",
        "type": "roles",
        "attributes": {
          "created_at": "2019-11-04 17:41:29.015504",
          "modified_at": "2019-11-06 17:41:29.015504",
          "uuid": "123e4567-e89b-12d3-a456-426655440000",
          "name": "Developer Role"
        },
        "relationships": {
          "data": [
            {
              "id": "123e4567-e89b-12d3-a456-426655440000",
              "type": "permissions"
            }
          ]
        }
      }
    },
    {
      "data": {
        "id": 6,
        "type": "saml_assertion_attributes",
        "attributes": {
          "id": 6,
          "attribute_key": "member-of",
          "attribute_value": "Developer"
        }
      }
    }
  ]
}
```

{{% /tab %}}
{{< /tabs >}}

### マッピングを削除する

指定した AuthN Mapping を削除します。

| メソッド   | エンドポイントのパス               | ペイロードの要件 |
|----------|-----------------------------|------------------|
| `DELETE` | `/v2/authn_mappings/{UUID}` | URL パラメーター    |

##### 引数

* **`{UUID}`** [*必須*, デフォルトなし]:
  `{UUID}` を、削除したい AuthN Mapping の UUID に置き換えます。

{{< tabs >}}
{{% tab "Example" %}}

```sh
curl -X DELETE "https://api.datadoghq.com/api/v2/authn_mappings/{UUID}" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <DATADOG_APIキー>" \
         -H "DD-APPLICATION-KEY: <DATADOG_アプリケーションキー>"
```

`<DATADOG_APIキー>` と `<DATADOG_アプリケーションキー>` のプレースホルダ―を、ご自身の[オーガニゼーションの API キーとアプリケーションキー][1]に置き換えます。

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Response" %}}

```sh
HTTP/2 204
```

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/#get-all-roles