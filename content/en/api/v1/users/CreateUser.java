import com.datadog.api.v1.client.api.UsersApi;

public class UsersApiExample {

    public static void main(String[] args) {
        UsersApi apiInstance = new UsersApi();
        User body = ; // User | 
        try {
            UserResponse result = apiInstance.createUser(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling UsersApi#createUser");
            e.printStackTrace();
        }
    }
}