---
title: Federated Authentication to Role Mapping API
kind: documentation
beta: true
aliases:
  - /ja/account_management/authen_mapping/
further_reading:
  - link: /account_management/rbac/log_management/
    tag: ドキュメント
    text: ログ管理のための RBAC
---
フェデレーション認証メカニズムを使用する場合、この API を利用することにより、Datadog 内で ID プロバイダーから送信される属性を使用してユーザーグループをロールに自動的にマッピングできます。API を使用して認証マッピングを作成および管理するには、ユーザーはアクセス管理許可を持つ所有者のいるアプリケーションキーを使用する必要があります。

**注**: SAML ユーザーであり、既存のベータ版フェデレーションマッピングメカニズム (`roles_v2_saml`) を使用している方には、この API に移行することを強くお勧めします。

Datadog アプリの UI（User Management の **Mappings** タブ）からも、マッピングを作成および管理できます。詳しくは [SAML 属性の Datadog ロールへのマッピング][1]を参照してください。

## リクエスト

下記のすべての API エンドポイントで、次のホストエンドポイントを使用できます。

* Datadog リージョンには `https://api.{{< region-param key="dd_site" >}}/api/` 。

### 新しい認証マッピングを作成

AuthN Mapping を JSON の本文から新しく作成します。新規作成された AuthN Mapping を返します。

| メソッド | エンドポイントのパス        | ペイロードの要件 |
|--------|----------------------|------------------|
| `POST` | `/v2/authn_mappings` | JSON             |

##### 引数

* **`role["data"]["id"]`** [*必須*, デフォルトなし]:
 マッピング先のロールの `ID`。Roles API は、Datadog ロール、ロールに付与するグローバルアクセス許可、そのロールに属するユーザーを作成し、管理するために使用できます。
 **注**: この属性はリクエストされた `role` 関係を有するブロックの一部として提示する必要があります。詳しくは以下の例を参照してください。作成するロールには ID が割り当てられます。マッピングするロールの `ID` を探す方法について詳しくは、[Role API ドキュメント][2]を参照してください。
* **`attributes["attribute_key"]`** [*必須*, デフォルトなし]:
 `attribute_key` は、ID プロバイダーから送信される属性を表すキー/値ペアのキーの部分です。各ユーザーのユースケースに合わせてこの 2 つを定義できます。たとえば、`attribute_key` は `member-of` に、`attribute_value` は `Development` に定義できます。
* **`attributes["attribute_value"]`** [*必須*, デフォルトなし]:
 `attribute_value` は、ID プロバイダーから送信される属性を表すキー/値ペアの値の部分です。それぞれのユースケースに合わせてこの 2 つを定義できます。たとえば、`attribute_key` は `member-of` に、`attribute_value` は `Development` に定義できます。

{{< tabs >}}
{{% tab "Example" %}}

```sh
curl -X POST \
    "https://api.<YOUR_DD_SITE>/api/v2/authn_mappings" \
    -H "Content-Type: application/json" \
    -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
    -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
    -d '{
            "data": {
                "type": "authn_mappings",
                "attributes": {
                    "attribute_key": "member-of",
                    "attribute_value": "Development"
                },
                "relationships": {
                    "role": {
                        "data": {
                            "id": "123e4567-e89b-12d3-a456-426655445555",
                            "type": "roles"
                        }
                    }
                }
            }
        }'
```

- `<YOUR_DATADOG_API_KEY>` と `<YOUR_DATADOG_APPLICATION_KEY>` を、組織の対応する[API キーとアプリケーションキー][1]に置き換えます。
- `<YOUR_DD_SITE>` を {{< region-param key="dd_site" code="true" >}} に置き換えます

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Response" %}}

```json
{
    "data": {
        "attributes": {
            "created_at": "2019-11-04 17:41:29.015504",
            "modified_at": "2019-11-04 17:41:29.015504",
            "role_uuid": "00000000-0000-0000-0000-000000000000",
            "saml_assertion_attribute_id": 0
        },
        "type": "authn_mappings",
        "id": "123e4567-e89b-12d3-a456-426655440000",
        "relationships": {
            "saml_assertion_attribute": {
                "data": {
                    "id": 0,
                    "type": "saml_assertion_attributes"
                }
            },
            "role": {
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
                    "permissions": {
                        "data": [
                            {
                                "id": "123e4567-e89b-12d3-a456-426655441000",
                                "type": "permissions"
                            }
                        ]
                    }
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
```

{{% /tab %}}
{{< /tabs >}}

### すべての AuthN マッピングを取得

AuthN Mapping のリストを返します

| メソッド | エンドポイントのパス        | ペイロードの要件          |
|--------|----------------------|---------------------------|
| `GET`  | `/v2/authn_mappings` | オプションのクエリパラメーター |

##### 引数

* **`sort`** [*オプション*, *デフォルト*=**created\_at**]:
  属性を指定した方向で並べ替えます。デフォルトでは昇順に、`-<attribute>` を指定すると降順に並べ替えます。また、関連属性 `role.name`、`saml_assertion_attribute.attribute_key`、`saml_assertion_attribute.attribute_value` でも並べ替えが可能です。
* **`page[number]`** [*任意*, *デフォルト*=**0**, *最小値*=**0**]:
  結果を返すページの数です。
* **`page[サイズ]`** [*任意*、*デフォルト*=**10**]:
  各ページに表示する結果の数です。
* **`filter`** [*オプション*, デフォルト =none]:
  タグの文字列 (`Billing Users` など) でフィルタリングします。

{{< tabs >}}
{{% tab "Example" %}}

```sh
curl -X GET "https://api.<YOUR_DD_SITE>/api/v2/authn_mappings" \
     -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
     -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>"
```

- `<YOUR_DATADOG_API_KEY>` と `<YOUR_DATADOG_APPLICATION_KEY>` を、組織の対応する[API キーとアプリケーションキー][1]に置き換えます。
- `<YOUR_DD_SITE>` を {{< region-param key="dd_site" code="true" >}} に置き換えます

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
          "saml_assertion_attribute": {
            "data": {"id": 0, "type": "saml_assertion_attributes"}
          },
          "role": {
            "data": {
              "id": "123e4567-e89b-12d3-a456-426655440000",
              "type": "roles"
            }
          }
        },
        "attributes": {
          "created_at": "2019-11-04 17:41:29.015504",
          "modified_at": "2019-11-04 17:41:29.015504",
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
            "permissions": {
                "data": [
                  {
                    "id": "123e4567-e89b-12d3-a456-426655440000",
                    "type": "permissions"
                  }
                ]
            }
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
    "meta": {
      "page": {
        "total_count": 1,
        "total_filtered_count": 1,
      }
    }
}
```

{{% /tab %}}
{{< /tabs >}}

### 指定した AuthN マッピングを削除

UUID で指定した AuthN Mapping を返します。

| メソッド | エンドポイントのパス            | ペイロードの要件 |
|--------|--------------------------|------------------|
| `GET`  | `/authn_mappings/{authn_mapping_id}` | URL パラメーター    |

##### 引数

* **`{authn_mapping_id}`** [*必須*, デフォルトなし]:
  `{authn_mapping_id}` を、参照したい AuthN Mapping の ID に置き換えます。

{{< tabs >}}
{{% tab "Example" %}}

```sh
curl -X GET "https://api.<YOUR_DD_SITE>/api/v2/authn_mappings/{authn_mapping_id}" \
     -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
     -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>"
```

- `<YOUR_DATADOG_API_KEY>` と `<YOUR_DATADOG_APPLICATION_KEY>` を、組織の対応する[API キーとアプリケーションキー][1]に置き換えます。
- `<YOUR_DD_SITE>` を {{< region-param key="dd_site" code="true" >}} に置き換えます

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Response" %}}

```json
{
    "data": {
        "attributes": {
            "created_at": "2019-11-04 17:41:29.015504",
            "modified_at": "2019-11-04 17:41:29.015504",
            "uuid": "123e4567-e89b-12d3-a456-426655440000",
            "saml_assertion_attribute_id": 0
        },
        "type": "authn_mappings",
        "id": "123e4567-e89b-12d3-a456-426655440000",
        "relationships": {
            "saml_assertion_attribute": {
                "data": {
                    "id": 0,
                    "type": "saml_assertion_attributes"
                }
            },
            "role": {
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
                    "uuid": "123e4567-e89b-12d3-a456-426655440000",
                    "name": "Developer Role"
                },
                "relationships": {
                    "permissions": {
                        "data": [
                            {
                                "id": "123e4567-e89b-12d3-a456-426655440000",
                                "type": "permissions"
                            }
                        ]
                    }
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

| メソッド  | エンドポイントのパス                           | ペイロードの要件    |
|---------|-----------------------------------------|---------------------|
| `PATCH` | `/v2/authn_mappings/{authn_mapping_id}` | URL パラメーター、JSON |

##### 引数

* **`{authn_mapping_id}`** [*必須*, デフォルトなし]:
  `{authn_mapping_id}` を、更新したい AuthN Mapping の ID に置き換えます。リクエストのパスと、リクエスト本文の両方でこの設定を行ってください。
* **`role["data"]["id"]`** [*オプション*, *デフォルト*=none]:
 マッピング先のロールの `ID`。Roles API は、Datadog ロール、ロールに付与するグローバルアクセス許可、そのロールに属するユーザーを作成し、管理するために使用できます。
 **注**: この属性はリクエストされた `role` 関係を有するブロックの一部として提示する必要があります。詳しくは以下の例を参照してください。作成するロールには ID が割り当てられます。マッピングするロールの `ID` を探す方法について詳しくは、[Role API ドキュメント][2]を参照してください。
* **`attributes["attribute_key"]`** [*オプション*, *デフォルト*=none]:
 `attribute_key` は、ID プロバイダーから送信される属性を表すキー/値ペアのキーの部分です。各ユーザーのユースケースに合わせてこの 2 つを定義できます。たとえば、`attribute_key` は `member-of` に、`attribute_value` は `Development` に定義できます。
* **`attributes["attribute_value"]`** [*オプション*, *デフォルト*=none]:
 `attribute_value` は、ID プロバイダーから送信される属性を表すキー/値ペアの値の部分です。それぞれのユースケースに合わせてこの 2 つを定義できます。たとえば、`attribute_key` は `member-of` に、`attribute_value` は `Development` に定義できます。

{{< tabs >}}
{{% tab "Example" %}}

```sh
curl -X PATCH \
    "https://api.<YOUR_DD_SITE>/api/v2/authn_mappings/{UUID}" \
    -H "Content-Type: application/json" \
    -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
    -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
    -d '{
            "data": {
                "type": "authn_mappings",
                "id": "{authn_mapping_id}",
                "attributes": {
                    "attribute_key": "member-of",
                    "attribute_value": "Developer"
                }
                "relationships": {
                "role": {
                    "data": {
                            "id": "123e4567-e89b-12d3-a456-426655440000",
                            "type": "roles"
                        }
                    }
                }
            }
        }'
```

- `<YOUR_DATADOG_API_KEY>` と `<YOUR_DATADOG_APPLICATION_KEY>` を、組織の対応する[API キーとアプリケーションキー][1]に置き換えます。
- `<YOUR_DD_SITE>` を {{< region-param key="dd_site" code="true" >}} に置き換えます

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Response" %}}

```json
{
    "data": {
        "attributes": {
            "created_at": "2019-11-04 17:41:29.015504",
            "modified_at": "2019-11-04 17:41:29.015504",
            "saml_assertion_attribute_id": 0
        },
        "type": "authn_mappings",
        "id": "123e4567-e89b-12d3-a456-426655440000",
        "relationships": {
            "saml_assertion_attribute": {
                "data": {
                    "id": 0,
                    "type": "saml_assertion_attributes"
                }
            },
            "role": {
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

| メソッド   | エンドポイントのパス                           | ペイロードの要件 |
|----------|-----------------------------------------|------------------|
| `DELETE` | `/v2/authn_mappings/{authn_mapping_id}` | URL パラメーター    |

##### 引数

* **`{authn_mapping_id}`** [*必須*, デフォルトなし]:
  `{authn_mapping_id}` を、削除したい AuthN Mapping の ID に置き換えます。

{{< tabs >}}
{{% tab "Example" %}}

```sh
curl -X DELETE "https://api.<YOUR_DD_SITE>/api/v2/authn_mappings/{UUID}" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
         -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>"
```

- `<YOUR_DATADOG_API_KEY>` と `<YOUR_DATADOG_APPLICATION_KEY>` を、組織の対応する[API キーとアプリケーションキー][1]に置き換えます。
- `<YOUR_DD_SITE>` を {{< region-param key="dd_site" code="true" >}} に置き換えます

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Response" %}}

```sh
HTTP/2 204
```

{{% /tab %}}
{{< /tabs >}}

### AuthN マッピングの有効化を取得

AuthN Mappings が有効/無効であることを確認します。

| メソッド   | エンドポイントのパス              | ペイロードの要件 |
|----------|----------------------------|------------------|
| `GET`    | `/v1/org_preferences`      | なし             |

{{< tabs >}}
{{% tab "Example" %}}

```sh
curl -X GET \
         "https://api.<YOUR_DD_SITE>/api/v1/org_preferences" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
         -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
```

- `<YOUR_DATADOG_API_KEY>` と `<YOUR_DATADOG_APPLICATION_KEY>` を、組織の対応する[API キーとアプリケーションキー][1]に置き換えます。
- `<YOUR_DD_SITE>` を {{< region-param key="dd_site" code="true" >}} に置き換えます

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Response" %}}

```json
{
  "data": {
    "attributes": {
        "preference_data": "saml_authn_mapping_roles",
        "preference_type": true
    },
    "type": "org_preferences",
    "id": 1,
  },
}
```

{{% /tab %}}
{{< /tabs >}}

### すべてのマッピングを有効化/無効化

<div class="alert alert-warning">
すべてのユーザーの SAML ログインを有効にすると、それらのユーザーが現在保持するロールが消去され、各 SAML のアサーション値に基づいてロールの再割り当てが行われます。マッピング機能を有効化する前に、ログインに関して想定通りの SAML アサーションを受領していることを必ず確認してください。
</div>

すべての AuthN マッピングの実行を有効/無効にします。

| メソッド   | エンドポイントのパス               | ペイロードの要件 |
|----------|-----------------------------|------------------|
| `POST`   | `/v1/org_preferences`       | JSON             |

##### 引数

* **`{preference_type}`** [*必須*, デフォルトなし]:
  アップデートに関する設定です。値は "saml_authn_mapping_roles" となります。
* **`{preference_data}`** [*必須*, デフォルトなし]:
  設定を更新するデータで、true または false を設定します。true の場合はすべてのマッピングを有効化し、false だと無効化します。

{{< tabs >}}
{{% tab "Example" %}}

```sh
curl -X POST \
    "https://api.<YOUR_DD_SITE>/api/v1/org_preferences" \
    -H "Content-Type: application/json" \
    -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
    -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
    -d '{
        "data": {
            "type": "org_preferences",
            "attributes": {
                "preference_type": "saml_authn_mapping_roles",
                "preference_data": true
            }
        }
    }'
`
```

- `<YOUR_DATADOG_API_KEY>` と `<YOUR_DATADOG_APPLICATION_KEY>` を、組織の対応する[API キーとアプリケーションキー][1]に置き換えます。
- `<YOUR_DD_SITE>` を {{< region-param key="dd_site" code="true" >}} に置き換えます

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Response" %}}

```json
{
  "data": {
    "attributes": {
        "preference_type": "saml_authn_mapping_roles",
        "preference_data": true
    },
    "type": "org_preferences",
    "id": 1,
  },
}
```

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/saml/#mapping-saml-attributes-to-datadog-roles
[2]: /ja/api/v2/roles/#list-roles