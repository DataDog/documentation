import com.datadog.api.v2.client.api.UsersApi;

public class UsersApiExample {

    public static void main(String[] args) {
        UsersApi apiInstance = new UsersApi();
        String userId = userId_example; // String | The ID of the user.
        try {
            PermissionsResponse result = apiInstance.listUserPermissions(userId);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling UsersApi#listUserPermissions");
            e.printStackTrace();
        }
    }
}