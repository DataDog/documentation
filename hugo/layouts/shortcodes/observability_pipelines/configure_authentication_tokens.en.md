To configure authentication tokens, enable the **Configure authentication tokens** toggle:

1. Click **Manage Tokens** and then **Add Token**.
1. Enter the identifier for your token key.<br>**Note**: If you are using environment variables, the environment variable for this token is the identifier you entered prepended with `DD_OP_`.
1. (Optional) Enter a field and value if you want to add additional information to logs that are successfully authenticated with this specific token.
1. Select the path to the token in the **Path to Token** dropdown menu:
	- **Header** for a custom header or an authorization header, such as `"Authorization: Basic ABCDEF1234567="`.
		- Optionally, enter the header name. **Note**: The header name is case insensitive.
	- **Address** for an IP address.
	- **Path** for an endpoint path.
