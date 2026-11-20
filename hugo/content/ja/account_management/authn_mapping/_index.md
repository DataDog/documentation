---
aliases:
- /ja/account_management/authen_mapping/
beta: true
description: フェデレーション認証システムの認証マッピング API を使用して、アイデンティティプロバイダーグループを Datadog ロールに自動的にマッピングします。
further_reading:
- link: /account_management/rbac/log_management/
  tag: Documentation
  text: ログ管理のための RBAC
title: ロールマッピング API へのフェデレーション認証
---
フェデレーション認証メカニズムを使用する場合、この API を利用することにより、Datadog 内で ID プロバイダーから送信される属性を使用してユーザーグループをロールに自動的にマッピングできます。API を通じて認証マッピングを作成および管理するには、アクセス管理権限を持つユーザーが所有するアプリケーションキーを使用する必要があります。

**注**: SAML ユーザーの場合、Datadog ではこの API の使用に移行することを強く推奨しています。

Datadog UI でも、[User Management] (ユーザー管理) の [**Mappings**] (マッピング) タブでマッピングを作成および管理できます。詳細については、[SAML グループマッピング][1] を参照してください。

## リクエスト

下記のすべての API エンドポイントで、次のホストエンドポイントを使用できます。

* `https://api.{{< region-param key="dd_site" >}}/api/` (使用している Datadog のリージョン用)

### 新しい認証マッピングを作成

JSON 本文から新しい AuthN マッピングを作成します。新しく作成された AuthN マッピングを返します。

| メソッド | エンドポイントパス | 必須ペイロード |
||||
| `POST` | `/v2/authn_mappings` | JSON             |

##### 引数

* **`role["data"]["id"]`** [*必須*、デフォルトなし]:
 マッピング先のロールの `ID`。Roles API は、Datadog ロール、ロールに付与するグローバルアクセス許可、そしてそのロールに属するユーザーを作成し、管理するために使用できます。
 **注**: この属性は、リクエストの `role` 関係ブロックの一部として提示する必要があります。詳細については、次の例を参照してください。ロールを作成すると、ID が割り当てられます。マッピング先のロールの `ID` を見つける方法についての詳細は、[Roles API のドキュメント][2] を参照してください。
* **`attributes["attribute_key"]`** [*必須*、デフォルトなし]:
 `attribute_key` は、アイデンティティプロバイダーから送信される属性を表すキー/値ペアのキー部分です。これらはあなた自身のユースケースのために定義できます。たとえば、`attribute_key` は `memberof`、`attribute_value` は `Development` とすることができます。
* **`attributes["attribute_value"]`** [*必須*、デフォルトなし]:
 `attribute_value` は、アイデンティティプロバイダーから送信される属性を表すキー/値ペアの値部分です。これらはあなた自身のユースケースのために定義できます。たとえば、`attribute_key` は `memberof`、`attribute_value` は `Development` とすることができます。

{{< tabs >}}
{{% tab "例" %}}

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

 `<YOUR_DATADOG_API_KEY>` と `<YOUR_DATADOG_APPLICATION_KEY>` を、所属する組織の対応する [API とアプリケーションキー][1] に置き換えてください。
`<YOUR_DD_SITE>` を次のものに置き換えてください。 {{< region-param key="dd_site" code="true" >}}

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "応答" %}}

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

AuthN Mapping のリストを返します。

| メソッド | エンドポイントパス | 必須ペイロード |
||||
| `GET`  | `/v2/authn_mappings` | オプションのクエリパラメーター |

##### 引数

* **`sort`** [*オプション*、*デフォルト*=**created\_at**]:
  属性を指定した方向で並べ替えます。デフォルトでは昇順に、`<attribute>` を指定すると降順に並べ替えます。関係属性 `role.name`、`saml_assertion_attribute.attribute_key`、`saml_assertion_attribute.attribute_value` でも並べ替え可能です。
* **`page[number]`** [*オプション*、*デフォルト*=**0**、*最小値*=**0**]:
  結果を返すページ数です。
* **`page[size]`** [*オプション*、*デフォルト*=**10**]:
  各ページに表示する結果の数です。
* **`filter`** [*オプション*、デフォルト=none]:
  タグを文字列としてフィルタリングします。たとえば、`Billing Users`。

{{< tabs >}}
{{% tab "例" %}}

```sh
curl -X GET "https://api.<YOUR_DD_SITE>/api/v2/authn_mappings" \
     -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
     -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>"
```

 `<YOUR_DATADOG_API_KEY>` と `<YOUR_DATADOG_APPLICATION_KEY>` を、所属する組織の対応する [API とアプリケーションキー][1] に置き換えてください。
`<YOUR_DD_SITE>` を次のものに置き換えてください。 {{< region-param key="dd_site" code="true" >}}

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "応答" %}}

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

### 指定した AuthN マッピングを取得

UUID で指定した AuthN Mapping を返します。

| メソッド | エンドポイントパス | 必須ペイロード |
||||
| `GET`  | `/authn_mappings/{authn_mapping_id}` | URL パラメーター    |

##### 引数

* **`{authn_mapping_id}`** [*必須*、デフォルトなし]:
  ``{authn_mapping_id}` を、参照したい AuthN Mapping の ID に置き換えます。

{{< tabs >}}
{{% tab "例" %}}

```sh
curl -X GET "https://api.<YOUR_DD_SITE>/api/v2/authn_mappings/{authn_mapping_id}" \
     -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
     -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>"
```

 `<YOUR_DATADOG_API_KEY>` と `<YOUR_DATADOG_APPLICATION_KEY>` を、所属する組織の対応する [API とアプリケーションキー][1] に置き換えてください。
`<YOUR_DD_SITE>` を次のものに置き換えてください。 {{< region-param key="dd_site" code="true" >}}

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "応答" %}}

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

| メソッド | エンドポイントパス | 必須ペイロード |
||||
| `PATCH` | `/v2/authn_mappings/{authn_mapping_id}` | URL パラメーター、JSON |

##### 引数

* **`{authn_mapping_id}`** [*必須*、デフォルトなし]:
  ``{authn_mapping_id}` を、更新したい AuthN Mapping の ID に置き換えます。これはリクエストのパスとリクエストの本文の両方で必須です。
* **`role["data"]["id"]`** [*オプション*、*デフォルト*=none]:
 マッピング先のロールの `ID`。Roles API は、Datadog ロール、ロールに付与するグローバルアクセス許可、そしてそのロールに属するユーザーを作成し、管理するために使用できます。
 **注**: この属性は、リクエストの `role` 関係ブロックの一部として提示する必要があります。詳細については、次の例を参照してください。ロールを作成すると、ID が割り当てられます。マッピング先のロールの `ID` を見つける方法についての詳細は、[Roles API のドキュメント][2] を参照してください。
* **`attributes["attribute_key"]`** [*オプション*、*デフォルト*=none]：
 `attribute_key` は、アイデンティティプロバイダーから送信される属性を表すキー/値ペアのキー部分です。これらはあなた自身のユースケースのために定義できます。たとえば、`attribute_key` は `memberof`、`attribute_value` は `Development` とすることができます。
* **`attributes["attribute_value"]`** [*オプション*、*デフォルト*=none]:
 `attribute_value` は、アイデンティティプロバイダーから送信される属性を表すキー/値ペアの値部分です。これらはあなた自身のユースケースのために定義できます。たとえば、`attribute_key` は `memberof`、`attribute_value` は `Development` とすることができます。

{{< tabs >}}
{{% tab "例" %}}

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

 `<YOUR_DATADOG_API_KEY>` と `<YOUR_DATADOG_APPLICATION_KEY>` を、所属する組織の対応する [API とアプリケーションキー][1] に置き換えてください。
`<YOUR_DD_SITE>` を次のものに置き換えてください。 {{< region-param key="dd_site" code="true" >}}

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "応答" %}}

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

| メソッド   | エンドポイントパス                           | 必須ペイロード |
||||
| `DELETE` | `/v2/authn_mappings/{authn_mapping_id}` | URL パラメーター    |

##### 引数

* **`{authn_mapping_id}`** [*必須*、デフォルトなし]:
  `{authn_mapping_id}` を、削除したい AuthN Mapping の ID に置き換えます。

{{< tabs >}}
{{% tab "例" %}}

```sh
curl -X DELETE "https://api.<YOUR_DD_SITE>/api/v2/authn_mappings/{UUID}" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
         -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>"
```

 `<YOUR_DATADOG_API_KEY>` と `<YOUR_DATADOG_APPLICATION_KEY>` を、所属する組織の対応する [API とアプリケーションキー][1] に置き換えてください。
`<YOUR_DD_SITE>` を次のものに置き換えてください。 {{< region-param key="dd_site" code="true" >}}

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "応答" %}}

```sh
HTTP/2 204
```

{{% /tab %}}
{{< /tabs >}}

### AuthN マッピングの有効化を取得

AuthN Mappings が有効/無効であることを確認します。

| メソッド   | エンドポイントパス              | 必須ペイロード |
||||
| `GET`    | `/v1/org_preferences`      | なし             |

{{< tabs >}}
{{% tab "例" %}}

```sh
curl -X GET \
         "https://api.<YOUR_DD_SITE>/api/v1/org_preferences" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
         -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
```

 `<YOUR_DATADOG_API_KEY>` と `<YOUR_DATADOG_APPLICATION_KEY>` を、所属する組織の対応する [API とアプリケーションキー][1] に置き換えてください。
`<YOUR_DD_SITE>` を次のものに置き換えてください。 {{< region-param key="dd_site" code="true" >}}

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "応答" %}}

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

<div class="alert alert-danger">
マッピングが有効化されると、SAML でログインしているすべてのユーザーはロールが解除され、SAML アサーションの値に基づいてロールが再割り当てされます。マッピングの強制を有効にする前に、ログイン時に想定どおりの SAML アサーションを受けていることを確認することが重要です。
</div>

すべての AuthN マッピングの実行を有効/無効にします。

| メソッド   | エンドポイントパス               | 必須ペイロード |
||||
| `POST`   | `/v1/org_preferences`       | JSON             |

##### 引数

* **`{preference_type}`** [*必須*、デフォルトなし]:
  アップデートに関する個人設定です。値は "saml_authn_mapping_roles" を設定します。
* **`{preference_data}`** [*必須*、デフォルトなし]:
  設定を更新するデータで、true または false を設定します。true の場合はすべてのマッピングを有効化し、false だと無効化します。

{{< tabs >}}
{{% tab "例" %}}

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

 `<YOUR_DATADOG_API_KEY>` と `<YOUR_DATADOG_APPLICATION_KEY>` を、所属する組織の対応する [API とアプリケーションキー][1] に置き換えてください。
`<YOUR_DD_SITE>` を次のものに置き換えてください。 {{< region-param key="dd_site" code="true" >}}

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "応答" %}}

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

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/saml/mapping
[2]: /ja/api/v2/roles/#listroles