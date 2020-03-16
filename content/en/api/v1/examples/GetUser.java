import com.datadog.api.v2.client.api.UsersApi;

public class UsersApiExample {

    public static void main(String[] args) {
        UsersApi apiInstance = new UsersApi();
        String userHandle = test@datadoghq.com; // String | The id of the user
        try {
            UserResponse result = apiInstance.getUser(userHandle);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling UsersApi#getUser");
            e.printStackTrace();
        }
    }
}