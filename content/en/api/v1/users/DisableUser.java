import com.datadog.api.v1.client.api.UsersApi;

public class UsersApiExample {

    public static void main(String[] args) {
        UsersApi apiInstance = new UsersApi();
        String userHandle = test@datadoghq.com; // String | The handle of the user
        try {
            UserDisableResponse result = apiInstance.disableUser(userHandle);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling UsersApi#disableUser");
            e.printStackTrace();
        }
    }
}