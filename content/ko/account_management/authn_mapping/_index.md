---
aliases:
- /ko/account_management/authen_mapping/
beta: true
further_reading:
- link: /account_management/rbac/log_management/
  tag: 설명서
  text: 로그 관리용 RBAC
title: 역할 매핑 API를 위한 타사 인증
---

페더레이션 인증(Federated Authentication) 메커니즘을 사용할 경우 이 API를 이용하여 Datadog 내에서 ID 제공업체(Identity Provider)가 전송하는 속성을 사용하여 사용자 그룹을 역할에 자동으로 매핑할 수 있습니다. API를 사용하여 인증 매핑(Authentication Mapping)을 생성하고 관리하려면, 액세스 관리(Access Management) 권한을 받은 소유자가 보유한 애플리케이션 키를 사용해야 합니다.

**참조**: SAML 사용자로서 기존 베타 페더레이션 매핑(Federated Mapping) 메커니즘(`roles_v2_saml`)을 사용하는 경우, 이 API를 사용하실 것을 강력하게 권장합니다.

User Management의 **Mappings** 탭에 있는 Datadog UI에서 매핑을 생성하고 관리할 수도 있습니다. 자세한 내용은 [SAML 그룹 매핑][1]을 참조하세요.

## 요청

아래의 모든 API 엔드포인트는 다음의 호스트 엔드포인트를 사용합니다.

* Datadog 지역

### 새 인증 매핑 생성하기

AuthN Mapping을 JSON 본문에서 새롭게 생성합니다. 새로 생성된 AuthN Mapping을 반환합니다.

| 방법 | 엔드포인트 경로        | 필수 페이로드 |
|--------|----------------------|------------------|
| `POST` | `/v2/authn_mappings` | JSON             |

##### 인수

* **`role["data"]["id"]`** [*필수*, 기본 설정 없음]:
 매핑할 역할의 `ID`. Roles API를 사용해 Datadog 역할, 역할에 부여하는 글로벌 권한, 해당 역할에 속하는 사용자를 생성하고 관리할 수 있습니다.
 **참조** : 이 속성은 요청된 `role` 관계 블록의 일부로 제시되어야 합니다. 자세한 예시는 아래에서 찾아보실 수 있습니다. 생성하는 역할에는 ID가 할당됩니다. 매핑할 역할의 `ID`를 찾는 방법을 자세히 알아보려면 [Role API 문서][2]를 참조하시기 바랍니다.
* **`attributes["attribute_key"]`** [*필수*, 기본 설정 없음]:
 `attribute_key`는 ID 제공업체에서 송신하는 속성을 나타내는 키/값(key/value) 쌍의 키 부분입니다. 각 사용자의 사용 사례에 맞추어 이 2가지를 정의할 수 있습니다. 예를 들어 `attribute_key`는 `member-of`로, `attribute_value`는 `Development`로 정의할 수 있습니다.
* **`attributes["attribute_value"]`** [*필수*, 기본 설정 없음]:
 `attribute_value`는 ID 제공업체에서 송신하는 속성을 나타내는 키/값(key/value) 쌍의 값 부분입니다. 각 사용자의 사용 사례에 맞추어 이 2가지를 정의할 수 있습니다. 예를 들어 `attribute_key`는 `member-of`로, `attribute_value`는 `Development`로 정의할 수 있습니다.

{{< tabs >}}
{{% tab "예시" %}}

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

- `<YOUR_DATADOG_API_KEY>`와 `<YOUR_DATADOG_APPLICATION_KEY>`를 해당하는 귀 조직의 [API 및 애플리케이션 키][1]로 바꿉니다.
- `<YOUR_DD_SITE>`를 {{< region-param key="dd_site" code="true" >}}로 바꿉니다.

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "응답" %}}

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

### 전체 AuthN 매핑 가져오기

AuthN 매핑 목록을 반환합니다

| 방법 | 엔드포인트 경로        | 필수 페이로드          |
|--------|----------------------|---------------------------|
| `GET`  | `/v2/authn_mappings` | 부수적인 쿼리 파라미터 |

##### 인수

* **`sort`** [*optional*, *default*=**created\_at**]:
  속성을 지정한 방향으로 정렬합니다. 기본 설정에서는 오름차순으로, '-'를 지정하면 내림차순으로 정렬합니다. 또, 관련 속성인 `-<attribute>` sorts in descending order. Can also sort on relationship attributes `role.name`, `saml_assertion_attribute.attribute_key`, `saml_assertion_attribute.attribute_value`에서도 정렬이 가능합니다.
* **`page[number]`** [*선택 사항*, *기본 설정*=**0**, *최솟값*=**0**]:
  반환할 결과의 페이지 수입니다.
* **`page[size]`** [*선택 사항*, *기본 설정*=**10**]:
  각 페이지에서 반환할 결과 수입니다.
* **`filter`** [*선택 사항*, 기본 설정=none]:
  스트링별로 태그를 필터링합니다. 예를 들면 `Billing Users`가 있습니다.

{{< tabs >}}
{{% tab "예시" %}}

```sh
curl -X GET "https://api.<YOUR_DD_SITE>/api/v2/authn_mappings" \
     -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
     -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>"
```

- `<YOUR_DATADOG_API_KEY>`와 `<YOUR_DATADOG_APPLICATION_KEY>`를 해당하는 귀 조직의 [API 및 애플리케이션 키][1]로 바꿉니다.
- `<YOUR_DD_SITE>`를 {{< region-param key="dd_site" code="true" >}}로 바꿉니다.

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "응답" %}}

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

### 특정 AuthN 매핑 가져오기

UUID를 활용해 특정 AuthN 매핑을 반환합니다.

| 방법 | 엔드포인트 경로            | 필수 페이로드 |
|--------|--------------------------|------------------|
| `GET`  | `/authn_mappings/{authn_mapping_id}` | URL 파라미터    |

##### 인수

* **`{authn_mapping_id}`** [*필수*, 기본 설정 없음]:
  `{authn_mapping_id}`를 조회할 AuthN 매핑 ID로 바꿉니다.

{{< tabs >}}
{{% tab "예시" %}}

```sh
curl -X GET "https://api.<YOUR_DD_SITE>/api/v2/authn_mappings/{authn_mapping_id}" \
     -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
     -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>"
```

- `<YOUR_DATADOG_API_KEY>`와 `<YOUR_DATADOG_APPLICATION_KEY>`를 해당하는 귀 조직의 [API 및 애플리케이션 키][1]로 바꿉니다.
- `<YOUR_DD_SITE>`를 {{< region-param key="dd_site" code="true" >}}로 바꿉니다.

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "응답" %}}

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

### 매핑 업데이트

AuthN 매핑 `role`, `saml_assertion_attribute_id`, 또는 둘 모두를 JSON 본문에서 업데이트합니다. 업데이트된 AuthN 매핑을 반환합니다.

| 방법  | 엔드포인트 경로                           | 필수 페이로드    |
|---------|-----------------------------------------|---------------------|
| `PATCH` | `/v2/authn_mappings/{authn_mapping_id}` | URL 파라미터, JSON |

##### 인수

* **`{authn_mapping_id}`** [*필수*, 기본 설정 없음]:
  `{authn_mapping_id}`를 업데이트할 AuthN 매핑 ID로 바꿉니다. 이때 요청 경로와 요청 본문 모두가 필요합니다.
* **`role["data"]["id"]`** [*선택 사항*, *기본 설정*=none]:
 매핑할 역할의 `ID`. Roles API를 사용해 Datadog 역할, 역할에 부여하는 글로벌 권한, 해당 역할에 속하는 사용자를 생성하고 관리할 수 있습니다.
 **참조** : 이 속성은 요청된 `role` 관계 블록의 일부로 제시되어야 합니다. 자세한 예시는 아래에서 찾아보실 수 있습니다. 생성하는 역할에는 ID가 할당됩니다. 매핑할 역할의 `ID`를 찾는 방법을 자세히 알아보려면 [Role API 문서][2]를 참조하시기 바랍니다.
* **`attributes["attribute_key"]`** [*선택 사항*, *기본 설정*=none]:
 `attribute_key`는 ID 제공업체에서 송신하는 속성을 나타내는 키/값(key/value) 쌍의 키 부분입니다. 각 사용자의 사용 사례에 맞추어 이 2가지를 정의할 수 있습니다. 예를 들어 `attribute_key`는 `member-of`로, `attribute_value`는 `Development`로 정의할 수 있습니다.
* **`attributes["attribute_value"]`** [*선택 사항*, *기본 설정*=none]:
 `attribute_value`는 ID 제공업체에서 송신하는 속성을 나타내는 키/값(key/value) 쌍의 값 부분입니다. 각 사용자의 사용 사례에 맞추어 이 2가지를 정의할 수 있습니다. 예를 들어 `attribute_key`는 `member-of`로, `attribute_value`는 `Development`로 정의할 수 있습니다.

{{< tabs >}}
{{% tab "예시" %}}

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

- `<YOUR_DATADOG_API_KEY>`와 `<YOUR_DATADOG_APPLICATION_KEY>`를 해당하는 귀 조직의 [API 및 애플리케이션 키][1]로 바꿉니다.
- `<YOUR_DD_SITE>`를 {{< region-param key="dd_site" code="true" >}}로 바꿉니다.

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "응답" %}}

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

### 매핑 삭제

특정 AuthN 매핑을 삭제합니다.

| 방법   | 엔드포인트 경로                           | 필수 페이로드 |
|----------|-----------------------------------------|------------------|
| `DELETE` | `/v2/authn_mappings/{authn_mapping_id}` | URL 파라미터    |

##### 인수

* **`{authn_mapping_id}`** [*필수*, 기본 설정 없음]:
  `{authn_mapping_id}`를 삭제할 AuthN 매핑 ID로 바꿉니다.

{{< tabs >}}
{{% tab "예시" %}}

```sh
curl -X DELETE "https://api.<YOUR_DD_SITE>/api/v2/authn_mappings/{UUID}" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
         -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>"
```

- `<YOUR_DATADOG_API_KEY>`와 `<YOUR_DATADOG_APPLICATION_KEY>`를 해당하는 귀 조직의 [API 및 애플리케이션 키][1]로 바꿉니다.
- `<YOUR_DD_SITE>`를 {{< region-param key="dd_site" code="true" >}}로 바꿉니다.

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "응답" %}}

```sh
HTTP/2 204
```

{{% /tab %}}
{{< /tabs >}}

### AuthN 매핑 활성화 가져오기

AuthN 매핑의 활성화 여부를 점검합니다.

| 방법   | 엔드포인트 경로              | 필수 페이로드 |
|----------|----------------------------|------------------|
| `GET`    | `/v1/org_preferences`      | 없음             |

{{< tabs >}}
{{% tab "예시" %}}

```sh
curl -X GET \
         "https://api.<YOUR_DD_SITE>/api/v1/org_preferences" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
         -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
```

- `<YOUR_DATADOG_API_KEY>`와 `<YOUR_DATADOG_APPLICATION_KEY>`를 해당하는 귀 조직의 [API 및 애플리케이션 키][1]로 바꿉니다.
- `<YOUR_DD_SITE>`를 {{< region-param key="dd_site" code="true" >}}로 바꿉니다.

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "응답" %}}

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

### 전체 매핑의 활성화/비활성화

<div class="alert alert-warning">
매핑을 활성화하면 SAML로 로그인한 모든 사용자의 역할이 지워지고 각 SAML의 어셔션(Assertion) 값을 기반으로 역할이 재할당됩니다. 매핑 기능을 활성화하기 전에 로그인을 통해 원하는 SAML 어셔션을 수신하고 있는지 반드시 확인하시기 바랍니다.
</div>

전체 AuthN 매핑의 실행을 활성화/비활성화합니다.

| 방법   | 엔드포인트 경로               | 필수 페이로드 |
|----------|-----------------------------|------------------|
| `POST`   | `/v1/org_preferences`       | JSON             |

##### 인수

* **`{preference_type}`** [*필수*, 기본 설정 없음]:
  업데이트할 설정으로, 값은 "saml_authn_mapping_roles"입니다.
* **`{preference_data}`** [*필수*, 기본 설정 없음]:
  설정을 업데이트할 데이터로, 참 또는 거짓이어야 합니다. 참(true)인 경우 전체 매핑을 활성화하며, 거짓(false)인 경우 비활성화합니다.

{{< tabs >}}
{{% tab "예시" %}}

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

- `<YOUR_DATADOG_API_KEY>`와 `<YOUR_DATADOG_APPLICATION_KEY>`를 해당하는 귀 조직의 [API 및 애플리케이션 키][1]로 바꿉니다.
- `<YOUR_DD_SITE>`를 {{< region-param key="dd_site" code="true" >}}로 바꿉니다.

[1]: https://api.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "응답" %}}

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

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/saml/mapping
[2]: /ko/api/v2/roles/#list-roles