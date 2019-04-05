## Get all your application keys

{
    "application_keys": [
        {
            "owner": "john@example.com",
            "hash": "11111111111111111111aaaaaaaaaaaaaaaaaaaa",
            "name": "<APP_KEY_NAME>"
        },
        {
            "owner": "jane@example.com",
            "hash": "21111111111111111111aaaaaaaaaaaaaaaaaaaa",
            "name": "<APP_KEY_NAME_2>"
        }
    ]
}

## Create a new application key

{
    "application_key": {
        "owner": "john@example.com",
        "hash": "31111111111111111111aaaaaaaaaaaaaaaaaaaa",
        "name": "<APP_KEY_NAME>"
    }
}

## Get a new API KEY

{
    "application_key": {
        "owner": "john@example.com",
        "hash": "31111111111111111111aaaaaaaaaaaaaaaaaaaa",
        "name": "<APP_KEY_NAME>"
    }
}

## Update an API KEY

{
    "application_key": {
        "owner": "john@example.com",
        "hash": "31111111111111111111aaaaaaaaaaaaaaaaaaaa",
        "name": "<NEW_APP_KEY_NAME>"
    }
}

## Delete an API key

{
    "application_key": {
        "owner": "john@example.com",
        "hash": "31111111111111111111aaaaaaaaaaaaaaaaaaaa",
        "name": "<APP_KEY_NAME>"
    }
}
